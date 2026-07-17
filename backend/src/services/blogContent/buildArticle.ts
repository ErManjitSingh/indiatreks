import type { DharamshalaBlogTopic } from "../../data/dharamshala-blog-topics";

const PLACE = "Dharamshala";
const MCLEOD = "McLeod Ganj";
const REGION = "Kangra Valley";
const STATE = "Himachal Pradesh";

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function paragraph(...sentences: string[]) {
  return sentences.join(" ");
}

function tipBox(text: string) {
  return `> **Tip:** ${text}\n\n`;
}

function warningBox(text: string) {
  return `> **Warning:** ${text}\n\n`;
}

function infoBox(text: string) {
  return `> **Good to know:** ${text}\n\n`;
}

function topicPlace(topic: DharamshalaBlogTopic) {
  return topic.place || PLACE;
}

function topicFocus(topic: DharamshalaBlogTopic) {
  return topic.focusKeyword;
}

function buildIntroduction(topic: DharamshalaBlogTopic) {
  const place = topicPlace(topic);
  return `## Introduction

${paragraph(
  `${topic.title} is written for travellers who want clear, practical planning—not generic listicles copied from outdated forums.`,
  `Whether you are visiting ${place} for the first time or returning for a slower second trip, this guide focuses on what actually matters on the ground: realistic timings, neighbourhood context, seasonal trade-offs, and how to move between ${MCLEOD}, lower ${PLACE}, Bhagsu, and nearby trailheads without wasting full days in transit.`,
  `The Dhauladhar range rises sharply behind the town, which means weather can change quickly, slopes feel steeper than map distances suggest, and a well-planned ${topicFocus(topic)} saves both money and energy.`,
  `Use the sections below as a complete reference you can bookmark, share, or print before departure.`,
)}

`;
}

function buildQuickOverview(topic: DharamshalaBlogTopic) {
  return `## Quick Overview

| Topic | Practical snapshot |
| --- | --- |
| Region | ${REGION}, ${STATE} |
| Main hubs | Lower ${PLACE}, ${MCLEOD}, Dharamkot, Bhagsu |
| Typical stay length | 2–5 nights for town + short hikes |
| Best seasons | March–June; September–November |
| Monsoon note | July–August: lush but slippery trails |
| Winter note | December–February: cold nights; possible snow on high trails |
| Nearest airport | Gaggal (DHM), ~13 km from lower ${PLACE} |
| Nearest major rail hub | Pathankot, then road transfer |
| Primary appeal | Tibetan culture, mountain views, beginner-friendly treks |

${infoBox(`For this topic (${topic.kind.replace(/-/g, " ")}), prioritise verified transport timings and avoid over-packing your first day after a long overnight bus.`)}
`;
}

function buildWhyVisit(topic: DharamshalaBlogTopic) {
  const place = topicPlace(topic);
  return `## Why Visit / Why Choose ${place}

${paragraph(
  `${place} works beautifully for travellers who like towns with depth: monasteries and temples beside modern cafes, volunteer communities, independent bookshops, and a steady rhythm of trekkers preparing for higher routes.`,
  `Unlike a single-resort hill station, the area is spread across elevations and neighbourhoods, so you can choose a quieter homestay in Dharamkot, a social cafe scene in ${MCLEOD}, or easier taxi access from lower ${PLACE}.`,
  `Photographers benefit from golden-hour views toward the Dhauladhar, while food-focused visitors can explore Tibetan, Himachali, and pan-Indian menus within walking distance in ${MCLEOD}.`,
  `Families appreciate that not every experience requires a long drive; many cultural sites and short walks are accessible with sensible pacing.`,
)}

${tipBox(`If your goal is "${topic.title}", build your days around one main activity and one relaxed backup—mountain weather rewards flexible plans.`)}
`;
}

