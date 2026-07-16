import rateLimit from "express-rate-limit";
import type { Request } from "express";
import { env } from "../config/env";

function skipHotPublicPaths(req: Request) {
  const path = req.path;
  return (
    path === "/health" ||
    path.startsWith("/health/") ||
    path === "/content/bootstrap" ||
    path.startsWith("/content/")
  );
}

export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipHotPublicPaths,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
    code: "RATE_LIMITED",
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
    code: "AUTH_RATE_LIMITED",
  },
});
