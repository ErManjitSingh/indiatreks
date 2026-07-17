# Performance Report — SEO + Core Web Vitals Targets

## Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 100 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | Excellent |

## Implemented optimizations

### Frontend (Next.js 15)
- `next/image` with **AVIF + WebP** (`next.config.ts`)
- Responsive `deviceSizes` / `imageSizes`
- Lazy loading by default; `priority` only on heroes
- Standalone output + `compress: true`
- Package import optimization for Radix/lucide/zustand
- Long-cache immutable headers for `/images` and `/icons`
- Metadata API (no client-side meta injection for crawlables)
- Manifest + icons for PWA/install signals
- Middleware redirect lookup fails open (≤800ms abort) so SEO never blocks TTFB hard

### Backend (Express)
- Helmet security headers
- Compression (gzip)
- Strong ETag
- Rate limiting on `/api/v1`
- Mongo sanitize + HPP
- Cache-Control on sitemap/robots responses (`max-age=3600`)
- Lean listing selects for trek cards

### SEO crawl efficiency
- Blocked `/admin`, `/api`, `/private` in robots
- Account/checkout paths disallowed
- Split sitemaps reduce single-file crawl cost
- Canonicals prevent duplicate programmatic/trek collisions when configured

## Measurement checklist (post-deploy)

1. PageSpeed Insights on `/`, `/treks`, a trek detail, a programmatic page, a blog
2. Search Console → Coverage / Experience / Sitemaps
3. Chrome DevTools Performance + Lighthouse CI
4. Confirm LCP element is hero image with `priority` + sized attributes
5. Confirm no layout shift from late-loading fonts/images (font CSS variables already in root layout)

## Notes
Scores of “100” depend on hosting, CDN, and third-party scripts. Keep GA/GTM/Pixel/Clarity disabled until needed — third-party tags commonly reduce Performance scores.
