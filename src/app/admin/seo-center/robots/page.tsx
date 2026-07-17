"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminTextareaClass } from "@/components/admin/admin-ui";
import { SeoPanel } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { adminGetRobots, adminUpdateRobots } from "@/lib/api/seo";
import { centerRobotsPreview } from "@/lib/api/seo-center";

export default function RobotsPage() {
  const [customContent, setCustomContent] = useState("");
  const [preview, setPreview] = useState("");
  const [backup, setBackup] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [robots, prev] = await Promise.all([adminGetRobots(), centerRobotsPreview()]);
      setCustomContent(String(robots?.customContent || ""));
      setBackup(String(robots?.customContent || ""));
      setPreview(String(prev?.preview || ""));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load robots"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setBusy(true);
    try {
      await adminUpdateRobots({ customContent });
      toast.success("Robots saved");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Save failed"));
    } finally {
      setBusy(false);
    }
  }

  function restore() {
    setCustomContent(backup);
    toast.success("Restored last saved content into editor");
  }

  return (
    <div className="space-y-6">
      <SeoPanel
        title="Robots Manager"
        description="Visual editor with live preview"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={restore}>
              Restore
            </Button>
            <Button variant="primary" disabled={busy} onClick={() => void save()}>
              Save
            </Button>
          </div>
        }
      >
        <AdminField label="Custom robots.txt (optional — overrides rules when set)">
          <textarea
            className={adminTextareaClass}
            rows={14}
            value={customContent}
            onChange={(e) => setCustomContent(e.target.value)}
            placeholder={"User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://.../sitemap.xml"}
          />
        </AdminField>
      </SeoPanel>

      <SeoPanel title="Preview">
        <pre className="overflow-x-auto rounded-xl bg-[#0f172a] p-4 text-xs text-[#e2e8f0]">{preview || "—"}</pre>
      </SeoPanel>
    </div>
  );
}
