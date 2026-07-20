/**
 * Generate pending Himachal trekking blogs (skip existing slugs/titles).
 *
 * Usage:
 *   DRY_RUN=1 npx tsx src/scripts/generate-himachal-trek-blogs.ts
 *   PUBLISH=1 npx tsx src/scripts/generate-himachal-trek-blogs.ts
 *   LIMIT=10 PUBLISH=1 npx tsx src/scripts/generate-himachal-trek-blogs.ts
 */
import { HIMACHAL_TREK_BLOG_TOPICS } from "../data/himachal-trek-blog-topics";
import { buildTrekArticleMarkdown } from "../services/blogContent/buildTrekArticle";

const PUBLISH = process.env.PUBLISH === "1" || process.env.PUBLISH === "true";
const FORCE = process.env.FORCE === "1" || process.env.FORCE === "true";
const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";
const LIMIT = process.env.LIMIT ? Number(process.env.LIMIT) : undefined;

async function main() {
  const topics = LIMIT ? HIMACHAL_TREK_BLOG_TOPICS.slice(0, LIMIT) : HIMACHAL_TREK_BLOG_TOPICS;

  if (DRY_RUN) {
    const samples = topics.slice(0, 3).map((topic) => {
      const article = buildTrekArticleMarkdown(topic);
      return {
        slug: topic.slug,
        title: topic.title,
        trekKey: topic.trekKey,
        wordCount: article.wordCount,
        faqs: article.faq.length,
      };
    });
    console.log(JSON.stringify({ topics: topics.length, samples }, null, 2));
    return;
  }

  const { connectDatabase, disconnectDatabase } = await import("../database/connection");
  const { BlogModel } = await import("../models/Blog.model");
  const { aiBlogGeneratorService } = await import("../services/aiBlogGenerator.service");
  const { logger } = await import("../utils/logger");

  await connectDatabase();
  try {
    const existing = await BlogModel.find({ deletedAt: null }).select("slug title").lean();
    const existingSlugs = new Set(existing.map((b) => String(b.slug).toLowerCase()));
    const existingTitles = new Set(existing.map((b) => String(b.title).toLowerCase().trim()));

    const pending = FORCE
      ? topics
      : topics.filter((t) => {
          if (existingSlugs.has(t.slug.toLowerCase())) return false;
          if (existingTitles.has(t.title.toLowerCase().trim())) return false;
          return true;
        });

    logger.info("Starting Himachal trek blog generation", {
      catalog: topics.length,
      pending: pending.length,
      skippedPrefilter: topics.length - pending.length,
      publish: PUBLISH,
      force: FORCE,
    });

    const results: Array<{ action: string; slug: string; reason?: string }> = [];
    for (const topic of pending) {
      const result = await aiBlogGeneratorService.upsertGeneratedBlog(topic as never, {
        publish: PUBLISH,
        force: FORCE,
      });
      results.push(result);
      console.log(`${result.action}\t${result.slug}${result.reason ? `\t${result.reason}` : ""}`);
    }

    // Allow async indexing notify jobs to settle before disconnect
    await new Promise((r) => setTimeout(r, 2500));

    const summary = results.reduce(
      (acc, row) => {
        acc[row.action] = (acc[row.action] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    logger.info("Himachal trek blog generation complete", { summary, total: results.length });
    console.log(
      JSON.stringify(
        {
          summary,
          total: results.length,
          prefilteredSkipped: topics.length - pending.length,
        },
        null,
        2,
      ),
    );
  } finally {
    await disconnectDatabase();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
