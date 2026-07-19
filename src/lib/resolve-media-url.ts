import { siteConfig } from "@/config/site";

function mediaOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return siteConfig.url.replace(/\/$/, "");
}

/**
 * Normalize media URLs for `next/image`.
 * Local API uploads were historically stored as `/api/uploads/...` (relative).
 * Relative paths are resolved against `public/`, so they must become absolute.
 */
export function resolveMediaUrl(src: string | null | undefined): string {
  if (!src) return "";
  const trimmed = String(src).trim();
  if (!trimmed) return "";
  if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed;

  if (trimmed.startsWith("/api/uploads/") || trimmed.startsWith("/uploads/")) {
    const path = trimmed.startsWith("/uploads/") ? `/api${trimmed}` : trimmed;
    return `${mediaOrigin()}${path}`;
  }

  return trimmed;
}

export function resolveMediaUrls(urls: string[] | null | undefined): string[] {
  if (!Array.isArray(urls)) return [];
  return urls.map(resolveMediaUrl).filter(Boolean);
}
