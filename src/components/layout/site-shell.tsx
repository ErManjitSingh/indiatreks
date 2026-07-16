"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Navbar } from "@/components/layout/navbar";
import { TopBar } from "@/components/layout/top-bar";
import { cn } from "@/lib/utils";

const ScrollProgress = dynamic(
  () => import("@/components/layout/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false },
);

const GlobalSearch = dynamic(
  () => import("@/components/layout/global-search").then((m) => m.GlobalSearch),
  { ssr: false },
);

const EnquireModal = dynamic(
  () => import("@/components/layout/enquire-modal").then((m) => m.EnquireModal),
  { ssr: false },
);

const FloatingWhatsApp = dynamic(
  () => import("@/components/layout/floating-whatsapp").then((m) => m.FloatingWhatsApp),
  { ssr: false },
);

const BackToTop = dynamic(
  () => import("@/components/layout/back-to-top").then((m) => m.BackToTop),
  { ssr: false },
);

const StickyBookingButton = dynamic(
  () =>
    import("@/components/layout/sticky-booking-button").then((m) => m.StickyBookingButton),
  { ssr: false },
);

const ConversionLayer = dynamic(
  () =>
    import("@/components/conversion/conversion-layer").then((m) => m.ConversionLayer),
  { ssr: false },
);

const BookingDrawer = dynamic(
  () =>
    import("@/components/booking/booking-drawer").then((m) => m.BookingDrawer),
  { ssr: false },
);

interface SiteShellProps {
  children: ReactNode;
  showAnnouncement?: boolean;
  showTopBar?: boolean;
  showStickyBooking?: boolean;
}

function useIdleReady(delayMs = 2500) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => setReady(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: delayMs });
    } else {
      timeoutId = setTimeout(enable, delayMs);
    }

    return () => {
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delayMs]);
  return ready;
}

export function SiteShell({
  children,
  showAnnouncement = true,
  showTopBar = true,
  showStickyBooking = true,
}: SiteShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTreksListing = pathname === "/treks";
  const isTrekDetail = /^\/treks\/.+/.test(pathname);
  const hideGlobalStickyBooking = isHome || isTreksListing || isTrekDetail;
  const idleReady = useIdleReady(2500);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {showAnnouncement && !isHome ? (
        <div className="hidden md:block">
          <AnnouncementBar />
        </div>
      ) : null}
      {showTopBar && isHome ? (
        <TopBar variant="home" />
      ) : null}
      {showTopBar && !isHome ? (
        <div className="hidden md:block">
          <TopBar />
        </div>
      ) : null}
      <Navbar overlayHero={false} sticky={!isTreksListing} />
      <main
        id="main-content"
        className={cn(
          "min-h-[60vh] pb-24 md:pb-0",
          isTreksListing && "pb-28",
          isTrekDetail && "pb-0",
          !hideGlobalStickyBooking && "md:pb-0",
        )}
      >
        {children}
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="hidden md:block">
        <FloatingWhatsApp
          label={
            isHome
              ? "Chat with Trek Expert — We’re online!"
              : "Chat on WhatsApp - Get Instant Help"
          }
        />
      </div>
      {showStickyBooking && !hideGlobalStickyBooking ? (
        <div className="hidden md:block">
          <StickyBookingButton />
        </div>
      ) : null}
      <BookingDrawer />
      {!isTreksListing && !isTrekDetail ? <MobileBottomNav /> : null}
      {idleReady ? (
        <>
          <ScrollProgress />
          <GlobalSearch />
          <EnquireModal />
          <div className="hidden md:block">
            <BackToTop />
          </div>
          <ConversionLayer />
        </>
      ) : null}
    </>
  );
}
