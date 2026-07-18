"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MobileHome = dynamic(
  () => import("@/components/home/mobile-home").then((m) => m.MobileHome),
  {
    loading: () => <div className="min-h-[70vh] animate-pulse bg-[#f5f6f4] md:hidden" />,
  },
);

const DesktopHome = dynamic(
  () => import("@/components/home/desktop-home").then((m) => m.DesktopHome),
  {
    loading: () => (
      <div className="hidden min-h-[70vh] animate-pulse bg-[#0b1220] md:block" />
    ),
  },
);

/**
 * SSR both viewports so LCP HTML ships immediately.
 * After hydration, drop the unused viewport to free React work.
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

  // First paint / SSR: both trees (CSS hides one). After mount: keep matching only.
  if (isDesktop === true) return <DesktopHome />;
  if (isDesktop === false) return <MobileHome />;

  return (
    <>
      <div className="md:hidden">
        <MobileHome />
      </div>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
    </>
  );
}
