import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export interface ISeoPage extends Document {
  _id: Types.ObjectId;
  path: string;
  metaTitle: string;
  metaDescription: string;
  canonical?: string;
  ogImage?: string;
  robots?: string;
  schemaJson?: Record<string, unknown>;
  twitterCard?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const SeoPageSchema = new Schema<ISeoPage>(
  {
    path: { type: String, required: true, unique: true, index: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    canonical: { type: String },
    ogImage: { type: String },
    robots: { type: String, default: "index,follow" },
    schemaJson: { type: Schema.Types.Mixed },
    twitterCard: { type: String, default: "summary_large_image" },
  },
  { timestamps: true },
);

softDeletePlugin(SeoPageSchema);

export const SeoPageModel = model<ISeoPage>("SeoPage", SeoPageSchema);
