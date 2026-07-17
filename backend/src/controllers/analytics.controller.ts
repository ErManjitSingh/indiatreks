import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { analyticsService } from "../services/analytics.service";
import { seoService } from "../services/seo.service";

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await analyticsService.getDashboardStats();
  return sendSuccess(res, stats);
});

export const getPublicAnalyticsConfig = asyncHandler(async (_req: Request, res: Response) => {
  const config = await seoService.getAnalyticsConfig();
  return sendSuccess(res, {
    ga4: config.ga4,
    gtm: config.gtm,
    metaPixel: config.metaPixel,
    clarity: config.clarity,
  });
});
