"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  return (
    <section className="bg-[#F7F8F6] py-14 md:py-20">
      <Container className="max-w-md">
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-6 shadow-sm md:p-8">
          <h1 className="font-heading text-2xl font-bold text-[#1A1A1A]">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Login to manage bookings and wishlist on {siteConfig.shortName}.
          </p>
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
              <span className="font-medium text-[#333]">Password</span>
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
