// app/questionnaire/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

/**
 * Mobile-first Questionnaire (Step-by-Step)
 * - Minimal above-the-fold height
 * - One column, large tap targets
 * - Progressive disclosure (name/email/dob first, then details)
 * - LocalStorage autosave + restore
 * - Lightweight validation per step
 * - Summary screen -> proceeds to /cart with payload in sessionStorage
 *
 * Tailwind classes assume your global theme. No shadcn dependency required.
 */

type FormState = {
  fullName: string;
  email: string;
  whatsapp: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: "female" | "male" | "other" | "prefer_not_to_say";
  goal: "curious" | "serious_relationship" | "closure" | "fun";
  notes: string;
  consent: boolean;
};

const DEFAULT_STATE: FormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
  gender: "female",
  goal: "curious",
  notes: "",
  consent: false,
};

const STORAGE_KEY = "ea_questionnaire_v1";

export default function QuestionnairePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(DEFAULT_STATE);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // ----- Restore & Autosave -----
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setForm({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  // ----- Helpers -----
  const on = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const v = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setForm((f) => ({ ...f, [k]: v as any }));
    };
  const mark = (k: keyof FormState) => setTouched((t) => ({ ...t, [k]: true }));

  // ----- Validation per step -----
  const stepValid = useMemo(() => {
    if (step === 1) {
      return (
        form.fullName.trim().length >= 2 &&
        /\S+@\S+\.\S+/.test(form.email) &&
        (form.birthDate || "").trim().length >= 4
      );
    }
    if (step === 2) {
      return (form.birthTime || "").trim().length >= 3 && (form.birthPlace || "").trim().length >= 2;
    }
    if (step === 3) {
      return true; // optional notes
    }
    if (step === 4) {
      return form.consent;
    }
    return false;
  }, [step, form]);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    // Put payload where your cart/checkout can read it.
    try {
      sessionStorage.setItem("ea_checkout_payload", JSON.stringify(form));
    } catch {}
    router.push("/cart");
  };

  // ----- Progress -----
  const progress = useMemo(() => (step / 4) * 100, [step]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background (matches your hero/cart palette) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fee9f2] via-[#fdd7e8]/75 to-[#fbcadb]" />
      <div className="absolute inset-0 opacity-45 [background:repeating-linear-gradient(110deg,rgba(255,255,255,.58)_0_8px,transparent_8px_16px)]" />

      <div className="relative mx-auto w-full max-w-[720px] px-4 sm:px-6 pb-16 pt-6">
        {/* Top pill */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-200/60 bg-pink-100/40 px-3 py-1 text-xs font-medium text-pink-600">
            <Sparkles className="h-4 w-4" />
            Quick Questionnaire • 60–90 sec
          </span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-xs text-pink-800/80">
            <span>Step {step} of 4</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-pink-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <section className="rounded-2xl border border-pink-200/70 bg-white/95 p-4 shadow-sm backdrop-blur sm:p-6">
          {step === 1 && (
            <StepOne
              form={form}
              on={on}
              mark={mark}
              touched={touched}
            />
          )}
          {step === 2 && (
            <StepTwo
              form={form}
              on={on}
              mark={mark}
              touched={touched}
            />
          )}
          {step === 3 && (
            <StepThree form={form} on={on} />
          )}
          {step === 4 && (
            <StepFour form={form} on={on} />
          )}

          {/* Nav */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={back}
              disabled={step === 1}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={next}
                disabled={!stepValid}
                className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!stepValid}
                className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Proceed to Cart
                <CheckCircle2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        {/* Assure footer */}
        <p className="mt-4 text-center text-xs text-zinc-700">
          100% Private • Your details are used only to craft your personalized sketch and reading.
        </p>
      </div>
    </main>
  );
}

/* ------------------ Steps ------------------ */

