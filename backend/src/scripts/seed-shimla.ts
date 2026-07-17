/**
 * Upsert Shimla destination + tour packages.
 * Usage: npx tsx src/scripts/seed-shimla.ts
 */
import fs from "node:fs";
import path from "node:path";
import { connectDatabase, disconnectDatabase } from "../database/connection";
import { DestinationModel } from "../models/Destination.model";
import { TrekModel } from "../models/Trek.model";
import { logger } from "../utils/logger";

async function main() {
  await connectDatabase();

  await DestinationModel.findOneAndUpdate(
    { slug: "shimla" },
    {
      slug: "shimla",
      name: "Shimla",
      region: "Shimla Hills",
      state: "Himachal Pradesh",
      summary: "Heritage hill station with Mall Road, Kufri, Chail and Kinnaur gateway tours.",
      description:
        "Himachal capital hill station — colonial Ridge walks, toy-train nostalgia, and day trips to Kufri, Chail, Naldehra, and Mashobra.",
      coverImage: "/images/treks/mountains-1.jpg",
      highlights: ["The Ridge", "Mall Road", "Kufri", "Chail", "Jakhoo Temple", "Viceregal Lodge"],
      bestSeasons: ["spring", "summer", "autumn", "winter"],
      altitudeRange: { min: 6000, max: 10000 },
      gallery: ["/images/treks/mountains-1.jpg"],
      status: "published",
      deletedAt: null,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  logger.info("Shimla destination upserted");

  const file = path.join(process.cwd(), "seed-data/shimla-packages.json");
  const packages = JSON.parse(fs.readFileSync(file, "utf8")) as Array<Record<string, unknown>>;
  for (const trek of packages) {
    await TrekModel.findOneAndUpdate(
      { slug: trek.slug },
      { ...trek, deletedAt: null, status: "published" },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    logger.info("Shimla package upserted", { slug: trek.slug });
  }

  const trekCount = await TrekModel.countDocuments({
    destinationName: "Shimla",
    status: "published",
    deletedAt: null,
  });
  await DestinationModel.updateOne({ slug: "shimla" }, { $set: { trekCount } });
  console.log(JSON.stringify({ destination: "shimla", packages: packages.length, trekCount }, null, 2));
  await disconnectDatabase();
}

main().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});
