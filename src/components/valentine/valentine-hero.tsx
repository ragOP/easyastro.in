"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VALENTINE_MAIN_PRODUCT } from "@/lib/valentine-products";
import { Heart, ShieldCheck, Check, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ValentineHero({ onCtaClick }: { onCtaClick: () => void }) {
  const [showWhatYouGet, setShowWhatYouGet] = useState(true);

  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex flex-col sm:min-h-0 sm:py-8 sm:pb-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/95 via-[#1a0a0f] to-[#0f0508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(190,24,93,0.28),transparent_50%)]" />
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-rose-600/12 blur-[80px] sm:h-96 sm:w-96" />
      <div className="absolute right-0 bottom-1/4 h-56 w-56 rounded-full bg-pink-500/10 blur-[60px] sm:h-80 sm:w-80" />

      <div className="relative flex-1 flex flex-col mx-auto w-full max-w-2xl px-4 pt-5 pb-6 sm:px-6 sm:pt-8 sm:pb-10">
        {/* Badge — catchy pill */}
        <motion.span
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500/30 to-pink-500/30 border border-rose-400/50 px-3 py-2 text-xs font-semibold text-rose-100 shadow-lg shadow-rose-900/30 sm:px-4 sm:text-sm"
        >
          <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-rose-400 animate-pulse" aria-hidden />
          Valentine Week — Limited Time
        </motion.span>

        {/* Hero = single product card — catchier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-4 sm:mt-6"
        >
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="relative rounded-2xl border-2 border-rose-500/40 bg-gradient-to-br from-rose-950/95 to-rose-950/50 p-4 shadow-xl shadow-black/30 ring-2 ring-rose-400/10 sm:p-5 sm:rounded-3xl"
          >
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-400/5 to-transparent pointer-events-none" />
            <div className="relative flex gap-4 sm:gap-5 items-stretch">
              {/* Product image — left */}
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl border border-rose-500/40 shadow-lg shadow-rose-900/20">
                <Image
                  src={VALENTINE_MAIN_PRODUCT.img}
                  alt={VALENTINE_MAIN_PRODUCT.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 112px"
                  priority
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <h1 className="font-headline text-lg font-bold leading-tight sm:text-xl">
                    <span className="bg-gradient-to-r from-rose-200 via-pink-200 to-rose-100 bg-clip-text text-transparent">
                      Soulmate Sketch
                    </span>
                    <span className="block text-rose-200 font-semibold text-base sm:text-lg mt-0.5">+ FREE Love Report</span>
                  </h1>
                  <p className="mt-1.5 text-sm text-rose-200/90 leading-snug">
                    Personalised sketch + FREE Love Report • 24–48h delivery
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-rose-200">₹{VALENTINE_MAIN_PRODUCT.price}</span>
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="inline-flex items-center gap-1 min-h-[44px] min-w-[44px] py-2 pr-1 text-sm font-medium text-rose-200 hover:text-white transition-colors touch-manipulation"
                  >
                    Go to cart
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Primary CTA — catchier glow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 sm:mt-6"
          >
            <Button
              size="lg"
              onClick={onCtaClick}
              className="w-full min-h-[52px] rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-6 py-5 text-base font-bold text-white shadow-lg shadow-rose-900/50 hover:shadow-rose-500/25 sm:min-h-[56px] sm:py-6 hover:from-rose-400 hover:via-rose-500 hover:to-pink-500 active:scale-[0.98] touch-manipulation transition-shadow"
            >
              Complete your order — ₹{VALENTINE_MAIN_PRODUCT.price}
            </Button>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mt-4 px-3 py-2.5 rounded-xl border border-rose-500/25 bg-rose-950/40 text-xs sm:text-sm text-rose-200">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400 shrink-0" aria-hidden />
            <span>Private • Secure • 24–48h delivery</span>
          </div>
        </motion.div>

        {/* What you get — collapsible on mobile only */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 sm:mt-8"
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
          {/* Desktop: always show */}
          <ul className="hidden sm:block mt-0 rounded-2xl border border-rose-500/25 bg-rose-950/40 px-5 py-4 space-y-2 text-sm text-rose-200/90">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" aria-hidden />
              <span><strong className="text-white">Soulmate Sketch</strong> — Hand-drawn, personalised portrait of the person you&apos;re meant for</span>
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
