import type { HimachalBlogTopic } from "../../data/himachal-pending-blog-topics";
import {
  HIMACHAL_DESTINATION_PROFILES,
  type HimachalDestinationProfile,
} from "../../data/himachal-destination-profiles";

const STATE = "Himachal Pradesh";

const UNSPLASH = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1b2851?w=1200&q=80",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80",
  "https://images.unsplash.com/photo-1483728642383-6c2c7fd96d0d?w=1200&q=80",
];

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

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick<T>(slug: string, options: T[], salt = 0): T {
  const h = hashSlug(slug) + salt;
  return options[h % options.length];
}

function profileFor(topic: HimachalBlogTopic): HimachalDestinationProfile {
  return HIMACHAL_DESTINATION_PROFILES[topic.destKey];
}

function placeName(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  return topic.place || profile.name;
}

function destSlug(profile: HimachalDestinationProfile) {
  if (profile.key === "ghnp") return "great-himalayan-national-park";
  if (profile.key === "himachal") return "himachal-pradesh";
  return profile.key;
}

function imageSuggestion(slug: string, caption: string, salt = 0) {
  const url = pick(slug, UNSPLASH, salt);
  return `![Suggested image: ${caption}](${url})\n\n`;
}

function link(title: string, slug: string) {
  return `[${title}](/blogs/${slug})`;
}

function listLines(items: string[], bullet = "-") {
  return items.map((i) => `${bullet} ${i}`).join("\n");
}

function opener(slug: string, salt: number, variants: string[]) {
  return pick(slug, variants, salt);
}

function kindLabel(kind: HimachalBlogTopic["kind"]) {
  return kind.replace(/-/g, " ");
}

function buildIntroduction(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  const lead = opener(topic.slug, 1, [
    `${topic.title} is a field-tested planning companion for travellers who refuse recycled hill-station checklists.`,
    `If you are researching ${topic.focusKeyword}, this long-form guide gathers the decisions that actually change a trip: timing, base location, transfers, and daily energy.`,
    `Travellers booking ${place} often arrive with Instagram frames and leave with fogged plans—this article is written to close that gap before you pay for stays.`,
    `Consider this ${kindLabel(topic.kind)} a bookmarkable reference for ${place}, written in a practical editorial voice rather than brochure fluff.`,
  ]);

  return `## Introduction

${paragraph(
  lead,
  `${place} sits in ${profile.region}, ${STATE}, where ${profile.introTone}.`,
  `Elevation context matters here: ${profile.elevationNote}, so evenings feel cooler than plains forecasts suggest and day trips can climb much higher than your hotel pin.`,
  `Signature experiences around ${place} include ${profile.signature.slice(0, 3).join(", ")}${profile.signature[3] ? `, and ${profile.signature[3]}` : ""}—but stacking them without buffers turns a Himalayan break into a taxi marathon.`,
  `This ${topic.focusKeyword} walks through seasons, weather, how to reach, attractions, food, stays, budgets, safety, and itineraries that use ${place}-specific day plans—not copy-pasted loops from another valley.`,
  `Whether you are a first-timer, a couple, a family, or a trekker staging from ${profile.hubs[0]}, use the sections below as a single source of truth before you lock non-refundable tickets.`,
)}

${infoBox(`Secondary angles in this guide include: ${topic.tags.slice(0, 4).join(", ")}.`)}

${imageSuggestion(topic.slug, `${place} mountain landscape for intro`, 0)}
`;
}

