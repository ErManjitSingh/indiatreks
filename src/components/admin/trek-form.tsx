"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AdminField,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  adminCreateTrek,
  adminUpdateTrek,
  arrayToLines,
  getErrorMessage,
  linesToArray,
  type AdminDoc,
} from "@/lib/api/admin";

type TrekFormState = {
  title: string;
  slug: string;
  summary: string;
  overview: string;
  location: string;
  state: string;
  region: string;
  destinationName: string;
  difficulty: string;
  durationDays: string;
  durationNights: string;
  maxAltitude: string;
  distanceKm: string;
  basePriceInr: string;
  originalPriceInr: string;
  seatsLeft: string;
  status: string;
  heroImages: string;
  highlights: string;
  inclusions: string;
  exclusions: string;
  months: string;
  relatedSlugs: string;
  seoTitle: string;
  seoDescription: string;
};

function fromDoc(doc?: AdminDoc | null): TrekFormState {
  const seo = (doc?.seo as { title?: string; description?: string } | undefined) ?? {};
  return {
    title: String(doc?.title ?? ""),
    slug: String(doc?.slug ?? ""),
    summary: String(doc?.summary ?? ""),
    overview: String(doc?.overview ?? ""),
    location: String(doc?.location ?? ""),
    state: String(doc?.state ?? ""),
    region: String(doc?.region ?? ""),
    destinationName: String(doc?.destinationName ?? ""),
    difficulty: String(doc?.difficulty ?? "moderate"),
    durationDays: String(doc?.durationDays ?? "1"),
    durationNights: String(doc?.durationNights ?? "0"),
    maxAltitude: String(doc?.maxAltitude ?? "0"),
    distanceKm: String(doc?.distanceKm ?? "0"),
    basePriceInr: String(doc?.basePriceInr ?? "0"),
    originalPriceInr: doc?.originalPriceInr != null ? String(doc.originalPriceInr) : "",
    seatsLeft: String(doc?.seatsLeft ?? "0"),
    status: String(doc?.status ?? "draft"),
    heroImages: arrayToLines(doc?.heroImages),
    highlights: arrayToLines(doc?.highlights),
    inclusions: arrayToLines(doc?.inclusions),
    exclusions: arrayToLines(doc?.exclusions),
    months: arrayToLines(doc?.months),
    relatedSlugs: arrayToLines(doc?.relatedSlugs),
    seoTitle: String(seo.title ?? ""),
    seoDescription: String(seo.description ?? ""),
  };
}

function toPayload(form: TrekFormState) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim() || undefined,
    summary: form.summary,
    overview: form.overview,
    location: form.location,
    state: form.state,
    region: form.region,
    destinationName: form.destinationName,
    difficulty: form.difficulty,
    durationDays: Number(form.durationDays) || 1,
    durationNights: Number(form.durationNights) || 0,
    maxAltitude: Number(form.maxAltitude) || 0,
    distanceKm: Number(form.distanceKm) || 0,
    basePriceInr: Number(form.basePriceInr) || 0,
    originalPriceInr: form.originalPriceInr ? Number(form.originalPriceInr) : undefined,
    seatsLeft: Number(form.seatsLeft) || 0,
    status: form.status,
    heroImages: linesToArray(form.heroImages),
    highlights: linesToArray(form.highlights),
    inclusions: linesToArray(form.inclusions),
    exclusions: linesToArray(form.exclusions),
    months: linesToArray(form.months),
    relatedSlugs: linesToArray(form.relatedSlugs),
    seo: {
      title: form.seoTitle || undefined,
      description: form.seoDescription || undefined,
    },
  };
}

