import { apiGet, apiPost, type ApiSuccess } from "@/lib/api/client";
import { cachedApiGet } from "@/lib/api/cached-fetch";

async function publicGet<T>(
  path: string,
  params?: Record<string, unknown>,
  tags: string[] = ["blogs"],
): Promise<ApiSuccess<T>> {
  if (typeof window === "undefined") {
    return cachedApiGet<T>(path, { params, revalidate: 600, tags });
  }
  return apiGet<T>(path, params);
}

export type BlogCard = {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  readingTimeMinutes?: number;
  publishedAt?: string;
  views?: number;
  featured?: boolean;
  author?: { name?: string };
  tags?: string[];
};

export type BlogDetail = BlogCard & {
  content?: string;
  gallery?: Array<{ url: string; alt?: string; caption?: string }>;
  updatedAt?: string;
  modifiedAt?: string;
  faq?: Array<{ question: string; answer: string }>;
  tableOfContents?: Array<{ id: string; title: string; level: number }>;
  internalLinks?: Array<{ title: string; url: string }>;
  relatedTreks?: Array<{ slug: string; title?: string }>;
  relatedDestinations?: Array<{ slug: string; title?: string }>;
  relatedBlogs?: Array<{ slug: string; title?: string }>;
  seo?: Record<string, unknown>;
};

export async function fetchBlogs(params?: Record<string, unknown>) {
  const res = await publicGet<BlogCard[]>("/blogs", params);
  return { items: res.data ?? [], meta: res.meta };
}

export async function fetchBlog(slug: string) {
  const res = await publicGet<BlogDetail>(`/blogs/${slug}`, undefined, ["blogs", `blog-${slug}`]);
  return res.data ?? null;
}

export async function fetchBlogHub() {
  const res = await publicGet<{
    latest: BlogCard[];
    popular: BlogCard[];
    trending: BlogCard[];
    featured: BlogCard[];
    categories: Array<{ name: string; count: number }>;
  }>("/blogs/hub");
  return res.data;
}

export async function fetchBlogRelated(slug: string) {
  const res = await publicGet<{
    blogs: BlogCard[];
    treks: Array<{ slug: string; title?: string; summary?: string }>;
    destinations: Array<{ slug: string; name?: string; summary?: string }>;
  }>(`/blogs/${slug}/related`, undefined, ["blogs", `blog-${slug}`]);
  return res.data;
}

export async function recordBlogView(slug: string) {
  await apiPost(`/blogs/${slug}/view`, {});
}
