"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MobileHome = dynamic(
  () => import("@/components/home/mobile-home").then((m) => m.MobileHome),
  {
    ssr: false,
    loading: () => <div className="min-h-[70vh] animate-pulse bg-[#f5f6f4] md:hidden" />,
  },
);

const DesktopHome = dynamic(
  () => import("@/components/home/desktop-home").then((m) => m.DesktopHome),
  {
    ssr: false,
    loading: () => (
      <div className="hidden min-h-[70vh] animate-pulse bg-[#0b1220] md:block" />
    ),
  },
);

/**
 * Loads only mobile OR desktop home JS — never both.
 * SSR shows a cheap pulse; one viewport chunk hydrates after matchMedia.
 */
export function HomeViewport() {
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
        <div className="min-h-[70vh] animate-pulse bg-[#f5f6f4] md:hidden" aria-hidden />
        <div className="hidden min-h-[70vh] animate-pulse bg-[#0b1220] md:block" aria-hidden />
      </>
    );
  }

  return isDesktop ? <DesktopHome /> : <MobileHome />;
}
