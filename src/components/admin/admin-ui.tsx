"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-heading text-2xl font-bold">{title}</h2>
        {description ? <p className="mt-1 text-sm text-[#5c6b5f]">{description}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        {actionHref && actionLabel ? (
          <Button asChild variant="primary">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function AdminField({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-1.5 text-sm", className)}>
      <span className="font-medium text-[#333]">{label}</span>
      {children}
    </label>
  );
}

export const adminInputClass =
  "h-11 w-full rounded-xl border border-[#d0d5cc] bg-white px-3 text-sm outline-none focus:border-[#2D5A27]/50 focus:ring-2 focus:ring-[#2D5A27]/15";

export const adminTextareaClass =
  "min-h-[96px] w-full rounded-xl border border-[#d0d5cc] bg-white px-3 py-2 text-sm outline-none focus:border-[#2D5A27]/50 focus:ring-2 focus:ring-[#2D5A27]/15";

export function AdminTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d8e0d4] bg-white shadow-sm">
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function StatusPill({ value }: { value?: string }) {
  const tone =
    value === "published" || value === "approved" || value === "active"
      ? "bg-emerald-50 text-emerald-800"
      : value === "draft" || value === "pending"
        ? "bg-amber-50 text-amber-800"
        : "bg-slate-100 text-slate-700";
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", tone)}>
      {value ?? "—"}
    </span>
  );
}

export function ConfirmDeleteButton({
  label = "Delete",
  onConfirm,
  disabled,
}: {
  label?: string;
  onConfirm: () => void | Promise<void>;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled}
      className="border-red-200 text-red-700 hover:bg-red-50"
      onClick={async () => {
        if (!window.confirm("Delete this item? This cannot be undone easily.")) return;
        await onConfirm();
      }}
    >
      {label}
    </Button>
  );
}
