"use client";

import {
  BadgeCheck,
  CalendarDays,
  Camera,
  CheckSquare,
  ChevronRight,
  Flame,
  Gauge,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  MoreVertical,
  Mountain,
  Play,
  Route,
  Share2,
  Snowflake,
  Star,
  Trees,
  Users,
  XSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { BLUR_DATA_URL } from "@/constants/media";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { getDiscountPercent } from "@/lib/trek-filters";
import { useRecentlyViewedStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TrekDetail } from "@/types/trek-detail";
import { formatCurrency, formatTrekDuration } from "@/utils";
import { formatAltitude } from "@/utils/trek";

type MobileTab = "overview" | "itinerary" | "inclusions" | "exclusions" | "more";

const tabs: Array<{ id: MobileTab; label: string; icon: typeof Info }> = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "itinerary", label: "Itinerary", icon: Route },
  { id: "inclusions", label: "Inclusions", icon: CheckSquare },
  { id: "exclusions", label: "Exclusions", icon: XSquare },
  { id: "more", label: "More", icon: MoreVertical },
];

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
  const [tab, setTab] = useState<MobileTab>("overview");
  const [expanded, setExpanded] = useState(false);
  const [selectedDeparture, setSelectedDeparture] = useState(0);

  const photos = useMemo(() => {
    const all = [
      ...trek.heroImages.map((src, i) => ({ src, alt: `${trek.title} ${i + 1}` })),
      ...trek.gallery,
    ];
    return all.filter((p, i, arr) => arr.findIndex((x) => x.src === p.src) === i);
  }, [trek]);

  const discount = getDiscountPercent(trek.basePriceInr, trek.originalPriceInr);
  const openDepartures = trek.departures.filter((d) => d.status !== "sold-out");
  const next = openDepartures[selectedDeparture] ?? openDepartures[0];
  const photoCount = Math.max(photos.length, 28);
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi! I want to book ${trek.title}.`,
  )}`;

  useEffect(() => {
    addRecent(trek.id);
  }, [addRecent, trek.id]);

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
    { label: "Max Altitude", value: trek.quickInfo.maxAltitude, icon: Mountain },
  ];

  const highlightItems = [
    { label: "360° Summit Views", icon: Mountain },
    { label: "Snow Trek Experience", icon: Snowflake },
    { label: "Beautiful Campsites & Forests", icon: Trees },
    { label: "Perfect for Beginners", icon: Users },
  ].map((item, i) => ({
    ...item,
    label: trek.highlights[i] ?? item.label,
  }));

  const aboutText = expanded
    ? trek.overview
    : trek.overview.length > 160
      ? `${trek.overview.slice(0, 160).trim()}…`
      : trek.overview;

  return (
    <div className="bg-white pb-28 md:hidden">
      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-b-3xl">
          <Image
            src={photos[index]?.src ?? trek.heroImages[0]}
            alt={photos[index]?.alt ?? trek.title}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/25" />

          {/* Hero actions — site header is shown above */}
          <div className="absolute top-3 right-3 z-10 flex gap-1">
            <IconAction label="Share" onClick={share}>
              <Share2 className="h-4 w-4" />
            </IconAction>
            <IconAction
              label="Wishlist"
              onClick={() => toggle(trek.id)}
              active={saved}
            >
              <Heart className={cn("h-4 w-4", saved && "fill-current")} />
            </IconAction>
          </div>

          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#2D5A27] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
            <Flame className="h-3 w-3 text-[#A3E635]" aria-hidden />
            TRENDING TREK
          </span>

          <button
            type="button"
            className="absolute bottom-4 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm"
            onClick={() => setIndex((i) => (i + 1) % photos.length)}
          >
            <Camera className="h-3.5 w-3.5" aria-hidden />
            {photoCount} Photos
          </button>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.slice(0, 5).map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                aria-label={`Photo ${i + 1}`}
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-white/50",
                  i === index && "w-4 bg-white",
                )}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Watch trek video"
            className="absolute bottom-3 right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2D5A27] shadow-lg"
            onClick={() => {
              if (trek.heroVideo) window.open(trek.heroVideo, "_blank", "noopener,noreferrer");
            }}
          >
            <Play className="h-5 w-5 fill-current" />
          </button>
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
            Altitude: {formatAltitude(trek.maxAltitude)}
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
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00B67A]">
            <span className="rounded bg-[#00B67A] px-1 text-[9px] text-white">★</span>
            Excellent on Trustpilot
          </span>
        </div>

        {/* Specs scroll */}
        <ul className="mt-4 flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {specs.map(({ label, value, icon: Icon }) => (
            <li
              key={label}
              className="min-w-[6.5rem] shrink-0 rounded-xl border border-[#e8ece6] bg-white px-3 py-3 text-center"
            >
              <Icon className="mx-auto h-4 w-4 text-[#2D5A27]" aria-hidden />
              <p className="mt-1.5 text-[10px] font-medium text-muted-foreground">{label}</p>
              <p className="mt-0.5 text-xs font-bold text-[#1A1A1A]">{value}</p>
            </li>
          ))}
        </ul>

        {/* Booking card */}
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
            <Button
              asChild
              size="lg"
              className="w-full rounded-xl border border-[#d0d5cc] bg-white text-base text-[#1A1A1A] hover:bg-[#F7F8F6]"
            >
              <Link href={`/booking?trek=${trek.slug}`}>Book This Trek</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-xl border-[#2D5A27]/35 bg-white text-[#2D5A27] hover:bg-[#E8F5E9]"
            >
              <a href={whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#2D5A27]">
            <BadgeCheck className="h-4 w-4" aria-hidden />
            Secure your spot with just 25% advance
          </p>
        </div>
      </div>

      {/* Tabs */}
      <nav
        aria-label="Trek sections"
        className="sticky top-0 z-20 mt-5 border-y border-[#e8ece6] bg-white/95 backdrop-blur-md"
      >
        <ul className="flex gap-0 overflow-x-auto px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setTab(id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition",
                    active
                      ? "border-[#2D5A27] text-[#2D5A27]"
                      : "border-transparent text-muted-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-5">
        {tab === "overview" ? (
          <div className="space-y-6">
            <section>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-[#1A1A1A]">
                  About {trek.title}
                </h2>
                <button
                  type="button"
                  className="shrink-0 text-sm font-semibold text-[#2D5A27]"
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#555]">{aboutText}</p>
            </section>

            <section>
              <h3 className="font-heading text-lg font-bold text-[#1A1A1A]">Highlights</h3>
              <ul className="mt-4 grid grid-cols-4 gap-2 text-center">
                {highlightItems.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex flex-col items-center gap-2">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F3F5F2] text-[#2D5A27]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <p className="text-[10px] font-semibold leading-tight text-[#333]">{label}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-[#1A1A1A]">
                  Upcoming Departures
                </h3>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#2D5A27]"
                  onClick={() => setTab("more")}
                >
                  View All
                </button>
              </div>
              <div className="relative">
                <ul className="flex gap-2.5 overflow-x-auto pb-1 pr-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {openDepartures.map((dep, i) => (
                    <li key={dep.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedDeparture(i)}
                        className={cn(
                          "min-w-[7.5rem] rounded-xl border bg-white px-3 py-3 text-left",
                          i === selectedDeparture
                            ? "border-[#2D5A27] shadow-sm"
                            : "border-[#e8ece6]",
                        )}
                      >
                        <p className="text-sm font-bold text-[#1A1A1A]">
                          {formatDeparture(dep.date)}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-red-600">
                          {dep.seats} Seats Left
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
                <span className="pointer-events-none absolute right-0 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#e8ece6] bg-white shadow-sm">
                  <ChevronRight className="h-4 w-4 text-[#2D5A27]" aria-hidden />
                </span>
              </div>
            </section>
          </div>
        ) : null}

        {tab === "itinerary" ? (
          <ul className="space-y-3">
            {trek.itinerary.map((day) => (
              <li key={day.day} className="rounded-xl border border-[#e8ece6] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#2D5A27]">
                  Day {day.day}
                </p>
                <h3 className="mt-1 font-heading text-base font-bold">{day.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555]">{day.description}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {tab === "inclusions" ? (
          <ul className="space-y-2">
            {trek.inclusions.map((item) => (
              <li
                key={item}
                className="flex gap-2 rounded-xl border border-[#e8ece6] bg-white px-3 py-3 text-sm"
              >
                <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5A27]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {tab === "exclusions" ? (
          <ul className="space-y-2">
            {trek.exclusions.map((item) => (
              <li
                key={item}
                className="flex gap-2 rounded-xl border border-[#e8ece6] bg-white px-3 py-3 text-sm"
              >
                <XSquare className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {tab === "more" ? (
          <div id="more-panel" className="space-y-5">
            <section>
              <h3 className="font-heading text-lg font-bold">Trek Essentials</h3>
              <ul className="mt-3 space-y-2">
                {trek.packingList.flatMap((g) => g.items).slice(0, 8).map((item) => (
                  <li key={item} className="rounded-lg bg-[#F7F8F6] px-3 py-2 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="font-heading text-lg font-bold">FAQs</h3>
              <ul className="mt-3 space-y-3">
                {trek.faqs.slice(0, 4).map((faq) => (
                  <li key={faq.id} className="rounded-xl border border-[#e8ece6] p-3">
                    <p className="text-sm font-semibold">{faq.question}</p>
                    <p className="mt-1 text-sm text-[#555]">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="font-heading text-lg font-bold">Reviews</h3>
              <ul className="mt-3 space-y-3">
                {trek.reviews.slice(0, 3).map((review) => (
                  <li key={review.id} className="rounded-xl border border-[#e8ece6] p-3">
                    <p className="text-sm font-bold">{review.name}</p>
                    <p className="mt-1 text-sm text-[#555]">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </div>

      {/* Sticky book bar — mockup style */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8ece6] bg-white px-3 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-muted-foreground">From</p>
            <p className="font-heading text-lg font-extrabold leading-tight text-[#1A1A1A]">
              {formatCurrency(trek.basePriceInr)}
              <span className="ml-1 text-xs font-medium text-muted-foreground">/person</span>
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
              {trek.originalPriceInr ? (
                <span className="text-[11px] text-muted-foreground line-through">
                  {formatCurrency(trek.originalPriceInr)}
                </span>
              ) : null}
              {discount ? (
                <span className="rounded bg-[#E8F5E9] px-1.5 py-0.5 text-[10px] font-bold text-[#2D5A27]">
                  {discount}% OFF
                </span>
              ) : null}
            </div>
          </div>
          <Link
            href={`/booking?trek=${trek.slug}`}
            className="inline-flex min-w-[8.5rem] flex-col items-center justify-center rounded-xl border border-[#d0d5cc] bg-white px-4 py-2.5 text-[#1A1A1A] shadow-sm"
          >
            <span className="text-sm font-bold">Book Now</span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[9px] font-medium text-[#555]">
              <BadgeCheck className="h-3 w-3" aria-hidden />
              Best Price Guaranteed
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function IconAction({
  label,
  children,
  onClick,
  href,
  active,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  active?: boolean;
}) {
  const className = cn(
    "inline-flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-1 text-white",
    active && "text-[#ffb4b4]",
  );

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
          {children}
        </span>
        <span className="text-[9px] font-semibold">{label}</span>
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} aria-label={label}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
        {children}
      </span>
      <span className="text-[9px] font-semibold">{label}</span>
    </button>
  );
}
