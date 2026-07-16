import { AdminPageHeader } from "@/components/admin/admin-ui";
import { TrekForm } from "@/components/admin/trek-form";

export default function NewTrekPage() {
  return (
    <div>
      <AdminPageHeader title="Add trek" description="Create a new trek in MongoDB" />
      <TrekForm />
    </div>
  );
}
