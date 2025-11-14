"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailsIcon, PsychicIcon, DeliveryIcon } from "@/components/icons";
import CousinCta from "./CousinCta";

/**
 * HOW IT WORKS – HINDI TRANSLATION
 */

const STEPS = [
  {
    icon: <DetailsIcon className="h-9 w-9 text-primary md:h-12 md:w-12" />,
    title: "अपनी जानकारी साझा करें",
    description:
      "अपना नाम और जन्मतिथि बताएं। इससे हमारे अनुभवी साइकि्क्स आपकी विशिष्ट आध्यात्मिक ऊर्जा से जुड़ पाते हैं।",
  },
  {
    icon: <PsychicIcon className="h-9 w-9 text-primary md:h-12 md:w-12" />,
    title: "हमारे कलाकार काम शुरू करते हैं",
    description:
      "हमारे अंतर्ज्ञानी कलाकार और ज्योतिष विशेषज्ञ आपकी ऊर्जा का उपयोग करके आपके सोलमेट का हाथ से बनाया स्केच तैयार करते हैं।",
  },
  {
    icon: <DeliveryIcon className="h-9 w-9 text-primary md:h-12 md:w-12" />,
    title: "अपना स्केच प्राप्त करें",
    description:
      "आपका स्केच और लव रीडिंग 24–48 घंटों के भीतर ईमेल या व्हाट्सएप के माध्यम से निजी तौर पर भेज दी जाती है।",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="relative overflow-hidden bg-gradient-to-b from-background via-background/70 to-background py-10 sm:py-16"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_280px_at_50%_-10%,theme(colors.primary/12),transparent)]" />

      <div className="container mx-auto px-4">
        <h2
          id="how-it-works-title"
          className="text-center font-headline text-3xl leading-tight text-foreground md:text-4xl"
        >
          यह कैसे काम करता है
        </h2>

        {/* Mobile: Vertical Timeline */}
        <ol className="mt-8 grid gap-6 md:hidden">
          {STEPS.map((step, idx) => (
            <li key={step.title} className="relative pl-10">
              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-6 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"
                />
              )}

              {/* Step dot + number */}
              <span className="absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-card/80 text-sm font-bold text-primary backdrop-blur">
                {idx + 1}
              </span>

              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 shadow-sm backdrop-blur">
                {/* Glow edge */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
                <div className="flex items-start gap-4 p-4">
                  <div className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl text-foreground">{step.title}</h3>
                    <p className="mt-1 text-foreground/80">{step.description}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: 3 Cards with animated borders */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 md:gap-8">
          {STEPS.map((step, idx) => (
            <div key={step.title} className="relative">
              {/* animated gradient border */}
              <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-3xl bg-[conic-gradient(from_180deg,theme(colors.primary/20),transparent_30%,theme(colors.fuchsia.500/20),transparent_70%,theme(colors.primary/20))] opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              <Card className="group h-full rounded-3xl border border-foreground/10 bg-card/70 shadow-sm backdrop-blur transition-all hover:shadow-md">
                <CardHeader className="flex flex-col items-center pb-2 pt-6">
                  {/* Step number chip */}
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    स्टेप {idx + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    {step.icon}
                  </div>

                  <CardTitle className="text-center font-headline text-2xl text-foreground">
                    {step.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 pb-6 text-center">
                  <p className="text-foreground/80">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <CousinCta />
        </div>

        {/* Helper caption */}
        <p className="mt-3 text-center text-sm text-foreground/60">
          पूरी तरह निजी, सुरक्षित और खास आपके लिए — शुरू करें कुछ मिनटों में।
        </p>
      </div>
    </section>
  );
}
