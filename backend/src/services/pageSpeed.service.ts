import { env } from "../config/env";
import { SeoReportModel } from "../models/SeoReport.model";
import { SeoSettingsModel } from "../models/SeoSettings.model";
import { ApiError } from "../utils/ApiError";

export type CoreWebVitalsResult = {
  url: string;
  strategy: "mobile" | "desktop";
  scores: {
    performance: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    seo: number | null;
  };
  metrics: {
    lcp: number | null;
    cls: number | null;
    inp: number | null;
    fcp: number | null;
    ttfb: number | null;
  };
  pageSpeedScore: number | null;
  fetchedAt: string;
  source: "pagespeed" | "cache" | "empty";
};

function pickMetric(audits: Record<string, { numericValue?: number }> | undefined, id: string) {
  const value = audits?.[id]?.numericValue;
  return typeof value === "number" ? value : null;
}

async function resolveUrl(url?: string) {
  if (url) return url;
  const settings = await SeoSettingsModel.findOne({ key: "global" }).lean();
  return settings?.siteUrl || env.FRONTEND_URL || "https://treks.indiaholidaydestination.com";
}

async function runPageSpeed(url?: string, strategy: "mobile" | "desktop" = "mobile") {
  const target = await resolveUrl(url);
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", target);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.set("category", "PERFORMANCE");
  endpoint.searchParams.append("category", "ACCESSIBILITY");
  endpoint.searchParams.append("category", "BEST_PRACTICES");
  endpoint.searchParams.append("category", "SEO");
  if (env.GOOGLE_PAGESPEED_API_KEY) {
    endpoint.searchParams.set("key", env.GOOGLE_PAGESPEED_API_KEY);
  }

  const res = await fetch(endpoint.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(502, `PageSpeed API error: ${text.slice(0, 200)}`, "PAGESPEED_FAILED");
  }
  const data = (await res.json()) as {
    lighthouseResult?: {
      categories?: Record<string, { score?: number }>;
      audits?: Record<string, { numericValue?: number }>;
    };
  };

  const cats = data.lighthouseResult?.categories || {};
  const audits = data.lighthouseResult?.audits;
  const performance = cats.performance?.score != null ? Math.round(cats.performance.score * 100) : null;

  const result: CoreWebVitalsResult = {
    url: target,
    strategy,
    scores: {
      performance,
      accessibility: cats.accessibility?.score != null ? Math.round(cats.accessibility.score * 100) : null,
      bestPractices:
        cats["best-practices"]?.score != null ? Math.round(cats["best-practices"].score * 100) : null,
      seo: cats.seo?.score != null ? Math.round(cats.seo.score * 100) : null,
    },
    metrics: {
      lcp: pickMetric(audits, "largest-contentful-paint"),
      cls: pickMetric(audits, "cumulative-layout-shift"),
      inp: pickMetric(audits, "interaction-to-next-paint") ?? pickMetric(audits, "experimental-interaction-to-next-paint"),
      fcp: pickMetric(audits, "first-contentful-paint"),
      ttfb: pickMetric(audits, "server-response-time"),
    },
    pageSpeedScore: performance,
    fetchedAt: new Date().toISOString(),
    source: "pagespeed",
  };

  await SeoReportModel.create({
    type: "core_web_vitals",
    title: `CWV ${strategy} — ${target}`,
    summary: `Performance ${performance ?? "n/a"}`,
    payload: result,
    generatedAt: new Date(),
  });

  return result;
}

async function getLatest(strategy: "mobile" | "desktop" = "mobile") {
  const latest = await SeoReportModel.findOne({ type: "core_web_vitals", "payload.strategy": strategy })
    .sort({ createdAt: -1 })
    .lean();
  if (!latest?.payload) {
    return {
      url: await resolveUrl(),
      strategy,
      scores: { performance: null, accessibility: null, bestPractices: null, seo: null },
      metrics: { lcp: null, cls: null, inp: null, fcp: null, ttfb: null },
      pageSpeedScore: null,
      fetchedAt: null,
      source: "empty" as const,
    };
  }
  return { ...(latest.payload as CoreWebVitalsResult), source: "cache" as const };
}

export const pageSpeedService = {
  runPageSpeed,
  getLatest,
};
