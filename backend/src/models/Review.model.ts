import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface IReview extends Document {
  _id: Types.ObjectId;
  trek: Types.ObjectId;
  user?: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
  verified: boolean;
  status: ReviewStatus;
  helpfulCount: number;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    trek: { type: Schema.Types.ObjectId, ref: "Trek", required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

softDeletePlugin(ReviewSchema);

export const ReviewModel = model<IReview>("Review", ReviewSchema);
