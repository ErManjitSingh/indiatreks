"use client";

import dynamic from "next/dynamic";

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
 * SSR both viewports with CSS visibility so LCP HTML ships immediately.
 * Only one layout is visible per breakpoint; chunks still code-split.
 */
export function HomeViewport() {
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
