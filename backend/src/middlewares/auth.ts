import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { tokenService } from "../services/token.service";
import { UserModel } from "../models/User.model";
import { Permission, Role, roleHasPermission } from "../config/roles";

function extractToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    return header.slice(7).trim();
  }
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken as string;
  }
  return null;
}

/** Short-lived status cache to avoid a Mongo round-trip on every admin request. */
const userStatusCache = new Map<string, { status: string; expiresAt: number }>();
const USER_STATUS_TTL_MS = 60_000;

async function resolveUserStatus(userId: string): Promise<"active" | "blocked" | "missing"> {
  const cached = userStatusCache.get(userId);
  if (cached && cached.expiresAt > Date.now()) {
    if (cached.status === "blocked") return "blocked";
    if (cached.status === "missing") return "missing";
    return "active";
  }

  const user = await UserModel.findById(userId).select("status deletedAt").lean();
  if (!user || user.deletedAt) {
    userStatusCache.set(userId, { status: "missing", expiresAt: Date.now() + USER_STATUS_TTL_MS });
    return "missing";
  }
  const status = user.status === "blocked" ? "blocked" : "active";
  userStatusCache.set(userId, { status, expiresAt: Date.now() + USER_STATUS_TTL_MS });
  return status;
}

export const authenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (!token) {
    throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  }

  const payload = tokenService.verifyAccess(token);
  const status = await resolveUserStatus(payload.sub);
  if (status === "missing") {
    throw new ApiError(401, "User no longer exists", "UNAUTHENTICATED");
  }
  if (status === "blocked") {
    throw new ApiError(403, "Your account has been blocked", "ACCOUNT_BLOCKED");
  }

  req.user = { id: payload.sub, role: payload.role, email: payload.email };
  next();
});

export const optionalAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (!token) return next();

  try {
    const payload = tokenService.verifyAccess(token);
    // Trust JWT claims on the hot path — no Mongo lookup for public optional auth.
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
  } catch {
    // Ignore invalid tokens for optional auth
  }
  next();
});

export function isStaffReader(req: Request, permission: Permission = "treks.read"): boolean {
  return Boolean(req.user && roleHasPermission(req.user.role, permission));
}

/** Any non-customer authenticated role (CMS list endpoints). */
export function isStaffUser(req: Request): boolean {
  return Boolean(req.user && req.user.role !== "customer");
}

export const authorize = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to perform this action", "FORBIDDEN");
    }
    next();
  };
};

export const requirePermission = (permission: Permission) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
    }
    if (!roleHasPermission(req.user.role, permission)) {
      throw new ApiError(403, "You do not have permission to perform this action", "FORBIDDEN");
    }
    next();
  };
};
