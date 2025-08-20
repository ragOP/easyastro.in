"use client";
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';

export default function SisterHeroSection() {
  const router = useRouter();

  const handleGenerateSoulmate = () => {
    router.push('/cart');
  };

  return (
    <div className="relative overflow-hidden font-['Inter']">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          {/* Main Headline */}
          <div className="mb-4">
            <h1 className="font-['Outfit'] text-2xl sm:text-4xl align-left md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-pink-600 mb-6 leading-[1.1] tracking-tight">
              <span className="block mb-2 text-pink-600">What If I Told You...</span>
              <span className="block mb-2 text-pink-600">Your Soulmate's Face Can Be</span>
              <span className="block text-pink-600">
                Revealed TODAY?
              </span>
            </h1>
          </div>

          {/* Simple Image */}
          <Image
            src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
            alt="Soulmate Sketch Example"
            className="w-full max-w-4xl mx-auto mb-8 rounded-3xl object-cover"
            priority
            width={500}
            height={500}
          />

          {/* Subtitle */}
          <div className="mb-4 sm:mb-6 max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-800 leading-relaxed font-semibold">
              Tired of failed talking stages, ghosting, or waiting for the "right one"?
              <span className="font-bold text-amber-600"> Astrology + Psychic Art </span>
              now brings you the face of the person you're destined to meet.
            </p>
          </div>

          {/* Simple Chip Section */}
          <div className="mb-6 flex justify-center w-full">
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 w-fit border-2 border-amber-300 rounded-full px-6 py-2 shadow-lg">
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