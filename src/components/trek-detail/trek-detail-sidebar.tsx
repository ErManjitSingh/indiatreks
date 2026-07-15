"use client";

import {
  BadgeCheck,
  Download,
  Headset,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getDiscountPercent } from "@/lib/trek-filters";
import type { TrekDetail } from "@/types/trek-detail";
import { formatCurrency } from "@/utils";

function formatDeparture(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const trustItems = [
  { label: "Expert Trek Leaders", icon: UserRound },
  { label: "Safety First", icon: ShieldCheck },
  { label: "Best Price Guarantee", icon: Wallet },
  { label: "24x7 Support", icon: Headset },
] as const;

export function TrekDetailSidebar({ trek }: { trek: TrekDetail }) {
  const discount = getDiscountPercent(trek.basePriceInr, trek.originalPriceInr);
  const nextDeparture = trek.departures.find((d) => d.status !== "sold-out") ?? trek.departures[0];
  const brochure = trek.downloads[0];
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi! I need help choosing — interested in ${trek.title}.`,
  )}`;

  return (
    <aside className="space-y-4 lg:sticky lg:top-24" id="booking">
      <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="font-heading text-3xl font-extrabold text-[#1A1A1A]">
            From {formatCurrency(trek.basePriceInr)}
          </p>
          <span className="text-sm text-muted-foreground">/ person</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {trek.originalPriceInr ? (
            <p className="text-sm text-muted-foreground line-through">
              {formatCurrency(trek.originalPriceInr)}
            </p>
          ) : null}
          {discount ? (
            <span className="rounded-md bg-[#E8F5E9] px-2 py-0.5 text-xs font-bold text-[#2D5A27]">
              {discount}% OFF
            </span>
          ) : null}
        </div>

        {nextDeparture ? (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[#e8ece6] bg-[#F7F8F6] px-3.5 py-3 text-sm">
            <p className="text-muted-foreground">
              Next Departure:{" "}
              <span className="font-semibold text-foreground">
                {formatDeparture(nextDeparture.date)}
              </span>
            </p>
            <p className="shrink-0 font-semibold text-red-600">
              Seats Left: {nextDeparture.seats || trek.seatsLeft}
            </p>
          </div>
        ) : null}

        <div className="mt-4 space-y-2.5">
          <Button asChild size="lg" className="w-full text-base">
            <Link href={`/booking?trek=${trek.slug}`}>Book This Trek</Link>
          </Button>
          {brochure ? (
            <Button asChild variant="outline" size="lg" className="w-full border-[#d0d5cc] bg-white">
              <a href={brochure.href} download>
                <Download className="h-4 w-4" aria-hidden />
                Download Brochure
              </a>
            </Button>
          ) : (
            <Button asChild variant="outline" size="lg" className="w-full border-[#d0d5cc] bg-white">
              <Link href="/contact">
                <Download className="h-4 w-4" aria-hidden />
                Download Brochure
              </Link>
            </Button>
          )}
        </div>

        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#2D5A27]">
          <BadgeCheck className="h-4 w-4" aria-hidden />
          Secure Your Spot with Just 25% Advance
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e8ece6] bg-[linear-gradient(160deg,#eef6ff_0%,#f7faf5_55%,#eef5ea_100%)] p-5 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-[#1A1A1A]">Need Help Choosing?</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Talk to our trek experts for free advice on dates, fitness, and packing.
        </p>
        <div className="mt-4 space-y-2">
          <Button asChild className="w-full">
            <a href={whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Chat on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full border-[#d0d5cc] bg-white">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Phone className="h-4 w-4" aria-hidden />
              Call Now
            </a>
          </Button>
        </div>
      </div>

      <ul className="space-y-3 rounded-2xl border border-[#e8ece6] bg-white p-5 shadow-sm">
        {trustItems.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-3 text-sm font-medium text-[#333]">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2D5A27]">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
