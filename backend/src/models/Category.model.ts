import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type CategoryType = "trek" | "blog";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  slug: string;
  name: string;
  type: CategoryType;
  description?: string;
  image?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    slug: { type: String, required: true, lowercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["trek", "blog"], required: true, index: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

CategorySchema.index({ slug: 1, type: 1 }, { unique: true });
softDeletePlugin(CategorySchema);

export const CategoryModel = model<ICategory>("Category", CategorySchema);
