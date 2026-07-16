/**
 * One-time content generator for Dharamshala trek seeds.
 * Run: node scripts/generate-dharamshala-treks.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../src/data/dharamshala");

/** @typedef {{
 *  slug: string;
 *  title: string;
 *  shortName: string;
 *  destinationName: string;
 *  difficulty: "easy"|"moderate"|"challenging"|"difficult";
 *  durationDays: number;
 *  durationNights: number;
 *  distanceKm: number;
 *  maxAltitudeFt: number;
 *  startingPoint: string;
 *  endingPoint: string;
 *  basePriceInr: number;
 *  originalPriceInr: number;
 *  rating: number;
 *  reviewCount: number;
 *  seatsLeft: number;
 *  popularity: number;
 *  bestSeasons: string[];
 *  months: string[];
 *  trekTypes: string[];
 *  suitableFor: string[];
 *  badges: string[];
 *  ageLimit: string;
 *  groupSize: string;
 *  accommodation: string;
 *  meals: string;
 *  transport: string;
 *  temperature: string;
 *  bestTime: string;
 *  fitnessLevel: string;
 *  fitnessScore: number;
 *  fitnessDescription: string;
 *  fitnessTips: string[];
 *  lat: number;
 *  lng: number;
 *  summary: string;
 *  overview: string[];
 *  highlights: string[];
 *  itinerary: Array<{
 *    day: number; title: string; distanceKm?: number; altitudeFt?: number;
 *    walkingHours: string; meals: string[]; accommodation: string; description: string;
 *  }>;
 *  inclusions: string[];
 *  exclusions: string[];
 *  mapOverview: string;
 *  camps: string[];
 *  elevationNote: string;
 *  flora: string;
 *  fauna: string;
 *  photographySpots: string[];
 *  campingLocations: string[];
 *  waterSources: string;
 *  network: string;
 *  electricity: string;
 *  atm: string;
 *  medical: string;
 *  permits: string;
 *  forestPermissions: string;
 *  nearbyAttractions: string[];
 *  relatedSlugs: string[];
 *  nearbyTreks: string[];
 *  travelTips: string[];
 *  uniqueFaqs: Array<{q:string;a:string;category?:string}>;
 *  reviewComments: [string,string,string];
 *  departureDates: string[];
 *  thingsToCarry: string[];
 *  privateDepartureInfo: string;
 *  groupDiscountNote: string;
 * }} Seed */

