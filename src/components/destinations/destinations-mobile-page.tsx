"use client";

import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Mountain,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { BLUR_DATA_URL } from "@/constants/media";
import { trekImages } from "@/constants/trek-images";
import { destinationShowcases } from "@/data/homepage";
import { cn } from "@/lib/utils";

const chips = ["All", "Himachal", "Uttarakhand", "Ladakh", "Kashmir"] as const;

const listBadges: Record<string, { label: string; className: string }> = {
  "himachal-pradesh": { label: "POPULAR", className: "bg-[#3B82F6] text-white" },
  uttarakhand: { label: "SPIRITUAL", className: "bg-[#7C3AED] text-white" },
  "jammu-kashmir": { label: "ADVENTURE", className: "bg-[#F97316] text-white" },
  ladakh: { label: "HIGH ALT", className: "bg-[#0EA5E9] text-white" },
  sikkim: { label: "GREEN", className: "bg-[#16A34A] text-white" },
};

const priceFrom: Record<string, number> = {
  "himachal-pradesh": 2499,
  uttarakhand: 7499,
  "jammu-kashmir": 9999,
  ladakh: 18999,
  sikkim: 8999,
};

export function DestinationsMobilePage() {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<(typeof chips)[number]>("All");

  const filtered = useMemo(() => {
    return destinationShowcases.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      const matchesChip =
        chip === "All" ||
        d.name.toLowerCase().includes(chip.toLowerCase()) ||
        (chip === "Kashmir" && d.slug.includes("kashmir")) ||
        (chip === "Himachal" && d.slug.includes("himachal"));
      return matchesQuery && matchesChip;
    });
  }, [query, chip]);

  return (
    <div className="min-h-[100svh] bg-[#f3f4f1] pb-24">
      <div className="sticky top-0 z-30 border-b border-[#e8ece6] bg-white md:static md:border-0">
        <div className="flex h-14 items-center justify-between px-4 md:hidden">
          <Link href="/" className="text-sm font-bold text-[#14201a]" aria-label="Go back">
            ←
          </Link>
          <div className="text-center">
            <p className="font-heading text-sm font-bold text-[#14201a]">Destinations</p>
            <p className="text-[10px] tracking-[0.12em] text-[#6b8f3c] uppercase">Explore India</p>
          </div>
          <Link href="/wishlist" className="p-2 text-[#14201a]" aria-label="Wishlist">
            <Heart className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <Container className="pt-4 md:pt-10">
        <div className="mb-6 hidden md:block">
          <h1 className="font-display text-3xl font-semibold text-[#14201a]">Destinations</h1>
          <p className="mt-2 text-sm text-[#6b7668]">Explore India&apos;s trekking regions.</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9aa39a]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations..."
              className="h-11 w-full rounded-xl border-0 bg-white pr-3 pl-10 text-sm text-[#14201a] shadow-sm ring-1 ring-[#e5e7eb] outline-none placeholder:text-[#9aa39a] focus:ring-[#2D5A27]"
            />
          </label>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d0d5cc] bg-white text-[#1A1A1A]"
            aria-label="Filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChip(c)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition",
                chip === c
                  ? "border border-[#d0d5cc] bg-white text-[#1A1A1A] shadow-sm"
                  : "bg-[#e8ece6] text-[#14201a]",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured banner */}
        <div className="relative mt-4 overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/10]">
            <Image
              src={trekImages.india1}
              alt="Explore breathtaking destinations"
              fill
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-heading text-lg leading-snug font-extrabold tracking-tight text-white uppercase">
                Explore Breathtaking Destinations
              </p>
              <p className="mt-1 text-[12px] text-white/75">
                From alpine meadows to high desert trails across India.
              </p>
              <Link
                href="/treks"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#2D5A27]"
              >
                Explore All Destinations
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal destination cards */}
        <ul className="mt-4 space-y-3">
          {filtered.map((dest) => {
            const badge = listBadges[dest.slug] ?? {
              label: dest.badge,
              className: "bg-[#2D5A27] text-white",
            };
            return (
              <li
                key={dest.id}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)] ring-1 ring-black/[0.04]"
              >
                <div className="flex gap-0">
                  <div className="relative min-h-[148px] w-[34%] min-w-[108px] shrink-0">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="140px"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={dest.blurDataURL ?? BLUR_DATA_URL}
                    />
                    <span
                      className={cn(
                        "absolute top-2 left-2 rounded-md px-1.5 py-0.5 text-[8px] font-extrabold tracking-wide uppercase",
                        badge.className,
                      )}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <div className="relative min-w-0 flex-1 p-3">
                    <Link
                      href="/wishlist"
                      className="absolute top-2.5 right-2.5 text-[#9aa39a]"
                      aria-label={`Save ${dest.name}`}
                    >
                      <Heart className="h-3.5 w-3.5" />
                    </Link>

                    <h2 className="pr-6 font-heading text-[14px] font-bold text-[#14201a]">
                      {dest.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#6b7668]">
                      {dest.description}
                    </p>

                    <div className="mt-2.5 grid grid-cols-3 gap-1 border-t border-[#eef1ec] pt-2">
                      <Meta icon={<Mountain className="h-3 w-3" />} label={dest.trekCountLabel} />
                      <Meta
                        icon={<MapPin className="h-3 w-3" />}
                        label={dest.destinationCountLabel}
                      />
                      <Meta icon={<CalendarDays className="h-3 w-3" />} label={dest.bestTime} />
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <p className="text-[11px] text-[#6b7668]">
                        Starting from{" "}
                        <span className="font-heading text-[13px] font-extrabold text-[#2D5A27]">
                          ₹{(priceFrom[dest.slug] ?? 4999).toLocaleString("en-IN")}
                        </span>
                      </p>
                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#2D5A27]"
                      >
                        Explore
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}

function Meta({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="min-w-0">
      <span className="mb-0.5 inline-flex text-[#6b8f3c]">{icon}</span>
      <p className="truncate text-[9px] font-medium text-[#6b7668]">{label}</p>
    </div>
  );
}
