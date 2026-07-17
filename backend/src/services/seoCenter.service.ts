import { googleOAuthService } from "./googleOAuth.service";
import { googleSearchConsoleService } from "./googleSearchConsole.service";
import { googleAnalyticsDataService } from "./googleAnalyticsData.service";
import { pageSpeedService } from "./pageSpeed.service";
import { keywordTrackingService } from "./keywordTracking.service";
import { aiSeoService } from "./aiSeo.service";
import { seoService } from "./seo.service";
import { robotsService } from "./robots.service";
import { sitemapService } from "./sitemap.service";
import { redirectService } from "./redirect.service";
import { AnalyticsConfigModel } from "../models/AnalyticsConfig.model";
import { KeywordTrackingModel } from "../models/KeywordTracking.model";
import { NotFoundLogModel } from "../models/NotFoundLog.model";
import { RedirectModel, type RedirectType } from "../models/Redirect.model";
import { maskSecret } from "../utils/tokenCrypto";

async function getIntegrations() {
  const cfg = await AnalyticsConfigModel.findOne({ key: "default" })
    .select("+bingWebmaster.apiKey")
    .lean();
  const google = await googleOAuthService.getStatus();

  return {
    google,
    ga4: {
      enabled: Boolean(cfg?.ga4?.enabled),
      measurementId: cfg?.ga4?.measurementId || null,
      propertyId: cfg?.ga4?.propertyId || null,
    },
    gtm: {
      enabled: Boolean(cfg?.gtm?.enabled),
      containerId: cfg?.gtm?.containerId || null,
      verified: Boolean(cfg?.gtm?.containerId),
      status: cfg?.gtm?.enabled && cfg?.gtm?.containerId ? "active" : "inactive",
    },
    clarity: {
      enabled: Boolean(cfg?.clarity?.enabled),
      projectId: cfg?.clarity?.projectId || null,
      heatmapsUrl: cfg?.clarity?.projectId
        ? `https://clarity.microsoft.com/projects/view/${cfg.clarity.projectId}/dashboard`
        : null,
      recordingsUrl: cfg?.clarity?.projectId
        ? `https://clarity.microsoft.com/projects/view/${cfg.clarity.projectId}/impressions`
        : null,
      status: cfg?.clarity?.enabled && cfg?.clarity?.projectId ? "active" : "inactive",
    },
    metaPixel: {
      enabled: Boolean(cfg?.metaPixel?.enabled),
      pixelId: cfg?.metaPixel?.pixelId || null,
      status: cfg?.metaPixel?.enabled && cfg?.metaPixel?.pixelId ? "active" : "inactive",
    },
    bing: {
      enabled: Boolean(cfg?.bingWebmaster?.enabled),
      siteUrl: cfg?.bingWebmaster?.siteUrl || null,
      verified: Boolean(cfg?.bingWebmaster?.verified),
      apiKeyMasked: maskSecret(cfg?.bingWebmaster?.apiKey),
      hasApiKey: Boolean(cfg?.bingWebmaster?.apiKey),
      status:
        cfg?.bingWebmaster?.enabled && cfg?.bingWebmaster?.apiKey ? "configured" : "inactive",
    },
  };
}

async function updateIntegrations(input: Record<string, unknown>) {
  const current = await AnalyticsConfigModel.findOne({ key: "default" }).select(
    "+bingWebmaster.apiKey",
  );
  const doc =
    current ||
    (await AnalyticsConfigModel.create({
      key: "default",
      ga4: { enabled: false },
      gtm: { enabled: false },
      metaPixel: { enabled: false },
      clarity: { enabled: false },
      bingWebmaster: { enabled: false },
    }));

  if (input.ga4 && typeof input.ga4 === "object") {
    Object.assign(doc.ga4, input.ga4);
  }
  if (input.gtm && typeof input.gtm === "object") {
    Object.assign(doc.gtm, input.gtm);
  }
  if (input.clarity && typeof input.clarity === "object") {
    Object.assign(doc.clarity, input.clarity);
  }
  if (input.metaPixel && typeof input.metaPixel === "object") {
    Object.assign(doc.metaPixel, input.metaPixel);
  }
  if (input.bing && typeof input.bing === "object") {
    const bing = input.bing as Record<string, unknown>;
    doc.bingWebmaster = doc.bingWebmaster || { enabled: false };
    if (bing.enabled != null) doc.bingWebmaster.enabled = Boolean(bing.enabled);
    if (bing.siteUrl != null) doc.bingWebmaster.siteUrl = String(bing.siteUrl);
    if (bing.verified != null) doc.bingWebmaster.verified = Boolean(bing.verified);
    if (bing.apiKey != null && String(bing.apiKey).trim()) {
      doc.bingWebmaster.apiKey = String(bing.apiKey).trim();
    }
  }

  await doc.save();

  if (input.googleProperty && typeof input.googleProperty === "object") {
    await googleOAuthService.updatePropertyLinks(input.googleProperty as never);
  }

  return getIntegrations();
}

