import { Schema, model, Document, Types } from "mongoose";

export interface ISetting extends Document {
  _id: Types.ObjectId;
  key: string;
  value: unknown;
  group?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema.Types.Mixed },
    group: { type: String, index: true },
  },
  { timestamps: true },
);

export const SettingModel = model<ISetting>("Setting", SettingSchema);
