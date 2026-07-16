/**
 * Data layer ready for CMS / API wiring.
 * Prefer REST backend when NEXT_PUBLIC_API_URL is configured.
 */
import { fetchTrekBySlug, fetchTreks } from "@/lib/api/treks";
import { allTreks, getTrekBySlug as getStaticListing } from "@/data/treks";
import { getTrekDetailBySlug as getStaticDetail } from "@/data/trek-details";
import type { Trek } from "@/types";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL || process.env.API_URL);

export async function getFeaturedTreks(): Promise<Trek[]> {
  return [];
}

export async function getTrekBySlug(slug: string): Promise<Trek | null> {
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
  if (useApi) {
    try {
      const { items } = await fetchTreks({ ...params, limit: params?.limit ?? 100 });
      if (items.length) return items;
    } catch {
      // fall through to static
    }
  }
  return allTreks;
}

export async function getTrekDetail(slug: string): Promise<TrekDetail | null> {
  if (useApi) {
    try {
      const fromApi = await fetchTrekBySlug(slug);
      if (fromApi) return fromApi;
    } catch {
      // fall through
    }
  }
  return getStaticDetail(slug) ?? null;
}

export async function getListing(slug: string): Promise<TrekListingItem | undefined> {
  if (useApi) {
    try {
      const { items } = await fetchTreks({ q: slug, limit: 5 });
      const match = items.find((t) => t.slug === slug);
      if (match) return match;
    } catch {
      // fall through
    }
  }
  return getStaticListing(slug);
}
