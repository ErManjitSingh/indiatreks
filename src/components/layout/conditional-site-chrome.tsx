"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteShell } from "@/components/layout/site-shell";
import { Seo } from "@/components/seo";
import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { GoogleAnalytics4 } from "@/components/seo/google-analytics-4";
import { GoogleTagManager } from "@/components/seo/google-tag-manager";

/**
 * Client pathname gate so root layout never needs headers() —
 * keeping public pages eligible for static/ISR caching.
 */
export function ConditionalSiteChrome({
  children,
  gtmContainerId,
  ga4MeasurementId,
}: {
  children: ReactNode;
  gtmContainerId?: string | null;
  ga4MeasurementId?: string | null;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Seo />
      <GoogleTagManager containerId={gtmContainerId} />
      <GoogleAnalytics4 measurementId={ga4MeasurementId} />
      <AnalyticsScripts />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
