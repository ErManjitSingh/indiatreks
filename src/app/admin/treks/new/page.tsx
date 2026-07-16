import dynamic from "next/dynamic";

const TrekForm = dynamic(
  () => import("@/components/admin/trek-form").then((m) => m.TrekForm),
  {
    loading: () => (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 w-48 rounded-lg bg-[#e4e9df]" />
        <div className="h-64 rounded-2xl bg-[#e4e9df]" />
      </div>
    ),
  },
);

export default function NewTrekPage() {
  return <TrekForm />;
}
