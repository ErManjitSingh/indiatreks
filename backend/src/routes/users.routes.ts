import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { updateUserSchema, adminUpdateUserSchema, listUsersQuerySchema } from "../validators/user.validator";

const router = Router();

router.get("/me", authenticate, userController.getMyProfile);
router.patch("/me", authenticate, validate(updateUserSchema), userController.updateMyProfile);

router.get(
  "/",
  authenticate,
  requirePermission("users.read"),
  validate(listUsersQuerySchema, "query"),
  userController.listUsers,
);
router.get(
  "/:id",
  authenticate,
  requirePermission("users.read"),
  validate(paramsIdSchema, "params"),
  userController.getUser,
);
router.patch(
  "/:id",
  authenticate,
  requirePermission("users.write"),
  validate(paramsIdSchema, "params"),
  validate(adminUpdateUserSchema),
  userController.adminUpdateUser,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("users.write"),
  validate(paramsIdSchema, "params"),
  userController.deleteUser,
);

export default router;
