"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type PixelConfig = {
  metaPixel?: { enabled?: boolean; pixelId?: string };
  clarity?: { enabled?: boolean; projectId?: string };
};

function useIdleGate(delayMs = 5000) {
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
 * Deferred marketing pixels (Meta, Clarity).
 * Prefer server-passed config to avoid an extra analytics/config fetch.
 */
export function AnalyticsScripts({
  metaPixelId,
  clarityId,
}: {
  metaPixelId?: string | null;
  clarityId?: string | null;
}) {
  const idleReady = useIdleGate(5000);
  const [fetched, setFetched] = useState<PixelConfig | null>(null);

  useEffect(() => {
    if (!idleReady) return;
    if (metaPixelId || clarityId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/v1/analytics/config", { credentials: "omit" });
        if (!res.ok) return;
        const json = (await res.json()) as { data?: PixelConfig };
        if (!cancelled) setFetched(json.data ?? null);
      } catch {
        // optional
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [idleReady, metaPixelId, clarityId]);

  if (!idleReady) return null;

  const pixelId =
    metaPixelId ||
    (fetched?.metaPixel?.enabled ? fetched.metaPixel.pixelId : undefined);
  const clarity =
    clarityId || (fetched?.clarity?.enabled ? fetched.clarity.projectId : undefined);

  if (!pixelId && !clarity) return null;

  return (
    <>
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

      {clarity ? (
        <Script id="ms-clarity" strategy="lazyOnload">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarity}");
        `}</Script>
      ) : null}
    </>
  );
}
