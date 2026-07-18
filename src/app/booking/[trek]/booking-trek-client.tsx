"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { BookingFlow } from "@/components/booking/booking-flow";
import { QuickEnquiryForm } from "@/components/booking/quick-enquiry-form";
import { Container } from "@/components/ui/container";
import type { TrekDeparture } from "@/types/trek-detail";

interface BookingTrekClientProps {
  trekSlug: string;
  trekTitle: string;
  basePriceInr: number;
  departures: TrekDeparture[];
}

export function BookingTrekClient({
  trekSlug,
  trekTitle,
  basePriceInr,
  departures,
}: BookingTrekClientProps) {
  const searchParams = useSearchParams();
  const initialDate = searchParams.get("date") ?? undefined;
  const [stage, setStage] = useState<"enquiry" | "advance">("enquiry");

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
              trekTitle={trekTitle}
              basePriceInr={basePriceInr}
              departures={departures}
              mode="page"
              initialDate={initialDate}
            />
          ) : (
            <QuickEnquiryForm
              trekSlug={trekSlug}
              trekTitle={trekTitle}
              basePriceInr={basePriceInr}
              onAdvanceBooking={() => setStage("advance")}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
