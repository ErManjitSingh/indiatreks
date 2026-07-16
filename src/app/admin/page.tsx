"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, ImageIcon, MapPin, Mountain } from "lucide-react";

import { getStoredUser, type AuthUser } from "@/lib/api/auth";
import { fetchBootstrap } from "@/lib/api/content";
import { fetchTreks } from "@/lib/api/treks";

type Stats = {
  trekCount: number;
  destinationCount: number;
  faqCount: number;
  testimonialCount: number;
  blogCount: number;
  mediaCount: number;
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
        const [bootstrap, treks] = await Promise.all([
          fetchBootstrap(),
          fetchTreks({ limit: 1 }),
        ]);
        if (cancelled) return;
        setStats({
          trekCount: Number(bootstrap?.meta?.trekCount ?? treks.meta?.total ?? 0),
          destinationCount: Array.isArray(bootstrap?.destinations)
            ? bootstrap.destinations.length
            : 0,
          faqCount: Array.isArray(bootstrap?.faqs) ? bootstrap.faqs.length : 0,
          testimonialCount: Array.isArray(bootstrap?.testimonials)
            ? bootstrap.testimonials.length
            : 0,
          blogCount: Array.isArray(bootstrap?.blogs) ? bootstrap.blogs.length : 0,
          mediaCount: Array.isArray(bootstrap?.media) ? bootstrap.media.length : 0,
          siteName: String(bootstrap?.site?.name ?? "India Holiday Destinations"),
        });
      } catch {
        if (!cancelled) setError("Could not load dashboard stats from API.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = stats
    ? [
        { label: "Treks", value: stats.trekCount, href: "/admin/treks", icon: Mountain },
        {
          label: "Destinations",
          value: stats.destinationCount,
          href: "/admin/destinations",
          icon: MapPin,
        },
        {
          label: "Site content",
          value: stats.faqCount + stats.blogCount,
          href: "/admin/content",
          icon: BookOpen,
        },
        { label: "Media URLs", value: stats.mediaCount, href: "/admin/content", icon: ImageIcon },
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
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
              <li>
                Public docs:{" "}
                <a
                  className="font-semibold text-[#2D5A27] hover:underline"
                  href="/api/v1/docs"
                  target="_blank"
                  rel="noreferrer"
                >
                  /api/v1/docs
                </a>
              </li>
              <li>
                Testimonials in Mongo:{" "}
                <span className="font-semibold">{stats.testimonialCount}</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-[#6b7668]">
              Lead capturing CRM is separate — this panel manages website/trek content only.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
