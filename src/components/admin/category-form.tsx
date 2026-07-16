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
  adminCreateCategory,
  adminUpdateCategory,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";

type CategoryFormState = {
  name: string;
  type: string;
  slug: string;
  description: string;
  image: string;
};

function fromDoc(doc?: AdminDoc | null): CategoryFormState {
  return {
    name: String(doc?.name ?? ""),
    type: String(doc?.type ?? "trek"),
    slug: String(doc?.slug ?? ""),
    description: String(doc?.description ?? ""),
    image: String(doc?.image ?? ""),
  };
}

function toPayload(form: CategoryFormState) {
  return {
    name: form.name.trim(),
    type: form.type,
    slug: form.slug.trim() || undefined,
    description: form.description.trim() || undefined,
    image: form.image.trim() || undefined,
  };
}

export function CategoryForm({ initial }: { initial?: AdminDoc | null }) {
  const router = useRouter();
  const [form, setForm] = useState<CategoryFormState>(() => fromDoc(initial));
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial?._id);

  function set<K extends keyof CategoryFormState>(key: K, value: CategoryFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isEdit) {
        await adminUpdateCategory(String(initial!._id), payload);
        toast.success("Category updated");
        router.push("/admin/categories");
        router.refresh();
      } else {
        const created = await adminCreateCategory(payload);
        toast.success("Category created");
        router.replace(`/admin/categories/${created._id}/edit`);
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save category"));
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
        <AdminField label="Type *">
          <select className={adminInputClass} required value={form.type} onChange={(e) => set("type", e.target.value)}>
            {["trek", "blog"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Slug">
          <input className={adminInputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from name if empty" />
        </AdminField>
        <AdminField label="Image URL">
          <input className={adminInputClass} value={form.image} onChange={(e) => set("image", e.target.value)} />
        </AdminField>
        <AdminField label="Description" className="md:col-span-2">
          <textarea className={adminTextareaClass} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </AdminField>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update category" : "Create category"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
