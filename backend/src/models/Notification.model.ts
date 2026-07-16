import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export interface INotification extends Document {
  _id: Types.ObjectId;
  user?: Types.ObjectId;
  title: string;
  body: string;
  type: string;
  read: boolean;
  data?: Record<string, unknown>;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", index: true },
    title: { type: String, required: true },
    body: { type: String, default: "" },
    type: { type: String, default: "general", index: true },
    read: { type: Boolean, default: false, index: true },
    data: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

softDeletePlugin(NotificationSchema);

export const NotificationModel = model<INotification>("Notification", NotificationSchema);
