import { ArrowRight, Mountain, Play, ShieldCheck, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MountainSilhouettes } from "@/components/home/mountain-silhouettes";
import { Container } from "@/components/ui/container";
import { BLUR_DATA_URL } from "@/constants/media";

/** Desktop home hero — alpine ridge atmosphere matching the mockup */
const heroImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";

const floatingStats = [
  { id: "trekkers", title: "10,000+", subtitle: "Happy Trekkers" },
  { id: "safety", title: "98%", subtitle: "Safety Rating" },
  { id: "treks", title: "250+", subtitle: "Treks Across India" },
];

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[min(72vh,560px)] overflow-hidden bg-[#0b1220] text-white md:min-h-[min(78vh,700px)] lg:min-h-[min(84vh,780px)]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Trekkers overlooking turquoise alpine lakes and snow-capped Himalayan peaks"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(max-width: 768px) 100vw, 1400px"
          quality={75}
          className="object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,12,20,0.78)_0%,rgba(8,12,20,0.4)_48%,rgba(8,12,20,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0.15)_0%,transparent_42%,rgba(8,12,20,0.72)_100%)]" />
      </div>

      <div className="hidden md:block">
        <MountainSilhouettes />
      </div>

      <Container className="relative z-[3] flex min-h-[min(72vh,560px)] flex-col justify-end pt-16 pb-16 md:min-h-[min(78vh,700px)] md:justify-center md:pt-14 md:pb-36 lg:min-h-[min(84vh,780px)] lg:pb-44">
        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(220px,0.48fr)] lg:gap-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#2D5A27] px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
              <Mountain className="h-3.5 w-3.5 text-[#C5E063]" aria-hidden />
              Premium Himalayan Adventures
            </p>

            <p className="mt-4 font-heading text-[clamp(1.85rem,7vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] uppercase md:mt-5">
              <span className="text-white">Explore India&apos;s</span>
              <span className="mt-0.5 block font-brush text-[clamp(2.4rem,9vw,5.5rem)] font-bold normal-case leading-[0.92] tracking-normal text-[#B8E04A]">
                Wild Side
              </span>
            </p>

            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/85 md:mt-4 md:text-sm lg:text-[15px]">
              Curated Himalayan treks with expert local guides &amp; unforgettable mountain
              experiences.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-7 md:gap-4">
              <Link
                href="/treks"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#244820] bg-[#2D5A27] px-5 py-2.5 text-xs font-bold !text-white shadow-[0_8px_20px_rgba(45,90,39,0.35)] transition hover:bg-[#244820] md:px-6 md:py-3 md:text-sm"
              >
                Explore Treks
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
              </Link>

              <button
                type="button"
                className="group inline-flex items-center gap-2.5 text-left"
                aria-label="Watch film — Experience Himalayas"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition group-hover:bg-white/20 md:h-11 md:w-11">
                  <Play className="h-3.5 w-3.5 fill-current md:h-4 md:w-4" aria-hidden />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white md:text-sm">Watch Film</span>
                  <span className="text-[10px] text-white/60 md:text-xs">Experience Himalayas</span>
                </span>
              </button>
            </div>

            {/* Mobile-only stats — kept for any accidental narrow use; DesktopHome is md+ */}
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

          {/* Desktop floating glass cards */}
          <ul className="mx-auto hidden w-full max-w-[260px] flex-col gap-3 lg:ml-auto lg:flex">
            {floatingStats.map((stat) => (
              <li
                key={stat.id}
                className="flex items-center gap-3 rounded-2xl border border-white/20 bg-[#1a222c]/55 px-4 py-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-md"
              >
                <StatIcon id={stat.id} />
                <div>
                  <p className="font-heading text-xl font-extrabold leading-none text-white">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-[12px] font-medium text-white/75">{stat.subtitle}</p>
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
    if (compact) {
      return (
        <div className="flex shrink-0 gap-0.5 text-[#FBBF24]" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 fill-current" />
          ))}
        </div>
      );
    }
    return (
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D5A27]/90 text-[#C5E063]"
        aria-hidden
      >
        <Star className="h-5 w-5 fill-current" />
      </span>
    );
  }
  if (id === "safety") {
    if (compact) {
      return <ShieldCheck className="h-5 w-5 text-lime" strokeWidth={1.5} aria-hidden />;
    }
    return (
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D5A27]/90 text-[#C5E063]"
        aria-hidden
      >
        <ShieldCheck className="h-5 w-5" strokeWidth={1.6} />
      </span>
    );
  }
  if (compact) {
    return <Users className="h-5 w-5 text-lime" strokeWidth={1.5} aria-hidden />;
  }
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D5A27]/90 text-[#C5E063]"
      aria-hidden
    >
      <Users className="h-5 w-5" strokeWidth={1.6} />
    </span>
  );
}
