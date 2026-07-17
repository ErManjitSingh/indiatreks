# Content Quality Report — AI Guidance Engine

**Date:** 2026-07-17  
**Scope:** Draft content analyzer for Treks, Blogs, Destinations, Landing pages

## Analyzer outputs

| Signal | What it measures |
|--------|------------------|
| Heading structure | Presence/count of H2/H3 style section headings |
| Paragraph length | Average words per paragraph (target ~40–120) |
| Image count | Number of images provided in payload |
| Missing alt text | Images without meaningful alt |
| Missing CTA | Book / Enquire style call-to-action detection |
| Missing FAQs | FAQ array emptiness |
| Word count / length score | Body depth for SEO competitiveness |
| H1 count | Missing or multiple H1 risk |

## Score model

Overall score blends:

- Headings 20%
- Paragraphs 15%
- Images 15%
- FAQs 15%
- CTA 10%
- Length 25%

Improvements are returned as a prioritized checklist. **Content is never overwritten.**

## API

`POST /api/v1/seo/ai/content-quality`

Persists a row in `content_quality_reports` for history/reporting.

## Admin UX

- Trek / Blog / Destination SEO sections → **Analyze Content**
- AI SEO Engine dashboard → low-quality page list from site-wide scan

## Related assistants

- FAQ Generator — draft Q&As from trek attributes
- Meta Generator — title/description/OG/Twitter drafts
- Internal Link Assistant — contextual link suggestions
- Blog Assistant — outline, TOC, reading time hints
- Image SEO Assistant — alt, caption, filename, title drafts

All assistants require human approval before save/publish.
