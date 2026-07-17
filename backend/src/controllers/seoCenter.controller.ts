import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { env } from "../config/env";
import { seoCenterService } from "../services/seoCenter.service";
import { googleOAuthService } from "../services/googleOAuth.service";
import { googleSearchConsoleService } from "../services/googleSearchConsole.service";
import { googleAnalyticsDataService } from "../services/googleAnalyticsData.service";
import { pageSpeedService } from "../services/pageSpeed.service";
import { keywordTrackingService } from "../services/keywordTracking.service";
import { aiSeoService } from "../services/aiSeo.service";
import { robotsService } from "../services/robots.service";

export const getDashboard = asyncHandler(async (_req: Request, res: Response) => {
  const data = await seoCenterService.getDashboard();
  return sendSuccess(res, data);
});

export const getIntegrations = asyncHandler(async (_req: Request, res: Response) => {
  const data = await seoCenterService.getIntegrations();
  return sendSuccess(res, data);
});

export const updateIntegrations = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoCenterService.updateIntegrations(req.body);
  return sendSuccess(res, data, "Integrations updated");
});

export const googleConnect = asyncHandler(async (req: Request, res: Response) => {
  const url = await googleOAuthService.getAuthorizeUrl(req.user?.id);
  return sendSuccess(res, { url });
});

export const googleStatus = asyncHandler(async (_req: Request, res: Response) => {
  const data = await googleOAuthService.getStatus();
  return sendSuccess(res, data);
});

export const googleDisconnect = asyncHandler(async (_req: Request, res: Response) => {
  const data = await googleOAuthService.disconnect();
  return sendSuccess(res, data, "Google account disconnected");
});

export const googleCallback = asyncHandler(async (req: Request, res: Response) => {
  const code = String(req.query.code || "");
  const state = String(req.query.state || "");
  const error = req.query.error ? String(req.query.error) : "";
  const adminBase = (env.FRONTEND_URL || "https://treks.indiaholidaydestination.com").replace(/\/$/, "");
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

export const gscDashboard = asyncHandler(async (req: Request, res: Response) => {
  const days = Number(req.query.days) || 28;
  const force = String(req.query.sync || "") === "1";
  const data = await googleSearchConsoleService.getDashboard(days, force);
  return sendSuccess(res, data);
});

export const gscSync = asyncHandler(async (req: Request, res: Response) => {
  const days = Number(req.body?.days) || 28;
  const data = await googleSearchConsoleService.syncSearchAnalytics(days);
  return sendSuccess(res, data, "Search Console synced");
});

export const gscSites = asyncHandler(async (_req: Request, res: Response) => {
  const data = await googleSearchConsoleService.listSites();
  return sendSuccess(res, data);
});

export const gscSitemaps = asyncHandler(async (_req: Request, res: Response) => {
  const data = await googleSearchConsoleService.listSitemaps();
  return sendSuccess(res, data);
});

export const gscSubmitSitemap = asyncHandler(async (req: Request, res: Response) => {
  const data = await googleSearchConsoleService.submitSitemap(String(req.body.url));
  return sendSuccess(res, data, "Sitemap submitted to Google");
});

export const gscSubmitAllSitemaps = asyncHandler(async (_req: Request, res: Response) => {
  const { seoAutoIndexService } = await import("../services/seoAutoIndex.service");
  await seoAutoIndexService.refreshSitemapCounts();
  const data = await seoAutoIndexService.submitCoreSitemaps();
  return sendSuccess(res, data, "Core sitemaps submitted to Google");
});

export const gscPushBlogs = asyncHandler(async (req: Request, res: Response) => {
  const { seoAutoIndexService } = await import("../services/seoAutoIndex.service");
  const limit = Number(req.body?.limit) || 30;
  const data = await seoAutoIndexService.pushRecentBlogs(limit);
  return sendSuccess(res, data, "Blogs pushed to Search Console");
});

export const gscInspect = asyncHandler(async (req: Request, res: Response) => {
  const data = await googleSearchConsoleService.inspectUrl(String(req.body.url));
  return sendSuccess(res, data);
});

export const gaDashboard = asyncHandler(async (req: Request, res: Response) => {
  const days = Number(req.query.days) || 28;
  const force = String(req.query.sync || "") === "1";
  const data = await googleAnalyticsDataService.getDashboard(days, force);
  return sendSuccess(res, data);
});

export const gaSync = asyncHandler(async (req: Request, res: Response) => {
  const days = Number(req.body?.days) || 28;
  const data = await googleAnalyticsDataService.syncAnalytics(days);
  return sendSuccess(res, data, "Analytics synced");
});

export const cwvLatest = asyncHandler(async (req: Request, res: Response) => {
  const strategy = req.query.strategy === "desktop" ? "desktop" : "mobile";
  const data = await pageSpeedService.getLatest(strategy);
  return sendSuccess(res, data);
});

export const cwvRun = asyncHandler(async (req: Request, res: Response) => {
  const strategy = req.body?.strategy === "desktop" ? "desktop" : "mobile";
  const data = await pageSpeedService.runPageSpeed(req.body?.url, strategy);
  return sendSuccess(res, data, "Core Web Vitals refreshed");
});

export const listKeywords = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await keywordTrackingService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const createKeyword = asyncHandler(async (req: Request, res: Response) => {
  const data = await keywordTrackingService.create(req.body, req.user?.id);
  return sendSuccess(res, data, "Keyword tracked");
});

export const updateKeyword = asyncHandler(async (req: Request, res: Response) => {
  const data = await keywordTrackingService.update(String(req.params.id), req.body);
  return sendSuccess(res, data, "Keyword updated");
});

export const deleteKeyword = asyncHandler(async (req: Request, res: Response) => {
  const data = await keywordTrackingService.remove(String(req.params.id));
  return sendSuccess(res, data, "Keyword deleted");
});

export const syncKeywordsFromGsc = asyncHandler(async (_req: Request, res: Response) => {
  const data = await keywordTrackingService.syncFromGsc();
  return sendSuccess(res, data, "Keywords synced from Search Console");
});

export const runAudit = asyncHandler(async (req: Request, res: Response) => {
  const audit = await aiSeoService.runAudit(req.user?.id);
  return sendSuccess(res, audit, "SEO audit completed");
});

export const exportRedirects = asyncHandler(async (_req: Request, res: Response) => {
  const data = await seoCenterService.exportRedirects();
  return sendSuccess(res, data);
});

export const importRedirects = asyncHandler(async (req: Request, res: Response) => {
  const rows = Array.isArray(req.body?.items) ? req.body.items : [];
  const data = await seoCenterService.importRedirects(rows);
  return sendSuccess(res, data, "Redirects imported");
});

export const ignore404 = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoCenterService.ignoreNotFound(String(req.params.id));
  return sendSuccess(res, data, "404 ignored");
});

export const delete404 = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoCenterService.deleteNotFound(String(req.params.id));
  return sendSuccess(res, data, "404 deleted");
});

export const robotsPreview = asyncHandler(async (_req: Request, res: Response) => {
  const [config, txt] = await Promise.all([robotsService.getConfig(), robotsService.generateTxt()]);
  return sendSuccess(res, { config, preview: txt });
});

export const generateSitemaps = asyncHandler(async (_req: Request, res: Response) => {
  const { seoAutoIndexService } = await import("../services/seoAutoIndex.service");
  const generated = await seoAutoIndexService.refreshSitemapCounts();
  let submitted: unknown = null;
  try {
    submitted = await seoAutoIndexService.submitCoreSitemaps();
  } catch {
    submitted = null;
  }
  return sendSuccess(res, { generated, submitted }, "Sitemaps generated");
});
