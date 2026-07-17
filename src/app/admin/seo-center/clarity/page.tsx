"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { centerIntegrations, centerUpdateIntegrations } from "@/lib/api/seo-center";

export default function ClarityPage() {
  const [enabled, setEnabled] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [heatmapsUrl, setHeatmapsUrl] = useState<string | null>(null);
  const [recordingsUrl, setRecordingsUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("inactive");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const i = await centerIntegrations();
      const c = (i?.clarity || {}) as Record<string, unknown>;
      setEnabled(Boolean(c.enabled));
      setProjectId(String(c.projectId || ""));
      setHeatmapsUrl(c.heatmapsUrl ? String(c.heatmapsUrl) : null);
      setRecordingsUrl(c.recordingsUrl ? String(c.recordingsUrl) : null);
      setStatus(String(c.status || "inactive"));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load Clarity"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setBusy(true);
    try {
      await centerUpdateIntegrations({ clarity: { enabled, projectId } });
      toast.success("Clarity saved");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Save failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <SeoStatCard label="Project ID" value={projectId || "—"} />
        <SeoStatCard label="Status" value={status} />
        <SeoStatCard label="Heatmaps" value={heatmapsUrl ? "Ready" : "—"} />
      </div>
      <SeoPanel title="Microsoft Clarity" description="Project ID for heatmaps and session recordings">
        <div className="grid gap-3 md:grid-cols-2">
          <AdminField label="Enabled">
            <select className={adminInputClass} value={enabled ? "1" : "0"} onChange={(e) => setEnabled(e.target.value === "1")}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </AdminField>
          <AdminField label="Project ID">
            <input className={adminInputClass} value={projectId} onChange={(e) => setProjectId(e.target.value)} />
          </AdminField>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="primary" disabled={busy} onClick={() => void save()}>
            Save Clarity
          </Button>
          {heatmapsUrl ? (
            <Button asChild variant="outline">
              <a href={heatmapsUrl} target="_blank" rel="noreferrer">
                Open heatmaps
              </a>
            </Button>
          ) : null}
          {recordingsUrl ? (
            <Button asChild variant="outline">
              <a href={recordingsUrl} target="_blank" rel="noreferrer">
                Open recordings
              </a>
            </Button>
          ) : null}
        </div>
      </SeoPanel>
    </div>
  );
}
