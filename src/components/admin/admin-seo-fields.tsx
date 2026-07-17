"use client";

import { useMemo } from "react";

import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/admin-ui";

export type EnterpriseSeoForm = {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  focusKeyword: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robots: string;
  index: boolean;
  follow: boolean;
  schemaType: string;
  imageAlt: string;
  imageCaption: string;
};

export const emptySeoForm = (): EnterpriseSeoForm => ({
  title: "",
  description: "",
  keywords: "",
  canonical: "",
  focusKeyword: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  robots: "index,follow",
  index: true,
  follow: true,
  schemaType: "",
  imageAlt: "",
  imageCaption: "",
});

export function seoFromDoc(seo?: Record<string, unknown> | null): EnterpriseSeoForm {
  const base = emptySeoForm();
  if (!seo) return base;
  return {
    title: String(seo.title ?? seo.metaTitle ?? ""),
    description: String(seo.description ?? seo.metaDescription ?? ""),
    keywords: Array.isArray(seo.keywords) ? seo.keywords.map(String).join(", ") : String(seo.keywords ?? ""),
    canonical: String(seo.canonical ?? ""),
    focusKeyword: String(seo.focusKeyword ?? ""),
    ogTitle: String(seo.ogTitle ?? ""),
    ogDescription: String(seo.ogDescription ?? ""),
    ogImage: String(seo.ogImage ?? ""),
    twitterCard: String(seo.twitterCard ?? "summary_large_image"),
    twitterTitle: String(seo.twitterTitle ?? ""),
    twitterDescription: String(seo.twitterDescription ?? ""),
    twitterImage: String(seo.twitterImage ?? ""),
    robots: String(seo.robots ?? "index,follow"),
    index: seo.index !== false,
    follow: seo.follow !== false,
    schemaType: String(seo.schemaType ?? ""),
    imageAlt: String(seo.imageAlt ?? ""),
    imageCaption: String(seo.imageCaption ?? ""),
  };
}

export function seoToPayload(form: EnterpriseSeoForm) {
  return {
    title: form.title || undefined,
    description: form.description || undefined,
    keywords: form.keywords
      .split(/[\n,]/)
      .map((k) => k.trim())
      .filter(Boolean),
    canonical: form.canonical || undefined,
    focusKeyword: form.focusKeyword || undefined,
    ogTitle: form.ogTitle || undefined,
    ogDescription: form.ogDescription || undefined,
    ogImage: form.ogImage || undefined,
    twitterCard: form.twitterCard || undefined,
    twitterTitle: form.twitterTitle || undefined,
    twitterDescription: form.twitterDescription || undefined,
    twitterImage: form.twitterImage || undefined,
    robots: form.robots || undefined,
    index: form.index,
    follow: form.follow,
    schemaType: form.schemaType || undefined,
    imageAlt: form.imageAlt || undefined,
    imageCaption: form.imageCaption || undefined,
  };
}

function scorePreview(form: EnterpriseSeoForm) {
  let score = 0;
  const tips: string[] = [];
  const titleLen = form.title.length;
  const descLen = form.description.length;
  if (titleLen >= 50 && titleLen <= 60) score += 25;
  else if (titleLen > 0) {
    score += 12;
    tips.push("Aim for SEO title length 50–60 characters.");
  } else tips.push("Add an SEO title.");
  if (descLen >= 140 && descLen <= 160) score += 25;
  else if (descLen > 0) {
    score += 12;
    tips.push("Aim for meta description 140–160 characters.");
  } else tips.push("Add a meta description.");
  if (form.focusKeyword) score += 15;
  else tips.push("Set a focus keyword.");
  if (form.canonical) score += 10;
  else tips.push("Set a canonical URL.");
  if (form.ogImage || form.ogTitle) score += 15;
  else tips.push("Add Open Graph fields.");
  if (form.imageAlt) score += 10;
  else tips.push("Add image alt text.");
  return { score: Math.min(100, score), tips };
}

