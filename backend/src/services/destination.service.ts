import { destinationRepository } from "../repositories/DestinationRepository";
import { TrekModel } from "../models/Trek.model";
import { slugify } from "../utils/slugify";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { IDestination } from "../models/Destination.model";

interface ListQuery {
  page?: number;
  limit?: number;
  q?: string;
  region?: string;
  state?: string;
  status?: string;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;
  if (query.region) filter.region = new RegExp(`^${query.region}$`, "i");
  if (query.state) filter.state = new RegExp(`^${query.state}$`, "i");
  if (query.q) {
    filter.$or = [{ name: new RegExp(query.q, "i") }, { summary: new RegExp(query.q, "i") }];
  }

  const { items, total } = await destinationRepository.paginate({ filter, sort: { name: 1 }, skip, limit });
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getBySlug(slug: string, includeUnpublished = false) {
  const destination = await destinationRepository.findBySlug(slug, includeUnpublished);
  if (!destination) {
    throw new ApiError(404, "Destination not found", "DESTINATION_NOT_FOUND");
  }
  return destination;
}

async function getById(id: string) {
  const destination = await destinationRepository.findById(id);
  if (!destination) {
    throw new ApiError(404, "Destination not found", "DESTINATION_NOT_FOUND");
  }
  return destination;
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let candidate = baseSlug;
  let counter = 1;
  while (await destinationRepository.slugExists(candidate, excludeId)) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
  return candidate;
}

async function create(data: Partial<IDestination>) {
  const baseSlug = slugify(data.slug || data.name || "destination");
  const slug = await ensureUniqueSlug(baseSlug);
  return destinationRepository.create({ ...data, slug });
}

async function update(id: string, data: Partial<IDestination>) {
  const existing = await getById(id);
  let slug = existing.slug;
  if (data.slug || data.name) {
    const baseSlug = slugify(data.slug || data.name || existing.name);
    if (baseSlug !== existing.slug) {
      slug = await ensureUniqueSlug(baseSlug, id);
    }
  }
  const updated = await destinationRepository.updateById(id, { ...data, slug });
  if (!updated) throw new ApiError(404, "Destination not found", "DESTINATION_NOT_FOUND");
  return updated;
}

async function softDelete(id: string) {
  const destination = await destinationRepository.softDeleteById(id);
  if (!destination) throw new ApiError(404, "Destination not found", "DESTINATION_NOT_FOUND");
  return destination;
}

async function syncTrekCount(destinationName: string) {
  const count = await TrekModel.countDocuments({ destinationName, status: "published" });
  await destinationRepository.updateOne({ name: destinationName }, { trekCount: count });
}

export const destinationService = {
  list,
  getBySlug,
  getById,
  create,
  update,
  softDelete,
  syncTrekCount,
};
