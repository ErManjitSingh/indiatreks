import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export interface IMedia extends Document {
  _id: Types.ObjectId;
  publicId: string;
  url: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  folder?: string;
  uploadedBy?: Types.ObjectId;
  alt?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    url: { type: String, required: true },
    format: { type: String },
    width: { type: Number },
    height: { type: Number },
    bytes: { type: Number },
    folder: { type: String, index: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    alt: { type: String },
  },
  { timestamps: true },
);

softDeletePlugin(MediaSchema);

export const MediaModel = model<IMedia>("Media", MediaSchema);
