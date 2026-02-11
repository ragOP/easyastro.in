"use client";

import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

const MARQUEE_ITEMS = [
  { text: "✨ Soulmate Sketch", icon: Heart },
  { text: "💕 Limited Valentine Offer", icon: null },
  { text: "🌟 3 FREE Readings Included", icon: Sparkles },
  { text: "💖 24–48h Delivery", icon: null },
  { text: "💗 Personalised for You", icon: null },
  { text: "✨ Soulmate Sketch", icon: Heart },
  { text: "💕 Limited Valentine Offer", icon: null },
  { text: "🌟 3 FREE Readings Included", icon: Sparkles },
  { text: "💖 24–48h Delivery", icon: null },
  { text: "💗 Personalised for You", icon: null },
];

export default function ValentineHeader() {
  return (
    <header className="relative overflow-hidden border-b border-rose-500/20">
      {/* Match Valentine page dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0508] via-[#1a0a0f] to-[#0f0508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(190,24,93,0.15),transparent)]" />

      {/* Marquee strip — beautiful scrolling ticker */}
      <div className="relative z-10 overflow-hidden border-b border-rose-500/15 bg-gradient-to-r from-rose-950/80 via-pink-950/60 to-rose-950/80 py-2 sm:py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-200/95"
            >
              {item.icon ? (
                <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-rose-400 text-rose-400 shrink-0" />
              ) : null}
              <span className="bg-gradient-to-r from-rose-100 to-pink-100 bg-clip-text text-transparent">
                {item.text}
              </span>
              <span className="text-rose-500/50">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[740px] px-4 py-3 sm:py-4">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020%202025.png"
            alt="EASY ASTRO"
            width={240}
            height={60}
            priority
            className="w-44 sm:w-56 h-auto opacity-95"
          />
          {/* Urgency section — compact, after logo */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500/20 via-pink-500/15 to-rose-500/20 border border-rose-400/30 backdrop-blur-sm">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
              </span>
              Valentine Week Ends Soon
            </span>
            <span className="text-rose-400/60 text-xs hidden sm:inline">|</span>
            <span className="text-xs sm:text-sm text-rose-200/90">
              Claim Soulmate + 3 FREE Readings now
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
