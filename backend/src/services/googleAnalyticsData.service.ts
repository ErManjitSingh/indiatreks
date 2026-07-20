import { google } from "googleapis";
import { googleOAuthService } from "./googleOAuth.service";
import { AnalyticsCacheModel } from "../models/AnalyticsCache.model";
import { AnalyticsConfigModel } from "../models/AnalyticsConfig.model";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

function dateNDaysAgo(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function normalizePropertyId(raw?: string | null) {
  return String(raw || "")
    .trim()
    .replace(/^properties\//i, "")
    .replace(/\s+/g, "");
}

function assertValidPropertyId(propertyId: string) {
  if (!propertyId) {
    throw new ApiError(
      400,
      "GA4 Property ID is missing. Open Analytics → Admin → Property settings and copy the numeric Property ID (not the G- Measurement ID).",
      "GA4_PROPERTY_MISSING",
    );
  }
  if (/^G-/i.test(propertyId)) {
    throw new ApiError(
      400,
      "You pasted a Measurement ID (G-…). Sync needs the numeric Property ID from GA4 Admin → Property settings.",
      "GA4_PROPERTY_INVALID",
    );
  }
  if (!/^\d{6,12}$/.test(propertyId)) {
    throw new ApiError(
      400,
      "GA4 Property ID must be numbers only (usually 9 digits). Check Admin → Property settings.",
      "GA4_PROPERTY_INVALID",
    );
  }
}

function mapGoogleError(err: unknown): never {
  if (err instanceof ApiError) throw err;

  const anyErr = err as {
    message?: string;
    code?: number | string;
    errors?: Array<{ message?: string; reason?: string }>;
    response?: { status?: number; data?: { error?: { message?: string; status?: string } } };
  };

  const apiMessage =
    anyErr?.response?.data?.error?.message ||
    anyErr?.errors?.[0]?.message ||
    anyErr?.message ||
    "Google Analytics request failed";
  const status = Number(anyErr?.response?.status || anyErr?.code || 500);
  const lower = apiMessage.toLowerCase();

  if (
    status === 403 ||
    lower.includes("sufficient permissions") ||
    lower.includes("permission denied") ||
    lower.includes("caller does not have permission")
  ) {
    throw new ApiError(
      403,
      `Google account cannot access this GA4 property. Open https://analytics.google.com → Admin → Property access management and add the connected Google account as Viewer (or higher). Also confirm the Property ID is correct (numeric ID from Property settings, not G- Measurement ID). Details: ${apiMessage}`,
      "GA4_PERMISSION_DENIED",
      { googleMessage: apiMessage },
    );
  }

  if (status === 401 || lower.includes("invalid_grant") || lower.includes("token")) {
    throw new ApiError(
      401,
      "Google login expired. Reconnect Google from SEO Center → Search Console / Google connect, then sync again.",
      "GOOGLE_TOKEN_EXPIRED",
      { googleMessage: apiMessage },
    );
  }

  if (status === 400 || lower.includes("not found") || lower.includes("invalid")) {
    throw new ApiError(400, apiMessage, "GA4_REQUEST_INVALID", { googleMessage: apiMessage });
  }

  throw new ApiError(
    status >= 400 && status < 600 ? status : 502,
    apiMessage,
    "GA4_SYNC_FAILED",
    { googleMessage: apiMessage },
  );
}

async function resolvePropertyId() {
  const status = await googleOAuthService.getStatus();
  if (status.ga4PropertyId) return normalizePropertyId(status.ga4PropertyId);
  const cfg = await AnalyticsConfigModel.findOne({ key: "default" }).lean();
  return normalizePropertyId(cfg?.ga4?.propertyId);
}

async function listAccessibleProperties() {
  try {
    const { client } = await googleOAuthService.getAuthedClient();
    const admin = google.analyticsadmin({ version: "v1beta", auth: client });
    const res = await admin.accountSummaries.list({ pageSize: 200 });
    const items: Array<{
      accountName: string;
      accountId: string;
      propertyName: string;
      propertyId: string;
    }> = [];

    for (const account of res.data.accountSummaries || []) {
      for (const property of account.propertySummaries || []) {
        const propertyId = normalizePropertyId(property.property);
        if (!propertyId) continue;
        items.push({
          accountName: account.displayName || account.account || "Account",
          accountId: normalizePropertyId(account.account),
          propertyName: property.displayName || property.property || propertyId,
          propertyId,
        });
      }
    }

    return items;
  } catch (err) {
    mapGoogleError(err);
  }
}

async function syncAnalytics(rangeDays = 28) {
  const propertyId = await resolvePropertyId();
  assertValidPropertyId(propertyId);

  let client;
  try {
    ({ client } = await googleOAuthService.getAuthedClient());
  } catch (err) {
    mapGoogleError(err);
  }

  const analyticsdata = google.analyticsdata({ version: "v1beta", auth: client });
  const startDate = dateNDaysAgo(rangeDays);
  const endDate = today();
  const property = `properties/${propertyId}`;

  let totalsRes;
  let organicRes;
  let pagesRes;
  let realtimeRes;

  try {
    [totalsRes, organicRes, pagesRes, realtimeRes] = await Promise.all([
      analyticsdata.properties.runReport({
        property,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          metrics: [
            { name: "sessions" },
            { name: "totalUsers" },
            { name: "newUsers" },
            { name: "conversions" },
            { name: "bounceRate" },
            { name: "averageSessionDuration" },
          ],
        },
      }),
      analyticsdata.properties.runReport({
        property,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: "sessionDefaultChannelGroup" }],
          metrics: [{ name: "sessions" }, { name: "totalUsers" }],
          dimensionFilter: {
            filter: {
              fieldName: "sessionDefaultChannelGroup",
              stringFilter: { value: "Organic Search" },
            },
          },
        },
      }),
      analyticsdata.properties.runReport({
        property,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: "pagePath" }],
          metrics: [
            { name: "sessions" },
            { name: "totalUsers" },
            { name: "bounceRate" },
            { name: "averageSessionDuration" },
          ],
          limit: "25",
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        },
      }),
      analyticsdata.properties.runRealtimeReport({
        property,
        requestBody: {
          metrics: [{ name: "activeUsers" }],
        },
      }),
    ]);
  } catch (err) {
    mapGoogleError(err);
  }

  const values = totalsRes.data.rows?.[0]?.metricValues || [];
  const totals = {
    sessions: Number(values[0]?.value || 0),
    users: Number(values[1]?.value || 0),
    newUsers: Number(values[2]?.value || 0),
    organicUsers: Number(organicRes.data.rows?.[0]?.metricValues?.[1]?.value || 0),
    conversions: Number(values[3]?.value || 0),
    bounceRate: Number(values[4]?.value || 0),
    averageEngagementSeconds: Number(values[5]?.value || 0),
    organicSessions: Number(organicRes.data.rows?.[0]?.metricValues?.[0]?.value || 0),
    realtimeUsers: Number(realtimeRes.data.rows?.[0]?.metricValues?.[0]?.value || 0),
  };

  const topPages = (pagesRes.data.rows || []).map((row) => ({
    page: row.dimensionValues?.[0]?.value || "",
    sessions: Number(row.metricValues?.[0]?.value || 0),
    users: Number(row.metricValues?.[1]?.value || 0),
    bounceRate: Number(row.metricValues?.[2]?.value || 0),
    engagementSeconds: Number(row.metricValues?.[3]?.value || 0),
  }));

  return AnalyticsCacheModel.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        propertyId,
        rangeDays,
        startDate,
        endDate,
        totals,
        topPages,
        syncedAt: new Date(),
        source: "google",
      },
    },
    { upsert: true, new: true },
  );
}

