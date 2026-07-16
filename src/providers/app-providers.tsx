"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import type { SiteBootstrap } from "@/lib/api/content";
import { SiteContentProvider } from "@/providers/site-content-provider";
import { StoreHydration } from "@/providers/store-hydration";

const DeferredToaster = dynamic(
  () => import("@/providers/toast-provider").then((m) => m.DeferredToaster),
  { ssr: false },
);

interface AppProvidersProps {
  children: ReactNode;
  bootstrap?: SiteBootstrap | null;
  /** Skip homepage static data + content provider (admin routes). */
  lean?: boolean;
}

/** Minimal client shell — toaster deferred off critical path. */
export function AppProviders({
  children,
  bootstrap = null,
  lean = false,
}: AppProvidersProps) {
  if (lean) {
    return (
      <StoreHydration>
        {children}
        <DeferredToaster />
      </StoreHydration>
    );
  }

  return (
    <StoreHydration>
      <SiteContentProvider bootstrap={bootstrap}>
        {children}
        <DeferredToaster />
      </SiteContentProvider>
    </StoreHydration>
  );
}
