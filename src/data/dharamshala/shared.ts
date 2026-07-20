import { img, avatar } from "@/lib/media";
import type { FAQ } from "@/types";
import type {
  PackingGroup,
  TrekDeparture,
  TrekReview,
  TrekWeatherMonth,
} from "@/types/trek-detail";

export const DHARAMSHALA_REGION = "Dharamshala";
export const DHARAMSHALA_STATE = "Himachal Pradesh";
export const DHARAMSHALA_COUNTRY = "India";
export const SITE_ORIGIN = "https://treks.indiaholidaydestination.com";

export const regionalLogistics = {
  nearestHospital:
    "Civil Hospital Dharamshala / Zonal Hospital Dharamshala; emergency support also available via local clinics in McLeod Ganj.",
  nearestAirport:
    "Gaggal (Dharamshala–Kangra) Airport (DHM), about 12–20 km depending on trailhead; Pathankot Airport as alternate.",
  nearestRailwayStation:
    "Pathankot Junction (broad gauge hub) with onward road to Dharamshala; Kangra Mandir / Nagrota Bagwan for regional rail links.",
  nearestBusStand:
    "Dharamshala Bus Stand and McLeod Ganj Bus Stand; frequent HRTC and private buses from Delhi, Chandigarh, and Pathankot.",
  roadConnectivity:
    "Well connected by NH and state highways from Pathankot, Chandigarh, and Delhi. Last-mile taxis / shared Sumos reach most trailheads (Bhagsunag, Kareri, Bir, Barot).",
  emergencyContacts: [
    { label: "India Emergency", value: "112" },
    { label: "Ambulance", value: "108" },
    { label: "Police", value: "100" },
    { label: "Trek Support Desk (placeholder)", value: "+91-XXXXXXXXXX" },
    { label: "Forest Dept. Kangra (placeholder)", value: "+91-XXXXXXXXXX" },
  ],
  cancellationPolicy:
    "Cancellations 45+ days before departure: 25% fee. 15–30 days: 50% fee. Within 0–15 days: 100% of the trek cost. For weather or government restrictions, we try to offer a viable alternative; cash refund may not be available. Approved refunds are credited to the original payment method in 10–12 working days.",
  bookingPolicy:
    "A booking is confirmed after advance payment and ID details. Full payment is due as per the schedule shared on confirmation. India Holiday Destinations reserves the right to reschedule or alter the itinerary for safety, weather, or permit reasons.",
  childPolicy:
    "Children are welcome on easier Dhauladhar trails when accompanied by a parent or guardian. Minimum age depends on the route (typically 8+ for short day hikes, 12+ for overnight alpine camps). Share ages at booking for route-specific advice.",
};

export const packingDhauladhar: PackingGroup[] = [
  {
    category: "Clothing",
    items: [
      "Moisture-wicking t-shirts (2–3)",
      "Trekking pants / convertible trousers",
      "Warm fleece or down jacket",
      "Thermals (top + bottom) for overnight camps",
      "Waterproof / windproof shell",
      "Wool socks + spare pairs",
      "Sun cap / beanie (season dependent)",
      "Waterproof gloves",
    ],
  },
  {
    category: "Footwear",
    items: [
      "Broken-in trekking shoes with good grip",
      "Camp slippers / floaters",
      "Gaiters (for snow or muddy monsoon trails)",
    ],
  },
  {
    category: "Documents",
    items: [
      "Government photo ID",
      "Booking confirmation",
      "Medical declaration / emergency contact note",
      "Cash for remote villages (ATMs thin out beyond towns)",
    ],
  },
  {
    category: "Medical",
    items: [
      "Personal prescription medicines",
      "Basic first-aid kit",
      "ORS / electrolytes",
      "Blister care (tape, moleskin)",
      "Sunscreen SPF 50+",
      "Lip balm with SPF",
    ],
  },
  {
    category: "Accessories",
    items: [
      "30–40L daypack (or as advised for multi-day)",
      "Trekking poles",
      "Headlamp + spare batteries",
      "1L+ water bottle / hydration bladder",
      "Sunglasses (UV protection)",
      "Rain cover for backpack",
      "Quick-dry towel & toiletries (biodegradable preferred)",
      "Trash bags (pack-out principle)",
    ],
  },
  {
    category: "Electronics",
    items: [
      "Phone + offline maps downloaded",
      "Power bank (10,000 mAh+)",
      "Camera (optional)",
      "Spare memory card",
    ],
  },
];

