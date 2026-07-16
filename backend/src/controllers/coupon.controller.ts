import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { couponService } from "../services/coupon.service";

export const listCoupons = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await couponService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getCoupon = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await couponService.getById((req.params.id as string));
  return sendSuccess(res, coupon);
});

export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await couponService.create(req.body);
  return sendSuccess(res, coupon, "Coupon created", 201);
});

export const updateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await couponService.update((req.params.id as string), req.body);
  return sendSuccess(res, coupon, "Coupon updated");
});

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  await couponService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "Coupon deleted");
});

export const applyCoupon = asyncHandler(async (req: Request, res: Response) => {
  const result = await couponService.validateAndApply(req.body.code, req.body.amount);
  return sendSuccess(res, result, "Coupon applied");
});
