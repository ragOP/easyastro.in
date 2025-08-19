"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';

export default function SisterWhyYouNeedThis() {
  const router = useRouter();

  const handleGetSoulmateSketch = () => {
    router.push('/cart');
  };

  return (
    <div className="py-6 px-4">
      {/* Section Header */}
      <div className="text-center mb-2">
        <h3 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-10 relative">
          Why You Need This
          {/* Decorative Underline */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"></div>
        </h3>

        {/* Hook Line */}
        <div className="inline-block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            😩 "Ghosted Again? Wrong people? Wrong timing?"
          </p>
        </div>
        
        {/* Sketch Image */}
        <div className="mb-6">
          <img 
            src="/sketch-2.jpeg" 
            alt="Soulmate Sketch Example 2" 
            className="w-full max-w-md mx-auto rounded-2xl shadow-lg border-2 border-white/30"
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Pain Points & Benefits */}
        <div className="space-y-6">
          {/* Introduction */}

          <p className="text-slate-700 text-lg leading-relaxed">
            This isn't just curiosity — it's <span className="font-semibold text-slate-800">clarity</span>.
          </p>

          <div className="text-center mb-4">
            <div className="inline-block bg-slate-100 rounded-full px-6 py-3 shadow-sm border border-slate-200">
              <p className="text-slate-800 text-base font-semibold">With a soulmate sketch, you'll:</p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">●</span>
              </div>
              <div>
                <span className="text-slate-700 text-lg">Stop wasting time on <span className="font-semibold text-slate-800">dead-end love stories</span></span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">●</span>
              </div>
              <div>
                <span className="text-slate-700 text-lg">Get <span className="font-semibold text-slate-800">REAL insight</span> into when & where you'll meet them</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">●</span>
              </div>
              <div>
                <span className="text-slate-700 text-lg">Feel the reassurance that <span className="font-semibold text-slate-800">true love is destined for YOU</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Urgency & CTA */}
        <div className="text-center space-y-6">
          {/* Urgency Message */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/50">
            <p className="text-slate-700 text-base">
              👀 <span className="font-semibold text-slate-800">Over 1,000 people are on this page right now.</span> Don't wait till tomorrow.
            </p>
          </div>

          {/* CTA Button */}
          <div className="max-w-md mx-auto">
            <SisterCtaButton onClick={handleGetSoulmateSketch}>
              👉 Yes! Show Me My Soulmate
            </SisterCtaButton>
          </div>
        </div>
      </div>
    </div>
  );
} 