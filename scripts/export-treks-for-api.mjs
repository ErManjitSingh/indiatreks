/**
 * Export frontend trek listings + details into backend/seed-data/treks.json
 * Run from repo root: node scripts/export-treks-for-api.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "backend/seed-data");
fs.mkdirSync(outDir, { recursive: true });

// Use tsx via dynamic import of compiled approach — write a simpler JSON from requiring after tsx
console.log("Use: npx tsx scripts/export-treks-for-api.ts");
