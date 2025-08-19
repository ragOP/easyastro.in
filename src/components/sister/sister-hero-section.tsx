"use client";
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';

export default function SisterHeroSection3() {
  const router = useRouter();

  const handleGenerateSoulmate = () => {
    router.push('/cart');
  };

  return (
    <div className="relative overflow-hidden font-['Inter']">
      {/* Romantic Dreamy Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">
        {/* Soft Watercolor Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(251,113,133,0.12)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(139,92,246,0.08)_0%,transparent_50%)]"></div>



        {/* Slow Motion Fog/Mist Effect */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-white/20 to-pink-100/20 rounded-full blur-2xl animate-[fog_drift_25s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-white/20 to-violet-100/20 rounded-full blur-2xl animate-[fog_drift_20s_ease-in-out_infinite_reverse]"></div>

        {/* Subtle Rose Petals */}
        <div className="absolute top-1/3 left-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-rose-300/25 to-transparent rounded-full rotate-12 animate-[petal_float_18s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-1 bg-gradient-to-r from-transparent via-pink-300/25 to-transparent rounded-full -rotate-6 animate-[petal_float_15s_ease-in-out_infinite_reverse]"></div>

        {/* Love Letters Corner */}
        <div className="absolute top-8 right-8 w-16 h-20 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-lg transform rotate-12 animate-[letter_float_12s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-8 left-8 w-12 h-16 bg-gradient-to-br from-pink-200/20 to-violet-200/20 rounded-lg transform -rotate-12 animate-[letter_float_10s_ease-in-out_infinite_2s]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          {/* Sketch Border Container */}
          <div className="relative">
            {/* Sketch Border Doodles */}
            <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-amber-400/60 rounded-full animate-[sketch_spin_20s_linear_infinite]"></div>
            <div className="absolute -top-6 -right-6 w-8 h-8 border-2 border-yellow-400/60 rounded-full animate-[sketch_spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute -bottom-6 -left-6 w-10 h-10 border-2 border-orange-400/60 rounded-full animate-[sketch_spin_18s_linear_infinite]"></div>
            <div className="absolute -bottom-6 -right-6 w-6 h-6 border-2 border-amber-400/60 rounded-full animate-[sketch_spin_12s_linear_infinite_reverse]"></div>

            {/* Corner Sketch Lines */}
            <div className="absolute -top-4 -left-4 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transform rotate-45"></div>
            <div className="absolute -top-4 -right-4 w-6 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transform -rotate-45"></div>
            <div className="absolute -bottom-4 -left-4 w-7 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transform -rotate-45"></div>
            <div className="absolute -bottom-4 -right-4 w-5 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transform rotate-45"></div>

            {/* Main Headline with Gold Foil Gradient */}
            <div className="mb-4">
              <h1 className="font-['Outfit'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-rose-800 mb-6 leading-[1.1] tracking-tight">
                <span className="block mb-2 text-rose-900">What If I Told You...</span>
                <span className="block text-rose-700 mb-2">Your Soulmate's Face Can Be</span>
                <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(216,70,239,0.45)] animate-[golden_shimmer_3s_ease-in-out_infinite]">
                  Revealed TODAY?
                </span>
              </h1>
            </div>

          </div>

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

          {/* Subtitle with Sketch Border */}
          <div className="relative mb-4 sm:mb-6 max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
            {/* Sketch Border Elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-2 border-pink-300/60 rounded-full animate-[sketch_bounce_3s_ease-in-out_infinite]"></div>
            <div className="absolute -top-3 -right-3 w-4 h-4 border-2 border-violet-300/60 rounded-full animate-[sketch_bounce_3s_ease-in-out_infinite_1s]"></div>
            <div className="absolute -bottom-3 -left-3 w-5 h-5 border-2 border-rose-300/60 rounded-full animate-[sketch_bounce_3s_ease-in-out_infinite_2s]"></div>
            <div className="absolute -bottom-3 -right-3 w-3 h-3 border-2 border-pink-300/60 rounded-full animate-[sketch_bounce_3s_ease-in-out_infinite_3s]"></div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-800 leading-relaxed font-semibold">
              Tired of failed talking stages, ghosting, or waiting for the "right one"?
              <span className="font-bold text-amber-600"> Astrology + Psychic Art </span>
              now brings you the face of the person you're destined to meet.
            </p>
          </div>

          {/* Chip Section Below Image with Sketch Border */}
          <div className="relative mb-6 flex justify-center w-full">
            {/* Sketch Border Elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-2 border-amber-400/60 rounded-full animate-[sketch_spin_12s_linear_infinite]"></div>
            <div className="absolute -top-3 -right-3 w-5 h-5 border-2 border-yellow-400/60 rounded-full animate-[sketch_spin_10s_linear_infinite_reverse]"></div>
            <div className="absolute -bottom-3 -left-3 w-4 h-4 border-2 border-orange-400/60 rounded-full animate-[sketch_spin_14s_linear_infinite]"></div>
            <div className="absolute -bottom-3 -right-3 w-3 h-3 border-2 border-amber-400/60 rounded-full animate-[sketch_spin_8s_linear_infinite_reverse]"></div>

            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 w-fit border-2 border-amber-300 rounded-full px-6 py-2 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-amber-800 font-bold text-base">
                ⚡ 9,427 sketches revealed this week<br />
                – Don't be the one left wondering.
              </span>
            </div>
          </div>

          <SisterCtaButton onClick={handleGenerateSoulmate} />
        </div>
      </div>
    </div>
  );
} 