function buildQuickOverview(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Quick Overview

| Topic | Practical snapshot |
| --- | --- |
| Destination | ${place}, ${STATE} |
| Region | ${profile.region} |
| Elevation | ${profile.elevationNote} |
| Main hubs | ${profile.hubs.join(", ")} |
| Typical stay | 2–4 nights for core; longer for trek or circuit extensions |
| Best seasons | ${profile.bestSeasons} |
| Winter note | ${profile.winterNote} |
| Monsoon note | ${profile.monsoonNote} |
| Nearest airport | ${profile.airport} |
| Nearest rail | ${profile.rail} |
| Road hub | ${profile.roadHub} |
| Signature | ${profile.signature.slice(0, 4).join("; ")} |
| Daily budget cue | Budget ${profile.budgetDaily.budget} · Mid ${profile.budgetDaily.mid} · Luxury ${profile.budgetDaily.luxury} |

${tipBox(`For "${topic.title}", decide pace first: slow neighbourhood immersion versus packed sightseeing changes hotel location and taxi spend in ${place}.`)}
`;
}

function buildWhyVisit(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  const whyLead = opener(topic.slug, 2, [
    `${place} rewards travellers who match their trip personality to the landscape rather than chasing every pinned viewpoint.`,
    `People return to ${place} because the daily rhythm feels distinct from other Himachal hubs—different hubs, different food cues, different transfer logic.`,
    `Choose ${place} when you want ${profile.introTone}, not a generic “hill station weekend” template.`,
  ]);

  return `## Why Visit

${paragraph(
  whyLead,
  `Primary hubs such as ${profile.hubs.join(", ")} let you shape quiet mornings, social evenings, or adventure blocks without rebuilding logistics every day.`,
  `Families often lean on shorter transfers and reliable stays; couples favour viewpoints and slower cafés; solo travellers appreciate walkable belts and registered operators for activities.`,
  `Signature draws—${profile.signature.join("; ")}—work best when you protect one unscheduled half-day for weather and wandering.`,
  `Nearby escapes (${profile.nearby.map((n) => n.name).join(", ") || "local valley drives"}) extend a ${place} base without forcing a full destination change.`,
)}

${tipBox(`If your intent is specifically "${topic.title}", pair one signature experience with one slower block so the trip does not collapse into a checklist.`)}

${imageSuggestion(topic.slug, `Why visit ${place} — scenic frame`, 1)}
`;
}

function buildBestTime(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Best Time to Visit

${paragraph(
  `Best windows for ${place} generally fall in **${profile.bestSeasons}**, when roads and viewpoints are more predictable for first-timers.`,
  `Monsoon reality: ${profile.monsoonNote}. Build flexibility into hotel cancellations if your dates sit inside July–August corridors.`,
  `Winter character: ${profile.winterNote}. Pack for night drops even when midday sun looks inviting on a phone screen.`,
  `Festival or adventure peaks can spike rates around ${profile.festivals.slice(0, 2).join(" and ") || "local fairs"}—book stays earlier than you would for a plains weekend.`,
)}

| Season band | What it suits in ${place} | Planning cue |
| --- | --- | --- |
| Spring / early summer | Clearer walks, first-timers, families | Book weekends early |
| Peak summer holidays | Cool escape from plains heat | Expect crowds at signature spots |
| Monsoon | Lush frames, quieter midweeks | Watch road advisories |
| Autumn | Clear ridgelines, photography | Excellent for circuits |
| Winter | Snow play / festive energy (belt-dependent) | Layers + flexible day trips |

${infoBox(`Month choice for "${topic.focusKeyword}" should follow your main goal—snow, trekking, culture, or cafe downtime—not a single statewide slogan.`)}
`;
}

function buildWeather(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Weather

${paragraph(
  `Weather in ${place} is shaped by ${profile.elevationNote} and the broader ${profile.region} pattern—sunny midday can flip to wind-chill by evening.`,
  `Carry a compressible shell year-round; mountain showers ignore neat calendar labels, and ridge winds feel colder than app screenshots.`,
  `Monsoon packing should respect ${profile.monsoonNote.toLowerCase()}.`,
  `Winter travellers should treat ${profile.winterNote.toLowerCase()} as operational guidance, not poetry.`,
)}

| Season | Day feel | Night feel | Packing cue |
| --- | --- | --- | --- |
| Spring | Mild to pleasant | Cool | Fleece + light shell |
| Summer | Pleasant relative to plains | Cool evenings | Layers for sunset points |
| Monsoon | Misty / wet spells | Cool | Rain shell, grippy shoes |
| Autumn | Clear and crisp | Chilly | Warm mid-layer |
| Winter | Cold sun possible | Properly cold | Thermals, gloves, insulated jacket |

${warningBox(`Do not schedule tight same-day connections that ignore fog, landslide advisories, or sudden temperature drops around ${place}.`)}
`;
}

function buildHowToReach(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## How to Reach

${paragraph(
  `Reaching ${place} is less about a single “best” mode and more about matching group size, luggage, and appetite for overnight buses versus staged flights.`,
  `Most travellers combine a major plains hub with the ${profile.roadHub} corridor; last-mile taxis and shared cabs fill gaps that trains cannot.`,
)}

### Road

${paragraph(
  `Road is the default for ${place}. Expect mountain average speeds far below plains highway ETAs on maps.`,
  `Self-drive works for confident mountain drivers who keep daylight for climbing stretches; overnight buses from Delhi/NCR and other North Indian cities save a hotel night if you can sleep sitting up.`,
  `On long weekends, leave earlier than you think—entry corridors into Himachal slow dramatically by late morning.`,
)}

### Rail

${paragraph(
  `Practical railheads for ${place}: ${profile.rail}.`,
  `Treat the train as a comfort stage, then budget a realistic road transfer rather than assuming a station exits onto your hotel lane.`,
  `Reserve seats early for holiday weeks; shared taxis from railheads fill fast after major arrivals.`,
)}

### Air

${paragraph(
  `Air options: ${profile.airport}.`,
  `Verify current schedules—smaller Himachal strips can be weather-sensitive—and pre-book the road leg so you are not negotiating fares with tired kids and heavy bags.`,
  `Flying into a larger hub and driving onward often feels smoother for families than clinging to a rare direct flight.`,
)}

### Local Transport

${paragraph(
  `Inside ${place}, movement usually mixes walking in ${profile.hubs[0]} belts, local buses where they exist, and registered taxis for day trips toward ${profile.nearby[0]?.name || "nearby viewpoints"}.`,
  `Negotiate full-day taxi packages when you plan multiple stops; piecemeal rides add up and waste bargaining energy.`,
  `Download offline maps; network pockets fade on forest and high-pass approaches.`,
)}

${tipBox(`Save your hotel’s pin and a backup taxi number before you lose signal on the climb into ${place}.`)}

${imageSuggestion(topic.slug, `Mountain road approach to ${place}`, 2)}
`;
}

