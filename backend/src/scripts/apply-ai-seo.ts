/**
 * Apply AI-generated SEO to all entities missing meta/FAQs/schema.
 * Human-quality templates from aiSeo generators — writes only into empty fields
 * unless FORCE=1 (then overwrites title/description/canonical/og/twitter).
 *
 * Usage (on VPS):
 *   cd /var/www/api.treks.indiaholidaydestination.com/app/backend
 *   npx tsx src/scripts/apply-ai-seo.ts
 *   FORCE=1 npx tsx src/scripts/apply-ai-seo.ts   # overwrite existing SEO
 */
import { connectDatabase, disconnectDatabase } from "../database/connection";
import { TrekModel } from "../models/Trek.model";
import { BlogModel } from "../models/Blog.model";
import { DestinationModel } from "../models/Destination.model";
import { ProgrammaticSeoPageModel } from "../models/ProgrammaticSeoPage.model";
import { aiSeoService } from "../services/aiSeo.service";
import { calculateSeoScore } from "../services/seoScore.service";
import { logger } from "../utils/logger";
import { seoService } from "../services/seo.service";

const FORCE = process.env.FORCE === "1" || process.env.FORCE === "true";

function isBlank(value: unknown) {
  if (value == null) return true;
  if (typeof value === "string") return !value.trim();
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function mergeSeo(
  existing: Record<string, unknown> | undefined,
  generated: Record<string, unknown>,
  extras: Record<string, unknown> = {},
) {
  const current = { ...(existing || {}) };
  const next = { ...generated, ...extras };

  for (const [key, value] of Object.entries(next)) {
    if (FORCE || isBlank(current[key])) {
      current[key] = value;
    }
  }

  if (isBlank(current.index)) current.index = true;
  if (isBlank(current.follow)) current.follow = true;
  if (isBlank(current.robots)) current.robots = "index,follow";
  if (isBlank(current.twitterCard)) current.twitterCard = "summary_large_image";
  current.lastSeoUpdate = new Date();
  return current;
}

async function applyTreks() {
  const treks = await TrekModel.find({});
  let updated = 0;

  for (const trek of treks) {
    const payload = {
      title: trek.title,
      destinationName: trek.destinationName,
      region: trek.region,
      difficulty: trek.difficulty,
      durationDays: trek.durationDays,
      maxAltitude: trek.maxAltitude,
      summary: trek.summary,
      overview: trek.overview,
      bestSeasons: trek.bestSeasons,
      months: trek.months,
      basePriceInr: trek.basePriceInr,
    };

    const meta = await aiSeoService.suggestMeta({
      entityType: "trek",
      entityId: String(trek._id),
      payload,
    });
    const faqs = await aiSeoService.suggestFaqs({
      entityType: "trek",
      entityId: String(trek._id),
      payload,
    });

    const seo = mergeSeo(trek.seo as never, meta.suggestions as never, {
      schemaType: "TouristTrip",
      imageAlt: trek.seo?.imageAlt || `${trek.title} Himalayan trek`,
      imageCaption: trek.seo?.imageCaption || `${trek.title} — India Holiday Destinations`,
      ogImage: trek.seo?.ogImage || trek.heroImages?.[0] || undefined,
      twitterImage: trek.seo?.twitterImage || trek.seo?.ogImage || trek.heroImages?.[0] || undefined,
      breadcrumb: [
        { name: "Home", url: "/" },
        { name: "Treks", url: "/treks" },
        { name: trek.title, url: `/treks/${trek.slug}` },
      ],
    });

    if ((!trek.faqs || trek.faqs.length === 0) && faqs.faqs.length) {
      trek.faqs = faqs.faqs;
    }

    const score = calculateSeoScore({
      title: trek.title,
      summary: trek.summary,
      overview: trek.overview,
      headings: [trek.title, ...(trek.highlights || []).slice(0, 8), ...(trek.itinerary || []).map((d) => d.title)],
      images: [
        ...(trek.heroImages || []).map((src) => ({ src, alt: String(seo.imageAlt || trek.title) })),
        ...((trek.gallery || []) as Array<{ src?: string; alt?: string }>),
      ],
      seo: seo as never,
      faqs: trek.faqs,
      hasSchema: true,
    });
    seo.seoScore = score.overall;
    seo.readabilityScore = score.readabilityScore;

    trek.seo = seo as never;
    if (!trek.slug && meta.suggestions.slug) trek.slug = String(meta.suggestions.slug);
    await trek.save();
    updated += 1;
  }

  return updated;
}

async function applyBlogs() {
  const blogs = await BlogModel.find({});
  let updated = 0;

  for (const blog of blogs) {
    const payload = {
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags,
      author: blog.author,
    };

    const meta = await aiSeoService.suggestMeta({
      entityType: "blog",
      entityId: String(blog._id),
      payload,
    });
    const faqs = await aiSeoService.suggestFaqs({
      entityType: "blog",
      entityId: String(blog._id),
      payload,
    });
    const blogAssist = aiSeoService.suggestBlogAssistant({
      title: blog.title,
      topic: blog.title,
      tags: blog.tags,
    });

    const seo = mergeSeo(blog.seo as never, meta.suggestions as never, {
      schemaType: "BlogPosting",
      imageAlt: blog.seo?.imageAlt || blog.title,
      imageCaption: blog.seo?.imageCaption || blog.title,
      ogImage: blog.seo?.ogImage || blog.coverImage || undefined,
      twitterImage: blog.seo?.twitterImage || blog.coverImage || undefined,
      breadcrumb: [
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blogs" },
        { name: blog.title, url: `/blogs/${blog.slug}` },
      ],
    });

    if ((!blog.faq || blog.faq.length === 0) && faqs.faqs.length) {
      blog.faq = faqs.faqs;
    }
    if ((!blog.tableOfContents || blog.tableOfContents.length === 0) && blogAssist.tableOfContents?.length) {
      blog.tableOfContents = blogAssist.tableOfContents;
    }
    if (!blog.readingTimeMinutes || blog.readingTimeMinutes < 2) {
      blog.readingTimeMinutes = blogAssist.readingTimeMinutes;
    }
    blog.modifiedAt = new Date();

    const score = calculateSeoScore({
      title: blog.title,
      summary: blog.excerpt,
      content: blog.content,
      headings: [blog.title, ...(blog.tableOfContents || []).map((t) => t.title)],
      images: blog.coverImage ? [{ src: blog.coverImage, alt: String(seo.imageAlt || blog.title) }] : [],
      seo: seo as never,
      faqs: blog.faq,
      hasSchema: true,
    });
    seo.seoScore = score.overall;
    seo.readabilityScore = score.readabilityScore;
    blog.seo = seo as never;
    await blog.save();
    updated += 1;
  }

  return updated;
}

async function applyDestinations() {
  const destinations = await DestinationModel.find({});
  let updated = 0;

  for (const destination of destinations) {
    const payload = {
      name: destination.name,
      title: destination.name,
      region: destination.region,
      state: destination.state,
      summary: destination.summary,
      description: destination.description,
    };

    const meta = await aiSeoService.suggestMeta({
      entityType: "destination",
      entityId: String(destination._id),
      payload,
    });
    const faqs = await aiSeoService.suggestFaqs({
      entityType: "destination",
      entityId: String(destination._id),
      payload,
    });

    const seo = mergeSeo(destination.seo as never, meta.suggestions as never, {
      schemaType: "TouristDestination",
      imageAlt: destination.seo?.imageAlt || `${destination.name} trekking destination`,
      imageCaption: destination.seo?.imageCaption || `${destination.name} — India Holiday Destinations`,
      ogImage: destination.seo?.ogImage || destination.coverImage || undefined,
      twitterImage: destination.seo?.twitterImage || destination.coverImage || undefined,
      breadcrumb: [
        { name: "Home", url: "/" },
        { name: "Destinations", url: "/destinations" },
        { name: destination.name, url: `/destinations/${destination.slug}` },
      ],
    });

    if ((!destination.faqs || destination.faqs.length === 0) && faqs.faqs.length) {
      destination.faqs = faqs.faqs;
    }
    if (!destination.howToReach) {
      destination.howToReach = `Reach ${destination.name}${
        destination.state ? `, ${destination.state}` : ""
      } by road from major Himachal hubs. For trek departures, our team shares pickup details after booking.`;
    }

    const score = calculateSeoScore({
      title: destination.name,
      summary: destination.summary,
      content: destination.description,
      headings: [destination.name, ...(destination.highlights || [])],
      images: destination.coverImage
        ? [{ src: destination.coverImage, alt: String(seo.imageAlt || destination.name) }]
        : [],
      seo: seo as never,
      faqs: destination.faqs,
      hasSchema: true,
    });
    seo.seoScore = score.overall;
    seo.readabilityScore = score.readabilityScore;
    destination.seo = seo as never;
    await destination.save();
    updated += 1;
  }

  return updated;
}

async function applyProgrammatic() {
  const seeded = await seoService.seedProgrammaticPages();
  let updated = 0;

  for (const page of seeded) {
    const meta = await aiSeoService.suggestMeta({
      entityType: "programmatic",
      entityId: String(page._id),
      payload: {
        title: page.title,
        filterType: page.filterType,
        filterValue: page.filterValue,
      },
    });
    const faqs = await aiSeoService.suggestFaqs({
      entityType: "programmatic",
      entityId: String(page._id),
      payload: { title: page.title },
    });

    const seo = mergeSeo(page.seo as never, meta.suggestions as never, {
      schemaType: "ItemList",
      breadcrumb: [
        { name: "Home", url: "/" },
        { name: "Treks", url: "/treks" },
        { name: page.title, url: page.path },
      ],
    });

    if ((!page.faqs || page.faqs.length === 0) && faqs.faqs.length) {
      page.faqs = faqs.faqs;
    }
    page.seo = seo as never;
    page.status = "published";
    await page.save();
    updated += 1;
  }

  // Also refresh any programmatic pages already in DB beyond seed set
  const all = await ProgrammaticSeoPageModel.find({});
  for (const page of all) {
    if (!page.seo?.title || FORCE) {
      const meta = await aiSeoService.suggestMeta({
        entityType: "programmatic",
        payload: { title: page.title, filterType: page.filterType, filterValue: page.filterValue },
      });
      page.seo = mergeSeo(page.seo as never, meta.suggestions as never, {
        schemaType: "ItemList",
      }) as never;
      await page.save();
    }
  }

  return updated;
}

async function applyHomepageSettings() {
  const settings = await seoService.getSettings();
  const homepage = settings.homepage || {};
  if (FORCE || !homepage.title || !homepage.description) {
    await seoService.updateSettings({
      homepage: {
        title: homepage.title || "Explore India's Most Incredible Himalayan Treks",
        description:
          homepage.description ||
          "Book premium Himalayan treks with India Holiday Destinations — expert guides, transparent pricing, and curated itineraries across Himachal and beyond.",
        keywords: homepage.keywords?.length
          ? homepage.keywords
          : ["himalayan treks", "himachal treks", "weekend treks", "india holiday destinations"],
        canonical: homepage.canonical || "/",
        ogImage: homepage.ogImage || settings.defaultOgImage,
      },
      defaultTitle: settings.defaultTitle || "Explore India's Most Incredible Treks",
      defaultDescription:
        settings.defaultDescription ||
        "India's premium trekking platform for Himalayan adventures, weekend getaways, winter expeditions, and curated camping experiences.",
      defaultKeywords: settings.defaultKeywords?.length
        ? settings.defaultKeywords
        : ["trekking india", "himalayan treks", "himachal treks", "weekend treks"],
    } as never);
  }
}

async function main() {
  await connectDatabase();
  logger.info(`Applying AI SEO (FORCE=${FORCE})…`);

  await applyHomepageSettings();
  const treks = await applyTreks();
  const blogs = await applyBlogs();
  const destinations = await applyDestinations();
  const programmatic = await applyProgrammatic();

  try {
    await seoService.generateAllSitemaps();
  } catch (error) {
    logger.warn("Sitemap regenerate skipped", { error: String(error) });
  }

  logger.info("AI SEO apply complete", { treks, blogs, destinations, programmatic });
  console.log(
    JSON.stringify(
      {
        success: true,
        force: FORCE,
        updated: { treks, blogs, destinations, programmatic },
      },
      null,
      2,
    ),
  );

  await disconnectDatabase();
}

main().catch(async (error) => {
  console.error(error);
  await disconnectDatabase().catch(() => undefined);
  process.exit(1);
});
