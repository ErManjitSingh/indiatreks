"use client";

import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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
  adminUploadMedia,
  arrayToLines,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";
import { resolveMediaUrl } from "@/lib/resolve-media-url";

type GalleryItem = {
  url: string;
  alt: string;
  caption: string;
};

type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  gallery: GalleryItem[];
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

function parseGallery(value: unknown): GalleryItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = item as { url?: string; alt?: string; caption?: string };
      const url = resolveMediaUrl(String(row.url || ""));
      if (!url) return null;
      return {
        url,
        alt: String(row.alt || ""),
        caption: String(row.caption || ""),
      };
    })
    .filter(Boolean) as GalleryItem[];
}

function fromDoc(doc?: AdminDoc | null): BlogFormState {
  const author = (doc?.author as { name?: string } | undefined) ?? {};
  return {
    title: String(doc?.title ?? ""),
    slug: String(doc?.slug ?? ""),
    excerpt: String(doc?.excerpt ?? ""),
    content: String(doc?.content ?? ""),
    coverImage: resolveMediaUrl(String(doc?.coverImage ?? "")),
    gallery: parseGallery(doc?.gallery),
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
    gallery: form.gallery.filter((item) => item.url),
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
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const isEdit = Boolean(initial?._id);

  async function uploadFiles(files: FileList | File[], folder = "blogs") {
    const list = Array.from(files);
    if (!list.length) return [] as string[];
    const urls: string[] = [];
    for (const file of list) {
      const media = await adminUploadMedia(file, folder, form.title || file.name);
      const url = resolveMediaUrl(String(media?.url ?? ""));
      if (url) urls.push(url);
    }
    return urls;
  }

  async function onCoverUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    setCoverUploading(true);
    try {
      const urls = await uploadFiles(files, "blogs/covers");
      if (!urls[0]) throw new Error("Upload returned no URL");
      setForm((prev) => ({ ...prev, coverImage: urls[0] }));
      toast.success("Cover image uploaded");
    } catch (err) {
      toast.error(getErrorMessage(err, "Cover upload failed"));
    } finally {
      setCoverUploading(false);
      event.target.value = "";
    }
  }

  async function onGalleryUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    setGalleryUploading(true);
    try {
      const urls = await uploadFiles(files, "blogs/gallery");
      if (!urls.length) throw new Error("Upload returned no URL");
      setForm((prev) => ({
        ...prev,
        gallery: [
          ...prev.gallery,
          ...urls.map((url) => ({
            url,
            alt: form.title || "Blog gallery image",
            caption: "",
          })),
        ],
      }));
      toast.success(urls.length === 1 ? "Gallery image uploaded" : `${urls.length} gallery images uploaded`);
    } catch (err) {
      toast.error(getErrorMessage(err, "Gallery upload failed"));
    } finally {
      setGalleryUploading(false);
      event.target.value = "";
    }
  }

  function removeCover() {
    setForm((prev) => ({ ...prev, coverImage: "" }));
  }

  function removeGalleryItem(index: number) {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  }

  function updateGalleryMeta(index: number, key: "alt" | "caption", value: string) {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  }

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
        coverImage: resolveMediaUrl(String(article.coverImage || prev.coverImage)),
        gallery: parseGallery(article.gallery).length
          ? parseGallery(article.gallery)
          : prev.gallery,
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
        <AdminField label="Reading time (minutes)">
          <input type="number" min={1} className={adminInputClass} value={form.readingTimeMinutes} onChange={(e) => set("readingTimeMinutes", e.target.value)} />
        </AdminField>
        <AdminField label="Author name">
          <input className={adminInputClass} value={form.authorName} onChange={(e) => set("authorName", e.target.value)} />
        </AdminField>
        <AdminField label="Tags (comma or one per line)" className="md:col-span-2">
          <input className={adminInputClass} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="trekking, himalaya" />
        </AdminField>
      </div>

      <div className="space-y-5 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <div>
          <h2 className="font-heading text-lg font-bold text-[#111827]">Cover & Gallery</h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Upload images from your device. PNG, JPG, WEBP supported.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#111827]">Cover image</p>
          <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#d1d5db] bg-[#f9fafb] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#16a34a] shadow-sm">
                <ImagePlus className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827]">Upload cover picture</p>
                <p className="text-xs text-[#6b7280]">One main image for blog cards and hero</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={coverFileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                className="hidden"
                disabled={coverUploading}
                onChange={(e) => void onCoverUpload(e)}
              />
              <button
                type="button"
                disabled={coverUploading}
                onClick={() => coverFileRef.current?.click()}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#22c55e] px-4 text-sm font-bold text-white transition hover:bg-[#16a34a] disabled:opacity-60"
              >
                <Upload className="h-4 w-4" aria-hidden />
                {coverUploading ? "Uploading…" : "Upload cover"}
              </button>
              {form.coverImage ? (
                <button
                  type="button"
                  onClick={removeCover}
                  className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#e5e7eb] bg-white px-3 text-sm font-semibold text-[#374151] hover:bg-[#f9fafb]"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                  Remove
                </button>
              ) : null}
            </div>
          </div>
          {form.coverImage ? (
            <div className="relative aspect-[16/9] max-w-xl overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f9fafb]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.coverImage} alt="Cover preview" className="h-full w-full object-cover" />
            </div>
          ) : (
            <p className="text-sm text-[#6b7280]">No cover image yet.</p>
          )}
        </div>

        <div className="space-y-3 border-t border-[#eef2ee] pt-5">
          <p className="text-sm font-semibold text-[#111827]">Gallery images</p>
          <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#d1d5db] bg-[#f9fafb] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#111827]">Upload gallery photos</p>
              <p className="mt-0.5 text-xs text-[#6b7280]">Multiple files supported</p>
            </div>
            <div>
              <input
                ref={galleryFileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                multiple
                className="hidden"
                disabled={galleryUploading}
                onChange={(e) => void onGalleryUpload(e)}
              />
              <button
                type="button"
                disabled={galleryUploading}
                onClick={() => galleryFileRef.current?.click()}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#22c55e] px-4 text-sm font-bold text-white transition hover:bg-[#16a34a] disabled:opacity-60"
              >
                <Upload className="h-4 w-4" aria-hidden />
                {galleryUploading ? "Uploading…" : "Upload gallery images"}
              </button>
            </div>
          </div>

          {form.gallery.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {form.gallery.map((item, index) => (
                <div key={`${item.url}-${index}`} className="space-y-2 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-2">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.alt || "Gallery"} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white"
                      onClick={() => removeGalleryItem(index)}
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                  <input
                    className={adminInputClass}
                    value={item.alt}
                    onChange={(e) => updateGalleryMeta(index, "alt", e.target.value)}
                    placeholder="Alt text"
                  />
                  <input
                    className={adminInputClass}
                    value={item.caption}
                    onChange={(e) => updateGalleryMeta(index, "caption", e.target.value)}
                    placeholder="Caption (optional)"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#6b7280]">No gallery images yet.</p>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <AdminField label="Excerpt">
          <textarea className={adminTextareaClass} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
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
