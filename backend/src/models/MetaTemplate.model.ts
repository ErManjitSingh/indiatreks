import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type MetaTemplateEntity =
  | "trek"
  | "blog"
  | "destination"
  | "programmatic"
  | "homepage"
  | "category";

export interface IMetaTemplate extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  entityType: MetaTemplateEntity;
  titleTemplate: string;
  descriptionTemplate: string;
  keywordsTemplate?: string;
  canonicalTemplate?: string;
  ogTitleTemplate?: string;
  ogDescriptionTemplate?: string;
  isDefault: boolean;
  variables: string[];
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const MetaTemplateSchema = new Schema<IMetaTemplate>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    entityType: {
      type: String,
      enum: ["trek", "blog", "destination", "programmatic", "homepage", "category"],
      required: true,
      index: true,
    },
    titleTemplate: { type: String, required: true },
    descriptionTemplate: { type: String, required: true },
    keywordsTemplate: { type: String },
    canonicalTemplate: { type: String },
    ogTitleTemplate: { type: String },
    ogDescriptionTemplate: { type: String },
    isDefault: { type: Boolean, default: false },
    variables: { type: [String], default: [] },
  },
  { timestamps: true, collection: "meta_templates" },
);

MetaTemplateSchema.index({ entityType: 1, isDefault: 1 });
softDeletePlugin(MetaTemplateSchema);

export const MetaTemplateModel = model<IMetaTemplate>("MetaTemplate", MetaTemplateSchema);
