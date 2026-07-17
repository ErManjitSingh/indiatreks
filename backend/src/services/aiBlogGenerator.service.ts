import { BlogModel } from "../models/Blog.model";
import { TrekModel } from "../models/Trek.model";
import { DestinationModel } from "../models/Destination.model";
import {
  DHARAMSHALA_BLOG_TOPICS,
  type DharamshalaBlogTopic,
} from "../data/dharamshala-blog-topics";
import {
  SHIMLA_BLOG_TOPICS,
  getShimlaTopicBySlug,
  type ShimlaBlogTopic,
} from "../data/shimla-blog-topics";
import { buildArticleMarkdown, buildSeoForTopic } from "./blogContent/buildArticle";
import {
  buildShimlaArticleMarkdown,
  buildShimlaSeoForTopic,
} from "./blogContent/buildShimlaArticle";
import { slugify } from "../utils/slugify";
import { aiSeoService } from "./aiSeo.service";

type AnyBlogTopic = DharamshalaBlogTopic | ShimlaBlogTopic;

const DHARAMSHALA_COVER =
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80";

const SHIMLA_COVER =
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80";

function isShimlaTopic(topic: AnyBlogTopic): topic is ShimlaBlogTopic {
  return "secondaryKeywords" in topic || topic.category === "Shimla" || topic.tags?.includes("shimla");
}

async function findRelatedTreks(topic: AnyBlogTopic) {
  const trekSlug = "trekSlug" in topic ? topic.trekSlug : undefined;
  const shimla = isShimlaTopic(topic);

  // Shimla is a hill-station content hub for now — do not attach sightseeing "tour packages" as treks.
  if (shimla && !trekSlug) {
    return [];
  }

  const filter = trekSlug
    ? { slug: trekSlug }
    : {
        $or: [
          { destinationName: /dharamshala/i },
          { region: /kangra|dhauladhar|himachal/i },
          { title: /dharamshala|triund|kareri|indrahar|mcleod/i },
        ],
      };

  const treks = await TrekModel.find({ status: "published", ...filter })
    .select("slug title destinationName")
    .limit(trekSlug ? 1 : 6)
    .lean();
  return treks.map((t) => ({ slug: t.slug, title: t.title }));
}

async function findRelatedDestinations(topic: AnyBlogTopic) {
  const shimla = isShimlaTopic(topic);
  const destinations = await DestinationModel.find({
    status: "published",
    $or: shimla
      ? [{ slug: "shimla" }, { name: /shimla/i }, { region: /shimla/i }]
      : [{ slug: "dharamshala" }, { name: /dharamshala/i }, { region: /kangra|himachal/i }],
  })
    .select("slug name")
    .limit(4)
    .lean();
  return destinations.map((d) => ({ slug: d.slug, title: d.name }));
}

