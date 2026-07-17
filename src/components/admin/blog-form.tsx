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
  category: string;
  tags: string;
  status: string;
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

function fromDoc(doc?: AdminDoc | null): BlogFormState {
  const author = (doc?.author as { name?: string } | undefined) ?? {};
  return {
    title: String(doc?.title ?? ""),
    slug: String(doc?.slug ?? ""),
    excerpt: String(doc?.excerpt ?? ""),
    content: String(doc?.content ?? ""),
    coverImage: String(doc?.coverImage ?? ""),
    category: String(doc?.category ?? ""),
    tags: tagsToString(doc?.tags) || arrayToLines(doc?.tags),
    status: String(doc?.status ?? "draft"),
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
    category: form.category,
    tags: parseTags(form.tags),
    status: form.status,
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
  const isEdit = Boolean(initial?._id);

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
        <AdminField label="Content">
          <textarea className={`${adminTextareaClass} min-h-[220px]`} value={form.content} onChange={(e) => set("content", e.target.value)} rows={12} />
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

      <div className="flex gap-2">
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
