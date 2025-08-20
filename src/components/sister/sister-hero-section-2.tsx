"use client";
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';
import { Pen } from 'lucide-react';
import { LampContainer } from '../ui/lamp';

export default function SisterHeroSection2() {
  const router = useRouter();

  const handleRevealSoulmate = () => {
    router.push('/cart');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-violet-50">
 

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-6">
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center mb-4">
          {/* Creative Title with Fixed Gradient */}
          <h1 className="font-montserrat tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 leading-tight">
            <span className="bg-gradient-to-r  from-rose-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
              Reveal Your Soulmate's Face Today ✨
            </span>
          </h1>

          {/* Stats Chip moved below image */}
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-rose-100 to-pink-100 px-8 py-3 rounded-full border border-rose-200 max-w-full">
              <p className="text-sm sm:text-lg font-bold text-rose-700 leading-tight">
                🎨 9,427 sketches revealed this week 
              </p>
            </div>
          </div>

          {/* Plain Image with Glass Morphism */}
          <div className="mb-4 sm:mb-4 flex">
            <div className="w-full">
              {/* Glass Morphism Background */}
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-2 shadow-lg">
                <Image
                  src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                  alt="Soulmate Sketch Example"
                  className="w-full object-cover rounded-lg"
                  priority
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>

          {/* Creative Subtitle with Colors */}
          <div className="mb-6 max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
              <span className="text-rose-600 font-semibold">💔 Tired of failed talking stages, ghosting, or waiting for the "right one"?</span><br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600">🌟 Astrology + Psychic Art 🌟</span><br />
              <span className="text-blue-600 font-semibold">now brings you the face of the person you're destined to meet. ✨</span>
            </p>
          </div>

          {/* CTA Button */}
          <SisterCtaButton onClick={handleRevealSoulmate} icon={<Pen />} className='px-0'>Generate My Solumate Sketch</SisterCtaButton>
        </div>
      </div>
    </div>
  );
} 