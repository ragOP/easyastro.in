"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';

export default function SisterWhatIsIt() {
  const router = useRouter();

  const handleGetSoulmateSketch = () => {
    router.push('/cart');
  };

  return (
    <div className="py-6 px-4">
      {/* Section Header */}
      <div className="text-center mb-2">
        <div className='mb-8'>
          <h3 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 relative">
            What Is It Really?
            {/* Decorative Underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full"></div>
          </h3>
        </div>

        {/* Hook Line */}
        <div className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            💌 "Not Just a Drawing... It's a Glimpse Into YOUR Love Story."
          </p>
        </div>
        
        {/* Sketch Image */}
        <div className="mb-6">
          <img 
            src="/sketch-1.jpeg" 
            alt="Soulmate Sketch Example 1" 
            className="w-full max-w-md mx-auto rounded-2xl shadow-lg border-2 border-white/30"
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features */}
        <div className="space-y-6">
          <p className="text-slate-700 text-lg leading-relaxed">
            This report is a combo of <span className="font-semibold text-slate-800">science + spirit</span>:
          </p>

                        {/* Feature List */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-lg mt-0.5">✅</span>
                  <div>
                    <span className="font-semibold text-slate-800">Vedic Astrology</span>
                    <span className="text-slate-600"> – Who, When & How you'll meet them</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-lg mt-0.5">✅</span>
                  <div>
                    <span className="font-semibold text-slate-800">Numerology</span>
                    <span className="text-slate-600"> – The vibes that connect you two</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 text-lg mt-0.5">✅</span>
                  <div>
                    <span className="font-semibold text-slate-800">Psychic Vision</span>
                    <span className="text-slate-600"> – Your soulmate's actual face</span>
                  </div>
                </div>
              </div>

          <p className="text-slate-700 text-lg leading-relaxed">
            Plus: A mini love reading with <span className="font-semibold text-slate-800">personality traits + meeting timeline</span>.
          </p>
        </div>

        {/* Right Side - Offer & CTA */}
        <div className="text-center space-y-6">
          {/* Special Offer */}
          <div className="bg-slate-100 rounded-full px-4 py-4 shadow-sm border border-slate-200">
            <p className="text-slate-800 text-base font-semibold">🔥 50% OFF for early access today only</p>
          </div>

          {/* CTA Button */}
          <SisterCtaButton onClick={handleGetSoulmateSketch}>
            Unlock My Soulmate Reading
          </SisterCtaButton>
        </div>
      </div>
    </div>
  );
} 