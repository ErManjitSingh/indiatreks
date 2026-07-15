"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import type { TrekDetail } from "@/types/trek-detail";
import type { TrekListingItem } from "@/types/trek-listing";

const MobileTrekDetail = dynamic(
  () =>
    import("@/components/trek-detail/mobile-trek-detail").then((m) => m.MobileTrekDetail),
  {
    ssr: false,
    loading: () => <div className="min-h-[80vh] animate-pulse bg-white md:hidden" />,
  },
);

const DesktopTrekDetail = dynamic(
  () =>
    import("@/components/trek-detail/desktop-trek-detail").then((m) => m.DesktopTrekDetail),
  {
    ssr: false,
    loading: () => <div className="hidden min-h-[80vh] animate-pulse bg-white md:block" />,
  },
);

interface TrekDetailViewportProps {
  trek: TrekDetail;
  relatedTreks: TrekListingItem[];
}

/** Loads only mobile OR desktop trek-detail JS — never both. */
export function TrekDetailViewport({ trek, relatedTreks }: TrekDetailViewportProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (isDesktop === null) {
    return (
      <>
        <div className="min-h-[80vh] animate-pulse bg-white md:hidden" aria-hidden />
        <div className="hidden min-h-[80vh] animate-pulse bg-white md:block" aria-hidden />
      </>
    );
  }

  return isDesktop ? (
    <DesktopTrekDetail trek={trek} relatedTreks={relatedTreks} />
  ) : (
    <MobileTrekDetail trek={trek} />
  );
}
