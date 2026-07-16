import { z } from "zod";

const difficultyEnum = z.enum(["easy", "moderate", "difficult", "challenging"]);
const seasonEnum = z.enum(["spring", "summer", "monsoon", "autumn", "winter"]);
const badgeEnum = z.enum(["trending", "bestseller", "limited", "new"]);
const trekTypeEnum = z.enum([
  "weekend",
  "snow",
  "camping",
  "high-altitude",
  "photography",
  "family",
  "backpacking",
]);
const suitableForEnum = z.enum(["family", "solo", "couples", "beginners", "experienced"]);
const statusEnum = z.enum(["draft", "published", "archived"]);

const gallerySchema = z.object({
  src: z.string().min(1),
  alt: z.string().default(""),
  span: z.enum(["tall", "wide", "square"]).optional(),
});

const quickInfoSchema = z.object({
  destination: z.string().default(""),
  duration: z.string().default(""),
  maxAltitude: z.string().default(""),
  difficulty: difficultyEnum.default("moderate"),
  distance: z.string().default(""),
  startingPoint: z.string().default(""),
  endingPoint: z.string().default(""),
  bestTime: z.string().default(""),
  temperature: z.string().default(""),
  groupSize: z.string().default(""),
  ageLimit: z.string().default(""),
  fitnessLevel: z.string().default(""),
  accommodation: z.string().default(""),
  meals: z.string().default(""),
  transport: z.string().default(""),
});

const itineraryDaySchema = z.object({
  day: z.number().int().min(1),
  title: z.string().min(1),
  distanceKm: z.number().optional(),
  altitudeFt: z.number().optional(),
  walkingHours: z.string().optional(),
  meals: z.array(z.string()).default([]),
  accommodation: z.string().default(""),
  description: z.string().default(""),
  images: z.array(z.string()).default([]),
});

const packingGroupSchema = z.object({
  category: z.enum(["Clothing", "Footwear", "Documents", "Medical", "Accessories", "Electronics"]),
  items: z.array(z.string()).default([]),
});

const fitnessSchema = z.object({
  level: z.string().default(""),
  score: z.number().default(0),
  description: z.string().default(""),
  tips: z.array(z.string()).default([]),
});

const mapSchema = z.object({
  overview: z.string().default(""),
  camps: z.array(z.string()).default([]),
  elevationNote: z.string().default(""),
});

const weatherMonthSchema = z.object({
  month: z.string().min(1),
  tempMinC: z.number(),
  tempMaxC: z.number(),
  snowfall: z.enum(["None", "Possible", "Likely", "Heavy"]).default("None"),
  rainfall: z.enum(["Low", "Moderate", "High"]).default("Low"),
  recommended: z.boolean().default(false),
  note: z.string().optional(),
});

const departureSchema = z.object({
  date: z.coerce.date(),
  totalSeats: z.number().int().min(0).default(0),
  seatsLeft: z.number().int().min(0).default(0),
  priceInr: z.number().min(0),
  status: z.enum(["open", "filling", "almost-full", "sold-out"]).default("open"),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().optional(),
});

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().optional(),
  ogImage: z.string().optional(),
});

export const createTrekSchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  title: z.string().trim().min(2).max(200),
  summary: z.string().default(""),
  overview: z.string().default(""),
  location: z.string().default(""),
  state: z.string().default(""),
  region: z.string().default(""),
  destinationName: z.string().default(""),
  difficulty: difficultyEnum.default("moderate"),
  durationDays: z.number().int().min(1),
  durationNights: z.number().int().min(0),
  maxAltitude: z.number().default(0),
  distanceKm: z.number().default(0),
  basePriceInr: z.number().min(0),
  originalPriceInr: z.number().min(0).optional(),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().min(0).default(0),
  seatsLeft: z.number().min(0).default(0),
  badges: z.array(badgeEnum).default([]),
  trekTypes: z.array(trekTypeEnum).default([]),
  suitableFor: z.array(suitableForEnum).default([]),
  months: z.array(z.string()).default([]),
  bestSeasons: z.array(seasonEnum).default([]),
  heroImages: z.array(z.string()).default([]),
  gallery: z.array(gallerySchema).default([]),
  quickInfo: quickInfoSchema.optional(),
  highlights: z.array(z.string()).default([]),
  itinerary: z.array(itineraryDaySchema).default([]),
  inclusions: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
  packingList: z.array(packingGroupSchema).default([]),
  fitness: fitnessSchema.optional(),
  map: mapSchema.optional(),
  weather: z.array(weatherMonthSchema).default([]),
  departures: z.array(departureSchema).default([]),
  faqs: z.array(faqSchema).default([]),
  relatedSlugs: z.array(z.string()).default([]),
  seo: seoSchema.optional(),
  status: statusEnum.default("draft"),
});

export const updateTrekSchema = createTrekSchema.partial();

export const listTreksQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  q: z.string().optional(),
  destination: z.string().optional(),
  region: z.string().optional(),
  state: z.string().optional(),
  difficulty: difficultyEnum.optional(),
  status: statusEnum.optional(),
  trekType: trekTypeEnum.optional(),
  season: seasonEnum.optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z.string().optional(),
});
