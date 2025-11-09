// components/cta/StickyBuyBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

export default function StickyBuyBar() {
  const router = useRouter();
  const [end, setEnd] = useState<number | null>(null);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const t = Date.now() + 10 * 60 * 1000; // 10 minutes
    setEnd(t);
    const id = setInterval(() => setLeft(Math.max(0, t - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  if (!end) return null;

  const mm = String(Math.floor(left / 60000)).padStart(2, "0");
  const ss = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] border-t border-pink-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-pink-200/70 bg-pink-50/60 px-3 py-2 text-sm font-semibold text-pink-700">
            <Clock className="h-4 w-4" />
            Offer ends in <span className="tabular-nums">{mm}:{ss}</span>
          </div>
          <div className="hidden sm:block text-sm text-[#5c4250]/80">
            Today only <span className="line-through opacity-60">₹998</span>{" "}
            <span className="font-bold text-pink-700">₹289</span>
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => router.push("/checkout")}
          className="rounded-xl px-6 font-bold"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
