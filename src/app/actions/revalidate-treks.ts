"use server";

import { revalidatePath, revalidateTag } from "next/cache";

/** Bust ISR cache after admin trek create/update so new images show immediately. */
export async function revalidateTrekContent(slug?: string) {
  revalidateTag("treks");
  revalidatePath("/treks");
  revalidatePath("/");
  if (slug) {
    revalidateTag(`trek-${slug}`);
    revalidatePath(`/treks/${slug}`);
  }
}