export const heroPool = [
  img("photo-1551632811-561732d1e306", 2200),
  img("photo-1500530855697-b586d89ba3ee", 2200),
  img("photo-1464822759023-fed622ff2c3b", 2200),
  img("photo-1519681393784-d120267933ba", 2200),
  img("photo-1506905925346-21bda4d32df4", 2200),
  img("photo-1478131143081-80f7f84ca84a", 2200),
  img("photo-1504280390367-361c6d9f38f4", 2200),
  img("photo-1441974231531-c6227db76b6e", 2200),
  img("photo-1511497584788-876760111969", 2200),
  img("photo-1472214103451-9374bd1c798e", 2200),
  img("photo-1626621341517-bbf3d9990a23", 2200),
  img("photo-1469474968028-56623f02e42e", 2200),
];

export function galleryFor(title: string, offset = 0) {
  const spans: Array<"wide" | "tall" | "square"> = [
    "wide",
    "tall",
    "square",
    "wide",
    "square",
    "tall",
  ];
  return Array.from({ length: 6 }, (_, i) => {
    const src = heroPool[(offset + i) % heroPool.length]!;
    return {
      src,
      alt: `${title} — Dhauladhar Range, Dharamshala region (${i + 1})`,
      span: spans[i % spans.length],
    };
  });
}

export function weatherForAltitude(maxAltitudeFt: number): TrekWeatherMonth[] {
  const high = maxAltitudeFt >= 14000;
  const mid = maxAltitudeFt >= 10000;
  const base = mid
    ? [
        { month: "Jan", tempMinC: -8, tempMaxC: 6, snowfall: "Heavy" as const, rainfall: "Low" as const, recommended: !high, note: "Deep winter; snow likely on higher trails" },
        { month: "Feb", tempMinC: -6, tempMaxC: 8, snowfall: "Likely" as const, rainfall: "Low" as const, recommended: !high, note: "Cold mornings; clear windows possible" },
        { month: "Mar", tempMinC: -2, tempMaxC: 12, snowfall: "Possible" as const, rainfall: "Low" as const, recommended: true, note: "Spring thaw begins on mid ridges" },
        { month: "Apr", tempMinC: 2, tempMaxC: 16, snowfall: "Possible" as const, rainfall: "Low" as const, recommended: true, note: "Excellent visibility before monsoon" },
        { month: "May", tempMinC: 6, tempMaxC: 20, snowfall: "None" as const, rainfall: "Low" as const, recommended: true, note: "Prime pre-monsoon season" },
        { month: "Jun", tempMinC: 8, tempMaxC: 22, snowfall: "None" as const, rainfall: "Moderate" as const, recommended: true, note: "Early June preferred before heavy rain" },
        { month: "Jul", tempMinC: 10, tempMaxC: 20, snowfall: "None" as const, rainfall: "High" as const, recommended: false, note: "Monsoon — leeches, slips, landslides risk" },
        { month: "Aug", tempMinC: 10, tempMaxC: 20, snowfall: "None" as const, rainfall: "High" as const, recommended: false, note: "Wet trails; only experienced parties" },
        { month: "Sep", tempMinC: 6, tempMaxC: 18, snowfall: "None" as const, rainfall: "Moderate" as const, recommended: true, note: "Post-monsoon clarity returns" },
        { month: "Oct", tempMinC: 2, tempMaxC: 16, snowfall: "Possible" as const, rainfall: "Low" as const, recommended: true, note: "Best autumn window for high passes" },
        { month: "Nov", tempMinC: -2, tempMaxC: 12, snowfall: "Possible" as const, rainfall: "Low" as const, recommended: true, note: "Crisp days; nights freeze higher up" },
        { month: "Dec", tempMinC: -6, tempMaxC: 8, snowfall: "Likely" as const, rainfall: "Low" as const, recommended: mid && !high, note: "Snow approaches; short daylight" },
      ]
    : [
        { month: "Jan", tempMinC: -2, tempMaxC: 12, snowfall: "Possible" as const, rainfall: "Low" as const, recommended: true, note: "Cold but doable for lower trails" },
        { month: "Feb", tempMinC: 0, tempMaxC: 14, snowfall: "Possible" as const, rainfall: "Low" as const, recommended: true, note: "Winter sunshine on south-facing slopes" },
        { month: "Mar", tempMinC: 4, tempMaxC: 18, snowfall: "None" as const, rainfall: "Low" as const, recommended: true, note: "Pleasant spring hiking" },
        { month: "Apr", tempMinC: 8, tempMaxC: 22, snowfall: "None" as const, rainfall: "Low" as const, recommended: true, note: "Ideal for beginners" },
        { month: "May", tempMinC: 12, tempMaxC: 26, snowfall: "None" as const, rainfall: "Low" as const, recommended: true, note: "Warm days; carry sun protection" },
        { month: "Jun", tempMinC: 14, tempMaxC: 26, snowfall: "None" as const, rainfall: "Moderate" as const, recommended: true, note: "Pre-monsoon humidity rises" },
        { month: "Jul", tempMinC: 16, tempMaxC: 24, snowfall: "None" as const, rainfall: "High" as const, recommended: false, note: "Heavy rain; waterfall trails slippery" },
        { month: "Aug", tempMinC: 16, tempMaxC: 24, snowfall: "None" as const, rainfall: "High" as const, recommended: false, note: "Monsoon peaks — choose carefully" },
        { month: "Sep", tempMinC: 12, tempMaxC: 22, snowfall: "None" as const, rainfall: "Moderate" as const, recommended: true, note: "Forests turn lush and clear" },
        { month: "Oct", tempMinC: 8, tempMaxC: 20, snowfall: "None" as const, rainfall: "Low" as const, recommended: true, note: "Classic Dharamshala trekking month" },
        { month: "Nov", tempMinC: 4, tempMaxC: 16, snowfall: "None" as const, rainfall: "Low" as const, recommended: true, note: "Cool evenings; great photography light" },
        { month: "Dec", tempMinC: 0, tempMaxC: 12, snowfall: "Possible" as const, rainfall: "Low" as const, recommended: true, note: "Frosty mornings on ridges" },
      ];
  return base;
}

