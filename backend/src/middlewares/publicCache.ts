import type { Request, Response, NextFunction } from "express";

/**
 * Short CDN/browser cache for public GET APIs.
 * Skips authenticated requests so admin always sees fresh data.
 */
export function publicCache(maxAgeSeconds = 60, sMaxAgeSeconds = 300) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") return next();
    if (req.headers.authorization || req.cookies?.accessToken) {
      res.setHeader("Cache-Control", "private, no-store");
      return next();
    }
    res.setHeader(
      "Cache-Control",
      `public, max-age=${maxAgeSeconds}, s-maxage=${sMaxAgeSeconds}, stale-while-revalidate=600`,
    );
    next();
  };
}
