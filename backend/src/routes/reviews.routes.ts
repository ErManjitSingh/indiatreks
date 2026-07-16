import { Router } from "express";
import * as reviewController from "../controllers/review.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { createReviewSchema, moderateReviewSchema, listReviewsQuerySchema } from "../validators/review.validator";

const router = Router();

router.get("/", validate(listReviewsQuerySchema, "query"), reviewController.listReviews);
router.post("/", optionalAuth, validate(createReviewSchema), reviewController.createReview);
router.post("/:id/helpful", validate(paramsIdSchema, "params"), reviewController.markHelpful);

router.patch(
  "/:id/moderate",
  authenticate,
  requirePermission("reviews.moderate"),
  validate(paramsIdSchema, "params"),
  validate(moderateReviewSchema),
  reviewController.moderateReview,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("reviews.moderate"),
  validate(paramsIdSchema, "params"),
  reviewController.deleteReview,
);

export default router;
