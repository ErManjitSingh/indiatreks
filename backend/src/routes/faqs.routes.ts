import { Router } from "express";
import * as faqController from "../controllers/faq.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth, authorize } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { createFaqSchema, updateFaqSchema, listFaqsQuerySchema } from "../validators/faq.validator";

const router = Router();

router.get("/", optionalAuth, validate(listFaqsQuerySchema, "query"), faqController.listFaqs);

router.post(
  "/",
  authenticate,
  authorize("super_admin", "admin", "content_manager"),
  validate(createFaqSchema),
  faqController.createFaq,
);
router.patch(
  "/:id",
  authenticate,
  authorize("super_admin", "admin", "content_manager"),
  validate(paramsIdSchema, "params"),
  validate(updateFaqSchema),
  faqController.updateFaq,
);
router.delete(
  "/:id",
  authenticate,
  authorize("super_admin", "admin", "content_manager"),
  validate(paramsIdSchema, "params"),
  faqController.deleteFaq,
);

export default router;
