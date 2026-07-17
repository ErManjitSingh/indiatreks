import { trekRepository, TrekListFilters } from "../repositories/TrekRepository";
import { slugify } from "../utils/slugify";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { ITrek, TrekModel } from "../models/Trek.model";

interface ListQuery extends TrekListFilters {
  page?: number;
  limit?: number;
  sort?: string;
}

/** Fields needed for cards / admin tables — excludes itinerary, faqs, packing, etc. */
export const TREK_LISTING_SELECT = [
  "_id",
  "slug",
  "title",
  "summary",
  "destinationName",
  "location",
  "state",
  "region",
  "difficulty",
  "bestSeasons",
  "durationDays",
  "durationNights",
  "maxAltitude",
  "distanceKm",
  "basePriceInr",
  "originalPriceInr",
  "rating",
  "reviewCount",
  "heroImages",
  "seatsLeft",
  "badges",
  "trekTypes",
  "suitableFor",
  "months",
  "status",
  "createdAt",
  "publishedAt",
  "updatedAt",
].join(" ");

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

  const { items, total } = await trekRepository.paginate({
    filter,
    sort,
    skip,
    limit,
    select: TREK_LISTING_SELECT,
  });
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
  if (status === "published") {
    const { seoAutoIndexService } = await import("./seoAutoIndex.service");
    seoAutoIndexService.notifyPublishedUrl(`/treks/${trek.slug}`);
  }
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

  const seoPayload = data.seo
    ? {
        ...data.seo,
        lastSeoUpdate: new Date(),
      }
    : undefined;

  const updated = await trekRepository.updateById(id, {
    ...data,
    slug,
    publishedAt,
    ...(seoPayload ? { seo: { ...(existing.seo as object), ...seoPayload } } : {}),
  } as Partial<ITrek>);

  if (!updated) {
    throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
  }

  if (slug !== existing.slug) {
    const { redirectService } = await import("./redirect.service");
    await redirectService.createSlugRedirect({
      fromPath: `/treks/${existing.slug}`,
      toPath: `/treks/${slug}`,
      entityType: "trek",
      entityId: String(existing._id),
      note: `Trek slug updated from ${existing.slug}`,
    });
  }

  if (updated.status === "published") {
    const { seoAutoIndexService } = await import("./seoAutoIndex.service");
    seoAutoIndexService.notifyPublishedUrl(`/treks/${updated.slug}`);
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

async function getStats() {
  const base = { deletedAt: null };
  const [total, published, draft, archived, regionRows] = await Promise.all([
    TrekModel.countDocuments(base),
    TrekModel.countDocuments({ ...base, status: "published" }),
    TrekModel.countDocuments({ ...base, status: "draft" }),
    TrekModel.countDocuments({ ...base, status: "archived" }),
    TrekModel.distinct("region", { ...base, region: { $nin: [null, ""] } }),
  ]);

  const regions = regionRows
    .map((r) => String(r).trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return { total, published, draft, archived, regions };
}

async function getRelated(slug: string, limit = 4) {
  const trek = await trekRepository.findBySlug(slug, true);
  if (!trek) return [];

  if (trek.relatedSlugs?.length) {
    const related = await trekRepository.findMany({
      filter: { slug: { $in: trek.relatedSlugs }, status: "published" },
      limit,
      select: TREK_LISTING_SELECT,
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
    select: TREK_LISTING_SELECT,
  });
}

export const trekService = {
  list,
  getStats,
  getBySlug,
  getById,
  create,
  update,
  softDelete,
  restore,
  getRelated,
};
