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
  centerGaProperties,
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

type GaProperty = {
  accountName: string;
  accountId: string;
  propertyName: string;
  propertyId: string;
};

export default function AnalyticsPage() {
  const [dash, setDash] = useState<Record<string, unknown> | null>(null);
  const [measurementId, setMeasurementId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [gtmActive, setGtmActive] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [properties, setProperties] = useState<GaProperty[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [d, i] = await Promise.all([centerGaDashboard({ days: 28 }), centerIntegrations()]);
      setDash(d);
      const ga4 = (i?.ga4 || {}) as Record<string, unknown>;
      const gtm = (i?.gtm || {}) as Record<string, unknown>;
      const google = (i?.google || {}) as Record<string, unknown>;
      setMeasurementId(String(ga4.measurementId || ""));
      setPropertyId(
        String(ga4.propertyId || google.ga4PropertyId || "").replace(/^properties\//, ""),
      );
      setEnabled(Boolean(ga4.enabled));
      setGtmActive(Boolean(gtm.enabled && gtm.containerId));
      setGoogleEmail(String(google.email || ""));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load Analytics"));
    }

    try {
      const props = await centerGaProperties();
      setProperties(props);
    } catch {
      setProperties([]);
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
    const cleanPropertyId = propertyId.trim().replace(/^properties\//, "");
    if (cleanPropertyId && !/^\d{6,12}$/.test(cleanPropertyId)) {
      toast.error("Property ID must be numbers only (from GA4 Admin → Property settings), not G-…");
      return;
    }
    setBusy(true);
    try {
      await centerUpdateIntegrations({
        ga4: {
          enabled: enabled && valid,
          measurementId: valid ? normalized : "",
          propertyId: cleanPropertyId,
        },
        googleProperty: { ga4PropertyId: cleanPropertyId },
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
      toast.error(
        getErrorMessage(
          err,
          "Sync failed — check Property ID access for the connected Google account",
        ),
      );
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
          <AdminField label="Measurement ID (G-XXXX) — for site tracking">
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
          <AdminField label="GA4 Property ID (numbers only — for Sync)">
            <input
              className={adminInputClass}
              placeholder="123456789"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
            />
            <p className="mt-1 text-[11px] text-[#6B7280]">
              Not the G- ID. Find it in GA4 → Admin → Property settings → Property ID.
            </p>
          </AdminField>
        </div>

        {properties.length > 0 ? (
          <div className="mt-3">
            <AdminField label="Pick a property your Google account can access">
              <select
                className={adminInputClass}
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
              >
                <option value="">Select property…</option>
                {properties.map((p) => (
                  <option key={p.propertyId} value={p.propertyId}>
                    {p.propertyName} ({p.propertyId}) — {p.accountName}
                  </option>
                ))}
              </select>
            </AdminField>
          </div>
        ) : (
          <p className="mt-3 rounded-xl border border-[#E8ECF1] bg-[#F9FAFB] px-3 py-2 text-xs text-[#4B5563]">
            No GA4 properties listed for{" "}
            <strong>{googleEmail || "the connected Google account"}</strong>. Either reconnect Google, or
            give that account Viewer access on the property.
          </p>
        )}

        {googleEmail &&
        googleEmail.toLowerCase() !== "indiaholidaydestinations.in@gmail.com" ? (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            Connected Google is <strong>{googleEmail}</strong>. Analytics property{" "}
            <strong>indiaholidaydestinations.in@gmail.com</strong> se linked hai. SEO Center → Search
            Console me Disconnect → Connect karo aur wohi Gmail choose karo, phir Sync try karo.
          </p>
        ) : null}

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
              Site tracking uses <strong>Measurement ID (G-…)</strong>. Sync uses{" "}
              <strong>numeric Property ID</strong>.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>
              Connected Google ({googleEmail || "—"}) must be added under GA4 → Admin → Property access
              management.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden />
            <span>
              Stream URL should match <strong>{siteConfig.url}</strong>.
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