export function AdminSeoFields({
  value,
  onChange,
  previewTitle,
  previewUrl,
}: {
  value: EnterpriseSeoForm;
  onChange: (next: EnterpriseSeoForm) => void;
  previewTitle?: string;
  previewUrl?: string;
}) {
  const set = <K extends keyof EnterpriseSeoForm>(key: K, val: EnterpriseSeoForm[K]) => {
    onChange({ ...value, [key]: val });
  };

  const preview = useMemo(() => scorePreview(value), [value]);
  const snippetTitle = value.title || previewTitle || "Page title";
  const snippetDesc = value.description || "Meta description preview will appear here.";
  const snippetUrl =
    previewUrl ||
    value.canonical ||
    "https://treks.indiaholidaydestination.com/...";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d8e0d4] bg-[#f7faf6] p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4b5563]">Google snippet preview</p>
        <p className="mt-2 truncate text-sm text-[#1a0dab]">{snippetTitle}</p>
        <p className="truncate text-xs text-[#006621]">{snippetUrl}</p>
        <p className="mt-1 line-clamp-2 text-sm text-[#4d5156]">{snippetDesc}</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e5e7eb]">
            <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${preview.score}%` }} />
          </div>
          <span className="text-sm font-semibold text-[#111827]">SEO {preview.score}/100</span>
        </div>
        {preview.tips.length ? (
          <ul className="mt-3 space-y-1 text-xs text-[#6b7280]">
            {preview.tips.slice(0, 4).map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="SEO title">
          <input className={adminInputClass} value={value.title} onChange={(e) => set("title", e.target.value)} />
          <p className="mt-1 text-xs text-[#9CA3AF]">{value.title.length}/60</p>
        </AdminField>
        <AdminField label="Focus keyword">
          <input
            className={adminInputClass}
            value={value.focusKeyword}
            onChange={(e) => set("focusKeyword", e.target.value)}
          />
        </AdminField>
        <AdminField label="Canonical URL">
          <input
            className={adminInputClass}
            value={value.canonical}
            onChange={(e) => set("canonical", e.target.value)}
            placeholder="/treks/example"
          />
        </AdminField>
        <AdminField label="Schema type">
          <input
            className={adminInputClass}
            value={value.schemaType}
            onChange={(e) => set("schemaType", e.target.value)}
            placeholder="TouristTrip"
          />
        </AdminField>
      </div>

      <AdminField label="Meta description">
        <textarea
          className={adminTextareaClass}
          value={value.description}
          onChange={(e) => set("description", e.target.value)}
        />
        <p className="mt-1 text-xs text-[#9CA3AF]">{value.description.length}/160</p>
      </AdminField>

      <AdminField label="Keywords (comma separated)">
        <input className={adminInputClass} value={value.keywords} onChange={(e) => set("keywords", e.target.value)} />
      </AdminField>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="OG title">
          <input className={adminInputClass} value={value.ogTitle} onChange={(e) => set("ogTitle", e.target.value)} />
        </AdminField>
        <AdminField label="OG image URL">
          <input className={adminInputClass} value={value.ogImage} onChange={(e) => set("ogImage", e.target.value)} />
        </AdminField>
        <AdminField label="OG description" className="md:col-span-2">
          <textarea
            className={adminTextareaClass}
            value={value.ogDescription}
            onChange={(e) => set("ogDescription", e.target.value)}
          />
        </AdminField>
        <AdminField label="Twitter card">
          <select
            className={adminInputClass}
            value={value.twitterCard}
            onChange={(e) => set("twitterCard", e.target.value)}
          >
            <option value="summary_large_image">summary_large_image</option>
            <option value="summary">summary</option>
          </select>
        </AdminField>
        <AdminField label="Twitter image URL">
          <input
            className={adminInputClass}
            value={value.twitterImage}
            onChange={(e) => set("twitterImage", e.target.value)}
          />
        </AdminField>
        <AdminField label="Twitter title">
          <input
            className={adminInputClass}
            value={value.twitterTitle}
            onChange={(e) => set("twitterTitle", e.target.value)}
          />
        </AdminField>
        <AdminField label="Twitter description">
          <input
            className={adminInputClass}
            value={value.twitterDescription}
            onChange={(e) => set("twitterDescription", e.target.value)}
          />
        </AdminField>
        <AdminField label="Image alt">
          <input className={adminInputClass} value={value.imageAlt} onChange={(e) => set("imageAlt", e.target.value)} />
        </AdminField>
        <AdminField label="Image caption">
          <input
            className={adminInputClass}
            value={value.imageCaption}
            onChange={(e) => set("imageCaption", e.target.value)}
          />
        </AdminField>
        <AdminField label="Robots">
          <input className={adminInputClass} value={value.robots} onChange={(e) => set("robots", e.target.value)} />
        </AdminField>
        <div className="flex items-end gap-4 pb-2">
          <label className="flex items-center gap-2 text-sm text-[#111827]">
            <input type="checkbox" checked={value.index} onChange={(e) => set("index", e.target.checked)} />
            Index
          </label>
          <label className="flex items-center gap-2 text-sm text-[#111827]">
            <input type="checkbox" checked={value.follow} onChange={(e) => set("follow", e.target.checked)} />
            Follow
          </label>
        </div>
      </div>
    </div>
  );
}
