import type { Metadata } from "next";

import { WishlistClient } from "@/app/wishlist/wishlist-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Wishlist",
  description: "Saved treks on India Holiday Destinations.",
  canonical: "/wishlist",
  noIndex: true,
});

export default function WishlistPage() {
  return <WishlistClient />;
}
