"use client";

import { ArrowRight, Clock3, PencilLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { BLUR_DATA_URL } from "@/constants/media";
import { useSiteContent } from "@/providers/site-content-provider";
import { formatDate } from "@/utils";

export function BlogsSection() {
  const { latestBlogs } = useSiteContent();
  const posts = latestBlogs.slice(0, 3);
  if (!posts.length) return null;

  return (
    <section
      id="latest-blogs"
      className="relative overflow-hidden bg-[#F7FAF6] py-10 md:py-16"
      aria-labelledby="home-blogs-heading"
    >
      <Container>
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] text-[#2D5A27] uppercase">
              <PencilLine className="h-3.5 w-3.5" aria-hidden />
              Travel Journal
            </p>
            <h2
              id="home-blogs-heading"
              className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-[#14201a] md:text-3xl"
            >
              Latest from the Blog
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B7668] md:text-[15px]">
              Trek guides, destination tips, and Himalayan stories to plan your next trip.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-[#2D5A27]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D5A27] transition hover:bg-[#EAF4E8] sm:self-auto"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex w-[82%] max-w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]"
            >
              <Link href={`/blogs/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="300px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-[#2D5A27] px-2 py-1 text-[9px] font-extrabold tracking-wide text-white uppercase">
                  {post.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-3.5">
                <p className="text-[11px] text-[#6B7668]">
                  {post.publishedAt ? formatDate(post.publishedAt) : "Recently"} ·{" "}
                  {post.readingTimeMinutes} min
                </p>
                <h3 className="mt-1.5 line-clamp-2 font-heading text-[15px] font-bold leading-snug text-[#14201a]">
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h3>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#2D5A27]"
                >
                  Read More
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden gap-5 md:grid md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]"
            >
              <Link href={`/blogs/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width:1200px) 33vw, 380px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-[#2D5A27] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-white uppercase">
                  {post.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6B7668]">
                  <span>{post.publishedAt ? formatDate(post.publishedAt) : "Recently"}</span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden />
                    {post.readingTimeMinutes} min read
                  </span>
                </p>
                <h3 className="mt-2 line-clamp-2 font-heading text-lg font-bold leading-snug text-[#14201a] transition group-hover:text-[#2D5A27]">
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.excerpt ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6B7668]">
                    {post.excerpt}
                  </p>
                ) : null}
                <Link
                  href={`/blogs/${post.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[#2D5A27] transition hover:gap-2"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
