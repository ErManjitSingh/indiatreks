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
  adminCreateTestimonial,
  adminUpdateTestimonial,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";

type TestimonialFormState = {
  name: string;
  comment: string;
  role: string;
  rating: string;
  avatar: string;
  featured: boolean;
  status: string;
};

function fromDoc(doc?: AdminDoc | null): TestimonialFormState {
  return {
    name: String(doc?.name ?? ""),
    comment: String(doc?.comment ?? ""),
    role: String(doc?.role ?? ""),
    rating: String(doc?.rating ?? "5"),
    avatar: String(doc?.avatar ?? ""),
    featured: Boolean(doc?.featured),
    status: String(doc?.status ?? "pending"),
  };
}

function toPayload(form: TestimonialFormState) {
  const rating = Math.min(5, Math.max(1, Number(form.rating) || 5));
  return {
    name: form.name.trim(),
    comment: form.comment.trim(),
    role: form.role.trim() || undefined,
    rating,
    avatar: form.avatar.trim() || undefined,
    featured: form.featured,
    status: form.status,
  };
}

export function TestimonialForm({ initial }: { initial?: AdminDoc | null }) {
  const router = useRouter();
  const [form, setForm] = useState<TestimonialFormState>(() => fromDoc(initial));
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial?._id);

  function set<K extends keyof TestimonialFormState>(key: K, value: TestimonialFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isEdit) {
        await adminUpdateTestimonial(String(initial!._id), payload);
        toast.success("Testimonial updated");
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        const created = await adminCreateTestimonial(payload);
        toast.success("Testimonial created");
        router.replace(`/admin/testimonials/${created._id}/edit`);
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save testimonial"));
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
        <AdminField label="Role">
          <input className={adminInputClass} value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Trekker, Guide, etc." />
        </AdminField>
        <AdminField label="Rating (1–5)">
          <select className={adminInputClass} value={form.rating} onChange={(e) => set("rating", e.target.value)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={String(n)}>{n}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Status">
          <select className={adminInputClass} value={form.status} onChange={(e) => set("status", e.target.value)}>
            {["pending", "approved", "rejected"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Avatar URL">
          <input className={adminInputClass} value={form.avatar} onChange={(e) => set("avatar", e.target.value)} />
        </AdminField>
        <AdminField label="Featured">
          <label className="flex h-11 items-center gap-2 text-sm text-[#333]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#d0d5cc] accent-[#2D5A27]"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
            />
            Show on homepage
          </label>
        </AdminField>
      </div>

      <div className="rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <AdminField label="Comment *">
          <textarea className={`${adminTextareaClass} min-h-[140px]`} required value={form.comment} onChange={(e) => set("comment", e.target.value)} rows={6} />
        </AdminField>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update testimonial" : "Create testimonial"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/testimonials")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
