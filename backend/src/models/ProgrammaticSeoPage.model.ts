import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";
import { EnterpriseSeoSchema, IEnterpriseSeo } from "./schemas/enterpriseSeo.schema";

export type ProgrammaticFilterType =
  | "region"
  | "destination"
  | "difficulty"
  | "duration"
  | "season"
  | "month"
  | "trekType"
  | "custom";

export interface IProgrammaticSeoPage extends Document {
  _id: Types.ObjectId;
  slug: string;
  path: string;
  title: string;
  headline: string;
  summary: string;
  content: string;
  filterType: ProgrammaticFilterType;
  filterValue: string;
  filterQuery: Record<string, unknown>;
  faqs: Array<{ question: string; answer: string }>;
  seo: IEnterpriseSeo;
  status: "draft" | "published" | "archived";
  sortOrder: number;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProgrammaticSeoPageSchema = new Schema<IProgrammaticSeoPage>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    path: { type: String, required: true, unique: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    headline: { type: String, default: "" },
    summary: { type: String, default: "" },
    content: { type: String, default: "" },
    filterType: {
      type: String,
      enum: ["region", "destination", "difficulty", "duration", "season", "month", "trekType", "custom"],
      required: true,
      index: true,
    },
    filterValue: { type: String, required: true, index: true },
    filterQuery: { type: Schema.Types.Mixed, default: {} },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    seo: { type: EnterpriseSeoSchema, default: () => ({}) },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
      index: true,
    },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "programmatic_seo_pages" },
);

ProgrammaticSeoPageSchema.index({ status: 1, filterType: 1 });
softDeletePlugin(ProgrammaticSeoPageSchema);

export const ProgrammaticSeoPageModel = model<IProgrammaticSeoPage>(
  "ProgrammaticSeoPage",
  ProgrammaticSeoPageSchema,
);
