"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Clock3,
  Copy,
  PencilLine,
  Phone,
  Printer,
  Share2,
} from "lucide-react";

import { BlogContent } from "@/components/blog/blog-content";
import { AppImage } from "@/components/ui/app-image";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { BLUR_DATA_URL } from "@/constants/media";
import { recordBlogView, type BlogCard } from "@/lib/api/blogs";
import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type TocItem = { id: string; title: string; level: number };
type FaqItem = { question: string; answer: string };
type LinkItem = { title: string; url: string };
type GalleryItem = { url: string; alt?: string; caption?: string };

export type BlogArticleProps = {
  blog: {
    slug: string;
    title: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    category?: string;
    readingTimeMinutes?: number;
    publishedAt?: string;
    updatedAt?: string;
    modifiedAt?: string;
    views?: number;
    author?: { name?: string; bio?: string; avatar?: string };
    gallery?: GalleryItem[];
    faq?: FaqItem[];
    tableOfContents?: TocItem[];
    internalLinks?: LinkItem[];
  };
  previous?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
  related?: {
    blogs?: Array<{ slug: string; title: string; excerpt?: string; coverImage?: string; readingTimeMinutes?: number }>;
    treks?: Array<{ slug: string; title?: string; summary?: string }>;
    destinations?: Array<{ slug: string; name?: string; summary?: string }>;
  };
  trending?: BlogCard[];
  categories?: Array<{ name: string; count: number }>;
};

function formatDate(value?: string) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function authorInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}

