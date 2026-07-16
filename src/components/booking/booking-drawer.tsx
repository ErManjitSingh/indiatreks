"use client";

import { useEffect, useState } from "react";

import { BookingFlow } from "@/components/booking/booking-flow";
import { QuickEnquiryForm } from "@/components/booking/quick-enquiry-form";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { fetchTrekBySlug } from "@/lib/api/treks";
import { useBookingUiStore } from "@/lib/booking/store";

type DrawerTrek = {
  slug: string;
  title: string;
  basePriceInr: number;
  departures: Array<{
    id: string;
    date: string;
    seats: number;
    priceInr: number;
    status: "open";
  }>;
};

export function BookingDrawer() {
  const {
    sheetOpen,
    activeSlug,
    stage,
    departureDateHint,
    setSheetOpen,
    closeSheet,
    startAdvanceBooking,
  } = useBookingUiStore();

  const [trek, setTrek] = useState<DrawerTrek | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sheetOpen || !activeSlug) {
      setTrek(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    void (async () => {
      try {
        const detail = await fetchTrekBySlug(activeSlug);
        if (cancelled) return;
        if (!detail) {
          setTrek({
            slug: activeSlug,
            title: activeSlug
              .split("-")
              .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
              .join(" "),
            basePriceInr: 0,
            departures: [],
          });
          return;
        }
        setTrek({
          slug: detail.slug,
          title: detail.title,
          basePriceInr: detail.basePriceInr,
          departures: (detail.departures ?? []).map((d, index) => ({
            id: d.id ?? `${detail.slug}-${index}`,
            date: d.date,
            seats: d.seats ?? detail.seatsLeft ?? 8,
            priceInr: d.priceInr ?? detail.basePriceInr,
            status: "open" as const,
          })),
        });
      } catch {
        if (!cancelled) setTrek(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sheetOpen, activeSlug]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen, closeSheet]);

  return (
    <Drawer open={sheetOpen} onOpenChange={setSheetOpen}>
      <DrawerContent
        side="right"
        className="w-[min(100vw,32rem)] max-w-full gap-0 overflow-hidden p-0 sm:p-0"
      >
        <DrawerTitle className="sr-only">
          {stage === "advance" ? "Advance booking" : "Trek enquiry"}
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          {stage === "advance"
            ? "Complete booking steps and proceed to payment"
            : "Send a quick enquiry to our trek team"}
        </DrawerDescription>
        <div className="flex h-full flex-col p-5 md:p-6">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading trek…</p>
          ) : trek ? (
            stage === "advance" ? (
              <BookingFlow
                trekSlug={trek.slug}
                trekTitle={trek.title}
                basePriceInr={trek.basePriceInr}
                departures={trek.departures}
                mode="drawer"
                onClose={closeSheet}
                initialDate={departureDateHint ?? undefined}
              />
            ) : (
              <QuickEnquiryForm
                trekSlug={trek.slug}
                trekTitle={trek.title}
                basePriceInr={trek.basePriceInr}
                onAdvanceBooking={startAdvanceBooking}
                onClose={closeSheet}
              />
            )
          ) : (
            <p className="text-sm text-muted-foreground">Select a trek to start booking.</p>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
