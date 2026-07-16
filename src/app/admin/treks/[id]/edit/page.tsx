"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { TrekForm } from "@/components/admin/trek-form";
import { adminGetTrek, getErrorMessage, type AdminDoc } from "@/lib/api/admin";

export default function EditTrekPage() {
  const params = useParams<{ id: string }>();
  const [doc, setDoc] = useState<AdminDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const trek = await adminGetTrek(params.id);
        if (!cancelled) setDoc(trek);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Trek not found"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (error) {
    return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>;
  }
  if (!doc) {
    return <p className="text-sm text-[#6B7280]">Loading trek…</p>;
  }

  return <TrekForm initial={doc} />;
}
