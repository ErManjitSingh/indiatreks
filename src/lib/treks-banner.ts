import type { TrekFiltersState, TrekTypeTag } from "@/types/trek-listing";
import type { DifficultyLevel, Season } from "@/types";

export type TreksBannerCopy = {
  /** Small lead line above the brush accent, e.g. "Explore Treks in" */
  lead: string;
  /** Brush / highlight title — destination, menu item, or search term */
  accent: string;
  /** Short supporting sentence under the title */
  description: string;
  /** Compact label for sticky mobile header */
  shortLabel: string;
};

const TREK_TYPE_LABELS: Record<TrekTypeTag, string> = {
  weekend: "Weekend Treks",
  snow: "Snow Treks",
  camping: "Camping Treks",
  "high-altitude": "High Altitude Treks",
  photography: "Photography Treks",
  family: "Family Treks",
  backpacking: "Backpacking Treks",
};

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: "Beginner Treks",
  moderate: "Moderate Treks",
  difficult: "Difficult Treks",
  challenging: "Challenging Treks",
};

const SEASON_LABELS: Record<Season, string> = {
  spring: "Spring Treks",
  summer: "Summer Treks",
  monsoon: "Monsoon Treks",
  autumn: "Autumn Treks",
  winter: "Winter Treks",
};

function titleCase(value: string): string {
  return value
    .trim()
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function hasActiveBrowseFilter(filters: TrekFiltersState): boolean {
  return Boolean(
    filters.q.trim() ||
      filters.destination.length ||
      filters.state.length ||
      filters.region.length ||
      filters.trekType.length ||
      filters.season.length ||
      filters.difficulty.length ||
      filters.month.length ||
      filters.suitableFor.length,
  );
}

/**
 * Derive treks-page banner copy from active URL filters
 * (menu / destination / search clicks).
 */
export function getTreksBannerCopy(filters: TrekFiltersState): TreksBannerCopy {
  if (!hasActiveBrowseFilter(filters)) {
    return {
      lead: "Explore India's Best",
      accent: "Himalayan Treks",
      description:
        "Discover handpicked Himalayan adventures — from easy weekend escapes to high-altitude expeditions with expert local guides.",
      shortLabel: "All Himalayan Treks",
    };
  }

  // Priority: destination → state → region → trek type → season → difficulty → month → search
  if (filters.destination[0]) {
    const place = titleCase(filters.destination[0]);
    return {
      lead: "Explore Treks in",
      accent: place,
      description: `Curated trekking adventures around ${place} — filtered from our live trek catalog.`,
      shortLabel: `${place} Treks`,
    };
  }

  if (filters.state[0]) {
    const place = titleCase(filters.state[0]);
    return {
      lead: "Explore Treks in",
      accent: place,
      description: `Handpicked Himalayan routes across ${place}.`,
      shortLabel: `${place} Treks`,
    };
  }

  if (filters.region[0]) {
    const place = titleCase(filters.region[0]);
    return {
      lead: "Explore Treks in",
      accent: place,
      description: `Routes and trails across the ${place} region.`,
      shortLabel: `${place} Treks`,
    };
  }

  if (filters.trekType[0]) {
    const label = TREK_TYPE_LABELS[filters.trekType[0]] ?? titleCase(filters.trekType[0]);
    return {
      lead: "Explore",
      accent: label,
      description: `Browse our ${label.toLowerCase()} — picked for the right season, fitness, and vibe.`,
      shortLabel: label,
    };
  }

  if (filters.season[0]) {
    const label = SEASON_LABELS[filters.season[0]] ?? `${titleCase(filters.season[0])} Treks`;
    return {
      lead: "Explore",
      accent: label,
      description: `Season-ready adventures for ${filters.season[0]} in the Himalayas.`,
      shortLabel: label,
    };
  }

  if (filters.difficulty[0]) {
    const label =
      DIFFICULTY_LABELS[filters.difficulty[0]] ?? `${titleCase(filters.difficulty[0])} Treks`;
    return {
      lead: "Explore",
      accent: label,
      description: `Routes matched to a ${filters.difficulty[0]} difficulty level.`,
      shortLabel: label,
    };
  }

  if (filters.month[0]) {
    const month = titleCase(filters.month[0]);
    return {
      lead: "Best Treks in",
      accent: month,
      description: `Departures and trails that shine in ${month}.`,
      shortLabel: `${month} Treks`,
    };
  }

  if (filters.q.trim()) {
    const query = titleCase(filters.q);
    return {
      lead: "Showing results for",
      accent: query,
      description: `Treks matching “${query}” across destinations, regions, and titles.`,
      shortLabel: query,
    };
  }

  if (filters.suitableFor[0]) {
    const label = `${titleCase(filters.suitableFor[0])} Treks`;
    return {
      lead: "Explore",
      accent: label,
      description: `Adventures suited for ${filters.suitableFor[0]} travelers.`,
      shortLabel: label,
    };
  }

  return {
    lead: "Explore India's Best",
    accent: "Himalayan Treks",
    description:
      "Discover handpicked Himalayan adventures — from easy weekend escapes to high-altitude expeditions with expert local guides.",
    shortLabel: "All Himalayan Treks",
  };
}
