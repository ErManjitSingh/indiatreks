export type BlogTopicKind =
  | "travel-guide"
  | "places"
  | "things-to-do"
  | "hidden-places"
  | "best-time"
  | "weather"
  | "trip-cost"
  | "itinerary"
  | "budget"
  | "destination-guide"
  | "food"
  | "shopping"
  | "camping"
  | "trek-guide"
  | "treks-roundup"
  | "family"
  | "honeymoon"
  | "how-to-reach"
  | "road-trip"
  | "temples";

export interface DharamshalaBlogTopic {
  title: string;
  slug: string;
  kind: BlogTopicKind;
  focusKeyword: string;
  category: string;
  tags: string[];
  excerptHint: string;
  /** Optional trek slug for trek-guide topics */
  trekSlug?: string;
  /** Optional related place name */
  place?: string;
}

export const DHARAMSHALA_BLOG_TOPICS: DharamshalaBlogTopic[] = [
  {
    title: "Dharamshala Travel Guide",
    slug: "dharamshala-travel-guide",
    kind: "travel-guide",
    focusKeyword: "dharamshala travel guide",
    category: "Dharamshala",
    tags: ["dharamshala", "travel guide", "himachal pradesh", "mcleod ganj"],
    excerptHint: "Plan a confident Dharamshala trip with neighborhoods, seasons, budgets, and local travel tips.",
  },
  {
    title: "Best Places to Visit in Dharamshala",
    slug: "best-places-to-visit-in-dharamshala",
    kind: "places",
    focusKeyword: "best places to visit in dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "places to visit", "sightseeing"],
    excerptHint: "From monasteries to viewpoints, discover the most rewarding places across Dharamshala and McLeod Ganj.",
  },
  {
    title: "Things to Do in Dharamshala",
    slug: "things-to-do-in-dharamshala",
    kind: "things-to-do",
    focusKeyword: "things to do in dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "activities", "experiences"],
    excerptHint: "Culture, cafes, short hikes, and slow-travel experiences worth your time in the Dhauladhar foothills.",
  },
  {
    title: "Hidden Places in Dharamshala",
    slug: "hidden-places-in-dharamshala",
    kind: "hidden-places",
    focusKeyword: "hidden places in dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "offbeat", "hidden gems"],
    excerptHint: "Quieter trails, local viewpoints, and lesser-known corners beyond the usual tourist circuit.",
  },
  {
    title: "Best Time to Visit Dharamshala",
    slug: "best-time-to-visit-dharamshala",
    kind: "best-time",
    focusKeyword: "best time to visit dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "best season", "weather"],
    excerptHint: "Month-by-month guidance to pick the right season for trekking, snow, monsoon greenery, or calm stays.",
  },
  {
    title: "Dharamshala Weather Guide",
    slug: "dharamshala-weather-guide",
    kind: "weather",
    focusKeyword: "dharamshala weather",
    category: "Dharamshala",
    tags: ["dharamshala", "weather", "climate"],
    excerptHint: "Understand temperatures, rainfall, and mountain weather patterns before you pack and travel.",
  },
  {
    title: "Dharamshala Trip Cost",
    slug: "dharamshala-trip-cost",
    kind: "trip-cost",
    focusKeyword: "dharamshala trip cost",
    category: "Dharamshala",
    tags: ["dharamshala", "budget", "trip cost"],
    excerptHint: "Realistic daily budgets for transport, stays, food, and activities across comfort levels.",
  },
  {
    title: "Dharamshala 2 Day Itinerary",
    slug: "dharamshala-2-day-itinerary",
    kind: "itinerary",
    focusKeyword: "dharamshala 2 day itinerary",
    category: "Dharamshala",
    tags: ["dharamshala", "itinerary", "weekend trip"],
    excerptHint: "A practical two-day plan covering McLeod Ganj, Bhagsu, and essential viewpoints without rushing.",
  },
  {
    title: "Dharamshala 3 Day Itinerary",
    slug: "dharamshala-3-day-itinerary",
    kind: "itinerary",
    focusKeyword: "dharamshala 3 day itinerary",
    category: "Dharamshala",
    tags: ["dharamshala", "itinerary", "3 days"],
    excerptHint: "Stretch your trip with temples, cafes, a short hike, and time to absorb the mountain atmosphere.",
  },
  {
    title: "Dharamshala Budget Travel Guide",
    slug: "dharamshala-budget-travel-guide",
    kind: "budget",
    focusKeyword: "dharamshala budget travel",
    category: "Dharamshala",
    tags: ["dharamshala", "budget travel", "backpacking"],
    excerptHint: "Save smart on buses, homestays, food, and activities while still enjoying a rich Himalayan experience.",
  },
  {
    title: "McLeod Ganj Travel Guide",
    slug: "mcleod-ganj-travel-guide",
    kind: "destination-guide",
    focusKeyword: "mcleod ganj travel guide",
    category: "McLeod Ganj",
    tags: ["mcleod ganj", "dharamshala", "travel guide"],
    place: "McLeod Ganj",
    excerptHint: "Navigate McLeod Ganj like a local with neighborhood tips, culture, stays, and day plans.",
  },
  {
    title: "Best Cafes in McLeod Ganj",
    slug: "best-cafes-in-mcleod-ganj",
    kind: "food",
    focusKeyword: "best cafes in mcleod ganj",
    category: "McLeod Ganj",
    tags: ["mcleod ganj", "cafes", "food"],
    place: "McLeod Ganj",
    excerptHint: "Mountain-view cafes, Tibetan bakeries, and relaxed spots for coffee, work, and long conversations.",
  },
  {
    title: "Best Restaurants in Dharamshala",
    slug: "best-restaurants-in-dharamshala",
    kind: "food",
    focusKeyword: "best restaurants in dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "restaurants", "food guide"],
    excerptHint: "Where to eat well across Dharamshala and McLeod Ganj, from momos to thukpa and Indian comfort food.",
  },
  {
    title: "Shopping in McLeod Ganj",
    slug: "shopping-in-mcleod-ganj",
    kind: "shopping",
    focusKeyword: "shopping in mcleod ganj",
    category: "McLeod Ganj",
    tags: ["mcleod ganj", "shopping", "souvenirs"],
    place: "McLeod Ganj",
    excerptHint: "Tibetan crafts, woolens, books, and ethical souvenirs with practical bargaining and quality tips.",
  },
  {
    title: "Camping in Dharamshala",
    slug: "camping-in-dharamshala",
    kind: "camping",
    focusKeyword: "camping in dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "camping", "outdoors"],
    excerptHint: "Legal campsites, gear expectations, seasons, and safety for camping near the Dhauladhar range.",
  },
  {
    title: "Triund Trek Complete Guide",
    slug: "triund-trek-complete-guide",
    kind: "trek-guide",
    focusKeyword: "triund trek guide",
    category: "Treks",
    tags: ["triund trek", "dharamshala", "weekend trek"],
    trekSlug: "triund-trek",
    excerptHint: "Distance, difficulty, permits, camping, and packing for Himachal's most popular day-and-night hike.",
  },
  {
    title: "Kareri Lake Trek Guide",
    slug: "kareri-lake-trek-guide",
    kind: "trek-guide",
    focusKeyword: "kareri lake trek guide",
    category: "Treks",
    tags: ["kareri lake", "dharamshala trek", "himalaya"],
    trekSlug: "kareri-lake-trek",
    excerptHint: "Trail notes, best season, accommodation, and fitness tips for the alpine Kareri Lake route.",
  },
  {
    title: "Indrahar Pass Trek Guide",
    slug: "indrahar-pass-trek-guide",
    kind: "trek-guide",
    focusKeyword: "indrahar pass trek guide",
    category: "Treks",
    tags: ["indrahar pass", "dharamshala trek", "high altitude"],
    trekSlug: "indrahar-pass-trek",
    excerptHint: "A demanding Dhauladhar crossing explained with stages, gear, guides, and acclimatization advice.",
  },
  {
    title: "Laka Glacier Trek Guide",
    slug: "laka-glacier-trek-guide",
    kind: "trek-guide",
    focusKeyword: "laka glacier trek guide",
    category: "Treks",
    tags: ["laka glacier", "triund extension", "snow trek"],
    trekSlug: "laka-glacier-trek",
    excerptHint: "Extend Triund to snowfields and glacier views with this step-by-step planning guide.",
  },
  {
    title: "Snowline Trek Guide",
    slug: "snowline-trek-guide",
    kind: "trek-guide",
    focusKeyword: "snowline trek dharamshala",
    category: "Treks",
    tags: ["snowline trek", "triund", "winter trek"],
    trekSlug: "snowline-trek",
    excerptHint: "Seasonal snow hikes above McLeod Ganj with route clarity, timing, and safety essentials.",
  },
  {
    title: "Best Treks Near Dharamshala",
    slug: "best-treks-near-dharamshala",
    kind: "treks-roundup",
    focusKeyword: "best treks near dharamshala",
    category: "Treks",
    tags: ["dharamshala treks", "himalaya trekking", "weekend treks"],
    excerptHint: "Compare difficulty, duration, and season for the top treks starting from Dharamshala.",
  },
  {
    title: "Family Trip to Dharamshala",
    slug: "family-trip-to-dharamshala",
    kind: "family",
    focusKeyword: "family trip to dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "family travel", "kids"],
    excerptHint: "Gentle activities, stay choices, pacing, and health tips for traveling with children and elders.",
  },
  {
    title: "Honeymoon in Dharamshala",
    slug: "honeymoon-in-dharamshala",
    kind: "honeymoon",
    focusKeyword: "honeymoon in dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "honeymoon", "romantic getaway"],
    excerptHint: "Quiet stays, scenic walks, cafe dates, and unhurried experiences for couples in the hills.",
  },
  {
    title: "How to Reach Dharamshala",
    slug: "how-to-reach-dharamshala",
    kind: "how-to-reach",
    focusKeyword: "how to reach dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala", "transport", "travel"],
    excerptHint: "Flights, trains, buses, and taxis explained with connections from major Indian cities.",
  },
  {
    title: "Delhi to Dharamshala Travel Guide",
    slug: "delhi-to-dharamshala-travel-guide",
    kind: "how-to-reach",
    focusKeyword: "delhi to dharamshala",
    category: "Dharamshala",
    tags: ["delhi to dharamshala", "bus", "road trip"],
    excerptHint: "Overnight buses, self-drive routes, breaks, and time estimates from Delhi NCR.",
  },
  {
    title: "Dharamshala to Bir Billing Trip",
    slug: "dharamshala-to-bir-billing-trip",
    kind: "road-trip",
    focusKeyword: "dharamshala to bir billing",
    category: "Road Trips",
    tags: ["bir billing", "paragliding", "road trip"],
    excerptHint: "Plan a scenic hop from Dharamshala to Bir with paragliding, stays, and transport options.",
  },
  {
    title: "Dharamshala to Dalhousie Guide",
    slug: "dharamshala-to-dalhousie-guide",
    kind: "road-trip",
    focusKeyword: "dharamshala to dalhousie",
    category: "Road Trips",
    tags: ["dalhousie", "road trip", "himachal pradesh"],
    excerptHint: "Route options, stopovers, and a sensible plan for linking two classic Himachal hill towns.",
  },
  {
    title: "Dharamshala to Khajjiar Road Trip",
    slug: "dharamshala-to-khajjiar-road-trip",
    kind: "road-trip",
    focusKeyword: "dharamshala to khajjiar",
    category: "Road Trips",
    tags: ["khajjiar", "mini switzerland", "road trip"],
    excerptHint: "Drive through Chamba district meadows and forests with timing, permits, and stay ideas.",
  },
  {
    title: "Top Temples in Dharamshala",
    slug: "top-temples-in-dharamshala",
    kind: "temples",
    focusKeyword: "temples in dharamshala",
    category: "Dharamshala",
    tags: ["dharamshala temples", "spiritual", "culture"],
    excerptHint: "Historic shrines, monasteries, and sacred spaces worth visiting respectfully in the region.",
  },
  {
    title: "Tibetan Food in McLeod Ganj",
    slug: "tibetan-food-in-mcleod-ganj",
    kind: "food",
    focusKeyword: "tibetan food mcleod ganj",
    category: "McLeod Ganj",
    tags: ["tibetan food", "mcleod ganj", "momos"],
    place: "McLeod Ganj",
    excerptHint: "Thukpa, momos, butter tea, and where to try authentic Tibetan flavours in McLeod Ganj.",
  },
];
