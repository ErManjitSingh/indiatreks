import { Schema, model, Document, Types } from "mongoose";

export interface IAnalyticsConfig extends Document {
  _id: Types.ObjectId;
  key: string;
  ga4: {
    enabled: boolean;
    measurementId?: string;
    propertyId?: string;
  };
  gtm: {
    enabled: boolean;
    containerId?: string;
  };
  metaPixel: {
    enabled: boolean;
    pixelId?: string;
  };
  clarity: {
    enabled: boolean;
    projectId?: string;
  };
  customScripts: Array<{
    name: string;
    position: "head" | "body_start" | "body_end";
    script: string;
    enabled: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const AnalyticsConfigSchema = new Schema<IAnalyticsConfig>(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    ga4: {
      enabled: { type: Boolean, default: false },
      measurementId: { type: String },
      propertyId: { type: String },
    },
    gtm: {
      enabled: { type: Boolean, default: false },
      containerId: { type: String },
    },
    metaPixel: {
      enabled: { type: Boolean, default: false },
      pixelId: { type: String },
    },
    clarity: {
      enabled: { type: Boolean, default: false },
      projectId: { type: String },
    },
    customScripts: [
      {
        name: { type: String, required: true },
        position: { type: String, enum: ["head", "body_start", "body_end"], default: "head" },
        script: { type: String, required: true },
        enabled: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true, collection: "analytics" },
);

export const AnalyticsConfigModel = model<IAnalyticsConfig>("AnalyticsConfig", AnalyticsConfigSchema);