function buildDetailedExplanation(topic: DharamshalaBlogTopic) {
  const place = topicPlace(topic);
  const kindNotes: Record<string, string> = {
    "travel-guide": `A complete ${PLACE} travel guide should separate lower town logistics from upper ${MCLEOD} experiences. Lower ${PLACE} handles buses, hospitals, and mainstream hotels; ${MCLEOD} concentrates cafes, trekking agencies, and the Tsuglagkhang Complex. Most first-time visitors stay in ${MCLEOD} or Dharamkot and taxi down only when needed.`,
    places: `The best places to visit are not only "famous points" but timed experiences—temple visits in the morning, sunset viewpoints in the evening, and marketplace walks when shops are fully open. Group nearby stops to reduce shared-taxi costs.`,
    "things-to-do": `Balance active and calm days: one hike or long walk, one culture block, and one unscheduled cafe afternoon. This prevents the common mistake of treating ${PLACE} like a checklist sprint.`,
    "hidden-places": `Hidden does not always mean remote. Some lesser-known corners are simply one valley away from crowded lanes—early starts and weekday visits reveal a quieter ${REGION}.`,
    "best-time": `Season choice changes road safety, trail friction, and room rates more than many travellers expect. Shoulder months often deliver the best compromise of clear views and manageable crowds.`,
    weather: `Mountain weather is layered: lower ${PLACE} can feel mild while Triund or Indrahar routes encounter wind chill. Always pack one warm layer even in spring.`,
    "trip-cost": `Trip cost depends heavily on transport mode (sleeper bus vs private taxi), stay tier, and whether you book guided treks. Street meals and local buses keep daily spend modest; boutique stays and private cabs raise averages quickly.`,
    itinerary: `Itineraries should include buffer time for road delays on approach routes and acclimatisation to elevation—rushing day one after an overnight bus from Delhi is a common error.`,
    budget: `Budget travel remains viable with guesthouses, shared taxis to trailheads, and set meals at local dhabas. Track cash needs because smaller shops may prefer UPI but backup cash helps in remote stretches.`,
    "destination-guide": `${MCLEOD} is walkable in parts but steep; comfortable shoes matter more than fashion sneakers. Plan uphill hotel stays only if you are comfortable carrying luggage on inclines.`,
    food: `Food culture blends Tibetan staples with Himachali siddu-thali influences and traveller-friendly continental menus. Eat hot, busy kitchens during peak season for freshness.`,
    shopping: `Shop slowly for woolens, singing bowls, and prayer flags—compare quality and ask about material rather than buying the first display item outside busy temples.`,
    camping: `Camping near ${PLACE} is rewarding but regulated on several routes; use established camps or registered operators rather than random forest clearing.`,
    "trek-guide": `Trekking from ${PLACE} demands fitness honesty, water planning, and respect for alpine conditions. Even "beginner" routes like Triund become demanding with poor shoes or dehydration.`,
    "treks-roundup": `Choosing among nearby treks means matching days available, snow tolerance, and guide requirements—not simply picking the most photographed trail.`,
    family: `Family trips succeed with shorter transfer days, heated rooms in winter, and activities that do not depend on perfect weather.`,
    honeymoon: `Couples often prefer boutique stays in Dharamkot or upper ${MCLEOD}, sunset walks, and one special meal rather than packed sightseeing lists.`,
    "how-to-reach": `Reaching ${PLACE} is straightforward with planning: combine rail to Pathankot or flight to Gaggal with pre-booked road transfers during peak weekends.`,
    "road-trip": `Road trips in ${STATE} reward early departures, full fuel tanks, and realistic stop planning—mountain roads are scenic but not fast.`,
    temples: `Temple and monastery visits call for modest dress, quiet photography rules, and time to observe rather than rush through courtyards.`,
  };

  return `## Detailed Explanation

${paragraph(kindNotes[topic.kind] || kindNotes["travel-guide"])}

${paragraph(
  `For "${topic.title}", anchor your planning around verified opening hours, local holidays, and your own fitness level.`,
  `If you are combining town time with trekking, keep one full rest half-day before a climb and avoid alcohol the night before altitude gain.`,
  `Mobile connectivity is generally usable in main hubs but can weaken on trails—download offline maps and share your itinerary with someone not on the trip.`,
)}

`;
}

