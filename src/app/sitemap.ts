import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAllTrekDetailSlugs } from "@/data/trek-details";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const trekPages = getAllTrekDetailSlugs().map((slug) => ({
    url: `${base}/treks/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/treks`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...trekPages,
  ];
}
