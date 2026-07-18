import Link from "next/link";
import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Page not found",
  description:
    "The page you are looking for does not exist. Browse Himalayan treks, destinations, and travel guides on India Holiday Destinations.",
  canonical: "/",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold tracking-wide text-[#2D5A27] uppercase">404</p>
      <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#122016] md:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#6B7668] md:text-base">
        This URL isn&apos;t available. Try one of these popular sections instead.
      </p>
      <nav aria-label="Helpful links" className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-xl bg-[#2D5A27] px-5 text-sm font-bold text-white"
        >
          Home
        </Link>
        <Link
          href="/treks"
          className="inline-flex h-11 items-center rounded-xl border border-[#D8E2D4] bg-white px-5 text-sm font-semibold text-[#314034]"
        >
          All treks
        </Link>
        <Link
          href="/destinations"
          className="inline-flex h-11 items-center rounded-xl border border-[#D8E2D4] bg-white px-5 text-sm font-semibold text-[#314034]"
        >
          Destinations
        </Link>
        <Link
          href="/blogs"
          className="inline-flex h-11 items-center rounded-xl border border-[#D8E2D4] bg-white px-5 text-sm font-semibold text-[#314034]"
        >
          Blog
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center rounded-xl border border-[#D8E2D4] bg-white px-5 text-sm font-semibold text-[#314034]"
        >
          Contact
        </Link>
      </nav>
    </main>
  );
}
