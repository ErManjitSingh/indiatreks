"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Eye,
  FileText,
  FolderKanban,
  HelpCircle,
  LayoutGrid,
  MapPin,
  Mountain,
  Newspaper,
  Users,
} from "lucide-react";

import { getStoredUser, type AuthUser } from "@/lib/api/auth";
import {
  adminGetDashboardStats,
  adminGetSettings,
  getErrorMessage,
  type AdminDashboardStats,
} from "@/lib/api/admin";
import { cn } from "@/lib/utils";

function roleLabel(role?: string) {
  if (!role) return "Super Admin";
  return role.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) return String(value);
  return n.toLocaleString("en-IN");
}

function Sparkline({
  points,
  tone = "green",
}: {
  points: number[];
  tone?: "green" | "blue" | "orange" | "purple";
}) {
  const stroke =
    tone === "blue" ? "#3B82F6" : tone === "orange" ? "#F97316" : tone === "purple" ? "#9333EA" : "#22C55E";
  const fill =
    tone === "blue" ? "#DBEAFE" : tone === "orange" ? "#FFEDD5" : tone === "purple" ? "#F3E8FF" : "#DCFCE7";

  const path = useMemo(() => {
    if (!points.length) return { line: "", area: "" };
    const max = Math.max(...points, 1);
    const w = 120;
    const h = 32;
    const step = points.length > 1 ? w / (points.length - 1) : w;
    const coords = points.map((p, i) => {
      const x = i * step;
      const y = h - (p / max) * (h - 4) - 2;
      return `${x},${y}`;
    });
    const line = `M${coords.join(" L")}`;
    const area = `${line} L${w},${h} L0,${h} Z`;
    return { line, area };
  }, [points]);

  if (!points.length) return null;

  return (
    <svg viewBox="0 0 120 32" className="mt-3 h-8 w-full" aria-hidden>
      <path d={path.area} fill={fill} opacity="0.55" />
      <path d={path.line} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AnalyticsChart({ series }: { series: Array<{ date: string; count: number }> }) {
  const { line, area, labels } = useMemo(() => {
    if (!series.length) return { line: "", area: "", labels: [] as string[] };
    const max = Math.max(...series.map((s) => s.count), 1);
    const w = 560;
    const h = 160;
    const step = series.length > 1 ? w / (series.length - 1) : w;
    const coords = series.map((s, i) => {
      const x = i * step;
      const y = h - 20 - (s.count / max) * (h - 36);
      return { x, y, date: s.date, count: s.count };
    });
    const linePath = `M${coords.map((c) => `${c.x},${c.y}`).join(" L")}`;
    const areaPath = `${linePath} L${w},${h} L0,${h} Z`;
    const labels = [0, Math.floor(series.length / 2), series.length - 1]
      .filter((i, idx, arr) => arr.indexOf(i) === idx && i >= 0 && i < series.length)
      .map((i) => series[i]?.date?.slice(5) || "");
    return { line: linePath, area: areaPath, labels };
  }, [series]);

  if (!series.length) {
    return (
      <p className="mt-8 text-center text-sm text-[#9CA3AF]">No content activity in the last 30 days.</p>
    );
  }

  return (
    <div className="mt-4">
      <svg viewBox="0 0 560 160" className="h-40 w-full" aria-hidden>
        <defs>
          <linearGradient id="contentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[32, 64, 96, 128].map((y) => (
          <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#F3F4F6" strokeWidth="1" />
        ))}
        <path d={area} fill="url(#contentFill)" />
        <path d={line} fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-[#9CA3AF]">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

const activityTone: Record<string, string> = {
  trek: "bg-[#DCFCE7] text-[#16A34A]",
  blog: "bg-[#FFEDD5] text-[#EA580C]",
  destination: "bg-[#F3E8FF] text-[#9333EA]",
  media: "bg-[#DBEAFE] text-[#2563EB]",
  faq: "bg-[#CFFAFE] text-[#0891B2]",
};

const activityIcon = {
  trek: Mountain,
  blog: Newspaper,
  destination: MapPin,
  media: FolderKanban,
  faq: HelpCircle,
} as const;

export default function AdminOverviewPage() {
  const [dash, setDash] = useState<AdminDashboardStats | null>(null);
  const [siteName, setSiteName] = useState("India Holiday Destinations");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    let cancelled = false;
    (async () => {
      try {
        const [dashboard, settings] = await Promise.all([
          adminGetDashboardStats(),
          adminGetSettings("site"),
        ]);
        if (cancelled) return;
        const site = (settings["site.config"] as { name?: string } | undefined) ?? {};
        setSiteName(String(site.name ?? "India Holiday Destinations"));
        setDash(dashboard);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Could not load dashboard stats."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const name = user?.name || "Super Admin";
  const dateLabel = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  const trekCount = Number(dash?.treks?.total ?? 0);
  const destinationCount = Number(dash?.content?.destinations ?? 0);
  const blogCount = Number(dash?.content?.blogs ?? 0);
  const bookingCount = Number(dash?.bookings?.total ?? 0);
  const faqCount = Number(dash?.content?.faqs ?? 0);
  const categoryCount = Number(dash?.content?.categories ?? 0);
  const mediaCount = Number(dash?.content?.media ?? 0);
  const settingsCount = Number(dash?.content?.settings ?? 0);
  const userCount = Number(dash?.users?.total ?? 0);
  const enquiryTotal = Number(dash?.enquiries?.total ?? 0);
  const enquiryNew = Number(dash?.enquiries?.new ?? 0);
  const blogViews = Number(dash?.content?.blogViews ?? dash?.analytics?.blogViews ?? 0);
  const analytics = dash?.analytics;
  const contentSeries = dash?.series?.content ?? analytics?.series ?? [];
  const trekSeries = (dash?.series?.treks ?? []).map((d) => d.count);
  const blogSeriesPts = (dash?.series?.blogs ?? []).map((d) => d.count);
  const recentActivity = dash?.recentActivity ?? [];
  const topTreks = dash?.topTreks ?? [];
  const topBlogs = dash?.topBlogs ?? [];

  const heroPills = [
    { value: loading ? "…" : formatNumber(trekCount), label: "Treks", icon: Mountain },
    { value: loading ? "…" : formatNumber(destinationCount), label: "Destinations", icon: MapPin },
    { value: loading ? "…" : formatNumber(blogCount), label: "Blogs", icon: Newspaper },
    { value: loading ? "…" : formatNumber(bookingCount), label: "Bookings", icon: Briefcase },
  ];

  const primaryCards = [
    {
      label: "Total Treks",
      value: trekCount,
      trend: `${formatNumber(dash?.treks?.published ?? 0)} published`,
      icon: Mountain,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
      spark: "green" as const,
      points: trekSeries,
    },
    {
      label: "Total Destinations",
      value: destinationCount,
      trend: "From destinations collection",
      icon: MapPin,
      tone: "bg-[#F3E8FF] text-[#9333EA]",
      spark: "purple" as const,
      points: (dash?.series?.content ?? []).map((d) => d.count),
    },
    {
      label: "Total Blogs",
      value: blogCount,
      trend: `${formatNumber(dash?.content?.blogsPublished ?? 0)} published`,
      icon: Newspaper,
      tone: "bg-[#FFEDD5] text-[#EA580C]",
      spark: "orange" as const,
      points: blogSeriesPts,
    },
    {
      label: "Total Bookings",
      value: bookingCount,
      trend:
        bookingCount > 0
          ? `${formatNumber(dash?.bookings?.confirmed ?? 0)} confirmed`
          : "No bookings yet",
      icon: Briefcase,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
      spark: "blue" as const,
      points: [],
    },
  ];

  const secondaryCards = [
    {
      label: "Total FAQs",
      value: faqCount,
      icon: HelpCircle,
      tone: "bg-[#CFFAFE] text-[#0891B2]",
    },
    {
      label: "Total Categories",
      value: categoryCount,
      icon: LayoutGrid,
      tone: "bg-[#FCE7F3] text-[#DB2777]",
    },
    {
      label: "Media Library",
      value: mediaCount,
      icon: FolderKanban,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
    },
    {
      label: "Active Users",
      value: userCount,
      icon: Users,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
    },
  ];

  const manageCards = [
    {
      title: "Manage Treks",
      description: `${formatNumber(trekCount)} treks in catalog`,
      href: "/admin/treks",
      icon: Mountain,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
    },
    {
      title: "Manage Destinations",
      description: `${formatNumber(destinationCount)} destinations`,
      href: "/admin/destinations",
      icon: MapPin,
      tone: "bg-[#F3E8FF] text-[#9333EA]",
    },
    {
      title: "Manage Blogs",
      description: `${formatNumber(blogCount)} posts`,
      href: "/admin/blogs",
      icon: Newspaper,
      tone: "bg-[#FFEDD5] text-[#EA580C]",
    },
    {
      title: "Manage Media",
      description: `${formatNumber(mediaCount)} files`,
      href: "/admin/media",
      icon: FolderKanban,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
    },
    {
      title: "Site Content",
      description: `${formatNumber(settingsCount)} settings`,
      href: "/admin/content",
      icon: FileText,
      tone: "bg-[#FEF3C7] text-[#D97706]",
    },
  ];

  const analyticsMetrics = analytics?.connected
    ? [
        { label: "Visitors", value: formatNumber(analytics.visitors) },
        { label: "Sessions", value: formatNumber(analytics.pageViews) },
        { label: "Enquiries", value: formatNumber(enquiryTotal) },
        {
          label: "Bounce Rate",
          value:
            analytics.bounceRate == null
              ? "—"
              : `${(Number(analytics.bounceRate) * (Number(analytics.bounceRate) <= 1 ? 100 : 1)).toFixed(1)}%`,
        },
      ]
    : [
        { label: "Blog Views", value: formatNumber(blogViews) },
        { label: "Enquiries", value: formatNumber(enquiryTotal) },
        { label: "New Enquiries", value: formatNumber(enquiryNew) },
        { label: "Bookings", value: formatNumber(bookingCount) },
      ];

  return (
    <div className="space-y-5">
      <section className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-sm md:min-h-[248px]">
        <Image
          src="/images/admin/hero-banner.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1100px"
          className="object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        <div className="relative flex h-full min-h-[220px] flex-col justify-between gap-6 p-5 md:min-h-[248px] md:p-7">
          <div className="flex items-start justify-between gap-3">
            <div className="max-w-xl">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-white drop-shadow-sm md:text-[1.85rem]">
                Welcome back, {name}! 👋
              </h1>
              <p className="mt-1.5 text-sm text-white/85">
                Live platform stats from your Mongo database
                {analytics?.connected ? " and Google Analytics" : ""}.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/25 bg-white/95 px-3 py-2 text-sm font-semibold text-[#374151] shadow-sm backdrop-blur">
              <CalendarDays className="h-4 w-4 text-[#6B7280]" aria-hidden />
              {dateLabel}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {heroPills.map((pill) => {
              const Icon = pill.icon;
              return (
                <div
                  key={pill.label}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-white shadow-sm backdrop-blur-md"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <div className="leading-tight">
                    <p className="font-heading text-base font-bold">{pill.value}</p>
                    <p className="text-[11px] font-medium text-white/80">{pill.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {primaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="rounded-2xl border border-[#E8ECF1] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full",
                    card.tone,
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-xs font-medium text-[#6B7280]">{card.label}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-[#111827]">
                {loading ? "…" : formatNumber(card.value)}
              </p>
              <p className="mt-1 text-[11px] font-medium text-[#16A34A]">{card.trend}</p>
              {card.points.some((n) => n > 0) ? <Sparkline points={card.points} tone={card.spark} /> : null}
            </article>
          );
        })}
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {secondaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="flex items-center gap-3 rounded-2xl border border-[#E8ECF1] bg-white px-4 py-3.5 shadow-sm"
            >
              <span
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  card.tone,
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-medium text-[#6B7280]">{card.label}</p>
                <p className="font-heading text-xl font-bold text-[#111827]">
                  {loading ? "…" : formatNumber(card.value)}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm xl:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">
                {analytics?.connected ? "Analytics Overview" : "Content Activity"}
              </h3>
              <p className="mt-0.5 text-xs text-[#9CA3AF]">
                {analytics?.connected
                  ? `Google Analytics · last ${analytics.rangeDays ?? 28} days`
                  : "New treks, blogs & destinations · last 30 days"}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {analyticsMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl bg-[#F9FAFB] px-2.5 py-2">
                <p className="text-[10px] font-medium text-[#6B7280]">{metric.label}</p>
                <p className="mt-0.5 font-heading text-sm font-bold text-[#111827]">
                  {loading ? "…" : metric.value}
                </p>
              </div>
            ))}
          </div>
          <AnalyticsChart series={contentSeries} />
          {!analytics?.connected ? (
            <p className="mt-2 text-[11px] text-[#9CA3AF]">
              Connect Google Analytics in SEO Center for visitor metrics.
            </p>
          ) : null}
        </article>

        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm xl:col-span-3">
          <h3 className="text-sm font-bold text-[#111827]">Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <p className="mt-6 text-sm text-[#9CA3AF]">No recent activity yet.</p>
          ) : (
            <ul className="mt-4 space-y-3.5">
              {recentActivity.map((item) => {
                const Icon = activityIcon[item.type as keyof typeof activityIcon] || FileText;
                const href = item.href || "/admin";
                return (
                  <li key={`${item.type}-${item.at}-${item.title}`}>
                    <Link href={href} className="flex items-start gap-3 rounded-lg transition hover:bg-[#F9FAFB]">
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          activityTone[item.type] || "bg-[#F3F4F6] text-[#6B7280]",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-snug text-[#111827]">{item.title}</p>
                        <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{item.relativeTime}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </article>

        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm xl:col-span-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111827]">
              {topTreks.some((t) => t.metricLabel === "Bookings")
                ? "Top Booked Treks"
                : "Latest Published Treks"}
            </h3>
            <Link href="/admin/treks" className="text-[11px] font-semibold text-[#16A34A] hover:underline">
              View all
            </Link>
          </div>
          {topTreks.length === 0 ? (
            <p className="mt-6 text-sm text-[#9CA3AF]">No treks found.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {topTreks.map((trek) => (
                <li key={`${trek.rank}-${trek.title}`} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-bold text-[#9CA3AF]">{trek.rank}</span>
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#F3F4F6]">
                    {trek.image ? (
                      <Image src={trek.image} alt="" fill sizes="40px" className="object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-[#9CA3AF]">
                        <Mountain className="h-4 w-4" aria-hidden />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#111827]">{trek.title}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{trek.place || "—"}</p>
                  </div>
                  <div className="text-right">
                    <p className="inline-flex items-center gap-1 text-xs font-bold text-[#111827]">
                      <Eye className="h-3 w-3 text-[#9CA3AF]" aria-hidden />
                      {trek.metricDisplay || formatNumber(trek.metricValue)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {topBlogs.length > 0 ? (
            <div className="mt-5 border-t border-[#F3F4F6] pt-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#111827]">Top Blogs by Views</h4>
                <Link href="/admin/blogs" className="text-[11px] font-semibold text-[#16A34A] hover:underline">
                  View all
                </Link>
              </div>
              <ul className="space-y-2.5">
                {topBlogs.slice(0, 3).map((blog) => (
                  <li key={blog.slug || blog.title} className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-medium text-[#374151]">{blog.title}</p>
                    <span className="shrink-0 text-[11px] font-semibold text-[#16A34A]">
                      {formatNumber(blog.views)} views
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-bold text-[#111827]">Quick Management</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {manageCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group flex items-center gap-3 rounded-2xl border border-[#E8ECF1] bg-white p-3.5 shadow-sm transition hover:border-[#22C55E]/35 hover:bg-[#F0FDF4]"
              >
                <span
                  className={cn(
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    card.tone,
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#111827]">{card.title}</p>
                  <p className="mt-0.5 text-[11px] text-[#6B7280]">{card.description}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF] transition group-hover:text-[#16A34A]" aria-hidden />
              </Link>
            );
          })}
        </div>
      </section>

      {dash ? (
        <p className="text-center text-[11px] text-[#9CA3AF]">
          Connected to {siteName} · {roleLabel(user?.role)} · live Mongo counts
        </p>
      ) : null}
    </div>
  );
}
