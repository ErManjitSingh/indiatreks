/**
 * Build Himachal + Uttarakhand trek catalogs into backend/seed-data/treks.json
 * Merges rich content from existing seed when titles match.
 *
 * Usage: node scripts/build-catalog-treks.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const existingPath = path.join(root, "backend/seed-data/treks.json");
const outPath = existingPath;

/** [title, destination/region, state, difficulty, duration] */
const CATALOG_HP = [
  ["Triund Trek", "Dharamshala", "Himachal Pradesh", "Easy", "2D/1N"],
  ["Kareri Lake Trek", "Dharamshala", "Himachal Pradesh", "Moderate", "3D/2N"],
  ["Indrahar Pass Trek", "Dharamshala", "Himachal Pradesh", "Moderate", "4D/3N"],
  ["Minkiani Pass Trek", "Dharamshala", "Himachal Pradesh", "Difficult", "5D/4N"],
  ["Seven Lakes Trek", "Dharamshala", "Himachal Pradesh", "Moderate", "6D/5N"],
  ["Lam Dal Lake Trek", "Kangra", "Himachal Pradesh", "Moderate", "4D/3N"],
  ["Toral Pass Trek", "Dharamshala", "Himachal Pradesh", "Difficult", "6D/5N"],
  ["Bagala Nag Trek", "Dharamshala", "Himachal Pradesh", "Easy", "2D/1N"],
  ["Galu Devi Trek", "Dharamshala", "Himachal Pradesh", "Easy", "1D"],
  ["Aghanjar Mahadev Trek", "Dharamshala", "Himachal Pradesh", "Easy", "1D"],
  ["Chamunda Trek", "Kangra", "Himachal Pradesh", "Easy", "1D"],
  ["Kunal Pathri Trek", "Dharamshala", "Himachal Pradesh", "Easy", "1D"],
  ["Snowline Trek", "Dharamshala", "Himachal Pradesh", "Easy", "2D/1N"],
  ["Laka Glacier Trek", "Dharamshala", "Himachal Pradesh", "Moderate", "2D/1N"],
  ["Thatharana Trek", "Dharamshala", "Himachal Pradesh", "Moderate", "3D/2N"],
  ["Hampta Pass Trek", "Manali", "Himachal Pradesh", "Moderate", "5D/4N"],
  ["Bhrigu Lake Trek", "Manali", "Himachal Pradesh", "Moderate", "4D/3N"],
  ["Beas Kund Trek", "Manali", "Himachal Pradesh", "Easy", "3D/2N"],
  ["Patalsu Peak Trek", "Manali", "Himachal Pradesh", "Moderate", "2D/1N"],
  ["Deo Tibba Base Camp Trek", "Manali", "Himachal Pradesh", "Moderate", "6D/5N"],
  ["Chandrakhani Pass Trek", "Naggar", "Himachal Pradesh", "Moderate", "4D/3N"],
  ["Sar Pass Trek", "Kasol", "Himachal Pradesh", "Moderate", "5D/4N"],
  ["Kheerganga Trek", "Kasol", "Himachal Pradesh", "Easy", "2D/1N"],
  ["Pin Parvati Pass Trek", "Kullu", "Himachal Pradesh", "Difficult", "11D/10N"],
  ["Rasol Trek", "Kasol", "Himachal Pradesh", "Moderate", "2D/1N"],
  ["Tosh Trek", "Parvati Valley", "Himachal Pradesh", "Easy", "2D/1N"],
  ["Grahan Village Trek", "Kasol", "Himachal Pradesh", "Easy", "2D/1N"],
  ["Malana Trek", "Kullu", "Himachal Pradesh", "Moderate", "2D/1N"],
  ["Malana Magic Valley Trek", "Kullu", "Himachal Pradesh", "Moderate", "3D/2N"],
  ["Waichin Valley Trek", "Malana", "Himachal Pradesh", "Moderate", "3D/2N"],
  ["Chandrakhani–Malana Trek", "Kullu", "Himachal Pradesh", "Moderate", "4D/3N"],
  ["Bijli Mahadev Trek", "Kullu", "Himachal Pradesh", "Easy", "1D"],
  ["Jalori Pass Trek", "Banjar", "Himachal Pradesh", "Easy", "1D"],
  ["Serolsar Lake Trek", "Jalori Pass", "Himachal Pradesh", "Easy", "1D"],
  ["Raghupur Fort Trek", "Jalori", "Himachal Pradesh", "Easy", "1D"],
  ["Bashleo Pass Trek", "Banjar", "Himachal Pradesh", "Moderate", "3D/2N"],
  ["Great Himalayan National Park Trek", "Banjar", "Himachal Pradesh", "Moderate", "5D/4N"],
  ["Kugti Pass Trek", "Chamba", "Himachal Pradesh", "Difficult", "7D/6N"],
  ["Manimahesh Kailash Trek", "Bharmour", "Himachal Pradesh", "Moderate", "5D/4N"],
  ["Sach Pass Trek", "Chamba", "Himachal Pradesh", "Moderate", "5D/4N"],
  ["Bhaba Pass Trek", "Kinnaur", "Himachal Pradesh", "Difficult", "8D/7N"],
  ["Rupin Pass Trek", "Kinnaur", "Himachal Pradesh", "Difficult", "7D/6N"],
  ["Charang Valley Trek", "Kinnaur", "Himachal Pradesh", "Difficult", "8D/7N"],
  ["Kinner Kailash Trek", "Kalpa", "Himachal Pradesh", "Difficult", "4D/3N"],
  ["Borasu Pass Trek", "Kinnaur", "Himachal Pradesh", "Difficult", "8D/7N"],
  ["Buran Ghati Trek", "Janglik", "Himachal Pradesh", "Moderate", "7D/6N"],
  ["Churdhar Peak Trek", "Sirmaur", "Himachal Pradesh", "Moderate", "3D/2N"],
  ["Shrikhand Mahadev Trek", "Kullu", "Himachal Pradesh", "Difficult", "5D/4N"],
  ["Friendship Peak Trek", "Manali", "Himachal Pradesh", "Difficult", "7D/6N"],
  ["Hanuman Tibba Base Camp Trek", "Manali", "Himachal Pradesh", "Difficult", "6D/5N"],
  ["Bara Bhangal Trek", "Kangra", "Himachal Pradesh", "Difficult", "8D/7N"],
  ["Kalihani Pass Trek", "Manali", "Himachal Pradesh", "Difficult", "7D/6N"],
  ["Lamkhaga Pass Trek", "Kinnaur", "Himachal Pradesh", "Expert", "10D/9N"],
  ["Parang La Trek", "Spiti", "Himachal Pradesh", "Expert", "11D/10N"],
  ["Pin Bhaba Pass Trek", "Spiti", "Himachal Pradesh", "Difficult", "8D/7N"],
  ["Kanamo Peak Trek", "Spiti", "Himachal Pradesh", "Difficult", "6D/5N"],
  ["Dhankar Lake Trek", "Spiti", "Himachal Pradesh", "Easy", "1D"],
  ["Chandratal Lake Trek", "Spiti", "Himachal Pradesh", "Easy", "1D"],
  ["Kibber to Tashigang Trek", "Spiti", "Himachal Pradesh", "Moderate", "2D/1N"],
  ["Mudh Village Trek", "Pin Valley", "Himachal Pradesh", "Easy", "2D/1N"],
];

