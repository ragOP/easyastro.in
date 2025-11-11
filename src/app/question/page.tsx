// app/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * EasyAstro-style Soulmate Sketch Lander
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
    <main className="min-h-screen bg-gradient-to-b from-[#F5F6FF] via-[#F8F1FF] to-white text-slate-900">
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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-white/60">
      <div className="mx-auto max-w-[1120px] px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            aria-hidden
            className="w-9 h-9 rounded-xl shadow-inner ring-1 ring-white/60"
            style={{
              background:
                "conic-gradient(from 190deg at 50% 50%, #c7b3ff, #8bd2ff, #ffd1e8, #c7b3ff)",
            }}
          />
          <span className="font-extrabold tracking-tight">EasyAstro</span>
        </div>

        <nav className="hidden sm:flex items-center gap-4 text-sm text-slate-600">
          <a href="#how" className="hover:text-slate-900">How it works</a>
          <a href="#what" className="hover:text-slate-900">What you get</a>
          <a href="#faq" className="hover:text-slate-900">FAQ</a>
        </nav>

        <a
          href={CTA_HREF}
          className="inline-flex h-10 px-4 items-center rounded-full bg-violet-600 text-white text-sm font-bold shadow hover:bg-violet-700 transition"
        >
          Reveal My Soulmate
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-white/55 to-white" />

      <div className="mx-auto max-w-[1120px] px-4 py-6 sm:py-10">
        <div className="mx-auto max-w-[680px] rounded-2xl bg-white/85 backdrop-blur border border-white shadow-[0_10px_40px_rgba(87,70,175,.20)] p-5">
          <div className="flex items-center justify-between gap-2">
            <img
              src="https://www.easyastro.in/_next/image?url=%2Flogo.png&w=256&q=75"
              alt="EA"
              onError={({ currentTarget }) => {
                currentTarget.style.display = "none";
              }}
              className="h-6 object-contain"
            />
            <a
              href={CTA_HREF}
              className="hidden sm:inline-flex h-9 px-3 items-center rounded-full bg-indigo-600 text-white text-xs font-bold shadow hover:bg-indigo-700"
            >
              Try for Free
            </a>
          </div>

          <h1 className="mt-3 text-2xl sm:text-[28px] font-extrabold leading-tight tracking-tight text-slate-900">
            Discover Your Soulmate’s Face <span className="text-violet-700">Today</span>!
          </h1>
          <p className="mt-2 text-[13px] sm:text-sm text-slate-700">
            Curious who your destined partner is? Get a personalized, hand-drawn sketch
            and a free in-depth love reading—delivered privately within 24–48 hours.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={CTA_HREF}
              className="inline-flex h-11 px-5 items-center rounded-full bg-violet-600 text-white text-sm font-bold shadow hover:bg-violet-700 transition"
            >
              Reveal My Soulmate Now
            </a>
            <a
              href={CTA_HREF}
              className="inline-flex h-11 px-5 items-center rounded-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold hover:border-slate-300"
            >
              Already ordered?
            </a>
          </div>

          {/* urgency + stats */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
      {children}
    </span>
  );
}

/* ========================= Trust strip ========================= */

