import type { Request, Response } from "express";
import { SettingModel } from "../models/Setting.model";
import { TrekModel } from "../models/Trek.model";
import { DestinationModel } from "../models/Destination.model";
import { FaqModel } from "../models/Faq.model";
import { TestimonialModel } from "../models/Testimonial.model";
import { BlogModel } from "../models/Blog.model";
import { MediaModel } from "../models/Media.model";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";

function settingsToObject(rows: Array<{ key: string; value: unknown }>) {
  const out: Record<string, unknown> = {};
  for (const row of rows) out[row.key] = row.value;
  return out;
}

/** Public bootstrap payload for the Next.js website (no auth). */
export const getBootstrap = asyncHandler(async (_req: Request, res: Response) => {
  const [settings, destinations, faqs, testimonials, blogs, media, trekCount] =
    await Promise.all([
      SettingModel.find({ group: { $in: ["site", "homepage", "navigation", "facets", "media"] } }).lean(),
      DestinationModel.find({ deletedAt: null, status: "published" }).sort({ name: 1 }).lean(),
      FaqModel.find({ status: "published" }).sort({ sortOrder: 1 }).lean().catch(() => []),
      TestimonialModel.find({ status: "approved" }).sort({ createdAt: -1 }).lean().catch(() => []),
      BlogModel.find({ status: "published" }).sort({ publishedAt: -1 }).limit(12).lean(),
      MediaModel.find({ folder: "site-assets" }).limit(500).lean().catch(() => []),
      TrekModel.countDocuments({ status: "published" }),
    ]);

  const map = settingsToObject(settings as Array<{ key: string; value: unknown }>);

  return sendSuccess(res, {
    site: map["site.config"] ?? null,
    navigation: map["site.navigation"] ?? null,
    homepage: map["homepage.content"] ?? null,
    trekFacets: map["facets.trek"] ?? null,
    imageMap: map["media.imageMap"] ?? null,
    destinations,
    faqs,
    testimonials,
    blogs,
    media,
    meta: { trekCount },
  });
});

export const getPublicSettings = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await SettingModel.find({
    group: { $in: ["site", "homepage", "navigation", "facets", "media"] },
  }).lean();
  return sendSuccess(res, settingsToObject(settings as Array<{ key: string; value: unknown }>));
});
