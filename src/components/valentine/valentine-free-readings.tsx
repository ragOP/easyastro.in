"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FREE_READINGS } from "@/lib/valentine-products";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

function HeartShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function ValentineFreeReadings({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0508] via-rose-950/30 to-[#0f0508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(136,19,55,0.2),transparent)]" />
      {/* Decorative hearts — subtle */}
      <div className="absolute left-4 top-1/4 opacity-[0.12] pointer-events-none">
        <HeartShape className="h-12 w-12 text-rose-400" />
      </div>
      <div className="absolute right-6 top-1/3 opacity-[0.1] pointer-events-none">
        <HeartShape className="h-10 w-10 text-pink-400" />
      </div>
      <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 opacity-[0.08] pointer-events-none">
        <HeartShape className="h-16 w-16 text-rose-500" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 text-center font-headline text-2xl font-bold text-white sm:text-3xl"
        >
          <Heart className="h-7 w-7 sm:h-8 sm:w-8 fill-rose-400 text-rose-400" aria-hidden />
          <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
            FREE readings when you get started
          </span>
          <Heart className="h-7 w-7 sm:h-8 sm:w-8 fill-rose-400 text-rose-400" aria-hidden />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-2 max-w-xl text-center text-rose-200/70 text-sm sm:text-base"
        >
          With your Soulmate Sketch we include insights that help you feel seen and ready for love.
        </motion.p>

        <div className="mt-10 sm:mt-12 flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:flex-wrap md:justify-center md:items-stretch">
          {FREE_READINGS.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative w-full max-w-sm flex flex-col rounded-[2rem] border-2 border-rose-500/30 bg-gradient-to-b from-rose-950/90 to-rose-950/50 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all hover:border-rose-400/50 hover:shadow-rose-500/15 sm:p-7"
            >
              {/* Heart accent top-right */}
              <div className="absolute right-4 top-4 opacity-40">
                <Heart className="h-6 w-6 text-rose-400 fill-rose-400/30" />
              </div>
              {/* Soft heart curve decoration at top */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-px w-24 h-8 rounded-b-full bg-rose-500/20 blur-sm" />

              <div className="relative flex flex-col flex-1">
                <span className="text-3xl" aria-hidden>{r.icon}</span>
                <h3 className="mt-3 font-semibold text-white text-lg">{r.title}</h3>
                <p className="mt-2 text-sm text-rose-200/85 leading-relaxed flex-1">{r.description}</p>
                <p className="mt-3 text-xs font-medium text-rose-300/90 border-t border-rose-500/20 pt-3">
                  {r.tagline}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Button
            onClick={onCtaClick}
            variant="outline"
            className="min-h-[48px] rounded-2xl border-rose-400/50 bg-rose-950/50 px-6 text-rose-200 hover:bg-rose-900/50 hover:text-white hover:border-rose-300/50"
          >
            Get access with Soulmate + Love Report
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
