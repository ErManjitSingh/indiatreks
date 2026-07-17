import Image from "next/image";
import { BookOpen, Eye, FolderOpen, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { BLUR_DATA_URL } from "@/constants/media";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80";

export function BlogsHero({
  articleCount,
  categoryCount,
}: {
  articleCount: number;
  categoryCount: number;
}) {
  const stats = [
    {
      label: "Articles",
      value: `${Math.max(articleCount, 1)}+`,
      icon: BookOpen,
    },
    {
      label: "Categories",
      value: `${Math.max(categoryCount, 1)}+`,
      icon: FolderOpen,
    },
    {
      label: "Readers",
      value: "50K+",
      icon: Eye,
    },
    {
      label: "Rating",
      value: "4.8",
      icon: Star,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden border-b border-[#E5EBE3] bg-[#F4F7F2]">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Himalayan mountains travel blog"
          fill
          priority
          sizes="100vw"
          quality={75}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,250,246,0.96)_0%,rgba(247,250,246,0.88)_38%,rgba(247,250,246,0.45)_62%,rgba(247,250,246,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,250,246,0.35)_0%,rgba(247,250,246,0.15)_50%,rgba(247,250,246,0.75)_100%)]" />
      </div>

      <Container className="relative z-[1] py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-xl">
            <h1 className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-[#122016]">
              Travel Blog & Himalayan Guide
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#4F5D4E] md:text-base">
              Travel stories, trekking guides, tips and inspiration from the Himalayas.
            </p>
          </div>

          <div className="justify-self-start lg:justify-self-end">
            <div className="grid w-full max-w-md grid-cols-2 gap-3 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_18px_40px_rgba(20,40,18,0.14)] backdrop-blur sm:gap-4 sm:p-5">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl bg-[#F4F8F2] px-3 py-3.5 sm:px-4">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E2F0DE] text-[#2D5A27]">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="mt-2 font-heading text-xl font-bold text-[#122016] sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium text-[#6B7668]">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
