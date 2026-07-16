import { trekRepository, TrekListFilters } from "../repositories/TrekRepository";
import { slugify } from "../utils/slugify";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { ITrek } from "../models/Trek.model";

interface ListQuery extends TrekListFilters {
  page?: number;
  limit?: number;
  sort?: string;
}

function resolveSort(sort?: string): Record<string, 1 | -1> {
  switch (sort) {
    case "price-asc":
      return { basePriceInr: 1 };
    case "price-desc":
      return { basePriceInr: -1 };
    case "rating":
      return { rating: -1 };
    case "duration":
      return { durationDays: 1 };
    case "popularity":
      return { reviewCount: -1 };
    case "newest":
    default:
      return { createdAt: -1 };
  }
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter = trekRepository.buildFilterQuery(query);
  const sort = resolveSort(query.sort);

  const { items, total } = await trekRepository.paginate({ filter, sort, skip, limit });
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getBySlug(slug: string, includeUnpublished = false) {
  const trek = await trekRepository.findBySlug(slug, includeUnpublished);
  if (!trek) {
    throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
  }
  return trek;
}

async function getById(id: string) {
  const trek = await trekRepository.findById(id);
  if (!trek) {
    throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
  }
  return trek;
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let candidate = baseSlug;
  let counter = 1;
  while (await trekRepository.slugExists(candidate, excludeId)) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
  return candidate;
}

async function create(data: Partial<ITrek>) {
  const baseSlug = slugify(data.slug || data.title || "trek");
  const slug = await ensureUniqueSlug(baseSlug);
  const status = data.status ?? "draft";
  const trek = await trekRepository.create({
    ...data,
    slug,
    status,
    publishedAt: status === "published" ? new Date() : null,
  });
  return trek;
}

async function update(id: string, data: Partial<ITrek>) {
  const existing = await getById(id);

  let slug = existing.slug;
  if (data.slug || data.title) {
    const baseSlug = slugify(data.slug || data.title || existing.title);
    if (baseSlug !== existing.slug) {
      slug = await ensureUniqueSlug(baseSlug, id);
    }
  }

  const publishedAt =
    data.status === "published" && existing.status !== "published" ? new Date() : existing.publishedAt;

  const updated = await trekRepository.updateById(id, {
    ...data,
    slug,
    publishedAt,
  } as Partial<ITrek>);

  if (!updated) {
    throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
  }
  return updated;
}

async function softDelete(id: string) {
  const trek = await trekRepository.softDeleteById(id);
  if (!trek) {
    throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
  }
  return trek;
}

async function restore(id: string) {
  const trek = await trekRepository.restoreById(id);
  if (!trek) {
    throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
  }
  return trek;
}

async function getRelated(slug: string, limit = 4) {
  const trek = await trekRepository.findBySlug(slug, true);
  if (!trek) return [];

  if (trek.relatedSlugs?.length) {
    const related = await trekRepository.findMany({
      filter: { slug: { $in: trek.relatedSlugs }, status: "published" },
      limit,
    });
    if (related.length) return related;
  }

  return trekRepository.findMany({
    filter: {
      _id: { $ne: trek._id },
      status: "published",
      $or: [{ region: trek.region }, { destinationName: trek.destinationName }],
    },
    limit,
  });
}

export const trekService = {
  list,
  getBySlug,
  getById,
  create,
  update,
  softDelete,
  restore,
  getRelated,
};