/** @type {Seed[]} */
const seeds = [
  {
    slug: "snowline-trek",
    title: "Snowline Trek",
    shortName: "Snowline",
    destinationName: "McLeod Ganj",
    difficulty: "easy",
    durationDays: 2,
    durationNights: 1,
    distanceKm: 18,
    maxAltitudeFt: 10499,
    startingPoint: "Bhagsunag, McLeod Ganj",
    endingPoint: "Bhagsunag, McLeod Ganj",
    basePriceInr: 1999,
    originalPriceInr: 2499,
    rating: 4.7,
    reviewCount: 512,
    seatsLeft: 14,
    popularity: 94,
    bestSeasons: ["spring", "autumn", "winter"],
    months: ["March", "April", "May", "September", "October", "November", "December"],
    trekTypes: ["weekend", "camping", "photography", "snow"],
    suitableFor: ["solo", "couples", "beginners", "experienced"],
    badges: ["trending", "new"],
    ageLimit: "10+ years (with guardians)",
    groupSize: "Join a group | Daily seasonal departures",
    accommodation: "Alpine camping near Snowline / Lahesh approach",
    meals: "Veg dinner, breakfast & trail snacks as per package",
    transport: "Self-arrange to Bhagsunag; mule support optional on request",
    temperature: "-2°C to 18°C (season dependent)",
    bestTime: "March–May and September–November; winter for snow seekers",
    fitnessLevel: "Easy to moderate — steady uphill beyond Triund",
    fitnessScore: 55,
    fitnessDescription:
      "Snowline sits above Triund on steeper, rockier ground. Beginners with good stamina manage it when they start early and pace themselves.",
    fitnessTips: [
      "Practice 4–5 km walks with a daypack for two weeks before departure.",
      "Use trekking poles on the rocky climb past Triund.",
      "Start early from Bhagsunag to avoid afternoon cloud on the ridge.",
    ],
    lat: 32.2615,
    lng: 76.3482,
    summary:
      "Snowline Trek above Triund — climb past the popular ridge to the first permanent snow patches of the Dhauladhar with Indrahar Pass views. From ₹1,999.",
    overview: [
      "The Snowline Trek is the classic next step after Triund for travellers who want a true alpine feel without committing to a full Indrahar Pass crossing. From Bhagsunag you climb through oak and rhododendron, crest the Triund ridge, then continue toward the snow-stained scree where the Dhauladhar walls rise abruptly.",
      "On clear days the ridge reveals a sweeping line of peaks and the notch of Indrahar Pass. Winter and early spring often paint the upper path white; late autumn brings razor-clear views and cold nights. This itinerary is designed for India Holiday Destinations guests seeking a weekend-friendly Dharamshala adventure with guided camping support.",
      "Expect a mix of forest trail, open meadow, and rocky alpine approach. The last stretch above Triund is steeper and more exposed to wind, so layering and an early start matter as much as raw fitness.",
    ],
    highlights: [
      "Continue beyond crowded Triund to quieter Snowline terrain",
      "Close-up views toward Indrahar Pass and Dhauladhar ice walls",
      "Sunrise and sunset light on the Kangra Valley below",
      "Guided camping with meals on a short Himalayan itinerary",
      "Ideal bridge trek before attempting Lahesh Cave or Indrahar Pass",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bhagsunag to Snowline via Triund",
        distanceKm: 10,
        altitudeFt: 10499,
        walkingHours: "5–7 hrs",
        meals: ["Evening tea", "Dinner"],
        accommodation: "Camping near Snowline",
        description:
          "Meet at Bhagsunag, trek past Maggic / Galu sections toward Triund, then continue on the rockier path to Snowline. Pitch camp with Dhauladhar walls for a backdrop and settle in for a cold, starry night.",
      },
      {
        day: 2,
        title: "Snowline exploration and descend to Bhagsunag",
        distanceKm: 8,
        altitudeFt: 9350,
        walkingHours: "4–6 hrs",
        meals: ["Breakfast"],
        accommodation: "Trek ends at Bhagsunag",
        description:
          "Optional short walk toward Lahesh approach viewpoints after breakfast, then descend via Triund to Bhagsunag by afternoon. Celebrate with café time in McLeod Ganj.",
      },
    ],
    inclusions: [
      "Qualified local trek leader and support staff",
      "Camping equipment (tents, sleeping mats as per package)",
      "Dinner and breakfast on trek days as listed",
      "Forest / camping permissions arranged where required",
      "Basic first-aid kit with the trek team",
    ],
    exclusions: [
      "Transport to / from Bhagsunag",
      "Personal porters or mules (available on request)",
      "Lunch, bottled water, and café meals in town",
      "Personal trekking gear and insurance",
      "Anything not mentioned in inclusions",
    ],
    mapOverview:
      "Out-and-back from Bhagsunag (approx. 32.24°N, 76.35°E) via Triund ridge to Snowline (~32.26°N, 76.35°E). Google Map coordinates placeholder for CMS map embed.",
    camps: ["Triund rest stop", "Snowline camp"],
    elevationNote:
      "Gain roughly 1,400–1,600 m from Bhagsunag to Snowline. The final kilometre is the steepest and most windswept.",
    flora: "Ban oak, rhododendron, deodar lower down; alpine scrub and sparse herbs near Snowline.",
    fauna: "Himalayan monal and other pheasants in forest belts; occasional Himalayan goral on steep grass slopes; langurs near village edges.",
    photographySpots: [
      "Triund ridge looking into Kangra Valley",
      "Snowline amphitheatre toward Indrahar",
      "Night sky from camp when clouds clear",
      "Golden hour on Dhauladhar ice flutings",
    ],
    campingLocations: ["Designated Snowline camping shelf", "Backup Karthani / Triund zone if weather turns"],
    waterSources: "Carry 2L from Bhagsunag/Triund. Seasonal seeps exist but are not reliable in peak winter freeze.",
    network: "Patchy Jio/Airtel till Triund; usually none at Snowline. Inform family before leaving McLeod Ganj.",
    electricity: "No charging points on the trail. Carry a full power bank.",
    atm: "ATMs in McLeod Ganj and Dharamshala only — withdraw before the trek.",
    medical: "Basic first aid with guide; nearest clinics in McLeod Ganj; hospital in Dharamshala.",
    permits: "Forest camping permissions as applicable; arranged for booked packages when overnight camping is allowed.",
    forestPermissions: "Overnight stays must follow Himachal forest / local authority guidelines for the Triund–Snowline corridor.",
    nearbyAttractions: ["Bhagsu Waterfall", "McLeod Ganj monasteries", "Dal Lake (Naddi side)", "St. John in the Wilderness"],
    relatedSlugs: ["triund-trek", "laka-glacier-trek", "lahesh-cave-trek", "indrahar-pass-trek"],
    nearbyTreks: ["Triund Trek", "Laka Glacier Trek", "Lahesh Cave Trek", "Indrahar Pass Trek"],
    travelTips: [
      "Acclimatise with a short walk in McLeod Ganj the evening before.",
      "Carry microspikes in late winter if ice is reported above Triund.",
      "Book weekdays if you want quieter camps than weekend Triund crowds.",
    ],
    uniqueFaqs: [
      {
        q: "Is Snowline the same as Laka Glacier?",
        a: "Snowline is the alpine zone above Triund where snow often persists. Laka Glacier / Laka Got sits further along the same corridor toward Indrahar Pass — a longer and colder outing.",
      },
      {
        q: "Can I do Snowline as a day hike?",
        a: "Strong hikers sometimes tag Snowline as a long day from Bhagsunag, but overnight camping gives safer timing and better light for photography.",
      },
    ],
    reviewComments: [
      "Snowline felt like the real mountains after Triund — cold, dramatic, and perfectly guided.",
      "Steeper than we expected past Triund, but the Indrahar views were worth every step.",
      "Great weekend trek with India Holiday Destinations. Camp food was simple and hot when we needed it.",
    ],
    departureDates: ["2026-09-12", "2026-09-19", "2026-09-26", "2026-10-03", "2026-10-10"],
    thingsToCarry: ["Warm sleeping layer", "Trekking poles", "Sunglasses for snow glare", "Extra batteries for headlamp"],
    privateDepartureInfo:
      "Private departures available for families and small groups — custom dates subject to guide and permit availability.",
    groupDiscountNote: "Group discount available for 6+ confirmed travellers on the same departure.",
  },
];

