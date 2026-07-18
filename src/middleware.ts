import { NextResponse, type NextRequest } from "next/server";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "https://treks.indiaholidaydestination.com/api/v1"
).replace(/\/$/, "");

/** In-memory redirect map — cuts per-request API latency on warm instances. */
const redirectCache = new Map<string, { toPath: string; statusCode: number; expires: number }>();
const NEGATIVE_TTL_MS = 60_000;
const POSITIVE_TTL_MS = 5 * 60_000;
const negativeCache = new Map<string, number>();

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set("x-pathname", pathname);

  const skipRedirect =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".");

  if (!skipRedirect) {
    const now = Date.now();
    const cached = redirectCache.get(pathname);
    if (cached && cached.expires > now) {
      const target = cached.toPath.startsWith("http")
        ? cached.toPath
        : new URL(cached.toPath, request.url).toString();
      return NextResponse.redirect(target, cached.statusCode || 301);
    }

    const negUntil = negativeCache.get(pathname);
    if (!negUntil || negUntil <= now) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 500);
        const res = await fetch(
          `${API_BASE}/seo/redirects/resolve?path=${encodeURIComponent(pathname)}`,
          {
            signal: controller.signal,
            next: { revalidate: 300 },
          },
        );
        clearTimeout(timeout);
        if (res.ok) {
          const json = (await res.json()) as {
            data?: { toPath?: string; statusCode?: number } | null;
          };
          const redirect = json.data;
          if (redirect?.toPath) {
            redirectCache.set(pathname, {
              toPath: redirect.toPath,
              statusCode: redirect.statusCode || 301,
              expires: now + POSITIVE_TTL_MS,
            });
            const target = redirect.toPath.startsWith("http")
              ? redirect.toPath
              : new URL(redirect.toPath, request.url).toString();
            return NextResponse.redirect(target, redirect.statusCode || 301);
          }
        }
        negativeCache.set(pathname, now + NEGATIVE_TTL_MS);
      } catch {
        // Fail open — never block navigation on SEO redirect lookup
        negativeCache.set(pathname, now + NEGATIVE_TTL_MS);
      }
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
