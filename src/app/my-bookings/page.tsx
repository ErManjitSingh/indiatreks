import type { Metadata } from "next";

import { MyBookingsClient } from "@/app/my-bookings/my-bookings-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "My bookings",
  description: "View and manage your trek bookings.",
  canonical: "/my-bookings",
  noIndex: true,
});

export default function MyBookingsPage() {
  return <MyBookingsClient />;
}