// Remaining treks defined compactly then expanded
const more = [
  ["laka-glacier-trek", "Laka Glacier Trek", "Laka Glacier", "McLeod Ganj", "moderate", 3, 2, 22, 11480, "Bhagsunag", "Bhagsunag", 2899, 3499, 4.8, 388, "Continue past Snowline to Laka Got — glacial cirque, Lahesh Cave approach, and Indrahar Pass walls on a 3D/2N Dhauladhar classic."],
  ["indrahar-pass-trek", "Indrahar Pass Trek", "Indrahar Pass", "McLeod Ganj", "challenging", 4, 3, 32, 14250, "Bhagsunag / Dharamkot", "Chamba side or return via McLeod", 8999, 10999, 4.9, 276, "Cross the iconic Indrahar Pass (≈4,342 m) on the Dhauladhar divide between Kangra and Chamba — serious altitude, scree, and huge Himalayan views."],
  ["kareri-village-trek", "Kareri Village Trek", "Kareri Village", "Dharamshala", "easy", 1, 0, 8, 5900, "Ghera / near Kareri roadhead", "Kareri Village", 999, 1299, 4.5, 210, "A gentle cultural walk into Kareri Village — Gaddi homes, terraced fields, and the gateway trail toward Kareri Lake."],
  ["minkiani-pass-trek", "Minkiani Pass Trek", "Minkiani Pass", "Dharamshala", "challenging", 5, 4, 40, 13900, "Kareri Village", "Chamba / return via Kareri", 11999, 13999, 4.8, 142, "A demanding Dhauladhar crossing above Kareri Lake via Minkiani Pass — remote meadows, high camps, and few crowds."],
  ["guna-devi-trek", "Guna Devi Trek", "Guna Devi", "Dharamkot", "easy", 1, 0, 6, 6900, "Dharamkot / Gallu Devi", "Guna Devi Temple", 799, 999, 4.6, 468, "Short sacred ridge walk from Dharamkot to Guna Devi Temple with pine forests and valley views — perfect half-day acclimatisation hike."],
  ["bhagsu-waterfall-trek", "Bhagsu Waterfall Trek", "Bhagsu Waterfall", "McLeod Ganj", "easy", 1, 0, 3, 6200, "Bhagsunag Temple", "Bhagsu Waterfall", 499, 699, 4.4, 980, "The classic McLeod Ganj waterfall walk — cafés, temple steps, and a cool plunge-pool amphitheatre under the Dhauladhar foothills."],
  ["dharamkot-trek", "Dharamkot Trek", "Dharamkot", "McLeod Ganj", "easy", 1, 0, 5, 6900, "McLeod Ganj", "Dharamkot / Gallu", 699, 899, 4.5, 320, "Village-to-ridge wandering above McLeod Ganj through Dharamkot trails — cafés, pine shade, and warm-up paths for bigger Dhauladhar routes."],
  ["naddi-trek", "Naddi Trek", "Naddi", "Dharamshala", "easy", 1, 0, 4, 6400, "Dharamshala / Forsyth Ganj", "Naddi Viewpoint", 599, 799, 4.4, 256, "Easy viewpoint walk to Naddi for Dhauladhar panoramas, Dal Lake side trails, and sunset photography without a heavy backpack."],
  ["dal-lake-trail", "Dal Lake Trail", "Dal Lake", "Naddi", "easy", 1, 0, 3, 6000, "Naddi / Forsyth Ganj", "Dal Lake", 499, 699, 4.3, 412, "A peaceful forest-and-meadow stroll to Dharamshala’s Dal Lake — deodars, local picnics, and soft hills under the high Dhauladhar wall."],
  ["hanuman-ka-tibba-base-camp", "Hanuman Ka Tibba Base Camp", "Hanuman Ka Tibba BC", "Dharamshala / Bharmour approach", "challenging", 6, 5, 55, 15500, "Bharmour / designated roadhead", "Base camp below Hanuman Tibba approaches", 24999, 28999, 4.9, 96, "Expedition-style approach toward Hanuman Ka Tibba (Friendship Peak massif region logistics vary) with high camps, glacier travel briefing, and serious mountain days."],
  ["hanuman-ka-tibba-expedition", "Hanuman Ka Tibba Expedition", "Hanuman Ka Tibba", "Manali–Dhauladhar approaches", "difficult", 8, 7, 70, 19300, "Manali / Solang / designated BC", "Summit attempt & descend", 45999, 51999, 4.9, 64, "Guided mountaineering expedition aiming for Hanuman Ka Tibba — ropework, glacier travel, summit window, and full expedition support."],
  ["moon-peak-trek", "Moon Peak Trek", "Moon Peak", "Dharamshala", "challenging", 4, 3, 28, 15200, "Triund / Lahesh corridor", "Moon Peak viewpoint / return", 12999, 14999, 4.8, 88, "A technical-leaning alpine push in the Dhauladhar above the Triund–Indrahar belt toward Moon Peak viewpoints — for experienced trekkers only."],
  ["dhauladhar-base-camp-trek", "Dhauladhar Base Camp Trek", "Dhauladhar Base Camp", "Dharamshala", "moderate", 4, 3, 30, 12500, "Bhagsunag or Kareri (route dependent)", "High meadow base camp", 7999, 9499, 4.7, 174, "Multi-day camping under the main Dhauladhar wall — meadows, high pastures, and a non-pass base-camp style itinerary for photographers and ridge lovers."],
  ["lam-dal-trek", "Lam Dal Trek", "Lam Dal", "Chamba / Bharmour side", "challenging", 6, 5, 48, 12800, "Bharmour / Hadsar region", "Lam Dal alpine lake", 15999, 18499, 4.8, 120, "Pilgrim-meets-alpine trek to sacred Lam Dal in the Dhauladhar–Manimahesh hinterland — high meadows, glacial lakes, and remote camps."],
  ["saat-dal-trek", "Saat Dal Trek", "Saat Dal", "Chamba hinterland", "challenging", 7, 6, 55, 13200, "Bharmour region roadhead", "Saat Dal lake cluster", 16999, 19499, 4.8, 78, "Explore the Saat Dal (seven lakes) circuit in the high Dhauladhar — multi-lake camping, cold nights, and few commercial groups."],
  ["nag-dal-trek", "Nag Dal Trek", "Nag Dal", "Chamba / Dhauladhar", "challenging", 5, 4, 42, 12600, "Local roadhead near Bharmour belt", "Nag Dal", 13999, 15999, 4.7, 70, "High-altitude lake trek to Nag Dal — serpentine meadows, icy shores, and a quieter alternative to busier Himachal lake trails."],
  ["kali-kund-trek", "Kali Kund Trek", "Kali Kund", "Dharamshala region", "moderate", 3, 2, 20, 11800, "Regional trailhead (seasonal)", "Kali Kund", 6999, 8499, 4.6, 92, "Visit the sacred Kali Kund water body in the Dhauladhar folds — forest approach, alpine scrub, and a spiritually charged high camp."],
  ["lahesh-cave-trek", "Lahesh Cave Trek", "Lahesh Cave", "McLeod Ganj", "moderate", 3, 2, 24, 11500, "Bhagsunag", "Lahesh Cave / return", 3499, 4199, 4.8, 340, "Trek beyond Snowline to the legendary Lahesh Cave — natural rock shelter, Indrahar staging ground, and one of Dharamshala’s most atmospheric camps."],
  ["gaj-pass-trek", "Gaj Pass Trek", "Gaj Pass", "Kangra–Chamba", "challenging", 6, 5, 50, 14100, "Kangra / Gaj valley approach", "Pass crossing / Chamba side", 14999, 17499, 4.7, 58, "Remote Gaj Pass crossing linking Kangra drainages with Chamba — long days, shepherd trails, and serious navigation."],
  ["chobia-pass-trek", "Chobia Pass Trek", "Chobia Pass", "Bharmour–Lahaul", "difficult", 8, 7, 75, 16700, "Bharmour / Kugti side", "Lahaul side descent", 27999, 31999, 4.9, 44, "High Chobia Pass expedition across wild Dhauladhar–Pir Panjal connecting terrain — for seasoned expedition teams only."],
  ["kugti-pass-trek", "Kugti Pass Trek", "Kugti Pass", "Bharmour", "challenging", 7, 6, 60, 16500, "Kugti Village", "Lahaul / return options", 24999, 28999, 4.8, 52, "Classic Kugti Pass traverse from the sacred Kugti valley — temples, high pastures, and a demanding alpine crossing."],
  ["jalsu-pass-trek", "Jalsu Pass Trek", "Jalsu Pass", "Kangra–Chamba", "challenging", 5, 4, 45, 11800, "Baijnath / Billing–Rajgundha approaches", "Chamba side via Jalsu", 12999, 14999, 4.7, 110, "Cross Jalsu Pass between Kangra and Chamba — shepherd highways, big meadow camps, and a storied trade-and-pilgrim route."],
  ["thamsar-pass-trek", "Thamsar Pass Trek", "Thamsar Pass", "Bara Bhangal", "difficult", 9, 8, 85, 16200, "Rajgundha / Bara Bhangal approaches", "Thamsar Pass & beyond", 29999, 34999, 4.9, 38, "One of Himachal’s great wilderness crossings via Thamsar Pass toward Bara Bhangal — remote, long, and unforgettable."],
  ["rajgundha-trek", "Rajgundha Trek", "Rajgundha", "Bir Billing", "moderate", 3, 2, 24, 9800, "Billing / Bir", "Rajgundha Village", 5499, 6499, 4.7, 286, "Meadow trek from the Bir Billing paragliding hills into quiet Rajgundha — pine forests, Gaddi culture, and wide Dhauladhar views."],
  ["bir-billing-to-rajgundha-trek", "Bir Billing to Rajgundha Trek", "Bir to Rajgundha", "Bir Billing", "moderate", 2, 1, 18, 9800, "Billing ridge", "Rajgundha", 3999, 4799, 4.6, 198, "The popular Bir Billing to Rajgundha walk — paraglider skies behind you, forest trails ahead, and a riverside village camp."],
  ["barot-valley-trek", "Barot Valley Trek", "Barot Valley", "Barot", "easy", 2, 1, 12, 7500, "Barot town", "Valley meadows / return", 2999, 3599, 4.5, 164, "Gentle valley hiking around Barot — Uhl river, trout country, deodar forests, and soft trails ideal for families."],
  ["chhota-bhanghal-trek", "Chhota Bhanghal Trek", "Chhota Bhanghal", "Barot–Bhanghal", "moderate", 4, 3, 35, 10500, "Barot / Poling approaches", "Chhota Bhanghal villages", 8999, 10499, 4.6, 72, "Explore Chhota Bhanghal’s lesser-known valleys — village trails, river crossings, and authentic mid-Himalayan culture."],
  ["bara-bhangal-trek", "Bara Bhangal Trek", "Bara Bhangal", "Bara Bhangal", "difficult", 10, 9, 95, 15000, "Billing–Rajgundha or Mandi approaches", "Bara Bhangal Village", 34999, 39999, 4.9, 48, "Legendary trek to one of India’s most remote inhabited villages — multi-pass wilderness, self-sufficient camping, and profound isolation."],
  ["arthurs-seat-trek", "Arthur's Seat Trek", "Arthur's Seat", "Dharamshala", "easy", 1, 0, 5, 7200, "McLeod Ganj / Dharamkot trails", "Arthur's Seat viewpoint", 699, 899, 4.5, 188, "Quiet viewpoint hike to Arthur’s Seat above the McLeod–Dharamkot belt — forest shade and a classic Kangra Valley overlook."],
  ["camel-peak-trek", "Camel Peak Trek", "Camel Peak", "Dharamshala", "moderate", 2, 1, 14, 9800, "Triund belt approaches", "Camel Peak viewpoint", 2499, 2999, 4.6, 102, "Ridge trek toward Camel Peak profiles on the Dhauladhar skyline — photographic rock shapes and airy meadow walks."],
  ["rifle-horn-trek", "Rifle Horn Trek", "Rifle Horn", "Dharamshala", "challenging", 3, 2, 20, 12000, "Upper Dharamshala alpine approaches", "Rifle Horn ridge", 7999, 9499, 4.7, 66, "Airy ridge day toward Rifle Horn — exposure, scree, and dramatic Dhauladhar architecture for sure-footed trekkers."],
  ["ilaqa-got-trek", "Ilaqa Got Trek", "Ilaqa Got", "Dharamshala", "moderate", 3, 2, 22, 11200, "Kareri / Dhauladhar pasture approaches", "Ilaqa Got meadow", 5999, 6999, 4.6, 84, "High pasture trek to Ilaqa Got — Gaddi herding grounds, wildflowers in season, and quiet camping under granite walls."],
  ["reoti-trek", "Reoti Trek", "Reoti", "Kangra foothills", "easy", 1, 0, 7, 5500, "Local Kangra foothill roadhead", "Reoti area trails", 899, 1199, 4.4, 96, "Lesser-known foothill walk near the wider Dharamshala–Kangra belt — villages, streams, and soft forest gradients."],
  ["tatwani-trek", "Tatwani Trek", "Tatwani", "Kangra", "easy", 1, 0, 6, 4800, "Tatwani roadhead", "Tatwani hot springs", 999, 1299, 4.5, 220, "Combine an easy valley walk with Tatwani’s natural hot springs — perfect recovery day after harder Dhauladhar treks."],
  ["kunal-pathri-trek", "Kunal Pathri Trek", "Kunal Pathri", "Dharamshala", "easy", 1, 0, 5, 6500, "Kunal Pathri Temple approach", "Kunal Pathri", 799, 999, 4.5, 175, "Sacred hill walk to Kunal Pathri Temple — pine forests, local pilgrims, and a serene half-day outing from Dharamshala."],
  ["chamunda-trek", "Chamunda Trek", "Chamunda", "Kangra", "easy", 1, 0, 4, 3500, "Chamunda Devi Temple area", "Hill trails around Chamunda", 599, 799, 4.4, 310, "Temple-town trails around Chamunda Devi on the Baner river — spiritual atmosphere with light hillside walking."],
  ["aghanjar-mahadev-trek", "Aghanjar Mahadev Trek", "Aghanjar Mahadev", "Kangra", "easy", 1, 0, 5, 4200, "Near Gaggal / Kangra approaches", "Aghanjar Mahadev Temple", 699, 899, 4.5, 148, "Forest walk to Aghanjar Mahadev — ancient Shiva shrine set among trees, ideal for a quiet cultural half-day near the airport belt."],
  ["galu-devi-trek", "Galu Devi Trek", "Galu Devi", "Dharamkot", "easy", 1, 0, 4, 7000, "Dharamkot", "Galu Devi Temple", 699, 899, 4.6, 390, "Popular short climb from Dharamkot to Galu Devi — prayer flags, café culture, and the classic start toward Triund."],
  ["bagalu-nag-trek", "Bagalu Nag Trek", "Bagalu Nag", "Dharamshala foothills", "easy", 1, 0, 6, 5800, "Local foothill trailhead", "Bagalu Nag temple area", 799, 999, 4.3, 80, "Quiet temple trail in the Dharamshala foothills — village paths, seasonal streams, and few tourist crowds."],
  ["kareri-to-triund-traverse", "Kareri to Triund Traverse", "Kareri–Triund", "Dharamshala", "challenging", 4, 3, 36, 11000, "Kareri Village", "Bhagsunag / Triund", 9999, 11999, 4.8, 56, "Ambitious high traverse linking Kareri Lake country with the Triund ridge — navigation, stamina, and big Dhauladhar exposure."],
  ["toral-pass-trek", "Toral Pass Trek", "Toral Pass", "Dhauladhar", "challenging", 6, 5, 52, 14500, "Chamba / Kangra remote approaches", "Toral Pass crossing", 16999, 19499, 4.7, 40, "Remote Toral Pass line across the Dhauladhar wilderness — for self-sufficient groups seeking solitude beyond popular Indrahar."],
  ["waru-pass-trek", "Waru Pass Trek", "Waru Pass", "Bara Bhangal belt", "difficult", 8, 7, 70, 15800, "Bara Bhangal approaches", "Waru Pass & exit valleys", 27999, 31999, 4.8, 32, "Serious Waru Pass crossing in the Bara Bhangal mountain maze — long logistics, high camps, and expert leadership required."],
];

