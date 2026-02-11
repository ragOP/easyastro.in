"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  VALENTINE_ADDONS,
  VALENTINE_MAIN_PRODUCT,
} from "@/lib/valentine-products";
import ValentineHeader from "@/components/valentine/valentine-header";
import Footer from "@/components/layout/footer";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ValentineHero from "@/components/valentine/valentine-hero";
import ValentineGallery from "@/components/valentine/valentine-gallery";
import ValentineCartSection from "@/components/valentine/valentine-cart-section";
import ValentineFreeReadings from "@/components/valentine/valentine-free-readings";
import ValentineTestimonials from "@/components/valentine/valentine-testimonials";
import ValentineFaq from "@/components/valentine/valentine-faq";
import PastelHearts from "@/components/valentine/pastel-hearts";

export default function ValentinePage() {
  const goToCart = () => window.location.assign("/valentine-cart");

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#0f0508] text-foreground overflow-hidden">
      <PastelHearts />
      <ValentineHeader />

      <main className="flex-1">
        <ValentineHero onCtaClick={goToCart} />

        {/* Cart-style section — click leads to cart */}
        <ValentineCartSection />

        {/* Full gallery section */}
        <ValentineGallery />

        <ValentineFreeReadings onCtaClick={goToCart} />

        {/* Add-ons — gradient cards */}
        <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0508] via-[#1a0a0f] to-[#0f0508]" />
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-pink-600/10 blur-[80px]" />

          <div className="relative mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-headline text-2xl font-bold text-white sm:text-3xl"
            >
              <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                💗 Add-on readings (optional)
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto mt-2 max-w-xl text-center text-rose-200/70"
            >
              Deepen your love journey with these personalised add-ons at checkout.
            </motion.p>

            <div className="mt-12 space-y-4">
              {VALENTINE_ADDONS.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex flex-col gap-3 rounded-2xl border border-rose-500/25 bg-gradient-to-r from-rose-950/60 to-rose-950/30 p-5 transition-all hover:border-rose-400/35 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-white">{a.title}</h3>
                    <p className="mt-1 text-sm text-rose-200/80">{a.blurb}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-bold text-rose-300">₹{a.price}</span>
                    {a.compareAt && (
                      <span className="ml-2 text-sm text-rose-400/60 line-through">₹{a.compareAt}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-rose-200/80"
            >
              <CheckCircle2 className="h-4 w-4 text-rose-400" />
              Add any of these at checkout — Soulmate + 3 FREE readings first, then choose add-ons.
            </motion.div>
          </div>
        </section>

        <ValentineTestimonials />
        <ValentineFaq />

        {/* Final CTA — gradient block */}
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-rose-900/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(190,24,93,0.3),transparent_50%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-2xl text-center"
          >
            <h2 className="font-headline text-2xl font-bold text-white sm:text-3xl">
              Start with your Soulmate Sketch + 3 FREE Readings
            </h2>
            <p className="mt-3 text-rose-200/80">
              One order. Personalised sketch. FREE Psychic, How to Impress Your Crush & Love Report. Optional add-ons at checkout.
            </p>
            <Button
              size="lg"
              onClick={goToCart}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 py-6 text-base font-bold text-white shadow-lg shadow-rose-900/50 sm:w-auto sm:px-10 hover:from-rose-400 hover:via-rose-500 hover:to-pink-500"
            >
              Claim Soulmate + 3 FREE Readings — ₹{VALENTINE_MAIN_PRODUCT.price}
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
