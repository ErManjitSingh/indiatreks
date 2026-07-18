/**
 * Merge unique itinerary JSON batches into backend/seed-data/treks.json
 * and emit a FE sync helper map.
 *
 * Usage: node scripts/apply-unique-itineraries.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const batchesDir = path.join(__dirname, "data/itineraries");
const treksPath = path.join(root, "backend/seed-data/treks.json");

function loadBatches() {
  if (!fs.existsSync(batchesDir)) {
    throw new Error(`Missing batches dir: ${batchesDir}`);
  }
  const files = fs
    .readdirSync(batchesDir)
    .filter((f) => f.endsWith(".json"))
    .sort();
  /** @type {Record<string, unknown[]>} */
  const map = {};
  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(batchesDir, file), "utf8"));
    if (!raw || typeof raw !== "object") continue;
    for (const [slug, itinerary] of Object.entries(raw)) {
      if (!Array.isArray(itinerary) || itinerary.length === 0) {
        console.warn(`Skip empty itinerary: ${slug} in ${file}`);
        continue;
      }
      map[slug] = itinerary;
    }
  }
  return map;
}

function normalizeDay(day, index) {
  const d = day && typeof day === "object" ? day : {};
  return {
    day: Number(d.day) || index + 1,
    title: String(d.title || `Day ${index + 1}`),
    startLocation: d.startLocation ? String(d.startLocation) : undefined,
    endLocation: d.endLocation ? String(d.endLocation) : undefined,
    distanceKm: d.distanceKm != null ? Number(d.distanceKm) : undefined,
    altitudeFt: d.altitudeFt != null ? Number(d.altitudeFt) : undefined,
    elevationGainLoss: d.elevationGainLoss ? String(d.elevationGainLoss) : undefined,
    walkingHours: d.walkingHours ? String(d.walkingHours) : undefined,
    difficulty: d.difficulty ? String(d.difficulty) : undefined,
    trailType: d.trailType ? String(d.trailType) : undefined,
    meals: Array.isArray(d.meals) ? d.meals.map(String) : [],
    accommodation: String(d.accommodation || ""),
    description: String(d.description || ""),
    highlights: Array.isArray(d.highlights) ? d.highlights.map(String) : undefined,
    tips: Array.isArray(d.tips) ? d.tips.map(String) : undefined,
    images: Array.isArray(d.images) ? d.images.map(String) : [],
  };
}

function stripUndefined(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

function main() {
  const batches = loadBatches();
  const treks = JSON.parse(fs.readFileSync(treksPath, "utf8"));
  let updated = 0;
  let missing = [];

  for (const trek of treks) {
    const itin = batches[trek.slug];
    if (!itin) {
      missing.push(trek.slug);
      continue;
    }
    trek.itinerary = itin.map((d, i) => stripUndefined(normalizeDay(d, i)));
    trek.durationDays = trek.itinerary.length;
    trek.durationNights = Math.max(0, trek.itinerary.length - 1);
    if (trek.quickInfo) {
      trek.quickInfo.duration = `${trek.durationDays}D/${trek.durationNights}N`;
    }
    updated += 1;
  }

  // Uniqueness check: identical descriptions across treks
  /** @type {Map<string, string[]>} */
  const descMap = new Map();
  for (const trek of treks) {
    for (const day of trek.itinerary || []) {
      const key = String(day.description || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
      if (key.length < 40) continue;
      if (!descMap.has(key)) descMap.set(key, []);
      descMap.get(key).push(`${trek.slug}:D${day.day}`);
    }
  }
  const dupes = [...descMap.entries()].filter(([, refs]) => refs.length > 1);

  fs.writeFileSync(treksPath, `${JSON.stringify(treks, null, 2)}\n`, "utf8");
  console.log(`Updated ${updated}/${treks.length} treks in treks.json`);
  if (missing.length) {
    console.log(`Missing itineraries (${missing.length}): ${missing.join(", ")}`);
  }
  if (dupes.length) {
    console.log(`WARNING: ${dupes.length} duplicated descriptions found:`);
    for (const [desc, refs] of dupes.slice(0, 20)) {
      console.log(`- ${refs.join(" | ")} :: ${desc.slice(0, 80)}...`);
    }
  } else {
    console.log("No cross-trek duplicate descriptions detected.");
  }
}

main();