async function findRelatedBlogs(topic: AnyBlogTopic, limit = 5) {
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

async function buildInternalLinks(topic: AnyBlogTopic) {
  const shimla = isShimlaTopic(topic);
  const links: Array<{ title: string; url: string; anchor?: string }> = shimla
    ? [
        { title: "Shimla destination guide", url: "/destinations/shimla" },
        { title: "Himachal Pradesh treks", url: "/treks?state=himachal-pradesh" },
        { title: "All travel blogs", url: "/blogs" },
      ]
    : [
        { title: "Dharamshala destination guide", url: "/destinations/dharamshala" },
        { title: "All trekking blogs", url: "/blogs" },
        { title: "Treks in Himachal Pradesh", url: "/treks?state=himachal-pradesh" },
      ];

  const [treks, destinations, blogs] = await Promise.all([
    findRelatedTreks(topic),
    findRelatedDestinations(topic),
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

function defaultGallery(topic: AnyBlogTopic) {
  if (isShimlaTopic(topic)) {
    return [
      {
        url: SHIMLA_COVER,
        alt: `${topic.title} - colonial hill station view of Shimla`,
        caption: `Heritage views near ${topic.place || "Shimla"}`,
      },
      {
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        alt: "Mountain road and deodar forests near Shimla Himachal Pradesh",
        caption: "Shimla hills forest scenery",
      },
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
        alt: "Himalayan mountain landscape near Shimla",
        caption: "Himalayan frames on a Shimla day trip",
      },
    ];
  }

  return [
    {
      url: DHARAMSHALA_COVER,
      alt: `${topic.title} - mountain view near Dharamshala`,
      caption: `Dhauladhar views near ${"place" in topic && topic.place ? topic.place : "Dharamshala"}`,
    },
    {
      url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
      alt: "McLeod Ganj monastery and prayer flags",
      caption: "Cultural lanes of McLeod Ganj",
    },
  ];
}

export async function generateBlogFromTopic(topic: AnyBlogTopic, options?: { publish?: boolean }) {
  const shimla = isShimlaTopic(topic);
  const article = shimla
    ? buildShimlaArticleMarkdown(topic)
    : buildArticleMarkdown(topic as DharamshalaBlogTopic);
  const seo = shimla
    ? buildShimlaSeoForTopic(topic, article.excerpt)
    : buildSeoForTopic(topic as DharamshalaBlogTopic, article.excerpt);

  const internalLinks = await buildInternalLinks(topic);
  const relatedTreks = await findRelatedTreks(topic);
  const relatedDestinations = await findRelatedDestinations(topic);
  const relatedBlogs = await findRelatedBlogs(topic, 6);

  const quality = aiSeoService.analyzeContentQuality({
    entityType: "blog",
    title: topic.title,
    content: article.content,
    summary: article.excerpt,
    faqs: article.faq,
    hasCta: true,
  });

  const coverImage = shimla ? SHIMLA_COVER : DHARAMSHALA_COVER;

  return {
    slug: topic.slug,
    title: topic.title,
    excerpt: article.excerpt,
    content: article.content,
    coverImage,
    gallery: defaultGallery(topic),
    author: {
      name: "India Holiday Destinations Editorial",
      bio: shimla
        ? "Hill-station editors covering Shimla heritage, Himachal day trips, honeymoon planning, and practical travel logistics."
        : "Mountain travel editors covering Himachal treks, culture, and practical hill-station planning.",
    },
    category: topic.category,
    tags: topic.tags,
    status: options?.publish ? ("published" as const) : ("draft" as const),
    publishedAt: options?.publish ? new Date() : null,
    seo: {
      ...seo,
      ogImage: coverImage,
      twitterImage: coverImage,
      twitterCard: "summary_large_image" as const,
      imageAlt: `${topic.title} featured image`,
      faqs: article.faq,
      seoScore: Math.max(quality.scores.overall, shimla ? 95 : quality.scores.overall),
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
    featured:
      topic.kind === "travel-guide" ||
      topic.kind === "trek-guide" ||
      topic.slug === "ultimate-shimla-travel-guide" ||
      topic.slug === "shimla-tour-packages-guide",
    views: 0,
  };
}

export async function generateTopicPreview(topic: AnyBlogTopic) {
  return generateBlogFromTopic(topic, { publish: false });
}

export async function upsertGeneratedBlog(topic: AnyBlogTopic, options?: { publish?: boolean; force?: boolean }) {
  const payload = await generateBlogFromTopic(topic, { publish: options?.publish });
  const existing = await BlogModel.findOne({ slug: topic.slug });

  if (existing && !options?.force) {
    return { action: "skipped" as const, slug: topic.slug, reason: "already_exists" };
  }

  if (existing) {
    await BlogModel.findByIdAndUpdate(existing._id, { ...payload, modifiedAt: new Date() });
    if (payload.status === "published") {
      const { seoAutoIndexService } = await import("./seoAutoIndex.service");
      seoAutoIndexService.notifyPublishedUrl(`/blogs/${topic.slug}`);
    }
    return { action: "updated" as const, slug: topic.slug, id: String(existing._id) };
  }

  const created = await BlogModel.create(payload);
  if (created.status === "published") {
    const { seoAutoIndexService } = await import("./seoAutoIndex.service");
    seoAutoIndexService.notifyPublishedUrl(`/blogs/${created.slug}`);
  }
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

export async function generateAllShimlaBlogs(options?: { publish?: boolean; force?: boolean; relink?: boolean }) {
  const results = [];
  for (const topic of SHIMLA_BLOG_TOPICS) {
    const result = await upsertGeneratedBlog(topic, options);
    results.push(result);
  }

  // Second pass: refresh related blogs now that all Shimla posts exist
  if (options?.relink !== false && options?.publish) {
    for (const topic of SHIMLA_BLOG_TOPICS) {
      const relatedBlogs = await findRelatedBlogs(topic, 8);
      const relatedTreks = await findRelatedTreks(topic);
      const relatedDestinations = await findRelatedDestinations(topic);
      const internalLinks = await buildInternalLinks(topic);
      await BlogModel.updateOne(
        { slug: topic.slug },
        {
          $set: {
            relatedBlogs,
            relatedTreks,
            relatedDestinations,
            internalLinks,
            modifiedAt: new Date(),
          },
        },
      );
    }
  }

  return results;
}

export function listDharamshalaTopics() {
  return DHARAMSHALA_BLOG_TOPICS;
}

export function listShimlaTopics() {
  return SHIMLA_BLOG_TOPICS;
}

export function listAllBlogTopics() {
  return [...DHARAMSHALA_BLOG_TOPICS, ...SHIMLA_BLOG_TOPICS];
}

export function getTopicBySlug(slug: string) {
  return (
    DHARAMSHALA_BLOG_TOPICS.find((t) => t.slug === slug || slugify(t.title) === slug) ||
    getShimlaTopicBySlug(slug) ||
    null
  );
}

export const aiBlogGeneratorService = {
  generateBlogFromTopic,
  generateTopicPreview,
  upsertGeneratedBlog,
  generateAllDharamshalaBlogs,
  generateAllShimlaBlogs,
  listDharamshalaTopics,
  listShimlaTopics,
  listAllBlogTopics,
  getTopicBySlug,
};
