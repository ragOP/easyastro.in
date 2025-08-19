"use client";
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';

export default function SisterHeroSection2() {
  const router = useRouter();

  const handleRevealSoulmate = () => {
    router.push('/cart');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background with Warm/Romantic Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-200/20 via-orange-200/15 to-amber-200/20 animate-[mesh_10s_ease-in-out_infinite]"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-pink-200/15 via-red-200/10 to-orange-200/15 animate-[mesh_8s_ease-in-out_infinite_reverse]"></div>
        
        {/* Floating Hearts and Stars */}
        <div className="absolute top-16 left-8 text-2xl text-rose-300/40 animate-[heartbeat_4s_ease-in-out_infinite]">💖</div>
        <div className="absolute top-32 right-12 text-xl text-orange-300/40 animate-[heartbeat_3s_ease-in-out_infinite_1s]">💫</div>
        <div className="absolute bottom-40 left-16 text-lg text-pink-300/40 animate-[heartbeat_5s_ease-in-out_infinite_2s]">✨</div>
        <div className="absolute bottom-24 right-8 text-xl text-amber-300/40 animate-[heartbeat_4s_ease-in-out_infinite_3s]">💝</div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/3 left-1/3 w-16 h-16 border border-rose-200/30 rounded-lg rotate-45 animate-[rotate_20s_linear_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border border-orange-200/30 rounded-full animate-[rotate_15s_linear_infinite_reverse]"></div>
        
        {/* Subtle Glow Orbs */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-rose-300/10 to-pink-300/10 rounded-full blur-2xl animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-orange-300/10 to-amber-300/10 rounded-full blur-2xl animate-[pulse_8s_ease-in-out_infinite]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          {/* Title with Warm Theme */}
          <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-800 mb-3 leading-tight tracking-tight px-2">
            What If I Told You...<br />
            <span className="text-slate-700">Your Soulmate's Face Can Be</span><br />
            <span className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent drop-shadow-sm">
              Revealed TODAY?
            </span>
          </h1>

          {/* Image with Romantic Glass Morphism */}
          <div className="mb-8 sm:mb-10 flex justify-center px-2">
            <div className="relative w-full max-w-4xl">
              {/* Glass Morphism Background - Warm Theme */}
              <div className="absolute inset-0 bg-white/50 backdrop-blur-2xl rounded-3xl border-2 border-rose-200/50 shadow-2xl"></div>

              {/* Image Container */}
              <div className="relative p-4">
                <Image
                  src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                  alt="Soulmate Sketch Example"
                  className="w-full rounded-3xl shadow-2xl border-4 border-rose-200/40 object-cover"
                  priority
                  width={500}
                  height={500}
                />

                {/* Romantic Corner Decorations */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full shadow-lg border-2 border-white/50"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full shadow-lg border-2 border-white/50"></div>
              </div>

              {/* Warm Glow Effect */}
              <div className="hidden md:block absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 blur-3xl -z-10"></div>
            </div>
          </div>

          {/* Subtitle with Warm Accents */}
          <div className="mb-8 sm:mb-12 max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
              Tired of failed talking stages, ghosting, or waiting for the "right one"?
              <span className="font-semibold text-slate-800"> Astrology + Psychic Art </span>
              now brings you the face of the person you're destined to meet.
            </p>
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-rose-100 to-orange-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-rose-200 max-w-full">
              <span className="text-lg sm:text-2xl">⚡</span>
              <p className="text-sm sm:text-lg font-bold text-rose-700 leading-tight">
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
    </div>
  );
} 