function seasonsFor(diff, months) {
  if (diff === "easy") return ["spring", "summer", "autumn", "winter"].filter((s) => s !== "summer" || months.includes("June"));
  if (diff === "difficult") return ["summer", "autumn"];
  return ["spring", "summer", "autumn"];
}

function typesFor(diff, title) {
  const t = ["camping", "photography"];
  if (diff === "easy") t.push("weekend", "family");
  if (diff === "moderate") t.push("weekend", "high-altitude");
  if (diff === "challenging" || diff === "difficult") t.push("high-altitude", "backpacking");
  if (/snow|pass|glacier|tibba|peak/i.test(title)) t.push("snow");
  return [...new Set(t)];
}

function suitable(diff) {
  if (diff === "easy") return ["family", "solo", "couples", "beginners"];
  if (diff === "moderate") return ["solo", "couples", "beginners", "experienced"];
  if (diff === "challenging") return ["solo", "experienced"];
  return ["experienced"];
}

function badges(pop, diff) {
  const b = [];
  if (pop >= 90) b.push("trending");
  if (pop >= 85 && diff === "easy") b.push("bestseller");
  if (diff === "difficult" || diff === "challenging") b.push("limited");
  if (pop < 100) b.push("new");
  return b.slice(0, 3);
}

function itineraryFor(row) {
  const [slug, title, short, dest, diff, days, nights, dist, alt, start, end, price, orig, rating, reviews, summary] = row;
  const daysArr = [];
  if (days === 1) {
    daysArr.push({
      day: 1,
      title: `${short} day hike`,
      distanceKm: dist,
      altitudeFt: alt,
      walkingHours: dist <= 5 ? "2–4 hrs" : "4–6 hrs",
      meals: ["Carry snacks / café meals"],
      accommodation: "Day trek — return to hotel / homestay",
      description: `Start from ${start}, follow local trails to ${short}, enjoy the viewpoints and cultural stops, and return to ${end} by evening with your guide.`,
    });
    return daysArr;
  }
  for (let d = 1; d <= days; d++) {
    const isFirst = d === 1;
    const isLast = d === days;
    daysArr.push({
      day: d,
      title: isFirst
        ? `Approach from ${start}`
        : isLast
          ? `Summit / highlight day and exit toward ${end}`
          : `${short} high camp movement — Day ${d}`,
      distanceKm: Math.max(4, Math.round(dist / days) + (isLast ? -1 : 1)),
      altitudeFt: isLast ? Math.round(alt * 0.75) : Math.round(alt * (0.55 + d * 0.1)),
      walkingHours: diff === "easy" ? "3–5 hrs" : diff === "moderate" ? "5–7 hrs" : "6–9 hrs",
      meals: isFirst ? ["Evening tea", "Dinner"] : isLast ? ["Breakfast", "Packed lunch"] : ["Breakfast", "Packed lunch", "Dinner"],
      accommodation: isLast ? `Trek ends near ${end}` : `Camping / homestay on ${short} route`,
      description: isFirst
        ? `Briefing at ${start}, gradual gain through forests and villages toward the first camp for ${title}. Pace conservatively and hydrate well.`
        : isLast
          ? `Early start for the route’s highlight section near ${short}, then a long but rewarding descent toward ${end}. Buffer time for weather and photos.`
          : `Move deeper along the ${short} corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain.`,
    });
  }
  return daysArr;
}

