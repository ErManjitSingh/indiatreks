import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { fetchSitemapXml } from "@/lib/api/seo";

export const revalidate = 3600;

/** Serve the backend sitemap index (treks, blogs, destinations, images, …). */
export async function GET() {
  const base = siteConfig.url.replace(/\/$/, "");
  const xml = await fetchSitemapXml("index");

  if (!xml) {
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}/sitemaps/treks.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemaps/blogs.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemaps/destinations.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemaps/images.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemaps/videos.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemaps/categories.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemaps/programmatic.xml</loc></sitemap>
</sitemapindex>`;
    return new NextResponse(fallback, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
