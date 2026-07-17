import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { env } from "../config/env";
import { googleOAuthService } from "../services/googleOAuth.service";

export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const url = await googleOAuthService.getAuthorizeUrl(req.user?.id);
  return sendSuccess(res, { url });
});

export const googleStatus = asyncHandler(async (_req: Request, res: Response) => {
  const status = await googleOAuthService.getStatus();
  return sendSuccess(res, status);
});

export const googleDisconnect = asyncHandler(async (_req: Request, res: Response) => {
  const data = await googleOAuthService.disconnect();
  return sendSuccess(res, data, "Google account disconnected");
});

export const googleCallback = asyncHandler(async (req: Request, res: Response) => {
  const code = String(req.query.code || "");
  const state = String(req.query.state || "");
  const error = req.query.error ? String(req.query.error) : "";
  const adminBase = (env.FRONTEND_URL || "http://localhost:3000").replace(/\/$/, "");
  const redirectBase = `${adminBase}/admin/seo-center/search-console`;

  if (error || !code) {
    return res.redirect(`${redirectBase}?oauth=error&message=${encodeURIComponent(error || "missing_code")}`);
  }

  try {
    await googleOAuthService.handleCallback(code, state);
    return res.redirect(`${redirectBase}?oauth=success`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "oauth_failed";
    return res.redirect(`${redirectBase}?oauth=error&message=${encodeURIComponent(message)}`);
  }
});
