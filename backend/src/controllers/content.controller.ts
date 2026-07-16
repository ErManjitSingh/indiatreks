import type { Request, Response } from "express";
import { SettingModel } from "../models/Setting.model";
import { TrekModel } from "../models/Trek.model";
import { DestinationModel } from "../models/Destination.model";
import { FaqModel } from "../models/Faq.model";
import { TestimonialModel } from "../models/Testimonial.model";
import { BlogModel } from "../models/Blog.model";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";

function settingsToObject(rows: Array<{ key: string; value: unknown }>) {
  const out: Record<string, unknown> = {};
  for (const row of rows) out[row.key] = row.value;
  return out;
}

/** Public bootstrap payload for the Next.js website (no auth). Kept lean on purpose. */
export const getBootstrap = asyncHandler(async (_req: Request, res: Response) => {
  const [settings, destinations, faqs, testimonials, blogs, trekCount] = await Promise.all([
    SettingModel.find({
      group: { $in: ["site", "homepage", "navigation", "facets", "media"] },
    })
      .select("key value group")
      .lean(),
    DestinationModel.find({ deletedAt: null, status: "published" })
      .select("slug name region state summary coverImage trekCount status")
      .sort({ name: 1 })
      .lean(),
    FaqModel.find({ status: "published" })
      .select("question answer category sortOrder")
      .sort({ sortOrder: 1 })
      .lean()
      .catch(() => []),
    TestimonialModel.find({ status: "approved" })
      .select("name role comment rating avatar featured")
      .sort({ createdAt: -1 })
      .limit(12)
      .lean()
      .catch(() => []),
    BlogModel.find({ status: "published" })
      .select("slug title excerpt coverImage category tags publishedAt readingTimeMinutes")
      .sort({ publishedAt: -1 })
      .limit(8)
      .lean(),
    TrekModel.countDocuments({ status: "published", deletedAt: null }),
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
    // Media catalog intentionally omitted — files are served from /public; use /media admin API.
    media: [],
    meta: { trekCount },
  });
});

export const getPublicSettings = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await SettingModel.find({
    group: { $in: ["site", "homepage", "navigation", "facets", "media"] },
  })
    .select("key value group")
    .lean();
  return sendSuccess(res, settingsToObject(settings as Array<{ key: string; value: unknown }>));
});
