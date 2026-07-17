"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AdminSeoFields,
  seoFromDoc,
  seoToPayload,
  type EnterpriseSeoForm,
} from "@/components/admin/admin-seo-fields";
import { AiSeoAssistPanel } from "@/components/admin/ai-seo-assist-panel";
import {
  AdminField,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  adminCreateBlog,
  adminGenerateBlog,
  adminUpdateBlog,
  arrayToLines,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";

type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  gallery: string;
  category: string;
  tags: string;
  status: string;
  scheduledAt: string;
  featured: boolean;
  readingTimeMinutes: string;
  authorName: string;
  faq: string;
  seo: EnterpriseSeoForm;
};

function parseTags(value: string) {
  return value
    .split(/[\n,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function tagsToString(value: unknown) {
  if (Array.isArray(value)) return value.map(String).join(", ");
  return "";
}

function parseFaq(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...rest] = line.split("|");
      return { question: question?.trim() || "", answer: rest.join("|").trim() };
    })
    .filter((f) => f.question && f.answer);
}

function faqToString(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      const row = item as { question?: string; answer?: string };
      return `${row.question || ""} | ${row.answer || ""}`;
    })
    .join("\n");
}

function parseGallery(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [url, alt, caption] = line.split("|").map((part) => part.trim());
      return { url: url || "", alt, caption };
    })
    .filter((row) => row.url);
}

function galleryToString(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      const row = item as { url?: string; alt?: string; caption?: string };
      return `${row.url || ""} | ${row.alt || ""} | ${row.caption || ""}`;
    })
    .join("\n");
}

function fromDoc(doc?: AdminDoc | null): BlogFormState {
  const author = (doc?.author as { name?: string } | undefined) ?? {};
  return {
    title: String(doc?.title ?? ""),
    slug: String(doc?.slug ?? ""),
    excerpt: String(doc?.excerpt ?? ""),
    content: String(doc?.content ?? ""),
    coverImage: String(doc?.coverImage ?? ""),
    gallery: galleryToString(doc?.gallery),
    category: String(doc?.category ?? ""),
    tags: tagsToString(doc?.tags) || arrayToLines(doc?.tags),
    status: String(doc?.status ?? "draft"),
    scheduledAt: doc?.scheduledAt ? String(doc.scheduledAt).slice(0, 16) : "",
    featured: Boolean(doc?.featured),
    readingTimeMinutes: String(doc?.readingTimeMinutes ?? "3"),
    authorName: String(author.name ?? ""),
    faq: faqToString(doc?.faq),
    seo: seoFromDoc(doc?.seo as Record<string, unknown> | undefined),
  };
}

function toPayload(form: BlogFormState) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim() || undefined,
    excerpt: form.excerpt,
    content: form.content,
    coverImage: form.coverImage,
    gallery: parseGallery(form.gallery),
    category: form.category,
    tags: parseTags(form.tags),
    status: form.status,
    scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : undefined,
    featured: form.featured,
    readingTimeMinutes: Number(form.readingTimeMinutes) || 3,
    author: { name: form.authorName.trim() },
    faq: parseFaq(form.faq),
    seo: seoToPayload(form.seo),
  };
}

