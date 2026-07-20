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
    } else {
      window.dataLayer.push({
        event: "page_view",
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [measurementId, pathname, searchParams]);

  return null;
}

export function GoogleAnalytics4({
  measurementId: measurementIdProp,
}: {
  measurementId?: string | null;
}) {
  const envId = normalizeGa4Id(process.env.NEXT_PUBLIC_GA4_ID);
  const [fetchedId, setFetchedId] = useState("");

  useEffect(() => {
    if (normalizeGa4Id(measurementIdProp) || envId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/v1/analytics/config", { credentials: "omit" });
        if (!res.ok) return;
        const json = (await res.json()) as {
          data?: { ga4?: { enabled?: boolean; measurementId?: string } };
        };
        const ga4 = json.data?.ga4;
        const id = ga4?.enabled ? normalizeGa4Id(ga4.measurementId) : "";
        if (!cancelled) setFetchedId(id);
      } catch {
        // optional
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [measurementIdProp, envId]);

  const measurementId =
    normalizeGa4Id(measurementIdProp) || envId || normalizeGa4Id(fetchedId);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
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
