"use client";

import { ChevronLeft, ChevronRight, Images, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { cn } from "@/lib/utils";
import type { TrekDetail } from "@/types/trek-detail";

export function TrekMediaGallery({ trek }: { trek: TrekDetail }) {
  const photos = [
    ...trek.heroImages.map((src, i) => ({ src, alt: `${trek.title} photo ${i + 1}` })),
    ...trek.gallery,
  ];
  const unique = photos.filter(
    (photo, index, arr) => arr.findIndex((p) => p.src === photo.src) === index,
  );
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const main = unique[index] ?? unique[0];
  const sideA = unique[1] ?? unique[0];
  const sideB = unique[2] ?? unique[0];
  const videoThumb = unique[3] ?? unique[0];
  const count = Math.max(unique.length, trek.gallery.length);

  const prev = () => setIndex((i) => (i === 0 ? unique.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % unique.length);

  return (
    <section aria-label="Trek gallery" className="mb-8">
      <div className="grid gap-2.5 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:grid-rows-[1fr_1fr] md:gap-3 md:min-h-[440px]">
        <div className="relative min-h-[240px] overflow-hidden rounded-2xl md:row-span-2 md:min-h-0">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            priority
            quality={65}
            sizes={IMAGE_SIZES.hero}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />

          <button
            type="button"
            aria-label="Previous photo"
            onClick={prev}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1A1A1A] shadow-md transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={next}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1A1A1A] shadow-md transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-[#1A1A1A] shadow-md"
          >
            <Images className="h-3.5 w-3.5" aria-hidden />
            View Photos ({count})
          </button>
        </div>

        <button
          type="button"
          className="relative hidden min-h-[200px] overflow-hidden rounded-2xl md:block md:min-h-0"
          onClick={() => {
            setIndex(1);
            setLightbox(true);
          }}
        >
          <Image
            src={sideA.src}
            alt={sideA.alt}
            fill
            sizes="40vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </button>

        <div className="hidden min-h-0 gap-3 md:grid md:grid-cols-2">
          <button
            type="button"
            className="relative min-h-[180px] overflow-hidden rounded-2xl"
            onClick={() => {
              setIndex(2);
              setLightbox(true);
            }}
          >
            <Image
              src={sideB.src}
              alt={sideB.alt}
              fill
              sizes="20vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </button>

          <button
            type="button"
            className="relative min-h-[180px] overflow-hidden rounded-2xl"
            onClick={() => {
              if (trek.heroVideo) window.open(trek.heroVideo, "_blank", "noopener,noreferrer");
              else setLightbox(true);
            }}
          >
            <Image
              src={videoThumb.src}
              alt="Watch trek video"
              fill
              sizes="20vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-dark/45 text-white">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#2D5A27] shadow-lg">
                <Play className="h-5 w-5 fill-current" aria-hidden />
              </span>
              <span className="text-xs font-bold tracking-wide">Watch Trek Video</span>
            </span>
          </button>
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal
          aria-label="Photo lightbox"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative h-[min(80vh,800px)] w-[min(92vw,1100px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={unique[index]?.src ?? main.src}
              alt={unique[index]?.alt ?? trek.title}
              fill
              sizes="92vw"
              quality={70}
              className="object-contain"
            />
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {unique.slice(0, 8).map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  className={cn(
                    "h-2 w-2 rounded-full bg-white/40",
                    i === index && "w-6 bg-white",
                  )}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
