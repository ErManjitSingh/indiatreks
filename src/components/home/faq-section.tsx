"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaButton } from "@/components/ui/cta-button";
import { useSiteContent } from "@/providers/site-content-provider";

export function FaqSection() {
  const { homeFaqs } = useSiteContent();
  return (
    <Section spacing="md">
      <Container className="max-w-4xl">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered clearly"
          description="Everything you usually ask before packing your bag."
          align="center"
        />

        <Accordion type="single" collapsible className="rounded-3xl border border-border bg-card px-5 shadow-sm md:px-8">
          {homeFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left text-base md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 flex justify-center">
          <CtaButton href="/faq" variant="outline">
            View all FAQs
          </CtaButton>
        </div>
      </Container>
    </Section>
  );
}
