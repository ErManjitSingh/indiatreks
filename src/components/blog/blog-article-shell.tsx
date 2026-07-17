"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Copy, Printer, Share2 } from "lucide-react";

import { BlogContent } from "@/components/blog/blog-content";
import { AppImage } from "@/components/ui/app-image";
import { Button } from "@/components/ui/button";
import { recordBlogView } from "@/lib/api/blogs";

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
    blogs?: Array<{ slug: string; title: string; excerpt?: string; coverImage?: string }>;
    treks?: Array<{ slug: string; title?: string; summary?: string }>;
    destinations?: Array<{ slug: string; name?: string; summary?: string }>;
  };
};

export function BlogArticleShell({ blog, previous, next, related }: BlogArticleProps) {
  const [progress, setProgress] = useState(0);
  const toc = blog.tableOfContents ?? [];
  const faqs = blog.faq ?? [];
  const internalLinks = blog.internalLinks ?? [];
  const gallery = blog.gallery ?? [];

  useEffect(() => {
    void recordBlogView(blog.slug).catch(() => undefined);
  }, [blog.slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? Math.min(100, (scrolled / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      <article className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          {toc.length ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-border/70 bg-background/95 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</p>
                <ul className="mt-3 max-h-[70vh] space-y-2 overflow-auto text-sm">
                  {toc.map((item) => (
                    <li key={item.id} style={{ paddingLeft: `${Math.max(0, item.level - 2) * 10}px` }}>
                      <a href={`#${item.id}`} className="text-muted-foreground hover:text-foreground">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : (
            <div className="hidden lg:block" />
          )}

          <div className="min-w-0">
            <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/blogs" className="hover:text-foreground">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{blog.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
              <span>{blog.category || "Guide"}</span>
              {blog.readingTimeMinutes ? <span>{blog.readingTimeMinutes} min read</span> : null}
              {blog.views ? <span>{blog.views.toLocaleString()} views</span> : null}
            </div>

            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">{blog.title}</h1>
            {blog.excerpt ? <p className="mt-4 text-lg text-muted-foreground">{blog.excerpt}</p> : null}

            <div className="mt-5 flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => void copyLink()}>
                <Copy className="mr-2 h-4 w-4" /> Copy link
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (navigator.share) void navigator.share({ title: blog.title, url: window.location.href });
                }}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => localStorage.setItem(`bookmark:${blog.slug}`, "1")}>
                <Bookmark className="mr-2 h-4 w-4" /> Bookmark
              </Button>
            </div>

            {blog.coverImage ? (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
                <AppImage src={blog.coverImage} alt={blog.title} fill priority sizes="100vw" />
              </div>
            ) : null}

            <div className="prose prose-neutral mt-8 max-w-none">
              {blog.content ? <BlogContent content={blog.content} /> : null}
            </div>

            {gallery.length ? (
              <section className="mt-10">
                <h2 className="font-heading text-xl font-semibold">Gallery</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {gallery.map((image) => (
                    <figure key={image.url} className="overflow-hidden rounded-2xl border border-border/70">
                      <div className="relative aspect-[4/3]">
                        <AppImage src={image.url} alt={image.alt || blog.title} fill sizes="(max-width:768px) 100vw, 50vw" />
                      </div>
                      {image.caption ? <figcaption className="p-3 text-sm text-muted-foreground">{image.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            {blog.author?.name ? (
              <section className="mt-10 rounded-2xl border border-border/70 bg-muted/20 p-5">
                <h2 className="font-heading text-lg font-semibold">About the author</h2>
                <p className="mt-2 font-medium text-foreground">{blog.author.name}</p>
                {blog.author.bio ? <p className="mt-2 text-sm text-muted-foreground">{blog.author.bio}</p> : null}
              </section>
            ) : null}

            {internalLinks.length ? (
              <section className="mt-10">
                <h2 className="font-heading text-xl font-semibold">Related reading</h2>
                <ul className="mt-3 space-y-2">
                  {internalLinks.map((link) => (
                    <li key={link.url}>
                      <Link href={link.url} className="text-sm text-primary underline-offset-2 hover:underline">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {faqs.length ? (
              <section className="mt-10">
                <h2 className="font-heading text-xl font-semibold">Frequently asked questions</h2>
                <div className="mt-4 space-y-3">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="rounded-xl border border-border/70 p-4">
                      <summary className="cursor-pointer font-medium">{faq.question}</summary>
                      <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {related?.blogs?.length || related?.treks?.length || related?.destinations?.length ? (
              <section className="mt-10 space-y-6">
                {related.blogs?.length ? (
                  <div>
                    <h2 className="font-heading text-xl font-semibold">Related articles</h2>
                    <ul className="mt-3 space-y-2">
                      {related.blogs.map((item) => (
                        <li key={item.slug}>
                          <Link href={`/blogs/${item.slug}`} className="text-primary hover:underline">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {related.treks?.length ? (
                  <div>
                    <h2 className="font-heading text-xl font-semibold">Related treks</h2>
                    <ul className="mt-3 space-y-2">
                      {related.treks.map((item) => (
                        <li key={item.slug}>
                          <Link href={`/treks/${item.slug}`} className="text-primary hover:underline">
                            {item.title || item.slug}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {related.destinations?.length ? (
                  <div>
                    <h2 className="font-heading text-xl font-semibold">Related destinations</h2>
                    <ul className="mt-3 space-y-2">
                      {related.destinations.map((item) => (
                        <li key={item.slug}>
                          <Link href={`/destinations/${item.slug}`} className="text-primary hover:underline">
                            {item.name || item.slug}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            ) : null}

            <nav className="mt-12 flex items-center justify-between gap-4 border-t border-border/70 pt-6 text-sm">
              {previous ? (
                <Link href={`/blogs/${previous.slug}`} className="hover:underline">
                  ← {previous.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/blogs/${next.slug}`} className="hover:underline">
                  {next.title} →
                </Link>
              ) : null}
            </nav>
          </div>
        </div>
      </article>
    </>
  );
}
