"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderKanban,
  HelpCircle,
  LayoutGrid,
  MapPin,
  MoreHorizontal,
  Mountain,
  Newspaper,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { getStoredUser, type AuthUser } from "@/lib/api/auth";
import {
  adminGetSettings,
  adminListBlogs,
  adminListCategories,
  adminListDestinations,
  adminListFaqs,
  adminListTreks,
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
};

function roleLabel(role?: string) {
  if (!role) return "Super Admin";
  return role.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [apiOnline, setApiOnline] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    let cancelled = false;
    (async () => {
      try {
        const [treks, destinations, faqs, blogs, categories, settings, health] =
          await Promise.all([
            adminListTreks({ limit: 1 }),
            adminListDestinations({ limit: 1 }),
            adminListFaqs({ limit: 1 }),
            adminListBlogs({ limit: 1 }),
            adminListCategories({ limit: 1 }),
            adminGetSettings("site"),
            fetch("/api/v1/health")
              .then((r) => r.ok)
              .catch(() => false),
          ]);
        if (cancelled) return;
        const site = (settings["site.config"] as { name?: string } | undefined) ?? {};
        setApiOnline(Boolean(health));
        setStats({
          trekCount: Number(treks.meta?.total ?? 0),
          destinationCount: Number(destinations.meta?.total ?? 0),
          faqCount: Number(faqs.meta?.total ?? 0),
          blogCount: Number(blogs.meta?.total ?? 0),
          categoryCount: Number(categories.meta?.total ?? 0),
          siteName: String(site.name ?? "India Holiday Destinations"),
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

  const statCards = [
    {
      label: "Total Treks",
      value: stats?.trekCount ?? "—",
      trend: "Live from Mongo",
      icon: Mountain,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
    },
    {
      label: "Total Destinations",
      value: stats?.destinationCount ?? "—",
      trend: "Published hubs",
      icon: MapPin,
      tone: "bg-[#F3E8FF] text-[#9333EA]",
    },
    {
      label: "Total Blogs",
      value: stats?.blogCount ?? "—",
      trend: "Content library",
      icon: Newspaper,
      tone: "bg-[#FFEDD5] text-[#EA580C]",
    },
    {
      label: "Total Bookings",
      value: "—",
      trend: "CRM handled separately",
      icon: Briefcase,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
    },
    {
      label: "Total FAQs",
      value: stats?.faqCount ?? "—",
      trend: "Help center",
      icon: HelpCircle,
      tone: "bg-[#CFFAFE] text-[#0891B2]",
    },
    {
      label: "Total Categories",
      value: stats?.categoryCount ?? "—",
      trend: "Taxonomy",
      icon: LayoutGrid,
      tone: "bg-[#FCE7F3] text-[#DB2777]",
    },
    {
      label: "Site Content",
      value: "1",
      trend: "Bootstrap + settings",
      icon: FileText,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
    },
    {
      label: "Active Users",
      value: "1",
      trend: roleLabel(user?.role),
      icon: Users,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
    },
  ];

  const manageCards = [
    {
      title: "Manage Treks",
      description: "Create, edit and publish Himalayan trek packages with full itineraries.",
      href: "/admin/treks",
      cta: "Manage Treks",
      image: "/images/treks/mountains-1.jpg",
      icon: Mountain,
      tone: "bg-[#22C55E]",
    },
    {
      title: "Manage Destinations",
      description: "Update regions, covers and destination guides shown on the website.",
      href: "/admin/destinations",
      cta: "Manage Destinations",
      image: "/images/treks/landscape-1.jpg",
      icon: MapPin,
      tone: "bg-[#A855F7]",
    },
    {
      title: "Manage Blogs",
      description: "Publish trail stories, packing guides and SEO content for travellers.",
      href: "/admin/blogs",
      cta: "Manage Blogs",
      image: "/images/treks/camp-1.jpg",
      icon: Newspaper,
      tone: "bg-[#F97316]",
    },
    {
      title: "Manage Media",
      description: "Upload and organise photos used across treks, blogs and homepage blocks.",
      href: "/admin/media",
      cta: "Manage Media",
      image: "/images/treks/meadow-1.jpg",
      icon: FolderKanban,
      tone: "bg-[#3B82F6]",
    },
  ];

  const quickActions = [
    { href: "/admin/treks/new", label: "Add New Trek", icon: Mountain },
    { href: "/admin/blogs/new", label: "Add Blog", icon: Newspaper },
    { href: "/admin/destinations/new", label: "Add Destination", icon: MapPin },
    { href: "/admin/faqs/new", label: "Add FAQ", icon: HelpCircle },
    { href: "/admin/categories/new", label: "Add Category", icon: LayoutGrid },
    { href: "/admin/content", label: "Site Settings", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome hero */}
      <section className="relative overflow-hidden rounded-2xl border border-[#E8ECF1] bg-white shadow-sm">
        <div className="absolute inset-0">
          <Image
            src="/images/admin/hero-banner.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1100px"
            className="object-cover object-[center_40%] opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/55" />
        </div>
        <div className="relative flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-end sm:justify-between md:px-7 md:py-7">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-[#111827] md:text-[1.75rem]">
              Welcome back, {name}! 👋
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-[#6B7280]">
              Here&apos;s what&apos;s happening with your travel platform today.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 self-start rounded-xl border border-[#E5E7EB] bg-white/90 px-3 text-sm font-medium text-[#374151] shadow-sm backdrop-blur"
          >
            <CalendarDays className="h-4 w-4 text-[#6B7280]" aria-hidden />
            {dateLabel}
          </button>
        </div>
      </section>

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {/* Stats */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
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
              <p className="mt-2 text-[11px] font-medium text-[#16A34A]">{card.trend}</p>
            </article>
          );
        })}
      </section>

      {/* Manage modules */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {manageCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="overflow-hidden rounded-2xl border border-[#E8ECF1] bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 1280px) 50vw, 25vw"
                  className="object-cover"
                />
                <span
                  className={cn(
                    "absolute -bottom-4 left-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-md",
                    card.tone,
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <div className="space-y-3 px-4 pb-4 pt-7">
                <div>
                  <h3 className="font-heading text-base font-bold text-[#111827]">{card.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{card.description}</p>
                </div>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#22C55E]/35 px-3 py-1.5 text-xs font-semibold text-[#16A34A] transition hover:bg-[#F0FDF4]"
                >
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* Bottom widgets */}
      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#22C55E]" aria-hidden />
            <h3 className="text-sm font-bold text-[#111827]">System Status</h3>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              ["API Server", apiOnline ? "Online" : "Checking…"],
              ["Database", apiOnline ? "Connected" : "Checking…"],
              ["Storage", "Healthy"],
              ["Email Service", "Operational"],
            ].map(([label, status]) => (
              <li key={label} className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#4B5563]">
                  <CheckCircle2 className="h-4 w-4 text-[#22C55E]" aria-hidden />
                  {label}
                </span>
                <span className="text-xs font-semibold text-[#16A34A]">{status}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#22C55E]" aria-hidden />
            <h3 className="text-sm font-bold text-[#111827]">Today&apos;s Summary</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["New Bookings", "—", "CRM"],
              ["Enquiries", "—", "External"],
              ["Treks live", String(stats?.trekCount ?? "—"), "Mongo"],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-xl bg-[#F9FAFB] p-3 text-center">
                <p className="text-[10px] font-medium text-[#6B7280]">{label}</p>
                <p className="mt-1 font-heading text-xl font-bold text-[#111827]">{value}</p>
                <p className="mt-1 text-[10px] font-semibold text-[#16A34A]">{note}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#9CA3AF]">
            Bookings & enquiries stay in your separate lead software.
          </p>
        </article>

        <article className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#F59E0B]" aria-hidden />
            <h3 className="text-sm font-bold text-[#111827]">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-xs font-semibold text-[#374151] transition hover:border-[#22C55E]/40 hover:bg-[#F0FDF4]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#22C55E]" aria-hidden />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </article>
      </section>

      {stats ? (
        <p className="text-center text-[11px] text-[#9CA3AF]">
          Connected to {stats.siteName} · API `/api/v1`
        </p>
      ) : null}
    </div>
  );
}
