import { headers } from "next/headers";

import { SiteShell } from "@/components/layout";
import { Seo } from "@/components/seo";
import { fontBody, fontBrush, fontDisplay, fontHeading } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { fetchBootstrap } from "@/lib/api/content";
import { createMetadata } from "@/lib/seo";
import { AppProviders } from "@/providers";
import "@/styles/globals.css";

export const metadata = createMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  canonical: "/",
  keywords: [
    "India treks",
    "Himalayan trekking",
    "weekend treks",
    "winter treks",
    "high altitude treks",
    "India Holiday Destinations",
  ],
});

export const viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");
  // Admin does not need homepage bootstrap payload (saves ~50KB+ per request).
  const bootstrap = isAdmin ? null : await fetchBootstrap();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontBody.variable} ${fontDisplay.variable} ${fontBrush.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <AppProviders bootstrap={bootstrap} lean={isAdmin}>
          {isAdmin ? (
            children
          ) : (
            <>
              <Seo />
              <SiteShell>{children}</SiteShell>
            </>
          )}
        </AppProviders>
      </body>
    </html>
  );
}
