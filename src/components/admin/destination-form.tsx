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
  adminCreateDestination,
  adminUpdateDestination,
  arrayToLines,
  getErrorMessage,
  linesToArray,
  type AdminDoc,
} from "@/lib/api/admin";

type DestinationFormState = {
  name: string;
  slug: string;
  region: string;
  state: string;
  summary: string;
  description: string;
  coverImage: string;
  weatherNotes: string;
  howToReach: string;
  highlights: string;
  faq: string;
  status: string;
  seo: EnterpriseSeoForm;
};

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

function fromDoc(doc?: AdminDoc | null): DestinationFormState {
  return {
    name: String(doc?.name ?? ""),
    slug: String(doc?.slug ?? ""),
    region: String(doc?.region ?? ""),
    state: String(doc?.state ?? ""),
    summary: String(doc?.summary ?? ""),
    description: String(doc?.description ?? ""),
    coverImage: String(doc?.coverImage ?? ""),
    weatherNotes: String(doc?.weatherNotes ?? ""),
    howToReach: String(doc?.howToReach ?? ""),
    highlights: arrayToLines(doc?.highlights),
    faq: faqToString(doc?.faqs),
    status: String(doc?.status ?? "draft"),
    seo: seoFromDoc(doc?.seo as Record<string, unknown> | undefined),
  };
}

function toPayload(form: DestinationFormState) {
  return {
    name: form.name.trim(),
    slug: form.slug.trim() || undefined,
    region: form.region,
    state: form.state,
    summary: form.summary,
    description: form.description,
    coverImage: form.coverImage,
    weatherNotes: form.weatherNotes,
    howToReach: form.howToReach,
    highlights: linesToArray(form.highlights),
    faqs: parseFaq(form.faq),
    status: form.status,
    seo: seoToPayload(form.seo),
  };
}

export function DestinationForm({ initial }: { initial?: AdminDoc | null }) {
  const router = useRouter();
  const [form, setForm] = useState<DestinationFormState>(() => fromDoc(initial));
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial?._id);

  function set<K extends keyof DestinationFormState>(key: K, value: DestinationFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isEdit) {
        await adminUpdateDestination(String(initial!._id), payload);
        toast.success("Destination updated");
        router.push("/admin/destinations");
        router.refresh();
      } else {
        const created = await adminCreateDestination(payload);
        toast.success("Destination created");
        router.replace(`/admin/destinations/${created._id}/edit`);
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save destination"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm md:grid-cols-2">
        <AdminField label="Name *">
          <input className={adminInputClass} required value={form.name} onChange={(e) => set("name", e.target.value)} />
        </AdminField>
        <AdminField label="Slug">
          <input className={adminInputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from name if empty" />
        </AdminField>
        <AdminField label="Region">
          <input className={adminInputClass} value={form.region} onChange={(e) => set("region", e.target.value)} />
        </AdminField>
        <AdminField label="State">
          <input className={adminInputClass} value={form.state} onChange={(e) => set("state", e.target.value)} />
        </AdminField>
        <AdminField label="Cover image URL">
          <input className={adminInputClass} value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} />
        </AdminField>
        <AdminField label="Status">
          <select className={adminInputClass} value={form.status} onChange={(e) => set("status", e.target.value)}>
            {["draft", "published", "archived"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </AdminField>
      </div>

      <div className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <AdminField label="Summary">
          <textarea className={adminTextareaClass} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
        </AdminField>
        <AdminField label="Description">
          <textarea className={`${adminTextareaClass} min-h-[140px]`} value={form.description} onChange={(e) => set("description", e.target.value)} rows={6} />
        </AdminField>
        <AdminField label="Weather notes">
          <textarea className={adminTextareaClass} value={form.weatherNotes} onChange={(e) => set("weatherNotes", e.target.value)} />
        </AdminField>
        <AdminField label="How to reach">
          <textarea className={adminTextareaClass} value={form.howToReach} onChange={(e) => set("howToReach", e.target.value)} />
        </AdminField>
        <AdminField label="Highlights (one per line)">
          <textarea className={adminTextareaClass} value={form.highlights} onChange={(e) => set("highlights", e.target.value)} />
        </AdminField>
        <AdminField label="FAQ (one per line: Question | Answer)">
          <textarea className={adminTextareaClass} value={form.faq} onChange={(e) => set("faq", e.target.value)} />
        </AdminField>
      </div>

      <div className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-[#111827]">SEO</h2>
        <AiSeoAssistPanel
          entityType="destination"
          payload={{
            name: form.name,
            title: form.name,
            region: form.region,
            state: form.state,
            summary: form.summary,
            description: form.description,
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
          previewTitle={form.name}
          previewUrl={
            form.slug ? `https://treks.indiaholidaydestination.com/destinations/${form.slug}` : undefined
          }
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update destination" : "Create destination"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/destinations")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
