/**
 * Generate enterprise travel blogs for Dharamshala topics.
 *
 * Usage:
 *   npx tsx src/scripts/generate-travel-blogs.ts
 *   PUBLISH=1 npx tsx src/scripts/generate-travel-blogs.ts
 *   FORCE=1 PUBLISH=1 npx tsx src/scripts/generate-travel-blogs.ts
 */
import { connectDatabase, disconnectDatabase } from "../database/connection";
import { aiBlogGeneratorService } from "../services/aiBlogGenerator.service";
import { logger } from "../utils/logger";

const PUBLISH = process.env.PUBLISH === "1" || process.env.PUBLISH === "true";
const FORCE = process.env.FORCE === "1" || process.env.FORCE === "true";

async function main() {
  await connectDatabase();
  try {
    const results = await aiBlogGeneratorService.generateAllDharamshalaBlogs({
      publish: PUBLISH,
      force: FORCE,
    });
    const summary = results.reduce(
      (acc, row) => {
        acc[row.action] = (acc[row.action] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    logger.info("Travel blog generation complete", { summary, total: results.length });
    console.log(JSON.stringify({ summary, total: results.length }, null, 2));
  } finally {
    await disconnectDatabase();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
