import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type ContactStatus = "new" | "read" | "replied";

export interface IContact extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: ContactStatus;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "read", "replied"], default: "new", index: true },
  },
  { timestamps: true },
);

softDeletePlugin(ContactSchema);

export const ContactModel = model<IContact>("Contact", ContactSchema);
