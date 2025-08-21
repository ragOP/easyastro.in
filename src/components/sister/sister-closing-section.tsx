"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SisterClosingSection() {
  const router = useRouter();

  const handleGetSoulmateSketch = () => {
    router.push('/sister-cart');
  };

  return (
    <div className="py-6 mb-16 px-4 text-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Soft Watercolor Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.06)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(239,68,68,0.05)_0%,transparent_50%)]"></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-xl animate-[float_20s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-xl animate-[float_25s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Hook Line */}
        <div className="mb-12">
          <div className="inline-block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              💫 "Your love story shouldn't stay a mystery. See their face now!"
            </p>
          </div>

          {/* Decorative Underline */}
          <div className="w-32 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full mx-auto"></div>
        </div>

        {/* Final Big CTA Button */}
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleGetSoulmateSketch}
            className="relative w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white font-black text-xl sm:text-2xl md:text-3xl px-8 py-6 rounded-3xl shadow-2xl transform hover:scale-105 hover:shadow-orange-500/50 transition-all duration-300 active:scale-95 overflow-hidden group border-4 border-white/20"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Button Content */}
            <span className="relative z-10 flex items-center justify-center gap-4">
              <span className="text-2xl sm:text-3xl">🔥</span>
              <span>Reveal My Soulmate TODAY – Limited Slots</span>
              <span className="text-2xl sm:text-3xl">✨</span>
            </span>

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-3xl bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-xl -z-10"></div>
          </button>

          {/* Additional Urgency Message */}
          <div className="mt-6">
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              ⏰ <span className="font-semibold text-slate-700">Last chance today</span> – Don't let your soulmate wait another day!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 