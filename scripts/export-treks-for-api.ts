import fs from "node:fs";
import path from "node:path";
import { allTreks } from "../src/data/treks";
import { trekDetails } from "../src/data/trek-details";

const outDir = path.join(process.cwd(), "backend/seed-data");
fs.mkdirSync(outDir, { recursive: true });

const detailsBySlug = new Map(trekDetails.map((t) => [t.slug, t]));

const payload = allTreks.map((listing) => {
  const detail = detailsBySlug.get(listing.slug);
  return {
    slug: listing.slug,
    title: listing.title,
    summary: listing.summary,
    overview: detail?.overview ?? listing.summary,
    location: detail?.location ?? `${listing.destinationName}, ${listing.state}`,
    state: listing.state,
    region: listing.region,
    destinationName: listing.destinationName,
    difficulty: listing.difficulty,
    durationDays: listing.durationDays,
    durationNights: listing.durationNights,
    maxAltitude: listing.maxAltitude,
    distanceKm: detail?.distanceKm ?? 0,
    basePriceInr: listing.basePriceInr,
    originalPriceInr: listing.originalPriceInr,
    rating: listing.rating,
    reviewCount: listing.reviewCount,
    seatsLeft: listing.seatsLeft,
    badges: listing.badges,
    trekTypes: listing.trekTypes,
    suitableFor: listing.suitableFor,
    months: listing.months,
    bestSeasons: listing.bestSeasons,
    heroImages: detail?.heroImages ?? listing.images,
    gallery: detail?.gallery ?? listing.images.map((src) => ({ src, alt: listing.title })),
    quickInfo: detail?.quickInfo,
    highlights: detail?.highlights ?? [],
    itinerary: detail?.itinerary ?? [],
    inclusions: detail?.inclusions ?? [],
    exclusions: detail?.exclusions ?? [],
    packingList: detail?.packingList ?? [],
    fitness: detail?.fitness,
    map: detail?.map,
    weather: detail?.weather ?? [],
    departures: detail?.departures ?? listing.departures.map((date, i) => ({
      id: `${listing.slug}-d${i + 1}`,
      date,
      seats: listing.seatsLeft,
      priceInr: listing.basePriceInr,
      status: "open",
    })),
    faqs: detail?.faqs ?? [],
    reviews: detail?.reviews ?? [],
    relatedSlugs: detail?.relatedSlugs ?? [],
    seo: detail?.cms
      ? {
          title: detail.cms.seoTitle,
          description: detail.cms.metaDescription,
          canonical: detail.cms.canonicalUrl,
          ogImage: detail.heroImages?.[0],
        }
      : {
          title: `${listing.title} | India Holiday Destinations`,
          description: listing.summary,
        },
    status: "published",
    publishedAt: new Date().toISOString(),
    popularity: listing.popularity,
  };
});

fs.writeFileSync(path.join(outDir, "treks.json"), JSON.stringify(payload, null, 2));
console.log(`Exported ${payload.length} treks → backend/seed-data/treks.json`);
