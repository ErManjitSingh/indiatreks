"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { BLUR_DATA_URL } from "@/constants/media";
import type {
  BlogCard,
  FeaturedTrekCard,
} from "@/data/homepage";
import {
  destinationShowcases,
  heroSearchOptions,
  popularDestinations,
  trekCategoryCards,
  whyChooseItems,
  fixedDepartures,
  galleryPhotos,
  testimonials,
  homeFaqs,
  heroMedia,
  trustBadges,
  adventureStats,
} from "@/data/homepage";
import { siteConfig } from "@/config/site";
import type { SiteBootstrap } from "@/lib/api/content";
import { resolveMediaUrl } from "@/lib/resolve-media-url";
import { formatNumber } from "@/utils";
import type { DifficultyLevel } from "@/types";

type HomepageBundle = {
  featuredTreks: FeaturedTrekCard[];
  destinationShowcases: typeof destinationShowcases;
  popularDestinations: typeof popularDestinations;
  heroSearchOptions: typeof heroSearchOptions;
  trekCategoryCards: typeof trekCategoryCards;
  whyChooseItems: typeof whyChooseItems;
  fixedDepartures: typeof fixedDepartures;
  galleryPhotos: typeof galleryPhotos;
  testimonials: typeof testimonials;
  latestBlogs: BlogCard[];
  homeFaqs: typeof homeFaqs;
  heroMedia: typeof heroMedia;
  trustBadges: typeof trustBadges;
  adventureStats: typeof adventureStats;
};

