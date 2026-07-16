import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type EnquiryStatus = "new" | "contacted" | "converted" | "closed";

export interface IEnquiry extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  trekSlug?: string;
  trekTitle?: string;
  preferredDate?: Date;
  travelers?: number;
  message?: string;
  status: EnquiryStatus;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    trekSlug: { type: String, index: true },
    trekTitle: { type: String },
    preferredDate: { type: Date },
    travelers: { type: Number, default: 1 },
    message: { type: String },
    status: { type: String, enum: ["new", "contacted", "converted", "closed"], default: "new", index: true },
  },
  { timestamps: true },
);

softDeletePlugin(EnquirySchema);

export const EnquiryModel = model<IEnquiry>("Enquiry", EnquirySchema);
