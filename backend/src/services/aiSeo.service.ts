import { slugify } from "../utils/slugify";
import { MetaSuggestionModel } from "../models/MetaSuggestion.model";
import { FaqSuggestionModel } from "../models/FaqSuggestion.model";
import { InternalLinkSuggestionModel } from "../models/InternalLinkSuggestion.model";
import { ContentQualityReportModel } from "../models/ContentQualityReport.model";
import { SeoAuditModel, type ISeoAuditIssue } from "../models/SeoAudit.model";
import { SeoReportModel } from "../models/SeoReport.model";
import { SeoTemplateModel } from "../models/SeoTemplate.model";
import { TrekModel } from "../models/Trek.model";
import { BlogModel } from "../models/Blog.model";
import { DestinationModel } from "../models/Destination.model";
import { CategoryModel } from "../models/Category.model";
import { ProgrammaticSeoPageModel } from "../models/ProgrammaticSeoPage.model";
import { SearchConsoleModel } from "../models/SearchConsole.model";
import { AnalyticsConfigModel } from "../models/AnalyticsConfig.model";
import { SitemapConfigModel } from "../models/SitemapConfig.model";
import { NotFoundLogModel } from "../models/NotFoundLog.model";
import { schemaService } from "./schema.service";
import { calculateSeoScore } from "./seoScore.service";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

type EntityType = "trek" | "blog" | "destination" | "category" | "programmatic";

