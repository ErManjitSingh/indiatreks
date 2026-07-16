"use client";

import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mountain,
  Trees,
  Waves,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { Container } from "@/components/ui/container";
import { trekImages } from "@/constants/trek-images";
import { BLUR_DATA_URL } from "@/constants/media";
import { destinationShowcases as staticShowcases, type DestinationShowcase } from "@/data/homepage";
import { useSiteContent } from "@/providers/site-content-provider";
import { cn } from "@/lib/utils";

function RegionIcon({ type }: { type: DestinationShowcase["icon"] }) {
  const cls = "h-3.5 w-3.5 text-[#1B3022]";
  if (type === "temple") return <Mountain className={cls} aria-hidden />;
  if (type === "lake") return <Waves className={cls} aria-hidden />;
  if (type === "desert") return <Mountain className={cls} aria-hidden />;
  if (type === "pine") return <Trees className={cls} aria-hidden />;
  return <Mountain className={cls} aria-hidden />;
}

export function DestinationsSection() {
  const { destinationShowcases, site } = useSiteContent();
  const showcases = destinationShowcases.length ? destinationShowcases : staticShowcases;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    startIndex: 2,
  });
  const [selected, setSelected] = useState(2);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      id="destinations"
      className="bg-[#f4f5f2] py-12 sm:py-14 md:py-16"
      aria-labelledby="destinations-heading"
    >
      <Container>
        <div className="relative mb-8 text-center sm:mb-10">
          <div className="absolute top-0 right-0 hidden items-center gap-2 sm:flex">
            <CarouselBtn label="Previous destinations" onClick={() => emblaApi?.scrollPrev()}>
              <ChevronLeft className="h-4 w-4" />
            </CarouselBtn>
            <CarouselBtn
              label="Next destinations"
              onClick={() => emblaApi?.scrollNext()}
              active
            >
              <ChevronRight className="h-4 w-4" />
            </CarouselBtn>
          </div>

          <p className="inline-flex items-center gap-3 font-display text-[11px] font-semibold tracking-[0.28em] text-[#1B3022] uppercase">
            <span className="h-px w-8 bg-[#1B3022]/35" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Mountain className="h-3.5 w-3.5" aria-hidden />
              Explore India
            </span>
            <span className="h-px w-8 bg-[#1B3022]/35" aria-hidden />
          </p>

          <h2
            id="destinations-heading"
            className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-[#1a1a1a]"
          >
            Destinations That{" "}
            <span className="text-[#1B3022]">Take Your Breath Away</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-[#6b7668] sm:text-sm">
            From snow-capped peaks to lush green valleys, discover the most incredible trekking
            destinations across India.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
            <CarouselBtn label="Previous destinations" onClick={() => emblaApi?.scrollPrev()}>
              <ChevronLeft className="h-4 w-4" />
            </CarouselBtn>
            <CarouselBtn
              label="Next destinations"
              onClick={() => emblaApi?.scrollNext()}
              active
            >
              <ChevronRight className="h-4 w-4" />
            </CarouselBtn>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {showcases.map((dest, index) => {
              const isActive = index === selected;
              return (
                <div
                  key={dest.id}
                  className="min-w-0 shrink-0 grow-0 basis-[85%] px-2 sm:basis-[48%] md:basis-[38%] lg:basis-[28%] xl:basis-[22%]"
                >
                  <DestinationCard dest={dest} featured={isActive} />
                </div>
              );
            })}
          </div>
        </div>

        <DestinationHelpBanner />
      </Container>
    </section>
  );
}

