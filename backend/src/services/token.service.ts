import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import crypto from "node:crypto";
import { env } from "../config/env";
import { Role } from "../config/roles";
import { ApiError } from "../utils/ApiError";

export interface AccessTokenPayload extends JwtPayload {
  sub: string;
  role: Role;
  email: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  sub: string;
  jti: string;
}

function signAccess(payload: { id: string; role: Role; email: string }): string {
  const options: SignOptions = { expiresIn: env.JWT_ACCESS_EXPIRES as SignOptions["expiresIn"] };
  return jwt.sign(
    { sub: payload.id, role: payload.role, email: payload.email },
    env.JWT_ACCESS_SECRET as Secret,
    options,
  );
}

function signRefresh(payload: { id: string; jti?: string }): { token: string; jti: string } {
  const jti = payload.jti ?? crypto.randomUUID();
  const options: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES as SignOptions["expiresIn"] };
  const token = jwt.sign({ sub: payload.id, jti }, env.JWT_REFRESH_SECRET as Secret, options);
  return { token, jti };
}

function verifyAccess(token: string): AccessTokenPayload {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET as Secret) as AccessTokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired access token", "INVALID_ACCESS_TOKEN");
  }
}

function verifyRefresh(token: string): RefreshTokenPayload {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET as Secret) as RefreshTokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token", "INVALID_REFRESH_TOKEN");
  }
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function refreshExpiryDate(): Date {
  const match = /^(\d+)([smhd])$/.exec(env.JWT_REFRESH_EXPIRES);
  const now = Date.now();
  if (!match) return new Date(now + 7 * 24 * 60 * 60 * 1000);
  const value = Number(match[1]);
  const unit = match[2];
  const unitMs: Record<string, number> = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return new Date(now + value * (unitMs[unit] ?? 86400000));
}

export const tokenService = {
  signAccess,
  signRefresh,
  verifyAccess,
  verifyRefresh,
  hashToken,
  refreshExpiryDate,
};
