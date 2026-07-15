import { img } from "@/lib/media";
import type { TrekDetail } from "@/types/trek-detail";
import type { FAQ } from "@/types";

const packingWeekend = [
  {
    category: "Clothing" as const,
    items: [
      "Thermals",
      "Trekking pants",
      "Warm jacket",
      "Socks",
      "Waterproof gloves",
      "Sun cap",
      "Moisture-wicking t-shirts (2–3)",
    ],
  },
  {
    category: "Footwear" as const,
    items: ["Trekking shoes", "Slippers / floaters"],
  },
  {
    category: "Documents" as const,
    items: ["Government ID proof", "Booking confirmation"],
  },
  {
    category: "Medical" as const,
    items: ["Personal medical kit", "ORS / electrolytes", "Protein bars"],
  },
  {
    category: "Accessories" as const,
    items: [
      "Sunglasses & sunscreen",
      "Headlamp / torch",
      "Toiletries",
      "Water bottle",
      "Plastic bags",
      "Trekking pole",
    ],
  },
  {
    category: "Electronics" as const,
    items: ["Camera (optional)", "Power bank", "Phone"],
  },
];

const cancellationFaq = (id: string): FAQ => ({
  id,
  question: "What is your cancellation and refund policy?",
  answer:
    "Cancellations 45+ days before departure: 25% fee. 15–30 days: 50% fee. Within 0–15 days: 100% of the tour cost. For weather or government restrictions, we try to offer a viable alternative; cash refund may not be available in those cases. Approved refunds are credited to the original payment method in 10–12 working days.",
  category: "cancellation",
});

const kheergangaFaqs: FAQ[] = [
  {
    id: "kg-f1",
    question: "Will we be able to find snow in Kheerganga?",
    answer:
      "Yes, you can often see snow from late November through March. Snow is not guaranteed year-round. Winter nights stay cold. For reliable snow views in the wider region, Kasol, Tosh, and Manali are popular nearby stops.",
    category: "trek",
  },
  {
    id: "kg-f2",
    question: "Can inexperienced trekkers hike the Kheerganga trail?",
    answer:
      "Yes. Kheerganga is a great first Himalayan trek for people with ordinary fitness and no prior experience. Families regularly do it; parents or guardians must accompany children under 15.",
    category: "trek",
  },
  {
    id: "kg-f3",
    question: "Is Kheerganga Trek difficult?",
    answer:
      "It is rated easy to moderate. The one-way distance is about 12 km with waterfall crossings and some steeper stretches. Most people take 4–6 hours uphill. The trail is largely a forest and village walk that beginners complete successfully.",
    category: "trek",
  },
  {
    id: "kg-f4",
    question: "Is there mobile network in Kheerganga?",
    answer:
      "Coverage on the trail and at the top is poor. BSNL works in patches; other networks often fail. Make important calls from Kasol or Barshaini before you start.",
    category: "trek",
  },
  {
    id: "kg-f5",
    question: "What are the risks of high-altitude trekking?",
    answer:
      "Altitude can cause headache, nausea, or fatigue. Tell your trek leader if you feel unwell and carry personal medication. The team carries a basic first-aid kit; rest, hydrate, and descend if symptoms worsen.",
    category: "safety",
  },
  {
    id: "kg-f6",
    question: "What are the most important Kheerganga trekking tips?",
    answer:
      "Prepare for changing weather, carry personal medicine, go with a guide if you are new to hiking, expect remote camping with limited amenities, avoid wasting food or water, follow camp rules, and stay with your group.",
    category: "trek",
  },
  {
    id: "kg-f7",
    question: "Is it advisable to take the Kheerganga trek in winter?",
    answer:
      "The route stays open in winter, but snow can make sections slippery and slow. Use proper trekking shoes and poles, and prefer a guided group. The hot springs at the top feel especially rewarding after a cold climb.",
    category: "trek",
  },
  {
    id: "kg-f8",
    question: "What is Kheerganga well-known for?",
    answer:
      "Kheerganga is known for natural hot springs (Parvati Kund), camping under Himalayan skies, forest trails through Parvati Valley villages, and a relaxed weekend escape from city life — often paired with time in Kasol.",
    category: "general",
  },
  {
    id: "kg-f9",
    question: "Can we spend the night in Kheerganga?",
    answer:
      "Overnight camping is arranged as part of this 2 days / 1 night package when permitted by local guidelines. After a 5–7 hour ascent, you camp near the hot springs and return the next day.",
    category: "trek",
  },
  {
    id: "kg-f10",
    question: "Where does the Kheerganga Trek begin?",
    answer:
      "The trek starts at Barshaini (also spelled Bharshaini), near the Parvati dam, at roughly 1,189 m. It is a short drive from Kasol and about three hours by road from Manali. Overnight camping is at Kheerganga (~3,050 m).",
    category: "general",
  },
  {
    id: "kg-f11",
    question: "What is the history behind the Kheerganga name?",
    answer:
      "Local lore links the area with Lord Shiva and Kartikeya. “Kheerganga” refers to the milky-white sacred hot spring water. A dip in Parvati Kund is considered holy, and there is an old temple near the springs.",
    category: "general",
  },
  {
    id: "kg-f12",
    question: "Is drinking water available on the Kheerganga trail?",
    answer:
      "Carry what you need from Barshaini, as shops thin out after the start. You can refill at natural springs and ashrams along the route when available — ask your guide which sources are safe.",
    category: "trek",
  },
  {
    id: "kg-f13",
    question: "How do I get to Kheerganga / Barshaini?",
    answer:
      "There is no direct rail or road from Delhi to Kasol. By road: overnight bus from Delhi ISBT Kashmere Gate / Majnu-Ka-Tila toward Kullu–Manali, alight at Bhuntar, then local bus to Kasol and cab or shared jeep to Barshaini. By rail: Pathankot or Joginder Nagar, then road to Kasol. By air: Bhuntar (Kullu) Airport, about 31 km from Kasol, then onward to Barshaini. Arrive by 10:00 AM on Day 1.",
    category: "general",
  },
  {
    id: "kg-f14",
    question: "What places can I visit near Kheerganga?",
    answer:
      "Tosh and Barshaini are scenic village stops. Kasol cafés and riverside walks are popular, Manikaran Sahib is a short hop away, and Manali is about three hours by road. Chalal and Malana make good add-on day hikes if you have extra time.",
    category: "general",
  },
  {
    id: "kg-f15",
    question: "What is the best time to visit Kheerganga?",
    answer:
      "March to June is the most popular window — pleasant days and clearer views. September to November is also excellent after the rains. Monsoon is lush but slipperier; winter brings cold and possible snow.",
    category: "trek",
  },
  {
    id: "kg-f16",
    question: "What is included in the trek fee?",
    answer:
      "Day 1 evening tea and dinner, Day 2 breakfast, evening group bonfire with music (till about 11:00 PM when conditions allow), experienced guide Barshaini–Kheerganga–Barshaini, and safari camps on a triple/quad sharing basis with common washroom.",
    category: "booking",
  },
  cancellationFaq("kg-f17"),
];

