import type { DifficultyLevel, FAQ, Season } from "@/types";

export interface TrekWeatherMonth {
  month: string;
  tempMinC: number;
  tempMaxC: number;
  snowfall: "None" | "Possible" | "Likely" | "Heavy";
  rainfall: "Low" | "Moderate" | "High";
  recommended: boolean;
  note?: string;
}

export interface TrekItineraryDay {
  day: number;
  title: string;
  distanceKm?: number;
  altitudeFt?: number;
  walkingHours?: string;
  meals: string[];
  accommodation: string;
  description: string;
  images: string[];
}

export interface TrekDeparture {
  id: string;
  date: string;
  seats: number;
  priceInr: number;
  status: "open" | "filling" | "almost-full" | "sold-out";
}

export interface TrekReview {
  id: string;
  name: string;
  photo: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  videoUrl?: string;
}

export interface PackingGroup {
  category: "Clothing" | "Footwear" | "Documents" | "Medical" | "Accessories" | "Electronics";
  items: string[];
}

export interface TrekQuickInfo {
  destination: string;
  duration: string;
  maxAltitude: string;
  difficulty: DifficultyLevel;
  distance: string;
  startingPoint: string;
  endingPoint: string;
  bestTime: string;
  temperature: string;
  groupSize: string;
  ageLimit: string;
  fitnessLevel: string;
  accommodation: string;
  meals: string;
  transport: string;
}

/** Optional CMS / SEO extras — editable later without changing UI components. */
export interface TrekCmsExtras {
  seoTitle?: string;
  metaDescription?: string;
  country?: string;
  coordinates?: { lat: number; lng: number; label?: string };
  flora?: string;
  fauna?: string;
  photographySpots?: string[];
  campingLocations?: string[];
  waterSources?: string;
  networkAvailability?: string;
  electricityAvailability?: string;
  atmAvailability?: string;
  medicalFacilities?: string;
  nearestHospital?: string;
  nearestAirport?: string;
  nearestRailwayStation?: string;
  nearestBusStand?: string;
  roadConnectivity?: string;
  permitsRequired?: string;
  forestPermissions?: string;
  safetyGuidelines?: string[];
  emergencyContacts?: Array<{ label: string; value: string }>;
  thingsToCarry?: string[];
  thingsNotToCarry?: string[];
  cancellationPolicy?: string;
  bookingPolicy?: string;
  childPolicy?: string;
  privateDepartureInfo?: string;
  travelTips?: string[];
  responsibleTourism?: string[];
  nearbyAttractions?: string[];
  nearbyTreks?: string[];
  relatedBlogs?: Array<{ title: string; href: string }>;
  videoPlaceholder?: string;
  externalReferences?: Array<{ label: string; href: string }>;
  canonicalUrl?: string;
}

export interface TrekDetail {
  id: string;
  slug: string;
  title: string;
  location: string;
  state: string;
  region: string;
  summary: string;
  overview: string;
  rating: number;
  reviewCount: number;
  difficulty: DifficultyLevel;
  durationDays: number;
  durationNights: number;
  maxAltitude: number;
  distanceKm: number;
  bestSeasons: Season[];
  basePriceInr: number;
  originalPriceInr?: number;
  earlyBirdDiscountPercent?: number;
  groupDiscountNote?: string;
  taxNote: string;
  seatsLeft: number;
  heroImages: string[];
  heroVideo?: string;
  gallery: Array<{ src: string; alt: string; span?: "tall" | "wide" | "square" }>;
  quickInfo: TrekQuickInfo;
  highlights: string[];
  itinerary: TrekItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  packingList: PackingGroup[];
  fitness: {
    level: string;
    score: number;
    description: string;
    tips: string[];
  };
  map: {
    overview: string;
    camps: string[];
    elevationNote: string;
  };
  weather: TrekWeatherMonth[];
  departures: TrekDeparture[];
  faqs: FAQ[];
  reviews: TrekReview[];
  downloads: Array<{ label: string; href: string }>;
  relatedSlugs: string[];
  /** Future CMS / indexing fields — ignored by current UI, kept for content ops. */
  cms?: TrekCmsExtras;
}
