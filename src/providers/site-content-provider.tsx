"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import type { SiteBootstrap } from "@/lib/api/content";
import {
  featuredTreks,
  destinationShowcases,
  heroSearchOptions,
  popularDestinations,
  trekCategoryCards,
  whyChooseItems,
  fixedDepartures,
  galleryPhotos,
  testimonials,
  latestBlogs,
  homeFaqs,
  heroMedia,
  trustBadges,
  adventureStats,
} from "@/data/homepage";
import { siteConfig } from "@/config/site";

type HomepageBundle = {
  featuredTreks: typeof featuredTreks;
  destinationShowcases: typeof destinationShowcases;
  popularDestinations: typeof popularDestinations;
  heroSearchOptions: typeof heroSearchOptions;
  trekCategoryCards: typeof trekCategoryCards;
  whyChooseItems: typeof whyChooseItems;
  fixedDepartures: typeof fixedDepartures;
  galleryPhotos: typeof galleryPhotos;
  testimonials: typeof testimonials;
  latestBlogs: typeof latestBlogs;
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

const staticHomepage: HomepageBundle = {
  featuredTreks,
  destinationShowcases,
  popularDestinations,
  heroSearchOptions,
  trekCategoryCards,
  whyChooseItems,
  fixedDepartures,
  galleryPhotos,
  testimonials,
  latestBlogs,
  homeFaqs,
  heroMedia,
  trustBadges,
  adventureStats,
};

function pickHomepage(bootstrap: SiteBootstrap | null): HomepageBundle {
  const homepage = (bootstrap?.homepage ?? {}) as Record<string, unknown>;
  return {
    featuredTreks: (homepage.featuredTreks as typeof featuredTreks) ?? featuredTreks,
    destinationShowcases:
      (homepage.destinationShowcases as typeof destinationShowcases) ?? destinationShowcases,
    popularDestinations:
      (homepage.popularDestinations as typeof popularDestinations) ?? popularDestinations,
    heroSearchOptions:
      (homepage.heroSearchOptions as typeof heroSearchOptions) ?? heroSearchOptions,
    trekCategoryCards:
      (homepage.trekCategoryCards as typeof trekCategoryCards) ?? trekCategoryCards,
    whyChooseItems: (homepage.whyChooseItems as typeof whyChooseItems) ?? whyChooseItems,
    fixedDepartures: (homepage.fixedDepartures as typeof fixedDepartures) ?? fixedDepartures,
    galleryPhotos: (homepage.galleryPhotos as typeof galleryPhotos) ?? galleryPhotos,
    testimonials: (homepage.testimonials as typeof testimonials) ?? testimonials,
    latestBlogs: (homepage.latestBlogs as typeof latestBlogs) ?? latestBlogs,
    homeFaqs: (homepage.homeFaqs as typeof homeFaqs) ?? homeFaqs,
    heroMedia: (homepage.heroMedia as typeof heroMedia) ?? heroMedia,
    trustBadges: (homepage.trustBadges as typeof trustBadges) ?? trustBadges,
    adventureStats: (homepage.adventureStats as typeof adventureStats) ?? adventureStats,
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
      ...staticHomepage,
      logoSrc: "/icons/logo.png",
    } satisfies SiteContentContextValue;
  }
  return ctx;
}
