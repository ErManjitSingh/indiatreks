"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileSearch,
  FileText,
  Gauge,
  Globe2,
  KeyRound,
  LayoutDashboard,
  Link2,
  Map,
  MousePointerClick,
  Search,
  Shield,
  Tags,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const primaryItems = [
  { href: "/admin/seo-center", label: "Dashboard", exact: true },
  { href: "/admin/seo-center/search-console", label: "Google Search Console" },
  { href: "/admin/seo-center/analytics", label: "Google Analytics" },
  { href: "/admin/seo-center/gtm", label: "Google Tag Manager" },
  { href: "/admin/seo-center/clarity", label: "Microsoft Clarity" },
  { href: "/admin/seo-center/meta-pixel", label: "Meta Pixel" },
  { href: "/admin/seo-center/bing", label: "Bing Webmaster" },
];

const moreItems = [
  { href: "/admin/seo-center/keywords", label: "Keyword Tracking", icon: KeyRound },
  { href: "/admin/seo-center/core-web-vitals", label: "Core Web Vitals / PageSpeed", icon: Gauge },
  { href: "/admin/seo-center/sitemaps", label: "Sitemaps", icon: Map },
  { href: "/admin/seo-center/robots", label: "Robots", icon: Shield },
  { href: "/admin/seo-center/redirects", label: "Redirect Manager", icon: Link2 },
  { href: "/admin/seo-center/404", label: "404 Monitor", icon: AlertTriangle },
  { href: "/admin/seo-center/audit", label: "SEO Audit", icon: FileSearch },
  { href: "/admin/seo/ai", label: "AI SEO Engine", icon: Activity },
  { href: "/admin/seo", label: "Legacy SEO Settings", icon: FileText },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SeoCenterHero({
  title = "India Holiday Destinations",
  description = "Enterprise SEO dashboard — Search Console, Analytics, vitals, sitemaps, and technical SEO.",
  verified = true,
}: {
  title?: string;
  description?: string;
  verified?: boolean;
}) {
  return (
    <section className="relative mb-5 overflow-hidden rounded-2xl border border-[#E8ECF1] bg-white shadow-sm">
      <div className="absolute inset-0">
        <Image
          src="/images/admin/hero-banner.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1100px"
          className="object-cover object-[center_35%] opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/45" />
      </div>
      <div className="relative px-5 py-6 md:px-7 md:py-7">
        <p className="text-[11px] font-bold tracking-[0.16em] text-[#2D5A27] uppercase">SEO Center</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[#111827] md:text-[1.75rem]">
            {title}
          </h1>
          {verified ? <CheckCircle2 className="h-5 w-5 text-[#22C55E]" aria-label="Verified" /> : null}
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B7280]">{description}</p>
      </div>
    </section>
  );
}

export function SeoCenterNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = moreItems.some((item) => isActive(pathname, item.href));

  return (
    <nav className="mb-6 flex gap-2 overflow-x-auto pb-1">
      {primaryItems.map((item) => {
        const active = isActive(pathname, item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex shrink-0 items-center rounded-full border px-3.5 py-2 text-xs font-semibold transition",
              active
                ? "border-[#2D5A27] bg-[#2D5A27] text-white shadow-sm"
                : "border-[#d8e0d4] bg-white text-[#374151] hover:border-[#2D5A27]/40",
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-3.5 py-2 text-xs font-semibold transition",
            moreActive
              ? "border-[#2D5A27] bg-[#2D5A27] text-white"
              : "border-[#d8e0d4] bg-white text-[#374151] hover:border-[#2D5A27]/40",
          )}
        >
          More
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </button>
        {moreOpen ? (
          <div className="absolute right-0 z-30 mt-1.5 w-56 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
            {moreItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm transition hover:bg-[#F9FAFB]",
                    active ? "bg-[#F0FDF4] font-semibold text-[#166534]" : "text-[#374151]",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export function SeoSparkline({
  tone = "green",
}: {
  tone?: "green" | "blue" | "orange" | "purple" | "red" | "teal";
}) {
  const stroke =
    tone === "blue"
      ? "#3B82F6"
      : tone === "orange"
        ? "#F97316"
        : tone === "purple"
          ? "#9333EA"
          : tone === "red"
            ? "#EF4444"
            : tone === "teal"
              ? "#14B8A6"
              : "#22C55E";
  const fill =
    tone === "blue"
      ? "#DBEAFE"
      : tone === "orange"
        ? "#FFEDD5"
        : tone === "purple"
          ? "#F3E8FF"
          : tone === "red"
            ? "#FEE2E2"
            : tone === "teal"
              ? "#CCFBF1"
              : "#DCFCE7";
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

export function SeoMetricCard({
  label,
  value,
  hint = "No change",
  icon: Icon,
  iconTone = "bg-[#DCFCE7] text-[#16A34A]",
  spark = "green",
  up,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  iconTone?: string;
  spark?: "green" | "blue" | "orange" | "purple" | "red" | "teal";
  up?: boolean;
}) {
  const TrendIcon = up === false ? ArrowDownRight : ArrowUpRight;
  return (
    <div className="rounded-2xl border border-[#E8ECF1] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-wide text-[#6B7280] uppercase">{label}</p>
          <p className="mt-2 font-heading text-2xl font-bold text-[#111827]">{value}</p>
          <p className="mt-1 inline-flex items-center gap-0.5 text-xs text-[#9CA3AF]">
            {up != null ? <TrendIcon className="h-3.5 w-3.5" aria-hidden /> : null}
            {hint}
          </p>
        </div>
        {Icon ? (
          <span className={cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", iconTone)}>
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <SeoSparkline tone={spark} />
    </div>
  );
}

/** Kept for older panels */
export function SeoStatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return <SeoMetricCard label={label} value={value} hint={hint} />;
}

export function SeoPanel({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-bold text-[#111827]">{title}</h3>
          {description ? <p className="mt-1 text-sm text-[#6b7280]">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function SeoSimpleTable({
  headers,
  rows,
  empty = "No data available yet",
}: {
  headers: string[];
  rows: Array<Array<ReactNode>>;
  empty?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e5ebe3]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#f7faf6] text-xs uppercase tracking-wide text-[#6b7280]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, i) => (
              <tr key={i} className="border-t border-[#eef2ec]">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2.5 text-[#374151]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-3 py-10 text-center text-[#9ca3af]">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function SeoTablePagination({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (total <= pageSize) return null;

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B7280]">
      <p>
        Showing <span className="font-semibold text-[#374151]">{from}–{to}</span> of{" "}
        <span className="font-semibold text-[#374151]">{total}</span>
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 font-semibold text-[#374151] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>
        <span className="px-1 font-semibold text-[#374151]">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 font-semibold text-[#374151] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function SeoPerformanceChart({
  title = "Performance Over Time",
  labels,
}: {
  title?: string;
  labels?: string[];
}) {
  const days =
    labels && labels.length
      ? labels
      : ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
  return (
    <section className="rounded-2xl border border-[#E8ECF1] bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-lg font-bold text-[#111827]">{title}</h3>
        <span className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1.5 text-xs font-semibold text-[#6B7280]">
          Last 7 Days
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
      <div className="relative h-52 w-full">
        <svg viewBox="0 0 560 200" className="h-full w-full" aria-hidden>
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="40" x2="540" y1={y} y2={y} stroke="#EEF2EC" strokeWidth="1" />
          ))}
          <path
            d="M40 150 C100 140, 140 110, 180 120 C240 135, 280 80, 320 95 C380 120, 420 70, 480 85 C510 92, 530 100, 540 96"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M40 165 C100 158, 140 145, 180 148 C240 155, 280 125, 320 132 C380 145, 420 110, 480 118 C510 122, 530 128, 540 124"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="mt-1 flex justify-between px-2 text-[10px] text-[#9CA3AF]">
          {days.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#6B7280]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" /> Clicks
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#3B82F6]" /> Impressions
          </span>
        </div>
      </div>
    </section>
  );
}

export const seoNavIcons = {
  dashboard: LayoutDashboard,
  search: Search,
  analytics: BarChart3,
  gtm: Tags,
  clarity: Eye,
  pixel: MousePointerClick,
  bing: Globe2,
};
