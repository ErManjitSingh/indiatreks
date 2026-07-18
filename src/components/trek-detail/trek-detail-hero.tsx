"use client";

import {
  ArrowRight,
  BadgeCheck,
  Flame,
  Heart,
  Leaf,
  MapPin,
  Mountain,
  ShieldCheck,
  Share2,
  Star,
  Wallet,
  Headphones,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { BookNowButton } from "@/components/booking/book-now-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { toast } from "@/components/ui/toast";
import { siteConfig } from "@/config/site";
import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { useRecentlyViewedStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TrekDetail } from "@/types/trek-detail";
import { formatCurrency } from "@/utils";

const heroFeatures = [
  { label: "Best Price Guarantee", icon: Wallet },
  { label: "Certified Guides", icon: BadgeCheck },
  { label: "Safe & Secure", icon: ShieldCheck },
  { label: "Eco-Friendly", icon: Leaf },
  { label: "24/7 Support", icon: Headphones },
] as const;

function formatAltitudeBoth(ft: number): string {
  const meters = Math.round(ft / 3.281);
  return `${ft.toLocaleString("en-IN")} ft (${meters.toLocaleString("en-IN")} m)`;
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
    <section className="relative isolate min-h-[520px] overflow-hidden md:min-h-[580px] lg:min-h-[640px]">
      <Image
        src={heroImage}
        alt={trek.title}
        fill
        priority
        quality={75}
        sizes={IMAGE_SIZES.hero}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

      <Container className="relative z-10 flex min-h-[520px] flex-col justify-end pb-10 pt-8 md:min-h-[580px] md:pb-12 md:pt-10 lg:min-h-[640px]">
        <div className="absolute right-4 top-6 z-20 flex gap-2 sm:right-0 sm:top-8 md:right-0">
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

        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/80 md:text-sm">
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

        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2D5A27] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              <Flame className="h-3.5 w-3.5 text-[#A3E635]" aria-hidden />
              Trending Trek
            </span>

            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white drop-shadow md:text-5xl lg:text-6xl">
              {trek.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#A3E635]" aria-hidden />
                {trek.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mountain className="h-4 w-4 text-[#A3E635]" aria-hidden />
                {formatAltitudeBoth(trek.maxAltitude)}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                {trek.rating.toFixed(1)}
                <span className="font-medium text-white/75">
                  ({trek.reviewCount.toLocaleString("en-IN")} reviews)
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#00B67A]">
                <span className="rounded bg-[#00B67A] px-1 py-0.5 text-[9px] text-white">★</span>
                Trustpilot
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
              {trek.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="mr-2 font-heading text-2xl font-extrabold text-white md:text-3xl">
                From {formatCurrency(trek.basePriceInr)}
                <span className="ml-1 text-sm font-medium text-white/75">/ person</span>
              </p>
              <BookNowButton
                trekSlug={trek.slug}
                size="lg"
                className="bg-[#2D5A27] text-white hover:bg-[#244a20]"
              >
                Book Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </BookNowButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a href={enquireHref} target="_blank" rel="noreferrer">
                  Enquire Now
                </a>
              </Button>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-white/25 bg-white/95 p-5 shadow-xl backdrop-blur-md lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2D5A27]">
              Why trek with us
            </p>
            <ul className="mt-4 space-y-3">
              {heroFeatures.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3 text-sm font-semibold text-[#1A1A1A]">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2D5A27]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
