import { BLUR_DATA_URL } from "@/constants/media";
import { img } from "@/lib/media";
import type { DifficultyLevel, FAQ } from "@/types";

export interface FeaturedTrekCard {
  id: string;
  slug: string;
  name: string;
  location: string;
  difficulty: DifficultyLevel;
  duration: string;
  altitude: string;
  bestSeason: string;
  rating: number;
  reviewCount: number;
  priceInr: number;
  seatsLeft: number;
  image: string;
  blurDataURL?: string;
  badge?: string;
  badgeTone?: "lime" | "orange" | "blue" | "sky";
}

export interface DestinationCard {
  id: string;
  slug: string;
  name: string;
  region: string;
  trekCount: number;
  image: string;
  blurDataURL?: string;
}

export interface DestinationShowcase {
  id: string;
  slug: string;
  name: string;
  description: string;
  badge: string;
  trekCountLabel: string;
  destinationCountLabel: string;
  bestTime: string;
  image: string;
  icon: "mountain" | "temple" | "lake" | "desert" | "pine";
  blurDataURL?: string;
}

export interface CategoryCard {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: "shield" | "heart" | "users" | "tent" | "leaf" | "backpack" | "group" | "headset";
}

export interface FixedDeparture {
  id: string;
  trekName: string;
  trekSlug: string;
  departureDate: string;
  seatsAvailable: number;
  priceInr: number;
  location: string;
}

export interface AdventureStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  span?: "tall" | "wide" | "square";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  experience: string;
  photo: string;
  trekName: string;
  videoUrl?: string;
}

export interface BlogCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTimeMinutes: number;
  author: string;
  publishedAt: string;
  image: string;
}

export interface TrustBadge {
  id: string;
  label: string;
  icon: "medal" | "users" | "shield" | "badge-check" | "leaf";
}

export const heroMedia = {
  image: img("photo-1506905925346-21bda4d32df4", 2400),
  video:
    "https://cdn.coverr.co/videos/coverr-a-tent-in-the-mountains-5584/1080p.mp4",
  poster: img("photo-1464822759023-fed622ff2c3b", 1920),
  blurDataURL: BLUR_DATA_URL,
} as const;

export const trustBadges: TrustBadge[] = [
  { id: "t1", label: "Expert Trek Leaders", icon: "medal" },
  { id: "t2", label: "Small Group Departures", icon: "users" },
  { id: "t3", label: "Safety First", icon: "shield" },
  { id: "t4", label: "Certified Guides", icon: "badge-check" },
  { id: "t5", label: "Eco-Friendly Adventures", icon: "leaf" },
];

