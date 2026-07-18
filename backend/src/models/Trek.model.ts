import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";
import { EnterpriseSeoSchema, type IEnterpriseSeo } from "./schemas/enterpriseSeo.schema";

export type Difficulty = "easy" | "moderate" | "difficult" | "challenging";
export type Season = "spring" | "summer" | "monsoon" | "autumn" | "winter";
export type TrekBadge = "trending" | "bestseller" | "limited" | "new";
export type TrekTypeTag =
  | "weekend"
  | "snow"
  | "camping"
  | "high-altitude"
  | "photography"
  | "family"
  | "backpacking";
export type SuitableFor = "family" | "solo" | "couples" | "beginners" | "experienced";
export type TrekStatus = "draft" | "published" | "archived";

export interface IGalleryImage {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "square";
}

export interface IQuickInfo {
  destination: string;
  duration: string;
  maxAltitude: string;
  difficulty: Difficulty;
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

export interface IItineraryDay {
  day: number;
  title: string;
  startLocation?: string;
  endLocation?: string;
  distanceKm?: number;
  altitudeFt?: number;
  elevationGainLoss?: string;
  walkingHours?: string;
  difficulty?: string;
  trailType?: string;
  meals: string[];
  accommodation: string;
  description: string;
  highlights?: string[];
  tips?: string[];
  images: string[];
}

export interface IPackingGroup {
  category: "Clothing" | "Footwear" | "Documents" | "Medical" | "Accessories" | "Electronics";
  items: string[];
}

export interface IFitness {
  level: string;
  score: number;
  description: string;
  tips: string[];
}

export interface ITrekMap {
  overview: string;
  camps: string[];
  elevationNote: string;
}

export interface IWeatherMonth {
  month: string;
  tempMinC: number;
  tempMaxC: number;
  snowfall: "None" | "Possible" | "Likely" | "Heavy";
  rainfall: "Low" | "Moderate" | "High";
  recommended: boolean;
  note?: string;
}

export interface IDeparture {
  date: Date;
  totalSeats: number;
  seatsLeft: number;
  priceInr: number;
  status: "open" | "filling" | "almost-full" | "sold-out";
}

export interface IFaq {
  question: string;
  answer: string;
  category?: string;
}

export interface IEmbeddedReview {
  name: string;
  photo?: string;
  rating: number;
  date: Date;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

/** @deprecated Use IEnterpriseSeo — alias kept for existing imports */
export type ISeo = IEnterpriseSeo;
export type { IEnterpriseSeo };

export interface ITrek extends Document {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  summary: string;
  overview: string;
  location: string;
  state: string;
  region: string;
  destinationName: string;
  difficulty: Difficulty;
  durationDays: number;
  durationNights: number;
  maxAltitude: number;
  distanceKm: number;
  basePriceInr: number;
  originalPriceInr?: number;
  rating: number;
  reviewCount: number;
  seatsLeft: number;
  badges: TrekBadge[];
  trekTypes: TrekTypeTag[];
  suitableFor: SuitableFor[];
  months: string[];
  bestSeasons: Season[];
  heroImages: string[];
  gallery: IGalleryImage[];
  quickInfo: IQuickInfo;
  highlights: string[];
  itinerary: IItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  packingList: IPackingGroup[];
  fitness: IFitness;
  map: ITrekMap;
  weather: IWeatherMonth[];
  departures: IDeparture[];
  faqs: IFaq[];
  reviews: IEmbeddedReview[];
  relatedSlugs: string[];
  seo: ISeo;
  status: TrekStatus;
  publishedAt?: Date | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGalleryImage>(
  {
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    span: { type: String, enum: ["tall", "wide", "square"] },
  },
  { _id: false },
);

const QuickInfoSchema = new Schema<IQuickInfo>(
  {
    destination: { type: String, default: "" },
    duration: { type: String, default: "" },
    maxAltitude: { type: String, default: "" },
    difficulty: { type: String, enum: ["easy", "moderate", "difficult", "challenging"], default: "moderate" },
    distance: { type: String, default: "" },
    startingPoint: { type: String, default: "" },
    endingPoint: { type: String, default: "" },
    bestTime: { type: String, default: "" },
    temperature: { type: String, default: "" },
    groupSize: { type: String, default: "" },
    ageLimit: { type: String, default: "" },
    fitnessLevel: { type: String, default: "" },
    accommodation: { type: String, default: "" },
    meals: { type: String, default: "" },
    transport: { type: String, default: "" },
  },
  { _id: false },
);

const ItineraryDaySchema = new Schema<IItineraryDay>(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    startLocation: { type: String },
    endLocation: { type: String },
    distanceKm: { type: Number },
    altitudeFt: { type: Number },
    elevationGainLoss: { type: String },
    walkingHours: { type: String },
    difficulty: { type: String },
    trailType: { type: String },
    meals: { type: [String], default: [] },
    accommodation: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: [String], default: undefined },
    tips: { type: [String], default: undefined },
    images: { type: [String], default: [] },
  },
  { _id: false },
);

const PackingGroupSchema = new Schema<IPackingGroup>(
  {
    category: {
      type: String,
      enum: ["Clothing", "Footwear", "Documents", "Medical", "Accessories", "Electronics"],
      required: true,
    },
    items: { type: [String], default: [] },
  },
  { _id: false },
);

const FitnessSchema = new Schema<IFitness>(
  {
    level: { type: String, default: "" },
    score: { type: Number, default: 0 },
    description: { type: String, default: "" },
    tips: { type: [String], default: [] },
  },
  { _id: false },
);

const MapSchema = new Schema<ITrekMap>(
  {
    overview: { type: String, default: "" },
    camps: { type: [String], default: [] },
    elevationNote: { type: String, default: "" },
  },
  { _id: false },
);

const WeatherMonthSchema = new Schema<IWeatherMonth>(
  {
    month: { type: String, required: true },
    tempMinC: { type: Number, required: true },
    tempMaxC: { type: Number, required: true },
    snowfall: { type: String, enum: ["None", "Possible", "Likely", "Heavy"], default: "None" },
    rainfall: { type: String, enum: ["Low", "Moderate", "High"], default: "Low" },
    recommended: { type: Boolean, default: false },
    note: { type: String },
  },
  { _id: false },
);

const DepartureSchema = new Schema<IDeparture>({
  date: { type: Date, required: true },
  totalSeats: { type: Number, required: true, default: 0 },
  seatsLeft: { type: Number, required: true, default: 0 },
  priceInr: { type: Number, required: true },
  status: {
    type: String,
    enum: ["open", "filling", "almost-full", "sold-out"],
    default: "open",
  },
});

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String },
  },
  { _id: false },
);

