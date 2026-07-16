"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminPageHeader } from "@/components/admin/admin-ui";
import { DestinationForm } from "@/components/admin/destination-form";
import { adminGetDestination, getErrorMessage, type AdminDoc } from "@/lib/api/admin";

export default function EditDestinationPage() {
  const params = useParams<{ id: string }>();
  const [doc, setDoc] = useState<AdminDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const destination = await adminGetDestination(params.id);
        if (!cancelled) setDoc(destination);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Destination not found"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (error) return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>;
  if (!doc) return <p className="text-sm text-[#5c6b5f]">Loading destination…</p>;

  return (
    <div>
      <AdminPageHeader title="Edit destination" description={String(doc.name)} />
      <DestinationForm initial={doc} />
    </div>
  );
}
