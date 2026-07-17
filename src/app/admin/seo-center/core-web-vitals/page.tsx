"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { centerCwv, centerCwvRun } from "@/lib/api/seo-center";

function num(v: unknown) {
  return typeof v === "number" ? v : Number(v || 0);
}

export default function CoreWebVitalsPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [url, setUrl] = useState("https://treks.indiaholidaydestination.com/");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await centerCwv({ strategy }));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load CWV"));
    }
  }, [strategy]);

  useEffect(() => {
    void load();
  }, [load]);

  async function run() {
    setBusy(true);
    try {
      const res = await centerCwvRun({ url, strategy });
      setData(res);
      toast.success("PageSpeed refresh complete");
    } catch (err) {
      toast.error(getErrorMessage(err, "PageSpeed run failed"));
    } finally {
      setBusy(false);
    }
  }

  const metrics = (data?.metrics || {}) as Record<string, unknown>;
  const scores = (data?.scores || {}) as Record<string, unknown>;

  return (
    <div className="space-y-6">
      <SeoPanel
        title="Core Web Vitals"
        description="LCP, CLS, INP, FCP, TTFB via Google PageSpeed Insights API"
        action={
          <Button variant="primary" disabled={busy} onClick={() => void run()}>
            Run PageSpeed
          </Button>
        }
      >
        <div className="grid gap-3 md:grid-cols-3">
          <AdminField label="URL" className="md:col-span-2">
            <input className={adminInputClass} value={url} onChange={(e) => setUrl(e.target.value)} />
          </AdminField>
          <AdminField label="Strategy">
            <select
              className={adminInputClass}
              value={strategy}
              onChange={(e) => setStrategy(e.target.value as "mobile" | "desktop")}
            >
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
            </select>
          </AdminField>
        </div>
      </SeoPanel>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <SeoStatCard
          label="PageSpeed Score"
          value={
            scores.performance != null
              ? Number(scores.performance)
              : data?.pageSpeedScore != null
                ? Number(data.pageSpeedScore)
                : "—"
          }
        />
        <SeoStatCard label="LCP" value={metrics.lcp != null ? `${Math.round(num(metrics.lcp))} ms` : "—"} />
        <SeoStatCard label="CLS" value={metrics.cls != null ? num(metrics.cls).toFixed(3) : "—"} />
        <SeoStatCard label="INP" value={metrics.inp != null ? `${Math.round(num(metrics.inp))} ms` : "—"} />
        <SeoStatCard label="FCP" value={metrics.fcp != null ? `${Math.round(num(metrics.fcp))} ms` : "—"} />
        <SeoStatCard label="TTFB" value={metrics.ttfb != null ? `${Math.round(num(metrics.ttfb))} ms` : "—"} />
      </div>
    </div>
  );
}
