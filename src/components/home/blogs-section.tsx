"use client";

import { ArrowRight, Mountain, PencilLine } from "lucide-react";
import Link from "next/link";

import { BlogListingCard } from "@/components/blog/blog-listing-card";
import { Container } from "@/components/ui/container";
import type { BlogCard as ApiBlogCard } from "@/lib/api/blogs";
import { useSiteContent } from "@/providers/site-content-provider";

/** Same card language as the public /blogs mockup. */
function toListingCard(post: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTimeMinutes: number;
  author: string;
  publishedAt: string;
  image: string;
  views?: number;
}): ApiBlogCard {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.image,
    category: post.category,
    readingTimeMinutes: post.readingTimeMinutes,
    publishedAt: post.publishedAt,
    views: post.views,
    author: { name: post.author || "Editorial Team" },
  };
}

export function BlogsSection() {
  const { latestBlogs } = useSiteContent();
  const posts = latestBlogs.slice(0, 3).map(toListingCard);
  if (!posts.length) return null;

  return (
    <section
      id="latest-blogs"
      className="relative overflow-hidden bg-[#F7FAF6] py-10 md:py-16"
      aria-labelledby="home-blogs-heading"
    >
      <Container>
        {/* Mobile header — matches Popular Treks / blogs mockup tone */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h2
            id="home-blogs-heading"
            className="font-heading text-lg font-extrabold tracking-tight text-[#14201a] uppercase"
          >
            Latest Blogs
          </h2>
          <Link href="/blogs" className="inline-flex items-center gap-1 text-xs font-bold text-[#2D5A27]">
            View All
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* Desktop header */}
        <div className="mb-8 hidden flex-col items-center text-center md:flex">
          <Mountain className="mb-2 h-7 w-7 text-[#6b8f3c]" strokeWidth={1.4} aria-hidden />
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] text-[#2D5A27] uppercase">
            <PencilLine className="h-3.5 w-3.5" aria-hidden />
            Travel Journal
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#14201a] md:text-[2.15rem]">
            Latest from the Blog
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#6b7668]">
            Trek guides, destination tips, and Himalayan stories — same cards as our full blog journal.
          </p>
          <Link
            href="/blogs"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#2D5A27]/20 bg-white px-4 py-2 text-sm font-bold text-[#2D5A27] transition hover:bg-[#EAF4E8]"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {/* Mobile: horizontal scroll of listing cards */}
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posts.map((post) => (
            <div key={post.slug} className="w-[82%] max-w-[300px] shrink-0">
              <BlogListingCard blog={post} />
            </div>
          ))}
        </div>

        {/* Desktop: 3-column grid — identical to /blogs mockup cards */}
        <div className="hidden gap-5 md:grid md:grid-cols-3">
          {posts.map((post) => (
            <BlogListingCard key={post.slug} blog={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
