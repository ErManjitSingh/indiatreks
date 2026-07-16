import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/about-page-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About Us | Our Story & Safety",
  description:
    "Learn about India Holiday Destinations — Himalayan trekking experts with 15+ years experience, certified trek leaders, and uncompromising safety standards.",
  canonical: "/about",
  keywords: [
    "about India Holiday Destinations",
    "Himalayan trekking company",
    "trek safety standards India",
    "certified trek leaders",
  ],
});

export default function AboutPage() {
  return <AboutPageContent />;
}
