import { AdminPageHeader } from "@/components/admin/admin-ui";
import { DestinationForm } from "@/components/admin/destination-form";

export default function NewDestinationPage() {
  return (
    <div>
      <AdminPageHeader title="Add destination" description="Create a new destination in MongoDB" />
      <DestinationForm />
    </div>
  );
}
