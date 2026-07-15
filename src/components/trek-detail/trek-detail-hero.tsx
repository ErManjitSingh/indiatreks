"use client";

import {
  Flame,
  Heart,
  MapPin,
  Mountain,
  Share2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/ui/container";
import { toast } from "@/components/ui/toast";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { useRecentlyViewedStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TrekDetail } from "@/types/trek-detail";
import { formatAltitude } from "@/utils/trek";

export function TrekDetailHero({ trek }: { trek: TrekDetail }) {
  const hydrated = useHasHydrated();
  const { toggle, has } = useWishlistStore();
  const addRecent = useRecentlyViewedStore((s) => s.add);
  const saved = hydrated && has(trek.id);

  useEffect(() => {
    addRecent(trek.id);
  }, [addRecent, trek.id]);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: trek.title, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied");
      }
    } catch {
      toast.info("Share cancelled");
    }
  };

  return (
    <section className="border-b border-border/50 bg-white">
      <Container className="py-6 md:py-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-muted-foreground md:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/treks" className="hover:text-foreground">
                Treks
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link
                href={`/treks?state=${encodeURIComponent(trek.state)}`}
                className="hover:text-foreground"
              >
                {trek.state}
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-foreground/70">{trek.title}</li>
          </ol>
        </nav>

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#2D5A27] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
              <Flame className="h-3.5 w-3.5 text-[#A3E635]" aria-hidden />
              TRENDING TREK
            </span>

            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#1A1A1A] md:text-4xl lg:text-5xl">
              {trek.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#444]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#2D5A27]" aria-hidden />
                {trek.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mountain className="h-4 w-4 text-[#2D5A27]" aria-hidden />
                {formatAltitude(trek.maxAltitude)}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                {trek.rating.toFixed(1)}
                <span className="font-medium text-muted-foreground">
                  ({trek.reviewCount.toLocaleString("en-IN")} reviews)
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#00B67A]">
                <span className="rounded bg-[#00B67A] px-1 py-0.5 text-[9px] text-white">★</span>
                Trustpilot
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {trek.summary}
            </p>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={share}
              aria-label="Share trek"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d0d5cc] text-[#333] transition hover:bg-[#F7F8F6]"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => toggle(trek.id)}
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={saved}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d0d5cc] text-[#333] transition hover:bg-[#F7F8F6]",
                saved && "border-red-200 text-destructive",
              )}
            >
              <Heart className={cn("h-4 w-4", saved && "fill-current")} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
