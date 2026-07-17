import type { ReactNode } from "react";

import { SeoCenterHero, SeoCenterNav } from "@/components/admin/seo-center/seo-center-ui";

export default function SeoCenterLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SeoCenterHero />
      <SeoCenterNav />
      {children}
    </div>
  );
}
