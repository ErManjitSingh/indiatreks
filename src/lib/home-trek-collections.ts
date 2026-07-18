import { BLUR_DATA_URL } from "@/constants/media";
import type { FeaturedTrekCard } from "@/data/homepage";
import type { TrekBadge, TrekListingItem } from "@/types/trek-listing";
import { formatNumber } from "@/utils";

export type HomeTrekTabId =
  | "upcoming"
  | "weekend"
  | "customized"
  | "near-you";

export type HomeTrekTab = {
  id: HomeTrekTabId;
  label: string;
  href: string;
  description: string;
};

export const HOME_TREK_TABS: HomeTrekTab[] = [
  {
    id: "upcoming",
    label: "Upcoming Treks",
    href: "/treks?sort=popularity",
    description: "Open batches with seats left — ready to book.",
  },
  {
    id: "weekend",
    label: "Weekend Treks",
    href: "/treks?trekType=weekend",
    description: "Short 1–3 day escapes you can fit between Mondays.",
  },
  {
    id: "customized",
    label: "Customized Treks",
    href: "/treks?trekType=high-altitude",
    description: "Longer private-ready routes you can tailor for your group.",
  },
  {
    id: "near-you",
    label: "Treks near You",
    href: "/treks",
    description: "Routes close to where you are right now.",
  },
];

const BADGE_META: Record<
  TrekBadge,
  { label: string; tone: NonNullable<FeaturedTrekCard["badgeTone"]> }
> = {
  bestseller: { label: "BESTSELLER", tone: "lime" },
  trending: { label: "TRENDING", tone: "orange" },
  limited: { label: "LIMITED", tone: "orange" },
  new: { label: "NEW", tone: "sky" },
};

export function listingToFeaturedCard(item: TrekListingItem): FeaturedTrekCard {
  const badgeKey = item.badges[0];
  const badge = badgeKey ? BADGE_META[badgeKey] : undefined;
  const nights = item.durationNights;
  const duration =
    nights > 0
      ? `${item.durationDays}D / ${nights}N`
      : `${item.durationDays} Day${item.durationDays === 1 ? "" : "s"}`;

  return {
    id: item.id,
    slug: item.slug,
    name: item.title,
    location: item.destinationName || item.region || item.state || "Himalayas",
    difficulty: item.difficulty,
    duration,
    altitude: item.maxAltitude
      ? `${formatNumber(item.maxAltitude)} ft`
      : "—",
    bestSeason: item.bestSeasons?.length
      ? item.bestSeasons.map((s) => s.slice(0, 1).toUpperCase() + s.slice(1)).join(", ")
      : "Year round",
    rating: item.rating || 4.5,
    reviewCount: item.reviewCount || 0,
    priceInr: item.basePriceInr,
    seatsLeft: item.seatsLeft,
    image: item.images[0] || "/images/og-default.jpg",
    blurDataURL: BLUR_DATA_URL,
    badge: badge?.label,
    badgeTone: badge?.tone,
  };
}

function scoreUpcoming(item: TrekListingItem): number {
  let score = item.popularity || item.reviewCount || 0;
  if (item.badges.includes("limited")) score += 5000;
  if (item.badges.includes("trending")) score += 4000;
  if (item.badges.includes("new")) score += 3000;
  if (item.badges.includes("bestseller")) score += 2000;
  if (item.seatsLeft > 0 && item.seatsLeft <= 8) score += 1500;
  if ((item.departures?.length ?? 0) > 0) score += 2500;
  return score;
}

function isWeekendTrek(item: TrekListingItem): boolean {
  if (item.trekTypes?.includes("weekend")) return true;
  return item.durationDays > 0 && item.durationDays <= 3;
}

function isCustomizedTrek(item: TrekListingItem): boolean {
  if (item.trekTypes?.includes("high-altitude")) return true;
  return item.durationDays >= 5;
}

/** Rough Himalayan state from browser coordinates. */
export function inferStateFromCoords(lat: number, lng: number): string | null {
  // Himachal Pradesh
  if (lat >= 30.2 && lat <= 33.3 && lng >= 75.5 && lng <= 79.2) {
    return "Himachal Pradesh";
  }
  // Uttarakhand
  if (lat >= 28.6 && lat <= 31.5 && lng >= 77.4 && lng <= 81.1) {
    return "Uttarakhand";
  }
  // Broader North India → prefer Himachal (company base)
  if (lat >= 27 && lat <= 35 && lng >= 72 && lng <= 82) {
    return lat >= 30.8 || lng < 77.6 ? "Himachal Pradesh" : "Uttarakhand";
  }
  return null;
}

export function pickHomeTreks(
  items: TrekListingItem[],
  tab: HomeTrekTabId,
  nearState?: string | null,
  limit = 8,
): TrekListingItem[] {
  let filtered: TrekListingItem[];

  switch (tab) {
    case "weekend":
      filtered = items.filter(isWeekendTrek);
      filtered.sort(
        (a, b) =>
          (b.popularity || b.reviewCount || 0) - (a.popularity || a.reviewCount || 0),
      );
      break;
    case "customized":
      filtered = items.filter(isCustomizedTrek);
      filtered.sort(
        (a, b) =>
          b.durationDays - a.durationDays ||
          (b.rating || 0) - (a.rating || 0),
      );
      break;
    case "near-you": {
      const state = nearState || "Himachal Pradesh";
      filtered = items.filter(
        (item) =>
          item.state?.toLowerCase() === state.toLowerCase() ||
          item.region?.toLowerCase().includes(state.toLowerCase().split(" ")[0] ?? ""),
      );
      if (filtered.length < 4) {
        filtered = [...items];
      }
      filtered.sort(
        (a, b) =>
          (b.popularity || b.reviewCount || 0) - (a.popularity || a.reviewCount || 0),
      );
      break;
    }
    case "upcoming":
    default:
      filtered = [...items].filter((item) => item.seatsLeft > 0 || item.badges.length);
      if (filtered.length < 4) filtered = [...items];
      filtered.sort((a, b) => scoreUpcoming(b) - scoreUpcoming(a));
      break;
  }

  // Deduplicate by slug while preserving order
  const seen = new Set<string>();
  const unique: TrekListingItem[] = [];
  for (const item of filtered) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    unique.push(item);
    if (unique.length >= limit) break;
  }
  return unique;
}
