"use client";

import { memo } from "react";
import {
  BarChart3,
  Clock3,
  Heart,
  MapPin,
  Mountain,
  Scale,
  Shield,
  Soup,
  Star,
  Tent,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BookNowButton } from "@/components/booking/book-now-button";
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
  trending: "bg-[#EA580C] text-white",
  bestseller: "bg-[#2563EB] text-white",
  limited: "bg-[#B45309] text-white",
  new: "bg-[#0F766E] text-white",
} as const;

const badgeCopy = {
  trending: "MOST BOOKED",
  bestseller: "TOP SELLER",
  limited: "LIMITED",
  new: "NEW",
} as const;

const difficultyStyles: Record<string, string> = {
  easy: "bg-[#16A34A] text-white",
  moderate: "bg-[#CA8A04] text-white",
  difficult: "bg-[#DC2626] text-white",
  challenging: "bg-[#7C2D12] text-white",
};

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

const FALLBACK_COVER = "/images/treks/mountains-1.jpg";

function inclusionIcons(trek: TrekListingItem) {
  const items = [
    { id: "guide", label: "Guide", icon: Users, show: true },
    { id: "meals", label: "Meals", icon: Soup, show: true },
    {
      id: "camping",
      label: "Camping",
      icon: Tent,
      show: trek.trekTypes.includes("camping") || trek.durationNights > 0,
    },
    { id: "permits", label: "Permits", icon: Shield, show: true },
  ];
  return items.filter((item) => item.show).slice(0, 4);
}

