import fs from "node:fs";
import path from "node:path";
import { connectDatabase, disconnectDatabase } from "./connection";
import { SettingModel } from "../models/Setting.model";
import { DestinationModel } from "../models/Destination.model";
import { FaqModel } from "../models/Faq.model";
import { TestimonialModel } from "../models/Testimonial.model";
import { BlogModel } from "../models/Blog.model";
import { MediaModel } from "../models/Media.model";
import { logger } from "../utils/logger";
import { slugify } from "../utils/slugify";

type SiteContentFile = {
  site: Record<string, unknown>;
  navigation: Record<string, unknown>;
  homepage: {
    homeFaqs?: Array<{ id?: string; question: string; answer: string; category?: string }>;
    testimonials?: Array<{
      id?: string;
      name: string;
      role?: string;
      comment?: string;
      quote?: string;
      rating?: number;
      avatar?: string;
      photo?: string;
    }>;
    latestBlogs?: Array<{
      id?: string;
      slug?: string;
      title: string;
      excerpt?: string;
      coverImage?: string;
      image?: string;
      category?: string;
      tags?: string[];
      publishedAt?: string;
      readingTimeMinutes?: number;
    }>;
    popularDestinations?: Array<{
      slug: string;
      name: string;
      region?: string;
      trekCount?: number;
      image?: string;
      summary?: string;
    }>;
    destinationShowcases?: Array<{
      slug: string;
      name: string;
      description?: string;
      image?: string;
      trekCountLabel?: string;
      bestTime?: string;
    }>;
    [key: string]: unknown;
  };
  trekFacets: Record<string, unknown>;
  imageMap: Record<string, string>;
  mediaCatalog: Array<{
    url: string;
    publicId: string;
    format?: string;
    folder?: string;
    alt?: string;
  }>;
};

async function upsertSetting(key: string, value: unknown, group: string) {
  await SettingModel.findOneAndUpdate(
    { key },
    { key, value, group },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

async function seedSiteContent() {
  await connectDatabase();
  const file = path.join(process.cwd(), "seed-data/site-content.json");
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${file}. Run: npx tsx scripts/export-site-content.ts`);
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as SiteContentFile;

  await upsertSetting("site.config", data.site, "site");
  await upsertSetting("site.navigation", data.navigation, "navigation");
  await upsertSetting("homepage.content", data.homepage, "homepage");
  await upsertSetting("facets.trek", data.trekFacets, "facets");
  await upsertSetting("media.imageMap", data.imageMap, "media");
  logger.info("Settings upserted");

  // Destinations from showcases + popular
  const destInputs = [
    ...(data.homepage.popularDestinations ?? []).map((d) => ({
      slug: d.slug,
      name: d.name,
      region: d.region ?? "",
      state: d.region?.includes("Uttarakhand") ? "Uttarakhand" : "Himachal Pradesh",
      summary: d.summary ?? `${d.name} trekking destination`,
      description: d.summary ?? `${d.name} trekking destination`,
      coverImage: d.image ?? "/images/treks/hero.jpg",
      trekCount: d.trekCount ?? 0,
      status: "published" as const,
    })),
    ...(data.homepage.destinationShowcases ?? []).map((d) => ({
      slug: d.slug,
      name: d.name,
      region: d.name,
      state: d.name,
      summary: d.description ?? d.name,
      description: d.description ?? d.name,
      coverImage: d.image ?? "/images/treks/hero.jpg",
      trekCount: 0,
      status: "published" as const,
      weatherNotes: d.bestTime ?? "",
    })),
  ];

  for (const dest of destInputs) {
    await DestinationModel.findOneAndUpdate(
      { slug: dest.slug },
      { ...dest, deletedAt: null },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
  logger.info("Destinations upserted", { count: destInputs.length });

  const faqs = data.homepage.homeFaqs ?? [];
  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i]!;
    await FaqModel.findOneAndUpdate(
      { question: faq.question },
      {
        question: faq.question,
        answer: faq.answer,
        category: faq.category ?? "general",
        sortOrder: i,
        status: "published",
        deletedAt: null,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
  logger.info("FAQs upserted", { count: faqs.length });

  const testimonials = data.homepage.testimonials ?? [];
  for (const t of testimonials) {
    const comment = t.comment ?? t.quote ?? (t as { experience?: string }).experience ?? "";
    await TestimonialModel.findOneAndUpdate(
      { name: t.name, comment },
      {
        name: t.name,
        role: t.role ?? (t as { location?: string }).location ?? (t as { trekName?: string }).trekName,
        comment,
        rating: t.rating ?? 5,
        avatar: t.avatar ?? t.photo,
        featured: true,
        status: "approved",
        deletedAt: null,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
  logger.info("Testimonials upserted", { count: testimonials.length });

  const blogs = data.homepage.latestBlogs ?? [];
  for (const b of blogs) {
    const slug = b.slug || slugify(b.title);
    await BlogModel.findOneAndUpdate(
      { slug },
      {
        slug,
        title: b.title,
        excerpt: b.excerpt ?? "",
        content: b.excerpt ?? b.title,
        coverImage: b.coverImage ?? b.image ?? "/images/treks/landscape-1.jpg",
        author: { name: "India Holiday Destinations" },
        category: b.category ?? "Trekking",
        tags: b.tags ?? [],
        status: "published",
        publishedAt: b.publishedAt ? new Date(b.publishedAt) : new Date(),
        readingTimeMinutes: b.readingTimeMinutes ?? 4,
        deletedAt: null,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
  logger.info("Blogs upserted", { count: blogs.length });

  let mediaCount = 0;
  for (const m of data.mediaCatalog ?? []) {
    await MediaModel.findOneAndUpdate(
      { publicId: m.publicId },
      {
        publicId: m.publicId,
        url: m.url,
        format: m.format,
        folder: m.folder ?? "site-assets",
        alt: m.alt,
        deletedAt: null,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    mediaCount += 1;
  }
  // Also store remote image map URLs
  for (const [key, url] of Object.entries(data.imageMap ?? {})) {
    const publicId = `imagemap__${key}`;
    await MediaModel.findOneAndUpdate(
      { publicId },
      {
        publicId,
        url,
        format: url.includes(".") ? url.split(".").pop() : "jpg",
        folder: "site-assets",
        alt: key,
        deletedAt: null,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    mediaCount += 1;
  }
  logger.info("Media catalog upserted", { count: mediaCount });

  await disconnectDatabase();
  logger.info("Site content seed complete");
}

seedSiteContent().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});
