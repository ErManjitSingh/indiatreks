import { Router } from "express";
import * as contactController from "../controllers/contact.controller";
import { validate } from "../middlewares/validate";
import { authenticate, authorize } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { createContactSchema, updateContactStatusSchema, listContactsQuerySchema } from "../validators/contact.validator";

const router = Router();

router.post("/", validate(createContactSchema), contactController.createContact);

router.get(
  "/",
  authenticate,
  authorize("super_admin", "admin", "support_executive"),
  validate(listContactsQuerySchema, "query"),
  contactController.listContacts,
);
router.get(
  "/:id",
  authenticate,
  authorize("super_admin", "admin", "support_executive"),
  validate(paramsIdSchema, "params"),
  contactController.getContact,
);
router.patch(
  "/:id/status",
  authenticate,
  authorize("super_admin", "admin", "support_executive"),
  validate(paramsIdSchema, "params"),
  validate(updateContactStatusSchema),
  contactController.updateContactStatus,
);
router.delete(
  "/:id",
  authenticate,
  authorize("super_admin", "admin"),
  validate(paramsIdSchema, "params"),
  contactController.deleteContact,
);

export default router;
