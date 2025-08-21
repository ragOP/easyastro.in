"use client";
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Sister2CtaButton from './sister2-cta-button';
import { Pencil } from 'lucide-react';

export default function Sister2HowItWorks() {
  const router = useRouter();

  const handleGetSoulmateSketch = () => {
    router.push('/sister2-cart');
  };

  return (
    <div className="relative overflow-hidden font-['Montserrat'] sister2-how-it-works-section">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/easyastro-sister-bg.jpg"
          alt="Sister Background"
          fill
          className="object-cover"
          priority
        />
        {/* Custom Gradient Overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(55, 24, 71, 0.8) 0%, rgba(113, 33, 79, 0.8) 50%, rgba(51, 22, 55, 0.8) 100%)'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-2">
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 relative">
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
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>
                <div className="relative p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/20 flex-shrink-0">
                    1
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-white mb-1">
                      Drop Your Details
                    </h3>
                    <p className="text-gray-300 text-sm leading-tight">
                      Name, DOB & Birth Details
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>
                <div className="relative p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/20 flex-shrink-0">
                    2
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-white mb-1">
                      Astrologers Decode
                    </h3>
                    <p className="text-gray-300 text-sm leading-tight">
                      Your love destiny (no generic fluff)
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>
                <div className="relative p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/20 flex-shrink-0">
                    3
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-white mb-1">
                      Psychic Artist Draws
                    </h3>
                    <p className="text-gray-300 text-sm leading-tight">
                      Your soulmate with spooky accuracy
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>
                <div className="relative p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md border-2 border-white/20 flex-shrink-0">
                    4
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-white mb-1">
                      Receive in 24-48 hrs
                    </h3>
                    <p className="text-gray-300 text-sm leading-tight">
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
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 shadow-sm ring-1 ring-white/20">
              <p className="text-white text-sm sm:text-base font-semibold italic">
                Only a few slots open daily — <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">book before midnight !</span>
              </p>
            </div>

            {/* CTA Button using Sister2CtaButton */}
            <div className="max-w-md mx-auto">
              <Sister2CtaButton onClick={handleGetSoulmateSketch} icon={<Pencil className="w-5 h-5" />} position="after">
                Get My Soulmate Sketch Now
              </Sister2CtaButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 