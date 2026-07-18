"use client";

import {
  BadgeCheck,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import { BookNowButton } from "@/components/booking/book-now-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getDiscountPercent } from "@/lib/trek-filters";
import type { TrekDetail } from "@/types/trek-detail";
import { formatCurrency } from "@/utils";

export function TrekDetailSidebar({ trek }: { trek: TrekDetail }) {
  const discount = getDiscountPercent(trek.basePriceInr, trek.originalPriceInr);
  const enquireHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi! I'd like to enquire about ${trek.title}.`,
  )}`;

  const quickFacts = [
    { label: "Trek Type", value: trek.difficulty },
    { label: "Trail Type", value: trek.quickInfo.distance ? "Mountain Trail" : "Himalayan Trail" },
    { label: "Base Camp", value: trek.quickInfo.startingPoint || trek.region },
    { label: "Style", value: trek.durationNights > 0 ? "Camping / Homestay" : "Day Trek" },
    { label: "Best For", value: trek.quickInfo.fitnessLevel || "Beginners & Families" },
  ];

  return (
    <aside className="space-y-4 lg:sticky lg:top-28" id="booking">
      <div className="overflow-hidden rounded-2xl border border-[#e8ece6] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <div className="bg-[#F7FBF6] px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Price Starts From
          </p>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <p className="font-heading text-3xl font-extrabold text-[#1A1A1A]">
              {formatCurrency(trek.basePriceInr)}
            </p>
            <span className="text-sm text-muted-foreground">/ person</span>
            {discount ? (
              <span className="rounded-md bg-[#2D5A27] px-2 py-0.5 text-[11px] font-bold text-white">
                {discount}% OFF
              </span>
            ) : null}
          </div>
          {trek.originalPriceInr ? (
            <p className="mt-1 text-sm text-muted-foreground line-through">
              {formatCurrency(trek.originalPriceInr)}
            </p>
          ) : null}
        </div>

        <div className="space-y-3 px-5 py-4">
          <BookNowButton trekSlug={trek.slug} size="lg" className="w-full text-base">
            Book Now
          </BookNowButton>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-[#2D5A27]/30 bg-white text-[#2D5A27] hover:bg-[#E8F5E9]"
          >
            <a href={enquireHref} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Enquire Now
            </a>
          </Button>

          <ul className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1 text-[11px] font-medium text-[#2D5A27]">
            <li className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Secure Booking
            </li>
            <li className="inline-flex items-center gap-1">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
              Instant Confirmation
            </li>
            <li className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Easy Cancellation
            </li>
          </ul>

          <div className="flex items-center justify-between rounded-xl bg-[#F7F8F6] px-3 py-2.5">
            <p className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1A1A1A]">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
              {trek.rating.toFixed(1)}/5
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Users className="h-3.5 w-3.5" aria-hidden />
              {Math.max(trek.reviewCount, 500).toLocaleString("en-IN")}+ Happy Trekkers
            </p>
          </div>
        </div>

        <div className="border-t border-[#e8ece6] px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Quick Facts
          </p>
          <dl className="mt-3 space-y-2.5">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="flex items-start justify-between gap-3 text-sm">
                <dt className="text-muted-foreground">{fact.label}</dt>
                <dd className="text-right font-semibold capitalize text-[#1A1A1A]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </aside>
  );
}
