import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Mail, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Payment failed",
  description: "Your payment could not be completed. Retry or contact support.",
  canonical: "/payment-failed",
  noIndex: true,
});

export default function PaymentFailedPage() {
  return (
    <section className="bg-[#F7F8F6] py-14 md:py-20">
      <Container className="max-w-lg">
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="font-heading mt-5 text-2xl font-bold text-[#1A1A1A]">
            Payment failed
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We could not process your advance payment. No amount was charged. You can retry
            checkout or reach our support team.
          </p>

          <div className="mt-6 grid gap-2">
            <Button asChild variant="primary" className="w-full">
              <Link href="/checkout">
                <RefreshCw className="h-4 w-4" />
                Retry
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail className="h-4 w-4" />
                Contact Support
              </a>
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/booking">Return To Booking</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
