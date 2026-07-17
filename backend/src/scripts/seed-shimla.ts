/**
 * Upsert Shimla destination only (no tour packages in treks).
 * Usage: npx tsx src/scripts/seed-shimla.ts
 */
import { connectDatabase, disconnectDatabase } from "../database/connection";
import { DestinationModel } from "../models/Destination.model";
import { TrekModel } from "../models/Trek.model";
import { BlogModel } from "../models/Blog.model";
import { logger } from "../utils/logger";

const SHIMLA_PACKAGE_SLUGS = [
  "shimla-sightseeing-tour-package",
  "shimla-kufri-chail-tour-package",
  "shimla-honeymoon-tour-package",
  "shimla-manali-tour-package",
];

async function main() {
  await connectDatabase();

  await DestinationModel.findOneAndUpdate(
    { slug: "shimla" },
    {
      slug: "shimla",
      name: "Shimla",
      region: "Shimla Hills",
      state: "Himachal Pradesh",
      summary: "Heritage hill station with Mall Road, Kufri, Chail and Kinnaur gateway day trips.",
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

  const archived = await TrekModel.updateMany(
    { slug: { $in: SHIMLA_PACKAGE_SLUGS } },
    { $set: { status: "archived", deletedAt: new Date() } },
  );
  logger.info("Shimla tour packages archived", { modified: archived.modifiedCount });

  // Drop package refs from Shimla blogs so related cards only show real treks (if any)
  const blogs = await BlogModel.updateMany(
    { category: "Shimla", deletedAt: null },
    {
      $set: {
        relatedTreks: [],
        modifiedAt: new Date(),
      },
    },
  );
  logger.info("Shimla blog package refs cleared", { matched: blogs.matchedCount, modified: blogs.modifiedCount });

  // Remove package URLs from internalLinks
  const withLinks = await BlogModel.find({
    category: "Shimla",
    deletedAt: null,
    "internalLinks.url": { $regex: /tour-package/i },
  }).select("_id internalLinks");
  for (const blog of withLinks) {
    const cleaned = (blog.internalLinks || []).filter((link) => !/tour-package/i.test(link.url));
    await BlogModel.updateOne({ _id: blog._id }, { $set: { internalLinks: cleaned } });
  }
  logger.info("Shimla internal package links cleaned", { count: withLinks.length });

  const trekCount = await TrekModel.countDocuments({
    destinationName: "Shimla",
    status: "published",
    deletedAt: null,
  });
  await DestinationModel.updateOne({ slug: "shimla" }, { $set: { trekCount } });
  console.log(
    JSON.stringify(
      {
        destination: "shimla",
        packagesArchived: archived.modifiedCount,
        blogsUpdated: blogs.modifiedCount,
        trekCount,
      },
      null,
      2,
    ),
  );
  await disconnectDatabase();
}

main().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});
