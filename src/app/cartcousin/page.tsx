// app/cart/page.tsx
"use client";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldCheck,
  Star,
  Timer,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Plus,
  ChevronDown,
} from "lucide-react";
import StickyBuyBar from "./sticky";
import { BACKEND_URL } from "@/lib/backendUrl";

// ⬇️ ADD: import your Gallery section
import GallerySection from "../../components/sections/gallery";
import TestimonialsSection from "@/components/sections/testimonials";

/** ───────────────────────── Types & Data ───────────────────────── */

type Bump = {
  id: string;
  title: string;
  blurb: string;
  price: number;
  compareAt?: number;
  features?: string[];
};

const PRODUCT = {
  id: "soulmate-sketch",
  title: "Soulmate Sketch + Free Love Report",
  img: "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png",
  price: 199,
  compareAt: 998,
  includes: [
    "Personalized hand-drawn sketch",
    "FREE in-depth love reading",
    "Private delivery within 24–48 hours",
  ],
};

const BUMPS: Bump[] = [
  {
    id: "bump-horoscope-24m",
    title: "2-Year Personal Horoscope",
    blurb:
      "Your next 24 months at a glance — love, career, money & health. Plan smarter with clear timelines.",
    price: 99,
    compareAt: 299,
    features: [
      "Month-by-month predictions",
      "Love & marriage forecast",
      "Career & wealth cycles",
      "Lucky days & windows",
      "Remedies & do’s/don’ts",
    ],
  },
  {
    id: "bump-wealth",
    title: "Wealth Report",
    blurb: "Remove money blocks and align with your financial destiny.",
    price: 99,
    compareAt: 299,
    features: ["Money blocks + fixes", "Investment timelines", "Savings & risk windows"],
  },
  {
    id: "bump-life-path-ebook",
    title: "Life Path & Career eBook",
    blurb: "Actionable clarity on purpose, strengths & career path.",
    price: 99,
    compareAt: 249,
    features: ["Purpose & strengths", "Weekly practice plan", "Decision frameworks"],
  },
];

