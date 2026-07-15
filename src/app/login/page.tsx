"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LoginTab = "email" | "google" | "otp";

export default function LoginPage() {
  const [tab, setTab] = useState<LoginTab>("email");

  return (
    <section className="bg-[#F7F8F6] py-14 md:py-20">
      <Container className="max-w-md">
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-6 shadow-sm md:p-8">
          <h1 className="font-heading text-2xl font-bold text-[#1A1A1A]">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Login to manage bookings and wishlist on {siteConfig.shortName}.
          </p>

          <div className="mt-5 flex gap-1 rounded-xl border border-[#e8ece6] bg-[#F7F8F6] p-1">
            {(
              [
                ["email", "Email"],
                ["google", "Google"],
                ["otp", "OTP"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition",
                  tab === id
                    ? "bg-white text-[#2D5A27] shadow-sm"
                    : "text-muted-foreground hover:text-[#1A1A1A]",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "email" ? (
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label className="block space-y-1.5 text-sm">
                <span className="font-medium text-[#333]">Email</span>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
              </label>
              <label className="block space-y-1.5 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-[#333]">Password</span>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#2D5A27] hover:underline"
                    onClick={() =>
                      alert("Password reset will be available once auth is connected.")
                    }
                  >
                    Forgot Password
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
              </label>
              <Button type="submit" variant="primary" className="w-full">
                Login
              </Button>
            </form>
          ) : null}

          {tab === "google" ? (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Continue with Google. OAuth connects in a later release — this is a UI placeholder.
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => alert("Google login coming soon.")}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.2-1.9 2.9l3.1 2.4c1.8-1.7 2.8-4.1 2.8-7 0-.7-.1-1.3-.2-1.9H12z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.6 14.3l-.8.6-2.5 2c1.6 3.1 4.8 5.1 8.7 5.1 2.6 0 4.8-.9 6.4-2.3l-3.1-2.4c-.9.6-2 .9-3.3.9-2.5 0-4.7-1.7-5.4-4z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M3.3 7.1C2.5 8.7 2 10.3 2 12s.5 3.3 1.3 4.9l3.3-2.6C6.2 13.4 6 12.7 6 12s.2-1.4.6-2.3L3.3 7.1z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 5.8c1.4 0 2.7.5 3.7 1.4l2.8-2.8C16.8 2.7 14.6 2 12 2 8.1 2 4.9 4 3.3 7.1l3.3 2.6C7.3 7.5 9.5 5.8 12 5.8z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          ) : null}

          {tab === "otp" ? (
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                alert("OTP login UI only for now.");
              }}
            >
              <label className="block space-y-1.5 text-sm">
                <span className="font-medium text-[#333]">Mobile number</span>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
              </label>
              <label className="block space-y-1.5 text-sm">
                <span className="font-medium text-[#333]">OTP</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="6-digit code"
                  className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
              </label>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1">
                  Send OTP
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Verify & Login
                </Button>
              </div>
            </form>
          ) : null}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/treks" className="font-semibold text-[#2D5A27] hover:underline">
              Explore treks
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
