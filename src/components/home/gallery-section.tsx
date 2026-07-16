"use client";

import Image from "next/image";
import Link from "next/link";

import { FadeUp } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaButton } from "@/components/ui/cta-button";
import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { useSiteContent } from "@/providers/site-content-provider";
import { cn } from "@/lib/utils";

export function GallerySection() {
  const { galleryPhotos } = useSiteContent();
  return (
    <Section className="bg-muted/30" spacing="md">
      <Container>
        <SectionHeader
          eyebrow="Photo Gallery"
          title="Moments from the high country"
          description="Immersive frames from trails, camps, and summits across India."
          action={<CtaButton href="/gallery">Open gallery</CtaButton>}
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryPhotos.map((photo, index) => (
            <FadeUp key={photo.id} delay={index * 0.05} className="mb-4 break-inside-avoid">
              <Link
                href="/gallery"
                className={cn(
                  "group relative block overflow-hidden rounded-3xl",
                  photo.span === "tall" && "aspect-[3/4]",
                  photo.span === "wide" && "aspect-[16/10]",
                  photo.span === "square" && "aspect-square",
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={IMAGE_SIZES.gallery}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark/0 transition group-hover:bg-dark/25" />
              </Link>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
