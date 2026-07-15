"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { toast } from "@/components/ui/toast";
import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { heroMedia } from "@/data/homepage";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email address");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    setEmail("");
    toast.success("You're on the list", "Trail stories and early departures incoming.");
  };

  return (
    <Section spacing="md" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroMedia.poster}
          alt=""
          fill
          sizes={IMAGE_SIZES.hero}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,81,50,0.92)_0%,rgba(17,24,39,0.78)_55%,rgba(10,61,37,0.88)_100%)]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-8 text-center shadow-xl backdrop-blur-xl md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Newsletter</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">
            Get alpine inspiration in your inbox
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
            Seasonal departure alerts, packing lists, and Himalayan stories — no spam, just mountain
            signal.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            aria-label="Newsletter subscription"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
              className="h-12 flex-1 rounded-xl border border-white/25 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
            <Button type="submit" variant="accent" size="lg" loading={loading} className="sm:min-w-40">
              Subscribe
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}
