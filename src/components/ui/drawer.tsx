"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

import { cn } from "@/lib/utils";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "left" | "right" | "bottom";
  }
>(({ className, children, side = "right", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-dark/50 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col gap-4 bg-card shadow-xl focus:outline-none",
        side === "right" &&
          "inset-y-0 right-0 h-full w-[min(100vw,24rem)] border-l border-border p-6 data-[state=open]:animate-slide-up",
        side === "left" &&
          "inset-y-0 left-0 h-full w-[min(100vw,24rem)] border-r border-border p-6",
        side === "bottom" &&
          "inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl border-t border-border p-6 data-[state=open]:animate-slide-up",
        className,
      )}
      {...props}
    >
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition hover:bg-muted"
        aria-label="Close drawer"
      >
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DrawerContent.displayName = "DrawerContent";

export function DrawerTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-heading pr-8 text-xl font-bold", className)}
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
