"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type AnalyticsPublic = {
  ga4?: { enabled?: boolean; measurementId?: string };
  gtm?: { enabled?: boolean; containerId?: string };
  metaPixel?: { enabled?: boolean; pixelId?: string };
  clarity?: { enabled?: boolean; projectId?: string };
};

function useIdleGate(delayMs = 4000) {
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

/**
 * Deferred marketing pixels (GA4 standalone, Meta, Clarity).
 * GTM is handled separately by GoogleTagManager for correct early install.
 */
export function AnalyticsScripts() {
  const idleReady = useIdleGate(4500);
  const [config, setConfig] = useState<AnalyticsPublic | null>(null);

  useEffect(() => {
    if (!idleReady) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/v1/analytics/config", { credentials: "omit" });
        if (!res.ok) return;
        const json = (await res.json()) as { data?: AnalyticsPublic };
        if (!cancelled) setConfig(json.data ?? null);
      } catch {
        // analytics is optional
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [idleReady]);

  if (!config) return null;

  const gtmEnabled = Boolean(config.gtm?.enabled && config.gtm?.containerId);
  // Skip standalone GA4 when GTM already owns tags (avoids double-loading).
  const gaId =
    !gtmEnabled && config.ga4?.enabled ? config.ga4.measurementId : undefined;
  const pixelId = config.metaPixel?.enabled ? config.metaPixel.pixelId : undefined;
  const clarityId = config.clarity?.enabled ? config.clarity.projectId : undefined;

  if (!gaId && !pixelId && !clarityId) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}</Script>
        </>
      ) : null}

      {pixelId ? (
        <Script id="meta-pixel" strategy="lazyOnload">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}</Script>
      ) : null}

      {clarityId ? (
        <Script id="ms-clarity" strategy="lazyOnload">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `}</Script>
      ) : null}
    </>
  );
}
