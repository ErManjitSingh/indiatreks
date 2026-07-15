export type BookingGender = "male" | "female" | "other";

export type BookingFlowStep = 0 | 1 | 2 | 3 | 4;

export type PaymentMethodId =
  | "razorpay"
  | "phonepe"
  | "upi"
  | "credit-card"
  | "debit-card"
  | "net-banking"
  | "wallet";

export type LocalBookingStatus = "upcoming" | "completed" | "cancelled";
export type LocalPaymentStatus = "pending" | "paid" | "failed" | "partial";

export interface TravellerDetails {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  emergencyContact: string;
  age: string;
  gender: BookingGender | "";
  nationality: string;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  priceInr: number;
}

export interface BookingPriceBreakdown {
  basePrice: number;
  travellersCount: number;
  privateGroupFee: number;
  addonsTotal: number;
  subtotal: number;
  discount: number;
  couponCode: string | null;
  gst: number;
  convenienceFee: number;
  grandTotal: number;
  advancePayment: number;
  remainingAmount: number;
}

export interface BookingDraft {
  trekSlug: string;
  trekTitle: string;
  departureId: string;
  departureDate: string;
  batchLabel: string;
  adults: number;
  children: number;
  privateGroup: boolean;
  traveller: TravellerDetails;
  addonIds: string[];
  couponCode: string;
  couponApplied: boolean;
  termsAccepted: boolean;
  paymentMethod: PaymentMethodId | null;
  step: BookingFlowStep;
}

export interface SavedBooking {
  id: string;
  trekSlug: string;
  trekTitle: string;
  departureDate: string;
  batchLabel: string;
  adults: number;
  children: number;
  privateGroup: boolean;
  traveller: TravellerDetails;
  addonIds: string[];
  couponCode: string | null;
  pricing: BookingPriceBreakdown;
  status: LocalBookingStatus;
  paymentStatus: LocalPaymentStatus;
  paymentMethod: PaymentMethodId | null;
  createdAt: string;
}

export const emptyTraveller = (): TravellerDetails => ({
  fullName: "",
  phone: "",
  email: "",
  city: "",
  emergencyContact: "",
  age: "",
  gender: "",
  nationality: "Indian",
});
