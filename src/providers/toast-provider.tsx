"use client";

import { Toaster } from "sonner";
import type { ReactNode } from "react";

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <DeferredToaster />
    </>
  );
}

export function DeferredToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "border border-border bg-card text-card-foreground shadow-lg",
        },
      }}
    />
  );
}
