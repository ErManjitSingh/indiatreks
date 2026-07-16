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
  adminCreateFaq,
  adminUpdateFaq,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";

type FaqFormState = {
  question: string;
  answer: string;
  category: string;
  sortOrder: string;
  status: string;
};

function fromDoc(doc?: AdminDoc | null): FaqFormState {
  return {
    question: String(doc?.question ?? ""),
    answer: String(doc?.answer ?? ""),
    category: String(doc?.category ?? ""),
    sortOrder: String(doc?.sortOrder ?? "0"),
    status: String(doc?.status ?? "published"),
  };
}

function toPayload(form: FaqFormState) {
  return {
    question: form.question.trim(),
    answer: form.answer.trim(),
    category: form.category.trim() || undefined,
    sortOrder: Number(form.sortOrder) || 0,
    status: form.status,
  };
}

export function FaqForm({ initial }: { initial?: AdminDoc | null }) {
  const router = useRouter();
  const [form, setForm] = useState<FaqFormState>(() => fromDoc(initial));
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial?._id);

  function set<K extends keyof FaqFormState>(key: K, value: FaqFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isEdit) {
        await adminUpdateFaq(String(initial!._id), payload);
        toast.success("FAQ updated");
        router.push("/admin/faqs");
        router.refresh();
      } else {
        const created = await adminCreateFaq(payload);
        toast.success("FAQ created");
        router.replace(`/admin/faqs/${created._id}/edit`);
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save FAQ"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm">
        <AdminField label="Question *">
          <input className={adminInputClass} required value={form.question} onChange={(e) => set("question", e.target.value)} />
        </AdminField>
        <AdminField label="Answer *">
          <textarea className={`${adminTextareaClass} min-h-[140px]`} required value={form.answer} onChange={(e) => set("answer", e.target.value)} rows={6} />
        </AdminField>
        <div className="grid gap-4 md:grid-cols-3">
          <AdminField label="Category">
            <input className={adminInputClass} value={form.category} onChange={(e) => set("category", e.target.value)} />
          </AdminField>
          <AdminField label="Sort order">
            <input type="number" className={adminInputClass} value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} />
          </AdminField>
          <AdminField label="Status">
            <select className={adminInputClass} value={form.status} onChange={(e) => set("status", e.target.value)}>
              {["draft", "published"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </AdminField>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update FAQ" : "Create FAQ"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/faqs")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
