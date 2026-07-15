"use client";

import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { cn } from "@/lib/utils";
import type { TrekDetail } from "@/types/trek-detail";

interface TrekGalleryProps {
  trek: TrekDetail;
}

export function TrekGallery({ trek }: TrekGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((i) => (i === null ? 0 : (i + 1) % trek.gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((i) =>
          i === null ? 0 : i === 0 ? trek.gallery.length - 1 : i - 1,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, trek.gallery.length]);

  return (
    <Section spacing="sm" id="gallery">
      <Container>
        <SectionHeader
          eyebrow="Gallery"
          title="Moments from the trail"
          description="Open any frame for fullscreen light-box viewing with keyboard and swipe-friendly controls."
        />
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {trek.gallery.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className={cn(
                "group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl",
                photo.span === "tall" && "aspect-[3/4]",
                photo.span === "wide" && "aspect-[16/10]",
                photo.span === "square" && "aspect-square",
              )}
              onClick={() => setActive(index)}
              aria-label={`Open ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={IMAGE_SIZES.gallery}
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-dark/0 transition group-hover:bg-dark/30">
                <ZoomIn className="h-6 w-6 text-white opacity-0 transition group-hover:opacity-100" />
              </span>
            </button>
          ))}
        </div>
      </Container>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-xl bg-white/10 p-2 text-white"
            aria-label="Close lightbox"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-[min(80vh,800px)] w-[min(92vw,1100px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={trek.gallery[active].src}
              alt={trek.gallery[active].alt}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </Section>
  );
}
