"use client";

import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { submitContactAction } from "@/actions/contact";
import { PageHero } from "@/components/pages/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { trekImages } from "@/constants/trek-images";
import { siteConfig } from "@/config/site";
import { useSiteContent } from "@/providers/site-content-provider";

const quickLinks = [
  { title: "Browse Treks", href: "/treks", caption: "250+ curated adventures" },
  { title: "Destinations", href: "/destinations", caption: "Himachal, Uttarakhand & more" },
  { title: "About Us", href: "/about", caption: "Our story & safety standards" },
  { title: "Book a Trek", href: "/booking", caption: "Secure your dates online" },
];

function ContactCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#e3e8de] bg-white p-5 shadow-sm">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4e8] text-[#2D5A27]">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <h3 className="mt-4 font-heading text-sm font-bold text-[#14201a]">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-[#6b7668]">{children}</div>
    </div>
  );
}

export function ContactPageContent() {
  const { site } = useSiteContent();
  const phone = String(site.phone ?? siteConfig.phone);
  const email = String(site.email ?? siteConfig.email);
  const whatsapp = String(site.whatsapp ?? siteConfig.whatsapp).replace(/\D/g, "");
  const phoneHref = phone.replace(/\s/g, "");
  const waHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi! I'd like help planning a trek with India Holiday Destinations.",
  )}`;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await submitContactAction({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    });

    setLoading(false);

    if (!result.success) {
      if (result.errors) {
        const next: Record<string, string> = {};
        for (const [key, msgs] of Object.entries(result.errors)) {
          if (msgs?.[0]) next[key] = msgs[0];
        }
        setErrors(next);
      }
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're Here to Help You Plan"
        description="Questions about a trek, group bookings, custom itineraries, or safety — our specialists respond within a few hours on working days."
        image={trekImages.mountains1}
        imageAlt="Mountain trail contact"
      />

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#2D5A27] uppercase">
                  Get in Touch
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#1a1a1a] md:text-3xl">
                  Talk to a Trek Specialist
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6b7668]">
                  Call, WhatsApp, or email us — or fill out the form and we&apos;ll get back to you
                  with personalized trek recommendations.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ContactCard icon={Phone} title="Phone">
                  <a
                    href={`tel:${phoneHref}`}
                    className="font-semibold text-[#2D5A27] hover:underline"
                  >
                    {phone}
                  </a>
                  <p className="mt-1 text-xs">24×7 trek support line</p>
                </ContactCard>

                <ContactCard icon={Mail} title="Email">
                  <a
                    href={`mailto:${email}`}
                    className="break-all font-semibold text-[#2D5A27] hover:underline"
                  >
                    {email}
                  </a>
                  <p className="mt-1 text-xs">Replies within 2–4 hours</p>
                </ContactCard>

                <ContactCard icon={MessageCircle} title="WhatsApp">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#2D5A27] hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                  <p className="mt-1 text-xs">Fastest for quick queries</p>
                </ContactCard>

                <ContactCard icon={MapPin} title="Office">
                  <p>
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </p>
                </ContactCard>
              </div>

              <div className="rounded-2xl bg-[#f4f5f2] p-5">
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#2D5A27]" aria-hidden />
                  <div>
                    <p className="font-heading text-sm font-bold text-[#14201a]">
                      Support Hours
                    </p>
                    <p className="mt-1 text-sm text-[#6b7668]">
                      Monday – Saturday · 9:00 AM – 8:00 PM IST
                    </p>
                    <p className="mt-1 text-xs text-[#6b7668]">
                      Emergency on-trail coordination available 24×7 for active departures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border border-[#e3e8de] bg-white px-4 py-3 transition hover:border-[#2D5A27]/30 hover:shadow-sm"
                  >
                    <p className="text-sm font-bold text-[#14201a]">{link.title}</p>
                    <p className="mt-0.5 text-xs text-[#6b7668]">{link.caption}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#e3e8de] bg-white p-6 shadow-[0_16px_40px_rgba(27,48,34,0.08)] md:p-8">
              <h2 className="font-heading text-xl font-bold text-[#14201a]">Send a Message</h2>
              <p className="mt-2 text-sm text-[#6b7668]">
                Tell us your preferred destination, dates, and group size — we&apos;ll suggest the
                best options.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <Input
                  name="name"
                  label="Full name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  error={errors.name}
                  required
                  autoComplete="name"
                />
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  error={errors.email}
                  required
                  autoComplete="email"
                />
                <Input
                  name="phone"
                  type="tel"
                  label="Phone / WhatsApp"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  error={errors.phone}
                  required
                  autoComplete="tel"
                />
                <Textarea
                  name="message"
                  label="Message"
                  placeholder="I'm interested in a weekend trek near Dharamshala for 4 people in March..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  error={errors.message}
                  required
                  rows={5}
                />
                <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                  <Send className="h-4 w-4" aria-hidden />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-[#1B3022] py-10 text-white md:py-12">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="font-display text-xl font-semibold md:text-2xl">
                Prefer WhatsApp?
              </h2>
              <p className="mt-2 max-w-md text-sm text-white/75">
                Get instant answers about trek difficulty, pricing, and available dates.
              </p>
            </div>
            <Button asChild variant="secondary" size="lg" className="shrink-0">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Start WhatsApp Chat
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
