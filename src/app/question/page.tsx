// app/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * EasyAstro-style Soulmate Sketch Lander (PINK + BIG + ANIMATED)
 * - Single file (drop into app/page.tsx)
 * - Pure Tailwind (no external UI libs)
 * - Sticky header CTA + mobile sticky buy bar
 * - Hero with stats, urgency, trust chips
 * - Program/gallery strip
 * - How it works (3 steps)
 * - What you get (cards)
 * - Testimonials slider
 * - FAQ accordion
 * - Footer
 *
 * CTAs -> /questionnaire   (change href everywhere if needed)
 */

const CTA_HREF = "/questionnaire";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#fff1f8] via-[#ffe4f2] to-[#fde2ff] text-slate-900 text-[15.5px] sm:text-[17px]">
      {/* soft animated blobs */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-fuchsia-300/40 blur-3xl animate-pulse" />

      <Header />
      <Hero />
      <TrustBar />
      <Benefits />
      <ProgramStrip />
      <HowItWorks />
      <WhatYouGet />
      <Testimonials />
      <FAQ />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}

/* ========================= Header ========================= */

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-pink-100 shadow-[0_8px_30px_rgba(244,114,182,0.25)]">
      <div className="mx-auto max-w-[1120px] px-4 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            aria-hidden
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl shadow-inner ring-1 ring-white/60"
            style={{
              background:
                "conic-gradient(from 190deg at 50% 50%, #fb7185, #f97316, #f472b6, #6366f1, #fb7185)",
            }}
          />
          <span className="font-black tracking-tight text-[18px] sm:text-[20px] bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">
            EasyAstro
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-5 text-[13px] sm:text-[14px] text-slate-600">
          <a href="#how" className="hover:text-pink-700 transition-colors">
            How it works
          </a>
          <a href="#what" className="hover:text-pink-700 transition-colors">
            What you get
          </a>
          <a href="#faq" className="hover:text-pink-700 transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href={CTA_HREF}
          className="relative inline-flex h-10 sm:h-11 px-5 sm:px-6 items-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white text-[13px] sm:text-[14px] font-extrabold shadow-[0_14px_35px_rgba(236,72,153,0.55)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          <span className="absolute inset-0 rounded-full bg-white/15 opacity-0 hover:opacity-100 transition-opacity" />
          <span className="relative">Reveal My Soulmate</span>
        </a>
      </div>
    </header>
  );
}

