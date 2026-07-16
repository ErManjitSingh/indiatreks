import { TestimonialModel, ITestimonial } from "../models/Testimonial.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  featured?: boolean;
  status?: string;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.featured !== undefined) filter.featured = query.featured;
  if (query.status) filter.status = query.status;

  const [items, total] = await Promise.all([
    TestimonialModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    TestimonialModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getById(id: string) {
  const testimonial = await TestimonialModel.findById(id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found", "TESTIMONIAL_NOT_FOUND");
  return testimonial;
}

async function create(data: Partial<ITestimonial>) {
  return TestimonialModel.create(data);
}

async function update(id: string, data: Partial<ITestimonial>) {
  const testimonial = await TestimonialModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!testimonial) throw new ApiError(404, "Testimonial not found", "TESTIMONIAL_NOT_FOUND");
  return testimonial;
}

async function softDelete(id: string) {
  const testimonial = await TestimonialModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!testimonial) throw new ApiError(404, "Testimonial not found", "TESTIMONIAL_NOT_FOUND");
  return testimonial;
}

export const testimonialService = {
  list,
  getById,
  create,
  update,
  softDelete,
};
