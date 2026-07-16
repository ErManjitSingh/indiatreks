import { CategoryModel, ICategory } from "../models/Category.model";
import { slugify } from "../utils/slugify";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  type?: "trek" | "blog";
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.type) filter.type = query.type;

  const [items, total] = await Promise.all([
    CategoryModel.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
    CategoryModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getById(id: string) {
  const category = await CategoryModel.findById(id);
  if (!category) throw new ApiError(404, "Category not found", "CATEGORY_NOT_FOUND");
  return category;
}

async function create(data: Partial<ICategory>) {
  const slug = slugify(data.slug || data.name || "category");
  const exists = await CategoryModel.countDocuments({ slug, type: data.type });
  if (exists) throw new ApiError(409, "Category with this slug already exists", "CATEGORY_EXISTS");
  return CategoryModel.create({ ...data, slug });
}

async function update(id: string, data: Partial<ICategory>) {
  const existing = await getById(id);
  const slug = data.slug || data.name ? slugify(data.slug || data.name || existing.name) : existing.slug;
  const category = await CategoryModel.findByIdAndUpdate(id, { ...data, slug }, { new: true, runValidators: true });
  if (!category) throw new ApiError(404, "Category not found", "CATEGORY_NOT_FOUND");
  return category;
}

async function softDelete(id: string) {
  const category = await CategoryModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!category) throw new ApiError(404, "Category not found", "CATEGORY_NOT_FOUND");
  return category;
}

export const categoryService = {
  list,
  getById,
  create,
  update,
  softDelete,
};
