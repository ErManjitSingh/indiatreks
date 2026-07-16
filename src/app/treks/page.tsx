import type { Metadata } from "next";

import { TreksPageContent } from "@/components/treks";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { getTrekListings } from "@/services/treks.service";

export const revalidate = 3600;

export const metadata: Metadata = createMetadata({
  title: "Himalayan Treks",
  description:
    "Explore premium Himalayan treks with India Holiday Destinations. Filter by destination, difficulty, duration, season, altitude, and budget.",
  canonical: "/treks",
  keywords: [
    "Himalayan treks",
    "India trekking packages",
    "Triund trek",
    "Hampta Pass",
    "Kedarkantha trek",
    "weekend treks Himachal",
    siteConfig.name,
  ],
  ogImage: "/images/og-default.jpg",
});

export default async function TreksPage() {
  const treks = await getTrekListings({ limit: 100 });
  return <TreksPageContent treks={treks} />;
}
