"use client";

import { useCallback, useEffect, useState } from "react";

import { SeoPanel, SeoSimpleTable } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { adminGetSitemapConfig, adminUpdateSitemapConfig } from "@/lib/api/seo";
import { centerGenerateSitemaps } from "@/lib/api/seo-center";

type Entry = {
  name: string;
  path?: string;
  enabled?: boolean;
  urlCount?: number;
};

export default function SitemapsPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [generated, setGenerated] = useState<Array<Record<string, unknown>>>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const cfg = await adminGetSitemapConfig();
      setEntries(((cfg?.entries as Entry[]) || []) as Entry[]);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load sitemap config"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function generate() {
    setBusy(true);
    try {
      const res = await centerGenerateSitemaps();
      setGenerated((res || []) as Array<Record<string, unknown>>);
      toast.success("Sitemaps generated");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Generate failed"));
    } finally {
      setBusy(false);
    }
  }

  async function toggle(name: string, enabled: boolean) {
    try {
      const next = entries.map((e) => (e.name === name ? { ...e, enabled } : e));
      const cfg = await adminUpdateSitemapConfig({ entries: next });
      setEntries(((cfg?.entries as Entry[]) || next) as Entry[]);
      toast.success(`${name} updated`);
    } catch (err) {
      toast.error(getErrorMessage(err, "Update failed"));
    }
  }

  return (
    <div className="space-y-6">
      <SeoPanel
        title="Sitemap Manager"
        description="Treks, blogs, destinations, images, videos — auto generate"
        action={
          <Button variant="primary" disabled={busy} onClick={() => void generate()}>
            Generate all sitemaps
          </Button>
        }
      >
        <SeoSimpleTable
          headers={["Sitemap", "Enabled", "Path", "URLs", ""]}
          rows={entries.map((entry) => [
            entry.name,
            entry.enabled !== false ? "Yes" : "No",
            String(entry.path || ""),
            String(entry.urlCount ?? 0),
            <Button
              key={entry.name}
              variant="outline"
              className="h-8 px-2 text-xs"
              onClick={() => void toggle(entry.name, !(entry.enabled !== false))}
            >
              {entry.enabled !== false ? "Disable" : "Enable"}
            </Button>,
          ])}
        />
      </SeoPanel>

      {generated.length ? (
        <SeoPanel title="Last generate result">
          <SeoSimpleTable
            headers={["Name", "Count"]}
            rows={generated.map((g) => [String(g.name || ""), String(g.count ?? "")])}
          />
        </SeoPanel>
      ) : null}
    </div>
  );
}
