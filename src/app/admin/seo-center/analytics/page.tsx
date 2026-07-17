"use client";

import { useCallback, useEffect, useState } from "react";

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

function num(v: unknown) {
  return typeof v === "number" ? v : Number(v || 0);
}

export default function AnalyticsPage() {
  const [dash, setDash] = useState<Record<string, unknown> | null>(null);
  const [measurementId, setMeasurementId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [d, i] = await Promise.all([centerGaDashboard({ days: 28 }), centerIntegrations()]);
      setDash(d);
      const ga4 = (i?.ga4 || {}) as Record<string, unknown>;
      setMeasurementId(String(ga4.measurementId || ""));
      setPropertyId(
        String(
          ga4.propertyId ||
            (i?.google as Record<string, unknown> | undefined)?.ga4PropertyId ||
            "",
        ),
      );
      setEnabled(Boolean(ga4.enabled));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load Analytics"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setBusy(true);
    try {
      await centerUpdateIntegrations({
        ga4: { enabled, measurementId, propertyId },
        googleProperty: { ga4PropertyId: propertyId },
      });
      toast.success("Analytics settings saved");
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
      <SeoPanel
        title="Google Analytics 4"
        description="Sessions, users, organic traffic, and conversions via Analytics Data API"
        action={
          <div className="flex gap-2">
            <Button variant="outline" disabled={busy} onClick={() => void sync()}>
              Sync
            </Button>
            <Button variant="primary" disabled={busy} onClick={() => void save()}>
              Save
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
            <input className={adminInputClass} value={measurementId} onChange={(e) => setMeasurementId(e.target.value)} />
          </AdminField>
          <AdminField label="GA4 Property ID (numbers only)">
            <input className={adminInputClass} value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
          </AdminField>
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
        <SeoStatCard label="Bounce Rate" value={`${(num(totals.bounceRate) * (num(totals.bounceRate) <= 1 ? 100 : 1)).toFixed(1)}%`} />
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
