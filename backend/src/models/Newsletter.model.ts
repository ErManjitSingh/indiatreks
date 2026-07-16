import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type NewsletterStatus = "subscribed" | "unsubscribed";

export interface INewsletter extends Document {
  _id: Types.ObjectId;
  email: string;
  status: NewsletterStatus;
  source?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    status: { type: String, enum: ["subscribed", "unsubscribed"], default: "subscribed", index: true },
    source: { type: String },
  },
  { timestamps: true },
);

softDeletePlugin(NewsletterSchema);

export const NewsletterModel = model<INewsletter>("Newsletter", NewsletterSchema);
