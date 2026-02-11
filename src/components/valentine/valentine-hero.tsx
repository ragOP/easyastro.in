"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { VALENTINE_MAIN_PRODUCT } from "@/lib/valentine-products";
import { Heart, ShieldCheck, Check, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ValentineHeroSlideshow from "./valentine-hero-slideshow";

export default function ValentineHero({ onCtaClick }: { onCtaClick: () => void }) {
  const [showWhatYouGet, setShowWhatYouGet] = useState(true);

  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex flex-col sm:min-h-0 sm:py-10 sm:pb-14">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/95 via-[#1a0a0f] to-[#0f0508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(190,24,93,0.28),transparent_50%)]" />
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-rose-600/12 blur-[80px] sm:h-96 sm:w-96" />
      <div className="absolute right-0 bottom-1/4 h-56 w-56 rounded-full bg-pink-500/10 blur-[60px] sm:h-80 sm:w-80" />

      <div className="relative flex-1 flex flex-col mx-auto w-full max-w-4xl px-4 pt-6 pb-8 sm:px-6 sm:pt-10 sm:pb-12">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500/30 to-pink-500/30 border border-rose-400/50 px-3 py-2 text-xs font-semibold text-rose-100 shadow-lg shadow-rose-900/30 sm:px-4 sm:text-sm"
        >
          <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-rose-400" aria-hidden />
          Valentine Week — Limited Time
        </motion.span>

        {/* Hero headline — editorial, not cart */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="mt-5 sm:mt-8 font-headline text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-r from-rose-200 via-pink-200 to-rose-100 bg-clip-text text-transparent">
            Soulmate Sketch
          </span>
          <br />
          <span className="text-white/95">+ 3 FREE Readings</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-4 text-base text-rose-200/85 sm:text-lg sm:mt-5 max-w-xl"
        >
          Your love story is written in your energy. Get a personalised soulmate sketch plus FREE Psychic Reading, How to Impress Your Crush & Love Report — this Valentine week only.
        </motion.p>

        {/* Hero visual — slideshow, not product card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-8 sm:mt-10"
        >
          <ValentineHeroSlideshow />
        </motion.div>

        {/* Single CTA — hero style, not "Complete your order" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="mt-8 sm:mt-10 flex flex-col items-center"
        >
          <Button
            size="lg"
            onClick={onCtaClick}
            className="w-full min-h-[52px] sm:w-auto sm:min-h-0 sm:px-10 sm:py-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-base font-bold text-white shadow-lg shadow-rose-900/50 hover:shadow-rose-500/25 hover:from-rose-400 hover:via-rose-500 hover:to-pink-500 active:scale-[0.98] touch-manipulation transition-shadow"
          >
            <span className="inline-flex items-center gap-2">
              Get Soulmate + 3 FREE Readings
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
          </Button>
          <p className="mt-3 text-sm text-rose-300/90">
            Only ₹{VALENTINE_MAIN_PRODUCT.price} — Psychic, Impress Your Crush & Love Report included
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 px-4 py-2.5 rounded-xl border border-rose-500/25 bg-rose-950/40 text-xs sm:text-sm text-rose-200">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400 shrink-0" aria-hidden />
            <span>Private • Secure • 24–48h delivery</span>
          </div>
        </motion.div>

        {/* What you get — open by default */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="mt-8 sm:mt-10"
        >
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setShowWhatYouGet(!showWhatYouGet)}
              className="w-full flex items-center justify-between rounded-2xl border border-rose-500/25 bg-rose-950/40 px-4 py-3.5 text-left min-h-[48px] touch-manipulation"
            >
              <span className="text-sm font-semibold text-rose-200">What you get</span>
              <ChevronDown
                className={`h-5 w-5 text-rose-400 transition-transform ${showWhatYouGet ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {showWhatYouGet && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="rounded-b-2xl border border-t-0 border-rose-500/25 bg-rose-950/30 px-4 py-4 space-y-2.5">
                    <li className="flex items-start gap-2.5 text-sm text-rose-200/90">
                      <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
                      <span><strong className="text-white">Soulmate Sketch</strong> — Hand-drawn, personalised portrait of the person you&apos;re meant for</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-rose-200/90">
                      <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
                      <span><strong className="text-white">FREE Psychic Reading</strong> — Hidden emotions, signs & connections in your love life</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-rose-200/90">
                      <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
                      <span><strong className="text-white">FREE How to Impress Your Crush</strong> — How your energy comes across & how to show up confidently</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-rose-200/90">
                      <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
                      <span><strong className="text-white">FREE Love Report</strong> — Romantic patterns, emotional needs & the partner you&apos;re meant for</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-rose-200/90">
                      <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
                      <span><strong className="text-white">Private delivery</strong> — Email & WhatsApp in 24–48 hours</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ul className="hidden sm:block rounded-2xl border border-rose-500/25 bg-rose-950/40 px-5 py-4 space-y-2 text-sm text-rose-200/90">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
              <span><strong className="text-white">Soulmate Sketch</strong> — Hand-drawn, personalised portrait of the person you&apos;re meant for</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
              <span><strong className="text-white">FREE Psychic Reading</strong> — Hidden emotions, signs & connections in your love life</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
              <span><strong className="text-white">FREE How to Impress Your Crush</strong> — How your energy comes across & how to show up confidently</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
              <span><strong className="text-white">FREE Love Report</strong> — Romantic patterns, emotional needs & the partner you&apos;re meant for</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
              <span><strong className="text-white">Private delivery</strong> — Email & WhatsApp in 24–48 hours</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