const CATALOG_UK = [
  ["Kedarkantha Trek", "Sankri", "Uttarakhand", "Easy", "6D/5N"],
  ["Har Ki Dun Trek", "Sankri", "Uttarakhand", "Moderate", "7D/6N"],
  ["Bali Pass Trek", "Sankri", "Uttarakhand", "Difficult", "8D/7N"],
  ["Phulara Ridge Trek", "Sankri", "Uttarakhand", "Moderate", "6D/5N"],
  ["Dev Kyara Trek", "Sankri", "Uttarakhand", "Moderate", "7D/6N"],
  ["Ruinsara Lake Trek", "Sankri", "Uttarakhand", "Moderate", "8D/7N"],
  ["Borasu Pass Trek", "Sankri", "Uttarakhand", "Expert", "8D/7N"],
  ["Kedartal Trek", "Gangotri", "Uttarakhand", "Difficult", "7D/6N"],
  ["Gaumukh Tapovan Trek", "Gangotri", "Uttarakhand", "Moderate", "8D/7N"],
  ["Nandanvan Vasuki Tal Trek", "Gangotri", "Uttarakhand", "Difficult", "9D/8N"],
  ["Dayara Bugyal Trek", "Uttarkashi", "Uttarakhand", "Easy", "4D/3N"],
  ["Dodital Trek", "Uttarkashi", "Uttarakhand", "Easy", "5D/4N"],
  ["Darwa Pass Trek", "Uttarkashi", "Uttarakhand", "Moderate", "6D/5N"],
  ["Auden's Col Trek", "Gangotri", "Uttarakhand", "Expert", "15D/14N"],
  ["Valley of Flowers Trek", "Joshimath", "Uttarakhand", "Easy", "6D/5N"],
  ["Hemkund Sahib Trek", "Govindghat", "Uttarakhand", "Easy", "2D/1N"],
  ["Gorson Bugyal Trek", "Auli", "Uttarakhand", "Easy", "3D/2N"],
  ["Kuari Pass Trek", "Joshimath", "Uttarakhand", "Moderate", "6D/5N"],
  ["Pangarchulla Peak Trek", "Joshimath", "Uttarakhand", "Difficult", "7D/6N"],
  ["Tali Lake Trek", "Auli", "Uttarakhand", "Easy", "2D/1N"],
  ["Gurson Bugyal Trek", "Auli", "Uttarakhand", "Easy", "1D"],
  ["Chenab Lake Trek", "Joshimath", "Uttarakhand", "Moderate", "6D/5N"],
  ["Roopkund Trek", "Lohajung", "Uttarakhand", "Difficult", "8D/7N"],
  ["Ali Bedni Bugyal Trek", "Lohajung", "Uttarakhand", "Moderate", "6D/5N"],
  ["Brahmatal Trek", "Lohajung", "Uttarakhand", "Easy", "6D/5N"],
  ["Bagji Bugyal Trek", "Lohajung", "Uttarakhand", "Moderate", "5D/4N"],
  ["Ranthan Kharak Trek", "Bageshwar", "Uttarakhand", "Moderate", "7D/6N"],
  ["Pindari Glacier Trek", "Bageshwar", "Uttarakhand", "Moderate", "7D/6N"],
  ["Kafni Glacier Trek", "Bageshwar", "Uttarakhand", "Moderate", "6D/5N"],
  ["Sunderdhunga Trek", "Bageshwar", "Uttarakhand", "Difficult", "8D/7N"],
  ["Milam Glacier Trek", "Munsiyari", "Uttarakhand", "Difficult", "9D/8N"],
  ["Ralam Glacier Trek", "Munsiyari", "Uttarakhand", "Difficult", "8D/7N"],
  ["Namik Glacier Trek", "Munsiyari", "Uttarakhand", "Moderate", "7D/6N"],
  ["Khaliya Top Trek", "Munsiyari", "Uttarakhand", "Easy", "2D/1N"],
  ["Panchachuli Base Camp Trek", "Munsiyari", "Uttarakhand", "Moderate", "7D/6N"],
  ["Nanda Devi East Base Camp Trek", "Munsiyari", "Uttarakhand", "Difficult", "9D/8N"],
  ["Adi Kailash Trek", "Pithoragarh", "Uttarakhand", "Moderate", "8D/7N"],
  ["Om Parvat Trek", "Dharchula", "Uttarakhand", "Moderate", "7D/6N"],
  ["Nag Tibba Trek", "Mussoorie", "Uttarakhand", "Easy", "2D/1N"],
  ["Surkanda Devi Trek", "Dhanaulti", "Uttarakhand", "Easy", "1D"],
  ["Chandrashila Trek", "Chopta", "Uttarakhand", "Easy", "3D/2N"],
  ["Tungnath Trek", "Chopta", "Uttarakhand", "Easy", "1D"],
  ["Deoria Tal Trek", "Sari Village", "Uttarakhand", "Easy", "2D/1N"],
  ["Chopta Chandrashila Trek", "Chopta", "Uttarakhand", "Easy", "3D/2N"],
  ["Kartik Swami Trek", "Rudraprayag", "Uttarakhand", "Easy", "1D"],
  ["Panwali Kantha Trek", "Ghuttu", "Uttarakhand", "Moderate", "6D/5N"],
  ["Madhyamaheshwar Trek", "Ukhimath", "Uttarakhand", "Moderate", "4D/3N"],
  ["Rudranath Trek", "Gopeshwar", "Uttarakhand", "Moderate", "5D/4N"],
  ["Kalpeshwar Trek", "Helang", "Uttarakhand", "Easy", "2D/1N"],
  ["Satopanth Lake Trek", "Badrinath", "Uttarakhand", "Difficult", "7D/6N"],
  ["Kalindi Khal Trek", "Gangotri", "Uttarakhand", "Expert", "14D/13N"],
  ["Lamkhaga Pass Trek", "Harsil", "Uttarakhand", "Expert", "10D/9N"],
  ["Bamsaru Khal Trek", "Govind Wildlife Sanctuary", "Uttarakhand", "Difficult", "7D/6N"],
  ["Black Peak (Kala Nag) Trek", "Sankri", "Uttarakhand", "Expert", "10D/9N"],
  ["Bandarpunch Base Camp Trek", "Yamunotri", "Uttarakhand", "Difficult", "8D/7N"],
  ["Fachi Kandi Pass Trek", "Uttarkashi", "Uttarakhand", "Difficult", "9D/8N"],
  ["Kyarkoti Trek", "Gangotri", "Uttarakhand", "Moderate", "7D/6N"],
  ["Vasuki Tal Trek", "Kedarnath", "Uttarakhand", "Moderate", "5D/4N"],
  ["Kedarnath Trek", "Gaurikund", "Uttarakhand", "Easy", "2D/1N"],
  ["Neelkanth Base Camp Trek", "Badrinath", "Uttarakhand", "Difficult", "6D/5N"],
];

