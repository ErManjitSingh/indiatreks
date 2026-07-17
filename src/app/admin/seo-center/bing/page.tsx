"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { centerIntegrations, centerUpdateIntegrations } from "@/lib/api/seo-center";

export default function BingPage() {
  const [enabled, setEnabled] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("inactive");
  const [masked, setMasked] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const i = await centerIntegrations();
      const b = (i?.bing || {}) as Record<string, unknown>;
      setEnabled(Boolean(b.enabled));
      setSiteUrl(String(b.siteUrl || ""));
      setVerified(Boolean(b.verified));
      setStatus(String(b.status || "inactive"));
      setMasked(String(b.apiKeyMasked || ""));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load Bing settings"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setBusy(true);
    try {
      await centerUpdateIntegrations({
        bing: {
          enabled,
          siteUrl,
          verified,
          ...(apiKey.trim() ? { apiKey: apiKey.trim() } : {}),
        },
      });
      setApiKey("");
      toast.success("Bing Webmaster saved");
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
        <SeoStatCard label="Status" value={status} />
        <SeoStatCard label="Verified" value={verified ? "Yes" : "No"} />
        <SeoStatCard label="API key" value={masked || "—"} />
      </div>
      <SeoPanel title="Bing Webmaster Tools" description="API key is stored securely and never returned in full">
        <div className="grid gap-3 md:grid-cols-2">
          <AdminField label="Enabled">
            <select className={adminInputClass} value={enabled ? "1" : "0"} onChange={(e) => setEnabled(e.target.value === "1")}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </AdminField>
          <AdminField label="Verified">
            <select className={adminInputClass} value={verified ? "1" : "0"} onChange={(e) => setVerified(e.target.value === "1")}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </AdminField>
          <AdminField label="Site URL">
            <input className={adminInputClass} value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
          </AdminField>
          <AdminField label="API key (leave blank to keep existing)">
            <input className={adminInputClass} type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </AdminField>
        </div>
        <div className="mt-4">
          <Button variant="primary" disabled={busy} onClick={() => void save()}>
            Save Bing
          </Button>
        </div>
      </SeoPanel>
    </div>
  );
}
