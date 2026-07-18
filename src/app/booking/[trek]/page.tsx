import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BookingTrekClient } from "@/app/booking/[trek]/booking-trek-client";
import { createMetadata } from "@/lib/seo";
import { getTrekDetail, getListing } from "@/services/treks.service";

interface BookingTrekPageProps {
  params: Promise<{ trek: string }>;
}

export const revalidate = 600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: BookingTrekPageProps): Promise<Metadata> {
  const { trek: slug } = await params;
  const detail = await getTrekDetail(slug);
  const listing = await getListing(slug);
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
  const detail = await getTrekDetail(slug);
  const listing = await getListing(slug);

  if (!detail && !listing) {
    notFound();
  }

  const title = detail?.title ?? listing?.title ?? slug;
  const basePriceInr = detail?.basePriceInr ?? listing?.basePriceInr ?? 0;
  const departures =
    detail?.departures ??
    (listing?.departures ?? []).map((date, index) => ({
      id: `${slug}-${index}`,
      date,
      seats: listing?.seatsLeft ?? 8,
      priceInr: listing?.basePriceInr ?? 0,
      status: "open" as const,
    }));

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-xl px-4 py-12">
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      }
    >
      <BookingTrekClient
        trekSlug={slug}
        trekTitle={title}
        basePriceInr={basePriceInr}
        departures={departures}
      />
    </Suspense>
  );
}
