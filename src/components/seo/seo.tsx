import type { ReactNode } from "react";

import {
  blogJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  tourJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import type { BreadcrumbItem } from "@/types";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface SeoProps {
  children?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  includeOrganization?: boolean;
  includeWebsite?: boolean;
  faqs?: Array<{ question: string; answer: string }>;
  tour?: Parameters<typeof tourJsonLd>[0];
  blog?: Parameters<typeof blogJsonLd>[0];
}

export function Seo({
  children,
  breadcrumbs,
  includeOrganization = true,
  includeWebsite = true,
  faqs,
  tour,
  blog,
}: SeoProps) {
  return (
    <>
      {includeOrganization ? <JsonLd data={organizationJsonLd()} /> : null}
      {includeWebsite ? <JsonLd data={websiteJsonLd()} /> : null}
      {breadcrumbs?.length ? <JsonLd data={breadcrumbJsonLd(breadcrumbs)} /> : null}
      {faqs?.length ? <JsonLd data={faqJsonLd(faqs)} /> : null}
      {tour ? <JsonLd data={tourJsonLd(tour)} /> : null}
      {blog ? <JsonLd data={blogJsonLd(blog)} /> : null}
      {children}
    </>
  );
}
