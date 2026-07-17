import { google } from "googleapis";
import crypto from "crypto";
import { env } from "../config/env";
import { GoogleAccountModel } from "../models/GoogleAccount.model";
import { encryptSecret, decryptSecret } from "../utils/tokenCrypto";
import { ApiError } from "../utils/ApiError";

const SCOPES = [
  "https://www.googleapis.com/auth/webmasters",
  "https://www.googleapis.com/auth/indexing",
  "https://www.googleapis.com/auth/analytics.readonly",
  "openid",
  "email",
  "profile",
];

function redirectUri() {
  return (
    env.GOOGLE_CALLBACK_URL ||
    env.GOOGLE_OAUTH_REDIRECT_URI ||
    `${env.APP_URL.replace(/\/$/, "")}${env.API_PREFIX}/auth/google/callback`
  );
}

function assertGoogleConfigured() {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    throw new ApiError(
      503,
      "Google OAuth is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.",
      "GOOGLE_OAUTH_NOT_CONFIGURED",
    );
  }
}

export function createOAuthClient() {
  assertGoogleConfigured();
  return new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, redirectUri());
}

function signState(payload: Record<string, string>) {
  const secret = env.SESSION_SECRET || env.JWT_ACCESS_SECRET;
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyState(state: string) {
  const secret = env.SESSION_SECRET || env.JWT_ACCESS_SECRET;
  const [body, sig] = state.split(".");
  if (!body || !sig) throw new ApiError(400, "Invalid OAuth state", "INVALID_OAUTH_STATE");
  const expected = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  if (expected !== sig) throw new ApiError(400, "Invalid OAuth state signature", "INVALID_OAUTH_STATE");
  return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
    uid?: string;
    nonce?: string;
    ts?: string;
  };
}

async function getAuthorizeUrl(userId?: string) {
  const client = createOAuthClient();
  const state = signState({
    uid: userId || "",
    nonce: crypto.randomBytes(8).toString("hex"),
    ts: String(Date.now()),
  });
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    state,
    include_granted_scopes: true,
  });
}

async function handleCallback(code: string, state: string) {
  const parsed = verifyState(state);
  if (parsed.ts && Date.now() - Number(parsed.ts) > 15 * 60 * 1000) {
    throw new ApiError(400, "OAuth state expired", "OAUTH_STATE_EXPIRED");
  }

  const client = createOAuthClient();
  const { tokens } = await client.getToken(code);
  if (!tokens.access_token) {
    throw new ApiError(400, "Google did not return an access token", "OAUTH_NO_TOKEN");
  }

  client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: "v2", auth: client });
  const me = await oauth2.userinfo.get();

  const update: Record<string, unknown> = {
    connected: true,
    connectedAt: new Date(),
    disconnectedAt: null,
    lastError: undefined,
    name: me.data.name || undefined,
    email: me.data.email || undefined,
    googleUserId: me.data.id || undefined,
    scope: (tokens.scope || "").split(" ").filter(Boolean),
    tokenType: tokens.token_type || "Bearer",
    expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
    accessTokenEnc: encryptSecret(tokens.access_token),
  };
  if (tokens.refresh_token) {
    update.refreshTokenEnc = encryptSecret(tokens.refresh_token);
  }
  if (parsed.uid) update.createdBy = parsed.uid;

  const doc = await GoogleAccountModel.findOneAndUpdate(
    { key: "default" },
    { $set: update, $setOnInsert: { key: "default", provider: "google" } },
    { upsert: true, new: true },
  );

  return {
    connected: true,
    email: doc.email,
    connectedAt: doc.connectedAt,
  };
}