/** ───────────────────────── Hooks ───────────────────────── */

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const mmss = useMemo(() => {
    const m = String(Math.floor(left / 60)).padStart(2, "0");
    const s = String(left % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [left]);
  return { left, mmss };
}

/** ───────────────────────── Page ───────────────────────── */

export default function CartPage() {
  const router = useRouter();
  const { mmss } = useCountdown(10 * 60);

  // Essentials form
  const [form, setForm] = useState({
    fullName: "",
    gender: "female",
    email: "",
    whatsapp: "",
    dateOfBirth: "",
    placeOfBirth: "",
  });
  const on = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  // Bumps
  const [selectedBumps, setSelectedBumps] = useState<Record<string, boolean>>({});
  const toggleBump = (id: string) => setSelectedBumps((s) => ({ ...s, [id]: !s[id] }));
  const bumpsTotal = useMemo(
    () => BUMPS.filter((b) => selectedBumps[b.id]).reduce((sum, b) => sum + b.price, 0),
    [selectedBumps]
  );
  const total = PRODUCT.price + bumpsTotal;

  // Checkout state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [finalAmount, setFinalAmount] = useState(total);

  // Update finalAmount when total changes
  useEffect(() => {
    setFinalAmount(total);
  }, [total]);

  const [cashfree, setCashfree] = useState<any>(null);
  const [sdkInitialized, setSdkInitialized] = useState(false);

  // Initialize Cashfree SDK
  const initializeSDK = async () => {
    try {
      const cashfreeInstance = await load({
        mode: "production",
      });
      setCashfree(cashfreeInstance);
      setSdkInitialized(true);
      console.log("Cashfree SDK initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Cashfree SDK:", error);
      setSdkInitialized(false);
    }
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  // Listen for "reveal-form" (from sticky bar)
  const [formGlow, setFormGlow] = useState(false);
  useEffect(() => {
    const handler = () => {
      setFormGlow(true);
      setTimeout(() => setFormGlow(false), 1400);
    };
    document.addEventListener("reveal-form", handler);
    return () => document.removeEventListener("reveal-form", handler);
  }, []);

  // Handle checkout with all APIs
  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      // Get selected bumps as additional products
      const additionalProducts = BUMPS.filter((b) => selectedBumps[b.id]).map(
        (b) => b.title
      );

      // 1) Create abandoned order first
      const abdOrderResponse = await fetch(
        `${BACKEND_URL}/api/lander11/create-order-abd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount,
            name: form.fullName,
            email: form.email,
            phone: form.whatsapp,
            dateOfBirth: form.dateOfBirth,
            placeOfBirth: form.placeOfBirth,
            gender: form.gender,
            additionalProducts: additionalProducts,
          }),
        }
      );

      const abdOrderResult = await abdOrderResponse.json();
      if (!abdOrderResult.success) {
        throw new Error("Failed to create abandoned order");
      }

      const abdOrderId = abdOrderResult.data?._id;
      if (abdOrderId) {
        console.log("Abandoned Order Created with Id", abdOrderId);
      }

      // 2) Create Cashfree payment session
      const cashfreeResponse = await fetch(`${BACKEND_URL}/api/payment/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          fullName: form.fullName || "Customer",
          email: form.email || "customer@example.com",
          phoneNumber: form.whatsapp || "9876543210",
          dateOfBirth: form.dateOfBirth || "",
          placeOfBirth: form.placeOfBirth || "",
          gender: form.gender || "",
          additionalProducts: additionalProducts,
          url: 'https://www.easyastro.in/order-confirmation-cousin'
        }),
      });

      const cashfreeResult = await cashfreeResponse.json();
      if (!cashfreeResult?.data?.payment_session_id) {
        throw new Error("Failed to create Cashfree payment session");
      }

      const paymentSessionId = cashfreeResult.data.payment_session_id;
      const orderId = cashfreeResult.data.order_id;

      if (!cashfree) {
        throw new Error("Cashfree SDK not initialized");
      }

      const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_self",
        onSuccess: async function (data: any) {
          console.log("Cashfree payment successful:", data);

          try {
            // Create order in database
            const orderResponse = await fetch(
              `${BACKEND_URL}/api/lander11/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount: finalAmount,
                  cashfreeOrderId: data.order?.orderId || orderId,
                  cashfreePaymentId: data.paymentDetails?.paymentId || "",
                  name: form.fullName,
                  email: form.email,
                  phone: form.whatsapp,
                  dateOfBirth: form.dateOfBirth,
                  placeOfBirth: form.placeOfBirth,
                  gender: form.gender,
                  orderId: orderId,
                  additionalProducts: additionalProducts,
                }),
              }
            );

            const orderResult = await orderResponse.json();

            if (orderResult.success) {
              sessionStorage.setItem("orderId", orderId);
              sessionStorage.setItem("orderAmount", finalAmount.toString());

              // Webhook notification
              try {
                await fetch(
                  "https://automations.chatsonway.com/webhook/692049bf1b9845c02d52d83b",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      amount: finalAmount,
                      name: form.fullName || "",
                      email: form.email || "",
                      phone: form.whatsapp || "",
                      dateOfBirth: form.dateOfBirth || "",
                      placeOfBirth: form.placeOfBirth || "",
                      gender: form.gender || "",
                      additionalProducts: additionalProducts || [],
                      isChatsonorderSuccessfull: "Order Successfull",
                    }),
                  }
                );
              } catch (error) {
                console.error("Failed to send webhook notification:", error);
              }

              // Aisensy notification
              if (form.whatsapp) {
                try {
                  await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGY5YTMyZDQ3MzczMGU3MzNhZTZiMCIsIm5hbWUiOiJTcGVrbGlvIE1lZGlhIDIxMzQiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjhkZjlhMzJkNDczNzMwZTczM2FlNmFiIiwiYWN0aXZlUGxhbiI6IkZSRUVfRk9SRVZFUiIsImlhdCI6MTc1OTQ4NDQ2Nn0.D5rCrsjtikR4N68HNS7ZOpNfzTSTuN9otxZ9-UBvi1g",
                      campaignName: "28oct",
                      destination: form.whatsapp,
                      userName: "Speklio Media 2134",
                      templateParams: [],
                      source: "new-landing-page form",
                    }),
                  });
                } catch (error) {
                  console.error("Failed to send campaign notification:", error);
                }
              }

              // Delete abandoned order
              await fetch(`${BACKEND_URL}/api/lander11/delete-order-abd`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: form.email }),
              });

              const confirmationParams = new URLSearchParams({
                orderId: orderId,
                orderType: "Soulmate Sketch + Love Report",
                fullName: form.fullName || "Customer",
                email: form.email || "",
                phoneNumber: form.whatsapp || "",
                amount: finalAmount.toString(),
                dateOfBirth: form.dateOfBirth,
                placeOfBirth: form.placeOfBirth,
                gender: form.gender,
                additionalProducts: additionalProducts.join(","),
              });

              window.location.href = `/order-confirmation-cousin?${confirmationParams.toString()}`;
            } else {
              alert("Payment successful but order creation failed. Please contact support.");
            }
          } catch (error) {
            console.error("Error creating order:", error);
            alert("Payment successful but order creation failed. Please contact support.");
          }
        },
        onFailure: function (data: any) {
          console.log("Cashfree payment failed:", data);
          alert("Payment failed. Please try again.");
        },
      };

      cashfree.checkout(checkoutOptions);

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };


  return (
    <main className="relative min-h-screen overflow-x-hidden scroll-smooth text-[15.5px] sm:text-[16.5px] leading-[1.65]">
      {/* Global CSS for glow buttons + stronger typography scale */}
      <style jsx global>{`
        .btn-glow {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(236, 72, 153, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.18);
          transform: translateZ(0);
        }
        .btn-glow::before {
          content: "";
          position: absolute;
          inset: -140%;
          background: conic-gradient(
            from 0deg,
            rgba(236, 72, 153, 0.25),
            rgba(244, 114, 182, 0.25),
            rgba(244, 63, 94, 0.25),
            rgba(236, 72, 153, 0.25)
          );
          filter: blur(28px);
          animation: spin-slow 6s linear infinite;
          z-index: -2;
        }
        .btn-glow::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(80% 120% at 50% 0%, rgba(255, 255, 255, 0.28), transparent 60%);
          z-index: -1;
        }
        .btn-glow:hover {
          box-shadow: 0 14px 30px rgba(236, 72, 153, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.22);
        }
        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          height: 100%;
          width: 60%;
          transform: skewX(-24deg);
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: shine 2.4s ease-in-out infinite;
        }
        @keyframes shine {
          0% {
            left: -120%;
          }
          55% {
            left: 140%;
          }
          100% {
            left: 140%;
          }
        }
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .btn-bounce {
          animation: micro-bounce 1.8s ease-in-out infinite;
        }
        @keyframes micro-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1.5px);
          }
        }
      `}</style>

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fee9f2] via-[#fdd7e8]/75 to-[#fbcadb]" />
      <div className="absolute inset-0 opacity-45 [background:repeating-linear-gradient(110deg,rgba(255,255,255,.58)_0_8px,transparent_8px_16px)]" />

      {/* Sticky CTA (Fill your details) */}
      <StickyBuyBar
        price={PRODUCT.price}
        compareAt={PRODUCT.compareAt}
        mmss={mmss}
        total={total}
        scrollTargetId="details-form"
      />

      {/* Scroll cue */}
      <ScrollCue />

      <div className="relative mx-auto w-full max-w-[1000px] px-4 sm:px-6 pb-32 pt-7 sm:pt-10">
        {/* Top chip */}
        <div className="mb-6 text-center sm:mb-9">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-200/60 bg-pink-100/50 px-3.5 py-1.5 text-[13px] font-semibold text-pink-700 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Secure Checkout • Loved by 100k+
          </span>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <section className="space-y-7">
            {/* PRODUCT PREVIEW */}
            <Card className="overflow-hidden border-pink-200/60 bg-white/95 backdrop-blur">
              <CardHeader className="pb-1.5">
                <CardTitle className="text-base sm:text-lg font-bold truncate text-zinc-900">
                  {PRODUCT.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid items-start gap-3 [grid-template-columns:minmax(0,1fr)_150px] sm:[grid-template-columns:minmax(0,1fr)_220px]">
                <div className="pr-1">
                  <ul className="space-y-2.5">
                    {PRODUCT.includes.map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 rounded-lg border border-zinc-200/70 bg-white/85 px-3 py-2 text-[13.5px] leading-[1.35] sm:text-[14px]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-green-500 shrink-0" />
                        <span className="truncate">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="justify-self-end w-[150px] sm:w-[220px]">
                  <div className="rounded-xl border border-white/60 bg-white/80 p-1.5 shadow-sm">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={PRODUCT.img}
                        alt="Soulmate Sketch preview"
                        width={440}
                        height={440}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="mt-1.5 text-center text-[11px] text-pink-900/70">
                    Sample • Yours is personalized
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BUMPS */}
            <Card className="border-pink-200/70 bg-white/96 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-[22px] text-pink-700 font-extrabold">
                  <span className="h-2 w-2 rounded-full bg-pink-500 inline-block" />
                  Enhance Your Love Journey
                </CardTitle>
                <p className="text-[13.5px] sm:text-sm text-pink-700/80">
                  Optional add-ons. Tap “Add” to include.
                </p>
              </CardHeader>
              <CardContent className="space-y-4.5">
                {BUMPS.map((b) => (
                  <CompactBumpRow
                    key={b.id}
                    bump={b}
                    checked={!!selectedBumps[b.id]}
                    onToggle={() => toggleBump(b.id)}
                  />
                ))}
              </CardContent>
            </Card>

            {/* FORM */}
            <Card
              id="details-form"
              className={[
                "border-pink-200/60 bg-white/95 backdrop-blur transition-all",
                formGlow ? "ring-2 ring-pink-400 shadow-[0_0_0_6px_rgba(244,114,182,0.18)]" : "",
              ].join(" ")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl sm:text-[22px] font-extrabold text-zinc-900">
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4.5">
                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900">
                      Full Name <span className="text-pink-600">*</span>
                    </label>
                    <input
                      value={form.fullName}
                      onChange={on("fullName")}
                      placeholder="e.g., Aisha Khan"
                      className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-2.5 text-[15px] outline-none focus:border-pink-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900">
                        Gender
                      </label>
                      <select
                        value={form.gender}
                        onChange={on("gender")}
                        className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-2.5 text-[15px] outline-none focus:border-pink-300"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="grid gap-1.5">
                      <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900 flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-pink-500" />
                        WhatsApp
                      </label>
                      <input
                        value={form.whatsapp}
                        onChange={on("whatsapp")}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-2.5 text-[15px] outline-none focus:border-pink-300"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900 flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-pink-500" />
                      Email
                    </label>
                    <input
                      value={form.email}
                      onChange={on("email")}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-2.5 text-[15px] outline-none focus:border-pink-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900">
                        Date of Birth
                      </label>

                      <div className="relative">
                        {/* iOS placeholder hack */}
                        {!form.dateOfBirth && (
                          <span
                            style={{
                              position: "absolute",
                              left: "14px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              fontSize: "14px",
                              color: "#9ca3af",
                              pointerEvents: "none",
                            }}
                          >
                            YYYY-MM-DD
                          </span>
                        )}

                        <input
                          value={form.dateOfBirth}
                          onChange={on("dateOfBirth")}
                          type="date"
                          required
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            background: "rgba(255,255,255,0.9)",
                            padding: "12px",
                            fontSize: "15px",
                            outline: "none",
                            minHeight: "46px", // fixes iPhone squish
                            WebkitAppearance: "none", // removes default iOS look
                          }}
                          className="focus:border-pink-300"
                        />
                      </div>
                    </div>

                    <div className="grid gap-1.5">
                      <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900">
                        Place of Birth
                      </label>
                      <input
                        value={form.placeOfBirth}
                        onChange={on("placeOfBirth")}
                        placeholder="City, State"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          background: "rgba(255,255,255,0.9)",
                          padding: "12px",
                          fontSize: "15px",
                          outline: "none",
                        }}
                        className="focus:border-pink-300"
                      />
                    </div>
                  </div>

                </div>

                <div className="pt-1">
                  <Button
                    onClick={handleCheckout}
                    size="lg"
                    className={[
                      "w-full rounded-2xl py-5 text-[17px] sm:text-[18px] font-extrabold",
                      "bg-pink-600 hover:bg-pink-600/95 text-white",
                      "btn-glow btn-shine btn-bounce",
                    ].join(" ")}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : `Buy Now — ₹${PRODUCT.price}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* RIGHT — desktop summary */}
          <aside className="hidden lg:block lg:sticky lg:top-6 lg:self-start space-y-6">
            <SummaryCard
              price={PRODUCT.price}
              compareAt={PRODUCT.compareAt}
              mmss={mmss}
              total={total}
              onPay={handleCheckout}
            />
            <AssureCard />
          </aside>
        </div>

        {/* ⬇️ GALLERY SECTION BELOW (full width inside the same container) */}
        <div className="mt-10">
          <GallerySection isCartPage />
        </div>
        <div className="mt-10">
          <TestimonialsSection isCartPage={true} />
        </div>
      </div>
    </main>
  );
}

