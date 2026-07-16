import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { authService } from "../services/auth.service";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

const REFRESH_COOKIE = "refreshToken";

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/api/v1/auth",
  });
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body, { userAgent: req.headers["user-agent"], ip: req.ip });
  setRefreshCookie(res, result.refreshToken);
  return sendSuccess(res, result, "Registration successful", 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body, { userAgent: req.headers["user-agent"], ip: req.ip });
  setRefreshCookie(res, result.refreshToken);
  return sendSuccess(res, result, "Login successful");
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.body.refreshToken || req.cookies?.[REFRESH_COOKIE];
  if (!token) throw new ApiError(401, "Refresh token is required", "REFRESH_TOKEN_REQUIRED");

  const result = await authService.refresh(token, { userAgent: req.headers["user-agent"], ip: req.ip });
  setRefreshCookie(res, result.refreshToken);
  return sendSuccess(res, result, "Token refreshed");
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.body.refreshToken || req.cookies?.[REFRESH_COOKIE];
  if (req.user) {
    await authService.logout(req.user.id, token);
  }
  res.clearCookie(REFRESH_COOKIE, { path: "/api/v1/auth" });
  return sendSuccess(res, null, "Logged out successfully");
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess(res, req.user, "Current user");
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email);
  return sendSuccess(res, null, "If an account exists, a reset link has been sent");
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.password);
  return sendSuccess(res, null, "Password reset successfully");
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  await authService.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
  return sendSuccess(res, null, "Password changed successfully");
});

export const sendOtp = asyncHandler(async (req: Request, res: Response) => {
  await authService.sendOtp(req.body.email);
  return sendSuccess(res, null, "OTP sent to your email");
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  await authService.verifyEmail(req.user.id, req.body.otp);
  return sendSuccess(res, null, "Email verified successfully");
});
