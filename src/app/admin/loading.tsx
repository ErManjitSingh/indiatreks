export default function AdminLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-[#f4f6f2] p-8">
      <div className="w-full max-w-sm space-y-3">
        <div className="h-3 w-24 animate-pulse rounded bg-[#d8ded0]" />
        <div className="h-8 w-full animate-pulse rounded-xl bg-[#e4e9df]" />
        <div className="h-32 w-full animate-pulse rounded-2xl bg-[#e4e9df]" />
        <p className="pt-2 text-center text-sm text-[#6b7668]">Loading admin…</p>
      </div>
    </div>
  );
}
