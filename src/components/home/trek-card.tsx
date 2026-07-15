"use client";

import { CalendarDays, Heart, MapPin, Mountain, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BLUR_DATA_URL } from "@/constants/media";
import type { FeaturedTrekCard } from "@/data/homepage";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";

interface TrekCardProps {
  trek: FeaturedTrekCard;
}

const badgeStyles: Record<NonNullable<FeaturedTrekCard["badgeTone"]>, string> = {
  lime: "bg-[#8BC34A] text-white",
  orange: "bg-[#F97316] text-white",
  blue: "bg-[#3B82F6] text-white",
  sky: "bg-[#1D4ED8] text-white",
};

function formatReviews(count: number): string {
  if (count >= 1000) {
    const k = count / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return String(count);
}

export function TrekCard({ trek }: TrekCardProps) {
  const hydrated = useHasHydrated();
  const { toggle, has } = useWishlistStore();
  const saved = hydrated && has(trek.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/treks/${trek.slug}`} className="absolute inset-0">
          <Image
            src={trek.image}
            alt={trek.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL={trek.blurDataURL ?? BLUR_DATA_URL}
            quality={75}
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        {trek.badge ? (
          <span
            className={cn(
              "absolute top-3 left-3 z-[1] rounded-md px-2 py-1 text-[10px] font-extrabold tracking-[0.04em] uppercase shadow-sm",
              badgeStyles[trek.badgeTone ?? "lime"],
            )}
          >
            {trek.badge}
          </span>
        ) : null}

        <button
          type="button"
          aria-label={saved ? `Remove ${trek.name} from wishlist` : `Save ${trek.name} to wishlist`}
          aria-pressed={saved}
          className={cn(
            "absolute top-3 right-3 z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground shadow-md transition hover:scale-105",
            saved && "text-red-500",
          )}
          onClick={() => toggle(trek.id)}
        >
          <Heart className={cn("h-3.5 w-3.5", saved && "fill-current")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/treks/${trek.slug}`} className="min-w-0">
            <h3 className="font-heading text-[15px] font-bold leading-snug tracking-tight text-[#14201a] transition group-hover:text-primary sm:text-[16px]">
              {trek.name}
            </h3>
          </Link>
          <p className="inline-flex shrink-0 items-center gap-1 pt-0.5 text-[11px] font-semibold text-[#5b6570]">
            <Star className="h-3 w-3 fill-[#F5B301] text-[#F5B301]" aria-hidden />
            {trek.rating.toFixed(1)}
            <span className="font-medium text-[#8a939c]">
              ({formatReviews(trek.reviewCount)})
            </span>
          </p>
        </div>

        <p className="inline-flex items-center gap-1 text-[12px] text-[#6b7668]">
          <MapPin className="h-3 w-3 text-[#6b8f3c]" aria-hidden />
          {trek.location}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-[#eef1ec] pt-2.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[#6b7668]">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3 w-3 text-[#6b8f3c]" aria-hidden />
              {trek.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mountain className="h-3 w-3 text-[#6b8f3c]" aria-hidden />
              {trek.altitude}
            </span>
          </div>
          <p className="shrink-0 text-right font-heading text-[15px] font-extrabold tracking-tight text-[#14201a]">
            {formatCurrency(trek.priceInr)}
            <span className="mt-0.5 block text-[10px] font-medium text-[#8a939c]">
              / person
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
