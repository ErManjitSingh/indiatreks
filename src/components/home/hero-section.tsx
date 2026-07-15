import { ArrowRight, Mountain, Play, ShieldCheck, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MountainSilhouettes } from "@/components/home/mountain-silhouettes";
import { Container } from "@/components/ui/container";
import { trekImages } from "@/constants/trek-images";
import { BLUR_DATA_URL } from "@/constants/media";

const heroImage = trekImages.hero;
const floatingStats = [
  { id: "trekkers", title: "10,000+", subtitle: "Happy Trekkers" },
  { id: "safety", title: "98%", subtitle: "Safety Rating" },
  { id: "treks", title: "250+", subtitle: "Treks Across India" },
];

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[min(72vh,560px)] overflow-hidden bg-[#0b1220] text-white md:min-h-[min(82vh,720px)] lg:min-h-[min(88vh,820px)]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Trekker overlooking snow-capped Himalayan peaks at golden hour"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(max-width: 768px) 100vw, 1400px"
          quality={65}
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,12,20,0.82)_0%,rgba(8,12,20,0.45)_50%,rgba(8,12,20,0.25)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0.2)_0%,transparent_40%,rgba(8,12,20,0.75)_100%)]" />
      </div>

      <div className="hidden md:block">
        <MountainSilhouettes />
      </div>

      <Container className="relative z-[3] flex min-h-[min(72vh,560px)] flex-col justify-end pt-20 pb-16 md:min-h-[min(82vh,720px)] md:justify-center md:pt-28 md:pb-40 lg:min-h-[min(88vh,820px)] lg:pt-32 lg:pb-48">
        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(200px,0.5fr)] lg:gap-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] text-lime uppercase">
              <Mountain className="h-3.5 w-3.5" aria-hidden />
              Premium Himalayan Adventures
            </p>

            <h1 className="mt-2.5 font-heading text-[clamp(1.85rem,7vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] uppercase md:mt-4">
              <span className="text-white">Explore India&apos;s</span>
              <span className="mt-0.5 block font-brush text-[clamp(2.4rem,9vw,5.5rem)] font-bold normal-case leading-[0.92] tracking-normal text-lime">
                Wild Side
              </span>
            </h1>

            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/80 md:mt-4 md:text-sm lg:text-[15px]">
              Curated Himalayan treks with expert local guides &amp; unforgettable mountain
              experiences.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-7 md:gap-4">
              <Link
                href="/treks"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#244820] bg-[#2D5A27] px-5 py-2.5 text-xs font-bold !text-white transition hover:bg-[#244820] md:px-6 md:py-3 md:text-sm"
              >
                Explore Treks
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
              </Link>

              <button
                type="button"
                className="group inline-flex items-center gap-2.5 text-left"
                aria-label="Watch film — Experience Himalayas"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white md:h-11 md:w-11">
                  <Play className="h-3.5 w-3.5 fill-current md:h-4 md:w-4" aria-hidden />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white md:text-sm">Watch Film</span>
                  <span className="text-[10px] text-white/60 md:text-xs">Experience Himalayas</span>
                </span>
              </button>
            </div>

            {/* Mobile: 3-col stats row (mockup) */}
            <ul className="mt-6 grid grid-cols-3 gap-2 border-t border-white/15 pt-4 md:hidden">
              {floatingStats.map((stat) => (
                <li key={stat.id} className="text-center">
                  <div className="mb-1 flex justify-center">
                    <StatIcon id={stat.id} compact />
                  </div>
                  <p className="font-heading text-[13px] font-extrabold text-white">{stat.title}</p>
                  <p className="mt-0.5 text-[9px] leading-tight text-white/65">{stat.subtitle}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop floating cards */}
          <ul className="mx-auto hidden w-full max-w-[240px] flex-col gap-2.5 lg:ml-auto lg:flex">
            {floatingStats.map((stat) => (
              <li
                key={stat.id}
                className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5"
              >
                <StatIcon id={stat.id} />
                <div>
                  <p className="font-heading text-lg font-extrabold text-white">{stat.title}</p>
                  <p className="text-[11px] font-medium text-white/70">{stat.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function StatIcon({ id, compact }: { id: string; compact?: boolean }) {
  if (id === "trekkers") {
    return (
      <div className="flex shrink-0 gap-0.5 text-[#FBBF24]" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={compact ? "h-2.5 w-2.5 fill-current" : "h-3 w-3 fill-current"}
          />
        ))}
      </div>
    );
  }
  if (id === "safety") {
    return (
      <ShieldCheck
        className={compact ? "h-5 w-5 text-lime" : "h-7 w-7 shrink-0 text-lime"}
        strokeWidth={1.5}
        aria-hidden
      />
    );
  }
  return (
    <Users
      className={compact ? "h-5 w-5 text-lime" : "h-7 w-7 shrink-0 text-lime"}
      strokeWidth={1.5}
      aria-hidden
    />
  );
}
