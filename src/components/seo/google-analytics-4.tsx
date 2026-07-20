"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function normalizeGa4Id(value?: string | null) {
  const id = String(value || "")
    .trim()
    .toUpperCase();
  return /^G-[A-Z0-9]+$/.test(id) ? id : "";
}

function useIdleReady(delayMs = 2800) {
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

function Ga4RouteTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId || typeof window === "undefined") return;
    const pagePath = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") {
      window.gtag("config", measurementId, {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [measurementId, pathname, searchParams]);

  return null;
}

/**
 * Direct GA4 gtag install. Prefer loading via GTM when a container is active
 * to avoid double-counting — pass `enabled={false}` when GTM owns GA4.
 */
export function GoogleAnalytics4({
  measurementId: measurementIdProp,
  enabled = true,
}: {
  measurementId?: string | null;
  enabled?: boolean;
}) {
  const idleReady = useIdleReady(2800);
  const envId = normalizeGa4Id(process.env.NEXT_PUBLIC_GA4_ID);
  const measurementId = normalizeGa4Id(measurementIdProp) || envId;

  if (!enabled || !measurementId || !idleReady) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${measurementId}', { send_page_view: true });
      `}</Script>
      <Suspense fallback={null}>
        <Ga4RouteTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
