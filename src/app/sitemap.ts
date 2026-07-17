import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAllTrekDetailSlugs } from "@/data/trek-details";

const PROGRAMMATIC_SLUGS = [
  "himachal",
  "manali",
  "dharamshala",
  "kullu",
  "spiti",
  "easy",
  "moderate",
  "difficult",
  "3-days",
  "4-days",
  "winter",
  "summer",
  "may",
  "june",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/treks`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const trekPages = getAllTrekDetailSlugs().map((slug) => ({
    url: `${base}/treks/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const programmaticPages = PROGRAMMATIC_SLUGS.map((slug) => ({
    url: `${base}/treks/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...trekPages, ...programmaticPages];
}
