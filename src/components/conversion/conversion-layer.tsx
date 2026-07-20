"use client";

import dynamic from "next/dynamic";

const CallbackWidget = dynamic(
  () => import("@/components/conversion/callback-widget").then((m) => m.CallbackWidget),
  { ssr: false },
);
const ExitIntentPopup = dynamic(
  () => import("@/components/conversion/exit-intent-popup").then((m) => m.ExitIntentPopup),
  { ssr: false },
);
const RecentBookingsToast = dynamic(
  () =>
    import("@/components/conversion/recent-bookings-toast").then((m) => m.RecentBookingsToast),
  { ssr: false },
);
const StickyContactBar = dynamic(
  () => import("@/components/conversion/sticky-contact-bar").then((m) => m.StickyContactBar),
  { ssr: false },
);

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