function TrekListingCardComponent({ trek, view = "grid" }: TrekListingCardProps) {
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
  const cover = trek.images?.[0] || FALLBACK_COVER;
  const placeLabel = trek.destinationName || trek.region;
  const emi = Math.max(999, Math.ceil(trek.basePriceInr / 3));
  const inclusions = inclusionIcons(trek);

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

  const durationOverlay = (
    <span className="absolute bottom-3 left-3 rounded-md bg-black/65 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
      {trek.durationDays} Days | {trek.durationNights} Night{trek.durationNights === 1 ? "" : "s"}
    </span>
  );

  const difficultyBadge = (
    <span
      className={cn(
        "absolute right-3 bottom-3 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide capitalize shadow-sm",
        difficultyStyles[trek.difficulty] || "bg-[#2D5A27] text-white",
      )}
    >
      {trek.difficulty}
    </span>
  );

  /* —— Mobile card —— */
  const mobileCard = (
    <article className="overflow-hidden rounded-2xl border border-[#e8ece6] bg-white shadow-sm md:hidden">
      <div className="relative aspect-[16/10]">
        <Image
          src={cover}
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
              "absolute left-3 top-3 rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wide",
              badgeStyles[primaryBadge],
            )}
          >
            {badgeCopy[primaryBadge]}
          </span>
        ) : null}
        <div className="absolute right-3 top-3">{actionButtons}</div>
        {durationOverlay}
        {difficultyBadge}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-heading text-lg font-bold tracking-tight text-[#1A1A1A]">
            <Link href={`/treks/${trek.slug}`} onClick={() => addRecent(trek.id)}>
              {trek.title}
            </Link>
          </h3>
          <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {placeLabel}, {trek.state}
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            <span className="text-[#2D5A27]">{trek.rating.toFixed(1)}</span>
            <span className="font-medium text-muted-foreground">
              ({formatReviewCount(trek.reviewCount)})
            </span>
          </p>
        </div>

        <p className="line-clamp-2 text-sm text-[#6B7668]">{trek.summary}</p>

        <div className="flex flex-wrap gap-3">
          {inclusions.map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.id}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4B5563]"
              >
                <Icon className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
                {item.label}
              </span>
            );
          })}
        </div>

        <div className="flex flex-wrap items-end gap-2">
          {trek.originalPriceInr ? (
            <p className="pb-0.5 text-sm text-muted-foreground line-through">
              {formatCurrency(trek.originalPriceInr)}
            </p>
          ) : null}
          <p className="font-heading text-xl font-bold text-[#1A1A1A]">
            {formatCurrency(trek.basePriceInr)}
          </p>
          {discount ? (
            <span className="rounded-full border border-[#C8E6C9] bg-[#E8F5E9] px-2 py-0.5 text-[11px] font-bold text-[#2D5A27]">
              {discount}% OFF
            </span>
          ) : null}
        </div>

        <Button asChild size="sm" className="w-full rounded-xl bg-[#2D5A27] hover:bg-[#244820]">
          <Link href={`/treks/${trek.slug}`} onClick={() => addRecent(trek.id)}>
            View Details
          </Link>
        </Button>
        <p className="text-center text-[11px] text-[#6B7668]">
          EMI starting ₹{emi.toLocaleString("en-IN")}/month
        </p>
      </div>
    </article>
  );

  if (view === "list") {
    return (
      <>
        {mobileCard}
        <article className="hidden overflow-hidden rounded-xl border border-border/80 bg-white shadow-xs transition hover:shadow-md md:block">
          <div className="grid md:grid-cols-[220px_minmax(0,1fr)_168px] lg:grid-cols-[240px_minmax(0,1fr)_180px]">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[210px]">
              <Image
                src={cover}
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
              {durationOverlay}
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
                  {trek.state} • {placeLabel}
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
                <p className="mt-1 text-[11px] text-[#6B7668]">
                  EMI from ₹{emi.toLocaleString("en-IN")}/mo
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" size="sm" className="w-full border-border bg-white">
                  <Link href={`/treks/${trek.slug}`} onClick={() => addRecent(trek.id)}>
                    View Details
                  </Link>
                </Button>
                <BookNowButton
                  trekSlug={trek.slug}
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => addRecent(trek.id)}
                >
                  Book Now
                </BookNowButton>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  }

  /* —— Grid (mockup default) —— */
  return (
    <>
      {mobileCard}
      <article className="group hidden overflow-hidden rounded-2xl border border-[#E8ECF1] bg-white shadow-sm transition hover:shadow-md md:block">
        <div className="relative aspect-[16/10]">
          <Image
            src={cover}
            alt={trek.title}
            fill
            sizes={IMAGE_SIZES.card}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          {primaryBadge ? (
            <span
              className={cn(
                "absolute left-0 top-3 rounded-r px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm",
                badgeStyles[primaryBadge],
              )}
            >
              {badgeCopy[primaryBadge]}
            </span>
          ) : null}
          <div className="absolute right-3 top-3">{wishButton}</div>
          {durationOverlay}
          <span
            className={cn(
              "absolute right-3 bottom-3 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide capitalize shadow-sm",
              difficultyStyles[trek.difficulty] || "bg-[#2D5A27] text-white",
            )}
          >
            {trek.difficulty}
          </span>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h3 className="font-heading text-lg font-bold tracking-tight text-[#111827]">
              <Link
                href={`/treks/${trek.slug}`}
                className="hover:text-[#2D5A27]"
                onClick={() => addRecent(trek.id)}
              >
                {trek.title}
              </Link>
            </h3>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#6B7280]">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {placeLabel}, {trek.state}
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
              <span className="text-[#111827]">{trek.rating.toFixed(1)}</span>
              <span className="font-medium text-[#6B7280]">
                ({formatReviewCount(trek.reviewCount)} reviews)
              </span>
            </p>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-[#6B7280]">{trek.summary}</p>

          <div className="flex flex-wrap gap-3 border-t border-[#F3F4F6] pt-3">
            {inclusions.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4B5563]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
                  {item.label}
                </span>
              );
            })}
          </div>

          <div className="flex items-end justify-between gap-3 border-t border-[#F3F4F6] pt-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {trek.originalPriceInr ? (
                  <p className="text-sm text-[#9CA3AF] line-through">
                    {formatCurrency(trek.originalPriceInr)}
                  </p>
                ) : null}
                <p className="font-heading text-xl font-bold text-[#111827]">
                  {formatCurrency(trek.basePriceInr)}
                </p>
                {discount ? (
                  <span className="rounded bg-[#E8F5E9] px-1.5 py-0.5 text-[11px] font-bold text-[#2D5A27]">
                    {discount}% OFF
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[11px] text-[#6B7280]">
                EMI starting ₹{emi.toLocaleString("en-IN")}/month
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-[#2D5A27] px-4 hover:bg-[#244a20]"
            >
              <Link href={`/treks/${trek.slug}`} onClick={() => addRecent(trek.id)}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}

export const TrekListingCard = memo(TrekListingCardComponent);
