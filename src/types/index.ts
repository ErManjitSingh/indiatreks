export type DifficultyLevel = "easy" | "moderate" | "difficult" | "challenging";

export type Season = "spring" | "summer" | "monsoon" | "autumn" | "winter";

export type TrekCategory =
  | "weekend"
  | "winter"
  | "high-altitude"
  | "camping"
  | "family"
  | "solo"
  | "expedition";

export type TrekStatus = "draft" | "published" | "archived" | "sold-out";

export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude?: number;
  distanceKm?: number;
  meals?: string[];
  stay?: string;
}

export interface TrekPackage {
  id: string;
  name: string;
  durationDays: number;
  priceInr: number;
  includes: string[];
  excludes: string[];
}

export interface Trek {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  description: string;
  destinationId: string;
  destinationName: string;
  region: string;
  category: TrekCategory[];
  difficulty: DifficultyLevel;
  bestSeasons: Season[];
  durationDays: number;
  durationNights: number;
  maxAltitude: number;
  distanceKm: number;
  groupSizeMin: number;
  groupSizeMax: number;
  basePriceInr: number;
  originalPriceInr?: number;
  rating: number;
  reviewCount: number;
  coverImage: MediaAsset;
  gallery: MediaAsset[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  packages: TrekPackage[];
  pickupPoint: string;
  dropPoint: string;
  coordinates?: GeoPoint;
  tags: string[];
  featured: boolean;
  status: TrekStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  state: string;
  summary: string;
  description: string;
  coverImage: MediaAsset;
  gallery: MediaAsset[];
  trekCount: number;
  bestSeason: Season[];
  altitudeRange: {
    min: number;
    max: number;
  };
  highlights: string[];
  featured: boolean;
}

export interface BlogAuthor {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: MediaAsset;
  author: BlogAuthor;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
}

export interface Review {
  id: string;
  trekId: string;
  trekTitle: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  trekDate?: string;
  createdAt: string;
  verified: boolean;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded";

export interface BookingTraveler {
  fullName: string;
  age: number;
  gender: "male" | "female" | "other";
  phone?: string;
  emergencyContact?: string;
}

export interface Booking {
  id: string;
  trekId: string;
  trekSlug: string;
  trekTitle: string;
  packageId: string;
  packageName: string;
  startDate: string;
  travelers: BookingTraveler[];
  totalAmountInr: number;
  status: BookingStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  trekSlug?: string;
  destinationSlug?: string;
  category?: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "booking" | "trek" | "safety" | "payment" | "cancellation";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "guest" | "customer" | "admin";
  createdAt: string;
}

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
  external?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: "instagram" | "facebook" | "youtube" | "twitter" | "linkedin" | "whatsapp";
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  type?: "website" | "article";
  authors?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  alternatesLanguages?: Record<string, string>;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type {
  TrekBadge,
  SuitableFor,
  TrekTypeTag,
  TrekSortOption,
  TrekViewMode,
  TrekListingItem,
  TrekFiltersState,
} from "@/types/trek-listing";
