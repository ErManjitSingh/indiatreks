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
  highlights: string;
  status: string;
};

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
    highlights: arrayToLines(doc?.highlights),
    status: String(doc?.status ?? "draft"),
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
    highlights: linesToArray(form.highlights),
    status: form.status,
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
        <AdminField label="Highlights (one per line)">
          <textarea className={adminTextareaClass} value={form.highlights} onChange={(e) => set("highlights", e.target.value)} />
        </AdminField>
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
