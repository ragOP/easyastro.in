"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Sister2CtaButton from './sister2-cta-button';
import { Sparkles, Heart, Eye, Clock } from 'lucide-react';

export default function WhatIsItAbout() {
  const router = useRouter();

  const handleGetSoulmateSketch = () => {
    router.push('/sister2-cart');
  };

  const features = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "See Their Face",
      description: "Get a detailed sketch of your soulmate's actual appearance"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Know Their Heart",
      description: "Discover personality traits and what makes them special"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Timing is Everything",
      description: "Learn exactly when and where you'll meet them"
    }
  ];

  return (
    <div className="py-8 px-4 bg-[#1e1219]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
            <Sparkles className="h-4 w-4 text-[rgb(224,82,177)]" />
            <span className="text-white text-sm font-medium">Revolutionary Technology</span>
          </div>
          
          <h2 className="font-['Montserrat'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            What Is It <span className="text-[rgb(224,82,177)]">About?</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We combine <span className="font-bold text-[rgb(224,82,177)]">ancient wisdom</span> with <span className="font-bold text-[rgb(224,82,177)]">modern technology</span> to show you the face of your destined love before you even meet them.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 shadow-[0_8px_25px_rgba(224,82,177,0.15),0_4px_15px_rgba(224,82,177,0.1),-8px_0_20px_rgba(224,82,177,0.08),8px_0_20px_rgba(224,82,177,0.08)]">
              <div className="bg-gradient-to-r from-[rgb(224,82,177)] to-[rgb(200,70,160)] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <Sister2CtaButton
          onClick={handleGetSoulmateSketch}
          icon={<Sparkles className="w-5 h-5" />}
          className="text-lg px-8 py-3"
        >
          Reveal My Soulmate Now
        </Sister2CtaButton>

      </div>
    </div >
  );
}

// {/* <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden">
// {/* Animated Border */}
// <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-300/40 via-yellow-300/40 to-amber-300/40 bg-[length:200%_100%] animate-gradient"></div>
// <div className="absolute inset-[2px] bg-[#1e1219] rounded-2xl"></div>
// <div className="relative z-10">
//   <h3 className="text-2xl font-bold text-white mb-6 text-center">
//     What You'll Receive
//   </h3>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     <div className="space-y-4">
//       <div className="flex items-start gap-3">
//         <span className="text-green-400 text-lg mt-0.5">✅</span>
//         <div>
//           <span className="font-semibold text-white">Vedic Astrology</span>
//           <span className="text-white/80"> – Who, When & How you'll meet them</span>
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <span className="text-blue-400 text-lg mt-0.5">✅</span>
//         <div>
//           <span className="font-semibold text-white">Numerology</span>
//           <span className="text-white/80"> – The vibes that connect you two</span>
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <span className="text-purple-400 text-lg mt-0.5">✅</span>
//         <div>
//           <span className="font-semibold text-white">Psychic Vision</span>
//           <span className="text-white/80"> – Your soulmate's actual face</span>
//         </div>
//       </div>
//     </div>

//     <div className="space-y-4">
//       <div className="flex items-start gap-3">
//         <span className="text-amber-400 text-lg mt-0.5">✨</span>
//         <div>
//           <span className="font-semibold text-white">Detailed Sketch</span>
//           <span className="text-white/80"> – High-quality digital portrait</span>
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <span className="text-pink-400 text-lg mt-0.5">💝</span>
//         <div>
//           <span className="font-semibold text-white">Love Reading</span>
//           <span className="text-white/80"> – Personality traits & timeline</span>
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <span className="text-emerald-400 text-lg mt-0.5">🔒</span>
//         <div>
//           <span className="font-semibold text-white">100% Private</span>
//           <span className="text-white/80"> – Delivered confidentially</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div> */}