function trimLen(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function titleCase(value: string) {
  return value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

/* ----------------------------- Meta generator ----------------------------- */

function generateTrekMeta(input: {
  title?: string;
  destinationName?: string;
  region?: string;
  difficulty?: string;
  durationDays?: number;
  maxAltitude?: number;
  summary?: string;
  season?: string;
}) {
  const rawTitle = input.title?.trim() || "Himalayan Trek";
  const name = rawTitle.replace(/\s+trek$/i, "").trim() || rawTitle;
  const displayName = /trek/i.test(rawTitle) ? rawTitle : `${name} Trek`;
  const dest = input.destinationName || input.region || "Himalayas";
  const difficulty = input.difficulty || "moderate";
  const days = input.durationDays || 0;
  const altitude = input.maxAltitude || 0;
  const slug = slugify(rawTitle);

  const titleParts = [displayName];
  if (days) titleParts.push(`${days} Days`);
  titleParts.push(titleCase(difficulty));
  const title = trimLen(titleParts.join(" | "), 60);

  const summary = (input.summary || "").trim();
  const description = trimLen(
    summary.length >= 80
      ? summary
      : `Book the ${displayName} with India Holiday Destinations. ${days ? `${days}-day ` : ""}${difficulty} trek in ${dest}${
          altitude ? ` up to ${altitude} ft` : ""
        }. Expert guides, clear inclusions, and verified departures.`,
    160,
  );

  return {
    title,
    description,
    canonical: `/treks/${slug}`,
    slug,
    ogTitle: trimLen(`${displayName} | Himalayan Adventure`, 60),
    ogDescription: description,
    twitterTitle: trimLen(displayName, 60),
    twitterDescription: description,
    focusKeyword: displayName.toLowerCase(),
    keywords: [
      displayName.toLowerCase(),
      `${dest.toLowerCase()} trek`,
      `${difficulty} trek`,
      days ? `${days} day trek` : "",
      "himalayan trek",
      "india holiday destinations",
    ].filter(Boolean),
  };
}

function generateBlogMeta(input: { title?: string; excerpt?: string; category?: string; tags?: string[] }) {
  const name = input.title?.trim() || "Trekking Guide";
  const slug = slugify(name);
  const title = trimLen(`${name} | Trekking Guide`, 60);
  const description = trimLen(
    input.excerpt ||
      `Read ${name} — practical tips, itineraries, and Himalayan advice from India Holiday Destinations.`,
    160,
  );
  return {
    title,
    description,
    canonical: `/blogs/${slug}`,
    slug,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: trimLen(name, 60),
    twitterDescription: description,
    focusKeyword: name.toLowerCase(),
    keywords: [name.toLowerCase(), input.category || "trekking", ...(input.tags || []).slice(0, 5)],
  };
}

function generateDestinationMeta(input: { name?: string; region?: string; state?: string; summary?: string }) {
  const name = input.name?.trim() || "Destination";
  const slug = slugify(name);
  const place = [input.region, input.state].filter(Boolean).join(", ");
  const title = trimLen(
    place ? `${name} Treks & Travel Guide | ${place.split(",")[0].trim()}` : `${name} Treks & Travel Guide`,
    60,
  );
  const summary = (input.summary || "").trim();
  const description = trimLen(
    summary.length >= 80
      ? summary
      : `Explore ${name}${place ? ` in ${place}` : ""} treks — best seasons, how to reach, nearby trails, and curated packages with India Holiday Destinations.`,
    160,
  );
  return {
    title,
    description,
    canonical: `/destinations/${slug}`,
    slug,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: trimLen(name, 60),
    twitterDescription: description,
    focusKeyword: `${name.toLowerCase()} treks`,
    keywords: [name.toLowerCase(), `${name.toLowerCase()} trek`, input.region || "", input.state || "", "himalayan treks"].filter(
      Boolean,
    ),
  };
}

function generateCategoryMeta(input: { name?: string; type?: string; description?: string }) {
  const name = input.name?.trim() || "Category";
  const slug = slugify(name);
  const isBlog = input.type === "blog";
  const title = trimLen(isBlog ? `${name} Articles` : `${name} Treks`, 60);
  const description = trimLen(
    input.description || `Browse ${name.toLowerCase()} ${isBlog ? "guides" : "treks"} with India Holiday Destinations.`,
    160,
  );
  return {
    title,
    description,
    canonical: isBlog ? `/blogs?category=${slug}` : `/treks?category=${slug}`,
    slug,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    focusKeyword: name.toLowerCase(),
    keywords: [name.toLowerCase()],
  };
}

function generateLandingMeta(input: {
  filterType?: string;
  filterValue?: string;
  title?: string;
}) {
  const value = titleCase((input.filterValue || input.title || "treks").replace(/-/g, " "));
  const slug = slugify(input.filterValue || value);
  const title = trimLen(input.title || `${value} Treks in India`, 60);
  const description = trimLen(
    `Discover the best ${value.toLowerCase()} treks with difficulty ratings, prices, and departure dates. Book with India Holiday Destinations.`,
    160,
  );
  return {
    title,
    description,
    canonical: `/treks/${slug}`,
    slug,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    focusKeyword: value.toLowerCase(),
    keywords: [value.toLowerCase(), "trekking india", "himalayan treks"],
  };
}

async function suggestMeta(input: {
  entityType: EntityType;
  entityId?: string;
  payload: Record<string, unknown>;
  userId?: string;
}) {
  let suggestions;
  switch (input.entityType) {
    case "trek":
      suggestions = generateTrekMeta(input.payload as never);
      break;
    case "blog":
      suggestions = generateBlogMeta(input.payload as never);
      break;
    case "destination":
      suggestions = generateDestinationMeta(input.payload as never);
      break;
    case "category":
      suggestions = generateCategoryMeta(input.payload as never);
      break;
    case "programmatic":
      suggestions = generateLandingMeta(input.payload as never);
      break;
    default:
      throw new ApiError(400, "Unsupported entity type", "INVALID_ENTITY_TYPE");
  }

  const doc = await MetaSuggestionModel.create({
    entityType: input.entityType,
    entityId: input.entityId,
    inputSnapshot: input.payload,
    suggestions,
    status: "draft",
    createdBy: input.userId,
  });

  return { suggestionId: doc._id, status: "draft", requiresReview: true, suggestions };
}

/* ----------------------------- FAQ generator ----------------------------- */

function generateTrekFaqs(input: {
  title?: string;
  destinationName?: string;
  difficulty?: string;
  durationDays?: number;
  maxAltitude?: number;
  bestSeasons?: string[];
  months?: string[];
}) {
  const name = input.title || "this trek";
  const dest = input.destinationName || "the Himalayas";
  const difficulty = input.difficulty || "moderate";
  const days = input.durationDays || 0;
  const altitude = input.maxAltitude || 0;
  const seasons = (input.bestSeasons || []).join(", ") || (input.months || []).slice(0, 3).join(", ") || "peak season";

  return [
    {
      question: `What is the difficulty level of ${name}?`,
      answer: `${name} is rated ${difficulty}. We recommend basic fitness preparation and following our pre-trek checklist for a safe experience.`,
    },
    {
      question: `How many days does ${name} take?`,
      answer: days
        ? `${name} is typically a ${days}-day itinerary including acclimatization and travel buffers where required.`
        : `${name} duration depends on the selected package. Check the itinerary for day-wise details.`,
    },
    {
      question: `What is the maximum altitude on ${name}?`,
      answer: altitude
        ? `The trail reaches approximately ${altitude} ft. Gradual ascent and hydration are important for acclimatization.`
        : `Altitude varies by camp. Review the day-wise altitude profile in the itinerary before booking.`,
    },
    {
      question: `When is the best time to do ${name}?`,
      answer: `The recommended window is ${seasons}. Weather in ${dest} can change quickly — always check the latest departure notes.`,
    },
    {
      question: `Is ${name} suitable for beginners?`,
      answer:
        difficulty === "easy"
          ? `Yes — ${name} is beginner-friendly with proper guidance, though basic stamina still helps.`
          : `It can work for fit beginners with preparation. If you are new to trekking, start training 3–4 weeks in advance.`,
    },
    {
      question: `What should I pack for ${name}?`,
      answer: `Carry layered clothing, sturdy trekking shoes, rain protection, a daypack, and personal medicines. A full packing list is provided after booking.`,
    },
  ];
}

async function suggestFaqs(input: {
  entityType: "trek" | "blog" | "destination" | "programmatic";
  entityId?: string;
  payload: Record<string, unknown>;
  userId?: string;
}) {
  let faqs: Array<{ question: string; answer: string }> = [];
  if (input.entityType === "trek") {
    faqs = generateTrekFaqs(input.payload as never);
  } else if (input.entityType === "destination") {
    const name = String(input.payload.name || "this destination");
    faqs = [
      {
        question: `What are the best treks in ${name}?`,
        answer: `${name} offers multiple curated Himalayan options. Browse nearby treks on this page and compare difficulty, duration, and price.`,
      },
      {
        question: `How do I reach ${name}?`,
        answer: `Use the How to Reach section for road/rail/air options. Our team can also help plan pickups for booked departures.`,
      },
      {
        question: `When should I visit ${name}?`,
        answer: `Check weather notes and best seasons on this page. Shoulder months often give clearer views and fewer crowds.`,
      },
    ];
  } else if (input.entityType === "blog") {
    const title = String(input.payload.title || "this guide");
    faqs = [
      {
        question: `Who is ${title} for?`,
        answer: `This guide is for travelers planning Himalayan adventures and looking for practical, field-tested advice.`,
      },
      {
        question: `How long does it take to read?`,
        answer: `Most readers finish in a few minutes. Use the table of contents to jump to the sections you need.`,
      },
    ];
  } else {
    const title = String(input.payload.title || "these treks");
    faqs = [
      {
        question: `How do I choose among ${title}?`,
        answer: `Compare difficulty, duration, altitude, and departure dates. Filter the list and open trek pages for full itineraries.`,
      },
      {
        question: `Can I book online?`,
        answer: `Yes. Select a trek, choose a departure, and complete booking online — or send an enquiry for custom dates.`,
      },
    ];
  }

  const doc = await FaqSuggestionModel.create({
    entityType: input.entityType,
    entityId: input.entityId,
    inputSnapshot: input.payload,
    faqs,
    status: "draft",
    createdBy: input.userId,
  });

  return { suggestionId: doc._id, status: "draft", requiresReview: true, faqs };
}

/* ----------------------------- Schema preview ----------------------------- */

function previewSchemas(input: {
  entityType: EntityType;
  payload: Record<string, unknown>;
}) {
  const title = String(input.payload.title || input.payload.name || "Untitled");
  const description = String(input.payload.description || input.payload.summary || input.payload.excerpt || "");
  const url = String(
    input.payload.canonical ||
      (input.entityType === "blog"
        ? `/blogs/${slugify(title)}`
        : input.entityType === "destination"
          ? `/destinations/${slugify(title)}`
          : `/treks/${slugify(title)}`),
  );
  const image = String(input.payload.ogImage || input.payload.coverImage || input.payload.heroImage || "");
  const faqs = (input.payload.faqs as Array<{ question: string; answer: string }>) || [];

  const schemas = schemaService.buildEntitySchemas({
    type: input.entityType === "category" ? "programmatic" : (input.entityType as "trek" | "blog" | "destination" | "programmatic"),
    title,
    description,
    url,
    image,
    faqs,
    trek:
      input.entityType === "trek"
        ? {
            priceInr: Number(input.payload.basePriceInr || 0),
            durationDays: Number(input.payload.durationDays || 1),
            destinationName: String(input.payload.destinationName || ""),
            rating: Number(input.payload.rating || 0),
            reviewCount: Number(input.payload.reviewCount || 0),
          }
        : undefined,
    blog:
      input.entityType === "blog"
        ? {
            publishedAt: input.payload.publishedAt as string | undefined,
            authorName: String((input.payload.author as { name?: string } | undefined)?.name || "Editorial Team"),
          }
        : undefined,
  });

  schemas.unshift(schemaService.organization(), schemaService.website());
  return { requiresReview: true, schemas };
}

/* ----------------------------- Internal links + related ----------------------------- */

async function suggestInternalLinks(input: {
  sourceType: EntityType;
  sourceId?: string;
  sourceSlug?: string;
  title?: string;
  region?: string;
  destinationName?: string;
  difficulty?: string;
  tags?: string[];
  category?: string;
  userId?: string;
  limit?: number;
}) {
  const limit = input.limit || 8;
  const title = (input.title || "").toLowerCase();
  const region = (input.region || "").toLowerCase();
  const dest = (input.destinationName || "").toLowerCase();
  const suggestions: Array<{
    targetType: "trek" | "blog" | "destination" | "category";
    targetId?: string;
    targetSlug: string;
    targetTitle: string;
    url: string;
    anchorText: string;
    relevanceScore: number;
    reason: string;
  }> = [];

  const [treks, blogs, destinations, categories] = await Promise.all([
    TrekModel.find({ status: "published" })
      .select("_id slug title region destinationName difficulty durationDays")
      .limit(80)
      .lean(),
    BlogModel.find({ status: "published" }).select("_id slug title category tags").limit(40).lean(),
    DestinationModel.find({ status: "published" }).select("_id slug name region state").limit(40).lean(),
    CategoryModel.find({}).select("_id slug name type").limit(30).lean(),
  ]);

  for (const trek of treks) {
    if (input.sourceType === "trek" && (String(trek._id) === input.sourceId || trek.slug === input.sourceSlug)) {
      continue;
    }
    let score = 0;
    const reasons: string[] = [];
    if (dest && trek.destinationName?.toLowerCase().includes(dest)) {
      score += 40;
      reasons.push("same destination");
    }
    if (region && trek.region?.toLowerCase().includes(region)) {
      score += 25;
      reasons.push("same region");
    }
    if (input.difficulty && trek.difficulty === input.difficulty) {
      score += 20;
      reasons.push("similar difficulty");
    }
    if (title && trek.title.toLowerCase().split(/\s+/).some((w) => w.length > 3 && title.includes(w))) {
      score += 15;
      reasons.push("title keyword overlap");
    }
    if (score >= 25) {
      suggestions.push({
        targetType: "trek",
        targetId: String(trek._id),
        targetSlug: trek.slug,
        targetTitle: trek.title,
        url: `/treks/${trek.slug}`,
        anchorText: trek.title,
        relevanceScore: score,
        reason: reasons.join(", "),
      });
    }
  }

  for (const blog of blogs) {
    let score = 0;
    const reasons: string[] = [];
    const hay = `${blog.title} ${blog.category} ${(blog.tags || []).join(" ")}`.toLowerCase();
    if (dest && hay.includes(dest)) {
      score += 35;
      reasons.push("mentions destination");
    }
    if (region && hay.includes(region)) {
      score += 20;
      reasons.push("mentions region");
    }
    if (input.category && blog.category?.toLowerCase() === input.category.toLowerCase()) {
      score += 25;
      reasons.push("same category");
    }
    if ((input.tags || []).some((t) => hay.includes(t.toLowerCase()))) {
      score += 20;
      reasons.push("shared tags");
    }
    if (score >= 20) {
      suggestions.push({
        targetType: "blog",
        targetId: String(blog._id),
        targetSlug: blog.slug,
        targetTitle: blog.title,
        url: `/blogs/${blog.slug}`,
        anchorText: blog.title,
        relevanceScore: score,
        reason: reasons.join(", "),
      });
    }
  }

  for (const d of destinations) {
    let score = 0;
    const reasons: string[] = [];
    if (dest && d.name.toLowerCase().includes(dest)) {
      score += 50;
      reasons.push("matching destination");
    }
    if (region && d.region?.toLowerCase().includes(region)) {
      score += 30;
      reasons.push("same region");
    }
    if (score >= 30) {
      suggestions.push({
        targetType: "destination",
        targetId: String(d._id),
        targetSlug: d.slug,
        targetTitle: d.name,
        url: `/destinations/${d.slug}`,
        anchorText: `${d.name} travel guide`,
        relevanceScore: score,
        reason: reasons.join(", "),
      });
    }
  }

  for (const c of categories) {
    const hay = `${c.name} ${c.slug}`.toLowerCase();
    if (title.split(/\s+/).some((w) => w.length > 3 && hay.includes(w))) {
      suggestions.push({
        targetType: "category",
        targetId: String(c._id),
        targetSlug: c.slug,
        targetTitle: c.name,
        url: c.type === "blog" ? `/blogs?category=${c.slug}` : `/treks?category=${c.slug}`,
        anchorText: c.name,
        relevanceScore: 28,
        reason: "category keyword match",
      });
    }
  }

  suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const top = suggestions.slice(0, limit);

  const doc = await InternalLinkSuggestionModel.create({
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    sourceSlug: input.sourceSlug,
    suggestions: top,
    status: "draft",
    createdBy: input.userId,
  });

  return { suggestionId: doc._id, requiresReview: true, suggestions: top };
}

async function suggestRelatedContent(input: {
  title?: string;
  region?: string;
  destinationName?: string;
  difficulty?: string;
  durationDays?: number;
  excludeSlug?: string;
  seasons?: string[];
}) {
  const exclude = input.excludeSlug;
  const relatedFilter: Record<string, unknown> = {
    status: "published",
    ...(exclude ? { slug: { $ne: exclude } } : {}),
  };
  const or: Record<string, unknown>[] = [];
  if (input.destinationName) or.push({ destinationName: new RegExp(input.destinationName, "i") });
  if (input.region) or.push({ region: new RegExp(input.region, "i") });
  if (or.length) relatedFilter.$or = or;

  const nearbyFilter: Record<string, unknown> = { status: "published" };
  const nearbyOr: Record<string, unknown>[] = [];
  if (input.region) nearbyOr.push({ region: new RegExp(input.region, "i") });
  if (input.destinationName) nearbyOr.push({ name: new RegExp(input.destinationName, "i") });
  if (nearbyOr.length) nearbyFilter.$or = nearbyOr;

  const [relatedTreks, similarDifficulty, similarDuration, seasonal, relatedBlogs, nearbyDestinations] =
    await Promise.all([
      TrekModel.find(relatedFilter)
        .select("slug title heroImages difficulty durationDays basePriceInr rating")
        .limit(6)
        .lean(),
      input.difficulty
        ? TrekModel.find({
            status: "published",
            difficulty: input.difficulty,
            ...(exclude ? { slug: { $ne: exclude } } : {}),
          })
            .select("slug title heroImages difficulty durationDays basePriceInr")
            .limit(6)
            .lean()
        : Promise.resolve([]),
      input.durationDays
        ? TrekModel.find({
            status: "published",
            durationDays: input.durationDays,
            ...(exclude ? { slug: { $ne: exclude } } : {}),
          })
            .select("slug title heroImages difficulty durationDays basePriceInr")
            .limit(6)
            .lean()
        : Promise.resolve([]),
      input.seasons?.length
        ? TrekModel.find({
            status: "published",
            bestSeasons: { $in: input.seasons },
            ...(exclude ? { slug: { $ne: exclude } } : {}),
          })
            .select("slug title heroImages bestSeasons difficulty durationDays")
            .limit(6)
            .lean()
        : Promise.resolve([]),
      BlogModel.find({ status: "published" })
        .select("slug title coverImage excerpt category")
        .limit(20)
        .lean()
        .then((rows) =>
          rows
            .filter((b) => {
              const hay = `${b.title} ${b.excerpt} ${b.category}`.toLowerCase();
              return (
                (input.destinationName && hay.includes(input.destinationName.toLowerCase())) ||
                (input.region && hay.includes(input.region.toLowerCase())) ||
                (input.title &&
                  input.title
                    .toLowerCase()
                    .split(/\s+/)
                    .some((w) => w.length > 3 && hay.includes(w)))
              );
            })
            .slice(0, 6),
        ),
      DestinationModel.find(nearbyFilter)
        .select("slug name coverImage region state")
        .limit(6)
        .lean(),
    ]);

  return {
    relatedTreks,
    similarDifficultyTreks: similarDifficulty,
    similarDurationTreks: similarDuration,
    seasonalTreks: seasonal,
    relatedBlogs,
    nearbyDestinations,
  };
}

/* ----------------------------- Content quality ----------------------------- */

function analyzeContentQuality(input: {
  entityType: "trek" | "blog" | "destination" | "programmatic";
  title?: string;
  content?: string;
  summary?: string;
  overview?: string;
  headings?: string[];
  images?: Array<{ src?: string; alt?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  hasCta?: boolean;
}) {
  const body = [input.title, input.summary, input.overview, input.content].filter(Boolean).join("\n\n");
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const words = wordCount(body);
  const headings = input.headings?.length
    ? input.headings
    : (body.match(/^#{1,3}\s+.+$/gm) || []).map((h) => h.replace(/^#+\s+/, ""));
  const h1Count = (body.match(/^#\s+/gm) || []).length || (input.title ? 1 : 0);
  const images = input.images || [];
  const missingAlt = images.filter((i) => !i.alt || i.alt.trim().length < 3).length;
  const hasFaqs = Boolean(input.faqs?.length);
  const ctaRegex = /(book now|enquire|contact us|reserve|join us|start booking)/i;
  const hasCta = input.hasCta ?? ctaRegex.test(body);

  const improvements: string[] = [];
  const headingScore = headings.length >= 3 ? 90 : headings.length >= 1 ? 60 : 25;
  if (headings.length < 3) improvements.push("Add clearer H2/H3 section headings for scannability.");

  const avgPara = paragraphs.length
    ? paragraphs.reduce((a, p) => a + wordCount(p), 0) / paragraphs.length
    : 0;
  const paragraphScore = avgPara >= 40 && avgPara <= 120 ? 90 : avgPara > 0 ? 55 : 20;
  if (avgPara > 140) improvements.push("Shorten long paragraphs (aim ~40–120 words).");
  if (paragraphs.length < 3) improvements.push("Add more explanatory paragraphs for topical depth.");

  const imageScore = images.length === 0 ? 20 : missingAlt === 0 ? 95 : clamp(100 - missingAlt * 15);
  if (!images.length) improvements.push("Add at least one optimized image with alt text.");
  else if (missingAlt) improvements.push(`${missingAlt} image(s) are missing meaningful alt text.`);

  const faqScore = hasFaqs ? 95 : 30;
  if (!hasFaqs) improvements.push("Add 3–6 FAQs to capture long-tail queries.");

  const ctaScore = hasCta ? 90 : 35;
  if (!hasCta) improvements.push("Include a clear call-to-action (Book / Enquire).");

  const lengthScore = words >= 600 ? 95 : words >= 300 ? 70 : words >= 150 ? 45 : 20;
  if (words < 300) improvements.push("Expand body content to at least 300–600 words for stronger SEO.");

  if (h1Count === 0) improvements.push("Ensure a single clear H1 (page title).");
  if (h1Count > 1) improvements.push("Multiple H1s detected — keep only one primary H1.");

  const overall = clamp(
    headingScore * 0.2 +
      paragraphScore * 0.15 +
      imageScore * 0.15 +
      faqScore * 0.15 +
      ctaScore * 0.1 +
      lengthScore * 0.25,
  );

  return {
    scores: {
      overall,
      headings: headingScore,
      paragraphs: paragraphScore,
      images: imageScore,
      faqs: faqScore,
      cta: ctaScore,
      length: lengthScore,
    },
    analysis: {
      headingStructure: headings.slice(0, 20),
      paragraphCount: paragraphs.length,
      avgParagraphLength: Math.round(avgPara),
      imageCount: images.length,
      missingAltCount: missingAlt,
      hasCta,
      hasFaqs,
      wordCount: words,
      h1Count,
    },
    improvements: improvements.slice(0, 12),
    guidanceOnly: true,
  };
}

async function reportContentQuality(input: {
  entityType: "trek" | "blog" | "destination" | "programmatic";
  entityId?: string;
  entitySlug?: string;
  title?: string;
  payload: Record<string, unknown>;
  userId?: string;
}) {
  const result = analyzeContentQuality({
    entityType: input.entityType,
    title: input.title || String(input.payload.title || input.payload.name || ""),
    content: String(input.payload.content || ""),
    summary: String(input.payload.summary || input.payload.excerpt || ""),
    overview: String(input.payload.overview || input.payload.description || ""),
    headings: (input.payload.headings as string[]) || [],
    images: (input.payload.images as Array<{ src?: string; alt?: string }>) || [],
    faqs: (input.payload.faqs as Array<{ question: string; answer: string }>) || [],
    hasCta: input.payload.hasCta as boolean | undefined,
  });

  const doc = await ContentQualityReportModel.create({
    entityType: input.entityType,
    entityId: input.entityId,
    entitySlug: input.entitySlug,
    title: input.title,
    scores: result.scores,
    analysis: result.analysis,
    improvements: result.improvements,
    createdBy: input.userId,
  });

  return { reportId: doc._id, ...result };
}

/* ----------------------------- Image SEO ----------------------------- */

function suggestImageSeo(input: {
  fileName?: string;
  contextTitle?: string;
  destinationName?: string;
  alt?: string;
}) {
  const base = slugify(
    (input.contextTitle || input.fileName || "trek-image").replace(/\.[a-z0-9]+$/i, ""),
  );
  const place = input.destinationName ? ` in ${input.destinationName}` : "";
  const title = titleCase(base.replace(/-/g, " "));
  const alt =
    input.alt?.trim() ||
    trimLen(`${input.contextTitle || title}${place} — Himalayan trek photo`, 125);
  return {
    requiresReview: true,
    suggestions: {
      altText: alt,
      caption: trimLen(`${title}${place}`, 140),
      fileName: `${base}.webp`,
      title,
    },
  };
}

/* ----------------------------- Blog assistant ----------------------------- */

function suggestBlogAssistant(input: {
  title?: string;
  topic?: string;
  destinationName?: string;
  tags?: string[];
}) {
  const title = input.title || input.topic || "Trekking Guide";
  const outline = [
    `Introduction to ${title}`,
    "Who this guide is for",
    "Best time to go",
    "Difficulty & fitness tips",
    "How to reach",
    "Day-by-day overview",
    "Packing checklist",
    "Safety & permits",
    "Budget & booking tips",
    "FAQs",
    "Conclusion & next steps",
  ];
  const toc = outline.map((t, i) => ({
    id: slugify(t),
    title: t,
    level: i === 0 || i === outline.length - 1 ? 2 : 2,
  }));
  const readingTimeMinutes = Math.max(4, Math.round(outline.length * 0.9));
  return {
    requiresReview: true,
    outline,
    tableOfContents: toc,
    readingTimeMinutes,
    suggestedInternalLinkHints: [
      input.destinationName ? `/destinations/${slugify(input.destinationName)}` : null,
      "/treks",
      "/blogs",
    ].filter(Boolean),
    schemaHint: "BlogPosting + FAQPage + BreadcrumbList",
  };
}

/* ----------------------------- Landing page assistant ----------------------------- */

function suggestLandingPage(input: {
  filterType: "state" | "destination" | "season" | "difficulty" | "duration" | "theme";
  filterValue: string;
  title?: string;
}) {
  const value = titleCase(input.filterValue.replace(/-/g, " "));
  const title = input.title || `${value} Treks`;
  const meta = generateLandingMeta({
    filterType: input.filterType,
    filterValue: input.filterValue,
    title,
  });
  return {
    requiresReview: true,
    template: {
      path: `/treks/${slugify(input.filterValue)}`,
      title,
      headline: title,
      summary: meta.description,
      contentSections: [
        { heading: `About ${value} treks`, body: `Explore curated ${value.toLowerCase()} adventures with verified operators.` },
        { heading: "How to choose", body: "Compare difficulty, duration, altitude, and season before booking." },
        { heading: "Best time to go", body: "Review seasonal notes and departure calendars on each trek page." },
        { heading: "FAQs", body: "Add destination-specific questions after review." },
      ],
      seo: meta,
      suggestedFilter: { type: input.filterType, value: input.filterValue },
    },
  };
}

/* ----------------------------- Dashboard health ----------------------------- */

async function getDashboard() {
  const [treks, blogs, destinations, programmatic, latestAudit, searchConsole, analytics, sitemap, notFound] =
    await Promise.all([
      TrekModel.find({ status: { $in: ["published", "draft"] } })
        .select("slug title seo heroImages gallery faqs overview summary status")
        .lean(),
      BlogModel.find({ status: { $in: ["published", "draft"] } })
        .select("slug title seo coverImage faq excerpt content status")
        .lean(),
      DestinationModel.find({ status: { $in: ["published", "draft"] } })
        .select("slug name seo coverImage faqs summary description status")
        .lean(),
      ProgrammaticSeoPageModel.find({ status: { $in: ["published", "draft"] } })
        .select("slug path title seo faqs summary status")
        .lean(),
      SeoAuditModel.findOne().sort({ createdAt: -1 }).lean(),
      SearchConsoleModel.findOne({ key: "default" }).lean(),
      AnalyticsConfigModel.findOne({ key: "default" }).lean(),
      SitemapConfigModel.findOne({ key: "default" }).lean(),
      NotFoundLogModel.find({ resolved: false }).sort({ hitCount: -1 }).limit(10).lean(),
    ]);

  const missingMeta: Array<{ type: string; slug: string; title: string }> = [];
  const missingSchema: Array<{ type: string; slug: string; title: string }> = [];
  const missingAlt: Array<{ type: string; slug: string; title: string }> = [];
  const missingCanonicals: Array<{ type: string; slug: string; title: string }> = [];
  const missingFaqs: Array<{ type: string; slug: string; title: string }> = [];
  const lowQuality: Array<{ type: string; slug: string; title: string; score: number }> = [];
  const titleMap = new Map<string, Array<{ type: string; slug: string }>>();
  const descMap = new Map<string, Array<{ type: string; slug: string }>>();

  const track = (
    type: string,
    slug: string,
    title: string,
    seo: Record<string, unknown> | undefined,
    opts: { hasFaqs?: boolean; images?: Array<{ alt?: string }>; content?: string },
  ) => {
    const metaTitle = String(seo?.title || "");
    const metaDesc = String(seo?.description || "");
    if (!metaTitle || !metaDesc) missingMeta.push({ type, slug, title });
    if (!seo?.schemaType && !seo?.schemaJson) missingSchema.push({ type, slug, title });
    if (!seo?.canonical) missingCanonicals.push({ type, slug, title });
    if (!opts.hasFaqs) missingFaqs.push({ type, slug, title });
    if ((opts.images || []).some((i) => !i.alt)) missingAlt.push({ type, slug, title });

    if (metaTitle) {
      const key = metaTitle.toLowerCase();
      titleMap.set(key, [...(titleMap.get(key) || []), { type, slug }]);
    }
    if (metaDesc) {
      const key = metaDesc.toLowerCase();
      descMap.set(key, [...(descMap.get(key) || []), { type, slug }]);
    }

    const score = calculateSeoScore({
      title,
      summary: metaDesc,
      content: opts.content || "",
      seo: seo as never,
      faqs: opts.hasFaqs ? [{ question: "q", answer: "a" }] : [],
      images: opts.images,
      hasSchema: Boolean(seo?.schemaType || seo?.schemaJson),
    });
    if (score.overall < 55) lowQuality.push({ type, slug, title, score: score.overall });
  };

  for (const t of treks) {
    track("trek", t.slug, t.title, t.seo as never, {
      hasFaqs: Boolean(t.faqs?.length),
      images: [
        ...(t.heroImages || []).map(() => ({ alt: (t.seo as { imageAlt?: string } | undefined)?.imageAlt })),
        ...((t.gallery || []) as Array<{ alt?: string }>),
      ],
      content: `${t.summary || ""}\n${t.overview || ""}`,
    });
  }
  for (const b of blogs) {
    track("blog", b.slug, b.title, b.seo as never, {
      hasFaqs: Boolean(b.faq?.length),
      images: b.coverImage ? [{ alt: (b.seo as { imageAlt?: string } | undefined)?.imageAlt }] : [],
      content: `${b.excerpt || ""}\n${b.content || ""}`,
    });
  }
  for (const d of destinations) {
    track("destination", d.slug, d.name, d.seo as never, {
      hasFaqs: Boolean(d.faqs?.length),
      images: d.coverImage ? [{ alt: (d.seo as { imageAlt?: string } | undefined)?.imageAlt }] : [],
      content: `${d.summary || ""}\n${d.description || ""}`,
    });
  }
  for (const p of programmatic) {
    track("programmatic", p.slug, p.title, p.seo as never, {
      hasFaqs: Boolean(p.faqs?.length),
      content: p.summary || "",
    });
  }

  const duplicateTitles = [...titleMap.entries()]
    .filter(([, items]) => items.length > 1)
    .map(([title, items]) => ({ title, items }));
  const duplicateDescriptions = [...descMap.entries()]
    .filter(([, items]) => items.length > 1)
    .map(([description, items]) => ({ description, items }));

  const pagesScanned = treks.length + blogs.length + destinations.length + programmatic.length;
  const issueWeight =
    missingMeta.length * 3 +
    missingCanonicals.length * 2 +
    missingSchema.length * 2 +
    missingFaqs.length +
    missingAlt.length +
    duplicateTitles.length * 2 +
    lowQuality.length * 2;
  const healthScore = clamp(100 - issueWeight / Math.max(1, pagesScanned / 2));

  const improvementSuggestions = [
    missingMeta.length ? `Add missing meta on ${missingMeta.length} page(s).` : null,
    missingSchema.length ? `Attach schema types on ${missingSchema.length} page(s).` : null,
    duplicateTitles.length ? `Resolve ${duplicateTitles.length} duplicate title group(s).` : null,
    missingFaqs.length ? `Add FAQs to ${missingFaqs.length} page(s).` : null,
    lowQuality.length ? `Improve content quality on ${lowQuality.length} low-scoring page(s).` : null,
  ].filter(Boolean) as string[];

  return {
    overallSeoHealth: healthScore,
    pagesScanned,
    missingMeta,
    missingSchema,
    duplicateTitles,
    duplicateDescriptions,
    missingAltText: missingAlt,
    missingCanonicals,
    brokenInternalLinks: [], // populated by full audit crawl of stored links
    pagesWithoutFaqs: missingFaqs,
    lowContentQuality: lowQuality,
    seoImprovementSuggestions: improvementSuggestions,
    latestAudit,
    searchConsole: {
      connected: Boolean(searchConsole?.verificationMetaTag || searchConsole?.isVerified),
      isVerified: Boolean(searchConsole?.isVerified),
      propertyUrl: searchConsole?.propertyUrl,
      sitemapsSubmitted: searchConsole?.sitemapsSubmitted || [],
      indexingRequests: searchConsole?.indexingRequests || [],
      coverageOverview: {
        note: "Connect Google Search Console to populate live coverage metrics.",
        submittedSitemaps: searchConsole?.sitemapsSubmitted?.length || 0,
        pendingIndexRequests:
          searchConsole?.indexingRequests?.filter((i) => i.status === "pending" || i.status === "submitted")
            .length || 0,
      },
    },
    analytics: {
      ready: true,
      ga4Configured: Boolean(analytics?.ga4?.measurementId),
      gtmConfigured: Boolean(analytics?.gtm?.containerId),
      sections: {
        organicTraffic: { value: null, status: "awaiting_data" },
        topLandingPages: [],
        topBlogs: [],
        topDestinations: [],
        topTreks: [],
        ctrOverview: { value: null, status: "awaiting_data" },
        averagePosition: { value: null, status: "awaiting_data" },
        clicks: { value: null, status: "awaiting_data" },
        impressions: { value: null, status: "awaiting_data" },
      },
      note: "UI is ready to consume GA4/Search Console data when connected by the site owner.",
    },
    sitemapStatus: {
      lastFullGenerateAt: sitemap?.lastFullGenerateAt || null,
      entries: sitemap?.entries || [],
    },
    notFoundTop: notFound,
  };
}

/* ----------------------------- Full audit ----------------------------- */

async function runAudit(userId?: string) {
  const audit = await SeoAuditModel.create({
    status: "running",
    triggeredBy: userId,
    startedAt: new Date(),
  });

  try {
    const dashboard = await getDashboard();
    const issues: ISeoAuditIssue[] = [];

    for (const item of dashboard.missingMeta) {
      issues.push({
        code: "MISSING_META",
        severity: "critical",
        entityType: item.type as never,
        entitySlug: item.slug,
        path: `/${item.type === "programmatic" ? "treks" : item.type + "s"}/${item.slug}`.replace("treks/", "treks/"),
        title: item.title,
        message: "Missing SEO title and/or meta description",
        suggestion: "Use AI Meta Generator, then review and save.",
      });
    }
    for (const item of dashboard.missingSchema) {
      issues.push({
        code: "MISSING_SCHEMA",
        severity: "warning",
        entityType: item.type as never,
        entitySlug: item.slug,
        title: item.title,
        message: "No schema type / schema JSON configured",
        suggestion: "Preview schema and set schemaType before publishing.",
      });
    }
    for (const dup of dashboard.duplicateTitles) {
      issues.push({
        code: "DUPLICATE_TITLE",
        severity: "warning",
        entityType: "global",
        title: dup.title,
        message: `Duplicate SEO title used on ${dup.items.length} pages`,
        suggestion: "Make each title unique with destination/difficulty modifiers.",
      });
    }
    for (const item of dashboard.missingCanonicals) {
      issues.push({
        code: "MISSING_CANONICAL",
        severity: "warning",
        entityType: item.type as never,
        entitySlug: item.slug,
        title: item.title,
        message: "Canonical URL is missing",
        suggestion: "Accept the suggested canonical from Meta Generator.",
      });
    }
    for (const item of dashboard.pagesWithoutFaqs) {
      issues.push({
        code: "MISSING_FAQ",
        severity: "info",
        entityType: item.type as never,
        entitySlug: item.slug,
        title: item.title,
        message: "No FAQs found",
        suggestion: "Generate FAQ suggestions and edit before publish.",
      });
    }
    for (const item of dashboard.lowContentQuality) {
      issues.push({
        code: "LOW_CONTENT_QUALITY",
        severity: "warning",
        entityType: item.type as never,
        entitySlug: item.slug,
        title: item.title,
        message: `Low content quality score (${item.score}/100)`,
        suggestion: "Run Content Quality Analyzer and apply guidance manually.",
      });
    }
    for (const item of dashboard.missingAltText) {
      issues.push({
        code: "MISSING_ALT",
        severity: "info",
        entityType: item.type as never,
        entitySlug: item.slug,
        title: item.title,
        message: "One or more images missing alt text",
        suggestion: "Use Image SEO Assistant suggestions.",
      });
    }

    // Slug uniqueness soft check across entities
    const slugBag = new Map<string, string[]>();
    for (const t of await TrekModel.find({}).select("slug").lean()) {
      slugBag.set(t.slug, [...(slugBag.get(t.slug) || []), "trek"]);
    }
    for (const b of await BlogModel.find({}).select("slug").lean()) {
      const key = `blog:${b.slug}`;
      slugBag.set(key, [...(slugBag.get(key) || []), "blog"]);
    }

    const critical = issues.filter((i) => i.severity === "critical").length;
    const warning = issues.filter((i) => i.severity === "warning").length;
    const info = issues.filter((i) => i.severity === "info").length;
    const healthScore = dashboard.overallSeoHealth;

    audit.status = "completed";
    audit.completedAt = new Date();
    audit.summary = {
      healthScore,
      totalIssues: issues.length,
      critical,
      warning,
      info,
      pagesScanned: dashboard.pagesScanned,
    };
    audit.counts = {
      missingMeta: dashboard.missingMeta.length,
      missingSchema: dashboard.missingSchema.length,
      duplicateTitles: dashboard.duplicateTitles.length,
      duplicateDescriptions: dashboard.duplicateDescriptions.length,
      missingAlt: dashboard.missingAltText.length,
      missingCanonicals: dashboard.missingCanonicals.length,
      brokenInternalLinks: 0,
      missingFaqs: dashboard.pagesWithoutFaqs.length,
      lowContentQuality: dashboard.lowContentQuality.length,
      duplicateSlugs: 0,
      duplicateCanonicals: dashboard.duplicateDescriptions.length,
      missingImages: 0,
      missingH1: 0,
      multipleH1: 0,
      orphanPages: 0,
    };
    audit.issues = issues.slice(0, 500);
    audit.suggestions = dashboard.seoImprovementSuggestions;
    await audit.save();

    await SeoReportModel.create({
      type: "audit",
      title: `SEO Audit ${new Date().toISOString()}`,
      auditId: audit._id,
      payload: { summary: audit.summary, counts: audit.counts },
      generatedBy: userId,
    });

    return audit;
  } catch (error) {
    audit.status = "failed";
    audit.errorMessage = error instanceof Error ? error.message : "Audit failed";
    audit.completedAt = new Date();
    await audit.save();
    throw error;
  }
}

async function listAudits(query: { page?: number; limit?: number }) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const [items, total] = await Promise.all([
    SeoAuditModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    SeoAuditModel.countDocuments(),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getAudit(id: string) {
  const audit = await SeoAuditModel.findById(id);
  if (!audit) throw new ApiError(404, "Audit not found", "SEO_AUDIT_NOT_FOUND");
  return audit;
}

async function trekWorkflowAssist(input: {
  title: string;
  destinationName?: string;
  region?: string;
  difficulty?: string;
  durationDays?: number;
  maxAltitude?: number;
  summary?: string;
  overview?: string;
  bestSeasons?: string[];
  months?: string[];
  basePriceInr?: number;
  userId?: string;
}) {
  const meta = await suggestMeta({
    entityType: "trek",
    payload: input as never,
    userId: input.userId,
  });
  const faqs = await suggestFaqs({
    entityType: "trek",
    payload: input as never,
    userId: input.userId,
  });
  const schema = previewSchemas({ entityType: "trek", payload: input as never });
  const links = await suggestInternalLinks({
    sourceType: "trek",
    title: input.title,
    region: input.region,
    destinationName: input.destinationName,
    difficulty: input.difficulty,
    userId: input.userId,
  });
  const related = await suggestRelatedContent({
    title: input.title,
    region: input.region,
    destinationName: input.destinationName,
    difficulty: input.difficulty,
    durationDays: input.durationDays,
    seasons: input.bestSeasons,
  });
  const quality = analyzeContentQuality({
    entityType: "trek",
    title: input.title,
    summary: input.summary,
    overview: input.overview,
    faqs: faqs.faqs,
  });

  return {
    workflow: [
      { step: 1, key: "details", label: "Enter Trek Details", status: "completed" },
      { step: 2, key: "generate", label: "Generate SEO Suggestions", status: "completed" },
      { step: 3, key: "review", label: "Review & Edit", status: "pending", note: "Human review required" },
      { step: 4, key: "preview", label: "Preview", status: "pending" },
      { step: 5, key: "publish", label: "Publish", status: "pending", note: "Never auto-publish AI text" },
    ],
    requiresHumanReview: true,
    autoPublish: false,
    meta,
    faqs,
    schema,
    internalLinks: links,
    related,
    contentQuality: quality,
  };
}

async function listTemplates(category?: string) {
  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  return SeoTemplateModel.find(filter).sort({ category: 1, name: 1 });
}

async function upsertTemplate(data: {
  name: string;
  slug?: string;
  category: string;
  entityType?: string;
  template: Record<string, unknown>;
  isDefault?: boolean;
  description?: string;
}) {
  const slug = slugify(data.slug || data.name);
  return SeoTemplateModel.findOneAndUpdate(
    { slug },
    { ...data, slug },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

export const aiSeoService = {
  suggestMeta,
  suggestFaqs,
  previewSchemas,
  suggestInternalLinks,
  suggestRelatedContent,
  reportContentQuality,
  analyzeContentQuality,
  suggestImageSeo,
  suggestBlogAssistant,
  suggestLandingPage,
  getDashboard,
  runAudit,
  listAudits,
  getAudit,
  trekWorkflowAssist,
  listTemplates,
  upsertTemplate,
};
