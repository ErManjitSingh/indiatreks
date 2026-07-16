import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { BLUR_DATA_URL } from "@/constants/media";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#0b1220] text-white",
        className,
      )}
    >
      <Image
        src={image}
        alt={imageAlt || title}
        fill
        priority
        sizes="100vw"
        quality={75}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0.55)_0%,rgba(8,12,20,0.72)_55%,rgba(8,12,20,0.92)_100%)]" />

      <Container className="relative z-[1] py-14 md:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-6 text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-white/35">
              /
            </li>
            <li className="text-lime">{eyebrow}</li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          <p className="text-[11px] font-bold tracking-[0.22em] text-lime uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75 md:text-base">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
