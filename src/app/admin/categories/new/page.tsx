import { AdminPageHeader } from "@/components/admin/admin-ui";
import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div>
      <AdminPageHeader title="Add category" description="Create a trek or blog category" />
      <CategoryForm />
    </div>
  );
}
