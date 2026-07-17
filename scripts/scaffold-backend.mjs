/**
 * Generates the IHD backend source tree.
 * Run: node scripts/scaffold-backend.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "../backend/src");

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart());
  console.log("write", rel);
}

write(
  "config/env.ts",
  `
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
  REDIS_URL: z.string().optional().or(z.literal("")),
  CLOUDINARY_CLOUD_NAME: z.string().optional().or(z.literal("")),
  CLOUDINARY_API_KEY: z.string().optional().or(z.literal("")),
  CLOUDINARY_API_SECRET: z.string().optional().or(z.literal("")),
  CLOUDINARY_FOLDER: z.string().default("indiaholidaydestinations"),
  SMTP_HOST: z.string().optional().or(z.literal("")),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((v) => v !== "false"),
  SMTP_USER: z.string().optional().or(z.literal("")),
  SMTP_PASS: z.string().optional().or(z.literal("")),
  MAIL_FROM: z.string().optional().or(z.literal("")),
  ENQUIRY_EMAIL: z.string().email().optional().or(z.literal("")),
  RAZORPAY_KEY_ID: z.string().optional().or(z.literal("")),
  RAZORPAY_KEY_SECRET: z.string().optional().or(z.literal("")),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional().or(z.literal("")),
  GOOGLE_CLIENT_ID: z.string().optional().or(z.literal("")),
  GOOGLE_CLIENT_SECRET: z.string().optional().or(z.literal("")),
  BCRYPT_ROUNDS: z.coerce.number().default(12),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(200),
  UPLOAD_MAX_MB: z.coerce.number().default(10),
  SEED_SUPERADMIN_EMAIL: z.string().email().optional(),
  SEED_SUPERADMIN_PASSWORD: z.string().optional(),
  SEED_SUPERADMIN_NAME: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const corsOrigins = env.CORS_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean);
`,
);

write(
  "config/roles.ts",
  `
export const ROLES = [
  "super_admin",
  "admin",
  "seo_manager",
  "booking_manager",
  "content_manager",
  "operations_manager",
  "sales_manager",
  "support_executive",
  "viewer",
  "customer",
] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS = {
  "users.read": ["super_admin", "admin", "support_executive", "viewer"],
  "users.write": ["super_admin", "admin"],
  "treks.read": ["super_admin", "admin", "content_manager", "seo_manager", "viewer", "operations_manager"],
  "treks.write": ["super_admin", "admin", "content_manager"],
  "destinations.write": ["super_admin", "admin", "content_manager"],
  "blogs.write": ["super_admin", "admin", "content_manager", "seo_manager"],
  "bookings.read": ["super_admin", "admin", "booking_manager", "operations_manager", "sales_manager", "support_executive", "viewer"],
  "bookings.write": ["super_admin", "admin", "booking_manager", "operations_manager", "sales_manager"],
  "payments.read": ["super_admin", "admin", "booking_manager", "sales_manager"],
  "payments.write": ["super_admin", "admin", "booking_manager"],
  "coupons.write": ["super_admin", "admin", "sales_manager"],
  "reviews.moderate": ["super_admin", "admin", "content_manager", "support_executive"],
  "media.write": ["super_admin", "admin", "content_manager"],
  "seo.write": ["super_admin", "admin", "seo_manager", "content_manager"],
  "settings.write": ["super_admin", "admin"],
  "analytics.read": ["super_admin", "admin", "sales_manager", "viewer", "booking_manager"],
  "enquiries.read": ["super_admin", "admin", "sales_manager", "support_executive", "operations_manager"],
  "enquiries.write": ["super_admin", "admin", "sales_manager", "support_executive"],
} as const;

export type Permission = keyof typeof PERMISSIONS;

export function roleHasPermission(role: Role, permission: Permission): boolean {
  if (role === "super_admin") return true;
  const allowed = PERMISSIONS[permission] as readonly string[];
  return allowed.includes(role);
}
`,
);

write(
  "utils/logger.ts",
  `
import fs from "node:fs";
import path from "node:path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { env } from "../config/env";

const logsDir = path.join(process.cwd(), "logs");
fs.mkdirSync(logsDir, { recursive: true });

export const logger = winston.createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: "ihd-api" },
  transports: [
    new DailyRotateFile({
      dirname: logsDir,
      filename: "app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      zippedArchive: true,
    }),
    new DailyRotateFile({
      dirname: logsDir,
      filename: "error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "60d",
      zippedArchive: true,
    }),
  ],
});

if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}
`,
);

write(
  "utils/ApiError.ts",
  `
export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;
  isOperational: boolean;

  constructor(statusCode: number, message: string, code = "ERROR", details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
`,
);

write(
  "utils/asyncHandler.ts",
  `
import type { NextFunction, Request, Response } from "express";

type AsyncRoute = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncHandler =
  (fn: AsyncRoute) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
`,
);

write(
  "utils/response.ts",
  `
import type { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200,
  meta?: Record<string, unknown>,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  meta: { page: number; limit: number; total: number; totalPages: number },
  message = "Success",
) {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta,
  });
}
`,
);

write(
  "utils/pagination.ts",
  `
export function getPagination(query: Record<string, unknown>) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function paginateMeta(total: number, page: number, limit: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}
`,
);

write(
  "utils/slugify.ts",
  `
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "")
    .replace(/\\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
`,
);

console.log("phase1 done");
`,
);

fs.writeFileSync(
  path.join(__dirname, "scaffold-backend.mjs"),
  fs.readFileSync(path.join(__dirname, "scaffold-backend.mjs"), "utf8"),
);
