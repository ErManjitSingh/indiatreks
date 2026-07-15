import { Caveat, Cormorant_Garamond, Inter, Manrope } from "next/font/google";

/** Primary UI heading — preload for LCP text */
export const fontHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "800"],
  preload: true,
  adjustFontFallback: true,
});

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
  adjustFontFallback: true,
});

/** Display serif — mockup titles only; deferred */
export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional",
  weight: ["600", "700"],
  style: ["normal"],
  preload: false,
  adjustFontFallback: true,
});

/** Brush accent — hero only; deferred */
export const fontBrush = Caveat({
  subsets: ["latin"],
  variable: "--font-brush",
  display: "optional",
  weight: ["700"],
  preload: false,
  adjustFontFallback: true,
});