function buildHighlights(topic: DharamshalaBlogTopic) {
  return `## Highlights

- Tsuglagkhang Complex and surrounding monastery lanes in ${MCLEOD}
- Bhagsu Waterfall and village cafes (steep but popular half-day walk)
- Dal Lake (Naddi) for a quieter picnic-style outing
- Dharamkot ridge walks with cafe stops and valley views
- St. John in the Wilderness church on the ${MCLEOD}–lower town route
- Kangra Art Museum context for regional history (lower ${PLACE})
- Short trek departures toward Triund, Kareri, and other Dhauladhar trails
- Tibetan kitchens, bakeries, and seasonal fruit stalls in market lanes

${tipBox(`Pick three highlights that match "${topic.focusKeyword}" and skip the rest—${PLACE} rewards depth over volume.`)}
`;
}

function buildCompleteInformation(topic: DharamshalaBlogTopic) {
  return `## Complete Information

${paragraph(
  `Administratively, ${PLACE} spreads across lower town and upper ${MCLEOD}. Taxis and local buses connect the two, but traffic and one-way systems can add time during peak season.`,
  `ATMs exist in main hubs yet may run dry on long weekends—carry a sensible cash buffer.`,
  `Pharmacies and clinics are available in lower ${PLACE}; for serious issues, larger facilities are in Kangra or Chandigarh depending on severity.`,
  `Electricity and hot water are reliable in established guesthouses, but budget properties may use geysers with scheduled availability—confirm before booking in winter.`,
)}

| Need | Where to handle it |
| --- | --- |
| Bus tickets | Book reputable operators for overnight routes |
| Trek permits / forest fees | Confirm at official counters or licensed operators |
| Laundry | Most guesthouses offer 24–48 hour service |
| SIM / data | Major Indian networks work; verify roaming if foreign SIM |
| Taxi apps | Availability varies; guesthouses often arrange cabs |

`;
}

function buildBestTime(topic: DharamshalaBlogTopic) {
  return `## Best Time to Visit

${paragraph(
  `Spring (March–April) brings rhododendron colour and comfortable trekking temperatures.`,
  `May–June is busy but excellent for high viewpoints before monsoon clouds build.`,
  `July–August is monsoon: waterfalls swell and forests glow green, yet trails become slick and landslip delays more likely.`,
  `September–October is a favourite for clear Dhauladhar views and crisp air.`,
  `November is quieter with cold nights; December–February suits travellers who want snow possibilities on higher routes and cosy cafe time in town.`,
)}

${warningBox(`Avoid committing to high camps without weather margin during monsoon weeks—even local operators may adjust routes.`)}
`;
}

function buildWeather(topic: DharamshalaBlogTopic) {
  return `## Weather

${paragraph(
  `Expect cooler evenings than midday temperatures suggest.`,
  `Wind on ridges increases chill factor; a beanie and light gloves help on Triund-style hikes.`,
  `Rain gear should be packable year-round except peak dry weeks in late spring.`,
  `Check same-day forecasts but trust local operator advice for mountain calls.`,
)}

| Season | Day feel | Night feel | Notes |
| --- | --- | --- | --- |
| Spring | Mild to warm | Cool | Good trekking windows |
| Summer | Warm in sun | Pleasant | Pre-monsoon haze possible |
| Monsoon | Humid rain | Cool | Trail caution |
| Autumn | Clear, mild | Chilly | Strong photography light |
| Winter | Cold sun | Very cold | Snow on high trails |

`;
}