function buildTopAttractions(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  const lines = profile.attractions
    .map((a, i) => `${i + 1}. **${a.name}** — ${a.note}`)
    .join("\n");

  return `## Top Attractions

${paragraph(
  `Attractions around ${place} are best experienced in geographic clusters so you are not crossing the same ridge twice in one afternoon.`,
  `Prioritise what matches "${topic.title}" rather than trying to “finish” every pin on a borrowed list from another destination.`,
)}

${lines}

${infoBox(`Pick three to five attractions that match your energy—depth in ${place} beats a rushed loop of half-seen viewpoints.`)}

${imageSuggestion(topic.slug, `Top attractions near ${place}`, 3)}
`;
}

function buildThingsToDo(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Things To Do

${paragraph(
  `Things to do in ${place} go beyond photo stops: paced walks, food trails, short nature blocks, and one signature adventure or culture half-day.`,
  `Balance one active block and one slow block each day so altitude, traffic, or cafe queues do not flatten your mood.`,
)}

${listLines(profile.thingsToDo.map((t) => `**${t}** — plan it as a timed block, not an afterthought`))}

${paragraph(
  `Add buffer time for ${profile.hubs.slice(0, 2).join(" and ")} wandering; some of the best ${place} memories are unscheduled street corners and sudden clearings in the clouds.`,
  `If travelling with elders or kids, shorten transfer days and keep one backup indoor plan (cafe, museum, or hotel lounge) for weather.`,
)}

${tipBox(`For ${topic.focusKeyword}, write a “must / maybe / skip” list the night before—mountain days punish overpacking.`)}
`;
}

function buildAdventure(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Adventure Activities

${paragraph(
  `${place} adventure options are destination-specific: ${profile.adventures.join(", ") || "soft nature walks and scenic drives"}.`,
  `Always use registered operators, inspect helmets and life jackets where relevant, and avoid stacking high-adrenaline add-ons on the same evening you arrive exhausted from an overnight bus.`,
  `Seasonality matters—rafting, snow sports, and high day trips open and close with water levels, permits, and snow lines, not with brochure promises.`,
)}

| Activity idea | Notes for ${place} |
| --- | --- |
${profile.adventures.map((a) => `| ${a} | Confirm operator gear, season window, and pickup point |`).join("\n") || `| Scenic walks | Choose marked paths and daylight returns |`}

${warningBox(`Never skip briefings or insurance questions for adventure desks around ${place}—cheap quotes sometimes cut corners on kit.`)}
`;
}

