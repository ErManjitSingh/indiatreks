import { Router } from "express";
import * as couponController from "../controllers/coupon.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import {
  createCouponSchema,
  updateCouponSchema,
  listCouponsQuerySchema,
  applyCouponSchema,
} from "../validators/coupon.validator";

const router = Router();

router.post("/apply", validate(applyCouponSchema), couponController.applyCoupon);

router.get(
  "/",
  authenticate,
  requirePermission("coupons.write"),
  validate(listCouponsQuerySchema, "query"),
  couponController.listCoupons,
);
router.get(
  "/:id",
  authenticate,
  requirePermission("coupons.write"),
  validate(paramsIdSchema, "params"),
  couponController.getCoupon,
);
router.post(
  "/",
  authenticate,
  requirePermission("coupons.write"),
  validate(createCouponSchema),
  couponController.createCoupon,
);
router.patch(
  "/:id",
  authenticate,
  requirePermission("coupons.write"),
  validate(paramsIdSchema, "params"),
  validate(updateCouponSchema),
  couponController.updateCoupon,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("coupons.write"),
  validate(paramsIdSchema, "params"),
  couponController.deleteCoupon,
);

export default router;