export function BlogForm({ initial }: { initial?: AdminDoc | null }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormState>(() => fromDoc(initial));
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const isEdit = Boolean(initial?._id);

  async function generateWithAi() {
    setGenerating(true);
    try {
      const article = (await adminGenerateBlog({
        topicSlug: form.slug || undefined,
        title: form.title || undefined,
        publish: false,
        save: false,
      })) as Record<string, unknown>;
      setForm((prev) => ({
        ...prev,
        title: String(article.title || prev.title),
        slug: String(article.slug || prev.slug),
        excerpt: String(article.excerpt || prev.excerpt),
        content: String(article.content || prev.content),
        coverImage: String(article.coverImage || prev.coverImage),
        gallery: galleryToString(article.gallery),
        category: String(article.category || prev.category),
        tags: Array.isArray(article.tags) ? article.tags.map(String).join(", ") : prev.tags,
        readingTimeMinutes: String(article.readingTimeMinutes || prev.readingTimeMinutes),
        authorName: String((article.author as { name?: string })?.name || prev.authorName),
        faq: faqToString(article.faq),
        seo: seoFromDoc(article.seo as Record<string, unknown> | undefined),
      }));
      toast.success("AI article generated — review and save");
    } catch (err) {
      toast.error(getErrorMessage(err, "AI generation failed"));
    } finally {
      setGenerating(false);
    }
  }

  function set<K extends keyof BlogFormState>(key: K, value: BlogFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isEdit) {
        await adminUpdateBlog(String(initial!._id), payload);
        toast.success("Blog updated");
        router.push("/admin/blogs");
        router.refresh();
      } else {
        const created = await adminCreateBlog(payload);
        toast.success("Blog created");
        router.replace(`/admin/blogs/${created._id}/edit`);
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save blog"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm md:grid-cols-2">
        <AdminField label="Title *">
          <input className={adminInputClass} required value={form.title} onChange={(e) => set("title", e.target.value)} />
        </AdminField>
        <AdminField label="Slug">
          <input className={adminInputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from title if empty" />
        </AdminField>
        <AdminField label="Category">
          <input className={adminInputClass} value={form.category} onChange={(e) => set("category", e.target.value)} />
        </AdminField>
        <AdminField label="Status">
          <select className={adminInputClass} value={form.status} onChange={(e) => set("status", e.target.value)}>
            {["draft", "published", "scheduled"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Schedule publish (if scheduled)">
          <input
            type="datetime-local"
            className={adminInputClass}
            value={form.scheduledAt}
            onChange={(e) => set("scheduledAt", e.target.value)}
          />
        </AdminField>
        <AdminField label="Featured">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
            Show in featured blog sections
          </label>
        </AdminField>
        <AdminField label="Cover image URL">
          <input className={adminInputClass} value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} />
        </AdminField>
        <AdminField label="Reading time (minutes)">
          <input type="number" min={1} className={adminInputClass} value={form.readingTimeMinutes} onChange={(e) => set("readingTimeMinutes", e.target.value)} />
        </AdminField>
        <AdminField label="Author name">
          <input className={adminInputClass} value={form.authorName} onChange={(e) => set("authorName", e.target.value)} />
        </AdminField>
        <AdminField label="Tags (comma or one per line)">
          <input className={adminInputClass} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="trekking, himalaya" />
        </AdminField>
      </div>

      <div className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <AdminField label="Excerpt">
          <textarea className={adminTextareaClass} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        </AdminField>
        <AdminField label="Gallery (url | alt | caption per line)">
          <textarea className={adminTextareaClass} value={form.gallery} onChange={(e) => set("gallery", e.target.value)} />
        </AdminField>
        <AdminField label="Content (Markdown)">
          <textarea className={`${adminTextareaClass} min-h-[320px] font-mono text-sm`} value={form.content} onChange={(e) => set("content", e.target.value)} rows={18} />
        </AdminField>
        <AdminField label="FAQ (one per line: Question | Answer)">
          <textarea className={adminTextareaClass} value={form.faq} onChange={(e) => set("faq", e.target.value)} />
        </AdminField>
      </div>

      <div className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-[#111827]">SEO</h2>
        <AiSeoAssistPanel
          entityType="blog"
          payload={{
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            category: form.category,
            tags: parseTags(form.tags),
            author: { name: form.authorName },
          }}
          onApplyMeta={(seo) => set("seo", seo)}
          onApplyFaqs={(faqs) =>
            set(
              "faq",
              faqs.map((f) => `${f.question} | ${f.answer}`).join("\n"),
            )
          }
        />
        <AdminSeoFields
          value={form.seo}
          onChange={(seo) => set("seo", seo)}
          previewTitle={form.title}
          previewUrl={form.slug ? `https://treks.indiaholidaydestination.com/blogs/${form.slug}` : undefined}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={generating} onClick={() => void generateWithAi()}>
          {generating ? "Generating…" : "Generate with AI"}
        </Button>
        {form.slug ? (
          <Button type="button" variant="outline" onClick={() => window.open(`/blogs/${form.slug}`, "_blank")}>
            Preview
          </Button>
        ) : null}
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update blog" : "Create blog"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
