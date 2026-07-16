import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type PaymentGatewayStatus = "created" | "authorized" | "captured" | "failed" | "refunded";

export interface IPayment extends Document {
  _id: Types.ObjectId;
  booking: Types.ObjectId;
  orderId: string;
  paymentId?: string;
  amount: number;
  currency: string;
  method?: string;
  status: PaymentGatewayStatus;
  raw?: Record<string, unknown>;
  refundId?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    orderId: { type: String, required: true, index: true },
    paymentId: { type: String, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    method: { type: String },
    status: {
      type: String,
      enum: ["created", "authorized", "captured", "failed", "refunded"],
      default: "created",
      index: true,
    },
    raw: { type: Schema.Types.Mixed },
    refundId: { type: String },
  },
  { timestamps: true },
);

softDeletePlugin(PaymentSchema);

export const PaymentModel = model<IPayment>("Payment", PaymentSchema);
