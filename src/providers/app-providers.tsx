"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { StoreHydration } from "@/providers/store-hydration";

const DeferredToaster = dynamic(
  () => import("@/providers/toast-provider").then((m) => m.DeferredToaster),
  { ssr: false },
);

interface AppProvidersProps {
  children: ReactNode;
}

/** Minimal client shell — toaster deferred off critical path. */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <StoreHydration>
      {children}
      <DeferredToaster />
    </StoreHydration>
  );
}
