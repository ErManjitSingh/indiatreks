"use client";

import { useEffect, useState } from "react";

import { AdminField, AdminPageHeader, adminInputClass, adminTextareaClass } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import {
  adminCreateRedirect,
  adminDeleteRedirect,
  adminGenerateSitemaps,
  adminGetAnalyticsConfig,
  adminGetRobots,
  adminGetSearchConsole,
  adminGetSeoSettings,
  adminList404,
  adminListProgrammatic,
  adminListRedirects,
  adminSeedProgrammatic,
  adminUpdateAnalyticsConfig,
  adminUpdateRobots,
  adminUpdateSearchConsole,
  adminUpdateSeoSettings,
  adminUpsertSeoPage,
  type SeoDoc,
} from "@/lib/api/seo";

type Tab = "homepage" | "settings" | "robots" | "sitemaps" | "redirects" | "404" | "console" | "analytics" | "programmatic";

const TABS: { id: Tab; label: string }[] = [
  { id: "homepage", label: "Homepage SEO" },
  { id: "settings", label: "Global Settings" },
  { id: "robots", label: "Robots" },
  { id: "sitemaps", label: "Sitemaps" },
  { id: "redirects", label: "Redirects" },
  { id: "404", label: "404 Manager" },
  { id: "console", label: "Search Console" },
  { id: "analytics", label: "Analytics" },
  { id: "programmatic", label: "Programmatic" },
];

