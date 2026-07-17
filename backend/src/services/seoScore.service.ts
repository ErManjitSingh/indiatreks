import type { IEnterpriseSeo } from "../models/schemas/enterpriseSeo.schema";

export interface SeoScoreInput {
  title?: string;
  summary?: string;
  overview?: string;
  content?: string;
  headings?: string[];
  images?: Array<{ src?: string; alt?: string }>;
  seo?: IEnterpriseSeo | null;
  faqs?: Array<{ question: string; answer: string }>;
  hasSchema?: boolean;
  wordCount?: number;
}

export interface SeoScoreBreakdown {
  metaScore: number;
  headingScore: number;
  keywordScore: number;
  imageScore: number;
  schemaScore: number;
  contentScore: number;
  readabilityScore: number;
  overall: number;
  suggestions: string[];
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function fleschApprox(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 0;
  const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
  const syllables = words.reduce((acc, w) => {
    const m = w.toLowerCase().replace(/[^a-z]/g, "").match(/[aeiouy]+/g);
    return acc + Math.max(1, m?.length ?? 1);
  }, 0);
  const score = 206.835 - 1.015 * (words.length / sentences) - 84.6 * (syllables / words.length);
  return clamp(score);
}

function scoreMeta(seo: IEnterpriseSeo | null | undefined, title: string, summary: string): { score: number; tips: string[] } {
  const tips: string[] = [];
  let score = 0;
  const metaTitle = seo?.title || seo?.metaTitle || title || "";
  const metaDesc = seo?.description || seo?.metaDescription || summary || "";
  const titleLen = metaTitle.length;
  const descLen = metaDesc.length;

  if (titleLen >= 50 && titleLen <= 60) score += 35;
  else if (titleLen >= 40 && titleLen <= 70) score += 25;
  else if (titleLen > 0) {
    score += 10;
    tips.push("SEO title should be 50–60 characters.");
  } else tips.push("Add an SEO title.");

  if (descLen >= 140 && descLen <= 160) score += 35;
  else if (descLen >= 120 && descLen <= 170) score += 25;
  else if (descLen > 0) {
    score += 10;
    tips.push("Meta description should be 140–160 characters.");
  } else tips.push("Add a meta description.");

  if (seo?.canonical) score += 15;
  else tips.push("Set a canonical URL.");

  if (seo?.ogImage || seo?.ogTitle) score += 15;
  else tips.push("Add Open Graph title/image.");

  return { score: clamp(score), tips };
}

function scoreHeadings(headings: string[], focus?: string): { score: number; tips: string[] } {
  const tips: string[] = [];
  if (!headings.length) {
    tips.push("Add clear H2/H3 headings.");
    return { score: 20, tips };
  }
  let score = Math.min(60, headings.length * 12);
  if (focus) {
    const hasFocus = headings.some((h) => h.toLowerCase().includes(focus.toLowerCase()));
    if (hasFocus) score += 40;
    else tips.push(`Include focus keyword “${focus}” in at least one heading.`);
  } else {
    score += 20;
    tips.push("Set a focus keyword for better heading relevance.");
  }
  return { score: clamp(score), tips };
}

function scoreKeyword(text: string, focus?: string): { score: number; tips: string[] } {
  const tips: string[] = [];
  if (!focus) {
    tips.push("Define a focus keyword.");
    return { score: 30, tips };
  }
  const lower = text.toLowerCase();
  const kw = focus.toLowerCase();
  const occurrences = lower.split(kw).length - 1;
  const words = Math.max(1, countWords(text));
  const density = (occurrences * kw.split(/\s+/).length) / words;

  let score = 0;
  if (occurrences === 0) {
    tips.push("Focus keyword not found in content.");
    score = 10;
  } else if (density >= 0.005 && density <= 0.025) {
    score = 100;
  } else if (density < 0.005) {
    score = 55;
    tips.push("Increase focus keyword usage slightly (target ~0.5–2.5% density).");
  } else {
    score = 45;
    tips.push("Focus keyword density is high — reduce repetition.");
  }

  if (lower.slice(0, 200).includes(kw)) score = Math.min(100, score + 10);
  else tips.push("Use the focus keyword near the start of the content.");

  return { score: clamp(score), tips };
}

function scoreImages(images: Array<{ src?: string; alt?: string }>): { score: number; tips: string[] } {
  const tips: string[] = [];
  if (!images.length) {
    tips.push("Add at least one optimized image with alt text.");
    return { score: 20, tips };
  }
  const withAlt = images.filter((i) => i.alt && i.alt.trim().length > 3).length;
  const ratio = withAlt / images.length;
  let score = ratio * 100;
  if (ratio < 1) tips.push(`${images.length - withAlt} image(s) missing meaningful alt text.`);
  return { score: clamp(score), tips };
}

function scoreSchema(hasSchema: boolean, faqs?: Array<{ question: string; answer: string }>): { score: number; tips: string[] } {
  const tips: string[] = [];
  let score = hasSchema ? 70 : 20;
  if (!hasSchema) tips.push("Add structured data (JSON-LD).");
  if (faqs && faqs.length >= 2) score += 30;
  else tips.push("Add FAQ schema with at least 2 Q&As.");
  return { score: clamp(score), tips };
}

function scoreContent(wordCount: number, content: string): { score: number; tips: string[] } {
  const tips: string[] = [];
  const words = wordCount || countWords(content);
  let score = 0;
  if (words >= 800) score = 100;
  else if (words >= 500) score = 80;
  else if (words >= 300) score = 60;
  else if (words >= 150) {
    score = 40;
    tips.push("Expand content to at least 300–500 words for stronger topical coverage.");
  } else {
    score = 15;
    tips.push("Content is too short for competitive SEO.");
  }
  return { score: clamp(score), tips };
}

export function calculateSeoScore(input: SeoScoreInput): SeoScoreBreakdown {
  const seo = input.seo ?? null;
  const title = input.title ?? "";
  const summary = input.summary ?? "";
  const content = [input.overview, input.content, summary, title].filter(Boolean).join("\n\n");
  const headings = input.headings ?? [];
  const images = input.images ?? [];
  const wordCount = input.wordCount ?? countWords(content);

  const meta = scoreMeta(seo, title, summary);
  const heading = scoreHeadings(headings, seo?.focusKeyword);
  const keyword = scoreKeyword(content, seo?.focusKeyword);
  const image = scoreImages(images);
  const schema = scoreSchema(
    Boolean(input.hasSchema || seo?.schemaJson || seo?.schemaType),
    input.faqs ?? seo?.faqs,
  );
  const contentScore = scoreContent(wordCount, content);
  const readabilityScore = fleschApprox(content || summary || title);

  const overall = clamp(
    meta.score * 0.2 +
      heading.score * 0.15 +
      keyword.score * 0.2 +
      image.score * 0.1 +
      schema.score * 0.15 +
      contentScore.score * 0.2,
  );

  const suggestions = [
    ...meta.tips,
    ...heading.tips,
    ...keyword.tips,
    ...image.tips,
    ...schema.tips,
    ...contentScore.tips,
  ].slice(0, 12);

  return {
    metaScore: meta.score,
    headingScore: heading.score,
    keywordScore: keyword.score,
    imageScore: image.score,
    schemaScore: schema.score,
    contentScore: contentScore.score,
    readabilityScore,
    overall,
    suggestions,
  };
}

export const seoScoreService = {
  calculate: calculateSeoScore,
};
