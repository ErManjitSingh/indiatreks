import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TrekDetail } from "@/types/trek-detail";

export function TrekPackingList({ trek }: { trek: TrekDetail }) {
  return (
    <section className="scroll-mt-28 border-t border-[#e8ece6] pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2D5A27]">
        Things to Carry
      </p>
      <h2 className="mt-1 font-heading text-2xl font-bold text-[#1A1A1A]">Packing checklist</h2>
      <Accordion
        type="multiple"
        defaultValue={trek.packingList.map((g) => g.category)}
        className="mt-4 rounded-2xl border border-border bg-card px-4 shadow-sm md:px-6"
      >
        {trek.packingList.map((group) => (
          <AccordionItem key={group.category} value={group.category}>
            <AccordionTrigger className="text-base">{group.category}</AccordionTrigger>
            <AccordionContent>
              <ul className="grid gap-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-xl bg-muted/50 px-3 py-2 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6 rounded-2xl border border-[#e8ece6] bg-[#F7F8F6] p-5">
        <h3 className="font-heading text-lg font-bold">Fitness</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Level: <span className="font-semibold text-foreground">{trek.fitness.level}</span> · Score{" "}
          {trek.fitness.score}/10
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#444]">{trek.fitness.description}</p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {trek.fitness.tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="text-[#2D5A27]">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TrekFitness({ trek: _trek }: { trek: TrekDetail }) {
  return null;
}
