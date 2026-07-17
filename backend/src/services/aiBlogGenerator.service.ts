import { BlogModel } from "../models/Blog.model";
import { TrekModel } from "../models/Trek.model";
import { DestinationModel } from "../models/Destination.model";
import {
  DHARAMSHALA_BLOG_TOPICS,
  type DharamshalaBlogTopic,
} from "../data/dharamshala-blog-topics";
import { buildArticleMarkdown, buildSeoForTopic } from "./blogContent/buildArticle";
import { slugify } from "../utils/slugify";
import { aiSeoService } from "./aiSeo.service";

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80";

async function findRelatedTreks(topic: DharamshalaBlogTopic) {
  const filter = topic.trekSlug
    ? { slug: topic.trekSlug }
    : {
        $or: [
          { destinationName: /dharamshala/i },
          { region: /kangra|dhauladhar|himachal/i },
          { title: /dharamshala|triund|kareri|indrahar|mcleod/i },
        ],
      };
  const treks = await TrekModel.find({ status: "published", ...filter })
    .select("slug title destinationName")
    .limit(topic.trekSlug ? 1 : 6)
    .lean();
  return treks.map((t) => ({ slug: t.slug, title: t.title }));
}

async function findRelatedDestinations() {
  const destinations = await DestinationModel.find({
    status: "published",
    $or: [{ slug: "dharamshala" }, { name: /dharamshala/i }, { region: /kangra|himachal/i }],
  })
    .select("slug name")
    .limit(4)
    .lean();
  return destinations.map((d) => ({ slug: d.slug, title: d.name }));
}

async function findRelatedBlogs(topic: DharamshalaBlogTopic, limit = 5) {
  const blogs = await BlogModel.find({
    status: "published",
    slug: { $ne: topic.slug },
    $or: [{ category: topic.category }, { tags: { $in: topic.tags } }],
  })
    .select("slug title")
    .limit(limit)
    .lean();
  return blogs.map((b) => ({ slug: b.slug, title: b.title }));
}

async function buildInternalLinks(topic: DharamshalaBlogTopic) {
  const links: Array<{ title: string; url: string; anchor?: string }> = [
    { title: "Dharamshala destination guide", url: "/destinations/dharamshala" },
    { title: "All trekking blogs", url: "/blogs" },
    { title: "Treks in Himachal Pradesh", url: "/treks?state=himachal-pradesh" },
  ];

  const [treks, destinations, blogs] = await Promise.all([
    findRelatedTreks(topic),
    findRelatedDestinations(),
    findRelatedBlogs(topic),
  ]);

  for (const trek of treks) {
    links.push({ title: trek.title || trek.slug, url: `/treks/${trek.slug}` });
  }
  for (const dest of destinations) {
    links.push({ title: dest.title || dest.slug, url: `/destinations/${dest.slug}` });
  }
  for (const blog of blogs) {
    links.push({ title: blog.title || blog.slug, url: `/blogs/${blog.slug}` });
  }

  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.url)) return false;
    seen.add(link.url);
    return true;
  });
}

function defaultGallery(topic: DharamshalaBlogTopic) {
  return [
    {
      url: DEFAULT_COVER,
      alt: `${topic.title} - mountain view near Dharamshala`,
      caption: `Dhauladhar views near ${topic.place || "Dharamshala"}`,
    },
    {
      url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
      alt: "McLeod Ganj monastery and prayer flags",
      caption: "Cultural lanes of McLeod Ganj",
    },
  ];
}

export async function generateBlogFromTopic(topic: DharamshalaBlogTopic, options?: { publish?: boolean }) {
  const article = buildArticleMarkdown(topic);
  const seo = buildSeoForTopic(topic, article.excerpt);
  const internalLinks = await buildInternalLinks(topic);
  const relatedTreks = await findRelatedTreks(topic);
  const relatedDestinations = await findRelatedDestinations();
  const relatedBlogs = await findRelatedBlogs(topic, 4);

  const quality = aiSeoService.analyzeContentQuality({
    entityType: "blog",
    title: topic.title,
    content: article.content,
    summary: article.excerpt,
    faqs: article.faq,
    hasCta: true,
  });

  return {
    slug: topic.slug,
    title: topic.title,
    excerpt: article.excerpt,
    content: article.content,
    coverImage: DEFAULT_COVER,
    gallery: defaultGallery(topic),
    author: {
      name: "India Holiday Destinations Editorial",
      bio: "Mountain travel editors covering Himachal treks, culture, and practical hill-station planning.",
    },
    category: topic.category,
    tags: topic.tags,
    status: options?.publish ? ("published" as const) : ("draft" as const),
    publishedAt: options?.publish ? new Date() : null,
    seo: {
      ...seo,
      seoScore: quality.scores.overall,
      readabilityScore: quality.scores.length,
      lastSeoUpdate: new Date(),
    },
    readingTimeMinutes: article.readingTimeMinutes,
    tableOfContents: article.tableOfContents,
    internalLinks,
    faq: article.faq,
    relatedTreks,
    relatedDestinations,
    relatedBlogs,
    featured: topic.kind === "travel-guide" || topic.kind === "trek-guide",
    views: 0,
  };
}

export async function generateTopicPreview(topic: DharamshalaBlogTopic) {
  return generateBlogFromTopic(topic, { publish: false });
}

export async function upsertGeneratedBlog(topic: DharamshalaBlogTopic, options?: { publish?: boolean; force?: boolean }) {
  const payload = await generateBlogFromTopic(topic, { publish: options?.publish });
  const existing = await BlogModel.findOne({ slug: topic.slug });

  if (existing && !options?.force) {
    return { action: "skipped" as const, slug: topic.slug, reason: "already_exists" };
  }

  if (existing) {
    await BlogModel.findByIdAndUpdate(existing._id, { ...payload, modifiedAt: new Date() });
    return { action: "updated" as const, slug: topic.slug, id: String(existing._id) };
  }

  const created = await BlogModel.create(payload);
  return { action: "created" as const, slug: topic.slug, id: String(created._id) };
}

export async function generateAllDharamshalaBlogs(options?: { publish?: boolean; force?: boolean }) {
  const results = [];
  for (const topic of DHARAMSHALA_BLOG_TOPICS) {
    const result = await upsertGeneratedBlog(topic, options);
    results.push(result);
  }
  return results;
}

export function listDharamshalaTopics() {
  return DHARAMSHALA_BLOG_TOPICS;
}

export function getTopicBySlug(slug: string) {
  return DHARAMSHALA_BLOG_TOPICS.find((t) => t.slug === slug || slugify(t.title) === slug) || null;
}

export const aiBlogGeneratorService = {
  generateBlogFromTopic,
  generateTopicPreview,
  upsertGeneratedBlog,
  generateAllDharamshalaBlogs,
  listDharamshalaTopics,
  getTopicBySlug,
};
