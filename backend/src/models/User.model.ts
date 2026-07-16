import { Schema, model, Document, Types } from "mongoose";
import { ROLES, Role } from "../config/roles";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export interface IRefreshToken {
  token: string;
  expiresAt: Date;
  createdAt?: Date;
  userAgent?: string;
  ip?: string;
}

export type UserStatus = "active" | "blocked";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  passwordHash?: string;
  role: Role;
  isEmailVerified: boolean;
  googleId?: string;
  refreshTokens: IRefreshToken[];
  otp?: string;
  otpExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  avatar?: string;
  status: UserStatus;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    userAgent: { type: String },
    ip: { type: String },
  },
  { _id: false },
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, trim: true },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ROLES, default: "customer", index: true },
    isEmailVerified: { type: Boolean, default: false },
    googleId: { type: String, index: true, sparse: true },
    refreshTokens: { type: [RefreshTokenSchema], default: [] },
    otp: { type: String, select: false },
    otpExpires: { type: Date, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
    avatar: { type: String },
    status: { type: String, enum: ["active", "blocked"], default: "active" },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true },
);

UserSchema.index({ createdAt: -1 });
softDeletePlugin(UserSchema);

export const UserModel = model<IUser>("User", UserSchema);
