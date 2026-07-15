"use client";

import { memo } from "react";
import {
  BarChart3,
  CalendarDays,
  Clock3,
  Heart,
  Mountain,
  Scale,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { getDiscountPercent } from "@/lib/trek-filters";
import { useCompareStore, useRecentlyViewedStore, useUiStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TrekListingItem, TrekViewMode } from "@/types/trek-listing";
import { formatCurrency, formatTrekDuration } from "@/utils";
import { formatAltitude } from "@/utils/trek";

interface TrekListingCardProps {
  trek: TrekListingItem;
  view?: TrekViewMode;
}

const badgeStyles = {
  trending: "bg-[#2D5A27] text-white",
  bestseller: "bg-[#2563EB] text-white",
  limited: "bg-[#EA580C] text-white",
  new: "bg-[#0F766E] text-white",
} as const;

const badgeCopy = {
  trending: "TRENDING",
  bestseller: "POPULAR",
  limited: "ADVENTURE",
  new: "NEW",
} as const;

function formatReviewCount(count: number): string {
  if (count >= 1000) {
    const value = count / 1000;
    return `${value >= 10 ? Math.round(value) : value.toFixed(1).replace(/\.0$/, "")}K`;
  }
  return String(count);
}

function formatDeparture(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function TrekListingCardComponent({ trek, view = "list" }: TrekListingCardProps) {
  const hydrated = useHasHydrated();
  const { toggle: toggleWish, has: hasWish } = useWishlistStore();
  const { toggle: toggleCompare, has: hasCompare } = useCompareStore();
  const setTrekCompareOpen = useUiStore((s) => s.setTrekCompareOpen);
  const { add: addRecent } = useRecentlyViewedStore();
  const saved = hydrated && hasWish(trek.id);
  const comparing = hydrated && hasCompare(trek.id);
  const discount = getDiscountPercent(trek.basePriceInr, trek.originalPriceInr);
  const primaryBadge = trek.badges[0];
  const nextDeparture = trek.departures[0];

  const wishButton = (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      onClick={() => toggleWish(trek.id)}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-muted-foreground shadow-sm transition hover:text-destructive"
    >
      <Heart className={cn("h-4 w-4", saved && "fill-destructive text-destructive")} />
    </button>
  );

  const compareButton = (
    <button
      type="button"
      aria-label={comparing ? "Remove from compare" : "Add to compare"}
      aria-pressed={comparing}
      onClick={() => {
        const adding = !hasCompare(trek.id);
        toggleCompare(trek.id);
        if (adding) setTrekCompareOpen(true);
      }}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-muted-foreground shadow-sm transition hover:text-[#2D5A27]",
        comparing && "bg-[#E8F5E9] text-[#2D5A27]",
      )}
    >
      <Scale className="h-4 w-4" />
    </button>
  );

  const actionButtons = (
    <div className="flex items-center gap-1.5">
      {compareButton}
      {wishButton}
    </div>
  );

  /* —— Mobile card (mockup) —— */
  const mobileCard = (
    <article className="overflow-hidden rounded-2xl border border-[#e8ece6] bg-white shadow-sm md:hidden">
      <div className="relative aspect-[16/10]">
        <Image
          src={trek.images[0]}
          alt={trek.title}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
        {primaryBadge ? (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide",
              badgeStyles[primaryBadge],
            )}
          >
            {badgeCopy[primaryBadge]}
          </span>
        ) : null}
        <div className="absolute right-3 top-3">{actionButtons}</div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-heading text-lg font-bold tracking-tight text-[#1A1A1A]">
            <Link href={`/treks/${trek.slug}`} onClick={() => addRecent(trek.id)}>
              {trek.title}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {trek.state} • {trek.region}
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            <span className="text-[#2D5A27]">{trek.rating.toFixed(1)}</span>
            <span className="font-medium text-muted-foreground">
              ({formatReviewCount(trek.reviewCount)})
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-[#444]">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden />
            {trek.durationDays} Days
          </span>
          <span className="inline-flex items-center gap-1">
            <Mountain className="h-3.5 w-3.5 text-primary" aria-hidden />
            {formatAltitude(trek.maxAltitude)}
          </span>
          <span className="inline-flex items-center gap-1 capitalize">
            <BarChart3 className="h-3.5 w-3.5 text-primary" aria-hidden />
            {trek.difficulty}
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <p className="font-heading text-xl font-bold text-[#1A1A1A]">
            {formatCurrency(trek.basePriceInr)}
          </p>
          {trek.originalPriceInr ? (
            <p className="pb-0.5 text-sm text-muted-foreground line-through">
              {formatCurrency(trek.originalPriceInr)}
            </p>
          ) : null}
          {discount ? (
            <span className="rounded-full border border-[#C8E6C9] bg-[#E8F5E9] px-2 py-0.5 text-[11px] font-bold text-[#2D5A27]">
              {discount}% OFF
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          {nextDeparture ? (
            <p className="text-muted-foreground">
              Next Departure:{" "}
              <span className="font-semibold text-foreground">
                {formatDeparture(nextDeparture)}
              </span>
            </p>
          ) : (
            <span />
          )}
          <p className="shrink-0 font-semibold text-red-600">Seats Left: {trek.seatsLeft}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <Button asChild variant="outline" size="sm" className="rounded-full border-[#d0d5cc] bg-white">
            <Link href={`/treks/${trek.slug}`} onClick={() => addRecent(trek.id)}>
              View Details
            </Link>
          </Button>
          <Button
            asChild
            variant="primary"
            size="sm"
            className="rounded-full"
          >
            <Link href={`/booking?trek=${trek.slug}`} onClick={() => addRecent(trek.id)}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );

  /* —— Desktop list —— */
  if (view === "list") {
    return (
      <>
        {mobileCard}
        <article className="hidden overflow-hidden rounded-xl border border-border/80 bg-white shadow-xs transition hover:shadow-md md:block">
          <div className="grid md:grid-cols-[220px_minmax(0,1fr)_168px] lg:grid-cols-[240px_minmax(0,1fr)_180px]">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[210px]">
              <Image
                src={trek.images[0]}
                alt={trek.title}
                fill
                sizes={IMAGE_SIZES.card}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
              {primaryBadge ? (
                <span
                  className={cn(
                    "absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide",
                    badgeStyles[primaryBadge],
                  )}
                >
                  {badgeCopy[primaryBadge]}
                </span>
              ) : null}
            </div>

            <div className="relative flex flex-col gap-2.5 p-4 md:p-5">
              <div className="absolute right-4 top-4">{actionButtons}</div>

              <div className="pr-10">
                <h3 className="font-heading text-xl font-bold tracking-tight text-[#1A1A1A]">
                  <Link
                    href={`/treks/${trek.slug}`}
                    className="transition hover:text-primary"
                    onClick={() => addRecent(trek.id)}
                  >
                    {trek.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {trek.state} • {trek.region}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                  {trek.rating.toFixed(1)}
                  <span className="font-medium text-muted-foreground">
                    ({formatReviewCount(trek.reviewCount)})
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#333]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {formatTrekDuration(trek.durationDays, trek.durationNights)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mountain className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {formatAltitude(trek.maxAltitude)}
                </span>
                <span className="inline-flex items-center gap-1.5 capitalize">
                  <BarChart3 className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {trek.difficulty}
                </span>
              </div>

              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {trek.summary}
              </p>

              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs sm:text-sm">
                {nextDeparture ? (
                  <p className="text-muted-foreground">
                    Next Departure:{" "}
                    <span className="font-semibold text-foreground">
                      {formatDeparture(nextDeparture)}
                    </span>
                  </p>
                ) : null}
                <p className="font-semibold text-red-600">Seats Left: {trek.seatsLeft}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 border-t border-border/70 bg-[#FAFBFA] p-4 md:border-l md:border-t-0 md:px-4 md:py-5">
              <div>
                <p className="font-heading text-2xl font-bold text-[#1A1A1A]">
                  {formatCurrency(trek.basePriceInr)}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {trek.originalPriceInr ? (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatCurrency(trek.originalPriceInr)}
                    </p>
                  ) : null}
                  {discount ? (
                    <span className="rounded bg-[#E8F5E9] px-1.5 py-0.5 text-[11px] font-bold text-[#2D5A27]">
                      {discount}% OFF
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" size="sm" className="w-full border-border bg-white">
                  <Link href={`/treks/${trek.slug}`} onClick={() => addRecent(trek.id)}>
                    View Details
                  </Link>
                </Button>
                <Button asChild variant="primary" size="sm" className="w-full">
                  <Link href={`/booking?trek=${trek.slug}`} onClick={() => addRecent(trek.id)}>
                    Book Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  }

  /* —— Desktop / tablet grid —— */
  return (
    <>
      {mobileCard}
      <article className="group hidden overflow-hidden rounded-xl border border-border/80 bg-white shadow-xs transition hover:shadow-md md:block">
        <div className="relative aspect-[4/3]">
          <Image
            src={trek.images[0]}
            alt={trek.title}
            fill
            sizes={IMAGE_SIZES.card}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {primaryBadge ? (
            <span
              className={cn(
                "absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide",
                badgeStyles[primaryBadge],
              )}
            >
              {badgeCopy[primaryBadge]}
            </span>
          ) : null}
          <div className="absolute right-3 top-3">{actionButtons}</div>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h3 className="font-heading text-lg font-bold tracking-tight">
              <Link
                href={`/treks/${trek.slug}`}
                className="hover:text-primary"
                onClick={() => addRecent(trek.id)}
              >
                {trek.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {trek.state} • {trek.region}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span>{formatTrekDuration(trek.durationDays, trek.durationNights)}</span>
            <span>{formatAltitude(trek.maxAltitude)}</span>
            <span className="capitalize">{trek.difficulty}</span>
          </div>

          <div className="flex items-end justify-between gap-3 border-t border-border pt-3">
            <div>
              <p className="font-heading text-xl font-bold">{formatCurrency(trek.basePriceInr)}</p>
              {discount ? (
                <p className="text-xs font-semibold text-[#2D5A27]">{discount}% OFF</p>
              ) : null}
            </div>
            <Button asChild variant="primary" size="sm">
              <Link href={`/booking?trek=${trek.slug}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}

export const TrekListingCard = memo(TrekListingCardComponent);
