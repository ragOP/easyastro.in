"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';
import { Pencil } from 'lucide-react';

export default function SisterHowItWorks() {
  const router = useRouter();

  const handleGetSoulmateSketch = () => {
    router.push('/sister-cart');
  };

  return (
    <div className="py-6 bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Soft Watercolor Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(251,113,133,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.03)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(139,92,246,0.02)_0%,transparent_50%)]"></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-rose-200/10 to-pink-200/10 rounded-full blur-lg animate-[float_20s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-violet-200/10 to-purple-200/10 rounded-full blur-lg animate-[float_25s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-2">
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 relative">
            How It Works
            {/* Decorative Underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full"></div>
          </h2>

          {/* Hook Line */}
          <div className="inline-block bg-gradient-to-r mt-6 from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold">
              🔮 "From Your Birth Chart → To Cosmic Energy → To Their Face"
            </p>
          </div>
        </div>

        {/* Creative Steps Layout */}
        <div className="relative mb-8">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/70 backdrop-blur-lg rounded-xl border border-white/60 shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/80 flex-shrink-0">
                  1
                </div>
                <div className="text-left">
                  <h3 className="text-base font-semibold text-slate-800 mb-1">
                    Drop Your Details
                  </h3>
                  <p className="text-slate-600 text-sm leading-tight">
                    Name, DOB & Birth Details
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/70 backdrop-blur-lg rounded-xl border border-white/60 shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/80 flex-shrink-0">
                  2
                </div>
                <div className="text-left">
                  <h3 className="text-base font-semibold text-slate-800 mb-1">
                    Astrologers Decode
                  </h3>
                  <p className="text-slate-600 text-sm leading-tight">
                    Your love destiny (no generic fluff)
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/70 backdrop-blur-lg rounded-xl border border-white/60 shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/80 flex-shrink-0">
                  3
                </div>
                <div className="text-left">
                  <h3 className="text-base font-semibold text-slate-800 mb-1">
                    Psychic Artist Draws
                  </h3>
                  <p className="text-slate-600 text-sm leading-tight">
                    Your soulmate with spooky accuracy
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/70 backdrop-blur-lg rounded-xl border border-white/60 shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/80 flex-shrink-0">
                  4
                </div>
                <div className="text-left">
                  <h3 className="text-base font-semibold text-slate-800 mb-1">
                    Receive in 24-48 hrs
                  </h3>
                  <p className="text-slate-600 text-sm leading-tight">
                    WhatsApp + Email delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Urgency + CTA Section */}
        <div className="text-center space-y-6">
          {/* Urgency Message (non-CTA) */}
          <div className="inline-flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-800 text-sm sm:text-base font-semibold italic">
              Only a few slots open daily — <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">book before midnight !</span>
            </p>
          </div>

          {/* CTA Button using SisterCtaButton */}
          <div className="max-w-md mx-auto">
            <SisterCtaButton onClick={handleGetSoulmateSketch} icon={<Pencil className="w-5 h-5" />} position="after">
              Get My Soulmate Sketch Now
            </SisterCtaButton>
          </div>
        </div>
      </div>
    </div>
  );
} 