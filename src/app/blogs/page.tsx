import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo";
import { AppImage } from "@/components/ui/app-image";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { fetchBlogHub, fetchBlogs } from "@/lib/api/blogs";

export const revalidate = 3600;

export const metadata: Metadata = createMetadata({
  title: "Travel Blog & Himalayan Guides",
  description:
    "Read expert travel guides, trekking tips, destination advice, and Himalayan stories from India Holiday Destinations.",
  canonical: "/blogs",
  keywords: ["travel blog", "trekking guides", "dharamshala travel", "India Holiday Destinations"],
});

function BlogGrid({ title, blogs }: { title: string; blogs: Array<{ slug: string; title: string; excerpt?: string; coverImage?: string; category?: string; readingTimeMinutes?: number }> }) {
  if (!blogs.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl font-semibold">{title}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  {blog.readingTimeMinutes ? ` · ${blog.readingTimeMinutes} min` : ""}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold group-hover:underline">{blog.title}</h3>
                {blog.excerpt ? <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{blog.excerpt}</p> : null}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const [{ items }, hub] = await Promise.all([
    fetchBlogs({
      status: "published",
      limit: 60,
      q: params.q,
      category: params.category,
      tag: params.tag,
      sort: params.sort || "latest",
    }),
    fetchBlogHub().catch(() => null),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Blog" },
        ])}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Travel Blog</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          In-depth guides, itineraries, trek explainers, and practical advice for Himalayan travel.
        </p>

        <form className="mt-8 flex flex-wrap gap-3" action="/blogs" method="get">
          <input
            name="q"
            defaultValue={params.q || ""}
            placeholder="Search blogs..."
            className="min-w-[220px] flex-1 rounded-xl border border-border/70 bg-background px-4 py-2 text-sm"
          />
          <select name="sort" defaultValue={params.sort || "latest"} className="rounded-xl border border-border/70 bg-background px-3 py-2 text-sm">
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
            <option value="trending">Trending</option>
          </select>
          <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Search
          </button>
        </form>

        {hub?.categories?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/blogs" className="rounded-full border border-border/70 px-3 py-1 text-sm hover:bg-muted/40">
              All
            </Link>
            {hub.categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/blogs?category=${encodeURIComponent(cat.name)}`}
                className="rounded-full border border-border/70 px-3 py-1 text-sm hover:bg-muted/40"
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        ) : null}

        <BlogGrid title={params.q ? `Search results` : "All articles"} blogs={items} />
        <BlogGrid title="Featured" blogs={hub?.featured || []} />
        <BlogGrid title="Popular" blogs={hub?.popular || []} />
        <BlogGrid title="Trending" blogs={hub?.trending || []} />
      </section>
    </>
  );
}
