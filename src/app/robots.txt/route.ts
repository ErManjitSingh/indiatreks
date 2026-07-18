import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { fetchRobotsTxt } from "@/lib/api/seo";

export const revalidate = 3600;

const FALLBACK = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /private
Disallow: /checkout
Disallow: /wishlist
Disallow: /my-account
Disallow: /my-bookings
Disallow: /profile
Disallow: /payment-success
Disallow: /payment-failed
Disallow: /login

Host: ${siteConfig.url.replace(/\/$/, "")}
Sitemap: ${siteConfig.url.replace(/\/$/, "")}/sitemap.xml
`;

export async function GET() {
  const remote = await fetchRobotsTxt();
  const body = remote?.trim() ? remote : FALLBACK;

  return new NextResponse(body.endsWith("\n") ? body : `${body}\n`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