export function departuresFor(
  prefix: string,
  priceInr: number,
  dates: string[],
): TrekDeparture[] {
  const statuses: TrekDeparture["status"][] = ["open", "filling", "open", "almost-full", "open"];
  return dates.map((date, i) => ({
    id: `${prefix}-d${i + 1}`,
    date,
    seats: [18, 12, 16, 6, 14][i % 5]!,
    priceInr,
    status: statuses[i % statuses.length]!,
  }));
}

export function sampleReviews(
  prefix: string,
  title: string,
  comments: [string, string, string],
): TrekReview[] {
  const names = ["Ananya Mehta", "Rohit Sharma", "Priya Nair", "Kabir Singh", "Meera Joshi"];
  return comments.map((comment, i) => ({
    id: `${prefix}-r${i + 1}`,
    name: names[i]!,
    photo: avatar(i),
    rating: i === 1 ? 4 : 5,
    date: ["2026-03-12", "2026-04-02", "2026-05-18"][i]!,
    comment: comment.replace(/\{title\}/g, title),
    verified: true,
    helpfulCount: 12 + i * 9,
  }));
}

export function buildFaqs(input: {
  idPrefix: string;
  title: string;
  difficulty: string;
  duration: string;
  distanceKm: number;
  maxAltitudeLabel: string;
  startingPoint: string;
  bestTime: string;
  network: string;
  permits: string;
  water: string;
  camping: string;
  fitness: string;
  nearestTown: string;
  uniqueExtra: Array<{ q: string; a: string; category?: string }>;
}): FAQ[] {
  const { idPrefix: p, title: t } = input;
  const base: FAQ[] = [
    {
      id: `${p}-f1`,
      question: `What is the difficulty level of the ${t}?`,
      answer: `This route is rated ${input.difficulty}. ${input.fitness}`,
      category: "trek",
    },
    {
      id: `${p}-f2`,
      question: `How long does the ${t} take?`,
      answer: `The standard package is ${input.duration}. Actual walking time varies with fitness, weather, and trail conditions.`,
      category: "trek",
    },
    {
      id: `${p}-f3`,
      question: `What is the total trekking distance for ${t}?`,
      answer: `Expect roughly ${input.distanceKm} km of walking across the itinerary (out-and-back or point-to-point depending on the route plan).`,
      category: "trek",
    },
    {
      id: `${p}-f4`,
      question: `What is the maximum altitude on ${t}?`,
      answer: `The highest point is about ${input.maxAltitudeLabel}. Ascend steadily, hydrate, and tell your guide if you feel altitude-related symptoms on higher Dhauladhar routes.`,
      category: "trek",
    },
    {
      id: `${p}-f5`,
      question: `Where does the ${t} start?`,
      answer: `The usual starting point is ${input.startingPoint}. Arrive the evening before when the itinerary begins early.`,
      category: "general",
    },
    {
      id: `${p}-f6`,
      question: `When is the best time for ${t}?`,
      answer: input.bestTime,
      category: "trek",
    },
    {
      id: `${p}-f7`,
      question: `Is mobile network available on ${t}?`,
      answer: input.network,
      category: "trek",
    },
    {
      id: `${p}-f8`,
      question: `Do I need permits for ${t}?`,
      answer: input.permits,
      category: "booking",
    },
    {
      id: `${p}-f9`,
      question: `Is drinking water available on the ${t} trail?`,
      answer: input.water,
      category: "trek",
    },
    {
      id: `${p}-f10`,
      question: `Where do we camp or stay on ${t}?`,
      answer: input.camping,
      category: "trek",
    },
    {
      id: `${p}-f11`,
      question: `Can beginners attempt the ${t}?`,
      answer: `It depends on the grade. ${input.fitness} If you are new to the Himalayas, choose a guided departure and prepare with regular walks carrying a daypack.`,
      category: "trek",
    },
    {
      id: `${p}-f12`,
      question: `How do I reach the trailhead for ${t}?`,
      answer: `Fly into Gaggal (DHM) or take a train to Pathankot, then road transfer to ${input.nearestTown}. Local taxis and shared jeeps cover the final approach to ${input.startingPoint}.`,
      category: "general",
    },
    {
      id: `${p}-f13`,
      question: `What should I pack for ${t}?`,
      answer:
        "Carry layered clothing, broken-in trekking shoes, rain shell, headlamp, sunscreen, personal medicines, and a power bank. A detailed packing list is provided on this page and with your booking confirmation.",
      category: "trek",
    },
    {
      id: `${p}-f14`,
      question: `Is ${t} safe for solo travellers?`,
      answer:
        "Guided group departures are the safest option for solo travellers in the Dhauladhar. Trails can be remote, weather changes fast, and night navigation is risky without local knowledge.",
      category: "safety",
    },
    {
      id: `${p}-f15`,
      question: "What is the cancellation and refund policy?",
      answer: regionalLogistics.cancellationPolicy,
      category: "cancellation",
    },
    {
      id: `${p}-f16`,
      question: `Are meals included on the ${t}?`,
      answer:
        "Trek-day meals are included as listed in the package inclusions (typically vegetarian). Confirm dietary needs when you book so the kitchen team can plan.",
      category: "booking",
    },
    {
      id: `${p}-f17`,
      question: `What medical facilities are near ${t}?`,
      answer: `Basic clinics exist in ${input.nearestTown}. For serious emergencies, evacuation aims for Civil / Zonal Hospital Dharamshala. Carry personal medication and inform us of any conditions before departure.`,
      category: "safety",
    },
  ];

  const extras = input.uniqueExtra.map((item, i) => ({
    id: `${p}-fx${i + 1}`,
    question: item.q,
    answer: item.a,
    category: (item.category ?? "trek") as FAQ["category"],
  }));

  return [...base, ...extras];
}

export const defaultThingsNotToCarry = [
  "Single-use plastics beyond reusable bottles",
  "Heavy jeans or cotton-heavy clothing for multi-day wet weather",
  "Unnecessary valuables and excess jewellery",
  "Alcohol and recreational drugs",
  "Drones without valid permits",
  "Loud speakers / music systems in forest camps",
];

export const defaultSafetyGuidelines = [
  "Stay on marked trails and follow your trek leader’s briefings.",
  "Turn back early if weather deteriorates — Dhauladhar storms build quickly.",
  "Never wander alone after dark near cliffs, snow patches, or stream crossings.",
  "Tell your guide immediately about headache, nausea, dizziness, or chest pain.",
  "Carry trash back to town; do not bury food waste near alpine lakes.",
  "Respect local temples, grazing meadows, and village privacy.",
];

export const defaultResponsibleTourism = [
  "Leave no trace — pack out all non-biodegradable waste.",
  "Use designated camping zones and toilet practices advised by your guide.",
  "Support local porters, mules, and homestays fairly.",
  "Keep noise low around wildlife and sacred sites.",
  "Avoid picking wildflowers or disturbing alpine scrub.",
  "Refill bottles at safe sources instead of buying packaged water when possible.",
];
