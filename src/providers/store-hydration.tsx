"use client";

import { useEffect, type ReactNode } from "react";

import {
  useCompareStore,
  useRecentlyViewedStore,
  useWishlistStore,
} from "@/lib/store";

/**
 * Rehydrate Zustand persist stores AFTER mount so SSR HTML matches the
 * first client render (empty defaults), then localStorage loads.
 */
export function StoreHydration({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useWishlistStore.persist.rehydrate();
    void useCompareStore.persist.rehydrate();
    void useRecentlyViewedStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
