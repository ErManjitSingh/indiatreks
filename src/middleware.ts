import { NextResponse, type NextRequest } from "next/server";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "https://treks.indiaholidaydestination.com/api/v1"
).replace(/\/$/, "");

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set("x-pathname", pathname);

  // Skip redirect lookup for admin/api/static-ish paths
  const skipRedirect =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".");

  if (!skipRedirect) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 800);
      const res = await fetch(
        `${API_BASE}/seo/redirects/resolve?path=${encodeURIComponent(pathname)}`,
        { signal: controller.signal, next: { revalidate: 300 } },
      );
      clearTimeout(timeout);
      if (res.ok) {
        const json = (await res.json()) as {
          data?: { toPath?: string; statusCode?: number } | null;
        };
        const redirect = json.data;
        if (redirect?.toPath) {
          const target = redirect.toPath.startsWith("http")
            ? redirect.toPath
            : new URL(redirect.toPath, request.url).toString();
          return NextResponse.redirect(target, redirect.statusCode || 301);
        }
      }
    } catch {
      // Fail open — never block navigation on SEO redirect lookup
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)"],
};
