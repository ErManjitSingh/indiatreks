import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BookingTrekClient } from "@/app/booking/[trek]/booking-trek-client";
import { allTreks, getTrekBySlug } from "@/data/treks";
import { getTrekDetailBySlug } from "@/data/trek-details";
import { bookingJsonLd, createMetadata } from "@/lib/seo";

interface BookingTrekPageProps {
  params: Promise<{ trek: string }>;
}

export function generateStaticParams() {
  return allTreks.map((trek) => ({ trek: trek.slug }));
}

export async function generateMetadata({
  params,
}: BookingTrekPageProps): Promise<Metadata> {
  const { trek: slug } = await params;
  const detail = getTrekDetailBySlug(slug);
  const listing = getTrekBySlug(slug);
  const title = detail?.title ?? listing?.title;

  if (!title) {
    return createMetadata({
      title: "Booking not found",
      description: "This trek booking page could not be found.",
      canonical: `/booking/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: `Book ${title}`,
    description: `Complete your booking for ${title} with India Holiday Destinations.`,
    canonical: `/booking/${slug}`,
    noIndex: true,
  });
}

export default async function BookingTrekPage({ params }: BookingTrekPageProps) {
  const { trek: slug } = await params;
  const detail = getTrekDetailBySlug(slug);
  const listing = getTrekBySlug(slug);

  if (!detail && !listing) {
    notFound();
  }

  const title = detail?.title ?? listing?.title ?? slug;
  const price = detail?.basePriceInr ?? listing?.basePriceInr ?? 0;
  const rawImage = detail?.gallery?.[0] ?? listing?.images?.[0];
  const image =
    typeof rawImage === "string"
      ? rawImage
      : rawImage && typeof rawImage === "object" && "src" in rawImage
        ? rawImage.src
        : "/images/og-default.jpg";
  const schema = bookingJsonLd({
    name: title,
    description: detail?.summary ?? listing?.summary ?? title,
    image,
    url: `/booking/${slug}`,
    priceInr: price,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-xl px-4 py-12">
            <div className="h-64 animate-pulse rounded-2xl bg-muted" />
          </div>
        }
      >
        <BookingTrekClient trekSlug={slug} />
      </Suspense>
    </>
  );
}
