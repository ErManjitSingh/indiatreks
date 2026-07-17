import { Suspense } from "react";

import SearchConsolePage from "./search-console-client";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-sm text-[#6b7280]">Loading Search Console…</p>}>
      <SearchConsolePage />
    </Suspense>
  );
}
