import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { userRepository } from "../repositories/UserRepository";
import { tokenService } from "./token.service";
import { emailService } from "./email.service";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";
import { IUser } from "../models/User.model";
import { RegisterInput, LoginInput } from "../validators/auth.validator";

function sanitizeUser(user: IUser) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
    status: user.status,
    createdAt: user.createdAt,
  };
}

interface AuthContext {
  userAgent?: string;
  ip?: string;
}

async function issueTokens(user: IUser, ctx: AuthContext = {}) {
  const accessToken = tokenService.signAccess({ id: String(user._id), role: user.role, email: user.email });
  const { token: refreshToken } = tokenService.signRefresh({ id: String(user._id) });
  const expiresAt = tokenService.refreshExpiryDate();
  await userRepository.addRefreshToken(String(user._id), refreshToken, expiresAt, ctx.userAgent, ctx.ip);
  return { accessToken, refreshToken };
}

async function register(input: RegisterInput, ctx: AuthContext = {}) {
  const existing = await userRepository.findByEmail(input.email);
  if (existing) {
    throw new ApiError(409, "An account with this email already exists", "EMAIL_IN_USE");
  }

  const passwordHash = await bcrypt.hash(input.password, env.BCRYPT_ROUNDS);
  const otp = generateOtp();

  const user = await userRepository.create({
    name: input.name,
    email: input.email,
    phone: input.phone,
    passwordHash,
    role: "customer",
    otp,
    otpExpires: new Date(Date.now() + 10 * 60 * 1000),
  } as Partial<IUser>);

  await emailService.sendOtpEmail(user.email, otp);

  const tokens = await issueTokens(user, ctx);
  return { user: sanitizeUser(user), ...tokens };
}

async function login(input: LoginInput, ctx: AuthContext = {}) {
  const user = await userRepository.findByEmail(input.email, true);
  if (!user || !user.passwordHash) {
    throw new ApiError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }
  if (user.status === "blocked") {
    throw new ApiError(403, "Your account has been blocked", "ACCOUNT_BLOCKED");
  }

  const isValid = await bcrypt.compare(input.password, user.passwordHash);
  if (!isValid) {
    throw new ApiError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  const tokens = await issueTokens(user, ctx);
  return { user: sanitizeUser(user), ...tokens };
}

async function refresh(refreshToken: string, ctx: AuthContext = {}) {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token is required", "REFRESH_TOKEN_REQUIRED");
  }
  const payload = tokenService.verifyRefresh(refreshToken);
  const user = await userRepository.findById(payload.sub);
  if (!user) {
    throw new ApiError(401, "User no longer exists", "UNAUTHENTICATED");
  }

  const tokenExists = user.refreshTokens.some((rt) => rt.token === refreshToken && rt.expiresAt > new Date());
  if (!tokenExists) {
    throw new ApiError(401, "Refresh token is invalid or expired", "INVALID_REFRESH_TOKEN");
  }

  await userRepository.removeRefreshToken(String(user._id), refreshToken);
  const tokens = await issueTokens(user, ctx);
  return { user: sanitizeUser(user), ...tokens };
}

async function logout(userId: string, refreshToken?: string) {
  if (refreshToken) {
    await userRepository.removeRefreshToken(userId, refreshToken);
  } else {
    await userRepository.clearRefreshTokens(userId);
  }
  return true;
}

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendOtp(email: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new ApiError(404, "No account found with this email", "USER_NOT_FOUND");
  }
  const otp = generateOtp();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  await emailService.sendOtpEmail(user.email, otp);
  return true;
}

async function verifyEmail(userId: string, otp: string) {
  const target = await userRepository.findByIdWithSecrets(userId);
  if (!target || !target.otp || !target.otpExpires) {
    throw new ApiError(400, "No verification code was requested", "OTP_NOT_FOUND");
  }
  if (target.otp !== otp || target.otpExpires < new Date()) {
    throw new ApiError(400, "Verification code is invalid or expired", "INVALID_OTP");
  }
  target.isEmailVerified = true;
  target.otp = undefined;
  target.otpExpires = undefined;
  await target.save();
  return true;
}

async function forgotPassword(email: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    return true;
  }
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = tokenService.hashToken(rawToken);
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);
  await user.save();

  const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${rawToken}`;
  await emailService.sendResetPasswordEmail(user.email, resetUrl);
  return true;
}

async function resetPassword(rawToken: string, newPassword: string) {
  const hashedToken = tokenService.hashToken(rawToken);
  const user = await userRepository.findByResetToken(hashedToken);
  if (!user) {
    throw new ApiError(400, "Reset token is invalid or expired", "INVALID_RESET_TOKEN");
  }

  user.passwordHash = await bcrypt.hash(newPassword, env.BCRYPT_ROUNDS);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.refreshTokens = [];
  await user.save();
  return true;
}

async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await userRepository.findByIdWithSecrets(userId);
  if (!user || !user.passwordHash) {
    throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  }
  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) {
    throw new ApiError(401, "Current password is incorrect", "INVALID_CREDENTIALS");
  }
  user.passwordHash = await bcrypt.hash(newPassword, env.BCRYPT_ROUNDS);
  await user.save();
  return true;
}

export const authService = {
  register,
  login,
  refresh,
  logout,
  sendOtp,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  sanitizeUser,
};
