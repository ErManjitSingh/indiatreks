"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TrekDetail } from "@/types/trek-detail";

export function TrekFaq({ trek }: { trek: TrekDetail }) {
  return (
    <section id="faqs" data-trek-section="faqs" className="scroll-mt-28 border-t border-[#e8ece6] pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2D5A27]">FAQ</p>
      <h2 className="mt-1 font-heading text-2xl font-bold text-[#1A1A1A]">
        Frequently asked questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="mt-4 rounded-2xl border border-border bg-card px-5 shadow-sm md:px-8"
      >
        {trek.faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