function buildTrekking(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  if (!profile.treks.length) return "";

  const isTrekGuide = topic.kind === "trek-guide";
  const trekFocus = topic.trekSlug
    ? topic.trekSlug.replace(/-/g, " ")
    : profile.treks[hashSlug(topic.slug) % profile.treks.length];

  let expanded = "";
  if (isTrekGuide) {
    expanded = `
${paragraph(
  `Because this article is a trek-oriented ${topic.focusKeyword}, treat the following as a ${place}-based route sketch for **${trekFocus}**—not a copy of itineraries from unrelated valleys.`,
  `Day structure stays grounded in ${profile.region} logistics: acclimatisation near ${profile.hubs[0]}, early starts, and weather buffers baked into every stage.`,
)}

### Suggested trek pacing (destination-based)

| Day | Focus around ${place} |
| --- | --- |
| Day 0 / arrival | Reach ${place}, short acclimatisation walk only, gear check, early sleep |
| Day 1 | Approach trailhead linked to ${trekFocus}; steady pace, hydrate, no hero mileage |
| Day 2 | Core ridge or high meadow section; turn around early if weather builds |
| Day 3 | Descent / buffer / village recovery near ${profile.hubs[Math.min(1, profile.hubs.length - 1)]} |

${paragraph(
  `Carry layers listed in packing below, keep permits and IDs accessible, and hire local guides where terrain or park rules require them.`,
  `If snow patches linger on approaches, microspikes and a flexible exit plan matter more than summit ego.`,
)}
`;
  }

  return `## Trekking

${paragraph(
  `Trekking near ${place} centres on routes such as ${profile.treks.join(", ")}.`,
  `These are not interchangeable with treks from other Himachal hubs—approach roads, permit desks, and exit villages differ, so download offline maps for this corridor specifically.`,
  `Spring and autumn usually offer clearer footing; monsoon trails can be lush but slippery, and winter routes may need specialised support.`,
)}

${listLines(profile.treks.map((t) => `**${t}** — verify current trail status and guide requirements before you pay`))}

${expanded}

${tipBox(`Start early from ${place}; afternoon cloud build-up is common on Himalayan ridgelines.`)}

${imageSuggestion(topic.slug, `Trekking landscapes near ${place}`, 4)}
`;
}

function buildCamping(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  if (!profile.camping.length) return "";

  return `## Camping

${paragraph(
  `Camping options linked to ${place} include ${profile.camping.join("; ")}.`,
  `Prefer organised or permitted camps over improvised forest clearings—illegal campfires and litter attract fines and damage fragile belts.`,
  `Nights are colder than town centres; check bedding quality, toilet access, and emergency vehicle reach before you book Instagram-pretty meadows.`,
)}

${listLines(profile.camping)}

${infoBox(`If "${topic.title}" leans camping, confirm season windows and whether meals/transfers are included in the camp quote.`)}
`;
}

function buildFoodGuide(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Food Guide

${paragraph(
  `Food in ${place} mixes Himachali comfort with whatever cafe and traveller culture the hubs support.`,
  `Local flavours worth seeking: ${profile.food.join(", ")}.`,
  `Busy kitchens with steady turnover are safer bets in peak weeks; ask about stock bases if you have dietary restrictions.`,
  `Carry a small snack buffer for long day trips where restaurants thin out beyond ${profile.hubs[0]}.`,
)}

${listLines(profile.food.map((f) => `Try **${f}** at least once—ask locals for the busy, unfussy kitchen rather than the flashiest façade`))}

${tipBox(`Eat your bigger meal midday if evenings get cold and restaurants wind down early outside main tourist belts in ${place}.`)}
`;
}

function buildShoppingGuide(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Shopping Guide

${paragraph(
  `Shopping around ${place} is practical when you know what the region actually produces versus generic souvenir plastic.`,
  `Look for: ${profile.shopping.join("; ") || "local woolens and packaged regional foods"}.`,
  `Compare quality, ask about materials, and avoid perishable foods that will not survive the journey home in summer heat.`,
)}

${listLines(
  (profile.shopping.length ? profile.shopping : ["Local woolens", "Regional packaged foods"]).map(
    (s) => `${s} — check finish quality and return policies before paying cash-only stalls`,
  ),
)}
`;
}

function buildBudget(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Budget

${paragraph(
  `Indicative **per person per day** ranges for ${place} (excluding long-distance Delhi/Chandigarh transport) sit around budget **${profile.budgetDaily.budget}**, mid-range **${profile.budgetDaily.mid}**, and luxury **${profile.budgetDaily.luxury}**.`,
  `Private full-day taxis and adventure add-ons are usually the biggest variables after hotels.`,
  `Shoulder weekdays beat Saturday surge pricing; couples sharing a room and taxi drop per-person averages significantly.`,
)}

| Style | Daily cue (${place}) | What moves the number |
| --- | --- | --- |
| Budget | ${profile.budgetDaily.budget} | Shared transport, simple stays, walking hubs |
| Mid-range | ${profile.budgetDaily.mid} | Boutique stays, private day taxi, cafe meals |
| Luxury | ${profile.budgetDaily.luxury} | View rooms, private vehicle, premium experiences |

${infoBox(`For "${topic.focusKeyword}", write a hard ceiling before you browse hotels—Himachal upsells are endless once you arrive tired.`)}
`;
}

function buildHotels(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Hotels

${paragraph(
  `Hotel strategy in ${place} is location strategy. Staying near ${profile.hubs[0]} maximises walkability; quieter belts trade nightlife for sleep and parking.`,
  `Read recent reviews for heating, hot water, and actual walking time with luggage—altitude nights punish thin bedding and damp monsoon rooms.`,
)}

### Luxury

${paragraph(
  `Luxury and boutique picks around ${place} often include: ${profile.luxuryStays.join("; ") || "limited premium inventory—book early"}.`,
  `Confirm view category, heating type in winter, and whether airport/rail transfers are included.`,
  `Holiday weeks spike; refundable rates are worth the premium if snowfall or road status could shift plans.`,
)}

### Mid Range

${paragraph(
  `Solid mid-range bases: ${profile.midStays.join("; ") || "town hotels with reliable hot water"}.`,
  `This tier usually balances comfort and access for first-timers doing mixed sightseeing and cafe time.`,
)}

### Budget

${paragraph(
  `Budget stays cluster around: ${profile.budgetStays.join("; ") || "simple lodges near bus stands"}.`,
  `Inspect locker safety for solo travellers, blanket quality in winter, and noise from early bus yards.`,
  `Saving on stay often works if you invest in one well-planned full-day taxi instead of many short rides.`,
)}

${imageSuggestion(topic.slug, `Stay vibes and valley views near ${place}`, 5)}
`;
}

