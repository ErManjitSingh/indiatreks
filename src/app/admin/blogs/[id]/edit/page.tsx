"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminPageHeader } from "@/components/admin/admin-ui";
import { BlogForm } from "@/components/admin/blog-form";
import { adminGetBlog, getErrorMessage, type AdminDoc } from "@/lib/api/admin";

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const [doc, setDoc] = useState<AdminDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const blog = await adminGetBlog(params.id);
        if (!cancelled) setDoc(blog);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Blog not found"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (error) return <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>;
  if (!doc) return <p className="text-sm text-[#5c6b5f]">Loading blog…</p>;

  return (
    <div>
      <AdminPageHeader title="Edit blog" description={String(doc.title)} />
      <BlogForm initial={doc} />
    </div>
  );
}
