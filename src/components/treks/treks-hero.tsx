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
import { BLUR_DATA_URL } from "@/constants/media";
import { siteConfig } from "@/config/site";

const heroImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";

const stats = [
  { id: "treks", title: "120+", subtitle: "Trek Adventures", icon: Mountain },
  { id: "travellers", title: "50,000+", subtitle: "Happy Travellers", icon: Users },
  { id: "rating", title: "4.9", subtitle: "Google Rating", icon: Star },
  { id: "price", title: "Best", subtitle: "Price Guarantee", icon: ShieldCheck },
];

interface TreksHeroProps {
  totalTreks: number;
}

export function TreksHero({ totalTreks }: TreksHeroProps) {
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi! I need help choosing a Himalayan trek.",
  )}`;

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1220] text-white">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Snow-capped Himalayan peaks at golden hour"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          quality={75}
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,18,12,0.82)_0%,rgba(8,18,12,0.45)_52%,rgba(8,18,12,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,12,0.2)_0%,transparent_40%,rgba(8,18,12,0.75)_100%)]" />
      </div>

      <Container className="relative z-[2] flex min-h-[min(68vh,560px)] flex-col justify-center py-16 md:min-h-[min(72vh,620px)] md:py-20 lg:pb-28">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.55fr)] lg:gap-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" aria-hidden />
              4.9 Rated by 15,000+ Trekkers
            </p>

            <h1 className="mt-5 font-heading text-[clamp(1.9rem,5.5vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight !text-white">
              <span className="!text-white">Explore India&apos;s Best</span>{" "}
              <span className="text-[#B8E04A]">Himalayan Treks</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-[15px]">
              Discover {Math.max(totalTreks, 120)}+ handpicked Himalayan adventures — from easy
              weekend escapes to high-altitude expeditions with expert local guides.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#trek-results"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#2D5A27] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(45,90,39,0.35)] transition hover:bg-[#244820]"
              >
                Browse Treks
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/18"
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
                return (
                  <li key={stat.id} className="rounded-xl bg-white/5 px-3 py-3.5">
                    <Icon className="mb-2 h-5 w-5 text-[#B8E04A]" aria-hidden />
                    <p className="font-heading text-xl font-extrabold leading-none text-white">
                      {stat.title}
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
