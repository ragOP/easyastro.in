"use client";

import { ArtIcon, ReadingIcon } from "@/components/icons";
import { CircleDollarSign, Sparkles, ShieldCheck } from "lucide-react";
import CtaButton from "../common/cta-button";

const deliverables = [
  {
    icon: <ArtIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Personalized Psychic Sketch",
    description:
      "A custom hand-drawn illustration of the person destined to play a divine role in your love journey.",
  },
  {
    icon: <ReadingIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "FREE In-Depth Love Reading",
    description:
      "Detailed soulmate personality traits, alignment energy, compatibility, and divine timing of meeting.",
    scarcity: "Only 9 bonus spots left!",
  },
  {
    icon: <CircleDollarSign className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Optional: Personalized Wealth Report",
    description:
      "Unlock spiritual money blocks, prosperity timing, and cosmic financial alignment guidance.",
  },
];

export default function WhatYouReceiveSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/60 to-background py-10 sm:py-16">
      {/* Glowing background effects */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_260px_at_50%_-10%,theme(colors.primary/10),transparent)]" />

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Your Spiritual Package
          </div>

          <h2 className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl">
            What You Receive
          </h2>

          <p className="mt-2 text-foreground/70 text-sm md:text-base">
            A high-vibration, private, aligned soulmate revelation experience
          </p>
        </div>

        {/* Deliverables */}
        <div className="mx-auto grid max-w-3xl gap-6">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className="group relative flex items-start gap-5 rounded-2xl border border-foreground/10 bg-card/70 p-6 shadow-sm backdrop-blur transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Glow border accent */}
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-[26px] bg-[conic-gradient(from_0deg,theme(colors.primary/30),transparent_30%,theme(colors.fuchsia.400/30),transparent_70%,theme(colors.primary/30))] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-headline text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>

                {item.scarcity && (
                  <p className="mt-3 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary animate-pulse tracking-wider uppercase">
                    {item.scarcity}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Privacy badge */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-4 py-2 text-sm text-foreground/70 backdrop-blur">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Every reading is completely private & confidential
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
