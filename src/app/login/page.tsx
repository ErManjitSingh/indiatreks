import { Suspense } from "react";
import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";
import LoginPageClient from "./login-client";

export const metadata: Metadata = createMetadata({
  title: "Login",
  description: "Sign in to manage bookings and your India Holiday Destinations account.",
  canonical: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-[#F7F8F6] py-14 md:py-20">
          <div className="mx-auto max-w-md px-4 text-center text-sm text-muted-foreground">
            Loading login…
          </div>
        </section>
      }
    >
      <LoginPageClient />
    </Suspense>
  );
}
