import { BlogModel, IBlog } from "../models/Blog.model";
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
  if (query.q) {
    filter.$or = [{ title: new RegExp(query.q, "i") }, { excerpt: new RegExp(query.q, "i") }];
  }

  const [items, total] = await Promise.all([
    BlogModel.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit),
    BlogModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
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

  const blog = await BlogModel.findByIdAndUpdate(id, { ...data, slug, publishedAt }, { new: true, runValidators: true });
  if (!blog) throw new ApiError(404, "Blog post not found", "BLOG_NOT_FOUND");
  return blog;
}

async function softDelete(id: string) {
  const blog = await BlogModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!blog) throw new ApiError(404, "Blog post not found", "BLOG_NOT_FOUND");
  return blog;
}

export const blogService = {
  list,
  getBySlug,
  getById,
  create,
  update,
  softDelete,
};