const CATALOG = [...CATALOG_HP, ...CATALOG_UK];

/** Parent belt used for related-treks + filter expansion */
const BELT = {
  // Himachal
  Dharamshala: "Dharamshala",
  Kangra: "Dharamshala",
  Manali: "Manali",
  Naggar: "Manali",
  Kasol: "Parvati Valley",
  "Parvati Valley": "Parvati Valley",
  Malana: "Parvati Valley",
  Kullu: "Kullu",
  Banjar: "Banjar",
  "Jalori Pass": "Banjar",
  Jalori: "Banjar",
  Chamba: "Chamba",
  Bharmour: "Chamba",
  Kinnaur: "Kinnaur",
  Kalpa: "Kinnaur",
  Janglik: "Kinnaur",
  Sirmaur: "Sirmaur",
  Spiti: "Spiti",
  "Pin Valley": "Spiti",
  // Uttarakhand
  Sankri: "Sankri",
  Gangotri: "Gangotri",
  Uttarkashi: "Uttarkashi",
  Joshimath: "Joshimath",
  Govindghat: "Joshimath",
  Auli: "Joshimath",
  Lohajung: "Lohajung",
  Bageshwar: "Bageshwar",
  Munsiyari: "Munsiyari",
  Pithoragarh: "Pithoragarh",
  Dharchula: "Pithoragarh",
  Mussoorie: "Mussoorie",
  Dhanaulti: "Mussoorie",
  Chopta: "Chopta",
  "Sari Village": "Chopta",
  Rudraprayag: "Chopta",
  Ghuttu: "Chopta",
  Ukhimath: "Chopta",
  Gopeshwar: "Chopta",
  Helang: "Joshimath",
  Badrinath: "Badrinath",
  Harsil: "Gangotri",
  "Govind Wildlife Sanctuary": "Sankri",
  Yamunotri: "Yamunotri",
  Kedarnath: "Kedarnath",
  Gaurikund: "Kedarnath",
};

