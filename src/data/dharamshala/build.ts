import { img } from "@/lib/media";
import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";
import {
  DHARAMSHALA_COUNTRY,
  DHARAMSHALA_REGION,
  DHARAMSHALA_STATE,
  SITE_ORIGIN,
  buildFaqs,
  defaultResponsibleTourism,
  defaultSafetyGuidelines,
  defaultThingsNotToCarry,
  departuresFor,
  galleryFor,
  heroPool,
  packingDhauladhar,
  regionalLogistics,
  sampleReviews,
  weatherForAltitude,
} from "@/data/dharamshala/shared";
import {
  dharamshalaTrekSeeds,
  type DharamshalaTrekSeed,
} from "@/data/dharamshala/seeds";

function formatAltitude(ft: number): string {
  const m = Math.round(ft / 3.281);
  return `${ft.toLocaleString("en-IN")} ft (${m.toLocaleString("en-IN")} m)`;
}

function durationLabel(days: number, nights: number): string {
  if (nights === 0) return `${days}D (day trek)`;
  return `${days}D / ${nights}N`;
}

function buildOverview(seed: DharamshalaTrekSeed): string {
  const sections = [
    ...seed.overview,
    `Best time to visit: ${seed.bestTime}`,
    `Flora along the ${seed.shortName} corridor: ${seed.flora}`,
    `Wildlife notes for ${seed.title}: ${seed.fauna}`,
    `Photography spots: ${seed.photographySpots.join("; ")}.`,
    `Camping locations: ${seed.campingLocations.join("; ")}.`,
    `Water sources: ${seed.waterSources}`,
    `Network availability: ${seed.network}`,
    `Electricity availability: ${seed.electricity}`,
    `ATM availability: ${seed.atm}`,
    `Medical facilities: ${seed.medical}`,
    `Permits required: ${seed.permits}`,
    `Forest permissions: ${seed.forestPermissions}`,
    `Safety on ${seed.shortName}: ${defaultSafetyGuidelines.slice(0, 3).join(" ")} Always follow your trek leader’s brief for this specific route.`,
    `Travel tips: ${seed.travelTips.join(" ")}`,
    `Responsible tourism on ${seed.title}: ${defaultResponsibleTourism.slice(0, 3).join(" ")}`,
    `Nearby attractions from this trailhead: ${seed.nearbyAttractions.join(", ")}.`,
    `Nearby treks: ${seed.nearbyTreks.join(", ")}.`,
    `Child policy for ${seed.title}: ${seed.ageLimit}. ${regionalLogistics.childPolicy}`,
    `Private departures: ${seed.privateDepartureInfo}`,
    `Group discount: ${seed.groupDiscountNote}`,
    `Booking and cancellation policies for India Holiday Destinations packages apply — see FAQs on this page for the current fee schedule.`,
    `Things to carry beyond the packing list: ${seed.thingsToCarry.join("; ")}.`,
    `Things not to carry: ${defaultThingsNotToCarry.slice(0, 4).join("; ")}.`,
    `Map coordinates placeholder: ${seed.lat.toFixed(4)}°N, ${seed.lng.toFixed(4)}°E (CMS-editable Google Map embed).`,
    `Video and extended gallery placeholders are reserved for Website Management CMS uploads.`,
    `Fixed departure calendar and live pricing shown in the booking panel remain editable from CMS.`,
  ];
  return sections.join("\n\n");
}

function heroImagesFor(index: number): string[] {
  return [
    heroPool[index % heroPool.length]!,
    heroPool[(index + 3) % heroPool.length]!,
    heroPool[(index + 5) % heroPool.length]!,
  ];
}

