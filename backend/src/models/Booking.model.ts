import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface ITraveler {
  fullName: string;
  age?: number;
  gender?: "male" | "female" | "other";
  phone?: string;
  emergencyContact?: string;
}

export interface IBooking extends Document {
  _id: Types.ObjectId;
  bookingCode: string;
  user?: Types.ObjectId;
  trek: Types.ObjectId;
  trekSlug: string;
  trekTitle: string;
  departureDate: Date;
  travelers: ITraveler[];
  amount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  notes?: string;
  invoiceUrl?: string;
  voucherUrl?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const TravelerSchema = new Schema<ITraveler>(
  {
    fullName: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    phone: { type: String },
    emergencyContact: { type: String },
  },
  { _id: false },
);

const BookingSchema = new Schema<IBooking>(
  {
    bookingCode: { type: String, required: true, unique: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User", index: true },
    trek: { type: Schema.Types.ObjectId, ref: "Trek", required: true, index: true },
    trekSlug: { type: String, required: true, index: true },
    trekTitle: { type: String, required: true },
    departureDate: { type: Date, required: true },
    travelers: { type: [TravelerSchema], default: [] },
    amount: { type: Number, required: true, default: 0 },
    currency: { type: String, default: "INR" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
      index: true,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    notes: { type: String },
    invoiceUrl: { type: String },
    voucherUrl: { type: String },
  },
  { timestamps: true },
);

BookingSchema.index({ createdAt: -1 });
softDeletePlugin(BookingSchema);

export const BookingModel = model<IBooking>("Booking", BookingSchema);
