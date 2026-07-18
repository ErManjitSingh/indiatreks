"use client";

import {
  BadgeCheck,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gauge,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Share2,
  Snowflake,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BookNowButton } from "@/components/booking/book-now-button";
import { Button } from "@/components/ui/button";
import { TrekDetailTabs } from "@/components/trek-detail/trek-detail-tabs";
import { TrekFaq } from "@/components/trek-detail/trek-faq";
import { TrekInclusionsExclusions } from "@/components/trek-detail/trek-inclusions";
import { TrekItinerary } from "@/components/trek-detail/trek-itinerary";
import { TrekMediaGallery } from "@/components/trek-detail/trek-media-gallery";
import { TrekOverviewBlock } from "@/components/trek-detail/trek-overview-highlights";
import { TrekPackingList } from "@/components/trek-detail/trek-packing-fitness";
import { TrekReviews } from "@/components/trek-detail/trek-reviews";
import { TrekTrustIconBar } from "@/components/trek-detail/trek-trust-icon-bar";
import { siteConfig } from "@/config/site";
import { BLUR_DATA_URL } from "@/constants/media";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { getDiscountPercent } from "@/lib/trek-filters";
import { useRecentlyViewedStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TrekDetail } from "@/types/trek-detail";
import { formatCurrency, formatTrekDuration } from "@/utils";
import { formatAltitude } from "@/utils/trek";

