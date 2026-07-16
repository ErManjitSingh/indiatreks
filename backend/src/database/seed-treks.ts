import fs from "node:fs";
import path from "node:path";
import { connectDatabase, disconnectDatabase } from "./connection";
import { TrekModel } from "../models/Trek.model";
import { logger } from "../utils/logger";

async function seedTreks() {
  await connectDatabase();
  const file = path.join(process.cwd(), "seed-data/treks.json");
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${file}. Run from repo root: npx tsx scripts/export-treks-for-api.ts`);
  }
  const treks = JSON.parse(fs.readFileSync(file, "utf8")) as Array<Record<string, unknown>>;

  let upserted = 0;
  for (const trek of treks) {
    await TrekModel.findOneAndUpdate(
      { slug: trek.slug },
      { ...trek, deletedAt: null },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    upserted += 1;
  }

  logger.info("Treks seeded", { upserted });
  await disconnectDatabase();
}

seedTreks().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});