export function buildDharamshalaTrekDetail(
  seed: DharamshalaTrekSeed,
  index: number,
): TrekDetail {
  const idPrefix = seed.slug.replace(/-trek$|-trail$|-expedition$|-base-camp$/, "") || seed.slug;
  const maxAltitudeLabel = formatAltitude(seed.maxAltitudeFt);
  const duration = durationLabel(seed.durationDays, seed.durationNights);
  const earlyBird =
    seed.originalPriceInr > seed.basePriceInr
      ? Math.round(
          ((seed.originalPriceInr - seed.basePriceInr) / seed.originalPriceInr) * 100,
        )
      : undefined;

  const itinerary = seed.itinerary.map((day, dayIndex) => ({
    ...day,
    images: [
      img(
        [
          "photo-1551632811-561732d1e306",
          "photo-1500530855697-b586d89ba3ee",
          "photo-1464822759023-fed622ff2c3b",
          "photo-1519681393784-d120267933ba",
          "photo-1504280390367-361c6d9f38f4",
          "photo-1441974231531-c6227db76b6e",
        ][(index + dayIndex) % 6]!,
        1000,
      ),
      img(
        [
          "photo-1478131143081-80f7f84ca84a",
          "photo-1511497584788-876760111969",
          "photo-1472214103451-9374bd1c798e",
          "photo-1626621341517-bbf3d9990a23",
          "photo-1469474968028-56623f02e42e",
          "photo-1506905925346-21bda4d32df4",
        ][(index + dayIndex) % 6]!,
        1000,
      ),
    ],
  }));

  return {
    id: `detail-${seed.slug}`,
    slug: seed.slug,
    title: seed.title,
    location: `${seed.destinationName}, Himachal Pradesh`,
    state: DHARAMSHALA_STATE,
    region: DHARAMSHALA_REGION,
    summary: seed.summary,
    overview: buildOverview(seed),
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    difficulty: seed.difficulty,
    durationDays: seed.durationDays,
    durationNights: seed.durationNights,
    maxAltitude: seed.maxAltitudeFt,
    distanceKm: seed.distanceKm,
    bestSeasons: seed.bestSeasons,
    basePriceInr: seed.basePriceInr,
    originalPriceInr: seed.originalPriceInr,
    earlyBirdDiscountPercent: earlyBird,
    groupDiscountNote: seed.groupDiscountNote,
    taxNote: "Prices inclusive of applicable GST",
    seatsLeft: seed.seatsLeft,
    heroImages: heroImagesFor(index),
    heroVideo: "https://cdn.coverr.co/videos/coverr-hiking-in-the-mountains-1584/1080p.mp4",
    gallery: galleryFor(seed.title, index),
    quickInfo: {
      destination: `${seed.destinationName} / Dharamshala region`,
      duration,
      maxAltitude: maxAltitudeLabel,
      difficulty: seed.difficulty,
      distance: `${seed.distanceKm} km`,
      startingPoint: seed.startingPoint,
      endingPoint: seed.endingPoint,
      bestTime: seed.bestTime,
      temperature: seed.temperature,
      groupSize: seed.groupSize,
      ageLimit: seed.ageLimit,
      fitnessLevel: seed.fitnessLevel,
      accommodation: seed.accommodation,
      meals: seed.meals,
      transport: seed.transport,
    },
    highlights: seed.highlights,
    itinerary,
    inclusions: seed.inclusions,
    exclusions: seed.exclusions,
    packingList: packingDhauladhar,
    fitness: {
      level: seed.fitnessLevel,
      score: seed.fitnessScore,
      description: seed.fitnessDescription,
      tips: seed.fitnessTips,
    },
    map: {
      overview: seed.mapOverview,
      camps: seed.camps,
      elevationNote: seed.elevationNote,
    },
    weather: weatherForAltitude(seed.maxAltitudeFt),
    departures: departuresFor(idPrefix, seed.basePriceInr, seed.departureDates),
    faqs: buildFaqs({
      idPrefix,
      title: seed.title,
      difficulty: seed.difficulty,
      duration,
      distanceKm: seed.distanceKm,
      maxAltitudeLabel,
      startingPoint: seed.startingPoint,
      bestTime: seed.bestTime,
      network: seed.network,
      permits: seed.permits,
      water: seed.waterSources,
      camping: seed.campingLocations.join(" "),
      fitness: seed.fitnessDescription,
      nearestTown: seed.destinationName,
      uniqueExtra: seed.uniqueFaqs,
    }),
    reviews: sampleReviews(idPrefix, seed.title, seed.reviewComments),
    downloads: [
      { label: "PDF Itinerary", href: `/downloads/${seed.slug}-itinerary.pdf` },
      { label: "Packing Checklist", href: "/downloads/packing-checklist.pdf" },
      { label: "Medical Form", href: "/downloads/medical-form.pdf" },
      { label: "Terms", href: "/terms" },
    ],
    relatedSlugs: seed.relatedSlugs,
    cms: {
      seoTitle: `${seed.title} | Dharamshala Dhauladhar Trek | India Holiday Destinations`,
      metaDescription: seed.summary,
      country: DHARAMSHALA_COUNTRY,
      coordinates: {
        lat: seed.lat,
        lng: seed.lng,
        label: `${seed.title} trailhead / highlight (placeholder)`,
      },
      flora: seed.flora,
      fauna: seed.fauna,
      photographySpots: seed.photographySpots,
      campingLocations: seed.campingLocations,
      waterSources: seed.waterSources,
      networkAvailability: seed.network,
      electricityAvailability: seed.electricity,
      atmAvailability: seed.atm,
      medicalFacilities: seed.medical,
      nearestHospital: regionalLogistics.nearestHospital,
      nearestAirport: regionalLogistics.nearestAirport,
      nearestRailwayStation: regionalLogistics.nearestRailwayStation,
      nearestBusStand: regionalLogistics.nearestBusStand,
      roadConnectivity: regionalLogistics.roadConnectivity,
      permitsRequired: seed.permits,
      forestPermissions: seed.forestPermissions,
      safetyGuidelines: defaultSafetyGuidelines,
      emergencyContacts: regionalLogistics.emergencyContacts,
      thingsToCarry: seed.thingsToCarry,
      thingsNotToCarry: defaultThingsNotToCarry,
      cancellationPolicy: regionalLogistics.cancellationPolicy,
      bookingPolicy: regionalLogistics.bookingPolicy,
      childPolicy: regionalLogistics.childPolicy,
      privateDepartureInfo: seed.privateDepartureInfo,
      travelTips: seed.travelTips,
      responsibleTourism: defaultResponsibleTourism,
      nearbyAttractions: seed.nearbyAttractions,
      nearbyTreks: seed.nearbyTreks,
      relatedBlogs: [
        {
          title: `Complete guide to ${seed.title}`,
          href: `/blogs/${seed.slug}-guide`,
        },
        {
          title: "Best treks in Dharamshala and the Dhauladhar Range",
          href: "/blogs/best-dharamshala-treks",
        },
        {
          title: "How to prepare for Himachal weekend treks",
          href: "/blogs/himachal-weekend-trek-preparation",
        },
      ],
      videoPlaceholder: "CMS_VIDEO_URL_PLACEHOLDER",
      externalReferences: [
        { label: "Himachal Tourism (placeholder)", href: "https://himachaltourism.gov.in/" },
        { label: "India Holiday Destinations", href: "https://indiaholidaydestinations.com/" },
      ],
      canonicalUrl: `${SITE_ORIGIN}/treks/${seed.slug}`,
    },
  };
}

