"use client";

import { CallbackWidget } from "@/components/conversion/callback-widget";
import { ExitIntentPopup } from "@/components/conversion/exit-intent-popup";
import { RecentBookingsToast } from "@/components/conversion/recent-bookings-toast";
import { StickyContactBar } from "@/components/conversion/sticky-contact-bar";

export function ConversionLayer() {
  return (
    <>
      <CallbackWidget />
      <ExitIntentPopup />
      <RecentBookingsToast />
      <StickyContactBar />
    </>
  );
}
