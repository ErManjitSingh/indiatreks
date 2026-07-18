/**
 * Trek data comes from the Express API only (MongoDB).
 * No static trek catalog / itinerary fallback.
 */
import {
  fetchAllTreks,
  fetchRelatedTreks,
  fetchTrekBySlug,
  fetchTreks,
} from "@/lib/api/treks";
import type { Trek } from "@/types";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";

function listingFromDetail(detail: TrekDetail): TrekListingItem {
  return {
    id: detail.id,
    slug: detail.slug,
    title: detail.title,
    summary: detail.summary,
    destinationName: detail.quickInfo?.destination || detail.region,
    state: detail.state,
    region: detail.region,
    difficulty: detail.difficulty,
    bestSeasons: detail.bestSeasons,
    durationDays: detail.durationDays,
    durationNights: detail.durationNights,
    maxAltitude: detail.maxAltitude,
    groupSizeMin: 1,
    groupSizeMax: 20,
    basePriceInr: detail.basePriceInr,
    originalPriceInr: detail.originalPriceInr,
    rating: detail.rating,
    reviewCount: detail.reviewCount,
    images: detail.heroImages,
    seatsLeft: detail.seatsLeft,
    badges: [],
    trekTypes: [],
    suitableFor: [],
    months: [],
    departures: detail.departures.map((d) => d.date),
    createdAt: new Date().toISOString(),
    popularity: detail.reviewCount,
  };
}

export async function getFeaturedTreks(): Promise<Trek[]> {
  return [];
}

export async function getTrekBySlug(_slug: string): Promise<Trek | null> {
  return null;
}

export async function searchTreks(_query: string): Promise<Trek[]> {
  return [];
}

export async function getTrekListings(params?: {
  q?: string;
  destination?: string;
  region?: string;
  page?: number;
  limit?: number;
}): Promise<TrekListingItem[]> {
  try {
    if (params?.page || (params?.limit && params.limit <= 100)) {
      const { items } = await fetchTreks(params);
      return items;
    }
    return await fetchAllTreks(params);
  } catch {
    return [];
  }
}

export async function getTrekDetail(slug: string): Promise<TrekDetail | null> {
  try {
    return await fetchTrekBySlug(slug);
  } catch {
    return null;
  }
}

export async function getRelatedTrekListings(
  slug: string,
  limit = 6,
): Promise<TrekListingItem[]> {
  try {
    return await fetchRelatedTreks(slug, limit);
  } catch {
    return [];
  }
}

export async function getListing(slug: string): Promise<TrekListingItem | undefined> {
  try {
    const detail = await fetchTrekBySlug(slug);
    return detail ? listingFromDetail(detail) : undefined;
  } catch {
    return undefined;
  }
}

export async function getAllTrekSlugs(): Promise<string[]> {
  const treks = await getTrekListings({ limit: 500 });
  return treks.map((t) => t.slug);
}

export async function getPopularTrekListings(limit = 8): Promise<TrekListingItem[]> {
  const treks = await getTrekListings({ limit: 100 });
  return [...treks].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}
