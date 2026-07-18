"use client";

import { BadgeCheck, Play, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { BLUR_DATA_URL } from "@/constants/media";
import type { TrekDetail } from "@/types/trek-detail";
import { formatDate } from "@/utils";

export function TrekReviews({ trek }: { trek: TrekDetail }) {
  const [helpful, setHelpful] = useState<Record<string, number>>({});

  return (
    <section id="reviews" data-trek-section="reviews" className="scroll-mt-28 border-t border-[#e8ece6] pt-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2D5A27]">
            Customer Reviews
          </p>
          <h2 className="mt-1 font-heading text-2xl font-bold text-[#1A1A1A]">
            Stories from fellow trekkers
          </h2>
        </div>
        <Button type="button" variant="outline" onClick={() => toast.info("Review form opens soon")}>
          Write Review
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {trek.reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={review.photo}
                  alt={review.name}
                  fill
                  sizes="48px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold">{review.name}</h3>
                  {review.verified ? (
                    <Badge variant="success" className="gap-1 normal-case">
                      <BadgeCheck className="h-3 w-3" aria-hidden />
                      Verified
                    </Badge>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-1" aria-label={`${review.rating} stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{review.comment}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  setHelpful((prev) => ({
                    ...prev,
                    [review.id]: (prev[review.id] ?? review.helpfulCount) + 1,
                  }))
                }
              >
                <ThumbsUp className="h-3.5 w-3.5" aria-hidden />
                Helpful ({helpful[review.id] ?? review.helpfulCount})
              </Button>
              {review.videoUrl ? (
                <Button asChild size="sm" variant="ghost">
                  <Link href={review.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="h-3.5 w-3.5" aria-hidden />
                    Video review
                  </Link>
                </Button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
