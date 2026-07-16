import { FaqModel, IFaqDoc } from "../models/Faq.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  category?: string;
  trek?: string;
  status?: string;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.category) filter.category = query.category;
  if (query.trek) filter.trek = query.trek;
  if (query.status) filter.status = query.status;

  const [items, total] = await Promise.all([
    FaqModel.find(filter).sort({ sortOrder: 1, createdAt: -1 }).skip(skip).limit(limit),
    FaqModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getById(id: string) {
  const faq = await FaqModel.findById(id);
  if (!faq) throw new ApiError(404, "FAQ not found", "FAQ_NOT_FOUND");
  return faq;
}

async function create(data: Partial<IFaqDoc>) {
  return FaqModel.create(data);
}

async function update(id: string, data: Partial<IFaqDoc>) {
  const faq = await FaqModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!faq) throw new ApiError(404, "FAQ not found", "FAQ_NOT_FOUND");
  return faq;
}

async function softDelete(id: string) {
  const faq = await FaqModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!faq) throw new ApiError(404, "FAQ not found", "FAQ_NOT_FOUND");
  return faq;
}

export const faqService = {
  list,
  getById,
  create,
  update,
  softDelete,
};
