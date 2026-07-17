import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo";
import { AppImage } from "@/components/ui/app-image";
import { apiGet } from "@/lib/api/client";
import {
  blogJsonLd,
  breadcrumbJsonLd,
  createMetadata,
  faqJsonLd,
} from "@/lib/seo";

export const revalidate = 3600;

type BlogDetail = {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  readingTimeMinutes?: number;
  publishedAt?: string;
  updatedAt?: string;
  modifiedAt?: string;
  author?: { name?: string; bio?: string };
  faq?: Array<{ question: string; answer: string }>;
  tableOfContents?: Array<{ id: string; title: string; level: number }>;
  internalLinks?: Array<{ title: string; url: string }>;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    keywords?: string[];
    index?: boolean;
  };
};

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function fetchBlog(slug: string): Promise<BlogDetail | null> {
  try {
    const res = await apiGet<BlogDetail>(`/blogs/${slug}`);
    return res.data ?? null;
  } catch {
    return null;
  }
}

async function fetchAdjacent(slug: string) {
  try {
    const res = await apiGet<BlogDetail[]>("/blogs", { status: "published", limit: 100 });
    const blogs = res.data ?? [];
    const index = blogs.findIndex((b) => b.slug === slug);
    return {
      previous: index > 0 ? blogs[index - 1] : null,
      next: index >= 0 && index < blogs.length - 1 ? blogs[index + 1] : null,
    };
  } catch {
    return { previous: null, next: null };
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) {
    return createMetadata({
      title: "Blog not found",
      description: "This article could not be found.",
      canonical: `/blogs/${slug}`,
      noIndex: true,
    });
  }

  const seo = blog.seo ?? {};
  return createMetadata({
    title: seo.title || blog.title,
    description: seo.description || blog.excerpt || "",
    canonical: seo.canonical || `/blogs/${blog.slug}`,
    keywords: seo.keywords || blog.tags || [blog.title],
    ogImage: seo.ogImage || blog.coverImage,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    twitterTitle: seo.twitterTitle,
    twitterDescription: seo.twitterDescription,
    twitterImage: seo.twitterImage,
    type: "article",
    authors: blog.author?.name ? [blog.author.name] : undefined,
    publishedTime: blog.publishedAt,
    modifiedTime: blog.modifiedAt || blog.updatedAt,
    noIndex: seo.index === false,
  });
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) notFound();

  const { previous, next } = await fetchAdjacent(slug);
  const faqs = blog.faq ?? [];
  const toc = blog.tableOfContents ?? [];
  const internalLinks = blog.internalLinks ?? [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blogs" },
          { label: blog.title },
        ])}
      />
      <JsonLd
        data={blogJsonLd({
          title: blog.title,
          description: blog.excerpt || "",
          image: blog.coverImage || "/images/og-default.jpg",
          url: `/blogs/${blog.slug}`,
          publishedAt: blog.publishedAt || new Date().toISOString(),
          updatedAt: blog.modifiedAt || blog.updatedAt,
          authorName: blog.author?.name || "Editorial Team",
        })}
      />
      {faqs.length ? <JsonLd data={faqJsonLd(faqs)} /> : null}

      <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/blogs" className="hover:text-foreground">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{blog.title}</span>
        </nav>

        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {blog.category || "Guide"}
          {blog.readingTimeMinutes ? ` · ${blog.readingTimeMinutes} min read` : ""}
          {blog.author?.name ? ` · ${blog.author.name}` : ""}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">{blog.title}</h1>
        {blog.excerpt ? <p className="mt-4 text-lg text-muted-foreground">{blog.excerpt}</p> : null}

        {blog.coverImage ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <AppImage src={blog.coverImage} alt={blog.title} fill priority sizes="100vw" />
          </div>
        ) : null}

        {toc.length ? (
          <aside className="mt-8 rounded-xl border border-border/70 bg-muted/30 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">Table of contents</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {toc.map((item) => (
                <li key={item.id} style={{ paddingLeft: `${Math.max(0, item.level - 2) * 12}px` }}>
                  <a href={`#${item.id}`} className="hover:text-foreground">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-foreground">
          {blog.content}
        </div>

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
            <h2 className="font-heading text-xl font-semibold">FAQ</h2>
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
      </article>
    </>
  );
}