export function BlogArticleShell({
  blog,
  previous,
  next,
  related,
  trending = [],
  categories = [],
}: BlogArticleProps) {
  const setEnquireModalOpen = useUiStore((s) => s.setEnquireModalOpen);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const toc = blog.tableOfContents ?? [];
  const faqs = blog.faq ?? [];
  const gallery = blog.gallery ?? [];
  const internalLinks = blog.internalLinks ?? [];
  const authorName = blog.author?.name || "Editorial Team";
  const published = formatDate(blog.publishedAt);
  const updated = formatDate(blog.modifiedAt || blog.updatedAt);
  const waHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi, I read "${blog.title}" and want help planning this trip.`,
  )}`;

  const trendingPosts = useMemo(() => {
    if (trending.length) return trending.slice(0, 4);
    return (related?.blogs || []).slice(0, 4);
  }, [trending, related?.blogs]);

  useEffect(() => {
    void recordBlogView(blog.slug).catch(() => undefined);
    setBookmarked(localStorage.getItem(`bookmark:${blog.slug}`) === "1");
  }, [blog.slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? Math.min(100, (scrolled / height) * 100) : 0);

      const headings = toc
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];
      let current = toc[0]?.id || "";
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 140) current = heading.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  function toggleBookmark() {
    const key = `bookmark:${blog.slug}`;
    const nextValue = !(localStorage.getItem(key) === "1");
    if (nextValue) localStorage.setItem(key, "1");
    else localStorage.removeItem(key);
    setBookmarked(nextValue);
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: blog.title, url: window.location.href, text: blog.excerpt });
      } else {
        await copyLink();
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-transparent">
        <div className="h-full bg-[#2D5A27] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero */}
      <section className="relative isolate min-h-[420px] overflow-hidden md:min-h-[480px]">
        <Image
          src={blog.coverImage || "/images/og-default.jpg"}
          alt={blog.title}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,10,0.45)_0%,rgba(8,16,10,0.55)_45%,rgba(8,16,10,0.82)_100%)]" />

        <Container className="relative z-[1] flex min-h-[420px] flex-col justify-end py-10 md:min-h-[480px] md:py-14">
          <nav className="text-xs font-medium text-white/75" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/blogs" className="hover:text-white">
                  Blogs
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="max-w-[240px] truncate text-white sm:max-w-none">{blog.title}</li>
            </ol>
          </nav>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-[#2D5A27] px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-white uppercase">
              {blog.category || "Guide"}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
              <Clock3 className="h-3.5 w-3.5" aria-hidden />
              {blog.readingTimeMinutes || 8} MIN READ
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl font-heading text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold leading-[1.1] tracking-tight text-white">
            {blog.title}
          </h1>
          {blog.excerpt ? (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/88 md:text-base">{blog.excerpt}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { label: copied ? "Copied" : "Copy Link", icon: Copy, onClick: () => void copyLink() },
              { label: "Print", icon: Printer, onClick: () => window.print() },
              { label: "Share", icon: Share2, onClick: () => void share() },
              {
                label: bookmarked ? "Saved" : "Bookmark",
                icon: Bookmark,
                onClick: toggleBookmark,
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {action.label}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#F7FAF6] py-8 md:py-12">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
            {/* Left sidebar */}
            <aside className="hidden space-y-5 xl:block">
              <div className="sticky top-24 space-y-5">
                {toc.length ? (
                  <div className="rounded-2xl border border-[#E5EBE3] bg-white p-4 shadow-sm">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[#6B7668] uppercase">
                      On This Page
                    </p>
                    <ul className="mt-3 max-h-[50vh] space-y-1 overflow-auto">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={cn(
                              "flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm transition",
                              activeId === item.id
                                ? "bg-[#EAF4E8] font-semibold text-[#2D5A27]"
                                : "text-[#4F5D4E] hover:bg-[#F4F8F2]",
                            )}
                          >
                            <span
                              className={cn(
                                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                                activeId === item.id ? "bg-[#2D5A27]" : "bg-transparent",
                              )}
                            />
                            <span className="leading-snug">{item.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="relative overflow-hidden rounded-2xl border border-[#E5EBE3] shadow-sm">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
                      alt="Plan your trip"
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="font-heading text-lg font-bold leading-snug">
                        Plan Your {blog.category || "Himalayan"} Trip
                      </p>
                      <p className="mt-1 text-xs text-white/80">
                        Customized itineraries, expert guides & best prices.
                      </p>
                      <Link
                        href="/booking"
                        className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#2D5A27] px-3.5 text-sm font-bold text-white transition hover:bg-[#244820]"
                      >
                        Plan My Trip
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEnquireModalOpen(true)}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1F4A1F] px-5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(31,74,31,0.35)] transition hover:bg-[#183A18]"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Request Callback
                </button>
              </div>
            </aside>

            {/* Main content */}
            <article className="min-w-0 rounded-2xl border border-[#E5EBE3] bg-white p-5 shadow-sm md:p-8">
              <div className="flex flex-wrap items-center gap-3 border-b border-[#EEF2EC] pb-5">
                <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#E8F5E9] text-sm font-bold text-[#166534]">
                  {blog.author?.avatar ? (
                    <AppImage src={blog.author.avatar} alt={authorName} fill sizes="44px" className="object-cover" />
                  ) : (
                    authorInitials(authorName)
                  )}
                </span>
                <div>
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#122016]">
                    By {authorName}
                    <BadgeCheck className="h-4 w-4 text-[#2D5A27]" aria-hidden />
                  </p>
                  <p className="mt-0.5 text-xs text-[#6B7668]">
                    {published || "Recently published"}
                    {updated ? ` • Updated ${updated}` : ""}
                  </p>
                </div>
              </div>

              {blog.content ? (
                <div className="blog-article-body mt-2">
                  <BlogContent content={blog.content} />
                </div>
              ) : null}

              {gallery.length ? (
                <section className="mt-10">
                  <h2 className="font-heading text-2xl font-bold text-[#122016]">Gallery</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {gallery.map((image) => (
                      <figure key={image.url} className="overflow-hidden rounded-2xl border border-[#E5EBE3]">
                        <div className="relative aspect-[4/3]">
                          <AppImage
                            src={image.url}
                            alt={image.alt || blog.title}
                            fill
                            sizes="(max-width:768px) 100vw, 40vw"
                          />
                        </div>
                        {image.caption ? (
                          <figcaption className="p-3 text-sm text-[#6B7668]">{image.caption}</figcaption>
                        ) : null}
                      </figure>
                    ))}
                  </div>
                </section>
              ) : null}

              {faqs.length ? (
                <section id="frequently-asked-questions" className="mt-10 scroll-mt-24">
                  <h2 className="font-heading text-2xl font-bold text-[#122016]">Frequently Asked Questions</h2>
                  <div className="mt-4 space-y-3">
                    {faqs.map((faq) => (
                      <details key={faq.question} className="rounded-xl border border-[#E5EBE3] bg-[#F7FAF6] p-4">
                        <summary className="cursor-pointer font-semibold text-[#122016]">{faq.question}</summary>
                        <p className="mt-2 text-sm leading-relaxed text-[#4F5D4E]">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {internalLinks.length || related?.treks?.length || related?.destinations?.length ? (
                <section className="mt-10 space-y-5 border-t border-[#EEF2EC] pt-8">
                  {internalLinks.length ? (
                    <div>
                      <h2 className="font-heading text-xl font-bold text-[#122016]">Related reading</h2>
                      <ul className="mt-3 space-y-2">
                        {internalLinks.map((link) => (
                          <li key={link.url}>
                            <Link href={link.url} className="text-sm font-medium text-[#2D5A27] hover:underline">
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {related?.treks?.length ? (
                    <div>
                      <h2 className="font-heading text-xl font-bold text-[#122016]">Related treks</h2>
                      <ul className="mt-3 space-y-2">
                        {related.treks.map((item) => (
                          <li key={item.slug}>
                            <Link href={`/treks/${item.slug}`} className="text-sm font-medium text-[#2D5A27] hover:underline">
                              {item.title || item.slug}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {related?.destinations?.length ? (
                    <div>
                      <h2 className="font-heading text-xl font-bold text-[#122016]">Related destinations</h2>
                      <ul className="mt-3 space-y-2">
                        {related.destinations.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/destinations/${item.slug}`}
                              className="text-sm font-medium text-[#2D5A27] hover:underline"
                            >
                              {item.name || item.slug}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              ) : null}

              <nav className="mt-10 flex items-center justify-between gap-4 border-t border-[#EEF2EC] pt-6 text-sm">
                {previous ? (
                  <Link href={`/blogs/${previous.slug}`} className="max-w-[45%] font-semibold text-[#2D5A27] hover:underline">
                    ← {previous.title}
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link href={`/blogs/${next.slug}`} className="max-w-[45%] text-right font-semibold text-[#2D5A27] hover:underline">
                    {next.title} →
                  </Link>
                ) : null}
              </nav>
            </article>

            {/* Right sidebar */}
            <aside className="space-y-5">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-2xl border border-[#E5EBE3] bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4E8] text-[#2D5A27]">
                      <PencilLine className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <h2 className="font-heading text-base font-bold text-[#122016]">Share Your Story</h2>
                      <p className="mt-1 text-sm text-[#6B7668]">
                        Write about your Himalayan trip and get featured on our journal.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2D5A27] text-sm font-bold text-white transition hover:bg-[#244820]"
                  >
                    Write For Us
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>

                {trendingPosts.length ? (
                  <div className="rounded-2xl border border-[#E5EBE3] bg-white p-5 shadow-sm">
                    <h2 className="font-heading text-base font-bold text-[#122016]">Trending Posts</h2>
                    <ul className="mt-4 space-y-3">
                      {trendingPosts.map((post) => (
                        <li key={post.slug}>
                          <Link href={`/blogs/${post.slug}`} className="group flex gap-3">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F1F5EF]">
                              <AppImage
                                src={post.coverImage || "/images/og-default.jpg"}
                                alt={post.title}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="line-clamp-2 text-sm font-semibold text-[#122016] group-hover:text-[#2D5A27]">
                                {post.title}
                              </p>
                              <p className="mt-1 text-xs text-[#6B7668]">
                                {post.readingTimeMinutes || 8} min read
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {categories.length ? (
                  <div className="rounded-2xl border border-[#E5EBE3] bg-white p-5 shadow-sm">
                    <h2 className="font-heading text-base font-bold text-[#122016]">Popular Categories</h2>
                    <ul className="mt-3 space-y-1">
                      {categories.slice(0, 8).map((cat) => (
                        <li key={cat.name}>
                          <Link
                            href={`/blogs?category=${encodeURIComponent(cat.name)}`}
                            className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-[#3F4A40] transition hover:bg-[#F4F8F2]"
                          >
                            <span>{cat.name}</span>
                            <span className="rounded-full bg-[#EAF4E8] px-2 py-0.5 text-xs font-semibold text-[#2D5A27]">
                              {cat.count}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/blogs"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2D5A27] hover:underline"
                    >
                      View All Categories
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                ) : null}

                <div className="rounded-2xl border border-[#C9DEC6] bg-[#EAF4E8] p-5 shadow-sm">
                  <h2 className="font-heading text-base font-bold text-[#122016]">Never Miss an Update</h2>
                  <p className="mt-1 text-sm text-[#4F5D4E]">
                    Trek tips, destination guides, and new Himalayan stories.
                  </p>
                  <form
                    className="mt-3 space-y-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!email.trim()) return;
                      setSubscribed(true);
                      setEmail("");
                    }}
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="h-10 w-full rounded-xl border border-[#C9DEC6] bg-white px-3 text-sm outline-none focus:border-[#2D5A27]/50 focus:ring-2 focus:ring-[#2D5A27]/12"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#2D5A27] text-sm font-bold text-white transition hover:bg-[#244820]"
                    >
                      {subscribed ? "Subscribed ✓" : "Subscribe"}
                    </button>
                  </form>
                </div>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#D8E2D4] bg-white px-4 text-sm font-bold text-[#1B4332] shadow-sm transition hover:bg-[#F4F8F2]"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-[11px] font-black text-white">
                    WA
                  </span>
                  Chat on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Mobile sticky callback */}
      <button
        type="button"
        onClick={() => setEnquireModalOpen(true)}
        className="fixed bottom-20 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#1F4A1F] px-4 py-3 text-sm font-bold text-white shadow-lg xl:hidden"
      >
        <Phone className="h-4 w-4" aria-hidden />
        Request Callback
      </button>
    </>
  );
}
