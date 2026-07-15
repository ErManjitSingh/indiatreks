"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { BookingFlow } from "@/components/booking/booking-flow";
import { QuickEnquiryForm } from "@/components/booking/quick-enquiry-form";
import { Container } from "@/components/ui/container";
import { getTrekBySlug } from "@/data/treks";
import { getTrekDetailBySlug } from "@/data/trek-details";

interface BookingTrekClientProps {
  trekSlug: string;
}

export function BookingTrekClient({ trekSlug }: BookingTrekClientProps) {
  const searchParams = useSearchParams();
  const initialDate = searchParams.get("date") ?? undefined;
  const [stage, setStage] = useState<"enquiry" | "advance">("enquiry");

  const detail = getTrekDetailBySlug(trekSlug);
  const listing = getTrekBySlug(trekSlug);

  const title = detail?.title ?? listing?.title ?? trekSlug;
  const basePriceInr = detail?.basePriceInr ?? listing?.basePriceInr ?? 0;
  const departures =
    detail?.departures ??
    (listing?.departures ?? []).map((date, index) => ({
      id: `${trekSlug}-${index}`,
      date,
      seats: listing?.seatsLeft ?? 8,
      priceInr: listing?.basePriceInr ?? 0,
      status: "open" as const,
    }));

  return (
    <section className="bg-[#F7F8F6] py-8 md:py-12">
      <Container className="max-w-xl">
        <p className="mb-4 text-sm">
          <Link href={`/treks/${trekSlug}`} className="font-medium text-[#2D5A27] hover:underline">
            ← Back to trek
          </Link>
        </p>
        <div className="min-h-[28rem] rounded-2xl border border-[#e8ece6] bg-white p-4 md:p-6">
          {stage === "advance" ? (
            <BookingFlow
              trekSlug={trekSlug}
              trekTitle={title}
              basePriceInr={basePriceInr}
              departures={departures}
              mode="page"
              initialDate={initialDate}
            />
          ) : (
            <QuickEnquiryForm
              trekSlug={trekSlug}
              trekTitle={title}
              basePriceInr={basePriceInr}
              onAdvanceBooking={() => setStage("advance")}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
