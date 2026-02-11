"use client";

import React from "react";

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

// Brighter, more visible pastel colors (higher opacity for hero prominence)
const PASTEL_COLORS = [
  "rgba(253, 242, 248, 0.98)",   // pink-100
  "rgba(251, 207, 232, 0.98)",   // pink-200
  "rgba(254, 205, 211, 0.95)",   // rose-200
  "rgba(255, 228, 230, 0.95)",   // rose-100
  "rgba(243, 229, 245, 0.95)",   // purple-100
  "rgba(233, 213, 255, 0.95)",   // violet-200
  "rgba(252, 231, 243, 0.98)",   // pink-100 alt
  "rgba(249, 168, 212, 0.9)",    // pink-300
  "rgba(244, 114, 182, 0.88)",   // pink-400
  "rgba(251, 113, 133, 0.9)",    // rose-400
  "rgba(253, 164, 175, 0.95)",   // rose-300
  "rgba(216, 180, 254, 0.9)",    // violet-300
];

// Generate lots of hearts — filled screen, deterministic for SSR
function generateHearts(count: number) {
  const hearts: {
    size: number;
    left: string;
    top: string;
    delay: number;
    duration: number;
    colorIndex: number;
    animation: "float" | "pop" | "burst";
    popDelay: number;
  }[] = [];
  for (let i = 0; i < count; i++) {
    const left = `${(i * 5 + (i % 11) * 9) % 97}%`;
    const top = `${(i * 7 + (i % 17) * 6) % 95}%`;
    const size = 14 + (i % 6) * 5 + (i % 4); // 14–42px
    const colorIndex = i % PASTEL_COLORS.length;
    const delay = (i % 25) * 0.2;
    const duration = 3.5 + (i % 5) * 1.2;
    const animChoice = i % 3;
    const animation: "float" | "pop" | "burst" =
      animChoice === 0 ? "float" : animChoice === 1 ? "pop" : "burst";
    const popDelay = (i % 20) * 0.35;
    hearts.push({
      size,
      left,
      top,
      delay,
      duration,
      colorIndex,
      animation,
      popDelay,
    });
  }
  return hearts;
}

const HEARTS = generateHearts(90);

export default function PastelHearts() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      aria-hidden
    >
      {HEARTS.map((h, i) => {
        const animClass =
          h.animation === "float"
            ? "animate-float-heart"
            : h.animation === "pop"
              ? "animate-heart-pop"
              : "animate-heart-burst";
        return (
          <div
            key={i}
            className={`absolute ${animClass}`}
            style={{
              left: h.left,
              top: h.top,
              width: h.size,
              height: h.size,
              animationDelay:
                h.animation === "float"
                  ? `${h.delay}s`
                  : `${h.popDelay}s`,
              animationDuration:
                h.animation === "float"
                  ? `${h.duration}s`
                  : undefined,
              animationIterationCount: h.animation === "pop" ? "infinite" : undefined,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full drop-shadow-lg"
              style={{
                fill: PASTEL_COLORS[h.colorIndex % PASTEL_COLORS.length],
                filter: "drop-shadow(0 0 10px rgba(255,182,193,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
              }}
            >
              <path d={HEART_PATH} />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
