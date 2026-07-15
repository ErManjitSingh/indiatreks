import {
  ADVANCE_RATE,
  BOOKING_ADDONS,
  BOOKING_COUPONS,
  CHILD_RATE,
  CONVENIENCE_RATE,
  GST_RATE,
  PRIVATE_GROUP_RATE,
} from "@/lib/booking/constants";
import type { BookingPriceBreakdown } from "@/lib/booking/types";

interface PricingInput {
  unitPriceInr: number;
  adults: number;
  children: number;
  privateGroup: boolean;
  addonIds: string[];
  couponCode?: string;
  couponApplied?: boolean;
}

export function calculateBookingPrice(input: PricingInput): BookingPriceBreakdown {
  const adults = Math.max(0, input.adults);
  const children = Math.max(0, input.children);
  const travellersCount = adults + children;

  const basePrice = Math.round(
    input.unitPriceInr * adults + input.unitPriceInr * CHILD_RATE * children,
  );

  const privateGroupFee = input.privateGroup
    ? Math.round(basePrice * PRIVATE_GROUP_RATE)
    : 0;

  const addonsTotal = BOOKING_ADDONS.filter((addon) =>
    input.addonIds.includes(addon.id),
  ).reduce((sum, addon) => sum + addon.priceInr * Math.max(travellersCount, 1), 0);

  const subtotal = basePrice + privateGroupFee + addonsTotal;

  const normalizedCoupon = input.couponApplied
    ? input.couponCode?.trim().toUpperCase() ?? null
    : null;
  const coupon = normalizedCoupon ? BOOKING_COUPONS[normalizedCoupon] : undefined;
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;

  const taxable = Math.max(subtotal - discount, 0);
  const gst = Math.round(taxable * GST_RATE);
  const convenienceFee = Math.round(taxable * CONVENIENCE_RATE);
  const grandTotal = taxable + gst + convenienceFee;
  const advancePayment = Math.round(grandTotal * ADVANCE_RATE);
  const remainingAmount = Math.max(grandTotal - advancePayment, 0);

  return {
    basePrice,
    travellersCount,
    privateGroupFee,
    addonsTotal,
    subtotal,
    discount,
    couponCode: coupon ? normalizedCoupon : null,
    gst,
    convenienceFee,
    grandTotal,
    advancePayment,
    remainingAmount,
  };
}

export function createBookingId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `IHD-${stamp}-${rand}`;
}