function buildPhotography(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Photography Tips

${paragraph(
  `Photography around ${place} shines when you chase light, not only landmarks.`,
  `Strong frames often include: ${profile.photography.join("; ")}.`,
  `Carry a microfibre cloth for misty lenses, secure straps near monkeys or windy ridges, and shoot early before tourist buses dominate popular pins.`,
)}

${listLines(profile.photography.map((p) => `${p} — visit at golden hour when possible`))}

${tipBox(`One slow sunrise beat ten rushed midday snaps in ${place}.`)}
`;
}

function buildPacking(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Packing Tips

${paragraph(
  `Packing for ${place} should follow elevation and season, not fashion week packing cubes.`,
  `Core cues from this destination: ${profile.packing.join(", ")}.`,
)}

- Layered clothing: base, fleece, windproof/rain shell
- Grippy walking or trek shoes (avoid smooth-sole sneakers on wet slopes)
- Compact rain cover even outside peak monsoon weeks
- Thermals, gloves, and beanie for winter or high day trips
- Sunscreen, sunglasses, lip balm (UV is stronger at altitude)
- Power bank, medicines, ORS, personal first-aid
- Cash + UPI; some village stalls prefer one or the other
- IDs for hotels, checkposts, and adventure forms

${listLines(profile.packing.map((p) => `Destination-specific: **${p}**`))}
`;
}

function buildSafety(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Safety Tips

${paragraph(
  `Safety around ${place} is generally manageable with ordinary mountain caution—footing, weather, registered taxis, and respect for local rules.`,
  `Destination-specific notes: ${profile.safety.join("; ")}.`,
)}

${listLines(profile.safety.map((s) => s))}

${warningBox(`On mountain roads near ${place}, seatbelts matter, night driving is riskier in fog, and river edges are not photo props after rain.`)}
`;
}

function buildNearby(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  const rows = profile.nearby
    .map((n) => `| ${n.name} | ${n.distance} | ${n.note} |`)
    .join("\n");

  return `## Nearby Attractions

${paragraph(
  `Day trips from ${place} extend your trip without relocating bags every night—keep fuel, snack, and weather buffers honest.`,
)}

| Place | Approx. from ${place} | Why go |
| --- | --- | --- |
${rows || `| Local valley drives | Varies | Ask your hotel for current road status |`}

${infoBox(`Do not stack every nearby pin into one exhausted day—${place} rewards return visits to the same ridge in better light.`)}
`;
}

function buildItinerary(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Suggested Itinerary

${paragraph(
  `These outlines are unique to ${place} using this destination’s own day building blocks—not recycled Manali/Dalhousie/Spiti templates.`,
  `Shift adventure blocks if weather turns; protect sleep on arrival night.`,
)}

### 1 Day

${paragraph(
  `If you only have one full day in ${place}: ${profile.day1.join("; ")}.`,
  `Keep transfers short and leave a weather buffer before dark.`,
)}

### 2 Days

${paragraph(
  `**Day 1:** ${profile.day1.join("; ")}.`,
  `**Day 2:** ${profile.day2.join("; ")}.`,
  `This pace suits weekenders who refuse to spend half their trip inside a taxi.`,
)}

### 3 Days

${paragraph(
  `**Day 1:** ${profile.day1.join("; ")}.`,
  `**Day 2:** ${profile.day2.join("; ")}.`,
  `**Day 3:** ${profile.day3.join("; ")}.`,
  `Three days is the sweet spot for most first-timers exploring ${profile.hubs.slice(0, 2).join(" and ")}.`,
)}

${tipBox(`Customise "${topic.title}" by swapping Day 3 for a nearby trip to ${profile.nearby[0]?.name || "a quieter viewpoint"} if skies are clear.`)}

${imageSuggestion(topic.slug, `Itinerary scenery for ${place}`, 6)}
`;
}

