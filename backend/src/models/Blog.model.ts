import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";
import { EnterpriseSeoSchema, type IEnterpriseSeo } from "./schemas/enterpriseSeo.schema";
import type { ISeo } from "./Trek.model";

export type BlogStatus = "draft" | "published" | "scheduled";

export interface IBlogGalleryImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface IBlogRelatedRef {
  slug: string;
  title?: string;
}

export interface IBlogInternalLink {
  title: string;
  url: string;
  anchor?: string;
}

export interface IBlog extends Document {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  gallery?: IBlogGalleryImage[];
  author: {
    name: string;
    avatar?: string;
    bio?: string;
    userId?: Types.ObjectId;
  };
  category: string;
  tags: string[];
  status: BlogStatus;
  publishedAt?: Date | null;
  scheduledAt?: Date | null;
  seo: ISeo | IEnterpriseSeo;
  readingTimeMinutes: number;
  tableOfContents?: Array<{ id: string; title: string; level: number }>;
  internalLinks?: IBlogInternalLink[];
  faq?: Array<{ question: string; answer: string }>;
  relatedTreks?: IBlogRelatedRef[];
  relatedDestinations?: IBlogRelatedRef[];
  relatedBlogs?: IBlogRelatedRef[];
  featured?: boolean;
  views?: number;
  modifiedAt?: Date | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    gallery: [
      {
        url: { type: String, required: true },
        alt: { type: String },
        caption: { type: String },
      },
    ],
    author: {
      name: { type: String, default: "" },
      avatar: { type: String },
      bio: { type: String },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
    category: { type: String, default: "", index: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published", "scheduled"], default: "draft", index: true },
    publishedAt: { type: Date, default: null },
    scheduledAt: { type: Date, default: null },
    seo: { type: EnterpriseSeoSchema, default: () => ({}) },
    readingTimeMinutes: { type: Number, default: 3 },
    tableOfContents: [
      {
        id: { type: String },
        title: { type: String },
        level: { type: Number, default: 2 },
      },
    ],
    internalLinks: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        anchor: { type: String },
      },
    ],
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    relatedTreks: [{ slug: { type: String, required: true }, title: { type: String } }],
    relatedDestinations: [{ slug: { type: String, required: true }, title: { type: String } }],
    relatedBlogs: [{ slug: { type: String, required: true }, title: { type: String } }],
    featured: { type: Boolean, default: false, index: true },
    views: { type: Number, default: 0, index: true },
    modifiedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

BlogSchema.index({ title: "text", excerpt: "text", content: "text" });
softDeletePlugin(BlogSchema);

export const BlogModel = model<IBlog>("Blog", BlogSchema);
