"use client";
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Pen, Sparkles, Heart, Zap } from 'lucide-react';
import Sister2CtaButton from './sister2-cta-button';
import { Users, Star, Clock, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-9 w-9 sm:h-8 sm:w-8 text-white" />,
    value: "100,000+",
    label: "Happy Clients",
  },
  {
    icon: <Star className="h-9 w-9 sm:h-8 sm:w-8 text-white" />,
    value: "4.8/5",
    label: "Average Rating",
  },
  {
    icon: <Clock className="h-9 w-9 sm:h-8 sm:w-8 text-white" />,
    value: "24 Hours",
    label: "Delivered Privately",
  },
  {
    icon: <ShieldCheck className="h-9 w-9 sm:h-8 sm:w-8 text-white" />,
    value: "100%",
    label: "Safe & Confidential",
  },
];


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
          background: 'linear-gradient(90deg, rgba(55, 24, 71, 0.6) 0%, rgba(113, 33, 79, 0.6) 50%, rgba(51, 22, 55, 0.6) 100%)'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-2">
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          {/* Three Icons at Top */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <Heart className="w-8 h-8 text-pink-400 animate-pulse drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]" />
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>

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

          {/* Stats Section - Now properly positioned and styled */}
          <div className="mt-8 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 shadow-lg">
                    {React.cloneElement(stat.icon, { className: 'h-5 w-5 text-white' })}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/90 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 