const kareriFaqs: FAQ[] = [
  {
    id: "kr-f1",
    question: "Can we visit Kareri Lake in December?",
    answer:
      "April to December generally works for organising the trek, covering summer, monsoon, and early winter moods. From late December through March the lake often freezes and may need technical gear — check conditions before you book a winter date.",
    category: "trek",
  },
  {
    id: "kr-f2",
    question: "Which trek is better — Triund or Kareri?",
    answer:
      "Triund is busier and closer to McLeod Ganj, with classic Dhauladhar views. Kareri Lake is quieter and suits hikers who want a freshwater lake, forest trails, and fewer crowds. Many travellers do both on separate weekends.",
    category: "general",
  },
  {
    id: "kr-f3",
    question: "Does it snow at Kareri Lake?",
    answer:
      "Yes. At this altitude snow is common mid-December through February. Trails and the lake shore can be snowbound — winter visits need warmer gear and guide judgement on route safety.",
    category: "trek",
  },
  {
    id: "kr-f4",
    question: "Can Kareri Lake be reached by car?",
    answer:
      "No. Drive or take a cab to Kareri Village (Kareri Khas) near Dharamshala, then begin the trek on foot. The lake itself is reached only by trail.",
    category: "general",
  },
  {
    id: "kr-f5",
    question: "Is there network at Kareri Lake?",
    answer:
      "Expect little or no coverage on the trail and at the lake. Even BSNL is intermittent. Carry cash — digital payments are unreliable once you leave the village.",
    category: "trek",
  },
  {
    id: "kr-f6",
    question: "How can I reach Kareri from Chandigarh?",
    answer:
      "Buses and shared cabs run Chandigarh to Dharamshala (roughly 6–7 hours). From Dharamshala, hire a taxi to Kareri Village and start the trek by 10:00 AM on Day 1.",
    category: "general",
  },
  {
    id: "kr-f7",
    question: "How do I go to Kareri Lake from Dharamshala?",
    answer:
      "Hire a jeep or cab from Dharamshala toward Ghera / Kareri Village (about 20+ km by road depending on route). The trek starts from Kareri Village and follows the Nyund stream uphill to the lake.",
    category: "general",
  },
  {
    id: "kr-f8",
    question: "Can I do the Kareri Lake trek alone?",
    answer:
      "Solo travellers regularly join guided groups. Booking with a certified guide is safer for navigation, weather calls, and camping logistics.",
    category: "safety",
  },
  {
    id: "kr-f9",
    question: "How do you do the Kareri Trek?",
    answer:
      "Reach Dharamshala first. Local buses go toward Ghera; from Ghera, Kareri Village is about a 2-hour walk, or take a cab direct to the village. Meet the group by 10:00 AM and trek via Riyoti to the lake camp.",
    category: "trek",
  },
  {
    id: "kr-f10",
    question: "How long is the trek from Kareri Village?",
    answer:
      "One way is roughly 9–10 km (about 20 km both ways). Expect 4–5 hours uphill via Riyoti halfway camp, and 3–4 hours on the return.",
    category: "trek",
  },
  {
    id: "kr-f11",
    question: "Can you swim in Kareri Lake?",
    answer:
      "It is a shallow freshwater lake. Some people swim in summer when the water is open; in winter the surface often freezes under deep snow on the approach — swimming is not advisable then.",
    category: "trek",
  },
  {
    id: "kr-f12",
    question: "Can we do Kareri Lake trek in one day?",
    answer:
      "A same-day out-and-back is tough (roughly 20 km both ways with climb). Most people prefer 2 days / 1 night to enjoy the lakeside camp and avoid a rushed dark descent.",
    category: "trek",
  },
  {
    id: "kr-f13",
    question: "Is Kareri Lake Trek easy?",
    answer:
      "It is easy to intermediate for anyone with reasonable fitness. Much of the path is straightforward, but some rocky uphill stretches demand paced walking and sturdy shoes.",
    category: "trek",
  },
  {
    id: "kr-f14",
    question: "What is included in the trek fee?",
    answer:
      "Day 1 evening tea and dinner, Day 2 breakfast, certified guide, camping gear (tents, sleeping bags, mats, kitchen utensils), bonfire when available, and pit-style toilet tents. Forest or other permits are not included.",
    category: "booking",
  },
  cancellationFaq("kr-f15"),
];

