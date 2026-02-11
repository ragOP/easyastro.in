"use client";

import React from "react";

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const TYPES = ["red", "pastel", "striped", "polka", "bubble", "gift"] as const;

// Deterministic "random" for reproducible positions (seeded by index)
function seeded(i: number, max: number) {
  return ((i * 1103515245 + 12345) & 0x7fffffff) % max;
}

// Generate ~20x more hearts: dense edges + filled everywhere (including center)
function generateAllItems(): Array<{ left: string; top: string; size: number; type: (typeof TYPES)[number]; rotate: number }> {
  const items: Array<{ left: string; top: string; size: number; type: (typeof TYPES)[number]; rotate: number }> = [];
  const sizes = [18, 20, 22, 24, 26, 28, 30, 32];

  // Dense top band (multiple rows)
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 35; col++) {
      const i = items.length;
      items.push({
        left: `${(col / 34) * 100}%`,
        top: `${(row / 7) * 6}%`,
        size: sizes[seeded(i, sizes.length)],
        type: TYPES[seeded(i, TYPES.length)],
        rotate: (seeded(i, 360) - 180) % 25,
      });
    }
  }
  // Dense bottom band
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 35; col++) {
      const i = items.length;
      items.push({
        left: `${(col / 34) * 100}%`,
        top: `${94 + (row / 7) * 6}%`,
        size: sizes[seeded(i, sizes.length)],
        type: TYPES[seeded(i, TYPES.length)],
        rotate: (seeded(i + 1, 360) - 180) % 25,
      });
    }
  }
  // Dense left band
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 6; col++) {
      const i = items.length;
      items.push({
        left: `${(col / 5) * 5}%`,
        top: `${10 + (row / 24) * 80}%`,
        size: sizes[seeded(i, sizes.length)],
        type: TYPES[seeded(i, TYPES.length)],
        rotate: (seeded(i + 2, 360) - 180) % 25,
      });
    }
  }
  // Dense right band
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 6; col++) {
      const i = items.length;
      items.push({
        left: `${95 + (col / 5) * 5}%`,
        top: `${10 + (row / 24) * 80}%`,
        size: sizes[seeded(i, sizes.length)],
        type: TYPES[seeded(i, TYPES.length)],
        rotate: (seeded(i + 3, 360) - 180) % 25,
      });
    }
  }
  // Fill entire page (center + rest) — grid of hearts everywhere
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 25; col++) {
      const i = items.length;
      const leftPct = 8 + (col / 24) * 84;
      const topPct = 12 + (row / 19) * 76;
      items.push({
        left: `${leftPct}%`,
        top: `${topPct}%`,
        size: sizes[seeded(i, sizes.length)],
        type: TYPES[seeded(i, TYPES.length)],
        rotate: (seeded(i + 4, 360) - 180) % 25,
      });
    }
  }

  return items;
}

const ALL_EDGE_ITEMS = generateAllItems();

const SHADOW_3D = "drop-shadow(2px 4px 6px rgba(0,0,0,0.15)) drop-shadow(0 2px 8px rgba(244,114,182,0.2))";

function HeartRed({ size, rotate }: { size: number; rotate: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ transform: `rotate(${rotate}deg)`, filter: SHADOW_3D }}>
      <path fill="#e11d48" d={HEART_PATH} />
    </svg>
  );
}
function HeartPastel({ size, rotate }: { size: number; rotate: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ transform: `rotate(${rotate}deg)`, filter: SHADOW_3D }}>
      <path fill="#f9a8d4" d={HEART_PATH} />
    </svg>
  );
}
function HeartStriped({ size, rotate, id }: { size: number; rotate: number; id: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ transform: `rotate(${rotate}deg)`, filter: SHADOW_3D }}>
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="4" height="24">
          <rect fill="#fda4af" width="4" height="24" />
          <rect fill="#fff" x="2" width="2" height="24" />
        </pattern>
      </defs>
      <path fill={`url(#${id})`} d={HEART_PATH} />
    </svg>
  );
}
function HeartPolka({ size, rotate, id }: { size: number; rotate: number; id: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ transform: `rotate(${rotate}deg)`, filter: SHADOW_3D }}>
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="6">
          <circle fill="#e11d48" cx="3" cy="3" r="1.2" />
        </pattern>
      </defs>
      <path fill="#fce7f3" d={HEART_PATH} />
      <path fill={`url(#${id})`} d={HEART_PATH} opacity={0.9} />
    </svg>
  );
}
function HeartBubble({ size, rotate }: { size: number; rotate: number }) {
  const pad = 4;
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={{ transform: `rotate(${rotate}deg)`, filter: SHADOW_3D }}>
      <rect x={2} y={2} width={28} height={28} rx={8} fill="#ec4899" opacity={0.9} />
      <path fill="#fff" d="M16 10.35l-1.45-1.32C10.4 6.36 8 4.28 8 2.5 8 1.42 9.42 0 11.5 0c1.74 0 3.41.81 4.5 2.09C17.09 0.81 18.76 0 20.5 0 22.58 0 24 1.42 24 2.5c0 1.78-2.4 3.86-7.55 8.54L16 10.35z" transform="translate(4, 6) scale(0.9)" />
    </svg>
  );
}
function GiftBox({ size, rotate, id }: { size: number; rotate: number; id: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} style={{ transform: `rotate(${rotate}deg)`, filter: SHADOW_3D }}>
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="8" height="8">
          <circle fill="#e11d48" cx="4" cy="4" r="1.5" />
        </pattern>
      </defs>
      {/* box */}
      <path fill={`url(#${id})`} d="M4 20v20h40V20H4z" />
      <path fill="#fce7f3" d="M4 20l20-8 20 8v4H4v-4z" />
      {/* bow */}
      <ellipse fill="#e11d48" cx="24" cy="18" rx="10" ry="6" />
      <circle fill="#e11d48" cx="24" cy="18" r="4" />
      <path fill="#e11d48" d="M14 18v-4l-4 2 4 2zm20 0v-4l4 2-4 2z" />
    </svg>
  );
}

export default function ValentinePastelBg() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {/* Red / dark rose gradient background */}
      <div className="absolute inset-0 bg-[#0f0508]" />
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/60 via-[#0f0508] to-[#0f0508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(190,24,93,0.2),transparent_50%)]" />
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-rose-600/15 blur-[100px]" />
      <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-pink-500/15 blur-[80px]" />

      {/* Lots of hearts everywhere — ~20x more, edges + full page */}
      {ALL_EDGE_ITEMS.map((item, i) => (
        <div
          key={i}
          className="absolute animate-float-heart"
          style={{
            left: item.left,
            top: item.top,
            width: item.size,
            height: item.size,
            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            animationDelay: `${(i % 20) * 0.15}s`,
            animationDuration: "4s",
          }}
        >
          {item.type === "red" && <HeartRed size={item.size} rotate={0} />}
          {item.type === "pastel" && <HeartPastel size={item.size} rotate={0} />}
          {item.type === "striped" && <HeartStriped size={item.size} rotate={0} id={`stripes-${i}`} />}
          {item.type === "polka" && <HeartPolka size={item.size} rotate={0} id={`polka-${i}`} />}
          {item.type === "bubble" && <HeartBubble size={item.size} rotate={0} />}
          {item.type === "gift" && <GiftBox size={item.size} rotate={0} id={`box-${i}`} />}
        </div>
      ))}
    </div>
  );
}