const EmbeddedReviewSchema = new Schema<IEmbeddedReview>({
  name: { type: String, required: true },
  photo: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now },
  comment: { type: String, default: "" },
  verified: { type: Boolean, default: false },
  helpfulCount: { type: Number, default: 0 },
});

const SeoSchema = EnterpriseSeoSchema;

const TrekSchema = new Schema<ITrek>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, default: "" },
    overview: { type: String, default: "" },
    location: { type: String, default: "" },
    state: { type: String, default: "", index: true },
    region: { type: String, default: "", index: true },
    destinationName: { type: String, default: "", index: true },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "difficult", "challenging"],
      default: "moderate",
      index: true,
    },
    durationDays: { type: Number, required: true, default: 1 },
    durationNights: { type: Number, required: true, default: 0 },
    maxAltitude: { type: Number, default: 0 },
    distanceKm: { type: Number, default: 0 },
    basePriceInr: { type: Number, required: true, default: 0 },
    originalPriceInr: { type: Number },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    seatsLeft: { type: Number, default: 0 },
    badges: { type: [String], enum: ["trending", "bestseller", "limited", "new"], default: [] },
    trekTypes: {
      type: [String],
      enum: ["weekend", "snow", "camping", "high-altitude", "photography", "family", "backpacking"],
      default: [],
    },
    suitableFor: {
      type: [String],
      enum: ["family", "solo", "couples", "beginners", "experienced"],
      default: [],
    },
    months: { type: [String], default: [] },
    bestSeasons: {
      type: [String],
      enum: ["spring", "summer", "monsoon", "autumn", "winter"],
      default: [],
    },
    heroImages: { type: [String], default: [] },
    gallery: { type: [GallerySchema], default: [] },
    quickInfo: { type: QuickInfoSchema, default: () => ({}) },
    highlights: { type: [String], default: [] },
    itinerary: { type: [ItineraryDaySchema], default: [] },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    packingList: { type: [PackingGroupSchema], default: [] },
    fitness: { type: FitnessSchema, default: () => ({}) },
    map: { type: MapSchema, default: () => ({}) },
    weather: { type: [WeatherMonthSchema], default: [] },
    departures: { type: [DepartureSchema], default: [] },
    faqs: { type: [FaqSchema], default: [] },
    reviews: { type: [EmbeddedReviewSchema], default: [] },
    relatedSlugs: { type: [String], default: [] },
    seo: { type: SeoSchema, default: () => ({}) },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

TrekSchema.index({ slug: 1 }, { unique: true });
TrekSchema.index({ region: 1, status: 1 });
TrekSchema.index({ destinationName: 1, status: 1 });
TrekSchema.index({ difficulty: 1, status: 1 });
TrekSchema.index({ status: 1, deletedAt: 1 });
TrekSchema.index({ status: 1, deletedAt: 1, createdAt: -1 });
TrekSchema.index({ status: 1, basePriceInr: 1 });
TrekSchema.index({ status: 1, rating: -1 });
TrekSchema.index({ trekTypes: 1, status: 1 });
TrekSchema.index({ bestSeasons: 1, status: 1 });
TrekSchema.index({ title: "text", summary: "text", overview: "text", location: "text" });

softDeletePlugin(TrekSchema);

export const TrekModel = model<ITrek>("Trek", TrekSchema);