const snowlineFaqs: FAQ[] = [
  {
    id: "sl-f1",
    question: "Is Snowline Laka Trek difficult?",
    answer:
      "It is rated easy to moderate. Day 1 follows the classic Triund trail; Day 2 adds a steeper, rockier climb to Laka / Snowline (~3,200 m). Beginners with basic fitness manage it when paced with a guide.",
    category: "trek",
  },
  {
    id: "sl-f2",
    question: "Will there be snow on the Snowline / Laka trail?",
    answer:
      "Snow cover increases in winter and early spring. From late autumn through March you are more likely to walk on snow patches or continuous snow near Laka Glacier. Summer may show only patches depending on the season.",
    category: "trek",
  },
  {
    id: "sl-f3",
    question: "How is this trek connected to Triund?",
    answer:
      "Day 1 camps at Triund Top after the Bhagsunag–waterfall–Leta climb. Day 2 continues ~6 km beyond Triund to Laka Glacier / Snowline with views toward Indrahar Pass, then Day 3 descends all the way to Bhagsunag.",
    category: "trek",
  },
  {
    id: "sl-f4",
    question: "Where does the Snowline Laka Trek start?",
    answer:
      "Meet at Bhagsunag (Bhagsu Nag), Dharamshala, by 10:00 AM on Day 1 near the temple / taxi stand area. The route goes via Bhagsu waterfall toward Triund, then onward to Laka.",
    category: "general",
  },
  {
    id: "sl-f5",
    question: "How long is the Snowline Laka Trek?",
    answer:
      "Plan for 3 days / 2 nights. Total walking is around 24 km including Triund and the Laka extension. Day 3 typically ends back at Bhagsunag around 2:00 PM.",
    category: "trek",
  },
  {
    id: "sl-f6",
    question: "What is included in the package?",
    answer:
      "Welcome / evening tea, 2 dinners, 1 lunch, 2 breakfasts (veg), certified guide, camping gear, first-aid kit with the team, and pit-style toilet tents.",
    category: "booking",
  },
  cancellationFaq("sl-f7"),
];

