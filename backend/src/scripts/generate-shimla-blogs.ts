/**
 * Generate enterprise travel blogs for all Shimla topics (120).
 *
 * Usage:
 *   npx tsx src/scripts/generate-shimla-blogs.ts
 *   PUBLISH=1 npx tsx src/scripts/generate-shimla-blogs.ts
 *   FORCE=1 PUBLISH=1 npx tsx src/scripts/generate-shimla-blogs.ts
 */
import { connectDatabase, disconnectDatabase } from "../database/connection";
import { aiBlogGeneratorService } from "../services/aiBlogGenerator.service";
import { SHIMLA_BLOG_TOPICS } from "../data/shimla-blog-topics";
import { buildShimlaArticleMarkdown } from "../services/blogContent/buildShimlaArticle";
import { logger } from "../utils/logger";

const PUBLISH = process.env.PUBLISH === "1" || process.env.PUBLISH === "true";
const FORCE = process.env.FORCE === "1" || process.env.FORCE === "true";
const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

async function main() {
  if (DRY_RUN) {
    const samples = SHIMLA_BLOG_TOPICS.slice(0, 3).map((topic) => {
      const article = buildShimlaArticleMarkdown(topic);
      return { slug: topic.slug, wordCount: article.wordCount, readingTimeMinutes: article.readingTimeMinutes };
    });
    console.log(JSON.stringify({ topics: SHIMLA_BLOG_TOPICS.length, samples }, null, 2));
    return;
  }

  await connectDatabase();
  try {
    logger.info("Starting Shimla blog generation", {
      topics: SHIMLA_BLOG_TOPICS.length,
      publish: PUBLISH,
      force: FORCE,
    });

    const results = await aiBlogGeneratorService.generateAllShimlaBlogs({
      publish: PUBLISH,
      force: FORCE,
      relink: true,
    });

    const summary = results.reduce(
      (acc, row) => {
        acc[row.action] = (acc[row.action] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    logger.info("Shimla blog generation complete", { summary, total: results.length });
    console.log(JSON.stringify({ summary, total: results.length }, null, 2));
  } finally {
    await disconnectDatabase();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
