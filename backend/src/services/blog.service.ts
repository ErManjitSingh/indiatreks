import { BlogModel, IBlog } from "../models/Blog.model";
import { TrekModel } from "../models/Trek.model";
import { DestinationModel } from "../models/Destination.model";
import { slugify } from "../utils/slugify";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  tag?: string;
  status?: string;
  featured?: boolean;
  sort?: "latest" | "popular" | "trending";
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let candidate = baseSlug;
  let counter = 1;
  while (await BlogModel.countDocuments({ slug: candidate, _id: { $ne: excludeId } })) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
  return candidate;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;
  if (query.category) filter.category = new RegExp(`^${query.category}$`, "i");
  if (query.tag) filter.tags = query.tag;
  if (query.featured) filter.featured = true;
  if (query.q) {
    filter.$or = [{ title: new RegExp(query.q, "i") }, { excerpt: new RegExp(query.q, "i") }];
  }

  const sortMap = {
    latest: { publishedAt: -1, createdAt: -1 },
    popular: { views: -1, publishedAt: -1 },
    trending: { views: -1, updatedAt: -1 },
  } as const;
  const sort = sortMap[query.sort || "latest"];

  const [items, total] = await Promise.all([
    BlogModel.find(filter)
      .select(
        "slug title excerpt coverImage category tags status publishedAt readingTimeMinutes author featured views createdAt updatedAt",
      )
      .sort(sort as never)
      .skip(skip)
      .limit(limit)
      .lean(),
    BlogModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getHub() {
  const base = { status: "published" as const };
  const [latest, popular, trending, featured, categories] = await Promise.all([
    BlogModel.find(base)
      .sort({ publishedAt: -1 })
      .limit(6)
      .select("slug title excerpt coverImage readingTimeMinutes category publishedAt views")
      .lean(),
    BlogModel.find(base)
      .sort({ views: -1, publishedAt: -1 })
      .limit(6)
      .select("slug title excerpt coverImage readingTimeMinutes category publishedAt views")
      .lean(),
    BlogModel.find(base)
      .sort({ views: -1, updatedAt: -1 })
      .limit(6)
      .select("slug title excerpt coverImage readingTimeMinutes category publishedAt views")
      .lean(),
    BlogModel.find({ ...base, featured: true })
      .sort({ publishedAt: -1 })
      .limit(6)
      .select("slug title excerpt coverImage readingTimeMinutes category publishedAt views")
      .lean(),
    BlogModel.aggregate([
      { $match: base },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 12 },
    ]),
  ]);
  return {
    latest,
    popular,
    trending,
    featured,
    categories: categories.map((c: { _id: string; count: number }) => ({ name: c._id, count: c.count })),
  };
}

async function incrementViews(slug: string) {
  const blog = await BlogModel.findOneAndUpdate(
    { slug, status: "published" },
    { $inc: { views: 1 } },
    { new: true },
  ).select("slug views");
  if (!blog) throw new ApiError(404, "Blog post not found", "BLOG_NOT_FOUND");
  return { slug: blog.slug, views: blog.views || 0 };
}

async function getRelated(slug: string) {
  const blog = await getBySlug(slug, false);
  const doc = blog.toObject();
  const tagFilter = doc.tags?.length ? { tags: { $in: doc.tags } } : {};
  const [blogs, treks, destinations] = await Promise.all([
    BlogModel.find({ status: "published", slug: { $ne: slug }, ...tagFilter })
      .select("slug title excerpt coverImage readingTimeMinutes")
      .limit(6)
      .lean(),
    doc.relatedTreks?.length
      ? TrekModel.find({ slug: { $in: doc.relatedTreks.map((t) => t.slug) }, status: "published" })
          .select("slug title summary heroImages basePriceInr durationDays")
          .lean()
      : TrekModel.find({ status: "published", destinationName: /dharamshala/i })
          .select("slug title summary heroImages basePriceInr durationDays")
          .limit(4)
          .lean(),
    doc.relatedDestinations?.length
      ? DestinationModel.find({
          slug: { $in: doc.relatedDestinations.map((d) => d.slug) },
          status: "published",
        })
          .select("slug name summary coverImage")
          .lean()
      : DestinationModel.find({ status: "published", slug: "dharamshala" })
          .select("slug name summary coverImage")
          .lean(),
  ]);
  return { blogs, treks, destinations };
}

async function getBySlug(slug: string, includeUnpublished = false) {
  const filter: Record<string, unknown> = { slug };
  if (!includeUnpublished) filter.status = "published";
  const blog = await BlogModel.findOne(filter);
  if (!blog) throw new ApiError(404, "Blog post not found", "BLOG_NOT_FOUND");
  return blog;
}

async function getById(id: string) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw new ApiError(404, "Blog post not found", "BLOG_NOT_FOUND");
  return blog;
}

