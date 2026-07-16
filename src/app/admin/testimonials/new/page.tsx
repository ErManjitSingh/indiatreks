import { AdminPageHeader } from "@/components/admin/admin-ui";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader title="Add testimonial" description="Create a new testimonial in MongoDB" />
      <TestimonialForm />
    </div>
  );
}
