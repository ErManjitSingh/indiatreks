"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { centerIntegrations, centerUpdateIntegrations } from "@/lib/api/seo-center";

export default function MetaPixelPage() {
  const [enabled, setEnabled] = useState(false);
  const [pixelId, setPixelId] = useState("");
  const [status, setStatus] = useState("inactive");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const i = await centerIntegrations();
      const m = (i?.metaPixel || {}) as Record<string, unknown>;
      setEnabled(Boolean(m.enabled));
      setPixelId(String(m.pixelId || ""));
      setStatus(String(m.status || "inactive"));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load Meta Pixel"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setBusy(true);
    try {
      await centerUpdateIntegrations({ metaPixel: { enabled, pixelId } });
      toast.success("Meta Pixel saved");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Save failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <SeoStatCard label="Pixel ID" value={pixelId || "—"} />
        <SeoStatCard label="Status" value={status} />
      </div>
      <SeoPanel title="Meta Pixel" description="Facebook / Meta conversion pixel">
        <div className="grid gap-3 md:grid-cols-2">
          <AdminField label="Enabled">
            <select className={adminInputClass} value={enabled ? "1" : "0"} onChange={(e) => setEnabled(e.target.value === "1")}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </AdminField>
          <AdminField label="Pixel ID">
            <input className={adminInputClass} value={pixelId} onChange={(e) => setPixelId(e.target.value)} />
          </AdminField>
        </div>
        <div className="mt-4">
          <Button variant="primary" disabled={busy} onClick={() => void save()}>
            Save Pixel
          </Button>
        </div>
      </SeoPanel>
    </div>
  );
}
