"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  MoreHorizontal,
  Mountain,
  Newspaper,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { getStoredUser, type AuthUser } from "@/lib/api/auth";
import {
  adminGetDashboardStats,
  adminGetSettings,
  getErrorMessage,
} from "@/lib/api/admin";
import { cn } from "@/lib/utils";

type Stats = {
  trekCount: number;
  destinationCount: number;
  faqCount: number;
  blogCount: number;
  categoryCount: number;
  siteName: string;
  userCount: number;
};

function roleLabel(role?: string) {
  if (!role) return "Super Admin";
  return role.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function Sparkline({ tone = "green" }: { tone?: "green" | "blue" | "orange" | "purple" }) {
  const stroke =
    tone === "blue" ? "#3B82F6" : tone === "orange" ? "#F97316" : tone === "purple" ? "#9333EA" : "#22C55E";
  const fill =
    tone === "blue" ? "#DBEAFE" : tone === "orange" ? "#FFEDD5" : tone === "purple" ? "#F3E8FF" : "#DCFCE7";
  return (
    <svg viewBox="0 0 120 32" className="mt-3 h-8 w-full" aria-hidden>
      <path
        d="M0 24 L18 18 L36 22 L54 12 L72 16 L90 8 L108 14 L120 10"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 24 L18 18 L36 22 L54 12 L72 16 L90 8 L108 14 L120 10 L120 32 L0 32 Z"
        fill={fill}
        opacity="0.55"
      />
    </svg>
  );
}

function AnalyticsChart() {
  return (
    <svg viewBox="0 0 560 160" className="mt-4 h-40 w-full" aria-hidden>
      <defs>
        <linearGradient id="visFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[32, 64, 96, 128].map((y) => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#F3F4F6" strokeWidth="1" />
      ))}
      <path
        d="M0 118 C40 110, 80 96, 120 102 S200 88, 240 78 S320 70, 360 62 S440 48, 480 54 S540 42, 560 38 L560 160 L0 160 Z"
        fill="url(#viewsFill)"
      />
      <path
        d="M0 118 C40 110, 80 96, 120 102 S200 88, 240 78 S320 70, 360 62 S440 48, 480 54 S540 42, 560 38"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M0 132 C50 126, 90 118, 140 122 S220 108, 270 100 S350 92, 400 86 S480 78, 560 70 L560 160 L0 160 Z"
        fill="url(#visFill)"
      />
      <path
        d="M0 132 C50 126, 90 118, 140 122 S220 108, 270 100 S350 92, 400 86 S480 78, 560 70"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const recentActivity = [
  { title: "New trek added: Hampta Pass Trek", time: "2 min ago", tone: "bg-[#DCFCE7] text-[#16A34A]", icon: Mountain },
  { title: "New blog published: Triund Trek Guide", time: "18 min ago", tone: "bg-[#FFEDD5] text-[#EA580C]", icon: Newspaper },
  { title: "New destination added: Chitkul", time: "1 hr ago", tone: "bg-[#F3E8FF] text-[#9333EA]", icon: MapPin },
  { title: "FAQ updated: Best time for Hampta", time: "3 hr ago", tone: "bg-[#CFFAFE] text-[#0891B2]", icon: HelpCircle },
  { title: "Media uploaded: Spiti gallery set", time: "5 hr ago", tone: "bg-[#DBEAFE] text-[#2563EB]", icon: FolderKanban },
];

