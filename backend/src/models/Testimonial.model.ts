import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type TestimonialStatus = "pending" | "approved" | "rejected";

export interface ITestimonial extends Document {
  _id: Types.ObjectId;
  name: string;
  role?: string;
  comment: string;
  rating: number;
  avatar?: string;
  featured: boolean;
  status: TestimonialStatus;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String },
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatar: { type: String },
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
  },
  { timestamps: true },
);

softDeletePlugin(TestimonialSchema);

export const TestimonialModel = model<ITestimonial>("Testimonial", TestimonialSchema);
