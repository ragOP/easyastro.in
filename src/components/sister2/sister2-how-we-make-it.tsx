"use client";
import React from 'react';
import { Heart, Eye, Clock, Sparkles, Zap, Shield } from 'lucide-react';
import Sister2CtaButton from './sister2-cta-button';

const steps = [
    {
        step: "01",
        title: "Share Your Details",
        description: "Provide your birth date, time, and location. Tell us what you're looking for in your soulmate.",
        icon: <Heart className="h-8 w-8" />,
        color: "from-[rgb(224,82,177)] to-[rgb(200,70,160)]"
    },
    {
        step: "02",
        title: "Cosmic Analysis",
        description: "Our expert astrologers analyze your birth chart and cosmic energy to understand your soul's journey.",
        icon: <Eye className="h-8 w-8" />,
        color: "from-[rgb(180,60,140)] to-[rgb(160,50,120)]"
    },
    {
        step: "03",
        title: "Psychic Vision",
        description: "Our gifted psychic artists connect with your energy to visualize your destined soulmate's appearance.",
        icon: <Sparkles className="h-8 w-8" />,
        color: "from-[rgb(200,70,160)] to-[rgb(180,60,140)]"
    },
    {
        step: "04",
        title: "Digital Creation",
        description: "We create a high-quality digital sketch using advanced AI and artistic techniques for perfect accuracy.",
        icon: <Zap className="h-8 w-8" />,
        color: "from-[rgb(160,50,120)] to-[rgb(140,40,100)]"
    },
    {
        step: "05",
        title: "Love Reading",
        description: "Get detailed insights about your soulmate's personality, when you'll meet, and your connection.",
        icon: <Clock className="h-8 w-8" />,
        color: "from-[rgb(140,40,100)] to-[rgb(120,30,80)]"
    },
    {
        step: "06",
        title: "Private Delivery",
        description: "Receive your soulmate sketch and reading confidentially via email within 24 hours.",
        icon: <Shield className="h-8 w-8" />,
        color: "from-[rgb(120,30,80)] to-[rgb(100,20,60)]"
    }
];

export default function Sister2HowWeMakeIt() {
    return (
        <div className="py-8 px-4 bg-[#1e1219]">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
                        <Sparkles className="h-4 w-4 text-[rgb(224,82,177)]" />
                        <span className="text-white text-sm font-medium">Our Process</span>
                    </div>

                    <h2 className="font-['Montserrat'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        How Do We <span className="text-[rgb(224,82,177)]">Make It?</span>
                    </h2>

                    <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Discover the magical process behind creating your soulmate sketch using ancient wisdom and modern technology
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
                            {/* Step Number - Top Left */}
                            <div className="absolute top-6 left-4 z-20">
                                <div className="bg-[rgb(224,82,177)] text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                                    {step.step}
                                </div>
                            </div>

                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-4 right-4 w-16 h-16 border border-[rgb(224,82,177)] rounded-full"></div>
                                <div className="absolute bottom-4 left-1/4 w-12 h-12 border border-[rgb(224,82,177)] rounded-full"></div>
                            </div>

                            {/* Card Content */}
                            <div className="relative z-10 p-5">
                                {/* Icon */}
                                <div className={`bg-gradient-to-r ${step.color} p-3 rounded-2xl w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-lg`}>
                                    <div className="text-white">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-bold text-white text-lg mb-2 text-center">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/80 text-sm leading-relaxed text-center">
                                    {step.description}
                                </p>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(224,82,177)]/5 to-[rgb(200,70,160)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </div>
                    ))}
                </div>

        {/* Urgency Chip */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 shadow-sm ring-1 ring-white/20">
            <p className="text-white text-sm sm:text-base font-semibold italic">
              Only a few slots open daily — <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">book before midnight !</span>
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Sister2CtaButton 
            onClick={() => window.location.href = '/sister2-cart'}
            icon={<Sparkles className="w-5 h-5" />}
            className="text-lg px-8 py-3"
          >
            Start My Soulmate Reading
          </Sister2CtaButton>
        </div>
      </div>
    </div>
  );
} 