const uniqueBlurbs = {
  "laka-glacier-trek":
    "Laka Got feels like the antechamber of Indrahar — a cold cirque where summer still holds snowfields and the wind funnels straight off the pass. Unlike busy Triund, the final approach is quiet, rocky, and unmistakably alpine.",
  "indrahar-pass-trek":
    "Indrahar is the classic Kangra–Chamba gateway: scree, thin air, and a sudden reveal of Chamba’s layered ranges once you crest the notch. This is not a casual weekend extension of Triund — treat it as a proper high pass.",
  "kareri-village-trek":
    "Kareri Village is where Gaddi hospitality and terraced farming meet the trailhead for the famous lake. The walk is cultural as much as scenic — stone homes, prayer flags, and the Nyund stream guiding you in.",
  "minkiani-pass-trek":
    "Minkiani sits above the Kareri basin as a lonelier sibling to Indrahar. Expect long meadow days, cold nights, and navigation that rewards patience more than speed.",
  "guna-devi-trek":
    "Guna Devi is the ridge temple many Dharamkot travellers climb before breakfast — short, sacred, and perfect for shaking out travel legs under pine shade.",
  "bhagsu-waterfall-trek":
    "Bhagsu’s waterfall amphitheatre is McLeod Ganj’s most accessible nature walk: café chatter fades into spray, temple bells, and a cool basin under the foothills.",
  "dharamkot-trek":
    "Dharamkot trails weave café culture into pine forest contours. Use them as warm-up loops, sunset rambles, or soft acclimatisation before Snowline and beyond.",
  "naddi-trek":
    "Naddi’s open meadows face the Dhauladhar wall head-on — a photographer’s short walk with big-mountain payoffs and easy access from Dharamshala town.",
  "dal-lake-trail":
    "Dal Lake near Naddi is a deodar-framed pause button: locals picnic, prayer flags stir, and the high ridge hangs like a painted backdrop above the water.",
  "hanuman-ka-tibba-base-camp":
    "Base-camp logistics for Hanuman Ka Tibba demand expedition discipline — staged camps, glacier briefings, and weather patience before any summit talk begins.",
  "hanuman-ka-tibba-expedition":
    "The full Hanuman Ka Tibba expedition mixes rope skills, glacier travel, and a narrow summit window. Only experienced climbers with guided support should consider it.",
  "moon-peak-trek":
    "Moon Peak’s Dhauladhar profile draws ridge walkers who want airy ground and technical awareness without a full expedition calendar.",
  "dhauladhar-base-camp-trek":
    "This base-camp style itinerary prioritises meadow camping under the main wall — ideal for photographers who want dawn light without committing to a pass crossing.",
  "lam-dal-trek":
    "Lam Dal blends pilgrimage energy with glacial-lake silence. High pastures, cold water, and remote camps define the approach from the Bharmour hinterland.",
  "saat-dal-trek":
    "Saat Dal’s multi-lake circuit rewards those who like repetition with variation — each tarn has its own shoreline mood and camping constraint.",
  "nag-dal-trek":
    "Nag Dal stays quieter than Himachal’s poster lakes. Expect icy shores, long approaches, and a strong sense of being deep in shepherd country.",
  "kali-kund-trek":
    "Kali Kund is as much shrine as waterbody — approach with cultural respect, warm layers, and time to sit with the mountain quiet.",
  "lahesh-cave-trek":
    "Lahesh Cave is the storied rock shelter on the Indrahar approach: wind-scoured, photogenic, and a natural overnight for parties pushing beyond Snowline.",
  "gaj-pass-trek":
    "Gaj Pass links obscure Kangra drainages with Chamba trails — a shepherd highway with serious navigation and few commercial footprints.",
  "chobia-pass-trek":
    "Chobia is a high, committing crossing where Dhauladhar wildness meets Lahaul weather. Self-sufficiency and expedition leadership are non-negotiable.",
  "kugti-pass-trek":
    "Kugti Pass rises from a sacred valley of temples and herding culture into a stern alpine gate toward Lahaul — long, beautiful, and demanding.",
  "jalsu-pass-trek":
    "Jalsu remains a living corridor between Kangra and Chamba: wide meadows, mule trains in season, and pass days that feel earned rather than rushed.",
  "thamsar-pass-trek":
    "Thamsar is wilderness cinema — multi-day approaches, sparse villages, and the legendary pull of Bara Bhangal on the far side.",
  "rajgundha-trek":
    "Rajgundha trades Bir’s paragliding buzz for pine silence and riverside village nights under the Dhauladhar skyline.",
  "bir-billing-to-rajgundha-trek":
    "The Billing–Rajgundha link is the weekend favourite: start among take-off ramps, finish beside a quiet Gaddi settlement.",
  "barot-valley-trek":
    "Barot is trout water and deodar shade — gentle valley miles for families recovering from harder Dhauladhar objectives.",
  "chhota-bhanghal-trek":
    "Chhota Bhanghal reveals mid-Himalayan village life without the Instagram density of McLeod Ganj — rivers, terraces, and honest walking days.",
  "bara-bhangal-trek":
    "Reaching Bara Bhangal is a statement trek: remote habitation, multi-pass logistics, and a profound sense of Himalayan isolation.",
  "arthurs-seat-trek":
    "Arthur’s Seat offers a classic Kangra overlook without heavy packs — forest approaches and a wide valley reveal at the top.",
  "camel-peak-trek":
    "Camel Peak’s silhouette from the Triund belt is unforgettable; the ridge walk toward it rewards careful footing and clear mornings.",
  "rifle-horn-trek":
    "Rifle Horn is for sure-footed ridge travellers — exposure, scree chatter, and dramatic rock architecture above the Dharamshala foothills.",
  "ilaqa-got-trek":
    "Ilaqa Got is high pasture poetry: seasonal flowers, herding camps, and granite walls that feel close enough to touch.",
  "reoti-trek":
    "Reoti’s foothill paths stay under the tourist radar — stream crossings, village edges, and soft gradients for an easy Kangra day.",
  "tatwani-trek":
    "Tatwani pairs light walking with natural hot springs — the recovery ritual many Dhauladhar trekkers crave after cold ridge nights.",
  "kunal-pathri-trek":
    "Kunal Pathri’s temple hill is pine-scented and locally loved — a half-day cultural climb when you want calm over conquest.",
  "chamunda-trek":
    "Around Chamunda Devi, hillside paths mix devotion with Baner river air — short walks that still feel rooted in Kangra’s sacred geography.",
  "aghanjar-mahadev-trek":
    "Aghanjar Mahadev hides an old Shiva shrine in forest calm near the Gaggal belt — ideal when flight timings leave you a free half day.",
  "galu-devi-trek":
    "Galu Devi is Dharamkot’s classic prayer-flag climb and the cultural doorstep of the Triund trail system.",
  "bagalu-nag-trek":
    "Bagalu Nag keeps things local: quiet temple approaches, seasonal streams, and almost no commercial trek traffic.",
  "kareri-to-triund-traverse":
    "Linking Kareri country to Triund is a navigator’s delight — high connecting ground, stamina tests, and huge Dhauladhar side-views.",
  "toral-pass-trek":
    "Toral Pass is for those who have outgrown Indrahar crowds — remoter approaches, thinner trails, and true Dhauladhar solitude.",
  "waru-pass-trek":
    "Waru Pass deepens the Bara Bhangal puzzle: long valleys, high camps, and leadership that must read weather like a sixth sense.",
};

