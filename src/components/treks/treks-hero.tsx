"use client";

import {
  ArrowRight,
  Headphones,
  Mountain,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import type { TreksBannerCopy } from "@/lib/treks-banner";

const heroImage = "/images/heroes/treks-banner.jpg";

const stats = [
  { id: "treks", title: "120+", subtitle: "Trek Adventures", icon: Mountain },
  { id: "travellers", title: "50,000+", subtitle: "Happy Travellers", icon: Users },
  { id: "rating", title: "4.9", subtitle: "Google Rating", icon: Star },
  { id: "price", title: "Best", subtitle: "Price Guarantee", icon: ShieldCheck },
];

interface TreksHeroProps {
  totalTreks: number;
  resultCount: number;
  banner: TreksBannerCopy;
}

export function TreksHero({ totalTreks, resultCount, banner }: TreksHeroProps) {
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi! I need help with ${banner.shortLabel}.`,
  )}`;
  const catalogCount = Math.max(totalTreks, 1);
  const shown = Math.max(resultCount, 0);

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1220] text-white">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${banner.accent} — Himalayan trekking adventures`}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,12,0.28)_0%,rgba(8,18,12,0.35)_45%,rgba(8,18,12,0.88)_100%)]" />
      </div>

      {/* —— Mobile hero —— */}
      <div className="relative z-[2] flex min-h-[52svh] flex-col justify-end px-4 pb-28 pt-16 md:hidden">
        <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#3A3A3A]/85 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-amber-300 text-amber-300" aria-hidden />
          4.9 Rated by 15,000+ Trekkers
        </p>

        <h1 className="mt-4 font-heading text-[2.15rem] font-extrabold leading-[1.05] tracking-tight !text-white">
          <span className="block !text-white">{banner.lead}</span>
          <span className="mt-0.5 block font-brush text-[clamp(2.4rem,12vw,3.15rem)] font-bold leading-[0.92] tracking-normal text-[#B8E04A]">
            {banner.accent}
          </span>
        </h1>

        <p className="mt-3 max-w-[22rem] text-[13px] leading-relaxed text-white/90">
          {shown} trek{shown === 1 ? "" : "s"} matching this view · {catalogCount}+ in our catalog
        </p>

        <div className="mt-5 flex items-center gap-2.5">
          <a
            href="#trek-results"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#2D5A27] px-4 py-3 text-[13px] font-bold !text-white shadow-md"
          >
            Browse Treks
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <Link
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/85 bg-white/10 px-4 py-3 text-[13px] font-bold !text-white backdrop-blur-sm"
          >
            <Headphones className="h-4 w-4" aria-hidden />
            Talk to Expert
          </Link>
        </div>
      </div>

      {/* —— Desktop hero —— */}
      <Container className="relative z-[2] hidden min-h-[min(72vh,620px)] flex-col justify-center py-20 md:flex lg:pb-28">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.55fr)] lg:gap-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#3A3A3A]/85 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" aria-hidden />
              4.9 Rated by 15,000+ Trekkers
            </p>

            <h1 className="mt-5 font-heading text-[clamp(1.9rem,5.5vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight !text-white">
              <span className="!text-white">{banner.lead}</span>
              <span className="mt-0.5 block font-brush text-[clamp(2.5rem,6.5vw,4.75rem)] font-bold leading-[0.92] tracking-normal text-[#B8E04A]">
                {banner.accent}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">
              {banner.description} Showing{" "}
              <span className="font-semibold text-white">{shown}</span> matching trek
              {shown === 1 ? "" : "s"}.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#trek-results"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#2D5A27] px-5 py-3 text-sm font-bold !text-white shadow-[0_10px_24px_rgba(45,90,39,0.35)] transition hover:bg-[#244820]"
              >
                Browse Treks
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/85 bg-white/10 px-5 py-3 text-sm font-bold !text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Headphones className="h-4 w-4" aria-hidden />
                Talk to Expert
              </Link>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-white/20 bg-[#12301f]/55 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md lg:block">
            <ul className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const title = stat.id === "treks" ? `${Math.max(catalogCount, 120)}+` : stat.title;
                return (
                  <li key={stat.id} className="rounded-xl bg-white/5 px-3 py-3.5">
                    <Icon className="mb-2 h-5 w-5 text-[#B8E04A]" aria-hidden />
                    <p className="font-heading text-xl font-extrabold leading-none text-white">
                      {title}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium text-white/75">{stat.subtitle}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