async function getStatus() {
  const doc = await GoogleAccountModel.findOne({ key: "default" }).lean();
  const configured = Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);
  return {
    configured,
    connected: Boolean(doc?.connected),
    name: doc?.name || null,
    email: doc?.email || null,
    googleId: doc?.googleUserId || null,
    connectedAt: doc?.connectedAt || null,
    disconnectedAt: doc?.disconnectedAt || null,
    scopes: doc?.scope || [],
    searchConsoleProperty: doc?.searchConsoleProperty || null,
    ga4PropertyId: doc?.ga4PropertyId || null,
    expiryDate: doc?.expiryDate || null,
    lastError: doc?.lastError || null,
    redirectUri: configured ? redirectUri() : null,
  };
}

async function disconnect() {
  await GoogleAccountModel.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        connected: false,
        disconnectedAt: new Date(),
        accessTokenEnc: undefined,
        refreshTokenEnc: undefined,
        lastError: undefined,
      },
    },
    { upsert: true },
  );
  return { connected: false };
}

async function updatePropertyLinks(input: { searchConsoleProperty?: string; ga4PropertyId?: string }) {
  const doc = await GoogleAccountModel.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        ...(input.searchConsoleProperty !== undefined
          ? { searchConsoleProperty: input.searchConsoleProperty }
          : {}),
        ...(input.ga4PropertyId !== undefined ? { ga4PropertyId: input.ga4PropertyId } : {}),
      },
    },
    { upsert: true, new: true },
  );
  return {
    searchConsoleProperty: doc.searchConsoleProperty,
    ga4PropertyId: doc.ga4PropertyId,
  };
}

/** Returns an authenticated OAuth2 client with auto-refreshed tokens. */
async function getAuthedClient() {
  const doc = await GoogleAccountModel.findOne({ key: "default", connected: true })
    .select("+accessTokenEnc +refreshTokenEnc")
    .exec();
  if (!doc?.accessTokenEnc) {
    throw new ApiError(400, "Google account is not connected", "GOOGLE_NOT_CONNECTED");
  }

  const client = createOAuthClient();
  const credentials: {
    access_token: string;
    refresh_token?: string;
    expiry_date?: number;
    token_type?: string;
  } = {
    access_token: decryptSecret(doc.accessTokenEnc),
    token_type: doc.tokenType || "Bearer",
    expiry_date: doc.expiryDate ? doc.expiryDate.getTime() : undefined,
  };
  if (doc.refreshTokenEnc) {
    credentials.refresh_token = decryptSecret(doc.refreshTokenEnc);
  }
  client.setCredentials(credentials);

  client.on("tokens", async (tokens) => {
    try {
      const patch: Record<string, unknown> = {};
      if (tokens.access_token) patch.accessTokenEnc = encryptSecret(tokens.access_token);
      if (tokens.refresh_token) patch.refreshTokenEnc = encryptSecret(tokens.refresh_token);
      if (tokens.expiry_date) patch.expiryDate = new Date(tokens.expiry_date);
      if (Object.keys(patch).length) {
        await GoogleAccountModel.updateOne({ key: "default" }, { $set: patch });
      }
    } catch {
      /* ignore refresh persist errors */
    }
  });

  if (doc.expiryDate && doc.expiryDate.getTime() < Date.now() + 60_000) {
    if (!credentials.refresh_token) {
      throw new ApiError(401, "Google token expired. Please reconnect.", "GOOGLE_TOKEN_EXPIRED");
    }
    const { credentials: refreshed } = await client.refreshAccessToken();
    client.setCredentials(refreshed);
    if (refreshed.access_token) {
      await GoogleAccountModel.updateOne(
        { key: "default" },
        {
          $set: {
            accessTokenEnc: encryptSecret(refreshed.access_token),
            expiryDate: refreshed.expiry_date ? new Date(refreshed.expiry_date) : null,
            ...(refreshed.refresh_token
              ? { refreshTokenEnc: encryptSecret(refreshed.refresh_token) }
              : {}),
          },
        },
      );
    }
  }

  return { client, account: doc };
}

export const googleOAuthService = {
  getAuthorizeUrl,
  handleCallback,
  getStatus,
  disconnect,
  updatePropertyLinks,
  getAuthedClient,
  redirectUri,
  SCOPES,
};