function overviewFor(row) {
  const [slug, title, short, , diff, days, , dist, alt, start, end, , , , , summary] = row;
  const blurb =
    uniqueBlurbs[slug] ||
    `${short} rewards trekkers who move with the mountain’s pace rather than a checklist.`;
  return [
    `${title} is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. ${summary}`,
    blurb,
    `The itinerary usually starts at ${start} and ends at ${end}, spanning about ${dist} km across ${days} day(s) with a high point near ${alt.toLocaleString("en-IN")} ft. Graded ${diff}, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book.`,
  ];
}

function highlightsFor(short, diff, alt) {
  return [
    `Guided ${short} experience in the Dharamshala / Dhauladhar region`,
    `Maximum altitude around ${alt.toLocaleString("en-IN")} ft with staged ascent`,
    diff === "easy" ? "Beginner-friendly pacing with scenic rest stops" : "Serious mountain days with experienced local leadership",
    "Camping or village stays matched to the route profile",
    "Photography-friendly viewpoints across Kangra or Chamba valleys",
    "Responsible tourism practices and Leave No Trace camping",
  ];
}

for (const row of more) {
  const [slug, title, short, dest, diff, days, nights, dist, alt, start, end, price, orig, rating, reviews, summary] = row;
  const pop = Math.min(99, Math.round(40 + reviews / 8));
  const months =
    diff === "easy"
      ? ["March", "April", "May", "June", "September", "October", "November", "December"]
      : diff === "difficult"
        ? ["June", "July", "August", "September"]
        : ["May", "June", "September", "October"];

  seeds.push({
    slug,
    title,
    shortName: short,
    destinationName: dest,
    difficulty: diff,
    durationDays: days,
    durationNights: nights,
    distanceKm: dist,
    maxAltitudeFt: alt,
    startingPoint: start,
    endingPoint: end,
    basePriceInr: price,
    originalPriceInr: orig,
    rating,
    reviewCount: reviews,
    seatsLeft: Math.max(2, 20 - Math.round(days * 1.5)),
    popularity: pop,
    bestSeasons: seasonsFor(diff, months),
    months,
    trekTypes: typesFor(diff, title),
    suitableFor: suitable(diff),
    badges: badges(pop, diff),
    ageLimit: diff === "easy" ? "8+ with guardians" : diff === "moderate" ? "12+ with fitness" : "16+ experienced preferred",
    groupSize: diff === "difficult" ? "Small expedition teams (4–8)" : "Join a group | Seasonal fixed departures",
    accommodation: nights === 0 ? "Day trek — hotel/homestay in town" : "Camping / alpine homestay as per itinerary",
    meals: nights === 0 ? "Not included — café / packed lunch" : "Veg meals on trek days as listed",
    transport: "Self-arrange to roadhead; transfers can be quoted separately",
    temperature: alt >= 14000 ? "-10°C to 12°C" : alt >= 10000 ? "-5°C to 18°C" : "5°C to 26°C",
    bestTime:
      diff === "difficult"
        ? "July–September weather windows only; avoid deep winter"
        : "April–June and September–November for most stable Dhauladhar weather",
    fitnessLevel:
      diff === "easy" ? "Basic fitness" : diff === "moderate" ? "Good cardio fitness" : "High endurance & prior trek experience",
    fitnessScore: diff === "easy" ? 35 : diff === "moderate" ? 62 : diff === "challenging" ? 78 : 90,
    fitnessDescription: `The ${title} demands ${diff} effort across ${days} day(s). Train with stair climbs and loaded walks; respect altitude above ${alt} ft.`,
    fitnessTips: [
      `Build weekly cardio for at least 3–4 weeks before ${short}.`,
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins.",
    ],
    lat: 32.2 + (seeds.length % 20) * 0.01,
    lng: 76.3 + (seeds.length % 15) * 0.015,
    summary: `${summary} From ₹${price.toLocaleString("en-IN")}.`,
    overview: overviewFor(row),
    highlights: highlightsFor(short, diff, alt),
    itinerary: itineraryFor(row),
    inclusions: [
      "Trek leadership and local guides",
      nights ? "Tents / listed accommodation on trek nights" : "Guided day-hike support",
      nights ? "Meals as per itinerary (veg)" : "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team",
    ],
    exclusions: [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns",
    ],
    mapOverview: `${title} corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder ${32.2 + (seeds.length % 20) * 0.01}°N, ${76.3 + (seeds.length % 15) * 0.015}°E). Embed Google Map via CMS.`,
    camps: nights ? [`${short} camp 1`, nights > 1 ? `${short} high camp` : `${short} overnight`].filter(Boolean) : [`Day rest points on ${short}`],
    elevationNote: `Altitude profile rises toward ~${alt.toLocaleString("en-IN")} ft. Descend carefully on loose scree and monsoon clay.`,
    flora: "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    fauna: "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    photographySpots: [`${short} main viewpoint`, "Valley light at golden hour", "Camp ridgeline panoramas", "Village / temple cultural frames"],
    campingLocations: nights ? [`Designated ${short} camping zones`, "Backup lower camp in bad weather"] : ["Not applicable — day trek"],
    waterSources: "Carry adequate water from the last village; treat natural sources before drinking.",
    network: "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    electricity: nights ? "No reliable charging on trail — carry power banks." : "Charge devices in town before starting.",
    atm: "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    medical: "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    permits: "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    forestPermissions: "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    nearbyAttractions: ["McLeod Ganj", "Bhagsu Nag", "Kangra Fort", "Bir Billing", "Masroor Temples"],
    relatedSlugs: [],
    nearbyTreks: [],
    travelTips: [
      `Arrive in ${dest} a night early when mornings start at the trailhead.`,
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport.",
    ],
    uniqueFaqs: [
      {
        q: `Is ${title} crowded?`,
        a: diff === "easy" ? `Popular sections near towns can be busy on weekends; early starts help.` : `${short} sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency.`,
      },
      {
        q: `Can I combine ${short} with Triund?`,
        a: `Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan.`,
      },
    ],
    reviewComments: [
      `{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.`,
      `Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.`,
      `Challenging in places but unforgettable. Would book another Dharamshala trek with this team.`,
    ],
    departureDates: ["2026-09-14", "2026-09-21", "2026-09-28", "2026-10-05", "2026-10-12"].slice(0, Math.min(5, Math.max(2, days))),
    thingsToCarry: ["Layered clothing", "Rain shell", "Headlamp", "Personal medicines", "Reusable water bottle"],
    privateDepartureInfo: `Private ${title} departures can be arranged for families and corporate groups subject to guide availability.`,
    groupDiscountNote: "Group discount available for 6+ travellers on the same fixed departure.",
  });
}