function buildBestPlacesToEat(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Best Places To Eat

${paragraph(
  `Reliable eating cues in ${place} include: ${profile.eatPlaces.join("; ")}.`,
  `Hotel restaurants help on cold nights; cafe belts suit weather buffers and laptop-free afternoons.`,
  `Ask for Himachali thali elements when you want a break from pan-Indian tourist menus.`,
)}

${listLines(profile.eatPlaces.map((e) => `**${e}** — go early on weekends to skip queues`))}
`;
}

function buildSnowfall(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  if (!profile.snowfall) return "";
  const place = placeName(topic, profile);
  return `## Best Time For Snowfall

${paragraph(
  `Snow expectations for ${place}: ${profile.snowfall}.`,
  `Never treat snowfall as guaranteed on a fixed calendar date—keep refundable stays if white landscapes are your only goal.`,
  `Higher belts and passes usually see snow more often than valley floors; confirm road status before chasing fresh powder at dawn.`,
)}

${infoBox(`Photographers should carry spare batteries—cold drains power fast on snow days near ${place}.`)}
`;
}

function buildFestivals(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Local Festivals

${paragraph(
  `Festival energy around ${place} may include: ${profile.festivals.join(", ") || "local Devta fairs and seasonal town events"}.`,
  `Expect crowded transport, surge hotel rates, and richer cultural frames—book early and dress modestly at temple-linked celebrations.`,
  `If your ${topic.focusKeyword} coincides with a fair, build buffer days rather than same-day exits.`,
)}

${listLines(
  (profile.festivals.length ? profile.festivals : ["Local seasonal fairs"]).map(
    (f) => `**${f}** — confirm exact dates yearly; lunar calendars shift`,
  ),
)}
`;
}

function buildHiddenGems(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  return `## Hidden Gems

${paragraph(
  `Quieter corners near ${place} include: ${profile.hiddenGems.join("; ")}.`,
  `“Hidden” often means early starts and weekday visits rather than secret GPS pins that destroy fragile meadows.`,
  `Carry out all trash and stay on marked paths—offbeat popularity dies when trails get trashed.`,
)}

${listLines(profile.hiddenGems.map((h) => `${h}`))}
`;
}

function buildTravelTips(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  const tipLead = opener(topic.slug, 3, [
    `Practical habits beat packing lists when you finally land in ${place}.`,
    `Small systems—offline maps, snack buffers, registered taxis—save more trips in ${place} than any viral “hack”.`,
    `Treat ${place} like mountain travel, not a mall weekend with better wallpaper.`,
  ]);

  return `## Travel Tips

${paragraph(tipLead)}

- Decide your base among ${profile.hubs.join(", ")} before you book non-refundable rooms.
- Start day trips early; viewpoint parking and taxi demand spike by late morning.
- Keep layers handy—${profile.elevationNote} means evenings cool fast.
- Carry both UPI and cash for stalls and parking attendants.
- Note taxi numbers before long loops toward ${profile.nearby[0]?.name || "outlying sights"}.
- Respect local temple and village rules; ask before photographing people.
- Check road status apps and hotel WhatsApp groups during monsoon and winter.
- If prone to motion sickness, sit forward on hill roads and pack medicine.
- Download offline maps for ${profile.region} dead zones.
- Leave one half-day unscheduled—weather will use it.

${tipBox(`Re-read safety notes for ${place} the night before any high day trip or trek.`)}
`;
}

