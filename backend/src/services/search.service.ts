import { TrekModel } from "../models/Trek.model";
import { BlogModel } from "../models/Blog.model";
import { DestinationModel } from "../models/Destination.model";
import { SearchQueryModel } from "../models/SearchQuery.model";
import { ProgrammaticSeoPageModel } from "../models/ProgrammaticSeoPage.model";

interface SearchOptions {
  q: string;
  limit?: number;
  types?: string[];
  track?: boolean;
}

function normalizeQuery(q: string) {
  return q.trim().toLowerCase().replace(/\s+/g, " ");
}

async function trackSearch(query: string, resultCount: number, source: "search" | "autocomplete" | "suggestion") {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return;

  const doc = await SearchQueryModel.findOneAndUpdate(
    { normalizedQuery },
    {
      $set: {
        query: query.trim(),
        normalizedQuery,
        lastSearchedAt: new Date(),
        resultCount,
        source,
      },
      $inc: { count: 1 },
    },
    { upsert: true, new: true },
  );

  if (doc.count >= 10) {
    doc.isPopular = true;
  }
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  if (doc.count >= 3 && doc.lastSearchedAt.getTime() >= dayAgo) {
    doc.isTrending = true;
  }
  await doc.save();
}

async function globalSearch({ q, limit = 10, types, track = true }: SearchOptions) {
  const shouldSearch = (type: string) => !types || types.includes(type);
  const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  const [treks, blogs, destinations, programmatic] = await Promise.all([
    shouldSearch("treks")
      ? TrekModel.find({
          status: "published",
          $or: [
            { title: regex },
            { summary: regex },
            { destinationName: regex },
            { location: regex },
            { region: regex },
            { "seo.focusKeyword": regex },
            { "seo.keywords": regex },
          ],
        })
          .select("slug title summary destinationName heroImages basePriceInr difficulty durationDays")
          .limit(limit)
      : Promise.resolve([]),
    shouldSearch("blogs")
      ? BlogModel.find({
          status: "published",
          $or: [{ title: regex }, { excerpt: regex }, { tags: regex }, { "seo.focusKeyword": regex }],
        })
          .select("slug title excerpt coverImage readingTimeMinutes publishedAt")
          .limit(limit)
      : Promise.resolve([]),
    shouldSearch("destinations")
      ? DestinationModel.find({
          status: "published",
          $or: [{ name: regex }, { summary: regex }, { region: regex }, { state: regex }],
        })
          .select("slug name summary coverImage region state")
          .limit(limit)
      : Promise.resolve([]),
    shouldSearch("programmatic")
      ? ProgrammaticSeoPageModel.find({
          status: "published",
          $or: [{ title: regex }, { summary: regex }, { filterValue: regex }, { slug: regex }],
        })
          .select("slug path title summary filterType filterValue")
          .limit(limit)
      : Promise.resolve([]),
  ]);

  const total = treks.length + blogs.length + destinations.length + programmatic.length;
  if (track && q.trim()) {
    void trackSearch(q, total, "search");
  }

  return {
    treks: treks.map((t) => ({
      type: "trek",
      slug: t.slug,
      title: t.title,
      summary: t.summary,
      image: t.heroImages?.[0],
      price: t.basePriceInr,
      difficulty: t.difficulty,
      durationDays: t.durationDays,
      url: `/treks/${t.slug}`,
    })),
    blogs: blogs.map((b) => ({
      type: "blog",
      slug: b.slug,
      title: b.title,
      summary: b.excerpt,
      image: b.coverImage,
      readingTime: b.readingTimeMinutes,
      url: `/blogs/${b.slug}`,
    })),
    destinations: destinations.map((d) => ({
      type: "destination",
      slug: d.slug,
      title: d.name,
      summary: d.summary,
      image: d.coverImage,
      url: `/destinations/${d.slug}`,
    })),
    programmatic: programmatic.map((p) => ({
      type: "programmatic",
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      url: p.path,
      filterType: p.filterType,
    })),
    total,
    query: q,
  };
}

async function autocomplete(q: string, limit = 8) {
  if (!q || q.trim().length < 2) {
    return { suggestions: [], query: q };
  }

  const results = await globalSearch({ q, limit, track: false });
  const suggestions = [
    ...results.treks.slice(0, 4).map((t) => ({ label: t.title, type: t.type, url: t.url })),
    ...results.destinations.slice(0, 2).map((d) => ({ label: d.title, type: d.type, url: d.url })),
    ...results.blogs.slice(0, 2).map((b) => ({ label: b.title, type: b.type, url: b.url })),
  ].slice(0, limit);

  void trackSearch(q, suggestions.length, "autocomplete");
  return { suggestions, query: q };
}

async function suggestions(q: string, limit = 6) {
  const normalized = normalizeQuery(q);
  const [fromHistory, fromEntities] = await Promise.all([
    SearchQueryModel.find({
      normalizedQuery: new RegExp(`^${normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
    })
      .sort({ count: -1 })
      .limit(limit)
      .lean(),
    autocomplete(q, limit),
  ]);

  const merged = [
    ...fromHistory.map((h) => ({ label: h.query, type: "history", url: `/treks?q=${encodeURIComponent(h.query)}` })),
    ...fromEntities.suggestions,
  ];

  const seen = new Set<string>();
  const unique = merged.filter((item) => {
    const key = item.label.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { suggestions: unique.slice(0, limit), query: q };
}

async function popularSearches(limit = 10) {
  const items = await SearchQueryModel.find({ isPopular: true })
    .sort({ count: -1 })
    .limit(limit)
    .lean();

  if (items.length) {
    return items.map((i) => ({ query: i.query, count: i.count }));
  }

  return SearchQueryModel.find()
    .sort({ count: -1 })
    .limit(limit)
    .lean()
    .then((rows) => rows.map((i) => ({ query: i.query, count: i.count })));
}

async function trendingSearches(limit = 10) {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const items = await SearchQueryModel.find({ lastSearchedAt: { $gte: since } })
    .sort({ count: -1, lastSearchedAt: -1 })
    .limit(limit)
    .lean();

  return items.map((i) => ({ query: i.query, count: i.count, lastSearchedAt: i.lastSearchedAt }));
}

export const searchService = {
  globalSearch,
  autocomplete,
  suggestions,
  popularSearches,
  trendingSearches,
  trackSearch,
};