// Also add enriched seeds for existing popular ones as OPTIONAL separate? Skip triund/kareri/snowline-laka — already in DB.

const header = `import type { DifficultyLevel, Season } from "@/types";
import type { TrekBadge, SuitableFor, TrekTypeTag } from "@/types/trek-listing";
import type { TrekItineraryDay } from "@/types/trek-detail";

export interface DharamshalaTrekSeed {
  slug: string;
  title: string;
  shortName: string;
  destinationName: string;
  difficulty: DifficultyLevel;
  durationDays: number;
  durationNights: number;
  distanceKm: number;
  maxAltitudeFt: number;
  startingPoint: string;
  endingPoint: string;
  basePriceInr: number;
  originalPriceInr: number;
  rating: number;
  reviewCount: number;
  seatsLeft: number;
  popularity: number;
  bestSeasons: Season[];
  months: string[];
  trekTypes: TrekTypeTag[];
  suitableFor: SuitableFor[];
  badges: TrekBadge[];
  ageLimit: string;
  groupSize: string;
  accommodation: string;
  meals: string;
  transport: string;
  temperature: string;
  bestTime: string;
  fitnessLevel: string;
  fitnessScore: number;
  fitnessDescription: string;
  fitnessTips: string[];
  lat: number;
  lng: number;
  summary: string;
  overview: string[];
  highlights: string[];
  itinerary: Array<Omit<TrekItineraryDay, "images"> & { images?: string[] }>;
  inclusions: string[];
  exclusions: string[];
  mapOverview: string;
  camps: string[];
  elevationNote: string;
  flora: string;
  fauna: string;
  photographySpots: string[];
  campingLocations: string[];
  waterSources: string;
  network: string;
  electricity: string;
  atm: string;
  medical: string;
  permits: string;
  forestPermissions: string;
  nearbyAttractions: string[];
  relatedSlugs: string[];
  nearbyTreks: string[];
  travelTips: string[];
  uniqueFaqs: Array<{ q: string; a: string; category?: string }>;
  reviewComments: [string, string, string];
  departureDates: string[];
  thingsToCarry: string[];
  privateDepartureInfo: string;
  groupDiscountNote: string;
}

export const dharamshalaTrekSeeds: DharamshalaTrekSeed[] = `;

