import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  API_PREFIX: z.string().default("/api/v1"),
  APP_NAME: z.string().default("India Holiday Destinations API"),
  APP_URL: z.string().default("http://localhost:4000"),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  ADMIN_URL: z.string().optional(),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  MONGODB_URI: z.string().min(1),
  MONGODB_DB: z.string().default("indiaholidaydestinations"),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXPIRES: z.string().default("15m"),
  JWT_REFRESH_EXPIRES: z.string().default("7d"),
  REDIS_URL: z.string().optional().default(""),
  CLOUDINARY_CLOUD_NAME: z.string().optional().default(""),
  CLOUDINARY_API_KEY: z.string().optional().default(""),
  CLOUDINARY_API_SECRET: z.string().optional().default(""),
  CLOUDINARY_FOLDER: z.string().default("indiaholidaydestinations"),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_SECURE: z.string().optional().default("true"),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  MAIL_FROM: z.string().optional().default(""),
  ENQUIRY_EMAIL: z.string().optional().default(""),
  RAZORPAY_KEY_ID: z.string().optional().default(""),
  RAZORPAY_KEY_SECRET: z.string().optional().default(""),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional().default(""),
  GOOGLE_CLIENT_ID: z.string().optional().default(""),
  GOOGLE_CLIENT_SECRET: z.string().optional().default(""),
  GOOGLE_CALLBACK_URL: z.string().optional().default(""),
  GOOGLE_OAUTH_REDIRECT_URI: z.string().optional().default(""),
  GOOGLE_PAGESPEED_API_KEY: z.string().optional().default(""),
  SESSION_SECRET: z.string().optional().default(""),
  TOKEN_ENCRYPTION_KEY: z.string().optional().default(""),
  BCRYPT_ROUNDS: z.coerce.number().default(12),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(200),
  UPLOAD_MAX_MB: z.coerce.number().default(10),
  SEED_SUPERADMIN_EMAIL: z.string().optional(),
  SEED_SUPERADMIN_PASSWORD: z.string().optional(),
  SEED_SUPERADMIN_NAME: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  SMTP_SECURE_BOOL: parsed.data.SMTP_SECURE !== "false",
};
export const corsOrigins = env.CORS_ORIGINS.split(",")
  .map((s) => s.trim())
  .filter(Boolean);
