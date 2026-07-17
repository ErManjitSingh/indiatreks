import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo";
import { AppImage } from "@/components/ui/app-image";
import { createMetadata, breadcrumbJsonLd, blogJsonLd } from "@/lib/seo";
import { apiGet } from "@/lib/api/client";

export const revalidate = 3600;

type BlogCard = {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  readingTimeMinutes?: number;
  publishedAt?: string;
  author?: { name?: string };
};

export const metadata: Metadata = createMetadata({
  title: "Trekking Blog & Guides",
  description:
    "Read expert trekking guides, destination tips, packing lists, and Himalayan adventure stories from India Holiday Destinations.",
  canonical: "/blogs",
  keywords: ["trekking blog", "himalayan guides", "trek tips", "India Holiday Destinations"],
});

async function fetchBlogs(): Promise<BlogCard[]> {
  try {
    const res = await apiGet<BlogCard[]>("/blogs", { status: "published", limit: 50 });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Blog" },
        ])}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Trekking Blog</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Guides, stories, and practical advice for Himalayan adventures.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.slug} className="group overflow-hidden rounded-2xl border border-border/70 bg-background">
              <Link href={`/blogs/${blog.slug}`} className="block">
                <div className="relative aspect-[16/10]">
                  <AppImage
                    src={blog.coverImage || "/images/og-default.jpg"}
                    alt={blog.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {blog.category || "Guide"}
                    {blog.readingTimeMinutes ? ` · ${blog.readingTimeMinutes} min read` : ""}
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-semibold text-foreground group-hover:underline">
                    {blog.title}
                  </h2>
                  {blog.excerpt ? (
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{blog.excerpt}</p>
                  ) : null}
                </div>
              </Link>
            </article>
          ))}
          {!blogs.length ? (
            <p className="text-sm text-muted-foreground col-span-full">
              Blog posts will appear here once published from the admin panel.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
