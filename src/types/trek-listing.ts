import type { DifficultyLevel, Season } from "@/types";

export type TrekBadge = "trending" | "bestseller" | "limited" | "new";

export type SuitableFor =
  | "family"
  | "solo"
  | "couples"
  | "beginners"
  | "experienced";

export type TrekTypeTag =
  | "weekend"
  | "snow"
  | "camping"
  | "high-altitude"
  | "photography"
  | "family"
  | "backpacking";

export type TrekSortOption =
  | "newest"
  | "popularity"
  | "rating"
  | "price-asc"
  | "price-desc"
  | "duration";

export type TrekViewMode = "grid" | "list" | "map";

export interface TrekListingItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  destinationName: string;
  state: string;
  region: string;
  difficulty: DifficultyLevel;
  bestSeasons: Season[];
  durationDays: number;
  durationNights: number;
  maxAltitude: number;
  groupSizeMin: number;
  groupSizeMax: number;
  basePriceInr: number;
  originalPriceInr?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  seatsLeft: number;
  badges: TrekBadge[];
  trekTypes: TrekTypeTag[];
  suitableFor: SuitableFor[];
  months: string[];
  departures: string[];
  createdAt: string;
  popularity: number;
}

export interface TrekFiltersState {
  q: string;
  destination: string[];
  difficulty: DifficultyLevel[];
  duration: string[];
  season: Season[];
  month: string[];
  altitudeMin: number;
  altitudeMax: number;
  priceMin: number;
  priceMax: number;
  trekType: TrekTypeTag[];
  state: string[];
  region: string[];
  suitableFor: SuitableFor[];
  sort: TrekSortOption;
  view: TrekViewMode;
}
