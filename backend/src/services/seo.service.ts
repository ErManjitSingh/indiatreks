import { SeoSettingsModel, type ISeoSettings } from "../models/SeoSettings.model";
import { MetaTemplateModel, type IMetaTemplate } from "../models/MetaTemplate.model";
import { SchemaTemplateModel, type ISchemaTemplate } from "../models/SchemaTemplate.model";
import { SearchConsoleModel, type ISearchConsole } from "../models/SearchConsole.model";
import { AnalyticsConfigModel, type IAnalyticsConfig } from "../models/AnalyticsConfig.model";
import { ProgrammaticSeoPageModel, type IProgrammaticSeoPage } from "../models/ProgrammaticSeoPage.model";
import { SeoPageModel } from "../models/SeoPage.model";
import { TrekModel } from "../models/Trek.model";
import { BlogModel } from "../models/Blog.model";
import { DestinationModel } from "../models/Destination.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { slugify } from "../utils/slugify";
import { calculateSeoScore } from "./seoScore.service";
import { schemaService } from "./schema.service";
import { sitemapService } from "./sitemap.service";
import { robotsService } from "./robots.service";
import { siteConfigFallback } from "../config/seoDefaults";

async function getSettings() {
  let settings = await SeoSettingsModel.findOne({ key: "global" });
  if (!settings) {
    settings = await SeoSettingsModel.create({
      key: "global",
      ...siteConfigFallback,
    });
  }
  return settings;
}

