import { Router } from "express";
import * as testimonialController from "../controllers/testimonial.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth, authorize } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import {
  createTestimonialSchema,
  updateTestimonialSchema,
  listTestimonialsQuerySchema,
} from "../validators/testimonial.validator";

const router = Router();

router.get("/", optionalAuth, validate(listTestimonialsQuerySchema, "query"), testimonialController.listTestimonials);
router.post("/", validate(createTestimonialSchema), testimonialController.createTestimonial);

router.patch(
  "/:id",
  authenticate,
  authorize("super_admin", "admin", "content_manager", "support_executive"),
  validate(paramsIdSchema, "params"),
  validate(updateTestimonialSchema),
  testimonialController.updateTestimonial,
);
router.delete(
  "/:id",
  authenticate,
  authorize("super_admin", "admin", "content_manager"),
  validate(paramsIdSchema, "params"),
  testimonialController.deleteTestimonial,
);

export default router;
