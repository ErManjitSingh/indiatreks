import { slugify } from "../utils/slugify";

export type ShimlaBlogTopicKind =
  | "travel-guide"
  | "places"
  | "tourist-places"
  | "things-to-do"
  | "best-time"
  | "how-to-reach"
  | "weather"
  | "trip-cost"
  | "itinerary"
  | "budget"
  | "family"
  | "honeymoon"
  | "solo"
  | "destination-guide"
  | "adventure"
  | "trek"
  | "camping"
  | "rafting"
  | "paragliding"
  | "skiing"
  | "mountain-biking"
  | "rock-climbing"
  | "food"
  | "restaurants"
  | "cafes"
  | "street-food"
  | "shopping"
  | "hotels"
  | "luxury-hotels"
  | "budget-hotels"
  | "resorts"
  | "homestays"
  | "romantic"
  | "seasonal"
  | "snowfall"
  | "festival"
  | "transport"
  | "temples"
  | "photography"
  | "nature"
  | "hidden"
  | "packing"
  | "tips"
  | "safety"
  | "practical"
  | "road-trip"
  | "packages"
  | "planner"
  | "checklist"
  | "faqs"
  | "worth-visiting"
  | "first-time"
  | "mistakes"
  | "comparison";

export interface ShimlaBlogTopic {
  title: string;
  slug: string;
  kind: ShimlaBlogTopicKind;
  focusKeyword: string;
  secondaryKeywords: string[];
  category: string;
  tags: string[];
  excerptHint: string;
  place?: string;
  itineraryDays?: number;
}

type TopicSeed = {
  title: string;
  kind: ShimlaBlogTopicKind;
  place?: string;
  itineraryDays?: number;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  category?: string;
  tags?: string[];
  excerptHint?: string;
};

function buildTopic(seed: TopicSeed): ShimlaBlogTopic {
  const slug = slugify(seed.title);
  const focusKeyword = (seed.focusKeyword || seed.title).toLowerCase().trim();
  const place = seed.place || "Shimla";
  const category = seed.category || "Shimla";
  const tags = seed.tags || [
    "shimla",
    "himachal pradesh",
    focusKeyword,
    "shimla travel",
    "india holiday destinations",
  ];
  const secondaryKeywords = seed.secondaryKeywords || [
    `${place.toLowerCase()} tourism`,
    `${place.toLowerCase()} travel guide`,
    "himachal pradesh tourism",
    "shimla tour package",
    "places to visit in shimla",
  ];
  const excerptHint =
    seed.excerptHint ||
    `A complete, practical ${focusKeyword} with seasons, budgets, routes, stays, and local tips for planning ${place}.`;

  return {
    title: seed.title,
    slug,
    kind: seed.kind,
    focusKeyword,
    secondaryKeywords,
    category,
    tags,
    excerptHint,
    place,
    itineraryDays: seed.itineraryDays,
  };
}

