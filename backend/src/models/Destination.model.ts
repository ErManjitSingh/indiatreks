import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";
import { EnterpriseSeoSchema, type IEnterpriseSeo } from "./schemas/enterpriseSeo.schema";
import type { ISeo } from "./Trek.model";

export type DestinationStatus = "draft" | "published" | "archived";

export interface IDestination extends Document {
  _id: Types.ObjectId;
  slug: string;
  name: string;
  region: string;
  state: string;
  summary: string;
  description: string;
  coverImage: string;
  gallery: string[];
  trekCount: number;
  bestSeasons: string[];
  altitudeRange: { min: number; max: number };
  highlights: string[];
  travelGuide: string;
  howToReach?: string;
  weatherNotes: string;
  faqs?: Array<{ question: string; answer: string }>;
  seo: ISeo | IEnterpriseSeo;
  status: DestinationStatus;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema = new Schema<IDestination>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    region: { type: String, default: "", index: true },
    state: { type: String, default: "", index: true },
    summary: { type: String, default: "" },
    description: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    trekCount: { type: Number, default: 0 },
    bestSeasons: { type: [String], default: [] },
    altitudeRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    highlights: { type: [String], default: [] },
    travelGuide: { type: String, default: "" },
    howToReach: { type: String, default: "" },
    weatherNotes: { type: String, default: "" },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    seo: { type: EnterpriseSeoSchema, default: () => ({}) },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
  },
  { timestamps: true },
);

DestinationSchema.index({ name: "text", summary: "text", description: "text" });
DestinationSchema.index({ status: 1, deletedAt: 1, name: 1 });
softDeletePlugin(DestinationSchema);

export const DestinationModel = model<IDestination>("Destination", DestinationSchema);
