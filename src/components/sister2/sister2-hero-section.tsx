"use client";
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Pen } from 'lucide-react';
import { LampContainer } from '../ui/lamp';
import Sister2CtaButton from './sister2-cta-button';

export default function Sister2HeroSection() {
  const router = useRouter();

  const handleRevealSoulmate = () => {
    router.push('/sister2-cart');
  };

  return (
    <div className="relative overflow-hidden font-['Montserrat'] sister2-hero-section">
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
      <div className="relative z-10 flex items-center justify-center py-6">
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center mb-4">
          {/* Simple Title */}
          <h1 className="font-montserrat tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 leading-tight text-white">
            Reveal Your Soulmate's Face Today ✨
          </h1>

          {/* Stats Chip moved below image */}
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/30 max-w-full shadow-lg">
              <p className="text-sm sm:text-lg font-bold text-white leading-tight">
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

          {/* Simple Subtitle */}
          <div className="mb-6 max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-medium">
              <span className="text-white font-semibold">💔 Tired of failed talking stages, ghosting, or waiting for the "right one"?</span><br />
              <span className="font-bold text-amber-300">🌟 Astrology + Psychic Art 🌟</span><br />
              <span className="text-white font-semibold">now brings you the face of the person you're destined to meet. ✨</span>
            </p>
          </div>

          {/* CTA Button */}
          <Sister2CtaButton onClick={handleRevealSoulmate} icon={<Pen />} className='px-0'>Generate My Solumate Sketch</Sister2CtaButton>
        </div>
      </div>
    </div>
  );
} 