function buildFaqs(
  topic: HimachalBlogTopic,
  profile: HimachalDestinationProfile,
): Array<{ question: string; answer: string }> {
  const place = placeName(topic, profile);
  const nearby = profile.nearby[0]?.name || profile.hubs[1] || "nearby viewpoints";
  const trek = profile.treks[0];
  const faqs: Array<{ question: string; answer: string }> = [
    {
      question: `How many days are enough for ${place}?`,
      answer: `Most travellers enjoy 2–3 full days for core hubs (${profile.hubs.slice(0, 2).join(" and ")}). Add nights if you plan treks, snowfall chasing, or multiple nearby drives.`,
    },
    {
      question: `What is the best time to visit ${place}?`,
      answer: `Primary windows are ${profile.bestSeasons}. Monsoon means ${profile.monsoonNote.toLowerCase()} Winter means ${profile.winterNote.toLowerCase()}`,
    },
    {
      question: `How do I reach ${place}?`,
      answer: `Typical access mixes ${profile.airport} for air, ${profile.rail} for railheads, and the ${profile.roadHub} road corridor. Pre-book last-mile taxis on long weekends.`,
    },
    {
      question: `Where should first-timers stay in ${place}?`,
      answer: `First-timers usually prefer ${profile.hubs[0]} for orientation, or a quieter mid-range stay if they dislike slopes with luggage. Match location to whether you want walkability or silence.`,
    },
    {
      question: `Is ${place} good for families?`,
      answer: `Yes if you keep transfer days short, choose reliable heating in winter, and avoid stacking every attraction into one exhausted loop. Kid-friendly pacing beats covering every pin.`,
    },
    {
      question: `What are the top things to do in ${place}?`,
      answer: `Start with ${profile.thingsToDo.slice(0, 3).join(", ")}, then add one adventure or day trip if energy remains.`,
    },
    {
      question: `What should I budget per day in ${place}?`,
      answer: `Rough cues: budget ${profile.budgetDaily.budget}, mid ${profile.budgetDaily.mid}, luxury ${profile.budgetDaily.luxury}, excluding long-distance transport into Himachal.`,
    },
    {
      question: `What food should I try in ${place}?`,
      answer: `Look for ${profile.food.join(", ")}. Busy local kitchens usually beat the flashiest tourist façades.`,
    },
    {
      question: `What are good day trips from ${place}?`,
      answer: profile.nearby.length
        ? `Popular options include ${profile.nearby.map((n) => `${n.name} (${n.distance})`).join(", ")}.`
        : `Ask your hotel for current road status and short scenic loops from ${place}.`,
    },
    {
      question: `Is ${place} safe for solo travellers?`,
      answer: `Generally yes in daylight tourist belts with normal precautions. Use registered taxis at night, keep valuables discreet, and share live location on longer hikes.`,
    },
    {
      question: `What makes this ${topic.focusKeyword} different from generic lists?`,
      answer: `It uses ${place}-specific hubs, attractions, day plans, and budgets from a dedicated destination profile—so itineraries do not accidentally copy another Himachal valley.`,
    },
    {
      question: `How do I plan "${topic.title}" in one weekend?`,
      answer: `Arrive night before if possible, follow the 2-day outline (${profile.day1.join("; ")} then ${profile.day2.join("; ")}), and keep one weather buffer activity indoors.`,
    },
  ];

  if (profile.snowfall) {
    faqs.push({
      question: `Does it always snow in ${place}?`,
      answer: profile.snowfall,
    });
  }

  if (trek) {
    faqs.push({
      question: `Can beginners trek near ${place}?`,
      answer: `Short routes and guided options around ${trek} can suit fitness-aware beginners in fair weather. High passes need preparation—do not treat them as casual walks.`,
    });
  }

  faqs.push({
    question: `What should I pack for ${place}?`,
    answer: `Prioritise ${profile.packing.join(", ")}, plus universal mountain layers, grippy shoes, and rain protection.`,
  });

  faqs.push({
    question: `Any safety warnings specific to ${place}?`,
    answer: profile.safety.join(" "),
  });

  if (nearby) {
    faqs.push({
      question: `Is ${nearby} worth combining with ${place}?`,
      answer: `Yes for many itineraries if you have an extra day and clear roads. Do not force it on arrival day after an overnight bus.`,
    });
  }

  return faqs.slice(0, 15);
}

function buildFaqSection(faqs: Array<{ question: string; answer: string }>) {
  let md = `## FAQs\n\n`;
  for (const faq of faqs) {
    md += `### ${faq.question}\n\n${faq.answer}\n\n`;
  }
  return md;
}

function buildSchemaAndLinks(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  const canonical = `/blogs/${topic.slug}`;
  const destPath = `/destinations/${destSlug(profile)}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many days are enough for ${place}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Most travellers enjoy 2–3 full days for ${place}, longer for treks or circuits.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the best time to visit ${place}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: profile.bestSeasons,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blogs" },
      { "@type": "ListItem", position: 3, name: place, item: destPath },
      { "@type": "ListItem", position: 4, name: topic.title, item: canonical },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: topic.title,
    description: topic.excerptHint,
    mainEntityOfPage: canonical,
    keywords: [topic.focusKeyword, ...topic.tags.slice(0, 5)].join(", "),
  };

  return `## Schema Suggestions & Internal Links

Use these JSON-LD sketches when publishing (validate before going live):

\`\`\`json
${JSON.stringify(faqSchema, null, 2)}
\`\`\`

\`\`\`json
${JSON.stringify(breadcrumbSchema, null, 2)}
\`\`\`

\`\`\`json
${JSON.stringify(articleSchema, null, 2)}
\`\`\`

### Internal linking suggestions

**Blogs**

- ${link(`${place} related reading`, topic.slug)}
- Browse more guides on [India Holiday Destinations blogs](/blogs)
- Pair this piece with other ${profile.region} stories as they publish

**Treks**

- Explore [all treks](/treks)
- Filter [Himachal Pradesh treks](/treks?state=himachal-pradesh)
${profile.treks[0] ? `- Look for published routes related to **${profile.treks[0]}** when available on /treks` : ""}

**Destinations**

- [${place} destination page](${destPath})
- Statewide context: [Himachal Pradesh](/destinations/himachal-pradesh)

`;
}

