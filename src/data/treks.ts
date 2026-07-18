import { BLUR_DATA_URL } from "@/constants/media";
import {
  TREK_ALTITUDE_BOUNDS,
  TREK_PRICE_BOUNDS,
  popularTrekSearches,
  trekListingDestinations,
  trekListingRegions,
  trekListingStates,
} from "@/data/trek-listing-meta";
import { img } from "@/lib/media";
import type { TrekListingItem } from "@/types/trek-listing";

export {
  TREK_ALTITUDE_BOUNDS,
  TREK_PRICE_BOUNDS,
  popularTrekSearches,
  trekListingDestinations,
  trekListingRegions,
  trekListingStates,
};

export { BLUR_DATA_URL as trekListingBlurDataURL };

/** Marketing collections only — trek catalog lives in the API. */
export const trekCollections = [
  {
    id: "weekend",
    title: "Weekend Treks",
    description: "Short escapes for busy schedules",
    href: "/treks?trekType=weekend",
    image: img("photo-1551632811-561732d1e306", 900),
  },
  {
    id: "snow",
    title: "Snow Treks",
    description: "Frozen trails and winter summits",
    href: "/treks?trekType=snow",
    image: img("photo-1491002052546-bf38f186af21", 900),
  },
  {
    id: "high",
    title: "High Altitude Treks",
    description: "Thin air and big horizons",
    href: "/treks?trekType=high-altitude",
    image: img("photo-1464822759023-fed622ff2c3b", 900),
  },
  {
    id: "camping",
    title: "Camping Adventures",
    description: "Starlit nights in alpine meadows",
    href: "/treks?trekType=camping",
    image: img("photo-1504280390367-361c6d9f38f4", 900),
  },
  {
    id: "photo",
    title: "Photography Treks",
    description: "Golden light across ridgelines",
    href: "/treks?trekType=photography",
    image: img("photo-1500530855697-b586d89ba3ee", 900),
  },
  {
    id: "family",
    title: "Family Friendly",
    description: "Safe trails for every generation",
    href: "/treks?suitableFor=family",
    image: img("photo-1523987355523-c7b5b0dd90a7", 900),
  },
] as const;

/** @deprecated Trek listings come from the API via getTrekListings(). */
export const allTreks: TrekListingItem[] = [];

export function getTrekBySlug(_slug: string): TrekListingItem | undefined {
  return undefined;
}

export function getPopularTreks(_limit = 8): TrekListingItem[] {
  return [];
}
