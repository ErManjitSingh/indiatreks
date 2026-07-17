"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaButton } from "@/components/ui/cta-button";
import { BLUR_DATA_URL, IMAGE_SIZES } from "@/constants/media";
import { useSiteContent } from "@/providers/site-content-provider";
import { formatDate } from "@/utils";

export function BlogsSection() {
  const { latestBlogs } = useSiteContent();
  const [featured, ...rest] = latestBlogs;

  return (
    <Section className="bg-muted/40" spacing="md">
      <Container>
        <SectionHeader
          eyebrow="Latest Blogs"
          title="Field notes from the mountains"
          description="Guides, gear wisdom, and narrative travel writing from the trail."
          action={<CtaButton href="/blogs">Read the journal</CtaButton>}
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {featured ? (
            <Link
              href={`/blogs/${featured.slug}`}
              className="group relative overflow-hidden rounded-3xl lg:col-span-3"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-3xl">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes={IMAGE_SIZES.card}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <Badge variant="accent">{featured.category}</Badge>
                  <h3 className="mt-3 max-w-xl font-heading text-2xl font-bold text-white md:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm text-white/75 md:text-base">{featured.excerpt}</p>
                  <p className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
                    <span>{featured.author}</span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {featured.readingTimeMinutes} min read
                    </span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(featured.publishedAt)}</span>
                  </p>
                </div>
              </div>
            </Link>
          ) : null}

          <div className="flex flex-col gap-4 lg:col-span-2">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group flex gap-4 overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-36">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="144px"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center py-1 pr-2">
                  <Badge variant="soft" className="w-fit">
                    {post.category}
                  </Badge>
                  <h3 className="mt-2 line-clamp-2 font-heading text-base font-bold leading-snug text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readingTimeMinutes} min</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