function formatDeparture(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function MobileTrekDetail({ trek }: { trek: TrekDetail }) {
  const hydrated = useHasHydrated();
  const { toggle, has } = useWishlistStore();
  const addRecent = useRecentlyViewedStore((s) => s.add);
  const saved = hydrated && has(trek.id);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const photos = useMemo(() => {
    const all = [
      ...trek.heroImages.map((src, i) => ({ src, alt: `${trek.title} ${i + 1}` })),
      ...trek.gallery,
    ];
    return all.filter((p, i, arr) => arr.findIndex((x) => x.src === p.src) === i);
  }, [trek]);

  const discount = getDiscountPercent(trek.basePriceInr, trek.originalPriceInr);
  const openDepartures = trek.departures.filter((d) => d.status !== "sold-out");
  const next = openDepartures[0];
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi! I want to book ${trek.title}.`,
  )}`;

  useEffect(() => {
    addRecent(trek.id);
  }, [addRecent, trek.id]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? Math.max(photos.length - 1, 0) : i - 1));
  }, [photos.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (photos.length ? (i + 1) % photos.length : 0));
  }, [photos.length]);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: trek.title, url: window.location.href });
      else await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* cancelled */
    }
  };

  const specs = [
    {
      label: "Difficulty",
      value: trek.difficulty.charAt(0).toUpperCase() + trek.difficulty.slice(1),
      icon: Gauge,
    },
    {
      label: "Duration",
      value: formatTrekDuration(trek.durationDays, trek.durationNights),
      icon: CalendarDays,
    },
    { label: "Best Season", value: trek.quickInfo.bestTime, icon: Snowflake },
    { label: "Distance", value: trek.quickInfo.distance || `${trek.distanceKm} Km`, icon: Users },
    { label: "Max Altitude", value: formatAltitude(trek.maxAltitude), icon: Mountain },
    {
      label: "Group Size",
      value: trek.quickInfo.groupSize || "Join a Group",
      icon: Users,
    },
  ];

  return (
    <div className="bg-white pb-32 md:hidden">
      {/* Swipeable hero carousel */}
      <section className="relative">
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-b-3xl touch-pan-y"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
            touchDeltaX.current = 0;
          }}
          onTouchMove={(e) => {
            if (touchStartX.current == null) return;
            touchDeltaX.current = (e.touches[0]?.clientX ?? 0) - touchStartX.current;
          }}
          onTouchEnd={() => {
            if (Math.abs(touchDeltaX.current) > 40) {
              if (touchDeltaX.current < 0) goNext();
              else goPrev();
            }
            touchStartX.current = null;
            touchDeltaX.current = 0;
          }}
        >
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {photos.map((photo, i) => (
              <div key={photo.src} className="relative h-full w-full shrink-0">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/35" />

          <div className="absolute top-3 right-3 z-10 flex gap-1">
            <IconAction label="Share" onClick={share}>
              <Share2 className="h-4 w-4" />
            </IconAction>
            <IconAction label="Wishlist" onClick={() => toggle(trek.id)} active={saved}>
              <Heart className={cn("h-4 w-4", saved && "fill-current")} />
            </IconAction>
          </div>

          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#2D5A27] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
            <Flame className="h-3 w-3 text-[#A3E635]" aria-hidden />
            TRENDING TREK
          </span>

          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              <Camera className="h-3.5 w-3.5" aria-hidden />
              {index + 1}/{photos.length || 1} Photos
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={goPrev}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5">
                {photos.slice(0, 8).map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    aria-label={`Photo ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full bg-white/50 transition-all",
                      i === index ? "w-4 bg-white" : "w-1.5",
                    )}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next photo"
                onClick={goNext}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 pt-5">
        <h1 className="font-heading text-[1.75rem] font-bold leading-tight tracking-tight text-[#1A1A1A]">
          {trek.title}
        </h1>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-[#555]">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
            {trek.location}
          </span>
          <span className="text-[#ccc]">|</span>
          <span className="inline-flex items-center gap-1">
            <Mountain className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
            {formatAltitude(trek.maxAltitude)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1 font-semibold text-[#1A1A1A]">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            {trek.rating.toFixed(1)}{" "}
            <span className="font-medium text-muted-foreground">
              ({trek.reviewCount.toLocaleString("en-IN")} reviews)
            </span>
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#555]">{trek.summary}</p>

        <ul className="mt-4 flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {specs.map(({ label, value, icon: Icon }) => (
            <li
              key={label}
              className="min-w-[6.5rem] shrink-0 rounded-xl border border-[#e8ece6] bg-white px-3 py-3 text-center"
            >
              <Icon className="mx-auto h-4 w-4 text-[#2D5A27]" aria-hidden />
              <p className="mt-1.5 text-[10px] font-medium text-muted-foreground">{label}</p>
              <p className="mt-0.5 text-xs font-bold capitalize text-[#1A1A1A]">{value}</p>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-2xl border border-[#e8ece6] bg-white p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">From</p>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
            <p className="font-heading text-3xl font-extrabold text-[#1A1A1A]">
              {formatCurrency(trek.basePriceInr)}
              <span className="ml-1 text-sm font-medium text-muted-foreground">/person</span>
            </p>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {trek.originalPriceInr ? (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(trek.originalPriceInr)}
              </span>
            ) : null}
            {discount ? (
              <span className="rounded-md bg-[#E8F5E9] px-2 py-0.5 text-xs font-bold text-[#2D5A27]">
                {discount}% OFF
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
            Inclusive of all taxes
            <Info className="h-3 w-3" aria-hidden />
          </p>

          {next ? (
            <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-[#e8ece6] bg-[#F7F8F6] px-3 py-3 text-sm">
              <span className="inline-flex min-w-0 items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#2D5A27]" aria-hidden />
                <span>
                  Next Departure:{" "}
                  <span className="font-semibold text-foreground">
                    {formatDeparture(next.date)}
                  </span>
                </span>
              </span>
              <span className="shrink-0 font-semibold text-red-600">
                Seats Left: {next.seats}
              </span>
            </div>
          ) : null}

          <div className="mt-3 space-y-2.5">
            <BookNowButton trekSlug={trek.slug} size="lg" className="w-full rounded-xl text-base">
              Book This Trek
            </BookNowButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-xl border-[#2D5A27]/35 bg-white text-[#2D5A27] hover:bg-[#E8F5E9]"
            >
              <a href={whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Enquire Now
              </a>
            </Button>
          </div>

          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#2D5A27]">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            Secure your spot with just 25% advance
          </p>
        </div>
      </div>

      <div className="mt-5 px-4">
        <TrekDetailTabs
          reviewCount={trek.reviewCount}
          stickyClassName="top-0 mx-0 rounded-none px-0"
        />
      </div>

      {/* Full content — same as desktop */}
      <div className="space-y-8 px-4 py-6">
        <TrekOverviewBlock trek={trek} />
        <TrekItinerary trek={trek} />
        <TrekInclusionsExclusions trek={trek} />
        <div id="essentials" className="scroll-mt-28">
          <TrekPackingList trek={trek} />
        </div>
        <section
          id="gallery"
          data-trek-section="gallery"
          className="scroll-mt-28 border-t border-[#e8ece6] pt-8"
        >
          <h2 className="mb-4 font-heading text-2xl font-bold text-[#1A1A1A]">Gallery</h2>
          <TrekMediaGallery trek={trek} />
        </section>
        <TrekReviews trek={trek} />
        <TrekFaq trek={trek} />
      </div>

      <TrekTrustIconBar />

      {/* Sticky booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8ece6] bg-white/95 px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_28px_rgba(20,40,20,0.12)] backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Starting from
            </p>
            <p className="font-heading text-lg font-extrabold leading-tight text-[#1A1A1A]">
              {formatCurrency(trek.basePriceInr)}
              <span className="ml-1 text-[11px] font-medium text-muted-foreground">/person</span>
            </p>
          </div>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            aria-label="Call us"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d0d5cc] bg-[#F7F8F6] text-[#2D5A27]"
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
          </a>
          <BookNowButton
            trekSlug={trek.slug}
            className="inline-flex min-h-11 min-w-[7.25rem] flex-col items-center justify-center rounded-xl px-3.5 py-2 !text-white shadow-md"
          >
            <span className="text-sm font-bold leading-none">Book Now</span>
          </BookNowButton>
        </div>
      </div>
    </div>
  );
}

function IconAction({
  label,
  children,
  onClick,
  active,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-1 text-white",
        active && "text-[#ffb4b4]",
      )}
      onClick={onClick}
      aria-label={label}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
        {children}
      </span>
      <span className="text-[9px] font-semibold">{label}</span>
    </button>
  );
}
