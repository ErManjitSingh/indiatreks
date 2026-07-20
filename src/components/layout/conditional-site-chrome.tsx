"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteShell } from "@/components/layout/site-shell";
import { Seo } from "@/components/seo";
import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { GoogleTagManager } from "@/components/seo/google-tag-manager";

/**
 * Client pathname gate so root layout never needs headers() —
 * keeping public pages eligible for static/ISR caching.
 */
export function ConditionalSiteChrome({
  children,
  gtmContainerId,
}: {
  children: ReactNode;
  gtmContainerId?: string | null;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Seo />
      <GoogleTagManager containerId={gtmContainerId} />
      <AnalyticsScripts />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
