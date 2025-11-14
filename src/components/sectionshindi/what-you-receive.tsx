"use client";

import { ArtIcon, ReadingIcon } from "@/components/icons";
import { CircleDollarSign, Sparkles, ShieldCheck } from "lucide-react";
import CousinCta from "./CousinCta";

const deliverables = [
  {
    icon: <ArtIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "व्यक्तिगत साइकि्क स्केच",
    description:
      "आपकी प्रेम यात्रा में दिव्य भूमिका निभाने के लिए बने व्यक्ति का, आपके लिए खास तौर पर हाथ से बनाया गया स्केच।",
  },
  {
    icon: <ReadingIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "बिल्कुल फ्री, गहराई वाली लव रीडिंग",
    description:
      "आपके सोलमेट के व्यक्तित्व, ऊर्जा के संरेखण, कम्पैटिबिलिटी और आप दोनों की मुलाकात के दिव्य समय की विस्तृत रीडिंग।",
    scarcity: "सिर्फ 9 बोनस स्लॉट बचे हैं!",
  },
  {
    icon: <CircleDollarSign className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "ऑप्शनल: पर्सनलाइज़्ड वेल्थ रिपोर्ट",
    description:
      "आपके आध्यात्मिक मनी ब्लॉक्स, समृद्धि के सही समय और कॉस्मिक फाइनेंशियल अलाइनमेंट के लिए गाइडेंस अनलॉक करें।",
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
            आपका स्पिरिचुअल पैकेज
          </div>

          <h2 className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl">
            आपको क्या मिलेगा
          </h2>

          <p className="mt-2 text-foreground/70 text-sm md:text-base">
            एक हाई-वाइब्रेशन, प्राइवेट और पूरी तरह अलाइन्ड सोलमेट रिवीलेशन अनुभव
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
            हर रीडिंग पूरी तरह प्राइवेट और कॉन्फिडेन्शियल रहती है
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <CousinCta />
        </div>
      </div>
    </section>
  );
}
