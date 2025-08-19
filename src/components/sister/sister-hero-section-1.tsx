"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';

export default function SisterHeroSection() {
  const router = useRouter();

  const handleRevealSoulmate = () => {
    router.push('/cart');
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-6 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
        {/* Title */}
        <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-3 leading-tight tracking-tight px-2">
          What If I Told You...<br />
          <span className="text-slate-800">Your Soulmate's Face Can Be</span><br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
            Revealed TODAY?
          </span>
        </h1>

        {/* Image with Glass Morphism */}
        <div className="mb-8 sm:mb-10 flex justify-center px-2">
          <div className="relative w-full max-w-4xl">
            {/* Glass Morphism Background - More Visible */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-3xl border-2 border-white/50 shadow-2xl"></div>

            {/* Image Container */}
            <div className="relative p-4">
              <Image
                src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                alt="Soulmate Sketch Example"
                className="w-full rounded-3xl shadow-2xl border-4 border-white/30 object-cover transform rotate-1 hover:rotate-0 transition-transform duration-500"
                priority
                width={500}
                height={500}
              />

              {/* Artistic Frame Elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white/50 shadow-lg"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-white/50 shadow-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full border-2 border-white/50 shadow-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full border-2 border-white/50 shadow-lg"></div>

              {/* Artistic Corner Decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-purple-400/60 rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-blue-400/60 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-pink-400/60 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-indigo-400/60 rounded-br-3xl"></div>

              {/* Artistic Brush Strokes Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none"></div>
            </div>

            {/* Decorative glow - hidden on mobile for performance */}
            <div className="hidden md:block absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-4 sm:mb-6 max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
            Tired of failed talking stages, ghosting, or waiting for the "right one"?
            <span className="font-semibold text-slate-800"> Astrology + Psychic Art </span>
            now brings you the face of the person you're destined to meet.
          </p>
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-indigo-200 max-w-full">
            <span className="text-lg sm:text-2xl">⚡</span>
            <p className="text-sm sm:text-lg font-bold text-indigo-700 leading-tight">
              9,427 sketches revealed this week – Don't be the one left wondering.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center px-4">
          <SisterCtaButton onClick={handleRevealSoulmate} />
        </div>
      </div>
    </div>
  );
} 