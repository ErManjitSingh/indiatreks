"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoSimpleTable, SeoStatCard } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import {
  centerGoogleConnect,
  centerGoogleDisconnect,
  centerGoogleStatus,
  centerGscDashboard,
  centerGscInspect,
  centerGscSubmitSitemap,
  centerGscSync,
  centerUpdateIntegrations,
} from "@/lib/api/seo-center";

function num(v: unknown) {
  return typeof v === "number" ? v : Number(v || 0);
}

export default function SearchConsolePage() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Record<string, unknown> | null>(null);
  const [dash, setDash] = useState<Record<string, unknown> | null>(null);
  const [property, setProperty] = useState("sc-domain:treks.indiaholidaydestination.com");
  const [sitemapUrl, setSitemapUrl] = useState(
    "https://treks.indiaholidaydestination.com/sitemap.xml",
  );
  const [inspectUrl, setInspectUrl] = useState("https://treks.indiaholidaydestination.com/");
  const [inspect, setInspect] = useState<Record<string, unknown> | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [s, d] = await Promise.all([centerGoogleStatus(), centerGscDashboard({ days: 28 })]);
      setStatus(s);
      setDash(d);
      setProperty(String(s?.searchConsoleProperty || d?.propertyUrl || ""));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load Search Console"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const oauth = params.get("oauth");
    if (oauth === "success") toast.success("Google account connected");
    if (oauth === "error") toast.error(params.get("message") || "Google connect failed");
  }, [params]);

  async function connect() {
    setBusy(true);
    try {
      const data = await centerGoogleConnect();
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      toast.error(getErrorMessage(err, "Connect failed — check GOOGLE_CLIENT_ID secrets"));
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    setBusy(true);
    try {
      await centerGoogleDisconnect();
      toast.success("Disconnected");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Disconnect failed"));
    } finally {
      setBusy(false);
    }
  }

  async function sync() {
    setBusy(true);
    try {
      await centerGscSync(28);
      toast.success("Synced from Google");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Sync failed"));
    } finally {
      setBusy(false);
    }
  }

  async function saveProperty() {
    setBusy(true);
    try {
      await centerUpdateIntegrations({ googleProperty: { searchConsoleProperty: property } });
      toast.success("Property saved");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Save failed"));
    } finally {
      setBusy(false);
    }
  }

  async function submitSitemap() {
    setBusy(true);
    try {
      await centerGscSubmitSitemap(sitemapUrl);
      toast.success("Sitemap submitted");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Sitemap submit failed"));
    } finally {
      setBusy(false);
    }
  }

  async function runInspect() {
    setBusy(true);
    try {
      setInspect(await centerGscInspect(inspectUrl));
      toast.success("URL inspected");
    } catch (err) {
      toast.error(getErrorMessage(err, "Inspection failed"));
    } finally {
      setBusy(false);
    }
  }

  const totals = (dash?.totals || {}) as Record<string, unknown>;
  const coverage = (dash?.coverage || {}) as Record<string, unknown>;
  const topPages = (dash?.topPages || []) as Array<Record<string, unknown>>;
  const topQueries = (dash?.topQueries || []) as Array<Record<string, unknown>>;
  const sitemaps = (dash?.sitemaps || []) as Array<Record<string, unknown>>;
  const connectedProperties = (dash?.connectedProperties || []) as Array<Record<string, unknown>>;

  return (
    <div className="space-y-6">
      <SeoPanel
        title="Google account"
        description="Connect with official Google OAuth. Tokens are encrypted at rest and never exposed to the browser."
        action={
          <div className="flex gap-2">
            {status?.connected ? (
              <>
                <Button variant="outline" disabled={busy} onClick={() => void sync()}>
                  Sync data
                </Button>
                <Button variant="outline" disabled={busy} onClick={() => void disconnect()}>
                  Disconnect
                </Button>
                <Button variant="primary" disabled={busy} onClick={() => void connect()}>
                  Reconnect
                </Button>
              </>
            ) : (
              <Button variant="primary" disabled={busy} onClick={() => void connect()}>
                Connect Google Account
              </Button>
            )}
          </div>
        }
      >
        <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <p>
            Status:{" "}
            <strong>
              {status?.connected ? "Connected" : status?.configured ? "Ready" : "Not configured"}
            </strong>
          </p>
          <p>Email: {String(status?.email || "—")}</p>
          <p>Configured: {String(Boolean(status?.configured))}</p>
          <p className="truncate">Redirect: {String(status?.redirectUri || "—")}</p>
        </div>
        {status?.lastError ? <p className="mt-3 text-sm text-amber-700">{String(status.lastError)}</p> : null}
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <AdminField label="Search Console property URL" className="min-w-[280px] flex-1">
            <input
              className={adminInputClass}
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              placeholder="sc-domain:treks.indiaholidaydestination.com"
            />
          </AdminField>
          <Button variant="outline" disabled={busy} onClick={() => void saveProperty()}>
            Save property
          </Button>
        </div>
      </SeoPanel>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SeoStatCard label="Total Clicks" value={num(totals.clicks).toLocaleString()} />
        <SeoStatCard label="Total Impressions" value={num(totals.impressions).toLocaleString()} />
        <SeoStatCard label="Average CTR" value={`${(num(totals.ctr) * 100).toFixed(2)}%`} />
        <SeoStatCard label="Average Position" value={num(totals.position).toFixed(1)} />
        <SeoStatCard label="Indexed Pages" value={num(coverage.indexed)} />
        <SeoStatCard label="Excluded Pages" value={num(coverage.excluded)} />
        <SeoStatCard label="Pages With Errors" value={num(coverage.errors)} />
        <SeoStatCard label="Coverage Status" value={String(dash?.coverageStatus || "unknown")} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SeoPanel title="Connected properties">
          <SeoSimpleTable
            headers={["Property", "Permission"]}
            rows={connectedProperties.map((site) => [
              String(site.siteUrl || ""),
              String(site.permissionLevel || ""),
            ])}
          />
        </SeoPanel>

        <SeoPanel title="Indexing snapshot">
          <SeoSimpleTable
            headers={["State", "Count"]}
            rows={[
              ["Indexed", num(coverage.indexed)],
              ["Not indexed", num(coverage.notIndexed)],
              ["Blocked", num(coverage.blocked)],
              ["Noindex", num(coverage.noindex)],
              ["Crawled", num(coverage.crawled)],
              ["Discovered", num(coverage.discovered)],
            ]}
          />
        </SeoPanel>

        <SeoPanel
          title="Sitemap"
          description="Submit or resubmit sitemap via Search Console API"
          action={
            <Button variant="primary" disabled={busy} onClick={() => void submitSitemap()}>
              Submit sitemap
            </Button>
          }
        >
          <AdminField label="Sitemap URL">
            <input className={adminInputClass} value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} />
          </AdminField>
          <div className="mt-4">
            <SeoSimpleTable
              headers={["Path", "Pending", "Errors", "Warnings"]}
              rows={sitemaps.map((s) => [
                String(s.path || ""),
                String(Boolean(s.isPending)),
                num(s.errors),
                num(s.warnings),
              ])}
            />
          </div>
        </SeoPanel>
      </div>

      <SeoPanel title="Top landing pages">
        <SeoSimpleTable
          headers={["Page", "Clicks", "Impressions", "CTR", "Position"]}
          rows={topPages.slice(0, 25).map((p) => [
            String(p.page || ""),
            num(p.clicks),
            num(p.impressions),
            `${(num(p.ctr) * 100).toFixed(2)}%`,
            num(p.position).toFixed(1),
          ])}
        />
      </SeoPanel>

      <SeoPanel title="Top keywords">
        <SeoSimpleTable
          headers={["Keyword", "Clicks", "Impressions", "CTR", "Position", "Landing Page"]}
          rows={topQueries.slice(0, 25).map((q) => [
            String(q.query || ""),
            num(q.clicks),
            num(q.impressions),
            `${(num(q.ctr) * 100).toFixed(2)}%`,
            num(q.position).toFixed(1),
            String(q.landingPage || "—"),
          ])}
        />
      </SeoPanel>

      <SeoPanel
        title="URL Inspection"
        description="Index status, canonical, mobile usability, structured data"
        action={
          <Button variant="primary" disabled={busy} onClick={() => void runInspect()}>
            Inspect URL
          </Button>
        }
      >
        <AdminField label="URL">
          <input className={adminInputClass} value={inspectUrl} onChange={(e) => setInspectUrl(e.target.value)} />
        </AdminField>
        {inspect ? (
          <div className="mt-4 grid gap-2 text-sm text-[#374151] sm:grid-cols-2">
            <p>Index status: {String(inspect.indexStatus || "—")}</p>
            <p>Verdict: {String(inspect.verdict || "—")}</p>
            <p>Google canonical: {String(inspect.googleCanonical || "—")}</p>
            <p>User canonical: {String(inspect.userCanonical || "—")}</p>
            <p>Mobile friendly: {String(inspect.mobileUsability || "—")}</p>
            <p>Structured data: {String(inspect.richResults || "—")}</p>
            <p>Last crawl: {String(inspect.lastCrawlTime || "—")}</p>
            <p>Robots: {String(inspect.robotsTxtState || "—")}</p>
          </div>
        ) : null}
      </SeoPanel>
    </div>
  );
}
