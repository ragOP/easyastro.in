"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { Sparkles, ShieldCheck, HelpCircle, Clock, Mail } from "lucide-react";

const FAQS = [
  {
    question: "What do I get with the Soulmate + Free Love Report offer?",
    answer:
      "You get a personalised hand-drawn soulmate sketch plus a FREE Love Report that reveals your romantic patterns, emotional needs, and the kind of partner you're truly meant for. Delivery is private via email/WhatsApp within 24–48 hours.",
  },
  {
    question: "How accurate is the soulmate sketch?",
    answer:
      "Our sketches blend psychic intuition with astrological insights for a unique, personalised result. Many clients are amazed by the accuracy and personal resonance—especially when they receive the free Love Report alongside the sketch.",
  },
  {
    question: "Is the Love Report really free?",
    answer:
      "Yes! This Valentine week, the Love Report is included at no extra cost when you order the Soulmate Sketch. It highlights your romantic patterns, emotional needs, and the partner you're meant for—a perfect starting point for singles.",
  },
  {
    question: "Will my details stay private?",
    answer:
      "Absolutely. All information you provide is strictly confidential and protected. We never share your data with third parties. Your sketch and reading are delivered privately to you only.",
  },
  {
    question: "How will I receive my sketch and Love Report?",
    answer:
      "You'll receive your high-quality digital sketch and your free Love Report via the email or WhatsApp number you provide at checkout, typically within 24–48 hours.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "We offer a full, no-questions-asked money-back guarantee. Your satisfaction is our priority.",
  },
  {
    question: "What are the add-on readings (Soulmate Spot, Love Magnet Ritual, How to Move On)?",
    answer:
      "These are optional paid add-ons you can include at checkout. Soulmate Spot reveals where you're likely to meet your soulmate; Love Magnet Ritual helps attract love using your birth details; How to Move On helps release old attachments. Each is ₹99.",
  },
];

export default function ValentineFaq() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-pink-200/60 bg-gradient-to-b from-white/70 to-pink-50/50 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-pink-300/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-rose-300/15 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-300/60 bg-pink-100/80 px-3 py-1 text-sm font-medium text-pink-800">
            <Sparkles className="h-4 w-4" />
            Helpful answers
          </span>
          <h2 className="mt-4 font-headline text-3xl font-bold text-zinc-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-zinc-600">
            Everything you need to know before ordering your Soulmate Sketch + Free Love Report.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-pink-200/60 bg-white/90 px-4 shadow-sm backdrop-blur transition-all hover:shadow-md data-[state=open]:border-pink-300/60 data-[state=open]:bg-white"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-zinc-900 hover:no-underline sm:text-lg">
                  <span className="inline-flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 shrink-0 text-pink-500" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pl-7 pr-1 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-zinc-600 sm:flex-row"
        >
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 rounded-xl border border-pink-200/80 bg-white/80 px-4 py-2.5 font-medium text-pink-800 backdrop-blur hover:bg-pink-50"
          >
            <ShieldCheck className="h-5 w-5 text-pink-500" />
            Policy &amp; Support
          </Link>
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-pink-200/80 bg-white/80 px-3 py-2 backdrop-blur">
              <Clock className="h-5 w-5 text-pink-500" />
              Replies within 24 hours
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-pink-200/80 bg-white/80 px-3 py-2 backdrop-blur">
              <Mail className="h-5 w-5 text-pink-500" />
              no-reply@easyastro.in
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
