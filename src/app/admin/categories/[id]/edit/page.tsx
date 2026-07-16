"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminPageHeader } from "@/components/admin/admin-ui";
import { CategoryForm } from "@/components/admin/category-form";
import { adminGetCategory, getErrorMessage, type AdminDoc } from "@/lib/api/admin";

export default function EditCategoryPage() {
  const params = useParams<{ id: string }>();
  const [doc, setDoc] = useState<AdminDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const category = await adminGetCategory(params.id);
        if (!cancelled) setDoc(category);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Category not found"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (error) return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>;
  if (!doc) return <p className="text-sm text-[#5c6b5f]">Loading category…</p>;

  return (
    <div>
      <AdminPageHeader title="Edit category" description={String(doc.name)} />
      <CategoryForm initial={doc} />
    </div>
  );
}
