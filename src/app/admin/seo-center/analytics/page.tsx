"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoSimpleTable, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import {
  centerGaDashboard,
  centerGaSync,
  centerIntegrations,
  centerUpdateIntegrations,
} from "@/lib/api/seo-center";
import { siteConfig } from "@/config/site";

function num(v: unknown) {
  return typeof v === "number" ? v : Number(v || 0);
}

function normalizeGa4Id(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function isValidGa4Id(value: string) {
  return /^G-[A-Z0-9]+$/.test(normalizeGa4Id(value));
}

export default function AnalyticsPage() {
  const [dash, setDash] = useState<Record<string, unknown> | null>(null);
  const [measurementId, setMeasurementId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [gtmActive, setGtmActive] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [d, i] = await Promise.all([centerGaDashboard({ days: 28 }), centerIntegrations()]);
      setDash(d);
      const ga4 = (i?.ga4 || {}) as Record<string, unknown>;
      const gtm = (i?.gtm || {}) as Record<string, unknown>;
      setMeasurementId(String(ga4.measurementId || ""));
      setPropertyId(
        String(
          ga4.propertyId ||
            (i?.google as Record<string, unknown> | undefined)?.ga4PropertyId ||
            "",
        ),
      );
      setEnabled(Boolean(ga4.enabled));
      setGtmActive(Boolean(gtm.enabled && gtm.containerId));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load Analytics"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const normalized = useMemo(() => normalizeGa4Id(measurementId), [measurementId]);
  const valid = isValidGa4Id(measurementId);

  async function save() {
    if (enabled && !valid) {
      toast.error("Enter a valid Measurement ID like G-XXXXXXXX");
      return;
    }
    setBusy(true);
    try {
      await centerUpdateIntegrations({
        ga4: {
          enabled: enabled && valid,
          measurementId: valid ? normalized : "",
          propertyId: propertyId.trim(),
        },
        googleProperty: { ga4PropertyId: propertyId.trim() },
      });
      toast.success(enabled && valid ? "GA4 enabled on the live site" : "Analytics settings saved");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Save failed"));
    } finally {
      setBusy(false);
    }
  }

  async function sync() {
    setBusy(true);
    try {
      await centerGaSync(28);
      toast.success("GA4 synced");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Sync failed — connect Google + set property ID"));
    } finally {
      setBusy(false);
    }
  }

  const totals = (dash?.totals || {}) as Record<string, unknown>;
  const topPages = (dash?.topPages || []) as Array<Record<string, unknown>>;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <SeoStatCard label="Measurement ID" value={normalized || "—"} />
        <SeoStatCard label="Site install" value={enabled && valid ? "Live on public pages" : "Not active"} />
        <SeoStatCard label="Data API" value={String(dash?.connected ? "Connected" : dash?.source || "empty")} />
      </div>

      <SeoPanel
        title="Google Analytics 4"
        description="Direct gtag.js install on public pages, plus optional Data API sync for the admin dashboard."
        action={
          <div className="flex gap-2">
            <Button variant="outline" disabled={busy} onClick={() => void sync()}>
              Sync
            </Button>
            <Button variant="primary" disabled={busy} onClick={() => void save()}>
              {busy ? "Saving…" : "Save GA4"}
            </Button>
          </div>
        }
      >
        <div className="grid gap-3 md:grid-cols-3">
          <AdminField label="Enabled">
            <select
              className={adminInputClass}
              value={enabled ? "1" : "0"}
              onChange={(e) => setEnabled(e.target.value === "1")}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </AdminField>
          <AdminField label="Measurement ID (G-XXXX)">
            <input
              className={adminInputClass}
              placeholder="G-XXXXXXXX"
              value={measurementId}
              onChange={(e) => setMeasurementId(e.target.value)}
            />
            {measurementId && !valid ? (
              <p className="mt-1 text-xs text-red-600">Format must be G- followed by letters/numbers.</p>
            ) : null}
          </AdminField>
          <AdminField label="GA4 Property ID (numbers only, for Data API)">
            <input
              className={adminInputClass}
              placeholder="123456789"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
            />
          </AdminField>
        </div>

        {gtmActive ? (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            GTM is also active. Prefer firing GA4 from either this direct tag <strong>or</strong> a GA4
            Configuration tag inside GTM — not both — to avoid double counting.
          </p>
        ) : null}

        <ol className="mt-4 space-y-2 rounded-xl border border-[#E8ECF1] bg-[#F9FAFB] p-4 text-sm text-[#4B5563]">
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>
              Create a GA4 property at{" "}
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#16A34A] hover:underline"
              >
                analytics.google.com
              </a>{" "}
              for <strong>{siteConfig.url}</strong>
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>Copy Measurement ID (Admin → Data streams → Web) starting with <strong>G-</strong>.</span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>Paste it above, enable, and save. Public pages load gtag after interactive.</span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>
              Optional: connect Google in SEO Center and set numeric Property ID, then Sync for dashboard
              charts.
            </span>
          </li>
        </ol>

        <div className="mt-4">
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB]"
          >
            Open Google Analytics
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </SeoPanel>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SeoStatCard label="Sessions" value={num(totals.sessions).toLocaleString()} />
        <SeoStatCard label="Users" value={num(totals.users).toLocaleString()} />
        <SeoStatCard label="New Users" value={num(totals.newUsers).toLocaleString()} />
        <SeoStatCard label="Organic Users" value={num(totals.organicUsers).toLocaleString()} />
        <SeoStatCard label="Organic Traffic" value={num(totals.organicSessions).toLocaleString()} />
        <SeoStatCard label="Realtime Users" value={num(totals.realtimeUsers).toLocaleString()} />
        <SeoStatCard label="Conversions" value={num(totals.conversions).toLocaleString()} />
        <SeoStatCard
          label="Bounce Rate"
          value={`${(num(totals.bounceRate) * (num(totals.bounceRate) <= 1 ? 100 : 1)).toFixed(1)}%`}
        />
        <SeoStatCard
          label="Avg Engagement"
          value={`${Math.round(num(totals.averageEngagementSeconds))}s`}
        />
        <SeoStatCard label="Source" value={String(dash?.source || "empty")} />
      </div>

      <SeoPanel title="Top pages">
        <SeoSimpleTable
          headers={["Page", "Sessions", "Users", "Bounce", "Engagement"]}
          rows={topPages.map((p) => [
            String(p.page || ""),
            num(p.sessions),
            num(p.users),
            `${(num(p.bounceRate) * (num(p.bounceRate) <= 1 ? 100 : 1)).toFixed(1)}%`,
            `${Math.round(num(p.engagementSeconds))}s`,
          ])}
        />
      </SeoPanel>
    </div>
  );
}
