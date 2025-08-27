"use client";

import { useMemo } from "react";

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function LegalPage() {
  const sections = useMemo<Section[]>(
    () => [
      {
        id: "about-us",
        title: "About Us",
        content: (
          <div className="space-y-4">
            <p>
              At EasyAstro, we believe the universe holds answers to questions your heart hasn’t dared to ask yet.
            </p>
            <p>
              We’re a team of passionate astrologers, intuitive artists, and energy readers helping people across India discover their soulmate, unlock wealth, and decode their life path — all through ancient wisdom delivered in modern ways.
            </p>
          </div>
        )
      },
      {
        id: "privacy-policy",
        title: "Privacy Policy",
        content: (
          <div className="space-y-4">
            <p>
              We respect your privacy. This policy explains how we collect, use, store, and protect your personal data.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We collect your <strong>name, email, date of birth, time, and location</strong> solely to prepare your
                personalized astrology products.
              </li>
              <li>We do not share, sell, or rent your data to third parties.</li>
              <li>All data is stored securely and only authorized team members can access it.</li>
              <li>
                Payment processing is handled by secure third-party gateways; <strong>we do not store card information</strong>.
              </li>
              <li>
                You may request deletion of your data at any time via our <a className="underline" href="#contact-policy">contact page</a>.
              </li>
            </ul>
          </div>
        )
      },
      {
        id: "terms",
        title: "Terms & Conditions",
        content: (
          <div className="space-y-4">
            <p>These terms set the rules for using our website and buying our products.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All products are <strong>digital</strong> and delivered via email; no physical items are shipped unless stated otherwise.
              </li>
              <li>
                By purchasing, you agree that our astrology readings and sketches are for{" "}
                <strong>entertainment and personal insight</strong> purposes only, not a substitute for professional,
                medical, or financial advice.
              </li>
              <li>
                You must provide accurate birth details for accurate reports; incorrect details may affect results.
              </li>
              <li>Unauthorized reproduction, resale, or redistribution of our products is prohibited.</li>
              <li>Prices and promotions are subject to change without notice.</li>
            </ul>
          </div>
        )
      },
      {
        id: "refund-policy",
        title: "Refund Policy",
        content: (
          <div className="space-y-4">
            <p>Our refund policy outlines when refunds are allowed.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Approved refunds will be credited into original payment method within 5-7 Days</li>
              <li>
                As all products are <strong>digital and personalized</strong>, we generally do not offer refunds once the
                product has been delivered.
              </li>
              <li>
                Refunds may be granted in cases of:
                <ul className="list-[circle] pl-6 mt-2 space-y-1">
                  <li>Duplicate payment</li>
                  <li>Non-delivery due to technical error</li>
                </ul>
              </li>
              <li>If you believe there’s an error with your order, contact us within <strong>48 hours</strong> of delivery.</li>
            </ul>
          </div>
        )
      },
      {
        id: "delivery-policy",
        title: "Delivery Policy",
        content: (
          <div className="space-y-4">
            <p>How and when digital products are delivered.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Digital products are typically delivered within <strong>24–48 hours</strong> of order placement.</li>
              <li>
                Delivery is via the email address you provide at checkout — please ensure it’s correct.
              </li>
              <li>
                Delays may occur during high-order periods; we will notify you if your order is delayed.
              </li>
            </ul>
          </div>
        )
      },
      {
        id: "disclaimer",
        title: "Disclaimer",
        content: (
          <div className="space-y-4">
            <p>Limitations of liability for our services and content.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Our astrology products are intended for <strong>entertainment and personal development</strong> purposes only.
              </li>
              <li>We do not guarantee specific outcomes or results from using our products.</li>
              <li>You are responsible for any decisions you make based on our readings or sketches.</li>
            </ul>
          </div>
        )
      },
      {
        id: "cookie-policy",
        title: "Cookie Policy",
        content: (
          <div className="space-y-4">
            <p>How we use cookies and similar technologies.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We use cookies to improve your browsing experience and analyze traffic.</li>
              <li>Cookies help remember your preferences and personalize content.</li>
              <li>You can disable cookies in your browser settings, but this may affect site functionality.</li>
            </ul>
          </div>
        )
      },
      {
        id: "contact-policy",
        title: "Contact Policy",
        content: (
          <div className="space-y-4">
            <p>How to reach us for support.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                For order questions, email <a className="underline" href="mailto:no-reply@easyastro.in">no-reply@easyastro.in</a>.
              </li>
              <li>Support available Monday–Saturday, 10 AM–6 PM IST.</li>
              <li>Average response time: 24–48 hours.</li>
              /
            </ul>
          </div>
        )
      }
    ],
    []
  );

  return (
    <main className="relative">
      {/* Header Section */}
      <section className="relative px-6 sm:px-10">
        <div className="mx-auto max-w-5xl pt-16 sm:pt-24 pb-10 sm:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Updated • {new Date().toLocaleDateString()}
          </div>

          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-900">
            EasyAstro Legal & About Us
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Learn about our story, our policies, and the terms for using our services.
          </p>

          {/* Quick Nav */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group rounded-2xl border border-pink-100 bg-white/70 backdrop-blur p-4 hover:shadow-soft transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-800">{s.title}</span>
                  <span className="text-brand-500 group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Jump to {s.title.toLowerCase()}.
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 sm:px-10">
        <div className="mx-auto max-w-5xl pb-20">
          <div className="rounded-3xl border border-pink-100 bg-white/80 backdrop-blur shadow-soft p-6 sm:p-10">
            <article className="prose-legal space-y-12">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {s.title}
                  </div>
                  <h2>{s.title}</h2>
                  {s.content}
                </section>
              ))}
            </article>

            {/* Footer note */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-50 to-pink-50 p-5 border border-pink-100">
              <p className="text-sm text-slate-700">
                <strong>Note:</strong> By using our website, you agree to these policies. If you have questions,{" "}
                <a className="underline" href="mailto:no-reply@easyastro.in">contact us</a>.
              </p>
              <p>The refund amount will be credited within 24-48 working hours</p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-slate-600 text-sm">
              © {new Date().getFullYear()} Speklio Media All Right Reserved
            </div>
            <div className="flex items-center gap-3 text-sm">
              <a className="underline hover:text-brand-600" href="#about-us">About</a>
              <a className="underline hover:text-brand-600" href="#privacy-policy">Privacy</a>
              <a className="underline hover:text-brand-600" href="#terms">Terms</a>
              <a className="underline hover:text-brand-600" href="#cookie-policy">Cookies</a>
              <a className="underline hover:text-brand-600" href="#contact-policy">Contact</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