export const weekendTrekDetails: TrekDetail[] = [
  {
    id: "detail-kheerganga",
    slug: "kheerganga-trek",
    title: "Kheerganga Trek",
    location: "Kasol, Himachal Pradesh",
    state: "Himachal Pradesh",
    region: "Parvati Valley",
    summary:
      "Kheerganga Trek in Parvati Valley — 2 days / 1 night from Barshaini with forest villages, waterfalls, and a soak in natural hot springs. Book from ₹1,099.",
    overview:
      "Kheerganga is one of Himachal’s most loved weekend treks, tucked deep in the Parvati Valley near Kasol. People come for the hot springs at Parvati Kund and for wide views over a valley of pine, oak, and apple orchards.\n\nThe walk is about 12 km one way (roughly 24 km both ways) on a mostly gentle trail that follows the Parvati River past waterfalls and small villages. Some stretches steepen, but the overall grade suits beginners who can manage 5–7 hours of walking with a light pack.\n\nAfter the climb, safari-style camping and a dip in the mineral hot springs make a classic Kasol weekend. Pair it with Tosh or Kasol cafés if you have an extra half day.",
    rating: 4.7,
    reviewCount: 1876,
    difficulty: "easy",
    durationDays: 2,
    durationNights: 1,
    maxAltitude: 10006,
    distanceKm: 24,
    bestSeasons: ["spring", "summer", "autumn"],
    basePriceInr: 1099,
    originalPriceInr: 1499,
    earlyBirdDiscountPercent: 27,
    groupDiscountNote: "Join a group | Weekend departures available",
    taxNote: "Prices inclusive of applicable GST",
    seatsLeft: 14,
    heroImages: [
      img("photo-1504280390367-361c6d9f38f4", 2200),
      img("photo-1478131143081-80f7f84ca84a", 2200),
      img("photo-1551632811-561732d1e306", 2200),
      img("photo-1519681393784-d120267933ba", 2200),
    ],
    gallery: [
      { src: img("photo-1504280390367-361c6d9f38f4"), alt: "Camp near Kheerganga meadows", span: "wide" },
      { src: img("photo-1478131143081-80f7f84ca84a"), alt: "Forest trail in Parvati Valley", span: "tall" },
      { src: img("photo-1551632811-561732d1e306"), alt: "Trekker on mountain ridge", span: "square" },
      { src: img("photo-1464822759023-fed622ff2c3b"), alt: "Snow-capped Himalayan peaks", span: "square" },
      { src: img("photo-1486870591958-9b9d0d1c83bf"), alt: "Alpine meadow path", span: "tall" },
      { src: img("photo-1500530855697-b586d89ba3ee"), alt: "Sunrise over the ranges", span: "wide" },
    ],
    quickInfo: {
      destination: "Parvati Valley / Kasol",
      duration: "2D / 1N",
      maxAltitude: "10,006 ft (3,050 m)",
      difficulty: "easy",
      distance: "24 km (both ways)",
      startingPoint: "Barshaini (Bharshaini), Parvati Valley",
      endingPoint: "Barshaini (Bharshaini), Parvati Valley",
      bestTime: "Mar–Jun, Sep–Nov",
      temperature: "5°C to 28°C (season dependent)",
      groupSize: "Join a group | Weekend departures",
      ageLimit: "16–45 years",
      fitnessLevel: "Easy to moderate — beginner friendly",
      accommodation: "Safari camps (triple / quad sharing, common washroom)",
      meals: "Evening tea & dinner (Day 1), breakfast (Day 2)",
      transport: "Self arrange to Barshaini via Kasol",
    },
    highlights: [
      "Hot spring bath at Parvati Kund after the ascent",
      "Scenic Parvati Valley villages and lush forest trails",
      "Snow-capped mountain views from the top on clear days",
      "Narrow trail along the river with waterfall crossings",
      "Evening bonfire with music (when conditions allow)",
      "Guided group trek with safari camping",
      "Ideal Kasol weekend getaway",
    ],
    itinerary: [
      {
        day: 1,
        title: "Barshaini to Kheerganga",
        distanceKm: 12,
        altitudeFt: 10006,
        walkingHours: "5–6 hrs",
        meals: ["Evening tea", "Dinner"],
        accommodation: "Safari camping at Kheerganga",
        description:
          "Reach Barshaini — the start of the Kheerganga trek (~3,050 m). Please arrive by 10:00 AM. Stock snacks or water in the village before you leave.\n\nThe trail begins as a gentle climb past apple orchards, then moves into deodar and oak forest with the Parvati River roaring below. Expect about 12 km and 5–6 hours of walking, with waterfall and village breaks along the way.\n\nOn arrival, settle into safari tents, then soak at Parvati Kund (natural hot springs) — especially rewarding in colder months. Evening tea, dinner, and a group bonfire with music (typically till 11:00 PM when permitted) wrap up the day.",
        images: [
          img("photo-1478131143081-80f7f84ca84a", 1000),
          img("photo-1504280390367-361c6d9f38f4", 1000),
        ],
      },
      {
        day: 2,
        title: "Kheerganga to Barshaini",
        distanceKm: 12,
        altitudeFt: 3900,
        walkingHours: "4–5 hrs",
        meals: ["Breakfast"],
        accommodation: "Return journey",
        description:
          "Start with morning tea in the quiet of Parvati Valley. After breakfast, descend the same ~12 km trail back to Barshaini in about 4–5 hours, typically finishing by around 2:00 PM.\n\nPause in the villages and forest clearings for photos on the way down. Once at Barshaini, you are free to explore nearby Tosh or return to Kasol for cafés, Manikaran, or onward travel.",
        images: [img("photo-1500530855697-b586d89ba3ee", 1000)],
      },
    ],
    inclusions: [
      "Day 1 — Evening tea and dinner (dal, sabji, chapati, rice)",
      "Day 2 — Breakfast (veg parantha / poori bhaji with tea)",
      "Evening group bonfire with music till ~11:00 PM (when available)",
      "Experienced group guide from Barshaini to Kheerganga and back",
      "Stay in safari camps (triple / quad sharing) with common washroom",
    ],
    exclusions: [
      "Tips / gratitude to the team",
      "Any private expenses",
      "Any cost arising due to natural calamities",
      "Transport to / from Kasol or Barshaini",
      "Hot spring entry fees (if charged locally)",
      "Any other service not mentioned in inclusions",
    ],
    packingList: packingWeekend,
    fitness: {
      level: "Easy to Moderate",
      score: 52,
      description:
        "Kheerganga suits beginners with basic fitness. Expect 5–7 hours of walking on Day 1 with sustained but mostly moderate climbs. You should be comfortable on forest trails with a daypack.",
      tips: [
        "Walk 3–4 km daily for two weeks before departure",
        "Practice stair climbs with a light backpack",
        "Hydrate well and avoid alcohol the night before",
        "Break in your trek shoes beforehand",
        "Arrive at Barshaini by 10:00 AM on Day 1",
      ],
    },
    map: {
      overview:
        "Start and end at Barshaini (Bharshaini), Parvati Valley near Kasol. Day 1 climbs ~12 km through orchards and forest to Kheerganga (~3,050 m). Day 2 descends the same route. Reach Kasol via Bhuntar (bus/air) or Pathankot (rail), then transfer to Barshaini (~45 minutes from Kasol).",
      camps: ["Kheerganga Safari Camp", "Parvati Kund (day visit)"],
      elevationNote: "Max altitude ~3,050 m (10,006 ft). Modest incline with steeper mid sections.",
    },
    weather: [
      { month: "Jan", tempMinC: -2, tempMaxC: 10, snowfall: "Likely", rainfall: "Low", recommended: true, note: "Cold; snow possible" },
      { month: "Feb", tempMinC: 0, tempMaxC: 12, snowfall: "Possible", rainfall: "Low", recommended: true },
      { month: "Mar", tempMinC: 4, tempMaxC: 16, snowfall: "Possible", rainfall: "Low", recommended: true },
      { month: "Apr", tempMinC: 8, tempMaxC: 20, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "May", tempMinC: 12, tempMaxC: 24, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "Jun", tempMinC: 14, tempMaxC: 26, snowfall: "None", rainfall: "Moderate", recommended: true },
      { month: "Jul", tempMinC: 15, tempMaxC: 24, snowfall: "None", rainfall: "High", recommended: false },
      { month: "Aug", tempMinC: 15, tempMaxC: 24, snowfall: "None", rainfall: "High", recommended: false },
      { month: "Sep", tempMinC: 12, tempMaxC: 22, snowfall: "None", rainfall: "Moderate", recommended: true },
      { month: "Oct", tempMinC: 8, tempMaxC: 18, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "Nov", tempMinC: 3, tempMaxC: 14, snowfall: "Possible", rainfall: "Low", recommended: true },
      { month: "Dec", tempMinC: -1, tempMaxC: 11, snowfall: "Likely", rainfall: "Low", recommended: true },
    ],
    departures: [
      { id: "kg-1", date: "2026-08-15", seats: 16, priceInr: 1099, status: "open" },
      { id: "kg-2", date: "2026-08-22", seats: 11, priceInr: 1099, status: "filling" },
      { id: "kg-3", date: "2026-08-29", seats: 8, priceInr: 1099, status: "filling" },
      { id: "kg-4", date: "2026-09-05", seats: 14, priceInr: 1099, status: "open" },
    ],
    faqs: kheergangaFaqs,
    reviews: [
      {
        id: "kg-r1",
        name: "Rohit Malhotra",
        photo: img("photo-1507003211169-0a1dd7228f2d", 200),
        rating: 5,
        date: "2026-05-12",
        comment:
          "Hot springs after the climb were unreal. Guide kept a good pace for first-timers and the safari camp was comfortable for the price.",
        verified: true,
        helpfulCount: 38,
      },
      {
        id: "kg-r2",
        name: "Priya Nair",
        photo: img("photo-1494790108377-be9c29b29330", 200),
        rating: 5,
        date: "2026-04-03",
        comment:
          "Beautiful trail along the river and waterfalls. Bonfire evening was fun. Perfect Kasol weekend for our group of six.",
        verified: true,
        helpfulCount: 29,
      },
      {
        id: "kg-r3",
        name: "Aman Gupta",
        photo: img("photo-1472099645785-5658abf4ff4e", 200),
        rating: 4,
        date: "2026-03-18",
        comment:
          "Long Day 1 but doable if you start on time. Food was simple and hot. Cleared the trail back to Barshaini by early afternoon.",
        verified: true,
        helpfulCount: 21,
      },
    ],
    downloads: [
      { label: "PDF Itinerary", href: "/downloads/kheerganga-itinerary.pdf" },
      { label: "Packing Checklist", href: "/downloads/packing-checklist.pdf" },
      { label: "Medical Form", href: "/downloads/medical-form.pdf" },
      { label: "Terms", href: "/terms" },
    ],
    relatedSlugs: ["triund-trek", "kareri-lake-trek", "sar-pass-trek"],
  },
  {
    id: "detail-kareri",
    slug: "kareri-lake-trek",
    title: "Kareri Lake Trek",
    location: "Dharamshala, Himachal Pradesh",
    state: "Himachal Pradesh",
    region: "Dharamshala",
    summary:
      "Kareri Lake Trek near Dharamshala — 2 days / 1 night from Kareri Village through oak and pine to a high freshwater lake. Book from ₹1,499.",
    overview:
      "Kareri Lake sits at the foothills of the Dhauladhar range in Kangra Valley, about 9 km above Kareri Village. It is a high-altitude freshwater lake fed by meltwater from snowy peaks, with clear shallows where you can often see the lake bed.\n\nThe approach winds through silver oak, rhododendron, and Chir pine beside the Nyund stream. Meadows around the lake double as seasonal grazing grounds for Gaddi shepherds before they cross Minkiani and Baleni passes toward Chamba and Bharmour.\n\nFrom December to March the lake frequently freezes and access may need technical mountaineering gear. In open season it is an easy-to-moderate weekend trek for fit beginners who want quieter trails than the busiest Dharamshala day hikes.",
    rating: 4.6,
    reviewCount: 842,
    difficulty: "easy",
    durationDays: 2,
    durationNights: 1,
    maxAltitude: 10170,
    distanceKm: 20,
    bestSeasons: ["spring", "summer", "autumn"],
    basePriceInr: 1499,
    originalPriceInr: 2599,
    earlyBirdDiscountPercent: 42,
    groupDiscountNote: "Join a group | Weekend departures available",
    taxNote: "Prices inclusive of applicable GST",
    seatsLeft: 12,
    heroImages: [
      img("photo-1486870591958-9b9d0d1c83bf", 2200),
      img("photo-1504280390367-361c6d9f38f4", 2200),
      img("photo-1464822759023-fed622ff2c3b", 2200),
      img("photo-1519681393784-d120267933ba", 2200),
    ],
    gallery: [
      { src: img("photo-1486870591958-9b9d0d1c83bf"), alt: "Meadow path toward Kareri Lake", span: "wide" },
      { src: img("photo-1504280390367-361c6d9f38f4"), alt: "Alpine camp under stars", span: "tall" },
      { src: img("photo-1464822759023-fed622ff2c3b"), alt: "Dhauladhar peaks above the lake", span: "square" },
      { src: img("photo-1478131143081-80f7f84ca84a"), alt: "Oak and pine forest trail", span: "square" },
      { src: img("photo-1551632811-561732d1e306"), alt: "Trekker on Himalayan ridge", span: "tall" },
      { src: img("photo-1500530855697-b586d89ba3ee"), alt: "Morning light on the ranges", span: "wide" },
    ],
    quickInfo: {
      destination: "Kareri Village / Dharamshala",
      duration: "2D / 1N",
      maxAltitude: "10,170 ft (3,100 m)",
      difficulty: "easy",
      distance: "20 km (both ways)",
      startingPoint: "Kareri Village, Dharamshala",
      endingPoint: "Kareri Village, Dharamshala",
      bestTime: "Apr–Jun, Sep–Nov",
      temperature: "0°C to 22°C (season dependent)",
      groupSize: "Join a group | Weekend departures",
      ageLimit: "16–45 years",
      fitnessLevel: "Easy to moderate — beginner friendly",
      accommodation: "Dome tent camping at Kareri Lake",
      meals: "Evening tea & dinner (Day 1), breakfast (Day 2)",
      transport: "Self arrange to Kareri Village; return taxi optional (extra)",
    },
    highlights: [
      "High-altitude freshwater lake in Kangra Valley",
      "Oak, rhododendron, and Chir pine forest trails",
      "Walk along the Nyund glacial stream",
      "Quiet camping with Dhauladhar backdrops",
      "Shepherd meadows and seasonal alpine grazing grounds",
      "Frozen lake landscape Dec–Mar (technical conditions)",
      "Ideal quieter alternative weekend near Dharamshala",
    ],
    itinerary: [
      {
        day: 1,
        title: "Kareri Village to Kareri Lake via Riyoti",
        distanceKm: 10,
        altitudeFt: 10170,
        walkingHours: "4–5 hrs",
        meals: ["Packed lunch (self)", "Evening tea", "Dinner"],
        accommodation: "Camping at Kareri Lake",
        description:
          "Meet at Kareri Village by 10:00 AM (earlier arrival helps). The trail climbs through silver oak, rhododendron, and longleaf Chir pine, then steepens along the Nyund glacial stream toward the lake (~2,934–3,100 m).\n\nPause for rest and packed lunch at Riyoti (also called Reoti / Liyoti) — the halfway camp. Weather decides the final push to the lake; from December to March ice and deep snow can block casual access without mounts gear.\n\nOvernight in dome tents at Kareri Lake camp under the Dhauladhars.",
        images: [
          img("photo-1478131143081-80f7f84ca84a", 1000),
          img("photo-1486870591958-9b9d0d1c83bf", 1000),
        ],
      },
      {
        day: 2,
        title: "Kareri Lake to Kareri Village",
        distanceKm: 10,
        altitudeFt: 5900,
        walkingHours: "3–4 hrs",
        meals: ["Breakfast"],
        accommodation: "Return journey",
        description:
          "After breakfast, descend 3–4 hours to Kareri Village with the lake vistas still fresh. The trek ends here by about 2:00 PM.\n\nIf needed, your guide can help arrange a taxi back into Dharamshala or McLeod Ganj at an extra cost.",
        images: [img("photo-1464822759023-fed622ff2c3b", 1000)],
      },
    ],
    inclusions: [
      "Day 1 — Evening tea and dinner (dal, sabji, chapati, rice)",
      "Day 2 — Breakfast only",
      "Experienced and certified trekking guide",
      "Camping gear — tents, sleeping bags, sleeping mats, kitchen utensils",
      "Evening group bonfire at camp (if available)",
      "Toilet tents (pit style)",
    ],
    exclusions: [
      "Tips / gratitude to the team",
      "Any private expenses",
      "Any cost arising due to natural calamities",
      "Any kind of permits",
      "Transport to / from Kareri Village or Dharamshala",
      "Any other service not mentioned in inclusions",
    ],
    packingList: packingWeekend,
    fitness: {
      level: "Easy to Moderate",
      score: 55,
      description:
        "Kareri suits fit beginners. Expect 4–5 hours uphill with steeper rocky sections after Riyoti. Comfortable walking on forest paths with a daypack is enough for most people.",
      tips: [
        "Build walking stamina with 4–5 km walks before the trip",
        "Carry a packed lunch for Day 1",
        "Use ankle-support shoes on rocky stretches",
        "Carry cash — network and UPI are unreliable",
        "Arrive at Kareri Village by 10:00 AM on Day 1",
      ],
    },
    map: {
      overview:
        "Start and end at Kareri Village near Dharamshala (Kangra). Day 1 climbs via Riyoti along the Nyund stream to Kareri Lake camp (~3,100 m). Day 2 descends to the village. Reach Dharamshala by air (Gaggal), overnight bus from Delhi/Chandigarh, or train to Pathankot plus road transfer, then cab to Kareri Village.",
      camps: ["Riyoti (halfway rest)", "Kareri Lake Camp"],
      elevationNote: "Max altitude ~3,100 m (10,170 ft). Steeper final approach from Riyoti.",
    },
    weather: [
      { month: "Jan", tempMinC: -6, tempMaxC: 8, snowfall: "Heavy", rainfall: "Low", recommended: false, note: "Lake often frozen" },
      { month: "Feb", tempMinC: -4, tempMaxC: 10, snowfall: "Likely", rainfall: "Low", recommended: false },
      { month: "Mar", tempMinC: 0, tempMaxC: 12, snowfall: "Possible", rainfall: "Low", recommended: true },
      { month: "Apr", tempMinC: 4, tempMaxC: 16, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "May", tempMinC: 8, tempMaxC: 20, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "Jun", tempMinC: 10, tempMaxC: 22, snowfall: "None", rainfall: "Moderate", recommended: true },
      { month: "Jul", tempMinC: 12, tempMaxC: 20, snowfall: "None", rainfall: "High", recommended: false },
      { month: "Aug", tempMinC: 12, tempMaxC: 20, snowfall: "None", rainfall: "High", recommended: false },
      { month: "Sep", tempMinC: 8, tempMaxC: 18, snowfall: "None", rainfall: "Moderate", recommended: true },
      { month: "Oct", tempMinC: 4, tempMaxC: 16, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "Nov", tempMinC: 0, tempMaxC: 12, snowfall: "Possible", rainfall: "Low", recommended: true },
      { month: "Dec", tempMinC: -4, tempMaxC: 9, snowfall: "Likely", rainfall: "Low", recommended: true, note: "Early freeze possible" },
    ],
    departures: [
      { id: "kr-1", date: "2026-08-16", seats: 14, priceInr: 1499, status: "open" },
      { id: "kr-2", date: "2026-08-23", seats: 9, priceInr: 1499, status: "filling" },
      { id: "kr-3", date: "2026-08-30", seats: 12, priceInr: 1499, status: "open" },
      { id: "kr-4", date: "2026-09-06", seats: 10, priceInr: 1499, status: "filling" },
    ],
    faqs: kareriFaqs,
    reviews: [
      {
        id: "kr-r1",
        name: "Yatin Bansal",
        photo: img("photo-1507003211169-0a1dd7228f2d", 200),
        rating: 5,
        date: "2026-05-20",
        comment:
          "Excellent trek — well-trained guides, good food, and a complete natural atmosphere around the lake.",
        verified: true,
        helpfulCount: 34,
      },
      {
        id: "kr-r2",
        name: "Neha Verma",
        photo: img("photo-1438761681033-6461ffad8d80", 200),
        rating: 5,
        date: "2025-12-08",
        comment:
          "Did Kareri in early December — chilly nights but magical. Campsite setup and pacing were solid for our first overnight trek.",
        verified: true,
        helpfulCount: 27,
      },
      {
        id: "kr-r3",
        name: "Ayush",
        photo: img("photo-1544005313-94ddf0286df2", 200),
        rating: 5,
        date: "2026-02-14",
        comment:
          "Great first-snow experience near the lake. Energetic group and a calm guide — highly recommend for a Dharamshala weekend.",
        verified: true,
        helpfulCount: 22,
      },
    ],
    downloads: [
      { label: "PDF Itinerary", href: "/downloads/kareri-lake-itinerary.pdf" },
      { label: "Packing Checklist", href: "/downloads/packing-checklist.pdf" },
      { label: "Medical Form", href: "/downloads/medical-form.pdf" },
      { label: "Terms", href: "/terms" },
    ],
    relatedSlugs: ["triund-trek", "kheerganga-trek", "snowline-laka-trek"],
  },
  {
    id: "detail-snowline",
    slug: "snowline-laka-trek",
    title: "Snowline Laka Trek",
    location: "Dharamshala, Himachal Pradesh",
    state: "Himachal Pradesh",
    region: "Dharamshala",
    summary:
      "Snowline Laka Trek — 3 days / 2 nights from Bhagsunag via Triund to Laka Glacier with Indrahar Pass views. Book from ₹2,500.",
    overview:
      "Snowline Laka (also called Snowline or Laka Got) sits in the Dhauladhar range above Triund near McLeod Ganj. If Triund is on your list, this extension takes you closer to the snowline and the approach toward Indrahar Pass.\n\nThe trail is steeper beyond Triund and rewards you with glacier scenery, possible snow walks in season, and occasional wildlife sightings such as mountain goats. Camping nights at Triund and Laka make it a fuller weekend than a single Triund overnight.\n\nRated easy to moderate, the 3 days / 2 nights itinerary starts at Bhagsunag at 10:00 AM and typically finishes back there around 2:00 PM on Day 3.",
    rating: 4.7,
    reviewCount: 620,
    difficulty: "easy",
    durationDays: 3,
    durationNights: 2,
    maxAltitude: 10499,
    distanceKm: 24,
    bestSeasons: ["spring", "summer", "autumn", "winter"],
    basePriceInr: 2500,
    originalPriceInr: 3000,
    earlyBirdDiscountPercent: 17,
    groupDiscountNote: "Join a group | Weekend departures available",
    taxNote: "Prices inclusive of applicable GST",
    seatsLeft: 10,
    heroImages: [
      img("photo-1464822759023-fed622ff2c3b", 2200),
      img("photo-1519681393784-d120267933ba", 2200),
      img("photo-1500530855697-b586d89ba3ee", 2200),
      img("photo-1551632811-561732d1e306", 2200),
    ],
    gallery: [
      { src: img("photo-1464822759023-fed622ff2c3b"), alt: "Dhauladhar panorama near Snowline", span: "wide" },
      { src: img("photo-1519681393784-d120267933ba"), alt: "Starry night above mountain camp", span: "tall" },
      { src: img("photo-1500530855697-b586d89ba3ee"), alt: "Sunrise on snowy ridges", span: "square" },
      { src: img("photo-1478131143081-80f7f84ca84a"), alt: "Forest trail from Bhagsunag", span: "square" },
      { src: img("photo-1504280390367-361c6d9f38f4"), alt: "Tent campsite at Triund", span: "tall" },
      { src: img("photo-1486870591958-9b9d0d1c83bf"), alt: "High meadow approach to Laka", span: "wide" },
    ],
    quickInfo: {
      destination: "Bhagsunag / McLeod Ganj",
      duration: "3D / 2N",
      maxAltitude: "10,499 ft (3,200 m)",
      difficulty: "easy",
      distance: "24 km (approx.)",
      startingPoint: "Bhagsu Nag, Dharamshala",
      endingPoint: "Bhagsu Nag, Dharamshala",
      bestTime: "Mar–Jun, Sep–Dec",
      temperature: "-2°C to 22°C (season dependent)",
      groupSize: "Join a group | Weekend departures",
      ageLimit: "16–45 years",
      fitnessLevel: "Easy to moderate — Triund + Snowline extension",
      accommodation: "Camping at Triund Top & Laka",
      meals: "Welcome/evening tea, 2 dinners, 1 lunch, 2 breakfasts (veg)",
      transport: "Self arrange to Bhagsunag, Dharamshala",
    },
    highlights: [
      "Extend classic Triund into Laka Glacier / Snowline",
      "Bhagsu waterfall stop on the climb",
      "Camp two nights — Triund Top and Laka",
      "Close views toward Indrahar Pass",
      "Steeper snowline trail that challenges your stamina",
      "Guided camping with veg meals and toilet tents",
      "Ideal long-weekend upgrade from a Triund overnight",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bhagsunag to Triund Top",
        distanceKm: 9,
        altitudeFt: 9350,
        walkingHours: "4–5 hrs",
        meals: ["Welcome / evening tea", "Dinner"],
        accommodation: "Camping at Triund Top",
        description:
          "Meet at 10:00 AM at Bhagsunag Temple — the trek start. Hike toward Triund via the Bhagsu Falls route. Pause 10–20 minutes at the waterfall, then continue to the Leta midpoint to rest and eat.\n\nReach Triund Top campsite around 3:00 PM for ridge views of the Dhauladhars and Kangra Valley. Enjoy sunset colours, dinner, and an overnight camp at Triund.",
        images: [
          img("photo-1478131143081-80f7f84ca84a", 1000),
          img("photo-1504280390367-361c6d9f38f4", 1000),
        ],
      },
      {
        day: 2,
        title: "Triund to Snowline / Laka Glacier",
        distanceKm: 6,
        altitudeFt: 10499,
        walkingHours: "2–3 hrs",
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Camping at Laka",
        description:
          "Wake for sunrise and breakfast around 8:00 AM. Continue from Triund Top toward Laka Glacier / Snowline — about 6 km and usually 2–3 hours. The trail often becomes snowier as you gain height (~3,200 m).\n\nAt Laka, take in Indrahar Pass views up close. Evening bonfire and dinner around 8:00 PM (when conditions allow). Overnight at Laka Camp.",
        images: [
          img("photo-1464822759023-fed622ff2c3b", 1000),
          img("photo-1519681393784-d120267933ba", 1000),
        ],
      },
      {
        day: 3,
        title: "Laka to Bhagsunag",
        distanceKm: 12,
        altitudeFt: 5900,
        walkingHours: "4–5 hrs",
        meals: ["Breakfast"],
        accommodation: "Return journey",
        description:
          "After breakfast, descend roughly 12 km from Laka Got / Snowline all the way to Bhagsunag. The trek typically ends around 2:00 PM — time enough for Bhagsunag Temple, café stops in McLeod Ganj, or onward travel.",
        images: [img("photo-1500530855697-b586d89ba3ee", 1000)],
      },
    ],
    inclusions: [
      "Welcome / evening tea, 2 dinners, 1 lunch, and 2 breakfasts (veg only)",
      "Experienced and certified trekking guide",
      "Camping gear — tents, sleeping bags, sleeping mats, kitchen utensils",
      "First-aid medical kit with the team",
      "Toilet tents (pit style)",
    ],
    exclusions: [
      "Tips / gratitude to the team",
      "Any private expenses",
      "Any cost arising due to natural calamities",
      "Transport to / from Dharamshala or Bhagsunag",
      "Any other service not mentioned in inclusions",
    ],
    packingList: packingWeekend,
    fitness: {
      level: "Easy to Moderate",
      score: 58,
      description:
        "Plan for three walking days including the Triund climb plus a steeper push to Laka. Basic fitness and prior day-hike experience help on Day 2’s rocky snowline section.",
      tips: [
        "Complete a long weekend walk (10–12 km) before departure",
        "Pack warm layers for Triund and Laka nights",
        "Carry trekking poles for descent on Day 3",
        "Break in sturdy shoes for rocky snowline terrain",
        "Arrive at Bhagsunag by 10:00 AM on Day 1",
      ],
    },
    map: {
      overview:
        "Start and end at Bhagsu Nag, Dharamshala. Day 1 climbs via Bhagsu waterfall and Leta to Triund Top. Day 2 continues ~6 km to Laka Glacier / Snowline (~3,200 m). Day 3 descends ~12 km to Bhagsunag. Reach Dharamshala by air (Gaggal), overnight bus from Delhi/Chandigarh, or train to Pathankot plus road transfer.",
      camps: ["Triund Top Camp", "Laka / Snowline Camp"],
      elevationNote: "Max altitude ~3,200 m (10,499 ft) at Laka. Steeper grade beyond Triund.",
    },
    weather: [
      { month: "Jan", tempMinC: -6, tempMaxC: 8, snowfall: "Heavy", rainfall: "Low", recommended: true, note: "Deep snow possible at Laka" },
      { month: "Feb", tempMinC: -4, tempMaxC: 10, snowfall: "Likely", rainfall: "Low", recommended: true },
      { month: "Mar", tempMinC: 0, tempMaxC: 12, snowfall: "Possible", rainfall: "Low", recommended: true },
      { month: "Apr", tempMinC: 4, tempMaxC: 16, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "May", tempMinC: 8, tempMaxC: 20, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "Jun", tempMinC: 10, tempMaxC: 22, snowfall: "None", rainfall: "Moderate", recommended: true },
      { month: "Jul", tempMinC: 12, tempMaxC: 20, snowfall: "None", rainfall: "High", recommended: false },
      { month: "Aug", tempMinC: 12, tempMaxC: 20, snowfall: "None", rainfall: "High", recommended: false },
      { month: "Sep", tempMinC: 8, tempMaxC: 18, snowfall: "None", rainfall: "Moderate", recommended: true },
      { month: "Oct", tempMinC: 4, tempMaxC: 16, snowfall: "None", rainfall: "Low", recommended: true },
      { month: "Nov", tempMinC: 0, tempMaxC: 12, snowfall: "Possible", rainfall: "Low", recommended: true },
      { month: "Dec", tempMinC: -4, tempMaxC: 9, snowfall: "Likely", rainfall: "Low", recommended: true },
    ],
    departures: [
      { id: "sl-1", date: "2026-08-14", seats: 12, priceInr: 2500, status: "open" },
      { id: "sl-2", date: "2026-08-21", seats: 7, priceInr: 2500, status: "filling" },
      { id: "sl-3", date: "2026-08-28", seats: 10, priceInr: 2500, status: "open" },
      { id: "sl-4", date: "2026-09-04", seats: 8, priceInr: 2500, status: "filling" },
    ],
    faqs: snowlineFaqs,
    reviews: [
      {
        id: "sl-r1",
        name: "Karan Mehta",
        photo: img("photo-1472099645785-5658abf4ff4e", 200),
        rating: 5,
        date: "2026-04-28",
        comment:
          "Loved going beyond Triund to Snowline. Indrahar views from Laka were the highlight — solid guide and warm meals both nights.",
        verified: true,
        helpfulCount: 31,
      },
      {
        id: "sl-r2",
        name: "Sneha Kapoor",
        photo: img("photo-1494790108377-be9c29b29330", 200),
        rating: 5,
        date: "2026-03-15",
        comment:
          "Three days felt just right. Day 2 climb was steeper but worth it for the glacier feel. Camps were organised and safe.",
        verified: true,
        helpfulCount: 24,
      },
      {
        id: "sl-r3",
        name: "Vikram Joshi",
        photo: img("photo-1507003211169-0a1dd7228f2d", 200),
        rating: 4,
        date: "2026-02-09",
        comment:
          "Snow patches near Laka in February — magical. Long Day 3 descent; poles helped a lot. Would book again.",
        verified: true,
        helpfulCount: 18,
      },
    ],
    downloads: [
      { label: "PDF Itinerary", href: "/downloads/snowline-laka-itinerary.pdf" },
      { label: "Packing Checklist", href: "/downloads/packing-checklist.pdf" },
      { label: "Medical Form", href: "/downloads/medical-form.pdf" },
      { label: "Terms", href: "/terms" },
    ],
    relatedSlugs: ["triund-trek", "kareri-lake-trek", "kheerganga-trek"],
  },
];
