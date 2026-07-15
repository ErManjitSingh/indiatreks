"use client";

import { useEffect, useMemo } from "react";

import { BookingFlow } from "@/components/booking/booking-flow";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { getTrekBySlug } from "@/data/treks";
import { getTrekDetailBySlug } from "@/data/trek-details";
import { useBookingUiStore } from "@/lib/booking/store";

export function BookingDrawer() {
  const { sheetOpen, activeSlug, setSheetOpen, closeSheet } = useBookingUiStore();

  const trek = useMemo(() => {
    if (!activeSlug) return null;
    const detail = getTrekDetailBySlug(activeSlug);
    const listing = getTrekBySlug(activeSlug);
    if (!detail && !listing) return null;
    return {
      slug: activeSlug,
      title: detail?.title ?? listing?.title ?? activeSlug,
      basePriceInr: detail?.basePriceInr ?? listing?.basePriceInr ?? 0,
      departures:
        detail?.departures ??
        (listing?.departures ?? []).map((date, index) => ({
          id: `${activeSlug}-${index}`,
          date,
          seats: listing?.seatsLeft ?? 8,
          priceInr: listing?.basePriceInr ?? 0,
          status: "open" as const,
        })),
    };
  }, [activeSlug]);

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
        <DrawerTitle className="sr-only">Book trek</DrawerTitle>
        <DrawerDescription className="sr-only">
          Complete booking steps and proceed to payment
        </DrawerDescription>
        <div className="flex h-full flex-col p-5 md:p-6">
          {trek ? (
            <BookingFlow
              trekSlug={trek.slug}
              trekTitle={trek.title}
              basePriceInr={trek.basePriceInr}
              departures={trek.departures}
              mode="drawer"
              onClose={closeSheet}
            />
          ) : (
            <p className="text-sm text-muted-foreground">Select a trek to start booking.</p>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