function buildHowToReach(topic: DharamshalaBlogTopic) {
  return `## How to Reach

**By air:** Gaggal Airport (DHM) is the nearest airport, with road transfer to ${MCLEOD}.  
**By rail:** Pathankot Cantt is a common railhead; taxis and buses continue to ${PLACE}.  
**By road:** Overnight Volvo and semi-sleeper buses run from Delhi and Chandigarh; book reputable brands.  
**Local movement:** Taxis, auto-rickshaws, and shared jeeps connect hubs; walking works within ${MCLEOD} for fit travellers.

${infoBox(`Delhi–${PLACE} road journeys often take 10–12 hours depending on breaks—choose overnight travel to protect your first sightseeing day.`)}
`;
}

function buildBudget(topic: DharamshalaBlogTopic) {
  return `## Budget / Estimated Cost

Costs below are indicative per person per day in INR (excluding long-distance transport):

| Style | Stay | Food | Local travel | Activities |
| --- | --- | --- | --- | --- |
| Backpacker | ₹800–1,500 | ₹400–700 | ₹200–500 | ₹0–800 |
| Mid-range | ₹2,000–4,500 | ₹700–1,200 | ₹500–1,200 | ₹500–2,000 |
| Comfortable | ₹5,000+ | ₹1,200+ | ₹1,000+ | ₹2,000+ |

${paragraph(
  `Guided treks, private taxis, and boutique stays shift totals quickly.`,
  `Shoulder-season discounts appear on guesthouses more often than cafes.`,
  `Carry UPI and some cash for hill vendors.`,
)}
`;
}

function buildStays(topic: DharamshalaBlogTopic) {
  return `## Hotels / Stay Options

${paragraph(
  `Lower ${PLACE} offers mainstream hotels near bus stands—convenient for arrivals.`,
  `${MCLEOD} and Dharamkot provide guesthouses, hostels, and boutique stays with valley views.`,
  `Bhagsu suits travellers who want waterfall access but expect uphill walks.`,
  `Winter visitors should confirm heating, hot water, and backup power.`,
)}

${tipBox(`Book refundable stays during peak May–June and autumn long weekends.`)}
`;
}

function buildFood(topic: DharamshalaBlogTopic) {
  return `## Food & Cafes

Try Tibetan momos, thukpa, tingmo, and butter tea alongside Himachali meals and traveller-friendly bakeries. Busy kitchens with high turnover are your best bet for freshness. If you have dietary restrictions, ask clearly about stock bases and cooking oils—many cafes accommodate vegetarians and vegans with advance notice.

${infoBox(`For "${topic.title}", start with one recommended local cafe and one Tibetan kitchen rather than chasing every trending listing.`)}
`;
}

function buildPacking(topic: DharamshalaBlogTopic) {
  return `## Packing Tips

- Layered clothing (base, fleece, windproof shell)
- Sturdy shoes with grip for cobblestones and trails
- Reusable water bottle and purification backup
- Headlamp, power bank, and physical ID
- Sunscreen, lip balm, and sunglasses
- Personal meds and basic first-aid
- Rain cover in monsoon or shoulder seasons

`;
}

function buildSafety(topic: DharamshalaBlogTopic) {
  return `## Safety Tips

${paragraph(
  `Respect altitude: headaches and fatigue mean slow down, hydrate, and avoid rushing ascents.`,
  `On treks, never split a group without communication plans.`,
  `Dogs are common; give space and avoid unpredictable gestures with food.`,
  `Road curves are tight—use seatbelts and avoid night bus departures if uncomfortable with mountain driving.`,
)}

${warningBox(`Do not attempt high passes in inappropriate footwear or without local weather advice.`)}
`;
}

function buildPhotography(topic: DharamshalaBlogTopic) {
  return `## Photography Tips

Shoot early morning and late afternoon for Dhauladhar light. Monastery interiors may restrict flash—ask permission before photographing people, especially monks in prayer. Carry a microfibre cloth for lens fog when moving between warm cafes and cold viewpoints.

`;
}