async function getDashboard() {
  const [google, gsc, ga, cwv, integrations, keywords, notFoundOpen, redirectsActive, aiDash, robotsTxt, sitemapCfg] =
    await Promise.all([
      googleOAuthService.getStatus(),
      googleSearchConsoleService.getDashboard(28, false),
      googleAnalyticsDataService.getDashboard(28, false),
      pageSpeedService.getLatest("mobile"),
      getIntegrations(),
      KeywordTrackingModel.countDocuments({ active: true }),
      NotFoundLogModel.countDocuments({ resolved: false, ignored: { $ne: true } }),
      RedirectModel.countDocuments({ isActive: true }),
      aiSeoService.getDashboard().catch(() => null),
      robotsService.generateTxt(),
      sitemapService.getConfig(),
    ]);

  return {
    brand: "India Holiday Destinations",
    google,
    searchConsole: {
      connected: gsc.connected,
      totals: gsc.totals,
      coverageStatus: gsc.coverageStatus,
      syncedAt: gsc.syncedAt,
      submittedSitemap: gsc.submittedSitemap,
      indexedPages: gsc.coverage.indexed,
      pagesWithErrors: gsc.coverage.errors,
    },
    analytics: {
      connected: ga.connected,
      totals: ga.totals,
      syncedAt: ga.syncedAt,
    },
    coreWebVitals: cwv,
    integrations: {
      gtm: integrations.gtm.status,
      clarity: integrations.clarity.status,
      metaPixel: integrations.metaPixel.status,
      bing: integrations.bing.status,
    },
    counts: {
      keywordsTracked: keywords,
      open404: notFoundOpen,
      activeRedirects: redirectsActive,
      missingMeta: Array.isArray((aiDash as { missingMeta?: unknown[] } | null)?.missingMeta)
        ? (aiDash as { missingMeta: unknown[] }).missingMeta.length
        : null,
    },
    robotsPreview: typeof robotsTxt === "string" ? robotsTxt.slice(0, 400) : null,
    sitemapEnabled: sitemapCfg,
    health: {
      googleConnected: google.connected,
      googleConfigured: google.configured,
      gscSynced: Boolean(gsc.syncedAt),
      gaSynced: Boolean(ga.syncedAt),
    },
  };
}

async function exportRedirects() {
  const items = await RedirectModel.find({}).sort({ createdAt: -1 }).lean();
  return items.map((r) => ({
    fromPath: r.fromPath,
    toPath: r.toPath,
    statusCode: r.statusCode,
    isActive: r.isActive,
    note: r.note || "",
  }));
}

async function importRedirects(
  rows: Array<{ fromPath: string; toPath: string; statusCode?: number; isActive?: boolean; note?: string }>,
) {
  let created = 0;
  let updated = 0;
  for (const row of rows) {
    if (!row.fromPath || !row.toPath) continue;
    const existing = await RedirectModel.findOne({ fromPath: row.fromPath });
    if (existing) {
      existing.toPath = row.toPath;
      existing.statusCode = (row.statusCode || 301) as RedirectType;
      if (row.isActive != null) existing.isActive = row.isActive;
      if (row.note != null) existing.note = row.note;
      await existing.save();
      updated += 1;
    } else {
      await RedirectModel.create({
        fromPath: row.fromPath,
        toPath: row.toPath,
        statusCode: (row.statusCode || 301) as RedirectType,
        isActive: row.isActive !== false,
        note: row.note,
      });
      created += 1;
    }
  }
  return { created, updated, total: rows.length };
}

async function ignoreNotFound(id: string) {
  return NotFoundLogModel.findByIdAndUpdate(
    id,
    { $set: { ignored: true, resolved: true, notes: "Ignored from SEO Center" } },
    { new: true },
  );
}

async function deleteNotFound(id: string) {
  await NotFoundLogModel.findByIdAndDelete(id);
  return { deleted: true };
}

export const seoCenterService = {
  getDashboard,
  getIntegrations,
  updateIntegrations,
  exportRedirects,
  importRedirects,
  ignoreNotFound,
  deleteNotFound,
  keywordTrackingService,
  googleOAuthService,
  googleSearchConsoleService,
  googleAnalyticsDataService,
  pageSpeedService,
  seoService,
  robotsService,
  sitemapService,
  redirectService,
};
