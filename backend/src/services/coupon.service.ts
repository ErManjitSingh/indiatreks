import { CouponModel, ICoupon } from "../models/Coupon.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  active?: boolean;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.active !== undefined) filter.active = query.active;

  const [items, total] = await Promise.all([
    CouponModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    CouponModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getById(id: string) {
  const coupon = await CouponModel.findById(id);
  if (!coupon) throw new ApiError(404, "Coupon not found", "COUPON_NOT_FOUND");
  return coupon;
}

async function create(data: Partial<ICoupon>) {
  const code = (data.code || "").toUpperCase().trim();
  const exists = await CouponModel.countDocuments({ code });
  if (exists) throw new ApiError(409, "A coupon with this code already exists", "COUPON_EXISTS");
  return CouponModel.create({ ...data, code });
}

async function update(id: string, data: Partial<ICoupon>) {
  const coupon = await CouponModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!coupon) throw new ApiError(404, "Coupon not found", "COUPON_NOT_FOUND");
  return coupon;
}

async function softDelete(id: string) {
  const coupon = await CouponModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!coupon) throw new ApiError(404, "Coupon not found", "COUPON_NOT_FOUND");
  return coupon;
}

interface ApplyResult {
  coupon: ICoupon;
  discount: number;
  finalAmount: number;
}

async function validateAndApply(code: string, amount: number): Promise<ApplyResult> {
  const coupon = await CouponModel.findOne({ code: code.toUpperCase().trim(), active: true });
  if (!coupon) {
    throw new ApiError(404, "Coupon code is invalid", "COUPON_INVALID");
  }

  const now = new Date();
  if (coupon.validFrom > now || coupon.validTo < now) {
    throw new ApiError(400, "Coupon has expired or is not yet active", "COUPON_EXPIRED");
  }
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new ApiError(400, "Coupon usage limit has been reached", "COUPON_LIMIT_REACHED");
  }
  if (amount < coupon.minAmount) {
    throw new ApiError(400, `Minimum order amount of ₹${coupon.minAmount} required`, "COUPON_MIN_AMOUNT");
  }

  let discount = coupon.type === "percent" ? (amount * coupon.value) / 100 : coupon.value;
  if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  discount = Math.min(discount, amount);

  return { coupon, discount, finalAmount: Math.max(0, amount - discount) };
}

async function markUsed(couponId: string) {
  await CouponModel.findByIdAndUpdate(couponId, { $inc: { usedCount: 1 } });
}

export const couponService = {
  list,
  getById,
  create,
  update,
  softDelete,
  validateAndApply,
  markUsed,
};
