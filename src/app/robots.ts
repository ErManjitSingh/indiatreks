import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { fetchRobotsTxt } from "@/lib/api/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = siteConfig.url.replace(/\/$/, "");

  // Prefer backend-managed robots when available
  const remote = await fetchRobotsTxt();
  if (remote) {
    // MetadataRoute still needs structured output; mirror production defaults
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          "/private",
          "/checkout",
          "/wishlist",
          "/my-account",
          "/my-bookings",
          "/profile",
          "/payment-success",
          "/payment-failed",
        ],
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/sitemaps/treks.xml`,
      `${base}/sitemaps/blogs.xml`,
      `${base}/sitemaps/destinations.xml`,
      `${base}/sitemaps/images.xml`,
      `${base}/sitemaps/videos.xml`,
      `${base}/sitemaps/categories.xml`,
      `${base}/sitemaps/programmatic.xml`,
    ],
    host: base,
  };
}
