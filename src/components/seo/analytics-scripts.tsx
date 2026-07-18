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

  const gtmId = config.gtm?.enabled ? config.gtm.containerId : undefined;
  // Skip standalone GA4 when GTM already owns tags (avoids double-loading).
  const gaId =
    !gtmId && config.ga4?.enabled ? config.ga4.measurementId : undefined;
  const pixelId = config.metaPixel?.enabled ? config.metaPixel.pixelId : undefined;
  const clarityId = config.clarity?.enabled ? config.clarity.projectId : undefined;

  return (
    <>
      {gtmId ? (
        <Script id="gtm-init" strategy="lazyOnload">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      ) : null}

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
