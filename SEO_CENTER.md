# SEO Center — Phase 11

**Brand:** India Holiday Destinations  
**Admin:** `/admin/seo-center`  
**API prefixes:** `/api/v1/auth/google*`, `/api/v1/seo/center`

## Overview

Enterprise SEO Center inside the Admin Panel with Google Search Console OAuth, GA4 Data API, PageSpeed Core Web Vitals, tag integrations, keyword tracking, sitemaps, robots, redirects, 404 monitor, and SEO audit.

## Modules (Admin)

| Route | Purpose |
|-------|---------|
| `/admin/seo-center` | Dashboard |
| `/admin/seo-center/search-console` | GSC connect + metrics + URL inspection |
| `/admin/seo-center/analytics` | GA4 dashboard + property settings |
| `/admin/seo-center/gtm` | Google Tag Manager container |
| `/admin/seo-center/clarity` | Microsoft Clarity |
| `/admin/seo-center/meta-pixel` | Meta Pixel |
| `/admin/seo-center/bing` | Bing Webmaster |
| `/admin/seo-center/keywords` | Keyword tracking |
| `/admin/seo-center/core-web-vitals` | LCP / CLS / INP / FCP / TTFB |
| `/admin/seo-center/sitemaps` | Multi-sitemap manager |
| `/admin/seo-center/robots` | Robots editor + preview |
| `/admin/seo-center/redirects` | 301 manager + import/export |
| `/admin/seo-center/404` | 404 monitor |
| `/admin/seo-center/audit` | Full SEO audit |

## Google OAuth setup

1. Create OAuth client in Google Cloud Console (Web application).
2. Enable APIs: **Search Console API**, **Google Analytics Data API**, (optional) **PageSpeed Insights API**.
3. Authorized redirect URI:
   `{APP_URL}/api/v1/auth/google/callback`
   Example: `https://api.treks.indiaholidaydestination.com/api/v1/auth/google/callback`
4. Set env on API server:

```env
GOOGLE_CLIENT_ID=648843997102-eo804j2692f6ppkugeeuq1e1lq4ml8d2.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=         # optional explicit callback
GOOGLE_OAUTH_REDIRECT_URI=   # backward-compatible alias
GOOGLE_PAGESPEED_API_KEY=    # optional
SESSION_SECRET=              # optional OAuth state secret
TOKEN_ENCRYPTION_KEY=        # optional; defaults to JWT_ACCESS_SECRET
```

5. In Admin → SEO Center → Search Console → **Connect Google Account**.
6. Save Search Console property URL and GA4 property ID.

## Security

- Access / refresh tokens encrypted with AES-256-GCM (`tokenCrypto`).
- Tokens `select: false` on Mongo documents.
- APIs never return raw tokens to the frontend.
- Refresh tokens rotate automatically via `googleapis` client.
- Bing API keys stored with `select: false` and returned masked only.
- Staff permission: `seo.write`.

## MongoDB collections

| Collection | Model |
|------------|-------|
| `google_accounts` | Google OAuth connection |
| `seo_settings` | Global SEO settings (existing) |
| `search_console` | GSC property metadata (existing) |
| `search_console_cache` | Cached GSC metrics |
| `analytics` | GA/GTM/Clarity/Pixel/Bing config (existing + Bing) |
| `analytics_cache` | Cached GA4 metrics |
| `keyword_tracking` | Tracked keywords |
| `seo_reports` | CWV + audit payloads (extended) |
| `seo_audits` | Audit runs (existing) |

## Key APIs

```
GET  /seo/center/dashboard
GET  /seo/center/integrations
PUT  /seo/center/integrations
GET  /auth/google
GET  /auth/google/callback         # public redirect from Google
GET  /auth/google/status
POST /auth/google/disconnect
GET  /seo/center/gsc/dashboard?days=28&sync=1
POST /seo/center/gsc/sync
POST /seo/center/gsc/sitemaps/submit
POST /seo/center/gsc/inspect
GET  /seo/center/ga/dashboard
POST /seo/center/ga/sync
GET  /seo/center/cwv
POST /seo/center/cwv/run
CRUD /seo/center/keywords
POST /seo/center/keywords/sync-gsc
POST /seo/center/audit/run
GET  /seo/center/robots/preview
POST /seo/center/sitemaps/generate
GET  /seo/center/redirects/export
POST /seo/center/redirects/import
PATCH /seo/center/404/:id/ignore
DELETE /seo/center/404/:id
```

## Official Google APIs used

- OAuth 2.0 (`googleapis` auth)
- Search Console API (searchanalytics, sitemaps, urlInspection, sites)
- Analytics Data API v1beta
- PageSpeed Insights API v5

## Notes

- Without OAuth credentials the UI still loads; connect CTA shows configuration status.
- Coverage “indexed/excluded” values improve after GSC sync; full Index Coverage API is limited by Google — sitemap content counts are used as a practical proxy.
- Legacy `/admin/seo` tabbed settings remain available.
