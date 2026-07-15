import type { Metadata } from "next";
import { Suspense } from "react";

import { PaymentSuccessClient } from "@/app/payment-success/payment-success-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Payment successful",
  description: "Your trek booking advance payment was successful.",
  canonical: "/payment-success",
  noIndex: true,
});

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F7F8F6] py-20 text-center text-sm text-muted-foreground">
          Loading confirmation…
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
