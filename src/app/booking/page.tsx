import type { Metadata } from "next";

import { BookingHubClient } from "@/app/booking/booking-hub-client";
import { createMetadata } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = createMetadata({
  title: "Book a trek",
  description: "Start your Himalayan trek booking with India Holiday Destinations.",
  canonical: "/booking",
  noIndex: true,
});

export default function BookingPage() {
  return <BookingHubClient />;
}
