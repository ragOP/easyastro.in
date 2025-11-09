// app/questionnaire/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";

/**
 * ONE-QUESTION-AT-A-TIME QUESTIONNAIRE (mobile-first + silky animations)
 * - Super compact first screen
 * - Smooth slide/fade between questions (AnimatePresence + variants)
 * - Tap/Swipe (←/→) to navigate
 * - Per-question validation
 * - Autosave (localStorage) + final payload -> sessionStorage → /cart
 * - No external UI kit required (pure Tailwind + Framer Motion)
 *
 * Tip: ensure framer-motion is installed:
 *   npm i framer-motion
 */

type FormState = {
  fullName: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  whatsapp: string;
  gender: "female" | "male" | "other" | "prefer_not_to_say";
  consent: boolean;
};

const DEFAULT: FormState = {
  fullName: "",
  email: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
  whatsapp: "",
  gender: "female",
  consent: false,
};

const STORAGE_KEY = "ea_questionnaire_onebyone_v1";

// ----- Steps (one question each) -----
type Step = {
  key: keyof FormState | "summary";
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "date" | "time";
  required?: boolean;
  render?: (form: FormState, setForm: React.Dispatch<React.SetStateAction<FormState>>) => React.ReactNode;
  validate?: (form: FormState) => boolean;
};

const STEPS: Step[] = [
  {
    key: "fullName",
    label: "What's your full name?",
    placeholder: "e.g., Aisha Khan",
    required: true,
    validate: (f) => f.fullName.trim().length >= 2,
  },
  {
    key: "email",
    label: "Your email address?",
    placeholder: "you@example.com",
    type: "email",
    required: true,
    validate: (f) => /\S+@\S+\.\S+/.test(f.email),
  },
  {
    key: "birthDate",
    label: "Date of birth?",
    placeholder: "DD/MM/YYYY",
    required: true,
    validate: (f) => f.birthDate.trim().length >= 4,
  },
  {
    key: "birthTime",
    label: "Time of birth? (rough is fine)",
    placeholder: "03:45 AM",
    required: true,
    validate: (f) => f.birthTime.trim().length >= 3,
  },
  {
    key: "birthPlace",
    label: "Place of birth?",
    placeholder: "City, Country",
    required: true,
    validate: (f) => f.birthPlace.trim().length >= 2,
  },
  {
    key: "whatsapp",
    label: "WhatsApp (optional)",
    placeholder: "+91 98765 43210",
  },
  {
    key: "gender",
    label: "How do you identify?",
    required: true,
    render: (form, setForm) => (
      <div className="grid grid-cols-2 gap-2">
        {([
          { v: "female", t: "Female" },
          { v: "male", t: "Male" },
          { v: "other", t: "Other" },
          { v: "prefer_not_to_say", t: "Prefer not to say" },
        ] as const).map((g) => (
          <button
            key={g.v}
            type="button"
            onClick={() => setForm((f) => ({ ...f, gender: g.v }))}
            className={
              "rounded-xl border px-3 py-2 text-sm transition " +
              (form.gender === g.v
                ? "border-pink-400 bg-pink-50 font-semibold text-pink-700 shadow-[0_0_0_3px_rgba(236,72,153,.15)]"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-pink-200")
            }
          >
            {g.t}
          </button>
        ))}
      </div>
    ),
  },
  {
    key: "summary",
    label: "Review & consent",
    render: (form, setForm) => (
      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-800">
          <dl className="grid grid-cols-1 gap-2">
            <Row label="Name" value={form.fullName || "—"} />
            <Row label="Email" value={form.email || "—"} />
            <Row label="DOB" value={form.birthDate || "—"} />
            <Row label="Time" value={form.birthTime || "—"} />
            <Row label="Place" value={form.birthPlace || "—"} />
            <Row label="WhatsApp" value={form.whatsapp || "—"} />
            <Row label="Gender" value={pretty(form.gender)} />
          </dl>
        </div>

        <label className="flex items-start gap-3 text-sm text-zinc-800">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
            className="mt-1 h-5 w-5 rounded border-pink-400 text-pink-600 focus:ring-pink-300"
          />
          <span>
            I consent to receive my personalized sketch & love reading via Email/WhatsApp.
          </span>
        </label>
      </div>
    ),
    validate: (f) => f.consent,
  },
];

// ----- Animations -----
const pageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 42,
      mass: 0.6,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    filter: "blur(6px)",
    transition: { duration: 0.18 },
  }),
};

