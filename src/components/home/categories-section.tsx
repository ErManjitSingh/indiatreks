"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FadeUp, Stagger } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { trekCategoryCards } from "@/data/homepage";

export function CategoriesSection() {
  return (
    <Section spacing="md">
      <Container>
        <SectionHeader
          eyebrow="Trek Categories"
          title="Choose your kind of adventure"
          description="Whether you want snow silence, weekend bursts, or camera-first routes — start with a feeling."
          align="center"
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trekCategoryCards.map((category, index) => (
            <FadeUp key={category.id} delay={index * 0.04}>
              <Link
                href={category.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes={IMAGE_SIZES.card}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-dark/35 to-transparent transition group-hover:from-forest-dark" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">{category.title}</h3>
                  <p className="mt-1 text-sm text-white/75">{category.description}</p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
