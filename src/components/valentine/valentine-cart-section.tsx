"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { VALENTINE_MAIN_PRODUCT } from "@/lib/valentine-products";
import { Button } from "@/components/ui/button";

export default function ValentineCartSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0508] via-rose-950/20 to-[#0f0508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(190,24,93,0.12),transparent)]" />

      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-center font-headline text-2xl font-bold text-white sm:text-3xl mb-8">
          Your order
        </h2>

        <Link
          href="/valentine-cart"
          className="block group min-h-[44px] py-2 -my-2 touch-manipulation"
          aria-label="Go to cart"
        >
          <div className="rounded-2xl border-2 border-rose-500/30 bg-gradient-to-br from-rose-950/80 to-rose-950/50 p-4 shadow-xl shadow-black/30 transition-all hover:border-rose-400/50 hover:shadow-rose-500/20 sm:p-6">
            <div className="flex gap-4 sm:gap-6 items-center">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl border border-rose-500/30">
                <Image
                  src={VALENTINE_MAIN_PRODUCT.img}
                  alt={VALENTINE_MAIN_PRODUCT.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 112px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-base sm:text-xl leading-tight">
                  {VALENTINE_MAIN_PRODUCT.title}
                </h3>
                <p className="mt-1.5 text-sm text-rose-200/80">
                  Personalised sketch + FREE Love Report • 24–48h delivery
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-rose-300">
                    ₹{VALENTINE_MAIN_PRODUCT.price}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-rose-300 group-hover:text-white transition-colors min-h-[44px] items-center">
                    Go to cart
                    <ChevronRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/30 text-rose-200 group-hover:bg-rose-500/50 transition-colors">
                  <ShoppingBag className="h-6 w-6" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-6 text-center">
          <Button
            asChild
            size="lg"
            className="w-full min-h-[52px] sm:min-h-0 sm:w-auto rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-6 py-5 sm:px-8 sm:py-6 text-base font-bold text-white shadow-lg shadow-rose-900/50 hover:from-rose-400 hover:to-pink-500 touch-manipulation"
          >
            <Link href="/valentine-cart">
              Complete your order — ₹{VALENTINE_MAIN_PRODUCT.price}
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
