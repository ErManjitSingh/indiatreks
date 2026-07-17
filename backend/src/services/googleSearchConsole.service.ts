import { google } from "googleapis";
import { googleOAuthService } from "./googleOAuth.service";
import { SearchConsoleCacheModel } from "../models/SearchConsoleCache.model";
import { SearchConsoleModel } from "../models/SearchConsole.model";
import { SeoSettingsModel } from "../models/SeoSettings.model";
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

async function resolveProperty() {
  const status = await googleOAuthService.getStatus();
  if (status.searchConsoleProperty) return status.searchConsoleProperty;
  const sc = await SearchConsoleModel.findOne({ key: "default" }).lean();
  if (sc?.propertyUrl) return sc.propertyUrl;
  const settings = await SeoSettingsModel.findOne({ key: "global" }).lean();
  return settings?.siteUrl || "https://treks.indiaholidaydestination.com";
}

async function getCached() {
  return SearchConsoleCacheModel.findOne({ key: "default" }).lean();
}

async function syncSearchAnalytics(rangeDays = 28) {
  const { client } = await googleOAuthService.getAuthedClient();
  const siteUrl = await resolveProperty();
  const webmasters = google.searchconsole({ version: "v1", auth: client });
  const startDate = dateNDaysAgo(rangeDays);
  const endDate = today();

  const [totalsRes, pagesRes, queriesRes, queryPageRes, sitemapsRes, sitesRes] = await Promise.all([
    webmasters.searchanalytics.query({
      siteUrl,
      requestBody: { startDate, endDate, dimensions: [] },
    }),
    webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 50,
      },
    }),
    webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 50,
      },
    }),
    webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query", "page"],
        rowLimit: 250,
      },
    }),
    webmasters.sitemaps.list({ siteUrl }).catch(() => ({ data: { sitemap: [] } })),
    webmasters.sites.list().catch(() => ({ data: { siteEntry: [] } })),
  ]);

  const totalRow = totalsRes.data.rows?.[0];
  const totals = {
    clicks: totalRow?.clicks || 0,
    impressions: totalRow?.impressions || 0,
    ctr: totalRow?.ctr || 0,
    position: totalRow?.position || 0,
  };

  const topPages = (pagesRes.data.rows || []).map((row) => ({
    page: row.keys?.[0] || "",
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));

  const landingByQuery = new Map<string, { page: string; clicks: number }>();
  for (const row of queryPageRes.data.rows || []) {
    const query = row.keys?.[0] || "";
    const page = row.keys?.[1] || "";
    const clicks = row.clicks || 0;
    const existing = landingByQuery.get(query);
    if (!existing || clicks > existing.clicks) {
      landingByQuery.set(query, { page, clicks });
    }
  }

  const topQueries = (queriesRes.data.rows || []).map((row) => {
    const query = row.keys?.[0] || "";
    return {
      query,
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
      landingPage: landingByQuery.get(query)?.page || "",
    };
  });

  const sitemaps = (sitemapsRes.data.sitemap || []).map((s) => ({
    path: s.path || "",
    lastSubmitted: s.lastSubmitted || undefined,
    isPending: Boolean(s.isPending),
    warnings: Number(s.warnings || 0),
    errors: Number(s.errors || 0),
    contents: (s.contents || []).map((c) => ({
      type: c.type || undefined,
      submitted: Number(c.submitted || 0),
      indexed: Number(c.indexed || 0),
    })),
  }));

  const coverage = {
    indexed: sitemaps.reduce((sum, s) => sum + (s.contents?.[0]?.indexed || 0), 0),
    notIndexed: 0,
    blocked: 0,
    noindex: 0,
    crawled: 0,
    discovered: 0,
    errors: sitemaps.reduce((sum, s) => sum + (s.errors || 0), 0),
    excluded: 0,
  };

  const doc = await SearchConsoleCacheModel.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        propertyUrl: siteUrl,
        rangeDays,
        startDate,
        endDate,
        totals,
        topPages,
        topQueries,
        coverage,
        sitemaps,
        raw: {
          connectedProperties: (sitesRes.data.siteEntry || []).map((site) => ({
            siteUrl: site.siteUrl || "",
            permissionLevel: site.permissionLevel || "",
          })),
        },
        syncedAt: new Date(),
        source: "google",
      },
    },
    { upsert: true, new: true },
  );

  await SearchConsoleModel.findOneAndUpdate(
    { key: "default" },
    { $set: { propertyUrl: siteUrl, lastSyncAt: new Date(), isVerified: true } },
    { upsert: true },
  );

  return doc;
}

