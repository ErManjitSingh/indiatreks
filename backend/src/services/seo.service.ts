import { SeoPageModel, ISeoPage } from "../models/SeoPage.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  q?: string;
}

async function list(query: ListQuery) {
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

async function upsert(data: Partial<ISeoPage> & { path: string }) {
  return SeoPageModel.findOneAndUpdate({ path: data.path }, data, {
    new: true,
    upsert: true,
    runValidators: true,
  });
}

async function softDelete(id: string) {
  const page = await SeoPageModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!page) throw new ApiError(404, "SEO page not found", "SEO_PAGE_NOT_FOUND");
  return page;
}

export const seoService = {
  list,
  getByPath,
  upsert,
  softDelete,
};
