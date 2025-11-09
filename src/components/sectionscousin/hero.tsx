"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, Star, Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * Premium Hero Section (completely redesigned)
 * - Glassy gradient background with animated light rays
 * - Clean 2-column layout with mobile-first stacking
 * - Polished stats as cards with subtle borders & hover
 * - Clear trust badges row below CTA
 * - Accessible, responsive, production-ready
 */

const STATS = [
  { Icon: Users, value: "100,000+", label: "Happy Clients" },
  { Icon: Star, value: "4.8/5", label: "Average Rating" },
  { Icon: Clock, value: "24 Hours", label: "Delivered Privately" },
  { Icon: ShieldCheck, value: "100%", label: "Safe & Confidential" },
];

export default function HeroSection() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/cart");
  };

  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full bg-purple-500/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_400px_at_50%_-20%,theme(colors.primary/0.25),transparent)]" />
      {/* LIGHT RAYS */}
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[120vh] w-[90vw] -translate-x-1/2 rotate-12 opacity-30 [background:repeating-linear-gradient(90deg,transparent,transparent_6px,theme(colors.white/8)_7px,transparent_8px)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          {/* LEFT: COPY */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Trending • Loved by 100k+ customers
            </div>

            <h1 className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-5xl md:leading-[1.1]">
              <span className="font-extrabold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                See Your Soulmate’s Face
              </span>{" "}
              <span className="font-semibold text-foreground">— starting today.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base text-foreground/75 md:text-lg md:leading-relaxed lg:mx-0 mx-auto">
              Curated by gifted psychics & astrology experts. A private, personalized sketch delivered
              securely within 24 hours—crafted just for you.
            </p>

            {/* CTA + Social Proof */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
              <Button
                size="lg"
                onClick={handleRedirect}
                className="group w-full sm:w-auto rounded-2xl px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <span className="relative inline-flex items-center">
                  Reveal My Soulmate Now
                  <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                </span>
              </Button>

              <div className="flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-4 py-3 text-sm text-foreground/80 backdrop-blur">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Private • Secure • No spam</span>
              </div>
            </div>

            {/* Scarcity / Spots */}
            <div
              className="mt-3 text-sm font-semibold text-primary"
              aria-live="polite"
            >
              9 spots left for a free in-depth love reading!
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-col gap-2 text-foreground/70 sm:flex-row sm:items-center sm:gap-4">
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Money-back guarantee</span>
              </div>
              <div className="hidden h-4 w-px bg-foreground/10 sm:block" />
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Secure checkout</span>
              </div>
              <div className="hidden h-4 w-px bg-foreground/10 sm:block" />
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>No sharing of results</span>
              </div>
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[520px]">
              {/* Frame */}
              <div className="absolute -inset-0.5 -z-10 rounded-[28px] bg-gradient-to-br from-primary/40 via-purple-500/30 to-primary/10 opacity-75 blur-2xl" />
              <div className="rounded-3xl border border-white/10 bg-card/80 p-2 shadow-2xl backdrop-blur">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                    alt="Soulmate Sketch Example"
                    width={1000}
                    height={1000}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
              {/* Floating label */}
              <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary backdrop-blur">
                Sample illustration • Actual sketch is personalized
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {STATS.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 px-4 py-5 text-center shadow-sm backdrop-blur transition-all hover:shadow-md"
            >
              <div className="pointer-events-none absolute -top-10 right-0 h-24 w-24 rotate-45 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-70 blur-xl" />
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-3 text-2xl font-extrabold text-foreground sm:text-3xl">
                {value}
              </div>
              <div className="mt-1 text-sm text-foreground/70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
