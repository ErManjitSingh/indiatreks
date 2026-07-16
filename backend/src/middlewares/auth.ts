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

export const authenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (!token) {
    throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  }

  const payload = tokenService.verifyAccess(token);

  const user = await UserModel.findById(payload.sub).select("_id role email status deletedAt");
  if (!user || user.deletedAt) {
    throw new ApiError(401, "User no longer exists", "UNAUTHENTICATED");
  }
  if (user.status === "blocked") {
    throw new ApiError(403, "Your account has been blocked", "ACCOUNT_BLOCKED");
  }

  req.user = { id: String(user._id), role: user.role, email: user.email };
  next();
});

export const optionalAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (!token) return next();

  try {
    const payload = tokenService.verifyAccess(token);
    const user = await UserModel.findById(payload.sub).select("_id role email status deletedAt");
    if (user && !user.deletedAt && user.status !== "blocked") {
      req.user = { id: String(user._id), role: user.role, email: user.email };
    }
  } catch {
    // Ignore invalid tokens for optional auth
  }
  next();
});

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
