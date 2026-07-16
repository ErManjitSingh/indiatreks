import { Router } from "express";
import * as bookingController from "../controllers/booking.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import {
  createBookingSchema,
  updateBookingStatusSchema,
  listBookingsQuerySchema,
  cancelBookingSchema,
} from "../validators/booking.validator";

const router = Router();

router.post("/", optionalAuth, validate(createBookingSchema), bookingController.createBooking);
router.get("/my", authenticate, bookingController.listMyBookings);
router.get("/code/:code", bookingController.getBookingByCode);

router.get(
  "/",
  authenticate,
  requirePermission("bookings.read"),
  validate(listBookingsQuerySchema, "query"),
  bookingController.listBookings,
);
router.get(
  "/:id",
  authenticate,
  requirePermission("bookings.read"),
  validate(paramsIdSchema, "params"),
  bookingController.getBookingById,
);
router.patch(
  "/:id/status",
  authenticate,
  requirePermission("bookings.write"),
  validate(paramsIdSchema, "params"),
  validate(updateBookingStatusSchema),
  bookingController.updateBookingStatus,
);
router.post(
  "/:id/cancel",
  authenticate,
  validate(paramsIdSchema, "params"),
  validate(cancelBookingSchema),
  bookingController.cancelBooking,
);

export default router;
