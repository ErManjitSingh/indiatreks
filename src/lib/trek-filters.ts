import {
  TREK_ALTITUDE_BOUNDS,
  TREK_PRICE_BOUNDS,
  allTreks,
} from "@/data/treks";
import type {
  TrekFiltersState,
  TrekListingItem,
  TrekSortOption,
  TrekTypeTag,
  SuitableFor,
} from "@/types/trek-listing";
import type { DifficultyLevel, Season } from "@/types";

export const defaultTrekFilters: TrekFiltersState = {
  q: "",
  destination: [],
  difficulty: [],
  duration: [],
  season: [],
  month: [],
  altitudeMin: TREK_ALTITUDE_BOUNDS.min,
  altitudeMax: TREK_ALTITUDE_BOUNDS.max,
  priceMin: TREK_PRICE_BOUNDS.min,
  priceMax: TREK_PRICE_BOUNDS.max,
  trekType: [],
  state: [],
  region: [],
  suitableFor: [],
  sort: "popularity",
  view: "grid",
};

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function filtersFromSearchParams(params: URLSearchParams): TrekFiltersState {
  const sort = (params.get("sort") as TrekSortOption | null) ?? "popularity";
  const view = params.get("view") === "list" ? "list" : "grid";

  return {
    q: params.get("q") ?? "",
    destination: parseList(params.get("destination")),
    difficulty: parseList(params.get("difficulty")) as DifficultyLevel[],
    duration: parseList(params.get("duration")),
    season: parseList(params.get("season")) as Season[],
    month: parseList(params.get("month")),
    altitudeMin: Number(params.get("altitudeMin") ?? TREK_ALTITUDE_BOUNDS.min),
    altitudeMax: Number(params.get("altitudeMax") ?? TREK_ALTITUDE_BOUNDS.max),
    priceMin: Number(params.get("priceMin") ?? TREK_PRICE_BOUNDS.min),
    priceMax: Number(params.get("priceMax") ?? TREK_PRICE_BOUNDS.max),
    trekType: parseList(params.get("trekType")) as TrekTypeTag[],
    state: parseList(params.get("state")),
    region: parseList(params.get("region")),
    suitableFor: parseList(params.get("suitableFor")) as SuitableFor[],
    sort: [
      "newest",
      "popularity",
      "rating",
      "price-asc",
      "price-desc",
      "duration",
    ].includes(sort)
      ? sort
      : "popularity",
    view,
  };
}

export function filtersToSearchParams(filters: TrekFiltersState): URLSearchParams {
  const params = new URLSearchParams();
  const setIf = (key: string, value: string) => {
    if (value) params.set(key, value);
  };

  setIf("q", filters.q.trim());
  setIf("destination", filters.destination.join(","));
  setIf("difficulty", filters.difficulty.join(","));
  setIf("duration", filters.duration.join(","));
  setIf("season", filters.season.join(","));
  setIf("month", filters.month.join(","));
  setIf("trekType", filters.trekType.join(","));
  setIf("state", filters.state.join(","));
  setIf("region", filters.region.join(","));
  setIf("suitableFor", filters.suitableFor.join(","));

  if (filters.altitudeMin !== TREK_ALTITUDE_BOUNDS.min) {
    params.set("altitudeMin", String(filters.altitudeMin));
  }
  if (filters.altitudeMax !== TREK_ALTITUDE_BOUNDS.max) {
    params.set("altitudeMax", String(filters.altitudeMax));
  }
  if (filters.priceMin !== TREK_PRICE_BOUNDS.min) {
    params.set("priceMin", String(filters.priceMin));
  }
  if (filters.priceMax !== TREK_PRICE_BOUNDS.max) {
    params.set("priceMax", String(filters.priceMax));
  }
  if (filters.sort !== "popularity") params.set("sort", filters.sort);
  if (filters.view !== "grid") params.set("view", filters.view);

  return params;
}

function matchesDuration(days: number, buckets: string[]): boolean {
  if (!buckets.length) return true;
  return buckets.some((bucket) => {
    if (bucket === "1-2") return days <= 2;
    if (bucket === "3-4") return days >= 3 && days <= 4;
    if (bucket === "5-7") return days >= 5 && days <= 7;
    if (bucket === "8+") return days >= 8;
    return true;
  });
}

/**
 * Hub → region expansion so destination search shows the full local trek set.
 * Selecting "Dharamshala" returns every trek tagged region=Dharamshala
 * (McLeod Ganj, Bir, Barot, Bharmour, Kangra, Naddi, …).
 */
