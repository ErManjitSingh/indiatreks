"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { centerIntegrations, centerUpdateIntegrations } from "@/lib/api/seo-center";

export default function GtmPage() {
  const [enabled, setEnabled] = useState(false);
  const [containerId, setContainerId] = useState("");
  const [status, setStatus] = useState("inactive");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const i = await centerIntegrations();
      const gtm = (i?.gtm || {}) as Record<string, unknown>;
      setEnabled(Boolean(gtm.enabled));
      setContainerId(String(gtm.containerId || ""));
      setStatus(String(gtm.status || "inactive"));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load GTM"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setBusy(true);
    try {
      await centerUpdateIntegrations({ gtm: { enabled, containerId } });
      toast.success("GTM saved");
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
        <SeoStatCard label="Container ID" value={containerId || "—"} />
        <SeoStatCard label="Status" value={status} />
        <SeoStatCard label="Verification" value={containerId ? "ID present" : "Missing"} />
      </div>
      <SeoPanel title="Google Tag Manager" description="Container ID used by public site analytics scripts">
        <div className="grid gap-3 md:grid-cols-2">
          <AdminField label="Enabled">
            <select className={adminInputClass} value={enabled ? "1" : "0"} onChange={(e) => setEnabled(e.target.value === "1")}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </AdminField>
          <AdminField label="Container ID (GTM-XXXX)">
            <input className={adminInputClass} value={containerId} onChange={(e) => setContainerId(e.target.value)} />
          </AdminField>
        </div>
        <div className="mt-4">
          <Button variant="primary" disabled={busy} onClick={() => void save()}>
            Save GTM
          </Button>
        </div>
      </SeoPanel>
    </div>
  );
}
