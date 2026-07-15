import type { Metadata } from "next";

import { HomePage } from "@/components/home";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  canonical: "/",
  keywords: [
    "India treks",
    "Himalayan trekking",
    "weekend treks India",
    "winter treks",
    "Kedarkantha",
    "Hampta Pass",
    "Spiti trek",
    "India Holiday Destinations",
  ],
});

export default function Page() {
  return <HomePage />;
}