const topTreks = [
  { rank: 1, name: "Triund Trek", place: "Dharamshala", views: "12.6K", growth: "+28%", image: "/images/treks/mountains-1.jpg" },
  { rank: 2, name: "Hampta Pass Trek", place: "Manali", views: "9.8K", growth: "+22%", image: "/images/treks/landscape-1.jpg" },
  { rank: 3, name: "Bhrigu Lake Trek", place: "Manali", views: "8.1K", growth: "+18%", image: "/images/treks/camp-1.jpg" },
  { rank: 4, name: "Kheerganga Trek", place: "Parvati Valley", views: "7.4K", growth: "+15%", image: "/images/treks/meadow-1.jpg" },
  { rank: 5, name: "Chandrakhani Pass", place: "Manali", views: "6.2K", growth: "+12%", image: "/images/treks/mountains-1.jpg" },
];

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

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
        setStats({
          trekCount: Number(dashboard?.treks?.total ?? 0),
          destinationCount: Number(dashboard?.content?.destinations ?? 0),
          faqCount: Number(dashboard?.content?.faqs ?? 0),
          blogCount: Number(dashboard?.content?.blogs ?? 0),
          categoryCount: Number(dashboard?.content?.categories ?? 0),
          siteName: String(site.name ?? "India Holiday Destinations"),
          userCount: Number(dashboard?.users?.total ?? 1),
        });
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Could not load dashboard stats."));
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

  const heroPills = [
    { value: stats?.trekCount ?? "—", label: "Treks", icon: Mountain },
    { value: stats?.destinationCount ?? "—", label: "Destinations", icon: MapPin },
    { value: stats?.blogCount ?? "—", label: "Blogs", icon: Newspaper },
    { value: "—", label: "Bookings", icon: Briefcase },
  ];

  const primaryCards = [
    {
      label: "Total Treks",
      value: stats?.trekCount ?? "—",
      trend: "Live from Mongo",
      icon: Mountain,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
      spark: "green" as const,
    },
    {
      label: "Total Destinations",
      value: stats?.destinationCount ?? "—",
      trend: "Published hubs",
      icon: MapPin,
      tone: "bg-[#F3E8FF] text-[#9333EA]",
      spark: "purple" as const,
    },
    {
      label: "Total Blogs",
      value: stats?.blogCount ?? "—",
      trend: "Content library",
      icon: Newspaper,
      tone: "bg-[#FFEDD5] text-[#EA580C]",
      spark: "orange" as const,
    },
    {
      label: "Total Bookings",
      value: "—",
      trend: "CRM handled separately",
      icon: Briefcase,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
      spark: "blue" as const,
    },
  ];

  const secondaryCards = [
    {
      label: "Total FAQs",
      value: stats?.faqCount ?? "—",
      icon: HelpCircle,
      tone: "bg-[#CFFAFE] text-[#0891B2]",
    },
    {
      label: "Total Categories",
      value: stats?.categoryCount ?? "—",
      icon: LayoutGrid,
      tone: "bg-[#FCE7F3] text-[#DB2777]",
    },
    {
      label: "Site Content",
      value: 18,
      icon: FileText,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
    },
    {
      label: "Active Users",
      value: stats?.userCount ?? 1,
      icon: Users,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
    },
  ];

  const manageCards = [
    {
      title: "Manage Treks",
      description: "Add, edit & organize treks",
      href: "/admin/treks",
      icon: Mountain,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
    },
    {
      title: "Manage Destinations",
      description: "Add & manage destinations",
      href: "/admin/destinations",
      icon: MapPin,
      tone: "bg-[#F3E8FF] text-[#9333EA]",
    },
    {
      title: "Manage Blogs",
      description: "Create & manage blogs",
      href: "/admin/blogs",
      icon: Newspaper,
      tone: "bg-[#FFEDD5] text-[#EA580C]",
    },
    {
      title: "Manage Media",
      description: "Upload & manage media",
      href: "/admin/media",
      icon: FolderKanban,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
    },
    {
      title: "Site Content",
      description: "Manage static pages",
      href: "/admin/content",
      icon: FileText,
      tone: "bg-[#FEF3C7] text-[#D97706]",
    },
  ];

  const analyticsMetrics = [
    { label: "Visitors", value: "24.5K", change: "+18.2%", up: true },
    { label: "Page Views", value: "68.4K", change: "+22.5%", up: true },
    { label: "Enquiries", value: "1.8K", change: "+14.6%", up: true },
    { label: "Bounce Rate", value: "32.6%", change: "-4.1%", up: false },
  ];

  return (
    <div className="space-y-5">
      {/* Welcome hero — matches mockup: full mountain image + white copy + glass pills */}
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
                Here&apos;s what&apos;s happening with your travel platform today.
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

      {/* Primary metrics */}
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
                <button
                  type="button"
                  className="rounded-lg p-1 text-[#9CA3AF] hover:bg-[#F3F4F6]"
                  aria-label="More"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-xs font-medium text-[#6B7280]">{card.label}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-[#111827]">{card.value}</p>
              <p className="mt-1 text-[11px] font-medium text-[#16A34A]">{card.trend}</p>
              <Sparkline tone={card.spark} />
            </article>
          );
        })}
      </section>

      {/* Secondary metrics */}
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
                <p className="font-heading text-xl font-bold text-[#111827]">{card.value}</p>
              </div>
            </article>
          );
        })}
      </section>

      {/* Analytics + activity + top treks */}
      <section className="grid gap-4 xl:grid-cols-12">
        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm xl:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#111827]">Analytics Overview</h3>
              <p className="mt-0.5 text-xs text-[#9CA3AF]">Last 30 days</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" /> Visitors
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#3B82F6]" /> Page Views
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {analyticsMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl bg-[#F9FAFB] px-2.5 py-2">
                <p className="text-[10px] font-medium text-[#6B7280]">{metric.label}</p>
                <p className="mt-0.5 font-heading text-sm font-bold text-[#111827]">{metric.value}</p>
                <p
                  className={cn(
                    "mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-semibold",
                    metric.up ? "text-[#16A34A]" : "text-[#DC2626]",
                  )}
                >
                  {metric.up ? (
                    <TrendingUp className="h-3 w-3" aria-hidden />
                  ) : (
                    <TrendingDown className="h-3 w-3" aria-hidden />
                  )}
                  {metric.change}
                </p>
              </div>
            ))}
          </div>
          <AnalyticsChart />
        </article>

        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm xl:col-span-3">
          <h3 className="text-sm font-bold text-[#111827]">Recent Activity</h3>
          <ul className="mt-4 space-y-3.5">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      item.tone,
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-snug text-[#111827]">{item.title}</p>
                    <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{item.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>

        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm xl:col-span-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111827]">Top Performing Treks</h3>
            <Link href="/admin/treks" className="text-[11px] font-semibold text-[#16A34A] hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {topTreks.map((trek) => (
              <li key={trek.rank} className="flex items-center gap-3">
                <span className="w-4 text-xs font-bold text-[#9CA3AF]">{trek.rank}</span>
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  <Image src={trek.image} alt="" fill sizes="40px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-[#111827]">{trek.name}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{trek.place}</p>
                </div>
                <div className="text-right">
                  <p className="inline-flex items-center gap-1 text-xs font-bold text-[#111827]">
                    <Eye className="h-3 w-3 text-[#9CA3AF]" aria-hidden />
                    {trek.views}
                  </p>
                  <p className="text-[11px] font-semibold text-[#16A34A]">{trek.growth}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Quick management */}
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

      {stats ? (
        <p className="text-center text-[11px] text-[#9CA3AF]">
          Connected to {stats.siteName} · {roleLabel(user?.role)}
        </p>
      ) : null}
    </div>
  );
}