/** ───────────────────────── Small UI helpers ───────────────────────── */

function SummaryCard({
  price,
  compareAt,
  mmss,
  total,
  onPay,
}: {
  price: number;
  compareAt?: number;
  mmss: string;
  total: number;
  onPay: () => void;
}) {
  return (
    <Card className="border-pink-200/60 bg-white/96 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl sm:text-[22px] font-extrabold text-zinc-900">
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border border-zinc-200 bg-white/70 p-4.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[13.5px] sm:text-sm text-zinc-600">Today’s Price</span>
            <div className="text-right">
              <div className="text-[26px] sm:text-[28px] font-black text-pink-600">₹{price}</div>
              {!!compareAt && (
                <div className="text-xs text-zinc-500 line-through">₹{compareAt}</div>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-pink-50 px-3 py-2 text-[13.5px] sm:text-sm text-pink-700">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Limited-time special applied
            </div>
            <div className="flex items-center gap-1 font-bold">
              <Timer className="h-4 w-4" />
              <span>{mmss}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-[14.5px] sm:text-[15px]">
          <div className="flex items-center justify-between text-zinc-700">
            <span>Subtotal</span>
            <span>₹{price}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-700">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="h-px w-full bg-zinc-200" />
          <div className="flex items-center justify-between text-[16.5px] font-extrabold text-zinc-900">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <Button
          size="lg"
          className={[
            "w-full rounded-2xl py-6 text-[17px] sm:text-[18px] font-extrabold",
            "bg-pink-600 hover:bg-pink-600/95 text-white",
            "btn-glow btn-shine btn-bounce",
          ].join(" ")}
          onClick={onPay}
          disabled={false}
        >
          Complete Order Securely
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-600">
          <ShieldCheck className="h-4 w-4 text-pink-600" />
          100% Private • Money-back Guarantee • Secure Checkout
        </div>
      </CardContent>
    </Card>
  );
}

function AssureCard() {
  return (
    <Card className="border-pink-200/60 bg-white/90 backdrop-blur">
      <CardContent className="space-y-3.5 p-4 text-[14.5px] text-zinc-800">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-green-500" />
          <p>
            Delivery via Email & WhatsApp within <b>24–48 hours</b>.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-green-500" />
          <p>
            Every sketch is <b>hand-drawn</b> and <b>unique to you</b>.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-green-500" />
          <p>
            Full refund if you’re not satisfied — <b>no questions asked</b>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function CompactBumpRow({
  bump,
  checked,
  onToggle,
}: {
  bump: Bump;
  checked: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-pink-200/70 bg-pink-50/40 p-3.5 sm:p-4.5">
      <div className="flex items-start justify-between gap-3.5">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <input
            id={`b-${bump.id}`}
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="mt-1 h-5 w-5 rounded border-pink-400 text-pink-600 focus:ring-pink-300"
          />
          <div className="min-w-0">
            <label
              htmlFor={`b-${bump.id}`}
              className="cursor-pointer text-[15.5px] sm:text-[16px] font-extrabold text-pink-800"
            >
              {bump.title}
            </label>
            <p className="mt-0.5 line-clamp-2 text-[13.5px] sm:text-[14px] text-pink-900/85">
              {bump.blurb}
            </p>
            {bump.features?.length ? (
              <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
                {bump.features.slice(0, 2).map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-pink-200 bg-white/70 px-2.5 py-0.5 text-[11.5px] text-pink-800"
                  >
                    {f}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[14.5px] sm:text-[15px] font-black text-pink-700">₹{bump.price}</div>
          {!!bump.compareAt && (
            <div className="text-[11.5px] text-pink-700/60 line-through">₹{bump.compareAt}</div>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="mt-1 inline-flex items-center gap-1 rounded-md border border-pink-300 bg-white/80 px-2.5 py-1.5 text-[12.5px] font-bold text-pink-700 hover:bg-white"
          >
            <Plus className="h-3.5 w-3.5" />
            {checked ? "Remove" : "Add"}
          </button>
        </div>
      </div>

      {bump.features?.length ? (
        <div className="mt-2">
          {open ? (
            <>
              <ul className="space-y-1.5 rounded-lg border border-pink-200/70 bg-white/80 p-3.5 text-[13.5px] text-pink-900/90">
                {bump.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-pink-500/70" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-2 text-[12.5px] font-semibold text-pink-700 underline underline-offset-2"
                onClick={() => setOpen(false)}
              >
                Show Less
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-[12.5px] font-semibold text-pink-700 underline underline-offset-2"
              onClick={() => setOpen(true)}
            >
              Show More
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

/** Scroll cue that fades out after user scrolls a bit */
function ScrollCue() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[76px] z-30 flex justify-center">
      <div className="flex items-center gap-2 rounded-full border border-pink-300/60 bg-pink-50/80 px-3.5 py-1.5 text-[12.5px] sm:text-[13px] font-semibold text-pink-700 shadow-sm">
        <span className="animate-bounce">
          <ChevronDown className="h-4 w-4" />
        </span>
        Scroll to fill details & complete order
      </div>
    </div>
  );
}