function listingDestination(seed: DharamshalaTrekSeed): string {
  const raw = seed.destinationName.toLowerCase();
  if (raw.includes("bir")) return "Bir Billing";
  if (raw.includes("barot")) return "Barot";
  if (raw.includes("naddi")) return "Naddi";
  if (raw.includes("mcleod") || raw.includes("dharamkot") || raw.includes("bhagsu"))
    return "McLeod Ganj";
  if (raw.includes("bharmour") || raw.includes("chamba") || raw.includes("kugti"))
    return "Bharmour";
  if (raw.includes("kangra") || raw.includes("chamunda") || raw.includes("gaggal"))
    return "Kangra";
  if (raw.includes("manali") || raw.includes("solang")) return "Manali";
  return "Dharamshala";
}

export function buildDharamshalaListing(
  seed: DharamshalaTrekSeed,
  index: number,
): TrekListingItem {
  return {
    id: `trek-${seed.slug}`,
    slug: seed.slug,
    title: seed.title,
    summary: seed.summary,
    destinationName: listingDestination(seed),
    state: DHARAMSHALA_STATE,
    region: DHARAMSHALA_REGION,
    difficulty: seed.difficulty,
    bestSeasons: seed.bestSeasons,
    durationDays: seed.durationDays,
    durationNights: seed.durationNights,
    maxAltitude: seed.maxAltitudeFt,
    groupSizeMin: seed.difficulty === "difficult" ? 4 : 1,
    groupSizeMax: seed.difficulty === "difficult" ? 8 : 20,
    basePriceInr: seed.basePriceInr,
    originalPriceInr: seed.originalPriceInr,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    images: heroImagesFor(index),
    seatsLeft: seed.seatsLeft,
    badges: seed.badges,
    trekTypes: seed.trekTypes,
    suitableFor: seed.suitableFor,
    months: seed.months,
    departures: seed.departureDates,
    createdAt: "2026-07-16",
    popularity: seed.popularity,
  };
}

export const dharamshalaTrekDetails: TrekDetail[] = dharamshalaTrekSeeds.map(
  (seed, index) => buildDharamshalaTrekDetail(seed, index),
);

export const dharamshalaTrekListings: TrekListingItem[] = dharamshalaTrekSeeds.map(
  (seed, index) => buildDharamshalaListing(seed, index),
);

export const dharamshalaTrekSlugs = dharamshalaTrekSeeds.map((seed) => seed.slug);