type SiteContentContextValue = HomepageBundle & {
  bootstrap: SiteBootstrap | null;
  site: NonNullable<SiteBootstrap["site"]> & {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    url: string;
    logo: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  logoSrc: string;
};

const staticSite = {
  name: siteConfig.name,
  shortName: siteConfig.shortName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: "/icons/logo.png",
  phone: siteConfig.phone,
  email: siteConfig.email,
  whatsapp: siteConfig.whatsapp,
};

const emptyHomepage: HomepageBundle = {
  featuredTreks: [],
  destinationShowcases,
  popularDestinations,
  heroSearchOptions,
  trekCategoryCards,
  whyChooseItems,
  fixedDepartures,
  galleryPhotos,
  testimonials,
  latestBlogs: [],
  homeFaqs,
  heroMedia,
  trustBadges,
  adventureStats,
};

function pickArray<T>(cms: readonly T[] | undefined, fallback: readonly T[]): T[] {
  return cms?.length ? [...cms] : [...fallback];
}

function mapBootstrapBlogs(blogs: SiteBootstrap["blogs"] | undefined): BlogCard[] {
  if (!Array.isArray(blogs) || !blogs.length) return [];
  return blogs
    .map((raw, index) => {
      const b = raw as Record<string, unknown>;
      const slug = String(b.slug ?? "");
      const title = String(b.title ?? "");
      if (!slug || !title) return null;
      const author =
        typeof b.author === "object" && b.author && "name" in (b.author as object)
          ? String((b.author as { name?: string }).name || "Editorial Team")
          : "Editorial Team";
      return {
        id: String(b._id ?? slug ?? `blog-${index}`),
        slug,
        title,
        excerpt: String(b.excerpt ?? ""),
        category: String(b.category ?? "Guide"),
        readingTimeMinutes: Number(b.readingTimeMinutes ?? 8),
        author,
        publishedAt: String(b.publishedAt ?? ""),
        image: resolveMediaUrl(String(b.coverImage || b.image || "")) || "/images/og-default.jpg",
        views: Number(b.views ?? 0),
      } satisfies BlogCard;
    })
    .filter(Boolean) as BlogCard[];
}

function mapBootstrapTreks(treks: SiteBootstrap["treks"] | undefined): FeaturedTrekCard[] {
  if (!Array.isArray(treks) || !treks.length) return [];
  return treks
    .map((raw, index) => {
      const t = raw as Record<string, unknown>;
      const slug = String(t.slug ?? "");
      const title = String(t.title ?? "");
      if (!slug || !title) return null;
      const days = Number(t.durationDays ?? 1);
      const nights = Number(t.durationNights ?? 0);
      const duration =
        nights > 0 ? `${days}D / ${nights}N` : `${days} Day${days === 1 ? "" : "s"}`;
      const heroes = Array.isArray(t.heroImages) ? (t.heroImages as string[]) : [];
      const seasons = Array.isArray(t.bestSeasons) ? (t.bestSeasons as string[]) : [];
      const alt = Number(t.maxAltitude ?? 0);
      return {
        id: String(t._id ?? slug ?? `trek-${index}`),
        slug,
        name: title,
        location: String(t.destinationName || t.region || t.state || "Himalayas"),
        difficulty: (t.difficulty as DifficultyLevel) || "moderate",
        duration,
        altitude: alt ? `${formatNumber(alt)} ft` : "—",
        bestSeason: seasons.length
          ? seasons.map((s) => s.slice(0, 1).toUpperCase() + s.slice(1)).join(", ")
          : "Year round",
        rating: Number(t.rating ?? 0) || 4.5,
        reviewCount: Number(t.reviewCount ?? 0),
        priceInr: Number(t.basePriceInr ?? 0),
        seatsLeft: Number(t.seatsLeft ?? 0),
        image: resolveMediaUrl(heroes[0] || "") || "/images/og-default.jpg",
        blurDataURL: BLUR_DATA_URL,
      } satisfies FeaturedTrekCard;
    })
    .filter(Boolean) as FeaturedTrekCard[];
}

function pickHomepage(bootstrap: SiteBootstrap | null): HomepageBundle {
  const homepage = (bootstrap?.homepage ?? {}) as Record<string, unknown>;
  const cmsHero = homepage.heroSearchOptions as Partial<typeof heroSearchOptions> | undefined;
  const liveBlogs = mapBootstrapBlogs(bootstrap?.blogs);
  const liveTreks = mapBootstrapTreks(bootstrap?.treks);

  return {
    // Treks & blogs: API only — never fall back to static mock catalogs
    featuredTreks: liveTreks,
    latestBlogs: liveBlogs,
    destinationShowcases: pickArray(
      homepage.destinationShowcases as typeof destinationShowcases | undefined,
      destinationShowcases,
    ),
    popularDestinations: pickArray(
      homepage.popularDestinations as typeof popularDestinations | undefined,
      popularDestinations,
    ),
    heroSearchOptions: {
      destinations: pickArray(cmsHero?.destinations, heroSearchOptions.destinations),
      difficulties: pickArray(cmsHero?.difficulties, heroSearchOptions.difficulties),
      durations: pickArray(cmsHero?.durations, heroSearchOptions.durations),
      months: pickArray(cmsHero?.months, heroSearchOptions.months),
      budgets: pickArray(cmsHero?.budgets, heroSearchOptions.budgets),
    } as unknown as typeof heroSearchOptions,
    trekCategoryCards: pickArray(
      homepage.trekCategoryCards as typeof trekCategoryCards | undefined,
      trekCategoryCards,
    ),
    whyChooseItems: pickArray(
      homepage.whyChooseItems as typeof whyChooseItems | undefined,
      whyChooseItems,
    ),
    fixedDepartures: pickArray(
      homepage.fixedDepartures as typeof fixedDepartures | undefined,
      fixedDepartures,
    ),
    galleryPhotos: pickArray(
      homepage.galleryPhotos as typeof galleryPhotos | undefined,
      galleryPhotos,
    ),
    testimonials: pickArray(
      homepage.testimonials as typeof testimonials | undefined,
      testimonials,
    ),
    homeFaqs: pickArray(homepage.homeFaqs as typeof homeFaqs | undefined, homeFaqs),
    heroMedia: (homepage.heroMedia as typeof heroMedia) ?? heroMedia,
    trustBadges: pickArray(
      homepage.trustBadges as typeof trustBadges | undefined,
      trustBadges,
    ),
    adventureStats: pickArray(
      homepage.adventureStats as typeof adventureStats | undefined,
      adventureStats,
    ),
  };
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({
  bootstrap,
  children,
}: {
  bootstrap: SiteBootstrap | null;
  children: ReactNode;
}) {
  const value = useMemo<SiteContentContextValue>(() => {
    const homepage = pickHomepage(bootstrap);
    return {
      bootstrap,
      site: {
        ...staticSite,
        ...(bootstrap?.site ?? {}),
      },
      ...homepage,
      logoSrc: String(bootstrap?.site?.logo ?? "/icons/logo.png"),
    };
  }, [bootstrap]);

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    return {
      bootstrap: null,
      site: staticSite,
      ...emptyHomepage,
      logoSrc: "/icons/logo.png",
    } satisfies SiteContentContextValue;
  }
  return ctx;
}
