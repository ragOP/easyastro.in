"use client";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles, ShieldCheck, HelpCircle, Clock, Mail } from "lucide-react";

type Faq = { question: string; answer: string };

const FAQS: Faq[] = [
  {
    question: "How accurate is the soulmate sketch?",
    answer:
      "Our sketches blend psychic intuition with astrological insights for a unique and personalized result. Many of our clients are amazed by the accuracy and personal resonance of their sketches.",
  },
  {
    question: "Will my personal details remain private?",
    answer:
      "Absolutely. All information you provide is strictly confidential and protected with the highest security standards. We never share your data with third parties.",
  },
  {
    question: "How will I receive my sketch?",
    answer:
      "You will receive your high-quality digital sketch and detailed psychic reading via the email or WhatsApp number you provide during checkout, typically within 24–48 hours.",
  },
  {
    question: "What if I’m not satisfied?",
    answer:
      "Your satisfaction is our top priority. We offer a full, no-questions-asked money-back guarantee if you’re not completely happy with your soulmate sketch and reading.",
  },
  {
    question: "Can I get more details about my soulmate?",
    answer:
      "Yes! We offer a 'Full Revelation' upgrade package that provides a more comprehensive report, including a detailed breakdown of physical traits, personality characteristics, and a love timeline.",
  },
];

export default function FaqSection() {
  // Optional: JSON-LD for rich results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/70 to-background py-10 sm:py-16">
      {/* background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_280px_at_50%_-10%,theme(colors.primary/10),transparent)]" />

      <div className="container mx-auto max-w-3xl px-4">
        {/* header */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Helpful Answers
          </div>
          <h2 className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-foreground/60 sm:text-base">
            Everything you need to know before you order your private sketch.
          </p>
        </div>

        {/* accordion */}
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="group rounded-2xl border border-foreground/10 bg-card/70 px-4 shadow-sm backdrop-blur transition-all hover:shadow-md data-[state=open]:border-primary/25 data-[state=open]:bg-card/80"
            >
              <AccordionTrigger className="text-left text-base font-semibold leading-6 text-foreground hover:no-underline sm:text-lg">
                <span className="inline-flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-7 pr-1 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* policy + support row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-sm text-foreground/70 sm:flex-row">
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 hover:border-primary/20 hover:text-foreground backdrop-blur"
          >
            <ShieldCheck className="h-5 w-5 text-primary" />
            Policy &amp; Support
          </Link>

          <div className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 backdrop-blur">
              <Clock className="h-5 w-5 text-primary" />
              Replies within 24 hours
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 backdrop-blur">
              <Mail className="h-5 w-5 text-primary" />
              no-reply@easyastro.in.
            </span>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
