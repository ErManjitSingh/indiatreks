import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export default function TrekNotFound() {
  return (
    <Section spacing="lg">
      <Container className="max-w-xl text-center">
        <Heading as="h1" size="lg">
          Trek not found
        </Heading>
        <p className="mt-4 text-muted-foreground">
          This trail isn&apos;t in our curated detail collection yet. Browse all treks to continue
          exploring.
        </p>
        <Button asChild className="mt-8" variant="accent">
          <Link href="/treks">Explore all treks</Link>
        </Button>
      </Container>
    </Section>
  );
}
