import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";
import { ISeo } from "./Trek.model";

export type BlogStatus = "draft" | "published" | "scheduled";

export interface IBlog extends Document {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
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
  seo: ISeo;
  readingTimeMinutes: number;
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
    seo: {
      title: { type: String },
      description: { type: String },
      canonical: { type: String },
      ogImage: { type: String },
    },
    readingTimeMinutes: { type: Number, default: 3 },
  },
  { timestamps: true },
);

BlogSchema.index({ title: "text", excerpt: "text", content: "text" });
softDeletePlugin(BlogSchema);

export const BlogModel = model<IBlog>("Blog", BlogSchema);
