"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
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
} from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/admin/seo-center", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/seo-center/search-console", label: "Google Search Console", icon: Search },
  { href: "/admin/seo-center/analytics", label: "Google Analytics", icon: BarChart3 },
  { href: "/admin/seo-center/gtm", label: "Google Tag Manager", icon: Tags },
  { href: "/admin/seo-center/clarity", label: "Microsoft Clarity", icon: Eye },
  { href: "/admin/seo-center/meta-pixel", label: "Meta Pixel", icon: MousePointerClick },
  { href: "/admin/seo-center/bing", label: "Bing Webmaster", icon: Globe2 },
  { href: "/admin/seo-center/keywords", label: "Keyword Tracking", icon: KeyRound },
  { href: "/admin/seo-center/core-web-vitals", label: "Core Web Vitals", icon: Gauge },
  { href: "/admin/seo-center/sitemaps", label: "Sitemaps", icon: Map },
  { href: "/admin/seo-center/robots", label: "Robots", icon: Shield },
  { href: "/admin/seo-center/redirects", label: "Redirect Manager", icon: Link2 },
  { href: "/admin/seo-center/404", label: "404 Monitor", icon: AlertTriangle },
  { href: "/admin/seo-center/audit", label: "SEO Audit", icon: FileSearch },
  { href: "/admin/seo/ai", label: "AI SEO Engine", icon: Activity },
  { href: "/admin/seo", label: "Legacy SEO Settings", icon: FileText },
];

export function SeoCenterNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
              active
                ? "border-[#2D5A27] bg-[#2D5A27] text-white"
                : "border-[#d8e0d4] bg-white text-[#374151] hover:border-[#2D5A27]/40",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SeoStatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d8e0d4] bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">{label}</p>
      <p className="mt-2 font-heading text-2xl font-bold text-[#111827]">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[#9ca3af]">{hint}</p> : null}
    </div>
  );
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
    <section className="rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
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
}: {
  headers: string[];
  rows: Array<Array<ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e5ebe3]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#f7faf6] text-xs uppercase tracking-wide text-[#6b7280]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold">
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
                  <td key={j} className="px-3 py-2 text-[#374151]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-3 py-6 text-center text-[#9ca3af]">
                No data yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
