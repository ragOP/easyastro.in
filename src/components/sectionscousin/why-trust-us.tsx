"use client";

import Image from "next/image";
import {
  CheckCircle,
  ShieldCheck,
  Lock,
  Star,
  Trophy,
  BadgeCheck,
} from "lucide-react";
import CousinCta from "./CousinCta";

const TRUST_FACTORS = [
  "Over 100,000 sketches delivered",
  "Average 4.8/5 rating from clients",
  "Expert psychics & astrologers",
  "Full satisfaction or your money back",
];

export default function WhyTrustUsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/70 to-background py-10 sm:py-16">
      {/* background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_280px_at_50%_-10%,theme(colors.primary/10),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT: Copy */}
          <div className="order-2 lg:order-1">
            {/* badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <BadgeCheck className="h-4 w-4" />
              Trusted by 100k+ customers
            </div>

            <h2 className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl">
              Why Trust Us?
            </h2>

            {/* trust grid */}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {TRUST_FACTORS.map((factor, index) => (
                <li
                  key={index}
                  className="group flex items-start gap-3 rounded-xl border border-foreground/10 bg-card/70 p-4 shadow-sm backdrop-blur transition-all hover:shadow-md"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </span>
                  <span className="text-foreground/90">{factor}</span>
                </li>
              ))}
            </ul>

            {/* trust badges row */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-foreground/70">
              <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 backdrop-blur">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Money-back guarantee
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 backdrop-blur">
                <Lock className="h-5 w-5 text-primary" />
                Private & secure
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 backdrop-blur">
                <Star className="h-5 w-5 text-primary" />
                4.8/5 average rating
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 backdrop-blur">
                <Trophy className="h-5 w-5 text-primary" />
                Expert team
              </div>
            </div>

            {/* privacy note */}
            <p className="mt-4 text-base font-semibold text-foreground/80">
              Safe, secure, and always confidential. Your trust is our priority.
            </p>
          </div>

          {/* RIGHT: Image */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative w-full max-w-md">
              {/* glow frame */}
              <div className="absolute -inset-0.5 -z-10 rounded-[28px] bg-gradient-to-br from-primary/30 via-fuchsia-500/25 to-primary/10 opacity-80 blur-2xl" />
              <div className="rounded-3xl border border-white/10 bg-card/80 p-2 shadow-2xl backdrop-blur">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="https://ik.imagekit.io/5r36kvobl/Untitled%20design.png"
                    alt="Beautiful soulmate sketch"
                    width={1000}
                    height={1000}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary backdrop-blur">
                Sample artwork • Your sketch is unique
              </div>
            </div>
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
