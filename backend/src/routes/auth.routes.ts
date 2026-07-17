import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import * as googleAuthController from "../controllers/googleAuth.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { authLimiter } from "../middlewares/rateLimiter";
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  verifyEmailSchema,
  sendOtpSchema,
} from "../validators/auth.validator";

const router = Router();
const seoStaff = [authenticate, requirePermission("seo.write")] as const;

router.post("/register", authLimiter, validate(registerSchema), authController.register);
router.post("/login", authLimiter, validate(loginSchema), authController.login);
router.post("/refresh", validate(refreshSchema), authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);
router.post("/forgot-password", authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", authLimiter, validate(resetPasswordSchema), authController.resetPassword);
router.post("/change-password", authenticate, validate(changePasswordSchema), authController.changePassword);
router.post("/send-otp", authLimiter, validate(sendOtpSchema), authController.sendOtp);
router.post("/verify-email", authenticate, validate(verifyEmailSchema), authController.verifyEmail);

router.get("/google", ...seoStaff, googleAuthController.googleLogin);
router.get("/google/callback", googleAuthController.googleCallback);
router.get("/google/status", ...seoStaff, googleAuthController.googleStatus);
router.post("/google/disconnect", ...seoStaff, googleAuthController.googleDisconnect);

export default router;
