"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { AdminField, AdminPageHeader, adminInputClass } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import {
  adminAiDashboard,
  adminBlogAssist,
  adminLandingAssist,
  adminListSeoAudits,
  adminRunSeoAudit,
  adminSuggestImageSeo,
  type SeoDoc,
} from "@/lib/api/seo";

type Dash = Record<string, unknown>;

function StatCard({ label, value, href }: { label: string; value: number | string; href?: string }) {
  const inner = (
    <div className="rounded-2xl border border-[#d8e0d4] bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">{label}</p>
      <p className="mt-2 font-heading text-2xl font-bold text-[#111827]">{value}</p>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function IssueList({
  title,
  items,
}: {
  title: string;
  items: Array<{ type?: string; slug?: string; title?: string; score?: number }>;
}) {
  return (
    <section className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
      <h3 className="font-heading text-base font-bold text-[#111827]">
        {title} <span className="text-sm font-normal text-[#6b7280]">({items.length})</span>
      </h3>
      <ul className="mt-3 max-h-48 space-y-1 overflow-auto text-sm">
        {items.slice(0, 40).map((item, index) => (
          <li key={`${item.type}-${item.slug}-${index}`} className="text-[#374151]">
            <span className="uppercase text-[10px] text-[#9ca3af]">{item.type}</span>{" "}
            {item.title || item.slug}
            {item.score != null ? <span className="text-[#9ca3af]"> · {item.score}/100</span> : null}
          </li>
        ))}
        {!items.length ? <li className="text-[#9ca3af]">None detected</li> : null}
      </ul>
    </section>
  );
}

export default function AdminAiSeoPage() {
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [dash, setDash] = useState<Dash | null>(null);
  const [audits, setAudits] = useState<SeoDoc[]>([]);
  const [landing, setLanding] = useState({ filterType: "destination", filterValue: "manali", title: "" });
  const [landingResult, setLandingResult] = useState<Record<string, unknown> | null>(null);
  const [blogTopic, setBlogTopic] = useState("");
  const [blogResult, setBlogResult] = useState<Record<string, unknown> | null>(null);
  const [imageCtx, setImageCtx] = useState({ contextTitle: "", destinationName: "", fileName: "" });
  const [imageResult, setImageResult] = useState<Record<string, string> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [d, a] = await Promise.all([adminAiDashboard(), adminListSeoAudits({ limit: 10 })]);
      setDash(d);
      setAudits(a.items);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load AI SEO dashboard"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <p className="p-6 text-sm text-[#6B7280]">Loading AI SEO Engine…</p>;
  }

  const health = Number(dash?.overallSeoHealth ?? 0);
  const sc = (dash?.searchConsole as Record<string, unknown> | undefined) ?? {};
  const analytics = (dash?.analytics as Record<string, unknown> | undefined) ?? {};
  const sections = (analytics.sections as Record<string, unknown> | undefined) ?? {};

  return (
    <div className="space-y-6 p-4 md:p-6">
      <AdminPageHeader
        title="AI SEO Engine"
        description="Recommendations, drafts, audits, and assistants — always review before publishing."
      />

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="primary"
          disabled={running}
          onClick={async () => {
            setRunning(true);
            try {
              await adminRunSeoAudit();
              toast.success("SEO audit completed");
              await load();
            } catch (err) {
              toast.error(getErrorMessage(err, "Audit failed"));
            } finally {
              setRunning(false);
            }
          }}
        >
          {running ? "Running audit…" : "Run project-wide SEO audit"}
        </Button>
        <Link
          href="/admin/seo"
          className="inline-flex h-10 items-center rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm"
        >
          Global SEO settings
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall SEO Health" value={`${health}/100`} />
        <StatCard label="Pages scanned" value={Number(dash?.pagesScanned ?? 0)} />
        <StatCard label="Missing meta" value={(dash?.missingMeta as unknown[])?.length ?? 0} />
        <StatCard label="Low content quality" value={(dash?.lowContentQuality as unknown[])?.length ?? 0} />
      </div>

      {(dash?.seoImprovementSuggestions as string[] | undefined)?.length ? (
        <section className="rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-4">
          <h2 className="font-heading text-base font-bold text-[#92400e]">SEO improvement suggestions</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#78350f]">
            {(dash?.seoImprovementSuggestions as string[]).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <IssueList title="Pages with missing meta" items={(dash?.missingMeta as never) || []} />
        <IssueList title="Pages missing schema" items={(dash?.missingSchema as never) || []} />
        <IssueList title="Missing alt text" items={(dash?.missingAltText as never) || []} />
        <IssueList title="Missing canonicals" items={(dash?.missingCanonicals as never) || []} />
        <IssueList title="Pages without FAQs" items={(dash?.pagesWithoutFaqs as never) || []} />
        <IssueList title="Low content quality" items={(dash?.lowContentQuality as never) || []} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
          <h3 className="font-heading text-base font-bold">Duplicate titles</h3>
          <ul className="mt-3 max-h-40 space-y-1 overflow-auto text-sm">
            {((dash?.duplicateTitles as Array<{ title: string; items: unknown[] }>) || []).map((d) => (
              <li key={d.title}>
                “{d.title}” · {d.items.length} pages
              </li>
            ))}
            {!((dash?.duplicateTitles as unknown[]) || []).length ? (
              <li className="text-[#9ca3af]">No duplicates</li>
            ) : null}
          </ul>
        </section>
        <section className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
          <h3 className="font-heading text-base font-bold">Duplicate descriptions</h3>
          <ul className="mt-3 max-h-40 space-y-1 overflow-auto text-sm">
            {((dash?.duplicateDescriptions as Array<{ description: string; items: unknown[] }>) || []).map(
              (d) => (
                <li key={d.description.slice(0, 40)}>
                  {d.description.slice(0, 80)}… · {d.items.length} pages
                </li>
              ),
            )}
            {!((dash?.duplicateDescriptions as unknown[]) || []).length ? (
              <li className="text-[#9ca3af]">No duplicates</li>
            ) : null}
          </ul>
        </section>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
          <h3 className="font-heading text-base font-bold">Search Console tools</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-[#6b7280]">Verification</dt>
              <dd>{sc.isVerified ? "Verified" : sc.connected ? "Tag saved / pending" : "Not connected"}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#6b7280]">Property</dt>
              <dd className="truncate">{String(sc.propertyUrl || "—")}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#6b7280]">Sitemaps submitted</dt>
              <dd>{Number((sc.coverageOverview as { submittedSitemaps?: number } | undefined)?.submittedSitemaps ?? 0)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#6b7280]">Indexing requests pending</dt>
              <dd>
                {Number((sc.coverageOverview as { pendingIndexRequests?: number } | undefined)?.pendingIndexRequests ?? 0)}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-[#6b7280]">
            {(sc.coverageOverview as { note?: string } | undefined)?.note ||
              "Configure verification under Global SEO."}
          </p>
        </div>

        <div className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
          <h3 className="font-heading text-base font-bold">Analytics dashboard (ready)</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {[
              ["Organic Traffic", sections.organicTraffic],
              ["CTR Overview", sections.ctrOverview],
              ["Avg Position", sections.averagePosition],
              ["Clicks", sections.clicks],
              ["Impressions", sections.impressions],
            ].map(([label, val]) => {
              const metric = val as { value?: unknown; status?: string } | undefined;
              const display =
                metric?.value === null || metric?.value === undefined
                  ? "Awaiting data"
                  : String(metric.value);
              return (
              <div key={String(label)} className="rounded-xl bg-[#f9fafb] p-3">
                <p className="text-xs text-[#6b7280]">{String(label)}</p>
                <p className="mt-1 font-medium text-[#111827]">{display}</p>
              </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-[#6b7280]">{String(analytics.note || "")}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
          <h3 className="font-heading text-base font-bold">Landing page assistant</h3>
          <div className="mt-3 space-y-2">
            <select
              className={adminInputClass}
              value={landing.filterType}
              onChange={(e) => setLanding((p) => ({ ...p, filterType: e.target.value }))}
            >
              {["state", "destination", "season", "difficulty", "duration", "theme"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              className={adminInputClass}
              placeholder="Filter value (e.g. manali)"
              value={landing.filterValue}
              onChange={(e) => setLanding((p) => ({ ...p, filterValue: e.target.value }))}
            />
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                try {
                  const data = await adminLandingAssist(landing);
                  setLandingResult(data);
                  toast.success("Landing template draft ready");
                } catch (err) {
                  toast.error(getErrorMessage(err, "Landing assist failed"));
                }
              }}
            >
              Generate template
            </Button>
            {landingResult ? (
              <pre className="max-h-48 overflow-auto rounded-lg bg-[#f9fafb] p-2 text-[11px]">
                {JSON.stringify(landingResult, null, 2)}
              </pre>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
          <h3 className="font-heading text-base font-bold">Blog assistant</h3>
          <div className="mt-3 space-y-2">
            <AdminField label="Topic / title">
              <input
                className={adminInputClass}
                value={blogTopic}
                onChange={(e) => setBlogTopic(e.target.value)}
                placeholder="Best time for Triund trek"
              />
            </AdminField>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                try {
                  const data = await adminBlogAssist({ title: blogTopic, topic: blogTopic });
                  setBlogResult(data);
                  toast.success("Blog outline draft ready");
                } catch (err) {
                  toast.error(getErrorMessage(err, "Blog assist failed"));
                }
              }}
            >
              Suggest outline
            </Button>
            {blogResult ? (
              <pre className="max-h-48 overflow-auto rounded-lg bg-[#f9fafb] p-2 text-[11px]">
                {JSON.stringify(blogResult, null, 2)}
              </pre>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
          <h3 className="font-heading text-base font-bold">Image SEO assistant</h3>
          <div className="mt-3 space-y-2">
            <input
              className={adminInputClass}
              placeholder="Context title"
              value={imageCtx.contextTitle}
              onChange={(e) => setImageCtx((p) => ({ ...p, contextTitle: e.target.value }))}
            />
            <input
              className={adminInputClass}
              placeholder="Destination"
              value={imageCtx.destinationName}
              onChange={(e) => setImageCtx((p) => ({ ...p, destinationName: e.target.value }))}
            />
            <input
              className={adminInputClass}
              placeholder="File name"
              value={imageCtx.fileName}
              onChange={(e) => setImageCtx((p) => ({ ...p, fileName: e.target.value }))}
            />
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                try {
                  const data = await adminSuggestImageSeo(imageCtx);
                  setImageResult(data?.suggestions ?? null);
                  toast.success("Image SEO draft ready — review before use");
                } catch (err) {
                  toast.error(getErrorMessage(err, "Image assist failed"));
                }
              }}
            >
              Suggest alt / caption
            </Button>
            {imageResult ? (
              <ul className="space-y-1 text-sm">
                {Object.entries(imageResult).map(([k, v]) => (
                  <li key={k}>
                    <span className="text-[#6b7280]">{k}:</span> {v}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#d8e0d4] bg-white p-4">
        <h3 className="font-heading text-base font-bold">Recent SEO audits / reports</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {audits.map((a) => (
            <li key={String(a._id)} className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f3f4f6] py-2">
              <span>
                {String(a.status)} · health{" "}
                {String((a.summary as { healthScore?: number } | undefined)?.healthScore ?? "—")}/100 · issues{" "}
                {String((a.summary as { totalIssues?: number } | undefined)?.totalIssues ?? 0)}
              </span>
              <span className="text-xs text-[#9ca3af]">{String(a.createdAt || "")}</span>
            </li>
          ))}
          {!audits.length ? <li className="text-[#9ca3af]">No audits yet — run one above.</li> : null}
        </ul>
      </section>
    </div>
  );
}
