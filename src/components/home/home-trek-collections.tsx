"use client";

import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Mountain } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { TrekCard } from "@/components/home/trek-card";
import { Container } from "@/components/ui/container";
import { fetchAllTreks } from "@/lib/api/treks";
import {
  HOME_TREK_TABS,
  inferStateFromCoords,
  listingToFeaturedCard,
  pickHomeTreks,
  type HomeTrekTabId,
} from "@/lib/home-trek-collections";
import { cn } from "@/lib/utils";
import type { FeaturedTrekCard } from "@/data/homepage";
import type { TrekListingItem } from "@/types/trek-listing";

const CARD_LIMIT = 8;

export function HomeTrekCollections({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const [tab, setTab] = useState<HomeTrekTabId>("upcoming");
  const [items, setItems] = useState<TrekListingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [nearState, setNearState] = useState<string | null>(null);
  const [nearLabel, setNearLabel] = useState("Detecting…");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const treks = await fetchAllTreks();
        if (!cancelled) setItems(treks);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setNearState("Himachal Pradesh");
      setNearLabel("Himachal Pradesh");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const state = inferStateFromCoords(pos.coords.latitude, pos.coords.longitude);
        setNearState(state || "Himachal Pradesh");
        setNearLabel(state || "Himachal Pradesh");
      },
      () => {
        setNearState("Himachal Pradesh");
        setNearLabel("Himachal Pradesh");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600_000 },
    );
  }, []);

  const activeTab = HOME_TREK_TABS.find((t) => t.id === tab) ?? HOME_TREK_TABS[0];
  const cards = useMemo(() => {
    const picked = pickHomeTreks(items, tab, nearState, CARD_LIMIT);
    return picked.map(listingToFeaturedCard);
  }, [items, tab, nearState]);

  const viewAllHref =
    tab === "near-you" && nearState
      ? `/treks?state=${encodeURIComponent(nearState)}`
      : activeTab.href;

  if (variant === "mobile") {
    return (
      <section className="px-4 pt-7" aria-labelledby="home-trek-collections-mobile">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2
            id="home-trek-collections-mobile"
            className="font-heading text-base font-extrabold tracking-tight text-[#14201a] uppercase"
          >
            {activeTab.label}
          </h2>
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5A27]"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <TabPills tab={tab} onChange={setTab} nearLabel={nearLabel} compact />

        {tab === "near-you" ? (
          <p className="mt-2 mb-3 inline-flex items-center gap-1 text-[11px] text-[#6b7668]">
            <MapPin className="h-3 w-3 text-[#6b8f3c]" aria-hidden />
            Showing treks in {nearLabel}
          </p>
        ) : (
          <p className="mt-2 mb-3 text-[11px] leading-snug text-[#6b7668]">
            {activeTab.description}
          </p>
        )}

        {loading ? (
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-64 w-[78%] max-w-[300px] shrink-0 animate-pulse rounded-2xl bg-[#e8ece6]"
              />
            ))}
          </div>
        ) : cards.length ? (
          <TrekCardSlider
            cards={cards}
            slideClass="basis-[82%] max-w-[300px]"
            autoplay
          />
        ) : (
          <EmptyState href={viewAllHref} />
        )}
      </section>
    );
  }

  return (
    <section
      id="featured-treks"
      className="relative overflow-hidden bg-white pt-8 pb-10 md:pt-14 md:pb-16"
      aria-labelledby="home-trek-collections"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-[0.35] md:block"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(163,230,53,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(15,81,50,0.05), transparent 35%), repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(15,81,50,0.03) 28px, rgba(15,81,50,0.03) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(15,81,50,0.03) 28px, rgba(15,81,50,0.03) 29px)",
        }}
        aria-hidden
      />

      <Container className="relative z-[1]">
        <div className="mb-6 flex flex-col items-center text-center md:mb-8">
          <Mountain className="mb-2 h-7 w-7 text-[#6b8f3c]" strokeWidth={1.4} aria-hidden />
          <h2
            id="home-trek-collections"
            className="font-heading text-3xl font-extrabold tracking-tight text-[#14201a] md:text-[2.15rem]"
          >
            {activeTab.label}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#6b7668]">
            {tab === "near-you"
              ? `Routes curated around ${nearLabel}.`
              : activeTab.description}
          </p>
        </div>

        <TabPills tab={tab} onChange={setTab} nearLabel={nearLabel} />

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2e1a]/80 px-4 py-2 text-sm font-semibold text-[#14201a] transition hover:bg-[#14201a] hover:text-white"
          >
            View All {activeTab.label}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {loading ? (
          <div className="mt-8 flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-80 w-[280px] shrink-0 animate-pulse rounded-2xl bg-[#e8ece6]"
              />
            ))}
          </div>
        ) : cards.length ? (
          <div className="mt-8">
            <TrekCardSlider
              cards={cards}
              slideClass="basis-[85%] sm:basis-[48%] lg:basis-[32%] xl:basis-[24%]"
              autoplay
              showArrows
            />
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState href={viewAllHref} />
          </div>
        )}
      </Container>
    </section>
  );
}