export default function QuestionnaireOneByOne() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(DEFAULT);
  const [index, setIndex] = useState(0); // which step
  const [dir, setDir] = useState(1); // animation direction
  const containerRef = useRef<HTMLDivElement>(null);

  // Restore / autosave
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setForm({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  // Swipe gestures (mobile)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let endX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.changedTouches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if (Math.abs(dx) > 50) {
        if (dx < 0) handleNext();
        else handleBack();
      }
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, form]);

  const step = STEPS[index];

  const valid = useMemo(() => {
    if (!step.validate) {
      // generic required check for basic input steps
      if (step.required) {
        const v = (form[step.key as keyof FormState] as string) ?? "";
        return String(v).trim().length > 0;
      }
      return true;
    }
    return step.validate(form);
  }, [form, step]);

  function handleNext() {
    if (!valid) return;
    if (index < STEPS.length - 1) {
      setDir(1);
      setIndex((i) => i + 1);
    } else {
      // submit
      try {
        sessionStorage.setItem("ea_checkout_payload", JSON.stringify(form));
      } catch {}
      router.push("/cart");
    }
  }
  function handleBack() {
    if (index === 0) return;
    setDir(-1);
    setIndex((i) => i - 1);
  }

  // field binder
  const bind = (k: keyof FormState) => ({
    value: form[k] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value })),
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background to match your site */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fee9f2] via-[#fdd7e8]/75 to-[#fbcadb]" />
      <div className="absolute inset-0 opacity-45 [background:repeating-linear-gradient(110deg,rgba(255,255,255,.58)_0_8px,transparent_8px_16px)]" />

      <div className="relative mx-auto w-full max-w-[680px] px-4 sm:px-6 pb-20 pt-6">
        {/* Top chip */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-200/60 bg-pink-100/40 px-3 py-1 text-xs font-medium text-pink-600">
            <Sparkles className="h-4 w-4" />
            Smooth & fast • One question at a time
          </span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-xs text-pink-800/80">
            <span>
              Step {index + 1} of {STEPS.length}
            </span>
            <span>{Math.round(((index + 1) / STEPS.length) * 100)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/60">
            <motion.div
              className="h-full rounded-full bg-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${((index + 1) / STEPS.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
            />
          </div>
        </div>

        {/* Card */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl border border-pink-200/70 bg-white/95 p-4 shadow-sm backdrop-blur sm:p-6"
        >
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.div
              key={step.key}
              custom={dir}
         
              initial="enter"
              animate="center"
              exit="exit"
              className="min-h-[210px]"
            >
              <h2 className="mb-4 text-balance text-lg font-bold leading-snug text-pink-800 sm:text-xl">
                {step.label}
              </h2>

              {/* Render type: custom or input */}
              {step.render ? (
                <div className="space-y-4">{step.render(form, setForm)}</div>
              ) : (
                <div className="space-y-2">
                  <input
                    {...bind(step.key as keyof FormState)}
                    type={step.type ?? "text"}
                    placeholder={step.placeholder}
                    className="w-full rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200/60"
                  />
                  {!valid && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[12px] text-pink-600"
                    >
                      {step.required ? "This field is required." : ""}
                      {step.key === "email" && " Please enter a valid email."}
                    </motion.p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={handleBack}
              disabled={index === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {index === STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!valid}
                className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Proceed to Cart
                <CheckCircle2 className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!valid}
                className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Footer mini-assure */}
        <p className="mt-4 text-center text-xs text-zinc-700">
          100% Private • Your details are used only to craft your personalized sketch & reading.
        </p>
      </div>
    </main>
  );
}

/* ---------------- helpers ---------------- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2">
      <dt className="text-xs font-semibold text-zinc-500">{label}</dt>
      <dd className="text-zinc-900">{value}</dd>
    </div>
  );
}

function pretty(v: string) {
  return v.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
