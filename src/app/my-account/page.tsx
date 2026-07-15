import type { Metadata } from "next";

import { MyAccountClient } from "@/app/my-account/my-account-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "My account",
  description: "Manage your India Holiday Destinations bookings, wishlist, and profile.",
  canonical: "/my-account",
  noIndex: true,
});

export default function MyAccountPage() {
  return <MyAccountClient />;
}
