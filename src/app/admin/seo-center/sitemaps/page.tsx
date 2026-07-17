"use client";

import { useCallback, useEffect, useState } from "react";

import { SeoPanel, SeoSimpleTable } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { adminGetSitemapConfig, adminUpdateSitemapConfig } from "@/lib/api/seo";
import { centerGenerateSitemaps, centerGscSubmitAllSitemaps } from "@/lib/api/seo-center";

type Entry = {
  name: string;
  path?: string;
  enabled?: boolean;
  urlCount?: number;
  lastGeneratedAt?: string;
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
      const list = Array.isArray(res)
        ? res
        : (((res as { generated?: unknown[] } | null)?.generated || []) as Array<Record<string, unknown>>);
      setGenerated(list as Array<Record<string, unknown>>);
      toast.success("Sitemaps refreshed from live content");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Generate failed"));
    } finally {
      setBusy(false);
    }
  }

  async function submitToGoogle() {
    setBusy(true);
    try {
      await centerGscSubmitAllSitemaps();
      toast.success("Core sitemaps submitted to Search Console");
    } catch (err) {
      toast.error(getErrorMessage(err, "Google submit failed — connect GSC first"));
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
        title="Auto sitemap"
        description="Sitemaps are live: every published trek, blog, and destination is included when Google crawls the XML. Publishing content also refreshes counts and notifies Search Console."
      >
        <div className="grid gap-3 text-sm text-[#374151] sm:grid-cols-2">
          <p>
            Public index:{" "}
            <a
              className="font-medium text-[#2D5A27] hover:underline"
              href="https://treks.indiaholidaydestination.com/sitemap.xml"
              target="_blank"
              rel="noreferrer"
            >
              /sitemap.xml
            </a>
          </p>
          <p>
            Blogs feed:{" "}
            <a
              className="font-medium text-[#2D5A27] hover:underline"
              href="https://treks.indiaholidaydestination.com/sitemaps/blogs.xml"
              target="_blank"
              rel="noreferrer"
            >
              /sitemaps/blogs.xml
            </a>
          </p>
        </div>
      </SeoPanel>

      <SeoPanel
        title="Sitemap Manager"
        description="Treks, blogs, destinations, images, videos — refresh counts and push feeds to Google"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" disabled={busy} onClick={() => void submitToGoogle()}>
              Submit to Google
            </Button>
            <Button variant="primary" disabled={busy} onClick={() => void generate()}>
              Refresh all sitemaps
            </Button>
          </div>
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
        <SeoPanel title="Last refresh result">
          <SeoSimpleTable
            headers={["Name", "Count"]}
            rows={generated.map((g) => [String(g.name || ""), String(g.count ?? "")])}
          />
        </SeoPanel>
      ) : null}
    </div>
  );
}