export function TrekForm({ initial }: { initial?: AdminDoc | null }) {
  const router = useRouter();
  const [form, setForm] = useState<TrekFormState>(() => fromDoc(initial));
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial?._id);

  function set<K extends keyof TrekFormState>(key: K, value: TrekFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isEdit) {
        await adminUpdateTrek(String(initial!._id), payload);
        toast.success("Trek updated");
      } else {
        const created = await adminCreateTrek(payload);
        toast.success("Trek created");
        router.replace(`/admin/treks/${created._id}/edit`);
        return;
      }
      router.push("/admin/treks");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save trek"));
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
        <AdminField label="Difficulty">
          <select className={adminInputClass} value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}>
            {["easy", "moderate", "difficult", "challenging"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Status">
          <select className={adminInputClass} value={form.status} onChange={(e) => set("status", e.target.value)}>
            {["draft", "published", "archived"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Region">
          <input className={adminInputClass} value={form.region} onChange={(e) => set("region", e.target.value)} />
        </AdminField>
        <AdminField label="Destination name">
          <input className={adminInputClass} value={form.destinationName} onChange={(e) => set("destinationName", e.target.value)} />
        </AdminField>
        <AdminField label="Location">
          <input className={adminInputClass} value={form.location} onChange={(e) => set("location", e.target.value)} />
        </AdminField>
        <AdminField label="State">
          <input className={adminInputClass} value={form.state} onChange={(e) => set("state", e.target.value)} />
        </AdminField>
        <AdminField label="Duration days *">
          <input type="number" min={1} className={adminInputClass} required value={form.durationDays} onChange={(e) => set("durationDays", e.target.value)} />
        </AdminField>
        <AdminField label="Duration nights">
          <input type="number" min={0} className={adminInputClass} value={form.durationNights} onChange={(e) => set("durationNights", e.target.value)} />
        </AdminField>
        <AdminField label="Base price (INR) *">
          <input type="number" min={0} className={adminInputClass} required value={form.basePriceInr} onChange={(e) => set("basePriceInr", e.target.value)} />
        </AdminField>
        <AdminField label="Original price (INR)">
          <input type="number" min={0} className={adminInputClass} value={form.originalPriceInr} onChange={(e) => set("originalPriceInr", e.target.value)} />
        </AdminField>
        <AdminField label="Max altitude (ft)">
          <input type="number" className={adminInputClass} value={form.maxAltitude} onChange={(e) => set("maxAltitude", e.target.value)} />
        </AdminField>
        <AdminField label="Distance (km)">
          <input type="number" className={adminInputClass} value={form.distanceKm} onChange={(e) => set("distanceKm", e.target.value)} />
        </AdminField>
        <AdminField label="Seats left">
          <input type="number" min={0} className={adminInputClass} value={form.seatsLeft} onChange={(e) => set("seatsLeft", e.target.value)} />
        </AdminField>
      </div>

      <div className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <AdminField label="Summary">
          <textarea className={adminTextareaClass} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
        </AdminField>
        <AdminField label="Overview">
          <textarea className={cnMin(adminTextareaClass)} value={form.overview} onChange={(e) => set("overview", e.target.value)} rows={6} />
        </AdminField>
        <AdminField label="Hero image URLs (one per line)">
          <textarea className={adminTextareaClass} value={form.heroImages} onChange={(e) => set("heroImages", e.target.value)} />
        </AdminField>
        <AdminField label="Highlights (one per line)">
          <textarea className={adminTextareaClass} value={form.highlights} onChange={(e) => set("highlights", e.target.value)} />
        </AdminField>
        <AdminField label="Inclusions (one per line)">
          <textarea className={adminTextareaClass} value={form.inclusions} onChange={(e) => set("inclusions", e.target.value)} />
        </AdminField>
        <AdminField label="Exclusions (one per line)">
          <textarea className={adminTextareaClass} value={form.exclusions} onChange={(e) => set("exclusions", e.target.value)} />
        </AdminField>
        <AdminField label="Months (one per line)">
          <textarea className={adminTextareaClass} value={form.months} onChange={(e) => set("months", e.target.value)} />
        </AdminField>
        <AdminField label="Related slugs (one per line)">
          <textarea className={adminTextareaClass} value={form.relatedSlugs} onChange={(e) => set("relatedSlugs", e.target.value)} />
        </AdminField>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="SEO title">
            <input className={adminInputClass} value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} />
          </AdminField>
          <AdminField label="SEO description">
            <input className={adminInputClass} value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} />
          </AdminField>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update trek" : "Create trek"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/treks")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function cnMin(className: string) {
  return `${className} min-h-[140px]`;
}
