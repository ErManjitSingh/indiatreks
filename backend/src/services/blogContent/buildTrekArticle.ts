import type { HimachalTrekBlogTopic } from "../../data/himachal-trek-blog-topics";
import {
  getTrekProfile,
  HIMACHAL_TREK_PROFILES,
  type HimachalTrekProfile,
  type TrekDay,
} from "../../data/himachal-trek-profiles";

const STATE = "Himachal Pradesh";

const UNSPLASH = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1b2851?w=1200&q=80",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80",
  "https://images.unsplash.com/photo-1483728642383-6c2c7fd96d0d?w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
];

const RELATED_HUB_SLUGS = [
  "triund-trek-complete-guide",
  "hampta-pass-trek",
  "best-treks-near-dharamshala",
  "kareri-lake-trek-guide",
  "bhrigu-lake-trek",
  "beas-kund-trek",
  "kheerganga-trek-from-manali",
  "sar-pass-trek",
  "rupin-pass-trek",
  "buran-ghati-trek",
  "prashar-lake-trek",
  "best-treks-in-himachal-pradesh",
  "weekend-treks-from-delhi",
  "trekking-packing-list",
  "high-altitude-trek-preparation",
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

function opener(slug: string, salt: number, variants: string[]) {
  return pick(slug, variants, salt);
}

function listLines(items: string[], bullet = "-") {
  return items.map((i) => `${bullet} ${i}`).join("\n");
}

function link(title: string, slug: string) {
  return `[${title}](/blogs/${slug})`;
}

function imageSuggestion(slug: string, caption: string, salt = 0) {
  const url = pick(slug, UNSPLASH, salt);
  return `![Suggested image: ${caption}](${url})\n\n`;
}

function trekName(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  return topic.place || profile.name;
}

function profileFor(topic: HimachalTrekBlogTopic): HimachalTrekProfile {
  const resolved =
    getTrekProfile(topic.trekKey) ||
    HIMACHAL_TREK_PROFILES[topic.trekKey] ||
    HIMACHAL_TREK_PROFILES["himachal-cluster"];
  if (!resolved) {
    throw new Error(`Missing trek profile for key: ${topic.trekKey}`);
  }
  return resolved;
}

function allTrekProfiles(): HimachalTrekProfile[] {
  return Object.values(HIMACHAL_TREK_PROFILES).filter((p) => p.key !== "himachal-cluster");
}

/** Filter existing profiles by topic title keywords — never invent trek facts. */
function clusterProfiles(topic: HimachalTrekBlogTopic): HimachalTrekProfile[] {
  const title = topic.title.toLowerCase();
  const tags = topic.tags.map((t) => t.toLowerCase()).join(" ");
  const hay = `${title} ${tags} ${topic.focusKeyword.toLowerCase()}`;
  const all = allTrekProfiles();

  const regionMatch = (
    [
      ["manali", "manali"],
      ["shimla", "shimla"],
      ["spiti", "spiti"],
      ["kinnaur", "kinnaur"],
      ["dharamshala", "dharamshala"],
      ["dalhousie", "dalhousie"],
      ["palampur", "palampur"],
      ["parvati", "parvati"],
      ["tirthan", "tirthan"],
      ["jibhi", "tirthan"],
    ] as const
  ).find(([kw]) => hay.includes(kw));

  let pool = regionMatch ? all.filter((p) => p.region === regionMatch[1]) : all;

  if (hay.includes("easy") && !hay.includes("moderate") && !hay.includes("difficult")) {
    pool = pool.filter((p) => /easy/i.test(p.difficulty));
  } else if (hay.includes("moderate") && !hay.includes("difficult")) {
    pool = pool.filter((p) => /moderate/i.test(p.difficulty) && !/difficult|challenging/i.test(p.difficulty));
  } else if (hay.includes("difficult") || hay.includes("challenging") || hay.includes("high altitude")) {
    pool = pool.filter((p) => /difficult|challenging/i.test(p.difficulty));
  }

  if (hay.includes("weekend")) {
    pool = pool.filter((p) => /1|2|3/.test(p.duration) || /weekend|1–2|1-2|2–3|2-3/i.test(p.duration));
  }
  if (hay.includes("winter") || hay.includes("snow")) {
    pool = pool.filter((p) => /dec|jan|feb|winter|snow/i.test(`${p.snowfallMonths} ${p.bestTime}`));
  }
  if (hay.includes("summer")) {
    pool = pool.filter((p) => /apr|may|jun|summer/i.test(p.bestTime));
  }
  if (hay.includes("monsoon")) {
    pool = pool.filter((p) => /jul|aug|monsoon/i.test(`${p.bestTime} ${p.monthWeather.map((m) => m.note).join(" ")}`));
  }
  if (hay.includes("camping") || hay.includes("camp")) {
    pool = pool.filter((p) => /camp/i.test(p.camping));
  }
  if (hay.includes("family")) {
    pool = pool.filter((p) => /easy/i.test(p.difficulty));
  }

  if (!pool.length) pool = all.slice(0, 12);
  return pool.slice(0, 12);
}

function buildIntroduction(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const lead = opener(topic.slug, 1, [
    `${topic.title} is written for trekkers who want route-honest planning—not recycled day sheets copied from another Himachal valley.`,
    `If you are researching ${topic.focusKeyword}, this long-form guide gathers the decisions that change a trek: season, fitness, permits, day pacing, and exit buffers.`,
    `Travellers booking ${name} often arrive with summit photos and leave with blistered plans—this article closes that gap before you pay operators.`,
    `Treat this ${topic.kind.replace(/-/g, " ")} as a bookmarkable field note for ${name}, written in a practical editorial voice rather than brochure fluff.`,
    `Mountain trips fail quietly when itineraries ignore elevation and weather; ${topic.title} is built to keep those quiet failures off your calendar.`,
  ]);

  return `## Introduction

${paragraph(
  lead,
  `${name} sits in the ${profile.region} belt of ${STATE}, with trail logistics centred on ${profile.location}.`,
  `Difficulty is listed as **${profile.difficulty}**, covering roughly **${profile.distanceKm}** over **${profile.duration}**, with a high point around **${profile.highestAltitudeM}** and a working base at **${profile.baseCamp}**.`,
  `The trail character: ${profile.trailOverview}`,
  `This ${topic.focusKeyword} walks through overview facts, access, weather, camping, permits, packing, safety, budgets, and a day-wise itinerary drawn only from the ${name} profile—never another trek’s camps.`,
  `Whether you are a first-timer, a weekend warrior from Delhi/NCR, or returning for a harder variant, use the sections below as a single source of truth before locking non-refundable transfers.`,
)}

${infoBox(`Secondary angles covered here include: ${topic.secondaryKeywords.slice(0, 5).join(", ")}, and more in the FAQ.`)}

${imageSuggestion(topic.slug, `${name} Himalayan trail landscape`, 0)}
`;
}

function buildQuickOverview(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Quick Trek Overview

${paragraph(
  `Use this snapshot as your first filter for ${name}. If the distance, altitude, or season window already feels mismatched to your fitness or leave days, redesign before you book.`,
)}

| Topic | Practical snapshot |
| --- | --- |
| Trek | ${name} |
| Region | ${profile.region}, ${STATE} |
| Location / staging | ${profile.location} |
| Difficulty | ${profile.difficulty} |
| Distance | ${profile.distanceKm} |
| Duration | ${profile.duration} |
| Highest altitude | ${profile.highestAltitudeM} |
| Base camp / hub | ${profile.baseCamp} |
| Best time | ${profile.bestTime} |
| Snowfall window | ${profile.snowfallMonths} |
| Temperature cue | ${profile.temperature} |
| Nearest rail | ${profile.nearestRail} |
| Nearest airport | ${profile.nearestAirport} |
| Road access | ${profile.roadConnectivity} |
| Budget cue | Budget ${profile.budget.budget} · Standard ${profile.budget.standard} · Premium ${profile.budget.premium} |

${tipBox(`For "${topic.title}", decide whether you need a guided package or self-supported days first—that choice reshapes permits, meals, and porter costs.`)}
`;
}

function buildWhyChoose(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const lead = opener(topic.slug, 2, [
    `${name} rewards trekkers who match ambition to the actual ridge, not to a viral reel filmed on a different pass.`,
    `People choose ${name} when they want ${profile.whyChoose[0]?.toLowerCase() || "a clear Himachal trail character"}, without pretending every Himalayan walk is interchangeable.`,
    `Pick ${name} if your leave days and fitness align with a ${profile.difficulty.toLowerCase()} outing of ${profile.duration}.`,
  ]);

  return `## Why Choose This Trek

${paragraph(
  lead,
  `Standout reasons from the field profile:`,
)}

${listLines(profile.whyChoose.map((w) => `**${w}**`))}

${paragraph(
  `Compared with neighbouring options (${profile.nearbyTreks.slice(0, 3).join(", ") || "other regional trails"}), ${name} keeps its own camps, gradients, and cultural rules.`,
  `If your intent is specifically "${topic.title}", treat the day sheet later in this guide as non-negotiable sequencing—do not splice in camps from Hampta when you are walking Triund, or Spiti high-desert stages into a forest park route.`,
)}

${imageSuggestion(topic.slug, `Why choose ${name} — ridgeline frame`, 1)}
`;
}

function buildLocation(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Location

${paragraph(
  `${name} is rooted in **${profile.location}**, within the broader ${profile.region} trekking corridor of ${STATE}.`,
  `Staging usually happens around **${profile.baseCamp}**, where you finalise gear, permits, and early-morning taxis.`,
  `Map pins lie; elevation gain and trail surface decide whether a “short” km count feels easy. Download offline maps for this corridor and note bailout villages before you climb beyond phone coverage.`,
  `Road reality for the approach: ${profile.roadConnectivity}`,
)}

${infoBox(`${name} logistics are ${profile.region}-specific. Do not assume Manali taxi timings apply to a Dharamshala trailhead or Spiti jeep stages.`)}
`;
}

function buildHistory(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## History

${paragraph(
  `Context for ${name}: ${profile.history}`,
  `Understanding that background helps you respect local rules, temple etiquette, and forest-entry desks that still shape how the trail is walked today.`,
  `Modern commercial trekking layered onto older shepherd, trade, or pilgrimage paths—so “famous Instagram camps” are often recent overlays on longer cultural routes.`,
)}
`;
}

function buildTrailOverview(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Trail Overview

${paragraph(
  profile.trailOverview,
  `Expect a ${profile.difficulty.toLowerCase()} effort across ${profile.distanceKm} with a high point near ${profile.highestAltitudeM}.`,
  `Terrain changes with season: snow patches, monsoon mud, and autumn frost can rewrite the same GPS track into three different days.`,
  `Photography highlights along the way include ${profile.photographySpots.slice(0, 4).join("; ")}${profile.photographySpots[4] ? ", and more listed below" : ""}.`,
)}

${tipBox(`Walk ${name} at a conversational pace on day one. Hero mileage before you know how your body handles ${profile.highestAltitudeM} is how AMS stories start.`)}

${imageSuggestion(topic.slug, `${name} trail overview scenery`, 2)}
`;
}

function buildDifficulty(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const expand =
    topic.kind === "difficulty"
      ? paragraph(
          `Because this piece centres on ${topic.focusKeyword}, read difficulty as a planning filter—not a badge.`,
          `Easy sections can still punish poor shoes; moderate grades become hard in fresh snow; difficult days demand honest fitness and guide support.`,
          `If you cannot sustain 4–6 hours of ascent on consecutive days with a daypack, redesign ${name} or hire porter support rather than “pushing through.”`,
        )
      : "";

  return `## Difficulty Level

${paragraph(
  `${name} is graded **${profile.difficulty}** for fair-weather conditions with a typical backpack.`,
  `Fitness expectation: ${profile.fitness}`,
  `Altitude and AMS awareness: ${profile.ams}`,
  expand,
)}

| Factor | What it means on ${name} |
| --- | --- |
| Grade | ${profile.difficulty} |
| Duration load | ${profile.duration} |
| Distance load | ${profile.distanceKm} |
| High point | ${profile.highestAltitudeM} |
| Fitness | ${profile.fitness} |

${warningBox(`Do not upgrade difficulty mid-trip by adding an unplanned side ridge after a long stage—fatigue plus altitude is a common accident mix.`)}
`;
}

function buildStatsOverview(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Distance, Duration, Highest Altitude & Base Camp

${paragraph(
  `These four numbers decide whether ${name} fits your leave calendar and conditioning. Treat them together—short distance at high altitude can still feel harder than a longer forest walk.`,
)}

| Metric | Detail |
| --- | --- |
| Distance | ${profile.distanceKm} |
| Duration | ${profile.duration} |
| Highest altitude | ${profile.highestAltitudeM} |
| Base camp / hub | ${profile.baseCamp} |
| Region staging | ${profile.location} |

${infoBox(`Arrive at ${profile.baseCamp} with time to sleep before a big climb day. Overnight buses into trailheads are a classic way to start already behind.`)}
`;
}

function buildAccess(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Nearest Railway Station

${paragraph(
  `Practical rail access for ${name}: **${profile.nearestRail}**.`,
  `Treat the train as a comfort stage, then budget a realistic road transfer to ${profile.baseCamp} rather than assuming the station exits onto the trailhead.`,
  `Holiday weeks fill shared taxis quickly after major arrivals—pre-book or travel midweek when you can.`,
)}

## Nearest Airport

${paragraph(
  `Air option: **${profile.nearestAirport}**.`,
  `Himachal strips and nearby hubs can be weather-sensitive; always keep a road backup if you have hard trek start dates.`,
  `Flying into a larger plains hub and driving onward often feels smoother for groups with heavy kit than clinging to a rare direct flight.`,
)}

## Road Connectivity

${paragraph(
  profile.roadConnectivity,
  `Mountain ETAs on maps are optimistic. Keep daylight for climbing stretches, full fuel where pumps thin out, and flexibility for landslide or snow advisories.`,
  `Last-mile taxis to ${profile.baseCamp} should be registered; negotiate full-day packages if you need gear drops and pickup buffers.`,
)}

${tipBox(`Save offline pins for ${profile.baseCamp} and a backup taxi number before you lose signal on the climb toward ${name}.`)}

${imageSuggestion(topic.slug, `Road approach toward ${name}`, 3)}
`;
}

function buildBestTime(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const seasonalExtra =
    topic.kind === "best-time" || topic.kind === "seasonal"
      ? paragraph(
          `This ${topic.focusKeyword} leans hard on timing because season rewrites ${name} more than any packing list.`,
          `Shoulder weeks often give clearer views and saner campsite density; peak holidays spike both rates and trail congestion.`,
        )
      : "";

  return `## Best Time to Visit

${paragraph(
  `Best windows for ${name}: **${profile.bestTime}**.`,
  `Snowfall tendency: **${profile.snowfallMonths}**.`,
  `Temperature cue for packing: ${profile.temperature}`,
  seasonalExtra,
  `Festival or long-weekend peaks can fill ${profile.baseCamp} stays—book earlier than a plains weekend habit would suggest.`,
)}

| Season band | Suitability for ${name} | Planning cue |
| --- | --- | --- |
| Spring / early summer | Often strong for first-timers | Watch residual snow on high bits |
| Peak summer holidays | Cool escape, busier camps | Book early, start early |
| Monsoon | Lush but slippery / landslide risk | Flexible cancellations |
| Autumn | Clear ridgelines, photography | Excellent for many grades |
| Winter | Snow drama or closures | Specialist kit / local advice |

${infoBox(`Month choice for "${topic.focusKeyword}" should follow your main goal—snow play, clear passes, or quiet camping—not a single statewide slogan.`)}
`;
}

function buildMonthWeather(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const rows = profile.monthWeather
    .map((m) => `| ${m.month} | ${m.note} |`)
    .join("\n");

  return `## Month Wise Weather

${paragraph(
  `Month-by-month notes for ${name} help you pick leave days that match trail conditions rather than brochure adjectives.`,
  `Use these as planning cues and re-check local advisories close to departure—Himalayan microclimates shift fast.`,
)}

| Month | Weather & trail cue |
| --- | --- |
${rows}

${warningBox(`Do not treat a green “recommended” month as a guarantee of dry ridges; carry a shell year-round on ${name}.`)}
`;
}

function buildTemperature(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Temperature

${paragraph(
  `Temperature reality for ${name}: ${profile.temperature}`,
  `Sunny midday on exposed ridges can flip to wind-chill by late afternoon; camps at ${profile.highestAltitudeM} feel colder than base-town forecasts.`,
  `Pack compressible insulation even in “summer” itineraries—evening tea lines are where under-layered trekkers start to shiver.`,
)}
`;
}

function buildSnowfall(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const snowExtra =
    topic.kind === "snow"
      ? paragraph(
          `Because you searched ${topic.focusKeyword}, expect snow to redefine footwear, turnaround times, and guide requirements on ${name}.`,
          `Fresh powder looks soft in photos and hard under a loaded pack—microspikes, gaiters, and conservative exit times matter more than summit ego.`,
        )
      : "";

  return `## Snowfall Months

${paragraph(
  `Typical snowfall / snow-on-trail window for ${name}: **${profile.snowfallMonths}**.`,
  `Even outside peak snow months, shaded gullies can hold hard patches into late spring.`,
  snowExtra,
  `If your dates sit inside a snow-prone band, confirm operator experience for this exact route—not a generic “Himachal winter trek” pitch.`,
)}

${imageSuggestion(topic.slug, `Snow conditions near ${name}`, 4)}
`;
}

function buildFloraFauna(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Flora & Fauna

${paragraph(
  `Ecology notes for ${name}: ${profile.floraFauna}`,
  `Stay on established paths, pack out all waste, and keep noise down near wildlife corridors—especially in park or sanctuary approaches.`,
  `Do not feed monkeys or dogs; food conditioning creates conflict at popular camps.`,
)}
`;
}

function buildPhotography(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const lightExtra =
    topic.kind === "sunrise" || topic.kind === "sunset"
      ? paragraph(
          `Light is the whole brief for ${topic.focusKeyword}: arrive early enough that you are not photographing while exhausted and late for descent.`,
          `Carry a headlamp, spare battery (cold drains cells), and a turnaround time that protects the walk down.`,
        )
      : "";

  return `## Photography Spots

${paragraph(
  `${name} rewards photographers who protect golden hour without ignoring safety margins.`,
  lightExtra,
)}

${listLines(profile.photographySpots.map((s) => `**${s}** — plan light and exit time, not just the frame`))}

${tipBox(`Shoot, then move. Lingering on exposed ridges after sunset is how ${name} day sheets turn into rescue stories.`)}

${imageSuggestion(topic.slug, `Photography viewpoint on ${name}`, 5)}
`;
}

function buildFacilities(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Network Availability

${paragraph(
  `Mobile network on ${name}: ${profile.network}`,
  `Download offline maps, share your day plan with someone not on the trek, and do not rely on last-minute hotel bookings from a ridge with zero bars.`,
)}

## Electricity

${paragraph(
  `Power reality: ${profile.electricity}`,
  `Carry a power bank sized for cold nights; charging queues at busy camps waste evening recovery time.`,
)}

## ATM Availability

${paragraph(
  `Cash / ATM cue: ${profile.atm}`,
  `UPI works in many Himachal hubs but fades on remote stretches—keep a cash buffer for tea stalls, local taxis, and forest desks.`,
)}

## Medical Facilities

${paragraph(
  `Medical access: ${profile.medical}`,
  `Carry a personal first-aid kit, any prescription meds, and blister care. Know the nearest reliable clinic before you leave ${profile.baseCamp}.`,
)}

${warningBox(`AMS, sprains, and stomach bugs are the common trio. Turning around early is a skill, not a failure, on ${name}.`)}
`;
}

function buildCamping(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const campExtra =
    topic.kind === "camping"
      ? paragraph(
          `This camping-focused ${topic.focusKeyword} assumes you care about tent quality, toilet access, and illegal-campfire rules—not only meadow aesthetics.`,
          `Ask operators where waste goes, whether tents are triple-share by default, and what happens in high wind or unexpected snow.`,
        )
      : "";

  return `## Camping Experience

${paragraph(
  `Camping on ${name}: ${profile.camping}`,
  campExtra,
  `Nights are colder than Instagram captions; inspect sleeping-bag ratings and ground insulation, especially near ${profile.highestAltitudeM}.`,
  `Prefer permitted or organised camps over improvised clearings that damage fragile alpine belts.`,
)}

${infoBox(`If "${topic.title}" is camping-led, confirm meal inclusions and water sources for each camp night in the day-wise section.`)}

${imageSuggestion(topic.slug, `Camping on ${name}`, 6)}
`;
}

function buildPermitsAndCharges(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Permits

${paragraph(
  `Permit picture for ${name}: ${profile.permits}`,
  `Carry government ID photocopies, keep digital backups offline, and arrive at desks with time to spare—queues eat morning light.`,
)}

## Forest Entry Fees

${paragraph(
  `Forest / park fee note: ${profile.forestFees}`,
  `Fees change; verify current amounts locally rather than trusting a year-old blog number.`,
)}

## Guide Charges

${paragraph(
  `Guide cost cue: ${profile.guideCharges}`,
  `Registered local guides matter on exposed, glacier-adjacent, or culturally sensitive routes. Cheap quotes sometimes cut corners on kit and ratios.`,
)}

## Porter Charges

${paragraph(
  `Porter support cue: ${profile.porterCharges}`,
  `Honest load limits protect both you and the porter. Do not treat porters as unlimited luggage services.`,
)}

${tipBox(`Get inclusions in writing: permits, forest fees, meals, tents, and pickup points for ${name}.`)}
`;
}

function buildPackingFitness(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const packingLead =
    topic.kind === "packing" || topic.kind === "prep"
      ? paragraph(
          `Because this article emphasises ${topic.focusKeyword}, treat the lists below as a working kit—not optional flavour text.`,
          `Weigh your pack; vanity packing is how knees fail on the descent from ${profile.highestAltitudeM}.`,
        )
      : paragraph(`Packing for ${name} should match season and grade, not a generic “Himalaya starter kit” Instagram carousel.`);

  return `## Packing Checklist

${packingLead}

${listLines(profile.packing)}

## Fitness Required

${paragraph(
  profile.fitness,
  `Train with back-to-back weekend hikes and stair sessions if your job is sedentary. One gym week before ${name} is not conditioning.`,
)}

## AMS Guide

${paragraph(
  profile.ams,
  `Hydrate, avoid alcohol the night before big gains, and agree on turnaround symptoms with your group before you leave ${profile.baseCamp}.`,
)}

## Things to Carry

${paragraph(`Day-pocket and always-with-you items for ${name}:`)}

${listLines(profile.carry)}

${infoBox(`Secondary keyword angles such as "${topic.secondaryKeywords[0]}" and "${topic.secondaryKeywords[1]}" usually collapse to the same rule: light pack, warm layers, honest fitness.`)}
`;
}

function buildSafety(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Safety Guidelines

${paragraph(
  `Safety on ${name} is mostly boring discipline: early starts, weather humility, and refusing ego detours.`,
)}

${listLines(profile.safety)}

## Emergency Contacts

${paragraph(
  `Before you climb, save these cues and local numbers relevant to the ${profile.region} corridor:`,
)}

${listLines(profile.emergency)}

${warningBox(`If weather collapses or a teammate shows AMS signs, descending toward ${profile.baseCamp} beats waiting for a perfect summit window.`)}
`;
}

function buildNearby(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Nearby Attractions

${paragraph(
  `After ${name}, or on buffer days around ${profile.baseCamp}, these nearby attractions fit without inventing a second trek:`,
)}

${listLines(profile.nearbyAttractions)}

## Nearby Treks

${paragraph(
  `Related treks in the same planning universe (different day sheets—do not mix camps):`,
)}

${listLines(profile.nearbyTreks.map((t) => `**${t}** — research its own profile before combining`))}

${tipBox(`Combining two treks only works with recovery nights. Stacking summit days back-to-back is how injuries happen.`)}
`;
}

function buildBudget(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const costExtra =
    topic.kind === "cost"
      ? paragraph(
          `This cost-focused ${topic.focusKeyword} breaks spend into tiers so you can compare operator quotes without missing forest fees or last-mile taxis.`,
          `Ask what happens if weather cancels a day—refunds and hotel buffers matter as much as the headline trek fee.`,
          `Hidden add-ons often include backpack offloading, better tents, peak-season surcharges, and private taxi upgrades from ${profile.nearestRail} or the airport corridor.`,
        )
      : "";

  return `## Budget Breakdown

${paragraph(
  `Budget bands for ${name} (indicative, excluding long-distance flights into ${STATE}):`,
  costExtra,
)}

| Tier | Typical all-in cue |
| --- | --- |
| Budget | ${profile.budget.budget} |
| Standard | ${profile.budget.standard} |
| Premium | ${profile.budget.premium} |

${paragraph(
  `Also budget separately for: forest fees (${profile.forestFees}), guides (${profile.guideCharges}), porters (${profile.porterCharges}), and personal gear rental if you are not buying for one trek.`,
  `Cash buffer still matters where ATMs are thin: ${profile.atm}`,
)}

${infoBox(`Cheapest quote is not always safest. Vet inclusions, guide ratios, and emergency plans for ${name}.`)}
`;
}

function dayHeadingTitle(day: TrekDay, index: number) {
  const n = index + 1;
  const cleaned = day.title.replace(/^day\s*\d+\s*:\s*/i, "").trim() || day.title;
  return `Day ${n}: ${cleaned}`;
}

function renderDayBlock(day: TrekDay, index: number, expand: boolean, slug: string) {
  const n = index + 1;
  const extra = expand
    ? paragraph(
        `Expanded pacing note for day ${n}: protect water and snack cadence every 60–90 minutes, and treat ${day.trekTime} as moving time—not total time including photo stops.`,
        `If clouds build early, shorten viewpoint lingering and prioritise reaching ${day.end} with daylight margin.`,
        `Re-check blister hotspots at lunch; small fixes here prevent limping into ${day.campStay}.`,
        `Terrain reminder for day ${n}: ${day.terrain}. Keep poles handy on loose sections and agree a regroup point before any optional viewpoint spur.`,
        `Meals today (${day.meals}) work best when you eat early and carry a backup snack—remote kitchens can run late when groups stack.`,
      )
    : "";

  return `### ${dayHeadingTitle(day, index)}

| Field | Detail |
| --- | --- |
| Start | ${day.start} |
| End | ${day.end} |
| Distance | ${day.distanceKm} |
| Altitude | ${day.altitudeM} |
| Elevation gain | ${day.elevationGain} |
| Trek time | ${day.trekTime} |
| Terrain | ${day.terrain} |
| Meals | ${day.meals} |
| Camp / stay | ${day.campStay} |

${paragraph(day.description)}

${day.forests ? paragraph(`**Forests / vegetation:** ${day.forests}`) : ""}
${day.waterCrossings ? paragraph(`**Water:** ${day.waterCrossings}`) : ""}
${day.viewpoints ? paragraph(`**Viewpoints:** ${day.viewpoints}`) : ""}

${paragraph(`**Weather cue:** ${day.weather}`)}
${paragraph(`**Photography:** ${day.photography}`)}
${paragraph(`**Safety:** ${day.safety}`)}

${extra}

${tipBox(pick(slug, [
  `Start day ${n} earlier than the cafe crowd; afternoon cloud is common on Himalayan faces.`,
  `Keep rain covers accessible on day ${n}—showers ignore neat itinerary tables.`,
  `On day ${n}, agree a turnaround time before you leave ${day.start}.`,
], n))}
`;
}

function buildPlanningNotes(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const lead = opener(topic.slug, 5, [
    `Practical planning for ${name} is mostly about sequencing: arrive, sleep, climb, buffer, exit—not about stacking every side trip into the same thin weather window.`,
    `Groups that finish ${name} happily usually protect one recovery half-day near ${profile.baseCamp} and refuse late-night bus arrivals before a big stage.`,
    `Think of ${topic.focusKeyword} as an operations manual: transport, water, calories, and turnaround times beat scenic adjectives every time.`,
  ]);

  return `## Practical Planning Notes

${paragraph(
  lead,
  `Confirm current road status into ${profile.location} the day before you travel; Himachal corridors change with monsoon slides and spring thaw.`,
  `Share a printed or offline copy of the day-wise sheet with someone not on the trek, including emergency cues: ${profile.emergency.slice(0, 2).join("; ")}.`,
  `If you are combining ${name} with nearby attractions such as ${profile.nearbyAttractions.slice(0, 2).join(" and ") || "local viewpoints"}, schedule those after the hard days—not between two high stages.`,
  `Guide and porter expectations should be verbalised at ${profile.baseCamp}: load limits, wake-up times, and what “support” includes when weather turns.`,
  `Food strategy matters as much as footwear—carry snack density for the longest stage (${profile.days[0]?.trekTime || "peak day hours"}) and do not rely on every tea stall remaining open out of season.`,
  `Photography goals listed earlier (${profile.photographySpots.slice(0, 2).join(", ") || "ridge light"}) should never override the safety line for descending to ${profile.days[profile.days.length - 1]?.end || profile.baseCamp}.`,
  `Finally, leave ${name} cleaner than you found it: pack out wrappers, avoid soap in streams, and keep music off on quiet forest stretches where wildlife still uses the corridor.`,
)}

${infoBox(`Tags for this piece (${topic.tags.slice(0, 4).join(", ")}) are for discovery—on the trail, only weather, water, and teammates matter.`)}
`;
}

function buildItinerary(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const expand = topic.kind === "itinerary";
  const days = profile.days;

  if (!days.length) {
    return `## Day Wise Itinerary

${paragraph(
  `A detailed day sheet for ${name} should be confirmed with your operator. This profile currently emphasises overview planning—do not invent camps from another trek.`,
)}
`;
  }

  const blocks = days.map((d, i) => renderDayBlock(d, i, expand, topic.slug)).join("\n");

  return `## Day Wise Itinerary

${paragraph(
  `The following days belong only to **${name}**. Do not reuse Hampta camps on a Triund plan, or Spiti jeep stages on a forest-park walk.`,
  expand
    ? `Because this is an itinerary-led ${topic.focusKeyword}, each day below includes expanded pacing and safety notes.`
    : `Skim the table on each day, then read the description—terrain notes matter as much as kilometre counts.`,
  `Total shape: ${profile.duration}, ${profile.distanceKm}, high point ${profile.highestAltitudeM}.`,
)}

${blocks}

${imageSuggestion(topic.slug, `On-trail day stage of ${name}`, 7)}
`;
}

function buildClusterSection(topic: HimachalTrekBlogTopic) {
  if (topic.kind !== "cluster" && topic.trekKey !== "himachal-cluster") return "";

  const profiles = clusterProfiles(topic);
  const rows = profiles
    .map(
      (p) =>
        `| ${p.name} | ${p.region} | ${p.difficulty} | ${p.duration} | ${p.highestAltitudeM} | ${p.bestTime} |`,
    )
    .join("\n");

  return `## Trek Cluster Roundup

${paragraph(
  `"${topic.title}" is a comparison guide, not a single-route day sheet. The table below lists treks drawn from existing Himachal profiles that match keywords in this topic—no invented distances or fake camps.`,
  `Open each trek’s dedicated guide before you book; cluster articles help you shortlist, not splice itineraries together.`,
)}

| Trek | Region | Difficulty | Duration | High point | Best time |
| --- | --- | --- | --- |
${rows}

${paragraph(
  `How to use this list for ${topic.focusKeyword}: pick two or three candidates whose duration fits your leave, then compare difficulty and snowfall months.`,
  `Weekend travellers should prefer shorter profiles; high-altitude goals need acclimatisation buffers that a single cluster table cannot replace.`,
)}

${listLines(
  profiles.slice(0, 8).map(
    (p) =>
      `**${p.name}** (${p.difficulty}) — base ${p.baseCamp}; ${p.whyChoose[0] || p.trailOverview.slice(0, 80)}`,
  ),
)}

${infoBox(`Internal links below point to related blog slugs and /treks filters so you can move from roundup to booking without losing region context.`)}

${imageSuggestion(topic.slug, `Himachal trek cluster landscapes`, 2)}
`;
}

function buildFaqs(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const faqs = [
    {
      question: `What is the best time for ${topic.focusKeyword}?`,
      answer: `For ${name}, the strongest planning window is generally ${profile.bestTime}. Always re-check snow and landslide advisories close to departure.`,
    },
    {
      question: `How difficult is the ${name}?`,
      answer: `${name} is graded ${profile.difficulty}. Fitness cue: ${profile.fitness}`,
    },
    {
      question: `How long is ${name} and what distance should I expect?`,
      answer: `Plan for ${profile.duration} covering about ${profile.distanceKm}, with a high point near ${profile.highestAltitudeM}.`,
    },
    {
      question: `Where is the base camp for ${name}?`,
      answer: `Most itineraries stage from ${profile.baseCamp} in the ${profile.location} area.`,
    },
    {
      question: `How do I reach ${name}?`,
      answer: `Rail via ${profile.nearestRail}, air via ${profile.nearestAirport}, then road: ${profile.roadConnectivity}`,
    },
    {
      question: `Do I need permits for ${topic.focusKeyword}?`,
      answer: profile.permits,
    },
    {
      question: `What does ${name} cost on a budget?`,
      answer: `Indicative bands—budget ${profile.budget.budget}, standard ${profile.budget.standard}, premium ${profile.budget.premium}—plus forest fees, guides, and personal gear.`,
    },
    {
      question: `Is camping available on ${name}?`,
      answer: profile.camping,
    },
    {
      question: `What should I pack for ${topic.focusKeyword}?`,
      answer: `Prioritise ${profile.packing.slice(0, 5).join(", ")}, plus the always-carry list: ${profile.carry.slice(0, 4).join(", ")}.`,
    },
    {
      question: `What about AMS on ${name}?`,
      answer: profile.ams,
    },
    {
      question: `Is there network and electricity on ${name}?`,
      answer: `Network: ${profile.network} Electricity: ${profile.electricity}`,
    },
    {
      question: `Are ATMs and medical help available near ${name}?`,
      answer: `ATM: ${profile.atm} Medical: ${profile.medical}`,
    },
    {
      question: `What nearby treks pair well after ${name}?`,
      answer: profile.nearbyTreks.length
        ? `Common planning neighbours include ${profile.nearbyTreks.slice(0, 4).join(", ")}—each with its own day sheet.`
        : `Browse other ${profile.region} routes on /treks rather than inventing a combo itinerary.`,
    },
    {
      question: `Is ${name} good for beginners researching ${topic.focusKeyword}?`,
      answer: /easy/i.test(profile.difficulty)
        ? `Yes for fitness-aware beginners in fair weather, ideally with a guide on busy weekends.`
        : `Only if your conditioning matches a ${profile.difficulty} grade. Consider an easier ${profile.region} trek first if you are new to altitude.`,
    },
    {
      question: `What makes this ${topic.focusKeyword} guide different?`,
      answer: `It uses the dedicated ${name} profile—unique camps, fees, and day stages—so content is not copy-pasted from another Himachal trek.`,
    },
  ];

  return faqs.slice(0, 15);
}

function buildFaqSection(faqs: Array<{ question: string; answer: string }>) {
  let md = `## FAQs\n\n`;
  for (const faq of faqs) {
    md += `### ${faq.question}\n\n${faq.answer}\n\n`;
  }
  return md;
}

function relatedBlogLinks(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const variants = [
    topic.slug,
    `${profile.key}-trek-complete-guide`,
    `${profile.key}-trek-guide`,
    `${profile.key}-trek-itinerary`,
    `${profile.key}-trek-cost`,
    `${profile.key}-trek-packing-list`,
    `${profile.key}-trek-best-time`,
    `${profile.region}-treks-guide`,
    `best-treks-near-${profile.region}`,
    ...RELATED_HUB_SLUGS,
  ];
  // Prefer 8–10 distinct internal links; skip self-slug as first if duplicates thin the list
  const unique = [...new Set(variants)].filter((s) => s && s.length > 3);
  const picked = unique.slice(0, 10);
  while (picked.length < 8) {
    const hub = RELATED_HUB_SLUGS[picked.length % RELATED_HUB_SLUGS.length];
    if (!picked.includes(hub)) picked.push(hub);
    else break;
  }
  return picked.map((slug) => {
    const title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return `- ${link(title, slug)}`;
  });
}

function buildConclusion(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  const close = opener(topic.slug, 4, [
    `${topic.title} becomes straightforward when season, fitness, and day pacing match what ${name} actually demands.`,
    `Leave ${name} with fewer regrets by protecting buffers, respecting ${profile.highestAltitudeM}, and refusing itineraries stolen from unrelated valleys.`,
    `Bookmark this ${topic.focusKeyword}, share it with your group, and re-check local snow or road updates before locking non-refundable plans.`,
    `The best ${name} trips feel unhurried: early light, honest kilometre counts, and one weather buffer that keeps everyone kind to each other.`,
  ]);

  return `## Conclusion

${paragraph(
  close,
  `${name} in the ${profile.region} belt of ${STATE} rewards trekkers who move with the mountain clock—early starts, layered clothing, and turnaround discipline.`,
  `Use the profile-backed itinerary, budget bands, and safety notes above as your working draft, then adjust on the ground with local advice.`,
  `When you are ready for the next ridge, browse related Himachal routes on India Holiday Destinations without mixing day sheets across treks.`,
)}
`;
}

function buildBookCta(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  return `## Book Trek CTA

${paragraph(
  `Ready to walk ${name}? Start with published Himachal departures and filters on India Holiday Destinations.`,
)}

- Browse **[Himachal Pradesh treks](/treks?state=himachal-pradesh)**
- Explore **[all treks](/treks)**
- Re-read season and packing notes in this ${topic.focusKeyword} before you pay

${tipBox(`Message operators with your exact dates, group size, and whether you need porter support—clarity upfront prevents trailhead arguments.`)}
`;
}

function buildRelatedBlogs(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  return `## Related Blogs

${paragraph(
  `Continue planning with these internal guides (plausible /blogs slugs for interlinking):`,
)}

${relatedBlogLinks(topic, profile).join("\n")}

## Related Treks

- [All treks](/treks)
- [Himachal Pradesh treks](/treks?state=himachal-pradesh)
- Nearby names to search on /treks: ${profile.nearbyTreks.slice(0, 5).join(", ") || profile.name}
`;
}

function buildSchemaAndJsonLd(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile, faqs: Array<{ question: string; answer: string }>) {
  const name = trekName(topic, profile);
  const canonical = `/blogs/${topic.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title,
    description: topic.excerptHint,
    mainEntityOfPage: canonical,
    keywords: [topic.focusKeyword, ...topic.secondaryKeywords].join(", "),
    about: name,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blogs" },
      { "@type": "ListItem", position: 3, name: "Treks", item: "/treks" },
      { "@type": "ListItem", position: 4, name: topic.title, item: canonical },
    ],
  };

  return `## Schema Suggestions (JSON-LD)

Use these sketches when publishing (validate before going live):

\`\`\`json
${JSON.stringify(articleSchema, null, 2)}
\`\`\`

\`\`\`json
${JSON.stringify(faqSchema, null, 2)}
\`\`\`

\`\`\`json
${JSON.stringify(breadcrumbSchema, null, 2)}
\`\`\`
`;
}

function kindEmphasisSections(topic: HimachalTrekBlogTopic, profile: HimachalTrekProfile) {
  const name = trekName(topic, profile);
  if (topic.kind === "cost") {
    return `## Cost Deep Dive

${paragraph(
  `Operators quote ${name} differently—some fold permits into the package, others bill forest fees at the trailhead.`,
  `Build a spreadsheet with: package fee, transport to ${profile.baseCamp}, forest fees (${profile.forestFees}), guide (${profile.guideCharges}), porter (${profile.porterCharges}), rental gear, and a 10–15% contingency.`,
  `Premium tiers usually buy better tents, lower guide ratios, and private transfers—not magical weather.`,
  `If two quotes differ by a wide margin, ask what was removed: meals, permits, offloading, or emergency support.`,
)}

${warningBox(`Never pay the full balance in cash to an unverified agent for ${name} without a written itinerary and cancellation terms.`)}
`;
  }

  if (topic.kind === "packing" || topic.kind === "prep") {
    return `## Packing Deep Dive

${paragraph(
  `Layering beats bulk for ${name}. Think base / mid / shell, plus dry sleep clothes sealed in a dry bag.`,
  `Footwear should be broken in; new boots on day one of ${profile.duration} is a blister factory.`,
  `Cold nights near ${profile.highestAltitudeM} punish cotton. Prefer synthetics or wool, and pack spare socks as seriously as you pack a camera.`,
  `Shared group gear (stove, first-aid, rope where relevant) should be assigned before you leave ${profile.baseCamp}.`,
)}

${listLines([
  ...profile.packing.slice(0, 8),
  ...profile.carry.slice(0, 4),
].map((i) => `${i}`))}
`;
  }

  if (topic.kind === "audience") {
    return `## Who This Trek Suits

${paragraph(
  `${name} at ${profile.difficulty} suits travellers who can match the fitness note: ${profile.fitness}`,
  `Families should prefer easier grades and shorter stages; solo trekkers should use registered operators on remote corridors; women-focused groups should confirm guide ratios and camp privacy in advance.`,
  `If "${topic.title}" speaks to a specific audience, still obey the same AMS and weather rules—identity does not cancel altitude.`,
)}
`;
  }

  return "";
}

export function buildTrekArticleMarkdown(topic: HimachalTrekBlogTopic) {
  const profile = profileFor(topic);

  const sections = [
    buildIntroduction(topic, profile),
    buildQuickOverview(topic, profile),
    buildWhyChoose(topic, profile),
    buildLocation(topic, profile),
    buildHistory(topic, profile),
    buildTrailOverview(topic, profile),
    buildDifficulty(topic, profile),
    buildStatsOverview(topic, profile),
    buildAccess(topic, profile),
    buildBestTime(topic, profile),
    buildMonthWeather(topic, profile),
    buildTemperature(topic, profile),
    buildSnowfall(topic, profile),
    buildFloraFauna(topic, profile),
    buildPhotography(topic, profile),
    buildFacilities(topic, profile),
    buildCamping(topic, profile),
    buildPermitsAndCharges(topic, profile),
    buildPackingFitness(topic, profile),
    kindEmphasisSections(topic, profile),
    buildSafety(topic, profile),
    buildNearby(topic, profile),
    buildBudget(topic, profile),
    buildClusterSection(topic),
    buildPlanningNotes(topic, profile),
    buildItinerary(topic, profile),
  ].filter(Boolean);

  const faqs = buildFaqs(topic, profile);
  sections.push(buildFaqSection(faqs));
  sections.push(buildConclusion(topic, profile));
  sections.push(buildBookCta(topic, profile));
  sections.push(buildRelatedBlogs(topic, profile));
  sections.push(buildSchemaAndJsonLd(topic, profile, faqs));

  const content = sections.join("\n");
  const toc: Array<{ id: string; title: string; level: number }> = [];
  for (const match of content.matchAll(/^## (.+)$/gm)) {
    const title = match[1].trim();
    toc.push({ id: slugifyHeading(title), title, level: 2 });
  }

  const wordCount = words(content);
  const readingTimeMinutes = Math.max(12, Math.round(wordCount / 200));

  return {
    content,
    tableOfContents: toc,
    faq: faqs,
    wordCount,
    readingTimeMinutes,
    excerpt:
      topic.excerptHint ||
      `A practical ${topic.focusKeyword} covering itinerary, difficulty, permits, packing, weather, and costs for ${trekName(topic, profile)}, ${STATE}.`,
  };
}

export function buildTrekSeoForTopic(topic: HimachalTrekBlogTopic, excerpt: string) {
  const profile = profileFor(topic);
  const name = trekName(topic, profile);
  const title = `${topic.title} (2026) | India Holiday Destinations`;
  const description =
    excerpt.length > 155
      ? `${excerpt.slice(0, 152).trim()}...`
      : excerpt ||
        `Plan ${topic.focusKeyword} with day-wise itinerary, weather, permits, packing, and costs for ${name}, ${STATE}.`;
  const canonical = `/blogs/${topic.slug}`;
  const keywords = [topic.focusKeyword, ...topic.secondaryKeywords];

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
      { name: "Treks", url: "/treks" },
      { name: topic.title, url: canonical },
    ],
  };
}
