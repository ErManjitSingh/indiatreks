"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState, type ComponentType, type SVGProps } from "react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/common/social-icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { toast } from "@/components/ui/toast";
import { siteConfig } from "@/config/site";
import { footerLinks, socialLinks } from "@/constants";

const socialIconMap: Record<
  (typeof socialLinks)[number]["icon"],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setEmail("");
    toast.success("Subscribed", "Welcome to the trail letters.");
  };

  return (
    <footer className="border-t border-border bg-dark text-white">
      <Container className="section-spacing">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">{siteConfig.name}</h2>
            <p className="max-w-md text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
            <div className="space-y-3 text-sm text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.country}
              </p>
              <Link
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition hover:text-accent"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {siteConfig.phone}
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 transition hover:text-accent"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {siteConfig.email}
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-accent hover:text-accent-foreground"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <FooterColumn title="About" links={footerLinks.about} className="lg:col-span-2" />
          <FooterColumn title="Treks" links={footerLinks.treks} className="lg:col-span-2" />
          <FooterColumn
            title="Destinations"
            links={footerLinks.destinations}
            className="lg:col-span-2"
          />

          <div className="space-y-8 lg:col-span-2">
            <FooterColumn title="Useful Links" links={footerLinks.useful} />
            <FooterColumn title="Policies" links={footerLinks.policies} />
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <h3 className="font-heading text-xl font-bold">Stay close to the mountains</h3>
              <p className="mt-2 text-sm text-white/65">
                Monthly departure notes, seasonal packing tips, and early access offers.
              </p>
            </div>
            <form
              onSubmit={onSubscribe}
              className="flex flex-col gap-2 sm:flex-row"
              aria-label="Footer newsletter"
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Email
              </label>
              <input
                id="footer-newsletter"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="h-12 flex-1 rounded-xl border border-white/15 bg-dark/40 px-4 text-sm outline-none placeholder:text-white/40 focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <Button type="submit" variant="accent" loading={loading} className="sm:min-w-32">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>treks.indiaholidaydestinations.com</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: ReadonlyArray<{ title: string; href: string }>;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm text-white/70">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-accent">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
