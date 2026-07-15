import type { Metadata } from "next";

import { DestinationsMobilePage } from "@/components/destinations/destinations-mobile-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Destinations | Explore India",
  description:
    "Discover Himalayan trekking destinations across Himachal, Uttarakhand, Ladakh, Kashmir and Sikkim.",
  canonical: "/destinations",
});

export default function DestinationsPage() {
  return <DestinationsMobilePage />;
}