function buildNearby(topic: DharamshalaBlogTopic) {
  return `## Nearby Attractions

- Palampur tea gardens (longer day trip)
- Bir Billing paragliding hub
- Dalhousie and Khajjiar meadow circuits
- Kangra Fort heritage visit
- Andretta pottery and art village

${paragraph(`Link these only if your base nights allow—${PLACE} itself deserves at least two full local days.`)}
`;
}

function buildItinerary(topic: DharamshalaBlogTopic) {
  const days = topic.slug.includes("3-day") ? 3 : topic.slug.includes("2-day") ? 2 : 3;
  const lines = Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    if (day === 1) return `**Day ${day}:** Arrive, check in, gentle ${MCLEOD} walk, early dinner, hydrate.`;
    if (day === 2 && days === 2) return `**Day ${day}:** Bhagsu–Dharamkot loop or short trek viewpoint; sunset cafe; depart next morning if needed.`;
    if (day === 2) return `**Day ${day}:** Monastery circuit, Dal Lake or church route, slow market time.`;
    if (day === 3 && days === 3) return `**Day ${day}:** Half-day trek or waterfall hike; pack and depart with buffer for road transfer.`;
    return `**Day ${day}:** Flexible backup day for weather or a nearby road trip.`;
  });
  return `## Suggested Itinerary

${lines.join("\n\n")}

${tipBox(`Adjust this ${days}-day outline to match "${topic.title}" and your arrival time.`)}
`;
}

function buildTravelTips(topic: DharamshalaBlogTopic) {
  return `## Travel Tips

- Start uphill walks early to avoid midday heat on exposed ridges.
- Confirm return transport before committing to remote trailheads.
- Learn a few Tibetan/Hindi greetings—locals appreciate polite effort.
- Tip fairly for porters and guides on treks; agree rates upfront.
- Keep one paper map screenshot when battery dies on trails.

`;
}

function buildFaqs(topic: DharamshalaBlogTopic) {
  const place = topicPlace(topic);
  const faqs = [
    {
      question: `How many days are enough for ${place}?`,
      answer: `Most travellers enjoy 3–4 nights combining town culture and one short hike. Two nights works for a focused weekend if transport is pre-booked.`,
    },
    {
      question: `Is ${place} safe for solo travellers?`,
      answer: `Main hubs are generally safe with normal urban precautions. On trails, hire registered guides for unfamiliar high routes and share your plan.`,
    },
    {
      question: `Do I need permits for treks near ${PLACE}?`,
      answer: `Popular routes may require forest or camping fees. Confirm current rules with official counters or licensed operators before departure.`,
    },
    {
      question: `What should I wear in monsoon?`,
      answer: `Quick-dry layers, rain jacket, grippy shoes, and a waterproof pack cover. Avoid jeans that stay wet for hours.`,
    },
    {
      question: `Can beginners do Triund?`,
      answer: `Fit beginners often complete Triund with steady pacing and proper shoes. Start early, carry water, and turn back if weather worsens.`,
    },
    {
      question: `Is ${MCLEOD} walkable from lower ${PLACE}?`,
      answer: `It is a steep road walk many skip in favour of taxis. Save energy for viewpoints and trails instead.`,
    },
    {
      question: `Are ATMs reliable?`,
      answer: `Yes in main hubs on most days, but carry backup cash during long weekends and festival weeks.`,
    },
    {
      question: `What is the best way to reach from Delhi?`,
      answer: `Overnight Volvo buses are common; book reputable operators. Self-drive is possible but plan rest stops and avoid fatigued night driving.`,
    },
    {
      question: `Is ${place} good for families with kids?`,
      answer: `Yes with gentle pacing—short walks, monastery visits, and cafe breaks work better than aggressive trekking schedules.`,
    },
    {
      question: `When is the clearest mountain view season?`,
      answer: `Late autumn often delivers sharp Dhauladhar views, though spring mornings can be excellent too before haze builds.`,
    },
    {
      question: `Can I find vegetarian food easily?`,
      answer: `Absolutely—Tibetan, Indian, and cafe menus routinely include vegetarian options; ask about soup stocks if strict.`,
    },
    {
      question: `What makes this ${topic.focusKeyword} different from generic lists?`,
      answer: `This guide emphasises timing, neighbourhood context, safety, and realistic budgets rather than repeating the same ten spots without planning depth.`,
    },
  ];
  return faqs;
}