async function getDashboard(rangeDays = 28, forceSync = false) {
  const status = await googleOAuthService.getStatus();
  let cache = await getCached();

  if (status.connected && (forceSync || !cache || cache.source === "empty")) {
    try {
      const synced = await syncSearchAnalytics(rangeDays);
      cache = synced.toObject() as typeof cache;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sync failed";
      logger.warn("Search Console sync failed", { message });
      await GoogleAccountModelSafeSetError(message);
    }
  }

  return {
    connected: status.connected,
    configured: status.configured,
    propertyUrl: cache?.propertyUrl || status.searchConsoleProperty || null,
    syncedAt: cache?.syncedAt || null,
    source: cache?.source || "empty",
    rangeDays: cache?.rangeDays || rangeDays,
    totals: cache?.totals || { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    coverage: cache?.coverage || {
      indexed: 0,
      notIndexed: 0,
      blocked: 0,
      noindex: 0,
      crawled: 0,
      discovered: 0,
      errors: 0,
      excluded: 0,
    },
    topPages: cache?.topPages || [],
    topQueries: cache?.topQueries || [],
    sitemaps: cache?.sitemaps || [],
    connectedProperties: Array.isArray(cache?.raw?.connectedProperties)
      ? (cache?.raw?.connectedProperties as Array<Record<string, unknown>>)
      : [],
    submittedSitemap: (cache?.sitemaps || [])[0]?.path || null,
    coverageStatus:
      (cache?.coverage?.errors || 0) > 0
        ? "errors"
        : (cache?.coverage?.indexed || 0) > 0
          ? "healthy"
          : "unknown",
  };
}

async function GoogleAccountModelSafeSetError(message: string) {
  const { GoogleAccountModel } = await import("../models/GoogleAccount.model");
  await GoogleAccountModel.updateOne({ key: "default" }, { $set: { lastError: message } });
}

async function listSitemaps() {
  const { client } = await googleOAuthService.getAuthedClient();
  const siteUrl = await resolveProperty();
  const webmasters = google.searchconsole({ version: "v1", auth: client });
  const res = await webmasters.sitemaps.list({ siteUrl });
  return { siteUrl, sitemaps: res.data.sitemap || [] };
}

async function submitSitemap(sitemapUrl: string) {
  const { client } = await googleOAuthService.getAuthedClient();
  const siteUrl = await resolveProperty();
  const webmasters = google.searchconsole({ version: "v1", auth: client });
  await webmasters.sitemaps.submit({ siteUrl, feedpath: sitemapUrl });

  await SearchConsoleModel.findOneAndUpdate(
    { key: "default" },
    {
      $push: {
        sitemapsSubmitted: {
          url: sitemapUrl,
          submittedAt: new Date(),
          status: "success",
          lastCheckedAt: new Date(),
        },
      },
      $set: { lastSyncAt: new Date() },
    },
    { upsert: true },
  );

  return { siteUrl, sitemapUrl, status: "submitted" };
}

async function inspectUrl(inspectionUrl: string) {
  const { client } = await googleOAuthService.getAuthedClient();
  const siteUrl = await resolveProperty();
  const webmasters = google.searchconsole({ version: "v1", auth: client });

  try {
    const res = await webmasters.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl,
        siteUrl,
        languageCode: "en-US",
      },
    });
    const result = res.data.inspectionResult;
    return {
      inspectionUrl,
      siteUrl,
      indexStatus: result?.indexStatusResult?.coverageState || null,
      verdict: result?.indexStatusResult?.verdict || null,
      robotsTxtState: result?.indexStatusResult?.robotsTxtState || null,
      indexingState: result?.indexStatusResult?.indexingState || null,
      lastCrawlTime: result?.indexStatusResult?.lastCrawlTime || null,
      pageFetchState: result?.indexStatusResult?.pageFetchState || null,
      googleCanonical: result?.indexStatusResult?.googleCanonical || null,
      userCanonical: result?.indexStatusResult?.userCanonical || null,
      mobileUsability: result?.mobileUsabilityResult?.verdict || null,
      richResults: result?.richResultsResult?.verdict || null,
      raw: result,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "URL inspection failed";
    throw new ApiError(502, message, "URL_INSPECTION_FAILED");
  }
}

async function listSites() {
  const { client } = await googleOAuthService.getAuthedClient();
  const webmasters = google.searchconsole({ version: "v1", auth: client });
  const res = await webmasters.sites.list();
  return res.data.siteEntry || [];
}

export const googleSearchConsoleService = {
  getDashboard,
  syncSearchAnalytics,
  getCached,
  listSitemaps,
  submitSitemap,
  inspectUrl,
  listSites,
  resolveProperty,
};
