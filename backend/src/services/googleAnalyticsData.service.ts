import { google } from "googleapis";
import { googleOAuthService } from "./googleOAuth.service";
import { AnalyticsCacheModel } from "../models/AnalyticsCache.model";
import { AnalyticsConfigModel } from "../models/AnalyticsConfig.model";
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

async function resolvePropertyId() {
  const status = await googleOAuthService.getStatus();
  if (status.ga4PropertyId) return status.ga4PropertyId.replace(/^properties\//, "");
  const cfg = await AnalyticsConfigModel.findOne({ key: "default" }).lean();
  return (cfg?.ga4?.propertyId || "").replace(/^properties\//, "");
}

async function syncAnalytics(rangeDays = 28) {
  const propertyId = await resolvePropertyId();
  if (!propertyId) {
    throw new ApiError(
      400,
      "GA4 property ID is not set. Save it under Google Analytics settings.",
      "GA4_PROPERTY_MISSING",
    );
  }

  const { client } = await googleOAuthService.getAuthedClient();
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth: client });
  const startDate = dateNDaysAgo(rangeDays);
  const endDate = today();
  const property = `properties/${propertyId}`;

  const [totalsRes, organicRes, pagesRes, realtimeRes] = await Promise.all([
    analyticsdata.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "newUsers" },
          { name: "conversions" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
      },
    }),
    analyticsdata.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }, { name: "totalUsers" }],
        dimensionFilter: {
          filter: {
            fieldName: "sessionDefaultChannelGroup",
            stringFilter: { value: "Organic Search" },
          },
        },
      },
    }),
    analyticsdata.properties.runReport({
      property,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
        limit: "25",
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      },
    }),
    analyticsdata.properties.runRealtimeReport({
      property,
      requestBody: {
        metrics: [{ name: "activeUsers" }],
      },
    }),
  ]);

  const values = totalsRes.data.rows?.[0]?.metricValues || [];
  const totals = {
    sessions: Number(values[0]?.value || 0),
    users: Number(values[1]?.value || 0),
    newUsers: Number(values[2]?.value || 0),
    organicUsers: Number(organicRes.data.rows?.[0]?.metricValues?.[1]?.value || 0),
    conversions: Number(values[3]?.value || 0),
    bounceRate: Number(values[4]?.value || 0),
    averageEngagementSeconds: Number(values[5]?.value || 0),
    organicSessions: Number(organicRes.data.rows?.[0]?.metricValues?.[0]?.value || 0),
    realtimeUsers: Number(realtimeRes.data.rows?.[0]?.metricValues?.[0]?.value || 0),
  };

  const topPages = (pagesRes.data.rows || []).map((row) => ({
    page: row.dimensionValues?.[0]?.value || "",
    sessions: Number(row.metricValues?.[0]?.value || 0),
    users: Number(row.metricValues?.[1]?.value || 0),
    bounceRate: Number(row.metricValues?.[2]?.value || 0),
    engagementSeconds: Number(row.metricValues?.[3]?.value || 0),
  }));

  return AnalyticsCacheModel.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        propertyId,
        rangeDays,
        startDate,
        endDate,
        totals,
        topPages,
        syncedAt: new Date(),
        source: "google",
      },
    },
    { upsert: true, new: true },
  );
}

async function getDashboard(rangeDays = 28, forceSync = false) {
  const status = await googleOAuthService.getStatus();
  const propertyId = await resolvePropertyId();
  let cache = await AnalyticsCacheModel.findOne({ key: "default" }).lean();

  if (status.connected && propertyId && (forceSync || !cache || cache.source === "empty")) {
    try {
      const synced = await syncAnalytics(rangeDays);
      cache = synced.toObject() as typeof cache;
    } catch (err) {
      logger.warn("GA4 sync failed", {
        message: err instanceof Error ? err.message : "unknown",
      });
    }
  }

  return {
    connected: status.connected,
    configured: status.configured,
    propertyId: propertyId || null,
    syncedAt: cache?.syncedAt || null,
    source: cache?.source || "empty",
    rangeDays: cache?.rangeDays || rangeDays,
    totals: cache?.totals || {
      sessions: 0,
      users: 0,
      newUsers: 0,
      organicUsers: 0,
      organicSessions: 0,
      realtimeUsers: 0,
      conversions: 0,
      bounceRate: 0,
      averageEngagementSeconds: 0,
    },
    topPages: cache?.topPages || [],
  };
}

export const googleAnalyticsDataService = {
  getDashboard,
  syncAnalytics,
  resolvePropertyId,
};
