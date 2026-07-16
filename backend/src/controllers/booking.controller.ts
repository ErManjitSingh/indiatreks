import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { bookingService } from "../services/booking.service";

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingService.create(req.body, req.user?.id);
  return sendSuccess(res, booking, "Booking created", 201);
});

export const listBookings = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await bookingService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const listMyBookings = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await bookingService.list({
    ...(req.query as Record<string, unknown>),
    userId: req.user?.id,
  });
  return sendPaginated(res, items, meta);
});

export const getBookingByCode = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingService.getByCode((req.params.code as string));
  return sendSuccess(res, booking);
});

export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingService.getById((req.params.id as string));
  return sendSuccess(res, booking);
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingService.updateStatus((req.params.id as string), req.body);
  return sendSuccess(res, booking, "Booking updated");
});

export const cancelBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingService.cancel((req.params.id as string), req.body?.reason);
  return sendSuccess(res, booking, "Booking cancelled");
});
