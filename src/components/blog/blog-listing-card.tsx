import Link from "next/link";
import { ArrowRight, BadgeCheck, Eye } from "lucide-react";

import { AppImage } from "@/components/ui/app-image";
import type { BlogCard } from "@/lib/api/blogs";
import { cn } from "@/lib/utils";

function formatDate(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatViews(value?: number) {
  const n = Number(value || 0);
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function BlogListingCard({ blog, className }: { blog: BlogCard; className?: string }) {
  const author = blog.author?.name || "Editorial Team";
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5EBE3] bg-white shadow-[0_8px_24px_rgba(20,40,18,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(20,40,18,0.1)]",
        className,
      )}
    >
      <Link href={`/blogs/${blog.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <AppImage
          src={blog.coverImage || "/images/og-default.jpg"}
          alt={blog.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
        <span className="absolute left-3 top-3 rounded-md bg-[#2D5A27] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-white uppercase">
          {blog.category || "Guide"}
        </span>
        <span className="absolute right-3 top-3 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {blog.readingTimeMinutes || 8} min read
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B7668]">
          <span>{formatDate(blog.publishedAt)}</span>
          <span className="inline-flex items-center gap-1">
            By {author}
            <BadgeCheck className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
          </span>
        </div>

        <h3 className="mt-2 font-heading text-[1.05rem] font-bold leading-snug text-[#122016] transition group-hover:text-[#2D5A27]">
          <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
        </h3>

        {blog.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#6B7668]">{blog.excerpt}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#EEF2EC] pt-3.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7668]">
            <Eye className="h-3.5 w-3.5" aria-hidden />
            {formatViews(blog.views)} views
          </span>
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#2D5A27] transition hover:gap-1.5"
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
