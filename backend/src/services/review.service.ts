import { ReviewModel, IReview } from "../models/Review.model";
import { TrekModel } from "../models/Trek.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  trekSlug?: string;
  status?: string;
}

async function recalculateTrekRating(trekId: string) {
  const approved = await ReviewModel.find({ trek: trekId, status: "approved" });
  const reviewCount = approved.length;
  const rating = reviewCount
    ? Math.round((approved.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10
    : 0;
  await TrekModel.findByIdAndUpdate(trekId, { rating, reviewCount });
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;

  if (query.trekSlug) {
    const trek = await TrekModel.findOne({ slug: query.trekSlug }).select("_id");
    filter.trek = trek?._id ?? null;
  }

  const [items, total] = await Promise.all([
    ReviewModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("trek", "title slug"),
    ReviewModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function create(data: { trekSlug: string; name: string; rating: number; comment: string; userId?: string }) {
  const trek = await TrekModel.findOne({ slug: data.trekSlug, status: "published" });
  if (!trek) throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");

  const review = await ReviewModel.create({
    trek: trek._id,
    user: data.userId,
    name: data.name,
    rating: data.rating,
    comment: data.comment,
    verified: Boolean(data.userId),
    status: "pending",
  } as Partial<IReview>);

  return review;
}

async function moderate(id: string, status: "pending" | "approved" | "rejected") {
  const review = await ReviewModel.findByIdAndUpdate(id, { status }, { new: true });
  if (!review) throw new ApiError(404, "Review not found", "REVIEW_NOT_FOUND");
  await recalculateTrekRating(String(review.trek));
  return review;
}

async function markHelpful(id: string) {
  const review = await ReviewModel.findByIdAndUpdate(id, { $inc: { helpfulCount: 1 } }, { new: true });
  if (!review) throw new ApiError(404, "Review not found", "REVIEW_NOT_FOUND");
  return review;
}

async function softDelete(id: string) {
  const review = await ReviewModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!review) throw new ApiError(404, "Review not found", "REVIEW_NOT_FOUND");
  await recalculateTrekRating(String(review.trek));
  return review;
}

export const reviewService = {
  list,
  create,
  moderate,
  markHelpful,
  softDelete,
};