function buildFaqSection(faqs: Array<{ question: string; answer: string }>) {
  let md = `## Frequently Asked Questions\n\n`;
  for (const faq of faqs) {
    md += `### ${faq.question}\n\n${faq.answer}\n\n`;
  }
  return md;
}

function buildConclusion(topic: DharamshalaBlogTopic) {
  return `## Conclusion

${paragraph(
  `${topic.title} comes together when you match season, neighbourhood, and energy level to the experiences you actually enjoy—not every highlight belongs on every trip.`,
  `Give ${topicPlace(topic)} at least one slow morning and one clear afternoon; the town reveals its best side when you are not racing between photo stops.`,
  `Save this guide, share it with travel companions, and cross-check trail conditions locally before high routes.`,
)}

`;
}

function buildCta(topic: DharamshalaBlogTopic) {
  return `## Plan Your Trip

Ready to turn this ${topic.focusKeyword} into a real itinerary? Browse verified treks and destination pages on India Holiday Destinations, compare seasons, and book with operators who know ${REGION} on the ground.

> **Call to action:** Explore [treks near ${PLACE}](/treks?destination=dharamshala), read more [travel blogs](/blogs), and check the [${PLACE} destination guide](/destinations/dharamshala) for curated departures.
`;
}

export function buildArticleMarkdown(topic: DharamshalaBlogTopic) {
  const sections = [
    buildIntroduction(topic),
    buildQuickOverview(topic),
    buildWhyVisit(topic),
    buildDetailedExplanation(topic),
    buildHighlights(topic),
    buildCompleteInformation(topic),
    buildBestTime(topic),
    buildWeather(topic),
    buildHowToReach(topic),
    buildBudget(topic),
    buildStays(topic),
    buildFood(topic),
    buildPacking(topic),
    buildSafety(topic),
    buildPhotography(topic),
    buildNearby(topic),
    buildItinerary(topic),
    buildTravelTips(topic),
  ];

  const faqs = buildFaqs(topic);
  sections.push(buildFaqSection(faqs));
  sections.push(buildConclusion(topic));
  sections.push(buildCta(topic));

  const content = sections.join("\n");
  const toc = sections
    .map((block) => {
      const match = block.match(/^## (.+)$/m);
      if (!match) return null;
      const title = match[1].trim();
      return { id: slugifyHeading(title), title, level: 2 };
    })
    .filter(Boolean) as Array<{ id: string; title: string; level: number }>;

  const wordCount = words(content);
  const readingTimeMinutes = Math.max(8, Math.round(wordCount / 200));

  return {
    content,
    tableOfContents: toc,
    faq: faqs,
    wordCount,
    readingTimeMinutes,
    excerpt:
      topic.excerptHint ||
      `An in-depth, practical ${topic.focusKeyword} with seasons, budgets, routes, and local tips for ${topicPlace(topic)}.`,
  };
}

export function buildSeoForTopic(topic: DharamshalaBlogTopic, excerpt: string) {
  const title = `${topic.title} | India Holiday Destinations`;
  const description = excerpt.slice(0, 155);
  const canonical = `/blogs/${topic.slug}`;
  const keywords = [
    topic.focusKeyword,
    ...topic.tags,
    "dharamshala travel",
    "himachal pradesh",
    "mcleod ganj",
  ];
  return {
    title,
    description,
    keywords,
    canonical,
    focusKeyword: topic.focusKeyword,
    ogTitle: topic.title,
    ogDescription: description,
    twitterTitle: topic.title,
    twitterDescription: description,
    index: true,
    follow: true,
    robots: "index,follow",
    schemaType: "BlogPosting",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blogs" },
      { name: topic.title, url: canonical },
    ],
  };
}
