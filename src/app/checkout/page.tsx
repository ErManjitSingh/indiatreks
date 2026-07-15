import type { Metadata } from "next";

import { CheckoutClient } from "@/app/checkout/checkout-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Checkout",
  description: "Secure checkout for your India Holiday Destinations trek booking.",
  canonical: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
