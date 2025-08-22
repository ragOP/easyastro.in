"use client";
import React from 'react';
import { Star, Heart, Sparkles, Zap, Shield, Clock, Gift, Target } from 'lucide-react';
import Sister2CtaButton from './sister2-cta-button';

const whatYouGet = [
    {
        icon: <Target className="h-8 w-8" />,
        title: "Accurate Soulmate Sketch",
        description: "Get a detailed, personalized sketch of your soulmate based on advanced psychic and astrological insights"
    },
    {
        icon: <Zap className="h-8 w-8" />,
        title: "Psychic Reading Report",
        description: "Comprehensive analysis of your love life, compatibility factors, and when you'll meet your soulmate"
    },
    {
        icon: <Clock className="h-8 w-8" />,
        title: "24-Hour Delivery",
        description: "Receive your complete soulmate reading and sketch within 24 hours of your consultation"
    },
    {
        icon: <Gift className="h-8 w-8" />,
        title: "Bonus Love Guidance",
        description: "Additional tips and advice to attract and recognize your soulmate when you meet them"
    }
];

const whyYouNeedIt = [
    {
        icon: <Heart className="h-8 w-8" />,
        title: "Find True Love Faster",
        description: "Stop wasting time on wrong relationships. Know exactly what to look for in your soulmate"
    },
    {
        icon: <Star className="h-8 w-8" />,
        title: "Eliminate Dating Guesswork",
        description: "No more second-guessing if someone is right for you. Our insights give you clarity and confidence"
    },
    {
        icon: <Shield className="h-8 w-8" />,
        title: "Avoid Heartbreak",
        description: "Understand your compatibility patterns and avoid relationships that won't last"
    },
    {
        icon: <Sparkles className="h-8 w-8" />,
        title: "Manifest Your Destiny",
        description: "When you know what you're looking for, you're more likely to attract and recognize your soulmate"
    }
];

export default function Sister2WhatYouGet() {
    return (
        <div className="py-8 px-4 bg-[#1e1219]">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
                        <Gift className="h-4 w-4 text-[rgb(224,82,177)]" />
                        <span className="text-white text-sm font-medium">Complete Package</span>
                    </div>

                    <h2 className="font-['Montserrat'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        What You Get & <span className="text-[rgb(224,82,177)]">Why You Need It</span>
                    </h2>

                    <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Discover the complete soulmate experience that will transform your love life forever
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* What You Get Section */}

                    <div className="space-y-6">
                        {whatYouGet.map((item, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl shadow-black/20">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 rounded-xl flex items-center justify-center text-[rgb(224,82,177)]">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Why You Need It Section */}
                    <div className="space-y-8 mt-6">
                        <div className="text-center lg:text-left">

                            <div className="inline-block bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-300 px-12 py-4 rounded-full text-sm font-medium italic text-center">
                                Transform your love life<br />with these powerful benefits
                            </div>
                        </div>

                        <div className="space-y-6">
                            {whyYouNeedIt.map((item, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl shadow-black/20">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 rounded-xl flex items-center justify-center text-[rgb(224,82,177)]">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-8 mb-2">
                    <Sister2CtaButton onClick={() => window.location.href = '/sister2-cart'} icon={<Sparkles className="w-5 h-5" />} position='before' className="text-lg px-8 py-3">Start My Soulmate Journey</Sister2CtaButton>
                </div>

            </div>
        </div>
    );
} 