/** All Shimla SEO blog topics (120). */
const TOPIC_SEEDS: TopicSeed[] = [
  { title: "Shimla Travel Guide", kind: "travel-guide" },
  { title: "Best Places to Visit in Shimla", kind: "places" },
  { title: "Top Tourist Places in Shimla", kind: "tourist-places" },
  { title: "Things to Do in Shimla", kind: "things-to-do" },
  { title: "Best Time to Visit Shimla", kind: "best-time" },
  { title: "How to Reach Shimla", kind: "how-to-reach" },
  { title: "Shimla Weather Guide", kind: "weather" },
  { title: "Shimla Trip Cost Guide", kind: "trip-cost" },
  { title: "Shimla Itinerary for 2 Days", kind: "itinerary", itineraryDays: 2 },
  { title: "Shimla Itinerary for 3 Days", kind: "itinerary", itineraryDays: 3 },
  { title: "Shimla Itinerary for 5 Days", kind: "itinerary", itineraryDays: 5 },
  { title: "Shimla Budget Travel Guide", kind: "budget" },
  { title: "Shimla Family Trip Guide", kind: "family" },
  { title: "Shimla Honeymoon Guide", kind: "honeymoon" },
  { title: "Solo Trip to Shimla", kind: "solo" },
  {
    title: "The Ridge Shimla Guide",
    kind: "destination-guide",
    place: "The Ridge, Shimla",
    tags: ["the ridge shimla", "shimla", "mall road", "himachal pradesh"],
  },
  {
    title: "Mall Road Shimla Guide",
    kind: "destination-guide",
    place: "Mall Road, Shimla",
    tags: ["mall road shimla", "shimla shopping", "shimla"],
  },
  {
    title: "Jakhoo Temple Guide",
    kind: "temples",
    place: "Jakhoo Temple",
    tags: ["jakhoo temple", "shimla temples", "hanuman temple shimla"],
  },
  {
    title: "Christ Church Shimla Guide",
    kind: "destination-guide",
    place: "Christ Church, Shimla",
    tags: ["christ church shimla", "shimla heritage", "the ridge"],
  },
  {
    title: "Kufri Travel Guide",
    kind: "destination-guide",
    place: "Kufri",
    tags: ["kufri", "shimla", "kufri tourism", "himachal pradesh"],
  },
  {
    title: "Green Valley Shimla Guide",
    kind: "destination-guide",
    place: "Green Valley, Shimla",
    tags: ["green valley shimla", "shimla viewpoints"],
  },
  {
    title: "Chadwick Falls Guide",
    kind: "nature",
    place: "Chadwick Falls",
    tags: ["chadwick falls", "shimla waterfalls", "nature"],
  },
  {
    title: "Summer Hill Shimla Guide",
    kind: "destination-guide",
    place: "Summer Hill",
    tags: ["summer hill shimla", "shimla quiet places"],
  },
  {
    title: "Annandale Shimla Guide",
    kind: "destination-guide",
    place: "Annandale",
    tags: ["annandale shimla", "shimla sports", "picnic"],
  },
  {
    title: "Himalayan Bird Park Guide",
    kind: "destination-guide",
    place: "Himalayan Bird Park",
    tags: ["himalayan bird park", "shimla with kids", "shimla"],
  },
  {
    title: "Tara Devi Temple Guide",
    kind: "temples",
    place: "Tara Devi Temple",
    tags: ["tara devi temple", "shimla temples"],
  },
  {
    title: "Shimla State Museum Guide",
    kind: "destination-guide",
    place: "Shimla State Museum",
    tags: ["shimla state museum", "shimla heritage"],
  },
  {
    title: "Viceregal Lodge Guide",
    kind: "destination-guide",
    place: "Viceregal Lodge",
    tags: ["viceregal lodge", "rashtrapati niwas shimla", "shimla heritage"],
  },
  {
    title: "Scandal Point Shimla Guide",
    kind: "destination-guide",
    place: "Scandal Point",
    tags: ["scandal point shimla", "mall road"],
  },
  {
    title: "Lakkar Bazaar Guide",
    kind: "shopping",
    place: "Lakkar Bazaar",
    tags: ["lakkar bazaar", "shimla shopping", "wooden crafts"],
  },
  {
    title: "Kufri Complete Travel Guide",
    kind: "destination-guide",
    place: "Kufri",
    tags: ["kufri travel guide", "kufri shimla", "skiing kufri"],
  },
  {
    title: "Naldehra Travel Guide",
    kind: "destination-guide",
    place: "Naldehra",
    tags: ["naldehra", "shimla golf", "himachal"],
  },
  {
    title: "Chail Travel Guide",
    kind: "destination-guide",
    place: "Chail",
    tags: ["chail", "chail palace", "shimla day trip"],
  },
  {
    title: "Mashobra Travel Guide",
    kind: "destination-guide",
    place: "Mashobra",
    tags: ["mashobra", "shimla orchards", "quiet stays"],
  },
  {
    title: "Fagu Travel Guide",
    kind: "destination-guide",
    place: "Fagu",
    tags: ["fagu", "shimla viewpoints", "apple orchards"],
  },
  {
    title: "Tattapani Travel Guide",
    kind: "destination-guide",
    place: "Tattapani",
    tags: ["tattapani", "hot springs", "rafting near shimla"],
  },
  {
    title: "Narkanda Travel Guide",
    kind: "destination-guide",
    place: "Narkanda",
    tags: ["narkanda", "hatu peak", "shimla day trip"],
  },
  {
    title: "Kasauli from Shimla Guide",
    kind: "road-trip",
    place: "Kasauli",
    tags: ["kasauli from shimla", "kasauli", "himachal road trip"],
  },
  {
    title: "Kinnaur from Shimla Guide",
    kind: "road-trip",
    place: "Kinnaur",
    tags: ["kinnaur from shimla", "kalpa", "sangla"],
  },
  {
    title: "Sarahan Travel Guide",
    kind: "destination-guide",
    place: "Sarahan",
    tags: ["sarahan", "bhimakali temple", "shimla to sarahan"],
  },
  {
    title: "Sangla Valley Guide",
    kind: "destination-guide",
    place: "Sangla Valley",
    tags: ["sangla valley", "kinnaur", "baspa valley"],
  },
  {
    title: "Chitkul from Shimla Guide",
    kind: "road-trip",
    place: "Chitkul",
    tags: ["chitkul from shimla", "last village", "kinnaur"],
  },
  { title: "Adventure Activities in Shimla", kind: "adventure" },
  { title: "Trekking in Shimla", kind: "trek" },
  { title: "Camping Near Shimla", kind: "camping" },
  { title: "River Rafting Near Shimla", kind: "rafting", place: "Tattapani" },
  { title: "Paragliding Near Shimla", kind: "paragliding" },
  { title: "Skiing in Kufri", kind: "skiing", place: "Kufri" },
  { title: "Mountain Biking in Shimla", kind: "mountain-biking" },
  { title: "Rock Climbing in Shimla", kind: "rock-climbing" },
  { title: "Best Restaurants in Shimla", kind: "restaurants" },
  { title: "Best Cafes in Shimla", kind: "cafes" },
  { title: "Street Food in Shimla", kind: "street-food" },
  { title: "Famous Food in Shimla", kind: "food" },
  { title: "Best Bakeries in Shimla", kind: "food", tags: ["shimla bakeries", "shimla food", "cakes"] },
  { title: "Shopping in Shimla", kind: "shopping" },
  {
    title: "Lakkar Bazaar Shopping Guide",
    kind: "shopping",
    place: "Lakkar Bazaar",
  },
  {
    title: "Tibetan Market Shimla Guide",
    kind: "shopping",
    place: "Tibetan Market, Shimla",
    tags: ["tibetan market shimla", "shimla shopping"],
  },
  {
    title: "Mall Road Shopping Guide",
    kind: "shopping",
    place: "Mall Road, Shimla",
  },
  { title: "Best Hotels in Shimla", kind: "hotels" },
  { title: "Luxury Hotels in Shimla", kind: "luxury-hotels" },
  { title: "Budget Hotels in Shimla", kind: "budget-hotels" },
  { title: "Best Resorts in Shimla", kind: "resorts" },
  { title: "Best Homestays in Shimla", kind: "homestays" },
  {
    title: "Hotels Near Mall Road Shimla",
    kind: "hotels",
    place: "Mall Road, Shimla",
  },
  { title: "Honeymoon Places in Shimla", kind: "romantic" },
  { title: "Romantic Things to Do in Shimla", kind: "romantic" },
  { title: "Best Couple Hotels in Shimla", kind: "honeymoon" },
  { title: "Shimla Honeymoon Package Guide", kind: "packages", tags: ["shimla honeymoon package", "couples"] },
  { title: "Family Trip to Shimla", kind: "family" },
  { title: "Kid Friendly Places in Shimla", kind: "family" },
  { title: "Family Hotels in Shimla", kind: "family", tags: ["family hotels shimla", "shimla with kids"] },
  { title: "Shimla in Summer", kind: "seasonal" },
  { title: "Shimla in Winter", kind: "seasonal" },
  { title: "Shimla in Monsoon", kind: "seasonal" },
  { title: "Snowfall in Shimla Guide", kind: "snowfall" },
  { title: "Christmas Celebration in Shimla", kind: "festival" },
  { title: "New Year Celebration in Shimla", kind: "festival" },
  { title: "Delhi to Shimla Travel Guide", kind: "how-to-reach" },
  { title: "Chandigarh to Shimla Travel Guide", kind: "how-to-reach" },
  { title: "Kalka to Shimla Toy Train Guide", kind: "transport" },
  { title: "Shimla Local Transport Guide", kind: "transport" },
  { title: "Shimla Taxi Guide", kind: "transport" },
  { title: "Car Rental in Shimla", kind: "transport" },
  { title: "Famous Temples in Shimla", kind: "temples" },
  {
    title: "Jakhoo Temple Complete Guide",
    kind: "temples",
    place: "Jakhoo Temple",
  },
  {
    title: "Tara Devi Temple Complete Guide",
    kind: "temples",
    place: "Tara Devi Temple",
  },
  {
    title: "Kali Bari Temple Guide",
    kind: "temples",
    place: "Kali Bari Temple",
    tags: ["kali bari temple shimla", "shimla temples"],
  },
  { title: "Sunrise Points in Shimla", kind: "photography" },
  { title: "Sunset Points in Shimla", kind: "photography" },
  { title: "Nature Walks in Shimla", kind: "nature" },
  { title: "Best Photography Spots in Shimla", kind: "photography" },
  { title: "Hidden Places in Shimla", kind: "hidden" },
  { title: "Packing List for Shimla Trip", kind: "packing" },
  { title: "Shimla Travel Tips", kind: "tips" },
  { title: "Shimla Safety Guide", kind: "safety" },
  { title: "Internet & Mobile Network in Shimla", kind: "practical" },
  { title: "ATM & Banking Guide in Shimla", kind: "practical" },
  { title: "Medical Facilities in Shimla", kind: "practical" },
  { title: "Shimla to Spiti Road Trip Guide", kind: "road-trip", place: "Spiti" },
  { title: "Shimla to Manali Road Trip Guide", kind: "road-trip", place: "Manali" },
  { title: "Shimla to Chail Road Trip Guide", kind: "road-trip", place: "Chail" },
  { title: "Shimla to Kufri Road Trip Guide", kind: "road-trip", place: "Kufri" },
  { title: "Shimla to Kinnaur Road Trip Guide", kind: "road-trip", place: "Kinnaur" },
  { title: "Top 10 Places to Visit in Shimla", kind: "places" },
  { title: "Top 20 Tourist Attractions in Shimla", kind: "tourist-places" },
  { title: "Hidden Gems of Shimla", kind: "hidden" },
  { title: "Weekend Trip to Shimla", kind: "itinerary", itineraryDays: 2 },
  { title: "Offbeat Places Near Shimla", kind: "hidden" },
  { title: "Shimla Tour Packages Guide", kind: "packages" },
  { title: "Complete Shimla Travel Planner", kind: "planner" },
  { title: "Shimla Travel Checklist", kind: "checklist" },
  { title: "Shimla FAQs", kind: "faqs" },
  { title: "Is Shimla Worth Visiting?", kind: "worth-visiting" },
  { title: "First Time Visiting Shimla Guide", kind: "first-time" },
  { title: "Common Travel Mistakes in Shimla", kind: "mistakes" },
  { title: "Budget vs Luxury Shimla Trip", kind: "comparison" },
  { title: "Shimla with Kids Travel Guide", kind: "family" },
  { title: "Shimla Photography Guide", kind: "photography" },
  { title: "Ultimate Shimla Travel Guide", kind: "travel-guide" },
];

export const SHIMLA_BLOG_TOPICS: ShimlaBlogTopic[] = TOPIC_SEEDS.map(buildTopic);

export function getShimlaTopicBySlug(slug: string): ShimlaBlogTopic | null {
  return SHIMLA_BLOG_TOPICS.find((t) => t.slug === slug || slugify(t.title) === slug) || null;
}

export function listShimlaBlogSlugs(): string[] {
  return SHIMLA_BLOG_TOPICS.map((t) => t.slug);
}
