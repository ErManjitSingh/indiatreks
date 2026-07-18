"use client";

import {
  ArrowRight,
  Heart,
  MapPin,
  Mountain,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { BookNowButton } from "@/components/booking/book-now-button";
import { MountainSilhouettes } from "@/components/home/mountain-silhouettes";
import { Container } from "@/components/ui/container";
import { toast } from "@/components/ui/toast";
import { siteConfig } from "@/config/site";
import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { useRecentlyViewedStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TrekDetail } from "@/types/trek-detail";
import { formatCurrency, formatTrekDuration } from "@/utils";

function formatAltitudeBoth(ft: number): string {
  const meters = Math.round(ft / 3.281);
  return `${ft.toLocaleString("en-IN")} ft / ${meters.toLocaleString("en-IN")} m`;
}

export function TrekDetailHero({ trek }: { trek: TrekDetail }) {
  const hydrated = useHasHydrated();
  const { toggle, has } = useWishlistStore();
  const addRecent = useRecentlyViewedStore((s) => s.add);
  const saved = hydrated && has(trek.id);
  const heroImage = trek.heroImages[0] || trek.gallery[0]?.src || "/images/og-default.jpg";
  const enquireHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi! I'd like to enquire about ${trek.title}.`,
  )}`;

  const floatingStats = [
    {
      id: "rating",
      title: trek.rating.toFixed(1),
      subtitle: `${trek.reviewCount.toLocaleString("en-IN")} reviews`,
    },
    {
      id: "altitude",
      title: trek.maxAltitude ? `${Math.round(trek.maxAltitude / 1000)}k ft` : "—",
      subtitle: "Max altitude",
    },
    {
      id: "duration",
      title: formatTrekDuration(trek.durationDays, trek.durationNights),
      subtitle: trek.difficulty.charAt(0).toUpperCase() + trek.difficulty.slice(1),
    },
  ];

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
    <section className="relative isolate min-h-[min(72vh,560px)] overflow-hidden bg-[#0b1220] text-white md:min-h-[min(78vh,700px)] lg:min-h-[min(84vh,780px)]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={trek.title}
          fill
          priority
          quality={75}
          sizes={IMAGE_SIZES.hero}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,12,20,0.78)_0%,rgba(8,12,20,0.4)_48%,rgba(8,12,20,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0.15)_0%,transparent_42%,rgba(8,12,20,0.72)_100%)]" />
      </div>

      <div className="hidden md:block">
        <MountainSilhouettes />
      </div>

      <div className="absolute top-4 right-4 z-20 flex gap-2 sm:top-5 md:right-8 md:top-6">
        <button
          type="button"
          onClick={share}
          aria-label="Share trek"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => toggle(trek.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40",
            saved && "border-red-300 text-red-300",
          )}
        >
          <Heart className={cn("h-4 w-4", saved && "fill-current")} />
        </button>
      </div>

      <Container className="relative z-[3] flex min-h-[min(72vh,560px)] flex-col justify-end pt-16 pb-16 md:min-h-[min(78vh,700px)] md:justify-center md:pt-14 md:pb-36 lg:min-h-[min(84vh,780px)] lg:pb-44">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/75 md:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/treks" className="hover:text-white">
                Treks
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link
                href={`/treks?state=${encodeURIComponent(trek.state)}`}
                className="hover:text-white"
              >
                {trek.state}
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-white">{trek.title}</li>
          </ol>
        </nav>

        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(220px,0.48fr)] lg:gap-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#2D5A27] px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
              <Mountain className="h-3.5 w-3.5 text-[#C5E063]" aria-hidden />
              Premium Himalayan Adventure
            </p>

            <p className="mt-4 font-heading text-[clamp(1.85rem,6vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] uppercase md:mt-5">
              <span className="block text-white/90 normal-case tracking-normal">
                {trek.location || trek.region || trek.state}
              </span>
              <span className="mt-0.5 block font-brush text-[clamp(2.35rem,8vw,4.75rem)] font-bold normal-case leading-[0.92] tracking-normal text-[#B8E04A]">
                {trek.title}
              </span>
            </p>

            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/85 md:mt-4 md:text-sm lg:text-[15px]">
              {trek.summary}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-white/85 md:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#B8E04A]" aria-hidden />
                {trek.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mountain className="h-3.5 w-3.5 text-[#B8E04A]" aria-hidden />
                {formatAltitudeBoth(trek.maxAltitude)}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-7 md:gap-4">
              <p className="mr-1 font-heading text-lg font-extrabold text-white md:text-xl">
                From {formatCurrency(trek.basePriceInr)}
                <span className="ml-1 text-xs font-medium text-white/70">/ person</span>
              </p>
              <BookNowButton
                trekSlug={trek.slug}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#244820] bg-[#2D5A27] px-5 py-2.5 text-xs font-bold !text-white shadow-[0_8px_20px_rgba(45,90,39,0.35)] transition hover:bg-[#244820] md:px-6 md:py-3 md:text-sm"
              >
                Book Now
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
              </BookNowButton>
              <a
                href={enquireHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20 md:px-6 md:py-3 md:text-sm"
              >
                Enquire Now
              </a>
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-2 border-t border-white/15 pt-4 md:hidden">
              {floatingStats.map((stat) => (
                <li key={stat.id} className="text-center">
                  <div className="mb-1 flex justify-center">
                    <StatIcon id={stat.id} compact />
                  </div>
                  <p className="font-heading text-[13px] font-extrabold text-white">{stat.title}</p>
                  <p className="mt-0.5 text-[9px] leading-tight text-white/65">{stat.subtitle}</p>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mx-auto hidden w-full max-w-[260px] flex-col gap-3 lg:ml-auto lg:flex">
            {floatingStats.map((stat) => (
              <li
                key={stat.id}
                className="flex items-center gap-3 rounded-2xl border border-white/20 bg-[#1a222c]/55 px-4 py-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-md"
              >
                <StatIcon id={stat.id} />
                <div>
                  <p className="font-heading text-xl font-extrabold leading-none text-white">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-[12px] font-medium text-white/75">{stat.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function StatIcon({ id, compact }: { id: string; compact?: boolean }) {
  if (id === "rating") {
    if (compact) {
      return (
        <div className="flex shrink-0 gap-0.5 text-[#FBBF24]" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 fill-current" />
          ))}
        </div>
      );
    }
    return (
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D5A27]/90 text-[#C5E063]"
        aria-hidden
      >
        <Star className="h-5 w-5 fill-current" />
      </span>
    );
  }
  if (id === "altitude") {
    if (compact) {
      return <Mountain className="h-5 w-5 text-lime" strokeWidth={1.5} aria-hidden />;
    }
    return (
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D5A27]/90 text-[#C5E063]"
        aria-hidden
      >
        <Mountain className="h-5 w-5" strokeWidth={1.6} />
      </span>
    );
  }
  if (compact) {
    return <Users className="h-5 w-5 text-lime" strokeWidth={1.5} aria-hidden />;
  }
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D5A27]/90 text-[#C5E063]"
      aria-hidden
    >
      <ShieldCheck className="h-5 w-5" strokeWidth={1.6} />
    </span>
  );
}
