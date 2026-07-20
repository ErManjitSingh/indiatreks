/**
 * Himachal trek profiles for India Holiday Destinations trekking blog generator.
 * Each trek carries a unique day-by-day itinerary (start/end/camps) and unique
 * narrative fields so generated blog content never cross-copies across treks.
 */

export type TrekRegion =
  | "dharamshala"
  | "manali"
  | "spiti"
  | "kinnaur"
  | "shimla"
  | "tirthan"
  | "dalhousie"
  | "palampur"
  | "parvati"
  | "himachal";

export interface TrekDay {
  title: string;
  start: string;
  end: string;
  distanceKm: string;
  altitudeM: string;
  elevationGain: string;
  trekTime: string;
  terrain: string;
  description: string;
  forests?: string;
  waterCrossings?: string;
  viewpoints?: string;
  meals: string;
  campStay: string;
  weather: string;
  photography: string;
  safety: string;
}

export interface HimachalTrekProfile {
  key: string;
  name: string;
  region: TrekRegion;
  location: string;
  history: string;
  difficulty: "Easy" | "Easy-Moderate" | "Moderate" | "Moderate-Difficult" | "Difficult" | "Challenging";
  distanceKm: string;
  duration: string;
  highestAltitudeM: string;
  baseCamp: string;
  nearestRail: string;
  nearestAirport: string;
  roadConnectivity: string;
  bestTime: string;
  snowfallMonths: string;
  monthWeather: Array<{ month: string; note: string }>;
  temperature: string;
  floraFauna: string;
  photographySpots: string[];
  network: string;
  electricity: string;
  atm: string;
  medical: string;
  camping: string;
  permits: string;
  forestFees: string;
  guideCharges: string;
  porterCharges: string;
  packing: string[];
  fitness: string;
  ams: string;
  carry: string[];
  safety: string[];
  emergency: string[];
  nearbyAttractions: string[];
  nearbyTreks: string[];
  budget: { budget: string; standard: string; premium: string };
  days: TrekDay[];
  whyChoose: string[];
  trailOverview: string;
}

export const HIMACHAL_TREK_PROFILES: Record<string, HimachalTrekProfile> = {
  "triund": {
    "key": "triund",
    "name": "Triund Trek",
    "region": "dharamshala",
    "location": "Dharamkot / McLeod Ganj, Kangra district, Himachal Pradesh",
    "history": "Triund ridge has long been a day and overnight walk for shepherds and Dharamshala visitors. The oak-rhododendron trail from Gallu to the Dhauladhar wall became a classic beginner Himalayan overnight after McLeod Ganj grew as a travel hub.",
    "difficulty": "Easy-Moderate",
    "distanceKm": "9–10 (one way from Gallu / ~18–20 round trip)",
    "duration": "1–2 days",
    "highestAltitudeM": "2850",
    "baseCamp": "Dharamkot / Gallu Devi temple roadhead",
    "nearestRail": "Pathankot (~90 km) or Kangra Mandir",
    "nearestAirport": "Gaggal (Dharamshala) ~20 km",
    "roadConnectivity": "NH to Dharamshala–McLeod Ganj; jeepable spur to Gallu; last stretch on foot",
    "bestTime": "March–June; September–November",
    "snowfallMonths": "December–February (ridge often snow-dusted)",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Dharamkot (Triund)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Dharamkot (Triund)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Dharamkot (Triund) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Dharamkot (Triund); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Dharamkot (Triund)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Dharamkot (Triund); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Dharamkot (Triund)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Dharamkot (Triund)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Dharamkot (Triund)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Dharamkot (Triund)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Dharamkot (Triund)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Dharamkot (Triund)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Dharamkot / Gallu Devi temple roadhead; camp nights near Dharamkot at 2850 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Dharamkot / Gallu Devi temple roadhead runs through ban oak, rhododendron and chir pine, thinning into shaded forest cover for most of the route on the climb toward Dharamkot at 2850 m. Keep an eye out for Himalayan langurs, kalij pheasant and occasional snow leopard sign higher up.",
    "photographySpots": [
      "Triund at 2850 m in first light",
      "Magic View cafe lookout",
      "Laka Got glacier snout",
      "Triund camp at dusk",
      "Dharamkot / Gallu Devi temple roadhead approach and roadhead"
    ],
    "network": "Patchy Jio/Airtel on the lower trail; weak to none at higher camps",
    "electricity": "None at high camps; charge devices in Dharamkot/McLeod Ganj before departure",
    "atm": "ATMs in McLeod Ganj and Dharamshala town",
    "medical": "Clinics in McLeod Ganj; Dharamshala Civil Hospital for anything serious",
    "camping": "Designated meadow or lake camps via registered operators; no unregulated wild camping",
    "permits": "Forest department camping permission arranged by your operator; carry ID for the Triund route out of Dharamkot / Gallu Devi temple roadhead.",
    "forestFees": "Nominal forest and camping fee, typically ₹50–200 per person",
    "guideCharges": "₹1,700–3,100 per day for a local guide",
    "porterCharges": "₹1,100–2,200 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Regular walking fitness is needed for the 1–2 days climb from Dharamkot / Gallu Devi temple roadhead up to 2850 m.",
    "ams": "Low AMS risk at 2850 m near Dharamkot; hydrate well and ascend steadily from Dharamkot / Gallu Devi temple roadhead.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Bhagsu waterfall",
      "Dalai Lama Temple",
      "Naddi viewpoint",
      "Dharamkot cafes"
    ],
    "nearbyTreks": [
      "Kareri Lake",
      "Indrahar Pass",
      "Minkiani Pass",
      "Guna Devi"
    ],
    "budget": {
      "budget": "₹1,500–3,000",
      "standard": "₹4,000–7,000",
      "premium": "₹8,000–12,000"
    },
    "days": [
      {
        "title": "Day 1: Gallu to Triund meadow camp",
        "start": "Gallu Devi temple (1,800 m)",
        "end": "Triund ridge camp (2,850 m)",
        "distanceKm": "9",
        "altitudeM": "2850",
        "elevationGain": "~1,050 m",
        "trekTime": "4–6 hours",
        "terrain": "Stone steps, oak-root trail, final steep meadow approach",
        "description": "Start after tea at Gallu with a steady stone-step climb through ban oak. Pause at Magic View for Dhauladhar glimpses, then push the last steep kilometre onto Triund’s grassy ridge. Sunset lights the Kangra valley far below while the snow wall fills the northern sky.",
        "forests": "Dense ban oak and rhododendron till the final open ridge",
        "viewpoints": "Magic View cafe lookout; Triund sunset over Kangra plains",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Triund",
        "campStay": "Trekker's camp at Triund ridge camp (2,850 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Triund",
        "photography": "Best light at Triund: Magic View cafe lookout; Triund sunset over Kangra plains",
        "safety": "Wet roots and rock are slippery on the approach to Triund—shorten your stride"
      },
      {
        "title": "Day 2: Snowline optional + descend to Dharamkot",
        "start": "Triund camp (2,850 m)",
        "end": "Dharamkot / Gallu (1,800–2,000 m)",
        "distanceKm": "11–14 (with Snowline)",
        "altitudeM": "2850–3150 then descend",
        "elevationGain": "+300 m optional then -1,050 m",
        "trekTime": "5–7 hours",
        "terrain": "Rocky moraine toward Laka; steep descent on same oak trail",
        "description": "Early risers walk toward Snowline / Laka Got for glacier moraine views before breakfast. Descend carefully on the oak-root trail to Gallu and jeep or walk into Dharamkot for a late lunch. Keep knees soft on the long downhill and refill water at known cafe taps only.",
        "waterCrossings": "Seasonal seepages near Laka; usually rock-hoppable",
        "viewpoints": "Laka Got glacier snout; reverse views of Kangra valley",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Dharamkot",
        "campStay": "Trekker's camp at Dharamkot / Gallu (1,800–2,000 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Dharamkot",
        "photography": "A classic frame from Dharamkot: Laka Got glacier snout; reverse views of Kangra valley",
        "safety": "Keep the group together on the forest stretch before Dharamkot; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "Iconic Dhauladhar sunrise overnight for first-timers",
      "Short access from McLeod Ganj without long road transfers",
      "Clear ridge camping with snow peaks as backdrop"
    ],
    "trailOverview": "Oak and rhododendron climb from Gallu through Magic View and Oak Forest Cafe benches to Triund meadow under the Dhauladhar face; optional morning push toward Snowline / Laka Got before descending the same ridge trail."
  },
  "kareri": {
    "key": "kareri",
    "name": "Kareri Lake Trek",
    "region": "dharamshala",
    "location": "Kareri village to Kareri Lake, west of Dharamshala, Kangra",
    "history": "Kareri Lake (Kumarwah) sits in a high cirque used by Gaddi shepherds. The trail via Kareri village became popular as a quieter, greener alternative to crowded Triund with a true alpine lake payoff.",
    "difficulty": "Moderate",
    "distanceKm": "13–15 one way from Kareri village",
    "duration": "2–3 days",
    "highestAltitudeM": "2930",
    "baseCamp": "Kareri village",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal (Dharamshala)",
    "roadConnectivity": "Dharamshala–Ghera–Kareri jeep road; last stretch foot trail along Nakeri nallah",
    "bestTime": "May–June; September–October",
    "snowfallMonths": "December–March around the lake bowl",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Kareri (Kareri Lake)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Kareri (Kareri Lake)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Kareri (Kareri Lake) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Kareri (Kareri Lake); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Kareri (Kareri Lake)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Kareri (Kareri Lake); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Kareri (Kareri Lake)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Kareri (Kareri Lake)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Kareri (Kareri Lake)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Kareri (Kareri Lake)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Kareri (Kareri Lake)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Kareri (Kareri Lake)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kareri village; camp nights near Kareri at 2930 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Kareri village runs through ban oak, rhododendron and chir pine, thinning into shaded forest cover for most of the route on the climb toward Kareri at 2930 m. Keep an eye out for Himalayan langurs, kalij pheasant and occasional snow leopard sign higher up.",
    "photographySpots": [
      "Kareri Lake at 2930 m in first light",
      "Nakeri waterfall ledge",
      "Kareri camp at dusk",
      "Kareri village approach and roadhead",
      "Kareri on the return leg"
    ],
    "network": "Patchy Jio/Airtel on the lower trail; weak to none at higher camps",
    "electricity": "None at high camps; charge devices in Dharamkot/McLeod Ganj before departure",
    "atm": "ATMs in McLeod Ganj and Dharamshala town",
    "medical": "Clinics in McLeod Ganj; Dharamshala Civil Hospital for anything serious",
    "camping": "Designated meadow or lake camps via registered operators; no unregulated wild camping",
    "permits": "Forest department camping permission arranged by your operator; carry ID for the Kareri Lake route out of Kareri village.",
    "forestFees": "Nominal forest and camping fee, typically ₹50–200 per person",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2–3 days route from Kareri village runs 5–7 hours a day up to 2930 m.",
    "ams": "Low AMS risk at 2930 m near Kareri; hydrate well and ascend steadily from Kareri village.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kareri village temple",
      "Ghera bridge",
      "McLeod Ganj"
    ],
    "nearbyTreks": [
      "Triund",
      "Minkiani Pass",
      "Indrahar Pass"
    ],
    "budget": {
      "budget": "₹3,500–6,000",
      "standard": "₹7,000–12,000",
      "premium": "₹14,000–20,000"
    },
    "days": [
      {
        "title": "Day 1: Transfer to Kareri village + short acclimatisation walk",
        "start": "Dharamshala / McLeod Ganj",
        "end": "Kareri village (1,750 m)",
        "distanceKm": "2–3 (walk after drive)",
        "altitudeM": "1750",
        "elevationGain": "Gentle village contours",
        "trekTime": "1–2 hours walk",
        "terrain": "Village lanes, terrace paths",
        "description": "Drive via Ghera to Kareri and settle into a homestay overlooking terraced fields. Stretch legs on a short temple and nallah walk to check boots and poles. Early dinner and rest—tomorrow’s climb follows water the whole way.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Kareri",
        "campStay": "Homestay in the village at Kareri village (1,750 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Kareri",
        "photography": "A classic frame from Kareri: Village lanes, terrace paths",
        "safety": "Keep the group together on the forest stretch before Kareri; light fades quickly under the canopy"
      },
      {
        "title": "Day 2: Kareri village to Kareri Lake camp",
        "start": "Kareri village (1,750 m)",
        "end": "Kareri Lake camp (2,930 m)",
        "distanceKm": "13–15",
        "altitudeM": "2930",
        "elevationGain": "~1,180 m",
        "trekTime": "6–8 hours",
        "terrain": "Forest path, boulder hops, steep meadow finish",
        "description": "Follow the Nakeri stream through deodar shade and rocky steps, crossing side brooks on timber or stone. The final hour opens into the lake cirque where turquoise water sits under scree and snow patches. Pitch camp on designated flats away from soft lake edges.",
        "forests": "Deodar and oak mid-trail",
        "waterCrossings": "Multiple side streams; careful after rain",
        "viewpoints": "Nakeri waterfall ledge; first lake reveal",
        "meals": "Hot soup on arrival followed by a full dinner spread at Kareri",
        "campStay": "Trekker's camp at Kareri Lake camp (2,930 m)",
        "weather": "Breezy ridge air near Kareri; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Kareri: Nakeri waterfall ledge; first lake reveal",
        "safety": "Wet roots and rock are slippery on the approach to Kareri—shorten your stride"
      },
      {
        "title": "Day 3: Lake morning + descend to Kareri / Dharamshala",
        "start": "Kareri Lake (2,930 m)",
        "end": "Kareri village then road to Dharamshala",
        "distanceKm": "13–15",
        "altitudeM": "2930 â†’ 1750",
        "elevationGain": "Mostly descent",
        "trekTime": "5–7 hours",
        "terrain": "Same nallah trail downhill",
        "description": "Shoot sunrise on still water, then reverse the nallah trail to Kareri village. Jeep out toward Dharamshala by afternoon. Knees take the load—use poles and avoid rushing wet rock slabs.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Kareri",
        "campStay": "Hotel/guesthouse at Kareri village then road to Dharamshala",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Kareri",
        "photography": "Wide-angle vantage at Kareri: Same nallah trail downhill",
        "safety": "Keep the group together on the forest stretch before Kareri; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "True alpine lake quieter than Triund",
      "Shepherd-culture villages",
      "Strong overnight camping payoff"
    ],
    "trailOverview": "Jeep to Kareri village, then follow Nakeri nallah through deodar and boulder fields to the glacial Kareri Lake bowl under Dhauladhar spurs—return same route or exit via connecting ridges with a guide."
  },
  "indrahar": {
    "key": "indrahar",
    "name": "Indrahar Pass Trek",
    "region": "dharamshala",
    "location": "McLeod Ganj–Triund–Laka–Indrahar Pass–Chamba side (Lahesh / Kuarsi options)",
    "history": "Indrahar (approx 4,342 m) is a classic Dhauladhar crossing linking Kangra with Chamba shepherd routes. It is the high extension beyond Triund and Laka, historically used by Gaddi herders moving flocks across the range.",
    "difficulty": "Moderate-Difficult",
    "distanceKm": "35–45 depending on exit via Chamba or return",
    "duration": "4–6 days",
    "highestAltitudeM": "4342",
    "baseCamp": "McLeod Ganj / Triund staging",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Road to McLeod; trail thereafter; Chamba-side exits need road pickup planning",
    "bestTime": "May–June; late September–October",
    "snowfallMonths": "October–May on pass (summer window only for most groups)",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Chamba-side (Indrahar Pass)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Chamba-side (Indrahar Pass)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Chamba-side (Indrahar Pass) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Chamba-side (Indrahar Pass); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Chamba-side (Indrahar Pass)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Chamba-side (Indrahar Pass); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Chamba-side (Indrahar Pass)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Chamba-side (Indrahar Pass)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Chamba-side (Indrahar Pass)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Chamba-side (Indrahar Pass)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Chamba-side (Indrahar Pass)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Chamba-side (Indrahar Pass)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from McLeod Ganj / Triund staging; camp nights near Kuarsi at 4342 m fall to −10 to −2°C.",
    "floraFauna": "The approach from McLeod Ganj / Triund staging runs through ban oak, rhododendron and chir pine, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Kuarsi at 4342 m. Keep an eye out for Himalayan langurs, kalij pheasant and occasional snow leopard sign higher up.",
    "photographySpots": [
      "Indrahar Pass at 4342 m in first light",
      "Laka glacier snout",
      "360° Dhauladhar and Pir Panjal vistas from pass",
      "Triund camp at dusk",
      "McLeod Ganj / Triund staging approach and roadhead"
    ],
    "network": "Patchy Jio/Airtel on the lower trail; weak to none at higher camps",
    "electricity": "None at high camps; charge devices in Dharamkot/McLeod Ganj before departure",
    "atm": "ATMs in McLeod Ganj and Dharamshala town",
    "medical": "Clinics in McLeod Ganj; Dharamshala Civil Hospital for anything serious",
    "camping": "Designated meadow or lake camps via registered operators; no unregulated wild camping",
    "permits": "Forest department camping permission arranged by your operator; carry ID for the Indrahar Pass route out of McLeod Ganj / Triund staging.",
    "forestFees": "Nominal forest and camping fee, typically ₹50–200 per person",
    "guideCharges": "₹2,400–4,500 per day for a local guide",
    "porterCharges": "₹1,600–3,200 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Prior multi-day trekking experience is recommended; the 4–6 days route from McLeod Ganj / Triund staging strings together long back-to-back days up to 4342 m.",
    "ams": "Real AMS risk above 4342 m on the approach to Kuarsi; build in an acclimatisation stop and know the descent plan back to McLeod Ganj / Triund staging.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "McLeod Ganj",
      "Chamba town",
      "Khajjiar (if exiting Chamba side)"
    ],
    "nearbyTreks": [
      "Triund",
      "Minkiani Pass",
      "Kareri Lake",
      "Seven Lakes"
    ],
    "budget": {
      "budget": "₹12,000–18,000",
      "standard": "₹20,000–32,000",
      "premium": "₹35,000–50,000"
    },
    "days": [
      {
        "title": "Day 1: McLeod Ganj to Triund",
        "start": "Gallu / Dharamkot",
        "end": "Triund (2,850 m)",
        "distanceKm": "9",
        "altitudeM": "2850",
        "elevationGain": "~1,050 m",
        "trekTime": "4–6 hours",
        "terrain": "Oak forest steps to ridge meadow",
        "description": "Use Triund as the first acclimatisation camp rather than a destination. Arrive by mid-afternoon, hydrate, and sleep early. The Dhauladhar wall now becomes the next day’s objective line.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Triund",
        "campStay": "Trekker's camp at Triund (2,850 m)",
        "weather": "Breezy ridge air near Triund; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Triund: Oak forest steps to ridge meadow",
        "safety": "Wet roots and rock are slippery on the approach to Triund—shorten your stride"
      },
      {
        "title": "Day 2: Triund to Lahesh Cave via Laka Got",
        "start": "Triund (2,850 m)",
        "end": "Lahesh Cave camp (~3,500 m)",
        "distanceKm": "6–8",
        "altitudeM": "3500",
        "elevationGain": "~650 m",
        "trekTime": "4–5 hours",
        "terrain": "Moraine, boulder fields, alpine scrub",
        "description": "Leave Triund for Snowline and Laka Got’s glacial rubble, then contour toward the famous Lahesh Cave overhang. Camp on flats near the cave with pass slopes visible ahead. Rest, hydrate, and watch for AMS headaches.",
        "viewpoints": "Laka glacier snout; cave amphitheatre walls",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Lahesh",
        "campStay": "Alpine tents at Lahesh Cave camp (~3,500 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Lahesh",
        "photography": "Wide-angle vantage at Lahesh: Laka glacier snout; cave amphitheatre walls",
        "safety": "Keep the group together on the forest stretch before Lahesh; light fades quickly under the canopy"
      },
      {
        "title": "Day 3: Cross Indrahar Pass to Chamba-side meadow",
        "start": "Lahesh Cave (~3,500 m)",
        "end": "Chamba-side camp below pass (~3,600–3,800 m)",
        "distanceKm": "8–10",
        "altitudeM": "4342",
        "elevationGain": "~850 m then descent",
        "trekTime": "7–9 hours",
        "terrain": "Steep scree/snow to pass; long rocky descent",
        "description": "Pre-dawn start for the steep climb to Indrahar cairn and prayer flags at ~4,342 m. After summit photos, descend carefully on loose Chamba-side scree to the first viable meadow camp. Weather windows matter—turn back if clouds slam the pass early.",
        "viewpoints": "360° Dhauladhar and Pir Panjal vistas from pass",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Chamba-side",
        "campStay": "Alpine tents at Chamba-side camp below pass (~3,600–3,800 m)",
        "weather": "Thin, cold air at altitude near Chamba-side; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Chamba-side: 360° Dhauladhar and Pir Panjal vistas from pass",
        "safety": "Strict turnaround time on the approach to Chamba-side—do not push on if weather closes in"
      },
      {
        "title": "Day 4: Descend to Kuarsi / Illaqua roadhead",
        "start": "Chamba meadow camp",
        "end": "Kuarsi or linked roadhead village",
        "distanceKm": "12–16",
        "altitudeM": "Descend to ~2,200–2,600 m",
        "elevationGain": "Long descent",
        "trekTime": "6–8 hours",
        "terrain": "Shepherd trails, forest re-entry, village paths",
        "description": "Follow shepherd paths down through alpine grass into forest belts toward Kuarsi or the planned pickup village. Celebrate with a village meal before road transfer toward Chamba or back via longer loops. Confirm pickup timing the night before—Chamba roads are slow.",
        "forests": "Oak and deodar return mid-descent",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Kuarsi",
        "campStay": "Homestay in the village at Kuarsi or linked roadhead village",
        "weather": "Breezy ridge air near Kuarsi; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Kuarsi: Oak and deodar return mid-descent",
        "safety": "Keep the group together on the forest stretch before Kuarsi; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "True Dhauladhar pass crossing",
      "Builds on Triund into serious alpine",
      "Shepherd-route heritage"
    ],
    "trailOverview": "Ascend McLeod–Triund–Laka, camp at Lahesh Cave, cross Indrahar Pass into Chamba meadows, then descend toward Kuarsi / Illaqua roadheads—or reverse to Kangra if doing an out-and-back."
  },
  "minkiani": {
    "key": "minkiani",
    "name": "Minkiani Pass Trek",
    "region": "dharamshala",
    "location": "Kareri Lake approach to Minkiani Pass (~4,250 m), Dhauladhar",
    "history": "Minkiani is a high Dhauladhar pass traditionally used with Kareri Lake as base. It offers a quieter high-altitude objective than Indrahar for groups wanting pass views without the full Chamba crossing logistics.",
    "difficulty": "Difficult",
    "distanceKm": "30–40 round trip via Kareri",
    "duration": "4–5 days",
    "highestAltitudeM": "4250",
    "baseCamp": "Kareri village / Kareri Lake",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Road to Kareri; alpine trail thereafter",
    "bestTime": "June; September–early October",
    "snowfallMonths": "October–May on pass approaches",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Kareri (Minkiani Pass)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Kareri (Minkiani Pass)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Kareri (Minkiani Pass) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Kareri (Minkiani Pass); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Kareri (Minkiani Pass)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Kareri (Minkiani Pass); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Kareri (Minkiani Pass)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Kareri (Minkiani Pass)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Kareri (Minkiani Pass)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Kareri (Minkiani Pass)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Kareri (Minkiani Pass)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Kareri (Minkiani Pass)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kareri village / Kareri Lake; camp nights near Dharamshala at 4250 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Kareri village / Kareri Lake runs through ban oak, rhododendron and chir pine, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Dharamshala at 4250 m. Keep an eye out for Himalayan langurs, kalij pheasant and occasional snow leopard sign higher up.",
    "photographySpots": [
      "Minkiani Pass at 4250 m in first light",
      "Pass panorama",
      "Kareri camp at dusk",
      "Dharamshala camp at dusk",
      "Kareri village / Kareri Lake approach and roadhead"
    ],
    "network": "Patchy Jio/Airtel on the lower trail; weak to none at higher camps",
    "electricity": "None at high camps; charge devices in Dharamkot/McLeod Ganj before departure",
    "atm": "ATMs in McLeod Ganj and Dharamshala town",
    "medical": "Clinics in McLeod Ganj; Dharamshala Civil Hospital for anything serious",
    "camping": "Designated meadow or lake camps via registered operators; no unregulated wild camping",
    "permits": "Forest department camping permission arranged by your operator; carry ID for the Minkiani Pass route out of Kareri village / Kareri Lake.",
    "forestFees": "Nominal forest and camping fee, typically ₹50–200 per person",
    "guideCharges": "₹3,000–5,600 per day for a local guide",
    "porterCharges": "₹2,000–4,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "A strong cardio base and prior high-altitude trekking experience are strongly advised for the 4–5 days push from Kareri village / Kareri Lake to 4250 m.",
    "ams": "Real AMS risk above 4250 m on the approach to Dharamshala; build in an acclimatisation stop and know the descent plan back to Kareri village / Kareri Lake.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kareri village",
      "Dharamshala"
    ],
    "nearbyTreks": [
      "Kareri Lake",
      "Indrahar Pass",
      "Lam Dal"
    ],
    "budget": {
      "budget": "₹14,000–20,000",
      "standard": "₹22,000–35,000",
      "premium": "₹38,000–55,000"
    },
    "days": [
      {
        "title": "Day 1: Dharamshala to Kareri village",
        "start": "Dharamshala",
        "end": "Kareri village",
        "distanceKm": "Drive + short walk",
        "altitudeM": "1750",
        "elevationGain": "Road gain",
        "trekTime": "Half day",
        "terrain": "Jeep road, village paths",
        "description": "Transfer to Kareri and rest at a homestay. Sort pass gear—microspikes, warm layers, and extra snacks for the high day. Short evening walk along the nallah to loosen legs.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Kareri",
        "campStay": "Homestay in the village at Kareri village",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Kareri",
        "photography": "Wide-angle vantage at Kareri: Jeep road, village paths",
        "safety": "Keep the group together on the forest stretch before Kareri; light fades quickly under the canopy"
      },
      {
        "title": "Day 2: Kareri to Kareri Lake",
        "start": "Kareri village",
        "end": "Kareri Lake (2,930 m)",
        "distanceKm": "13–15",
        "altitudeM": "2930",
        "elevationGain": "~1,180 m",
        "trekTime": "6–8 hours",
        "terrain": "Nallah trail, boulders, meadow",
        "description": "Trek the classic Kareri Lake approach and camp for acclimatisation. Use the afternoon for a short height gain hike above camp, then sleep low. Hydration is the priority tonight.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Kareri kitchen tent",
        "campStay": "Trekker's camp at Kareri Lake (2,930 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Kareri",
        "photography": "Sunrise silhouettes at Kareri: Nallah trail, boulders, meadow",
        "safety": "Wet roots and rock are slippery on the approach to Kareri—shorten your stride"
      },
      {
        "title": "Day 3: Minkiani Pass attempt + return to lake",
        "start": "Kareri Lake",
        "end": "Kareri Lake via Minkiani Pass",
        "distanceKm": "10–14",
        "altitudeM": "4250",
        "elevationGain": "~1,300 m round trip from lake",
        "trekTime": "8–10 hours",
        "terrain": "Steep scree, snow patches, exposed ridge",
        "description": "Very early start toward Minkiani. Climb steadily on scree and seasonal snow to the pass saddle for sweeping Dhauladhar views. Return to Kareri Lake the same day—do not linger if weather turns.",
        "viewpoints": "Pass panorama; lake far below",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Kareri",
        "campStay": "Alpine tents at Kareri Lake via Minkiani Pass",
        "weather": "Clear early morning skies near Kareri usually cloud over by early afternoon",
        "photography": "Late-afternoon panorama from Kareri: Pass panorama; lake far below",
        "safety": "Snow or ice patches possible near Kareri; use microspikes and short, steady steps"
      },
      {
        "title": "Day 4: Descend to Kareri and drive out",
        "start": "Kareri Lake",
        "end": "Dharamshala",
        "distanceKm": "13–15 trek + drive",
        "altitudeM": "2930 â†’ 1750",
        "elevationGain": "Descent",
        "trekTime": "5–6 hours trek",
        "terrain": "Nallah descent",
        "description": "Descend the Nakeri trail to Kareri village and transfer to Dharamshala. Celebrate with a hot meal in McLeod Ganj. Stretch calves—quads will be sore from the pass day.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Dharamshala",
        "campStay": "Hotel/guesthouse at Dharamshala",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Dharamshala",
        "photography": "Best light at Dharamshala: Nallah descent",
        "safety": "Wet roots and rock are slippery on the approach to Dharamshala—shorten your stride"
      }
    ],
    "whyChoose": [
      "High pass above quieter Kareri basin",
      "Fewer crowds than Indrahar",
      "Big alpine day from lake camp"
    ],
    "trailOverview": "Stage through Kareri village and Kareri Lake, then climb boulder and snow slopes to Minkiani Pass for Dhauladhar panoramas before returning to the lake basin."
  },
  "guna-devi": {
    "key": "guna-devi",
    "name": "Guna Devi Trek",
    "region": "dharamshala",
    "location": "Near Sidhbari / Dharamshala foothills to Guna Devi temple ridge",
    "history": "Guna Devi is a sacred hill shrine above the Dharamshala foothills, walked by pilgrims and day hikers seeking temple darshan with Dhauladhar views without the overnight logistics of Triund.",
    "difficulty": "Easy",
    "distanceKm": "5–7 round trip typical",
    "duration": "1 day",
    "highestAltitudeM": "2100",
    "baseCamp": "Sidhbari / lower trailhead villages",
    "nearestRail": "Kangra Mandir / Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Short drive from Dharamshala to trailhead; jeep options partway in season",
    "bestTime": "October–June",
    "snowfallMonths": "Rare light snow Dec–Jan on ridge",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Naddi (Guna Devi)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Naddi (Guna Devi)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Naddi (Guna Devi) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Naddi (Guna Devi); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Naddi (Guna Devi)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Naddi (Guna Devi); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Naddi (Guna Devi)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Naddi (Guna Devi)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Naddi (Guna Devi)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Naddi (Guna Devi)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Naddi (Guna Devi)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Naddi (Guna Devi)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Sidhbari / lower trailhead villages; camp nights near Naddi at 2100 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Sidhbari / lower trailhead villages runs through ban oak, rhododendron and chir pine, thinning into shaded forest cover for most of the route on the climb toward Naddi at 2100 m. Keep an eye out for Himalayan langurs, kalij pheasant and occasional snow leopard sign higher up.",
    "photographySpots": [
      "Guna Devi at 2100 m in first light",
      "Temple ridge Dhauladhar panorama",
      "Same camp at dusk",
      "Naddi camp at dusk",
      "Sidhbari / lower trailhead villages approach and roadhead"
    ],
    "network": "Patchy Jio/Airtel on the lower trail; weak to none at higher camps",
    "electricity": "None at high camps; charge devices in Dharamkot/McLeod Ganj before departure",
    "atm": "ATMs in McLeod Ganj and Dharamshala town",
    "medical": "Clinics in McLeod Ganj; Dharamshala Civil Hospital for anything serious",
    "camping": "Designated meadow or lake camps via registered operators; no unregulated wild camping",
    "permits": "Forest department camping permission arranged by your operator; carry ID for the Guna Devi route out of Sidhbari / lower trailhead villages.",
    "forestFees": "Nominal forest and camping fee, typically ₹50–200 per person",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 5–7 round trip typical route from Sidhbari / lower trailhead villages—expect 3–5 hours of walking a day up to 2100 m.",
    "ams": "Low AMS risk at 2100 m near Naddi; hydrate well and ascend steadily from Sidhbari / lower trailhead villages.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Norbulingka Institute",
      "Gyuto Monastery",
      "Dharamshala cricket stadium views"
    ],
    "nearbyTreks": [
      "Triund",
      "Kareri approach walks",
      "Naddi trails"
    ],
    "budget": {
      "budget": "₹500–1,500",
      "standard": "₹2,000–4,000",
      "premium": "₹5,000–8,000 (with private transfer)"
    },
    "days": [
      {
        "title": "Day 1: Sidhbari trailhead to Guna Devi and return",
        "start": "Sidhbari / lower jeep point",
        "end": "Same trailhead via Guna Devi temple",
        "distanceKm": "5–7",
        "altitudeM": "2100",
        "elevationGain": "~400–600 m",
        "trekTime": "3–5 hours round trip",
        "terrain": "Pine forest path, stone steps, temple ridge",
        "description": "Begin after breakfast from the Sidhbari-side trailhead through chir pine shade. Reach Guna Devi temple for darshan and ridge views of the Dhauladhar, then descend before late afternoon haze. Combine with Norbulingka the same day if energy remains.",
        "forests": "Chir pine and oak scrub",
        "viewpoints": "Temple ridge Dhauladhar panorama",
        "meals": "Hot soup on arrival followed by a full dinner spread at Same",
        "campStay": "Trekker's camp at Same trailhead via Guna Devi temple",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Same",
        "photography": "Sunrise silhouettes at Same: Temple ridge Dhauladhar panorama",
        "safety": "Wet roots and rock are slippery on the approach to Same—shorten your stride"
      },
      {
        "title": "Optional Day 2: Ridge photography + Naddi sunset",
        "start": "Dharamshala hotel",
        "end": "Naddi viewpoint",
        "distanceKm": "2–4 walking / local drives",
        "altitudeM": "1750–2000",
        "elevationGain": "Light",
        "trekTime": "2–3 hours easy",
        "terrain": "Viewpoints and short walks",
        "description": "If staying another night, revisit a lower ridge spur for morning photos or drive to Naddi for sunset over the same Dhauladhar wall seen from Guna Devi. Keep it recovery-light after yesterday’s steps.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Naddi",
        "campStay": "Trekker's camp at Naddi viewpoint",
        "weather": "Breezy ridge air near Naddi; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Naddi: Viewpoints and short walks",
        "safety": "Keep the group together on the forest stretch before Naddi; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "Sacred short ridge walk",
      "Family-friendly Dhauladhar views",
      "Easy add-on to Dharamshala stay"
    ],
    "trailOverview": "A pine-and-oak day climb from Sidhbari-side trailheads to Guna Devi temple with open Dhauladhar lookouts—descend the same path before dusk."
  },
  "lam-dal": {
    "key": "lam-dal",
    "name": "Lam Dal Lake Trek",
    "region": "dharamshala",
    "location": "Brahmaur / Holi side or Dhauladhar approaches to Lam Dal (one of the sacred Manimahesh–Chamba high lakes cluster context; also linked from Minkiani/Kareri high basins depending on route)",
    "history": "Lam Dal is among the high sacred lakes of the Dhauladhar–Chamba alpine zone, visited by shepherds and pilgrims. Routes are longer and wilder than Triund, often combined with multi-lake circuits.",
    "difficulty": "Difficult",
    "distanceKm": "40–55 depending on approach",
    "duration": "5–7 days",
    "highestAltitudeM": "4200",
    "baseCamp": "Holi / Brahmaur region or Kareri high approach (route-dependent)",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal / Kangra",
    "roadConnectivity": "Long drives to Chamba–Holi or Kangra trailheads; thereafter wilderness trail",
    "bestTime": "June–early July; September",
    "snowfallMonths": "October–May",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Lam (Lam Dal Lake)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Lam (Lam Dal Lake)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Lam (Lam Dal Lake) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Lam (Lam Dal Lake); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Lam (Lam Dal Lake)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Lam (Lam Dal Lake); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Lam (Lam Dal Lake)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Lam (Lam Dal Lake)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Lam (Lam Dal Lake)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Lam (Lam Dal Lake)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Lam (Lam Dal Lake)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Lam (Lam Dal Lake)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Holi / Brahmaur region or Kareri high approach (route-dependent); camp nights near Holi at 4200 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Holi / Brahmaur region or Kareri high approach (route-dependent) runs through ban oak, rhododendron and chir pine, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Holi at 4200 m. Keep an eye out for Himalayan langurs, kalij pheasant and occasional snow leopard sign higher up.",
    "photographySpots": [
      "Lam Dal Lake at 4200 m in first light",
      "First reveal of Lam Dal",
      "Lower camp at dusk",
      "Alpine camp at dusk",
      "Holi / Brahmaur region or Kareri high approach (route-dependent) approach and roadhead"
    ],
    "network": "Patchy Jio/Airtel on the lower trail; weak to none at higher camps",
    "electricity": "None at high camps; charge devices in Dharamkot/McLeod Ganj before departure",
    "atm": "ATMs in McLeod Ganj and Dharamshala town",
    "medical": "Clinics in McLeod Ganj; Dharamshala Civil Hospital for anything serious",
    "camping": "Designated meadow or lake camps via registered operators; no unregulated wild camping",
    "permits": "Forest department camping permission arranged by your operator; carry ID for the Lam Dal Lake route out of Holi / Brahmaur region or Kareri high approach (route-dependent).",
    "forestFees": "Nominal forest and camping fee, typically ₹50–200 per person",
    "guideCharges": "₹3,000–5,600 per day for a local guide",
    "porterCharges": "₹2,000–4,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "A strong cardio base and prior high-altitude trekking experience are strongly advised for the 5–7 days push from Holi / Brahmaur region or Kareri high approach (route-dependent) to 4200 m.",
    "ams": "Real AMS risk above 4200 m on the approach to Holi; build in an acclimatisation stop and know the descent plan back to Holi / Brahmaur region or Kareri high approach (route-dependent).",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Brahmaur temples",
      "Chamba town",
      "Manimahesh region"
    ],
    "nearbyTreks": [
      "Seven Lakes",
      "Minkiani",
      "Manimahesh",
      "Indrahar"
    ],
    "budget": {
      "budget": "₹18,000–28,000",
      "standard": "₹30,000–45,000",
      "premium": "₹50,000–70,000"
    },
    "days": [
      {
        "title": "Day 1: Roadhead to forest camp",
        "start": "Holi / designated roadhead",
        "end": "Lower forest / shepherd camp (~2,400 m)",
        "distanceKm": "8–10",
        "altitudeM": "2400",
        "elevationGain": "~600 m",
        "trekTime": "4–5 hours",
        "terrain": "Forest trails, streamside paths",
        "description": "Leave the roadhead into mixed forest along a side nallah. Camp at a shepherd clearing to begin acclimatisation. Keep noise low—this is wildlife country.",
        "forests": "Deodar and oak",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Lower",
        "campStay": "Trekker's camp at Lower forest / shepherd camp (~2,400 m)",
        "weather": "Breezy ridge air near Lower; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Lower: Deodar and oak",
        "safety": "Keep the group together on the forest stretch before Lower; light fades quickly under the canopy"
      },
      {
        "title": "Day 2: Forest camp to alpine meadow",
        "start": "Forest camp",
        "end": "Alpine meadow camp (~3,200 m)",
        "distanceKm": "10–12",
        "altitudeM": "3200",
        "elevationGain": "~800 m",
        "trekTime": "6–7 hours",
        "terrain": "Steep forest exit into open thach",
        "description": "Climb out of tree line into wide Gaddi meadows (thach). Rest frequently as altitude builds. Afternoon clouds often sit on ridges—pitch early.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Alpine",
        "campStay": "Alpine tents at Alpine meadow camp (~3,200 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Alpine",
        "photography": "Best light at Alpine: Steep forest exit into open thach",
        "safety": "Wet roots and rock are slippery on the approach to Alpine—shorten your stride"
      },
      {
        "title": "Day 3: Meadow to Lam Dal high camp",
        "start": "Alpine meadow",
        "end": "Lam Dal vicinity camp (~3,800–4,000 m)",
        "distanceKm": "8–11",
        "altitudeM": "4000",
        "elevationGain": "~700–800 m",
        "trekTime": "6–8 hours",
        "terrain": "Scree, snow patches, lake bowl",
        "description": "Cross rocky benches to the Lam Dal basin. Camp on durable surfaces away from fragile shore vegetation. Keep the afternoon light for shore photography if weather allows.",
        "viewpoints": "First reveal of Lam Dal",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Lam",
        "campStay": "Alpine tents at Lam Dal vicinity camp (~3,800–4,000 m)",
        "weather": "Thin, cold air at altitude near Lam; expect a big day-night temperature swing",
        "photography": "A classic frame from Lam: First reveal of Lam Dal",
        "safety": "Strict turnaround time on the approach to Lam—do not push on if weather closes in"
      },
      {
        "title": "Day 4: Lake exploration + start descent",
        "start": "Lam Dal camp",
        "end": "Mid meadow camp",
        "distanceKm": "10–12",
        "altitudeM": "4000 â†’ 3200",
        "elevationGain": "Mostly descent",
        "trekTime": "5–7 hours",
        "terrain": "Lake shore walk then descent trails",
        "description": "Morning circumnavigation or viewpoint hike around Lam Dal, then descend to a lower meadow for better sleep. Pack out all waste—sacred lake ethics apply.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Mid",
        "campStay": "Alpine tents at Mid meadow camp",
        "weather": "Clear early morning skies near Mid usually cloud over by early afternoon",
        "photography": "Golden-hour views near Mid: Lake shore walk then descent trails",
        "safety": "Snow or ice patches possible near Mid; use microspikes and short, steady steps"
      },
      {
        "title": "Day 5: Descend to roadhead",
        "start": "Meadow camp",
        "end": "Holi / roadhead",
        "distanceKm": "12–15",
        "altitudeM": "3200 â†’ road",
        "elevationGain": "Long descent",
        "trekTime": "6–8 hours",
        "terrain": "Forest re-entry, village approach",
        "description": "Long descent through forest to the roadhead and transfer toward Chamba or Dharamshala. Hot shower and heavy meal well earned.",
        "forests": "Return to deodar belt",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Holi",
        "campStay": "Alpine tents at Holi / roadhead",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Holi",
        "photography": "Wide-angle vantage at Holi: Return to deodar belt",
        "safety": "Keep the group together on the forest stretch before Holi; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "Sacred high lake wilderness",
      "Far fewer crowds than Triund circuit",
      "Serious alpine camping"
    ],
    "trailOverview": "Multi-day alpine approach from Chamba–Holi or Kangra high basins to Lam Dal’s high bowl, with wilderness camps and weather-dependent lake time before a long descent to the chosen roadhead."
  },
  "seven-lakes": {
    "key": "seven-lakes",
    "name": "Seven Lakes Trek (Dhauladhar)",
    "region": "dharamshala",
    "location": "High Dhauladhar lake circuit (Lam Dal and sister lakes) via Chamba / Kangra alpine approaches",
    "history": "The Seven Lakes trek links a chain of high glacial lakes in the Dhauladhar massif sacred to local traditions and known to Gaddi herders. It is a serious expedition-style walk, not a weekend ridge camp.",
    "difficulty": "Challenging",
    "distanceKm": "55–70",
    "duration": "6–8 days",
    "highestAltitudeM": "4300",
    "baseCamp": "Holi / Brahmaur sector roadheads",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Long approach drives; fully self-sufficient thereafter",
    "bestTime": "June–early July; September",
    "snowfallMonths": "October–June (narrow summer window)",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Upper (Seven Lakes Trek (Dhauladhar))"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Upper (Seven Lakes Trek (Dhauladhar))"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Upper (Seven Lakes Trek (Dhauladhar)) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Upper (Seven Lakes Trek (Dhauladhar)); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Upper (Seven Lakes Trek (Dhauladhar))"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Upper (Seven Lakes Trek (Dhauladhar)); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Upper (Seven Lakes Trek (Dhauladhar))"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Upper (Seven Lakes Trek (Dhauladhar))"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Upper (Seven Lakes Trek (Dhauladhar))"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Upper (Seven Lakes Trek (Dhauladhar))"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Upper (Seven Lakes Trek (Dhauladhar))"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Upper (Seven Lakes Trek (Dhauladhar))"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Holi / Brahmaur sector roadheads; camp nights near Holi at 4300 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Holi / Brahmaur sector roadheads runs through ban oak, rhododendron and chir pine, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Holi at 4300 m. Keep an eye out for Himalayan langurs, kalij pheasant and occasional snow leopard sign higher up.",
    "photographySpots": [
      "Seven Lakes Trek (Dhauladhar) at 4300 m in first light",
      "Forest camp at dusk",
      "First camp at dusk",
      "Central camp at dusk",
      "Holi / Brahmaur sector roadheads approach and roadhead"
    ],
    "network": "Patchy Jio/Airtel on the lower trail; weak to none at higher camps",
    "electricity": "None at high camps; charge devices in Dharamkot/McLeod Ganj before departure",
    "atm": "ATMs in McLeod Ganj and Dharamshala town",
    "medical": "Clinics in McLeod Ganj; Dharamshala Civil Hospital for anything serious",
    "camping": "Designated meadow or lake camps via registered operators; no unregulated wild camping",
    "permits": "Forest department camping permission arranged by your operator; carry ID for the Seven Lakes Trek (Dhauladhar) route out of Holi / Brahmaur sector roadheads.",
    "forestFees": "Nominal forest and camping fee, typically ₹50–200 per person",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 6–8 days route from Holi / Brahmaur sector roadheads tops out near 4300 m.",
    "ams": "Real AMS risk above 4300 m on the approach to Holi; build in an acclimatisation stop and know the descent plan back to Holi / Brahmaur sector roadheads.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Brahmaur",
      "Chamba heritage"
    ],
    "nearbyTreks": [
      "Lam Dal",
      "Manimahesh",
      "Kugti Pass"
    ],
    "budget": {
      "budget": "₹28,000–40,000",
      "standard": "₹45,000–65,000",
      "premium": "₹70,000–95,000"
    },
    "days": [
      {
        "title": "Day 1: Roadhead to first forest camp",
        "start": "Holi-side roadhead",
        "end": "Forest camp (~2,500 m)",
        "distanceKm": "9",
        "altitudeM": "2500",
        "elevationGain": "~700 m",
        "trekTime": "5 hours",
        "terrain": "Forest and stream trails",
        "description": "Enter the wilderness corridor and camp below tree line. Final gear check for multi-day self-sufficiency. Early sleep before altitude days begin.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Forest kitchen tent",
        "campStay": "Trekker's camp at Forest camp (~2,500 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Forest",
        "photography": "Best light at Forest: Forest and stream trails",
        "safety": "Wet roots and rock are slippery on the approach to Forest—shorten your stride"
      },
      {
        "title": "Day 2: Climb to first lake basin",
        "start": "Forest camp",
        "end": "First lake camp (~3,500 m)",
        "distanceKm": "11",
        "altitudeM": "3500",
        "elevationGain": "~1,000 m",
        "trekTime": "7 hours",
        "terrain": "Steep meadows, rocky benches",
        "description": "Break tree line and reach the first of the lake chain. Short acclimatisation walk above camp. Monitor oxygen saturation if carrying a pulse oximeter.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at First",
        "campStay": "Alpine tents at First lake camp (~3,500 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over First",
        "photography": "A classic frame from First: Steep meadows, rocky benches",
        "safety": "Keep the group together on the forest stretch before First; light fades quickly under the canopy"
      },
      {
        "title": "Day 3: Traverse to central lakes",
        "start": "First lake",
        "end": "Central lakes camp (~3,800 m)",
        "distanceKm": "10–12",
        "altitudeM": "3800",
        "elevationGain": "Rolling alpine +400–600 m net",
        "trekTime": "7–8 hours",
        "terrain": "High cols, scree, snow patches",
        "description": "Cross between lake bowls on shepherd and expedition trails. Camp near the central cluster for the classic multi-lake views. Weather dictates whether side lakes are visited today.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Central",
        "campStay": "Alpine tents at Central lakes camp (~3,800 m)",
        "weather": "Breezy ridge air near Central; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Central: High cols, scree, snow patches",
        "safety": "Wet roots and rock are slippery on the approach to Central—shorten your stride"
      },
      {
        "title": "Day 4: Highest lakes and optional col",
        "start": "Central camp",
        "end": "Upper lake camp (~4,100 m)",
        "distanceKm": "8–10",
        "altitudeM": "4100–4300",
        "elevationGain": "~400–500 m",
        "trekTime": "6–7 hours",
        "terrain": "High alpine, possible snow",
        "description": "Push to the highest lakes in the chain. Keep a conservative turnaround if snow bridges look unstable. This is the photographic and spiritual heart of the route.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Upper",
        "campStay": "Alpine tents at Upper lake camp (~4,100 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Upper; move before the cloud build-up",
        "photography": "Wide-angle vantage at Upper: High alpine, possible snow",
        "safety": "Watch for AMS symptoms near Upper; descend if headache or nausea persists"
      },
      {
        "title": "Day 5–6: Begin long exit descent",
        "start": "Upper lakes",
        "end": "Lower meadow / forest camps",
        "distanceKm": "14–18 over 1–2 days",
        "altitudeM": "4100 â†’ 2800",
        "elevationGain": "Descent stages",
        "trekTime": "6–8 hours daily",
        "terrain": "Long alpine then forest descent",
        "description": "Stage the descent to protect knees and avoid late-day storms in tree line. Celebrate reaching firewood country again. Pack out all waste from lake camps.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Lower",
        "campStay": "Alpine tents at Lower meadow / forest camps",
        "weather": "Thin, cold air at altitude near Lower; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Lower: Long alpine then forest descent",
        "safety": "Strict turnaround time on the approach to Lower—do not push on if weather closes in"
      },
      {
        "title": "Day 7: Roadhead exit",
        "start": "Lower forest camp",
        "end": "Holi / Chamba road",
        "distanceKm": "8–10",
        "altitudeM": "Road level",
        "elevationGain": "Final descent",
        "trekTime": "4–5 hours",
        "terrain": "Forest to road",
        "description": "Final walk to pickup and transfer to Chamba. Hot meal, rest day, and trip debrief with the guide team.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Holi",
        "campStay": "Hotel/guesthouse at Holi / Chamba road",
        "weather": "Breezy ridge air near Holi; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Holi: Forest to road",
        "safety": "Keep the group together on the forest stretch before Holi; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "Rare multi-lake alpine circuit",
      "True expedition feel in Himachal",
      "Sacred high landscape"
    ],
    "trailOverview": "Expedition circuit linking seven high Dhauladhar lakes with high camps, weather-dependent passes between basins, and a long exit to Chamba-side roadheads."
  },
  "hampta": {
    "key": "hampta",
    "name": "Hampta Pass Trek",
    "region": "manali",
    "location": "Hampta Pass Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Hampta Pass is the best-known crossing between the green Kullu valley and the barren Lahaul side of the Pir Panjal, used for generations by shepherds moving flocks between Kullu and Spiti grazing grounds. Its dramatic switch from pine forest at Jobra to the desert-like Chandra valley near Chhatru makes it one of the most photographed passes in Himachal.",
    "difficulty": "Moderate",
    "distanceKm": "35 km",
    "duration": "5 days",
    "highestAltitudeM": "4270",
    "baseCamp": "Jobra",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Shea (Hampta Pass)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Shea (Hampta Pass)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Shea (Hampta Pass) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Shea (Hampta Pass); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Shea (Hampta Pass)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Shea (Hampta Pass); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Shea (Hampta Pass)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Shea (Hampta Pass)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Shea (Hampta Pass)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Shea (Hampta Pass)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Shea (Hampta Pass)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Shea (Hampta Pass)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Jobra; camp nights near Chhatru at 4270 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Jobra runs through deodar, blue pine and birch giving way to alpine meadow, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Chhatru at 4270 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Hampta Pass at 4270 m in first light",
      "Chika camp at dusk",
      "Balu camp at dusk",
      "Shea camp at dusk",
      "Jobra approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Hampta Pass route out of Jobra.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 5 days route from Jobra runs 5–7 hours a day up to 4270 m.",
    "ams": "Real AMS risk above 4270 m on the approach to Chhatru; build in an acclimatisation stop and know the descent plan back to Jobra.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Naggar Castle",
      "Rohtang Pass viewpoint",
      "Old Manali lanes",
      "Hadimba Temple"
    ],
    "nearbyTreks": [
      "Hanuman Tibba",
      "Beas Kund",
      "Lama Dugh",
      "Friendship Peak"
    ],
    "budget": {
      "budget": "₹5,900–11,100",
      "standard": "₹14,300–23,400",
      "premium": "₹27,300–45,500"
    },
    "days": [
      {
        "title": "Day 1: Jobra to Chika",
        "start": "Jobra (2,740 m)",
        "end": "Chika (3,000 m)",
        "distanceKm": "3",
        "altitudeM": "3000",
        "elevationGain": "+260 m",
        "trekTime": "3-4 hours",
        "terrain": "Pine and boulders along Hampta nallah",
        "description": "Leave Jobra on the Hampta stream trail through maple and fir. Chika is the first camp on a flat bench where the river widens and shepherds graze cattle.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Chika",
        "campStay": "Alpine tents at Chika (3,000 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Chika",
        "photography": "A classic frame from Chika: Pine and boulders along Hampta nallah",
        "safety": "Keep the group together on the forest stretch before Chika; light fades quickly under the canopy"
      },
      {
        "title": "Day 2: Chika to Balu ka Ghera",
        "start": "Chika (3,000 m)",
        "end": "Balu ka Ghera (3,600 m)",
        "distanceKm": "5",
        "altitudeM": "3600",
        "elevationGain": "+600 m",
        "trekTime": "4-5 hours",
        "terrain": "Steep climb, boulder hops",
        "description": "Climb out of tree line into alpine grass above the nallah. Balu ka Ghera sits below Hampta Pass with views of Deo Tibba on clear mornings.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Balu",
        "campStay": "Alpine tents at Balu ka Ghera (3,600 m)",
        "weather": "Breezy ridge air near Balu; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Balu: Steep climb, boulder hops",
        "safety": "Wet roots and rock are slippery on the approach to Balu—shorten your stride"
      },
      {
        "title": "Day 3: Balu ka Ghera to Shea Goru via Hampta Pass",
        "start": "Balu ka Ghera (3,600 m)",
        "end": "Shea Goru (3,900 m)",
        "distanceKm": "8",
        "altitudeM": "4270",
        "elevationGain": "+670 m then descent",
        "trekTime": "7-8 hours",
        "terrain": "Snow slopes, pass crossing, moraine",
        "description": "Cross Hampta Pass at roughly 4,270 m into Lahaul. Descend moraine to Shea Goru camp on the Chandra side; weather can turn quickly on the pass.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Shea",
        "campStay": "Alpine tents at Shea Goru (3,900 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Shea; move before the cloud build-up",
        "photography": "Wide-angle vantage at Shea: Snow slopes, pass crossing, moraine",
        "safety": "Watch for AMS symptoms near Shea; descend if headache or nausea persists"
      },
      {
        "title": "Day 4: Shea Goru to Chhatru road",
        "start": "Shea Goru (3,900 m)",
        "end": "Chhatru (3,300 m)",
        "distanceKm": "7",
        "altitudeM": "3300",
        "elevationGain": "Descent",
        "trekTime": "4-5 hours",
        "terrain": "Glacial streams, road approach",
        "description": "Follow the Chandra river side trail to Chhatru where road access returns. Many groups add Chandratal as an optional drive day from here.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Chhatru kitchen tent",
        "campStay": "Alpine tents at Chhatru (3,300 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Chhatru",
        "photography": "Sunrise silhouettes at Chhatru: Glacial streams, road approach",
        "safety": "Wet roots and rock are slippery on the approach to Chhatru—shorten your stride"
      }
    ],
    "whyChoose": [
      "Distinct Hampta Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Jobra-Chika-Balu ka Ghera-Hampta Pass (4270 m)-Shea Goru-Chhatru links Kullu pine forests to Lahaul barren valley."
  },
  "beas-kund": {
    "key": "beas-kund",
    "name": "Beas Kund Trek",
    "region": "manali",
    "location": "Beas Kund Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Beas Kund is the glacial source of the Beas river, tucked below Hanuman Tibba and Friendship Peak above the Solang valley. Local lore holds that sage Vyas meditated by this pool, giving the river and the lake their name, and shepherds have grazed the Dhundi-Bakarthach meadows for generations.",
    "difficulty": "Easy-Moderate",
    "distanceKm": "16 km",
    "duration": "3 days",
    "highestAltitudeM": "3700",
    "baseCamp": "Solang / Dhundi",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Bakarthach (Beas Kund)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Bakarthach (Beas Kund)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Bakarthach (Beas Kund) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Bakarthach (Beas Kund); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Bakarthach (Beas Kund)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Bakarthach (Beas Kund); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Bakarthach (Beas Kund)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Bakarthach (Beas Kund)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Bakarthach (Beas Kund)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Bakarthach (Beas Kund)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Bakarthach (Beas Kund)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Bakarthach (Beas Kund)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Solang / Dhundi; camp nights near Beas at 3700 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Solang / Dhundi runs through deodar, blue pine and birch giving way to alpine meadow, thinning into open alpine meadow and scrub above the tree line on the climb toward Beas at 3700 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Beas Kund at 3700 m in first light",
      "Dhundi camp at dusk",
      "Bakarthach camp at dusk",
      "Beas camp at dusk",
      "Solang / Dhundi approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Beas Kund route out of Solang / Dhundi.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹1,700–3,100 per day for a local guide",
    "porterCharges": "₹1,100–2,200 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Regular walking fitness is needed for the 3 days climb from Solang / Dhundi up to 3700 m.",
    "ams": "Mild AMS risk near 3700 m around Beas; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Old Manali lanes",
      "Hadimba Temple",
      "Solang Valley",
      "Vashisht hot springs"
    ],
    "nearbyTreks": [
      "Pin Parvati Pass",
      "Bhrigu Lake",
      "Chandrakhani Pass",
      "Hanuman Tibba"
    ],
    "budget": {
      "budget": "₹3,000–5,600",
      "standard": "₹7,300–11,900",
      "premium": "₹13,900–23,100"
    },
    "days": [
      {
        "title": "Day 1: Solang to Dhundi",
        "start": "Solang Valley (2,500 m)",
        "end": "Dhundi (3,000 m)",
        "distanceKm": "5",
        "altitudeM": "3000",
        "elevationGain": "+500 m",
        "trekTime": "3-4 hours",
        "terrain": "Meadow and shepherd trail",
        "description": "Start near Solang adventure hub and walk the wide shepherd track toward Dhundi with Beas peaks ahead.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Dhundi",
        "campStay": "Alpine tents at Dhundi (3,000 m)",
        "weather": "Breezy ridge air near Dhundi; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Dhundi: Meadow and shepherd trail",
        "safety": "Wet roots and rock are slippery on the approach to Dhundi—shorten your stride"
      },
      {
        "title": "Day 2: Dhundi to Bakarthach",
        "start": "Dhundi (3,000 m)",
        "end": "Bakarthach (3,300 m)",
        "distanceKm": "4",
        "altitudeM": "3300",
        "elevationGain": "+300 m",
        "trekTime": "2-3 hours",
        "terrain": "Alpine meadow",
        "description": "Bakarthach is a classic shepherd thach with Friendship Peak dominating the skyline.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Bakarthach",
        "campStay": "Alpine tents at Bakarthach (3,300 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Bakarthach",
        "photography": "Wide-angle vantage at Bakarthach: Alpine meadow",
        "safety": "Keep the group together on the forest stretch before Bakarthach; light fades quickly under the canopy"
      },
      {
        "title": "Day 3: Bakarthach to Beas Kund and return",
        "start": "Bakarthach (3,300 m)",
        "end": "Beas Kund (~3,700 m)",
        "distanceKm": "6",
        "altitudeM": "3700",
        "elevationGain": "+400 m round",
        "trekTime": "5-6 hours",
        "terrain": "Rocky moraine",
        "description": "Day hike to the sacred glacial lake at Beas Kund then descend to Solang or camp another night at Bakarthach.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Beas",
        "campStay": "Alpine tents at Beas Kund (~3,700 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Beas",
        "photography": "Sunrise silhouettes at Beas: Rocky moraine",
        "safety": "Wet roots and rock are slippery on the approach to Beas—shorten your stride"
      }
    ],
    "whyChoose": [
      "Distinct Beas Kund Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Dhundi and Bakarthach meadows lead to Beas Kund glacial source above Solang."
  },
  "bhrigu": {
    "key": "bhrigu",
    "name": "Bhrigu Lake Trek",
    "region": "manali",
    "location": "Bhrigu Lake Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Bhrigu Lake takes its name from the sage Bhrigu, said to have meditated on its shores, and sits on an open ridge above Gulaba that has long served as high summer pasture for Kullu shepherds. Its easy road access from Manali has made it one of the valley's most popular short lake treks.",
    "difficulty": "Moderate",
    "distanceKm": "24 km",
    "duration": "3-4 days",
    "highestAltitudeM": "4300",
    "baseCamp": "Gulaba",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Bhrigu (Bhrigu Lake)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Bhrigu (Bhrigu Lake)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Bhrigu (Bhrigu Lake) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Bhrigu (Bhrigu Lake); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Bhrigu (Bhrigu Lake)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Bhrigu (Bhrigu Lake); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Bhrigu (Bhrigu Lake)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Bhrigu (Bhrigu Lake)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Bhrigu (Bhrigu Lake)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Bhrigu (Bhrigu Lake)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Bhrigu (Bhrigu Lake)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Bhrigu (Bhrigu Lake)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Gulaba; camp nights near Vashisht at 4300 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Gulaba runs through deodar, blue pine and birch giving way to alpine meadow, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Vashisht at 4300 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Bhrigu Lake at 4300 m in first light",
      "Rola camp at dusk",
      "Bhrigu camp at dusk",
      "Vashisht camp at dusk",
      "Gulaba approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Bhrigu Lake route out of Gulaba.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 3-4 days route from Gulaba runs 5–7 hours a day up to 4300 m.",
    "ams": "Real AMS risk above 4300 m on the approach to Vashisht; build in an acclimatisation stop and know the descent plan back to Gulaba.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Solang Valley",
      "Vashisht hot springs",
      "Manu Temple",
      "Jogini waterfall"
    ],
    "nearbyTreks": [
      "Sar Pass",
      "Patalsu Peak",
      "Deo Tibba Expedition",
      "Pin Parvati Pass"
    ],
    "budget": {
      "budget": "₹3,500–6,600",
      "standard": "₹8,600–14,000",
      "premium": "₹16,400–27,300"
    },
    "days": [
      {
        "title": "Day 1: Manali to Gulaba drive + trek start",
        "start": "Gulaba (2,600 m)",
        "end": "Rola Kholi (3,800 m)",
        "distanceKm": "6",
        "altitudeM": "3800",
        "elevationGain": "+1,200 m",
        "trekTime": "5-6 hours",
        "terrain": "Steep meadow",
        "description": "Climb from Gulaba through rolling meadows to Rola Kholi for acclimatisation before the lake day.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Rola",
        "campStay": "Alpine tents at Rola Kholi (3,800 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Rola",
        "photography": "Wide-angle vantage at Rola: Steep meadow",
        "safety": "Keep the group together on the forest stretch before Rola; light fades quickly under the canopy"
      },
      {
        "title": "Day 2: Rola Kholi to Bhrigu Lake",
        "start": "Rola Kholi (3,800 m)",
        "end": "Bhrigu Lake (4,300 m)",
        "distanceKm": "8",
        "altitudeM": "4300",
        "elevationGain": "+500 m",
        "trekTime": "4-5 hours",
        "terrain": "Alpine ridge and lake bowl",
        "description": "Reach the oval Bhrigu Lake set below rocky spires; return to camp or descend toward Vashisht side on longer variants.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Bhrigu",
        "campStay": "Alpine tents at Bhrigu Lake (4,300 m)",
        "weather": "Thin, cold air at altitude near Bhrigu; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Bhrigu: Alpine ridge and lake bowl",
        "safety": "Strict turnaround time on the approach to Bhrigu—do not push on if weather closes in"
      },
      {
        "title": "Day 3: Exit to Vashisht / Manali",
        "start": "Rola Kholi (3,800 m)",
        "end": "Vashisht hot springs (2,050 m)",
        "distanceKm": "10",
        "altitudeM": "2050",
        "elevationGain": "Descent",
        "trekTime": "4-5 hours",
        "terrain": "Meadow descent",
        "description": "Descend to Vashisht for a hot-spring soak and road pickup to Manali.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Vashisht",
        "campStay": "Trekker's camp at Vashisht hot springs (2,050 m)",
        "weather": "Breezy ridge air near Vashisht; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Vashisht: Meadow descent",
        "safety": "Keep the group together on the forest stretch before Vashisht; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "Distinct Bhrigu Lake Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Gulaba-Rola Kholi-Bhrigu Lake (~4,300 m) is a short high-altitude lake trek above Manali."
  },
  "patalsu": {
    "key": "patalsu",
    "name": "Patalsu Peak Trek",
    "region": "manali",
    "location": "Patalsu Peak Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Patalsu Peak rises directly above Solang and has traditionally been climbed by local shepherds and villagers as a lookout point over the Solang and Beas valleys. Its steep grass ridges make it a favoured objective for trekkers wanting a genuine summit push close to Manali.",
    "difficulty": "Moderate-Difficult",
    "distanceKm": "18 km",
    "duration": "2 days",
    "highestAltitudeM": "4200",
    "baseCamp": "Solang",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Solang (Patalsu Peak)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Solang (Patalsu Peak)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Solang (Patalsu Peak) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Solang (Patalsu Peak); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Solang (Patalsu Peak)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Solang (Patalsu Peak); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Solang (Patalsu Peak)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Solang (Patalsu Peak)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Solang (Patalsu Peak)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Solang (Patalsu Peak)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Solang (Patalsu Peak)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Solang (Patalsu Peak)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Solang; camp nights near Solang at 4200 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Solang runs through deodar, blue pine and birch giving way to alpine meadow, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Solang at 4200 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Patalsu Peak at 4200 m in first light",
      "Patalsu camp at dusk",
      "Solang camp at dusk",
      "Solang approach and roadhead",
      "Solang on the return leg"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Patalsu Peak route out of Solang.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹2,400–4,500 per day for a local guide",
    "porterCharges": "₹1,600–3,200 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Prior multi-day trekking experience is recommended; the 2 days route from Solang strings together long back-to-back days up to 4200 m.",
    "ams": "Real AMS risk above 4200 m on the approach to Solang; build in an acclimatisation stop and know the descent plan back to Solang.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Manu Temple",
      "Jogini waterfall",
      "Naggar Castle",
      "Rohtang Pass viewpoint"
    ],
    "nearbyTreks": [
      "Hampta Pass",
      "Lama Dugh",
      "Friendship Peak",
      "Sar Pass"
    ],
    "budget": {
      "budget": "₹2,900–5,400",
      "standard": "₹7,000–11,500",
      "premium": "₹13,400–22,400"
    },
    "days": [
      {
        "title": "Day 1: Solang to Patalsu base camp",
        "start": "Solang (2,500 m)",
        "end": "Patalsu base (3,600 m)",
        "distanceKm": "7",
        "altitudeM": "3600",
        "elevationGain": "+1,100 m",
        "trekTime": "5-6 hours",
        "terrain": "Forest then meadow",
        "description": "Steep day from Solang into high meadows below the Patalsu summit block.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Patalsu",
        "campStay": "Alpine tents at Patalsu base (3,600 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Patalsu",
        "photography": "Sunrise silhouettes at Patalsu: Forest then meadow",
        "safety": "Wet roots and rock are slippery on the approach to Patalsu—shorten your stride"
      },
      {
        "title": "Day 2: Summit push and return to Solang",
        "start": "Patalsu base (3,600 m)",
        "end": "Solang (2,500 m)",
        "distanceKm": "11",
        "altitudeM": "4200",
        "elevationGain": "+600 m summit then descent",
        "trekTime": "8-10 hours",
        "terrain": "Rocky summit ridge",
        "description": "Early summit attempt for Kullu panorama then long descent to Solang by evening.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Solang",
        "campStay": "Alpine tents at Solang (2,500 m)",
        "weather": "Clear early morning skies near Solang usually cloud over by early afternoon",
        "photography": "Late-afternoon panorama from Solang: Rocky summit ridge",
        "safety": "Snow or ice patches possible near Solang; use microspikes and short, steady steps"
      }
    ],
    "whyChoose": [
      "Distinct Patalsu Peak Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Solang-side climb toward Patalsu summit views over Kullu."
  },
  "lama-dugh": {
    "key": "lama-dugh",
    "name": "Lama Dugh Trek",
    "region": "manali",
    "location": "Lama Dugh Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Lama Dugh is a broad meadow above Old Manali traditionally grazed by shepherd flocks each summer and named after a resident lama said to have lived on this ridge. It has become one of Manali’s easiest half-day escapes into open alpine grassland.",
    "difficulty": "Easy",
    "distanceKm": "8 km",
    "duration": "1 day",
    "highestAltitudeM": "3000",
    "baseCamp": "Old Manali",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Khanpari (Lama Dugh)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Khanpari (Lama Dugh)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Khanpari (Lama Dugh) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Khanpari (Lama Dugh); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Khanpari (Lama Dugh)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Khanpari (Lama Dugh); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Khanpari (Lama Dugh)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Khanpari (Lama Dugh)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Khanpari (Lama Dugh)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Khanpari (Lama Dugh)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Khanpari (Lama Dugh)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Khanpari (Lama Dugh)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Old Manali; camp nights near Khanpari at 3000 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Old Manali runs through deodar, blue pine and birch giving way to alpine meadow, thinning into shaded forest cover for most of the route on the climb toward Khanpari at 3000 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Lama Dugh at 3000 m in first light",
      "Lama camp at dusk",
      "Khanpari camp at dusk",
      "Old Manali approach and roadhead",
      "Khanpari on the return leg"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Lama Dugh route out of Old Manali.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 8 km route from Old Manali—expect 3–5 hours of walking a day up to 3000 m.",
    "ams": "Mild AMS risk near 3000 m around Khanpari; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Naggar Castle",
      "Rohtang Pass viewpoint",
      "Old Manali lanes",
      "Hadimba Temple"
    ],
    "nearbyTreks": [
      "Beas Kund",
      "Chandrakhani Pass",
      "Hanuman Tibba",
      "Hampta Pass"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Old Manali to Lama Dugh",
        "start": "Old Manali (2,050 m)",
        "end": "Lama Dugh (3,000 m)",
        "distanceKm": "4",
        "altitudeM": "3000",
        "elevationGain": "+950 m",
        "trekTime": "3-4 hours",
        "terrain": "Deodar and meadow",
        "description": "Half-day climb to Lama Dugh for Manali town and peak views; return same day.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Lama",
        "campStay": "Alpine tents at Lama Dugh (3,000 m)",
        "weather": "Breezy ridge air near Lama; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Lama: Deodar and meadow",
        "safety": "Keep the group together on the forest stretch before Lama; light fades quickly under the canopy"
      },
      {
        "title": "Day 2: Optional extension to Khanpari Tibba",
        "start": "Lama Dugh (3,000 m)",
        "end": "Khanpari viewpoint (3,200 m)",
        "distanceKm": "4",
        "altitudeM": "3200",
        "elevationGain": "+200 m",
        "trekTime": "2 hours",
        "terrain": "Open ridge",
        "description": "Optional ridge walk for wider Dhauladhar-Pir Panjal views before descending to Old Manali.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Khanpari",
        "campStay": "Alpine tents at Khanpari viewpoint (3,200 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Khanpari",
        "photography": "Best light at Khanpari: Open ridge",
        "safety": "Wet roots and rock are slippery on the approach to Khanpari—shorten your stride"
      }
    ],
    "whyChoose": [
      "Distinct Lama Dugh Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Old Manali to Lama Dugh meadow above Manali town."
  },
  "chandrakhani": {
    "key": "chandrakhani",
    "name": "Chandrakhani Pass Trek",
    "region": "manali",
    "location": "Chandrakhani Pass Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Chandrakhani Pass links the Kullu valley town of Naggar with the isolated village of Malana, long considered self-governing and distinct in custom from the rest of the valley. Traders and shepherds have used this ridge route for generations to move between the two sides of the pass.",
    "difficulty": "Moderate",
    "distanceKm": "22 km",
    "duration": "3 days",
    "highestAltitudeM": "3660",
    "baseCamp": "Naggar",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Malana (Chandrakhani Pass)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Malana (Chandrakhani Pass)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Malana (Chandrakhani Pass) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Malana (Chandrakhani Pass); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Malana (Chandrakhani Pass)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Malana (Chandrakhani Pass); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Malana (Chandrakhani Pass)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Malana (Chandrakhani Pass)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Malana (Chandrakhani Pass)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Malana (Chandrakhani Pass)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Malana (Chandrakhani Pass)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Malana (Chandrakhani Pass)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Naggar; camp nights near Jari at 3660 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Naggar runs through deodar, blue pine and birch giving way to alpine meadow, thinning into open alpine meadow and scrub above the tree line on the climb toward Jari at 3660 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Chandrakhani Pass at 3660 m in first light",
      "Campsite camp at dusk",
      "Malana camp at dusk",
      "Jari camp at dusk",
      "Naggar approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Chandrakhani Pass route out of Naggar.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 3 days route from Naggar runs 5–7 hours a day up to 3660 m.",
    "ams": "Mild AMS risk near 3660 m around Jari; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Old Manali lanes",
      "Hadimba Temple",
      "Solang Valley",
      "Vashisht hot springs"
    ],
    "nearbyTreks": [
      "Bhrigu Lake",
      "Deo Tibba Expedition",
      "Pin Parvati Pass",
      "Beas Kund"
    ],
    "budget": {
      "budget": "₹3,500–6,600",
      "standard": "₹8,600–14,000",
      "premium": "₹16,400–27,300"
    },
    "days": [
      {
        "title": "Day 1: Naggar to base camp",
        "start": "Naggar (1,800 m)",
        "end": "Campsite below pass (2,900 m)",
        "distanceKm": "8",
        "altitudeM": "2900",
        "elevationGain": "+1,100 m",
        "trekTime": "5-6 hours",
        "terrain": "Forest and village lanes",
        "description": "Trek from Naggar castle side into forest camps staging Chandrakhani.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Campsite",
        "campStay": "Trekker's camp at Campsite below pass (2,900 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Campsite",
        "photography": "Best light at Campsite: Forest and village lanes",
        "safety": "Wet roots and rock are slippery on the approach to Campsite—shorten your stride"
      },
      {
        "title": "Day 2: Pass crossing toward Malana",
        "start": "Camp (2,900 m)",
        "end": "Malana village (2,650 m)",
        "distanceKm": "10",
        "altitudeM": "3660",
        "elevationGain": "Pass ascent then descent",
        "trekTime": "7-8 hours",
        "terrain": "Pass and steep village descent",
        "description": "Cross Chandrakhani Pass with Parvati and Malana peaks in view; descend carefully toward Malana respecting local rules.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Malana",
        "campStay": "Homestay in the village at Malana village (2,650 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Malana",
        "photography": "A classic frame from Malana: Pass and steep village descent",
        "safety": "Keep the group together on the forest stretch before Malana; light fades quickly under the canopy"
      },
      {
        "title": "Day 3: Malana exit to road",
        "start": "Malana (2,650 m)",
        "end": "Jari roadhead",
        "distanceKm": "6",
        "altitudeM": "1800",
        "elevationGain": "Descent",
        "trekTime": "3-4 hours",
        "terrain": "Village paths",
        "description": "Exit Malana via permitted route to Jari for transport to Kasol or Manali.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Jari",
        "campStay": "Trekker's camp at Jari roadhead",
        "weather": "Breezy ridge air near Jari; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Jari: Village paths",
        "safety": "Wet roots and rock are slippery on the approach to Jari—shorten your stride"
      }
    ],
    "whyChoose": [
      "Distinct Chandrakhani Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Naggar-Malana village-Chandrakhani Pass with Malana culture context."
  },
  "deo-tibba": {
    "key": "deo-tibba",
    "name": "Deo Tibba Expedition",
    "region": "manali",
    "location": "Deo Tibba Expedition trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Deo Tibba (6,001 m) is one of the most climbed 6,000 m peaks in the Pir Panjal, first attempted by mountaineers in the mid-20th century and now a benchmark expedition for Indian climbers building toward bigger Himalayan objectives. Local Jagatsukh and Khanol villagers have long grazed the approach meadows below the glacier.",
    "difficulty": "Challenging",
    "distanceKm": "55 km",
    "duration": "6-8 days",
    "highestAltitudeM": "6001",
    "baseCamp": "Khanol / Jagatsukh",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Deo (Deo Tibba Expedition)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Deo (Deo Tibba Expedition)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Deo (Deo Tibba Expedition) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Deo (Deo Tibba Expedition); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Deo (Deo Tibba Expedition)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Deo (Deo Tibba Expedition); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Deo (Deo Tibba Expedition)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Deo (Deo Tibba Expedition)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Deo (Deo Tibba Expedition)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Deo (Deo Tibba Expedition)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Deo (Deo Tibba Expedition)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Deo (Deo Tibba Expedition)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Khanol / Jagatsukh; camp nights near Khanol at 6001 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Khanol / Jagatsukh runs through deodar, blue pine and birch giving way to alpine meadow, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Khanol at 6001 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Deo Tibba Expedition at 6001 m in first light",
      "Seri camp at dusk",
      "Mini camp at dusk",
      "Deo camp at dusk",
      "Khanol / Jagatsukh approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Deo Tibba Expedition route out of Khanol / Jagatsukh.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 6-8 days route from Khanol / Jagatsukh tops out near 6001 m.",
    "ams": "Significant AMS risk at 6001 m near Khanol; acclimatise carefully on the way up from Khanol / Jagatsukh, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Solang Valley",
      "Vashisht hot springs",
      "Manu Temple",
      "Jogini waterfall"
    ],
    "nearbyTreks": [
      "Patalsu Peak",
      "Friendship Peak",
      "Sar Pass",
      "Bhrigu Lake"
    ],
    "budget": {
      "budget": "₹13,500–25,500",
      "standard": "₹33,000–54,000",
      "premium": "₹63,000–1,05,000"
    },
    "days": [
      {
        "title": "Day 1: Khanol to Seri camp",
        "start": "Khanol (2,200 m)",
        "end": "Seri (3,100 m)",
        "distanceKm": "10",
        "altitudeM": "3100",
        "elevationGain": "+900 m",
        "trekTime": "5-6 hours",
        "terrain": "Forest and meadow",
        "description": "Long approach up Tainta nallah to Seri thach below Deo Tibba.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Seri",
        "campStay": "Alpine tents at Seri (3,100 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Seri",
        "photography": "A classic frame from Seri: Forest and meadow",
        "safety": "Keep the group together on the forest stretch before Seri; light fades quickly under the canopy"
      },
      {
        "title": "Day 2: Seri to Mini Thach",
        "start": "Seri (3,100 m)",
        "end": "Mini Thach (3,800 m)",
        "distanceKm": "8",
        "altitudeM": "3800",
        "elevationGain": "+700 m",
        "trekTime": "5 hours",
        "terrain": "Alpine grass",
        "description": "Move higher for acclimatisation below glacier snouts.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Mini kitchen tent",
        "campStay": "Alpine tents at Mini Thach (3,800 m)",
        "weather": "Breezy ridge air near Mini; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Mini: Alpine grass",
        "safety": "Wet roots and rock are slippery on the approach to Mini—shorten your stride"
      },
      {
        "title": "Day 3: Base camp and summit rotation",
        "start": "Mini Thach (3,800 m)",
        "end": "Deo Tibba high camp (5,500 m)",
        "distanceKm": "12",
        "altitudeM": "5500",
        "elevationGain": "+1,700 m staged",
        "trekTime": "Multi-day alpine",
        "terrain": "Glacier and rock",
        "description": "Technical expedition days with rope teams; summit at 6,001 m only for equipped climbers.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Deo",
        "campStay": "Alpine tents at Deo Tibba high camp (5,500 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Deo; move before the cloud build-up",
        "photography": "Wide-angle vantage at Deo: Glacier and rock",
        "safety": "Watch for AMS symptoms near Deo; descend if headache or nausea persists"
      },
      {
        "title": "Day 4: Return to Khanol",
        "start": "High camp",
        "end": "Khanol (2,200 m)",
        "distanceKm": "20",
        "altitudeM": "2200",
        "elevationGain": "Long descent",
        "trekTime": "2 days",
        "terrain": "Down valley",
        "description": "Staged descent through Seri to roadhead.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Khanol",
        "campStay": "Trekker's camp at Khanol (2,200 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Khanol",
        "photography": "Sunrise silhouettes at Khanol: Down valley",
        "safety": "Wet roots and rock are slippery on the approach to Khanol—shorten your stride"
      }
    ],
    "whyChoose": [
      "Distinct Deo Tibba Expedition scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Full expedition toward Deo Tibba base and high camps from Jagatsukh-Khanol."
  },
  "friendship-peak": {
    "key": "friendship-peak",
    "name": "Friendship Peak Trek",
    "region": "manali",
    "location": "Friendship Peak Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Friendship Peak (5,289 m) earned its name as a training summit climbed by mixed groups of Indian and international mountaineers, and remains one of the most climbed non-technical snow peaks in the Pir Panjal above Solang. Its relatively straightforward glacier route makes it a common stepping stone toward bigger expeditions.",
    "difficulty": "Difficult",
    "distanceKm": "28 km",
    "duration": "5 days",
    "highestAltitudeM": "5289",
    "baseCamp": "Solang / Dhundi",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Friendship (Friendship Peak)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Friendship (Friendship Peak)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Friendship (Friendship Peak) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Friendship (Friendship Peak); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Friendship (Friendship Peak)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Friendship (Friendship Peak); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Friendship (Friendship Peak)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Friendship (Friendship Peak)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Friendship (Friendship Peak)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Friendship (Friendship Peak)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Friendship (Friendship Peak)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Friendship (Friendship Peak)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Solang / Dhundi; camp nights near Solang at 5289 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Solang / Dhundi runs through deodar, blue pine and birch giving way to alpine meadow, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Solang at 5289 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Friendship Peak at 5289 m in first light",
      "Lady camp at dusk",
      "Summit camp at dusk",
      "Friendship camp at dusk",
      "Solang / Dhundi approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Friendship Peak route out of Solang / Dhundi.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹3,000–5,600 per day for a local guide",
    "porterCharges": "₹2,000–4,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "A strong cardio base and prior high-altitude trekking experience are strongly advised for the 5 days push from Solang / Dhundi to 5289 m.",
    "ams": "Significant AMS risk at 5289 m near Solang; acclimatise carefully on the way up from Solang / Dhundi, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Manu Temple",
      "Jogini waterfall",
      "Naggar Castle",
      "Rohtang Pass viewpoint"
    ],
    "nearbyTreks": [
      "Lama Dugh",
      "Hanuman Tibba",
      "Hampta Pass",
      "Patalsu Peak"
    ],
    "budget": {
      "budget": "₹9,000–17,000",
      "standard": "₹22,000–36,000",
      "premium": "₹42,000–70,000"
    },
    "days": [
      {
        "title": "Day 1: Solang to Lady Leg camp",
        "start": "Solang (2,500 m)",
        "end": "Lady Leg (3,500 m)",
        "distanceKm": "8",
        "altitudeM": "3500",
        "elevationGain": "+1,000 m",
        "trekTime": "5 hours",
        "terrain": "Meadow",
        "description": "Approach along Beas Kund corridor to Lady Leg camp.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Lady",
        "campStay": "Alpine tents at Lady Leg (3,500 m)",
        "weather": "Breezy ridge air near Lady; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Lady: Meadow",
        "safety": "Wet roots and rock are slippery on the approach to Lady—shorten your stride"
      },
      {
        "title": "Day 2: Lady Leg to summit camp",
        "start": "Lady Leg (3,500 m)",
        "end": "Summit camp (4,800 m)",
        "distanceKm": "6",
        "altitudeM": "4800",
        "elevationGain": "+1,300 m",
        "trekTime": "6 hours",
        "terrain": "Snow and rock",
        "description": "High camp below Friendship Peak with crampon practice.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Summit",
        "campStay": "Alpine tents at Summit camp (4,800 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Summit; move before the cloud build-up",
        "photography": "Wide-angle vantage at Summit: Snow and rock",
        "safety": "Watch for AMS symptoms near Summit; descend if headache or nausea persists"
      },
      {
        "title": "Day 3: Summit day",
        "start": "Summit camp (4,800 m)",
        "end": "Friendship Peak (5,289 m)",
        "distanceKm": "10",
        "altitudeM": "5289",
        "elevationGain": "+489 m",
        "trekTime": "10-12 hours",
        "terrain": "Alpine snow",
        "description": "Summit push with guide and rope; return to high camp same day.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Friendship",
        "campStay": "Alpine tents at Friendship Peak (5,289 m)",
        "weather": "Thin, cold air at altitude near Friendship; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Friendship: Alpine snow",
        "safety": "Strict turnaround time on the approach to Friendship—do not push on if weather closes in"
      },
      {
        "title": "Day 4: Descend to Solang",
        "start": "Summit camp (4,800 m)",
        "end": "Solang (2,500 m)",
        "distanceKm": "14",
        "altitudeM": "2500",
        "elevationGain": "Descent",
        "trekTime": "2 days",
        "terrain": "Valley trail",
        "description": "Descend via Dhundi meadows to Solang.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Solang",
        "campStay": "Trekker's camp at Solang (2,500 m)",
        "weather": "Breezy ridge air near Solang; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Solang: Valley trail",
        "safety": "Keep the group together on the forest stretch before Solang; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "Distinct Friendship Peak Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Trekking peak above Beas valley with glacier travel near summit."
  },
  "hanuman-tibba": {
    "key": "hanuman-tibba",
    "name": "Hanuman Tibba Trek",
    "region": "manali",
    "location": "Hanuman Tibba Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Hanuman Tibba (5,928 m) is the highest peak visible from Solang and has attracted mountaineering expeditions since the colonial era. It remains a serious technical objective requiring glacier travel and fixed-rope sections above Camp II.",
    "difficulty": "Challenging",
    "distanceKm": "40 km",
    "duration": "7+ days",
    "highestAltitudeM": "5928",
    "baseCamp": "Solang",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Camp (Hanuman Tibba)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Camp (Hanuman Tibba)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Camp (Hanuman Tibba) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Camp (Hanuman Tibba); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Camp (Hanuman Tibba)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Camp (Hanuman Tibba); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Camp (Hanuman Tibba)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Camp (Hanuman Tibba)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Camp (Hanuman Tibba)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Camp (Hanuman Tibba)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Camp (Hanuman Tibba)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Camp (Hanuman Tibba)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Solang; camp nights near Solang at 5928 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Solang runs through deodar, blue pine and birch giving way to alpine meadow, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Solang at 5928 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Hanuman Tibba at 5928 m in first light",
      "Advance camp at dusk",
      "Camp camp at dusk",
      "Solang camp at dusk",
      "Solang approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Hanuman Tibba route out of Solang.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 7+ days route from Solang tops out near 5928 m.",
    "ams": "Significant AMS risk at 5928 m near Solang; acclimatise carefully on the way up from Solang, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Naggar Castle",
      "Rohtang Pass viewpoint",
      "Old Manali lanes",
      "Hadimba Temple"
    ],
    "nearbyTreks": [
      "Chandrakhani Pass",
      "Pin Parvati Pass",
      "Beas Kund",
      "Lama Dugh"
    ],
    "budget": {
      "budget": "₹8,200–15,500",
      "standard": "₹20,000–32,800",
      "premium": "₹38,200–63,700"
    },
    "days": [
      {
        "title": "Day 1: Approach to advance base",
        "start": "Solang (2,500 m)",
        "end": "Advance base (4,200 m)",
        "distanceKm": "12",
        "altitudeM": "4200",
        "elevationGain": "Staged gain",
        "trekTime": "3 days",
        "terrain": "Glacier approach",
        "description": "Multi-day load ferry to ABC below Hanuman Tibba.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Advance",
        "campStay": "Alpine tents at Advance base (4,200 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Advance; move before the cloud build-up",
        "photography": "Wide-angle vantage at Advance: Glacier approach",
        "safety": "Watch for AMS symptoms near Advance; descend if headache or nausea persists"
      },
      {
        "title": "Day 2: Summit rotation",
        "start": "ABC (4,200 m)",
        "end": "Camp II (5,400 m)",
        "distanceKm": "8",
        "altitudeM": "5400",
        "elevationGain": "High alpine",
        "trekTime": "2 days",
        "terrain": "Ice and rock",
        "description": "Establish high camps for summit window on 5,928 m peak.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Camp",
        "campStay": "Alpine tents at Camp II (5,400 m)",
        "weather": "Thin, cold air at altitude near Camp; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Camp: Ice and rock",
        "safety": "Strict turnaround time on the approach to Camp—do not push on if weather closes in"
      },
      {
        "title": "Day 3: Return march",
        "start": "Camp II",
        "end": "Solang (2,500 m)",
        "distanceKm": "20",
        "altitudeM": "2500",
        "elevationGain": "Descent",
        "trekTime": "3 days",
        "terrain": "Same valley exit",
        "description": "Retrace Beas glacier side to road.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Solang",
        "campStay": "Trekker's camp at Solang (2,500 m)",
        "weather": "Breezy ridge air near Solang; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Solang: Same valley exit",
        "safety": "Keep the group together on the forest stretch before Solang; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "Distinct Hanuman Tibba Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Major peak above Solang requiring mountaineering logistics."
  },
  "pin-parvati": {
    "key": "pin-parvati",
    "name": "Pin Parvati Pass Trek",
    "region": "manali",
    "location": "Pin Parvati Pass Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Pin Parvati Pass (5,319 m) is one of the great classic high-altitude crossings of Himachal, linking the lush Parvati valley with the high-desert Pin valley of Spiti through the glacial basin of Mantalai Lake. Shepherds and traders once used variants of this route to move between Kullu and Spiti before motorable roads existed.",
    "difficulty": "Challenging",
    "distanceKm": "110 km",
    "duration": "10-11 days",
    "highestAltitudeM": "5319",
    "baseCamp": "Barsheni / Kheerganga side",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Pin (Pin Parvati Pass)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Pin (Pin Parvati Pass)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Pin (Pin Parvati Pass) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Pin (Pin Parvati Pass); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Pin (Pin Parvati Pass)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Pin (Pin Parvati Pass); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Pin (Pin Parvati Pass)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Pin (Pin Parvati Pass)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Pin (Pin Parvati Pass)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Pin (Pin Parvati Pass)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Pin (Pin Parvati Pass)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Pin (Pin Parvati Pass)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Barsheni / Kheerganga side; camp nights near Mud at 5319 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Barsheni / Kheerganga side runs through deodar, blue pine and birch giving way to alpine meadow, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Mud at 5319 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Pin Parvati Pass at 5319 m in first light",
      "Tunda camp at dusk",
      "Mantalai camp at dusk",
      "Pin camp at dusk",
      "Barsheni / Kheerganga side approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Pin Parvati Pass route out of Barsheni / Kheerganga side.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 10-11 days route from Barsheni / Kheerganga side tops out near 5319 m.",
    "ams": "Significant AMS risk at 5319 m near Mud; acclimatise carefully on the way up from Barsheni / Kheerganga side, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Old Manali lanes",
      "Hadimba Temple",
      "Solang Valley",
      "Vashisht hot springs"
    ],
    "nearbyTreks": [
      "Deo Tibba Expedition",
      "Sar Pass",
      "Bhrigu Lake",
      "Chandrakhani Pass"
    ],
    "budget": {
      "budget": "₹22,500–42,500",
      "standard": "₹55,000–90,000",
      "premium": "₹1,05,000–1,75,000"
    },
    "days": [
      {
        "title": "Day 1: Barsheni to Tunda Bhuj",
        "start": "Barsheni (2,200 m)",
        "end": "Tunda Bhuj (3,285 m)",
        "distanceKm": "12",
        "altitudeM": "3285",
        "elevationGain": "+1,085 m",
        "trekTime": "6 hours",
        "terrain": "Parvati gorge forest",
        "description": "Enter narrow Parvati valley with waterfall sections toward Pandupul.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Tunda kitchen tent",
        "campStay": "Alpine tents at Tunda Bhuj (3,285 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Tunda",
        "photography": "Sunrise silhouettes at Tunda: Parvati gorge forest",
        "safety": "Wet roots and rock are slippery on the approach to Tunda—shorten your stride"
      },
      {
        "title": "Day 2: Thakur Kuan to Mantalai",
        "start": "Thakur Kuan (3,560 m)",
        "end": "Mantalai Lake (4,100 m)",
        "distanceKm": "12",
        "altitudeM": "4100",
        "elevationGain": "+540 m",
        "trekTime": "7 hours",
        "terrain": "Boulder bridges and meadows",
        "description": "Push toward Mantalai Lake base below the pass.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Mantalai",
        "campStay": "Alpine tents at Mantalai Lake (4,100 m)",
        "weather": "Clear early morning skies near Mantalai usually cloud over by early afternoon",
        "photography": "Late-afternoon panorama from Mantalai: Boulder bridges and meadows",
        "safety": "Snow or ice patches possible near Mantalai; use microspikes and short, steady steps"
      },
      {
        "title": "Day 3: Cross Pin Parvati Pass to Pin side",
        "start": "Mantalai (4,100 m)",
        "end": "Pin valley camp (4,000 m)",
        "distanceKm": "10",
        "altitudeM": "5319",
        "elevationGain": "Pass day",
        "trekTime": "10-12 hours",
        "terrain": "Glacier pass",
        "description": "Cross Pin Parvati Pass into Spiti Pin drainage; serious weather dependency.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Pin",
        "campStay": "Alpine tents at Pin valley camp (4,000 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Pin; move before the cloud build-up",
        "photography": "Best light at Pin: Glacier pass",
        "safety": "Watch for AMS symptoms near Pin; descend if headache or nausea persists"
      },
      {
        "title": "Day 4: Pin valley exit to Mud",
        "start": "Pin camp",
        "end": "Mud village (3,800 m)",
        "distanceKm": "18",
        "altitudeM": "3800",
        "elevationGain": "Descent",
        "trekTime": "2 days",
        "terrain": "Desert trail",
        "description": "Descend Pin river trail to Mud in Spiti.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Mud",
        "campStay": "Homestay in the village at Mud village (3,800 m)",
        "weather": "Pleasant daytime warmth with a sharp evening chill settling over Mud",
        "photography": "A classic frame from Mud: Desert trail",
        "safety": "Keep the group together on the forest stretch before Mud; light fades quickly under the canopy"
      }
    ],
    "whyChoose": [
      "Distinct Pin Parvati Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Crosses from Parvati to Pin valley via 5,319 m pass."
  },
  "sar-pass": {
    "key": "sar-pass",
    "name": "Sar Pass Trek",
    "region": "manali",
    "location": "Sar Pass Trek trailheads in Kullu Valley, Himachal Pradesh",
    "history": "Sar Pass earns its name from the small frozen lake ('sar') that sits on the pass itself, and the route via Grahan and Min Thach has become one of the most popular beginner snow-pass treks in the Parvati valley. Its gentle glissading slopes below the pass are a highlight for first-time high-altitude trekkers.",
    "difficulty": "Moderate",
    "distanceKm": "48 km",
    "duration": "5 days",
    "highestAltitudeM": "4200",
    "baseCamp": "Kasol / Grahan",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar (Kullu)",
    "roadConnectivity": "Delhi-Chandigarh-Mandi-Manali NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Deep winter closes the trail; snow blankets the approach to Biskeri (Sar Pass)"
      },
      {
        "month": "February",
        "note": "Cold with lingering snow on shaded stretches near Biskeri (Sar Pass)"
      },
      {
        "month": "March",
        "note": "Snowmelt begins; lower paths to Biskeri (Sar Pass) turn muddy"
      },
      {
        "month": "April",
        "note": "Rhododendron and fresh green cover the trail below Biskeri (Sar Pass); nights still cool"
      },
      {
        "month": "May",
        "note": "Reliable window opens; warm days and cold nights around Biskeri (Sar Pass)"
      },
      {
        "month": "June",
        "note": "Pre-monsoon haze builds by afternoon near Biskeri (Sar Pass); go early"
      },
      {
        "month": "July",
        "note": "Monsoon rain, leeches and slick roots on the approach to Biskeri (Sar Pass)"
      },
      {
        "month": "August",
        "note": "Heavy showers continue; landslip risk on the road toward Biskeri (Sar Pass)"
      },
      {
        "month": "September",
        "note": "Skies clear after monsoon; best visibility of the year near Biskeri (Sar Pass)"
      },
      {
        "month": "October",
        "note": "Crisp golden light; frost returns at camps around Biskeri (Sar Pass)"
      },
      {
        "month": "November",
        "note": "Sharp cold and short days; early snow possible near Biskeri (Sar Pass)"
      },
      {
        "month": "December",
        "note": "Snow usually closes the higher ground above Biskeri (Sar Pass)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kasol / Grahan; camp nights near Barshaini at 4200 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Kasol / Grahan runs through deodar, blue pine and birch giving way to alpine meadow, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Barshaini at 4200 m. Keep an eye out for Himalayan tahr, monal pheasant and marmots above the tree line.",
    "photographySpots": [
      "Sar Pass at 4200 m in first light",
      "Grahan camp at dusk",
      "Min camp at dusk",
      "Biskeri camp at dusk",
      "Kasol / Grahan approach and roadhead"
    ],
    "network": "Coverage until the last roadhead village; none once on the high trail",
    "electricity": "Charge fully at the Manali/Kullu base before heading up",
    "atm": "ATMs in Manali and Kullu",
    "medical": "Manali hospital for anything beyond basic first aid",
    "camping": "Operator tents at established camp meadows along the route",
    "permits": "Forest permission for camping arranged by the operator; ID required at checkposts for the Sar Pass route out of Kasol / Grahan.",
    "forestFees": "Camping and forest fee bundled into most operator packages",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Gaiters for wet roots and mud on the forest stretch",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 5 days route from Kasol / Grahan runs 5–7 hours a day up to 4200 m.",
    "ams": "Real AMS risk above 4200 m on the approach to Barshaini; build in an acclimatisation stop and know the descent plan back to Kasol / Grahan.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Solang Valley",
      "Vashisht hot springs",
      "Manu Temple",
      "Jogini waterfall"
    ],
    "nearbyTreks": [
      "Friendship Peak",
      "Hampta Pass",
      "Patalsu Peak",
      "Deo Tibba Expedition"
    ],
    "budget": {
      "budget": "₹5,900–11,100",
      "standard": "₹14,300–23,400",
      "premium": "₹27,300–45,500"
    },
    "days": [
      {
        "title": "Day 1: Kasol to Grahan",
        "start": "Kasol (1,580 m)",
        "end": "Grahan village (2,300 m)",
        "distanceKm": "9",
        "altitudeM": "2300",
        "elevationGain": "+720 m",
        "trekTime": "5 hours",
        "terrain": "Parvati forest",
        "description": "First day into Grahan village lanes and rhododendron forest.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Grahan",
        "campStay": "Homestay in the village at Grahan village (2,300 m)",
        "weather": "Breezy ridge air near Grahan; carry a windproof layer for the evening",
        "photography": "Late-afternoon panorama from Grahan: Parvati forest",
        "safety": "Keep the group together on the forest stretch before Grahan; light fades quickly under the canopy"
      },
      {
        "title": "Day 2: Grahan to Min Thach",
        "start": "Grahan (2,300 m)",
        "end": "Min Thach (3,400 m)",
        "distanceKm": "10",
        "altitudeM": "3400",
        "elevationGain": "+1,100 m",
        "trekTime": "6 hours",
        "terrain": "Steep forest",
        "description": "Climb to Min Thach meadows with first snow patches in season.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Min",
        "campStay": "Alpine tents at Min Thach (3,400 m)",
        "weather": "Cool forest shade by day; temperatures drop fast after dark at Min",
        "photography": "Best light at Min: Steep forest",
        "safety": "Wet roots and rock are slippery on the approach to Min—shorten your stride"
      },
      {
        "title": "Day 3: Min Thach to Nagaru via Sar Pass",
        "start": "Min Thach (3,400 m)",
        "end": "Biskeri Thach (3,500 m)",
        "distanceKm": "12",
        "altitudeM": "4200",
        "elevationGain": "Pass crossing",
        "trekTime": "8-9 hours",
        "terrain": "Snow slope pass",
        "description": "Cross Sar Pass with toboggan-style snow slides on descent toward Biskeri.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Biskeri",
        "campStay": "Alpine tents at Biskeri Thach (3,500 m)",
        "weather": "Thin, cold air at altitude near Biskeri; expect a big day-night temperature swing",
        "photography": "A classic frame from Biskeri: Snow slope pass",
        "safety": "Strict turnaround time on the approach to Biskeri—do not push on if weather closes in"
      },
      {
        "title": "Day 4: Biskeri to Barshaini",
        "start": "Biskeri (3,500 m)",
        "end": "Barshaini (2,200 m)",
        "distanceKm": "12",
        "altitudeM": "2200",
        "elevationGain": "Descent",
        "trekTime": "5-6 hours",
        "terrain": "Meadow descent",
        "description": "Exit to Barshaini road for bus to Kasol.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Barshaini kitchen tent",
        "campStay": "Trekker's camp at Barshaini (2,200 m)",
        "weather": "Breezy ridge air near Barshaini; carry a windproof layer for the evening",
        "photography": "Golden-hour views near Barshaini: Meadow descent",
        "safety": "Wet roots and rock are slippery on the approach to Barshaini—shorten your stride"
      }
    ],
    "whyChoose": [
      "Distinct Sar Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Kasol-Grahan-Min Thach-Sar Pass-Biskeri-Thachkar (YHAI classic)."
  },
  "kheerganga": {
    "key": "kheerganga",
    "name": "Kheerganga Trek",
    "region": "parvati",
    "location": "Kheerganga Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Kheerganga is named for its natural hot spring, believed in local legend to be linked to Shiva and Parvati, and the pool remains an active bathing and meditation spot for sadhus and villagers alike. The trail via Nakthan has been used for generations by Kasol-side shepherds moving between valley villages and high pastures.",
    "difficulty": "Easy-Moderate",
    "distanceKm": "12 km",
    "duration": "2 days",
    "highestAltitudeM": "2960",
    "baseCamp": "Barshaini",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Kheerganga (Kheerganga) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Kheerganga (Kheerganga)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Kheerganga (Kheerganga)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Kheerganga (Kheerganga)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Kheerganga (Kheerganga) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Kheerganga (Kheerganga)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Kheerganga (Kheerganga)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Kheerganga (Kheerganga)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Kheerganga (Kheerganga) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Kheerganga (Kheerganga)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Kheerganga (Kheerganga)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Kheerganga (Kheerganga) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Barshaini; camp nights near Barshaini at 2960 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Barshaini runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Barshaini at 2960 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Kheerganga at 2960 m in first light",
      "Nakthan camp at dusk",
      "Kheerganga camp at dusk",
      "Barshaini camp at dusk",
      "Barshaini approach and roadhead"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Kheerganga route out of Barshaini.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹1,700–3,100 per day for a local guide",
    "porterCharges": "₹1,100–2,200 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Regular walking fitness is needed for the 2 days climb from Barshaini up to 2960 m.",
    "ams": "Low AMS risk at 2960 m near Barshaini; hydrate well and ascend steadily from Barshaini.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Barshaini bridge",
      "Pulga meadows",
      "Parvati river beaches",
      "Kheerganga hot spring pool"
    ],
    "nearbyTreks": [
      "Tulga Village Circuit",
      "Magic Valley (Waichin)",
      "Waichin Valley",
      "Rasol Village"
    ],
    "budget": {
      "budget": "₹2,000–3,700",
      "standard": "₹4,800–7,900",
      "premium": "₹9,200–15,400"
    },
    "days": [
      {
        "title": "Day 1: Barshaini to Nakthan",
        "start": "Barshaini (2,200 m)",
        "end": "Nakthan village (2,600 m)",
        "distanceKm": "5",
        "altitudeM": "2600",
        "elevationGain": "+400 m",
        "trekTime": "2-3 hours",
        "terrain": "Parvati riverside",
        "description": "Choose Nakthan or Kalga route; Nakthan follows the left bank with cafe stops.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Nakthan",
        "campStay": "Homestay in the village at Nakthan village (2,600 m)",
        "weather": "Warm valley air by the river near Nakthan; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Best light at Nakthan: Parvati riverside",
        "safety": "Wooden or wire bridges before Nakthan can be slick after rain—cross one at a time"
      },
      {
        "title": "Day 2: Nakthan to Kheerganga",
        "start": "Nakthan (2,600 m)",
        "end": "Kheerganga (2,960 m)",
        "distanceKm": "7",
        "altitudeM": "2960",
        "elevationGain": "+360 m",
        "trekTime": "3-4 hours",
        "terrain": "Waterfall ladders and forest",
        "description": "Final climb to Kheerganga meadow and hot spring bathhouses.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Kheerganga",
        "campStay": "Trekker's camp at Kheerganga (2,960 m)",
        "weather": "Humid, orchard-scented air near Kheerganga with a cold night breeze off the river",
        "photography": "A classic frame from Kheerganga: Waterfall ladders and forest",
        "safety": "Stay on the marked path near Kheerganga; riverside banks can undercut without warning"
      },
      {
        "title": "Day 3: Kheerganga to Barshaini",
        "start": "Kheerganga (2,960 m)",
        "end": "Barshaini (2,200 m)",
        "distanceKm": "12",
        "altitudeM": "2200",
        "elevationGain": "Descent",
        "trekTime": "4 hours",
        "terrain": "Downhill forest",
        "description": "Descend via alternate Kalga-Pulga route or same trail to Barshaini.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Barshaini",
        "campStay": "Trekker's camp at Barshaini (2,200 m)",
        "weather": "Warm valley air by the river near Barshaini; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Golden-hour views near Barshaini: Downhill forest",
        "safety": "Wooden or wire bridges before Barshaini can be slick after rain—cross one at a time"
      }
    ],
    "whyChoose": [
      "Distinct Kheerganga Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Barshaini to Kheerganga hot springs in Parvati valley."
  },
  "pin-bhaba": {
    "key": "pin-bhaba",
    "name": "Pin Bhaba Pass Trek",
    "region": "spiti",
    "location": "Pin Bhaba Pass Trek trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Bhaba Pass has historically connected the Kinnaur side at Kafnoo with Mud village in the Pin valley of Spiti, used by Kinnauri and Spitian traders exchanging wool, salt and grain before the Kaza road was built. The crossing remains a dramatic transition from Kinnauri forest to Spiti’s high desert.",
    "difficulty": "Challenging",
    "distanceKm": "50 km",
    "duration": "7 days",
    "highestAltitudeM": "4865",
    "baseCamp": "Kafnoo / Wangtu",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Phutsirang (Pin Bhaba Pass) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Phutsirang (Pin Bhaba Pass) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Phutsirang (Pin Bhaba Pass) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Phutsirang (Pin Bhaba Pass) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Phutsirang (Pin Bhaba Pass) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Phutsirang (Pin Bhaba Pass)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Phutsirang (Pin Bhaba Pass) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Phutsirang (Pin Bhaba Pass)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Phutsirang (Pin Bhaba Pass)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Phutsirang (Pin Bhaba Pass)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Phutsirang (Pin Bhaba Pass) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Phutsirang (Pin Bhaba Pass) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Kafnoo / Wangtu; camp nights near Mud at 4865 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Kafnoo / Wangtu runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Mud at 4865 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Pin Bhaba Pass at 4865 m in first light",
      "Mulling camp at dusk",
      "Karah camp at dusk",
      "Phutsirang camp at dusk",
      "Kafnoo / Wangtu approach and roadhead"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Pin Bhaba Pass route out of Kafnoo / Wangtu.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 7 days route from Kafnoo / Wangtu tops out near 4865 m.",
    "ams": "Significant AMS risk at 4865 m near Mud; acclimatise carefully on the way up from Kafnoo / Wangtu, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Gue mummy temple",
      "Kunzum Pass",
      "Key Monastery",
      "Kaza market"
    ],
    "nearbyTreks": [
      "Kanamo Peak",
      "Kibber Village Acclimatisation Walks",
      "Komic Monastery"
    ],
    "budget": {
      "budget": "₹15,800–29,800",
      "standard": "₹38,500–63,000",
      "premium": "₹73,500–1,22,500"
    },
    "days": [
      {
        "title": "Day 1: Kafnoo to Mulling",
        "start": "Kafnoo (2,400 m)",
        "end": "Mulling camp (3,200 m)",
        "distanceKm": "10",
        "altitudeM": "3200",
        "elevationGain": "+800 m",
        "trekTime": "5-6 hours",
        "terrain": "Bhaba river forest",
        "description": "Enter dense cedar along Bhaba nallah to first camp at Mulling.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Mulling",
        "campStay": "Alpine tents at Mulling camp (3,200 m)",
        "weather": "Big diurnal swing at Mulling—warm at noon, bitterly cold within an hour of sunset",
        "photography": "A classic frame from Mulling: Bhaba river forest",
        "safety": "Loose scree on the approach to Mulling—test footing before committing your weight"
      },
      {
        "title": "Day 2: Mulling to Karah",
        "start": "Mulling (3,200 m)",
        "end": "Karah (3,600 m)",
        "distanceKm": "8",
        "altitudeM": "3600",
        "elevationGain": "+400 m",
        "trekTime": "4-5 hours",
        "terrain": "Alpine meadow",
        "description": "Move up valley with Kinnaur peaks appearing south.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Karah",
        "campStay": "Alpine tents at Karah (3,600 m)",
        "weather": "Dust and wind common by afternoon near Karah; mornings are calm and clear",
        "photography": "Golden-hour views near Karah: Alpine meadow",
        "safety": "Hydrate constantly on the exposed climb to Karah; UV exposure is severe at this altitude"
      },
      {
        "title": "Day 3: Karah to Phutsirang",
        "start": "Karah (3,600 m)",
        "end": "Phutsirang (4,000 m)",
        "distanceKm": "6",
        "altitudeM": "4000",
        "elevationGain": "+400 m",
        "trekTime": "4 hours",
        "terrain": "High meadow",
        "description": "Base below Pin Bhaba Pass with stream crossings.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Phutsirang",
        "campStay": "Forest rest house / trekker hut at Phutsirang (4,000 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Phutsirang; move before the cloud build-up",
        "photography": "Wide-angle vantage at Phutsirang: High meadow",
        "safety": "Watch for AMS symptoms near Phutsirang; descend if headache or nausea persists"
      },
      {
        "title": "Day 4: Cross Pin Bhaba Pass to Mud",
        "start": "Phutsirang (4,000 m)",
        "end": "Mud village (3,800 m)",
        "distanceKm": "12",
        "altitudeM": "4865",
        "elevationGain": "Pass day",
        "trekTime": "8-10 hours",
        "terrain": "Pass and Pin desert",
        "description": "Cross pass into arid Pin valley; camp near Mud Spiti.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Mud",
        "campStay": "Homestay in the village at Mud village (3,800 m)",
        "weather": "Thin, cold air at altitude near Mud; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Mud: Pass and Pin desert",
        "safety": "Strict turnaround time on the approach to Mud—do not push on if weather closes in"
      }
    ],
    "whyChoose": [
      "Distinct Pin Bhaba Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Kafnoo through Pin Bhaba Pass to Mud in Spiti - classic forest to desert crossover."
  },
  "parang-la": {
    "key": "parang-la",
    "name": "Parang La Trek",
    "region": "spiti",
    "location": "Parang La Trek trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Parang La (5,580 m) was for centuries a trade route between Spiti's Kibber-Chicham herders and the Changpa nomads of Ladakh's Rupshu plateau, used to move salt, wool and livestock across terrain that resembles the Tibetan plateau. It remains one of the highest and most remote passes regularly crossed by trekkers in Himachal.",
    "difficulty": "Challenging",
    "distanceKm": "90 km",
    "duration": "8-10 days",
    "highestAltitudeM": "5580",
    "baseCamp": "Karzok / Kibber side",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Datang (Parang La) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Datang (Parang La) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Datang (Parang La) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Datang (Parang La) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Datang (Parang La) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Datang (Parang La)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Datang (Parang La) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Datang (Parang La)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Datang (Parang La)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Datang (Parang La)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Datang (Parang La) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Datang (Parang La) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Karzok / Kibber side; camp nights near Parilungbi at 5580 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Karzok / Kibber side runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Parilungbi at 5580 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Parang La at 5580 m in first light",
      "Thaltak camp at dusk",
      "Datang camp at dusk",
      "Parilungbi camp at dusk",
      "Karzok / Kibber side approach and roadhead"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Parang La route out of Karzok / Kibber side.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 8-10 days route from Karzok / Kibber side tops out near 5580 m.",
    "ams": "Significant AMS risk at 5580 m near Parilungbi; acclimatise carefully on the way up from Karzok / Kibber side, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Key Monastery",
      "Kaza market",
      "Dhankar Monastery cliff",
      "Chicham suspension bridge"
    ],
    "nearbyTreks": [
      "Chandratal Lake",
      "Langza Fossil Walk",
      "Spiti Winter Village Circuit"
    ],
    "budget": {
      "budget": "₹18,000–34,000",
      "standard": "₹44,000–72,000",
      "premium": "₹84,000–1,40,000"
    },
    "days": [
      {
        "title": "Day 1: Kibber to Thaltak meadow",
        "start": "Kibber (4,270 m)",
        "end": "Thaltak (4,500 m)",
        "distanceKm": "8",
        "altitudeM": "4500",
        "elevationGain": "+230 m",
        "trekTime": "4 hours",
        "terrain": "High desert",
        "description": "Acclimatise in Spiti before long traverse.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Thaltak",
        "campStay": "Alpine tents at Thaltak (4,500 m)",
        "weather": "Clear early morning skies near Thaltak usually cloud over by early afternoon",
        "photography": "Golden-hour views near Thaltak: High desert",
        "safety": "Snow or ice patches possible near Thaltak; use microspikes and short, steady steps"
      },
      {
        "title": "Day 2: High plateau march",
        "start": "Thaltak (4,500 m)",
        "end": "Datang Yongma (4,800 m)",
        "distanceKm": "14",
        "altitudeM": "4800",
        "elevationGain": "Rolling",
        "trekTime": "7 hours",
        "terrain": "Desert plateau",
        "description": "Long water-carry day across Changthang-style flats.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Datang",
        "campStay": "Alpine tents at Datang Yongma (4,800 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Datang; move before the cloud build-up",
        "photography": "Wide-angle vantage at Datang: Desert plateau",
        "safety": "Watch for AMS symptoms near Datang; descend if headache or nausea persists"
      },
      {
        "title": "Day 3: Cross Parang La",
        "start": "Datang Yongma (4,800 m)",
        "end": "Parilungbi camp (4,600 m)",
        "distanceKm": "16",
        "altitudeM": "5580",
        "elevationGain": "Pass",
        "trekTime": "10 hours",
        "terrain": "High pass snow",
        "description": "Cross Parang La toward Ladakh side drainages.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Parilungbi kitchen tent",
        "campStay": "Alpine tents at Parilungbi camp (4,600 m)",
        "weather": "Thin, cold air at altitude near Parilungbi; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Parilungbi: High pass snow",
        "safety": "Strict turnaround time on the approach to Parilungbi—do not push on if weather closes in"
      }
    ],
    "whyChoose": [
      "Distinct Parang La Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Links Ladakh Tso Moriri area with Spiti over Parang La."
  },
  "kanamo": {
    "key": "kanamo",
    "name": "Kanamo Peak Trek",
    "region": "spiti",
    "location": "Kanamo Peak Trek trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Kanamo Peak (5,964 m) rises directly above Kibber village and has long been used by local herders as a high lookout over the Spiti valley and the Tibetan plateau beyond. Its relatively straightforward scree ridge makes it one of the more accessible 5,900 m-plus summits in the Trans-Himalaya.",
    "difficulty": "Difficult",
    "distanceKm": "30 km",
    "duration": "5 days",
    "highestAltitudeM": "5964",
    "baseCamp": "Kibber",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Kanamo (Kanamo Peak) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Kanamo (Kanamo Peak) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Kanamo (Kanamo Peak) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Kanamo (Kanamo Peak) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Kanamo (Kanamo Peak) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Kanamo (Kanamo Peak)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Kanamo (Kanamo Peak) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Kanamo (Kanamo Peak)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Kanamo (Kanamo Peak)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Kanamo (Kanamo Peak)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Kanamo (Kanamo Peak) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Kanamo (Kanamo Peak) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Kibber; camp nights near Kibber at 5964 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Kibber runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Kibber at 5964 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Kanamo Peak at 5964 m in first light",
      "Base camp at dusk",
      "Kanamo camp at dusk",
      "Kibber camp at dusk",
      "Kibber approach and roadhead"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Kanamo Peak route out of Kibber.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹3,000–5,600 per day for a local guide",
    "porterCharges": "₹2,000–4,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "A strong cardio base and prior high-altitude trekking experience are strongly advised for the 5 days push from Kibber to 5964 m.",
    "ams": "Significant AMS risk at 5964 m near Kibber; acclimatise carefully on the way up from Kibber, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Dhankar Monastery cliff",
      "Chicham suspension bridge",
      "Tabo Monastery murals",
      "Pin Valley National Park gate"
    ],
    "nearbyTreks": [
      "Dhankar Lake",
      "Hikkim Post Office Walk",
      "Pin Bhaba Pass"
    ],
    "budget": {
      "budget": "₹9,000–17,000",
      "standard": "₹22,000–36,000",
      "premium": "₹42,000–70,000"
    },
    "days": [
      {
        "title": "Day 1: Kibber to Kanamo base",
        "start": "Kibber (4,270 m)",
        "end": "Base camp (4,800 m)",
        "distanceKm": "6",
        "altitudeM": "4800",
        "elevationGain": "+530 m",
        "trekTime": "3-4 hours",
        "terrain": "Spiti moonscape",
        "description": "Short walk to base below Kanamo summit ridge.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Base",
        "campStay": "Alpine tents at Base camp (4,800 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Base; move before the cloud build-up",
        "photography": "Wide-angle vantage at Base: Spiti moonscape",
        "safety": "Watch for AMS symptoms near Base; descend if headache or nausea persists"
      },
      {
        "title": "Day 2: Summit day Kanamo",
        "start": "Base (4,800 m)",
        "end": "Kanamo peak (5,964 m)",
        "distanceKm": "12",
        "altitudeM": "5964",
        "elevationGain": "+1,164 m",
        "trekTime": "10-12 hours",
        "terrain": "Scree and snow ridge",
        "description": "Long summit day with Spiti panorama; return to Kibber next day.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Kanamo",
        "campStay": "Alpine tents at Kanamo peak (5,964 m)",
        "weather": "Thin, cold air at altitude near Kanamo; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Kanamo: Scree and snow ridge",
        "safety": "Strict turnaround time on the approach to Kanamo—do not push on if weather closes in"
      },
      {
        "title": "Day 3: Rest descent Kibber",
        "start": "Base camp (4,800 m)",
        "end": "Kibber (4,270 m)",
        "distanceKm": "6",
        "altitudeM": "4270",
        "elevationGain": "Descent",
        "trekTime": "3 hours",
        "terrain": "Village trail",
        "description": "Recover in Kibber homestay after summit.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Kibber",
        "campStay": "Alpine tents at Kibber (4,270 m)",
        "weather": "Clear early morning skies near Kibber usually cloud over by early afternoon",
        "photography": "Late-afternoon panorama from Kibber: Village trail",
        "safety": "Snow or ice patches possible near Kibber; use microspikes and short, steady steps"
      }
    ],
    "whyChoose": [
      "Distinct Kanamo Peak Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Non-technical trekking peak above Kibber village."
  },
  "chandratal": {
    "key": "chandratal",
    "name": "Chandratal Lake Trek",
    "region": "spiti",
    "location": "Chandratal Lake Trek trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Chandratal ('Moon Lake') has been considered sacred by both Buddhist and Hindu communities for centuries and was historically a stop on the trade route over Kunzum Pass between Lahaul and Spiti. It is now protected as a Ramsar wetland site.",
    "difficulty": "Moderate",
    "distanceKm": "14 km",
    "duration": "2-3 days",
    "highestAltitudeM": "4300",
    "baseCamp": "Batal / Kunzum side",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Batal (Chandratal Lake) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Batal (Chandratal Lake) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Batal (Chandratal Lake) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Batal (Chandratal Lake) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Batal (Chandratal Lake) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Batal (Chandratal Lake)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Batal (Chandratal Lake) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Batal (Chandratal Lake)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Batal (Chandratal Lake)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Batal (Chandratal Lake)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Batal (Chandratal Lake) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Batal (Chandratal Lake) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Batal / Kunzum side; camp nights near Batal at 4300 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Batal / Kunzum side runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Batal at 4300 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Chandratal Lake at 4300 m in first light",
      "Chandratal camp at dusk",
      "Batal camp at dusk",
      "Batal / Kunzum side approach and roadhead",
      "Batal on the return leg"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Chandratal Lake route out of Batal / Kunzum side.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2-3 days route from Batal / Kunzum side runs 5–7 hours a day up to 4300 m.",
    "ams": "Real AMS risk above 4300 m on the approach to Batal; build in an acclimatisation stop and know the descent plan back to Batal / Kunzum side.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Tabo Monastery murals",
      "Pin Valley National Park gate",
      "Gue mummy temple",
      "Kunzum Pass"
    ],
    "nearbyTreks": [
      "Kibber Village Acclimatisation Walks",
      "Komic Monastery",
      "Parang La"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Batal to Chandratal camp",
        "start": "Batal (3,960 m)",
        "end": "Chandratal camps (4,300 m)",
        "distanceKm": "14",
        "altitudeM": "4300",
        "elevationGain": "+340 m",
        "trekTime": "5-6 hours",
        "terrain": "High desert trail",
        "description": "Walk the Chandra river bench to turquoise Chandratal at ~4,300 m.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Chandratal",
        "campStay": "Alpine tents at Chandratal camps (4,300 m)",
        "weather": "Thin, cold air at altitude near Chandratal; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Chandratal: High desert trail",
        "safety": "Strict turnaround time on the approach to Chandratal—do not push on if weather closes in"
      },
      {
        "title": "Day 2: Lake circumambulation + exit",
        "start": "Chandratal camp (4,300 m)",
        "end": "Batal / Manali road",
        "distanceKm": "14",
        "altitudeM": "3960",
        "elevationGain": "Descent",
        "trekTime": "5 hours",
        "terrain": "Open plateau",
        "description": "Morning lake photos then return to roadhead or cross Kunzum toward Manali.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Batal",
        "campStay": "Hotel/guesthouse at Batal / Manali road",
        "weather": "Dust and wind common by afternoon near Batal; mornings are calm and clear",
        "photography": "Late-afternoon panorama from Batal: Open plateau",
        "safety": "Loose scree on the approach to Batal—test footing before committing your weight"
      }
    ],
    "whyChoose": [
      "Distinct Chandratal Lake Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Approach Chandratal Moon Lake from Batal or Samudra Tapu trek."
  },
  "dhankar-lake": {
    "key": "dhankar-lake",
    "name": "Dhankar Lake Trek",
    "region": "spiti",
    "location": "Dhankar Lake Trek trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Dhankar's clifftop monastery and fort once served as the capital of the Pin valley's local kingdom, and the small lake above it was a traditional water source and pilgrimage stop for resident monks. The steep climb above the monastery remains a short but genuinely rewarding half-day walk.",
    "difficulty": "Moderate",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "4130",
    "baseCamp": "Dhankar monastery",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Dhankar (Dhankar Lake) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Dhankar (Dhankar Lake) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Dhankar (Dhankar Lake) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Dhankar (Dhankar Lake) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Dhankar (Dhankar Lake) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Dhankar (Dhankar Lake)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Dhankar (Dhankar Lake) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Dhankar (Dhankar Lake)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Dhankar (Dhankar Lake)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Dhankar (Dhankar Lake)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Dhankar (Dhankar Lake) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Dhankar (Dhankar Lake) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Dhankar monastery; camp nights near Dhankar at 4130 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Dhankar monastery runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Dhankar at 4130 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Dhankar Lake at 4130 m in first light",
      "Dhankar camp at dusk",
      "Dhankar monastery approach and roadhead",
      "Dhankar on the return leg"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Dhankar Lake route out of Dhankar monastery.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 1 day route from Dhankar monastery runs 5–7 hours a day up to 4130 m.",
    "ams": "Real AMS risk above 4130 m on the approach to Dhankar; build in an acclimatisation stop and know the descent plan back to Dhankar monastery.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Gue mummy temple",
      "Kunzum Pass",
      "Key Monastery",
      "Kaza market"
    ],
    "nearbyTreks": [
      "Langza Fossil Walk",
      "Spiti Winter Village Circuit",
      "Kanamo Peak"
    ],
    "budget": {
      "budget": "₹1,200–2,200",
      "standard": "₹2,900–4,700",
      "premium": "₹5,500–9,100"
    },
    "days": [
      {
        "title": "Day 1: Dhankar monastery to Dhankar Lake",
        "start": "Dhankar village (3,890 m)",
        "end": "Dhankar Lake (4,130 m)",
        "distanceKm": "3",
        "altitudeM": "4130",
        "elevationGain": "+240 m",
        "trekTime": "2-3 hours",
        "terrain": "High desert scree",
        "description": "Short steep pull to the ridge lake overlooking Spiti confluence.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Dhankar",
        "campStay": "Alpine tents at Dhankar Lake (4,130 m)",
        "weather": "Clear early morning skies near Dhankar usually cloud over by early afternoon",
        "photography": "Late-afternoon panorama from Dhankar: High desert scree",
        "safety": "Snow or ice patches possible near Dhankar; use microspikes and short, steady steps"
      },
      {
        "title": "Day 2: Return to Dhankar",
        "start": "Dhankar Lake (4,130 m)",
        "end": "Dhankar village (3,890 m)",
        "distanceKm": "3",
        "altitudeM": "3890",
        "elevationGain": "Descent",
        "trekTime": "1-2 hours",
        "terrain": "Same scree path",
        "description": "Descend before afternoon wind; visit monastery same evening.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Dhankar kitchen tent",
        "campStay": "Homestay in the village at Dhankar village (3,890 m)",
        "weather": "Strong daytime sun and very dry air at Dhankar; nights fall well below freezing",
        "photography": "Best light at Dhankar: Same scree path",
        "safety": "Hydrate constantly on the exposed climb to Dhankar; UV exposure is severe at this altitude"
      }
    ],
    "whyChoose": [
      "Distinct Dhankar Lake Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Steep day hike from Dhankar Gompa to Dhankar Lake."
  },
  "kibber": {
    "key": "kibber",
    "name": "Kibber Village Acclimatisation Walks",
    "region": "spiti",
    "location": "Kibber Village Acclimatisation Walks trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Kibber, long cited as one of the highest villages in the world connected by a motorable road, sits inside a landscape still used for winter snow leopard tracking by conservation groups and local spotters. Its surrounding ridges have been walked by herders moving livestock between grazing grounds for generations.",
    "difficulty": "Easy",
    "distanceKm": "8 km",
    "duration": "1-2 days",
    "highestAltitudeM": "4270",
    "baseCamp": "Kibber",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Chicham (Kibber Village Acclimatisation Walks) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Chicham (Kibber Village Acclimatisation Walks) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Chicham (Kibber Village Acclimatisation Walks) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Chicham (Kibber Village Acclimatisation Walks) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Chicham (Kibber Village Acclimatisation Walks) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Chicham (Kibber Village Acclimatisation Walks)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Chicham (Kibber Village Acclimatisation Walks) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Chicham (Kibber Village Acclimatisation Walks)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Chicham (Kibber Village Acclimatisation Walks)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Chicham (Kibber Village Acclimatisation Walks)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Chicham (Kibber Village Acclimatisation Walks) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Chicham (Kibber Village Acclimatisation Walks) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Kibber; camp nights near Chicham at 4270 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Kibber runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Chicham at 4270 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Kibber Village Acclimatisation Walks at 4270 m in first light",
      "Gette camp at dusk",
      "Chicham camp at dusk",
      "Kibber approach and roadhead",
      "Chicham on the return leg"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Kibber Village Acclimatisation Walks route out of Kibber.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 8 km route from Kibber—expect 3–5 hours of walking a day up to 4270 m.",
    "ams": "Real AMS risk above 4270 m on the approach to Chicham; build in an acclimatisation stop and know the descent plan back to Kibber.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Key Monastery",
      "Kaza market",
      "Dhankar Monastery cliff",
      "Chicham suspension bridge"
    ],
    "nearbyTreks": [
      "Hikkim Post Office Walk",
      "Pin Bhaba Pass",
      "Chandratal Lake"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Kibber to Gette viewpoint",
        "start": "Kibber (4,270 m)",
        "end": "Gette ridge (4,350 m)",
        "distanceKm": "4",
        "altitudeM": "4350",
        "elevationGain": "+80 m",
        "trekTime": "2 hours",
        "terrain": "Desert path",
        "description": "Easy acclimatisation walk with Kanamo and Chau Chau Kang Nilda views.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Gette",
        "campStay": "Alpine tents at Gette ridge (4,350 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Gette; move before the cloud build-up",
        "photography": "Best light at Gette: Desert path",
        "safety": "Watch for AMS symptoms near Gette; descend if headache or nausea persists"
      },
      {
        "title": "Day 2: Kibber to Chicham bridge vista",
        "start": "Kibber (4,270 m)",
        "end": "Chicham viewpoint (4,200 m)",
        "distanceKm": "4",
        "altitudeM": "4200",
        "elevationGain": "Gentle",
        "trekTime": "2 hours",
        "terrain": "Roadside trail",
        "description": "Walk toward Chicham gorge for bridge photos over deep canyon.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Chicham",
        "campStay": "Alpine tents at Chicham viewpoint (4,200 m)",
        "weather": "Thin, cold air at altitude near Chicham; expect a big day-night temperature swing",
        "photography": "A classic frame from Chicham: Roadside trail",
        "safety": "Strict turnaround time on the approach to Chicham—do not push on if weather closes in"
      }
    ],
    "whyChoose": [
      "Distinct Kibber Village Acclimatisation Walks scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Walks around one of the highest motorable villages."
  },
  "langza": {
    "key": "langza",
    "name": "Langza Fossil Walk",
    "region": "spiti",
    "location": "Langza Fossil Walk trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Langza sits atop a bed of ancient seabed sediment, and the marine fossils, including ammonites, that villagers still find on the surrounding slopes are evidence that this high desert once lay beneath the Tethys Sea. The giant Buddha statue overlooking the village has become a defining local landmark.",
    "difficulty": "Easy",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "4400",
    "baseCamp": "Langza",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Hikkim (Langza Fossil Walk) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Hikkim (Langza Fossil Walk) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Hikkim (Langza Fossil Walk) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Hikkim (Langza Fossil Walk) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Hikkim (Langza Fossil Walk) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Hikkim (Langza Fossil Walk)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Hikkim (Langza Fossil Walk) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Hikkim (Langza Fossil Walk)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Hikkim (Langza Fossil Walk)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Hikkim (Langza Fossil Walk)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Hikkim (Langza Fossil Walk) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Hikkim (Langza Fossil Walk) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Langza; camp nights near Hikkim at 4400 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Langza runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Hikkim at 4400 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Langza Fossil Walk at 4400 m in first light",
      "Langza camp at dusk",
      "Hikkim camp at dusk",
      "Langza approach and roadhead",
      "Hikkim on the return leg"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Langza Fossil Walk route out of Langza.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 6 km route from Langza—expect 3–5 hours of walking a day up to 4400 m.",
    "ams": "Real AMS risk above 4400 m on the approach to Hikkim; build in an acclimatisation stop and know the descent plan back to Langza.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Dhankar Monastery cliff",
      "Chicham suspension bridge",
      "Tabo Monastery murals",
      "Pin Valley National Park gate"
    ],
    "nearbyTreks": [
      "Komic Monastery",
      "Parang La",
      "Dhankar Lake"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Langza village loop to Buddha statue",
        "start": "Langza (4,400 m)",
        "end": "Langza Buddha viewpoint (4,450 m)",
        "distanceKm": "3",
        "altitudeM": "4450",
        "elevationGain": "+50 m",
        "trekTime": "1-2 hours",
        "terrain": "Meadow",
        "description": "Circle the giant Buddha overlooking Spiti with fossil hunting on slopes.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Langza",
        "campStay": "Alpine tents at Langza Buddha viewpoint (4,450 m)",
        "weather": "Thin, cold air at altitude near Langza; expect a big day-night temperature swing",
        "photography": "A classic frame from Langza: Meadow",
        "safety": "Strict turnaround time on the approach to Langza—do not push on if weather closes in"
      },
      {
        "title": "Day 2: Langza to Hikkim ridge",
        "start": "Langza (4,400 m)",
        "end": "Hikkim road bend (4,460 m)",
        "distanceKm": "3",
        "altitudeM": "4460",
        "elevationGain": "Gentle",
        "trekTime": "1 hour",
        "terrain": "Road walk",
        "description": "Stroll toward Hikkim for mail-office day trip combo.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Hikkim",
        "campStay": "Alpine tents at Hikkim road bend (4,460 m)",
        "weather": "Clear early morning skies near Hikkim usually cloud over by early afternoon",
        "photography": "Golden-hour views near Hikkim: Road walk",
        "safety": "Snow or ice patches possible near Hikkim; use microspikes and short, steady steps"
      }
    ],
    "whyChoose": [
      "Distinct Langza Fossil Walk scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Fossil-rich meadows below Chau Chau Kang Nilda."
  },
  "hikkim": {
    "key": "hikkim",
    "name": "Hikkim Post Office Walk",
    "region": "spiti",
    "location": "Hikkim Post Office Walk trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Hikkim is home to what is widely cited as the highest functioning post office in the world, opened in 1983 and still using hand-cancelled stamps that have become a favourite souvenir for Spiti travellers. The short walk between Langza, Hikkim and Komic links three of Spiti’s most distinctive high villages.",
    "difficulty": "Easy",
    "distanceKm": "4 km",
    "duration": "1 day",
    "highestAltitudeM": "4460",
    "baseCamp": "Hikkim",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Komic (Hikkim Post Office Walk) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Komic (Hikkim Post Office Walk) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Komic (Hikkim Post Office Walk) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Komic (Hikkim Post Office Walk) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Komic (Hikkim Post Office Walk) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Komic (Hikkim Post Office Walk)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Komic (Hikkim Post Office Walk) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Komic (Hikkim Post Office Walk)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Komic (Hikkim Post Office Walk)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Komic (Hikkim Post Office Walk)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Komic (Hikkim Post Office Walk) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Komic (Hikkim Post Office Walk) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Hikkim; camp nights near Komic at 4460 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Hikkim runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Komic at 4460 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Hikkim Post Office Walk at 4460 m in first light",
      "Hikkim camp at dusk",
      "Komic camp at dusk",
      "Hikkim approach and roadhead",
      "Komic on the return leg"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Hikkim Post Office Walk route out of Hikkim.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 4 km route from Hikkim—expect 3–5 hours of walking a day up to 4460 m.",
    "ams": "Real AMS risk above 4460 m on the approach to Komic; build in an acclimatisation stop and know the descent plan back to Hikkim.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Tabo Monastery murals",
      "Pin Valley National Park gate",
      "Gue mummy temple",
      "Kunzum Pass"
    ],
    "nearbyTreks": [
      "Spiti Winter Village Circuit",
      "Kanamo Peak",
      "Kibber Village Acclimatisation Walks"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Langza to Hikkim",
        "start": "Langza (4,400 m)",
        "end": "Hikkim village (4,460 m)",
        "distanceKm": "4",
        "altitudeM": "4460",
        "elevationGain": "+60 m",
        "trekTime": "1-2 hours",
        "terrain": "Spiti road shoulder",
        "description": "Easy road walk with prayer flags toward Hikkim post office.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Hikkim kitchen tent",
        "campStay": "Homestay in the village at Hikkim village (4,460 m)",
        "weather": "Clear early morning skies near Hikkim usually cloud over by early afternoon",
        "photography": "Golden-hour views near Hikkim: Spiti road shoulder",
        "safety": "Snow or ice patches possible near Hikkim; use microspikes and short, steady steps"
      },
      {
        "title": "Day 2: Hikkim to Komic",
        "start": "Hikkim (4,460 m)",
        "end": "Komic monastery (4,520 m)",
        "distanceKm": "3",
        "altitudeM": "4520",
        "elevationGain": "+60 m",
        "trekTime": "1 hour",
        "terrain": "High road",
        "description": "Continue to Komic for monastery tea and return by taxi.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Komic",
        "campStay": "Alpine tents at Komic monastery (4,520 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Komic; move before the cloud build-up",
        "photography": "Wide-angle vantage at Komic: High road",
        "safety": "Watch for AMS symptoms near Komic; descend if headache or nausea persists"
      }
    ],
    "whyChoose": [
      "Distinct Hikkim Post Office Walk scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Walk to world's highest post office village from Langza/Komic."
  },
  "komic": {
    "key": "komic",
    "name": "Komic Monastery Trek",
    "region": "spiti",
    "location": "Komic Monastery Trek trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Komic is often cited as one of the highest motorable villages in the world and is home to the centuries-old Tangyud Monastery, historically a seat of Buddhist learning for the surrounding Pin valley villages. Its remoteness has kept traditional Spitian mud-brick architecture largely intact.",
    "difficulty": "Easy",
    "distanceKm": "5 km",
    "duration": "1 day",
    "highestAltitudeM": "4520",
    "baseCamp": "Komic",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Thang (Komic Monastery) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Thang (Komic Monastery) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Thang (Komic Monastery) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Thang (Komic Monastery) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Thang (Komic Monastery) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Thang (Komic Monastery)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Thang (Komic Monastery) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Thang (Komic Monastery)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Thang (Komic Monastery)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Thang (Komic Monastery)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Thang (Komic Monastery) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Thang (Komic Monastery) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Komic; camp nights near Thang at 4520 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Komic runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Thang at 4520 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Komic Monastery at 4520 m in first light",
      "Tangyud camp at dusk",
      "Thang camp at dusk",
      "Komic approach and roadhead",
      "Thang on the return leg"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Komic Monastery route out of Komic.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 5 km route from Komic—expect 3–5 hours of walking a day up to 4520 m.",
    "ams": "Significant AMS risk at 4520 m near Thang; acclimatise carefully on the way up from Komic, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Gue mummy temple",
      "Kunzum Pass",
      "Key Monastery",
      "Kaza market"
    ],
    "nearbyTreks": [
      "Pin Bhaba Pass",
      "Chandratal Lake",
      "Langza Fossil Walk"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Komic village to Tangyud viewpoint",
        "start": "Komic (4,520 m)",
        "end": "Tangyud ridge (4,580 m)",
        "distanceKm": "3",
        "altitudeM": "4580",
        "elevationGain": "+60 m",
        "trekTime": "1-2 hours",
        "terrain": "Desert ridge",
        "description": "Short ridge walk from Komic with 360 desert peaks.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Tangyud",
        "campStay": "Alpine tents at Tangyud ridge (4,580 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Tangyud; move before the cloud build-up",
        "photography": "Wide-angle vantage at Tangyud: Desert ridge",
        "safety": "Watch for AMS symptoms near Tangyud; descend if headache or nausea persists"
      },
      {
        "title": "Day 2: Komic to Thang Karma plateau",
        "start": "Komic (4,520 m)",
        "end": "Thang Karma (4,500 m)",
        "distanceKm": "2",
        "altitudeM": "4500",
        "elevationGain": "Rolling",
        "trekTime": "1 hour",
        "terrain": "Plateau",
        "description": "Evening stroll on yak pastures above village.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Thang",
        "campStay": "Alpine tents at Thang Karma (4,500 m)",
        "weather": "Thin, cold air at altitude near Thang; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Thang: Plateau",
        "safety": "Strict turnaround time on the approach to Thang—do not push on if weather closes in"
      }
    ],
    "whyChoose": [
      "Distinct Komic Monastery Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "High village monastery circuit above Spiti."
  },
  "spiti-winter": {
    "key": "spiti-winter",
    "name": "Spiti Winter Village Circuit",
    "region": "spiti",
    "location": "Spiti Winter Village Circuit trailheads in cold-desert Spiti, Himachal Pradesh",
    "history": "Winter travel between Spiti's villages once relied entirely on foot and yak trails once the Kunzum and Rohtang roads closed for the season, a tradition that inspired today's popular winter village-circuit treks. Modern routes retrace parts of these old supply paths between Kaza, Langza and Kibber.",
    "difficulty": "Moderate",
    "distanceKm": "40 km",
    "duration": "5-6 days",
    "highestAltitudeM": "4050",
    "baseCamp": "Kaza",
    "nearestRail": "Shimla / Chandigarh",
    "nearestAirport": "Bhuntar or Shimla",
    "roadConnectivity": "Manali-Kaza via Atal Tunnel/Rohtang or Shimla-Kinnaur",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Frozen rivers and sub-zero days across the Kibber (Spiti Winter Village Circuit) corridor"
      },
      {
        "month": "February",
        "note": "Extreme cold persists; Kibber (Spiti Winter Village Circuit) accessible only to winter specialists"
      },
      {
        "month": "March",
        "note": "Access roads to Kibber (Spiti Winter Village Circuit) are still snow-blocked most years"
      },
      {
        "month": "April",
        "note": "Passes reopen slowly; Kibber (Spiti Winter Village Circuit) remains cold, dusty and quiet"
      },
      {
        "month": "May",
        "note": "Manali-Kaza or Shimla-Kaza road traffic resumes; Kibber (Spiti Winter Village Circuit) turns lively"
      },
      {
        "month": "June",
        "note": "Warm, dry days with intense high-altitude UV around Kibber (Spiti Winter Village Circuit)"
      },
      {
        "month": "July",
        "note": "Rain-shadow keeps Kibber (Spiti Winter Village Circuit) largely dry even in peak monsoon"
      },
      {
        "month": "August",
        "note": "Occasional cloudburst risk on the approach road to Kibber (Spiti Winter Village Circuit)"
      },
      {
        "month": "September",
        "note": "Clearest high-desert light of the year over Kibber (Spiti Winter Village Circuit)"
      },
      {
        "month": "October",
        "note": "Cold nights return and crowds thin out around Kibber (Spiti Winter Village Circuit)"
      },
      {
        "month": "November",
        "note": "Winter arrives fast; Kibber (Spiti Winter Village Circuit) sees its first heavy snow"
      },
      {
        "month": "December",
        "note": "Isolated and frozen; Kibber (Spiti Winter Village Circuit) suits only winter expeditions"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Kaza; camp nights near Kaza at 4050 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Kaza runs through sparse juniper and willow scrub in a cold desert landscape, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Kaza at 4050 m. Keep an eye out for blue sheep (bharal), ibex and, rarely, snow leopard on the surrounding slopes.",
    "photographySpots": [
      "Spiti Winter Village Circuit at 4050 m in first light",
      "Langza camp at dusk",
      "Kibber camp at dusk",
      "Kaza camp at dusk",
      "Kaza approach and roadhead"
    ],
    "network": "BSNL works in most Spiti villages; other networks are patchy to absent on the trail",
    "electricity": "Village guesthouses have power; no charging on the high trail",
    "atm": "Only ATM is in Kaza—withdraw cash before heading further",
    "medical": "Kaza has the only proper hospital in the valley; evacuation from remote camps takes hours",
    "camping": "Homestays in villages; tented camps on the higher, remoter stretches",
    "permits": "Inner Line Permit needed for foreign nationals near the border stretches; Indians need only ID for the Spiti Winter Village Circuit route out of Kaza.",
    "forestFees": "Pin Valley National Park entry fee where applicable",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wide-brim hat and extra high-SPF lip balm for cold-desert glare",
      "Extra thermal layer for the sharp night-time temperature drop",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 5-6 days route from Kaza runs 5–7 hours a day up to 4050 m.",
    "ams": "Real AMS risk above 4050 m on the approach to Kaza; build in an acclimatisation stop and know the descent plan back to Kaza.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Key Monastery",
      "Kaza market",
      "Dhankar Monastery cliff",
      "Chicham suspension bridge"
    ],
    "nearbyTreks": [
      "Parang La",
      "Dhankar Lake",
      "Hikkim Post Office Walk"
    ],
    "budget": {
      "budget": "₹5,900–11,100",
      "standard": "₹14,300–23,400",
      "premium": "₹27,300–45,500"
    },
    "days": [
      {
        "title": "Day 1: Kaza to Langza snow walk",
        "start": "Kaza (3,800 m)",
        "end": "Langza (4,400 m)",
        "distanceKm": "12",
        "altitudeM": "4400",
        "elevationGain": "+600 m",
        "trekTime": "5-6 hours",
        "terrain": "Snow road",
        "description": "Winter approach to Langza with microspikes on packed snow.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Langza",
        "campStay": "Alpine tents at Langza (4,400 m)",
        "weather": "Thin, cold air at altitude near Langza; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Langza: Snow road",
        "safety": "Strict turnaround time on the approach to Langza—do not push on if weather closes in"
      },
      {
        "title": "Day 2: Langza to Kibber via Hikkim",
        "start": "Langza (4,400 m)",
        "end": "Kibber (4,270 m)",
        "distanceKm": "10",
        "altitudeM": "4270",
        "elevationGain": "Rolling",
        "trekTime": "4-5 hours",
        "terrain": "Frozen plateau",
        "description": "Cold-desert winter traverse between fossil villages.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Kibber",
        "campStay": "Alpine tents at Kibber (4,270 m)",
        "weather": "Clear early morning skies near Kibber usually cloud over by early afternoon",
        "photography": "Late-afternoon panorama from Kibber: Frozen plateau",
        "safety": "Snow or ice patches possible near Kibber; use microspikes and short, steady steps"
      },
      {
        "title": "Day 3: Kibber to Kaza return",
        "start": "Kibber (4,270 m)",
        "end": "Kaza (3,800 m)",
        "distanceKm": "16",
        "altitudeM": "3800",
        "elevationGain": "Descent",
        "trekTime": "6 hours",
        "terrain": "Road snow",
        "description": "Return to Kaza for heated rooms and rest day.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Kaza",
        "campStay": "Hotel/guesthouse at Kaza (3,800 m)",
        "weather": "Strong daytime sun and very dry air at Kaza; nights fall well below freezing",
        "photography": "Best light at Kaza: Road snow",
        "safety": "Hydrate constantly on the exposed climb to Kaza; UV exposure is severe at this altitude"
      }
    ],
    "whyChoose": [
      "Distinct Spiti Winter Village Circuit scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Winter snow trek linking Kaza-Langza-Hikkim-Kibber when roads permit."
  },
  "kinner-kailash": {
    "key": "kinner-kailash",
    "name": "Kinner Kailash Parikrama",
    "region": "kinnaur",
    "location": "Kinner Kailash Parikrama trailheads in Sutlej gorge Kinnaur, Himachal Pradesh",
    "history": "The Kinner Kailash range is revered as the winter abode of Shiva by Kinnauri communities, and the parikrama around the sacred 79-foot Shivling rock formation has been an annual pilgrimage circuit for centuries. Thousands of pilgrims still undertake the yatra each August, alongside trekkers drawn to the high-altitude circuit.",
    "difficulty": "Challenging",
    "distanceKm": "28 km",
    "duration": "3 days (yatra)",
    "highestAltitudeM": "6050",
    "baseCamp": "Thangi / Tangling",
    "nearestRail": "Shimla / Kalka",
    "nearestAirport": "Shimla / Bhuntar",
    "roadConnectivity": "NH-5 Shimla-Reckong Peo",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snowbound and cold; orchards around Charang (Kinner Kailash Parikrama) are dormant"
      },
      {
        "month": "February",
        "note": "Cold, clear days with frozen streams near Charang (Kinner Kailash Parikrama)"
      },
      {
        "month": "March",
        "note": "Apricot blossom begins around Charang (Kinner Kailash Parikrama) while high ground stays snowy"
      },
      {
        "month": "April",
        "note": "Orchard blossom peaks around Charang (Kinner Kailash Parikrama); road access improving"
      },
      {
        "month": "May",
        "note": "Pleasant valley days; higher trails above Charang (Kinner Kailash Parikrama) still carry snow patches"
      },
      {
        "month": "June",
        "note": "Warm days, dry air and ripening fruit around Charang (Kinner Kailash Parikrama)"
      },
      {
        "month": "July",
        "note": "Rain-shadow effect keeps Charang (Kinner Kailash Parikrama) drier than most of Himachal in monsoon"
      },
      {
        "month": "August",
        "note": "Apple and chilgoza harvest season begins around Charang (Kinner Kailash Parikrama)"
      },
      {
        "month": "September",
        "note": "Clear skies and harvest activity make Charang (Kinner Kailash Parikrama) especially scenic"
      },
      {
        "month": "October",
        "note": "Golden orchard colours and cold nights around Charang (Kinner Kailash Parikrama)"
      },
      {
        "month": "November",
        "note": "Cold sets in fast; higher ground above Charang (Kinner Kailash Parikrama) gets first snow"
      },
      {
        "month": "December",
        "note": "Winter closes higher trails; Charang (Kinner Kailash Parikrama) village itself stays reachable"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Thangi / Tangling; camp nights near Tangling at 6050 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Thangi / Tangling runs through chilgoza pine, apple and apricot orchards along the Baspa/Sutlej belt, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Tangling at 6050 m. Keep an eye out for blue sheep, Himalayan griffon and orchard birdlife in the villages.",
    "photographySpots": [
      "Kinner Kailash Parikrama at 6050 m in first light",
      "Ashwatthama camp at dusk",
      "Charang camp at dusk",
      "Tangling camp at dusk",
      "Thangi / Tangling approach and roadhead"
    ],
    "network": "Coverage in main villages like Sangla, Chitkul and Kalpa; gaps beyond",
    "electricity": "Reliable in villages; none on high camps beyond the last settlement",
    "atm": "ATMs in Reckong Peo and Sangla",
    "medical": "Reckong Peo hospital; smaller village dispensaries for basic aid",
    "camping": "Homestays and orchard camps in villages; tents higher up",
    "permits": "Inner Line Permit required for foreign nationals beyond Kalpa/Chitkul; Indians need only ID for the Kinner Kailash Parikrama route out of Thangi / Tangling.",
    "forestFees": "Minor forest/entry fee on some approach roads",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Dust mask or buff for jeep-road sections",
      "Warm gloves for cold orchard-belt nights",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 3 days (yatra) route from Thangi / Tangling tops out near 6050 m.",
    "ams": "Significant AMS risk at 6050 m near Tangling; acclimatise carefully on the way up from Thangi / Tangling, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chitkul last-village square",
      "Sangla valley viewpoint",
      "Nako Lake",
      "Reckong Peo market"
    ],
    "nearbyTreks": [
      "Rupin Pass",
      "Sangla Valley Riverside",
      "Charang La",
      "Bhaba Valley"
    ],
    "budget": {
      "budget": "₹6,800–12,800",
      "standard": "₹16,500–27,000",
      "premium": "₹31,500–52,500"
    },
    "days": [
      {
        "title": "Day 1: Tangling to Ashwatthama camp",
        "start": "Tangling (2,600 m)",
        "end": "Ashwatthama meadow (3,600 m)",
        "distanceKm": "8",
        "altitudeM": "3600",
        "elevationGain": "+1,000 m",
        "trekTime": "6 hours",
        "terrain": "Sutlej-side climb",
        "description": "Steep first day from Tangling with Kinner Kailash peak glimpses.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Ashwatthama",
        "campStay": "Alpine tents at Ashwatthama meadow (3,600 m)",
        "weather": "Orchard-sheltered warmth by day at Ashwatthama; cold, still nights typical of the valley",
        "photography": "Late-afternoon panorama from Ashwatthama: Sutlej-side climb",
        "safety": "Sun exposure is intense on the open slope to Ashwatthama; cover up even on a cool-feeling day"
      },
      {
        "title": "Day 2: Charang La approach",
        "start": "Ashwatthama (3,600 m)",
        "end": "Charang La base (4,800 m)",
        "distanceKm": "10",
        "altitudeM": "4800",
        "elevationGain": "+1,200 m",
        "trekTime": "7 hours",
        "terrain": "Alpine",
        "description": "Move high toward la with yatra camps.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Charang",
        "campStay": "Alpine tents at Charang La base (4,800 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Charang; move before the cloud build-up",
        "photography": "Best light at Charang: Alpine",
        "safety": "Watch for AMS symptoms near Charang; descend if headache or nausea persists"
      },
      {
        "title": "Day 3: Kinner Kailash viewpoint return",
        "start": "Charang base (4,800 m)",
        "end": "Tangling (2,600 m)",
        "distanceKm": "10",
        "altitudeM": "6050",
        "elevationGain": "Viewpoint day",
        "trekTime": "10 hours",
        "terrain": "High ridge",
        "description": "View sacred peak then long descent to road.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Tangling",
        "campStay": "Alpine tents at Tangling (2,600 m)",
        "weather": "Thin, cold air at altitude near Tangling; expect a big day-night temperature swing",
        "photography": "A classic frame from Tangling: High ridge",
        "safety": "Strict turnaround time on the approach to Tangling—do not push on if weather closes in"
      }
    ],
    "whyChoose": [
      "Distinct Kinner Kailash Parikrama scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Sacred Shivling rock view trek from Tangling toward Kinner Kailash base."
  },
  "charang": {
    "key": "charang",
    "name": "Charang La Trek",
    "region": "kinnaur",
    "location": "Charang La Trek trailheads in Sutlej gorge Kinnaur, Himachal Pradesh",
    "history": "Charang La has long connected the Sutlej-side Kinnauri villages with Charang in the remote Spiti border belt, a route once used by traders moving wool and grain between the two valleys before road access reached either side. It remains one of the least-visited high passes in Kinnaur.",
    "difficulty": "Challenging",
    "distanceKm": "45 km",
    "duration": "6 days",
    "highestAltitudeM": "5240",
    "baseCamp": "Chitkul / Rani Kanda",
    "nearestRail": "Shimla / Kalka",
    "nearestAirport": "Shimla / Bhuntar",
    "roadConnectivity": "NH-5 Shimla-Reckong Peo",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snowbound and cold; orchards around Base (Charang La) are dormant"
      },
      {
        "month": "February",
        "note": "Cold, clear days with frozen streams near Base (Charang La)"
      },
      {
        "month": "March",
        "note": "Apricot blossom begins around Base (Charang La) while high ground stays snowy"
      },
      {
        "month": "April",
        "note": "Orchard blossom peaks around Base (Charang La); road access improving"
      },
      {
        "month": "May",
        "note": "Pleasant valley days; higher trails above Base (Charang La) still carry snow patches"
      },
      {
        "month": "June",
        "note": "Warm days, dry air and ripening fruit around Base (Charang La)"
      },
      {
        "month": "July",
        "note": "Rain-shadow effect keeps Base (Charang La) drier than most of Himachal in monsoon"
      },
      {
        "month": "August",
        "note": "Apple and chilgoza harvest season begins around Base (Charang La)"
      },
      {
        "month": "September",
        "note": "Clear skies and harvest activity make Base (Charang La) especially scenic"
      },
      {
        "month": "October",
        "note": "Golden orchard colours and cold nights around Base (Charang La)"
      },
      {
        "month": "November",
        "note": "Cold sets in fast; higher ground above Base (Charang La) gets first snow"
      },
      {
        "month": "December",
        "note": "Winter closes higher trails; Base (Charang La) village itself stays reachable"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Chitkul / Rani Kanda; camp nights near Lalanti at 5240 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Chitkul / Rani Kanda runs through chilgoza pine, apple and apricot orchards along the Baspa/Sutlej belt, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Lalanti at 5240 m. Keep an eye out for blue sheep, Himalayan griffon and orchard birdlife in the villages.",
    "photographySpots": [
      "Charang La at 5240 m in first light",
      "Rani camp at dusk",
      "Base camp at dusk",
      "Lalanti camp at dusk",
      "Chitkul / Rani Kanda approach and roadhead"
    ],
    "network": "Coverage in main villages like Sangla, Chitkul and Kalpa; gaps beyond",
    "electricity": "Reliable in villages; none on high camps beyond the last settlement",
    "atm": "ATMs in Reckong Peo and Sangla",
    "medical": "Reckong Peo hospital; smaller village dispensaries for basic aid",
    "camping": "Homestays and orchard camps in villages; tents higher up",
    "permits": "Inner Line Permit required for foreign nationals beyond Kalpa/Chitkul; Indians need only ID for the Charang La route out of Chitkul / Rani Kanda.",
    "forestFees": "Minor forest/entry fee on some approach roads",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Dust mask or buff for jeep-road sections",
      "Warm gloves for cold orchard-belt nights",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 6 days route from Chitkul / Rani Kanda tops out near 5240 m.",
    "ams": "Significant AMS risk at 5240 m near Lalanti; acclimatise carefully on the way up from Chitkul / Rani Kanda, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Nako Lake",
      "Reckong Peo market",
      "Suicide Point Kalpa",
      "Baspa river bridges"
    ],
    "nearbyTreks": [
      "Borasu Pass",
      "Chitkul Border Village Walk",
      "Rupin Pass",
      "Sangla Valley Riverside"
    ],
    "budget": {
      "budget": "₹13,500–25,500",
      "standard": "₹33,000–54,000",
      "premium": "₹63,000–1,05,000"
    },
    "days": [
      {
        "title": "Day 1: Chitkul to Rani Kanda",
        "start": "Chitkul (3,450 m)",
        "end": "Rani Kanda (3,800 m)",
        "distanceKm": "8",
        "altitudeM": "3800",
        "elevationGain": "+350 m",
        "trekTime": "4 hours",
        "terrain": "Baspa meadows",
        "description": "Start from last Indian village Chitkul up Baspa valley.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Rani",
        "campStay": "Alpine tents at Rani Kanda (3,800 m)",
        "weather": "Dry, sunny days around Rani with a noticeable chill once the sun dips behind the ridge",
        "photography": "Best light at Rani: Baspa meadows",
        "safety": "Village dogs and narrow lanes near Rani call for a slower pace with pack animals around"
      },
      {
        "title": "Day 2: Rani Kanda to Charang La base",
        "start": "Rani Kanda (3,800 m)",
        "end": "Base camp (4,400 m)",
        "distanceKm": "10",
        "altitudeM": "4400",
        "elevationGain": "+600 m",
        "trekTime": "6 hours",
        "terrain": "Alpine",
        "description": "Camp below Charang La on snow-fed streams.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Base",
        "campStay": "Alpine tents at Base camp (4,400 m)",
        "weather": "Thin, cold air at altitude near Base; expect a big day-night temperature swing",
        "photography": "A classic frame from Base: Alpine",
        "safety": "Strict turnaround time on the approach to Base—do not push on if weather closes in"
      },
      {
        "title": "Day 3: Cross Charang La",
        "start": "Base (4,400 m)",
        "end": "Lalanti camp (4,200 m)",
        "distanceKm": "12",
        "altitudeM": "5240",
        "elevationGain": "Pass",
        "trekTime": "8 hours",
        "terrain": "Pass and scree",
        "description": "Cross Charang La into upper Kinnaur drainages.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Lalanti kitchen tent",
        "campStay": "Alpine tents at Lalanti camp (4,200 m)",
        "weather": "Clear early morning skies near Lalanti usually cloud over by early afternoon",
        "photography": "Golden-hour views near Lalanti: Pass and scree",
        "safety": "Snow or ice patches possible near Lalanti; use microspikes and short, steady steps"
      }
    ],
    "whyChoose": [
      "Distinct Charang La Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "High pass linking Baspa to Tibetan border trails."
  },
  "rupin": {
    "key": "rupin",
    "name": "Rupin Pass Trek",
    "region": "kinnaur",
    "location": "Rupin Pass Trek trailheads in Sutlej gorge Kinnaur, Himachal Pradesh",
    "history": "Rupin Pass has long linked the Dhaula side of Kinnaur with Har Ki Dun in Uttarakhand, a trade and grazing route used by shepherds moving flocks between the two states. Its dramatic hanging villages, waterfalls and the final snow-bridge approach to the pass have made it one of India’s most photographed treks.",
    "difficulty": "Challenging",
    "distanceKm": "52 km",
    "duration": "6-7 days",
    "highestAltitudeM": "4650",
    "baseCamp": "Dhaula / Sewa",
    "nearestRail": "Shimla / Kalka",
    "nearestAirport": "Shimla / Bhuntar",
    "roadConnectivity": "NH-5 Shimla-Reckong Peo",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snowbound and cold; orchards around Suruwas (Rupin Pass) are dormant"
      },
      {
        "month": "February",
        "note": "Cold, clear days with frozen streams near Suruwas (Rupin Pass)"
      },
      {
        "month": "March",
        "note": "Apricot blossom begins around Suruwas (Rupin Pass) while high ground stays snowy"
      },
      {
        "month": "April",
        "note": "Orchard blossom peaks around Suruwas (Rupin Pass); road access improving"
      },
      {
        "month": "May",
        "note": "Pleasant valley days; higher trails above Suruwas (Rupin Pass) still carry snow patches"
      },
      {
        "month": "June",
        "note": "Warm days, dry air and ripening fruit around Suruwas (Rupin Pass)"
      },
      {
        "month": "July",
        "note": "Rain-shadow effect keeps Suruwas (Rupin Pass) drier than most of Himachal in monsoon"
      },
      {
        "month": "August",
        "note": "Apple and chilgoza harvest season begins around Suruwas (Rupin Pass)"
      },
      {
        "month": "September",
        "note": "Clear skies and harvest activity make Suruwas (Rupin Pass) especially scenic"
      },
      {
        "month": "October",
        "note": "Golden orchard colours and cold nights around Suruwas (Rupin Pass)"
      },
      {
        "month": "November",
        "note": "Cold sets in fast; higher ground above Suruwas (Rupin Pass) gets first snow"
      },
      {
        "month": "December",
        "note": "Winter closes higher trails; Suruwas (Rupin Pass) village itself stays reachable"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Dhaula / Sewa; camp nights near Sangla at 4650 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Dhaula / Sewa runs through chilgoza pine, apple and apricot orchards along the Baspa/Sutlej belt, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Sangla at 4650 m. Keep an eye out for blue sheep, Himalayan griffon and orchard birdlife in the villages.",
    "photographySpots": [
      "Rupin Pass at 4650 m in first light",
      "Sewa camp at dusk",
      "Suruwas camp at dusk",
      "Sangla camp at dusk",
      "Dhaula / Sewa approach and roadhead"
    ],
    "network": "Coverage in main villages like Sangla, Chitkul and Kalpa; gaps beyond",
    "electricity": "Reliable in villages; none on high camps beyond the last settlement",
    "atm": "ATMs in Reckong Peo and Sangla",
    "medical": "Reckong Peo hospital; smaller village dispensaries for basic aid",
    "camping": "Homestays and orchard camps in villages; tents higher up",
    "permits": "Inner Line Permit required for foreign nationals beyond Kalpa/Chitkul; Indians need only ID for the Rupin Pass route out of Dhaula / Sewa.",
    "forestFees": "Minor forest/entry fee on some approach roads",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Dust mask or buff for jeep-road sections",
      "Warm gloves for cold orchard-belt nights",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 6-7 days route from Dhaula / Sewa tops out near 4650 m.",
    "ams": "Significant AMS risk at 4650 m near Sangla; acclimatise carefully on the way up from Dhaula / Sewa, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Suicide Point Kalpa",
      "Baspa river bridges",
      "Kalpa apple orchards",
      "Kamru Fort"
    ],
    "nearbyTreks": [
      "Bhaba Valley",
      "Baspa River Trail",
      "Borasu Pass",
      "Chitkul Border Village Walk"
    ],
    "budget": {
      "budget": "₹13,500–25,500",
      "standard": "₹33,000–54,000",
      "premium": "₹63,000–1,05,000"
    },
    "days": [
      {
        "title": "Day 1: Dhaula to Sewa",
        "start": "Dhaula (1,550 m)",
        "end": "Sewa (2,000 m)",
        "distanceKm": "8",
        "altitudeM": "2000",
        "elevationGain": "+450 m",
        "trekTime": "4 hours",
        "terrain": "Lower Rupin forest",
        "description": "Enter Rupin gorge from Uttarakhand side approach road.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Sewa",
        "campStay": "Trekker's camp at Sewa (2,000 m)",
        "weather": "Orchard-sheltered warmth by day at Sewa; cold, still nights typical of the valley",
        "photography": "A classic frame from Sewa: Lower Rupin forest",
        "safety": "Sun exposure is intense on the open slope to Sewa; cover up even on a cool-feeling day"
      },
      {
        "title": "Day 2: Jakha to Suruwas Thach",
        "start": "Jakha (2,700 m)",
        "end": "Suruwas Thach (3,500 m)",
        "distanceKm": "10",
        "altitudeM": "3500",
        "elevationGain": "+800 m",
        "trekTime": "6 hours",
        "terrain": "Waterfall trail",
        "description": "Iconic Rupin waterfall sections and hanging villages.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Suruwas",
        "campStay": "Alpine tents at Suruwas Thach (3,500 m)",
        "weather": "Dry, sunny days around Suruwas with a noticeable chill once the sun dips behind the ridge",
        "photography": "Golden-hour views near Suruwas: Waterfall trail",
        "safety": "Village dogs and narrow lanes near Suruwas call for a slower pace with pack animals around"
      },
      {
        "title": "Day 3: Cross Rupin Pass to Sangla side",
        "start": "Upper Rupin camp (3,900 m)",
        "end": "Sangla meadow camp (3,400 m)",
        "distanceKm": "14",
        "altitudeM": "4650",
        "elevationGain": "Pass day",
        "trekTime": "9 hours",
        "terrain": "Snow pass",
        "description": "Cross Rupin Pass into Baspa valley views.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Sangla",
        "campStay": "Hotel/guesthouse at Sangla meadow camp (3,400 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Sangla; move before the cloud build-up",
        "photography": "Wide-angle vantage at Sangla: Snow pass",
        "safety": "Watch for AMS symptoms near Sangla; descend if headache or nausea persists"
      }
    ],
    "whyChoose": [
      "Distinct Rupin Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Crosses from Uttarakhand Dhaula to Sangla over Rupin Pass."
  },
  "borasu": {
    "key": "borasu",
    "name": "Borasu Pass Trek",
    "region": "kinnaur",
    "location": "Borasu Pass Trek trailheads in Sutlej gorge Kinnaur, Himachal Pradesh",
    "history": "Borasu Pass historically linked the Har Ki Dun valley of Uttarakhand with Chitkul, the last inhabited village in Kinnaur's Baspa valley, and was used by shepherds and traders moving between the two regions long before either side had road access. It remains a rarely crossed, high-commitment route.",
    "difficulty": "Challenging",
    "distanceKm": "60 km",
    "duration": "8 days",
    "highestAltitudeM": "5300",
    "baseCamp": "Har Ki Dun / Sankri side",
    "nearestRail": "Shimla / Kalka",
    "nearestAirport": "Shimla / Bhuntar",
    "roadConnectivity": "NH-5 Shimla-Reckong Peo",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snowbound and cold; orchards around Borasu (Borasu Pass) are dormant"
      },
      {
        "month": "February",
        "note": "Cold, clear days with frozen streams near Borasu (Borasu Pass)"
      },
      {
        "month": "March",
        "note": "Apricot blossom begins around Borasu (Borasu Pass) while high ground stays snowy"
      },
      {
        "month": "April",
        "note": "Orchard blossom peaks around Borasu (Borasu Pass); road access improving"
      },
      {
        "month": "May",
        "note": "Pleasant valley days; higher trails above Borasu (Borasu Pass) still carry snow patches"
      },
      {
        "month": "June",
        "note": "Warm days, dry air and ripening fruit around Borasu (Borasu Pass)"
      },
      {
        "month": "July",
        "note": "Rain-shadow effect keeps Borasu (Borasu Pass) drier than most of Himachal in monsoon"
      },
      {
        "month": "August",
        "note": "Apple and chilgoza harvest season begins around Borasu (Borasu Pass)"
      },
      {
        "month": "September",
        "note": "Clear skies and harvest activity make Borasu (Borasu Pass) especially scenic"
      },
      {
        "month": "October",
        "note": "Golden orchard colours and cold nights around Borasu (Borasu Pass)"
      },
      {
        "month": "November",
        "note": "Cold sets in fast; higher ground above Borasu (Borasu Pass) gets first snow"
      },
      {
        "month": "December",
        "note": "Winter closes higher trails; Borasu (Borasu Pass) village itself stays reachable"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Har Ki Dun / Sankri side; camp nights near Chitkul at 5300 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Har Ki Dun / Sankri side runs through chilgoza pine, apple and apricot orchards along the Baspa/Sutlej belt, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Chitkul at 5300 m. Keep an eye out for blue sheep, Himalayan griffon and orchard birdlife in the villages.",
    "photographySpots": [
      "Borasu Pass at 5300 m in first light",
      "Taluka camp at dusk",
      "Borasu camp at dusk",
      "Chitkul camp at dusk",
      "Har Ki Dun / Sankri side approach and roadhead"
    ],
    "network": "Coverage in main villages like Sangla, Chitkul and Kalpa; gaps beyond",
    "electricity": "Reliable in villages; none on high camps beyond the last settlement",
    "atm": "ATMs in Reckong Peo and Sangla",
    "medical": "Reckong Peo hospital; smaller village dispensaries for basic aid",
    "camping": "Homestays and orchard camps in villages; tents higher up",
    "permits": "Inner Line Permit required for foreign nationals beyond Kalpa/Chitkul; Indians need only ID for the Borasu Pass route out of Har Ki Dun / Sankri side.",
    "forestFees": "Minor forest/entry fee on some approach roads",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Dust mask or buff for jeep-road sections",
      "Warm gloves for cold orchard-belt nights",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 8 days route from Har Ki Dun / Sankri side tops out near 5300 m.",
    "ams": "Significant AMS risk at 5300 m near Chitkul; acclimatise carefully on the way up from Har Ki Dun / Sankri side, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kalpa apple orchards",
      "Kamru Fort",
      "Chitkul last-village square",
      "Sangla valley viewpoint"
    ],
    "nearbyTreks": [
      "Sangla Valley Riverside",
      "Kinner Kailash Parikrama",
      "Bhaba Valley",
      "Baspa River Trail"
    ],
    "budget": {
      "budget": "₹18,000–34,000",
      "standard": "₹44,000–72,000",
      "premium": "₹84,000–1,40,000"
    },
    "days": [
      {
        "title": "Day 1: Sankri to Taluka",
        "start": "Sankri (1,950 m)",
        "end": "Taluka (2,100 m)",
        "distanceKm": "12",
        "altitudeM": "2100",
        "elevationGain": "+150 m",
        "trekTime": "5 hours",
        "terrain": "Forest road walk",
        "description": "Approach from Uttarakhand side toward Borasu.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Taluka",
        "campStay": "Trekker's camp at Taluka (2,100 m)",
        "weather": "Dry, sunny days around Taluka with a noticeable chill once the sun dips behind the ridge",
        "photography": "Golden-hour views near Taluka: Forest road walk",
        "safety": "Village dogs and narrow lanes near Taluka call for a slower pace with pack animals around"
      },
      {
        "title": "Day 2: High camp below Borasu",
        "start": "Ruinsara camp (3,500 m)",
        "end": "Borasu base (4,500 m)",
        "distanceKm": "10",
        "altitudeM": "4500",
        "elevationGain": "+1,000 m",
        "trekTime": "6 hours",
        "terrain": "Alpine",
        "description": "Stage below pass on Kinnaur border ridge.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Borasu",
        "campStay": "Alpine tents at Borasu base (4,500 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Borasu; move before the cloud build-up",
        "photography": "Wide-angle vantage at Borasu: Alpine",
        "safety": "Watch for AMS symptoms near Borasu; descend if headache or nausea persists"
      },
      {
        "title": "Day 3: Cross Borasu to Baspa",
        "start": "Borasu base (4,500 m)",
        "end": "Chitkul approach camp (3,600 m)",
        "distanceKm": "14",
        "altitudeM": "5300",
        "elevationGain": "Pass",
        "trekTime": "10 hours",
        "terrain": "Glacier pass",
        "description": "Cross into Himachal Baspa drainage.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Chitkul",
        "campStay": "Alpine tents at Chitkul approach camp (3,600 m)",
        "weather": "Thin, cold air at altitude near Chitkul; expect a big day-night temperature swing",
        "photography": "Sunrise silhouettes at Chitkul: Glacier pass",
        "safety": "Strict turnaround time on the approach to Chitkul—do not push on if weather closes in"
      }
    ],
    "whyChoose": [
      "Distinct Borasu Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Links Har Ki Dun with Baspa via Borasu Pass."
  },
  "bhaba": {
    "key": "bhaba",
    "name": "Bhaba Valley Trek",
    "region": "kinnaur",
    "location": "Bhaba Valley Trek trailheads in Sutlej gorge Kinnaur, Himachal Pradesh",
    "history": "The Bhaba valley above Kafnoo has been used by Kinnauri shepherds for summer grazing for generations, and its side valley leads directly toward the higher Bhaba Pass crossing into Spiti. As a standalone route it offers an easier, forest-and-meadow introduction to the same valley without the full pass crossing.",
    "difficulty": "Moderate",
    "distanceKm": "30 km",
    "duration": "4 days",
    "highestAltitudeM": "3200",
    "baseCamp": "Kafnoo",
    "nearestRail": "Shimla / Kalka",
    "nearestAirport": "Shimla / Bhuntar",
    "roadConnectivity": "NH-5 Shimla-Reckong Peo",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snowbound and cold; orchards around Mulling (Bhaba Valley) are dormant"
      },
      {
        "month": "February",
        "note": "Cold, clear days with frozen streams near Mulling (Bhaba Valley)"
      },
      {
        "month": "March",
        "note": "Apricot blossom begins around Mulling (Bhaba Valley) while high ground stays snowy"
      },
      {
        "month": "April",
        "note": "Orchard blossom peaks around Mulling (Bhaba Valley); road access improving"
      },
      {
        "month": "May",
        "note": "Pleasant valley days; higher trails above Mulling (Bhaba Valley) still carry snow patches"
      },
      {
        "month": "June",
        "note": "Warm days, dry air and ripening fruit around Mulling (Bhaba Valley)"
      },
      {
        "month": "July",
        "note": "Rain-shadow effect keeps Mulling (Bhaba Valley) drier than most of Himachal in monsoon"
      },
      {
        "month": "August",
        "note": "Apple and chilgoza harvest season begins around Mulling (Bhaba Valley)"
      },
      {
        "month": "September",
        "note": "Clear skies and harvest activity make Mulling (Bhaba Valley) especially scenic"
      },
      {
        "month": "October",
        "note": "Golden orchard colours and cold nights around Mulling (Bhaba Valley)"
      },
      {
        "month": "November",
        "note": "Cold sets in fast; higher ground above Mulling (Bhaba Valley) gets first snow"
      },
      {
        "month": "December",
        "note": "Winter closes higher trails; Mulling (Bhaba Valley) village itself stays reachable"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Kafnoo; camp nights near Kafnoo at 3200 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Kafnoo runs through chilgoza pine, apple and apricot orchards along the Baspa/Sutlej belt, thinning into open alpine meadow and scrub above the tree line on the climb toward Kafnoo at 3200 m. Keep an eye out for blue sheep, Himalayan griffon and orchard birdlife in the villages.",
    "photographySpots": [
      "Bhaba Valley at 3200 m in first light",
      "Katgaon camp at dusk",
      "Mulling camp at dusk",
      "Kafnoo camp at dusk",
      "Kafnoo approach and roadhead"
    ],
    "network": "Coverage in main villages like Sangla, Chitkul and Kalpa; gaps beyond",
    "electricity": "Reliable in villages; none on high camps beyond the last settlement",
    "atm": "ATMs in Reckong Peo and Sangla",
    "medical": "Reckong Peo hospital; smaller village dispensaries for basic aid",
    "camping": "Homestays and orchard camps in villages; tents higher up",
    "permits": "Inner Line Permit required for foreign nationals beyond Kalpa/Chitkul; Indians need only ID for the Bhaba Valley route out of Kafnoo.",
    "forestFees": "Minor forest/entry fee on some approach roads",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Dust mask or buff for jeep-road sections",
      "Warm gloves for cold orchard-belt nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 4 days route from Kafnoo runs 5–7 hours a day up to 3200 m.",
    "ams": "Mild AMS risk near 3200 m around Kafnoo; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chitkul last-village square",
      "Sangla valley viewpoint",
      "Nako Lake",
      "Reckong Peo market"
    ],
    "nearbyTreks": [
      "Chitkul Border Village Walk",
      "Charang La",
      "Sangla Valley Riverside",
      "Kinner Kailash Parikrama"
    ],
    "budget": {
      "budget": "₹4,700–8,800",
      "standard": "₹11,400–18,700",
      "premium": "₹21,800–36,400"
    },
    "days": [
      {
        "title": "Day 1: Kafnoo to Katgaon",
        "start": "Kafnoo (2,400 m)",
        "end": "Katgaon (2,800 m)",
        "distanceKm": "8",
        "altitudeM": "2800",
        "elevationGain": "+400 m",
        "trekTime": "4 hours",
        "terrain": "Cedar forest",
        "description": "Walk upstream Bhaba without committing to pass.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Katgaon",
        "campStay": "Trekker's camp at Katgaon (2,800 m)",
        "weather": "Orchard-sheltered warmth by day at Katgaon; cold, still nights typical of the valley",
        "photography": "Wide-angle vantage at Katgaon: Cedar forest",
        "safety": "Sun exposure is intense on the open slope to Katgaon; cover up even on a cool-feeling day"
      },
      {
        "title": "Day 2: Katgaon to Mulling",
        "start": "Katgaon (2,800 m)",
        "end": "Mulling (3,200 m)",
        "distanceKm": "8",
        "altitudeM": "3200",
        "elevationGain": "+400 m",
        "trekTime": "4 hours",
        "terrain": "Meadow",
        "description": "Reach Mulling meadows and return loop.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Mulling kitchen tent",
        "campStay": "Alpine tents at Mulling (3,200 m)",
        "weather": "Dry, sunny days around Mulling with a noticeable chill once the sun dips behind the ridge",
        "photography": "Sunrise silhouettes at Mulling: Meadow",
        "safety": "Village dogs and narrow lanes near Mulling call for a slower pace with pack animals around"
      },
      {
        "title": "Day 3: Mulling to Kafnoo exit",
        "start": "Mulling (3,200 m)",
        "end": "Kafnoo (2,400 m)",
        "distanceKm": "8",
        "altitudeM": "2400",
        "elevationGain": "Descent",
        "trekTime": "4 hours",
        "terrain": "Forest descent",
        "description": "Exit same valley with evening drive to Wangtu.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Kafnoo",
        "campStay": "Trekker's camp at Kafnoo (2,400 m)",
        "weather": "Orchard-sheltered warmth by day at Kafnoo; cold, still nights typical of the valley",
        "photography": "Late-afternoon panorama from Kafnoo: Forest descent",
        "safety": "Sun exposure is intense on the open slope to Kafnoo; cover up even on a cool-feeling day"
      }
    ],
    "whyChoose": [
      "Distinct Bhaba Valley Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Shorter Bhaba valley exploration without full Pin Bhaba crossing."
  },
  "sangla": {
    "key": "sangla",
    "name": "Sangla Valley Riverside Trek",
    "region": "kinnaur",
    "location": "Sangla Valley Riverside Trek trailheads in Sutlej gorge Kinnaur, Himachal Pradesh",
    "history": "Sangla town and its Kamru fort have long been considered the traditional seat of Kinnaur's local royal family and deities, with the fort's wooden tower temple still central to village religious life. The riverside walks along the Baspa have been used by villagers for generations to move between Sangla, Kamru and Rakcham.",
    "difficulty": "Easy",
    "distanceKm": "10 km",
    "duration": "2 days",
    "highestAltitudeM": "2800",
    "baseCamp": "Sangla town",
    "nearestRail": "Shimla / Kalka",
    "nearestAirport": "Shimla / Bhuntar",
    "roadConnectivity": "NH-5 Shimla-Reckong Peo",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snowbound and cold; orchards around Rakcham (Sangla Valley Riverside) are dormant"
      },
      {
        "month": "February",
        "note": "Cold, clear days with frozen streams near Rakcham (Sangla Valley Riverside)"
      },
      {
        "month": "March",
        "note": "Apricot blossom begins around Rakcham (Sangla Valley Riverside) while high ground stays snowy"
      },
      {
        "month": "April",
        "note": "Orchard blossom peaks around Rakcham (Sangla Valley Riverside); road access improving"
      },
      {
        "month": "May",
        "note": "Pleasant valley days; higher trails above Rakcham (Sangla Valley Riverside) still carry snow patches"
      },
      {
        "month": "June",
        "note": "Warm days, dry air and ripening fruit around Rakcham (Sangla Valley Riverside)"
      },
      {
        "month": "July",
        "note": "Rain-shadow effect keeps Rakcham (Sangla Valley Riverside) drier than most of Himachal in monsoon"
      },
      {
        "month": "August",
        "note": "Apple and chilgoza harvest season begins around Rakcham (Sangla Valley Riverside)"
      },
      {
        "month": "September",
        "note": "Clear skies and harvest activity make Rakcham (Sangla Valley Riverside) especially scenic"
      },
      {
        "month": "October",
        "note": "Golden orchard colours and cold nights around Rakcham (Sangla Valley Riverside)"
      },
      {
        "month": "November",
        "note": "Cold sets in fast; higher ground above Rakcham (Sangla Valley Riverside) gets first snow"
      },
      {
        "month": "December",
        "note": "Winter closes higher trails; Rakcham (Sangla Valley Riverside) village itself stays reachable"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Sangla town; camp nights near Rakcham at 2800 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Sangla town runs through chilgoza pine, apple and apricot orchards along the Baspa/Sutlej belt, thinning into shaded forest cover for most of the route on the climb toward Rakcham at 2800 m. Keep an eye out for blue sheep, Himalayan griffon and orchard birdlife in the villages.",
    "photographySpots": [
      "Sangla Valley Riverside at 2800 m in first light",
      "Kamru camp at dusk",
      "Rakcham camp at dusk",
      "Sangla town approach and roadhead",
      "Rakcham on the return leg"
    ],
    "network": "Coverage in main villages like Sangla, Chitkul and Kalpa; gaps beyond",
    "electricity": "Reliable in villages; none on high camps beyond the last settlement",
    "atm": "ATMs in Reckong Peo and Sangla",
    "medical": "Reckong Peo hospital; smaller village dispensaries for basic aid",
    "camping": "Homestays and orchard camps in villages; tents higher up",
    "permits": "Inner Line Permit required for foreign nationals beyond Kalpa/Chitkul; Indians need only ID for the Sangla Valley Riverside route out of Sangla town.",
    "forestFees": "Minor forest/entry fee on some approach roads",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Dust mask or buff for jeep-road sections",
      "Warm gloves for cold orchard-belt nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 10 km route from Sangla town—expect 3–5 hours of walking a day up to 2800 m.",
    "ams": "Low AMS risk at 2800 m near Rakcham; hydrate well and ascend steadily from Sangla town.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Nako Lake",
      "Reckong Peo market",
      "Suicide Point Kalpa",
      "Baspa river bridges"
    ],
    "nearbyTreks": [
      "Baspa River Trail",
      "Rupin Pass",
      "Chitkul Border Village Walk",
      "Charang La"
    ],
    "budget": {
      "budget": "₹1,800–3,400",
      "standard": "₹4,400–7,200",
      "premium": "₹8,400–14,000"
    },
    "days": [
      {
        "title": "Day 1: Sangla to Kamru fort",
        "start": "Sangla (2,600 m)",
        "end": "Kamru fort (2,800 m)",
        "distanceKm": "5",
        "altitudeM": "2800",
        "elevationGain": "+200 m",
        "trekTime": "2-3 hours",
        "terrain": "Orchard paths",
        "description": "Cultural walk to Kamru fort with Baspa river views.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Kamru",
        "campStay": "Trekker's camp at Kamru fort (2,800 m)",
        "weather": "Dry, sunny days around Kamru with a noticeable chill once the sun dips behind the ridge",
        "photography": "Sunrise silhouettes at Kamru: Orchard paths",
        "safety": "Village dogs and narrow lanes near Kamru call for a slower pace with pack animals around"
      },
      {
        "title": "Day 2: Sangla to Rakcham",
        "start": "Sangla (2,600 m)",
        "end": "Rakcham village (2,900 m)",
        "distanceKm": "8",
        "altitudeM": "2900",
        "elevationGain": "+300 m",
        "trekTime": "4 hours",
        "terrain": "Riverside",
        "description": "Down-valley walk toward Rakcham apple country.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Rakcham",
        "campStay": "Homestay in the village at Rakcham village (2,900 m)",
        "weather": "Orchard-sheltered warmth by day at Rakcham; cold, still nights typical of the valley",
        "photography": "Late-afternoon panorama from Rakcham: Riverside",
        "safety": "Sun exposure is intense on the open slope to Rakcham; cover up even on a cool-feeling day"
      }
    ],
    "whyChoose": [
      "Distinct Sangla Valley Riverside Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Gentle walks around Sangla and Kamru fort belt."
  },
  "chitkul": {
    "key": "chitkul",
    "name": "Chitkul Border Village Walk",
    "region": "kinnaur",
    "location": "Chitkul Border Village Walk trailheads in Sutlej gorge Kinnaur, Himachal Pradesh",
    "history": "Chitkul is officially the last inhabited village before the Tibet border along the Baspa valley, and beyond it lay a centuries-old trade route once used to move goods toward the high Himalayan passes. Its wooden temple to the local deity Mathi still anchors village life today.",
    "difficulty": "Easy",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "3450",
    "baseCamp": "Chitkul",
    "nearestRail": "Shimla / Kalka",
    "nearestAirport": "Shimla / Bhuntar",
    "roadConnectivity": "NH-5 Shimla-Reckong Peo",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snowbound and cold; orchards around Baspa (Chitkul Border Village Walk) are dormant"
      },
      {
        "month": "February",
        "note": "Cold, clear days with frozen streams near Baspa (Chitkul Border Village Walk)"
      },
      {
        "month": "March",
        "note": "Apricot blossom begins around Baspa (Chitkul Border Village Walk) while high ground stays snowy"
      },
      {
        "month": "April",
        "note": "Orchard blossom peaks around Baspa (Chitkul Border Village Walk); road access improving"
      },
      {
        "month": "May",
        "note": "Pleasant valley days; higher trails above Baspa (Chitkul Border Village Walk) still carry snow patches"
      },
      {
        "month": "June",
        "note": "Warm days, dry air and ripening fruit around Baspa (Chitkul Border Village Walk)"
      },
      {
        "month": "July",
        "note": "Rain-shadow effect keeps Baspa (Chitkul Border Village Walk) drier than most of Himachal in monsoon"
      },
      {
        "month": "August",
        "note": "Apple and chilgoza harvest season begins around Baspa (Chitkul Border Village Walk)"
      },
      {
        "month": "September",
        "note": "Clear skies and harvest activity make Baspa (Chitkul Border Village Walk) especially scenic"
      },
      {
        "month": "October",
        "note": "Golden orchard colours and cold nights around Baspa (Chitkul Border Village Walk)"
      },
      {
        "month": "November",
        "note": "Cold sets in fast; higher ground above Baspa (Chitkul Border Village Walk) gets first snow"
      },
      {
        "month": "December",
        "note": "Winter closes higher trails; Baspa (Chitkul Border Village Walk) village itself stays reachable"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Chitkul; camp nights near Baspa at 3450 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Chitkul runs through chilgoza pine, apple and apricot orchards along the Baspa/Sutlej belt, thinning into open alpine meadow and scrub above the tree line on the climb toward Baspa at 3450 m. Keep an eye out for blue sheep, Himalayan griffon and orchard birdlife in the villages.",
    "photographySpots": [
      "Chitkul Border Village Walk at 3450 m in first light",
      "Mathi camp at dusk",
      "Baspa camp at dusk",
      "Chitkul approach and roadhead",
      "Baspa on the return leg"
    ],
    "network": "Coverage in main villages like Sangla, Chitkul and Kalpa; gaps beyond",
    "electricity": "Reliable in villages; none on high camps beyond the last settlement",
    "atm": "ATMs in Reckong Peo and Sangla",
    "medical": "Reckong Peo hospital; smaller village dispensaries for basic aid",
    "camping": "Homestays and orchard camps in villages; tents higher up",
    "permits": "Inner Line Permit required for foreign nationals beyond Kalpa/Chitkul; Indians need only ID for the Chitkul Border Village Walk route out of Chitkul.",
    "forestFees": "Minor forest/entry fee on some approach roads",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Dust mask or buff for jeep-road sections",
      "Warm gloves for cold orchard-belt nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 6 km route from Chitkul—expect 3–5 hours of walking a day up to 3450 m.",
    "ams": "Mild AMS risk near 3450 m around Baspa; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Suicide Point Kalpa",
      "Baspa river bridges",
      "Kalpa apple orchards",
      "Kamru Fort"
    ],
    "nearbyTreks": [
      "Kinner Kailash Parikrama",
      "Borasu Pass",
      "Baspa River Trail",
      "Rupin Pass"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Chitkul to Mathi temple ridge",
        "start": "Chitkul (3,450 m)",
        "end": "Mathi ridge (3,500 m)",
        "distanceKm": "3",
        "altitudeM": "3500",
        "elevationGain": "+50 m",
        "trekTime": "1-2 hours",
        "terrain": "Baspa meadow",
        "description": "Short ridge behind Chitkul with peak views.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Mathi",
        "campStay": "Alpine tents at Mathi ridge (3,500 m)",
        "weather": "Orchard-sheltered warmth by day at Mathi; cold, still nights typical of the valley",
        "photography": "Late-afternoon panorama from Mathi: Baspa meadow",
        "safety": "Sun exposure is intense on the open slope to Mathi; cover up even on a cool-feeling day"
      },
      {
        "title": "Day 2: Chitkul riverside to ITBP checkpoint viewpoint",
        "start": "Chitkul (3,450 m)",
        "end": "Baspa bend (3,420 m)",
        "distanceKm": "3",
        "altitudeM": "3420",
        "elevationGain": "Flat",
        "trekTime": "1 hour",
        "terrain": "River trail",
        "description": "Easy riverside stroll; respect border regulations.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Baspa",
        "campStay": "Alpine tents at Baspa bend (3,420 m)",
        "weather": "Dry, sunny days around Baspa with a noticeable chill once the sun dips behind the ridge",
        "photography": "Best light at Baspa: River trail",
        "safety": "Village dogs and narrow lanes near Baspa call for a slower pace with pack animals around"
      }
    ],
    "whyChoose": [
      "Distinct Chitkul Border Village Walk scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Walks around last inhabited village before Tibet border."
  },
  "baspa": {
    "key": "baspa",
    "name": "Baspa River Trail",
    "region": "kinnaur",
    "location": "Baspa River Trail trailheads in Sutlej gorge Kinnaur, Himachal Pradesh",
    "history": "The Baspa river trail between Rakcham, Batseri and Chitkul follows the same path Kinnauri villagers have used for generations to move between orchard settlements along the valley floor. Willow and apple groves lining the trail reflect decades of careful terracing by local farmers.",
    "difficulty": "Easy",
    "distanceKm": "12 km",
    "duration": "2 days",
    "highestAltitudeM": "3000",
    "baseCamp": "Rakcham",
    "nearestRail": "Shimla / Kalka",
    "nearestAirport": "Shimla / Bhuntar",
    "roadConnectivity": "NH-5 Shimla-Reckong Peo",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snowbound and cold; orchards around Chitkul (Baspa River Trail) are dormant"
      },
      {
        "month": "February",
        "note": "Cold, clear days with frozen streams near Chitkul (Baspa River Trail)"
      },
      {
        "month": "March",
        "note": "Apricot blossom begins around Chitkul (Baspa River Trail) while high ground stays snowy"
      },
      {
        "month": "April",
        "note": "Orchard blossom peaks around Chitkul (Baspa River Trail); road access improving"
      },
      {
        "month": "May",
        "note": "Pleasant valley days; higher trails above Chitkul (Baspa River Trail) still carry snow patches"
      },
      {
        "month": "June",
        "note": "Warm days, dry air and ripening fruit around Chitkul (Baspa River Trail)"
      },
      {
        "month": "July",
        "note": "Rain-shadow effect keeps Chitkul (Baspa River Trail) drier than most of Himachal in monsoon"
      },
      {
        "month": "August",
        "note": "Apple and chilgoza harvest season begins around Chitkul (Baspa River Trail)"
      },
      {
        "month": "September",
        "note": "Clear skies and harvest activity make Chitkul (Baspa River Trail) especially scenic"
      },
      {
        "month": "October",
        "note": "Golden orchard colours and cold nights around Chitkul (Baspa River Trail)"
      },
      {
        "month": "November",
        "note": "Cold sets in fast; higher ground above Chitkul (Baspa River Trail) gets first snow"
      },
      {
        "month": "December",
        "note": "Winter closes higher trails; Chitkul (Baspa River Trail) village itself stays reachable"
      }
    ],
    "temperature": "Day 15–24°C in strong sun on the trail from Rakcham; camp nights near Chitkul at 3000 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Rakcham runs through chilgoza pine, apple and apricot orchards along the Baspa/Sutlej belt, thinning into shaded forest cover for most of the route on the climb toward Chitkul at 3000 m. Keep an eye out for blue sheep, Himalayan griffon and orchard birdlife in the villages.",
    "photographySpots": [
      "Baspa River Trail at 3000 m in first light",
      "Batseri camp at dusk",
      "Chitkul camp at dusk",
      "Rakcham approach and roadhead",
      "Chitkul on the return leg"
    ],
    "network": "Coverage in main villages like Sangla, Chitkul and Kalpa; gaps beyond",
    "electricity": "Reliable in villages; none on high camps beyond the last settlement",
    "atm": "ATMs in Reckong Peo and Sangla",
    "medical": "Reckong Peo hospital; smaller village dispensaries for basic aid",
    "camping": "Homestays and orchard camps in villages; tents higher up",
    "permits": "Inner Line Permit required for foreign nationals beyond Kalpa/Chitkul; Indians need only ID for the Baspa River Trail route out of Rakcham.",
    "forestFees": "Minor forest/entry fee on some approach roads",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Dust mask or buff for jeep-road sections",
      "Warm gloves for cold orchard-belt nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 12 km route from Rakcham—expect 3–5 hours of walking a day up to 3000 m.",
    "ams": "Mild AMS risk near 3000 m around Chitkul; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Inner Line Permit copies and extra passport photos (foreign nationals)"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kalpa apple orchards",
      "Kamru Fort",
      "Chitkul last-village square",
      "Sangla valley viewpoint"
    ],
    "nearbyTreks": [
      "Charang La",
      "Bhaba Valley",
      "Kinner Kailash Parikrama",
      "Borasu Pass"
    ],
    "budget": {
      "budget": "₹1,800–3,400",
      "standard": "₹4,400–7,200",
      "premium": "₹8,400–14,000"
    },
    "days": [
      {
        "title": "Day 1: Rakcham to Batseri",
        "start": "Rakcham (2,900 m)",
        "end": "Batseri village (2,950 m)",
        "distanceKm": "6",
        "altitudeM": "2950",
        "elevationGain": "Gentle",
        "trekTime": "3 hours",
        "terrain": "Village lanes",
        "description": "Wood-carved temple villages along Baspa.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Batseri kitchen tent",
        "campStay": "Homestay in the village at Batseri village (2,950 m)",
        "weather": "Dry, sunny days around Batseri with a noticeable chill once the sun dips behind the ridge",
        "photography": "Best light at Batseri: Village lanes",
        "safety": "Village dogs and narrow lanes near Batseri call for a slower pace with pack animals around"
      },
      {
        "title": "Day 2: Batseri to Chitkul",
        "start": "Batseri (2,950 m)",
        "end": "Chitkul (3,450 m)",
        "distanceKm": "6",
        "altitudeM": "3450",
        "elevationGain": "+500 m",
        "trekTime": "3 hours",
        "terrain": "River ascent",
        "description": "Finish at Chitkul for border-village atmosphere.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Chitkul",
        "campStay": "Alpine tents at Chitkul (3,450 m)",
        "weather": "Orchard-sheltered warmth by day at Chitkul; cold, still nights typical of the valley",
        "photography": "A classic frame from Chitkul: River ascent",
        "safety": "Sun exposure is intense on the open slope to Chitkul; cover up even on a cool-feeling day"
      }
    ],
    "whyChoose": [
      "Distinct Baspa River Trail scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Low Baspa valley trail between Rakcham and Chitkul."
  },
  "hatu": {
    "key": "hatu",
    "name": "Hatu Peak Trek",
    "region": "shimla",
    "location": "Hatu Peak Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Hatu Peak above Narkanda is topped by an old temple to Hatu Mata, said in local legend to be linked to the Mahabharata-era Pandavas, and has long been a pilgrimage stop for villagers from the surrounding apple belt. Its position above Narkanda made it a natural viewpoint for travellers on the old Hindustan-Tibet Road.",
    "difficulty": "Moderate",
    "distanceKm": "8 km",
    "duration": "1 day",
    "highestAltitudeM": "3400",
    "baseCamp": "Narkanda",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Jor (Hatu Peak); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Jor (Hatu Peak); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Jor (Hatu Peak) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Jor (Hatu Peak)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Jor (Hatu Peak)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Jor (Hatu Peak)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Jor (Hatu Peak) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Jor (Hatu Peak) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Jor (Hatu Peak)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Jor (Hatu Peak)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Jor (Hatu Peak) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Jor (Hatu Peak); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Narkanda; camp nights near Jor at 3400 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Narkanda runs through deodar, oak and moist temperate forest, thinning into open alpine meadow and scrub above the tree line on the climb toward Jor at 3400 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Hatu Peak at 3400 m in first light",
      "Hatu camp at dusk",
      "Jor camp at dusk",
      "Narkanda approach and roadhead",
      "Jor on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Hatu Peak route out of Narkanda.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 1 day route from Narkanda runs 5–7 hours a day up to 3400 m.",
    "ams": "Mild AMS risk near 3400 m around Jor; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chail Palace",
      "Kufri viewpoint",
      "Tattapani hot springs",
      "Naldehra golf greens"
    ],
    "nearbyTreks": [
      "Karol Tibba",
      "Jalori Pass to Serolsar Circuit",
      "Shikari Devi"
    ],
    "budget": {
      "budget": "₹1,200–2,200",
      "standard": "₹2,900–4,700",
      "premium": "₹5,500–9,100"
    },
    "days": [
      {
        "title": "Day 1: Narkanda to Hatu Peak",
        "start": "Narkanda (2,700 m)",
        "end": "Hatu Peak (3,400 m)",
        "distanceKm": "4",
        "altitudeM": "3400",
        "elevationGain": "+700 m",
        "trekTime": "3-4 hours",
        "terrain": "Mixed forest ridge",
        "description": "Climb to Hatu Mata temple with Kinnaur and Shrikhand views on clear days.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Hatu",
        "campStay": "Alpine tents at Hatu Peak (3,400 m)",
        "weather": "Mist often lingers over Hatu until mid-morning before skies clear",
        "photography": "A classic frame from Hatu: Mixed forest ridge",
        "safety": "Trail can be busy with day visitors near Hatu; keep right and let faster groups pass"
      },
      {
        "title": "Day 2: Hatu to Jor Bagh loop",
        "start": "Hatu Peak (3,400 m)",
        "end": "Jor Bagh meadow (3,200 m)",
        "distanceKm": "4",
        "altitudeM": "3200",
        "elevationGain": "Descent loop",
        "trekTime": "2 hours",
        "terrain": "Meadow",
        "description": "Optional loop through Jor Bagh before returning to Narkanda.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Jor",
        "campStay": "Alpine tents at Jor Bagh meadow (3,200 m)",
        "weather": "Comfortable daytime temperatures near Jor; a light jacket suffices most evenings",
        "photography": "Golden-hour views near Jor: Meadow",
        "safety": "Lightning risk on the open ridge near Jor during afternoon cloud build-up—start early"
      }
    ],
    "whyChoose": [
      "Distinct Hatu Peak Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Narkanda to Hatu Peak temple ridge above apple belt."
  },
  "shali-tibba": {
    "key": "shali-tibba",
    "name": "Shali Tibba Trek",
    "region": "shimla",
    "location": "Shali Tibba Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Shali Tibba is topped by an old temple to a local goddess still visited by villagers from Khatnol and nearby settlements, and its ridge has long served as a grazing and lookout point above the Sutlej valley. The peak's relative isolation has kept the surrounding forest largely undisturbed.",
    "difficulty": "Moderate",
    "distanceKm": "16 km",
    "duration": "2 days",
    "highestAltitudeM": "2873",
    "baseCamp": "Khatnol",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Khatnol (Shali Tibba); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Khatnol (Shali Tibba); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Khatnol (Shali Tibba) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Khatnol (Shali Tibba)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Khatnol (Shali Tibba)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Khatnol (Shali Tibba)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Khatnol (Shali Tibba) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Khatnol (Shali Tibba) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Khatnol (Shali Tibba)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Khatnol (Shali Tibba)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Khatnol (Shali Tibba) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Khatnol (Shali Tibba); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Khatnol; camp nights near Khatnol at 2873 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Khatnol runs through deodar, oak and moist temperate forest, thinning into shaded forest cover for most of the route on the climb toward Khatnol at 2873 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Shali Tibba at 2873 m in first light",
      "Shali camp at dusk",
      "Khatnol camp at dusk",
      "Khatnol approach and roadhead",
      "Khatnol on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Shali Tibba route out of Khatnol.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Khatnol runs 5–7 hours a day up to 2873 m.",
    "ams": "Low AMS risk at 2873 m near Khatnol; hydrate well and ascend steadily from Khatnol.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Tattapani hot springs",
      "Naldehra golf greens",
      "Christ Church Shimla",
      "Narkanda apple belt"
    ],
    "nearbyTreks": [
      "Jalori Pass",
      "Churdhar Peak",
      "Kamru Nag Lake"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Khatnol to crest camp",
        "start": "Khatnol (1,900 m)",
        "end": "Shali ridge camp (2,600 m)",
        "distanceKm": "8",
        "altitudeM": "2600",
        "elevationGain": "+700 m",
        "trekTime": "5 hours",
        "terrain": "Pine forest",
        "description": "Steep forest climb to ridge camp below Shali Tibba peak.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Shali",
        "campStay": "Trekker's camp at Shali ridge camp (2,600 m)",
        "weather": "Comfortable daytime temperatures near Shali; a light jacket suffices most evenings",
        "photography": "Golden-hour views near Shali: Pine forest",
        "safety": "Lightning risk on the open ridge near Shali during afternoon cloud build-up—start early"
      },
      {
        "title": "Day 2: Summit Shali Tibba and descend",
        "start": "Camp (2,600 m)",
        "end": "Khatnol (1,900 m)",
        "distanceKm": "8",
        "altitudeM": "2873",
        "elevationGain": "+273 m then down",
        "trekTime": "6 hours",
        "terrain": "Open ridge",
        "description": "Summit day with Shimla hills panorama then descent.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Khatnol",
        "campStay": "Trekker's camp at Khatnol (1,900 m)",
        "weather": "Mist often lingers over Khatnol until mid-morning before skies clear",
        "photography": "Wide-angle vantage at Khatnol: Open ridge",
        "safety": "Trail can be busy with day visitors near Khatnol; keep right and let faster groups pass"
      }
    ],
    "whyChoose": [
      "Distinct Shali Tibba Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Khatnol climb to Shali Tibba summit above Mashobra belt."
  },
  "karol-tibba": {
    "key": "karol-tibba",
    "name": "Karol Tibba Trek",
    "region": "shimla",
    "location": "Karol Tibba Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Karol Tibba near Chail has been a short forest walk for generations of villagers moving between Kandaghat and the old Chail royal hunting grounds, once used by the Patiala royal family who built their summer palace nearby. It remains one of the easiest short hikes in the Shimla hills.",
    "difficulty": "Easy",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "2240",
    "baseCamp": "Chail / Kandaghat",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Chail (Karol Tibba); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Chail (Karol Tibba); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Chail (Karol Tibba) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Chail (Karol Tibba)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Chail (Karol Tibba)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Chail (Karol Tibba)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Chail (Karol Tibba) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Chail (Karol Tibba) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Chail (Karol Tibba)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Chail (Karol Tibba)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Chail (Karol Tibba) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Chail (Karol Tibba); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Chail / Kandaghat; camp nights near Chail at 2240 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Chail / Kandaghat runs through deodar, oak and moist temperate forest, thinning into shaded forest cover for most of the route on the climb toward Chail at 2240 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Karol Tibba at 2240 m in first light",
      "Karol camp at dusk",
      "Chail camp at dusk",
      "Chail / Kandaghat approach and roadhead",
      "Chail on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Karol Tibba route out of Chail / Kandaghat.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 6 km route from Chail / Kandaghat—expect 3–5 hours of walking a day up to 2240 m.",
    "ams": "Low AMS risk at 2240 m near Chail; hydrate well and ascend steadily from Chail / Kandaghat.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Christ Church Shimla",
      "Narkanda apple belt",
      "The Ridge and Mall Road",
      "Jakhoo Temple"
    ],
    "nearbyTreks": [
      "Serolsar Lake",
      "Kuppar Bugyal",
      "Hatu Peak"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Kandaghat to Karol Tibba",
        "start": "Kandaghat (1,800 m)",
        "end": "Karol Tibba (2,240 m)",
        "distanceKm": "3",
        "altitudeM": "2240",
        "elevationGain": "+440 m",
        "trekTime": "2-3 hours",
        "terrain": "Pine trail",
        "description": "Short summit walk popular with Solan-Chail weekenders.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Karol",
        "campStay": "Trekker's camp at Karol Tibba (2,240 m)",
        "weather": "Mist often lingers over Karol until mid-morning before skies clear",
        "photography": "Wide-angle vantage at Karol: Pine trail",
        "safety": "Trail can be busy with day visitors near Karol; keep right and let faster groups pass"
      },
      {
        "title": "Day 2: Karol Tibba to Chail extension",
        "start": "Karol Tibba (2,240 m)",
        "end": "Chail (2,250 m)",
        "distanceKm": "5",
        "altitudeM": "2250",
        "elevationGain": "Rolling",
        "trekTime": "2 hours",
        "terrain": "Roadside forest",
        "description": "Optional link toward Chail palace grounds.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Chail",
        "campStay": "Trekker's camp at Chail (2,250 m)",
        "weather": "Comfortable daytime temperatures near Chail; a light jacket suffices most evenings",
        "photography": "Sunrise silhouettes at Chail: Roadside forest",
        "safety": "Lightning risk on the open ridge near Chail during afternoon cloud build-up—start early"
      }
    ],
    "whyChoose": [
      "Distinct Karol Tibba Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Wooded hill walk near Chail with temple on top."
  },
  "jalori": {
    "key": "jalori",
    "name": "Jalori Pass Trek",
    "region": "shimla",
    "location": "Jalori Pass Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Jalori Pass has for centuries linked the Kullu and Shimla sides of the Seraj region, used by traders and shepherds moving between the two valleys long before the current road was built. The pass still hosts a small temple and roadside dhabas frequented by travellers crossing between the regions.",
    "difficulty": "Moderate",
    "distanceKm": "12 km",
    "duration": "2 days",
    "highestAltitudeM": "3120",
    "baseCamp": "Jibhi / Shoja",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Shoja (Jalori Pass); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Shoja (Jalori Pass); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Shoja (Jalori Pass) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Shoja (Jalori Pass)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Shoja (Jalori Pass)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Shoja (Jalori Pass)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Shoja (Jalori Pass) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Shoja (Jalori Pass) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Shoja (Jalori Pass)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Shoja (Jalori Pass)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Shoja (Jalori Pass) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Shoja (Jalori Pass); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Jibhi / Shoja; camp nights near Shoja at 3120 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Jibhi / Shoja runs through deodar, oak and moist temperate forest, thinning into shaded forest cover for most of the route on the climb toward Shoja at 3120 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Jalori Pass at 3120 m in first light",
      "Jalori camp at dusk",
      "Shoja camp at dusk",
      "Jibhi / Shoja approach and roadhead",
      "Shoja on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Jalori Pass route out of Jibhi / Shoja.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Jibhi / Shoja runs 5–7 hours a day up to 3120 m.",
    "ams": "Mild AMS risk near 3120 m around Shoja; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "The Ridge and Mall Road",
      "Jakhoo Temple",
      "Chail Palace",
      "Kufri viewpoint"
    ],
    "nearbyTreks": [
      "Jalori Pass to Serolsar Circuit",
      "Shikari Devi",
      "Shali Tibba"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Shoja to Jalori Pass",
        "start": "Shoja (2,700 m)",
        "end": "Jalori Pass (3,120 m)",
        "distanceKm": "6",
        "altitudeM": "3120",
        "elevationGain": "+420 m",
        "trekTime": "3-4 hours",
        "terrain": "Rhododendron ridge",
        "description": "Climb to Jalori Pass gate with Great Himalayan views.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Jalori",
        "campStay": "Alpine tents at Jalori Pass (3,120 m)",
        "weather": "Comfortable daytime temperatures near Jalori; a light jacket suffices most evenings",
        "photography": "Sunrise silhouettes at Jalori: Rhododendron ridge",
        "safety": "Lightning risk on the open ridge near Jalori during afternoon cloud build-up—start early"
      },
      {
        "title": "Day 2: Jalori to Shoja return via alternate ridge",
        "start": "Jalori Pass (3,120 m)",
        "end": "Shoja (2,700 m)",
        "distanceKm": "6",
        "altitudeM": "2700",
        "elevationGain": "Descent",
        "trekTime": "3 hours",
        "terrain": "Forest descent",
        "description": "Return via Banjar valley side trail.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Shoja",
        "campStay": "Trekker's camp at Shoja (2,700 m)",
        "weather": "Mist often lingers over Shoja until mid-morning before skies clear",
        "photography": "Late-afternoon panorama from Shoja: Forest descent",
        "safety": "Trail can be busy with day visitors near Shoja; keep right and let faster groups pass"
      }
    ],
    "whyChoose": [
      "Distinct Jalori Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Jalori Pass crossing toward Serolsar or Shoja ridges."
  },
  "serolsar": {
    "key": "serolsar",
    "name": "Serolsar Lake Trek",
    "region": "shimla",
    "location": "Serolsar Lake Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Serolsar Lake, tucked inside dense forest below Jalori Pass, has long been considered sacred to the local deity Buddhi Nagin and is still visited by villagers making offerings at its edge. The forest walk to reach it has remained largely unchanged for generations.",
    "difficulty": "Easy",
    "distanceKm": "5 km",
    "duration": "1 day",
    "highestAltitudeM": "3190",
    "baseCamp": "Jalori Pass",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Jalori (Serolsar Lake); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Jalori (Serolsar Lake); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Jalori (Serolsar Lake) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Jalori (Serolsar Lake)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Jalori (Serolsar Lake)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Jalori (Serolsar Lake)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Jalori (Serolsar Lake) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Jalori (Serolsar Lake) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Jalori (Serolsar Lake)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Jalori (Serolsar Lake)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Jalori (Serolsar Lake) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Jalori (Serolsar Lake); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Jalori Pass; camp nights near Jalori at 3190 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Jalori Pass runs through deodar, oak and moist temperate forest, thinning into shaded forest cover for most of the route on the climb toward Jalori at 3190 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Serolsar Lake at 3190 m in first light",
      "Serolsar camp at dusk",
      "Jalori camp at dusk",
      "Jalori Pass approach and roadhead",
      "Jalori on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Serolsar Lake route out of Jalori Pass.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 5 km route from Jalori Pass—expect 3–5 hours of walking a day up to 3190 m.",
    "ams": "Mild AMS risk near 3190 m around Jalori; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chail Palace",
      "Kufri viewpoint",
      "Tattapani hot springs",
      "Naldehra golf greens"
    ],
    "nearbyTreks": [
      "Churdhar Peak",
      "Kamru Nag Lake",
      "Karol Tibba"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Jalori Pass to Serolsar Lake",
        "start": "Jalori Pass (3,120 m)",
        "end": "Serolsar Lake (3,190 m)",
        "distanceKm": "2.5",
        "altitudeM": "3190",
        "elevationGain": "+70 m",
        "trekTime": "1-2 hours",
        "terrain": "Lake trail",
        "description": "Gentle walk to oval Serolsar Lake surrounded by deodar.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Serolsar",
        "campStay": "Alpine tents at Serolsar Lake (3,190 m)",
        "weather": "Mist often lingers over Serolsar until mid-morning before skies clear",
        "photography": "Late-afternoon panorama from Serolsar: Lake trail",
        "safety": "Trail can be busy with day visitors near Serolsar; keep right and let faster groups pass"
      },
      {
        "title": "Day 2: Serolsar to Jalori return",
        "start": "Serolsar Lake (3,190 m)",
        "end": "Jalori Pass (3,120 m)",
        "distanceKm": "2.5",
        "altitudeM": "3120",
        "elevationGain": "Descent",
        "trekTime": "1 hour",
        "terrain": "Same trail",
        "description": "Return to pass roadhead for taxi to Jibhi.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Jalori",
        "campStay": "Alpine tents at Jalori Pass (3,120 m)",
        "weather": "Comfortable daytime temperatures near Jalori; a light jacket suffices most evenings",
        "photography": "Best light at Jalori: Same trail",
        "safety": "Lightning risk on the open ridge near Jalori during afternoon cloud build-up—start early"
      }
    ],
    "whyChoose": [
      "Distinct Serolsar Lake Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Day descent from Jalori Pass to sacred Serolsar Lake."
  },
  "jalori-serolsar": {
    "key": "jalori-serolsar",
    "name": "Jalori Pass to Serolsar Circuit",
    "region": "shimla",
    "location": "Jalori Pass to Serolsar Circuit trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Combining the Jalori Pass roadhead with the forest walk to Serolsar Lake has become a popular two-day pairing for travellers exploring the Seraj region between Kullu and Shimla. Both stops sit on trade routes and pilgrimage paths that predate the modern road.",
    "difficulty": "Moderate",
    "distanceKm": "14 km",
    "duration": "2 days",
    "highestAltitudeM": "3190",
    "baseCamp": "Shoja",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Jibhi (Jalori Pass to Serolsar Circuit); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Jibhi (Jalori Pass to Serolsar Circuit); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Jibhi (Jalori Pass to Serolsar Circuit) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Jibhi (Jalori Pass to Serolsar Circuit)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Jibhi (Jalori Pass to Serolsar Circuit)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Jibhi (Jalori Pass to Serolsar Circuit)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Jibhi (Jalori Pass to Serolsar Circuit) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Jibhi (Jalori Pass to Serolsar Circuit) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Jibhi (Jalori Pass to Serolsar Circuit)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Jibhi (Jalori Pass to Serolsar Circuit)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Jibhi (Jalori Pass to Serolsar Circuit) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Jibhi (Jalori Pass to Serolsar Circuit); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Shoja; camp nights near Jibhi at 3190 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Shoja runs through deodar, oak and moist temperate forest, thinning into shaded forest cover for most of the route on the climb toward Jibhi at 3190 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Jalori Pass to Serolsar Circuit at 3190 m in first light",
      "Jalori camp at dusk",
      "Jibhi camp at dusk",
      "Shoja approach and roadhead",
      "Jibhi on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Jalori Pass to Serolsar Circuit route out of Shoja.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Shoja runs 5–7 hours a day up to 3190 m.",
    "ams": "Mild AMS risk near 3190 m around Jibhi; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Tattapani hot springs",
      "Naldehra golf greens",
      "Christ Church Shimla",
      "Narkanda apple belt"
    ],
    "nearbyTreks": [
      "Kuppar Bugyal",
      "Hatu Peak",
      "Jalori Pass"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Shoja to Jalori Pass camp",
        "start": "Shoja (2,700 m)",
        "end": "Jalori Pass (3,120 m)",
        "distanceKm": "6",
        "altitudeM": "3120",
        "elevationGain": "+420 m",
        "trekTime": "3 hours",
        "terrain": "Ridge",
        "description": "Camp near pass for sunrise.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Jalori",
        "campStay": "Alpine tents at Jalori Pass (3,120 m)",
        "weather": "Comfortable daytime temperatures near Jalori; a light jacket suffices most evenings",
        "photography": "Best light at Jalori: Ridge",
        "safety": "Lightning risk on the open ridge near Jalori during afternoon cloud build-up—start early"
      },
      {
        "title": "Day 2: Jalori to Serolsar and exit to Jibhi",
        "start": "Jalori Pass (3,120 m)",
        "end": "Jibhi village (2,600 m)",
        "distanceKm": "8",
        "altitudeM": "3190",
        "elevationGain": "Lake visit then descent",
        "trekTime": "5 hours",
        "terrain": "Lake and valley",
        "description": "Visit Serolsar then descend Banjar road to Jibhi homestay.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Jibhi",
        "campStay": "Hotel/guesthouse at Jibhi village (2,600 m)",
        "weather": "Mist often lingers over Jibhi until mid-morning before skies clear",
        "photography": "A classic frame from Jibhi: Lake and valley",
        "safety": "Trail can be busy with day visitors near Jibhi; keep right and let faster groups pass"
      }
    ],
    "whyChoose": [
      "Distinct Jalori Pass to Serolsar Circuit scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Combined Jalori pass and Serolsar overnight."
  },
  "churdhar": {
    "key": "churdhar",
    "name": "Churdhar Peak Trek",
    "region": "shimla",
    "location": "Churdhar Peak Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Churdhar, the highest peak in the outer Shimla hills, is topped by a temple to Shirgul Devta considered one of the most important deities of the region, drawing pilgrims from villages across Sirmaur district. The steep forest climb from Nohradhar has been the traditional pilgrim route for generations.",
    "difficulty": "Moderate",
    "distanceKm": "16 km",
    "duration": "2 days",
    "highestAltitudeM": "3647",
    "baseCamp": "Nohradhar / Sarain",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Churdhar (Churdhar Peak); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Churdhar (Churdhar Peak); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Churdhar (Churdhar Peak) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Churdhar (Churdhar Peak)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Churdhar (Churdhar Peak)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Churdhar (Churdhar Peak)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Churdhar (Churdhar Peak) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Churdhar (Churdhar Peak) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Churdhar (Churdhar Peak)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Churdhar (Churdhar Peak)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Churdhar (Churdhar Peak) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Churdhar (Churdhar Peak); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Nohradhar / Sarain; camp nights near Churdhar at 3647 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Nohradhar / Sarain runs through deodar, oak and moist temperate forest, thinning into open alpine meadow and scrub above the tree line on the climb toward Churdhar at 3647 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Churdhar Peak at 3647 m in first light",
      "Jam camp at dusk",
      "Churdhar camp at dusk",
      "Nohradhar / Sarain approach and roadhead",
      "Churdhar on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Churdhar Peak route out of Nohradhar / Sarain.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Nohradhar / Sarain runs 5–7 hours a day up to 3647 m.",
    "ams": "Mild AMS risk near 3647 m around Churdhar; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Christ Church Shimla",
      "Narkanda apple belt",
      "The Ridge and Mall Road",
      "Jakhoo Temple"
    ],
    "nearbyTreks": [
      "Shikari Devi",
      "Shali Tibba",
      "Serolsar Lake"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Nohradhar to Jam Nallah camp",
        "start": "Nohradhar (2,200 m)",
        "end": "Jam Nallah (3,000 m)",
        "distanceKm": "8",
        "altitudeM": "3000",
        "elevationGain": "+800 m",
        "trekTime": "5 hours",
        "terrain": "Rhododendron forest",
        "description": "Climb through sanctuary forest toward Churdhar summit ridge.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Jam",
        "campStay": "Alpine tents at Jam Nallah (3,000 m)",
        "weather": "Mist often lingers over Jam until mid-morning before skies clear",
        "photography": "A classic frame from Jam: Rhododendron forest",
        "safety": "Trail can be busy with day visitors near Jam; keep right and let faster groups pass"
      },
      {
        "title": "Day 2: Summit Churdhar and return",
        "start": "Camp (3,000 m)",
        "end": "Churdhar peak (3,647 m)",
        "distanceKm": "8",
        "altitudeM": "3647",
        "elevationGain": "+647 m",
        "trekTime": "6-7 hours",
        "terrain": "Open ridge",
        "description": "Summit with views to Kinnaur and plains; descend to Sarain same day or camp.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Churdhar kitchen tent",
        "campStay": "Homestay in the village at Churdhar peak (3,647 m)",
        "weather": "Comfortable daytime temperatures near Churdhar; a light jacket suffices most evenings",
        "photography": "Golden-hour views near Churdhar: Open ridge",
        "safety": "Lightning risk on the open ridge near Churdhar during afternoon cloud build-up—start early"
      }
    ],
    "whyChoose": [
      "Distinct Churdhar Peak Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Highest peak in outer Himalaya above Sirmaur - Churdhar Shiv temple."
  },
  "kuppar": {
    "key": "kuppar",
    "name": "Kuppar Bugyal Trek",
    "region": "shimla",
    "location": "Kuppar Bugyal Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Kuppar Bugyal is a broad grazing meadow used by shepherd communities from villages around Chanshal for generations, valued for its open views toward the higher Chanshal pass range. Its easy access has made it a popular short bugyal walk in recent years.",
    "difficulty": "Easy",
    "distanceKm": "8 km",
    "duration": "1 day",
    "highestAltitudeM": "3200",
    "baseCamp": "Kuppar village",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Chanshal (Kuppar Bugyal); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Chanshal (Kuppar Bugyal); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Chanshal (Kuppar Bugyal) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Chanshal (Kuppar Bugyal)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Chanshal (Kuppar Bugyal)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Chanshal (Kuppar Bugyal)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Chanshal (Kuppar Bugyal) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Chanshal (Kuppar Bugyal) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Chanshal (Kuppar Bugyal)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Chanshal (Kuppar Bugyal)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Chanshal (Kuppar Bugyal) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Chanshal (Kuppar Bugyal); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kuppar village; camp nights near Chanshal at 3200 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Kuppar village runs through deodar, oak and moist temperate forest, thinning into open alpine meadow and scrub above the tree line on the climb toward Chanshal at 3200 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Kuppar Bugyal at 3200 m in first light",
      "Kuppar camp at dusk",
      "Chanshal camp at dusk",
      "Kuppar village approach and roadhead",
      "Chanshal on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Kuppar Bugyal route out of Kuppar village.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 8 km route from Kuppar village—expect 3–5 hours of walking a day up to 3200 m.",
    "ams": "Mild AMS risk near 3200 m around Chanshal; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "The Ridge and Mall Road",
      "Jakhoo Temple",
      "Chail Palace",
      "Kufri viewpoint"
    ],
    "nearbyTreks": [
      "Kamru Nag Lake",
      "Karol Tibba",
      "Jalori Pass to Serolsar Circuit"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Kuppar village to bugyal",
        "start": "Kuppar (2,800 m)",
        "end": "Kuppar Bugyal (3,200 m)",
        "distanceKm": "4",
        "altitudeM": "3200",
        "elevationGain": "+400 m",
        "trekTime": "3 hours",
        "terrain": "Alpine meadow",
        "description": "Short meadow walk in Pabbar valley belt.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Kuppar",
        "campStay": "Alpine tents at Kuppar Bugyal (3,200 m)",
        "weather": "Comfortable daytime temperatures near Kuppar; a light jacket suffices most evenings",
        "photography": "Golden-hour views near Kuppar: Alpine meadow",
        "safety": "Lightning risk on the open ridge near Kuppar during afternoon cloud build-up—start early"
      },
      {
        "title": "Day 2: Bugyal to Chanshal viewpoint",
        "start": "Kuppar Bugyal (3,200 m)",
        "end": "Chanshal vista (3,250 m)",
        "distanceKm": "4",
        "altitudeM": "3250",
        "elevationGain": "+50 m",
        "trekTime": "2 hours",
        "terrain": "Ridge",
        "description": "Optional ridge extension before village return.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Chanshal",
        "campStay": "Alpine tents at Chanshal vista (3,250 m)",
        "weather": "Mist often lingers over Chanshal until mid-morning before skies clear",
        "photography": "Wide-angle vantage at Chanshal: Ridge",
        "safety": "Trail can be busy with day visitors near Chanshal; keep right and let faster groups pass"
      }
    ],
    "whyChoose": [
      "Distinct Kuppar Bugyal Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Meadow walk above Rohru with views of Chanshal."
  },
  "shikari-devi": {
    "key": "shikari-devi",
    "name": "Shikari Devi Trek",
    "region": "shimla",
    "location": "Shikari Devi Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Shikari Devi temple, roofless by tradition since the goddess is said to have declined a roof offered to her, sits atop a ridge that has been a pilgrimage destination for Mandi and Karsog villagers for generations. Its open-air shrine remains snow-covered for much of the winter.",
    "difficulty": "Moderate",
    "distanceKm": "18 km",
    "duration": "2 days",
    "highestAltitudeM": "3350",
    "baseCamp": "Janjheli / Bakhrot",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Shikari (Shikari Devi); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Shikari (Shikari Devi); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Shikari (Shikari Devi) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Shikari (Shikari Devi)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Shikari (Shikari Devi)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Shikari (Shikari Devi)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Shikari (Shikari Devi) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Shikari (Shikari Devi) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Shikari (Shikari Devi)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Shikari (Shikari Devi)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Shikari (Shikari Devi) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Shikari (Shikari Devi); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Janjheli / Bakhrot; camp nights near Shikari at 3350 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Janjheli / Bakhrot runs through deodar, oak and moist temperate forest, thinning into open alpine meadow and scrub above the tree line on the climb toward Shikari at 3350 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Shikari Devi at 3350 m in first light",
      "Ridge camp at dusk",
      "Shikari camp at dusk",
      "Janjheli / Bakhrot approach and roadhead",
      "Shikari on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Shikari Devi route out of Janjheli / Bakhrot.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Janjheli / Bakhrot runs 5–7 hours a day up to 3350 m.",
    "ams": "Mild AMS risk near 3350 m around Shikari; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chail Palace",
      "Kufri viewpoint",
      "Tattapani hot springs",
      "Naldehra golf greens"
    ],
    "nearbyTreks": [
      "Hatu Peak",
      "Jalori Pass",
      "Churdhar Peak"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Janjheli to Shikari Devi ridge camp",
        "start": "Janjheli (2,200 m)",
        "end": "Ridge camp (3,100 m)",
        "distanceKm": "9",
        "altitudeM": "3100",
        "elevationGain": "+900 m",
        "trekTime": "6 hours",
        "terrain": "Continuous ridge",
        "description": "Long ridge walk through deodar opening to temple plateau.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Ridge",
        "campStay": "Alpine tents at Ridge camp (3,100 m)",
        "weather": "Mist often lingers over Ridge until mid-morning before skies clear",
        "photography": "Wide-angle vantage at Ridge: Continuous ridge",
        "safety": "Trail can be busy with day visitors near Ridge; keep right and let faster groups pass"
      },
      {
        "title": "Day 2: Temple darshan and descent",
        "start": "Ridge camp (3,100 m)",
        "end": "Shikari Devi temple (3,350 m)",
        "distanceKm": "9",
        "altitudeM": "3350",
        "elevationGain": "+250 m",
        "trekTime": "5 hours",
        "terrain": "Open temple ridge",
        "description": "Visit roofless temple and descend to Bakhrot road.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Shikari",
        "campStay": "Alpine tents at Shikari Devi temple (3,350 m)",
        "weather": "Comfortable daytime temperatures near Shikari; a light jacket suffices most evenings",
        "photography": "Sunrise silhouettes at Shikari: Open temple ridge",
        "safety": "Lightning risk on the open ridge near Shikari during afternoon cloud build-up—start early"
      }
    ],
    "whyChoose": [
      "Distinct Shikari Devi Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Ridge walk to roofless Shikari Devi temple."
  },
  "kamru-nag": {
    "key": "kamru-nag",
    "name": "Kamru Nag Lake Trek",
    "region": "shimla",
    "location": "Kamru Nag Lake Trek trailheads in Shimla and outer hills, Himachal Pradesh",
    "history": "Kamru Nag Lake is one of Himachal’s most important local pilgrimage sites, where villagers have for generations thrown gold and silver offerings into the water during the annual June fair dedicated to the rain deity Kamru Nag. The forest walk from Rohanda has remained the traditional approach route.",
    "difficulty": "Moderate",
    "distanceKm": "12 km",
    "duration": "2 days",
    "highestAltitudeM": "3334",
    "baseCamp": "Karsog / Rohanda",
    "nearestRail": "Kalka-Shimla",
    "nearestAirport": "Jubbarhatti / Chandigarh",
    "roadConnectivity": "Chandigarh-Shimla NH",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow often blankets the ridge trail to Kamru (Kamru Nag Lake); check road status first"
      },
      {
        "month": "February",
        "note": "Cold and often snowy near Kamru (Kamru Nag Lake); good for a short snow walk"
      },
      {
        "month": "March",
        "note": "Melting snow keeps the Kamru (Kamru Nag Lake) trail damp; forest floor greening up"
      },
      {
        "month": "April",
        "note": "Pleasant spring days on the ridge approach to Kamru (Kamru Nag Lake)"
      },
      {
        "month": "May",
        "note": "Warm days, cool breeze; a comfortable window for Kamru (Kamru Nag Lake)"
      },
      {
        "month": "June",
        "note": "Hazy but stable; go early to beat the afternoon warmth near Kamru (Kamru Nag Lake)"
      },
      {
        "month": "July",
        "note": "Monsoon showers and slippery deodar roots on the Kamru (Kamru Nag Lake) trail"
      },
      {
        "month": "August",
        "note": "Continued rain; mist often hides the Kamru (Kamru Nag Lake) viewpoint until midday"
      },
      {
        "month": "September",
        "note": "Post-monsoon clarity gives the best long-range views from Kamru (Kamru Nag Lake)"
      },
      {
        "month": "October",
        "note": "Crisp air and excellent visibility around Kamru (Kamru Nag Lake)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet; Kamru (Kamru Nag Lake) is largely trekker-free"
      },
      {
        "month": "December",
        "note": "Snow returns to Kamru (Kamru Nag Lake); a favourite for a short winter walk"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Karsog / Rohanda; camp nights near Kamru at 3334 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Karsog / Rohanda runs through deodar, oak and moist temperate forest, thinning into open alpine meadow and scrub above the tree line on the climb toward Kamru at 3334 m. Keep an eye out for barking deer, Himalayan black bear and colourful pheasants in the deodar belt.",
    "photographySpots": [
      "Kamru Nag Lake at 3334 m in first light",
      "Mid camp at dusk",
      "Kamru camp at dusk",
      "Karsog / Rohanda approach and roadhead",
      "Kamru on the return leg"
    ],
    "network": "Good coverage near towns; drops off on the forested ridge sections",
    "electricity": "Available at guesthouses and dhabas along the route",
    "atm": "ATMs in Shimla, Narkanda and larger roadside towns",
    "medical": "Shimla hospitals for serious cases; local dispensaries en route",
    "camping": "Forest rest houses, dhabas and a few designated camp clearings",
    "permits": "No special permit for Indian nationals; carry ID for forest checkposts for the Kamru Nag Lake route out of Karsog / Rohanda.",
    "forestFees": "Small forest entry fee at some trailheads",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Light daypack—most of this route suits a day-hike load",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Karsog / Rohanda runs 5–7 hours a day up to 3334 m.",
    "ams": "Mild AMS risk near 3334 m around Kamru; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Tattapani hot springs",
      "Naldehra golf greens",
      "Christ Church Shimla",
      "Narkanda apple belt"
    ],
    "nearbyTreks": [
      "Shali Tibba",
      "Serolsar Lake",
      "Kuppar Bugyal"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Rohanda to Kamru Nag camp",
        "start": "Rohanda (2,400 m)",
        "end": "Mid forest camp (2,900 m)",
        "distanceKm": "6",
        "altitudeM": "2900",
        "elevationGain": "+500 m",
        "trekTime": "4 hours",
        "terrain": "Oak forest",
        "description": "Forest approach to Kamru Nag shrine belt.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Mid kitchen tent",
        "campStay": "Trekker's camp at Mid forest camp (2,900 m)",
        "weather": "Comfortable daytime temperatures near Mid; a light jacket suffices most evenings",
        "photography": "Sunrise silhouettes at Mid: Oak forest",
        "safety": "Lightning risk on the open ridge near Mid during afternoon cloud build-up—start early"
      },
      {
        "title": "Day 2: Kamru Nag lake and return",
        "start": "Camp (2,900 m)",
        "end": "Kamru Nag lake (3,334 m)",
        "distanceKm": "6",
        "altitudeM": "3334",
        "elevationGain": "+434 m",
        "trekTime": "5 hours",
        "terrain": "Lake bowl",
        "description": "Reach oval Kamru Nag lake then descend to Karsog road.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Kamru",
        "campStay": "Alpine tents at Kamru Nag lake (3,334 m)",
        "weather": "Mist often lingers over Kamru until mid-morning before skies clear",
        "photography": "Late-afternoon panorama from Kamru: Lake bowl",
        "safety": "Trail can be busy with day visitors near Kamru; keep right and let faster groups pass"
      }
    ],
    "whyChoose": [
      "Distinct Kamru Nag Lake Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Sacred Kamru Nag lake above Karsog valley."
  },
  "ghnp": {
    "key": "ghnp",
    "name": "Great Himalayan National Park Trek",
    "region": "tirthan",
    "location": "Great Himalayan National Park Trek trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "The Great Himalayan National Park was declared a UNESCO World Heritage Site in 2014 for its exceptional biodiversity, protecting habitat for the western tragopan and snow leopard along the Tirthan valley. Trekking inside the park still follows old shepherd and forest-department trails linking Sai Ropa, Rolla and the high meadows beyond Shilt.",
    "difficulty": "Moderate",
    "distanceKm": "25 km",
    "duration": "4 days",
    "highestAltitudeM": "3500",
    "baseCamp": "Gushaini / Sai Ropa",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Tirath (Great Himalayan National Park); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Tirath (Great Himalayan National Park)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Tirath (Great Himalayan National Park) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Tirath (Great Himalayan National Park)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Tirath (Great Himalayan National Park) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Tirath (Great Himalayan National Park)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Tirath (Great Himalayan National Park)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Tirath (Great Himalayan National Park)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Tirath (Great Himalayan National Park) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Tirath (Great Himalayan National Park)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Tirath (Great Himalayan National Park)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Tirath (Great Himalayan National Park)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Gushaini / Sai Ropa; camp nights near Gushaini at 3500 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Gushaini / Sai Ropa runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into open alpine meadow and scrub above the tree line on the climb toward Gushaini at 3500 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Great Himalayan National Park at 3500 m in first light",
      "Rolla camp at dusk",
      "Shilt camp at dusk",
      "Tirath camp at dusk",
      "Gushaini / Sai Ropa approach and roadhead"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Great Himalayan National Park route out of Gushaini / Sai Ropa.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 4 days route from Gushaini / Sai Ropa runs 5–7 hours a day up to 3500 m.",
    "ams": "Mild AMS risk near 3500 m around Gushaini; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Original ID copies for Great Himalayan National Park entry checks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Raju waterfall",
      "Sai Ropa camps",
      "Tirthan river angling points",
      "Jibhi cafes"
    ],
    "nearbyTreks": [
      "Jibhi Waterfall Walk",
      "Raktisar GHNP",
      "Lambri Peak",
      "Rolla GHNP Base"
    ],
    "budget": {
      "budget": "₹4,700–8,800",
      "standard": "₹11,400–18,700",
      "premium": "₹21,800–36,400"
    },
    "days": [
      {
        "title": "Day 1: Sai Ropa gate to Rolla",
        "start": "Sai Ropa (1,600 m)",
        "end": "Rolla (2,100 m)",
        "distanceKm": "8",
        "altitudeM": "2100",
        "elevationGain": "+500 m",
        "trekTime": "4 hours",
        "terrain": "Park forest",
        "description": "Enter GHNP with permits from Sai Ropa interpretation centre.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Rolla",
        "campStay": "Trekker's camp at Rolla (2,100 m)",
        "weather": "Cool, damp air along the river near Rolla; carry rain protection regardless of forecast",
        "photography": "Late-afternoon panorama from Rolla: Park forest",
        "safety": "River levels near Rolla can rise quickly after rain—do not cross if water is above the knee"
      },
      {
        "title": "Day 2: Rolla to Shilt hut",
        "start": "Rolla (2,100 m)",
        "end": "Shilt hut (3,100 m)",
        "distanceKm": "10",
        "altitudeM": "3100",
        "elevationGain": "+1,000 m",
        "trekTime": "6 hours",
        "terrain": "Deep wilderness",
        "description": "Climb into core zone with strict leave-no-trace rules.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Shilt",
        "campStay": "Forest rest house / trekker hut at Shilt hut (3,100 m)",
        "weather": "Humid under the forest canopy near Shilt; showers can arrive with little warning",
        "photography": "Best light at Shilt: Deep wilderness",
        "safety": "Check leeches at rest stops before Shilt and carry salt or repellent in the monsoon window"
      },
      {
        "title": "Day 3: Shilt exploration day",
        "start": "Shilt (3,100 m)",
        "end": "Tirath viewpoint (3,400 m)",
        "distanceKm": "8",
        "altitudeM": "3400",
        "elevationGain": "+300 m",
        "trekTime": "5 hours",
        "terrain": "Alpine edge",
        "description": "Day exploration toward Tirath or wildlife watch with ranger.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Tirath",
        "campStay": "Alpine tents at Tirath viewpoint (3,400 m)",
        "weather": "Cool, damp air along the river near Tirath; carry rain protection regardless of forecast",
        "photography": "A classic frame from Tirath: Alpine edge",
        "safety": "River levels near Tirath can rise quickly after rain—do not cross if water is above the knee"
      },
      {
        "title": "Day 4: Exit to Gushaini",
        "start": "Shilt (3,100 m)",
        "end": "Gushaini (1,500 m)",
        "distanceKm": "12",
        "altitudeM": "1500",
        "elevationGain": "Descent",
        "trekTime": "5 hours",
        "terrain": "Forest exit",
        "description": "Descend Tirthan valley to roadhead homestays.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Gushaini kitchen tent",
        "campStay": "Trekker's camp at Gushaini (1,500 m)",
        "weather": "Humid under the forest canopy near Gushaini; showers can arrive with little warning",
        "photography": "Golden-hour views near Gushaini: Forest exit",
        "safety": "Check leeches at rest stops before Gushaini and carry salt or repellent in the monsoon window"
      }
    ],
    "whyChoose": [
      "Distinct Great Himalayan National Park Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Core GHNP wilderness entry via park gates and ranger trails."
  },
  "rolla": {
    "key": "rolla",
    "name": "Rolla GHNP Base Trek",
    "region": "tirthan",
    "location": "Rolla GHNP Base Trek trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "Rolla has served as the first forest department checkpost and camping ground for generations of park rangers and researchers entering the Great Himalayan National Park from Gushaini. It remains the standard first stop for anyone heading deeper into the park’s core zone.",
    "difficulty": "Easy",
    "distanceKm": "16 km",
    "duration": "2 days",
    "highestAltitudeM": "2100",
    "baseCamp": "Gushaini",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Gushaini (Rolla GHNP Base); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Gushaini (Rolla GHNP Base)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Gushaini (Rolla GHNP Base) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Gushaini (Rolla GHNP Base)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Gushaini (Rolla GHNP Base) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Gushaini (Rolla GHNP Base)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Gushaini (Rolla GHNP Base)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Gushaini (Rolla GHNP Base)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Gushaini (Rolla GHNP Base) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Gushaini (Rolla GHNP Base)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Gushaini (Rolla GHNP Base)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Gushaini (Rolla GHNP Base)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Gushaini; camp nights near Gushaini at 2100 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Gushaini runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into shaded forest cover for most of the route on the climb toward Gushaini at 2100 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Rolla GHNP Base at 2100 m in first light",
      "Rolla camp at dusk",
      "Gushaini camp at dusk",
      "Gushaini approach and roadhead",
      "Gushaini on the return leg"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Rolla GHNP Base route out of Gushaini.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 16 km route from Gushaini—expect 3–5 hours of walking a day up to 2100 m.",
    "ams": "Low AMS risk at 2100 m near Gushaini; hydrate well and ascend steadily from Gushaini.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Original ID copies for Great Himalayan National Park entry checks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Tirthan river angling points",
      "Jibhi cafes",
      "Chehni Kothi tower",
      "Great Himalayan National Park museum"
    ],
    "nearbyTreks": [
      "Great Himalayan National Park",
      "Tirath Trek GHNP",
      "Chehni Kothi",
      "Shilt Thatch"
    ],
    "budget": {
      "budget": "₹1,800–3,400",
      "standard": "₹4,400–7,200",
      "premium": "₹8,400–14,000"
    },
    "days": [
      {
        "title": "Day 1: Gushaini to Rolla",
        "start": "Gushaini (1,500 m)",
        "end": "Rolla (2,100 m)",
        "distanceKm": "8",
        "altitudeM": "2100",
        "elevationGain": "+600 m",
        "trekTime": "4-5 hours",
        "terrain": "Tirthan riverside",
        "description": "Follow Tirthan river into park buffer to Rolla clearing.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Rolla",
        "campStay": "Trekker's camp at Rolla (2,100 m)",
        "weather": "Humid under the forest canopy near Rolla; showers can arrive with little warning",
        "photography": "Best light at Rolla: Tirthan riverside",
        "safety": "Check leeches at rest stops before Rolla and carry salt or repellent in the monsoon window"
      },
      {
        "title": "Day 2: Rolla to Gushaini return",
        "start": "Rolla (2,100 m)",
        "end": "Gushaini (1,500 m)",
        "distanceKm": "8",
        "altitudeM": "1500",
        "elevationGain": "Descent",
        "trekTime": "4 hours",
        "terrain": "Same trail",
        "description": "Return with birding stops along the river.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Gushaini",
        "campStay": "Trekker's camp at Gushaini (1,500 m)",
        "weather": "Cool, damp air along the river near Gushaini; carry rain protection regardless of forecast",
        "photography": "A classic frame from Gushaini: Same trail",
        "safety": "River levels near Gushaini can rise quickly after rain—do not cross if water is above the knee"
      }
    ],
    "whyChoose": [
      "Distinct Rolla GHNP Base Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Short GHNP walk to Rolla meadow camp."
  },
  "shilt": {
    "key": "shilt",
    "name": "Shilt Thatch Trek",
    "region": "tirthan",
    "location": "Shilt Thatch Trek trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "Shilt Thatch, a high meadow hut used by park rangers and shepherds for generations, sits at the edge of the Great Himalayan National Park’s core alpine zone above Rolla. It remains the standard staging camp for parties heading toward Tirath or Raktisar.",
    "difficulty": "Moderate",
    "distanceKm": "12 km",
    "duration": "2 days",
    "highestAltitudeM": "3100",
    "baseCamp": "Rolla",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Rolla (Shilt Thatch); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Rolla (Shilt Thatch)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Rolla (Shilt Thatch) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Rolla (Shilt Thatch)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Rolla (Shilt Thatch) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Rolla (Shilt Thatch)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Rolla (Shilt Thatch)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Rolla (Shilt Thatch)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Rolla (Shilt Thatch) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Rolla (Shilt Thatch)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Rolla (Shilt Thatch)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Rolla (Shilt Thatch)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Rolla; camp nights near Rolla at 3100 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Rolla runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into shaded forest cover for most of the route on the climb toward Rolla at 3100 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Shilt Thatch at 3100 m in first light",
      "Shilt camp at dusk",
      "Rolla camp at dusk",
      "Rolla approach and roadhead",
      "Rolla on the return leg"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Shilt Thatch route out of Rolla.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Rolla runs 5–7 hours a day up to 3100 m.",
    "ams": "Mild AMS risk near 3100 m around Rolla; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Original ID copies for Great Himalayan National Park entry checks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chehni Kothi tower",
      "Great Himalayan National Park museum",
      "Gushaini riverside",
      "Nada village terraces"
    ],
    "nearbyTreks": [
      "Rolla GHNP Base",
      "Bashleo Pass Walk",
      "Jibhi Waterfall Walk",
      "Raktisar GHNP"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Rolla to Shilt",
        "start": "Rolla (2,100 m)",
        "end": "Shilt hut (3,100 m)",
        "distanceKm": "6",
        "altitudeM": "3100",
        "elevationGain": "+1,000 m",
        "trekTime": "5-6 hours",
        "terrain": "Steep forest",
        "description": "Primary GHNP stage gaining serious elevation.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Shilt",
        "campStay": "Forest rest house / trekker hut at Shilt hut (3,100 m)",
        "weather": "Cool, damp air along the river near Shilt; carry rain protection regardless of forecast",
        "photography": "A classic frame from Shilt: Steep forest",
        "safety": "River levels near Shilt can rise quickly after rain—do not cross if water is above the knee"
      },
      {
        "title": "Day 2: Shilt to Rolla descent",
        "start": "Shilt (3,100 m)",
        "end": "Rolla (2,100 m)",
        "distanceKm": "6",
        "altitudeM": "2100",
        "elevationGain": "Descent",
        "trekTime": "4 hours",
        "terrain": "Forest",
        "description": "Return to Rolla for second night or exit.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Rolla",
        "campStay": "Trekker's camp at Rolla (2,100 m)",
        "weather": "Humid under the forest canopy near Rolla; showers can arrive with little warning",
        "photography": "Golden-hour views near Rolla: Forest",
        "safety": "Check leeches at rest stops before Rolla and carry salt or repellent in the monsoon window"
      }
    ],
    "whyChoose": [
      "Distinct Shilt Thatch Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Rolla to Shilt wilderness hut classic stage."
  },
  "raktisar": {
    "key": "raktisar",
    "name": "Raktisar GHNP Trek",
    "region": "tirthan",
    "location": "Raktisar GHNP Trek trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "Raktisar, deep inside the Great Himalayan National Park’s core zone beyond Shilt, is named in local legend for a mythological blood-red spring said to lie nearby. It remains one of the least-visited camps in the park, reached only by permit-holding trekking groups.",
    "difficulty": "Moderate",
    "distanceKm": "10 km",
    "duration": "2 days",
    "highestAltitudeM": "3300",
    "baseCamp": "Shilt",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Shilt (Raktisar GHNP); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Shilt (Raktisar GHNP)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Shilt (Raktisar GHNP) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Shilt (Raktisar GHNP)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Shilt (Raktisar GHNP) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Shilt (Raktisar GHNP)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Shilt (Raktisar GHNP)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Shilt (Raktisar GHNP)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Shilt (Raktisar GHNP) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Shilt (Raktisar GHNP)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Shilt (Raktisar GHNP)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Shilt (Raktisar GHNP)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Shilt; camp nights near Shilt at 3300 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Shilt runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into open alpine meadow and scrub above the tree line on the climb toward Shilt at 3300 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Raktisar GHNP at 3300 m in first light",
      "Raktisar camp at dusk",
      "Shilt camp at dusk",
      "Shilt approach and roadhead",
      "Shilt on the return leg"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Raktisar GHNP route out of Shilt.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Shilt runs 5–7 hours a day up to 3300 m.",
    "ams": "Mild AMS risk near 3300 m around Shilt; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Original ID copies for Great Himalayan National Park entry checks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Gushaini riverside",
      "Nada village terraces",
      "Raju waterfall",
      "Sai Ropa camps"
    ],
    "nearbyTreks": [
      "Shilt Thatch",
      "Lambri Peak",
      "Great Himalayan National Park",
      "Tirath Trek GHNP"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Shilt to Raktisar meadow",
        "start": "Shilt (3,100 m)",
        "end": "Raktisar (3,300 m)",
        "distanceKm": "5",
        "altitudeM": "3300",
        "elevationGain": "+200 m",
        "trekTime": "3-4 hours",
        "terrain": "Alpine meadow",
        "description": "Side excursion into Raktisar grazing flats.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Raktisar",
        "campStay": "Alpine tents at Raktisar (3,300 m)",
        "weather": "Humid under the forest canopy near Raktisar; showers can arrive with little warning",
        "photography": "Golden-hour views near Raktisar: Alpine meadow",
        "safety": "Check leeches at rest stops before Raktisar and carry salt or repellent in the monsoon window"
      },
      {
        "title": "Day 2: Raktisar to Shilt return",
        "start": "Raktisar (3,300 m)",
        "end": "Shilt (3,100 m)",
        "distanceKm": "5",
        "altitudeM": "3100",
        "elevationGain": "Descent",
        "trekTime": "3 hours",
        "terrain": "Meadow trail",
        "description": "Return to Shilt hut same day.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Shilt",
        "campStay": "Alpine tents at Shilt (3,100 m)",
        "weather": "Cool, damp air along the river near Shilt; carry rain protection regardless of forecast",
        "photography": "Wide-angle vantage at Shilt: Meadow trail",
        "safety": "River levels near Shilt can rise quickly after rain—do not cross if water is above the knee"
      }
    ],
    "whyChoose": [
      "Distinct Raktisar GHNP Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Side valley push from Shilt toward Raktisar meadows."
  },
  "tirath": {
    "key": "tirath",
    "name": "Tirath Trek GHNP",
    "region": "tirthan",
    "location": "Tirath Trek GHNP trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "Tirath viewpoint, just above Shilt inside Great Himalayan National Park, has long been used by forest rangers as a lookout point over the park’s glaciated core-zone peaks. It remains one of the best accessible panoramas inside the park without a technical climb.",
    "difficulty": "Moderate",
    "distanceKm": "14 km",
    "duration": "2 days",
    "highestAltitudeM": "3400",
    "baseCamp": "Shilt",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Gushaini (Tirath Trek GHNP); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Gushaini (Tirath Trek GHNP)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Gushaini (Tirath Trek GHNP) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Gushaini (Tirath Trek GHNP)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Gushaini (Tirath Trek GHNP) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Gushaini (Tirath Trek GHNP)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Gushaini (Tirath Trek GHNP)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Gushaini (Tirath Trek GHNP)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Gushaini (Tirath Trek GHNP) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Gushaini (Tirath Trek GHNP)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Gushaini (Tirath Trek GHNP)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Gushaini (Tirath Trek GHNP)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Shilt; camp nights near Gushaini at 3400 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Shilt runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into open alpine meadow and scrub above the tree line on the climb toward Gushaini at 3400 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Tirath Trek GHNP at 3400 m in first light",
      "Tirath camp at dusk",
      "Gushaini camp at dusk",
      "Shilt approach and roadhead",
      "Gushaini on the return leg"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Tirath Trek GHNP route out of Shilt.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Shilt runs 5–7 hours a day up to 3400 m.",
    "ams": "Mild AMS risk near 3400 m around Gushaini; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks",
      "Original ID copies for Great Himalayan National Park entry checks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Raju waterfall",
      "Sai Ropa camps",
      "Tirthan river angling points",
      "Jibhi cafes"
    ],
    "nearbyTreks": [
      "Raktisar GHNP",
      "Chehni Kothi",
      "Rolla GHNP Base",
      "Bashleo Pass Walk"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Shilt to Tirath",
        "start": "Shilt (3,100 m)",
        "end": "Tirath (3,400 m)",
        "distanceKm": "7",
        "altitudeM": "3400",
        "elevationGain": "+300 m",
        "trekTime": "4-5 hours",
        "terrain": "Ridge meadow",
        "description": "Day hike to Tirath with park guide mandatory.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Tirath",
        "campStay": "Alpine tents at Tirath (3,400 m)",
        "weather": "Cool, damp air along the river near Tirath; carry rain protection regardless of forecast",
        "photography": "Wide-angle vantage at Tirath: Ridge meadow",
        "safety": "River levels near Tirath can rise quickly after rain—do not cross if water is above the knee"
      },
      {
        "title": "Day 2: Tirath to Gushaini long exit",
        "start": "Tirath (3,400 m)",
        "end": "Gushaini (1,500 m)",
        "distanceKm": "14",
        "altitudeM": "1500",
        "elevationGain": "Long descent",
        "trekTime": "6 hours",
        "terrain": "Forest",
        "description": "Optional long exit day descending to Tirthan road.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Gushaini",
        "campStay": "Trekker's camp at Gushaini (1,500 m)",
        "weather": "Humid under the forest canopy near Gushaini; showers can arrive with little warning",
        "photography": "Sunrise silhouettes at Gushaini: Forest",
        "safety": "Check leeches at rest stops before Gushaini and carry salt or repellent in the monsoon window"
      }
    ],
    "whyChoose": [
      "Distinct Tirath Trek GHNP scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Tirath viewpoint and high meadow above Shilt."
  },
  "bashleo": {
    "key": "bashleo",
    "name": "Bashleo Pass Walk",
    "region": "tirthan",
    "location": "Bashleo Pass Walk trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "Bashleo Pass has long connected the outer Seraj villages of the Tirthan side with the inner Seraj valley beyond, used historically by shepherds and traders moving between the two forested valleys. The lower stretches remain a quiet, little-trekked alternative to the busier Jalori routes nearby.",
    "difficulty": "Easy",
    "distanceKm": "10 km",
    "duration": "2 days",
    "highestAltitudeM": "2800",
    "baseCamp": "Outer Seraj",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Seraj (Bashleo Pass Walk); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Seraj (Bashleo Pass Walk)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Seraj (Bashleo Pass Walk) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Seraj (Bashleo Pass Walk)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Seraj (Bashleo Pass Walk) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Seraj (Bashleo Pass Walk)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Seraj (Bashleo Pass Walk)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Seraj (Bashleo Pass Walk)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Seraj (Bashleo Pass Walk) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Seraj (Bashleo Pass Walk)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Seraj (Bashleo Pass Walk)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Seraj (Bashleo Pass Walk)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Outer Seraj; camp nights near Seraj at 2800 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Outer Seraj runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into shaded forest cover for most of the route on the climb toward Seraj at 2800 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Bashleo Pass Walk at 2800 m in first light",
      "Bashleo camp at dusk",
      "Seraj camp at dusk",
      "Outer Seraj approach and roadhead",
      "Seraj on the return leg"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Bashleo Pass Walk route out of Outer Seraj.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 10 km route from Outer Seraj—expect 3–5 hours of walking a day up to 2800 m.",
    "ams": "Low AMS risk at 2800 m near Seraj; hydrate well and ascend steadily from Outer Seraj.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Tirthan river angling points",
      "Jibhi cafes",
      "Chehni Kothi tower",
      "Great Himalayan National Park museum"
    ],
    "nearbyTreks": [
      "Tirath Trek GHNP",
      "Jibhi Waterfall Walk",
      "Shilt Thatch",
      "Lambri Peak"
    ],
    "budget": {
      "budget": "₹1,800–3,400",
      "standard": "₹4,400–7,200",
      "premium": "₹8,400–14,000"
    },
    "days": [
      {
        "title": "Day 1: Seraj village to Bashleo foot",
        "start": "Seraj (2,200 m)",
        "end": "Bashleo lower (2,600 m)",
        "distanceKm": "5",
        "altitudeM": "2600",
        "elevationGain": "+400 m",
        "trekTime": "3 hours",
        "terrain": "Village forest",
        "description": "Gentle cultural trek in Outer Seraj belt.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Bashleo",
        "campStay": "Trekker's camp at Bashleo lower (2,600 m)",
        "weather": "Humid under the forest canopy near Bashleo; showers can arrive with little warning",
        "photography": "Sunrise silhouettes at Bashleo: Village forest",
        "safety": "Check leeches at rest stops before Bashleo and carry salt or repellent in the monsoon window"
      },
      {
        "title": "Day 2: Bashleo ridge view return",
        "start": "Bashleo lower (2,600 m)",
        "end": "Seraj (2,200 m)",
        "distanceKm": "5",
        "altitudeM": "2200",
        "elevationGain": "Descent",
        "trekTime": "3 hours",
        "terrain": "Ridge",
        "description": "Viewpoint toward GHNP peaks then return.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Seraj",
        "campStay": "Trekker's camp at Seraj (2,200 m)",
        "weather": "Cool, damp air along the river near Seraj; carry rain protection regardless of forecast",
        "photography": "Late-afternoon panorama from Seraj: Ridge",
        "safety": "River levels near Seraj can rise quickly after rain—do not cross if water is above the knee"
      }
    ],
    "whyChoose": [
      "Distinct Bashleo Pass Walk scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Lower Bashleo pass cultural walk near Outer Seraj."
  },
  "lambri": {
    "key": "lambri",
    "name": "Lambri Peak Trek",
    "region": "tirthan",
    "location": "Lambri Peak Trek trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "Lambri Peak above Banjar has traditionally been climbed by local villagers as a lookout point over the Tirthan and Sarahan valleys, its open grassy top offering some of the best panoramic views in the outer Seraj region. It remains a lesser-known alternative to the busier GHNP routes.",
    "difficulty": "Moderate",
    "distanceKm": "12 km",
    "duration": "2 days",
    "highestAltitudeM": "3200",
    "baseCamp": "Banjar",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Lambri (Lambri Peak); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Lambri (Lambri Peak)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Lambri (Lambri Peak) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Lambri (Lambri Peak)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Lambri (Lambri Peak) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Lambri (Lambri Peak)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Lambri (Lambri Peak)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Lambri (Lambri Peak)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Lambri (Lambri Peak) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Lambri (Lambri Peak)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Lambri (Lambri Peak)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Lambri (Lambri Peak)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Banjar; camp nights near Lambri at 3200 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Banjar runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into open alpine meadow and scrub above the tree line on the climb toward Lambri at 3200 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Lambri Peak at 3200 m in first light",
      "Lambri camp at dusk",
      "Banjar approach and roadhead",
      "Lambri on the return leg"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Lambri Peak route out of Banjar.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Banjar runs 5–7 hours a day up to 3200 m.",
    "ams": "Mild AMS risk near 3200 m around Lambri; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chehni Kothi tower",
      "Great Himalayan National Park museum",
      "Gushaini riverside",
      "Nada village terraces"
    ],
    "nearbyTreks": [
      "Bashleo Pass Walk",
      "Great Himalayan National Park",
      "Raktisar GHNP",
      "Chehni Kothi"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Banjar to Lambri camp",
        "start": "Banjar (1,600 m)",
        "end": "Lambri camp (2,800 m)",
        "distanceKm": "6",
        "altitudeM": "2800",
        "elevationGain": "+1,200 m",
        "trekTime": "5 hours",
        "terrain": "Mixed forest",
        "description": "Climb from Banjar bazaar toward Lambri ridge camp.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Lambri",
        "campStay": "Trekker's camp at Lambri camp (2,800 m)",
        "weather": "Cool, damp air along the river near Lambri; carry rain protection regardless of forecast",
        "photography": "Late-afternoon panorama from Lambri: Mixed forest",
        "safety": "River levels near Lambri can rise quickly after rain—do not cross if water is above the knee"
      },
      {
        "title": "Day 2: Lambri summit day",
        "start": "Lambri camp (2,800 m)",
        "end": "Lambri top (3,200 m)",
        "distanceKm": "6",
        "altitudeM": "3200",
        "elevationGain": "+400 m",
        "trekTime": "4 hours",
        "terrain": "Open ridge",
        "description": "Summit for Tirthan valley panorama.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Lambri kitchen tent",
        "campStay": "Alpine tents at Lambri top (3,200 m)",
        "weather": "Humid under the forest canopy near Lambri; showers can arrive with little warning",
        "photography": "Best light at Lambri: Open ridge",
        "safety": "Check leeches at rest stops before Lambri and carry salt or repellent in the monsoon window"
      }
    ],
    "whyChoose": [
      "Distinct Lambri Peak Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Lambri summit above Banjar valley."
  },
  "chehni": {
    "key": "chehni",
    "name": "Chehni Kothi Trek",
    "region": "tirthan",
    "location": "Chehni Kothi Trek trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "Chehni Kothi, a five-storey stone-and-timber tower said by local accounts to be well over a thousand years old, is one of the tallest surviving traditional Kath-Kuni towers in the Tirthan valley and remains a village landmark of religious significance. The short walk from Jibhi to reach it passes through classic Himachali timber-and-slate village architecture.",
    "difficulty": "Easy",
    "distanceKm": "4 km",
    "duration": "1 day",
    "highestAltitudeM": "1800",
    "baseCamp": "Chehni village",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Shringa (Chehni Kothi); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Shringa (Chehni Kothi)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Shringa (Chehni Kothi) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Shringa (Chehni Kothi)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Shringa (Chehni Kothi) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Shringa (Chehni Kothi)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Shringa (Chehni Kothi)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Shringa (Chehni Kothi)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Shringa (Chehni Kothi) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Shringa (Chehni Kothi)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Shringa (Chehni Kothi)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Shringa (Chehni Kothi)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Chehni village; camp nights near Shringa at 1800 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Chehni village runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into shaded forest cover for most of the route on the climb toward Shringa at 1800 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Chehni Kothi at 1800 m in first light",
      "Chehni camp at dusk",
      "Shringa camp at dusk",
      "Chehni village approach and roadhead",
      "Shringa on the return leg"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Chehni Kothi route out of Chehni village.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 4 km route from Chehni village—expect 3–5 hours of walking a day up to 1800 m.",
    "ams": "Low AMS risk at 1800 m near Shringa; hydrate well and ascend steadily from Chehni village.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Gushaini riverside",
      "Nada village terraces",
      "Raju waterfall",
      "Sai Ropa camps"
    ],
    "nearbyTreks": [
      "Lambri Peak",
      "Rolla GHNP Base",
      "Tirath Trek GHNP",
      "Jibhi Waterfall Walk"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Jibhi road to Chehni kothi",
        "start": "Jibhi parking (1,700 m)",
        "end": "Chehni tower (1,800 m)",
        "distanceKm": "2",
        "altitudeM": "1800",
        "elevationGain": "+100 m",
        "trekTime": "1 hour",
        "terrain": "Village steps",
        "description": "Visit multi-storey wooden tower temple.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Chehni",
        "campStay": "Trekker's camp at Chehni tower (1,800 m)",
        "weather": "Humid under the forest canopy near Chehni; showers can arrive with little warning",
        "photography": "Best light at Chehni: Village steps",
        "safety": "Check leeches at rest stops before Chehni and carry salt or repellent in the monsoon window"
      },
      {
        "title": "Day 2: Chehni to Shringa Rishi trail",
        "start": "Chehni (1,800 m)",
        "end": "Shringa meadow (1,900 m)",
        "distanceKm": "2",
        "altitudeM": "1900",
        "elevationGain": "+100 m",
        "trekTime": "1 hour",
        "terrain": "Meadow",
        "description": "Extend to Shringa Rishi sacred grove.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Shringa",
        "campStay": "Trekker's camp at Shringa meadow (1,900 m)",
        "weather": "Cool, damp air along the river near Shringa; carry rain protection regardless of forecast",
        "photography": "A classic frame from Shringa: Meadow",
        "safety": "River levels near Shringa can rise quickly after rain—do not cross if water is above the knee"
      }
    ],
    "whyChoose": [
      "Distinct Chehni Kothi Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Short walk to ancient Chehni tower temple near Jibhi."
  },
  "jibhi-waterfall": {
    "key": "jibhi-waterfall",
    "name": "Jibhi Waterfall Walk",
    "region": "tirthan",
    "location": "Jibhi Waterfall Walk trailheads in Great Himalayan National Park buffer, Himachal Pradesh",
    "history": "The waterfall walk above Jibhi has become one of the most visited short trails in the Tirthan region as Jibhi itself has grown from a quiet village into a popular cafe town over the last decade. The trail still follows the same forest path villagers have used for generations to reach the stream above.",
    "difficulty": "Easy",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "2100",
    "baseCamp": "Jibhi",
    "nearestRail": "Joginder Nagar / Chandigarh",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Aut-Banjar-Gushaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow at the higher points near Jibhi (Jibhi Waterfall Walk); the lower forest stays cold and quiet"
      },
      {
        "month": "February",
        "note": "Cold mornings, clearer midday light through the forest at Jibhi (Jibhi Waterfall Walk)"
      },
      {
        "month": "March",
        "note": "Forest floor dries out and streams near Jibhi (Jibhi Waterfall Walk) run clear and cold"
      },
      {
        "month": "April",
        "note": "Warm days and blooming forest along the trail to Jibhi (Jibhi Waterfall Walk)"
      },
      {
        "month": "May",
        "note": "Best pre-monsoon window; river levels near Jibhi (Jibhi Waterfall Walk) still manageable"
      },
      {
        "month": "June",
        "note": "Rising humidity ahead of the monsoon break over Jibhi (Jibhi Waterfall Walk)"
      },
      {
        "month": "July",
        "note": "Heavy rain, leeches and swollen streams near Jibhi (Jibhi Waterfall Walk)—go prepared"
      },
      {
        "month": "August",
        "note": "Peak monsoon; landslide risk on the approach road to Jibhi (Jibhi Waterfall Walk)"
      },
      {
        "month": "September",
        "note": "Rain tapers off; the forest around Jibhi (Jibhi Waterfall Walk) is at its greenest"
      },
      {
        "month": "October",
        "note": "Best autumn clarity and safe river crossings near Jibhi (Jibhi Waterfall Walk)"
      },
      {
        "month": "November",
        "note": "Cold, dry and still; a quiet season on the trail to Jibhi (Jibhi Waterfall Walk)"
      },
      {
        "month": "December",
        "note": "Light snow possible at the higher points above Jibhi (Jibhi Waterfall Walk)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Jibhi; camp nights near Jibhi at 2100 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Jibhi runs through dense deodar, oak and moss-covered fir inside Great Himalayan National Park, thinning into shaded forest cover for most of the route on the climb toward Jibhi at 2100 m. Keep an eye out for western tragopan, musk deer and black bear inside the national park buffer.",
    "photographySpots": [
      "Jibhi Waterfall Walk at 2100 m in first light",
      "Upper camp at dusk",
      "Jibhi camp at dusk",
      "Jibhi approach and roadhead",
      "Jibhi on the return leg"
    ],
    "network": "Coverage in Gushaini/Banjar; none once inside the national park zone",
    "electricity": "Available at homestays in Gushaini/Nada; none at park camps",
    "atm": "ATMs in Banjar and Aut",
    "medical": "Basic aid in Gushaini; Kullu hospital for serious cases",
    "camping": "Forest rest houses inside GHNP booked through the park office; homestays outside the park",
    "permits": "Great Himalayan National Park entry permit booked through the park office at Sai Ropa/Gushaini for the Jibhi Waterfall Walk route out of Jibhi.",
    "forestFees": "GHNP entry and camping fee payable per person per day",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Leech socks or salt for the forest sections",
      "Dry bags for electronics in sudden rain",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 6 km route from Jibhi—expect 3–5 hours of walking a day up to 2100 m.",
    "ams": "Low AMS risk at 2100 m near Jibhi; hydrate well and ascend steadily from Jibhi.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Raju waterfall",
      "Sai Ropa camps",
      "Tirthan river angling points",
      "Jibhi cafes"
    ],
    "nearbyTreks": [
      "Chehni Kothi",
      "Shilt Thatch",
      "Bashleo Pass Walk",
      "Great Himalayan National Park"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Jibhi to hidden waterfall",
        "start": "Jibhi (1,700 m)",
        "end": "Upper waterfall (2,100 m)",
        "distanceKm": "3",
        "altitudeM": "2100",
        "elevationGain": "+400 m",
        "trekTime": "2 hours",
        "terrain": "Cedar forest",
        "description": "Mossy trail to cascade pools near Jibhi.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Upper",
        "campStay": "Trekker's camp at Upper waterfall (2,100 m)",
        "weather": "Cool, damp air along the river near Upper; carry rain protection regardless of forecast",
        "photography": "A classic frame from Upper: Cedar forest",
        "safety": "River levels near Upper can rise quickly after rain—do not cross if water is above the knee"
      },
      {
        "title": "Day 2: Waterfall to Jalori road link",
        "start": "Upper waterfall (2,100 m)",
        "end": "Jibhi market (1,700 m)",
        "distanceKm": "3",
        "altitudeM": "1700",
        "elevationGain": "Descent",
        "trekTime": "1.5 hours",
        "terrain": "Forest",
        "description": "Loop back for cafe stop in Jibhi.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Jibhi",
        "campStay": "Hotel/guesthouse at Jibhi market (1,700 m)",
        "weather": "Humid under the forest canopy near Jibhi; showers can arrive with little warning",
        "photography": "Golden-hour views near Jibhi: Forest",
        "safety": "Check leeches at rest stops before Jibhi and carry salt or repellent in the monsoon window"
      }
    ],
    "whyChoose": [
      "Distinct Jibhi Waterfall Walk scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Forest waterfall circuit above Jibhi homestays."
  },
  "sach-pass": {
    "key": "sach-pass",
    "name": "Sach Pass Trek",
    "region": "dalhousie",
    "location": "Sach Pass Trek trailheads in Chamba district, Himachal Pradesh",
    "history": "Sach Pass has historically been the vital summer link between Chamba and the remote Pangi valley, closed by snow for up to eight months a year and reopened each summer by border roads organisation crews. Villagers in Pangi still depend on this pass for their only road connection to the rest of Himachal.",
    "difficulty": "Challenging",
    "distanceKm": "35 km",
    "duration": "4-5 days",
    "highestAltitudeM": "4420",
    "baseCamp": "Bairagarh / Trailhead",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Sach (Sach Pass) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Sach (Sach Pass); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Sach (Sach Pass)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Sach (Sach Pass) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Sach (Sach Pass); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Sach (Sach Pass) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Sach (Sach Pass)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Sach (Sach Pass)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Sach (Sach Pass)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Sach (Sach Pass) for the season"
      },
      {
        "month": "November",
        "note": "Sach (Sach Pass) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Sach (Sach Pass) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Bairagarh / Trailhead; camp nights near Pangi at 4420 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Bairagarh / Trailhead runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Pangi at 4420 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Sach Pass at 4420 m in first light",
      "Bindrabani camp at dusk",
      "Sach camp at dusk",
      "Pangi camp at dusk",
      "Bairagarh / Trailhead approach and roadhead"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Sach Pass route out of Bairagarh / Trailhead.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 4-5 days route from Bairagarh / Trailhead tops out near 4420 m.",
    "ams": "Real AMS risk above 4420 m on the approach to Pangi; build in an acclimatisation stop and know the descent plan back to Bairagarh / Trailhead.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Khajjiar meadow (\"Mini Switzerland\")",
      "Dainkund Peak",
      "Kalatop wildlife sanctuary",
      "Chamba Bhuri Singh Museum"
    ],
    "nearbyTreks": [
      "Kalatop Wildlife Sanctuary",
      "Kugti Pass / Kugti Sanctuary",
      "Chobia Pass",
      "Dainkund Peak"
    ],
    "budget": {
      "budget": "₹9,000–17,000",
      "standard": "₹22,000–36,000",
      "premium": "₹42,000–70,000"
    },
    "days": [
      {
        "title": "Day 1: Trailhead to Bindrabani",
        "start": "Bairagarh (2,400 m)",
        "end": "Bindrabani (3,000 m)",
        "distanceKm": "10",
        "altitudeM": "3000",
        "elevationGain": "+600 m",
        "trekTime": "5 hours",
        "terrain": "Forest",
        "description": "Approach climb toward Sach Pass roadless section.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Bindrabani kitchen tent",
        "campStay": "Alpine tents at Bindrabani (3,000 m)",
        "weather": "Alpine chill near Bindrabani even in summer; wind picks up sharply by late afternoon",
        "photography": "Golden-hour views near Bindrabani: Forest",
        "safety": "Loose rock and old snow bridges near Bindrabani need careful, roped crossing if advised by your guide"
      },
      {
        "title": "Day 2: Bindrabani to Sach Pass",
        "start": "Bindrabani (3,000 m)",
        "end": "Sach Pass (4,420 m)",
        "distanceKm": "12",
        "altitudeM": "4420",
        "elevationGain": "+1,420 m",
        "trekTime": "7 hours",
        "terrain": "Snow and scree",
        "description": "High pass day with Pangi valley views north.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Sach",
        "campStay": "Alpine tents at Sach Pass (4,420 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Sach; move before the cloud build-up",
        "photography": "Wide-angle vantage at Sach: Snow and scree",
        "safety": "Watch for AMS symptoms near Sach; descend if headache or nausea persists"
      },
      {
        "title": "Day 3: Descent to Killar side",
        "start": "Sach Pass (4,420 m)",
        "end": "Pangi camp (2,800 m)",
        "distanceKm": "14",
        "altitudeM": "2800",
        "elevationGain": "Descent",
        "trekTime": "6 hours",
        "terrain": "Steep gorge",
        "description": "Long descent into Pangi or return loop to Chamba.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Pangi",
        "campStay": "Trekker's camp at Pangi camp (2,800 m)",
        "weather": "Alpine chill near Pangi even in summer; wind picks up sharply by late afternoon",
        "photography": "Sunrise silhouettes at Pangi: Steep gorge",
        "safety": "Loose rock and old snow bridges near Pangi need careful, roped crossing if advised by your guide"
      }
    ],
    "whyChoose": [
      "Distinct Sach Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Cross Sach Pass linking Chamba with Pangi."
  },
  "kalatop": {
    "key": "kalatop",
    "name": "Kalatop Wildlife Sanctuary Trek",
    "region": "dalhousie",
    "location": "Kalatop Wildlife Sanctuary Trek trailheads in Chamba district, Himachal Pradesh",
    "history": "Kalatop Wildlife Sanctuary has protected this dense cedar forest above Dalhousie since the colonial era, when the area was used as a hunting and forestry reserve before it was formally notified as a sanctuary. Its old forest rest house still marks the traditional route toward Khajjiar.",
    "difficulty": "Easy",
    "distanceKm": "8 km",
    "duration": "1 day",
    "highestAltitudeM": "2440",
    "baseCamp": "Kalatop gate",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Khajjiar (Kalatop Wildlife Sanctuary) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Khajjiar (Kalatop Wildlife Sanctuary); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Khajjiar (Kalatop Wildlife Sanctuary)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Khajjiar (Kalatop Wildlife Sanctuary) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Khajjiar (Kalatop Wildlife Sanctuary); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Khajjiar (Kalatop Wildlife Sanctuary) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Khajjiar (Kalatop Wildlife Sanctuary)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Khajjiar (Kalatop Wildlife Sanctuary)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Khajjiar (Kalatop Wildlife Sanctuary)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Khajjiar (Kalatop Wildlife Sanctuary) for the season"
      },
      {
        "month": "November",
        "note": "Khajjiar (Kalatop Wildlife Sanctuary) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Khajjiar (Kalatop Wildlife Sanctuary) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kalatop gate; camp nights near Khajjiar at 2440 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Kalatop gate runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into shaded forest cover for most of the route on the climb toward Khajjiar at 2440 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Kalatop Wildlife Sanctuary at 2440 m in first light",
      "Kalatop camp at dusk",
      "Khajjiar camp at dusk",
      "Kalatop gate approach and roadhead",
      "Khajjiar on the return leg"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Kalatop Wildlife Sanctuary route out of Kalatop gate.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 8 km route from Kalatop gate—expect 3–5 hours of walking a day up to 2440 m.",
    "ams": "Low AMS risk at 2440 m near Khajjiar; hydrate well and ascend steadily from Kalatop gate.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kalatop wildlife sanctuary",
      "Chamba Bhuri Singh Museum",
      "Panchpula",
      "Bharmour temples"
    ],
    "nearbyTreks": [
      "Dainkund Peak",
      "Manimahesh Yatra",
      "Bairagarh Sach Approach",
      "Khajjiar Lake Loop"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Kalatop gate to Kalatop rest house",
        "start": "Kalatop entry (2,000 m)",
        "end": "Kalatop (2,440 m)",
        "distanceKm": "4",
        "altitudeM": "2440",
        "elevationGain": "+440 m",
        "trekTime": "2-3 hours",
        "terrain": "Deodar forest",
        "description": "Sanctuary walk with black bear habitat awareness.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Kalatop",
        "campStay": "Trekker's camp at Kalatop (2,440 m)",
        "weather": "Clear mornings near Kalatop give way to building cloud on the pass by midday",
        "photography": "Wide-angle vantage at Kalatop: Deodar forest",
        "safety": "Weather on the pass above Kalatop can change within the hour—carry a hard shell at all times"
      },
      {
        "title": "Day 2: Kalatop to Khajjiar meadow link",
        "start": "Kalatop (2,440 m)",
        "end": "Khajjiar (1,920 m)",
        "distanceKm": "6",
        "altitudeM": "1920",
        "elevationGain": "Descent",
        "trekTime": "3 hours",
        "terrain": "Meadow descent",
        "description": "Link down toward Khajjiar golf meadow.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Khajjiar",
        "campStay": "Trekker's camp at Khajjiar (1,920 m)",
        "weather": "Alpine chill near Khajjiar even in summer; wind picks up sharply by late afternoon",
        "photography": "Sunrise silhouettes at Khajjiar: Meadow descent",
        "safety": "Loose rock and old snow bridges near Khajjiar need careful, roped crossing if advised by your guide"
      }
    ],
    "whyChoose": [
      "Distinct Kalatop Wildlife Sanctuary Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Deodar sanctuary trails above Dalhousie."
  },
  "dainkund": {
    "key": "dainkund",
    "name": "Dainkund Peak Trek",
    "region": "dalhousie",
    "location": "Dainkund Peak Trek trailheads in Chamba district, Himachal Pradesh",
    "history": "Dainkund Peak, the highest point near Dalhousie, has long been used as a lookout by the Indian Air Force station located nearby, and its position lets you hear both the Ravi and Chenab river systems on either side on a clear day. Locals often call it the 'peak of two sounds' for this reason.",
    "difficulty": "Easy",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "2755",
    "baseCamp": "Dalhousie Air Force base road",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Jot (Dainkund Peak) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Jot (Dainkund Peak); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Jot (Dainkund Peak)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Jot (Dainkund Peak) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Jot (Dainkund Peak); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Jot (Dainkund Peak) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Jot (Dainkund Peak)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Jot (Dainkund Peak)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Jot (Dainkund Peak)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Jot (Dainkund Peak) for the season"
      },
      {
        "month": "November",
        "note": "Jot (Dainkund Peak) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Jot (Dainkund Peak) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Dalhousie Air Force base road; camp nights near Jot at 2755 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Dalhousie Air Force base road runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into shaded forest cover for most of the route on the climb toward Jot at 2755 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Dainkund Peak at 2755 m in first light",
      "Dainkund camp at dusk",
      "Jot camp at dusk",
      "Dalhousie Air Force base road approach and roadhead",
      "Jot on the return leg"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Dainkund Peak route out of Dalhousie Air Force base road.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 6 km route from Dalhousie Air Force base road—expect 3–5 hours of walking a day up to 2755 m.",
    "ams": "Low AMS risk at 2755 m near Jot; hydrate well and ascend steadily from Dalhousie Air Force base road.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Panchpula",
      "Bharmour temples",
      "Sach Pass viewpoint",
      "Chamera Lake"
    ],
    "nearbyTreks": [
      "Khajjiar Lake Loop",
      "Manimahesh Lake Alpine Camp",
      "Sach Pass",
      "Kugti Pass / Kugti Sanctuary"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Airforce gate to Dainkund peak",
        "start": "Parking (2,400 m)",
        "end": "Dainkund (2,755 m)",
        "distanceKm": "3",
        "altitudeM": "2755",
        "elevationGain": "+355 m",
        "trekTime": "1-2 hours",
        "terrain": "Paved and trail mix",
        "description": "Easy peak walk with Pir Panjal views.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Dainkund",
        "campStay": "Trekker's camp at Dainkund (2,755 m)",
        "weather": "Alpine chill near Dainkund even in summer; wind picks up sharply by late afternoon",
        "photography": "Sunrise silhouettes at Dainkund: Paved and trail mix",
        "safety": "Loose rock and old snow bridges near Dainkund need careful, roped crossing if advised by your guide"
      },
      {
        "title": "Day 2: Dainkund to Jot pass viewpoint",
        "start": "Dainkund (2,755 m)",
        "end": "Jot viewpoint (2,700 m)",
        "distanceKm": "3",
        "altitudeM": "2700",
        "elevationGain": "Rolling",
        "trekTime": "1 hour",
        "terrain": "Ridge",
        "description": "Short ridge stroll before return to Dalhousie.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Jot",
        "campStay": "Trekker's camp at Jot viewpoint (2,700 m)",
        "weather": "Clear mornings near Jot give way to building cloud on the pass by midday",
        "photography": "Late-afternoon panorama from Jot: Ridge",
        "safety": "Weather on the pass above Jot can change within the hour—carry a hard shell at all times"
      }
    ],
    "whyChoose": [
      "Distinct Dainkund Peak Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Walk to Dainkund peak and Pholani Devi temple."
  },
  "khajjiar": {
    "key": "khajjiar",
    "name": "Khajjiar Lake Loop Trek",
    "region": "dalhousie",
    "location": "Khajjiar Lake Loop Trek trailheads in Chamba district, Himachal Pradesh",
    "history": "Khajjiar's saucer-shaped meadow, ringed by cedar forest, has been compared to alpine Switzerland since colonial times and remains anchored by the centuries-old Khajji Nag temple at its centre. The gentle loop trails around the meadow have long been used by local shepherds and pilgrims visiting the temple.",
    "difficulty": "Easy",
    "distanceKm": "5 km",
    "duration": "1 day",
    "highestAltitudeM": "1920",
    "baseCamp": "Khajjiar meadow",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Panchpula (Khajjiar Lake Loop) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Panchpula (Khajjiar Lake Loop); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Panchpula (Khajjiar Lake Loop)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Panchpula (Khajjiar Lake Loop) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Panchpula (Khajjiar Lake Loop); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Panchpula (Khajjiar Lake Loop) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Panchpula (Khajjiar Lake Loop)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Panchpula (Khajjiar Lake Loop)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Panchpula (Khajjiar Lake Loop)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Panchpula (Khajjiar Lake Loop) for the season"
      },
      {
        "month": "November",
        "note": "Panchpula (Khajjiar Lake Loop) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Panchpula (Khajjiar Lake Loop) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Khajjiar meadow; camp nights near Panchpula at 1920 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Khajjiar meadow runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into shaded forest cover for most of the route on the climb toward Panchpula at 1920 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Khajjiar Lake Loop at 1920 m in first light",
      "Khajjiar camp at dusk",
      "Panchpula camp at dusk",
      "Khajjiar meadow approach and roadhead",
      "Panchpula on the return leg"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Khajjiar Lake Loop route out of Khajjiar meadow.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 5 km route from Khajjiar meadow—expect 3–5 hours of walking a day up to 1920 m.",
    "ams": "Low AMS risk at 1920 m near Panchpula; hydrate well and ascend steadily from Khajjiar meadow.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Sach Pass viewpoint",
      "Chamera Lake",
      "Khajjiar meadow (\"Mini Switzerland\")",
      "Dainkund Peak"
    ],
    "nearbyTreks": [
      "Kugti Pass / Kugti Sanctuary",
      "Chobia Pass",
      "Kalatop Wildlife Sanctuary",
      "Manimahesh Yatra"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Khajjiar lake circuit",
        "start": "Khajjiar (1,920 m)",
        "end": "Khajjiar pine belt (1,950 m)",
        "distanceKm": "3",
        "altitudeM": "1950",
        "elevationGain": "Gentle",
        "trekTime": "1 hour",
        "terrain": "Meadow",
        "description": "Circumambulate meadow and mini lake.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Khajjiar",
        "campStay": "Trekker's camp at Khajjiar pine belt (1,950 m)",
        "weather": "Clear mornings near Khajjiar give way to building cloud on the pass by midday",
        "photography": "Late-afternoon panorama from Khajjiar: Meadow",
        "safety": "Weather on the pass above Khajjiar can change within the hour—carry a hard shell at all times"
      },
      {
        "title": "Day 2: Khajjiar to Panchpula extension",
        "start": "Khajjiar (1,920 m)",
        "end": "Panchpula streams (2,000 m)",
        "distanceKm": "5",
        "altitudeM": "2000",
        "elevationGain": "+80 m",
        "trekTime": "2 hours",
        "terrain": "Forest road",
        "description": "Optional extension toward Panchpula waterfalls.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Panchpula",
        "campStay": "Trekker's camp at Panchpula streams (2,000 m)",
        "weather": "Alpine chill near Panchpula even in summer; wind picks up sharply by late afternoon",
        "photography": "Best light at Panchpula: Forest road",
        "safety": "Loose rock and old snow bridges near Panchpula need careful, roped crossing if advised by your guide"
      }
    ],
    "whyChoose": [
      "Distinct Khajjiar Lake Loop Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Walk around Khajjiar bowl and Kalatop extension."
  },
  "kugti": {
    "key": "kugti",
    "name": "Kugti Pass / Kugti Sanctuary Trek",
    "region": "dalhousie",
    "location": "Kugti Pass / Kugti Sanctuary Trek trailheads in Chamba district, Himachal Pradesh",
    "history": "Kugti Pass has for centuries been the traditional migration route of the Gaddi shepherd community, who move their sheep and goat flocks between Bharmour and Lahaul each summer along this exact trail. The pass and its surrounding wildlife sanctuary are named after Kugti village, the last permanent settlement before the climb.",
    "difficulty": "Challenging",
    "distanceKm": "50 km",
    "duration": "6-7 days",
    "highestAltitudeM": "5040",
    "baseCamp": "Harsar / Bharmour",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Dalotu (Kugti Pass / Kugti Sanctuary) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Dalotu (Kugti Pass / Kugti Sanctuary); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Dalotu (Kugti Pass / Kugti Sanctuary)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Dalotu (Kugti Pass / Kugti Sanctuary) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Dalotu (Kugti Pass / Kugti Sanctuary); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Dalotu (Kugti Pass / Kugti Sanctuary) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Dalotu (Kugti Pass / Kugti Sanctuary)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Dalotu (Kugti Pass / Kugti Sanctuary)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Dalotu (Kugti Pass / Kugti Sanctuary)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Dalotu (Kugti Pass / Kugti Sanctuary) for the season"
      },
      {
        "month": "November",
        "note": "Dalotu (Kugti Pass / Kugti Sanctuary) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Dalotu (Kugti Pass / Kugti Sanctuary) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Harsar / Bharmour; camp nights near Lahaul at 5040 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Harsar / Bharmour runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Lahaul at 5040 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Kugti Pass / Kugti Sanctuary at 5040 m in first light",
      "Harsar camp at dusk",
      "Kugti camp at dusk",
      "Dalotu camp at dusk",
      "Harsar / Bharmour approach and roadhead"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Kugti Pass / Kugti Sanctuary route out of Harsar / Bharmour.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 6-7 days route from Harsar / Bharmour tops out near 5040 m.",
    "ams": "Significant AMS risk at 5040 m near Lahaul; acclimatise carefully on the way up from Harsar / Bharmour, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Khajjiar meadow (\"Mini Switzerland\")",
      "Dainkund Peak",
      "Kalatop wildlife sanctuary",
      "Chamba Bhuri Singh Museum"
    ],
    "nearbyTreks": [
      "Manimahesh Yatra",
      "Bairagarh Sach Approach",
      "Dainkund Peak",
      "Manimahesh Lake Alpine Camp"
    ],
    "budget": {
      "budget": "₹13,500–25,500",
      "standard": "₹33,000–54,000",
      "premium": "₹63,000–1,05,000"
    },
    "days": [
      {
        "title": "Day 1: Bharmour to Harsar",
        "start": "Bharmour (2,200 m)",
        "end": "Harsar (2,600 m)",
        "distanceKm": "8",
        "altitudeM": "2600",
        "elevationGain": "+400 m",
        "trekTime": "4 hours",
        "terrain": "Village trail",
        "description": "Stage toward Kugti sanctuary gate.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Harsar",
        "campStay": "Trekker's camp at Harsar (2,600 m)",
        "weather": "Alpine chill near Harsar even in summer; wind picks up sharply by late afternoon",
        "photography": "Best light at Harsar: Village trail",
        "safety": "Loose rock and old snow bridges near Harsar need careful, roped crossing if advised by your guide"
      },
      {
        "title": "Day 2: Harsar to Kugti village",
        "start": "Harsar (2,600 m)",
        "end": "Kugti (3,100 m)",
        "distanceKm": "10",
        "altitudeM": "3100",
        "elevationGain": "+500 m",
        "trekTime": "5 hours",
        "terrain": "Forest valley",
        "description": "Enter Kugti nalla deep forest.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Kugti",
        "campStay": "Alpine tents at Kugti (3,100 m)",
        "weather": "Clear mornings near Kugti give way to building cloud on the pass by midday",
        "photography": "A classic frame from Kugti: Forest valley",
        "safety": "Weather on the pass above Kugti can change within the hour—carry a hard shell at all times"
      },
      {
        "title": "Day 3: Kugti to Dalotu base",
        "start": "Kugti (3,100 m)",
        "end": "Dalotu camp (3,800 m)",
        "distanceKm": "8",
        "altitudeM": "3800",
        "elevationGain": "+700 m",
        "trekTime": "5 hours",
        "terrain": "Alpine",
        "description": "Camp below Kugti Pass glaciers.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Dalotu kitchen tent",
        "campStay": "Alpine tents at Dalotu camp (3,800 m)",
        "weather": "Alpine chill near Dalotu even in summer; wind picks up sharply by late afternoon",
        "photography": "Golden-hour views near Dalotu: Alpine",
        "safety": "Loose rock and old snow bridges near Dalotu need careful, roped crossing if advised by your guide"
      },
      {
        "title": "Day 4: Cross Kugti Pass",
        "start": "Dalotu (3,800 m)",
        "end": "Lahaul side camp (4,000 m)",
        "distanceKm": "12",
        "altitudeM": "5040",
        "elevationGain": "Pass",
        "trekTime": "8 hours",
        "terrain": "Pass snow",
        "description": "Cross Kugti Pass into Lahaul drainage.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Lahaul",
        "campStay": "Alpine tents at Lahaul side camp (4,000 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Lahaul; move before the cloud build-up",
        "photography": "Wide-angle vantage at Lahaul: Pass snow",
        "safety": "Watch for AMS symptoms near Lahaul; descend if headache or nausea persists"
      }
    ],
    "whyChoose": [
      "Distinct Kugti Pass / Kugti Sanctuary Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Kugti village to Kugti Pass and Lahual connection."
  },
  "manimahesh": {
    "key": "manimahesh",
    "name": "Manimahesh Yatra Trek",
    "region": "dalhousie",
    "location": "Manimahesh Yatra Trek trailheads in Chamba district, Himachal Pradesh",
    "history": "Manimahesh Lake is one of Himachal's most sacred pilgrimage sites, believed to reflect Shiva's crown jewel ('mani') on the face of the Kailash-like peak above it, and draws tens of thousands of pilgrims each August-September during the Manimahesh Yatra. Hadsar has served as the traditional yatra base for generations of pilgrims from Bharmour.",
    "difficulty": "Moderate",
    "distanceKm": "14 km",
    "duration": "2-3 days",
    "highestAltitudeM": "4080",
    "baseCamp": "Hadsar",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Manimahesh (Manimahesh Yatra) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Manimahesh (Manimahesh Yatra); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Manimahesh (Manimahesh Yatra)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Manimahesh (Manimahesh Yatra) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Manimahesh (Manimahesh Yatra); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Manimahesh (Manimahesh Yatra) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Manimahesh (Manimahesh Yatra)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Manimahesh (Manimahesh Yatra)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Manimahesh (Manimahesh Yatra)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Manimahesh (Manimahesh Yatra) for the season"
      },
      {
        "month": "November",
        "note": "Manimahesh (Manimahesh Yatra) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Manimahesh (Manimahesh Yatra) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Hadsar; camp nights near Hadsar at 4080 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Hadsar runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Hadsar at 4080 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Manimahesh Yatra at 4080 m in first light",
      "Dhancho camp at dusk",
      "Manimahesh camp at dusk",
      "Hadsar camp at dusk",
      "Hadsar approach and roadhead"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Manimahesh Yatra route out of Hadsar.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2-3 days route from Hadsar runs 5–7 hours a day up to 4080 m.",
    "ams": "Real AMS risk above 4080 m on the approach to Hadsar; build in an acclimatisation stop and know the descent plan back to Hadsar.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kalatop wildlife sanctuary",
      "Chamba Bhuri Singh Museum",
      "Panchpula",
      "Bharmour temples"
    ],
    "nearbyTreks": [
      "Manimahesh Lake Alpine Camp",
      "Sach Pass",
      "Khajjiar Lake Loop",
      "Chobia Pass"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Hadsar to Dhancho",
        "start": "Hadsar (2,200 m)",
        "end": "Dhancho (2,800 m)",
        "distanceKm": "6",
        "altitudeM": "2800",
        "elevationGain": "+600 m",
        "trekTime": "3-4 hours",
        "terrain": "Waterfall gorge",
        "description": "Follow Manimahesh nallah to Dhancho waterfall camp.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Dhancho",
        "campStay": "Trekker's camp at Dhancho (2,800 m)",
        "weather": "Clear mornings near Dhancho give way to building cloud on the pass by midday",
        "photography": "A classic frame from Dhancho: Waterfall gorge",
        "safety": "Weather on the pass above Dhancho can change within the hour—carry a hard shell at all times"
      },
      {
        "title": "Day 2: Dhancho to Manimahesh Lake",
        "start": "Dhancho (2,800 m)",
        "end": "Manimahesh Lake (4,080 m)",
        "distanceKm": "8",
        "altitudeM": "4080",
        "elevationGain": "+1,280 m",
        "trekTime": "6-7 hours",
        "terrain": "Steep alpine",
        "description": "Sacred lake beneath Manimahesh Kailash peak.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Manimahesh",
        "campStay": "Alpine tents at Manimahesh Lake (4,080 m)",
        "weather": "Clear early morning skies near Manimahesh usually cloud over by early afternoon",
        "photography": "Golden-hour views near Manimahesh: Steep alpine",
        "safety": "Snow or ice patches possible near Manimahesh; use microspikes and short, steady steps"
      },
      {
        "title": "Day 3: Lake to Hadsar return",
        "start": "Manimahesh Lake (4,080 m)",
        "end": "Hadsar (2,200 m)",
        "distanceKm": "14",
        "altitudeM": "2200",
        "elevationGain": "Descent",
        "trekTime": "6 hours",
        "terrain": "Same gorge",
        "description": "Pilgrims descend after holy dip at lake.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Hadsar",
        "campStay": "Trekker's camp at Hadsar (2,200 m)",
        "weather": "Clear mornings near Hadsar give way to building cloud on the pass by midday",
        "photography": "Wide-angle vantage at Hadsar: Same gorge",
        "safety": "Weather on the pass above Hadsar can change within the hour—carry a hard shell at all times"
      }
    ],
    "whyChoose": [
      "Distinct Manimahesh Yatra Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Pilgrimage trek to Manimahesh Lake from Hadsar."
  },
  "manimahesh-lake": {
    "key": "manimahesh-lake",
    "name": "Manimahesh Lake Alpine Camp",
    "region": "dalhousie",
    "location": "Manimahesh Lake Alpine Camp trailheads in Chamba district, Himachal Pradesh",
    "history": "This higher-starting route to Manimahesh Lake from Gauri Kund is used by pilgrims and trekkers looking to reach the sacred lake with a shorter, more direct climb than the full Hadsar yatra trail. It follows the same final approach used by yatris during the peak pilgrimage season.",
    "difficulty": "Moderate",
    "distanceKm": "10 km",
    "duration": "2 days",
    "highestAltitudeM": "4080",
    "baseCamp": "Gauri Kund",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Dhancho (Manimahesh Lake Alpine Camp) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Dhancho (Manimahesh Lake Alpine Camp); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Dhancho (Manimahesh Lake Alpine Camp)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Dhancho (Manimahesh Lake Alpine Camp) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Dhancho (Manimahesh Lake Alpine Camp); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Dhancho (Manimahesh Lake Alpine Camp) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Dhancho (Manimahesh Lake Alpine Camp)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Dhancho (Manimahesh Lake Alpine Camp)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Dhancho (Manimahesh Lake Alpine Camp)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Dhancho (Manimahesh Lake Alpine Camp) for the season"
      },
      {
        "month": "November",
        "note": "Dhancho (Manimahesh Lake Alpine Camp) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Dhancho (Manimahesh Lake Alpine Camp) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Gauri Kund; camp nights near Dhancho at 4080 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Gauri Kund runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Dhancho at 4080 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Manimahesh Lake Alpine Camp at 4080 m in first light",
      "Manimahesh camp at dusk",
      "Dhancho camp at dusk",
      "Gauri Kund approach and roadhead",
      "Dhancho on the return leg"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Manimahesh Lake Alpine Camp route out of Gauri Kund.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Gauri Kund runs 5–7 hours a day up to 4080 m.",
    "ams": "Real AMS risk above 4080 m on the approach to Dhancho; build in an acclimatisation stop and know the descent plan back to Gauri Kund.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Panchpula",
      "Bharmour temples",
      "Sach Pass viewpoint",
      "Chamera Lake"
    ],
    "nearbyTreks": [
      "Chobia Pass",
      "Kalatop Wildlife Sanctuary",
      "Kugti Pass / Kugti Sanctuary",
      "Bairagarh Sach Approach"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Gauri Kund to Manimahesh Lake",
        "start": "Gauri Kund (3,500 m)",
        "end": "Manimahesh Lake (4,080 m)",
        "distanceKm": "5",
        "altitudeM": "4080",
        "elevationGain": "+580 m",
        "trekTime": "3-4 hours",
        "terrain": "High trail",
        "description": "Direct push from Gauri Kund to lake and back same day if acclimatised.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Manimahesh",
        "campStay": "Alpine tents at Manimahesh Lake (4,080 m)",
        "weather": "Clear early morning skies near Manimahesh usually cloud over by early afternoon",
        "photography": "Golden-hour views near Manimahesh: High trail",
        "safety": "Snow or ice patches possible near Manimahesh; use microspikes and short, steady steps"
      },
      {
        "title": "Day 2: Rest day at Dhancho",
        "start": "Manimahesh Lake (4,080 m)",
        "end": "Dhancho (2,800 m)",
        "distanceKm": "5",
        "altitudeM": "2800",
        "elevationGain": "Descent",
        "trekTime": "3 hours",
        "terrain": "Gorge",
        "description": "Recovery descent to Dhancho meadows.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Dhancho",
        "campStay": "Trekker's camp at Dhancho (2,800 m)",
        "weather": "Clear mornings near Dhancho give way to building cloud on the pass by midday",
        "photography": "Wide-angle vantage at Dhancho: Gorge",
        "safety": "Weather on the pass above Dhancho can change within the hour—carry a hard shell at all times"
      }
    ],
    "whyChoose": [
      "Distinct Manimahesh Lake Alpine Camp scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Shorter staging from Gauri Kund to lake for fit trekkers."
  },
  "chobia": {
    "key": "chobia",
    "name": "Chobia Pass Trek",
    "region": "dalhousie",
    "location": "Chobia Pass Trek trailheads in Chamba district, Himachal Pradesh",
    "history": "Chobia Pass has long connected Bharmour's Gaddi shepherd communities with the Chamba-Lahaul side of the range, used as an alternative to the more heavily trekked Kugti Pass. Its more technical snow sections have kept it a quieter, less commercialised crossing.",
    "difficulty": "Challenging",
    "distanceKm": "45 km",
    "duration": "6 days",
    "highestAltitudeM": "4966",
    "baseCamp": "Bharmour",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Chobia (Chobia Pass) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Chobia (Chobia Pass); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Chobia (Chobia Pass)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Chobia (Chobia Pass) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Chobia (Chobia Pass); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Chobia (Chobia Pass) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Chobia (Chobia Pass)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Chobia (Chobia Pass)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Chobia (Chobia Pass)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Chobia (Chobia Pass) for the season"
      },
      {
        "month": "November",
        "note": "Chobia (Chobia Pass) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Chobia (Chobia Pass) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Bharmour; camp nights near Far at 4966 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Bharmour runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Far at 4966 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Chobia Pass at 4966 m in first light",
      "Keylong camp at dusk",
      "Chobia camp at dusk",
      "Far camp at dusk",
      "Bharmour approach and roadhead"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Chobia Pass route out of Bharmour.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 6 days route from Bharmour tops out near 4966 m.",
    "ams": "Significant AMS risk at 4966 m near Far; acclimatise carefully on the way up from Bharmour, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Sach Pass viewpoint",
      "Chamera Lake",
      "Khajjiar meadow (\"Mini Switzerland\")",
      "Dainkund Peak"
    ],
    "nearbyTreks": [
      "Bairagarh Sach Approach",
      "Dainkund Peak",
      "Manimahesh Yatra",
      "Sach Pass"
    ],
    "budget": {
      "budget": "₹13,500–25,500",
      "standard": "₹33,000–54,000",
      "premium": "₹63,000–1,05,000"
    },
    "days": [
      {
        "title": "Day 1: Bharmour to Keylong Mandi",
        "start": "Bharmour (2,200 m)",
        "end": "Keylong Mandi (2,800 m)",
        "distanceKm": "10",
        "altitudeM": "2800",
        "elevationGain": "+600 m",
        "trekTime": "5 hours",
        "terrain": "Forest",
        "description": "Approach toward Chobia nalla.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Keylong",
        "campStay": "Trekker's camp at Keylong Mandi (2,800 m)",
        "weather": "Clear mornings near Keylong give way to building cloud on the pass by midday",
        "photography": "Wide-angle vantage at Keylong: Forest",
        "safety": "Weather on the pass above Keylong can change within the hour—carry a hard shell at all times"
      },
      {
        "title": "Day 2: Keylong to Chobia base",
        "start": "Keylong Mandi (2,800 m)",
        "end": "Chobia base (3,900 m)",
        "distanceKm": "10",
        "altitudeM": "3900",
        "elevationGain": "+1,100 m",
        "trekTime": "6 hours",
        "terrain": "Alpine",
        "description": "Camp below Chobia Pass.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Chobia kitchen tent",
        "campStay": "Alpine tents at Chobia base (3,900 m)",
        "weather": "Alpine chill near Chobia even in summer; wind picks up sharply by late afternoon",
        "photography": "Sunrise silhouettes at Chobia: Alpine",
        "safety": "Loose rock and old snow bridges near Chobia need careful, roped crossing if advised by your guide"
      },
      {
        "title": "Day 3: Cross Chobia Pass",
        "start": "Chobia base (3,900 m)",
        "end": "Far side camp (4,100 m)",
        "distanceKm": "12",
        "altitudeM": "4966",
        "elevationGain": "Pass",
        "trekTime": "9 hours",
        "terrain": "Glacier pass",
        "description": "Technical pass day with guide.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Far",
        "campStay": "Alpine tents at Far side camp (4,100 m)",
        "weather": "Clear early morning skies near Far usually cloud over by early afternoon",
        "photography": "Late-afternoon panorama from Far: Glacier pass",
        "safety": "Snow or ice patches possible near Far; use microspikes and short, steady steps"
      }
    ],
    "whyChoose": [
      "Distinct Chobia Pass Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "High pass above Bharmour Kugti region."
  },
  "bairagarh": {
    "key": "bairagarh",
    "name": "Bairagarh Sach Approach",
    "region": "dalhousie",
    "location": "Bairagarh Sach Approach trailheads in Chamba district, Himachal Pradesh",
    "history": "Bairagarh village has traditionally served as the Chamba-side staging point for parties preparing to cross Sach Pass into Pangi, with generations of traders resupplying here before the climb. It remains the standard gateway village for the pass today.",
    "difficulty": "Moderate",
    "distanceKm": "12 km",
    "duration": "2 days",
    "highestAltitudeM": "3000",
    "baseCamp": "Bairagarh village",
    "nearestRail": "Pathankot",
    "nearestAirport": "Pathankot / Gaggal",
    "roadConnectivity": "Pathankot-Dalhousie-Chamba",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Recon (Bairagarh Sach Approach) is snowbound and cut off; only lower villages stay reachable"
      },
      {
        "month": "February",
        "note": "Heavy snow persists around Recon (Bairagarh Sach Approach); access limited to acclimatised winter trekkers"
      },
      {
        "month": "March",
        "note": "Snow clearance is still underway on roads toward Recon (Bairagarh Sach Approach)"
      },
      {
        "month": "April",
        "note": "Lower trails open around Recon (Bairagarh Sach Approach) while the pass itself stays under snow"
      },
      {
        "month": "May",
        "note": "Meadows greening up near Recon (Bairagarh Sach Approach); the high pass may still hold snow bridges"
      },
      {
        "month": "June",
        "note": "Prime pre-monsoon window for Recon (Bairagarh Sach Approach) with long daylight hours"
      },
      {
        "month": "July",
        "note": "Monsoon cloud and rockfall risk on exposed sections near Recon (Bairagarh Sach Approach)"
      },
      {
        "month": "August",
        "note": "Continued rain and landslide risk on approach roads to Recon (Bairagarh Sach Approach)"
      },
      {
        "month": "September",
        "note": "Clear post-monsoon skies make this the best window for Recon (Bairagarh Sach Approach)"
      },
      {
        "month": "October",
        "note": "Last safe window before early snow closes Recon (Bairagarh Sach Approach) for the season"
      },
      {
        "month": "November",
        "note": "Recon (Bairagarh Sach Approach) usually closes as fresh snow settles on the pass"
      },
      {
        "month": "December",
        "note": "Fully snowbound; Recon (Bairagarh Sach Approach) is inaccessible until late spring"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Bairagarh village; camp nights near Recon at 3000 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Bairagarh village runs through deodar and fir forest rising to alpine bugyals near the Chamba passes, thinning into shaded forest cover for most of the route on the climb toward Recon at 3000 m. Keep an eye out for Himalayan brown bear signs near the passes and marmots on open bugyals.",
    "photographySpots": [
      "Bairagarh Sach Approach at 3000 m in first light",
      "Lower camp at dusk",
      "Recon camp at dusk",
      "Bairagarh village approach and roadhead",
      "Recon on the return leg"
    ],
    "network": "Coverage in Dalhousie, Khajjiar and Bharmour; none on the higher pass sections",
    "electricity": "Available in Dalhousie, Chamba and Bharmour; none at high camps",
    "atm": "ATMs in Dalhousie, Chamba and Bharmour",
    "medical": "Chamba district hospital for serious cases; basic aid en route",
    "camping": "Meadow camps and forest clearings; homestays in Bharmour-side villages",
    "permits": "Local forest permission via operator; Bharmour-side routes may need district checkpost clearance for the Bairagarh Sach Approach route out of Bairagarh village.",
    "forestFees": "Nominal forest/camping fee on most sections",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Microspikes/crampons for old snow on the pass",
      "Insulated gloves and a warm beanie for the crossing",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Bairagarh village runs 5–7 hours a day up to 3000 m.",
    "ams": "Mild AMS risk near 3000 m around Recon; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Carry sun protection and windproof layers—exposure is severe above the tree line"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Khajjiar meadow (\"Mini Switzerland\")",
      "Dainkund Peak",
      "Kalatop wildlife sanctuary",
      "Chamba Bhuri Singh Museum"
    ],
    "nearbyTreks": [
      "Sach Pass",
      "Khajjiar Lake Loop",
      "Manimahesh Lake Alpine Camp",
      "Kalatop Wildlife Sanctuary"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Bairagarh to Bindrabani lower",
        "start": "Bairagarh (2,400 m)",
        "end": "Lower Bindrabani (2,700 m)",
        "distanceKm": "6",
        "altitudeM": "2700",
        "elevationGain": "+300 m",
        "trekTime": "3 hours",
        "terrain": "Village forest",
        "description": "Acclimatisation stage for Sach Pass treks.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Lower",
        "campStay": "Trekker's camp at Lower Bindrabani (2,700 m)",
        "weather": "Alpine chill near Lower even in summer; wind picks up sharply by late afternoon",
        "photography": "Sunrise silhouettes at Lower: Village forest",
        "safety": "Loose rock and old snow bridges near Lower need careful, roped crossing if advised by your guide"
      },
      {
        "title": "Day 2: Bindrabani recon ridge",
        "start": "Lower Bindrabani (2,700 m)",
        "end": "Recon ridge (3,000 m)",
        "distanceKm": "6",
        "altitudeM": "3000",
        "elevationGain": "+300 m",
        "trekTime": "3 hours",
        "terrain": "Ridge",
        "description": "Scout conditions before full pass commit.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Recon",
        "campStay": "Alpine tents at Recon ridge (3,000 m)",
        "weather": "Clear mornings near Recon give way to building cloud on the pass by midday",
        "photography": "Late-afternoon panorama from Recon: Ridge",
        "safety": "Weather on the pass above Recon can change within the hour—carry a hard shell at all times"
      }
    ],
    "whyChoose": [
      "Distinct Bairagarh Sach Approach scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Lower approach villages before Sach Pass expedition."
  },
  "bir-billing": {
    "key": "bir-billing",
    "name": "Bir Billing Paragliding Hill Walks",
    "region": "palampur",
    "location": "Bir Billing Paragliding Hill Walks trailheads in Kangra tea belt, Himachal Pradesh",
    "history": "Bir and Billing rose to prominence as one of Asia’s premier paragliding hubs after the sport arrived here in the 1980s, though the Billing meadow itself had long been used by local shepherds for summer grazing. The short walk between Bir’s Tibetan colony and the Billing takeoff ridge is now as much about watching paragliders as the views themselves.",
    "difficulty": "Easy",
    "distanceKm": "8 km",
    "duration": "1-2 days",
    "highestAltitudeM": "2400",
    "baseCamp": "Bir village",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Palampur-Bir-Baijnath",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Cold with occasional snow on the upper meadows above Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "February",
        "note": "Crisp winter air and clear Dhauladhar views from Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "March",
        "note": "Melting frost and greening slopes on the approach to Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "April",
        "note": "Pleasant spring flying and trekking weather around Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "May",
        "note": "Warm days and thermals build nicely over Bir (Bir Billing Paragliding Hill Walks) by late morning"
      },
      {
        "month": "June",
        "note": "Hazy pre-monsoon skies; morning starts are best near Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "July",
        "note": "Monsoon rain and slippery grass slopes around Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "August",
        "note": "Continued showers; streams swell on the trail to Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "September",
        "note": "Rain eases and the ridge at Bir (Bir Billing Paragliding Hill Walks) turns a deep monsoon green"
      },
      {
        "month": "October",
        "note": "Excellent visibility and stable thermals over Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet on the meadow trail to Bir (Bir Billing Paragliding Hill Walks)"
      },
      {
        "month": "December",
        "note": "Occasional snow dusts the ridge above Bir (Bir Billing Paragliding Hill Walks)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Bir village; camp nights near Bir at 2400 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Bir village runs through tea-garden edges, oak and pine on the Dhauladhar foothills, thinning into shaded forest cover for most of the route on the climb toward Bir at 2400 m. Keep an eye out for Himalayan griffon, barking deer and paragliders sharing the ridge skies.",
    "photographySpots": [
      "Bir Billing Paragliding Hill Walks at 2400 m in first light",
      "Billing camp at dusk",
      "Bir camp at dusk",
      "Bir village approach and roadhead",
      "Bir on the return leg"
    ],
    "network": "Good coverage near Palampur and Bir; patchy on the ridge trail",
    "electricity": "Available at Bir/Rajgundha guesthouses; none at higher camps",
    "atm": "ATMs in Palampur and Baijnath",
    "medical": "Palampur hospital for serious cases; basic aid in Bir",
    "camping": "Homestays in Rajgundha/Bir-side villages; tents on the higher bugyal camps",
    "permits": "Forest permission arranged locally; no special permit for Indian nationals for the Bir Billing Paragliding Hill Walks route out of Bir village.",
    "forestFees": "Minor camping fee where applicable",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wind-resistant cap for the open ridge sections",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 8 km route from Bir village—expect 3–5 hours of walking a day up to 2400 m.",
    "ams": "Low AMS risk at 2400 m near Bir; hydrate well and ascend steadily from Bir village.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Bir Tibetan colony",
      "Andretta pottery village",
      "Baijnath Shiva temple",
      "Billing paragliding takeoff"
    ],
    "nearbyTreks": [
      "Bara Bhangal",
      "Rajgundha Meadow",
      "Baijnath to Khorai Dhar",
      "Winch Camp to Rajgundha"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Bir colony to Billing",
        "start": "Bir (1,500 m)",
        "end": "Billing (2,400 m)",
        "distanceKm": "8",
        "altitudeM": "2400",
        "elevationGain": "+900 m",
        "trekTime": "4-5 hours",
        "terrain": "Forest road mix",
        "description": "Climb to paragliding launch with Kangra valley views.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Billing",
        "campStay": "Trekker's camp at Billing (2,400 m)",
        "weather": "Mild days near Billing with a cool wind once the sun drops behind the Dhauladhar",
        "photography": "Late-afternoon panorama from Billing: Forest road mix",
        "safety": "Grass slopes near Billing are slick after dew or rain—use poles on the steeper pitches"
      },
      {
        "title": "Day 2: Billing to Bir descent",
        "start": "Billing (2,400 m)",
        "end": "Bir (1,500 m)",
        "distanceKm": "8",
        "altitudeM": "1500",
        "elevationGain": "Descent",
        "trekTime": "2-3 hours",
        "terrain": "Trail shortcut",
        "description": "Descend via chai stalls and monastery lanes.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Bir",
        "campStay": "Hotel/guesthouse at Bir (1,500 m)",
        "weather": "Open, breezy ridge conditions near Bir; thermals build through the late morning",
        "photography": "Best light at Bir: Trail shortcut",
        "safety": "Open ridge exposure near Bir means an early start to avoid afternoon wind and cloud"
      }
    ],
    "whyChoose": [
      "Distinct Bir Billing Paragliding Hill Walks scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Walks between Bir Tibetan colony and Billing takeoff ridge."
  },
  "rajgundha": {
    "key": "rajgundha",
    "name": "Rajgundha Meadow Trek",
    "region": "palampur",
    "location": "Rajgundha Meadow Trek trailheads in Kangra tea belt, Himachal Pradesh",
    "history": "Rajgundha, a shepherd hamlet on the way toward Thamsar Pass and Bara Bhangal, has for generations been a resupply stop for Gaddi shepherds moving flocks between Kangra and the Kullu side. Its meadows remain largely used for grazing rather than tourism.",
    "difficulty": "Moderate",
    "distanceKm": "18 km",
    "duration": "2 days",
    "highestAltitudeM": "2900",
    "baseCamp": "Barot / Bada Gran",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Palampur-Bir-Baijnath",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Cold with occasional snow on the upper meadows above Bada (Rajgundha Meadow)"
      },
      {
        "month": "February",
        "note": "Crisp winter air and clear Dhauladhar views from Bada (Rajgundha Meadow)"
      },
      {
        "month": "March",
        "note": "Melting frost and greening slopes on the approach to Bada (Rajgundha Meadow)"
      },
      {
        "month": "April",
        "note": "Pleasant spring flying and trekking weather around Bada (Rajgundha Meadow)"
      },
      {
        "month": "May",
        "note": "Warm days and thermals build nicely over Bada (Rajgundha Meadow) by late morning"
      },
      {
        "month": "June",
        "note": "Hazy pre-monsoon skies; morning starts are best near Bada (Rajgundha Meadow)"
      },
      {
        "month": "July",
        "note": "Monsoon rain and slippery grass slopes around Bada (Rajgundha Meadow)"
      },
      {
        "month": "August",
        "note": "Continued showers; streams swell on the trail to Bada (Rajgundha Meadow)"
      },
      {
        "month": "September",
        "note": "Rain eases and the ridge at Bada (Rajgundha Meadow) turns a deep monsoon green"
      },
      {
        "month": "October",
        "note": "Excellent visibility and stable thermals over Bada (Rajgundha Meadow)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet on the meadow trail to Bada (Rajgundha Meadow)"
      },
      {
        "month": "December",
        "note": "Occasional snow dusts the ridge above Bada (Rajgundha Meadow)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Barot / Bada Gran; camp nights near Bada at 2900 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Barot / Bada Gran runs through tea-garden edges, oak and pine on the Dhauladhar foothills, thinning into shaded forest cover for most of the route on the climb toward Bada at 2900 m. Keep an eye out for Himalayan griffon, barking deer and paragliders sharing the ridge skies.",
    "photographySpots": [
      "Rajgundha Meadow at 2900 m in first light",
      "Rajgundha camp at dusk",
      "Bada camp at dusk",
      "Barot / Bada Gran approach and roadhead",
      "Bada on the return leg"
    ],
    "network": "Good coverage near Palampur and Bir; patchy on the ridge trail",
    "electricity": "Available at Bir/Rajgundha guesthouses; none at higher camps",
    "atm": "ATMs in Palampur and Baijnath",
    "medical": "Palampur hospital for serious cases; basic aid in Bir",
    "camping": "Homestays in Rajgundha/Bir-side villages; tents on the higher bugyal camps",
    "permits": "Forest permission arranged locally; no special permit for Indian nationals for the Rajgundha Meadow route out of Barot / Bada Gran.",
    "forestFees": "Minor camping fee where applicable",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wind-resistant cap for the open ridge sections",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Barot / Bada Gran runs 5–7 hours a day up to 2900 m.",
    "ams": "Low AMS risk at 2900 m near Bada; hydrate well and ascend steadily from Barot / Bada Gran.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Baijnath Shiva temple",
      "Billing paragliding takeoff",
      "Chowari orchards",
      "Dhauladhar viewpoints near Rajgundha"
    ],
    "nearbyTreks": [
      "Winch Camp to Rajgundha",
      "Bara Bhangal",
      "Bir Billing Paragliding Hill Walks",
      "Baijnath to Khorai Dhar"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Barot to Rajgundha",
        "start": "Barot (1,800 m)",
        "end": "Rajgundha (2,900 m)",
        "distanceKm": "9",
        "altitudeM": "2900",
        "elevationGain": "+1,100 m",
        "trekTime": "5-6 hours",
        "terrain": "Forest climb",
        "description": "Classic meadow destination above Uhl river.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Rajgundha kitchen tent",
        "campStay": "Trekker's camp at Rajgundha (2,900 m)",
        "weather": "Open, breezy ridge conditions near Rajgundha; thermals build through the late morning",
        "photography": "Best light at Rajgundha: Forest climb",
        "safety": "Open ridge exposure near Rajgundha means an early start to avoid afternoon wind and cloud"
      },
      {
        "title": "Day 2: Rajgundha to Bada Gran exit",
        "start": "Rajgundha (2,900 m)",
        "end": "Bada Gran (2,400 m)",
        "distanceKm": "9",
        "altitudeM": "2400",
        "elevationGain": "Descent",
        "trekTime": "4 hours",
        "terrain": "Meadow descent",
        "description": "Exit toward Palampur side road.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Bada",
        "campStay": "Trekker's camp at Bada Gran (2,400 m)",
        "weather": "Mild days near Bada with a cool wind once the sun drops behind the Dhauladhar",
        "photography": "A classic frame from Bada: Meadow descent",
        "safety": "Grass slopes near Bada are slick after dew or rain—use poles on the steeper pitches"
      }
    ],
    "whyChoose": [
      "Distinct Rajgundha Meadow Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Cross over to Rajgundha thach from Barot side."
  },
  "bara-bhangal": {
    "key": "bara-bhangal",
    "name": "Bara Bhangal Trek",
    "region": "palampur",
    "location": "Bara Bhangal Trek trailheads in Kangra tea belt, Himachal Pradesh",
    "history": "Bara Bhangal is one of Himachal's most isolated villages, cut off from any road and reachable only by a demanding multi-day crossing from either Manali or the Kangra side. Its shepherd families still migrate twice a year along this exact route, driving their flocks between Bara Bhangal and Bir in one of the longest surviving transhumance traditions in India.",
    "difficulty": "Challenging",
    "distanceKm": "80 km",
    "duration": "8-12 days",
    "highestAltitudeM": "4700",
    "baseCamp": "Manali / Dharamshala approaches",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Palampur-Bir-Baijnath",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Cold with occasional snow on the upper meadows above Bara (Bara Bhangal)"
      },
      {
        "month": "February",
        "note": "Crisp winter air and clear Dhauladhar views from Bara (Bara Bhangal)"
      },
      {
        "month": "March",
        "note": "Melting frost and greening slopes on the approach to Bara (Bara Bhangal)"
      },
      {
        "month": "April",
        "note": "Pleasant spring flying and trekking weather around Bara (Bara Bhangal)"
      },
      {
        "month": "May",
        "note": "Warm days and thermals build nicely over Bara (Bara Bhangal) by late morning"
      },
      {
        "month": "June",
        "note": "Hazy pre-monsoon skies; morning starts are best near Bara (Bara Bhangal)"
      },
      {
        "month": "July",
        "note": "Monsoon rain and slippery grass slopes around Bara (Bara Bhangal)"
      },
      {
        "month": "August",
        "note": "Continued showers; streams swell on the trail to Bara (Bara Bhangal)"
      },
      {
        "month": "September",
        "note": "Rain eases and the ridge at Bara (Bara Bhangal) turns a deep monsoon green"
      },
      {
        "month": "October",
        "note": "Excellent visibility and stable thermals over Bara (Bara Bhangal)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet on the meadow trail to Bara (Bara Bhangal)"
      },
      {
        "month": "December",
        "note": "Occasional snow dusts the ridge above Bara (Bara Bhangal)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Manali / Dharamshala approaches; camp nights near Road at 4700 m fall to −10 to −2°C.",
    "floraFauna": "The approach from Manali / Dharamshala approaches runs through tea-garden edges, oak and pine on the Dhauladhar foothills, thinning into bare rock, scree and permanent snow patches above the last camp on the climb toward Road at 4700 m. Keep an eye out for Himalayan griffon, barking deer and paragliders sharing the ridge skies.",
    "photographySpots": [
      "Bara Bhangal at 4700 m in first light",
      "Upper camp at dusk",
      "Bara camp at dusk",
      "Road camp at dusk",
      "Manali / Dharamshala approaches approach and roadhead"
    ],
    "network": "Good coverage near Palampur and Bir; patchy on the ridge trail",
    "electricity": "Available at Bir/Rajgundha guesthouses; none at higher camps",
    "atm": "ATMs in Palampur and Baijnath",
    "medical": "Palampur hospital for serious cases; basic aid in Bir",
    "camping": "Homestays in Rajgundha/Bir-side villages; tents on the higher bugyal camps",
    "permits": "Forest permission arranged locally; no special permit for Indian nationals for the Bara Bhangal route out of Manali / Dharamshala approaches.",
    "forestFees": "Minor camping fee where applicable",
    "guideCharges": "₹3,600–6,700 per day for a local guide",
    "porterCharges": "₹2,400–4,800 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wind-resistant cap for the open ridge sections",
      "Insulated down jacket rated for sub-zero camp nights",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Excellent fitness and prior technical or high-altitude experience are required—this 8-12 days route from Manali / Dharamshala approaches tops out near 4700 m.",
    "ams": "Significant AMS risk at 4700 m near Road; acclimatise carefully on the way up from Manali / Dharamshala approaches, watch for symptoms, and be ready to turn back.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Acclimatise with a rest/height-gain day before pushing above 3,800 m"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chowari orchards",
      "Dhauladhar viewpoints near Rajgundha",
      "Neugal Khad",
      "Palampur tea gardens"
    ],
    "nearbyTreks": [
      "Baijnath to Khorai Dhar",
      "Winch Camp to Rajgundha",
      "Rajgundha Meadow",
      "Bir Billing Paragliding Hill Walks"
    ],
    "budget": {
      "budget": "₹9,400–17,700",
      "standard": "₹22,900–37,400",
      "premium": "₹43,700–72,800"
    },
    "days": [
      {
        "title": "Day 1: Thamsar Pass approach",
        "start": "Kothi near Manali (2,500 m)",
        "end": "Upper valley camp (3,500 m)",
        "distanceKm": "12",
        "altitudeM": "3500",
        "elevationGain": "+1,000 m",
        "trekTime": "6 hours",
        "terrain": "Forest",
        "description": "Multi-day expedition start toward Thamsar Pass.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Upper",
        "campStay": "Alpine tents at Upper valley camp (3,500 m)",
        "weather": "Mild days near Upper with a cool wind once the sun drops behind the Dhauladhar",
        "photography": "A classic frame from Upper: Forest",
        "safety": "Grass slopes near Upper are slick after dew or rain—use poles on the steeper pitches"
      },
      {
        "title": "Day 2: Cross Thamsar into Bhangal",
        "start": "Upper camp (3,500 m)",
        "end": "Bara Bhangal village (2,540 m)",
        "distanceKm": "16",
        "altitudeM": "4700",
        "elevationGain": "Pass then descent",
        "trekTime": "2 days",
        "terrain": "High pass",
        "description": "Cross Thamsar Pass then descend to isolated Bhangal village.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Bara",
        "campStay": "Homestay in the village at Bara Bhangal village (2,540 m)",
        "weather": "Clear early morning skies near Bara usually cloud over by early afternoon",
        "photography": "Golden-hour views near Bara: High pass",
        "safety": "Snow or ice patches possible near Bara; use microspikes and short, steady steps"
      },
      {
        "title": "Day 3: Bhangal to Dharamshala exit",
        "start": "Bara Bhangal (2,540 m)",
        "end": "Road near Dharamshala (1,800 m)",
        "distanceKm": "20",
        "altitudeM": "1800",
        "elevationGain": "Long descent",
        "trekTime": "3 days",
        "terrain": "River valley",
        "description": "Long exit via Rajgundha or other cols depending on route.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Road",
        "campStay": "Hotel/guesthouse at Road near Dharamshala (1,800 m)",
        "weather": "Mild days near Road with a cool wind once the sun drops behind the Dhauladhar",
        "photography": "Wide-angle vantage at Road: River valley",
        "safety": "Grass slopes near Road are slick after dew or rain—use poles on the steeper pitches"
      }
    ],
    "whyChoose": [
      "Distinct Bara Bhangal Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Long traverse to remote Bara Bhangal village in Kangra valley."
  },
  "winch-camp": {
    "key": "winch-camp",
    "name": "Winch Camp to Rajgundha",
    "region": "palampur",
    "location": "Winch Camp to Rajgundha trailheads in Kangra tea belt, Himachal Pradesh",
    "history": "Winch Camp near Barot takes its name from an old cable winch system once used to move timber and goods across the Uhl river gorge. The route toward Rajgundha still follows the same forested valley path used by loggers and shepherds for generations.",
    "difficulty": "Moderate",
    "distanceKm": "10 km",
    "duration": "1-2 days",
    "highestAltitudeM": "2600",
    "baseCamp": "Winch Camp Barot",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Palampur-Bir-Baijnath",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Cold with occasional snow on the upper meadows above Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "February",
        "note": "Crisp winter air and clear Dhauladhar views from Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "March",
        "note": "Melting frost and greening slopes on the approach to Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "April",
        "note": "Pleasant spring flying and trekking weather around Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "May",
        "note": "Warm days and thermals build nicely over Luhardi (Winch Camp to Rajgundha) by late morning"
      },
      {
        "month": "June",
        "note": "Hazy pre-monsoon skies; morning starts are best near Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "July",
        "note": "Monsoon rain and slippery grass slopes around Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "August",
        "note": "Continued showers; streams swell on the trail to Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "September",
        "note": "Rain eases and the ridge at Luhardi (Winch Camp to Rajgundha) turns a deep monsoon green"
      },
      {
        "month": "October",
        "note": "Excellent visibility and stable thermals over Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet on the meadow trail to Luhardi (Winch Camp to Rajgundha)"
      },
      {
        "month": "December",
        "note": "Occasional snow dusts the ridge above Luhardi (Winch Camp to Rajgundha)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Winch Camp Barot; camp nights near Luhardi at 2600 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Winch Camp Barot runs through tea-garden edges, oak and pine on the Dhauladhar foothills, thinning into shaded forest cover for most of the route on the climb toward Luhardi at 2600 m. Keep an eye out for Himalayan griffon, barking deer and paragliders sharing the ridge skies.",
    "photographySpots": [
      "Winch Camp to Rajgundha at 2600 m in first light",
      "Upper camp at dusk",
      "Luhardi camp at dusk",
      "Winch Camp Barot approach and roadhead",
      "Luhardi on the return leg"
    ],
    "network": "Good coverage near Palampur and Bir; patchy on the ridge trail",
    "electricity": "Available at Bir/Rajgundha guesthouses; none at higher camps",
    "atm": "ATMs in Palampur and Baijnath",
    "medical": "Palampur hospital for serious cases; basic aid in Bir",
    "camping": "Homestays in Rajgundha/Bir-side villages; tents on the higher bugyal camps",
    "permits": "Forest permission arranged locally; no special permit for Indian nationals for the Winch Camp to Rajgundha route out of Winch Camp Barot.",
    "forestFees": "Minor camping fee where applicable",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wind-resistant cap for the open ridge sections",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 1-2 days route from Winch Camp Barot runs 5–7 hours a day up to 2600 m.",
    "ams": "Low AMS risk at 2600 m near Luhardi; hydrate well and ascend steadily from Winch Camp Barot.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Neugal Khad",
      "Palampur tea gardens",
      "Bir Tibetan colony",
      "Andretta pottery village"
    ],
    "nearbyTreks": [
      "Bir Billing Paragliding Hill Walks",
      "Baijnath to Khorai Dhar",
      "Bara Bhangal",
      "Rajgundha Meadow"
    ],
    "budget": {
      "budget": "₹1,200–2,200",
      "standard": "₹2,900–4,700",
      "premium": "₹5,500–9,100"
    },
    "days": [
      {
        "title": "Day 1: Winch Camp to upper meadow",
        "start": "Winch Camp (2,200 m)",
        "end": "Upper Uhl meadow (2,600 m)",
        "distanceKm": "5",
        "altitudeM": "2600",
        "elevationGain": "+400 m",
        "trekTime": "3 hours",
        "terrain": "Reservoir rim",
        "description": "Walk above Uhl river winch infrastructure.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Upper",
        "campStay": "Trekker's camp at Upper Uhl meadow (2,600 m)",
        "weather": "Open, breezy ridge conditions near Upper; thermals build through the late morning",
        "photography": "Golden-hour views near Upper: Reservoir rim",
        "safety": "Open ridge exposure near Upper means an early start to avoid afternoon wind and cloud"
      },
      {
        "title": "Day 2: Meadow to Luhardi viewpoint",
        "start": "Upper meadow (2,600 m)",
        "end": "Luhardi vista (2,700 m)",
        "distanceKm": "5",
        "altitudeM": "2700",
        "elevationGain": "+100 m",
        "trekTime": "2 hours",
        "terrain": "Ridge",
        "description": "View toward Dhauladhar from Luhardi ridge.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Luhardi",
        "campStay": "Trekker's camp at Luhardi vista (2,700 m)",
        "weather": "Mild days near Luhardi with a cool wind once the sun drops behind the Dhauladhar",
        "photography": "Wide-angle vantage at Luhardi: Ridge",
        "safety": "Grass slopes near Luhardi are slick after dew or rain—use poles on the steeper pitches"
      }
    ],
    "whyChoose": [
      "Distinct Winch Camp to Rajgundha scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Cable winch area hikes above Barot reservoir."
  },
  "baijnath": {
    "key": "baijnath",
    "name": "Baijnath to Khorai Dhar",
    "region": "palampur",
    "location": "Baijnath to Khorai Dhar trailheads in Kangra tea belt, Himachal Pradesh",
    "history": "Baijnath's 13th-century Shiva temple is one of Himachal's most important historic shrines, and the ridge walk toward Khorai Dhar above it has long been used by villagers moving between the temple town and the surrounding tea-garden slopes. The Dhauladhar views from the ridge have made it a favoured short local walk.",
    "difficulty": "Easy",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "2200",
    "baseCamp": "Baijnath temple",
    "nearestRail": "Pathankot",
    "nearestAirport": "Gaggal",
    "roadConnectivity": "Palampur-Bir-Baijnath",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Cold with occasional snow on the upper meadows above Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "February",
        "note": "Crisp winter air and clear Dhauladhar views from Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "March",
        "note": "Melting frost and greening slopes on the approach to Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "April",
        "note": "Pleasant spring flying and trekking weather around Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "May",
        "note": "Warm days and thermals build nicely over Palampur (Baijnath to Khorai Dhar) by late morning"
      },
      {
        "month": "June",
        "note": "Hazy pre-monsoon skies; morning starts are best near Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "July",
        "note": "Monsoon rain and slippery grass slopes around Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "August",
        "note": "Continued showers; streams swell on the trail to Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "September",
        "note": "Rain eases and the ridge at Palampur (Baijnath to Khorai Dhar) turns a deep monsoon green"
      },
      {
        "month": "October",
        "note": "Excellent visibility and stable thermals over Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "November",
        "note": "Cold, dry and quiet on the meadow trail to Palampur (Baijnath to Khorai Dhar)"
      },
      {
        "month": "December",
        "note": "Occasional snow dusts the ridge above Palampur (Baijnath to Khorai Dhar)"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Baijnath temple; camp nights near Palampur at 2200 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Baijnath temple runs through tea-garden edges, oak and pine on the Dhauladhar foothills, thinning into shaded forest cover for most of the route on the climb toward Palampur at 2200 m. Keep an eye out for Himalayan griffon, barking deer and paragliders sharing the ridge skies.",
    "photographySpots": [
      "Baijnath to Khorai Dhar at 2200 m in first light",
      "Khorai camp at dusk",
      "Palampur camp at dusk",
      "Baijnath temple approach and roadhead",
      "Palampur on the return leg"
    ],
    "network": "Good coverage near Palampur and Bir; patchy on the ridge trail",
    "electricity": "Available at Bir/Rajgundha guesthouses; none at higher camps",
    "atm": "ATMs in Palampur and Baijnath",
    "medical": "Palampur hospital for serious cases; basic aid in Bir",
    "camping": "Homestays in Rajgundha/Bir-side villages; tents on the higher bugyal camps",
    "permits": "Forest permission arranged locally; no special permit for Indian nationals for the Baijnath to Khorai Dhar route out of Baijnath temple.",
    "forestFees": "Minor camping fee where applicable",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Wind-resistant cap for the open ridge sections",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 6 km route from Baijnath temple—expect 3–5 hours of walking a day up to 2200 m.",
    "ams": "Low AMS risk at 2200 m near Palampur; hydrate well and ascend steadily from Baijnath temple.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Bir Tibetan colony",
      "Andretta pottery village",
      "Baijnath Shiva temple",
      "Billing paragliding takeoff"
    ],
    "nearbyTreks": [
      "Rajgundha Meadow",
      "Bir Billing Paragliding Hill Walks",
      "Winch Camp to Rajgundha",
      "Bara Bhangal"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Baijnath temple to Khorai Dhar",
        "start": "Baijnath (1,300 m)",
        "end": "Khorai Dhar (2,200 m)",
        "distanceKm": "3",
        "altitudeM": "2200",
        "elevationGain": "+900 m",
        "trekTime": "3 hours",
        "terrain": "Pine ridge",
        "description": "Climb behind ancient Baijnath temple for Kangra views.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Khorai",
        "campStay": "Homestay in the village at Khorai Dhar (2,200 m)",
        "weather": "Mild days near Khorai with a cool wind once the sun drops behind the Dhauladhar",
        "photography": "Wide-angle vantage at Khorai: Pine ridge",
        "safety": "Grass slopes near Khorai are slick after dew or rain—use poles on the steeper pitches"
      },
      {
        "title": "Day 2: Khorai to Palampur viewpoint",
        "start": "Khorai Dhar (2,200 m)",
        "end": "Palampur tea vista (2,000 m)",
        "distanceKm": "3",
        "altitudeM": "2000",
        "elevationGain": "Descent",
        "trekTime": "2 hours",
        "terrain": "Tea garden trails",
        "description": "Descend toward Palampur tea estates.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Palampur",
        "campStay": "Hotel/guesthouse at Palampur tea vista (2,000 m)",
        "weather": "Open, breezy ridge conditions near Palampur; thermals build through the late morning",
        "photography": "Sunrise silhouettes at Palampur: Tea garden trails",
        "safety": "Open ridge exposure near Palampur means an early start to avoid afternoon wind and cloud"
      }
    ],
    "whyChoose": [
      "Distinct Baijnath to Khorai Dhar scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Day ridge behind Baijnath Shiva temple."
  },
  "tosh": {
    "key": "tosh",
    "name": "Tosh Village Trek",
    "region": "parvati",
    "location": "Tosh Village Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Tosh village, perched above a dramatic gorge at the head of the Parvati valley, retains traditional wood-and-stone Himachali architecture even as it has become a magnet for long-stay travellers over the past two decades. Its position at the edge of the inhabited valley has long made it the last real village before the high pastures beyond.",
    "difficulty": "Easy",
    "distanceKm": "8 km",
    "duration": "1-2 days",
    "highestAltitudeM": "2400",
    "baseCamp": "Barshaini",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Kutla (Tosh Village) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Kutla (Tosh Village)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Kutla (Tosh Village)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Kutla (Tosh Village)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Kutla (Tosh Village) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Kutla (Tosh Village)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Kutla (Tosh Village)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Kutla (Tosh Village)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Kutla (Tosh Village) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Kutla (Tosh Village)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Kutla (Tosh Village)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Kutla (Tosh Village) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Barshaini; camp nights near Kutla at 2400 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Barshaini runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Kutla at 2400 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Tosh Village at 2400 m in first light",
      "Tosh camp at dusk",
      "Kutla camp at dusk",
      "Barshaini approach and roadhead",
      "Kutla on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Tosh Village route out of Barshaini.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 8 km route from Barshaini—expect 3–5 hours of walking a day up to 2400 m.",
    "ams": "Low AMS risk at 2400 m near Kutla; hydrate well and ascend steadily from Barshaini.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Barshaini bridge",
      "Pulga meadows",
      "Parvati river beaches",
      "Kheerganga hot spring pool"
    ],
    "nearbyTreks": [
      "Malana Village",
      "Tulga Village Circuit",
      "Magic Valley (Waichin)",
      "Waichin Valley"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Barshaini to Tosh",
        "start": "Barshaini (2,200 m)",
        "end": "Tosh village (2,400 m)",
        "distanceKm": "4",
        "altitudeM": "2400",
        "elevationGain": "+200 m",
        "trekTime": "2 hours",
        "terrain": "Parvati climb",
        "description": "Steep lane to Tosh cafes overlooking valley waterfall.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Tosh",
        "campStay": "Homestay in the village at Tosh village (2,400 m)",
        "weather": "Warm valley air by the river near Tosh; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Sunrise silhouettes at Tosh: Parvati climb",
        "safety": "Wooden or wire bridges before Tosh can be slick after rain—cross one at a time"
      },
      {
        "title": "Day 2: Tosh to Kutla extension",
        "start": "Tosh (2,400 m)",
        "end": "Kutla meadow (2,800 m)",
        "distanceKm": "6",
        "altitudeM": "2800",
        "elevationGain": "+400 m",
        "trekTime": "3 hours",
        "terrain": "Forest",
        "description": "Optional push toward Kutla higher meadow.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Kutla",
        "campStay": "Trekker's camp at Kutla meadow (2,800 m)",
        "weather": "Humid, orchard-scented air near Kutla with a cold night breeze off the river",
        "photography": "Late-afternoon panorama from Kutla: Forest",
        "safety": "Stay on the marked path near Kutla; riverside banks can undercut without warning"
      }
    ],
    "whyChoose": [
      "Distinct Tosh Village Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Barshaini to Tosh hippie village climb."
  },
  "kutla": {
    "key": "kutla",
    "name": "Kutla Meadow Trek",
    "region": "parvati",
    "location": "Kutla Meadow Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Kutla meadow above Tosh has traditionally been used by Parvati valley shepherds as a seasonal grazing camp before flocks are moved higher toward the passes at the head of the valley. Its scattering of simple wooden huts still reflects this pastoral use rather than a built-up tourist trail.",
    "difficulty": "Moderate",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "2800",
    "baseCamp": "Tosh",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Pangchen (Kutla Meadow) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Pangchen (Kutla Meadow)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Pangchen (Kutla Meadow)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Pangchen (Kutla Meadow)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Pangchen (Kutla Meadow) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Pangchen (Kutla Meadow)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Pangchen (Kutla Meadow)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Pangchen (Kutla Meadow)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Pangchen (Kutla Meadow) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Pangchen (Kutla Meadow)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Pangchen (Kutla Meadow)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Pangchen (Kutla Meadow) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Tosh; camp nights near Pangchen at 2800 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Tosh runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Pangchen at 2800 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Kutla Meadow at 2800 m in first light",
      "Kutla camp at dusk",
      "Pangchen camp at dusk",
      "Tosh approach and roadhead",
      "Pangchen on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Kutla Meadow route out of Tosh.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 1 day route from Tosh runs 5–7 hours a day up to 2800 m.",
    "ams": "Low AMS risk at 2800 m near Pangchen; hydrate well and ascend steadily from Tosh.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Parvati river beaches",
      "Kheerganga hot spring pool",
      "Kasol cafes",
      "Manikaran hot springs and gurudwara"
    ],
    "nearbyTreks": [
      "Rasol Village",
      "Kalga to Kheerganga link",
      "Kheerganga",
      "Grahan Village"
    ],
    "budget": {
      "budget": "₹1,200–2,200",
      "standard": "₹2,900–4,700",
      "premium": "₹5,500–9,100"
    },
    "days": [
      {
        "title": "Day 1: Tosh to Kutla",
        "start": "Tosh (2,400 m)",
        "end": "Kutla (2,800 m)",
        "distanceKm": "3",
        "altitudeM": "2800",
        "elevationGain": "+400 m",
        "trekTime": "2-3 hours",
        "terrain": "Pine and meadow",
        "description": "Camp or day hike to Kutla with Parvati peaks ahead.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Kutla",
        "campStay": "Trekker's camp at Kutla (2,800 m)",
        "weather": "Humid, orchard-scented air near Kutla with a cold night breeze off the river",
        "photography": "Late-afternoon panorama from Kutla: Pine and meadow",
        "safety": "Stay on the marked path near Kutla; riverside banks can undercut without warning"
      },
      {
        "title": "Day 2: Kutla to Pangchen vantage",
        "start": "Kutla (2,800 m)",
        "end": "Pangchen spur (2,900 m)",
        "distanceKm": "3",
        "altitudeM": "2900",
        "elevationGain": "+100 m",
        "trekTime": "1 hour",
        "terrain": "Ridge",
        "description": "Short ridge for Tosh valley panorama.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Pangchen",
        "campStay": "Trekker's camp at Pangchen spur (2,900 m)",
        "weather": "Warm valley air by the river near Pangchen; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Best light at Pangchen: Ridge",
        "safety": "Wooden or wire bridges before Pangchen can be slick after rain—cross one at a time"
      }
    ],
    "whyChoose": [
      "Distinct Kutla Meadow Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Higher meadow above Tosh with glacier views."
  },
  "waichin": {
    "key": "waichin",
    "name": "Waichin Valley Trek",
    "region": "parvati",
    "location": "Waichin Valley Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Waichin valley, above Pulga, has long been used by shepherds moving flocks toward the glaciers at the head of the Parvati valley, and its narrower, less-visited trail has kept it quieter than the popular Kheerganga route. The glacier lookout at the top offers a rare close view of Parvati valley ice without a technical climb.",
    "difficulty": "Moderate",
    "distanceKm": "10 km",
    "duration": "2 days",
    "highestAltitudeM": "3200",
    "baseCamp": "Pulga",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Glacier (Waichin Valley) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Glacier (Waichin Valley)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Glacier (Waichin Valley)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Glacier (Waichin Valley)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Glacier (Waichin Valley) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Glacier (Waichin Valley)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Glacier (Waichin Valley)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Glacier (Waichin Valley)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Glacier (Waichin Valley) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Glacier (Waichin Valley)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Glacier (Waichin Valley)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Glacier (Waichin Valley) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Pulga; camp nights near Glacier at 3200 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Pulga runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into open alpine meadow and scrub above the tree line on the climb toward Glacier at 3200 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Waichin Valley at 3200 m in first light",
      "Waichin camp at dusk",
      "Glacier camp at dusk",
      "Pulga approach and roadhead",
      "Glacier on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Waichin Valley route out of Pulga.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Pulga runs 5–7 hours a day up to 3200 m.",
    "ams": "Mild AMS risk near 3200 m around Glacier; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kasol cafes",
      "Manikaran hot springs and gurudwara",
      "Chalal riverside walk",
      "Jari-Malana road"
    ],
    "nearbyTreks": [
      "Pulga Fairy Forest",
      "Chalal Riverside",
      "Tosh Village",
      "Malana Village"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Pulga to Waichin camp",
        "start": "Pulga (2,500 m)",
        "end": "Waichin (3,000 m)",
        "distanceKm": "5",
        "altitudeM": "3000",
        "elevationGain": "+500 m",
        "trekTime": "3-4 hours",
        "terrain": "Forest",
        "description": "Enter lesser-known Waichin side valley.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Waichin",
        "campStay": "Alpine tents at Waichin (3,000 m)",
        "weather": "Warm valley air by the river near Waichin; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Best light at Waichin: Forest",
        "safety": "Wooden or wire bridges before Waichin can be slick after rain—cross one at a time"
      },
      {
        "title": "Day 2: Waichin to glacier viewpoint",
        "start": "Waichin (3,000 m)",
        "end": "Glacier lookout (3,200 m)",
        "distanceKm": "5",
        "altitudeM": "3200",
        "elevationGain": "+200 m",
        "trekTime": "3 hours",
        "terrain": "Boulder field",
        "description": "View toward Parvati glacier spires.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Glacier",
        "campStay": "Alpine tents at Glacier lookout (3,200 m)",
        "weather": "Humid, orchard-scented air near Glacier with a cold night breeze off the river",
        "photography": "A classic frame from Glacier: Boulder field",
        "safety": "Stay on the marked path near Glacier; riverside banks can undercut without warning"
      }
    ],
    "whyChoose": [
      "Distinct Waichin Valley Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Hidden Waichin valley above Pulga."
  },
  "grahan": {
    "key": "grahan",
    "name": "Grahan Village Trek",
    "region": "parvati",
    "location": "Grahan Village Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Grahan village, one of the more traditional settlements above Kasol, has kept much of its old timber architecture and terraced farming even as neighbouring villages have modernised for tourism. It also serves as the first overnight stop on the classic Sar Pass route.",
    "difficulty": "Easy",
    "distanceKm": "9 km",
    "duration": "1-2 days",
    "highestAltitudeM": "2300",
    "baseCamp": "Kasol",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Upper (Grahan Village) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Upper (Grahan Village)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Upper (Grahan Village)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Upper (Grahan Village)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Upper (Grahan Village) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Upper (Grahan Village)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Upper (Grahan Village)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Upper (Grahan Village)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Upper (Grahan Village) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Upper (Grahan Village)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Upper (Grahan Village)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Upper (Grahan Village) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kasol; camp nights near Upper at 2300 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Kasol runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Upper at 2300 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Grahan Village at 2300 m in first light",
      "Grahan camp at dusk",
      "Upper camp at dusk",
      "Kasol approach and roadhead",
      "Upper on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Grahan Village route out of Kasol.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 9 km route from Kasol—expect 3–5 hours of walking a day up to 2300 m.",
    "ams": "Low AMS risk at 2300 m near Upper; hydrate well and ascend steadily from Kasol.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chalal riverside walk",
      "Jari-Malana road",
      "Barshaini bridge",
      "Pulga meadows"
    ],
    "nearbyTreks": [
      "Tulga Village Circuit",
      "Magic Valley (Waichin)",
      "Kutla Meadow",
      "Rasol Village"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Kasol to Grahan",
        "start": "Kasol (1,580 m)",
        "end": "Grahan (2,300 m)",
        "distanceKm": "9",
        "altitudeM": "2300",
        "elevationGain": "+720 m",
        "trekTime": "5 hours",
        "terrain": "Rhododendron forest",
        "description": "Classic first Sar Pass stage usable as standalone village trek.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Grahan",
        "campStay": "Trekker's camp at Grahan (2,300 m)",
        "weather": "Humid, orchard-scented air near Grahan with a cold night breeze off the river",
        "photography": "A classic frame from Grahan: Rhododendron forest",
        "safety": "Stay on the marked path near Grahan; riverside banks can undercut without warning"
      },
      {
        "title": "Day 2: Grahan potato fields loop",
        "start": "Grahan (2,300 m)",
        "end": "Upper fields (2,400 m)",
        "distanceKm": "3",
        "altitudeM": "2400",
        "elevationGain": "+100 m",
        "trekTime": "2 hours",
        "terrain": "Terraces",
        "description": "Evening loop through Grahan potato terraces.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Upper kitchen tent",
        "campStay": "Trekker's camp at Upper fields (2,400 m)",
        "weather": "Warm valley air by the river near Upper; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Golden-hour views near Upper: Terraces",
        "safety": "Wooden or wire bridges before Upper can be slick after rain—cross one at a time"
      }
    ],
    "whyChoose": [
      "Distinct Grahan Village Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Kasol to Grahan for Sar Pass staging or culture stop."
  },
  "malana": {
    "key": "malana",
    "name": "Malana Village Trek",
    "region": "parvati",
    "location": "Malana Village Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Malana has long been considered one of India's oldest self-governing villages by local tradition, run by its own council and customs distinct from the rest of the Kullu valley, with visitors traditionally asked not to touch village property or people. The approach from Jari has remained largely unchanged for generations.",
    "difficulty": "Moderate",
    "distanceKm": "8 km",
    "duration": "1-2 days",
    "highestAltitudeM": "2650",
    "baseCamp": "Jari / Naggar side",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near View (Malana Village) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around View (Malana Village)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near View (Malana Village)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to View (Malana Village)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below View (Malana Village) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over View (Malana Village)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near View (Malana Village)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to View (Malana Village)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around View (Malana Village) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near View (Malana Village)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to View (Malana Village)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower View (Malana Village) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Jari / Naggar side; camp nights near View at 2650 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Jari / Naggar side runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward View at 2650 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Malana Village at 2650 m in first light",
      "Malana camp at dusk",
      "View camp at dusk",
      "Jari / Naggar side approach and roadhead",
      "View on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Malana Village route out of Jari / Naggar side.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 1-2 days route from Jari / Naggar side runs 5–7 hours a day up to 2650 m.",
    "ams": "Low AMS risk at 2650 m near View; hydrate well and ascend steadily from Jari / Naggar side.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Barshaini bridge",
      "Pulga meadows",
      "Parvati river beaches",
      "Kheerganga hot spring pool"
    ],
    "nearbyTreks": [
      "Kalga to Kheerganga link",
      "Kheerganga",
      "Waichin Valley",
      "Pulga Fairy Forest"
    ],
    "budget": {
      "budget": "₹1,200–2,200",
      "standard": "₹2,900–4,700",
      "premium": "₹5,500–9,100"
    },
    "days": [
      {
        "title": "Day 1: Jari to Malana gate trail",
        "start": "Jari (1,800 m)",
        "end": "Malana approach (2,400 m)",
        "distanceKm": "6",
        "altitudeM": "2400",
        "elevationGain": "+600 m",
        "trekTime": "4 hours",
        "terrain": "Forest",
        "description": "Approach only on permitted path; no photography of villagers.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Malana",
        "campStay": "Trekker's camp at Malana approach (2,400 m)",
        "weather": "Warm valley air by the river near Malana; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Golden-hour views near Malana: Forest",
        "safety": "Wooden or wire bridges before Malana can be slick after rain—cross one at a time"
      },
      {
        "title": "Day 2: Malana village to Chandrakhani viewpoint",
        "start": "Malana (2,650 m)",
        "end": "View ridge (2,800 m)",
        "distanceKm": "4",
        "altitudeM": "2800",
        "elevationGain": "+150 m",
        "trekTime": "2 hours",
        "terrain": "Ridge",
        "description": "Short ridge walk with strict cultural compliance.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at View",
        "campStay": "Trekker's camp at View ridge (2,800 m)",
        "weather": "Humid, orchard-scented air near View with a cold night breeze off the river",
        "photography": "Wide-angle vantage at View: Ridge",
        "safety": "Stay on the marked path near View; riverside banks can undercut without warning"
      }
    ],
    "whyChoose": [
      "Distinct Malana Village Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Controlled approach to Malana respecting local rules."
  },
  "rasol": {
    "key": "rasol",
    "name": "Rasol Village Trek",
    "region": "parvati",
    "location": "Rasol Village Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Rasol village above Chalal has traditionally been a quieter, less-visited stop on the Kasol side trails, reached by crossing the Chalal bridge and climbing through forest largely used by local shepherds. Its distance from the main Kasol road has kept it noticeably calmer than nearby villages.",
    "difficulty": "Easy",
    "distanceKm": "7 km",
    "duration": "1 day",
    "highestAltitudeM": "2500",
    "baseCamp": "Kasol",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Rasol (Rasol Village) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Rasol (Rasol Village)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Rasol (Rasol Village)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Rasol (Rasol Village)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Rasol (Rasol Village) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Rasol (Rasol Village)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Rasol (Rasol Village)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Rasol (Rasol Village)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Rasol (Rasol Village) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Rasol (Rasol Village)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Rasol (Rasol Village)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Rasol (Rasol Village) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kasol; camp nights near Rasol at 2500 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Kasol runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Rasol at 2500 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Rasol Village at 2500 m in first light",
      "Chalal camp at dusk",
      "Rasol camp at dusk",
      "Kasol approach and roadhead",
      "Rasol on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Rasol Village route out of Kasol.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 7 km route from Kasol—expect 3–5 hours of walking a day up to 2500 m.",
    "ams": "Low AMS risk at 2500 m near Rasol; hydrate well and ascend steadily from Kasol.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Parvati river beaches",
      "Kheerganga hot spring pool",
      "Kasol cafes",
      "Manikaran hot springs and gurudwara"
    ],
    "nearbyTreks": [
      "Chalal Riverside",
      "Tosh Village",
      "Grahan Village",
      "Tulga Village Circuit"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Kasol to Chalal bridge",
        "start": "Kasol (1,580 m)",
        "end": "Chalal bridge (1,700 m)",
        "distanceKm": "2",
        "altitudeM": "1700",
        "elevationGain": "+120 m",
        "trekTime": "1 hour",
        "terrain": "Riverside",
        "description": "Warm-up along Parvati to footbridge.",
        "meals": "Packed lunch by the trail; local dal-chawal dinner at Chalal",
        "campStay": "Trekker's camp at Chalal bridge (1,700 m)",
        "weather": "Humid, orchard-scented air near Chalal with a cold night breeze off the river",
        "photography": "Wide-angle vantage at Chalal: Riverside",
        "safety": "Stay on the marked path near Chalal; riverside banks can undercut without warning"
      },
      {
        "title": "Day 2: Chalal to Rasol",
        "start": "Chalal (1,800 m)",
        "end": "Rasol (2,500 m)",
        "distanceKm": "5",
        "altitudeM": "2500",
        "elevationGain": "+700 m",
        "trekTime": "3-4 hours",
        "terrain": "Steep forest",
        "description": "Climb to Rasol perched above valley.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Rasol",
        "campStay": "Trekker's camp at Rasol (2,500 m)",
        "weather": "Warm valley air by the river near Rasol; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Sunrise silhouettes at Rasol: Steep forest",
        "safety": "Wooden or wire bridges before Rasol can be slick after rain—cross one at a time"
      }
    ],
    "whyChoose": [
      "Distinct Rasol Village Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Kasol to Rasol cliff village."
  },
  "pulga": {
    "key": "pulga",
    "name": "Pulga Fairy Forest Trek",
    "region": "parvati",
    "location": "Pulga Fairy Forest Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Pulga's terraced fields and old wooden houses sit above the Parvati river on a route long used by shepherds and villagers moving between Barshaini and the higher pastures toward Kheerganga. Local legend attributes an almost otherworldly, 'fairy forest' quality to the dense woods just above the village.",
    "difficulty": "Easy",
    "distanceKm": "5 km",
    "duration": "1 day",
    "highestAltitudeM": "2600",
    "baseCamp": "Barshaini",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Tulga (Pulga Fairy Forest) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Tulga (Pulga Fairy Forest)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Tulga (Pulga Fairy Forest)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Tulga (Pulga Fairy Forest)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Tulga (Pulga Fairy Forest) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Tulga (Pulga Fairy Forest)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Tulga (Pulga Fairy Forest)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Tulga (Pulga Fairy Forest)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Tulga (Pulga Fairy Forest) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Tulga (Pulga Fairy Forest)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Tulga (Pulga Fairy Forest)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Tulga (Pulga Fairy Forest) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Barshaini; camp nights near Tulga at 2600 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Barshaini runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Tulga at 2600 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Pulga Fairy Forest at 2600 m in first light",
      "Pulga camp at dusk",
      "Tulga camp at dusk",
      "Barshaini approach and roadhead",
      "Tulga on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Pulga Fairy Forest route out of Barshaini.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 5 km route from Barshaini—expect 3–5 hours of walking a day up to 2600 m.",
    "ams": "Low AMS risk at 2600 m near Tulga; hydrate well and ascend steadily from Barshaini.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kasol cafes",
      "Manikaran hot springs and gurudwara",
      "Chalal riverside walk",
      "Jari-Malana road"
    ],
    "nearbyTreks": [
      "Magic Valley (Waichin)",
      "Kutla Meadow",
      "Malana Village",
      "Kalga to Kheerganga link"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Barshaini to Pulga",
        "start": "Barshaini (2,200 m)",
        "end": "Pulga (2,600 m)",
        "distanceKm": "5",
        "altitudeM": "2600",
        "elevationGain": "+400 m",
        "trekTime": "2-3 hours",
        "terrain": "Cedar forest",
        "description": "Gentle climb to Pulga homestays.",
        "meals": "Tea and energy bars on the trail; a full hot meal at the Pulga kitchen tent",
        "campStay": "Trekker's camp at Pulga (2,600 m)",
        "weather": "Warm valley air by the river near Pulga; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Sunrise silhouettes at Pulga: Cedar forest",
        "safety": "Wooden or wire bridges before Pulga can be slick after rain—cross one at a time"
      },
      {
        "title": "Day 2: Pulga to Tulga ridge",
        "start": "Pulga (2,600 m)",
        "end": "Tulga spur (2,650 m)",
        "distanceKm": "2",
        "altitudeM": "2650",
        "elevationGain": "+50 m",
        "trekTime": "1 hour",
        "terrain": "Forest ridge",
        "description": "Short link toward Tulga villages.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Tulga",
        "campStay": "Trekker's camp at Tulga spur (2,650 m)",
        "weather": "Humid, orchard-scented air near Tulga with a cold night breeze off the river",
        "photography": "Late-afternoon panorama from Tulga: Forest ridge",
        "safety": "Stay on the marked path near Tulga; riverside banks can undercut without warning"
      }
    ],
    "whyChoose": [
      "Distinct Pulga Fairy Forest Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Barshaini to Pulga through cedar fairy forest."
  },
  "tulga": {
    "key": "tulga",
    "name": "Tulga Village Circuit",
    "region": "parvati",
    "location": "Tulga Village Circuit trailheads in Parvati River, Himachal Pradesh",
    "history": "Tulga is one of the smallest and quietest hamlets on the Barshaini side circuit, sitting between Pulga and Kalga on a trail long used by local villagers rather than built for tourism. Its handful of homes and terraced patches have changed little over the decades.",
    "difficulty": "Easy",
    "distanceKm": "6 km",
    "duration": "1 day",
    "highestAltitudeM": "2700",
    "baseCamp": "Pulga",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Kalga (Tulga Village Circuit) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Kalga (Tulga Village Circuit)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Kalga (Tulga Village Circuit)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Kalga (Tulga Village Circuit)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Kalga (Tulga Village Circuit) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Kalga (Tulga Village Circuit)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Kalga (Tulga Village Circuit)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Kalga (Tulga Village Circuit)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Kalga (Tulga Village Circuit) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Kalga (Tulga Village Circuit)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Kalga (Tulga Village Circuit)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Kalga (Tulga Village Circuit) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Pulga; camp nights near Kalga at 2700 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Pulga runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Kalga at 2700 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Tulga Village Circuit at 2700 m in first light",
      "Tulga camp at dusk",
      "Kalga camp at dusk",
      "Pulga approach and roadhead",
      "Kalga on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Tulga Village Circuit route out of Pulga.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 6 km route from Pulga—expect 3–5 hours of walking a day up to 2700 m.",
    "ams": "Low AMS risk at 2700 m near Kalga; hydrate well and ascend steadily from Pulga.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Chalal riverside walk",
      "Jari-Malana road",
      "Barshaini bridge",
      "Pulga meadows"
    ],
    "nearbyTreks": [
      "Kheerganga",
      "Waichin Valley",
      "Rasol Village",
      "Chalal Riverside"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Pulga to Tulga",
        "start": "Pulga (2,600 m)",
        "end": "Tulga (2,700 m)",
        "distanceKm": "3",
        "altitudeM": "2700",
        "elevationGain": "+100 m",
        "trekTime": "1-2 hours",
        "terrain": "Village lanes",
        "description": "Walk between twin villages above Parvati.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Tulga",
        "campStay": "Trekker's camp at Tulga (2,700 m)",
        "weather": "Humid, orchard-scented air near Tulga with a cold night breeze off the river",
        "photography": "Late-afternoon panorama from Tulga: Village lanes",
        "safety": "Stay on the marked path near Tulga; riverside banks can undercut without warning"
      },
      {
        "title": "Day 2: Tulga to Kalga",
        "start": "Tulga (2,700 m)",
        "end": "Kalga (2,800 m)",
        "distanceKm": "3",
        "altitudeM": "2800",
        "elevationGain": "+100 m",
        "trekTime": "1 hour",
        "terrain": "Orchard paths",
        "description": "Finish at Kalga apple terraces.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Kalga",
        "campStay": "Trekker's camp at Kalga (2,800 m)",
        "weather": "Warm valley air by the river near Kalga; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Best light at Kalga: Orchard paths",
        "safety": "Wooden or wire bridges before Kalga can be slick after rain—cross one at a time"
      }
    ],
    "whyChoose": [
      "Distinct Tulga Village Circuit scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Pulga-Tulga-Kalga village triangle."
  },
  "kalga": {
    "key": "kalga",
    "name": "Kalga to Kheerganga link",
    "region": "parvati",
    "location": "Kalga to Kheerganga link trailheads in Parvati River, Himachal Pradesh",
    "history": "Kalga, perched above the Parvati river with Pin Parvati range views, has grown from a small shepherd hamlet into a favoured base for travellers exploring the Kheerganga and Waichin side trails. Its terraced apple orchards still reflect its farming roots.",
    "difficulty": "Moderate",
    "distanceKm": "8 km",
    "duration": "1 day",
    "highestAltitudeM": "2800",
    "baseCamp": "Kalga",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Kheerganga (Kalga to Kheerganga link) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Kheerganga (Kalga to Kheerganga link)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Kheerganga (Kalga to Kheerganga link)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Kheerganga (Kalga to Kheerganga link)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Kheerganga (Kalga to Kheerganga link) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Kheerganga (Kalga to Kheerganga link)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Kheerganga (Kalga to Kheerganga link)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Kheerganga (Kalga to Kheerganga link)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Kheerganga (Kalga to Kheerganga link) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Kheerganga (Kalga to Kheerganga link)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Kheerganga (Kalga to Kheerganga link)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Kheerganga (Kalga to Kheerganga link) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kalga; camp nights near Kheerganga at 2800 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Kalga runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Kheerganga at 2800 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Kalga to Kheerganga link at 2800 m in first light",
      "Ridge camp at dusk",
      "Kheerganga camp at dusk",
      "Kalga approach and roadhead",
      "Kheerganga on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Kalga to Kheerganga link route out of Kalga.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 1 day route from Kalga runs 5–7 hours a day up to 2800 m.",
    "ams": "Low AMS risk at 2800 m near Kheerganga; hydrate well and ascend steadily from Kalga.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Barshaini bridge",
      "Pulga meadows",
      "Parvati river beaches",
      "Kheerganga hot spring pool"
    ],
    "nearbyTreks": [
      "Tosh Village",
      "Grahan Village",
      "Pulga Fairy Forest",
      "Magic Valley (Waichin)"
    ],
    "budget": {
      "budget": "₹1,200–2,200",
      "standard": "₹2,900–4,700",
      "premium": "₹5,500–9,100"
    },
    "days": [
      {
        "title": "Day 1: Kalga to ridge camp",
        "start": "Kalga (2,800 m)",
        "end": "Ridge camp (3,000 m)",
        "distanceKm": "4",
        "altitudeM": "3000",
        "elevationGain": "+200 m",
        "trekTime": "2 hours",
        "terrain": "Forest",
        "description": "Upper path avoiding Nakthan crowds.",
        "meals": "Early breakfast before departure; a freshly cooked dinner at Ridge",
        "campStay": "Alpine tents at Ridge camp (3,000 m)",
        "weather": "Warm valley air by the river near Ridge; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Best light at Ridge: Forest",
        "safety": "Wooden or wire bridges before Ridge can be slick after rain—cross one at a time"
      },
      {
        "title": "Day 2: Ridge toward Kheerganga junction",
        "start": "Ridge camp (3,000 m)",
        "end": "Kheerganga junction (2,900 m)",
        "distanceKm": "4",
        "altitudeM": "2900",
        "elevationGain": "Descent",
        "trekTime": "2 hours",
        "terrain": "Switchbacks",
        "description": "Descend toward Kheerganga trail network.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Kheerganga",
        "campStay": "Trekker's camp at Kheerganga junction (2,900 m)",
        "weather": "Humid, orchard-scented air near Kheerganga with a cold night breeze off the river",
        "photography": "A classic frame from Kheerganga: Switchbacks",
        "safety": "Stay on the marked path near Kheerganga; riverside banks can undercut without warning"
      }
    ],
    "whyChoose": [
      "Distinct Kalga to Kheerganga link scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Kalga upper trail toward Kheerganga ridge."
  },
  "chalal": {
    "key": "chalal",
    "name": "Chalal Riverside Trek",
    "region": "parvati",
    "location": "Chalal Riverside Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Chalal, reached by a small suspension bridge across the Parvati river from Kasol, has long been a riverside walking route for local villagers and has more recently become a relaxed cafe-hopping trail for travellers based in Kasol. The forest path beyond it leads on toward Rasol.",
    "difficulty": "Easy",
    "distanceKm": "4 km",
    "duration": "1 day",
    "highestAltitudeM": "1800",
    "baseCamp": "Kasol",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Rasol (Chalal Riverside) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Rasol (Chalal Riverside)"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Rasol (Chalal Riverside)"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Rasol (Chalal Riverside)"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Rasol (Chalal Riverside) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Rasol (Chalal Riverside)"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Rasol (Chalal Riverside)—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Rasol (Chalal Riverside)"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Rasol (Chalal Riverside) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Rasol (Chalal Riverside)"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Rasol (Chalal Riverside)"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Rasol (Chalal Riverside) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kasol; camp nights near Rasol at 1800 m fall to 4 to 12°C.",
    "floraFauna": "The approach from Kasol runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Rasol at 1800 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Chalal Riverside at 1800 m in first light",
      "Chalal camp at dusk",
      "Rasol camp at dusk",
      "Kasol approach and roadhead",
      "Rasol on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Chalal Riverside route out of Kasol.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹1,500–2,800 per day for a local guide",
    "porterCharges": "₹1,000–2,000 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Basic fitness is enough for the 4 km route from Kasol—expect 3–5 hours of walking a day up to 1800 m.",
    "ams": "Low AMS risk at 1800 m near Rasol; hydrate well and ascend steadily from Kasol.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Parvati river beaches",
      "Kheerganga hot spring pool",
      "Kasol cafes",
      "Manikaran hot springs and gurudwara"
    ],
    "nearbyTreks": [
      "Kutla Meadow",
      "Malana Village",
      "Tulga Village Circuit",
      "Kheerganga"
    ],
    "budget": {
      "budget": "₹900–1,700",
      "standard": "₹2,200–3,600",
      "premium": "₹4,200–7,000"
    },
    "days": [
      {
        "title": "Day 1: Kasol to Chalal",
        "start": "Kasol (1,580 m)",
        "end": "Chalal (1,800 m)",
        "distanceKm": "2",
        "altitudeM": "1800",
        "elevationGain": "+220 m",
        "trekTime": "1 hour",
        "terrain": "Riverside path",
        "description": "Flat riverside walk to Chalal trance cafes.",
        "meals": "Simple parathas for breakfast; soup and khichdi dinner at Chalal",
        "campStay": "Trekker's camp at Chalal (1,800 m)",
        "weather": "Humid, orchard-scented air near Chalal with a cold night breeze off the river",
        "photography": "A classic frame from Chalal: Riverside path",
        "safety": "Stay on the marked path near Chalal; riverside banks can undercut without warning"
      },
      {
        "title": "Day 2: Chalal to Rasol turnoff",
        "start": "Chalal (1,800 m)",
        "end": "Rasol trail fork (1,850 m)",
        "distanceKm": "2",
        "altitudeM": "1850",
        "elevationGain": "+50 m",
        "trekTime": "30 min",
        "terrain": "Forest",
        "description": "Short extension toward Rasol fork.",
        "meals": "Trail snacks through the day; hot dinner and bonfire at Rasol",
        "campStay": "Trekker's camp at Rasol trail fork (1,850 m)",
        "weather": "Warm valley air by the river near Rasol; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Golden-hour views near Rasol: Forest",
        "safety": "Wooden or wire bridges before Rasol can be slick after rain—cross one at a time"
      }
    ],
    "whyChoose": [
      "Distinct Chalal Riverside Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Easy Kasol to Chalal cafe walk."
  },
  "magic-valley": {
    "key": "magic-valley",
    "name": "Magic Valley (Waichin) Trek",
    "region": "parvati",
    "location": "Magic Valley (Waichin) Trek trailheads in Parvati River, Himachal Pradesh",
    "history": "Magic Valley, the upper reach of the Waichin side valley above Kalga, earned its name from travellers struck by the sudden opening of glacier-lined meadow after a steep forest climb. It remains one of the quieter alternatives to the crowded Kheerganga trail for those based in Kalga or Pulga.",
    "difficulty": "Moderate",
    "distanceKm": "12 km",
    "duration": "2 days",
    "highestAltitudeM": "3100",
    "baseCamp": "Kalga / Pulga",
    "nearestRail": "Joginder Nagar",
    "nearestAirport": "Bhuntar",
    "roadConnectivity": "Bhuntar-Kasol-Manikaran-Barshaini",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Snow closes the higher trail; the valley near Pulga (Magic Valley (Waichin)) stays cold but reachable"
      },
      {
        "month": "February",
        "note": "Cold riverside mornings with clear light around Pulga (Magic Valley (Waichin))"
      },
      {
        "month": "March",
        "note": "Orchards begin to bud along the Parvati trail near Pulga (Magic Valley (Waichin))"
      },
      {
        "month": "April",
        "note": "Blossom season and pleasant days on the approach to Pulga (Magic Valley (Waichin))"
      },
      {
        "month": "May",
        "note": "Warm valley days; the river below Pulga (Magic Valley (Waichin)) runs full with snowmelt"
      },
      {
        "month": "June",
        "note": "Building humidity before the monsoon breaks over Pulga (Magic Valley (Waichin))"
      },
      {
        "month": "July",
        "note": "Monsoon downpours and a swollen river near Pulga (Magic Valley (Waichin))—bridges can wash out"
      },
      {
        "month": "August",
        "note": "Continued rain; landslide watch on the Kasol-Barshaini road to Pulga (Magic Valley (Waichin))"
      },
      {
        "month": "September",
        "note": "Rain eases; the valley around Pulga (Magic Valley (Waichin)) turns lush and photogenic"
      },
      {
        "month": "October",
        "note": "Best autumn window with stable river crossings near Pulga (Magic Valley (Waichin))"
      },
      {
        "month": "November",
        "note": "Cold nights and thinning crowds on the trail to Pulga (Magic Valley (Waichin))"
      },
      {
        "month": "December",
        "note": "Snow dusts the upper trail; lower Pulga (Magic Valley (Waichin)) stays walkable"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Kalga / Pulga; camp nights near Pulga at 3100 m fall to 0 to 8°C.",
    "floraFauna": "The approach from Kalga / Pulga runs through walnut, apple orchard and pine along the Parvati river corridor, thinning into shaded forest cover for most of the route on the climb toward Pulga at 3100 m. Keep an eye out for Himalayan monal, langurs and orchard birdlife along the river trail.",
    "photographySpots": [
      "Magic Valley (Waichin) at 3100 m in first light",
      "Magic camp at dusk",
      "Pulga camp at dusk",
      "Kalga / Pulga approach and roadhead",
      "Pulga on the return leg"
    ],
    "network": "Coverage as far as Barshaini; patchy to none beyond Kheerganga and side valleys",
    "electricity": "Guesthouses in Kasol/Barshaini have power; none at higher camps",
    "atm": "ATMs in Kasol and Bhuntar",
    "medical": "Basic aid in Kasol/Manikaran; Kullu hospital for serious cases",
    "camping": "Guesthouses and cafes in the villages; tented camps higher up the valley",
    "permits": "No special permit for Indian nationals; carry ID for occasional forest checkposts for the Magic Valley (Waichin) route out of Kalga / Pulga.",
    "forestFees": "Minor camping/forest fee at a few points",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "Quick-dry sandals for stream and bridge crossings",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 2 days route from Kalga / Pulga runs 5–7 hours a day up to 3100 m.",
    "ams": "Mild AMS risk near 3100 m around Pulga; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace",
      "Do not attempt river crossings if water is fast or above knee height"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Kasol cafes",
      "Manikaran hot springs and gurudwara",
      "Chalal riverside walk",
      "Jari-Malana road"
    ],
    "nearbyTreks": [
      "Waichin Valley",
      "Rasol Village",
      "Kalga to Kheerganga link",
      "Tosh Village"
    ],
    "budget": {
      "budget": "₹2,300–4,400",
      "standard": "₹5,700–9,400",
      "premium": "₹10,900–18,200"
    },
    "days": [
      {
        "title": "Day 1: Kalga to Magic Valley camp",
        "start": "Kalga (2,800 m)",
        "end": "Magic Valley (3,100 m)",
        "distanceKm": "6",
        "altitudeM": "3100",
        "elevationGain": "+300 m",
        "trekTime": "4 hours",
        "terrain": "Meadow",
        "description": "Overnight at so-called Magic Valley camps with peak amphitheatre.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Magic",
        "campStay": "Alpine tents at Magic Valley (3,100 m)",
        "weather": "Warm valley air by the river near Magic; evenings cool quickly once the sun sets behind the ridge",
        "photography": "Golden-hour views near Magic: Meadow",
        "safety": "Wooden or wire bridges before Magic can be slick after rain—cross one at a time"
      },
      {
        "title": "Day 2: Magic Valley to Pulga return",
        "start": "Magic Valley (3,100 m)",
        "end": "Pulga (2,600 m)",
        "distanceKm": "6",
        "altitudeM": "2600",
        "elevationGain": "Descent",
        "trekTime": "3 hours",
        "terrain": "Forest",
        "description": "Return to Pulga for bus to Barshaini.",
        "meals": "Light breakfast before the climb; camp-cooked dinner served at Pulga",
        "campStay": "Trekker's camp at Pulga (2,600 m)",
        "weather": "Humid, orchard-scented air near Pulga with a cold night breeze off the river",
        "photography": "Wide-angle vantage at Pulga: Forest",
        "safety": "Stay on the marked path near Pulga; riverside banks can undercut without warning"
      }
    ],
    "whyChoose": [
      "Distinct Magic Valley (Waichin) Trek scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Magic Valley nickname for Waichin meadows above Pulga."
  },
  "himachal-cluster": {
    "key": "himachal-cluster",
    "name": "Himachal Multi-Region Trek Sampler",
    "region": "himachal",
    "location": "Himachal Multi-Region Trek Sampler trailheads in multi-region, Himachal Pradesh",
    "history": "This multi-region itinerary strings together short, well-established day and overnight treks from Dharamshala, Manali/Kullu, the Shimla hills and Spiti into a single sampler route, designed for visitors wanting a broad first taste of Himachal's varied trekking landscapes in one trip. Each leg follows an established, well-trodden local trail rather than a single continuous route.",
    "difficulty": "Moderate",
    "distanceKm": "Varies",
    "duration": "7-8 days",
    "highestAltitudeM": "3500",
    "baseCamp": "Shimla-Manali-Dharamshala circuit",
    "nearestRail": "Varies by trek",
    "nearestAirport": "Chandigarh/Bhuntar/Shimla",
    "roadConnectivity": "State highway network",
    "bestTime": "May-June; September-October",
    "snowfallMonths": "December-March on high sections",
    "monthWeather": [
      {
        "month": "January",
        "note": "Winter closures affect higher routes; lower valley legs stay open"
      },
      {
        "month": "February",
        "note": "Cold across all regions; good season only for low-altitude legs"
      },
      {
        "month": "March",
        "note": "Snowmelt begins in Kullu and Kangra; Spiti routes remain closed"
      },
      {
        "month": "April",
        "note": "Kullu and Kangra sections open; Spiti and high passes still shut"
      },
      {
        "month": "May",
        "note": "Best all-round window as Spiti road access opens for the season"
      },
      {
        "month": "June",
        "note": "Warm across the state; afternoon haze on lower forest legs"
      },
      {
        "month": "July",
        "note": "Monsoon affects Kangra, Kullu and Shimla legs; Spiti stays comparatively dry"
      },
      {
        "month": "August",
        "note": "Landslide risk on monsoon-facing roads; Spiti leg remains the safer option"
      },
      {
        "month": "September",
        "note": "Excellent post-monsoon clarity across every region on the circuit"
      },
      {
        "month": "October",
        "note": "Crisp autumn light state-wide; nights cold on all higher legs"
      },
      {
        "month": "November",
        "note": "Cold and dry; high passes begin closing for winter"
      },
      {
        "month": "December",
        "note": "Snow closes most high-altitude legs; only low valley routes stay feasible"
      }
    ],
    "temperature": "Day 10–20°C on the trail from Shimla-Manali-Dharamshala circuit; camp nights near Langza at 3500 m fall to −5 to 5°C.",
    "floraFauna": "The approach from Shimla-Manali-Dharamshala circuit runs through a mix of oak, deodar, alpine meadow and high-desert scrub across regions, thinning into open alpine meadow and scrub above the tree line on the climb toward Langza at 3500 m. Keep an eye out for a wide range of Himalayan wildlife depending on the region visited.",
    "photographySpots": [
      "Himachal Multi-Region Trek Sampler at 3500 m in first light",
      "Triund camp at dusk",
      "Dhundi camp at dusk",
      "Serolsar camp at dusk",
      "Shimla-Manali-Dharamshala circuit approach and roadhead"
    ],
    "network": "Coverage varies widely by leg—good in towns, patchy to none on the high trail sections",
    "electricity": "Charge fully in each base town before the next leg",
    "atm": "ATMs available in every base town on the circuit",
    "medical": "District hospitals in each base town; carry a full first-aid kit between legs",
    "camping": "A mix of hotels, homestays and tented camps depending on the leg",
    "permits": "Permit needs vary by leg—Spiti/Kinnaur legs may need Inner Line Permit for foreigners for the Himachal Multi-Region Trek Sampler route out of Shimla-Manali-Dharamshala circuit.",
    "forestFees": "Varies by leg; carry cash for small forest/camping fees",
    "guideCharges": "₹2,000–3,600 per day for a local guide",
    "porterCharges": "₹1,300–2,600 per day per porter load",
    "packing": [
      "Sturdy trekking shoes with ankle support",
      "Layered clothing (base, fleece, windshell)",
      "Rain jacket and pack cover",
      "Headlamp with spare batteries",
      "1–2 L water bottles or hydration bladder",
      "Personal first-aid and blister kit",
      "A slightly larger duffel—kit needs vary across the different legs",
      "Sunscreen SPF 50, sunglasses, lip balm",
      "Trekking poles (recommended on steeps)"
    ],
    "fitness": "Build stamina with hill walks beforehand; the 7-8 days route from Shimla-Manali-Dharamshala circuit runs 5–7 hours a day up to 3500 m.",
    "ams": "Mild AMS risk near 3500 m around Langza; take it slow on the last climb and report symptoms early.",
    "carry": [
      "Valid ID and trek permits if required",
      "Cash for remote villages and fees",
      "Power bank (10,000 mAh+)",
      "Quick-dry towel and toiletries",
      "Electrolyte sachets and dry snacks"
    ],
    "safety": [
      "Start early; avoid afternoon storms on exposed ridges",
      "Never trek alone on remote or snow-bound sections",
      "Inform someone of your itinerary and expected return",
      "Respect local customs and leave no trace"
    ],
    "emergency": [
      "Save local police and nearest PHC numbers before departure",
      "Carry a charged phone; download offline maps",
      "Know nearest roadhead and evacuation options"
    ],
    "nearbyAttractions": [
      "Dharamshala McLeod Ganj",
      "Kaza market in Spiti",
      "Kullu Dussehra ground",
      "Shimla Mall Road"
    ],
    "nearbyTreks": [],
    "budget": {
      "budget": "₹8,200–15,500",
      "standard": "₹20,000–32,800",
      "premium": "₹38,200–63,700"
    },
    "days": [
      {
        "title": "Day 1: Day block: Gallu to Triund sample",
        "start": "McLeod Ganj (1,750 m)",
        "end": "Triund ridge (2,850 m)",
        "distanceKm": "9",
        "altitudeM": "2850",
        "elevationGain": "Dhauladhar sample",
        "trekTime": "1 day",
        "terrain": "Ridge",
        "description": "Representative Dhauladhar overnight stage for cluster articles.",
        "meals": "Village thali if staying over; otherwise a hot camp dinner at Triund",
        "campStay": "Trekker's camp at Triund ridge (2,850 m)",
        "weather": "Conditions vary by region on this leg near Triund—check the local forecast each morning",
        "photography": "Wide-angle vantage at Triund: Ridge",
        "safety": "Conditions differ by region near Triund; follow your local guide's specific briefing"
      },
      {
        "title": "Day 2: Day block: Solang to Dhundi sample",
        "start": "Solang (2,500 m)",
        "end": "Dhundi (3,000 m)",
        "distanceKm": "5",
        "altitudeM": "3000",
        "elevationGain": "Kullu sample",
        "trekTime": "1 day",
        "terrain": "Meadow",
        "description": "Manali-side acclimatisation sample day.",
        "meals": "Hot soup on arrival followed by a full dinner spread at Dhundi",
        "campStay": "Alpine tents at Dhundi (3,000 m)",
        "weather": "Conditions vary by region on this leg near Dhundi—check the local forecast each morning",
        "photography": "Sunrise silhouettes at Dhundi: Meadow",
        "safety": "Conditions differ by region near Dhundi; follow your local guide's specific briefing"
      },
      {
        "title": "Day 3: Day block: Jalori to Serolsar sample",
        "start": "Jalori Pass (3,120 m)",
        "end": "Serolsar Lake (3,190 m)",
        "distanceKm": "5",
        "altitudeM": "3190",
        "elevationGain": "Shimla hills sample",
        "trekTime": "1 day",
        "terrain": "Lake",
        "description": "Central Himachal lake day for cluster content.",
        "meals": "Dry fruits and glucose biscuits on the climb; rice-and-curry dinner at Serolsar",
        "campStay": "Alpine tents at Serolsar Lake (3,190 m)",
        "weather": "Conditions vary by region on this leg near Serolsar—check the local forecast each morning",
        "photography": "Late-afternoon panorama from Serolsar: Lake",
        "safety": "Conditions differ by region near Serolsar; follow your local guide's specific briefing"
      },
      {
        "title": "Day 4: Day block: Kaza village acclimatisation",
        "start": "Kaza (3,800 m)",
        "end": "Langza road walk (4,400 m)",
        "distanceKm": "12",
        "altitudeM": "4400",
        "elevationGain": "Spiti sample",
        "trekTime": "1 day",
        "terrain": "Desert road",
        "description": "Spiti high-desert acclimatisation sample without duplicating full Pin trek.",
        "meals": "Packed trail lunch en route; hot dal-rice dinner at Langza",
        "campStay": "Alpine tents at Langza road walk (4,400 m)",
        "weather": "Biting wind and sub-zero pre-dawn cold near Langza; move before the cloud build-up",
        "photography": "Best light at Langza: Desert road",
        "safety": "Watch for AMS symptoms near Langza; descend if headache or nausea persists"
      }
    ],
    "whyChoose": [
      "Distinct Himachal Multi-Region Trek Sampler scenery",
      "Clear day-wise planning for blogs",
      "Practical altitude and camp notes"
    ],
    "trailOverview": "Blog cluster itinerary sampling Dharamshala, Manali, and Shimla belt day treks."
  }
};

export function getTrekProfile(key: string): HimachalTrekProfile | undefined {
  return HIMACHAL_TREK_PROFILES[key];
}
