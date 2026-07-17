import rateLimit from "express-rate-limit";
import type { Request } from "express";
import { env } from "../config/env";

function isLoopback(req: Request) {
  const ip = String(req.ip || "");
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "::ffff:127.0.0.1" ||
    ip.endsWith("127.0.0.1")
  );
}

function skipHotPublicPaths(req: Request) {
  // Next.js SSR on the same host must not share the public rate-limit bucket.
  if (isLoopback(req)) return true;

  const path = req.path;
  if (
    path === "/health" ||
    path.startsWith("/health/") ||
    path === "/content/bootstrap" ||
    path.startsWith("/content/")
  ) {
    return true;
  }

  // Public blog reads are high-churn during SSR (listing + detail + hub + related).
  if (req.method === "GET" && (path === "/blogs" || path.startsWith("/blogs/"))) {
    return true;
  }

  return false;
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

/** Stricter limit for AI SEO generation endpoints */
export const aiSeoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many AI SEO requests, please try again later.",
    code: "AI_SEO_RATE_LIMITED",
  },
});