function TrustBar() {
  return (
    <section className="py-2">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="rounded-xl bg-white/90 backdrop-blur border border-white shadow p-3 flex flex-wrap items-center justify-between gap-3 text-[12px] sm:text-sm text-slate-700">
          <span>🔮 Astrologers & Psychic Artists</span>
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
    <section className="py-6">
      <div className="mx-auto max-w-[1120px] px-4 grid sm:grid-cols-3 gap-4">
        {items.map((b, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/90 backdrop-blur border border-white shadow p-4"
          >
            <h3 className="font-bold">{b.t}</h3>
            <p className="mt-1 text-sm text-slate-600">{b.d}</p>
            <a
              href={CTA_HREF}
              className="mt-2 inline-block text-sm font-semibold text-violet-700 hover:underline"
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
        <div className="text-sm font-semibold text-slate-700 mb-2">
          Recent Soulmate Sketches (examples)
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {items.map((it, i) => (
            <div
              key={i}
              className="min-w-[160px] max-w-[200px] rounded-xl border border-white bg-white/95 backdrop-blur shadow p-3"
            >
              <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-violet-200 via-pink-100 to-indigo-100 mb-2" />
              <div className="text-xs font-medium">{it.t}</div>
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
    <section id="how" className="py-8">
      <div className="mx-auto max-w-[900px] px-4">
        <h2 className="text-center text-xl font-extrabold">How it works</h2>
        <div className="mt-5 grid gap-4">
          {steps.map((s, i) => (
            <div
              key={s.t}
              className="rounded-2xl border border-white bg-white/90 backdrop-blur shadow p-4"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{s.t}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <a
            href={CTA_HREF}
            className="inline-flex h-11 px-6 items-center rounded-full bg-violet-600 text-white text-sm font-bold shadow hover:bg-violet-700"
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
    <section id="what" className="py-8">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-white bg-white/90 backdrop-blur shadow p-4"
            >
              <h3 className="font-bold">{c.t}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-gradient-to-b from-indigo-200 to-violet-300 p-[1px]">
          <div className="rounded-2xl bg-white p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-700">
                Limited Time Bonus
              </div>
              <div className="text-[15px] font-extrabold">
                9 FREE Love Readings left today
              </div>
              <div className="text-xs text-slate-600">
                Added automatically—no coupon required.
              </div>
            </div>
            <a
              href={CTA_HREF}
              className="inline-flex h-11 px-6 items-center rounded-full bg-violet-600 text-white text-sm font-bold shadow hover:bg-violet-700"
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
    <section className="py-8">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="text-sm font-semibold text-slate-700">
          Over 2 million 5-star reviews.
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl border border-white bg-white/90 backdrop-blur shadow">
          <div ref={trackRef} className="flex gap-4 p-4 transition-transform duration-500 ease-out">
            {cards.map((c, i) => (
              <article key={i} className="min-w-[280px] sm:min-w-[340px] rounded-xl border border-slate-100 bg-white p-4">
                <div className="text-amber-400 text-sm">★★★★★</div>
                <p className="mt-2 text-sm">{`“${c.q}”`}</p>
                <div className="mt-2 text-xs text-slate-500">{c.a}</div>
              </article>
            ))}
          </div>
          <div className="px-4 pb-4 flex justify-end gap-2">
            <button
              className="h-9 w-9 rounded-lg border border-slate-200 bg-white"
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="h-9 w-9 rounded-lg border border-slate-200 bg-white"
              onClick={() => setIdx((i) => Math.min(cards.length - 1, i + 1))}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-5 text-center">
          <a
            href={CTA_HREF}
            className="inline-flex h-11 px-6 items-center rounded-full bg-violet-600 text-white text-sm font-bold shadow hover:bg-violet-700"
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
        <h2 className="text-xl font-extrabold">Frequently Asked Questions</h2>
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
    <div className="rounded-2xl border border-white bg-white/90 backdrop-blur shadow p-3">
      <h4 className="text-sm font-bold tracking-wide text-slate-700 mb-1">
        {title.toUpperCase()}
      </h4>
      <div className="divide-y divide-slate-100">
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
        <span className="text-sm font-semibold">{q}</span>
        <span
          className={`inline-block text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {open && <p className="pb-3 text-sm text-slate-600">{a}</p>}
    </div>
  );
}

/* ========================= Sticky Buy Bar (mobile) ========================= */

function StickyBuyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden">
      <div className="m-3 rounded-2xl bg-white/95 backdrop-blur shadow-lg border border-white px-4 py-3 flex items-center justify-between">
        <div className="text-[13px]">
          <div className="font-bold leading-tight">Start Your Soulmate Sketch</div>
          <div className="text-slate-600 text-[12px]">9 FREE love readings left</div>
        </div>
        <a
          href={CTA_HREF}
          className="inline-flex h-10 px-4 items-center rounded-full bg-violet-600 text-white text-xs font-bold shadow hover:bg-violet-700"
        >
          Begin Now
        </a>
      </div>
    </div>
  );
}

/* ========================= Footer ========================= */

function Footer() {
  return (
    <footer className="mt-10 bg-[#111C3A] text-slate-200">
      <div className="mx-auto max-w-[1120px] px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div
                aria-hidden
                className="w-8 h-8 rounded-xl"
                style={{
                  background:
                    "conic-gradient(from 190deg at 50% 50%, #c7b3ff, #8bd2ff, #ffd1e8, #c7b3ff)",
                }}
              />
              <strong>EasyAstro</strong>
            </div>
            <p className="mt-2 text-slate-300/80">
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

        <div className="mt-6 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>© {new Date().getFullYear()} EasyAstro. All rights reserved.</div>
          <div className="flex items-center gap-3 opacity-80">
            <a href={CTA_HREF} aria-label="X">𝕏</a>
            <a href={CTA_HREF} aria-label="Instagram">IG</a>
            <a href={CTA_HREF} aria-label="Facebook">Fb</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h5 className="font-bold mb-2">{title}</h5>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l}>
            <a href={CTA_HREF} className="text-slate-300 hover:text-white">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
