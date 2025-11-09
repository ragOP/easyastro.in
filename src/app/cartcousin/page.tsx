// app/cart/page.tsx
"use client";

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
  price: 289,
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

  // Load Razorpay script
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then((result) => {
      if (result) {
        console.log("Razorpay script loaded successfully");
      }
    });
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
      const additionalProducts = BUMPS.filter((b) => selectedBumps[b.id]).map((b) => b.title);

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
        throw new Error("Failed to create payment order");
      }
      const abdOrderId = abdOrderResult.data?._id;
      if (abdOrderId) {
        console.log("Abandoned Order Created with Id", abdOrderId);
      }

      // 2) Create Razorpay order
      const response = await fetch(`${BACKEND_URL}/api/payment/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
        }),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error("Failed to create payment order");
      }
      const data = result.data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: finalAmount,
        currency: "INR",
        name: "AstraSoul",
        description: "Soulmate Sketch Order Payment",
        order_id: data.orderId,
        handler: async function (response: any) {
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
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  name: form.fullName,
                  email: form.email,
                  phone: form.whatsapp,
                  dateOfBirth: form.dateOfBirth,
                  placeOfBirth: form.placeOfBirth,
                  gender: form.gender,
                  orderId: data.orderId,
                  additionalProducts: additionalProducts,
                }),
              }
            );
            const orderResult = await orderResponse.json();
            if (orderResult.success) {
              sessionStorage.setItem("orderId", data.orderId);
              sessionStorage.setItem("orderAmount", finalAmount.toString());
              
              // Send campaign notification if phone number is present
              if (form.whatsapp) {
                try {
                  await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGY5YTMyZDQ3MzczMGU3MzNhZTZiMCIsIm5hbWUiOiJTcGVrbGlvIE1lZGlhIDIxMzQiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjhkZjlhMzJkNDczNzMwZTczM2FlNmFiIiwiYWN0aXZlUGxhbiI6IkZSRUVfRk9SRVZFUiIsImlhdCI6MTc1OTQ4NDQ2Nn0.D5rCrsjtikR4N68HNS7ZOpNfzTSTuN9otxZ9-UBvi1g",
                      "campaignName": "28oct",
                      "destination": form.whatsapp,
                      "userName": "Speklio Media 2134",
                      "templateParams": [],
                      "source": "new-landing-page form",
                      "media": {},
                      "buttons": [],
                      "carouselCards": [],
                      "location": {},
                      "attributes": {},
                      "paramsFallbackValue": {}
                    })
                  });
                  console.log("Campaign notification sent successfully");
                } catch (error) {
                  console.error("Failed to send campaign notification:", error);
                  // Don't block the flow if campaign notification fails
                }
              }
              
              // Delete abandoned order if order is created successfully
              const deleteAbdOrder = await fetch(
                `${BACKEND_URL}/api/lander11/delete-order-abd`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email: form.email }),
                }
              );
              const deleteAbdOrderResult = await deleteAbdOrder.json();
              console.log("Abandoned Order Deleted", deleteAbdOrderResult);
              window.location.href = "/order-confirmation";
            } else {
              alert(
                "Payment successful but order creation failed. Please contact support."
              );
            }
          } catch (error) {
            console.error("Error creating order:", error);
            alert(
              "Payment successful but order creation failed. Please contact support."
            );
          }
        },
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.whatsapp,
        },
        theme: {
          color: "#ec4899",
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden scroll-smooth">
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

      <div className="relative mx-auto w-full max-w-[980px] px-4 sm:px-6 pb-28 pt-6 sm:pt-10">
        {/* Top chip */}
        <div className="mb-5 text-center sm:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-200/60 bg-pink-100/40 px-3 py-1 text-xs font-medium text-pink-600">
            <Sparkles className="h-4 w-4" />
            Secure Checkout • Loved by 100k+
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <section className="space-y-6">
            {/* PRODUCT PREVIEW — features left, compact image right */}
            <Card className="overflow-hidden border-pink-200/60 bg-white/95 backdrop-blur">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm sm:text-base font-semibold truncate">
                  {PRODUCT.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="grid items-start gap-3 [grid-template-columns:minmax(0,1fr)_140px] sm:[grid-template-columns:minmax(0,1fr)_200px]">
                {/* LEFT: three lines */}
                <div className="pr-1">
                  <ul className="space-y-2">
                    {PRODUCT.includes.map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 rounded-lg border border-zinc-200/60 bg-white/85 px-2.5 py-2 text-[13px] leading-[1.3]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                        <span className="truncate">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT: small image */}
                <div className="justify-self-end w-[140px] sm:w-[200px]">
                  <div className="rounded-xl border border-white/60 bg-white/80 p-1 shadow-sm">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={PRODUCT.img}
                        alt="Soulmate Sketch preview"
                        width={400}
                        height={400}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="mt-1 text-center text-[10px] text-pink-900/70">
                    Sample • Yours is personalized
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BUMPS (bundle) */}
            <Card className="border-pink-200/70 bg-white/96 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-pink-700">
                  <span className="h-2 w-2 rounded-full bg-pink-500 inline-block" />
                  Enhance Your Love Journey
                </CardTitle>
                <p className="text-sm text-pink-700/80">Optional add-ons. Tap “Add” to include.</p>
              </CardHeader>
              <CardContent className="space-y-4">
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

            {/* FORM — essentials only (scroll target) */}
            <Card
              id="details-form"
              className={[
                "border-pink-200/60 bg-white/95 backdrop-blur transition-all",
                formGlow ? "ring-2 ring-pink-400 shadow-[0_0_0_6px_rgba(244,114,182,0.18)]" : "",
              ].join(" ")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg sm:text-xl">Your Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <label className="text-[13px] font-medium text-zinc-800">
                      Full Name <span className="text-pink-600">*</span>
                    </label>
                    <input
                      value={form.fullName}
                      onChange={on("fullName")}
                      placeholder="e.g., Aisha Khan"
                      className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-sm outline-none focus:border-pink-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <label className="text-[13px] font-medium text-zinc-800">Gender</label>
                      <select
                        value={form.gender}
                        onChange={on("gender")}
                        className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-sm outline-none focus:border-pink-300"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="grid gap-1.5">
                      <label className="text-[13px] font-medium text-zinc-800 flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-pink-500" />
                        WhatsApp
                      </label>
                      <input
                        value={form.whatsapp}
                        onChange={on("whatsapp")}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-sm outline-none focus:border-pink-300"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-[13px] font-medium text-zinc-800 flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-pink-500" />
                      Email
                    </label>
                    <input
                      value={form.email}
                      onChange={on("email")}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-sm outline-none focus:border-pink-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <label className="text-[13px] font-medium text-zinc-800">
                        Date of Birth
                      </label>
                      <input
                        value={form.dateOfBirth}
                        onChange={on("dateOfBirth")}
                        type="date"
                        className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-sm outline-none focus:border-pink-300"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label className="text-[13px] font-medium text-zinc-800">
                        Place of Birth
                      </label>
                      <input
                        value={form.placeOfBirth}
                        onChange={on("placeOfBirth")}
                        placeholder="City, State"
                        className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-sm outline-none focus:border-pink-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <Button 
                    onClick={handleCheckout} 
                    size="lg" 
                    className="w-full rounded-xl py-5 text-base font-bold"
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : `Buy Now — ₹${PRODUCT.price}`}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bottom CTA */}
            <div className="mt-2">
              <Button 
                onClick={handleCheckout} 
                size="lg" 
                className="w-full rounded-xl py-5 text-base font-extrabold"
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : `Buy Now — Pay ₹${total}`}
              </Button>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-zinc-600">
                <ShieldCheck className="h-4 w-4 text-pink-600" />
                100% Private • Money-back Guarantee • Secure Checkout
              </div>
            </div>
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
        <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border border-zinc-200 bg-white/70 p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-zinc-500">Today’s Price</span>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-pink-600">₹{price}</div>
              {!!compareAt && <div className="text-xs text-zinc-500 line-through">₹{compareAt}</div>}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-pink-50 px-3 py-2 text-sm text-pink-700">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Limited-time special applied
            </div>
            <div className="flex items-center gap-1 font-semibold">
              <Timer className="h-4 w-4" />
              <span>{mmss}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span>Subtotal</span>
            <span>₹{price}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-600">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="h-px w-full bg-zinc-200" />
          <div className="flex items-center justify-between text-base font-bold text-zinc-900">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full rounded-xl py-6 text-base font-bold" 
          onClick={onPay}
          disabled={false}
        >
          Complete Order Securely
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-600">
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
      <CardContent className="space-y-3 p-4 text-sm text-zinc-700">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
          <p>Delivery via Email & WhatsApp within <b>24–48 hours</b>.</p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
          <p>Every sketch is <b>hand-drawn</b> and <b>unique to you</b>.</p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
          <p>Full refund if you’re not satisfied — <b>no questions asked</b>.</p>
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
    <div className="rounded-xl border border-pink-200/70 bg-pink-50/40 p-3 sm:p-4">
      <div className="flex items-start justify-between gap-3">
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
              className="cursor-pointer text-[15px] font-semibold text-pink-800 sm:text-base"
            >
              {bump.title}
            </label>
            <p className="mt-0.5 line-clamp-2 text-[13px] text-pink-900/85">{bump.blurb}</p>
            {bump.features?.length ? (
              <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
                {bump.features.slice(0, 2).map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-pink-200 bg-white/70 px-2 py-0.5 text-[11px] text-pink-800"
                  >
                    {f}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-sm font-extrabold text-pink-700 sm:text-base">₹{bump.price}</div>
          {!!bump.compareAt && (
            <div className="text-[11px] text-pink-700/60 line-through">₹{bump.compareAt}</div>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="mt-1 inline-flex items-center gap-1 rounded-md border border-pink-300 bg-white/80 px-2 py-1 text-[12px] font-semibold text-pink-700 hover:bg-white"
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
              <ul className="space-y-1.5 rounded-lg border border-pink-200/70 bg-white/80 p-3 text-[13px] text-pink-900/90">
                {bump.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-pink-500/70" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-2 text-[12px] font-medium text-pink-700 underline underline-offset-2"
                onClick={() => setOpen(false)}
              >
                Show Less
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-[12px] font-medium text-pink-700 underline underline-offset-2"
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
      <div className="flex items-center gap-2 rounded-full border border-pink-300/60 bg-pink-50/80 px-3 py-1 text-xs font-medium text-pink-700 shadow-sm">
        <span className="animate-bounce">
          <ChevronDown className="h-4 w-4" />
        </span>
        Scroll to fill details & complete order
      </div>
    </div>
  );
}
