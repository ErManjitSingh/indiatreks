import type { ReactNode } from "react";

import { SeoCenterNav } from "@/components/admin/seo-center/seo-center-ui";

export default function SeoCenterLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="mb-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2D5A27]">SEO Center</p>
        <h1 className="font-heading text-2xl font-bold text-[#111827]">India Holiday Destinations</h1>
        <p className="mt-1 text-sm text-[#5c6b5f]">
          Enterprise SEO dashboard — Search Console, Analytics, vitals, sitemaps, and technical SEO.
        </p>
      </div>
      <SeoCenterNav />
      {children}
    </div>
  );
}
