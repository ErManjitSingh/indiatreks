"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BLUR_DATA_URL } from "@/constants/media";
import { testimonials } from "@/data/homepage";

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Section spacing="md">
      <Container>
        <SectionHeader
          eyebrow="Testimonials"
          title="Stories from the trail"
          description="Real travelers. Real summits. Experiences that stay long after the boots come off."
          action={
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous testimonial"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next testimonial"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          }
        />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="min-w-0 shrink-0 grow-0 basis-[88%] rounded-3xl border border-border bg-card p-6 shadow-sm sm:basis-[70%] md:basis-[48%] lg:basis-[38%]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      sizes="56px"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < item.rating ? "fill-accent text-accent" : "text-border"}`}
                      aria-hidden
                    />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-foreground/90 md:text-[15px]">
                  “{item.experience}”
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {item.trekName}
                </p>

                {item.videoUrl ? (
                  <Button asChild variant="outline" size="sm" className="mt-5">
                    <Link href={item.videoUrl} target="_blank" rel="noopener noreferrer">
                      <Play className="h-3.5 w-3.5" aria-hidden />
                      Video review
                    </Link>
                  </Button>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
