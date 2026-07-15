"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL } from "@/constants/media";
import { trekCollections } from "@/data/treks";

export function TrekCollectionPromo() {
  const collection = trekCollections[0];
  const collage = trekCollections.slice(0, 4);

  return (
    <article className="overflow-hidden rounded-xl border border-[#E8DFD0] bg-[#F3EDE3]">
      <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2D5A27]">
            Editor&apos;s Choice
          </p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-[#1A1A1A]">
            Top Adventure Collection
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {collection.description}. Curated weekend, snow, and high-altitude escapes for every
            level.
          </p>
          <Button
            asChild
            className="mt-4 border border-[#d0d5cc] bg-white text-[#1A1A1A] hover:bg-[#F7F8F6]"
          >
            <Link href={collection.href}>
              Explore Collection
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="flex justify-end -space-x-4 md:-space-x-5">
          {collage.map((item, index) => (
            <div
              key={item.id}
              className="relative h-28 w-20 overflow-hidden rounded-lg border-2 border-white shadow-md md:h-36 md:w-24"
              style={{ zIndex: collage.length - index, transform: `rotate(${(index - 1.5) * 4}deg)` }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="96px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