async function create(data: Partial<IBlog>) {
  const baseSlug = slugify(data.slug || data.title || "post");
  const slug = await ensureUniqueSlug(baseSlug);
  const publishedAt = data.status === "published" ? new Date() : null;
  return BlogModel.create({ ...data, slug, publishedAt });
}

async function update(id: string, data: Partial<IBlog>) {
  const existing = await getById(id);
  let slug = existing.slug;
  if (data.slug || data.title) {
    const baseSlug = slugify(data.slug || data.title || existing.title);
    if (baseSlug !== existing.slug) slug = await ensureUniqueSlug(baseSlug, id);
  }
  const publishedAt =
    data.status === "published" && existing.status !== "published" ? new Date() : existing.publishedAt;

  const seoPayload = data.seo
    ? { ...data.seo, lastSeoUpdate: new Date() }
    : undefined;

  const blog = await BlogModel.findByIdAndUpdate(
    id,
    {
      ...data,
      slug,
      publishedAt,
      modifiedAt: new Date(),
      ...(seoPayload ? { seo: { ...(existing.seo as object), ...seoPayload } } : {}),
    },
    { new: true, runValidators: true },
  );
  if (!blog) throw new ApiError(404, "Blog post not found", "BLOG_NOT_FOUND");

  if (slug !== existing.slug) {
    const { redirectService } = await import("./redirect.service");
    await redirectService.createSlugRedirect({
      fromPath: `/blogs/${existing.slug}`,
      toPath: `/blogs/${slug}`,
      entityType: "blog",
      entityId: String(existing._id),
      note: `Blog slug updated from ${existing.slug}`,
    });
  }

  return blog;
}

async function softDelete(id: string) {
  const blog = await BlogModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!blog) throw new ApiError(404, "Blog post not found", "BLOG_NOT_FOUND");
  return blog;
}

async function getStats() {
  const base = { deletedAt: null };
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [total, published, draft, scheduled, createdThisMonth, viewsAgg, categories] = await Promise.all([
    BlogModel.countDocuments(base),
    BlogModel.countDocuments({ ...base, status: "published" }),
    BlogModel.countDocuments({ ...base, status: "draft" }),
    BlogModel.countDocuments({ ...base, status: "scheduled" }),
    BlogModel.countDocuments({ ...base, createdAt: { $gte: monthStart } }),
    BlogModel.aggregate<{ totalViews: number }>([
      { $match: base },
      { $group: { _id: null, totalViews: { $sum: { $ifNull: ["$views", 0] } } } },
    ]),
    BlogModel.distinct("category", { ...base, category: { $nin: [null, ""] } }),
  ]);

  const draftTotal = draft + scheduled;
  const totalViews = viewsAgg[0]?.totalViews ?? 0;

  return {
    total,
    published,
    draft: draftTotal,
    scheduled,
    totalViews,
    createdThisMonth,
    publishedPercent: total ? Math.round((published / total) * 100) : 0,
    draftPercent: total ? Math.round((draftTotal / total) * 100) : 0,
    categories: categories.map(String).filter(Boolean).sort((a, b) => a.localeCompare(b)),
  };
}

export const blogService = {
  list,
  getHub,
  getRelated,
  incrementViews,
  getStats,
  getBySlug,
  getById,
  create,
  update,
  softDelete,
};
