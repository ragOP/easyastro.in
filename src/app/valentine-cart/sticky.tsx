"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

export default function StickyBuyBar({
  price,
  compareAt,
  total,
  mmss,
  scrollTargetId = "details-form",
}: {
  price: number;
  compareAt?: number;
  total: number;
  mmss: string;
  scrollTargetId?: string;
}) {
  const onFillDetails = () => {
    const el = document.getElementById(scrollTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    document.dispatchEvent(new CustomEvent("reveal-form"));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-pink-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[auto_1fr_auto_auto]">
        <div className="hidden items-center gap-2 text-sm text-pink-700 sm:flex">
          <Timer className="h-4 w-4" />
          <span>Offer ends in</span>
          <b className="tabular-nums">{mmss}</b>
        </div>
        <div className="text-sm text-zinc-700">
          <span className="mr-2">Base:</span>
          <b>₹{price}</b>
          {compareAt ? <span className="ml-2 text-zinc-500 line-through">₹{compareAt}</span> : null}
          <span className="ml-3">Total now:</span>
          <b className="ml-1 text-pink-700">₹{total}</b>
        </div>
        <Button
          onClick={onFillDetails}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600 to-fuchsia-600 px-5 py-5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
        >
          <span className="relative z-10">Fill your details</span>
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full [mask-image:linear-gradient(90deg,transparent,black,transparent)]"
          />
        </Button>
      </div>
    </div>
  );
}