async function updateSettings(data: Partial<ISeoSettings>) {
  return SeoSettingsModel.findOneAndUpdate({ key: "global" }, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

async function listPages(query: { page?: number; limit?: number; q?: string }) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.q) filter.path = new RegExp(query.q, "i");

  const [items, total] = await Promise.all([
    SeoPageModel.find(filter).sort({ path: 1 }).skip(skip).limit(limit),
    SeoPageModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getByPath(path: string) {
  const page = await SeoPageModel.findOne({ path });
  if (!page) throw new ApiError(404, "SEO page not found", "SEO_PAGE_NOT_FOUND");
  return page;
}

async function upsertPage(data: Partial<{ path: string }> & Record<string, unknown>) {
  if (!data.path) throw new ApiError(400, "path is required", "SEO_PATH_REQUIRED");
  return SeoPageModel.findOneAndUpdate({ path: data.path }, data, {
    new: true,
    upsert: true,
    runValidators: true,
  });
}

async function softDeletePage(id: string) {
  const page = await SeoPageModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!page) throw new ApiError(404, "SEO page not found", "SEO_PAGE_NOT_FOUND");
  return page;
}

function applyTemplate(template: string, vars: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}

async function listMetaTemplates(entityType?: string) {
  const filter: Record<string, unknown> = {};
  if (entityType) filter.entityType = entityType;
  return MetaTemplateModel.find(filter).sort({ entityType: 1, name: 1 });
}

async function upsertMetaTemplate(data: Partial<IMetaTemplate> & { name: string; entityType: string }) {
  const slug = slugify(data.slug || data.name);
  return MetaTemplateModel.findOneAndUpdate(
    { slug },
    { ...data, slug },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
}

async function deleteMetaTemplate(id: string) {
  const doc = await MetaTemplateModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!doc) throw new ApiError(404, "Meta template not found", "META_TEMPLATE_NOT_FOUND");
  return doc;
}

async function listSchemaTemplates(entityType?: string) {
  const filter: Record<string, unknown> = { isActive: true };
  if (entityType) filter.entityType = entityType;
  return SchemaTemplateModel.find(filter).sort({ schemaType: 1 });
}

async function upsertSchemaTemplate(
  data: Partial<ISchemaTemplate> & { name: string; schemaType: string },
) {
  const slug = slugify(data.slug || data.name);
  return SchemaTemplateModel.findOneAndUpdate(
    { slug },
    { ...data, slug },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
}

async function getSearchConsole() {
  let doc = await SearchConsoleModel.findOne({ key: "default" });
  if (!doc) {
    const settings = await getSettings();
    doc = await SearchConsoleModel.create({
      key: "default",
      propertyUrl: settings.siteUrl,
    });
  }
  return doc;
}

async function updateSearchConsole(data: Partial<ISearchConsole>) {
  return SearchConsoleModel.findOneAndUpdate({ key: "default" }, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

async function submitSitemap(url: string) {
  const doc = await getSearchConsole();
  doc.sitemapsSubmitted.push({
    url,
    submittedAt: new Date(),
    status: "pending",
  });
  await doc.save();
  return doc;
}

async function requestIndexing(url: string, note?: string) {
  const doc = await getSearchConsole();
  doc.indexingRequests.push({
    url,
    requestedAt: new Date(),
    status: "pending",
    note,
  });
  await doc.save();
  return doc;
}

async function getAnalyticsConfig() {
  let doc = await AnalyticsConfigModel.findOne({ key: "default" });
  if (!doc) {
    doc = await AnalyticsConfigModel.create({ key: "default" });
  }
  return doc;
}

async function updateAnalyticsConfig(data: Partial<IAnalyticsConfig>) {
  const payload: Partial<IAnalyticsConfig> = { ...data };
  if (data.gtm) {
    const id = String(data.gtm.containerId || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "");
    const valid = /^GTM-[A-Z0-9]+$/.test(id);
    payload.gtm = {
      enabled: Boolean(data.gtm.enabled) && valid,
      containerId: valid ? id : "",
    };
  }
  return AnalyticsConfigModel.findOneAndUpdate({ key: "default" }, payload, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

async function listProgrammatic(query: { page?: number; limit?: number; q?: string; status?: string }) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.q) {
    filter.$or = [
      { title: new RegExp(query.q, "i") },
      { slug: new RegExp(query.q, "i") },
      { filterValue: new RegExp(query.q, "i") },
    ];
  }
  if (query.status) filter.status = query.status;

  const [items, total] = await Promise.all([
    ProgrammaticSeoPageModel.find(filter).sort({ sortOrder: 1, title: 1 }).skip(skip).limit(limit),
    ProgrammaticSeoPageModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getProgrammaticBySlug(slug: string) {
  const page = await ProgrammaticSeoPageModel.findOne({ slug, status: "published" });
  if (!page) throw new ApiError(404, "Programmatic SEO page not found", "PROGRAMMATIC_NOT_FOUND");
  return page;
}

async function upsertProgrammatic(data: Partial<IProgrammaticSeoPage> & { title: string; filterType: string; filterValue: string }) {
  const slug = slugify(data.slug || data.filterValue || data.title);
  const path = data.path || `/treks/${slug}`;
  return ProgrammaticSeoPageModel.findOneAndUpdate(
    { slug },
    { ...data, slug, path },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
  );
}

async function deleteProgrammatic(id: string) {
  const page = await ProgrammaticSeoPageModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), status: "archived" },
    { new: true },
  );
  if (!page) throw new ApiError(404, "Programmatic SEO page not found", "PROGRAMMATIC_NOT_FOUND");
  return page;
}

const SEED_PROGRAMMATIC: Array<{
  filterType: IProgrammaticSeoPage["filterType"];
  filterValue: string;
  title: string;
  filterQuery: Record<string, unknown>;
}> = [
  { filterType: "region", filterValue: "himachal", title: "Treks in Himachal Pradesh", filterQuery: { region: "himachal" } },
  { filterType: "destination", filterValue: "manali", title: "Manali Treks", filterQuery: { destinationName: "manali" } },
  { filterType: "destination", filterValue: "dharamshala", title: "Dharamshala Treks", filterQuery: { destinationName: "dharamshala" } },
  { filterType: "destination", filterValue: "kullu", title: "Kullu Treks", filterQuery: { destinationName: "kullu" } },
  { filterType: "destination", filterValue: "spiti", title: "Spiti Treks", filterQuery: { destinationName: "spiti" } },
  { filterType: "difficulty", filterValue: "easy", title: "Easy Treks in India", filterQuery: { difficulty: "easy" } },
  { filterType: "difficulty", filterValue: "moderate", title: "Moderate Treks in India", filterQuery: { difficulty: "moderate" } },
  { filterType: "difficulty", filterValue: "difficult", title: "Difficult Treks in India", filterQuery: { difficulty: "difficult" } },
  { filterType: "duration", filterValue: "3-days", title: "3 Day Treks", filterQuery: { durationDays: 3 } },
  { filterType: "duration", filterValue: "4-days", title: "4 Day Treks", filterQuery: { durationDays: 4 } },
  { filterType: "season", filterValue: "winter", title: "Winter Treks in India", filterQuery: { bestSeasons: "winter" } },
  { filterType: "season", filterValue: "summer", title: "Summer Treks in India", filterQuery: { bestSeasons: "summer" } },
  { filterType: "month", filterValue: "may", title: "Treks in May", filterQuery: { months: "May" } },
  { filterType: "month", filterValue: "june", title: "Treks in June", filterQuery: { months: "June" } },
];

async function seedProgrammaticPages() {
  const results = [];
  for (const item of SEED_PROGRAMMATIC) {
    const slug = item.filterValue;
    const title = item.title;
    const description = `Discover the best ${title.toLowerCase()} with India Holiday Destinations. Compare difficulty, duration, prices, and departure dates.`;
    const page = await ProgrammaticSeoPageModel.findOneAndUpdate(
      { slug },
      {
        slug,
        path: `/treks/${slug}`,
        title,
        headline: title,
        summary: description,
        content: `${description} Book verified Himalayan adventures with expert guides, transparent pricing, and curated itineraries.`,
        filterType: item.filterType,
        filterValue: item.filterValue,
        filterQuery: item.filterQuery,
        status: "published",
        faqs: [
          {
            question: `What are the best ${item.filterValue} treks?`,
            answer: `Explore our curated ${title.toLowerCase()} list with difficulty ratings, prices, and departure calendars.`,
          },
          {
            question: "How do I book a trek?",
            answer: "Choose a trek, pick a departure date, and complete booking online or via our enquiry team.",
          },
        ],
        seo: {
          title: `${title} | India Holiday Destinations`,
          description,
          canonical: `/treks/${slug}`,
          focusKeyword: item.filterValue.replace(/-/g, " "),
          keywords: [item.filterValue, "trekking india", "himalayan treks", title.toLowerCase()],
          ogTitle: title,
          ogDescription: description,
          twitterCard: "summary_large_image",
          index: true,
          follow: true,
          robots: "index,follow",
          schemaType: "ItemList",
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    results.push(page);
  }
  return results;
}

async function scoreEntity(type: "trek" | "blog" | "destination", id: string) {
  if (type === "trek") {
    const trek = await TrekModel.findById(id);
    if (!trek) throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
    const score = calculateSeoScore({
      title: trek.title,
      summary: trek.summary,
      overview: trek.overview,
      headings: [trek.title, ...(trek.highlights || []).slice(0, 6), ...(trek.itinerary || []).map((d) => d.title)],
      images: [
        ...(trek.heroImages || []).map((src) => ({ src, alt: trek.seo?.imageAlt || trek.title })),
        ...(trek.gallery || []).map((g) => ({ src: g.src, alt: g.alt })),
      ],
      seo: trek.seo,
      faqs: trek.faqs,
      hasSchema: Boolean(trek.seo?.schemaJson || trek.seo?.schemaType),
    });
    trek.seo = {
      ...((trek.seo as object) || {}),
      seoScore: score.overall,
      readabilityScore: score.readabilityScore,
      lastSeoUpdate: new Date(),
    };
    await trek.save();
    return { entity: trek, score };
  }

  if (type === "blog") {
    const blog = await BlogModel.findById(id);
    if (!blog) throw new ApiError(404, "Blog not found", "BLOG_NOT_FOUND");
    const score = calculateSeoScore({
      title: blog.title,
      summary: blog.excerpt,
      content: blog.content,
      headings: [blog.title, ...(blog.tableOfContents || []).map((t) => t.title)],
      images: blog.coverImage ? [{ src: blog.coverImage, alt: blog.seo?.imageAlt || blog.title }] : [],
      seo: blog.seo,
      faqs: blog.faq,
      hasSchema: true,
    });
    blog.seo = {
      ...((blog.seo as object) || {}),
      seoScore: score.overall,
      readabilityScore: score.readabilityScore,
      lastSeoUpdate: new Date(),
    };
    await blog.save();
    return { entity: blog, score };
  }

  const destination = await DestinationModel.findById(id);
  if (!destination) throw new ApiError(404, "Destination not found", "DESTINATION_NOT_FOUND");
  const score = calculateSeoScore({
    title: destination.name,
    summary: destination.summary,
    content: destination.description,
    headings: [destination.name, ...(destination.highlights || [])],
    images: destination.coverImage
      ? [{ src: destination.coverImage, alt: destination.seo?.imageAlt || destination.name }]
      : [],
    seo: destination.seo,
    faqs: destination.faqs,
    hasSchema: true,
  });
  destination.seo = {
    ...((destination.seo as object) || {}),
    seoScore: score.overall,
    readabilityScore: score.readabilityScore,
    lastSeoUpdate: new Date(),
  };
  await destination.save();
  return { entity: destination, score };
}

async function getTrekSeoBundle(slug: string) {
  const trek = await TrekModel.findOne({ slug, status: "published" });
  if (!trek) throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
  const settings = await getSettings();
  const schemas = schemaService.buildEntitySchemas({
    type: "trek",
    title: trek.seo?.title || trek.title,
    description: trek.seo?.description || trek.summary,
    url: trek.seo?.canonical || `/treks/${trek.slug}`,
    image: trek.seo?.ogImage || trek.heroImages?.[0],
    seo: trek.seo,
    faqs: trek.faqs,
    trek: {
      priceInr: trek.basePriceInr,
      durationDays: trek.durationDays,
      destinationName: trek.destinationName,
      rating: trek.rating,
      reviewCount: trek.reviewCount,
      reviews: (trek.reviews || []).map((r) => ({
        author: r.name,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
      })),
    },
    settings,
  });

  const related = await TrekModel.find({
    status: "published",
    _id: { $ne: trek._id },
    $or: [{ region: trek.region }, { destinationName: trek.destinationName }],
  })
    .select("slug title heroImages basePriceInr difficulty durationDays rating")
    .limit(4)
    .lean();

  const nearby = await TrekModel.find({
    status: "published",
    _id: { $ne: trek._id },
    region: trek.region,
  })
    .select("slug title heroImages basePriceInr difficulty durationDays rating location")
    .limit(4)
    .lean();

  const similar = await TrekModel.find({
    status: "published",
    _id: { $ne: trek._id },
    difficulty: trek.difficulty,
  })
    .select("slug title heroImages basePriceInr difficulty durationDays rating")
    .limit(4)
    .lean();

  return { trek, schemas, related, nearby, similar, settings };
}

async function getDestinationSeoBundle(slug: string) {
  const destination = await DestinationModel.findOne({ slug, status: "published" });
  if (!destination) throw new ApiError(404, "Destination not found", "DESTINATION_NOT_FOUND");
  const settings = await getSettings();
  const schemas = schemaService.buildEntitySchemas({
    type: "destination",
    title: destination.seo?.title || destination.name,
    description: destination.seo?.description || destination.summary,
    url: destination.seo?.canonical || `/destinations/${destination.slug}`,
    image: destination.seo?.ogImage || destination.coverImage,
    seo: destination.seo,
    faqs: destination.faqs,
    settings,
  });
  const nearbyTreks = await TrekModel.find({
    status: "published",
    $or: [
      { destinationName: new RegExp(destination.name, "i") },
      { region: new RegExp(destination.region || destination.name, "i") },
    ],
  })
    .select("slug title heroImages basePriceInr difficulty durationDays rating")
    .limit(8)
    .lean();

  return {
    destination,
    schemas,
    nearbyTreks,
    meta: {
      title: destination.seo?.title || `${destination.name} Treks & Travel Guide`,
      description: destination.seo?.description || destination.summary,
      canonical: destination.seo?.canonical || `/destinations/${destination.slug}`,
      og: {
        title: destination.seo?.ogTitle || destination.seo?.title || destination.name,
        description: destination.seo?.ogDescription || destination.seo?.description || destination.summary,
        image: destination.seo?.ogImage || destination.coverImage,
      },
      twitter: {
        card: destination.seo?.twitterCard || "summary_large_image",
        title: destination.seo?.twitterTitle || destination.seo?.ogTitle || destination.name,
        description:
          destination.seo?.twitterDescription || destination.seo?.ogDescription || destination.summary,
        image: destination.seo?.twitterImage || destination.seo?.ogImage || destination.coverImage,
      },
    },
    settings,
  };
}

async function getBlogSeoBundle(slug: string) {
  const blog = await BlogModel.findOne({ slug, status: "published" });
  if (!blog) throw new ApiError(404, "Blog not found", "BLOG_NOT_FOUND");
  const settings = await getSettings();
  const schemas = schemaService.buildEntitySchemas({
    type: "blog",
    title: blog.seo?.title || blog.title,
    description: blog.seo?.description || blog.excerpt,
    url: blog.seo?.canonical || `/blogs/${blog.slug}`,
    image: blog.seo?.ogImage || blog.coverImage,
    seo: blog.seo,
    faqs: blog.faq,
    blog: {
      publishedAt: blog.publishedAt,
      modifiedAt: blog.modifiedAt || blog.updatedAt,
      authorName: blog.author?.name,
    },
    settings,
  });

  const [prev, next] = await Promise.all([
    BlogModel.findOne({
      status: "published",
      publishedAt: { $lt: blog.publishedAt || blog.createdAt },
    })
      .sort({ publishedAt: -1 })
      .select("slug title coverImage")
      .lean(),
    BlogModel.findOne({
      status: "published",
      publishedAt: { $gt: blog.publishedAt || blog.createdAt },
    })
      .sort({ publishedAt: 1 })
      .select("slug title coverImage")
      .lean(),
  ]);

  return {
    blog,
    schemas,
    previous: prev,
    next,
    readingTime: blog.readingTimeMinutes,
    tableOfContents: blog.tableOfContents || [],
    internalLinks: blog.internalLinks || [],
    settings,
  };
}

async function publicBootstrap() {
  const [settings, analytics, searchConsole, robots] = await Promise.all([
    getSettings(),
    getAnalyticsConfig(),
    getSearchConsole(),
    robotsService.getConfig(),
  ]);
  return {
    settings,
    analytics: {
      ga4: analytics.ga4,
      gtm: analytics.gtm,
      metaPixel: analytics.metaPixel,
      clarity: analytics.clarity,
    },
    verification: settings.verification,
    searchConsole: {
      verificationMetaTag: searchConsole.verificationMetaTag,
      isVerified: searchConsole.isVerified,
    },
    robotsEnabled: robots.enabled,
  };
}

export const seoService = {
  list: listPages,
  getByPath,
  upsert: upsertPage,
  softDelete: softDeletePage,
  getSettings,
  updateSettings,
  listMetaTemplates,
  upsertMetaTemplate,
  deleteMetaTemplate,
  listSchemaTemplates,
  upsertSchemaTemplate,
  getSearchConsole,
  updateSearchConsole,
  submitSitemap,
  requestIndexing,
  getAnalyticsConfig,
  updateAnalyticsConfig,
  listProgrammatic,
  getProgrammaticBySlug,
  upsertProgrammatic,
  deleteProgrammatic,
  seedProgrammaticPages,
  scoreEntity,
  getTrekSeoBundle,
  getDestinationSeoBundle,
  getBlogSeoBundle,
  publicBootstrap,
  applyTemplate,
  generateSitemap: sitemapService.generate,
  generateAllSitemaps: sitemapService.generateAll,
  generateRobots: robotsService.generateTxt,
  schemaService,
};
