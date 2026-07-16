import { AdminPageHeader } from "@/components/admin/admin-ui";
import { FaqForm } from "@/components/admin/faq-form";

export default function NewFaqPage() {
  return (
    <div>
      <AdminPageHeader title="Add FAQ" description="Create a new FAQ in MongoDB" />
      <FaqForm />
    </div>
  );
}
