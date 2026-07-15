import { SiteShell } from "@/components/layout";
import { Seo } from "@/components/seo";
import { fontBody, fontBrush, fontDisplay, fontHeading } from "@/config/fonts";
import { siteConfig } from "@/config/site";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontBody.variable} ${fontDisplay.variable} ${fontBrush.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          <Seo />
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
