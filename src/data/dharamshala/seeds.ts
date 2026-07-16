import type { DifficultyLevel, Season } from "@/types";
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

export const dharamshalaTrekSeeds: DharamshalaTrekSeed[] = [
  {
    "slug": "snowline-trek",
    "title": "Snowline Trek",
    "shortName": "Snowline",
    "destinationName": "McLeod Ganj",
    "difficulty": "easy",
    "durationDays": 2,
    "durationNights": 1,
    "distanceKm": 18,
    "maxAltitudeFt": 10499,
    "startingPoint": "Bhagsunag, McLeod Ganj",
    "endingPoint": "Bhagsunag, McLeod Ganj",
    "basePriceInr": 1999,
    "originalPriceInr": 2499,
    "rating": 4.7,
    "reviewCount": 512,
    "seatsLeft": 14,
    "popularity": 94,
    "bestSeasons": [
      "spring",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "weekend",
      "camping",
      "photography",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "trending",
      "new"
    ],
    "ageLimit": "10+ years (with guardians)",
    "groupSize": "Join a group | Daily seasonal departures",
    "accommodation": "Alpine camping near Snowline / Lahesh approach",
    "meals": "Veg dinner, breakfast & trail snacks as per package",
    "transport": "Self-arrange to Bhagsunag; mule support optional on request",
    "temperature": "-2°C to 18°C (season dependent)",
    "bestTime": "March–May and September–November; winter for snow seekers",
    "fitnessLevel": "Easy to moderate — steady uphill beyond Triund",
    "fitnessScore": 55,
    "fitnessDescription": "Snowline sits above Triund on steeper, rockier ground. Beginners with good stamina manage it when they start early and pace themselves.",
    "fitnessTips": [
      "Practice 4–5 km walks with a daypack for two weeks before departure.",
      "Use trekking poles on the rocky climb past Triund.",
      "Start early from Bhagsunag to avoid afternoon cloud on the ridge."
    ],
    "lat": 32.2615,
    "lng": 76.3482,
    "summary": "Snowline Trek above Triund — climb past the popular ridge to the first permanent snow patches of the Dhauladhar with Indrahar Pass views. From ₹1,999.",
    "overview": [
      "The Snowline Trek is the classic next step after Triund for travellers who want a true alpine feel without committing to a full Indrahar Pass crossing. From Bhagsunag you climb through oak and rhododendron, crest the Triund ridge, then continue toward the snow-stained scree where the Dhauladhar walls rise abruptly.",
      "On clear days the ridge reveals a sweeping line of peaks and the notch of Indrahar Pass. Winter and early spring often paint the upper path white; late autumn brings razor-clear views and cold nights. This itinerary is designed for India Holiday Destinations guests seeking a weekend-friendly Dharamshala adventure with guided camping support.",
      "Expect a mix of forest trail, open meadow, and rocky alpine approach. The last stretch above Triund is steeper and more exposed to wind, so layering and an early start matter as much as raw fitness."
    ],
    "highlights": [
      "Continue beyond crowded Triund to quieter Snowline terrain",
      "Close-up views toward Indrahar Pass and Dhauladhar ice walls",
      "Sunrise and sunset light on the Kangra Valley below",
      "Guided camping with meals on a short Himalayan itinerary",
      "Ideal bridge trek before attempting Lahesh Cave or Indrahar Pass"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Bhagsunag to Snowline via Triund",
        "distanceKm": 10,
        "altitudeFt": 10499,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping near Snowline",
        "description": "Meet at Bhagsunag, trek past Maggic / Galu sections toward Triund, then continue on the rockier path to Snowline. Pitch camp with Dhauladhar walls for a backdrop and settle in for a cold, starry night."
      },
      {
        "day": 2,
        "title": "Snowline exploration and descend to Bhagsunag",
        "distanceKm": 8,
        "altitudeFt": 9350,
        "walkingHours": "4–6 hrs",
        "meals": [
          "Breakfast"
        ],
        "accommodation": "Trek ends at Bhagsunag",
        "description": "Optional short walk toward Lahesh approach viewpoints after breakfast, then descend via Triund to Bhagsunag by afternoon. Celebrate with café time in McLeod Ganj."
      }
    ],
    "inclusions": [
      "Qualified local trek leader and support staff",
      "Camping equipment (tents, sleeping mats as per package)",
      "Dinner and breakfast on trek days as listed",
      "Forest / camping permissions arranged where required",
      "Basic first-aid kit with the trek team"
    ],
    "exclusions": [
      "Transport to / from Bhagsunag",
      "Personal porters or mules (available on request)",
      "Lunch, bottled water, and café meals in town",
      "Personal trekking gear and insurance",
      "Anything not mentioned in inclusions"
    ],
    "mapOverview": "Out-and-back from Bhagsunag (approx. 32.24°N, 76.35°E) via Triund ridge to Snowline (~32.26°N, 76.35°E). Google Map coordinates placeholder for CMS map embed.",
    "camps": [
      "Triund rest stop",
      "Snowline camp"
    ],
    "elevationNote": "Gain roughly 1,400–1,600 m from Bhagsunag to Snowline. The final kilometre is the steepest and most windswept.",
    "flora": "Ban oak, rhododendron, deodar lower down; alpine scrub and sparse herbs near Snowline.",
    "fauna": "Himalayan monal and other pheasants in forest belts; occasional Himalayan goral on steep grass slopes; langurs near village edges.",
    "photographySpots": [
      "Triund ridge looking into Kangra Valley",
      "Snowline amphitheatre toward Indrahar",
      "Night sky from camp when clouds clear",
      "Golden hour on Dhauladhar ice flutings"
    ],
    "campingLocations": [
      "Designated Snowline camping shelf",
      "Backup Karthani / Triund zone if weather turns"
    ],
    "waterSources": "Carry 2L from Bhagsunag/Triund. Seasonal seeps exist but are not reliable in peak winter freeze.",
    "network": "Patchy Jio/Airtel till Triund; usually none at Snowline. Inform family before leaving McLeod Ganj.",
    "electricity": "No charging points on the trail. Carry a full power bank.",
    "atm": "ATMs in McLeod Ganj and Dharamshala only — withdraw before the trek.",
    "medical": "Basic first aid with guide; nearest clinics in McLeod Ganj; hospital in Dharamshala.",
    "permits": "Forest camping permissions as applicable; arranged for booked packages when overnight camping is allowed.",
    "forestPermissions": "Overnight stays must follow Himachal forest / local authority guidelines for the Triund–Snowline corridor.",
    "nearbyAttractions": [
      "Bhagsu Waterfall",
      "McLeod Ganj monasteries",
      "Dal Lake (Naddi side)",
      "St. John in the Wilderness"
    ],
    "relatedSlugs": [
      "triund-trek",
      "laka-glacier-trek",
      "lahesh-cave-trek",
      "indrahar-pass-trek"
    ],
    "nearbyTreks": [
      "Triund Trek",
      "Laka Glacier Trek",
      "Lahesh Cave Trek",
      "Indrahar Pass Trek"
    ],
    "travelTips": [
      "Acclimatise with a short walk in McLeod Ganj the evening before.",
      "Carry microspikes in late winter if ice is reported above Triund.",
      "Book weekdays if you want quieter camps than weekend Triund crowds."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Snowline the same as Laka Glacier?",
        "a": "Snowline is the alpine zone above Triund where snow often persists. Laka Glacier / Laka Got sits further along the same corridor toward Indrahar Pass — a longer and colder outing."
      },
      {
        "q": "Can I do Snowline as a day hike?",
        "a": "Strong hikers sometimes tag Snowline as a long day from Bhagsunag, but overnight camping gives safer timing and better light for photography."
      }
    ],
    "reviewComments": [
      "Snowline felt like the real mountains after Triund — cold, dramatic, and perfectly guided.",
      "Steeper than we expected past Triund, but the Indrahar views were worth every step.",
      "Great weekend trek with India Holiday Destinations. Camp food was simple and hot when we needed it."
    ],
    "departureDates": [
      "2026-09-12",
      "2026-09-19",
      "2026-09-26",
      "2026-10-03",
      "2026-10-10"
    ],
    "thingsToCarry": [
      "Warm sleeping layer",
      "Trekking poles",
      "Sunglasses for snow glare",
      "Extra batteries for headlamp"
    ],
    "privateDepartureInfo": "Private departures available for families and small groups — custom dates subject to guide and permit availability.",
    "groupDiscountNote": "Group discount available for 6+ confirmed travellers on the same departure."
  },
  {
    "slug": "laka-glacier-trek",
    "title": "Laka Glacier Trek",
    "shortName": "Laka Glacier",
    "destinationName": "McLeod Ganj",
    "difficulty": "moderate",
    "durationDays": 3,
    "durationNights": 2,
    "distanceKm": 22,
    "maxAltitudeFt": 11480,
    "startingPoint": "Bhagsunag",
    "endingPoint": "Bhagsunag",
    "basePriceInr": 2899,
    "originalPriceInr": 3499,
    "rating": 4.8,
    "reviewCount": 388,
    "seatsLeft": 15,
    "popularity": 89,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Laka Glacier Trek demands moderate effort across 3 day(s). Train with stair climbs and loaded walks; respect altitude above 11480 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Laka Glacier.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.21,
    "lng": 76.315,
    "summary": "Continue past Snowline to Laka Got — glacial cirque, Lahesh Cave approach, and Indrahar Pass walls on a 3D/2N Dhauladhar classic. From ₹2,899.",
    "overview": [
      "Laka Glacier Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Continue past Snowline to Laka Got — glacial cirque, Lahesh Cave approach, and Indrahar Pass walls on a 3D/2N Dhauladhar classic.",
      "Laka Got feels like the antechamber of Indrahar — a cold cirque where summer still holds snowfields and the wind funnels straight off the pass. Unlike busy Triund, the final approach is quiet, rocky, and unmistakably alpine.",
      "The itinerary usually starts at Bhagsunag and ends at Bhagsunag, spanning about 22 km across 3 day(s) with a high point near 11,480 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Laka Glacier experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 11,480 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bhagsunag",
        "distanceKm": 8,
        "altitudeFt": 7462,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Laka Glacier route",
        "description": "Briefing at Bhagsunag, gradual gain through forests and villages toward the first camp for Laka Glacier Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Laka Glacier high camp movement — Day 2",
        "distanceKm": 8,
        "altitudeFt": 8610,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Laka Glacier route",
        "description": "Move deeper along the Laka Glacier corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Summit / highlight day and exit toward Bhagsunag",
        "distanceKm": 6,
        "altitudeFt": 8610,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Bhagsunag",
        "description": "Early start for the route’s highlight section near Laka Glacier, then a long but rewarding descent toward Bhagsunag. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Laka Glacier Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.21°N, 76.315°E). Embed Google Map via CMS.",
    "camps": [
      "Laka Glacier camp 1",
      "Laka Glacier high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~11,480 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Laka Glacier main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Laka Glacier camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "indrahar-pass-trek",
      "kareri-village-trek",
      "minkiani-pass-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Indrahar Pass Trek",
      "Kareri Village Trek",
      "Minkiani Pass Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in McLeod Ganj a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Laka Glacier Trek crowded?",
        "a": "Laka Glacier sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Laka Glacier with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Laka Glacier Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "indrahar-pass-trek",
    "title": "Indrahar Pass Trek",
    "shortName": "Indrahar Pass",
    "destinationName": "McLeod Ganj",
    "difficulty": "challenging",
    "durationDays": 4,
    "durationNights": 3,
    "distanceKm": 32,
    "maxAltitudeFt": 14250,
    "startingPoint": "Bhagsunag / Dharamkot",
    "endingPoint": "Chamba side or return via McLeod",
    "basePriceInr": 8999,
    "originalPriceInr": 10999,
    "rating": 4.9,
    "reviewCount": 276,
    "seatsLeft": 14,
    "popularity": 75,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Indrahar Pass Trek demands challenging effort across 4 day(s). Train with stair climbs and loaded walks; respect altitude above 14250 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Indrahar Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.220000000000006,
    "lng": 76.33,
    "summary": "Cross the iconic Indrahar Pass (≈4,342 m) on the Dhauladhar divide between Kangra and Chamba — serious altitude, scree, and huge Himalayan views. From ₹8,999.",
    "overview": [
      "Indrahar Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Cross the iconic Indrahar Pass (≈4,342 m) on the Dhauladhar divide between Kangra and Chamba — serious altitude, scree, and huge Himalayan views.",
      "Indrahar is the classic Kangra–Chamba gateway: scree, thin air, and a sudden reveal of Chamba’s layered ranges once you crest the notch. This is not a casual weekend extension of Triund — treat it as a proper high pass.",
      "The itinerary usually starts at Bhagsunag / Dharamkot and ends at Chamba side or return via McLeod, spanning about 32 km across 4 day(s) with a high point near 14,250 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Indrahar Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 14,250 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bhagsunag / Dharamkot",
        "distanceKm": 9,
        "altitudeFt": 9263,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Indrahar Pass route",
        "description": "Briefing at Bhagsunag / Dharamkot, gradual gain through forests and villages toward the first camp for Indrahar Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Indrahar Pass high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 10688,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Indrahar Pass route",
        "description": "Move deeper along the Indrahar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Indrahar Pass high camp movement — Day 3",
        "distanceKm": 9,
        "altitudeFt": 12113,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Indrahar Pass route",
        "description": "Move deeper along the Indrahar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Summit / highlight day and exit toward Chamba side or return via McLeod",
        "distanceKm": 7,
        "altitudeFt": 10688,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Chamba side or return via McLeod",
        "description": "Early start for the route’s highlight section near Indrahar Pass, then a long but rewarding descent toward Chamba side or return via McLeod. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Indrahar Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.220000000000006°N, 76.33°E). Embed Google Map via CMS.",
    "camps": [
      "Indrahar Pass camp 1",
      "Indrahar Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~14,250 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Indrahar Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Indrahar Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "kareri-village-trek",
      "minkiani-pass-trek",
      "guna-devi-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Kareri Village Trek",
      "Minkiani Pass Trek",
      "Guna Devi Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in McLeod Ganj a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Indrahar Pass Trek crowded?",
        "a": "Indrahar Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Indrahar Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Indrahar Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "kareri-village-trek",
    "title": "Kareri Village Trek",
    "shortName": "Kareri Village",
    "destinationName": "Dharamshala",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 8,
    "maxAltitudeFt": 5900,
    "startingPoint": "Ghera / near Kareri roadhead",
    "endingPoint": "Kareri Village",
    "basePriceInr": 999,
    "originalPriceInr": 1299,
    "rating": 4.5,
    "reviewCount": 210,
    "seatsLeft": 18,
    "popularity": 66,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Kareri Village Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 5900 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Kareri Village.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.230000000000004,
    "lng": 76.345,
    "summary": "A gentle cultural walk into Kareri Village — Gaddi homes, terraced fields, and the gateway trail toward Kareri Lake. From ₹999.",
    "overview": [
      "Kareri Village Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. A gentle cultural walk into Kareri Village — Gaddi homes, terraced fields, and the gateway trail toward Kareri Lake.",
      "Kareri Village is where Gaddi hospitality and terraced farming meet the trailhead for the famous lake. The walk is cultural as much as scenic — stone homes, prayer flags, and the Nyund stream guiding you in.",
      "The itinerary usually starts at Ghera / near Kareri roadhead and ends at Kareri Village, spanning about 8 km across 1 day(s) with a high point near 5,900 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Kareri Village experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 5,900 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kareri Village day hike",
        "distanceKm": 8,
        "altitudeFt": 5900,
        "walkingHours": "4–6 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Ghera / near Kareri roadhead, follow local trails to Kareri Village, enjoy the viewpoints and cultural stops, and return to Kareri Village by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Kareri Village Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.230000000000004°N, 76.345°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Kareri Village"
    ],
    "elevationNote": "Altitude profile rises toward ~5,900 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Kareri Village main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "minkiani-pass-trek",
      "guna-devi-trek",
      "bhagsu-waterfall-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Minkiani Pass Trek",
      "Guna Devi Trek",
      "Bhagsu Waterfall Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Kareri Village Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Kareri Village with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Kareri Village Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "minkiani-pass-trek",
    "title": "Minkiani Pass Trek",
    "shortName": "Minkiani Pass",
    "destinationName": "Dharamshala",
    "difficulty": "challenging",
    "durationDays": 5,
    "durationNights": 4,
    "distanceKm": 40,
    "maxAltitudeFt": 13900,
    "startingPoint": "Kareri Village",
    "endingPoint": "Chamba / return via Kareri",
    "basePriceInr": 11999,
    "originalPriceInr": 13999,
    "rating": 4.8,
    "reviewCount": 142,
    "seatsLeft": 12,
    "popularity": 58,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Minkiani Pass Trek demands challenging effort across 5 day(s). Train with stair climbs and loaded walks; respect altitude above 13900 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Minkiani Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.24,
    "lng": 76.36,
    "summary": "A demanding Dhauladhar crossing above Kareri Lake via Minkiani Pass — remote meadows, high camps, and few crowds. From ₹11,999.",
    "overview": [
      "Minkiani Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. A demanding Dhauladhar crossing above Kareri Lake via Minkiani Pass — remote meadows, high camps, and few crowds.",
      "Minkiani sits above the Kareri basin as a lonelier sibling to Indrahar. Expect long meadow days, cold nights, and navigation that rewards patience more than speed.",
      "The itinerary usually starts at Kareri Village and ends at Chamba / return via Kareri, spanning about 40 km across 5 day(s) with a high point near 13,900 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Minkiani Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 13,900 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Kareri Village",
        "distanceKm": 9,
        "altitudeFt": 9035,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Minkiani Pass route",
        "description": "Briefing at Kareri Village, gradual gain through forests and villages toward the first camp for Minkiani Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Minkiani Pass high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 10425,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Minkiani Pass route",
        "description": "Move deeper along the Minkiani Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Minkiani Pass high camp movement — Day 3",
        "distanceKm": 9,
        "altitudeFt": 11815,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Minkiani Pass route",
        "description": "Move deeper along the Minkiani Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Minkiani Pass high camp movement — Day 4",
        "distanceKm": 9,
        "altitudeFt": 13205,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Minkiani Pass route",
        "description": "Move deeper along the Minkiani Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Summit / highlight day and exit toward Chamba / return via Kareri",
        "distanceKm": 7,
        "altitudeFt": 10425,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Chamba / return via Kareri",
        "description": "Early start for the route’s highlight section near Minkiani Pass, then a long but rewarding descent toward Chamba / return via Kareri. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Minkiani Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.24°N, 76.36°E). Embed Google Map via CMS.",
    "camps": [
      "Minkiani Pass camp 1",
      "Minkiani Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~13,900 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Minkiani Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Minkiani Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "guna-devi-trek",
      "bhagsu-waterfall-trek",
      "dharamkot-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Guna Devi Trek",
      "Bhagsu Waterfall Trek",
      "Dharamkot Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Minkiani Pass Trek crowded?",
        "a": "Minkiani Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Minkiani Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Minkiani Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "guna-devi-trek",
    "title": "Guna Devi Trek",
    "shortName": "Guna Devi",
    "destinationName": "Dharamkot",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 6,
    "maxAltitudeFt": 6900,
    "startingPoint": "Dharamkot / Gallu Devi",
    "endingPoint": "Guna Devi Temple",
    "basePriceInr": 799,
    "originalPriceInr": 999,
    "rating": 4.6,
    "reviewCount": 468,
    "seatsLeft": 18,
    "popularity": 99,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "trending",
      "bestseller",
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Guna Devi Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 6900 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Guna Devi.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.25,
    "lng": 76.375,
    "summary": "Short sacred ridge walk from Dharamkot to Guna Devi Temple with pine forests and valley views — perfect half-day acclimatisation hike. From ₹799.",
    "overview": [
      "Guna Devi Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Short sacred ridge walk from Dharamkot to Guna Devi Temple with pine forests and valley views — perfect half-day acclimatisation hike.",
      "Guna Devi is the ridge temple many Dharamkot travellers climb before breakfast — short, sacred, and perfect for shaking out travel legs under pine shade.",
      "The itinerary usually starts at Dharamkot / Gallu Devi and ends at Guna Devi Temple, spanning about 6 km across 1 day(s) with a high point near 6,900 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Guna Devi experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 6,900 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Guna Devi day hike",
        "distanceKm": 6,
        "altitudeFt": 6900,
        "walkingHours": "4–6 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Dharamkot / Gallu Devi, follow local trails to Guna Devi, enjoy the viewpoints and cultural stops, and return to Guna Devi Temple by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Guna Devi Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.25°N, 76.375°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Guna Devi"
    ],
    "elevationNote": "Altitude profile rises toward ~6,900 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Guna Devi main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "bhagsu-waterfall-trek",
      "dharamkot-trek",
      "naddi-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Bhagsu Waterfall Trek",
      "Dharamkot Trek",
      "Naddi Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Dharamkot a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Guna Devi Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Guna Devi with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Guna Devi Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "bhagsu-waterfall-trek",
    "title": "Bhagsu Waterfall Trek",
    "shortName": "Bhagsu Waterfall",
    "destinationName": "McLeod Ganj",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 3,
    "maxAltitudeFt": 6200,
    "startingPoint": "Bhagsunag Temple",
    "endingPoint": "Bhagsu Waterfall",
    "basePriceInr": 499,
    "originalPriceInr": 699,
    "rating": 4.4,
    "reviewCount": 980,
    "seatsLeft": 18,
    "popularity": 99,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "trending",
      "bestseller",
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Bhagsu Waterfall Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 6200 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Bhagsu Waterfall.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.260000000000005,
    "lng": 76.39,
    "summary": "The classic McLeod Ganj waterfall walk — cafés, temple steps, and a cool plunge-pool amphitheatre under the Dhauladhar foothills. From ₹499.",
    "overview": [
      "Bhagsu Waterfall Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. The classic McLeod Ganj waterfall walk — cafés, temple steps, and a cool plunge-pool amphitheatre under the Dhauladhar foothills.",
      "Bhagsu’s waterfall amphitheatre is McLeod Ganj’s most accessible nature walk: café chatter fades into spray, temple bells, and a cool basin under the foothills.",
      "The itinerary usually starts at Bhagsunag Temple and ends at Bhagsu Waterfall, spanning about 3 km across 1 day(s) with a high point near 6,200 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Bhagsu Waterfall experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 6,200 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Bhagsu Waterfall day hike",
        "distanceKm": 3,
        "altitudeFt": 6200,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Bhagsunag Temple, follow local trails to Bhagsu Waterfall, enjoy the viewpoints and cultural stops, and return to Bhagsu Waterfall by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Bhagsu Waterfall Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.260000000000005°N, 76.39°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Bhagsu Waterfall"
    ],
    "elevationNote": "Altitude profile rises toward ~6,200 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Bhagsu Waterfall main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "dharamkot-trek",
      "naddi-trek",
      "dal-lake-trail",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Dharamkot Trek",
      "Naddi Trek",
      "Dal Lake Trail",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in McLeod Ganj a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Bhagsu Waterfall Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Bhagsu Waterfall with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Bhagsu Waterfall Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "dharamkot-trek",
    "title": "Dharamkot Trek",
    "shortName": "Dharamkot",
    "destinationName": "McLeod Ganj",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 5,
    "maxAltitudeFt": 6900,
    "startingPoint": "McLeod Ganj",
    "endingPoint": "Dharamkot / Gallu",
    "basePriceInr": 699,
    "originalPriceInr": 899,
    "rating": 4.5,
    "reviewCount": 320,
    "seatsLeft": 18,
    "popularity": 80,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Dharamkot Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 6900 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Dharamkot.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.27,
    "lng": 76.405,
    "summary": "Village-to-ridge wandering above McLeod Ganj through Dharamkot trails — cafés, pine shade, and warm-up paths for bigger Dhauladhar routes. From ₹699.",
    "overview": [
      "Dharamkot Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Village-to-ridge wandering above McLeod Ganj through Dharamkot trails — cafés, pine shade, and warm-up paths for bigger Dhauladhar routes.",
      "Dharamkot trails weave café culture into pine forest contours. Use them as warm-up loops, sunset rambles, or soft acclimatisation before Snowline and beyond.",
      "The itinerary usually starts at McLeod Ganj and ends at Dharamkot / Gallu, spanning about 5 km across 1 day(s) with a high point near 6,900 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Dharamkot experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 6,900 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Dharamkot day hike",
        "distanceKm": 5,
        "altitudeFt": 6900,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from McLeod Ganj, follow local trails to Dharamkot, enjoy the viewpoints and cultural stops, and return to Dharamkot / Gallu by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Dharamkot Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.27°N, 76.405°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Dharamkot"
    ],
    "elevationNote": "Altitude profile rises toward ~6,900 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Dharamkot main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "naddi-trek",
      "dal-lake-trail",
      "hanuman-ka-tibba-base-camp",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Naddi Trek",
      "Dal Lake Trail",
      "Hanuman Ka Tibba Base Camp",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in McLeod Ganj a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Dharamkot Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Dharamkot with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Dharamkot Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "naddi-trek",
    "title": "Naddi Trek",
    "shortName": "Naddi",
    "destinationName": "Dharamshala",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 4,
    "maxAltitudeFt": 6400,
    "startingPoint": "Dharamshala / Forsyth Ganj",
    "endingPoint": "Naddi Viewpoint",
    "basePriceInr": 599,
    "originalPriceInr": 799,
    "rating": 4.4,
    "reviewCount": 256,
    "seatsLeft": 18,
    "popularity": 72,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Naddi Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 6400 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Naddi.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.28,
    "lng": 76.42,
    "summary": "Easy viewpoint walk to Naddi for Dhauladhar panoramas, Dal Lake side trails, and sunset photography without a heavy backpack. From ₹599.",
    "overview": [
      "Naddi Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Easy viewpoint walk to Naddi for Dhauladhar panoramas, Dal Lake side trails, and sunset photography without a heavy backpack.",
      "Naddi’s open meadows face the Dhauladhar wall head-on — a photographer’s short walk with big-mountain payoffs and easy access from Dharamshala town.",
      "The itinerary usually starts at Dharamshala / Forsyth Ganj and ends at Naddi Viewpoint, spanning about 4 km across 1 day(s) with a high point near 6,400 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Naddi experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 6,400 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Naddi day hike",
        "distanceKm": 4,
        "altitudeFt": 6400,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Dharamshala / Forsyth Ganj, follow local trails to Naddi, enjoy the viewpoints and cultural stops, and return to Naddi Viewpoint by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Naddi Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.28°N, 76.42°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Naddi"
    ],
    "elevationNote": "Altitude profile rises toward ~6,400 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Naddi main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "dal-lake-trail",
      "hanuman-ka-tibba-base-camp",
      "hanuman-ka-tibba-expedition",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Dal Lake Trail",
      "Hanuman Ka Tibba Base Camp",
      "Hanuman Ka Tibba Expedition",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Naddi Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Naddi with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Naddi Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "dal-lake-trail",
    "title": "Dal Lake Trail",
    "shortName": "Dal Lake",
    "destinationName": "Naddi",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 3,
    "maxAltitudeFt": 6000,
    "startingPoint": "Naddi / Forsyth Ganj",
    "endingPoint": "Dal Lake",
    "basePriceInr": 499,
    "originalPriceInr": 699,
    "rating": 4.3,
    "reviewCount": 412,
    "seatsLeft": 18,
    "popularity": 92,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "trending",
      "bestseller",
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Dal Lake Trail demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 6000 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Dal Lake.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.290000000000006,
    "lng": 76.435,
    "summary": "A peaceful forest-and-meadow stroll to Dharamshala’s Dal Lake — deodars, local picnics, and soft hills under the high Dhauladhar wall. From ₹499.",
    "overview": [
      "Dal Lake Trail is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. A peaceful forest-and-meadow stroll to Dharamshala’s Dal Lake — deodars, local picnics, and soft hills under the high Dhauladhar wall.",
      "Dal Lake near Naddi is a deodar-framed pause button: locals picnic, prayer flags stir, and the high ridge hangs like a painted backdrop above the water.",
      "The itinerary usually starts at Naddi / Forsyth Ganj and ends at Dal Lake, spanning about 3 km across 1 day(s) with a high point near 6,000 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Dal Lake experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 6,000 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Dal Lake day hike",
        "distanceKm": 3,
        "altitudeFt": 6000,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Naddi / Forsyth Ganj, follow local trails to Dal Lake, enjoy the viewpoints and cultural stops, and return to Dal Lake by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Dal Lake Trail corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.290000000000006°N, 76.435°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Dal Lake"
    ],
    "elevationNote": "Altitude profile rises toward ~6,000 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Dal Lake main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "hanuman-ka-tibba-base-camp",
      "hanuman-ka-tibba-expedition",
      "moon-peak-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Hanuman Ka Tibba Base Camp",
      "Hanuman Ka Tibba Expedition",
      "Moon Peak Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Naddi a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Dal Lake Trail crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Dal Lake with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Dal Lake Trail departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "hanuman-ka-tibba-base-camp",
    "title": "Hanuman Ka Tibba Base Camp",
    "shortName": "Hanuman Ka Tibba BC",
    "destinationName": "Dharamshala / Bharmour approach",
    "difficulty": "challenging",
    "durationDays": 6,
    "durationNights": 5,
    "distanceKm": 55,
    "maxAltitudeFt": 15500,
    "startingPoint": "Bharmour / designated roadhead",
    "endingPoint": "Base camp below Hanuman Tibba approaches",
    "basePriceInr": 24999,
    "originalPriceInr": 28999,
    "rating": 4.9,
    "reviewCount": 96,
    "seatsLeft": 11,
    "popularity": 52,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Hanuman Ka Tibba Base Camp demands challenging effort across 6 day(s). Train with stair climbs and loaded walks; respect altitude above 15500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Hanuman Ka Tibba BC.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.300000000000004,
    "lng": 76.45,
    "summary": "Expedition-style approach toward Hanuman Ka Tibba (Friendship Peak massif region logistics vary) with high camps, glacier travel briefing, and serious mountain days. From ₹24,999.",
    "overview": [
      "Hanuman Ka Tibba Base Camp is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Expedition-style approach toward Hanuman Ka Tibba (Friendship Peak massif region logistics vary) with high camps, glacier travel briefing, and serious mountain days.",
      "Base-camp logistics for Hanuman Ka Tibba demand expedition discipline — staged camps, glacier briefings, and weather patience before any summit talk begins.",
      "The itinerary usually starts at Bharmour / designated roadhead and ends at Base camp below Hanuman Tibba approaches, spanning about 55 km across 6 day(s) with a high point near 15,500 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Hanuman Ka Tibba BC experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 15,500 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bharmour / designated roadhead",
        "distanceKm": 10,
        "altitudeFt": 10075,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba BC route",
        "description": "Briefing at Bharmour / designated roadhead, gradual gain through forests and villages toward the first camp for Hanuman Ka Tibba Base Camp. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Hanuman Ka Tibba BC high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 11625,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba BC route",
        "description": "Move deeper along the Hanuman Ka Tibba BC corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Hanuman Ka Tibba BC high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 13175,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba BC route",
        "description": "Move deeper along the Hanuman Ka Tibba BC corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Hanuman Ka Tibba BC high camp movement — Day 4",
        "distanceKm": 10,
        "altitudeFt": 14725,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba BC route",
        "description": "Move deeper along the Hanuman Ka Tibba BC corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Hanuman Ka Tibba BC high camp movement — Day 5",
        "distanceKm": 10,
        "altitudeFt": 16275,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba BC route",
        "description": "Move deeper along the Hanuman Ka Tibba BC corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Summit / highlight day and exit toward Base camp below Hanuman Tibba approaches",
        "distanceKm": 8,
        "altitudeFt": 11625,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Base camp below Hanuman Tibba approaches",
        "description": "Early start for the route’s highlight section near Hanuman Ka Tibba BC, then a long but rewarding descent toward Base camp below Hanuman Tibba approaches. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Hanuman Ka Tibba Base Camp corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.300000000000004°N, 76.45°E). Embed Google Map via CMS.",
    "camps": [
      "Hanuman Ka Tibba BC camp 1",
      "Hanuman Ka Tibba BC high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~15,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Hanuman Ka Tibba BC main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Hanuman Ka Tibba BC camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "hanuman-ka-tibba-expedition",
      "moon-peak-trek",
      "dhauladhar-base-camp-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Hanuman Ka Tibba Expedition",
      "Moon Peak Trek",
      "Dhauladhar Base Camp Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala / Bharmour approach a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Hanuman Ka Tibba Base Camp crowded?",
        "a": "Hanuman Ka Tibba BC sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Hanuman Ka Tibba BC with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Hanuman Ka Tibba Base Camp departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "hanuman-ka-tibba-expedition",
    "title": "Hanuman Ka Tibba Expedition",
    "shortName": "Hanuman Ka Tibba",
    "destinationName": "Manali–Dhauladhar approaches",
    "difficulty": "difficult",
    "durationDays": 8,
    "durationNights": 7,
    "distanceKm": 70,
    "maxAltitudeFt": 19300,
    "startingPoint": "Manali / Solang / designated BC",
    "endingPoint": "Summit attempt & descend",
    "basePriceInr": 45999,
    "originalPriceInr": 51999,
    "rating": 4.9,
    "reviewCount": 64,
    "seatsLeft": 8,
    "popularity": 48,
    "bestSeasons": [
      "summer",
      "autumn"
    ],
    "months": [
      "June",
      "July",
      "August",
      "September"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Small expedition teams (4–8)",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "July–September weather windows only; avoid deep winter",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 90,
    "fitnessDescription": "The Hanuman Ka Tibba Expedition demands difficult effort across 8 day(s). Train with stair climbs and loaded walks; respect altitude above 19300 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Hanuman Ka Tibba.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.31,
    "lng": 76.465,
    "summary": "Guided mountaineering expedition aiming for Hanuman Ka Tibba — ropework, glacier travel, summit window, and full expedition support. From ₹45,999.",
    "overview": [
      "Hanuman Ka Tibba Expedition is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Guided mountaineering expedition aiming for Hanuman Ka Tibba — ropework, glacier travel, summit window, and full expedition support.",
      "The full Hanuman Ka Tibba expedition mixes rope skills, glacier travel, and a narrow summit window. Only experienced climbers with guided support should consider it.",
      "The itinerary usually starts at Manali / Solang / designated BC and ends at Summit attempt & descend, spanning about 70 km across 8 day(s) with a high point near 19,300 ft. Graded difficult, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Hanuman Ka Tibba experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 19,300 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Manali / Solang / designated BC",
        "distanceKm": 10,
        "altitudeFt": 12545,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba route",
        "description": "Briefing at Manali / Solang / designated BC, gradual gain through forests and villages toward the first camp for Hanuman Ka Tibba Expedition. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Hanuman Ka Tibba high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 14475,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba route",
        "description": "Move deeper along the Hanuman Ka Tibba corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Hanuman Ka Tibba high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 16405,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba route",
        "description": "Move deeper along the Hanuman Ka Tibba corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Hanuman Ka Tibba high camp movement — Day 4",
        "distanceKm": 10,
        "altitudeFt": 18335,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba route",
        "description": "Move deeper along the Hanuman Ka Tibba corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Hanuman Ka Tibba high camp movement — Day 5",
        "distanceKm": 10,
        "altitudeFt": 20265,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba route",
        "description": "Move deeper along the Hanuman Ka Tibba corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Hanuman Ka Tibba high camp movement — Day 6",
        "distanceKm": 10,
        "altitudeFt": 22195,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba route",
        "description": "Move deeper along the Hanuman Ka Tibba corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 7,
        "title": "Hanuman Ka Tibba high camp movement — Day 7",
        "distanceKm": 10,
        "altitudeFt": 24125,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Hanuman Ka Tibba route",
        "description": "Move deeper along the Hanuman Ka Tibba corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 8,
        "title": "Summit / highlight day and exit toward Summit attempt & descend",
        "distanceKm": 8,
        "altitudeFt": 14475,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Summit attempt & descend",
        "description": "Early start for the route’s highlight section near Hanuman Ka Tibba, then a long but rewarding descent toward Summit attempt & descend. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Hanuman Ka Tibba Expedition corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.31°N, 76.465°E). Embed Google Map via CMS.",
    "camps": [
      "Hanuman Ka Tibba camp 1",
      "Hanuman Ka Tibba high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~19,300 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Hanuman Ka Tibba main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Hanuman Ka Tibba camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "moon-peak-trek",
      "dhauladhar-base-camp-trek",
      "lam-dal-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Moon Peak Trek",
      "Dhauladhar Base Camp Trek",
      "Lam Dal Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Manali–Dhauladhar approaches a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Hanuman Ka Tibba Expedition crowded?",
        "a": "Hanuman Ka Tibba sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Hanuman Ka Tibba with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Hanuman Ka Tibba Expedition departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "moon-peak-trek",
    "title": "Moon Peak Trek",
    "shortName": "Moon Peak",
    "destinationName": "Dharamshala",
    "difficulty": "challenging",
    "durationDays": 4,
    "durationNights": 3,
    "distanceKm": 28,
    "maxAltitudeFt": 15200,
    "startingPoint": "Triund / Lahesh corridor",
    "endingPoint": "Moon Peak viewpoint / return",
    "basePriceInr": 12999,
    "originalPriceInr": 14999,
    "rating": 4.8,
    "reviewCount": 88,
    "seatsLeft": 14,
    "popularity": 51,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Moon Peak Trek demands challenging effort across 4 day(s). Train with stair climbs and loaded walks; respect altitude above 15200 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Moon Peak.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.32,
    "lng": 76.48,
    "summary": "A technical-leaning alpine push in the Dhauladhar above the Triund–Indrahar belt toward Moon Peak viewpoints — for experienced trekkers only. From ₹12,999.",
    "overview": [
      "Moon Peak Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. A technical-leaning alpine push in the Dhauladhar above the Triund–Indrahar belt toward Moon Peak viewpoints — for experienced trekkers only.",
      "Moon Peak’s Dhauladhar profile draws ridge walkers who want airy ground and technical awareness without a full expedition calendar.",
      "The itinerary usually starts at Triund / Lahesh corridor and ends at Moon Peak viewpoint / return, spanning about 28 km across 4 day(s) with a high point near 15,200 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Moon Peak experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 15,200 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Triund / Lahesh corridor",
        "distanceKm": 8,
        "altitudeFt": 9880,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Moon Peak route",
        "description": "Briefing at Triund / Lahesh corridor, gradual gain through forests and villages toward the first camp for Moon Peak Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Moon Peak high camp movement — Day 2",
        "distanceKm": 8,
        "altitudeFt": 11400,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Moon Peak route",
        "description": "Move deeper along the Moon Peak corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Moon Peak high camp movement — Day 3",
        "distanceKm": 8,
        "altitudeFt": 12920,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Moon Peak route",
        "description": "Move deeper along the Moon Peak corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Summit / highlight day and exit toward Moon Peak viewpoint / return",
        "distanceKm": 6,
        "altitudeFt": 11400,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Moon Peak viewpoint / return",
        "description": "Early start for the route’s highlight section near Moon Peak, then a long but rewarding descent toward Moon Peak viewpoint / return. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Moon Peak Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.32°N, 76.48°E). Embed Google Map via CMS.",
    "camps": [
      "Moon Peak camp 1",
      "Moon Peak high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~15,200 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Moon Peak main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Moon Peak camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "dhauladhar-base-camp-trek",
      "lam-dal-trek",
      "saat-dal-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Dhauladhar Base Camp Trek",
      "Lam Dal Trek",
      "Saat Dal Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Moon Peak Trek crowded?",
        "a": "Moon Peak sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Moon Peak with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Moon Peak Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "dhauladhar-base-camp-trek",
    "title": "Dhauladhar Base Camp Trek",
    "shortName": "Dhauladhar Base Camp",
    "destinationName": "Dharamshala",
    "difficulty": "moderate",
    "durationDays": 4,
    "durationNights": 3,
    "distanceKm": 30,
    "maxAltitudeFt": 12500,
    "startingPoint": "Bhagsunag or Kareri (route dependent)",
    "endingPoint": "High meadow base camp",
    "basePriceInr": 7999,
    "originalPriceInr": 9499,
    "rating": 4.7,
    "reviewCount": 174,
    "seatsLeft": 14,
    "popularity": 62,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Dhauladhar Base Camp Trek demands moderate effort across 4 day(s). Train with stair climbs and loaded walks; respect altitude above 12500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Dhauladhar Base Camp.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.330000000000005,
    "lng": 76.49499999999999,
    "summary": "Multi-day camping under the main Dhauladhar wall — meadows, high pastures, and a non-pass base-camp style itinerary for photographers and ridge lovers. From ₹7,999.",
    "overview": [
      "Dhauladhar Base Camp Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Multi-day camping under the main Dhauladhar wall — meadows, high pastures, and a non-pass base-camp style itinerary for photographers and ridge lovers.",
      "This base-camp style itinerary prioritises meadow camping under the main wall — ideal for photographers who want dawn light without committing to a pass crossing.",
      "The itinerary usually starts at Bhagsunag or Kareri (route dependent) and ends at High meadow base camp, spanning about 30 km across 4 day(s) with a high point near 12,500 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Dhauladhar Base Camp experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 12,500 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bhagsunag or Kareri (route dependent)",
        "distanceKm": 9,
        "altitudeFt": 8125,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Dhauladhar Base Camp route",
        "description": "Briefing at Bhagsunag or Kareri (route dependent), gradual gain through forests and villages toward the first camp for Dhauladhar Base Camp Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Dhauladhar Base Camp high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 9375,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Dhauladhar Base Camp route",
        "description": "Move deeper along the Dhauladhar Base Camp corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Dhauladhar Base Camp high camp movement — Day 3",
        "distanceKm": 9,
        "altitudeFt": 10625,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Dhauladhar Base Camp route",
        "description": "Move deeper along the Dhauladhar Base Camp corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Summit / highlight day and exit toward High meadow base camp",
        "distanceKm": 7,
        "altitudeFt": 9375,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near High meadow base camp",
        "description": "Early start for the route’s highlight section near Dhauladhar Base Camp, then a long but rewarding descent toward High meadow base camp. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Dhauladhar Base Camp Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.330000000000005°N, 76.49499999999999°E). Embed Google Map via CMS.",
    "camps": [
      "Dhauladhar Base Camp camp 1",
      "Dhauladhar Base Camp high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~12,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Dhauladhar Base Camp main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Dhauladhar Base Camp camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "lam-dal-trek",
      "saat-dal-trek",
      "nag-dal-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Lam Dal Trek",
      "Saat Dal Trek",
      "Nag Dal Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Dhauladhar Base Camp Trek crowded?",
        "a": "Dhauladhar Base Camp sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Dhauladhar Base Camp with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Dhauladhar Base Camp Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "lam-dal-trek",
    "title": "Lam Dal Trek",
    "shortName": "Lam Dal",
    "destinationName": "Chamba / Bharmour side",
    "difficulty": "challenging",
    "durationDays": 6,
    "durationNights": 5,
    "distanceKm": 48,
    "maxAltitudeFt": 12800,
    "startingPoint": "Bharmour / Hadsar region",
    "endingPoint": "Lam Dal alpine lake",
    "basePriceInr": 15999,
    "originalPriceInr": 18499,
    "rating": 4.8,
    "reviewCount": 120,
    "seatsLeft": 11,
    "popularity": 55,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Lam Dal Trek demands challenging effort across 6 day(s). Train with stair climbs and loaded walks; respect altitude above 12800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Lam Dal.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.34,
    "lng": 76.50999999999999,
    "summary": "Pilgrim-meets-alpine trek to sacred Lam Dal in the Dhauladhar–Manimahesh hinterland — high meadows, glacial lakes, and remote camps. From ₹15,999.",
    "overview": [
      "Lam Dal Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Pilgrim-meets-alpine trek to sacred Lam Dal in the Dhauladhar–Manimahesh hinterland — high meadows, glacial lakes, and remote camps.",
      "Lam Dal blends pilgrimage energy with glacial-lake silence. High pastures, cold water, and remote camps define the approach from the Bharmour hinterland.",
      "The itinerary usually starts at Bharmour / Hadsar region and ends at Lam Dal alpine lake, spanning about 48 km across 6 day(s) with a high point near 12,800 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Lam Dal experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 12,800 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bharmour / Hadsar region",
        "distanceKm": 9,
        "altitudeFt": 8320,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Lam Dal route",
        "description": "Briefing at Bharmour / Hadsar region, gradual gain through forests and villages toward the first camp for Lam Dal Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Lam Dal high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 9600,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Lam Dal route",
        "description": "Move deeper along the Lam Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Lam Dal high camp movement — Day 3",
        "distanceKm": 9,
        "altitudeFt": 10880,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Lam Dal route",
        "description": "Move deeper along the Lam Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Lam Dal high camp movement — Day 4",
        "distanceKm": 9,
        "altitudeFt": 12160,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Lam Dal route",
        "description": "Move deeper along the Lam Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Lam Dal high camp movement — Day 5",
        "distanceKm": 9,
        "altitudeFt": 13440,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Lam Dal route",
        "description": "Move deeper along the Lam Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Summit / highlight day and exit toward Lam Dal alpine lake",
        "distanceKm": 7,
        "altitudeFt": 9600,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Lam Dal alpine lake",
        "description": "Early start for the route’s highlight section near Lam Dal, then a long but rewarding descent toward Lam Dal alpine lake. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Lam Dal Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.34°N, 76.50999999999999°E). Embed Google Map via CMS.",
    "camps": [
      "Lam Dal camp 1",
      "Lam Dal high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~12,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Lam Dal main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Lam Dal camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "saat-dal-trek",
      "nag-dal-trek",
      "kali-kund-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Saat Dal Trek",
      "Nag Dal Trek",
      "Kali Kund Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Chamba / Bharmour side a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Lam Dal Trek crowded?",
        "a": "Lam Dal sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Lam Dal with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Lam Dal Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "saat-dal-trek",
    "title": "Saat Dal Trek",
    "shortName": "Saat Dal",
    "destinationName": "Chamba hinterland",
    "difficulty": "challenging",
    "durationDays": 7,
    "durationNights": 6,
    "distanceKm": 55,
    "maxAltitudeFt": 13200,
    "startingPoint": "Bharmour region roadhead",
    "endingPoint": "Saat Dal lake cluster",
    "basePriceInr": 16999,
    "originalPriceInr": 19499,
    "rating": 4.8,
    "reviewCount": 78,
    "seatsLeft": 9,
    "popularity": 50,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Saat Dal Trek demands challenging effort across 7 day(s). Train with stair climbs and loaded walks; respect altitude above 13200 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Saat Dal.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.35,
    "lng": 76.3,
    "summary": "Explore the Saat Dal (seven lakes) circuit in the high Dhauladhar — multi-lake camping, cold nights, and few commercial groups. From ₹16,999.",
    "overview": [
      "Saat Dal Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Explore the Saat Dal (seven lakes) circuit in the high Dhauladhar — multi-lake camping, cold nights, and few commercial groups.",
      "Saat Dal’s multi-lake circuit rewards those who like repetition with variation — each tarn has its own shoreline mood and camping constraint.",
      "The itinerary usually starts at Bharmour region roadhead and ends at Saat Dal lake cluster, spanning about 55 km across 7 day(s) with a high point near 13,200 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Saat Dal experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 13,200 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bharmour region roadhead",
        "distanceKm": 9,
        "altitudeFt": 8580,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Saat Dal route",
        "description": "Briefing at Bharmour region roadhead, gradual gain through forests and villages toward the first camp for Saat Dal Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Saat Dal high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 9900,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Saat Dal route",
        "description": "Move deeper along the Saat Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Saat Dal high camp movement — Day 3",
        "distanceKm": 9,
        "altitudeFt": 11220,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Saat Dal route",
        "description": "Move deeper along the Saat Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Saat Dal high camp movement — Day 4",
        "distanceKm": 9,
        "altitudeFt": 12540,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Saat Dal route",
        "description": "Move deeper along the Saat Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Saat Dal high camp movement — Day 5",
        "distanceKm": 9,
        "altitudeFt": 13860,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Saat Dal route",
        "description": "Move deeper along the Saat Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Saat Dal high camp movement — Day 6",
        "distanceKm": 9,
        "altitudeFt": 15180,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Saat Dal route",
        "description": "Move deeper along the Saat Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 7,
        "title": "Summit / highlight day and exit toward Saat Dal lake cluster",
        "distanceKm": 7,
        "altitudeFt": 9900,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Saat Dal lake cluster",
        "description": "Early start for the route’s highlight section near Saat Dal, then a long but rewarding descent toward Saat Dal lake cluster. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Saat Dal Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.35°N, 76.3°E). Embed Google Map via CMS.",
    "camps": [
      "Saat Dal camp 1",
      "Saat Dal high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~13,200 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Saat Dal main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Saat Dal camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "nag-dal-trek",
      "kali-kund-trek",
      "lahesh-cave-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Nag Dal Trek",
      "Kali Kund Trek",
      "Lahesh Cave Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Chamba hinterland a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Saat Dal Trek crowded?",
        "a": "Saat Dal sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Saat Dal with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Saat Dal Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "nag-dal-trek",
    "title": "Nag Dal Trek",
    "shortName": "Nag Dal",
    "destinationName": "Chamba / Dhauladhar",
    "difficulty": "challenging",
    "durationDays": 5,
    "durationNights": 4,
    "distanceKm": 42,
    "maxAltitudeFt": 12600,
    "startingPoint": "Local roadhead near Bharmour belt",
    "endingPoint": "Nag Dal",
    "basePriceInr": 13999,
    "originalPriceInr": 15999,
    "rating": 4.7,
    "reviewCount": 70,
    "seatsLeft": 12,
    "popularity": 49,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Nag Dal Trek demands challenging effort across 5 day(s). Train with stair climbs and loaded walks; respect altitude above 12600 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Nag Dal.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.36,
    "lng": 76.315,
    "summary": "High-altitude lake trek to Nag Dal — serpentine meadows, icy shores, and a quieter alternative to busier Himachal lake trails. From ₹13,999.",
    "overview": [
      "Nag Dal Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. High-altitude lake trek to Nag Dal — serpentine meadows, icy shores, and a quieter alternative to busier Himachal lake trails.",
      "Nag Dal stays quieter than Himachal’s poster lakes. Expect icy shores, long approaches, and a strong sense of being deep in shepherd country.",
      "The itinerary usually starts at Local roadhead near Bharmour belt and ends at Nag Dal, spanning about 42 km across 5 day(s) with a high point near 12,600 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Nag Dal experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 12,600 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Local roadhead near Bharmour belt",
        "distanceKm": 9,
        "altitudeFt": 8190,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Nag Dal route",
        "description": "Briefing at Local roadhead near Bharmour belt, gradual gain through forests and villages toward the first camp for Nag Dal Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Nag Dal high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 9450,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Nag Dal route",
        "description": "Move deeper along the Nag Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Nag Dal high camp movement — Day 3",
        "distanceKm": 9,
        "altitudeFt": 10710,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Nag Dal route",
        "description": "Move deeper along the Nag Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Nag Dal high camp movement — Day 4",
        "distanceKm": 9,
        "altitudeFt": 11970,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Nag Dal route",
        "description": "Move deeper along the Nag Dal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Summit / highlight day and exit toward Nag Dal",
        "distanceKm": 7,
        "altitudeFt": 9450,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Nag Dal",
        "description": "Early start for the route’s highlight section near Nag Dal, then a long but rewarding descent toward Nag Dal. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Nag Dal Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.36°N, 76.315°E). Embed Google Map via CMS.",
    "camps": [
      "Nag Dal camp 1",
      "Nag Dal high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~12,600 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Nag Dal main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Nag Dal camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "kali-kund-trek",
      "lahesh-cave-trek",
      "gaj-pass-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Kali Kund Trek",
      "Lahesh Cave Trek",
      "Gaj Pass Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Chamba / Dhauladhar a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Nag Dal Trek crowded?",
        "a": "Nag Dal sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Nag Dal with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Nag Dal Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "kali-kund-trek",
    "title": "Kali Kund Trek",
    "shortName": "Kali Kund",
    "destinationName": "Dharamshala region",
    "difficulty": "moderate",
    "durationDays": 3,
    "durationNights": 2,
    "distanceKm": 20,
    "maxAltitudeFt": 11800,
    "startingPoint": "Regional trailhead (seasonal)",
    "endingPoint": "Kali Kund",
    "basePriceInr": 6999,
    "originalPriceInr": 8499,
    "rating": 4.6,
    "reviewCount": 92,
    "seatsLeft": 15,
    "popularity": 52,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Kali Kund Trek demands moderate effort across 3 day(s). Train with stair climbs and loaded walks; respect altitude above 11800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Kali Kund.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.370000000000005,
    "lng": 76.33,
    "summary": "Visit the sacred Kali Kund water body in the Dhauladhar folds — forest approach, alpine scrub, and a spiritually charged high camp. From ₹6,999.",
    "overview": [
      "Kali Kund Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Visit the sacred Kali Kund water body in the Dhauladhar folds — forest approach, alpine scrub, and a spiritually charged high camp.",
      "Kali Kund is as much shrine as waterbody — approach with cultural respect, warm layers, and time to sit with the mountain quiet.",
      "The itinerary usually starts at Regional trailhead (seasonal) and ends at Kali Kund, spanning about 20 km across 3 day(s) with a high point near 11,800 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Kali Kund experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 11,800 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Regional trailhead (seasonal)",
        "distanceKm": 8,
        "altitudeFt": 7670,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kali Kund route",
        "description": "Briefing at Regional trailhead (seasonal), gradual gain through forests and villages toward the first camp for Kali Kund Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Kali Kund high camp movement — Day 2",
        "distanceKm": 8,
        "altitudeFt": 8850,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kali Kund route",
        "description": "Move deeper along the Kali Kund corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Summit / highlight day and exit toward Kali Kund",
        "distanceKm": 6,
        "altitudeFt": 8850,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Kali Kund",
        "description": "Early start for the route’s highlight section near Kali Kund, then a long but rewarding descent toward Kali Kund. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Kali Kund Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.370000000000005°N, 76.33°E). Embed Google Map via CMS.",
    "camps": [
      "Kali Kund camp 1",
      "Kali Kund high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~11,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Kali Kund main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Kali Kund camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "lahesh-cave-trek",
      "gaj-pass-trek",
      "chobia-pass-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Lahesh Cave Trek",
      "Gaj Pass Trek",
      "Chobia Pass Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala region a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Kali Kund Trek crowded?",
        "a": "Kali Kund sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Kali Kund with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Kali Kund Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "lahesh-cave-trek",
    "title": "Lahesh Cave Trek",
    "shortName": "Lahesh Cave",
    "destinationName": "McLeod Ganj",
    "difficulty": "moderate",
    "durationDays": 3,
    "durationNights": 2,
    "distanceKm": 24,
    "maxAltitudeFt": 11500,
    "startingPoint": "Bhagsunag",
    "endingPoint": "Lahesh Cave / return",
    "basePriceInr": 3499,
    "originalPriceInr": 4199,
    "rating": 4.8,
    "reviewCount": 340,
    "seatsLeft": 15,
    "popularity": 83,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Lahesh Cave Trek demands moderate effort across 3 day(s). Train with stair climbs and loaded walks; respect altitude above 11500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Lahesh Cave.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.38,
    "lng": 76.345,
    "summary": "Trek beyond Snowline to the legendary Lahesh Cave — natural rock shelter, Indrahar staging ground, and one of Dharamshala’s most atmospheric camps. From ₹3,499.",
    "overview": [
      "Lahesh Cave Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Trek beyond Snowline to the legendary Lahesh Cave — natural rock shelter, Indrahar staging ground, and one of Dharamshala’s most atmospheric camps.",
      "Lahesh Cave is the storied rock shelter on the Indrahar approach: wind-scoured, photogenic, and a natural overnight for parties pushing beyond Snowline.",
      "The itinerary usually starts at Bhagsunag and ends at Lahesh Cave / return, spanning about 24 km across 3 day(s) with a high point near 11,500 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Lahesh Cave experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 11,500 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bhagsunag",
        "distanceKm": 9,
        "altitudeFt": 7475,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Lahesh Cave route",
        "description": "Briefing at Bhagsunag, gradual gain through forests and villages toward the first camp for Lahesh Cave Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Lahesh Cave high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 8625,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Lahesh Cave route",
        "description": "Move deeper along the Lahesh Cave corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Summit / highlight day and exit toward Lahesh Cave / return",
        "distanceKm": 7,
        "altitudeFt": 8625,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Lahesh Cave / return",
        "description": "Early start for the route’s highlight section near Lahesh Cave, then a long but rewarding descent toward Lahesh Cave / return. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Lahesh Cave Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.38°N, 76.345°E). Embed Google Map via CMS.",
    "camps": [
      "Lahesh Cave camp 1",
      "Lahesh Cave high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~11,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Lahesh Cave main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Lahesh Cave camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "gaj-pass-trek",
      "chobia-pass-trek",
      "kugti-pass-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Gaj Pass Trek",
      "Chobia Pass Trek",
      "Kugti Pass Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in McLeod Ganj a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Lahesh Cave Trek crowded?",
        "a": "Lahesh Cave sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Lahesh Cave with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Lahesh Cave Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "gaj-pass-trek",
    "title": "Gaj Pass Trek",
    "shortName": "Gaj Pass",
    "destinationName": "Kangra–Chamba",
    "difficulty": "challenging",
    "durationDays": 6,
    "durationNights": 5,
    "distanceKm": 50,
    "maxAltitudeFt": 14100,
    "startingPoint": "Kangra / Gaj valley approach",
    "endingPoint": "Pass crossing / Chamba side",
    "basePriceInr": 14999,
    "originalPriceInr": 17499,
    "rating": 4.7,
    "reviewCount": 58,
    "seatsLeft": 11,
    "popularity": 47,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Gaj Pass Trek demands challenging effort across 6 day(s). Train with stair climbs and loaded walks; respect altitude above 14100 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Gaj Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.39,
    "lng": 76.36,
    "summary": "Remote Gaj Pass crossing linking Kangra drainages with Chamba — long days, shepherd trails, and serious navigation. From ₹14,999.",
    "overview": [
      "Gaj Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Remote Gaj Pass crossing linking Kangra drainages with Chamba — long days, shepherd trails, and serious navigation.",
      "Gaj Pass links obscure Kangra drainages with Chamba trails — a shepherd highway with serious navigation and few commercial footprints.",
      "The itinerary usually starts at Kangra / Gaj valley approach and ends at Pass crossing / Chamba side, spanning about 50 km across 6 day(s) with a high point near 14,100 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Gaj Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 14,100 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Kangra / Gaj valley approach",
        "distanceKm": 9,
        "altitudeFt": 9165,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Gaj Pass route",
        "description": "Briefing at Kangra / Gaj valley approach, gradual gain through forests and villages toward the first camp for Gaj Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Gaj Pass high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 10575,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Gaj Pass route",
        "description": "Move deeper along the Gaj Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Gaj Pass high camp movement — Day 3",
        "distanceKm": 9,
        "altitudeFt": 11985,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Gaj Pass route",
        "description": "Move deeper along the Gaj Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Gaj Pass high camp movement — Day 4",
        "distanceKm": 9,
        "altitudeFt": 13395,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Gaj Pass route",
        "description": "Move deeper along the Gaj Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Gaj Pass high camp movement — Day 5",
        "distanceKm": 9,
        "altitudeFt": 14805,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Gaj Pass route",
        "description": "Move deeper along the Gaj Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Summit / highlight day and exit toward Pass crossing / Chamba side",
        "distanceKm": 7,
        "altitudeFt": 10575,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Pass crossing / Chamba side",
        "description": "Early start for the route’s highlight section near Gaj Pass, then a long but rewarding descent toward Pass crossing / Chamba side. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Gaj Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.39°N, 76.36°E). Embed Google Map via CMS.",
    "camps": [
      "Gaj Pass camp 1",
      "Gaj Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~14,100 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Gaj Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Gaj Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "chobia-pass-trek",
      "kugti-pass-trek",
      "jalsu-pass-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Chobia Pass Trek",
      "Kugti Pass Trek",
      "Jalsu Pass Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Kangra–Chamba a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Gaj Pass Trek crowded?",
        "a": "Gaj Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Gaj Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Gaj Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "chobia-pass-trek",
    "title": "Chobia Pass Trek",
    "shortName": "Chobia Pass",
    "destinationName": "Bharmour–Lahaul",
    "difficulty": "difficult",
    "durationDays": 8,
    "durationNights": 7,
    "distanceKm": 75,
    "maxAltitudeFt": 16700,
    "startingPoint": "Bharmour / Kugti side",
    "endingPoint": "Lahaul side descent",
    "basePriceInr": 27999,
    "originalPriceInr": 31999,
    "rating": 4.9,
    "reviewCount": 44,
    "seatsLeft": 8,
    "popularity": 46,
    "bestSeasons": [
      "summer",
      "autumn"
    ],
    "months": [
      "June",
      "July",
      "August",
      "September"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Small expedition teams (4–8)",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "July–September weather windows only; avoid deep winter",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 90,
    "fitnessDescription": "The Chobia Pass Trek demands difficult effort across 8 day(s). Train with stair climbs and loaded walks; respect altitude above 16700 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Chobia Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.2,
    "lng": 76.375,
    "summary": "High Chobia Pass expedition across wild Dhauladhar–Pir Panjal connecting terrain — for seasoned expedition teams only. From ₹27,999.",
    "overview": [
      "Chobia Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. High Chobia Pass expedition across wild Dhauladhar–Pir Panjal connecting terrain — for seasoned expedition teams only.",
      "Chobia is a high, committing crossing where Dhauladhar wildness meets Lahaul weather. Self-sufficiency and expedition leadership are non-negotiable.",
      "The itinerary usually starts at Bharmour / Kugti side and ends at Lahaul side descent, spanning about 75 km across 8 day(s) with a high point near 16,700 ft. Graded difficult, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Chobia Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 16,700 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bharmour / Kugti side",
        "distanceKm": 10,
        "altitudeFt": 10855,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chobia Pass route",
        "description": "Briefing at Bharmour / Kugti side, gradual gain through forests and villages toward the first camp for Chobia Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Chobia Pass high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 12525,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chobia Pass route",
        "description": "Move deeper along the Chobia Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Chobia Pass high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 14195,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chobia Pass route",
        "description": "Move deeper along the Chobia Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Chobia Pass high camp movement — Day 4",
        "distanceKm": 10,
        "altitudeFt": 15865,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chobia Pass route",
        "description": "Move deeper along the Chobia Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Chobia Pass high camp movement — Day 5",
        "distanceKm": 10,
        "altitudeFt": 17535,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chobia Pass route",
        "description": "Move deeper along the Chobia Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Chobia Pass high camp movement — Day 6",
        "distanceKm": 10,
        "altitudeFt": 19205,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chobia Pass route",
        "description": "Move deeper along the Chobia Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 7,
        "title": "Chobia Pass high camp movement — Day 7",
        "distanceKm": 10,
        "altitudeFt": 20875,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chobia Pass route",
        "description": "Move deeper along the Chobia Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 8,
        "title": "Summit / highlight day and exit toward Lahaul side descent",
        "distanceKm": 8,
        "altitudeFt": 12525,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Lahaul side descent",
        "description": "Early start for the route’s highlight section near Chobia Pass, then a long but rewarding descent toward Lahaul side descent. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Chobia Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.2°N, 76.375°E). Embed Google Map via CMS.",
    "camps": [
      "Chobia Pass camp 1",
      "Chobia Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~16,700 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Chobia Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Chobia Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "kugti-pass-trek",
      "jalsu-pass-trek",
      "thamsar-pass-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Kugti Pass Trek",
      "Jalsu Pass Trek",
      "Thamsar Pass Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Bharmour–Lahaul a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Chobia Pass Trek crowded?",
        "a": "Chobia Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Chobia Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Chobia Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "kugti-pass-trek",
    "title": "Kugti Pass Trek",
    "shortName": "Kugti Pass",
    "destinationName": "Bharmour",
    "difficulty": "challenging",
    "durationDays": 7,
    "durationNights": 6,
    "distanceKm": 60,
    "maxAltitudeFt": 16500,
    "startingPoint": "Kugti Village",
    "endingPoint": "Lahaul / return options",
    "basePriceInr": 24999,
    "originalPriceInr": 28999,
    "rating": 4.8,
    "reviewCount": 52,
    "seatsLeft": 9,
    "popularity": 47,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Kugti Pass Trek demands challenging effort across 7 day(s). Train with stair climbs and loaded walks; respect altitude above 16500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Kugti Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.21,
    "lng": 76.39,
    "summary": "Classic Kugti Pass traverse from the sacred Kugti valley — temples, high pastures, and a demanding alpine crossing. From ₹24,999.",
    "overview": [
      "Kugti Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Classic Kugti Pass traverse from the sacred Kugti valley — temples, high pastures, and a demanding alpine crossing.",
      "Kugti Pass rises from a sacred valley of temples and herding culture into a stern alpine gate toward Lahaul — long, beautiful, and demanding.",
      "The itinerary usually starts at Kugti Village and ends at Lahaul / return options, spanning about 60 km across 7 day(s) with a high point near 16,500 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Kugti Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 16,500 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Kugti Village",
        "distanceKm": 10,
        "altitudeFt": 10725,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kugti Pass route",
        "description": "Briefing at Kugti Village, gradual gain through forests and villages toward the first camp for Kugti Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Kugti Pass high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 12375,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kugti Pass route",
        "description": "Move deeper along the Kugti Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Kugti Pass high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 14025,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kugti Pass route",
        "description": "Move deeper along the Kugti Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Kugti Pass high camp movement — Day 4",
        "distanceKm": 10,
        "altitudeFt": 15675,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kugti Pass route",
        "description": "Move deeper along the Kugti Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Kugti Pass high camp movement — Day 5",
        "distanceKm": 10,
        "altitudeFt": 17325,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kugti Pass route",
        "description": "Move deeper along the Kugti Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Kugti Pass high camp movement — Day 6",
        "distanceKm": 10,
        "altitudeFt": 18975,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kugti Pass route",
        "description": "Move deeper along the Kugti Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 7,
        "title": "Summit / highlight day and exit toward Lahaul / return options",
        "distanceKm": 8,
        "altitudeFt": 12375,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Lahaul / return options",
        "description": "Early start for the route’s highlight section near Kugti Pass, then a long but rewarding descent toward Lahaul / return options. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Kugti Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.21°N, 76.39°E). Embed Google Map via CMS.",
    "camps": [
      "Kugti Pass camp 1",
      "Kugti Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~16,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Kugti Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Kugti Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "jalsu-pass-trek",
      "thamsar-pass-trek",
      "rajgundha-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Jalsu Pass Trek",
      "Thamsar Pass Trek",
      "Rajgundha Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Bharmour a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Kugti Pass Trek crowded?",
        "a": "Kugti Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Kugti Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Kugti Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "jalsu-pass-trek",
    "title": "Jalsu Pass Trek",
    "shortName": "Jalsu Pass",
    "destinationName": "Kangra–Chamba",
    "difficulty": "challenging",
    "durationDays": 5,
    "durationNights": 4,
    "distanceKm": 45,
    "maxAltitudeFt": 11800,
    "startingPoint": "Baijnath / Billing–Rajgundha approaches",
    "endingPoint": "Chamba side via Jalsu",
    "basePriceInr": 12999,
    "originalPriceInr": 14999,
    "rating": 4.7,
    "reviewCount": 110,
    "seatsLeft": 12,
    "popularity": 54,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Jalsu Pass Trek demands challenging effort across 5 day(s). Train with stair climbs and loaded walks; respect altitude above 11800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Jalsu Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.220000000000006,
    "lng": 76.405,
    "summary": "Cross Jalsu Pass between Kangra and Chamba — shepherd highways, big meadow camps, and a storied trade-and-pilgrim route. From ₹12,999.",
    "overview": [
      "Jalsu Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Cross Jalsu Pass between Kangra and Chamba — shepherd highways, big meadow camps, and a storied trade-and-pilgrim route.",
      "Jalsu remains a living corridor between Kangra and Chamba: wide meadows, mule trains in season, and pass days that feel earned rather than rushed.",
      "The itinerary usually starts at Baijnath / Billing–Rajgundha approaches and ends at Chamba side via Jalsu, spanning about 45 km across 5 day(s) with a high point near 11,800 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Jalsu Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 11,800 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Baijnath / Billing–Rajgundha approaches",
        "distanceKm": 10,
        "altitudeFt": 7670,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Jalsu Pass route",
        "description": "Briefing at Baijnath / Billing–Rajgundha approaches, gradual gain through forests and villages toward the first camp for Jalsu Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Jalsu Pass high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 8850,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Jalsu Pass route",
        "description": "Move deeper along the Jalsu Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Jalsu Pass high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 10030,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Jalsu Pass route",
        "description": "Move deeper along the Jalsu Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Jalsu Pass high camp movement — Day 4",
        "distanceKm": 10,
        "altitudeFt": 11210,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Jalsu Pass route",
        "description": "Move deeper along the Jalsu Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Summit / highlight day and exit toward Chamba side via Jalsu",
        "distanceKm": 8,
        "altitudeFt": 8850,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Chamba side via Jalsu",
        "description": "Early start for the route’s highlight section near Jalsu Pass, then a long but rewarding descent toward Chamba side via Jalsu. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Jalsu Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.220000000000006°N, 76.405°E). Embed Google Map via CMS.",
    "camps": [
      "Jalsu Pass camp 1",
      "Jalsu Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~11,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Jalsu Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Jalsu Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "thamsar-pass-trek",
      "rajgundha-trek",
      "bir-billing-to-rajgundha-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Thamsar Pass Trek",
      "Rajgundha Trek",
      "Bir Billing to Rajgundha Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Kangra–Chamba a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Jalsu Pass Trek crowded?",
        "a": "Jalsu Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Jalsu Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Jalsu Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "thamsar-pass-trek",
    "title": "Thamsar Pass Trek",
    "shortName": "Thamsar Pass",
    "destinationName": "Bara Bhangal",
    "difficulty": "difficult",
    "durationDays": 9,
    "durationNights": 8,
    "distanceKm": 85,
    "maxAltitudeFt": 16200,
    "startingPoint": "Rajgundha / Bara Bhangal approaches",
    "endingPoint": "Thamsar Pass & beyond",
    "basePriceInr": 29999,
    "originalPriceInr": 34999,
    "rating": 4.9,
    "reviewCount": 38,
    "seatsLeft": 6,
    "popularity": 45,
    "bestSeasons": [
      "summer",
      "autumn"
    ],
    "months": [
      "June",
      "July",
      "August",
      "September"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Small expedition teams (4–8)",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "July–September weather windows only; avoid deep winter",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 90,
    "fitnessDescription": "The Thamsar Pass Trek demands difficult effort across 9 day(s). Train with stair climbs and loaded walks; respect altitude above 16200 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Thamsar Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.230000000000004,
    "lng": 76.42,
    "summary": "One of Himachal’s great wilderness crossings via Thamsar Pass toward Bara Bhangal — remote, long, and unforgettable. From ₹29,999.",
    "overview": [
      "Thamsar Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. One of Himachal’s great wilderness crossings via Thamsar Pass toward Bara Bhangal — remote, long, and unforgettable.",
      "Thamsar is wilderness cinema — multi-day approaches, sparse villages, and the legendary pull of Bara Bhangal on the far side.",
      "The itinerary usually starts at Rajgundha / Bara Bhangal approaches and ends at Thamsar Pass & beyond, spanning about 85 km across 9 day(s) with a high point near 16,200 ft. Graded difficult, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Thamsar Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 16,200 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Rajgundha / Bara Bhangal approaches",
        "distanceKm": 10,
        "altitudeFt": 10530,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Thamsar Pass route",
        "description": "Briefing at Rajgundha / Bara Bhangal approaches, gradual gain through forests and villages toward the first camp for Thamsar Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Thamsar Pass high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 12150,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Thamsar Pass route",
        "description": "Move deeper along the Thamsar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Thamsar Pass high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 13770,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Thamsar Pass route",
        "description": "Move deeper along the Thamsar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Thamsar Pass high camp movement — Day 4",
        "distanceKm": 10,
        "altitudeFt": 15390,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Thamsar Pass route",
        "description": "Move deeper along the Thamsar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Thamsar Pass high camp movement — Day 5",
        "distanceKm": 10,
        "altitudeFt": 17010,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Thamsar Pass route",
        "description": "Move deeper along the Thamsar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Thamsar Pass high camp movement — Day 6",
        "distanceKm": 10,
        "altitudeFt": 18630,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Thamsar Pass route",
        "description": "Move deeper along the Thamsar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 7,
        "title": "Thamsar Pass high camp movement — Day 7",
        "distanceKm": 10,
        "altitudeFt": 20250,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Thamsar Pass route",
        "description": "Move deeper along the Thamsar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 8,
        "title": "Thamsar Pass high camp movement — Day 8",
        "distanceKm": 10,
        "altitudeFt": 21870,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Thamsar Pass route",
        "description": "Move deeper along the Thamsar Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 9,
        "title": "Summit / highlight day and exit toward Thamsar Pass & beyond",
        "distanceKm": 8,
        "altitudeFt": 12150,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Thamsar Pass & beyond",
        "description": "Early start for the route’s highlight section near Thamsar Pass, then a long but rewarding descent toward Thamsar Pass & beyond. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Thamsar Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.230000000000004°N, 76.42°E). Embed Google Map via CMS.",
    "camps": [
      "Thamsar Pass camp 1",
      "Thamsar Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~16,200 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Thamsar Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Thamsar Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "rajgundha-trek",
      "bir-billing-to-rajgundha-trek",
      "barot-valley-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Rajgundha Trek",
      "Bir Billing to Rajgundha Trek",
      "Barot Valley Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Bara Bhangal a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Thamsar Pass Trek crowded?",
        "a": "Thamsar Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Thamsar Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Thamsar Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "rajgundha-trek",
    "title": "Rajgundha Trek",
    "shortName": "Rajgundha",
    "destinationName": "Bir Billing",
    "difficulty": "moderate",
    "durationDays": 3,
    "durationNights": 2,
    "distanceKm": 24,
    "maxAltitudeFt": 9800,
    "startingPoint": "Billing / Bir",
    "endingPoint": "Rajgundha Village",
    "basePriceInr": 5499,
    "originalPriceInr": 6499,
    "rating": 4.7,
    "reviewCount": 286,
    "seatsLeft": 15,
    "popularity": 76,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Rajgundha Trek demands moderate effort across 3 day(s). Train with stair climbs and loaded walks; respect altitude above 9800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Rajgundha.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.24,
    "lng": 76.435,
    "summary": "Meadow trek from the Bir Billing paragliding hills into quiet Rajgundha — pine forests, Gaddi culture, and wide Dhauladhar views. From ₹5,499.",
    "overview": [
      "Rajgundha Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Meadow trek from the Bir Billing paragliding hills into quiet Rajgundha — pine forests, Gaddi culture, and wide Dhauladhar views.",
      "Rajgundha trades Bir’s paragliding buzz for pine silence and riverside village nights under the Dhauladhar skyline.",
      "The itinerary usually starts at Billing / Bir and ends at Rajgundha Village, spanning about 24 km across 3 day(s) with a high point near 9,800 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Rajgundha experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 9,800 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Billing / Bir",
        "distanceKm": 9,
        "altitudeFt": 6370,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Rajgundha route",
        "description": "Briefing at Billing / Bir, gradual gain through forests and villages toward the first camp for Rajgundha Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Rajgundha high camp movement — Day 2",
        "distanceKm": 9,
        "altitudeFt": 7350,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Rajgundha route",
        "description": "Move deeper along the Rajgundha corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Summit / highlight day and exit toward Rajgundha Village",
        "distanceKm": 7,
        "altitudeFt": 7350,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Rajgundha Village",
        "description": "Early start for the route’s highlight section near Rajgundha, then a long but rewarding descent toward Rajgundha Village. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Rajgundha Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.24°N, 76.435°E). Embed Google Map via CMS.",
    "camps": [
      "Rajgundha camp 1",
      "Rajgundha high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~9,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Rajgundha main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Rajgundha camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "bir-billing-to-rajgundha-trek",
      "barot-valley-trek",
      "chhota-bhanghal-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Bir Billing to Rajgundha Trek",
      "Barot Valley Trek",
      "Chhota Bhanghal Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Bir Billing a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Rajgundha Trek crowded?",
        "a": "Rajgundha sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Rajgundha with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Rajgundha Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "bir-billing-to-rajgundha-trek",
    "title": "Bir Billing to Rajgundha Trek",
    "shortName": "Bir to Rajgundha",
    "destinationName": "Bir Billing",
    "difficulty": "moderate",
    "durationDays": 2,
    "durationNights": 1,
    "distanceKm": 18,
    "maxAltitudeFt": 9800,
    "startingPoint": "Billing ridge",
    "endingPoint": "Rajgundha",
    "basePriceInr": 3999,
    "originalPriceInr": 4799,
    "rating": 4.6,
    "reviewCount": 198,
    "seatsLeft": 17,
    "popularity": 65,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Bir Billing to Rajgundha Trek demands moderate effort across 2 day(s). Train with stair climbs and loaded walks; respect altitude above 9800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Bir to Rajgundha.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.25,
    "lng": 76.45,
    "summary": "The popular Bir Billing to Rajgundha walk — paraglider skies behind you, forest trails ahead, and a riverside village camp. From ₹3,999.",
    "overview": [
      "Bir Billing to Rajgundha Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. The popular Bir Billing to Rajgundha walk — paraglider skies behind you, forest trails ahead, and a riverside village camp.",
      "The Billing–Rajgundha link is the weekend favourite: start among take-off ramps, finish beside a quiet Gaddi settlement.",
      "The itinerary usually starts at Billing ridge and ends at Rajgundha, spanning about 18 km across 2 day(s) with a high point near 9,800 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Bir to Rajgundha experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 9,800 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Billing ridge",
        "distanceKm": 10,
        "altitudeFt": 6370,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bir to Rajgundha route",
        "description": "Briefing at Billing ridge, gradual gain through forests and villages toward the first camp for Bir Billing to Rajgundha Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Summit / highlight day and exit toward Rajgundha",
        "distanceKm": 8,
        "altitudeFt": 7350,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Rajgundha",
        "description": "Early start for the route’s highlight section near Bir to Rajgundha, then a long but rewarding descent toward Rajgundha. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Bir Billing to Rajgundha Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.25°N, 76.45°E). Embed Google Map via CMS.",
    "camps": [
      "Bir to Rajgundha camp 1",
      "Bir to Rajgundha overnight"
    ],
    "elevationNote": "Altitude profile rises toward ~9,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Bir to Rajgundha main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Bir to Rajgundha camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "barot-valley-trek",
      "chhota-bhanghal-trek",
      "bara-bhangal-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Barot Valley Trek",
      "Chhota Bhanghal Trek",
      "Bara Bhangal Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Bir Billing a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Bir Billing to Rajgundha Trek crowded?",
        "a": "Bir to Rajgundha sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Bir to Rajgundha with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Bir Billing to Rajgundha Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "barot-valley-trek",
    "title": "Barot Valley Trek",
    "shortName": "Barot Valley",
    "destinationName": "Barot",
    "difficulty": "easy",
    "durationDays": 2,
    "durationNights": 1,
    "distanceKm": 12,
    "maxAltitudeFt": 7500,
    "startingPoint": "Barot town",
    "endingPoint": "Valley meadows / return",
    "basePriceInr": 2999,
    "originalPriceInr": 3599,
    "rating": 4.5,
    "reviewCount": 164,
    "seatsLeft": 17,
    "popularity": 61,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Barot Valley Trek demands easy effort across 2 day(s). Train with stair climbs and loaded walks; respect altitude above 7500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Barot Valley.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.260000000000005,
    "lng": 76.465,
    "summary": "Gentle valley hiking around Barot — Uhl river, trout country, deodar forests, and soft trails ideal for families. From ₹2,999.",
    "overview": [
      "Barot Valley Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Gentle valley hiking around Barot — Uhl river, trout country, deodar forests, and soft trails ideal for families.",
      "Barot is trout water and deodar shade — gentle valley miles for families recovering from harder Dhauladhar objectives.",
      "The itinerary usually starts at Barot town and ends at Valley meadows / return, spanning about 12 km across 2 day(s) with a high point near 7,500 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Barot Valley experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 7,500 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Barot town",
        "distanceKm": 7,
        "altitudeFt": 4875,
        "walkingHours": "3–5 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Barot Valley route",
        "description": "Briefing at Barot town, gradual gain through forests and villages toward the first camp for Barot Valley Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Summit / highlight day and exit toward Valley meadows / return",
        "distanceKm": 5,
        "altitudeFt": 5625,
        "walkingHours": "3–5 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Valley meadows / return",
        "description": "Early start for the route’s highlight section near Barot Valley, then a long but rewarding descent toward Valley meadows / return. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Barot Valley Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.260000000000005°N, 76.465°E). Embed Google Map via CMS.",
    "camps": [
      "Barot Valley camp 1",
      "Barot Valley overnight"
    ],
    "elevationNote": "Altitude profile rises toward ~7,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Barot Valley main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Barot Valley camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "chhota-bhanghal-trek",
      "bara-bhangal-trek",
      "arthurs-seat-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Chhota Bhanghal Trek",
      "Bara Bhangal Trek",
      "Arthur's Seat Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Barot a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Barot Valley Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Barot Valley with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Barot Valley Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "chhota-bhanghal-trek",
    "title": "Chhota Bhanghal Trek",
    "shortName": "Chhota Bhanghal",
    "destinationName": "Barot–Bhanghal",
    "difficulty": "moderate",
    "durationDays": 4,
    "durationNights": 3,
    "distanceKm": 35,
    "maxAltitudeFt": 10500,
    "startingPoint": "Barot / Poling approaches",
    "endingPoint": "Chhota Bhanghal villages",
    "basePriceInr": 8999,
    "originalPriceInr": 10499,
    "rating": 4.6,
    "reviewCount": 72,
    "seatsLeft": 14,
    "popularity": 49,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Chhota Bhanghal Trek demands moderate effort across 4 day(s). Train with stair climbs and loaded walks; respect altitude above 10500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Chhota Bhanghal.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.27,
    "lng": 76.48,
    "summary": "Explore Chhota Bhanghal’s lesser-known valleys — village trails, river crossings, and authentic mid-Himalayan culture. From ₹8,999.",
    "overview": [
      "Chhota Bhanghal Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Explore Chhota Bhanghal’s lesser-known valleys — village trails, river crossings, and authentic mid-Himalayan culture.",
      "Chhota Bhanghal reveals mid-Himalayan village life without the Instagram density of McLeod Ganj — rivers, terraces, and honest walking days.",
      "The itinerary usually starts at Barot / Poling approaches and ends at Chhota Bhanghal villages, spanning about 35 km across 4 day(s) with a high point near 10,500 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Chhota Bhanghal experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 10,500 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Barot / Poling approaches",
        "distanceKm": 10,
        "altitudeFt": 6825,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chhota Bhanghal route",
        "description": "Briefing at Barot / Poling approaches, gradual gain through forests and villages toward the first camp for Chhota Bhanghal Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Chhota Bhanghal high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 7875,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chhota Bhanghal route",
        "description": "Move deeper along the Chhota Bhanghal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Chhota Bhanghal high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 8925,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Chhota Bhanghal route",
        "description": "Move deeper along the Chhota Bhanghal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Summit / highlight day and exit toward Chhota Bhanghal villages",
        "distanceKm": 8,
        "altitudeFt": 7875,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Chhota Bhanghal villages",
        "description": "Early start for the route’s highlight section near Chhota Bhanghal, then a long but rewarding descent toward Chhota Bhanghal villages. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Chhota Bhanghal Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.27°N, 76.48°E). Embed Google Map via CMS.",
    "camps": [
      "Chhota Bhanghal camp 1",
      "Chhota Bhanghal high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~10,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Chhota Bhanghal main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Chhota Bhanghal camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "bara-bhangal-trek",
      "arthurs-seat-trek",
      "camel-peak-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Bara Bhangal Trek",
      "Arthur's Seat Trek",
      "Camel Peak Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Barot–Bhanghal a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Chhota Bhanghal Trek crowded?",
        "a": "Chhota Bhanghal sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Chhota Bhanghal with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Chhota Bhanghal Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "bara-bhangal-trek",
    "title": "Bara Bhangal Trek",
    "shortName": "Bara Bhangal",
    "destinationName": "Bara Bhangal",
    "difficulty": "difficult",
    "durationDays": 10,
    "durationNights": 9,
    "distanceKm": 95,
    "maxAltitudeFt": 15000,
    "startingPoint": "Billing–Rajgundha or Mandi approaches",
    "endingPoint": "Bara Bhangal Village",
    "basePriceInr": 34999,
    "originalPriceInr": 39999,
    "rating": 4.9,
    "reviewCount": 48,
    "seatsLeft": 5,
    "popularity": 46,
    "bestSeasons": [
      "summer",
      "autumn"
    ],
    "months": [
      "June",
      "July",
      "August",
      "September"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking"
    ],
    "suitableFor": [
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Small expedition teams (4–8)",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "July–September weather windows only; avoid deep winter",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 90,
    "fitnessDescription": "The Bara Bhangal Trek demands difficult effort across 10 day(s). Train with stair climbs and loaded walks; respect altitude above 15000 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Bara Bhangal.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.28,
    "lng": 76.49499999999999,
    "summary": "Legendary trek to one of India’s most remote inhabited villages — multi-pass wilderness, self-sufficient camping, and profound isolation. From ₹34,999.",
    "overview": [
      "Bara Bhangal Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Legendary trek to one of India’s most remote inhabited villages — multi-pass wilderness, self-sufficient camping, and profound isolation.",
      "Reaching Bara Bhangal is a statement trek: remote habitation, multi-pass logistics, and a profound sense of Himalayan isolation.",
      "The itinerary usually starts at Billing–Rajgundha or Mandi approaches and ends at Bara Bhangal Village, spanning about 95 km across 10 day(s) with a high point near 15,000 ft. Graded difficult, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Bara Bhangal experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 15,000 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Billing–Rajgundha or Mandi approaches",
        "distanceKm": 11,
        "altitudeFt": 9750,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Briefing at Billing–Rajgundha or Mandi approaches, gradual gain through forests and villages toward the first camp for Bara Bhangal Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Bara Bhangal high camp movement — Day 2",
        "distanceKm": 11,
        "altitudeFt": 11250,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Move deeper along the Bara Bhangal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Bara Bhangal high camp movement — Day 3",
        "distanceKm": 11,
        "altitudeFt": 12750,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Move deeper along the Bara Bhangal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Bara Bhangal high camp movement — Day 4",
        "distanceKm": 11,
        "altitudeFt": 14250,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Move deeper along the Bara Bhangal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Bara Bhangal high camp movement — Day 5",
        "distanceKm": 11,
        "altitudeFt": 15750,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Move deeper along the Bara Bhangal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Bara Bhangal high camp movement — Day 6",
        "distanceKm": 11,
        "altitudeFt": 17250,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Move deeper along the Bara Bhangal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 7,
        "title": "Bara Bhangal high camp movement — Day 7",
        "distanceKm": 11,
        "altitudeFt": 18750,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Move deeper along the Bara Bhangal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 8,
        "title": "Bara Bhangal high camp movement — Day 8",
        "distanceKm": 11,
        "altitudeFt": 20250,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Move deeper along the Bara Bhangal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 9,
        "title": "Bara Bhangal high camp movement — Day 9",
        "distanceKm": 11,
        "altitudeFt": 21750,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Bara Bhangal route",
        "description": "Move deeper along the Bara Bhangal corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 10,
        "title": "Summit / highlight day and exit toward Bara Bhangal Village",
        "distanceKm": 9,
        "altitudeFt": 11250,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Bara Bhangal Village",
        "description": "Early start for the route’s highlight section near Bara Bhangal, then a long but rewarding descent toward Bara Bhangal Village. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Bara Bhangal Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.28°N, 76.49499999999999°E). Embed Google Map via CMS.",
    "camps": [
      "Bara Bhangal camp 1",
      "Bara Bhangal high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~15,000 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Bara Bhangal main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Bara Bhangal camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "arthurs-seat-trek",
      "camel-peak-trek",
      "rifle-horn-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Arthur's Seat Trek",
      "Camel Peak Trek",
      "Rifle Horn Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Bara Bhangal a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Bara Bhangal Trek crowded?",
        "a": "Bara Bhangal sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Bara Bhangal with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Bara Bhangal Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "arthurs-seat-trek",
    "title": "Arthur's Seat Trek",
    "shortName": "Arthur's Seat",
    "destinationName": "Dharamshala",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 5,
    "maxAltitudeFt": 7200,
    "startingPoint": "McLeod Ganj / Dharamkot trails",
    "endingPoint": "Arthur's Seat viewpoint",
    "basePriceInr": 699,
    "originalPriceInr": 899,
    "rating": 4.5,
    "reviewCount": 188,
    "seatsLeft": 18,
    "popularity": 64,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Arthur's Seat Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 7200 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Arthur's Seat.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.290000000000006,
    "lng": 76.50999999999999,
    "summary": "Quiet viewpoint hike to Arthur’s Seat above the McLeod–Dharamkot belt — forest shade and a classic Kangra Valley overlook. From ₹699.",
    "overview": [
      "Arthur's Seat Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Quiet viewpoint hike to Arthur’s Seat above the McLeod–Dharamkot belt — forest shade and a classic Kangra Valley overlook.",
      "Arthur’s Seat offers a classic Kangra overlook without heavy packs — forest approaches and a wide valley reveal at the top.",
      "The itinerary usually starts at McLeod Ganj / Dharamkot trails and ends at Arthur's Seat viewpoint, spanning about 5 km across 1 day(s) with a high point near 7,200 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Arthur's Seat experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 7,200 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arthur's Seat day hike",
        "distanceKm": 5,
        "altitudeFt": 7200,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from McLeod Ganj / Dharamkot trails, follow local trails to Arthur's Seat, enjoy the viewpoints and cultural stops, and return to Arthur's Seat viewpoint by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Arthur's Seat Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.290000000000006°N, 76.50999999999999°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Arthur's Seat"
    ],
    "elevationNote": "Altitude profile rises toward ~7,200 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Arthur's Seat main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "camel-peak-trek",
      "rifle-horn-trek",
      "ilaqa-got-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Camel Peak Trek",
      "Rifle Horn Trek",
      "Ilaqa Got Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Arthur's Seat Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Arthur's Seat with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Arthur's Seat Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "camel-peak-trek",
    "title": "Camel Peak Trek",
    "shortName": "Camel Peak",
    "destinationName": "Dharamshala",
    "difficulty": "moderate",
    "durationDays": 2,
    "durationNights": 1,
    "distanceKm": 14,
    "maxAltitudeFt": 9800,
    "startingPoint": "Triund belt approaches",
    "endingPoint": "Camel Peak viewpoint",
    "basePriceInr": 2499,
    "originalPriceInr": 2999,
    "rating": 4.6,
    "reviewCount": 102,
    "seatsLeft": 17,
    "popularity": 53,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Camel Peak Trek demands moderate effort across 2 day(s). Train with stair climbs and loaded walks; respect altitude above 9800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Camel Peak.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.300000000000004,
    "lng": 76.3,
    "summary": "Ridge trek toward Camel Peak profiles on the Dhauladhar skyline — photographic rock shapes and airy meadow walks. From ₹2,499.",
    "overview": [
      "Camel Peak Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Ridge trek toward Camel Peak profiles on the Dhauladhar skyline — photographic rock shapes and airy meadow walks.",
      "Camel Peak’s silhouette from the Triund belt is unforgettable; the ridge walk toward it rewards careful footing and clear mornings.",
      "The itinerary usually starts at Triund belt approaches and ends at Camel Peak viewpoint, spanning about 14 km across 2 day(s) with a high point near 9,800 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Camel Peak experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 9,800 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Triund belt approaches",
        "distanceKm": 8,
        "altitudeFt": 6370,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Camel Peak route",
        "description": "Briefing at Triund belt approaches, gradual gain through forests and villages toward the first camp for Camel Peak Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Summit / highlight day and exit toward Camel Peak viewpoint",
        "distanceKm": 6,
        "altitudeFt": 7350,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Camel Peak viewpoint",
        "description": "Early start for the route’s highlight section near Camel Peak, then a long but rewarding descent toward Camel Peak viewpoint. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Camel Peak Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.300000000000004°N, 76.3°E). Embed Google Map via CMS.",
    "camps": [
      "Camel Peak camp 1",
      "Camel Peak overnight"
    ],
    "elevationNote": "Altitude profile rises toward ~9,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Camel Peak main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Camel Peak camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "rifle-horn-trek",
      "ilaqa-got-trek",
      "reoti-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Rifle Horn Trek",
      "Ilaqa Got Trek",
      "Reoti Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Camel Peak Trek crowded?",
        "a": "Camel Peak sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Camel Peak with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Camel Peak Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "rifle-horn-trek",
    "title": "Rifle Horn Trek",
    "shortName": "Rifle Horn",
    "destinationName": "Dharamshala",
    "difficulty": "challenging",
    "durationDays": 3,
    "durationNights": 2,
    "distanceKm": 20,
    "maxAltitudeFt": 12000,
    "startingPoint": "Upper Dharamshala alpine approaches",
    "endingPoint": "Rifle Horn ridge",
    "basePriceInr": 7999,
    "originalPriceInr": 9499,
    "rating": 4.7,
    "reviewCount": 66,
    "seatsLeft": 15,
    "popularity": 48,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Rifle Horn Trek demands challenging effort across 3 day(s). Train with stair climbs and loaded walks; respect altitude above 12000 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Rifle Horn.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.31,
    "lng": 76.315,
    "summary": "Airy ridge day toward Rifle Horn — exposure, scree, and dramatic Dhauladhar architecture for sure-footed trekkers. From ₹7,999.",
    "overview": [
      "Rifle Horn Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Airy ridge day toward Rifle Horn — exposure, scree, and dramatic Dhauladhar architecture for sure-footed trekkers.",
      "Rifle Horn is for sure-footed ridge travellers — exposure, scree chatter, and dramatic rock architecture above the Dharamshala foothills.",
      "The itinerary usually starts at Upper Dharamshala alpine approaches and ends at Rifle Horn ridge, spanning about 20 km across 3 day(s) with a high point near 12,000 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Rifle Horn experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 12,000 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Upper Dharamshala alpine approaches",
        "distanceKm": 8,
        "altitudeFt": 7800,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Rifle Horn route",
        "description": "Briefing at Upper Dharamshala alpine approaches, gradual gain through forests and villages toward the first camp for Rifle Horn Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Rifle Horn high camp movement — Day 2",
        "distanceKm": 8,
        "altitudeFt": 9000,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Rifle Horn route",
        "description": "Move deeper along the Rifle Horn corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Summit / highlight day and exit toward Rifle Horn ridge",
        "distanceKm": 6,
        "altitudeFt": 9000,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Rifle Horn ridge",
        "description": "Early start for the route’s highlight section near Rifle Horn, then a long but rewarding descent toward Rifle Horn ridge. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Rifle Horn Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.31°N, 76.315°E). Embed Google Map via CMS.",
    "camps": [
      "Rifle Horn camp 1",
      "Rifle Horn high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~12,000 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Rifle Horn main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Rifle Horn camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "ilaqa-got-trek",
      "reoti-trek",
      "tatwani-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Ilaqa Got Trek",
      "Reoti Trek",
      "Tatwani Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Rifle Horn Trek crowded?",
        "a": "Rifle Horn sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Rifle Horn with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Rifle Horn Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "ilaqa-got-trek",
    "title": "Ilaqa Got Trek",
    "shortName": "Ilaqa Got",
    "destinationName": "Dharamshala",
    "difficulty": "moderate",
    "durationDays": 3,
    "durationNights": 2,
    "distanceKm": 22,
    "maxAltitudeFt": 11200,
    "startingPoint": "Kareri / Dhauladhar pasture approaches",
    "endingPoint": "Ilaqa Got meadow",
    "basePriceInr": 5999,
    "originalPriceInr": 6999,
    "rating": 4.6,
    "reviewCount": 84,
    "seatsLeft": 15,
    "popularity": 51,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "high-altitude"
    ],
    "suitableFor": [
      "solo",
      "couples",
      "beginners",
      "experienced"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "12+ with fitness",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Good cardio fitness",
    "fitnessScore": 62,
    "fitnessDescription": "The Ilaqa Got Trek demands moderate effort across 3 day(s). Train with stair climbs and loaded walks; respect altitude above 11200 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Ilaqa Got.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.32,
    "lng": 76.33,
    "summary": "High pasture trek to Ilaqa Got — Gaddi herding grounds, wildflowers in season, and quiet camping under granite walls. From ₹5,999.",
    "overview": [
      "Ilaqa Got Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. High pasture trek to Ilaqa Got — Gaddi herding grounds, wildflowers in season, and quiet camping under granite walls.",
      "Ilaqa Got is high pasture poetry: seasonal flowers, herding camps, and granite walls that feel close enough to touch.",
      "The itinerary usually starts at Kareri / Dhauladhar pasture approaches and ends at Ilaqa Got meadow, spanning about 22 km across 3 day(s) with a high point near 11,200 ft. Graded moderate, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Ilaqa Got experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 11,200 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Kareri / Dhauladhar pasture approaches",
        "distanceKm": 8,
        "altitudeFt": 7280,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Ilaqa Got route",
        "description": "Briefing at Kareri / Dhauladhar pasture approaches, gradual gain through forests and villages toward the first camp for Ilaqa Got Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Ilaqa Got high camp movement — Day 2",
        "distanceKm": 8,
        "altitudeFt": 8400,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Ilaqa Got route",
        "description": "Move deeper along the Ilaqa Got corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Summit / highlight day and exit toward Ilaqa Got meadow",
        "distanceKm": 6,
        "altitudeFt": 8400,
        "walkingHours": "5–7 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Ilaqa Got meadow",
        "description": "Early start for the route’s highlight section near Ilaqa Got, then a long but rewarding descent toward Ilaqa Got meadow. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Ilaqa Got Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.32°N, 76.33°E). Embed Google Map via CMS.",
    "camps": [
      "Ilaqa Got camp 1",
      "Ilaqa Got high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~11,200 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Ilaqa Got main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Ilaqa Got camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "reoti-trek",
      "tatwani-trek",
      "kunal-pathri-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Reoti Trek",
      "Tatwani Trek",
      "Kunal Pathri Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Ilaqa Got Trek crowded?",
        "a": "Ilaqa Got sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Ilaqa Got with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Ilaqa Got Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "reoti-trek",
    "title": "Reoti Trek",
    "shortName": "Reoti",
    "destinationName": "Kangra foothills",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 7,
    "maxAltitudeFt": 5500,
    "startingPoint": "Local Kangra foothill roadhead",
    "endingPoint": "Reoti area trails",
    "basePriceInr": 899,
    "originalPriceInr": 1199,
    "rating": 4.4,
    "reviewCount": 96,
    "seatsLeft": 18,
    "popularity": 52,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Reoti Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 5500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Reoti.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.330000000000005,
    "lng": 76.345,
    "summary": "Lesser-known foothill walk near the wider Dharamshala–Kangra belt — villages, streams, and soft forest gradients. From ₹899.",
    "overview": [
      "Reoti Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Lesser-known foothill walk near the wider Dharamshala–Kangra belt — villages, streams, and soft forest gradients.",
      "Reoti’s foothill paths stay under the tourist radar — stream crossings, village edges, and soft gradients for an easy Kangra day.",
      "The itinerary usually starts at Local Kangra foothill roadhead and ends at Reoti area trails, spanning about 7 km across 1 day(s) with a high point near 5,500 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Reoti experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 5,500 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Reoti day hike",
        "distanceKm": 7,
        "altitudeFt": 5500,
        "walkingHours": "4–6 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Local Kangra foothill roadhead, follow local trails to Reoti, enjoy the viewpoints and cultural stops, and return to Reoti area trails by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Reoti Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.330000000000005°N, 76.345°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Reoti"
    ],
    "elevationNote": "Altitude profile rises toward ~5,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Reoti main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "tatwani-trek",
      "kunal-pathri-trek",
      "chamunda-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Tatwani Trek",
      "Kunal Pathri Trek",
      "Chamunda Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Kangra foothills a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Reoti Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Reoti with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Reoti Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "tatwani-trek",
    "title": "Tatwani Trek",
    "shortName": "Tatwani",
    "destinationName": "Kangra",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 6,
    "maxAltitudeFt": 4800,
    "startingPoint": "Tatwani roadhead",
    "endingPoint": "Tatwani hot springs",
    "basePriceInr": 999,
    "originalPriceInr": 1299,
    "rating": 4.5,
    "reviewCount": 220,
    "seatsLeft": 18,
    "popularity": 68,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Tatwani Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 4800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Tatwani.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.34,
    "lng": 76.36,
    "summary": "Combine an easy valley walk with Tatwani’s natural hot springs — perfect recovery day after harder Dhauladhar treks. From ₹999.",
    "overview": [
      "Tatwani Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Combine an easy valley walk with Tatwani’s natural hot springs — perfect recovery day after harder Dhauladhar treks.",
      "Tatwani pairs light walking with natural hot springs — the recovery ritual many Dhauladhar trekkers crave after cold ridge nights.",
      "The itinerary usually starts at Tatwani roadhead and ends at Tatwani hot springs, spanning about 6 km across 1 day(s) with a high point near 4,800 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Tatwani experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 4,800 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Tatwani day hike",
        "distanceKm": 6,
        "altitudeFt": 4800,
        "walkingHours": "4–6 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Tatwani roadhead, follow local trails to Tatwani, enjoy the viewpoints and cultural stops, and return to Tatwani hot springs by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Tatwani Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.34°N, 76.36°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Tatwani"
    ],
    "elevationNote": "Altitude profile rises toward ~4,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Tatwani main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "kunal-pathri-trek",
      "chamunda-trek",
      "aghanjar-mahadev-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Kunal Pathri Trek",
      "Chamunda Trek",
      "Aghanjar Mahadev Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Kangra a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Tatwani Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Tatwani with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Tatwani Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "kunal-pathri-trek",
    "title": "Kunal Pathri Trek",
    "shortName": "Kunal Pathri",
    "destinationName": "Dharamshala",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 5,
    "maxAltitudeFt": 6500,
    "startingPoint": "Kunal Pathri Temple approach",
    "endingPoint": "Kunal Pathri",
    "basePriceInr": 799,
    "originalPriceInr": 999,
    "rating": 4.5,
    "reviewCount": 175,
    "seatsLeft": 18,
    "popularity": 62,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Kunal Pathri Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 6500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Kunal Pathri.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.35,
    "lng": 76.375,
    "summary": "Sacred hill walk to Kunal Pathri Temple — pine forests, local pilgrims, and a serene half-day outing from Dharamshala. From ₹799.",
    "overview": [
      "Kunal Pathri Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Sacred hill walk to Kunal Pathri Temple — pine forests, local pilgrims, and a serene half-day outing from Dharamshala.",
      "Kunal Pathri’s temple hill is pine-scented and locally loved — a half-day cultural climb when you want calm over conquest.",
      "The itinerary usually starts at Kunal Pathri Temple approach and ends at Kunal Pathri, spanning about 5 km across 1 day(s) with a high point near 6,500 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Kunal Pathri experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 6,500 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kunal Pathri day hike",
        "distanceKm": 5,
        "altitudeFt": 6500,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Kunal Pathri Temple approach, follow local trails to Kunal Pathri, enjoy the viewpoints and cultural stops, and return to Kunal Pathri by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Kunal Pathri Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.35°N, 76.375°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Kunal Pathri"
    ],
    "elevationNote": "Altitude profile rises toward ~6,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Kunal Pathri main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "chamunda-trek",
      "aghanjar-mahadev-trek",
      "galu-devi-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Chamunda Trek",
      "Aghanjar Mahadev Trek",
      "Galu Devi Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Kunal Pathri Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Kunal Pathri with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Kunal Pathri Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "chamunda-trek",
    "title": "Chamunda Trek",
    "shortName": "Chamunda",
    "destinationName": "Kangra",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 4,
    "maxAltitudeFt": 3500,
    "startingPoint": "Chamunda Devi Temple area",
    "endingPoint": "Hill trails around Chamunda",
    "basePriceInr": 599,
    "originalPriceInr": 799,
    "rating": 4.4,
    "reviewCount": 310,
    "seatsLeft": 18,
    "popularity": 79,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Chamunda Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 3500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Chamunda.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.36,
    "lng": 76.39,
    "summary": "Temple-town trails around Chamunda Devi on the Baner river — spiritual atmosphere with light hillside walking. From ₹599.",
    "overview": [
      "Chamunda Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Temple-town trails around Chamunda Devi on the Baner river — spiritual atmosphere with light hillside walking.",
      "Around Chamunda Devi, hillside paths mix devotion with Baner river air — short walks that still feel rooted in Kangra’s sacred geography.",
      "The itinerary usually starts at Chamunda Devi Temple area and ends at Hill trails around Chamunda, spanning about 4 km across 1 day(s) with a high point near 3,500 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Chamunda experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 3,500 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Chamunda day hike",
        "distanceKm": 4,
        "altitudeFt": 3500,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Chamunda Devi Temple area, follow local trails to Chamunda, enjoy the viewpoints and cultural stops, and return to Hill trails around Chamunda by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Chamunda Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.36°N, 76.39°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Chamunda"
    ],
    "elevationNote": "Altitude profile rises toward ~3,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Chamunda main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "aghanjar-mahadev-trek",
      "galu-devi-trek",
      "bagalu-nag-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Aghanjar Mahadev Trek",
      "Galu Devi Trek",
      "Bagalu Nag Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Kangra a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Chamunda Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Chamunda with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Chamunda Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "aghanjar-mahadev-trek",
    "title": "Aghanjar Mahadev Trek",
    "shortName": "Aghanjar Mahadev",
    "destinationName": "Kangra",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 5,
    "maxAltitudeFt": 4200,
    "startingPoint": "Near Gaggal / Kangra approaches",
    "endingPoint": "Aghanjar Mahadev Temple",
    "basePriceInr": 699,
    "originalPriceInr": 899,
    "rating": 4.5,
    "reviewCount": 148,
    "seatsLeft": 18,
    "popularity": 59,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Aghanjar Mahadev Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 4200 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Aghanjar Mahadev.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.370000000000005,
    "lng": 76.405,
    "summary": "Forest walk to Aghanjar Mahadev — ancient Shiva shrine set among trees, ideal for a quiet cultural half-day near the airport belt. From ₹699.",
    "overview": [
      "Aghanjar Mahadev Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Forest walk to Aghanjar Mahadev — ancient Shiva shrine set among trees, ideal for a quiet cultural half-day near the airport belt.",
      "Aghanjar Mahadev hides an old Shiva shrine in forest calm near the Gaggal belt — ideal when flight timings leave you a free half day.",
      "The itinerary usually starts at Near Gaggal / Kangra approaches and ends at Aghanjar Mahadev Temple, spanning about 5 km across 1 day(s) with a high point near 4,200 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Aghanjar Mahadev experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 4,200 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Aghanjar Mahadev day hike",
        "distanceKm": 5,
        "altitudeFt": 4200,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Near Gaggal / Kangra approaches, follow local trails to Aghanjar Mahadev, enjoy the viewpoints and cultural stops, and return to Aghanjar Mahadev Temple by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Aghanjar Mahadev Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.370000000000005°N, 76.405°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Aghanjar Mahadev"
    ],
    "elevationNote": "Altitude profile rises toward ~4,200 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Aghanjar Mahadev main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "galu-devi-trek",
      "bagalu-nag-trek",
      "kareri-to-triund-traverse",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Galu Devi Trek",
      "Bagalu Nag Trek",
      "Kareri to Triund Traverse",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Kangra a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Aghanjar Mahadev Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Aghanjar Mahadev with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Aghanjar Mahadev Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "galu-devi-trek",
    "title": "Galu Devi Trek",
    "shortName": "Galu Devi",
    "destinationName": "Dharamkot",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 4,
    "maxAltitudeFt": 7000,
    "startingPoint": "Dharamkot",
    "endingPoint": "Galu Devi Temple",
    "basePriceInr": 699,
    "originalPriceInr": 899,
    "rating": 4.6,
    "reviewCount": 390,
    "seatsLeft": 18,
    "popularity": 89,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "bestseller",
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Galu Devi Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 7000 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Galu Devi.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.38,
    "lng": 76.42,
    "summary": "Popular short climb from Dharamkot to Galu Devi — prayer flags, café culture, and the classic start toward Triund. From ₹699.",
    "overview": [
      "Galu Devi Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Popular short climb from Dharamkot to Galu Devi — prayer flags, café culture, and the classic start toward Triund.",
      "Galu Devi is Dharamkot’s classic prayer-flag climb and the cultural doorstep of the Triund trail system.",
      "The itinerary usually starts at Dharamkot and ends at Galu Devi Temple, spanning about 4 km across 1 day(s) with a high point near 7,000 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Galu Devi experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 7,000 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Galu Devi day hike",
        "distanceKm": 4,
        "altitudeFt": 7000,
        "walkingHours": "2–4 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Dharamkot, follow local trails to Galu Devi, enjoy the viewpoints and cultural stops, and return to Galu Devi Temple by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Galu Devi Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.38°N, 76.42°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Galu Devi"
    ],
    "elevationNote": "Altitude profile rises toward ~7,000 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Galu Devi main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "bagalu-nag-trek",
      "kareri-to-triund-traverse",
      "toral-pass-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Bagalu Nag Trek",
      "Kareri to Triund Traverse",
      "Toral Pass Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Dharamkot a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Galu Devi Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Galu Devi with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Galu Devi Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "bagalu-nag-trek",
    "title": "Bagalu Nag Trek",
    "shortName": "Bagalu Nag",
    "destinationName": "Dharamshala foothills",
    "difficulty": "easy",
    "durationDays": 1,
    "durationNights": 0,
    "distanceKm": 6,
    "maxAltitudeFt": 5800,
    "startingPoint": "Local foothill trailhead",
    "endingPoint": "Bagalu Nag temple area",
    "basePriceInr": 799,
    "originalPriceInr": 999,
    "rating": 4.3,
    "reviewCount": 80,
    "seatsLeft": 18,
    "popularity": 50,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "months": [
      "March",
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "weekend",
      "family"
    ],
    "suitableFor": [
      "family",
      "solo",
      "couples",
      "beginners"
    ],
    "badges": [
      "new"
    ],
    "ageLimit": "8+ with guardians",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Day trek — hotel/homestay in town",
    "meals": "Not included — café / packed lunch",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "5°C to 26°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "Basic fitness",
    "fitnessScore": 35,
    "fitnessDescription": "The Bagalu Nag Trek demands easy effort across 1 day(s). Train with stair climbs and loaded walks; respect altitude above 5800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Bagalu Nag.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.39,
    "lng": 76.435,
    "summary": "Quiet temple trail in the Dharamshala foothills — village paths, seasonal streams, and few tourist crowds. From ₹799.",
    "overview": [
      "Bagalu Nag Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Quiet temple trail in the Dharamshala foothills — village paths, seasonal streams, and few tourist crowds.",
      "Bagalu Nag keeps things local: quiet temple approaches, seasonal streams, and almost no commercial trek traffic.",
      "The itinerary usually starts at Local foothill trailhead and ends at Bagalu Nag temple area, spanning about 6 km across 1 day(s) with a high point near 5,800 ft. Graded easy, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Bagalu Nag experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 5,800 ft with staged ascent",
      "Beginner-friendly pacing with scenic rest stops",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Bagalu Nag day hike",
        "distanceKm": 6,
        "altitudeFt": 5800,
        "walkingHours": "4–6 hrs",
        "meals": [
          "Carry snacks / café meals"
        ],
        "accommodation": "Day trek — return to hotel / homestay",
        "description": "Start from Local foothill trailhead, follow local trails to Bagalu Nag, enjoy the viewpoints and cultural stops, and return to Bagalu Nag temple area by evening with your guide."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Guided day-hike support",
      "Trail briefing and safety support",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Bagalu Nag Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.39°N, 76.435°E). Embed Google Map via CMS.",
    "camps": [
      "Day rest points on Bagalu Nag"
    ],
    "elevationNote": "Altitude profile rises toward ~5,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Bagalu Nag main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Not applicable — day trek"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "Charge devices in town before starting.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "kareri-to-triund-traverse",
      "toral-pass-trek",
      "waru-pass-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Kareri to Triund Traverse",
      "Toral Pass Trek",
      "Waru Pass Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala foothills a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Bagalu Nag Trek crowded?",
        "a": "Popular sections near towns can be busy on weekends; early starts help."
      },
      {
        "q": "Can I combine Bagalu Nag with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Bagalu Nag Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "kareri-to-triund-traverse",
    "title": "Kareri to Triund Traverse",
    "shortName": "Kareri–Triund",
    "destinationName": "Dharamshala",
    "difficulty": "challenging",
    "durationDays": 4,
    "durationNights": 3,
    "distanceKm": 36,
    "maxAltitudeFt": 11000,
    "startingPoint": "Kareri Village",
    "endingPoint": "Bhagsunag / Triund",
    "basePriceInr": 9999,
    "originalPriceInr": 11999,
    "rating": 4.8,
    "reviewCount": 56,
    "seatsLeft": 14,
    "popularity": 47,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-5°C to 18°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Kareri to Triund Traverse demands challenging effort across 4 day(s). Train with stair climbs and loaded walks; respect altitude above 11000 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Kareri–Triund.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.2,
    "lng": 76.45,
    "summary": "Ambitious high traverse linking Kareri Lake country with the Triund ridge — navigation, stamina, and big Dhauladhar exposure. From ₹9,999.",
    "overview": [
      "Kareri to Triund Traverse is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Ambitious high traverse linking Kareri Lake country with the Triund ridge — navigation, stamina, and big Dhauladhar exposure.",
      "Linking Kareri country to Triund is a navigator’s delight — high connecting ground, stamina tests, and huge Dhauladhar side-views.",
      "The itinerary usually starts at Kareri Village and ends at Bhagsunag / Triund, spanning about 36 km across 4 day(s) with a high point near 11,000 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Kareri–Triund experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 11,000 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Kareri Village",
        "distanceKm": 10,
        "altitudeFt": 7150,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kareri–Triund route",
        "description": "Briefing at Kareri Village, gradual gain through forests and villages toward the first camp for Kareri to Triund Traverse. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Kareri–Triund high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 8250,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kareri–Triund route",
        "description": "Move deeper along the Kareri–Triund corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Kareri–Triund high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 9350,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Kareri–Triund route",
        "description": "Move deeper along the Kareri–Triund corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Summit / highlight day and exit toward Bhagsunag / Triund",
        "distanceKm": 8,
        "altitudeFt": 8250,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Bhagsunag / Triund",
        "description": "Early start for the route’s highlight section near Kareri–Triund, then a long but rewarding descent toward Bhagsunag / Triund. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Kareri to Triund Traverse corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.2°N, 76.45°E). Embed Google Map via CMS.",
    "camps": [
      "Kareri–Triund camp 1",
      "Kareri–Triund high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~11,000 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Kareri–Triund main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Kareri–Triund camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "toral-pass-trek",
      "waru-pass-trek",
      "snowline-trek",
      "kareri-lake-trek"
    ],
    "nearbyTreks": [
      "Toral Pass Trek",
      "Waru Pass Trek",
      "Snowline Trek",
      "Kareri Lake Trek"
    ],
    "travelTips": [
      "Arrive in Dharamshala a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Kareri to Triund Traverse crowded?",
        "a": "Kareri–Triund sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Kareri–Triund with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Kareri to Triund Traverse departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "toral-pass-trek",
    "title": "Toral Pass Trek",
    "shortName": "Toral Pass",
    "destinationName": "Dhauladhar",
    "difficulty": "challenging",
    "durationDays": 6,
    "durationNights": 5,
    "distanceKm": 52,
    "maxAltitudeFt": 14500,
    "startingPoint": "Chamba / Kangra remote approaches",
    "endingPoint": "Toral Pass crossing",
    "basePriceInr": 16999,
    "originalPriceInr": 19499,
    "rating": 4.7,
    "reviewCount": 40,
    "seatsLeft": 11,
    "popularity": 45,
    "bestSeasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "solo",
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Join a group | Seasonal fixed departures",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "April–June and September–November for most stable Dhauladhar weather",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 78,
    "fitnessDescription": "The Toral Pass Trek demands challenging effort across 6 day(s). Train with stair climbs and loaded walks; respect altitude above 14500 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Toral Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.21,
    "lng": 76.465,
    "summary": "Remote Toral Pass line across the Dhauladhar wilderness — for self-sufficient groups seeking solitude beyond popular Indrahar. From ₹16,999.",
    "overview": [
      "Toral Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Remote Toral Pass line across the Dhauladhar wilderness — for self-sufficient groups seeking solitude beyond popular Indrahar.",
      "Toral Pass is for those who have outgrown Indrahar crowds — remoter approaches, thinner trails, and true Dhauladhar solitude.",
      "The itinerary usually starts at Chamba / Kangra remote approaches and ends at Toral Pass crossing, spanning about 52 km across 6 day(s) with a high point near 14,500 ft. Graded challenging, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Toral Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 14,500 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Chamba / Kangra remote approaches",
        "distanceKm": 10,
        "altitudeFt": 9425,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Toral Pass route",
        "description": "Briefing at Chamba / Kangra remote approaches, gradual gain through forests and villages toward the first camp for Toral Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Toral Pass high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 10875,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Toral Pass route",
        "description": "Move deeper along the Toral Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Toral Pass high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 12325,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Toral Pass route",
        "description": "Move deeper along the Toral Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Toral Pass high camp movement — Day 4",
        "distanceKm": 10,
        "altitudeFt": 13775,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Toral Pass route",
        "description": "Move deeper along the Toral Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Toral Pass high camp movement — Day 5",
        "distanceKm": 10,
        "altitudeFt": 15225,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Toral Pass route",
        "description": "Move deeper along the Toral Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Summit / highlight day and exit toward Toral Pass crossing",
        "distanceKm": 8,
        "altitudeFt": 10875,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Toral Pass crossing",
        "description": "Early start for the route’s highlight section near Toral Pass, then a long but rewarding descent toward Toral Pass crossing. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Toral Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.21°N, 76.465°E). Embed Google Map via CMS.",
    "camps": [
      "Toral Pass camp 1",
      "Toral Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~14,500 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Toral Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Toral Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "waru-pass-trek",
      "snowline-trek",
      "laka-glacier-trek",
      "snowline-laka-trek"
    ],
    "nearbyTreks": [
      "Waru Pass Trek",
      "Snowline Trek",
      "Laka Glacier Trek",
      "Snowline Laka Trek"
    ],
    "travelTips": [
      "Arrive in Dhauladhar a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Toral Pass Trek crowded?",
        "a": "Toral Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Toral Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Toral Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  },
  {
    "slug": "waru-pass-trek",
    "title": "Waru Pass Trek",
    "shortName": "Waru Pass",
    "destinationName": "Bara Bhangal belt",
    "difficulty": "difficult",
    "durationDays": 8,
    "durationNights": 7,
    "distanceKm": 70,
    "maxAltitudeFt": 15800,
    "startingPoint": "Bara Bhangal approaches",
    "endingPoint": "Waru Pass & exit valleys",
    "basePriceInr": 27999,
    "originalPriceInr": 31999,
    "rating": 4.8,
    "reviewCount": 32,
    "seatsLeft": 8,
    "popularity": 44,
    "bestSeasons": [
      "summer",
      "autumn"
    ],
    "months": [
      "June",
      "July",
      "August",
      "September"
    ],
    "trekTypes": [
      "camping",
      "photography",
      "high-altitude",
      "backpacking",
      "snow"
    ],
    "suitableFor": [
      "experienced"
    ],
    "badges": [
      "limited",
      "new"
    ],
    "ageLimit": "16+ experienced preferred",
    "groupSize": "Small expedition teams (4–8)",
    "accommodation": "Camping / alpine homestay as per itinerary",
    "meals": "Veg meals on trek days as listed",
    "transport": "Self-arrange to roadhead; transfers can be quoted separately",
    "temperature": "-10°C to 12°C",
    "bestTime": "July–September weather windows only; avoid deep winter",
    "fitnessLevel": "High endurance & prior trek experience",
    "fitnessScore": 90,
    "fitnessDescription": "The Waru Pass Trek demands difficult effort across 8 day(s). Train with stair climbs and loaded walks; respect altitude above 15800 ft.",
    "fitnessTips": [
      "Build weekly cardio for at least 3–4 weeks before Waru Pass.",
      "Break in footwear thoroughly; blisters end more trips than weather.",
      "Practice breathing pace on sustained climbs — slow and steady wins."
    ],
    "lat": 32.220000000000006,
    "lng": 76.48,
    "summary": "Serious Waru Pass crossing in the Bara Bhangal mountain maze — long logistics, high camps, and expert leadership required. From ₹27,999.",
    "overview": [
      "Waru Pass Trek is part of India Holiday Destinations’ Dharamshala and Dhauladhar collection. Serious Waru Pass crossing in the Bara Bhangal mountain maze — long logistics, high camps, and expert leadership required.",
      "Waru Pass deepens the Bara Bhangal puzzle: long valleys, high camps, and leadership that must read weather like a sixth sense.",
      "The itinerary usually starts at Bara Bhangal approaches and ends at Waru Pass & exit valleys, spanning about 70 km across 8 day(s) with a high point near 15,800 ft. Graded difficult, it demands respect for Himachal weather, Leave No Trace camping, and honest self-assessment before you book."
    ],
    "highlights": [
      "Guided Waru Pass experience in the Dharamshala / Dhauladhar region",
      "Maximum altitude around 15,800 ft with staged ascent",
      "Serious mountain days with experienced local leadership",
      "Camping or village stays matched to the route profile",
      "Photography-friendly viewpoints across Kangra or Chamba valleys",
      "Responsible tourism practices and Leave No Trace camping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Approach from Bara Bhangal approaches",
        "distanceKm": 10,
        "altitudeFt": 10270,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Evening tea",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Waru Pass route",
        "description": "Briefing at Bara Bhangal approaches, gradual gain through forests and villages toward the first camp for Waru Pass Trek. Pace conservatively and hydrate well."
      },
      {
        "day": 2,
        "title": "Waru Pass high camp movement — Day 2",
        "distanceKm": 10,
        "altitudeFt": 11850,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Waru Pass route",
        "description": "Move deeper along the Waru Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 3,
        "title": "Waru Pass high camp movement — Day 3",
        "distanceKm": 10,
        "altitudeFt": 13430,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Waru Pass route",
        "description": "Move deeper along the Waru Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 4,
        "title": "Waru Pass high camp movement — Day 4",
        "distanceKm": 10,
        "altitudeFt": 15010,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Waru Pass route",
        "description": "Move deeper along the Waru Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 5,
        "title": "Waru Pass high camp movement — Day 5",
        "distanceKm": 10,
        "altitudeFt": 16590,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Waru Pass route",
        "description": "Move deeper along the Waru Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 6,
        "title": "Waru Pass high camp movement — Day 6",
        "distanceKm": 10,
        "altitudeFt": 18170,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Waru Pass route",
        "description": "Move deeper along the Waru Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 7,
        "title": "Waru Pass high camp movement — Day 7",
        "distanceKm": 10,
        "altitudeFt": 19750,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch",
          "Dinner"
        ],
        "accommodation": "Camping / homestay on Waru Pass route",
        "description": "Move deeper along the Waru Pass corridor with mountain views, stream crossings as applicable, and a high camp under the Dhauladhar. Your leader adjusts timing for snow or rain."
      },
      {
        "day": 8,
        "title": "Summit / highlight day and exit toward Waru Pass & exit valleys",
        "distanceKm": 8,
        "altitudeFt": 11850,
        "walkingHours": "6–9 hrs",
        "meals": [
          "Breakfast",
          "Packed lunch"
        ],
        "accommodation": "Trek ends near Waru Pass & exit valleys",
        "description": "Early start for the route’s highlight section near Waru Pass, then a long but rewarding descent toward Waru Pass & exit valleys. Buffer time for weather and photos."
      }
    ],
    "inclusions": [
      "Trek leadership and local guides",
      "Tents / listed accommodation on trek nights",
      "Meals as per itinerary (veg)",
      "Permits arranged where the package includes them",
      "Basic first-aid support with the team"
    ],
    "exclusions": [
      "Travel to the roadhead / starting point",
      "Personal gear, sleeping bags if not listed",
      "Porter / mule charges unless purchased",
      "Travel insurance and emergency evacuation beyond first aid",
      "Tips, personal expenses, and café meals in towns"
    ],
    "mapOverview": "Waru Pass Trek corridor near Dharamshala / Dhauladhar (approx. coordinates placeholder 32.220000000000006°N, 76.48°E). Embed Google Map via CMS.",
    "camps": [
      "Waru Pass camp 1",
      "Waru Pass high camp"
    ],
    "elevationNote": "Altitude profile rises toward ~15,800 ft. Descend carefully on loose scree and monsoon clay.",
    "flora": "Regional mix of chir pine, ban oak, rhododendron, deodar, and high-altitude scrub depending on elevation band.",
    "fauna": "Himalayan birds (monal, griffons), langurs in forests, and occasional goral on steep grass — observe from distance.",
    "photographySpots": [
      "Waru Pass main viewpoint",
      "Valley light at golden hour",
      "Camp ridgeline panoramas",
      "Village / temple cultural frames"
    ],
    "campingLocations": [
      "Designated Waru Pass camping zones",
      "Backup lower camp in bad weather"
    ],
    "waterSources": "Carry adequate water from the last village; treat natural sources before drinking.",
    "network": "Expect patchy or zero network beyond the last town. BSNL sometimes works in remote valleys.",
    "electricity": "No reliable charging on trail — carry power banks.",
    "atm": "Last reliable ATMs in Dharamshala, McLeod Ganj, Palampur, Baijnath, or Bharmour depending on approach.",
    "medical": "Basic trail first aid; nearest substantial care in Dharamshala / regional district hospitals.",
    "permits": "Inner forest / camping permits as required for the specific corridor; included when stated in package.",
    "forestPermissions": "Follow Himachal Forest Department and local administration rules for camping, fire, and waste.",
    "nearbyAttractions": [
      "McLeod Ganj",
      "Bhagsu Nag",
      "Kangra Fort",
      "Bir Billing",
      "Masroor Temples"
    ],
    "relatedSlugs": [
      "snowline-trek",
      "laka-glacier-trek",
      "indrahar-pass-trek",
      "triund-trek"
    ],
    "nearbyTreks": [
      "Snowline Trek",
      "Laka Glacier Trek",
      "Indrahar Pass Trek",
      "Triund Trek"
    ],
    "travelTips": [
      "Arrive in Bara Bhangal belt a night early when mornings start at the trailhead.",
      "Download offline maps; do not rely on trail network.",
      "Carry cash for village tea shops and emergency transport."
    ],
    "uniqueFaqs": [
      {
        "q": "Is Waru Pass Trek crowded?",
        "a": "Waru Pass sees far fewer groups than Triund — expect quieter camps and longer self-sufficiency."
      },
      {
        "q": "Can I combine Waru Pass with Triund?",
        "a": "Many travellers pair easier Dharamshala walks with Triund or Kareri Lake on separate days. Ask us for a custom multi-trek plan."
      }
    ],
    "reviewComments": [
      "{title} with India Holiday Destinations was well organised — clear briefings and steady pacing.",
      "Loved the Dhauladhar views on {title}. Food was simple, guides were attentive.",
      "Challenging in places but unforgettable. Would book another Dharamshala trek with this team."
    ],
    "departureDates": [
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
      "2026-10-05",
      "2026-10-12"
    ],
    "thingsToCarry": [
      "Layered clothing",
      "Rain shell",
      "Headlamp",
      "Personal medicines",
      "Reusable water bottle"
    ],
    "privateDepartureInfo": "Private Waru Pass Trek departures can be arranged for families and corporate groups subject to guide availability.",
    "groupDiscountNote": "Group discount available for 6+ travellers on the same fixed departure."
  }
];