const body = JSON.stringify(seeds, null, 2)
  .replace(/"easy"/g, '"easy"')
  .replace(/"([^"]+)":/g, "$1:");

// JSON doesn't work as TS with unquoted keys easily from stringify with replace - better emit as TS using JSON.parse approach

const ts = `${header}${JSON.stringify(seeds, null, 2)} as const satisfies readonly DharamshalaTrekSeed[];
`;

// Fix: `as const satisfies` with JSON booleans/strings is fine, but DifficultyLevel needs to be mutable array types - use plain export

// Cross-link related slugs among the full Dharamshala set + existing popular routes
const existingHubs = ["triund-trek", "kareri-lake-trek", "snowline-laka-trek"];
for (let i = 0; i < seeds.length; i++) {
  const seed = seeds[i];
  if (seed.relatedSlugs.length) continue;
  const neighbors = [
    seeds[(i + 1) % seeds.length].slug,
    seeds[(i + 2) % seeds.length].slug,
    seeds[(i + 3) % seeds.length].slug,
    existingHubs[i % existingHubs.length],
  ].filter((s) => s !== seed.slug);
  seed.relatedSlugs = [...new Set(neighbors)].slice(0, 4);
  seed.nearbyTreks = seed.relatedSlugs.map((s) => {
    const found = seeds.find((x) => x.slug === s);
    if (found) return found.title;
    if (s === "triund-trek") return "Triund Trek";
    if (s === "kareri-lake-trek") return "Kareri Lake Trek";
    if (s === "snowline-laka-trek") return "Snowline Laka Trek";
    return s;
  });
}

const tsFinal = `import type { DifficultyLevel, Season } from "@/types";
import type { TrekBadge, SuitableFor, TrekTypeTag } from "@/types/trek-listing";
import type { TrekItineraryDay } from "@/types/trek-detail";

export interface DharamshalaTrekSeed {
  slug: string;
  title: string;
  shortName: string;
  destinationName: string;
  difficulty: DifficultyLevel;
  durationDays: number;
  durationNights: number;
  distanceKm: number;
  maxAltitudeFt: number;
  startingPoint: string;
  endingPoint: string;
  basePriceInr: number;
  originalPriceInr: number;
  rating: number;
  reviewCount: number;
  seatsLeft: number;
  popularity: number;
  bestSeasons: Season[];
  months: string[];
  trekTypes: TrekTypeTag[];
  suitableFor: SuitableFor[];
  badges: TrekBadge[];
  ageLimit: string;
  groupSize: string;
  accommodation: string;
  meals: string;
  transport: string;
  temperature: string;
  bestTime: string;
  fitnessLevel: string;
  fitnessScore: number;
  fitnessDescription: string;
  fitnessTips: string[];
  lat: number;
  lng: number;
  summary: string;
  overview: string[];
  highlights: string[];
  itinerary: Array<Omit<TrekItineraryDay, "images">>;
  inclusions: string[];
  exclusions: string[];
  mapOverview: string;
  camps: string[];
  elevationNote: string;
  flora: string;
  fauna: string;
  photographySpots: string[];
  campingLocations: string[];
  waterSources: string;
  network: string;
  electricity: string;
  atm: string;
  medical: string;
  permits: string;
  forestPermissions: string;
  nearbyAttractions: string[];
  relatedSlugs: string[];
  nearbyTreks: string[];
  travelTips: string[];
  uniqueFaqs: Array<{ q: string; a: string; category?: string }>;
  reviewComments: [string, string, string];
  departureDates: string[];
  thingsToCarry: string[];
  privateDepartureInfo: string;
  groupDiscountNote: string;
}

export const dharamshalaTrekSeeds: DharamshalaTrekSeed[] = ${JSON.stringify(seeds, null, 2)};
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "seeds.ts"), tsFinal);
console.log(`Wrote ${seeds.length} seeds to seeds.ts`);

