import { google, type searchconsole_v1 } from "googleapis";
import { env } from "../config/env";
import { googleOAuthService } from "./googleOAuth.service";
import { SearchConsoleCacheModel } from "../models/SearchConsoleCache.model";
import { SearchConsoleModel } from "../models/SearchConsole.model";
import { SeoSettingsModel } from "../models/SeoSettings.model";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

type GscSite = searchconsole_v1.Schema$WmxSite;

const DEFAULT_GSC_PROPERTY = "sc-domain:treks.indiaholidaydestination.com";

function dateNDaysAgo(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function hostFromProperty(value: string) {
  if (value.startsWith("sc-domain:")) return value.slice("sc-domain:".length).toLowerCase();
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return value.replace(/^https?:\/\//i, "").replace(/\/$/, "").toLowerCase();
  }
}

function wrapGoogleError(err: unknown, fallbackCode = "GSC_API_ERROR"): never {
  const message = err instanceof Error ? err.message : "Google Search Console request failed";
  const lower = message.toLowerCase();
  if (lower.includes("sufficient permission") || lower.includes("forbidden")) {
    throw new ApiError(403, message, "GSC_PERMISSION_DENIED");
  }
  if (lower.includes("not found") || lower.includes("invalid site")) {
    throw new ApiError(404, message, "GSC_PROPERTY_NOT_FOUND");
  }
  throw new ApiError(502, message, fallbackCode);
}

function pickSiteFromList(sites: GscSite[], preferred?: string | null) {
  if (!sites.length) return null;

  if (preferred) {
    const exact = sites.find((site) => site.siteUrl === preferred);
    if (exact?.siteUrl) return exact.siteUrl;

    const preferredHost = hostFromProperty(preferred);
    const byHost = sites.find((site) => site.siteUrl && hostFromProperty(site.siteUrl) === preferredHost);
    if (byHost?.siteUrl) return byHost.siteUrl;
  }

  const siteHost = hostFromProperty(env.FRONTEND_URL || DEFAULT_GSC_PROPERTY);
  const domainProperty = sites.find((site) => site.siteUrl === `sc-domain:${siteHost}`);
  if (domainProperty?.siteUrl) return domainProperty.siteUrl;

  const urlProperty = sites.find((site) => site.siteUrl && hostFromProperty(site.siteUrl) === siteHost);
  if (urlProperty?.siteUrl) return urlProperty.siteUrl;

  const verified = sites.find(
    (site) =>
      site.siteUrl &&
      site.permissionLevel &&
      !site.permissionLevel.toLowerCase().includes("unverified"),
  );
  if (verified?.siteUrl) return verified.siteUrl;

  return sites[0]?.siteUrl || null;
}

async function getPreferredProperty() {
  const status = await googleOAuthService.getStatus();
  if (status.searchConsoleProperty) return status.searchConsoleProperty;
  const sc = await SearchConsoleModel.findOne({ key: "default" }).lean();
  if (sc?.propertyUrl) return sc.propertyUrl;
  const settings = await SeoSettingsModel.findOne({ key: "global" }).lean();
  return settings?.siteUrl || DEFAULT_GSC_PROPERTY;
}

async function listSitesWithClient(client: InstanceType<typeof google.auth.OAuth2>) {
  const webmasters = google.searchconsole({ version: "v1", auth: client });
  try {
    const res = await webmasters.sites.list();
    return res.data.siteEntry || [];
  } catch (err) {
    wrapGoogleError(err, "GSC_SITES_LIST_FAILED");
  }
}

async function resolvePropertyFromSites(sites: GscSite[]) {
  const preferred = await getPreferredProperty();
  const siteUrl = pickSiteFromList(sites, preferred);

  if (!siteUrl) {
    throw new ApiError(
      403,
      "No Search Console property is available for this Google account.",
      "GSC_NO_PROPERTY",
      { availableSites: sites.map((site) => site.siteUrl).filter(Boolean) },
    );
  }

  if (siteUrl !== preferred) {
    await googleOAuthService.updatePropertyLinks({ searchConsoleProperty: siteUrl });
    await SearchConsoleModel.findOneAndUpdate(
      { key: "default" },
      { $set: { propertyUrl: siteUrl } },
      { upsert: true },
    );
  }

  return siteUrl;
}

async function resolveProperty() {
  const { client } = await googleOAuthService.getAuthedClient();
  const sites = await listSitesWithClient(client);
  return resolvePropertyFromSites(sites);
}

async function getCached() {
  return SearchConsoleCacheModel.findOne({ key: "default" }).lean();
}

async function syncSearchAnalytics(rangeDays = 28) {
  const { client } = await googleOAuthService.getAuthedClient();
  const webmasters = google.searchconsole({ version: "v1", auth: client });
  const sites = await listSitesWithClient(client);
  const siteUrl = await resolvePropertyFromSites(sites);
  const startDate = dateNDaysAgo(rangeDays);
  const endDate = today();

  try {
    const [totalsRes, pagesRes, queriesRes, queryPageRes, sitemapsRes] = await Promise.all([
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
          connectedProperties: sites.map((site) => ({
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

  const { GoogleAccountModel } = await import("../models/GoogleAccount.model");
  await GoogleAccountModel.updateOne({ key: "default" }, { $unset: { lastError: 1 } });

  return doc;
  } catch (err) {
    wrapGoogleError(err, "GSC_SYNC_FAILED");
  }
}

async function getDashboard(rangeDays = 28, forceSync = false) {
  const status = await googleOAuthService.getStatus();
  let cache = await getCached();
  let connectedProperties: Array<Record<string, unknown>> = Array.isArray(cache?.raw?.connectedProperties)
    ? (cache?.raw?.connectedProperties as Array<Record<string, unknown>>)
    : [];

  if (status.connected) {
    try {
      const sites = await listSites();
      connectedProperties = sites.map((site) => ({
        siteUrl: site.siteUrl || "",
        permissionLevel: site.permissionLevel || "",
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to list Search Console properties";
      logger.warn("Search Console property list failed", { message });
    }

    if (forceSync || !cache || cache.source === "empty") {
      try {
        const synced = await syncSearchAnalytics(rangeDays);
        cache = synced.toObject() as typeof cache;
        connectedProperties = Array.isArray(cache?.raw?.connectedProperties)
          ? (cache?.raw?.connectedProperties as Array<Record<string, unknown>>)
          : connectedProperties;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Sync failed";
        logger.warn("Search Console sync failed", { message });
        await GoogleAccountModelSafeSetError(message);
      }
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
    connectedProperties,
    lastError: status.lastError || null,
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
  try {
    const res = await webmasters.sitemaps.list({ siteUrl });
    return { siteUrl, sitemaps: res.data.sitemap || [] };
  } catch (err) {
    wrapGoogleError(err, "GSC_SITEMAPS_LIST_FAILED");
  }
}

async function submitSitemap(sitemapUrl: string) {
  const { client } = await googleOAuthService.getAuthedClient();
  const siteUrl = await resolveProperty();
  const webmasters = google.searchconsole({ version: "v1", auth: client });
  try {
    await webmasters.sitemaps.submit({ siteUrl, feedpath: sitemapUrl });
  } catch (err) {
    wrapGoogleError(err, "GSC_SITEMAP_SUBMIT_FAILED");
  }

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

/** Notify Google that a URL was updated (Indexing API). Requires indexing OAuth scope. */
async function notifyUrlUpdated(url: string) {
  const { client } = await googleOAuthService.getAuthedClient();
  const indexing = google.indexing({ version: "v3", auth: client });
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: "URL_UPDATED",
      },
    });
    return {
      url,
      type: "URL_UPDATED",
      notifyTime: res.data.urlNotificationMetadata?.latestUpdate?.notifyTime || null,
      raw: res.data,
    };
  } catch (err) {
    wrapGoogleError(err, "GSC_INDEXING_NOTIFY_FAILED");
  }
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
    wrapGoogleError(err, "URL_INSPECTION_FAILED");
  }
}

async function listSites() {
  const { client } = await googleOAuthService.getAuthedClient();
  return listSitesWithClient(client);
}

export const googleSearchConsoleService = {
  getDashboard,
  syncSearchAnalytics,
  getCached,
  listSitemaps,
  submitSitemap,
  notifyUrlUpdated,
  inspectUrl,
  listSites,
  resolveProperty,
};
