import type { BookingAddon } from "@/lib/booking/types";

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: "transportation",
    name: "Transportation",
    description: "Pickup & drop from the designated meeting point.",
    priceInr: 999,
  },
  {
    id: "backpack-rental",
    name: "Backpack Rental",
    description: "50–60L trekking backpack for the duration of the trek.",
    priceInr: 499,
  },
  {
    id: "trekking-pole",
    name: "Trekking Pole",
    description: "Pair of adjustable poles for steep sections.",
    priceInr: 299,
  },
  {
    id: "sleeping-bag",
    name: "Sleeping Bag",
    description: "Season-appropriate sleeping bag rental.",
    priceInr: 399,
  },
  {
    id: "travel-insurance",
    name: "Travel Insurance",
    description: "Basic trek insurance cover for the itinerary dates.",
    priceInr: 349,
  },
  {
    id: "meal-upgrade",
    name: "Meal Upgrade",
    description: "Premium vegetarian meal add-ons on camp days.",
    priceInr: 599,
  },
];

export const BOOKING_COUPONS: Record<
  string,
  { percent: number; label: string; minTravellers?: number }
> = {
  HIMALAYA10: { percent: 10, label: "Flat 10% off" },
  EXIT10: { percent: 10, label: "Exit offer 10% off" },
  IHD5: { percent: 5, label: "5% welcome discount" },
};

export const GST_RATE = 0.05;
export const CONVENIENCE_RATE = 0.02;
export const PRIVATE_GROUP_RATE = 0.2;
export const CHILD_RATE = 0.7;
export const ADVANCE_RATE = 0.3;

export const BATCH_OPTIONS = [
  { id: "morning", label: "Morning Batch (7:00 AM)" },
  { id: "afternoon", label: "Afternoon Batch (1:00 PM)" },
  { id: "weekend", label: "Weekend Special Batch" },
] as const;

export const TRUST_POINTS = [
  "Google Reviews",
  "Safety Certified",
  "Secure Payments",
  "Best Price Guarantee",
  "No Hidden Charges",
  "Expert Trek Leaders",
] as const;
