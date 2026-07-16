"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminPageHeader } from "@/components/admin/admin-ui";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { adminGetTestimonial, getErrorMessage, type AdminDoc } from "@/lib/api/admin";

export default function EditTestimonialPage() {
  const params = useParams<{ id: string }>();
  const [doc, setDoc] = useState<AdminDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const testimonial = await adminGetTestimonial(params.id);
        if (!cancelled) setDoc(testimonial);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Testimonial not found"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (error) return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>;
  if (!doc) return <p className="text-sm text-[#5c6b5f]">Loading testimonial…</p>;

  return (
    <div>
      <AdminPageHeader title="Edit testimonial" description={String(doc.name)} />
      <TestimonialForm initial={doc} />
    </div>
  );
}