const LOCAL_IMAGES = [
  "/images/treks/mountains-1.jpg",
  "/images/treks/mountains-2.jpg",
  "/images/treks/mountains-3.jpg",
  "/images/treks/landscape-1.jpg",
  "/images/treks/landscape-2.jpg",
  "/images/treks/landscape-3.jpg",
  "/images/treks/forest-1.jpg",
  "/images/treks/forest-2.jpg",
  "/images/treks/camp-1.jpg",
  "/images/treks/meadow-1.jpg",
  "/images/treks/india-1.jpg",
  "/images/treks/hero.jpg",
];

const TITLE_ALIASES = {
  "seven lakes trek": ["saat dal trek", "saat dal"],
  "lam dal lake trek": ["lam dal trek", "lam dal"],
  "bagala nag trek": ["bagalu nag trek", "bagalu nag"],
  "pin parvati pass trek": ["pin parvati pass"],
  "friendship peak trek": ["friendship peak"],
  "hanuman tibba base camp trek": [
    "hanuman ka tibba base camp",
    "hanuman tibba base camp",
  ],
  "snowline trek": ["snowline laka trek", "snowline"],
};

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeTitle(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/[–—-]/g, " ")
    .replace(/\btrek\b/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDuration(label) {
  const m = String(label).match(/(\d+)\s*D(?:\s*\/\s*(\d+)\s*N)?/i);
  if (!m) return { days: 1, nights: 0 };
  const days = Number(m[1]) || 1;
  const nights = m[2] != null ? Number(m[2]) : Math.max(0, days - 1);
  return { days, nights };
}

function mapDifficulty(raw) {
  const v = String(raw).toLowerCase();
  if (v === "easy") return "easy";
  if (v === "moderate") return "moderate";
  if (v === "difficult") return "difficult";
  if (v === "expert") return "challenging";
  return "moderate";
}

function priceFor({ days, difficulty }) {
  const mult = { easy: 1, moderate: 1.25, difficult: 1.6, challenging: 2.1 }[difficulty] || 1.25;
  const base = Math.round((2499 + days * 1800) * mult);
  const rounded = Math.round(base / 100) * 100 - 1;
  return { basePriceInr: rounded, originalPriceInr: rounded + 2500 };
}

function altitudeFor(difficulty, days, destination, state) {
  if (/uttarakhand/i.test(state || "")) {
    if (difficulty === "challenging") return 17000 + days * 120;
    if (difficulty === "difficult") return 14000 + days * 180;
    if (difficulty === "moderate") return 11000 + days * 220;
    return 8500 + days * 250;
  }
  if (/spiti|kinnaur|kalpa|janglik|pin valley/i.test(destination)) {
    return 14000 + days * 200;
  }
  if (difficulty === "challenging") return 16000 + days * 150;
  if (difficulty === "difficult") return 13000 + days * 200;
  if (difficulty === "moderate") return 10000 + days * 250;
  return 7000 + days * 300;
}

function seasonsFor(destination, state) {
  if (/uttarakhand/i.test(state || "")) {
    if (/sankri|lohajung|munsiyari|gangotri|harsil/i.test(destination)) {
      return ["spring", "autumn", "winter"];
    }
    return ["spring", "summer", "autumn"];
  }
  if (/spiti|kinnaur|kalpa|janglik|pin valley/i.test(destination)) {
    return ["summer", "autumn"];
  }
  if (/manali|kullu|kasol|parvati|malana|naggar/i.test(destination)) {
    return ["spring", "summer", "autumn"];
  }
  return ["spring", "autumn", "summer"];
}

function monthsFor(seasons) {
  const map = {
    spring: ["March", "April", "May"],
    summer: ["June", "July", "August"],
    autumn: ["September", "October", "November"],
    winter: ["December", "January", "February"],
    monsoon: ["July", "August"],
  };
  return [...new Set(seasons.flatMap((s) => map[s] || []))];
}

function trekTypesFor(days, difficulty) {
  const types = [];
  if (days <= 2) types.push("weekend");
  if (difficulty === "challenging" || difficulty === "difficult") types.push("high-altitude");
  if (days >= 4) types.push("camping");
  if (!types.length) types.push("weekend");
  return types;
}

function suitableFor(difficulty) {
  if (difficulty === "easy") return ["family", "beginners", "couples", "solo"];
  if (difficulty === "moderate") return ["solo", "couples", "experienced"];
  return ["experienced", "solo"];
}

function buildItinerary(title, days, destination) {
  // Placeholder only — real itineraries live in scripts/data/itineraries/*.json
  // and are applied via scripts/apply-unique-itineraries.mjs. Do not use this
  // for published content.
  const shortName = title.replace(/\s*Trek$/i, "");
  return Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    return {
      day,
      title: `${shortName} — Day ${day} (draft)`,
      startLocation: destination,
      endLocation: destination,
      distanceKm: 6,
      walkingHours: "4-6 hrs",
      difficulty: "Moderate",
      trailType: "Himalayan trail",
      meals: day === 1 ? ["Lunch", "Dinner"] : day === days ? ["Breakfast", "Lunch"] : ["Breakfast", "Lunch", "Dinner"],
      accommodation: days === 1 ? "Day return" : day === days ? "Hotel / Homestay" : "Camp / Homestay",
      description: `PLACEHOLDER: Replace with a unique, trail-accurate itinerary for ${shortName} day ${day} near ${destination}.`,
      highlights: [],
      tips: [],
      images: [],
    };
  });
}