function TrekCardSlider({
  cards,
  slideClass,
  autoplay = false,
  showArrows = false,
}: {
  cards: FeaturedTrekCard[];
  slideClass: string;
  autoplay?: boolean;
  showArrows?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: cards.length > 2,
    skipSnaps: false,
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanScroll(emblaApi.canScrollPrev() || emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, cards]);

  useEffect(() => {
    if (!autoplay || !emblaApi || cards.length < 2) return;
    const id = window.setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 4200);
    return () => window.clearInterval(id);
  }, [autoplay, emblaApi, cards.length]);

  return (
    <div className="relative">
      {showArrows && canScroll ? (
        <div className="pointer-events-none absolute inset-y-0 -left-1 -right-1 z-[2] hidden items-center justify-between md:flex">
          <SliderBtn
            label="Previous treks"
            onClick={() => emblaApi?.scrollPrev()}
            className="pointer-events-auto -translate-x-1"
          >
            <ChevronLeft className="h-4 w-4" />
          </SliderBtn>
          <SliderBtn
            label="Next treks"
            onClick={() => emblaApi?.scrollNext()}
            className="pointer-events-auto translate-x-1"
            active
          >
            <ChevronRight className="h-4 w-4" />
          </SliderBtn>
        </div>
      ) : null}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {cards.map((trek) => (
            <div key={trek.id} className={cn("min-w-0 shrink-0 grow-0 px-1.5 sm:px-2", slideClass)}>
              <TrekCard trek={trek} />
            </div>
          ))}
        </div>
      </div>

      {cards.length > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {cards.map((trek, index) => (
            <button
              key={trek.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === selected ? "w-5 bg-[#2D5A27]" : "w-1.5 bg-[#c5d0c0] hover:bg-[#9bb08e]",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SliderBtn({
  label,
  onClick,
  children,
  className,
  active = false,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-md transition",
        active
          ? "border-[#2D5A27] bg-[#2D5A27] text-white hover:bg-[#244820]"
          : "border-[#e0e6dc] bg-white text-[#14201a] hover:border-[#2D5A27]/40",
        className,
      )}
    >
      {children}
    </button>
  );
}

function TabPills({
  tab,
  onChange,
  nearLabel,
  compact = false,
}: {
  tab: HomeTrekTabId;
  onChange: (id: HomeTrekTabId) => void;
  nearLabel: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        !compact && "justify-start md:justify-center",
      )}
      role="tablist"
      aria-label="Trek collections"
    >
      {HOME_TREK_TABS.map((item) => {
        const active = tab === item.id;
        const label =
          item.id === "near-you" && nearLabel && nearLabel !== "Detecting…"
            ? `Near You`
            : item.label;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition",
              compact ? "px-3 py-1.5 text-[11px]" : "md:px-4 md:text-sm",
              active
                ? "border-[#2D5A27] bg-[#2D5A27] text-white shadow-sm"
                : "border-[#d7e0d4] bg-white text-[#3d4a3f] hover:border-[#2D5A27]/40",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function EmptyState({ href }: { href: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#c5d4c2] bg-[#F7FBF6] px-4 py-8 text-center">
      <p className="text-sm text-[#445045]">No treks in this collection yet.</p>
      <Link
        href={href}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2D5A27] hover:underline"
      >
        Browse all treks
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}
