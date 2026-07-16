import { logger } from "../utils/logger";

/** Lightweight in-process cron-style jobs (no node-cron dep required). */
export function registerJobs() {
  // Every hour: log heartbeat (extend with booking reminders, draft publish, etc.)
  const hourMs = 60 * 60 * 1000;
  setInterval(() => {
    logger.info("Job heartbeat", { at: new Date().toISOString() });
  }, hourMs).unref();

  // Every 15 minutes: publish scheduled blogs (lazy import to avoid circular deps)
  const fifteenMin = 15 * 60 * 1000;
  setInterval(() => {
    void (async () => {
      try {
        const { BlogModel } = await import("../models/Blog.model");
        const now = new Date();
        const result = await BlogModel.updateMany(
          {
            status: "scheduled",
            scheduledAt: { $lte: now },
            deletedAt: null,
          },
          { $set: { status: "published", publishedAt: now } },
        );
        if (result.modifiedCount) {
          logger.info("Published scheduled blogs", { count: result.modifiedCount });
        }
      } catch (error) {
        logger.error("Scheduled blog job failed", { error });
      }
    })();
  }, fifteenMin).unref();

  logger.info("Background jobs registered");
}
