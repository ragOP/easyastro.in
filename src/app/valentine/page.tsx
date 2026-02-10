"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FREE_READINGS,
  VALENTINE_ADDONS,
  VALENTINE_MAIN_PRODUCT,
} from "@/lib/valentine-products";
import Header from "@/components/sectionscousin/headercousin";
import Footer from "@/components/layout/footer";
import { Sparkles, Heart, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import ValentineGallery from "@/components/valentine/valentine-gallery";
import ValentineTestimonials from "@/components/valentine/valentine-testimonials";
import ValentineFaq from "@/components/valentine/valentine-faq";

export default function ValentinePage() {
  const router = useRouter();
  const goToCart = () => router.push("/valentine-cart");

  return (
    <div className="flex min-h-dvh flex-col bg-[#fef7f9] text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pt-8 pb-14 sm:px-6 sm:pt-12 sm:pb-18">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-100/80 via-pink-50/60 to-transparent" />
          <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-rose-300/25 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-pink-300/60 bg-pink-100/80 px-4 py-2 text-sm font-semibold text-pink-800"
            >
              <Heart className="h-4 w-4" />
              Valentine Week — Limited Time
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 font-headline text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl md:text-5xl"
            >
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">
                Soulmate Sketch
              </span>
              <br />
              <span className="text-zinc-800">+ FREE Love Report</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg"
            >
              Your love story is written in your energy. Get a personalised soulmate sketch and a
              free Love Report that reveals your romantic patterns, emotional needs, and the partner
              you&apos;re truly meant for — this Valentine week only.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Button
                size="lg"
                onClick={goToCart}
                className="group w-full rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 px-8 py-6 text-base font-bold text-white shadow-lg transition-all hover:from-pink-500 hover:to-rose-500 hover:shadow-xl sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  Get Soulmate + Free Love Report
                  <Sparkles className="h-5 w-5" />
                </span>
              </Button>
              <div className="flex items-center gap-2 rounded-xl border border-pink-200/80 bg-white/70 px-4 py-3 text-sm text-zinc-700">
                <ShieldCheck className="h-5 w-5 text-pink-500" />
                Private • Secure • 24–48h delivery
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-4 text-sm font-semibold text-pink-700"
            >
              Only ₹{VALENTINE_MAIN_PRODUCT.price} — Love Report included free
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.4 },
                scale: { duration: 0.6, delay: 0.4 },
                y: { duration: 4, repeat: Infinity, repeatType: "reverse" },
              }}
              className="mx-auto mt-10 max-w-[220px] sm:max-w-[260px]"
            >
              <div className="overflow-hidden rounded-2xl border-2 border-pink-200/80 bg-white/90 shadow-lg ring-2 ring-pink-100/50">
                <Image
                  src={VALENTINE_MAIN_PRODUCT.img}
                  alt="Soulmate Sketch sample"
                  width={260}
                  height={260}
                  className="h-auto w-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500">Yours is personalised</p>
            </motion.div>
          </div>
        </section>

        {/* FREE readings */}
        <section className="border-t border-pink-200/60 bg-white/50 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              className="text-center font-headline text-2xl font-bold text-zinc-900 sm:text-3xl"
            >
              🎁 FREE readings when you get started
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto mt-2 max-w-xl text-center text-zinc-600"
            >
              With your Soulmate Sketch we include insights that help you feel seen and ready for
              love this Valentine week.
            </motion.p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {FREE_READINGS.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-pink-200/70 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="text-2xl">{r.icon}</div>
                  <h3 className="mt-3 font-semibold text-zinc-900">{r.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{r.description}</p>
                  <p className="mt-2 text-xs font-medium text-pink-700">{r.tagline}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <Button
                onClick={goToCart}
                variant="outline"
                className="rounded-xl border-pink-300 bg-pink-50/80 text-pink-800 hover:bg-pink-100"
              >
                Get access with Soulmate + Love Report
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Add-ons teaser */}
        <section className="border-t border-pink-200/60 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-headline text-2xl font-bold text-zinc-900 sm:text-3xl"
            >
              💗 Add-on readings (optional)
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto mt-2 max-w-xl text-center text-zinc-600"
            >
              Deepen your love journey with these personalised add-ons at checkout.
            </motion.p>

            <div className="mt-10 space-y-4">
              {VALENTINE_ADDONS.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex flex-col gap-3 rounded-xl border border-pink-200/70 bg-white/80 p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-zinc-900">{a.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{a.blurb}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-bold text-pink-700">₹{a.price}</span>
                    {a.compareAt && (
                      <span className="ml-2 text-sm text-zinc-500 line-through">₹{a.compareAt}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-600"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Add any of these at checkout — Soulmate + Love Report first, then choose add-ons.
            </motion.div>
          </div>
        </section>

        {/* Gallery — lots of pics + animations */}
        <ValentineGallery />

        {/* Testimonials */}
        <ValentineTestimonials />

        {/* FAQ */}
        <ValentineFaq />

        {/* Final CTA */}
        <section className="border-t border-pink-200/60 bg-gradient-to-b from-pink-50/80 to-rose-50/60 px-4 py-14 sm:px-6 sm:py-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-headline text-2xl font-bold text-zinc-900 sm:text-3xl">
              Start with your Soulmate Sketch + FREE Love Report
            </h2>
            <p className="mt-3 text-zinc-600">
              One order. Personalised sketch. Free Love Report. Optional add-ons at checkout.
            </p>
            <Button
              size="lg"
              onClick={goToCart}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 py-6 text-base font-bold text-white shadow-lg sm:w-auto sm:px-10"
            >
              Claim Soulmate + Free Love Report — ₹{VALENTINE_MAIN_PRODUCT.price}
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