function buildConclusion(topic: HimachalBlogTopic, profile: HimachalDestinationProfile) {
  const place = placeName(topic, profile);
  const close = opener(topic.slug, 4, [
    `${topic.title} becomes straightforward when season, stay location, and daily energy match what you actually enjoy in ${place}.`,
    `Leave ${place} with fewer regrets by protecting buffers, respecting elevation, and refusing itineraries stolen from unrelated valleys.`,
    `Bookmark this ${topic.focusKeyword}, share it with your group, and re-check road or snowfall updates locally before locking non-refundable plans.`,
  ]);

  return `## Conclusion

${paragraph(
  close,
  `${place} in ${profile.region} rewards travellers who move with the mountain clock—early light, honest transfer times, and one unscheduled window for weather.`,
  `Use the profile-backed itinerary blocks, food cues, and safety notes above as your working draft, then adjust on the ground.`,
  `When you are ready to extend the trip, browse Himachal treks and destination pages on India Holiday Destinations for the next leg of the circuit.`,
)}
`;
}

export function buildHimachalArticleMarkdown(topic: HimachalBlogTopic) {
  const profile = profileFor(topic);

  const sections = [
    buildIntroduction(topic, profile),
    buildQuickOverview(topic, profile),
    buildWhyVisit(topic, profile),
    buildBestTime(topic, profile),
    buildWeather(topic, profile),
    buildHowToReach(topic, profile),
    buildTopAttractions(topic, profile),
    buildThingsToDo(topic, profile),
    buildAdventure(topic, profile),
    buildTrekking(topic, profile),
    buildCamping(topic, profile),
    buildFoodGuide(topic, profile),
    buildShoppingGuide(topic, profile),
    buildBudget(topic, profile),
    buildHotels(topic, profile),
    buildPhotography(topic, profile),
    buildPacking(topic, profile),
    buildSafety(topic, profile),
    buildNearby(topic, profile),
    buildItinerary(topic, profile),
    buildBestPlacesToEat(topic, profile),
    buildSnowfall(topic, profile),
    buildFestivals(topic, profile),
    buildHiddenGems(topic, profile),
    buildTravelTips(topic, profile),
  ].filter(Boolean);

  const faqs = buildFaqs(topic, profile);
  sections.push(buildFaqSection(faqs));
  sections.push(buildSchemaAndLinks(topic, profile));
  sections.push(buildConclusion(topic, profile));

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
  const readingTimeMinutes = Math.max(10, Math.round(wordCount / 200));

  return {
    content,
    tableOfContents: toc,
    faq: faqs,
    wordCount,
    readingTimeMinutes,
    excerpt:
      topic.excerptHint ||
      `An in-depth, practical ${topic.focusKeyword} with seasons, budgets, routes, stays, and local tips for ${placeName(topic, profile)}, ${STATE}.`,
  };
}

export function buildHimachalSeoForTopic(topic: HimachalBlogTopic, excerpt: string) {
  const profile = profileFor(topic);
  const place = placeName(topic, profile);
  const title = `${topic.title} (2026) | India Holiday Destinations`;
  const description =
    excerpt.length > 155
      ? `${excerpt.slice(0, 152).trim()}...`
      : excerpt ||
        `Plan ${topic.focusKeyword} with itineraries, weather, hotels, costs, and local tips for ${place}, ${STATE}.`;
  const canonical = `/blogs/${topic.slug}`;
  const keywords = [
    topic.focusKeyword,
    ...topic.tags,
    place.toLowerCase(),
    "himachal pradesh",
    `${place.toLowerCase()} tourism`,
  ];

  return {
    title,
    description,
    keywords: [...new Set(keywords.map((k) => k.toLowerCase()))],
    canonical,
    focusKeyword: topic.focusKeyword,
    ogTitle: topic.title,
    ogDescription: description,
    ogImage: "",
    twitterTitle: topic.title,
    twitterDescription: description,
    twitterImage: "",
    index: true,
    follow: true,
    robots: "index,follow",
    schemaType: "BlogPosting",
    breadcrumb: [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blogs" },
      { name: place, url: `/destinations/${destSlug(profile)}` },
      { name: topic.title, url: canonical },
    ],
  };
}