function Label({ children, req = false }: { children: React.ReactNode; req?: boolean }) {
  return (
    <label className="text-[13px] font-medium text-zinc-900">
      {children} {req && <span className="text-pink-600">*</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  onBlur,
}: {
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  onBlur?: () => void;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3 py-2.5 text-sm outline-none focus:border-pink-300"
    />
  );
}

function Error({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return <p className="text-[12px] text-pink-600">{children}</p>;
}

/* Step 1 — Basic identity (short, mobile) */
function StepOne({
  form,
  on,
  mark,
  touched,
}: {
  form: FormState;
  on: (k: keyof FormState) => any;
  mark: (k: keyof FormState) => void;
  touched: Record<string, boolean>;
}) {
  const emailInvalid = touched.email && !/\S+@\S+\.\S+/.test(form.email);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-pink-800">Tell us about you</h2>

      <div className="grid gap-3">
        <div className="grid gap-1.5">
          <Label req>Full Name</Label>
          <Input
            value={form.fullName}
            onChange={on("fullName")}
            onBlur={() => mark("fullName")}
            placeholder="e.g., Aisha Khan"
          />
          <Error show={touched.fullName && form.fullName.trim().length < 2}>
            Please enter your full name.
          </Error>
        </div>

        <div className="grid gap-1.5">
          <Label req>Email</Label>
          <Input
            value={form.email}
            onChange={on("email")}
            onBlur={() => mark("email")}
            placeholder="you@example.com"
            type="email"
          />
          <Error show={!!emailInvalid}>Please enter a valid email.</Error>
        </div>

        <div className="grid gap-1.5">
          <Label>WhatsApp (optional)</Label>
          <Input
            value={form.whatsapp}
            onChange={on("whatsapp")}
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="grid gap-1.5">
          <Label req>Date of Birth</Label>
          <Input
            value={form.birthDate}
            onChange={on("birthDate")}
            onBlur={() => mark("birthDate")}
            placeholder="DD/MM/YYYY"
          />
          <Error show={touched.birthDate && form.birthDate.trim().length < 4}>
            Add your date of birth to personalize your sketch.
          </Error>
        </div>
      </div>
    </div>
  );
}

/* Step 2 — Birth details */
function StepTwo({
  form,
  on,
  mark,
  touched,
}: {
  form: FormState;
  on: (k: keyof FormState) => any;
  mark: (k: keyof FormState) => void;
  touched: Record<string, boolean>;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-pink-800">Birth details</h2>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="grid gap-1.5">
          <Label req>Time</Label>
          <Input
            value={form.birthTime}
            onChange={on("birthTime")}
            onBlur={() => mark("birthTime")}
            placeholder="03:45 AM"
          />
          <Error show={touched.birthTime && form.birthTime.trim().length < 3}>
            Add your birth time (approx. is fine).
          </Error>
        </div>

        <div className="grid gap-1.5 sm:col-span-2">
          <Label req>Place</Label>
          <Input
            value={form.birthPlace}
            onChange={on("birthPlace")}
            onBlur={() => mark("birthPlace")}
            placeholder="City, Country"
          />
          <Error show={touched.birthPlace && form.birthPlace.trim().length < 2}>
            Add your birth place.
          </Error>
        </div>
      </div>
    </div>
  );
}

/* Step 3 — Preferences & goal */
function StepThree({
  form,
  on,
}: {
  form: FormState;
  on: (k: keyof FormState) => any;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-pink-800">A few preferences</h2>

      <div className="grid gap-3">
        <div className="grid gap-1.5">
          <Label>Gender</Label>
          <select
            value={form.gender}
            onChange={on("gender")}
            className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3 py-2.5 text-sm outline-none focus:border-pink-300"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        <div className="grid gap-1.5">
          <Label>Your current goal</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {([
              { k: "curious", label: "Just curious" },
              { k: "serious_relationship", label: "Serious love" },
              { k: "closure", label: "Closure/clarity" },
              { k: "fun", label: "Fun gift" },
            ] as const).map((g) => (
              <button
                key={g.k}
                type="button"
                onClick={() => on("goal")({ target: { value: g.k } } as any)}
                className={
                  "rounded-xl border px-3 py-2 text-sm " +
                  (form.goal === g.k
                    ? "border-pink-400 bg-pink-50 font-semibold text-pink-700"
                    : "border-zinc-200 bg-white text-zinc-700")
                }
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label>Anything we should know?</Label>
          <textarea
            value={form.notes}
            onChange={on("notes")}
            rows={3}
            placeholder="Optional notes for our artist…"
            className="w-full resize-none rounded-lg border border-zinc-200 bg-white/90 px-3 py-2.5 text-sm outline-none focus:border-pink-300"
          />
        </div>
      </div>
    </div>
  );
}

/* Step 4 — Summary & consent */
function StepFour({
  form,
  on,
}: {
  form: FormState;
  on: (k: keyof FormState) => any;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-pink-800">Review & consent</h2>

      <div className="rounded-xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-800">
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Row label="Name" value={form.fullName || "—"} />
          <Row label="Email" value={form.email || "—"} />
          <Row label="WhatsApp" value={form.whatsapp || "—"} />
          <Row label="Birth Date" value={form.birthDate || "—"} />
          <Row label="Birth Time" value={form.birthTime || "—"} />
          <Row label="Birth Place" value={form.birthPlace || "—"} />
          <Row label="Gender" value={pretty(form.gender)} />
          <Row label="Goal" value={pretty(form.goal)} />
        </dl>
        {form.notes?.trim() && (
          <div className="mt-2">
            <span className="text-xs font-semibold text-zinc-500">Notes:</span>
            <p className="mt-1 whitespace-pre-wrap">{form.notes}</p>
          </div>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-zinc-800">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={on("consent")}
          className="mt-1 h-5 w-5 rounded border-pink-400 text-pink-600 focus:ring-pink-300"
        />
        <span>
          I confirm the details above are correct and consent to receive my
          personalized soulmate sketch and love reading via Email/WhatsApp.
        </span>
      </label>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2">
      <dt className="text-xs font-semibold text-zinc-500">{label}</dt>
      <dd className="text-zinc-900">{value}</dd>
    </div>
  );
}

function pretty(v: string) {
  return v
    .replace(/_/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}
