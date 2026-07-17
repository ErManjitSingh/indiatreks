"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { SeoPanel, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { centerDashboard } from "@/lib/api/seo-center";

type Dash = Record<string, unknown>;

function num(v: unknown) {
  return typeof v === "number" ? v : Number(v || 0);
}

function pct(v: unknown) {
  const n = num(v);
  return `${(n * (n <= 1 ? 100 : 1)).toFixed(1)}%`;
}

export default function SeoCenterDashboardPage() {
  const [data, setData] = useState<Dash | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await centerDashboard());
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load SEO Center"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <p className="text-sm text-[#6b7280]">Loading SEO Center…</p>;
  }

  const gsc = (data?.searchConsole || {}) as Record<string, unknown>;
  const totals = (gsc.totals || {}) as Record<string, unknown>;
  const ga = ((data?.analytics as Record<string, unknown>)?.totals || {}) as Record<string, unknown>;
  const counts = (data?.counts || {}) as Record<string, unknown>;
  const health = (data?.health || {}) as Record<string, unknown>;
  const integrations = (data?.integrations || {}) as Record<string, unknown>;
  const cwv = (data?.coreWebVitals || {}) as Record<string, unknown>;
  const metrics = (cwv.metrics || {}) as Record<string, unknown>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-bold">Dashboard</h2>
          <p className="text-sm text-[#6b7280]">
            Google {health.googleConnected ? "connected" : "not connected"} · GSC{" "}
            {health.gscSynced ? "synced" : "pending"} · GA {health.gaSynced ? "synced" : "pending"}
          </p>
        </div>
        <Button variant="outline" onClick={() => void load()}>
          Refresh
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SeoStatCard label="Clicks (GSC)" value={num(totals.clicks).toLocaleString()} />
        <SeoStatCard label="Impressions" value={num(totals.impressions).toLocaleString()} />
        <SeoStatCard label="Avg CTR" value={pct(totals.ctr)} />
        <SeoStatCard label="Avg Position" value={num(totals.position).toFixed(1)} />
        <SeoStatCard label="Sessions (GA)" value={num(ga.sessions).toLocaleString()} />
        <SeoStatCard label="Organic Users" value={num(ga.organicUsers).toLocaleString()} />
        <SeoStatCard label="Organic Sessions" value={num(ga.organicSessions).toLocaleString()} />
        <SeoStatCard label="Realtime Users" value={num(ga.realtimeUsers).toLocaleString()} />
        <SeoStatCard label="Open 404s" value={num(counts.open404)} />
        <SeoStatCard label="Keywords Tracked" value={num(counts.keywordsTracked)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SeoPanel title="Connection health" description="OAuth and sync status">
          <ul className="space-y-2 text-sm text-[#374151]">
            <li>Google account: {String((data?.google as Record<string, unknown> | undefined)?.email || "—")}</li>
            <li>Google OAuth configured: {String(Boolean(health.googleConfigured))}</li>
            <li>Google connected: {String(Boolean(health.googleConnected))}</li>
            <li>Indexed pages (GSC estimate): {num(gsc.indexedPages)}</li>
            <li>Pages with errors: {num(gsc.pagesWithErrors)}</li>
            <li>Submitted sitemap: {String(gsc.submittedSitemap || "—")}</li>
            <li>Coverage: {String(gsc.coverageStatus || "unknown")}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="primary">
              <Link href="/admin/seo-center/search-console">Open Search Console</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/seo-center/analytics">Open Analytics</Link>
            </Button>
          </div>
        </SeoPanel>

        <SeoPanel title="Integrations" description="Tag managers and pixels">
          <ul className="space-y-2 text-sm text-[#374151]">
            <li>GTM: {String(integrations.gtm)}</li>
            <li>Clarity: {String(integrations.clarity)}</li>
            <li>Meta Pixel: {String(integrations.metaPixel)}</li>
            <li>Bing Webmaster: {String(integrations.bing)}</li>
            <li>
              LCP: {metrics.lcp != null ? `${Math.round(num(metrics.lcp))} ms` : "—"} · CLS:{" "}
              {metrics.cls != null ? num(metrics.cls).toFixed(3) : "—"}
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/seo-center/core-web-vitals">Core Web Vitals</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/seo-center/audit">Run SEO Audit</Link>
            </Button>
          </div>
        </SeoPanel>
      </div>
    </div>
  );
}
