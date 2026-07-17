"use client";

import { useCallback, useEffect, useState } from "react";

import { SeoPanel, SeoSimpleTable, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { adminAiDashboard, adminListSeoAudits, type SeoDoc } from "@/lib/api/seo";
import { centerRunAudit } from "@/lib/api/seo-center";

export default function SeoAuditPage() {
  const [dash, setDash] = useState<Record<string, unknown> | null>(null);
  const [audits, setAudits] = useState<SeoDoc[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [d, a] = await Promise.all([adminAiDashboard(), adminListSeoAudits({ limit: 10 })]);
      setDash(d);
      setAudits(a.items);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load audits"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function run() {
    setBusy(true);
    try {
      await centerRunAudit();
      toast.success("Full SEO audit completed");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Audit failed"));
    } finally {
      setBusy(false);
    }
  }

  const missingMeta = (dash?.missingMeta || []) as unknown[];
  const missingAlt = (dash?.missingAltText || dash?.missingAlt || []) as unknown[];
  const missingSchema = (dash?.missingSchema || []) as unknown[];
  const duplicateTitles = (dash?.duplicateTitles || []) as unknown[];
  const duplicateDescriptions = (dash?.duplicateDescriptions || []) as unknown[];

  return (
    <div className="space-y-6">
      <SeoPanel
        title="SEO Audit"
        description="Missing meta, alt, schema, duplicates, orphan signals"
        action={
          <Button variant="primary" disabled={busy} onClick={() => void run()}>
            Run complete audit
          </Button>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <SeoStatCard label="Missing Meta" value={missingMeta.length} />
          <SeoStatCard label="Missing Alt" value={missingAlt.length} />
          <SeoStatCard label="Missing Schema" value={missingSchema.length} />
          <SeoStatCard label="Duplicate Titles" value={duplicateTitles.length} />
          <SeoStatCard label="Duplicate Descriptions" value={duplicateDescriptions.length} />
        </div>
      </SeoPanel>

      <SeoPanel title="Recent audit reports">
        <SeoSimpleTable
          headers={["Title", "Created", "Score"]}
          rows={audits.map((a) => [
            String(a.title || a.type || "Audit"),
            a.createdAt ? new Date(String(a.createdAt)).toLocaleString() : "—",
            String((a as { overallScore?: number }).overallScore ?? a.score ?? "—"),
          ])}
        />
      </SeoPanel>
    </div>
  );
}