/* ========================= Hero ========================= */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* bg image */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2400&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(1.05) brightness(0.9)",
        }}
      />
      {/* wash */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-white/70 to-white" />

      <div className="mx-auto max-w-[1120px] px-4 py-7 sm:py-12">
        <div className="mx-auto max-w-[720px] rounded-3xl bg-white/90 backdrop-blur-xl border border-pink-100 shadow-[0_18px_60px_rgba(244,114,182,0.40)] p-5 sm:p-7 relative overflow-hidden">
          {/* inner glow ring */}
          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-300/30 blur-3xl" />

          <div className="flex items-center justify-between gap-3 relative z-10">
            <img
              src="https://www.easyastro.in/_next/image?url=%2Flogo.png&w=256&q=75"
              alt="EA"
              onError={({ currentTarget }) => {
                currentTarget.style.display = "none";
              }}
              className="h-7 sm:h-8 object-contain"
            />
            <a
              href={CTA_HREF}
              className="hidden sm:inline-flex h-9 px-4 items-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[12px] font-bold shadow hover:brightness-110 hover:-translate-y-0.5 transition-all"
            >
              Try for Free
            </a>
          </div>

          <h1 className="mt-4 text-[26px] leading-[1.15] sm:text-[34px] sm:leading-[1.1] font-black tracking-tight text-slate-900 relative z-10">
            Discover Your Soulmate’s Face{" "}
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">
              Today
            </span>
            !
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15.5px] text-slate-700 relative z-10">
            Curious who your destined partner is? Get a personalized, hand-drawn sketch and a free
            in-depth love reading—delivered privately within 24–48 hours.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 relative z-10">
            <PrimaryCTA />
            <a
              href={CTA_HREF}
              className="inline-flex h-11 sm:h-12 px-5 sm:px-6 items-center rounded-full bg-white border border-pink-200 text-slate-800 text-[13px] sm:text-[14px] font-semibold hover:border-pink-300 hover:-translate-y-0.5 transition-all"
            >
              Already ordered?
            </a>
          </div>

          {/* urgency + stats */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11.5px] sm:text-[12.5px] relative z-10">
            <Badge>⚡ 9 spots left for free love reading</Badge>
            <Badge>🔒 100% Private & Confidential</Badge>
            <Badge>⭐ 4.8/5 from 100k+ clients</Badge>
            <Badge>⏱ Delivered in 24–48 hrs</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrimaryCTA() {
  return (
    <a
      href={CTA_HREF}
      className="relative inline-flex h-11 sm:h-12 px-6 sm:px-8 items-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white text-[14px] sm:text-[15px] font-extrabold shadow-[0_16px_45px_rgba(236,72,153,0.65)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all btn-glow"
    >
      <span className="absolute -inset-px rounded-full bg-gradient-to-r from-white/20 via-transparent to-white/25 opacity-0 hover:opacity-100 transition-opacity" />
      <span className="relative flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-lime-300 animate-pulse" />
        Reveal My Soulmate Now
      </span>
    </a>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-pink-100 bg-white/90 px-3.5 py-1 text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

/* ========================= Trust strip ========================= */

function TrustBar() {
  return (
    <section className="py-3">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="rounded-2xl bg-white/95 backdrop-blur border border-pink-100 shadow-[0_14px_40px_rgba(244,114,182,0.25)] px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-[12px] sm:text-[13px] text-slate-700">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
            🔮 Astrologers & Psychic Artists
          </span>
          <span>🖼️ Hand-drawn, Made-to-Order</span>
          <span>📧 Email/WhatsApp Delivery</span>
          <span>💳 Secure Checkout</span>
        </div>
      </div>
    </section>
  );
}

/* ========================= Benefits ========================= */

function Benefits() {
  const items = [
    {
      t: "Stress less.",
      d: "Short, calming rituals to quiet the mind before you attract love.",
    },
    {
      t: "Sleep better.",
      d: "Wind-down peacefully with clarity about who you’re meant to meet.",
    },
    {
      t: "Live mindfully.",
      d: "Make love decisions with confidence and cosmic alignment.",
    },
  ];
  return (
    <section className="py-7">
      <div className="mx-auto max-w-[1120px] px-4 grid sm:grid-cols-3 gap-4">
        {items.map((b, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/95 backdrop-blur border border-pink-100 shadow-[0_12px_40px_rgba(248,113,166,0.25)] p-4 sm:p-5 transform hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(244,114,182,0.35)] transition-all"
          >
            <h3 className="font-bold text-[16px] text-pink-700">{b.t}</h3>
            <p className="mt-2 text-[13.5px] sm:text-[14px] text-slate-600">{b.d}</p>
            <a
              href={CTA_HREF}
              className="mt-3 inline-block text-[13px] font-semibold text-pink-600 hover:text-pink-700 hover:underline"
            >
              Learn more
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================= Program Strip (gallery) ========================= */

function ProgramStrip() {
  const items = [
    { t: "Sample 1" },
    { t: "Sample 2" },
    { t: "Sample 3" },
    { t: "Sample 4" },
    { t: "Sample 5" },
  ];
  return (
    <section className="py-4">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="text-[13px] sm:text-[14px] font-semibold text-pink-700 mb-2">
          Recent Soulmate Sketches (examples)
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {items.map((it, i) => (
            <div
              key={i}
              className="min-w-[170px] max-w-[210px] rounded-2xl border border-pink-100 bg-white/95 backdrop-blur shadow-[0_10px_30px_rgba(244,114,182,0.3)] p-3 transform hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(236,72,153,0.55)] transition-all"
            >
              <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-pink-200 via-rose-100 to-fuchsia-200 mb-2 animate-pulse" />
              <div className="text-xs font-semibold text-slate-700">{it.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================= How It Works ========================= */

function HowItWorks() {
  const steps = [
    {
      t: "Share your details",
      d: "Tell us your name, birth date, and a few preferences to connect with your energy.",
    },
    {
      t: "We craft your sketch",
      d: "Psychic artists + astrologers hand-draw your soulmate aligned with your charts.",
    },
    {
      t: "Receive it privately",
      d: "Get your sketch + FREE love reading via Email/WhatsApp in 24–48 hours.",
    },
  ];
  return (
    <section id="how" className="py-9">
      <div className="mx-auto max-w-[900px] px-4">
        <h2 className="text-center text-[20px] sm:text-[24px] font-extrabold text-slate-900">
          How it works
        </h2>
        <div className="mt-5 grid gap-4">
          {steps.map((s, i) => (
            <div
              key={s.t}
              className="rounded-2xl border border-pink-100 bg-white/95 backdrop-blur shadow-[0_12px_40px_rgba(244,114,182,0.25)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 text-white font-black text-[14px] sm:text-[15px] shadow-[0_10px_25px_rgba(236,72,153,0.6)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[15px] sm:text-[16px] text-slate-900">
                    {s.t}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-slate-600">{s.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href={CTA_HREF}
            className="inline-flex h-11 sm:h-12 px-6 sm:px-8 items-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white text-[14px] sm:text-[15px] font-extrabold shadow-[0_16px_45px_rgba(236,72,153,0.65)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Start My Sketch
          </a>
        </div>
      </div>
    </section>
  );
}

/* ========================= What You Get ========================= */

function WhatYouGet() {
  const items = [
    {
      t: "Personalized Psychic Sketch",
      d: "A custom portrait of your soulmate, blending psychic insight with astrological accuracy.",
    },
    {
      t: "FREE In-Depth Love Reading",
      d: "Traits, timing, and potential dynamics—understand how you’ll meet and connect.",
    },
    {
      t: "Private Delivery",
      d: "Secure Email/WhatsApp delivery. Your order is 100% confidential.",
    },
  ];
  return (
    <section id="what" className="py-9">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-pink-100 bg-white/95 backdrop-blur shadow-[0_12px_40px_rgba(244,114,182,0.25)] p-4 sm:p-5 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(236,72,153,0.55)] transition-all"
            >
              <h3 className="font-bold text-[15px] sm:text-[16px] text-pink-700">{c.t}</h3>
              <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 p-[1px] shadow-[0_18px_60px_rgba(236,72,153,0.7)]">
          <div className="rounded-3xl bg-white/95 px-4 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[13px] sm:text-[14px] font-semibold text-pink-700">
                Limited Time Bonus
              </div>
              <div className="text-[15px] sm:text-[17px] font-extrabold text-slate-900">
                9 FREE Love Readings left today
              </div>
              <div className="text-[11.5px] sm:text-[12.5px] text-slate-600">
                Added automatically—no coupon required.
              </div>
            </div>
            <a
              href={CTA_HREF}
              className="inline-flex h-11 sm:h-12 px-6 sm:px-7 items-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-[13.5px] sm:text-[14.5px] font-extrabold shadow-[0_14px_40px_rgba(236,72,153,0.7)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Claim My Spot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= Testimonials ========================= */

function Testimonials() {
  const cards = [
    {
      q: "Bhai sach me rula diya yaar… The sketch looked exactly like my crush.",
      a: "— Riya M.",
    },
    {
      q: "SO accurate—same eyes, same smile. I was shocked!",
      a: "— Aisha K.",
    },
    {
      q: "Details were incredible. Worth every penny.",
      a: "— Sunita M.",
    },
    {
      q: "Turnaround was super fast and quality top-notch.",
      a: "— Alok N.",
    },
  ];
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % cards.length);
    }, 3800);
    return () => clearInterval(id);
  }, [cards.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).getBoundingClientRect().width + 16
      : 0;
    el.style.transform = `translateX(${-idx * cardW}px)`;
  }, [idx]);

  return (
    <section className="py-9">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="text-[13px] sm:text-[14px] font-semibold text-pink-700">
          Over 2 million 5-star reviews.
        </div>

        <div className="mt-3 overflow-hidden rounded-3xl border border-pink-100 bg-white/95 backdrop-blur shadow-[0_18px_55px_rgba(244,114,182,0.35)]">
          <div
            ref={trackRef}
            className="flex gap-4 p-4 sm:p-5 transition-transform duration-500 ease-out"
          >
            {cards.map((c, i) => (
              <article
                key={i}
                className="min-w-[280px] sm:min-w-[340px] rounded-2xl border border-pink-50 bg-white p-4 sm:p-5 shadow-sm"
              >
                <div className="text-amber-400 text-sm">★★★★★</div>
                <p className="mt-2 text-[13.5px] sm:text-[14px] text-slate-800">{`“${c.q}”`}</p>
                <div className="mt-2 text-[12px] text-slate-500">{c.a}</div>
              </article>
            ))}
          </div>
          <div className="px-4 pb-4 flex justify-end gap-2">
            <button
              className="h-9 w-9 rounded-xl border border-pink-100 bg-white text-slate-700 hover:bg-pink-50 hover:-translate-y-0.5 transition-all"
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="h-9 w-9 rounded-xl border border-pink-100 bg-white text-slate-700 hover:bg-pink-50 hover:-translate-y-0.5 transition-all"
              onClick={() => setIdx((i) => Math.min(cards.length - 1, i + 1))}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href={CTA_HREF}
            className="inline-flex h-11 sm:h-12 px-7 sm:px-8 items-center rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white text-[14px] sm:text-[15px] font-extrabold shadow-[0_16px_45px_rgba(236,72,153,0.7)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Start My Free Reading
          </a>
        </div>
      </div>
    </section>
  );
}

/* ========================= FAQ ========================= */

function FAQ() {
  const sections: { title: string; items: { q: string; a: string }[] }[] = [
    {
      title: "General",
      items: [
        {
          q: "How accurate is the soulmate sketch?",
          a: "Many clients report high resemblance and meaningful insights. Each sketch is intuitively crafted using your details.",
        },
        {
          q: "How will I receive it?",
          a: "We deliver via Email/WhatsApp—completely private and secure.",
        },
        {
          q: "What if I’m not satisfied?",
          a: "Reach out to support for a resolution—your happiness matters.",
        },
      ],
    },
    {
      title: "Mindfulness & Timing",
      items: [
        {
          q: "When will I meet them?",
          a: "Your free love reading includes timing indicators and guidance.",
        },
        {
          q: "Do I need to meditate?",
          a: "Not required, but staying calm and open helps you notice aligned opportunities.",
        },
      ],
    },
    {
      title: "Orders",
      items: [
        {
          q: "How fast is delivery?",
          a: "Most sketches are delivered within 24–48 hours.",
        },
        {
          q: "Is my data safe?",
          a: "Yes—orders are confidential and used only for creating your sketch.",
        },
      ],
    },
  ];

  return (
    <section id="faq" className="py-10">
      <div className="mx-auto max-w-[1120px] px-4">
        <h2 className="text-[20px] sm:text-[24px] font-extrabold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sections.map((s, i) => (
            <FAQSection key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({
  title,
  items,
}: {
  title: string;
  items: { q: string; a: string }[];
}) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white/95 backdrop-blur shadow-[0_12px_40px_rgba(244,114,182,0.25)] p-3 sm:p-4">
      <h4 className="text-[12px] sm:text-[13px] font-bold tracking-wide text-pink-700 mb-1">
        {title.toUpperCase()}
      </h4>
      <div className="divide-y divide-pink-50">
        {items.map((it, i) => (
          <FAQItem key={i} q={it.q} a={it.a} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full py-3 text-left flex items-center justify-between gap-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-[13.5px] sm:text-[14px] font-semibold text-slate-800">
          {q}
        </span>
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-pink-200 text-[11px] text-pink-600 bg-pink-50 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {open && <p className="pb-3 text-[13px] sm:text-[13.5px] text-slate-600">{a}</p>}
    </div>
  );
}

/* ========================= Sticky Buy Bar (mobile) ========================= */

function StickyBuyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden">
      <div className="m-3 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 p-[1px] shadow-[0_18px_55px_rgba(236,72,153,0.75)] animate-pulse">
        <div className="rounded-3xl bg-white/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-[12.5px]">
            <div className="font-bold leading-tight text-slate-900">
              Start Your Soulmate Sketch
            </div>
            <div className="text-slate-600 text-[11.5px]">9 FREE love readings left</div>
          </div>
          <a
            href={CTA_HREF}
            className="inline-flex h-10 px-4 items-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-[12px] font-extrabold shadow-[0_12px_35px_rgba(236,72,153,0.8)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Begin Now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ========================= Footer ========================= */

function Footer() {
  return (
    <footer className="mt-10 bg-[#111021] text-slate-200">
      <div className="mx-auto max-w-[1120px] px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 text-[13px] sm:text-[14px]">
          <div>
            <div className="flex items-center gap-2">
              <div
                aria-hidden
                className="w-8 h-8 rounded-2xl"
                style={{
                  background:
                    "conic-gradient(from 190deg at 50% 50%, #fb7185, #fb923c, #f472b6, #6366f1, #fb7185)",
                }}
              />
              <strong className="text-[15px]">EasyAstro</strong>
            </div>
            <p className="mt-2 text-slate-300/80 text-[12.5px] sm:text-[13px]">
              Personalized Soulmate Sketches & Astrology-guided insights.
            </p>
          </div>

          <LinkCol title="Company" links={["About", "Careers", "Blog", "Press"]} />
          <LinkCol
            title="Offerings"
            links={["Soulmate Sketch", "Wealth Report", "Family Plans", "For Orgs"]}
          />
          <LinkCol title="Help" links={["Support", "Contact", "FAQ", "Privacy", "Terms"]} />
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3 text-[11.5px] sm:text-[12.5px]">
          <div>© {new Date().getFullYear()} EasyAstro. All rights reserved.</div>
          <div className="flex items-center gap-3 opacity-80">
            <a href={CTA_HREF} aria-label="X" className="hover:text-pink-300">
              𝕏
            </a>
            <a href={CTA_HREF} aria-label="Instagram" className="hover:text-pink-300">
              IG
            </a>
            <a href={CTA_HREF} aria-label="Facebook" className="hover:text-pink-300">
              Fb
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h5 className="font-bold mb-2 text-[13.5px] sm:text-[14px] text-white">{title}</h5>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l}>
            <a
              href={CTA_HREF}
              className="text-slate-300 hover:text-pink-300 text-[12.5px] sm:text-[13px]"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
