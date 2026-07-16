import { Router } from "express";
import * as enquiryController from "../controllers/enquiry.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import {
  createEnquirySchema,
  updateEnquiryStatusSchema,
  listEnquiriesQuerySchema,
} from "../validators/enquiry.validator";

const router = Router();

router.post("/", validate(createEnquirySchema), enquiryController.createEnquiry);

router.get(
  "/",
  authenticate,
  requirePermission("enquiries.read"),
  validate(listEnquiriesQuerySchema, "query"),
  enquiryController.listEnquiries,
);
router.get(
  "/:id",
  authenticate,
  requirePermission("enquiries.read"),
  validate(paramsIdSchema, "params"),
  enquiryController.getEnquiry,
);
router.patch(
  "/:id/status",
  authenticate,
  requirePermission("enquiries.write"),
  validate(paramsIdSchema, "params"),
  validate(updateEnquiryStatusSchema),
  enquiryController.updateEnquiryStatus,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("enquiries.write"),
  validate(paramsIdSchema, "params"),
  enquiryController.deleteEnquiry,
);

export default router;
