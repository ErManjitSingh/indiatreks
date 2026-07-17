import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export interface ISeoTemplate extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  category: "meta" | "faq" | "landing" | "blog" | "image" | "schema";
  entityType: "trek" | "blog" | "destination" | "category" | "programmatic" | "global";
  template: Record<string, unknown>;
  isDefault: boolean;
  description?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const SeoTemplateSchema = new Schema<ISeoTemplate>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      enum: ["meta", "faq", "landing", "blog", "image", "schema"],
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: ["trek", "blog", "destination", "category", "programmatic", "global"],
      default: "global",
      index: true,
    },
    template: { type: Schema.Types.Mixed, required: true },
    isDefault: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true, collection: "seo_templates" },
);

softDeletePlugin(SeoTemplateSchema);

export const SeoTemplateModel = model<ISeoTemplate>("SeoTemplate", SeoTemplateSchema);