function DestinationCard({
  dest,
  featured,
}: {
  dest: DestinationShowcase;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] transition duration-300",
        featured
          ? "scale-[1.02] shadow-[0_18px_50px_rgba(27,48,34,0.28)] ring-2 ring-[#7cb342]/50"
          : "shadow-[0_10px_28px_rgba(0,0,0,0.12)] ring-1 ring-black/10",
      )}
    >
      <div className="relative aspect-[4/3.2] overflow-hidden">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          sizes="(max-width: 768px) 85vw, 280px"
          placeholder="blur"
          blurDataURL={dest.blurDataURL ?? BLUR_DATA_URL}
          quality={75}
          className="object-cover"
        />
        <span className="absolute top-3 right-3 z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
          <RegionIcon type={dest.icon} />
        </span>
        <span className="absolute bottom-3 left-3 z-[1] rounded-full bg-[#3d6b2f] px-2.5 py-1 text-[9px] font-extrabold tracking-[0.06em] text-white uppercase">
          {dest.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-white">
            {dest.name}
          </h3>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/65">
            {dest.description}
          </p>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
          <Meta icon={<Mountain className="h-3 w-3" />} label={dest.trekCountLabel} />
          <Meta icon={<MapPin className="h-3 w-3" />} label={dest.destinationCountLabel} />
          <Meta icon={<CalendarDays className="h-3 w-3" />} label={dest.bestTime} />
        </div>

        <Link
          href={
            dest.slug === "himachal-pradesh"
              ? "/treks?state=Himachal%20Pradesh"
              : dest.slug === "uttarakhand"
                ? "/treks?state=Uttarakhand"
                : `/treks?q=${encodeURIComponent(dest.name)}`
          }
          className="inline-flex items-center gap-1.5 pt-1 text-[13px] font-semibold text-[#C5E063] transition hover:text-lime"
        >
          Explore Region
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function Meta({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="min-w-0">
      <span className="mb-1 inline-flex text-white/55">{icon}</span>
      <p className="truncate text-[10px] leading-snug text-white/70">{label}</p>
    </div>
  );
}

function CarouselBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
        active
          ? "border-[#1B3022] bg-white text-[#1B3022] shadow-sm"
          : "border-[#cfd6c6] bg-white text-[#1B3022] hover:border-[#1B3022]",
      )}
    >
      {children}
    </button>
  );
}

function DestinationHelpBanner() {
  const { site } = useSiteContent();
  const waHref = `https://wa.me/${String(site.whatsapp ?? "").replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi! I need help choosing a trekking destination.",
  )}`;

  return (
    <div className="mt-10 rounded-2xl bg-[#eef2ea] px-4 py-5 sm:mt-12 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center -space-x-2">
            {[
              trekImages.avatar3,
              trekImages.avatar2,
              trekImages.avatar5,
            ].map((src) => (
              <span
                key={src}
                className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#eef2ea]"
              >
                <Image src={src} alt="" fill sizes="40px" className="object-cover" />
              </span>
            ))}
            <span className="relative z-[1] inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#3d6b2f] text-[10px] font-extrabold text-white ring-2 ring-[#eef2ea]">
              10K+
            </span>
          </div>
          <div className="min-w-0 max-w-sm">
            <p className="font-heading text-[15px] font-bold text-[#14201a]">
              Not sure where to go?
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#6b7668]">
              Get personalized recommendations from our trekking experts.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#d5dccf]">
          {[
            { title: "Expert Guidance", caption: "From experienced professionals" },
            { title: "Personalized Plans", caption: "Custom itineraries just for you" },
            { title: "24x7 Support", caption: "We're here when you need us" },
          ].map((item) => (
            <li key={item.title} className="sm:px-4">
              <p className="text-[12px] font-bold text-[#14201a]">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-[#6b7668]">{item.caption}</p>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 flex-col items-start gap-2 xl:items-end">
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#d0d5cc] bg-white px-5 py-3 text-sm font-bold text-[#1A1A1A] shadow-sm transition hover:bg-[#F7F8F6]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat with Expert
          </Link>
          <p className="text-[11px] text-[#6b7668]">
            or Call:{" "}
            <a
              href={`tel:${String(site.phone ?? "").replace(/\s/g, "")}`}
              className="font-semibold text-[#14201a]"
            >
              {String(site.phone ?? "")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.89 9.88Z" />
    </svg>
  );
}
