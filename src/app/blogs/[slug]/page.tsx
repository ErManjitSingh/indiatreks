import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticleShell } from "@/components/blog/blog-article-shell";
import { JsonLd } from "@/components/seo";
import { blogJsonLd, breadcrumbJsonLd, createMetadata, faqJsonLd } from "@/lib/seo";
import { fetchBlog, fetchBlogHub, fetchBlogRelated, fetchBlogs } from "@/lib/api/blogs";

/** Root layout uses headers(), so this page must render dynamically. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await fetchBlog(slug);
    if (!blog) {
      return createMetadata({
        title: "Blog not found",
        description: "This article could not be found.",
        canonical: `/blogs/${slug}`,
        noIndex: true,
      });
    }

    const seo = (blog.seo || {}) as Record<string, string | string[] | boolean | undefined>;
    return createMetadata({
      title: (seo.title as string) || blog.title,
      description: (seo.description as string) || blog.excerpt || "",
      canonical: (seo.canonical as string) || `/blogs/${blog.slug}`,
      keywords: (seo.keywords as string[]) || blog.tags || [blog.title],
      ogImage: (seo.ogImage as string) || blog.coverImage,
      ogTitle: seo.ogTitle as string,
      ogDescription: seo.ogDescription as string,
      twitterTitle: seo.twitterTitle as string,
      twitterDescription: seo.twitterDescription as string,
      twitterImage: seo.twitterImage as string,
      type: "article",
      authors: blog.author?.name ? [blog.author.name] : undefined,
      publishedTime: blog.publishedAt,
      modifiedTime: blog.modifiedAt || blog.updatedAt,
      noIndex: seo.index === false,
    });
  } catch {
    return createMetadata({
      title: "Blog",
      description: "Travel blog article",
      canonical: `/blogs/${slug}`,
    });
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const blog = await fetchBlog(slug).catch(() => null);
  if (!blog) notFound();

  const [relatedBundle, list, hub] = await Promise.all([
    fetchBlogRelated(slug).catch(() => null),
    fetchBlogs({ status: "published", limit: 50, sort: "latest" }).catch(() => ({
      items: [] as Awaited<ReturnType<typeof fetchBlogs>>["items"],
      meta: undefined,
    })),
    fetchBlogHub().catch(() => null),
  ]);

  const blogs = list.items;
  const index = blogs.findIndex((b) => b.slug === slug);
  const previous = index > 0 ? blogs[index - 1] : null;
  const next = index >= 0 && index < blogs.length - 1 ? blogs[index + 1] : null;
  const faqs = blog.faq ?? [];
  const trending = (hub?.trending || hub?.popular || []).filter((item) => item.slug !== slug);

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

      <BlogArticleShell
        blog={blog}
        previous={previous}
        next={next}
        related={relatedBundle || undefined}
        trending={trending}
        categories={hub?.categories || []}
      />
    </>
  );
}
