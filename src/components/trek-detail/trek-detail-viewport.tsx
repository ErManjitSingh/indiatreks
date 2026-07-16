"use client";

import dynamic from "next/dynamic";

import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";

const MobileTrekDetail = dynamic(
  () =>
    import("@/components/trek-detail/mobile-trek-detail").then((m) => m.MobileTrekDetail),
  {
    loading: () => <div className="min-h-[80vh] animate-pulse bg-white md:hidden" />,
  },
);

const DesktopTrekDetail = dynamic(
  () =>
    import("@/components/trek-detail/desktop-trek-detail").then((m) => m.DesktopTrekDetail),
  {
    loading: () => <div className="hidden min-h-[80vh] animate-pulse bg-white md:block" />,
  },
);

interface TrekDetailViewportProps {
  trek: TrekDetail;
  relatedTreks: TrekListingItem[];
}

/** SSR both viewports; CSS shows one. Faster LCP than client-only matchMedia gate. */
export function TrekDetailViewport({ trek, relatedTreks }: TrekDetailViewportProps) {
  return (
    <>
      <div className="md:hidden">
        <MobileTrekDetail trek={trek} />
      </div>
      <div className="hidden md:block">
        <DesktopTrekDetail trek={trek} relatedTreks={relatedTreks} />
      </div>
    </>
  );
}
