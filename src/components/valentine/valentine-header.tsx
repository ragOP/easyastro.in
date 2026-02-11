"use client";

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
    <header className="relative overflow-hidden border-b border-rose-200/80">
      {/* Nude & pastel gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-pink-50/80 to-rose-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(251,207,232,0.5),transparent)]" />

      {/* Marquee strip — beautiful scrolling ticker */}
      <div className="relative z-10 overflow-hidden border-b border-rose-200/60 bg-gradient-to-r from-pink-200/70 via-rose-200/60 to-pink-200/70 py-2 sm:py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-700"
            >
              {item.icon ? (
                <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-rose-500 text-rose-500 shrink-0" />
              ) : null}
              <span className="text-rose-700">
                {item.text}
              </span>
              <span className="text-rose-400">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[740px] px-4 py-3 sm:py-4">
        <div className="flex flex-col items-center gap-3">
          {/* Urgency section */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-100/90 via-rose-100/80 to-pink-100/90 border border-rose-200 shadow-sm backdrop-blur-sm">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
              </span>
              Valentine Week Ends Soon
            </span>
            <span className="text-rose-400 text-xs hidden sm:inline">|</span>
            <span className="text-xs sm:text-sm text-rose-700">
              Claim Soulmate + 3 FREE Readings now
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
