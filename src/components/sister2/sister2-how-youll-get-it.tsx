"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Sister2CtaButton from './sister2-cta-button';

export default function Sister2HowYoullGetIt() {
  const router = useRouter();

  const handleGetSoulmateSketch = () => {
    router.push('/sister2-cart');
  };

  return (
    <div className="py-6 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Section Header */}
      <div className="text-center">
        <h3 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 relative">
          How You'll Get It
          {/* Decorative Underline */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full"></div>
        </h3>
        
        {/* Hook Line */}
        <div className="inline-block bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            ⚡ "Delivered Like Magic, But 100% Real."
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Delivery Details */}
        <div className="space-y-6">
          {/* Delivery Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">●</span>
              </div>
              <div>
                <span className="text-gray-300 text-lg">Your sketch + love reading sent in <br /> <span className="font-semibold text-white">24–48 hrs</span></span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">●</span>
              </div>
              <div>
                <span className="text-gray-300 text-lg">High-res, digital format <span className="text-gray-400">(share it or keep it secret 👀)</span></span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">●</span>
              </div>
              <div>
                <span className="text-gray-300 text-lg">Sent directly to your <span className="font-semibold text-white">WhatsApp & Email</span></span>
              </div>
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-400/30">
            <p className="text-gray-300 text-base">
              💬 <span className="font-semibold text-white">Average delivery: 27 hours.</span> People can't stop sharing theirs!
            </p>
          </div>
        </div>

        {/* Right Side - CTA */}
        <div className="text-center">
          {/* CTA Button */}
          <div className="max-w-md mx-auto">
            <Sister2CtaButton onClick={handleGetSoulmateSketch}>
              👉 Order My Soulmate Sketch
            </Sister2CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
} 