async function getDashboard(rangeDays = 28, forceSync = false) {
  const status = await googleOAuthService.getStatus();
  const propertyId = await resolvePropertyId();
  let cache = await AnalyticsCacheModel.findOne({ key: "default" }).lean();

  if (status.connected && propertyId && (forceSync || !cache || cache.source === "empty")) {
    try {
      const synced = await syncAnalytics(rangeDays);
      cache = synced.toObject() as typeof cache;
    } catch (err) {
      logger.warn("GA4 sync failed", {
        message: err instanceof Error ? err.message : "unknown",
      });
    }
  }

  return {
    connected: status.connected,
    configured: status.configured,
    propertyId: propertyId || null,
    syncedAt: cache?.syncedAt || null,
    source: cache?.source || "empty",
    rangeDays: cache?.rangeDays || rangeDays,
    totals: cache?.totals || {
      sessions: 0,
      users: 0,
      newUsers: 0,
      organicUsers: 0,
      organicSessions: 0,
      realtimeUsers: 0,
      conversions: 0,
      bounceRate: 0,
      averageEngagementSeconds: 0,
    },
    topPages: cache?.topPages || [],
  };
}

export const googleAnalyticsDataService = {
  getDashboard,
  syncAnalytics,
  resolvePropertyId,
  listAccessibleProperties,
};