export const DESTINATION_REGION_ALIASES: Record<string, string> = {
  Dharamshala: "Dharamshala",
  Kangra: "Dharamshala",
  Manali: "Manali",
  Naggar: "Manali",
  Kasol: "Parvati Valley",
  "Parvati Valley": "Parvati Valley",
  Malana: "Parvati Valley",
  Kullu: "Kullu",
  Banjar: "Banjar",
  "Jalori Pass": "Banjar",
  Jalori: "Banjar",
  Chamba: "Chamba",
  Bharmour: "Chamba",
  Kinnaur: "Kinnaur",
  Kalpa: "Kinnaur",
  Janglik: "Kinnaur",
  Sirmaur: "Sirmaur",
  Spiti: "Spiti",
  "Pin Valley": "Spiti",
};

/** When these are selected, match by region belt (full hub set). */
const DESTINATION_EXPAND_TO_REGION = new Set([
  "Dharamshala",
  "Manali",
  "Kasol",
  "Parvati Valley",
  "Banjar",
  "Chamba",
  "Kinnaur",
  "Spiti",
]);

function matchesDestination(trek: TrekListingItem, selected: string[]): boolean {
  if (!selected.length) return true;
  return selected.some((dest) => {
    if (DESTINATION_EXPAND_TO_REGION.has(dest)) {
      const region = DESTINATION_REGION_ALIASES[dest] ?? dest;
      return trek.region === region || trek.destinationName === dest;
    }
    return trek.destinationName === dest || trek.region === (DESTINATION_REGION_ALIASES[dest] ?? dest);
  });
}

export function filterTreks(
  treks: TrekListingItem[],
  filters: TrekFiltersState,
): TrekListingItem[] {
  const query = filters.q.trim().toLowerCase();

  const filtered = treks.filter((trek) => {
    if (query) {
      const haystack = `${trek.title} ${trek.destinationName} ${trek.region} ${trek.state}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (!matchesDestination(trek, filters.destination)) {
      return false;
    }
    if (filters.difficulty.length && !filters.difficulty.includes(trek.difficulty)) {
      return false;
    }
    if (!matchesDuration(trek.durationDays, filters.duration)) return false;
    if (
      filters.season.length &&
      !filters.season.some((season) => trek.bestSeasons.includes(season))
    ) {
      return false;
    }
    if (filters.month.length && !filters.month.some((month) => trek.months.includes(month))) {
      return false;
    }
    if (trek.maxAltitude < filters.altitudeMin || trek.maxAltitude > filters.altitudeMax) {
      return false;
    }
    if (trek.basePriceInr < filters.priceMin || trek.basePriceInr > filters.priceMax) {
      return false;
    }
    if (
      filters.trekType.length &&
      !filters.trekType.some((type) => trek.trekTypes.includes(type))
    ) {
      return false;
    }
    if (filters.state.length && !filters.state.includes(trek.state)) return false;
    if (filters.region.length && !filters.region.includes(trek.region)) return false;
    if (
      filters.suitableFor.length &&
      !filters.suitableFor.some((item) => trek.suitableFor.includes(item))
    ) {
      return false;
    }
    return true;
  });

  return sortTreks(filtered, filters.sort);
}

export function sortTreks(
  treks: TrekListingItem[],
  sort: TrekSortOption,
): TrekListingItem[] {
  const items = [...treks];
  switch (sort) {
    case "newest":
      return items.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "rating":
      return items.sort((a, b) => b.rating - a.rating);
    case "price-asc":
      return items.sort((a, b) => a.basePriceInr - b.basePriceInr);
    case "price-desc":
      return items.sort((a, b) => b.basePriceInr - a.basePriceInr);
    case "duration":
      return items.sort((a, b) => a.durationDays - b.durationDays);
    case "popularity":
    default:
      return items.sort((a, b) => b.popularity - a.popularity);
  }
}

export function countActiveFilters(filters: TrekFiltersState): number {
  let count = 0;
  if (filters.q.trim()) count += 1;
  count += filters.destination.length;
  count += filters.difficulty.length;
  count += filters.duration.length;
  count += filters.season.length;
  count += filters.month.length;
  count += filters.trekType.length;
  count += filters.state.length;
  count += filters.region.length;
  count += filters.suitableFor.length;
  if (filters.altitudeMin !== TREK_ALTITUDE_BOUNDS.min) count += 1;
  if (filters.altitudeMax !== TREK_ALTITUDE_BOUNDS.max) count += 1;
  if (filters.priceMin !== TREK_PRICE_BOUNDS.min) count += 1;
  if (filters.priceMax !== TREK_PRICE_BOUNDS.max) count += 1;
  return count;
}

export function getDiscountPercent(price: number, original?: number): number | null {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
}

export { allTreks };
