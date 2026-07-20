"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function normalizeGtmId(value?: string | null) {
  const id = String(value || "")
    .trim()
    .toUpperCase();
  return /^GTM-[A-Z0-9]+$/.test(id) ? id : "";
}

function useIdleReady(delayMs = 2500) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const enable = () => setReady(true);
    if ("requestIdleCallback" in window) {
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

function GtmRouteTracker({ containerId }: { containerId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!containerId || typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    const pagePath = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [containerId, pathname, searchParams]);

  return null;
}

export function GoogleTagManager({
  containerId: containerIdProp,
}: {
  containerId?: string | null;
}) {
  const idleReady = useIdleReady(2500);
  const envId = normalizeGtmId(process.env.NEXT_PUBLIC_GTM_ID);
  const containerId = normalizeGtmId(containerIdProp) || envId;

  if (!containerId || !idleReady) return null;

  return (
    <>
      <Script id="gtm-init" strategy="lazyOnload">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${containerId}');
      `}</Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
      <Suspense fallback={null}>
        <GtmRouteTracker containerId={containerId} />
      </Suspense>
    </>
  );
}