export const featuredTreks: FeaturedTrekCard[] = [
  {
    id: "ft-1",
    slug: "triund-trek",
    name: "Triund Trek",
    location: "Himachal Pradesh",
    difficulty: "easy",
    duration: "2 Days",
    altitude: "9,350 ft",
    bestSeason: "May – Oct",
    rating: 4.8,
    reviewCount: 2140,
    priceInr: 999,
    seatsLeft: 18,
    badge: "BESTSELLER",
    badgeTone: "lime",
    image: img("photo-1500530855697-b586d89ba3ee"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ft-2",
    slug: "kareri-lake-trek",
    name: "Kareri Lake Trek",
    location: "Himachal Pradesh",
    difficulty: "easy",
    duration: "2 Days",
    altitude: "10,170 ft",
    bestSeason: "Apr – Nov",
    rating: 4.6,
    reviewCount: 842,
    priceInr: 1499,
    seatsLeft: 14,
    badge: "TRENDING",
    badgeTone: "orange",
    image: img("photo-1486870591958-9b9d0d1c83bf"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ft-3",
    slug: "kheerganga-trek",
    name: "Kheerganga Trek",
    location: "Himachal Pradesh",
    difficulty: "easy",
    duration: "2 Days",
    altitude: "10,006 ft",
    bestSeason: "Mar – Jun",
    rating: 4.7,
    reviewCount: 1876,
    priceInr: 1099,
    seatsLeft: 16,
    badge: "POPULAR",
    badgeTone: "blue",
    image: img("photo-1504280390367-361c6d9f38f4"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ft-4",
    slug: "snowline-laka-trek",
    name: "Snowline Laka Trek",
    location: "Himachal Pradesh",
    difficulty: "easy",
    duration: "3 Days",
    altitude: "10,499 ft",
    bestSeason: "Mar – Nov",
    rating: 4.7,
    reviewCount: 624,
    priceInr: 2500,
    seatsLeft: 10,
    badge: "NEW",
    badgeTone: "sky",
    image: img("photo-1519681393784-d120267933ba"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ft-5",
    slug: "hampta-pass-trek",
    name: "Hampta Pass Trek",
    location: "Himachal Pradesh",
    difficulty: "moderate",
    duration: "5 Days",
    altitude: "14,100 ft",
    bestSeason: "Jun – Oct",
    rating: 4.8,
    reviewCount: 962,
    priceInr: 9999,
    seatsLeft: 4,
    badge: "TRENDING",
    badgeTone: "orange",
    image: img("photo-1506905925346-21bda4d32df4"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ft-6",
    slug: "kedarkantha-trek",
    name: "Kedarkantha Trek",
    location: "Uttarakhand",
    difficulty: "easy",
    duration: "6 Days",
    altitude: "12,500 ft",
    bestSeason: "Dec – Apr",
    rating: 4.8,
    reviewCount: 1284,
    priceInr: 7499,
    seatsLeft: 6,
    badge: "BESTSELLER",
    badgeTone: "lime",
    image: img("photo-1464822759023-fed622ff2c3b"),
    blurDataURL: BLUR_DATA_URL,
  },
];

export const popularDestinations: DestinationCard[] = [
  {
    id: "d0",
    slug: "dharamshala",
    name: "Dharamshala",
    region: "Dhauladhar Range",
    trekCount: 46,
    image: img("photo-1551632811-561732d1e306"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "d0b",
    slug: "mcleod-ganj",
    name: "McLeod Ganj",
    region: "Dharamshala",
    trekCount: 12,
    image: img("photo-1500530855697-b586d89ba3ee"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "d1",
    slug: "manali",
    name: "Manali",
    region: "Himachal Pradesh",
    trekCount: 18,
    image: img("photo-1626621341517-bbf3d9990a23"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "d2",
    slug: "kasol",
    name: "Kasol",
    region: "Parvati Valley",
    trekCount: 12,
    image: img("photo-1504280390367-361c6d9f38f4"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "d3",
    slug: "spiti-valley",
    name: "Spiti Valley",
    region: "Himachal Pradesh",
    trekCount: 14,
    image: img("photo-1585409677983-0f6c411fa381"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "d4",
    slug: "leh-ladakh",
    name: "Leh Ladakh",
    region: "Ladakh",
    trekCount: 22,
    image: img("photo-1519681393784-d120267933ba"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "d5",
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "Garhwal & Kumaon",
    trekCount: 36,
    image: img("photo-1464822759023-fed622ff2c3b"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "d6",
    slug: "kashmir",
    name: "Kashmir",
    region: "Jammu & Kashmir",
    trekCount: 16,
    image: img("photo-1506905925346-21bda4d32df4"),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "d7",
    slug: "sikkim",
    name: "Sikkim",
    region: "Northeast Himalaya",
    trekCount: 11,
    image: img("photo-1544735716-392fe16912ea"),
    blurDataURL: BLUR_DATA_URL,
  },
];

export const destinationShowcases: DestinationShowcase[] = [
  {
    id: "ds-1",
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    description: "Alpine meadows, forest trails and iconic Himalayan ridgelines.",
    badge: "MOST LOVED",
    trekCountLabel: "50+ Treks",
    destinationCountLabel: "25+ Destinations",
    bestTime: "Mar – Jun",
    icon: "mountain",
    image: img("photo-1506905925346-21bda4d32df4", 900),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ds-2",
    slug: "uttarakhand",
    name: "Uttarakhand",
    description: "Sacred peaks, glacial valleys and soulful mountain journeys.",
    badge: "SPIRITUAL TRAILS",
    trekCountLabel: "50+ Treks",
    destinationCountLabel: "25+ Destinations",
    bestTime: "Apr – Jun",
    icon: "temple",
    image: img("photo-1464822759023-fed622ff2c3b", 900),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ds-3",
    slug: "jammu-kashmir",
    name: "Jammu & Kashmir",
    description: "Alpine lakes, pine forests and breathtaking high pastures.",
    badge: "HIDDEN PARADISE",
    trekCountLabel: "30+ Treks",
    destinationCountLabel: "15+ Destinations",
    bestTime: "Jun – Sep",
    icon: "lake",
    image: img("photo-1626621341517-bbf3d9990a23", 900),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ds-4",
    slug: "ladakh",
    name: "Ladakh",
    description: "High desert trails, remote passes and cinematic landscapes.",
    badge: "HIGH ALTITUDE",
    trekCountLabel: "28+ Treks",
    destinationCountLabel: "12+ Destinations",
    bestTime: "Jun – Sep",
    icon: "desert",
    image: img("photo-1519681393784-d120267933ba", 900),
    blurDataURL: BLUR_DATA_URL,
  },
  {
    id: "ds-5",
    slug: "sikkim",
    name: "Sikkim",
    description: "Lush valleys, rhododendron trails and Eastern Himalayan views.",
    badge: "GREEN ESCAPES",
    trekCountLabel: "18+ Treks",
    destinationCountLabel: "10+ Destinations",
    bestTime: "Mar – May",
    icon: "pine",
    image: img("photo-1544735716-392fe16912ea", 900),
    blurDataURL: BLUR_DATA_URL,
  },
];

export const trekCategoryCards: CategoryCard[] = [
  {
    id: "c1",
    title: "Weekend Treks",
    description: "Short escapes between Monday meetings",
    href: "/weekend-treks",
    image: img("photo-1551632811-561732d1e306", 900),
  },
  {
    id: "c2",
    title: "Snow Treks",
    description: "Frozen trails and white horizons",
    href: "/winter-treks",
    image: img("photo-1491002052546-bf38f186af21", 900),
  },
  {
    id: "c3",
    title: "High Altitude Treks",
    description: "Thin air, big summits, deeper courage",
    href: "/high-altitude-treks",
    image: img("photo-1464822759023-fed622ff2c3b", 900),
  },
  {
    id: "c4",
    title: "Beginner Treks",
    description: "Your first Himalayan footsteps",
    href: "/treks?level=easy",
    image: img("photo-1478131143081-80f7f84ca84a", 900),
  },
  {
    id: "c5",
    title: "Family Adventures",
    description: "Shared trails for every generation",
    href: "/treks?category=family",
    image: img("photo-1523987355523-c7b5b0dd90a7", 900),
  },
  {
    id: "c6",
    title: "Camping",
    description: "Starlit nights beside alpine lakes",
    href: "/camping",
    image: img("photo-1504280390367-361c6d9f38f4", 900),
  },
  {
    id: "c7",
    title: "Backpacking",
    description: "Self-reliant journeys with light packs",
    href: "/treks?style=backpacking",
    image: img("photo-1551632811-561732d1e306", 900),
  },
  {
    id: "c8",
    title: "Photography Tours",
    description: "Golden light across Himalayan ridges",
    href: "/treks?style=photography",
    image: img("photo-1500530855697-b586d89ba3ee", 900),
  },
];

export const whyChooseItems = [
  {
    id: "w1",
    title: "Certified Trek Leaders",
    description: "Wilderness First Aid trained leaders on every departure.",
    icon: "shield" as const,
  },
  {
    id: "w2",
    title: "Medical Support",
    description: "Oxygen, first-aid kits, and evacuation protocols ready.",
    icon: "heart" as const,
  },
  {
    id: "w3",
    title: "Local Experts",
    description: "Guides who know weather, terrain, and village support.",
    icon: "users" as const,
  },
  {
    id: "w4",
    title: "Best Campsites",
    description: "Handpicked meadows, ridgelines, and lakeside nights.",
    icon: "tent" as const,
  },
  {
    id: "w5",
    title: "Eco Responsible",
    description: "Leave-no-trace practices and local partner communities.",
    icon: "leaf" as const,
  },
  {
    id: "w6",
    title: "Premium Equipment",
    description: "Reliable tents, kitchen gear, and safety essentials.",
    icon: "backpack" as const,
  },
  {
    id: "w7",
    title: "Small Groups",
    description: "Intimate departures for better pacing and attention.",
    icon: "group" as const,
  },
  {
    id: "w8",
    title: "24x7 Support",
    description: "From booking questions to on-trail coordination.",
    icon: "headset" as const,
  },
];

export const fixedDepartures: FixedDeparture[] = [
  {
    id: "fd-1",
    trekName: "Kedarkantha Trek",
    trekSlug: "kedarkantha-trek",
    departureDate: "2026-08-08",
    seatsAvailable: 6,
    priceInr: 7499,
    location: "Sankri",
  },
  {
    id: "fd-2",
    trekName: "Hampta Pass Trek",
    trekSlug: "hampta-pass-trek",
    departureDate: "2026-08-15",
    seatsAvailable: 4,
    priceInr: 9999,
    location: "Manali",
  },
  {
    id: "fd-3",
    trekName: "Kashmir Great Lakes",
    trekSlug: "kashmir-great-lakes",
    departureDate: "2026-08-22",
    seatsAvailable: 7,
    priceInr: 18999,
    location: "Sonamarg",
  },
  {
    id: "fd-4",
    trekName: "Spiti Circuit Expedition",
    trekSlug: "spiti-circuit",
    departureDate: "2026-09-05",
    seatsAvailable: 5,
    priceInr: 28999,
    location: "Kaza",
  },
  {
    id: "fd-5",
    trekName: "Valley of Flowers",
    trekSlug: "valley-of-flowers",
    departureDate: "2026-09-12",
    seatsAvailable: 8,
    priceInr: 10999,
    location: "Govindghat",
  },
];

export const adventureStats: AdventureStat[] = [
  { id: "s1", value: 10000, suffix: "+", label: "Happy Trekkers" },
  { id: "s2", value: 250, suffix: "+", label: "Treks" },
  { id: "s3", value: 15, suffix: "+", label: "Years Experience" },
  { id: "s4", value: 98, suffix: "%", label: "Customer Satisfaction" },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "g1",
    src: img("photo-1464822759023-fed622ff2c3b", 1200),
    alt: "Alpine ridgeline under blue sky",
    span: "tall",
  },
  {
    id: "g2",
    src: img("photo-1506905925346-21bda4d32df4", 1200),
    alt: "Snow peaks at golden hour",
    span: "wide",
  },
  {
    id: "g3",
    src: img("photo-1504280390367-361c6d9f38f4", 900),
    alt: "Tent camp beside mountain lake",
    span: "square",
  },
  {
    id: "g4",
    src: img("photo-1486870591958-9b9d0d1c83bf", 900),
    alt: "Trekkers on forest trail",
    span: "square",
  },
  {
    id: "g5",
    src: img("photo-1519681393784-d120267933ba", 1200),
    alt: "High desert Himalayan landscape",
    span: "tall",
  },
  {
    id: "g6",
    src: img("photo-1551632811-561732d1e306", 1200),
    alt: "Sunrise above cloud valley",
    span: "wide",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "r1",
    name: "Ananya Sharma",
    location: "Bengaluru",
    rating: 5,
    experience:
      "The Kedarkantha summit sunrise felt cinematic. Guides paced us perfectly, camps were warm, and every detail felt premium.",
    photo: img("photo-1494790108377-be9c29b29330", 400),
    trekName: "Kedarkantha Trek",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "r2",
    name: "Rahul Mehta",
    location: "Mumbai",
    rating: 5,
    experience:
      "Hampta Pass was my first high-altitude trek. Safety briefings, local knowledge, and small group size made it unforgettable.",
    photo: img("photo-1507003211169-0a1dd7228f2d", 400),
    trekName: "Hampta Pass Trek",
  },
  {
    id: "r3",
    name: "Priya Nair",
    location: "Kochi",
    rating: 5,
    experience:
      "Spiti felt intimate and thoughtfully planned. From campsites to cuisine, India Holiday Destinations set a new bar.",
    photo: img("photo-1438761681033-6461ffad8d80", 400),
    trekName: "Spiti Circuit",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "r4",
    name: "Arjun Kapoor",
    location: "Delhi",
    rating: 5,
    experience:
      "Kashmir Great Lakes was pure National Geographic terrain. Supportive crew, clear communication, and stunning routes.",
    photo: img("photo-1472099645785-5658abf4ff4e", 400),
    trekName: "Kashmir Great Lakes",
  },
];

export const latestBlogs: BlogCard[] = [
  {
    id: "b1",
    slug: "first-himalayan-trek-guide",
    title: "How to Prepare for Your First Himalayan Trek",
    excerpt:
      "Fitness timelines, packing essentials, and altitude basics for first-timers.",
    category: "Guides",
    readingTimeMinutes: 8,
    author: "IHD Editorial",
    publishedAt: "2026-06-12",
    image: img("photo-1478131143081-80f7f84ca84a", 1000),
  },
  {
    id: "b2",
    slug: "best-winter-treks-india",
    title: "7 Winter Treks That Feel Like Another Planet",
    excerpt: "From frozen rivers to snow forests — India's finest cold-season routes.",
    category: "Winter",
    readingTimeMinutes: 6,
    author: "Meera Joshi",
    publishedAt: "2026-05-28",
    image: img("photo-1491002052546-bf38f186af21", 1000),
  },
  {
    id: "b3",
    slug: "altitude-safety-checklist",
    title: "The Altitude Safety Checklist Every Trekker Needs",
    excerpt: "Acclimatization, warning signs, and gear that keeps teams safe.",
    category: "Safety",
    readingTimeMinutes: 7,
    author: "Dr. Kabir Singh",
    publishedAt: "2026-05-10",
    image: img("photo-1464822759023-fed622ff2c3b", 1000),
  },
];

export const homeFaqs: FAQ[] = [
  {
    id: "hf1",
    question: "Do I need prior trekking experience?",
    answer:
      "Many weekend and beginner routes are designed for first-timers. Difficult and high-altitude expeditions recommend prior experience and documented fitness preparation. Each trek page lists difficulty and readiness guidance.",
    category: "general",
  },
  {
    id: "hf2",
    question: "What is included in the trek fee?",
    answer:
      "Most packages include stays, meals as listed, local trek transport, trek leadership, and permits. Inclusions vary by itinerary and are detailed on every trek page before booking.",
    category: "booking",
  },
  {
    id: "hf3",
    question: "Are your groups small?",
    answer:
      "Yes. We keep departures intimate so pacing, safety, and experience quality stay high. Exact group caps are shown on each fixed departure.",
    category: "trek",
  },
  {
    id: "hf4",
    question: "How do cancellations and refunds work?",
    answer:
      "Refund eligibility depends on notice period before departure. Full terms live on our Cancellation Policy page and are shared at booking confirmation.",
    category: "cancellation",
  },
  {
    id: "hf5",
    question: "Can I join as a solo traveler?",
    answer:
      "Absolutely. Most fixed departures welcome solo travelers, and our team helps you connect safely with the group.",
    category: "booking",
  },
];

export const heroSearchOptions = {
  destinations: [
    "Dharamshala",
    "McLeod Ganj",
    "Bir Billing",
    "Barot",
    "Kangra",
    "Bharmour",
    "Naddi",
    "Manali",
    "Kasol",
    "Spiti",
    "Ladakh",
    "Uttarakhand",
    "Kashmir",
    "Sikkim",
  ],
  difficulties: ["Easy", "Moderate", "Difficult", "Challenging"],
  durations: ["2–3 Days", "4–6 Days", "7–9 Days", "10+ Days"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  budgets: ["Under ₹8,000", "₹8,000 – ₹15,000", "₹15,000 – ₹25,000", "₹25,000+"],
} as const;
