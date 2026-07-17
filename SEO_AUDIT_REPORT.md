# SEO Audit Report — AI SEO Automation Engine

**Date:** 2026-07-17  
**Module:** Phase 10 — AI SEO Automation + Content Intelligence  
**Status:** Production-ready (human-in-the-loop)

## How to run an audit

1. Open Admin → **AI SEO Engine** (`/admin/seo/ai`)
2. Click **Run project-wide SEO audit**
3. Review health score, issue lists, and stored audit history
4. API: `POST /api/v1/seo/ai/audit` (requires `seo.write`)

## What the audit checks

| Check | Severity | Guidance |
|-------|----------|----------|
| Missing SEO title / description | Critical | Use Meta Generator → review → save |
| Missing schema type/JSON | Warning | Preview schema → set schemaType |
| Duplicate titles | Warning | Differentiate with destination/difficulty |
| Duplicate descriptions | Warning | Rewrite unique meta descriptions |
| Missing canonicals | Warning | Accept suggested canonical |
| Missing FAQs | Info | FAQ Generator → edit → save |
| Missing image alt | Info | Image SEO Assistant |
| Low content quality score | Warning | Content Quality Analyzer (guidance only) |

## Dashboard health formula

Health starts at 100 and is reduced by weighted issue density across scanned treks, blogs, destinations, and programmatic pages. Exact score is returned as `overallSeoHealth`.

## Collections written

- `seo_audits` — full run with issues + counts + summary
- `seo_reports` — snapshot report linked to audit id
- Supporting suggestion logs: `meta_suggestions`, `faq_suggestions`, `internal_link_suggestions`, `content_quality_reports`

## Search Console & Analytics

Audit UI surfaces:

- Verification status
- Sitemap submission counts
- Indexing request queue
- Analytics placeholders (organic traffic, CTR, position, clicks, impressions)

Live GSC/GA4 metrics populate when the site owner connects credentials/tags in Global SEO / Analytics settings.

## Safety

AI/automation **never** publishes content. All generators return `requiresReview: true` / draft status. Publish remains a manual admin action.
