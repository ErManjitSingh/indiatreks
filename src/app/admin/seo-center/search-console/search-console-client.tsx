"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Eye,
  FileWarning,
  MousePointerClick,
  Search,
  ShieldAlert,
} from "lucide-react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import {
  SeoMetricCard,
  SeoPanel,
  SeoPerformanceChart,
  SeoSimpleTable,
  SeoTablePagination,
} from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import {
  centerGoogleConnect,
  centerGoogleDisconnect,
  centerGoogleStatus,
  centerGscDashboard,
  centerGscInspect,
  centerGscPushBlogs,
  centerGscSubmitAllSitemaps,
  centerGscSubmitSitemap,
  centerGscSync,
  centerUpdateIntegrations,
} from "@/lib/api/seo-center";

function num(v: unknown) {
  return typeof v === "number" ? v : Number(v || 0);
}

const QUERIES_PAGE_SIZE = 5;
const PAGES_PAGE_SIZE = 10;

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
  const [pushResult, setPushResult] = useState<Record<string, unknown> | null>(null);
  const [submitAllResult, setSubmitAllResult] = useState<Array<Record<string, unknown>>>([]);
  const [queriesPage, setQueriesPage] = useState(1);
  const [pagesPage, setPagesPage] = useState(1);

  const load = useCallback(async () => {
    try {
      const [s, d] = await Promise.all([centerGoogleStatus(), centerGscDashboard({ days: 28 })]);
      setStatus(s);
      setDash(d);
      setProperty(String(s?.searchConsoleProperty || d?.propertyUrl || ""));
      setQueriesPage(1);
      setPagesPage(1);
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

  async function submitAllSitemaps() {
    setBusy(true);
    try {
      const data = await centerGscSubmitAllSitemaps();
      setSubmitAllResult((data?.results || []) as Array<Record<string, unknown>>);
      const failed = (data?.results || []).filter((r) => r.status === "failed").length;
      toast.success(
        failed
          ? `Submitted with ${failed} failure(s) — check results`
          : "All core sitemaps submitted to Google",
      );
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Submit all sitemaps failed"));
    } finally {
      setBusy(false);
    }
  }

  async function pushBlogs() {
    setBusy(true);
    try {
      const data = await centerGscPushBlogs(30);
      setPushResult(data);
      const urls = (data?.urls as Array<Record<string, unknown>>) || [];
      const ok = urls.filter((u) => u.status !== "failed").length;
      toast.success(`Pushed ${ok}/${urls.length} blog URLs to Google`);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Blog push failed — try Reconnect for indexing scope"));
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
  const topPages = useMemo(
    () => (dash?.topPages || []) as Array<Record<string, unknown>>,
    [dash],
  );
  const topQueries = useMemo(
    () => (dash?.topQueries || []) as Array<Record<string, unknown>>,
    [dash],
  );
  const sitemaps = (dash?.sitemaps || []) as Array<Record<string, unknown>>;
  const connectedProperties = (dash?.connectedProperties || []) as Array<Record<string, unknown>>;

  const pagedQueries = useMemo(() => {
    const start = (queriesPage - 1) * QUERIES_PAGE_SIZE;
    return topQueries.slice(start, start + QUERIES_PAGE_SIZE);
  }, [topQueries, queriesPage]);

  const pagedPages = useMemo(() => {
    const start = (pagesPage - 1) * PAGES_PAGE_SIZE;
    return topPages.slice(start, start + PAGES_PAGE_SIZE);
  }, [topPages, pagesPage]);

  return (
    <div className="space-y-5">
      {/* Google Account — mockup card */}
      <SeoPanel
        title="Google Account"
        description="Connect with official Google OAuth. Tokens are encrypted at rest and never exposed to the browser."
        action={
          <div className="flex flex-wrap gap-2">
            {status?.connected ? (
              <>
                <Button variant="outline" disabled={busy} onClick={() => void sync()}>
                  Sync Data
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
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#166534]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              {status?.connected ? "Connected" : status?.configured ? "Ready" : "Not configured"}
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <p>
                <span className="text-[#6B7280]">Email:</span>{" "}
                <strong className="text-[#111827]">{String(status?.email || "—")}</strong>
              </p>
              <p>
                <span className="text-[#6B7280]">Configured:</span>{" "}
                <strong className="text-[#111827]">{status?.configured ? "Yes" : "No"}</strong>
              </p>
              <p className="sm:col-span-2 truncate">
                <span className="text-[#6B7280]">Redirect URI:</span>{" "}
                <strong className="text-[#111827]">{String(status?.redirectUri || "—")}</strong>
              </p>
            </div>
            <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Analytics / Search Console ke liye{" "}
              <strong>indiaholidaydestinations.in@gmail.com</strong> se connect karo. Agar dusra Gmail
              dikhe to <strong>Disconnect</strong> → <strong>Connect Google Account</strong> dabao aur
              sahi account choose karo.
            </p>
            {status?.connected &&
            String(status.email || "").toLowerCase() !== "indiaholidaydestinations.in@gmail.com" ? (
              <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                Abhi galat account connected hai ({String(status.email)}). Reconnect with
                indiaholidaydestinations.in@gmail.com, warna GA4 Sync fail ho sakta hai.
              </p>
            ) : null}
            {status?.lastError ? (
              <p className="mt-3 text-sm text-amber-700">{String(status.lastError)}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <AdminField label="Search Console Property" className="min-w-[280px] flex-1">
                <input
                  className={adminInputClass}
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  placeholder="sc-domain:treks.indiaholidaydestination.com"
                />
              </AdminField>
              <Button variant="outline" disabled={busy} onClick={() => void saveProperty()}>
                Save Property
              </Button>
            </div>
          </div>
          <div className="hidden items-center justify-center rounded-2xl border border-[#E8ECF1] bg-[#F7FAF6] p-4 lg:flex">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-20 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#E5EBE3]">
                <BarChartMini />
              </div>
              <p className="text-xs font-semibold text-[#6B7280]">Search Console live</p>
            </div>
          </div>
        </div>
      </SeoPanel>

      {/* Metric cards with sparklines */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SeoMetricCard
          label="Total Clicks"
          value={num(totals.clicks).toLocaleString()}
          icon={MousePointerClick}
          iconTone="bg-[#DCFCE7] text-[#16A34A]"
          spark="green"
          hint="No data yet"
        />
        <SeoMetricCard
          label="Total Impressions"
          value={num(totals.impressions).toLocaleString()}
          icon={Eye}
          iconTone="bg-[#DBEAFE] text-[#2563EB]"
          spark="blue"
          hint="No data yet"
        />
        <SeoMetricCard
          label="Average CTR"
          value={`${(num(totals.ctr) * 100).toFixed(2)}%`}
          icon={Search}
          iconTone="bg-[#FFEDD5] text-[#EA580C]"
          spark="orange"
          hint="No data yet"
        />
        <SeoMetricCard
          label="Average Position"
          value={num(totals.position).toFixed(1)}
          icon={Search}
          iconTone="bg-[#F3E8FF] text-[#9333EA]"
          spark="purple"
          hint="No data yet"
        />
        <SeoMetricCard
          label="Indexed Pages"
          value={num(coverage.indexed)}
          icon={FileWarning}
          iconTone="bg-[#CCFBF1] text-[#0F766E]"
          spark="teal"
          hint="No data yet"
        />
        <SeoMetricCard
          label="Excluded Pages"
          value={num(coverage.excluded)}
          icon={AlertTriangle}
          iconTone="bg-[#FEE2E2] text-[#DC2626]"
          spark="red"
          hint="No data yet"
        />
        <SeoMetricCard
          label="Pages With Errors"
          value={num(coverage.errors)}
          icon={ShieldAlert}
          iconTone="bg-[#FFEDD5] text-[#EA580C]"
          spark="orange"
          hint="No data yet"
        />
        <SeoMetricCard
          label="Coverage Status"
          value={String(dash?.coverageStatus || "Unknown")}
          icon={Eye}
          iconTone="bg-[#E5E7EB] text-[#4B5563]"
          spark="blue"
          hint="No data yet"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SeoPerformanceChart title="Performance Over Time" />
        <SeoPanel title="Top Queries">
          <SeoSimpleTable
            headers={["Query", "Clicks", "Impressions", "CTR", "Position"]}
            empty="No data available yet"
            rows={pagedQueries.map((q) => [
              String(q.query || ""),
              num(q.clicks),
              num(q.impressions),
              `${(num(q.ctr) * 100).toFixed(2)}%`,
              num(q.position).toFixed(1),
            ])}
          />
          <SeoTablePagination
            page={queriesPage}
            pageSize={QUERIES_PAGE_SIZE}
            total={topQueries.length}
            onPageChange={setQueriesPage}
          />
        </SeoPanel>
      </div>

      {/* Auto sitemap + push blogs */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SeoPanel
          title="Auto Sitemap"
          description="XML feeds stay live from MongoDB. New published blogs/treks/destinations appear automatically and can be resubmitted to Google."
          action={
            <Button
              variant="primary"
              disabled={busy || !status?.connected}
              onClick={() => void submitAllSitemaps()}
            >
              Submit All Sitemaps
            </Button>
          }
        >
          <ul className="space-y-2 text-sm text-[#374151]">
            <li>• Index: /sitemap.xml</li>
            <li>• Blogs: /sitemaps/blogs.xml</li>
            <li>• Treks: /sitemaps/treks.xml</li>
            <li>• Destinations: /sitemaps/destinations.xml</li>
          </ul>
          {submitAllResult.length ? (
            <div className="mt-4">
              <SeoSimpleTable
                headers={["Sitemap", "Status"]}
                rows={submitAllResult.map((r) => [String(r.url || ""), String(r.status || "")])}
              />
            </div>
          ) : null}
        </SeoPanel>

        <SeoPanel
          title="Push Blogs to Search Console"
          description="Submits blogs sitemap, then notifies Google about latest published blog URLs."
          action={
            <Button
              variant="primary"
              disabled={busy || !status?.connected}
              onClick={() => void pushBlogs()}
            >
              Push Latest Blogs
            </Button>
          }
        >
          <p className="text-sm text-[#6b7280]">
            First time: click <strong>Reconnect</strong> for Indexing scope. Publishing a blog also
            auto-notifies Google.
          </p>
          {pushResult ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-[#374151]">
                Blogs processed: {String(pushResult.blogsCount ?? 0)}
              </p>
              <SeoSimpleTable
                headers={["Blog URL", "Status"]}
                rows={((pushResult.urls as Array<Record<string, unknown>>) || [])
                  .slice(0, 12)
                  .map((u) => [String(u.url || u.slug || ""), String(u.status || "")])}
              />
            </div>
          ) : null}
        </SeoPanel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SeoPanel title="Connected Properties">
          <SeoSimpleTable
            headers={["Property", "Permission"]}
            rows={connectedProperties.map((site) => [
              String(site.siteUrl || ""),
              String(site.permissionLevel || ""),
            ])}
          />
        </SeoPanel>

        <SeoPanel
          title="Submit Sitemap"
          description="Submit or resubmit a single sitemap feed"
          action={
            <Button variant="primary" disabled={busy} onClick={() => void submitSitemap()}>
              Submit Sitemap
            </Button>
          }
        >
          <AdminField label="Sitemap URL">
            <input
              className={adminInputClass}
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
            />
          </AdminField>
          <div className="mt-4">
            <SeoSimpleTable
              headers={["Path", "Pending", "Errors", "Warnings"]}
              rows={sitemaps.map((s) => [
                String(s.path || ""),
                String(Boolean(s.isPending)),
                num(s.errorCount ?? s.errors),
                num(s.warnings),
              ])}
            />
          </div>
        </SeoPanel>
      </div>

      <SeoPanel title="Top Landing Pages">
        <SeoSimpleTable
          headers={["Page", "Clicks", "Impressions", "CTR", "Position"]}
          rows={pagedPages.map((p) => [
            String(p.page || ""),
            num(p.clicks),
            num(p.impressions),
            `${(num(p.ctr) * 100).toFixed(2)}%`,
            num(p.position).toFixed(1),
          ])}
        />
        <SeoTablePagination
          page={pagesPage}
          pageSize={PAGES_PAGE_SIZE}
          total={topPages.length}
          onPageChange={setPagesPage}
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
          <input
            className={adminInputClass}
            value={inspectUrl}
            onChange={(e) => setInspectUrl(e.target.value)}
          />
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

function BarChartMini() {
  return (
    <svg viewBox="0 0 64 48" className="h-10 w-14 text-[#2D5A27]" aria-hidden>
      <rect x="6" y="28" width="8" height="14" rx="2" fill="currentColor" opacity="0.35" />
      <rect x="20" y="18" width="8" height="24" rx="2" fill="currentColor" opacity="0.55" />
      <rect x="34" y="10" width="8" height="32" rx="2" fill="currentColor" opacity="0.75" />
      <rect x="48" y="20" width="8" height="22" rx="2" fill="currentColor" />
    </svg>
  );
}
