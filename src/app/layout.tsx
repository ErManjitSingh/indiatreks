import type { Metadata } from "next";

import { ConditionalSiteChrome } from "@/components/layout/conditional-site-chrome";
import { fontBody, fontBrush, fontDisplay, fontHeading } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { fetchBootstrap } from "@/lib/api/content";
import { fetchPublicAnalyticsConfig, fetchSeoBootstrap } from "@/lib/api/seo";
import { createMetadata } from "@/lib/seo";
import { AppProviders } from "@/providers";
import "@/styles/globals.css";

export const viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/** Cached bootstrap — no headers() so pages stay static/ISR-eligible. */
export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoBootstrap();
  const settings = (seo?.settings as Record<string, unknown> | undefined) ?? {};
  const topVerification = (seo?.verification as Record<string, string | undefined> | undefined) ?? {};
  const verification =
    (settings.verification as Record<string, string | undefined> | undefined) ?? topVerification;
  const homepage = (settings.homepage as Record<string, unknown> | undefined) ?? {};

  const base = createMetadata({
    title:
      (homepage.title as string | undefined) ||
      (settings.defaultTitle as string | undefined) ||
      `${siteConfig.name} | ${siteConfig.tagline}`,
    description:
      (homepage.description as string | undefined) ||
      (settings.defaultDescription as string | undefined) ||
      siteConfig.description,
    canonical: (homepage.canonical as string | undefined) || "/",
    keywords:
      (homepage.keywords as string[] | undefined) ||
      (settings.defaultKeywords as string[] | undefined) || [
        "India treks",
        "Himalayan trekking",
        "weekend treks",
        "winter treks",
        "high altitude treks",
        "India Holiday Destinations",
      ],
    ogImage: (homepage.ogImage as string | undefined) || (settings.defaultOgImage as string | undefined),
  });

  const verificationBlock: Metadata["verification"] = {
    ...(verification.google || topVerification.google
      ? { google: verification.google || topVerification.google }
      : {}),
    ...(verification.yandex || topVerification.yandex
      ? { yandex: verification.yandex || topVerification.yandex }
      : {}),
  };

  const other: Record<string, string> = {};
  const bing = verification.bing || topVerification.bing;
  const pinterest = verification.pinterest || topVerification.pinterest;
  if (bing) other["msvalidate.01"] = bing;
  if (pinterest) other["p:domain_verify"] = pinterest;

  return {
    ...base,
    ...(Object.keys(verificationBlock).length || Object.keys(other).length
      ? {
          verification: {
            ...verificationBlock,
            ...(Object.keys(other).length ? { other } : {}),
          },
        }
      : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bootstrap, seo, analyticsConfig] = await Promise.all([
    fetchBootstrap(),
    fetchSeoBootstrap(),
    fetchPublicAnalyticsConfig(),
  ]);
  const analytics =
    (analyticsConfig as {
      gtm?: { enabled?: boolean; containerId?: string };
      ga4?: { enabled?: boolean; measurementId?: string };
      metaPixel?: { enabled?: boolean; pixelId?: string };
      clarity?: { enabled?: boolean; projectId?: string };
    } | null) ??
    (seo?.analytics as {
      gtm?: { enabled?: boolean; containerId?: string };
      ga4?: { enabled?: boolean; measurementId?: string };
      metaPixel?: { enabled?: boolean; pixelId?: string };
      clarity?: { enabled?: boolean; projectId?: string };
    } | undefined) ??
    {};
  const gtmContainerId =
    analytics.gtm?.enabled && analytics.gtm?.containerId
      ? String(analytics.gtm.containerId)
      : process.env.NEXT_PUBLIC_GTM_ID || null;
  const ga4MeasurementId =
    analytics.ga4?.enabled && analytics.ga4?.measurementId
      ? String(analytics.ga4.measurementId)
      : process.env.NEXT_PUBLIC_GA4_ID || null;
  const metaPixelId =
    analytics.metaPixel?.enabled && analytics.metaPixel?.pixelId
      ? String(analytics.metaPixel.pixelId)
      : null;
  const clarityId =
    analytics.clarity?.enabled && analytics.clarity?.projectId
      ? String(analytics.clarity.projectId)
      : null;

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontBody.variable} ${fontDisplay.variable} ${fontBrush.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <AppProviders bootstrap={bootstrap}>
          <ConditionalSiteChrome
            gtmContainerId={gtmContainerId}
            ga4MeasurementId={ga4MeasurementId}
            metaPixelId={metaPixelId}
            clarityId={clarityId}
          >
            {children}
          </ConditionalSiteChrome>
        </AppProviders>
      </body>
    </html>
  );
}
