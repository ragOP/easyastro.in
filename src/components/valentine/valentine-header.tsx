"use client";

import Image from "next/image";

export default function ValentineHeader() {
  return (
    <header className="relative overflow-hidden border-b border-rose-500/20">
      {/* Match Valentine page dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0508] via-[#1a0a0f] to-[#0f0508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(190,24,93,0.15),transparent)]" />

      <div className="relative z-10 mx-auto max-w-[740px] px-4 py-3 sm:py-4">
        <div className="flex items-center justify-center">
          <Image
            src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020%202025.png"
            alt="EASY ASTRO"
            width={240}
            height={60}
            priority
            className="w-44 sm:w-56 h-auto opacity-95"
          />
        </div>
      </div>
    </header>
  );
}
