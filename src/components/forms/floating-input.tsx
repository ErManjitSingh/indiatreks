"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="relative w-full">
        <input
          id={inputId}
          ref={ref}
          placeholder=" "
          className={cn(
            "peer h-14 w-full rounded-xl border border-input bg-card px-4 pt-5 text-sm text-foreground shadow-xs transition focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            error && "border-destructive focus-visible:ring-destructive/30",
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-sm text-muted-foreground transition-all peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
        {error ? (
          <p className="mt-1.5 text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

FloatingInput.displayName = "FloatingInput";
