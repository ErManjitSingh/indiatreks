import fs from "node:fs";
import path from "node:path";
import { connectDatabase, disconnectDatabase } from "./connection";
import { TrekModel } from "../models/Trek.model";
import { DestinationModel } from "../models/Destination.model";
import { logger } from "../utils/logger";

async function seedTreks() {
  await connectDatabase();
  const file = path.join(process.cwd(), "seed-data/treks.json");
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${file}. Run: node scripts/build-catalog-treks.mjs`);
  }
  const treks = JSON.parse(fs.readFileSync(file, "utf8")) as Array<Record<string, unknown>>;
  const catalogSlugs = new Set(treks.map((trek) => String(trek.slug)));

  let upserted = 0;
  for (const trek of treks) {
    await TrekModel.findOneAndUpdate(
      { slug: trek.slug },
      { ...trek, deletedAt: null, status: trek.status ?? "published" },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    upserted += 1;
  }

  const archived = await TrekModel.updateMany(
    { slug: { $nin: [...catalogSlugs] }, deletedAt: null },
    { $set: { status: "archived" } },
  );

  const destinations = await DestinationModel.find({ deletedAt: null }).select("name").lean();
  for (const dest of destinations) {
    const trekCount = await TrekModel.countDocuments({
      destinationName: dest.name,
      status: "published",
      deletedAt: null,
    });
    await DestinationModel.updateOne({ _id: dest._id }, { $set: { trekCount } });
  }

  logger.info("Treks seeded", {
    upserted,
    archived: archived.modifiedCount ?? 0,
    destinationsSynced: destinations.length,
  });
  await disconnectDatabase();
}

seedTreks().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});
