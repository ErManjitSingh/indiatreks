import { Router } from "express";
import * as newsletterController from "../controllers/newsletter.controller";
import { validate } from "../middlewares/validate";
import { authenticate, authorize } from "../middlewares/auth";
import { subscribeNewsletterSchema, unsubscribeNewsletterSchema, listNewsletterQuerySchema } from "../validators/newsletter.validator";

const router = Router();

router.post("/subscribe", validate(subscribeNewsletterSchema), newsletterController.subscribe);
router.post("/unsubscribe", validate(unsubscribeNewsletterSchema), newsletterController.unsubscribe);

router.get(
  "/",
  authenticate,
  authorize("super_admin", "admin", "sales_manager"),
  validate(listNewsletterQuerySchema, "query"),
  newsletterController.listSubscribers,
);

export default router;
