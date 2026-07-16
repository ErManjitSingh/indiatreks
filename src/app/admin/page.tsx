"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, FolderTree, HelpCircle, MapPin, Mountain, Newspaper } from "lucide-react";

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

type Stats = {
  trekCount: number;
  destinationCount: number;
  faqCount: number;
  blogCount: number;
  categoryCount: number;
  siteName: string;
};

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
    let cancelled = false;
    (async () => {
      try {
        const [treks, destinations, faqs, blogs, categories, settings] = await Promise.all([
          adminListTreks({ limit: 1 }),
          adminListDestinations({ limit: 1 }),
          adminListFaqs({ limit: 1 }),
          adminListBlogs({ limit: 1 }),
          adminListCategories({ limit: 1 }),
          adminGetSettings("site"),
        ]);
        if (cancelled) return;
        const site = (settings["site.config"] as { name?: string } | undefined) ?? {};
        setStats({
          trekCount: Number(treks.meta?.total ?? 0),
          destinationCount: Number(destinations.meta?.total ?? 0),
          faqCount: Number(faqs.meta?.total ?? 0),
          blogCount: Number(blogs.meta?.total ?? 0),
          categoryCount: Number(categories.meta?.total ?? 0),
          siteName: String(site.name ?? "India Holiday Destinations"),
        });
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Could not load dashboard stats from API."));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = stats
    ? [
        { label: "Treks", value: stats.trekCount, href: "/admin/treks", icon: Mountain },
        { label: "Destinations", value: stats.destinationCount, href: "/admin/destinations", icon: MapPin },
        { label: "Blogs", value: stats.blogCount, href: "/admin/blogs", icon: Newspaper },
        { label: "FAQs", value: stats.faqCount, href: "/admin/faqs", icon: HelpCircle },
        { label: "Categories", value: stats.categoryCount, href: "/admin/categories", icon: FolderTree },
        { label: "Site content", value: 1, href: "/admin/content", icon: BookOpen },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Dashboard</h2>
        <p className="mt-1 text-sm text-[#5c6b5f]">
          Welcome{user?.name ? `, ${user.name}` : ""}. Manage treks and website content from Mongo via
          API.
        </p>
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {!stats && !error ? (
        <p className="text-sm text-[#5c6b5f]">Loading live data…</p>
      ) : null}

      {stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.label}
                  href={card.href}
                  className="rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm transition hover:border-[#2D5A27]/40"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b7668]">
                      {card.label}
                    </p>
                    <Icon className="h-4 w-4 text-[#2D5A27]" aria-hidden />
                  </div>
                  <p className="mt-3 font-heading text-3xl font-bold text-[#14201a]">{card.value}</p>
                </Link>
              );
            })}
          </div>

          <div className="rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm md:p-6">
            <h3 className="font-heading text-lg font-bold">Connected backend</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#3d4a40]">
              <li>
                Site: <span className="font-semibold">{stats.siteName}</span>
              </li>
              <li>
                API: <code className="rounded bg-[#F4F6F3] px-1.5 py-0.5 text-xs">/api/v1</code>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
