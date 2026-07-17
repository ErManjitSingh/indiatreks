"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  CircleDashed,
  Eye,
  Gauge,
  Globe2,
  KeyRound,
  MousePointerClick,
  Search,
  Tags,
  Users,
} from "lucide-react";

import {
  SeoMetricCard,
  SeoPanel,
  SeoPerformanceChart,
  SeoSimpleTable,
} from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { centerDashboard } from "@/lib/api/seo-center";
import { cn } from "@/lib/utils";

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
  const topQueries = (gsc.topQueries || []) as Array<Record<string, unknown>>;

  const metricCards = [
    {
      label: "Clicks (GSC)",
      value: num(totals.clicks).toLocaleString(),
      icon: MousePointerClick,
      iconTone: "bg-[#DCFCE7] text-[#16A34A]",
      spark: "green" as const,
    },
    {
      label: "Impressions",
      value: num(totals.impressions).toLocaleString(),
      icon: Eye,
      iconTone: "bg-[#DBEAFE] text-[#2563EB]",
      spark: "blue" as const,
    },
    {
      label: "Avg CTR",
      value: pct(totals.ctr),
      icon: BarChart3,
      iconTone: "bg-[#FFEDD5] text-[#EA580C]",
      spark: "orange" as const,
    },
    {
      label: "Avg Position",
      value: num(totals.position).toFixed(1),
      icon: Search,
      iconTone: "bg-[#F3E8FF] text-[#9333EA]",
      spark: "purple" as const,
    },
    {
      label: "Sessions (GA)",
      value: num(ga.sessions).toLocaleString(),
      icon: Users,
      iconTone: "bg-[#CCFBF1] text-[#0F766E]",
      spark: "teal" as const,
    },
    {
      label: "Organic Users",
      value: num(ga.organicUsers).toLocaleString(),
      icon: Users,
      iconTone: "bg-[#DCFCE7] text-[#16A34A]",
      spark: "green" as const,
    },
    {
      label: "Keywords Tracked",
      value: num(counts.keywordsTracked).toLocaleString(),
      icon: KeyRound,
      iconTone: "bg-[#FEE2E2] text-[#DC2626]",
      spark: "red" as const,
    },
    {
      label: "Open 404s",
      value: num(counts.open404).toLocaleString(),
      icon: CircleDashed,
      iconTone: "bg-[#FFEDD5] text-[#EA580C]",
      spark: "orange" as const,
    },
  ];

  const connectionRows = [
    {
      name: "Google Search Console",
      ok: Boolean(health.googleConnected && health.gscSynced),
      detail: health.gscSynced ? "Connected" : health.googleConnected ? "Pending sync" : "Not connected",
    },
    {
      name: "Google Analytics",
      ok: Boolean(health.gaSynced),
      detail: health.gaSynced ? "Connected" : "Pending",
    },
    {
      name: "Google Tag Manager",
      ok: String(integrations.gtm || "").toLowerCase().includes("on") || Boolean(integrations.gtm),
      detail: String(integrations.gtm || "Pending"),
    },
  ];

  const integrationTiles = [
    { href: "/admin/seo-center/gtm", label: "GTM", icon: Tags },
    { href: "/admin/seo-center/meta-pixel", label: "Meta Pixel", icon: MousePointerClick },
    { href: "/admin/seo-center/clarity", label: "Clarity", icon: Eye },
    { href: "/admin/seo-center/bing", label: "Bing", icon: Globe2 },
    { href: "/admin/seo-center/core-web-vitals", label: "PageSpeed", icon: Gauge },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#6B7280]">
          Google {health.googleConnected ? "connected" : "not connected"} · GSC{" "}
          {health.gscSynced ? "synced" : "pending"} · GA {health.gaSynced ? "synced" : "pending"}
        </p>
        <Button variant="outline" onClick={() => void load()}>
          Refresh
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <SeoMetricCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
            iconTone={card.iconTone}
            spark={card.spark}
            hint="No change"
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_280px]">
        <SeoPerformanceChart />

        <SeoPanel
          title="Top Queries"
          action={
            <Button asChild variant="outline" className="h-8 px-2.5 text-xs">
              <Link href="/admin/seo-center/search-console">View All</Link>
            </Button>
          }
        >
          <SeoSimpleTable
            headers={["Query", "Clicks", "Impr.", "CTR", "Pos."]}
            empty="No data available yet"
            rows={topQueries.slice(0, 8).map((q) => [
              String(q.query || ""),
              num(q.clicks),
              num(q.impressions),
              pct(q.ctr),
              num(q.position).toFixed(1),
            ])}
          />
        </SeoPanel>

        <div className="space-y-4">
          <SeoPanel title="Connection Health">
            <ul className="space-y-3">
              {connectionRows.map((row) => (
                <li key={row.name} className="flex items-start gap-2.5 text-sm">
                  {row.ok ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
                  ) : (
                    <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden />
                  )}
                  <div>
                    <p className="font-semibold text-[#111827]">{row.name}</p>
                    <p className={cn("text-xs", row.ok ? "text-[#16A34A]" : "text-[#D97706]")}>
                      {row.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild variant="primary" className="mt-4 w-full">
              <Link href="/admin/seo-center/search-console">View All Connections</Link>
            </Button>
          </SeoPanel>

          <SeoPanel title="Integrations">
            <div className="grid grid-cols-3 gap-2">
              {integrationTiles.map((tile) => {
                const Icon = tile.icon;
                return (
                  <Link
                    key={tile.href}
                    href={tile.href}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-[#E8ECF1] bg-[#F9FAFB] px-2 py-3 text-center transition hover:border-[#2D5A27]/30 hover:bg-white"
                  >
                    <Icon className="h-4 w-4 text-[#2D5A27]" aria-hidden />
                    <span className="text-[10px] font-semibold text-[#374151]">{tile.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/admin/seo-center/gtm"
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#C9DEC6] bg-[#F0FDF4] px-2 py-3 text-center text-[10px] font-bold text-[#2D5A27]"
              >
                + Add
              </Link>
            </div>
          </SeoPanel>
        </div>
      </div>
    </div>
  );
}
