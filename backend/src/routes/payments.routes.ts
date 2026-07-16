import { Router } from "express";
import * as paymentController from "../controllers/payment.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { createOrderSchema, verifyPaymentSchema } from "../validators/payment.validator";

const router = Router();

router.post("/orders", validate(createOrderSchema), paymentController.createOrder);
router.post("/verify", validate(verifyPaymentSchema), paymentController.verifyPayment);
router.post("/webhook", paymentController.webhook);

router.get("/", authenticate, requirePermission("payments.read"), (req, res) => {
  res.redirect(307, "/api/v1/bookings");
});

export default router;
