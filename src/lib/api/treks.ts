import { apiGet, apiPost, type ApiSuccess } from "@/lib/api/client";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";

export type TrekListParams = {
  q?: string;
  destination?: string;
  region?: string;
  state?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
  sort?: string;
};

function mapListing(raw: Record<string, unknown>): TrekListingItem {
  return {
    id: String(raw._id ?? raw.id ?? raw.slug),
    slug: String(raw.slug),
    title: String(raw.title),
    summary: String(raw.summary ?? ""),
    destinationName: String(raw.destinationName ?? ""),
    state: String(raw.state ?? ""),
    region: String(raw.region ?? ""),
    difficulty: raw.difficulty as TrekListingItem["difficulty"],
    bestSeasons: (raw.bestSeasons as TrekListingItem["bestSeasons"]) ?? [],
    durationDays: Number(raw.durationDays ?? 1),
    durationNights: Number(raw.durationNights ?? 0),
    maxAltitude: Number(raw.maxAltitude ?? 0),
    groupSizeMin: Number(raw.groupSizeMin ?? 1),
    groupSizeMax: Number(raw.groupSizeMax ?? 20),
    basePriceInr: Number(raw.basePriceInr ?? 0),
    originalPriceInr: raw.originalPriceInr ? Number(raw.originalPriceInr) : undefined,
    rating: Number(raw.rating ?? 0),
    reviewCount: Number(raw.reviewCount ?? 0),
    images: (raw.heroImages as string[]) ?? (raw.images as string[]) ?? [],
    seatsLeft: Number(raw.seatsLeft ?? 0),
    badges: (raw.badges as TrekListingItem["badges"]) ?? [],
    trekTypes: (raw.trekTypes as TrekListingItem["trekTypes"]) ?? [],
    suitableFor: (raw.suitableFor as TrekListingItem["suitableFor"]) ?? [],
    months: (raw.months as string[]) ?? [],
    departures: Array.isArray(raw.departures)
      ? (raw.departures as Array<{ date?: string } | string>).map((d) =>
          typeof d === "string" ? d : String(d.date ?? ""),
        )
      : [],
    createdAt: String(raw.createdAt ?? raw.publishedAt ?? new Date().toISOString()),
    popularity: Number(raw.popularity ?? raw.reviewCount ?? 0),
  };
}

export async function fetchTreks(
  params: TrekListParams = {},
): Promise<{ items: TrekListingItem[]; meta?: ApiSuccess<unknown>["meta"] }> {
  const res = await apiGet<Record<string, unknown>[]>("/treks", params);
  return {
    items: (res.data ?? []).map((row) => mapListing(row)),
    meta: res.meta,
  };
}

export async function fetchTrekBySlug(slug: string): Promise<TrekDetail | null> {
  try {
    const res = await apiGet<Record<string, unknown>>(`/treks/${slug}`);
    if (!res.data) return null;
    const raw = res.data;
    return {
      id: String(raw._id ?? raw.id ?? slug),
      slug: String(raw.slug),
      title: String(raw.title),
      location: String(raw.location ?? ""),
      state: String(raw.state ?? ""),
      region: String(raw.region ?? ""),
      summary: String(raw.summary ?? ""),
      overview: String(raw.overview ?? ""),
      rating: Number(raw.rating ?? 0),
      reviewCount: Number(raw.reviewCount ?? 0),
      difficulty: raw.difficulty as TrekDetail["difficulty"],
      durationDays: Number(raw.durationDays ?? 1),
      durationNights: Number(raw.durationNights ?? 0),
      maxAltitude: Number(raw.maxAltitude ?? 0),
      distanceKm: Number(raw.distanceKm ?? 0),
      bestSeasons: (raw.bestSeasons as TrekDetail["bestSeasons"]) ?? [],
      basePriceInr: Number(raw.basePriceInr ?? 0),
      originalPriceInr: raw.originalPriceInr ? Number(raw.originalPriceInr) : undefined,
      taxNote: String(raw.taxNote ?? "Prices inclusive of applicable GST"),
      seatsLeft: Number(raw.seatsLeft ?? 0),
      heroImages: (raw.heroImages as string[]) ?? [],
      gallery: (raw.gallery as TrekDetail["gallery"]) ?? [],
      quickInfo: (raw.quickInfo as TrekDetail["quickInfo"]) ?? {
        destination: String(raw.destinationName ?? ""),
        duration: `${raw.durationDays ?? 1}D / ${raw.durationNights ?? 0}N`,
        maxAltitude: String(raw.maxAltitude ?? ""),
        difficulty: (raw.difficulty as TrekDetail["difficulty"]) ?? "easy",
        distance: `${raw.distanceKm ?? 0} km`,
        startingPoint: "",
        endingPoint: "",
        bestTime: "",
        temperature: "",
        groupSize: "",
        ageLimit: "",
        fitnessLevel: "",
        accommodation: "",
        meals: "",
        transport: "",
      },
      highlights: (raw.highlights as string[]) ?? [],
      itinerary: (raw.itinerary as TrekDetail["itinerary"]) ?? [],
      inclusions: (raw.inclusions as string[]) ?? [],
      exclusions: (raw.exclusions as string[]) ?? [],
      packingList: (raw.packingList as TrekDetail["packingList"]) ?? [],
      fitness: (raw.fitness as TrekDetail["fitness"]) ?? {
        level: "Moderate",
        score: 50,
        description: "",
        tips: [],
      },
      map: (raw.map as TrekDetail["map"]) ?? {
        overview: "",
        camps: [],
        elevationNote: "",
      },
      weather: (raw.weather as TrekDetail["weather"]) ?? [],
      departures: (raw.departures as TrekDetail["departures"]) ?? [],
      faqs: (raw.faqs as TrekDetail["faqs"]) ?? [],
      reviews: (raw.reviews as TrekDetail["reviews"]) ?? [],
      downloads: (raw.downloads as TrekDetail["downloads"]) ?? [],
      relatedSlugs: (raw.relatedSlugs as string[]) ?? [],
      cms: raw.seo
        ? {
            seoTitle: (raw.seo as { title?: string }).title,
            metaDescription: (raw.seo as { description?: string }).description,
            canonicalUrl: (raw.seo as { canonical?: string }).canonical,
          }
        : undefined,
    };
  } catch {
    return null;
  }
}

export async function submitEnquiry(body: {
  name: string;
  email: string;
  phone: string;
  trekSlug?: string;
  trekTitle?: string;
  preferredDate?: string;
  travelers?: number;
  message?: string;
}) {
  return apiPost("/enquiries", body);
}
