import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type SchemaTemplateType =
  | "Organization"
  | "WebSite"
  | "BreadcrumbList"
  | "FAQPage"
  | "Article"
  | "BlogPosting"
  | "ImageObject"
  | "TouristDestination"
  | "TouristTrip"
  | "Offer"
  | "Review"
  | "AggregateRating"
  | "Product"
  | "ItemList";

export interface ISchemaTemplate extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  schemaType: SchemaTemplateType;
  entityType: "global" | "trek" | "blog" | "destination" | "programmatic";
  template: Record<string, unknown>;
  isActive: boolean;
  description?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const SchemaTemplateSchema = new Schema<ISchemaTemplate>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    schemaType: {
      type: String,
      enum: [
        "Organization",
        "WebSite",
        "BreadcrumbList",
        "FAQPage",
        "Article",
        "BlogPosting",
        "ImageObject",
        "TouristDestination",
        "TouristTrip",
        "Offer",
        "Review",
        "AggregateRating",
        "Product",
        "ItemList",
      ],
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: ["global", "trek", "blog", "destination", "programmatic"],
      default: "global",
      index: true,
    },
    template: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true, collection: "schema_templates" },
);

softDeletePlugin(SchemaTemplateSchema);

export const SchemaTemplateModel = model<ISchemaTemplate>("SchemaTemplate", SchemaTemplateSchema);