function defaultContent(entry, usedSlugs) {
  const [title, destination, state, difficultyRaw, durationLabel] = entry;
  const { days, nights } = parseDuration(durationLabel);
  const difficulty = mapDifficulty(difficultyRaw);
  const belt = BELT[destination] || destination;
  const { basePriceInr, originalPriceInr } = priceFor({ days, difficulty });
  const bestSeasons = seasonsFor(destination, state);
  const months = monthsFor(bestSeasons);
  const maxAltitude = altitudeFor(difficulty, days, destination, state);
  const distanceKm = Math.max(6, days * 7);
  const imgBase = LOCAL_IMAGES[(slugify(title).length + days) % LOCAL_IMAGES.length];
  const heroImages = [
    imgBase,
    LOCAL_IMAGES[(days + 3) % LOCAL_IMAGES.length],
    LOCAL_IMAGES[(days + 7) % LOCAL_IMAGES.length],
  ];

  let slug = slugify(title);
  if (usedSlugs.has(slug)) {
    slug = `${slug}-${slugify(destination)}`;
  }
  usedSlugs.add(slug);

  return {
    slug,
    title,
    summary: `${durationLabel} ${title} from ${destination}, ${state} — guided Himalayan experience with India Holiday Destinations.`,
    overview: `${title} is a carefully curated Himalayan trek based around ${destination} in ${state}. Rated ${difficulty} with a ${durationLabel} itinerary, this journey balances scenic walking, safe camping or homestays, and memorable mountain views. India Holiday Destinations handles permits, experienced local guides, meals on trek, and logistics so you can focus on the trail.`,
    location: `${destination}, ${state}`,
    state,
    region: belt,
    destinationName: destination,
    difficulty,
    durationDays: days,
    durationNights: nights,
    maxAltitude,
    distanceKm,
    basePriceInr,
    originalPriceInr,
    rating: 4.6 + (days % 3) * 0.1,
    reviewCount: 12 + days * 3,
    seatsLeft: 8 + (days % 5),
    badges: days <= 2 ? ["trending"] : difficulty === "challenging" ? ["limited"] : ["bestseller"],
    trekTypes: trekTypesFor(days, difficulty),
    suitableFor: suitableFor(difficulty),
    months,
    bestSeasons,
    heroImages,
    gallery: heroImages.map((src, i) => ({ src, alt: `${title} ${i + 1}`, span: "square" })),
    quickInfo: {
      destination,
      duration: durationLabel,
      maxAltitude: `${maxAltitude.toLocaleString("en-IN")} ft`,
      difficulty,
      distance: `${distanceKm} km`,
      startingPoint: destination,
      endingPoint: destination,
      bestTime: bestSeasons.join(", "),
      temperature: "Varies with altitude",
      groupSize: "8-12",
      ageLimit: "12+",
      fitnessLevel: difficulty === "easy" ? "Basic" : difficulty === "moderate" ? "Good" : "High",
      accommodation: days === 1 ? "Day trek" : "Camp / Homestay",
      meals: "As per itinerary",
      transport: "Excluded (pickup points shared after booking)",
    },
    highlights: [
      `Scenic ${destination} trailhead access`,
      `${durationLabel} guided itinerary`,
      `${difficulty} difficulty with local support`,
      "Meals and camping/homestay as per plan",
      "Experienced mountain guides",
    ],
    itinerary: buildItinerary(title, days, destination),
    inclusions: [
      "Trek leader / local guide",
      "Forest / trek permits (where applicable)",
      "Meals as per itinerary",
      days === 1 ? "Day-trek support" : "Camping / homestay stay",
      "First-aid kit & safety briefing",
    ],
    exclusions: [
      "Travel to/from base town",
      "Personal trekking gear rental (unless booked)",
      "Porter / mule charges beyond package",
      "Insurance, tips and personal expenses",
      "Anything not listed in inclusions",
    ],
    packingList: [
      { category: "Clothing", items: ["Layered trekking clothes", "Warm jacket", "Rain cover"] },
      { category: "Footwear", items: ["Trekking shoes", "Socks (2-3 pairs)"] },
      { category: "Documents", items: ["Govt ID", "Medical info"] },
      { category: "Medical", items: ["Personal medicines", "Sunscreen", "Lip balm"] },
      { category: "Accessories", items: ["Backpack 40-50L", "Water bottle", "Headlamp"] },
      { category: "Electronics", items: ["Power bank", "Camera (optional)"] },
    ],
    fitness: {
      level: difficulty === "easy" ? "Beginner friendly" : difficulty === "moderate" ? "Moderate fitness" : "Strong fitness",
      score: difficulty === "easy" ? 3 : difficulty === "moderate" ? 6 : 8,
      description: `Prepare with regular walks and stair practice before ${title}.`,
      tips: ["Walk 4-5 km daily before the trek", "Hydrate well", "Break in your shoes"],
    },
    map: {
      overview: `${title} route overview around ${destination}.`,
      camps: days > 1 ? [`Camp 1`, days > 2 ? `Camp 2` : null].filter(Boolean) : [],
      elevationNote: `Max altitude around ${maxAltitude.toLocaleString("en-IN")} ft.`,
    },
    weather: months.slice(0, 4).map((month, i) => ({
      month,
      tempMinC: 2 + i,
      tempMaxC: 14 + i,
      snowfall: /Dec|Jan|Feb/.test(month) ? "Possible" : "None",
      rainfall: /Jul|Aug/.test(month) ? "High" : "Low",
      recommended: true,
      note: `Typical conditions near ${destination} in ${month}.`,
    })),
    departures: [],
    faqs: [
      {
        question: `How difficult is ${title}?`,
        answer: `It is graded ${difficulty}. Our guides pace the group and brief you daily.`,
      },
      {
        question: "What is included?",
        answer: "Guide, permits (as applicable), meals on itinerary, and stay setup for multi-day treks.",
      },
      {
        question: "Best time to go?",
        answer: `Best seasons: ${bestSeasons.join(", ")}.`,
      },
    ],
    reviews: [],
    relatedSlugs: [],
    seo: {
      title: `${title} | ${destination}, ${state} | India Holiday Destinations`,
      description: `Book ${title} (${durationLabel}) from ${destination}, ${state}. ${difficulty} Himalayan trek with guided support.`,
      canonical: `/treks/${slug}`,
      ogImage: heroImages[0],
    },
    status: "published",
    publishedAt: new Date().toISOString(),
    popularity: 100 - days + (difficulty === "easy" ? 20 : 0),
  };
}