export default function AdminSeoPage() {
  const [tab, setTab] = useState<Tab>("homepage");
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SeoDoc | null>(null);
  const [robots, setRobots] = useState<SeoDoc | null>(null);
  const [searchConsole, setSearchConsole] = useState<SeoDoc | null>(null);
  const [analytics, setAnalytics] = useState<SeoDoc | null>(null);
  const [redirects, setRedirects] = useState<SeoDoc[]>([]);
  const [notFound, setNotFound] = useState<SeoDoc[]>([]);
  const [programmatic, setProgrammatic] = useState<SeoDoc[]>([]);
  const [newRedirect, setNewRedirect] = useState({ fromPath: "", toPath: "", statusCode: "301" });
  const [homepage, setHomepage] = useState({
    path: "/",
    metaTitle: "",
    metaDescription: "",
    canonical: "/",
    ogImage: "",
    robots: "index,follow",
  });

  async function load() {
    setLoading(true);
    try {
      const [s, r, sc, a, red, nf, prog] = await Promise.all([
        adminGetSeoSettings(),
        adminGetRobots(),
        adminGetSearchConsole(),
        adminGetAnalyticsConfig(),
        adminListRedirects({ limit: 50 }),
        adminList404({ limit: 50 }),
        adminListProgrammatic({ limit: 50 }),
      ]);
      setSettings(s);
      setRobots(r);
      setSearchConsole(sc);
      setAnalytics(a);
      setRedirects(red.items);
      setNotFound(nf.items);
      setProgrammatic(prog.items);
      const hp = (s?.homepage as Record<string, string> | undefined) ?? {};
      setHomepage({
        path: "/",
        metaTitle: hp.title || String(s?.defaultTitle || ""),
        metaDescription: hp.description || String(s?.defaultDescription || ""),
        canonical: hp.canonical || "/",
        ogImage: hp.ogImage || String(s?.defaultOgImage || ""),
        robots: "index,follow",
      });
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load SEO settings"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  if (loading) {
    return <p className="p-6 text-sm text-[#6B7280]">Loading SEO management…</p>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <AdminPageHeader
        title="SEO Management"
        description="Global SEO settings, robots, sitemaps, redirects, Search Console, and analytics tags."
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-full px-3 py-1.5 text-sm ${
              tab === item.id ? "bg-[#111827] text-white" : "bg-white text-[#374151] border border-[#E5E7EB]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "homepage" ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Homepage SEO</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Meta title">
              <input
                className={adminInputClass}
                value={homepage.metaTitle}
                onChange={(e) => setHomepage((p) => ({ ...p, metaTitle: e.target.value }))}
              />
            </AdminField>
            <AdminField label="Canonical">
              <input
                className={adminInputClass}
                value={homepage.canonical}
                onChange={(e) => setHomepage((p) => ({ ...p, canonical: e.target.value }))}
              />
            </AdminField>
          </div>
          <AdminField label="Meta description">
            <textarea
              className={adminTextareaClass}
              value={homepage.metaDescription}
              onChange={(e) => setHomepage((p) => ({ ...p, metaDescription: e.target.value }))}
            />
          </AdminField>
          <Button
            type="button"
            variant="primary"
            onClick={async () => {
              try {
                await adminUpsertSeoPage(homepage);
                await adminUpdateSeoSettings({
                  homepage: {
                    title: homepage.metaTitle,
                    description: homepage.metaDescription,
                    canonical: homepage.canonical,
                    ogImage: homepage.ogImage,
                  },
                });
                toast.success("Homepage SEO saved");
              } catch (err) {
                toast.error(getErrorMessage(err, "Could not save homepage SEO"));
              }
            }}
          >
            Save homepage SEO
          </Button>
        </section>
      ) : null}

      {tab === "settings" && settings ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Global SEO settings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {(["siteName", "siteUrl", "defaultTitle", "defaultOgImage"] as const).map((key) => (
              <AdminField key={key} label={key}>
                <input
                  className={adminInputClass}
                  value={String(settings[key] ?? "")}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                />
              </AdminField>
            ))}
          </div>
          <AdminField label="Default description">
            <textarea
              className={adminTextareaClass}
              value={String(settings.defaultDescription ?? "")}
              onChange={(e) => setSettings({ ...settings, defaultDescription: e.target.value })}
            />
          </AdminField>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Google verification">
              <input
                className={adminInputClass}
                value={String((settings.verification as Record<string, string> | undefined)?.google ?? "")}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    verification: {
                      ...((settings.verification as object) || {}),
                      google: e.target.value,
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Bing verification">
              <input
                className={adminInputClass}
                value={String((settings.verification as Record<string, string> | undefined)?.bing ?? "")}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    verification: {
                      ...((settings.verification as object) || {}),
                      bing: e.target.value,
                    },
                  })
                }
              />
            </AdminField>
          </div>
          <Button
            type="button"
            variant="primary"
            onClick={async () => {
              try {
                await adminUpdateSeoSettings(settings);
                toast.success("SEO settings saved");
              } catch (err) {
                toast.error(getErrorMessage(err, "Could not save settings"));
              }
            }}
          >
            Save settings
          </Button>
        </section>
      ) : null}

      {tab === "robots" && robots ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Robots.txt</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(robots.enabled)}
              onChange={(e) => setRobots({ ...robots, enabled: e.target.checked })}
            />
            Enabled
          </label>
          <AdminField label="Host">
            <input
              className={adminInputClass}
              value={String(robots.host ?? "")}
              onChange={(e) => setRobots({ ...robots, host: e.target.value })}
            />
          </AdminField>
          <AdminField label="Custom robots.txt (optional override)">
            <textarea
              className={`${adminTextareaClass} min-h-[180px] font-mono text-xs`}
              value={String(robots.customContent ?? "")}
              onChange={(e) => setRobots({ ...robots, customContent: e.target.value })}
            />
          </AdminField>
          <Button
            type="button"
            variant="primary"
            onClick={async () => {
              try {
                await adminUpdateRobots(robots);
                toast.success("Robots config saved");
              } catch (err) {
                toast.error(getErrorMessage(err, "Could not save robots"));
              }
            }}
          >
            Save robots
          </Button>
        </section>
      ) : null}

      {tab === "sitemaps" ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Sitemaps</h2>
          <p className="text-sm text-[#6B7280]">
            Child sitemaps: treks, blogs, destinations, images, videos, categories, programmatic.
          </p>
          <Button
            type="button"
            variant="primary"
            onClick={async () => {
              try {
                const result = await adminGenerateSitemaps();
                toast.success(`Generated ${result?.length ?? 0} sitemaps`);
              } catch (err) {
                toast.error(getErrorMessage(err, "Sitemap generation failed"));
              }
            }}
          >
            Regenerate all sitemaps
          </Button>
        </section>
      ) : null}

      {tab === "redirects" ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Redirect manager</h2>
          <div className="grid gap-3 md:grid-cols-4">
            <input
              className={adminInputClass}
              placeholder="/old-path"
              value={newRedirect.fromPath}
              onChange={(e) => setNewRedirect((p) => ({ ...p, fromPath: e.target.value }))}
            />
            <input
              className={adminInputClass}
              placeholder="/new-path"
              value={newRedirect.toPath}
              onChange={(e) => setNewRedirect((p) => ({ ...p, toPath: e.target.value }))}
            />
            <select
              className={adminInputClass}
              value={newRedirect.statusCode}
              onChange={(e) => setNewRedirect((p) => ({ ...p, statusCode: e.target.value }))}
            >
              <option value="301">301</option>
              <option value="302">302</option>
            </select>
            <Button
              type="button"
              variant="primary"
              onClick={async () => {
                try {
                  await adminCreateRedirect({
                    ...newRedirect,
                    statusCode: Number(newRedirect.statusCode),
                  });
                  setNewRedirect({ fromPath: "", toPath: "", statusCode: "301" });
                  toast.success("Redirect created");
                  await load();
                } catch (err) {
                  toast.error(getErrorMessage(err, "Could not create redirect"));
                }
              }}
            >
              Add redirect
            </Button>
          </div>
          <div className="space-y-2">
            {redirects.map((item) => (
              <div key={String(item._id)} className="flex items-center justify-between gap-3 rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm">
                <span>
                  {String(item.fromPath)} → {String(item.toPath)} ({String(item.statusCode)})
                </span>
                <button
                  type="button"
                  className="text-red-600"
                  onClick={async () => {
                    await adminDeleteRedirect(String(item._id));
                    toast.success("Redirect deleted");
                    await load();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {tab === "404" ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">404 manager</h2>
          <div className="space-y-2">
            {notFound.map((item) => (
              <div key={String(item._id)} className="rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm">
                <p className="font-medium">{String(item.path)}</p>
                <p className="text-xs text-[#6B7280]">
                  Hits: {String(item.hitCount)} · Last: {String(item.lastHitAt || "")}
                </p>
              </div>
            ))}
            {!notFound.length ? <p className="text-sm text-[#6B7280]">No 404 logs yet.</p> : null}
          </div>
        </section>
      ) : null}

      {tab === "console" && searchConsole ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Google Search Console</h2>
          <AdminField label="Property URL">
            <input
              className={adminInputClass}
              value={String(searchConsole.propertyUrl ?? "")}
              onChange={(e) => setSearchConsole({ ...searchConsole, propertyUrl: e.target.value })}
            />
          </AdminField>
          <AdminField label="Verification meta tag content">
            <input
              className={adminInputClass}
              value={String(searchConsole.verificationMetaTag ?? "")}
              onChange={(e) => setSearchConsole({ ...searchConsole, verificationMetaTag: e.target.value })}
            />
          </AdminField>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(searchConsole.isVerified)}
              onChange={(e) => setSearchConsole({ ...searchConsole, isVerified: e.target.checked })}
            />
            Marked as verified
          </label>
          <Button
            type="button"
            variant="primary"
            onClick={async () => {
              try {
                await adminUpdateSearchConsole(searchConsole);
                toast.success("Search Console settings saved");
              } catch (err) {
                toast.error(getErrorMessage(err, "Could not save Search Console"));
              }
            }}
          >
            Save
          </Button>
        </section>
      ) : null}

      {tab === "analytics" && analytics ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Analytics tags</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="GA4 Measurement ID">
              <input
                className={adminInputClass}
                value={String((analytics.ga4 as Record<string, string> | undefined)?.measurementId ?? "")}
                onChange={(e) =>
                  setAnalytics({
                    ...analytics,
                    ga4: { ...((analytics.ga4 as object) || {}), enabled: true, measurementId: e.target.value },
                  })
                }
              />
            </AdminField>
            <AdminField label="GTM Container ID">
              <input
                className={adminInputClass}
                value={String((analytics.gtm as Record<string, string> | undefined)?.containerId ?? "")}
                onChange={(e) =>
                  setAnalytics({
                    ...analytics,
                    gtm: { ...((analytics.gtm as object) || {}), enabled: true, containerId: e.target.value },
                  })
                }
              />
            </AdminField>
            <AdminField label="Meta Pixel ID">
              <input
                className={adminInputClass}
                value={String((analytics.metaPixel as Record<string, string> | undefined)?.pixelId ?? "")}
                onChange={(e) =>
                  setAnalytics({
                    ...analytics,
                    metaPixel: {
                      ...((analytics.metaPixel as object) || {}),
                      enabled: true,
                      pixelId: e.target.value,
                    },
                  })
                }
              />
            </AdminField>
            <AdminField label="Microsoft Clarity Project ID">
              <input
                className={adminInputClass}
                value={String((analytics.clarity as Record<string, string> | undefined)?.projectId ?? "")}
                onChange={(e) =>
                  setAnalytics({
                    ...analytics,
                    clarity: {
                      ...((analytics.clarity as object) || {}),
                      enabled: true,
                      projectId: e.target.value,
                    },
                  })
                }
              />
            </AdminField>
          </div>
          <Button
            type="button"
            variant="primary"
            onClick={async () => {
              try {
                await adminUpdateAnalyticsConfig(analytics);
                toast.success("Analytics config saved");
              } catch (err) {
                toast.error(getErrorMessage(err, "Could not save analytics"));
              }
            }}
          >
            Save analytics
          </Button>
        </section>
      ) : null}

      {tab === "programmatic" ? (
        <section className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-heading text-lg font-bold">Programmatic SEO pages</h2>
            <Button
              type="button"
              variant="primary"
              onClick={async () => {
                try {
                  const result = await adminSeedProgrammatic();
                  toast.success(`Seeded ${result?.count ?? 0} pages`);
                  await load();
                } catch (err) {
                  toast.error(getErrorMessage(err, "Seed failed"));
                }
              }}
            >
              Seed default pages
            </Button>
          </div>
          <div className="space-y-2">
            {programmatic.map((page) => (
              <div key={String(page._id)} className="rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm">
                <p className="font-medium">{String(page.title)}</p>
                <p className="text-xs text-[#6B7280]">{String(page.path)}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
