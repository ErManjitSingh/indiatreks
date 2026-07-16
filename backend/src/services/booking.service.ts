import { bookingRepository } from "../repositories/BookingRepository";
import { trekRepository } from "../repositories/TrekRepository";
import { couponService } from "./coupon.service";
import { emailService } from "./email.service";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { CreateBookingInput } from "../validators/booking.validator";
import { IBooking } from "../models/Booking.model";

interface ListQuery {
  page?: number;
  limit?: number;
  bookingStatus?: string;
  paymentStatus?: string;
  q?: string;
  userId?: string;
}

async function create(input: CreateBookingInput, userId?: string) {
  const trek = await trekRepository.findBySlug(input.trekSlug, true);
  if (!trek) {
    throw new ApiError(404, "Trek not found", "TREK_NOT_FOUND");
  }

  const departure = trek.departures.find(
    (d) => new Date(d.date).toDateString() === new Date(input.departureDate).toDateString(),
  );

  if (departure && departure.seatsLeft < input.travelers.length) {
    throw new ApiError(400, "Not enough seats available for this departure", "INSUFFICIENT_SEATS");
  }

  const pricePerPerson = departure?.priceInr ?? trek.basePriceInr;
  let amount = pricePerPerson * input.travelers.length;

  let appliedCoupon: string | undefined;
  if (input.couponCode) {
    const { coupon, finalAmount } = await couponService.validateAndApply(input.couponCode, amount);
    amount = finalAmount;
    appliedCoupon = coupon.code;
    await couponService.markUsed(String(coupon._id));
  }

  const bookingCode = await bookingRepository.generateUniqueCode();

  const booking = await bookingRepository.create({
    bookingCode,
    user: userId,
    trek: trek._id,
    trekSlug: trek.slug,
    trekTitle: trek.title,
    departureDate: input.departureDate,
    travelers: input.travelers,
    amount,
    currency: "INR",
    paymentStatus: "pending",
    bookingStatus: "pending",
    customer: input.customer,
    notes: appliedCoupon ? `Coupon applied: ${appliedCoupon}${input.notes ? ` | ${input.notes}` : ""}` : input.notes,
  } as Partial<IBooking>);

  if (departure) {
    departure.seatsLeft = Math.max(0, departure.seatsLeft - input.travelers.length);
    await trek.save();
  }

  return booking;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.bookingStatus) filter.bookingStatus = query.bookingStatus;
  if (query.paymentStatus) filter.paymentStatus = query.paymentStatus;
  if (query.userId) filter.user = query.userId;
  if (query.q) {
    filter.$or = [
      { bookingCode: new RegExp(query.q, "i") },
      { trekTitle: new RegExp(query.q, "i") },
      { "customer.email": new RegExp(query.q, "i") },
      { "customer.name": new RegExp(query.q, "i") },
    ];
  }

  const { items, total } = await bookingRepository.paginate({
    filter,
    sort: { createdAt: -1 },
    skip,
    limit,
    populate: { path: "trek", select: "title slug heroImages basePriceInr" },
  });
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getByCode(bookingCode: string) {
  const booking = await bookingRepository.findByCode(bookingCode);
  if (!booking) throw new ApiError(404, "Booking not found", "BOOKING_NOT_FOUND");
  return booking;
}

async function getById(id: string) {
  const booking = await bookingRepository.findByIdPopulated(id);
  if (!booking) throw new ApiError(404, "Booking not found", "BOOKING_NOT_FOUND");
  return booking;
}

async function updateStatus(id: string, data: Partial<Pick<IBooking, "bookingStatus" | "paymentStatus" | "notes">>) {
  const booking = await bookingRepository.updateById(id, data);
  if (!booking) throw new ApiError(404, "Booking not found", "BOOKING_NOT_FOUND");

  if (data.paymentStatus === "paid" && booking.customer?.email) {
    await emailService.sendBookingConfirmationEmail(booking.customer.email, {
      bookingCode: booking.bookingCode,
      trekTitle: booking.trekTitle,
      departureDate: booking.departureDate.toDateString(),
      amount: booking.amount,
    });
  }
  return booking;
}

async function cancel(id: string, reason?: string) {
  const booking = await bookingRepository.findById(id);
  if (!booking) throw new ApiError(404, "Booking not found", "BOOKING_NOT_FOUND");
  if (booking.bookingStatus === "cancelled") {
    throw new ApiError(400, "Booking is already cancelled", "ALREADY_CANCELLED");
  }

  booking.bookingStatus = "cancelled";
  booking.notes = reason ? `Cancelled: ${reason}${booking.notes ? ` | ${booking.notes}` : ""}` : booking.notes;
  await booking.save();

  const trek = await trekRepository.findById(booking.trek);
  if (trek) {
    const departure = trek.departures.find(
      (d) => new Date(d.date).toDateString() === new Date(booking.departureDate).toDateString(),
    );
    if (departure) {
      departure.seatsLeft += booking.travelers.length;
      await trek.save();
    }
  }

  return booking;
}

export const bookingService = {
  create,
  list,
  getByCode,
  getById,
  updateStatus,
  cancel,
};