function pickExisting(existing, title, state) {
  const key = normalizeTitle(title);
  const aliasKeys = (TITLE_ALIASES[`${key} trek`] || TITLE_ALIASES[key] || []).map(normalizeTitle);
  const candidates = [key, ...aliasKeys];

  let best = null;
  for (const trek of existing) {
    const n = normalizeTitle(trek.title);
    if (!candidates.some((c) => n === c || n.includes(c) || c.includes(n))) continue;
    if (state && trek.state && String(trek.state) !== state) continue;
    best = trek;
    break;
  }
  if (!best) {
    for (const trek of existing) {
      const n = normalizeTitle(trek.title);
      if (candidates.some((c) => n === c || n.includes(c) || c.includes(n))) {
        best = trek;
        break;
      }
    }
  }
  return best;
}

function mergeTrek(entry, existingDoc, usedSlugs) {
  const generated = defaultContent(entry, usedSlugs);
  if (!existingDoc) return generated;

  const [title, destination, state, difficultyRaw, durationLabel] = entry;
  const { days, nights } = parseDuration(durationLabel);
  const difficulty = mapDifficulty(difficultyRaw);
  const belt = BELT[destination] || destination;
  const prices = priceFor({ days, difficulty });

  const heroImages = Array.isArray(existingDoc.heroImages) && existingDoc.heroImages.length
    ? existingDoc.heroImages.map((src) =>
        String(src).startsWith("http") ? LOCAL_IMAGES[0] : src,
      )
    : generated.heroImages;

  return {
    ...existingDoc,
    ...generated,
    summary: existingDoc.summary || generated.summary,
    overview: existingDoc.overview || generated.overview,
    highlights: existingDoc.highlights?.length ? existingDoc.highlights : generated.highlights,
    itinerary: existingDoc.itinerary?.length ? existingDoc.itinerary : generated.itinerary,
    inclusions: existingDoc.inclusions?.length ? existingDoc.inclusions : generated.inclusions,
    exclusions: existingDoc.exclusions?.length ? existingDoc.exclusions : generated.exclusions,
    packingList: existingDoc.packingList?.length ? existingDoc.packingList : generated.packingList,
    fitness: existingDoc.fitness?.level ? existingDoc.fitness : generated.fitness,
    faqs: existingDoc.faqs?.length ? existingDoc.faqs : generated.faqs,
    gallery: existingDoc.gallery?.length ? existingDoc.gallery : generated.gallery,
    quickInfo: { ...generated.quickInfo, ...(existingDoc.quickInfo || {}) },
    weather: existingDoc.weather?.length ? existingDoc.weather : generated.weather,
    map: existingDoc.map?.overview ? existingDoc.map : generated.map,
    heroImages,
    slug: generated.slug,
    title,
    location: `${destination}, ${state}`,
    state,
    region: belt,
    destinationName: destination,
    difficulty,
    durationDays: days,
    durationNights: nights,
    basePriceInr: existingDoc.basePriceInr || prices.basePriceInr,
    originalPriceInr: existingDoc.originalPriceInr || prices.originalPriceInr,
    status: "published",
    publishedAt: existingDoc.publishedAt || generated.publishedAt,
    deletedAt: null,
  };
}

function linkRelated(treks) {
  const byBelt = new Map();
  for (const trek of treks) {
    const list = byBelt.get(trek.region) || [];
    list.push(trek.slug);
    byBelt.set(trek.region, list);
  }
  return treks.map((trek) => ({
    ...trek,
    relatedSlugs: (byBelt.get(trek.region) || [])
      .filter((slug) => slug !== trek.slug)
      .slice(0, 4),
  }));
}

const existing = JSON.parse(fs.readFileSync(existingPath, "utf8"));
const usedSlugs = new Set();
const built = CATALOG.map((entry) =>
  mergeTrek(entry, pickExisting(existing, entry[0], entry[2]), usedSlugs),
);
const finalTreks = linkRelated(built);

fs.writeFileSync(outPath, `${JSON.stringify(finalTreks, null, 2)}\n`, "utf8");

const byState = finalTreks.reduce((acc, t) => {
  acc[t.state] = (acc[t.state] || 0) + 1;
  return acc;
}, {});

console.log(`Wrote ${finalTreks.length} treks → ${path.relative(root, outPath)}`);
console.log("By state:", byState);
console.log(
  "Destinations:",
  [...new Set(finalTreks.map((t) => t.destinationName))].sort().join(", "),
);
