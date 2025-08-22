"use client";
import React, { useState, useEffect } from 'react';
import { Star, Shield, Clock, Users, Award, Zap, Heart, Sparkles } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Sister2CtaButton from './sister2-cta-button';

const reasons = [
    {
        icon: <Award className="h-6 w-6" />,
        title: "Proven Track Record",
        description: "Over 100,000+ successful soulmate matches with 99% accuracy rate. Our technology has been refined over years of research and development."
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: "Expert Psychics & Astrologers",
        description: "Our team consists of certified psychics and professional astrologers with decades of combined experience in love and relationship readings."
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Revolutionary Technology",
        description: "We combine ancient wisdom with cutting-edge AI technology to create the most accurate soulmate sketches and readings available anywhere."
    },
    {
        icon: <Clock className="h-6 w-6" />,
        title: "Lightning Fast Results",
        description: "Get your complete soulmate reading and sketch in just 24 hours. No waiting weeks or months for results like other services."
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: "100% Satisfaction Guarantee",
        description: "If you're not completely satisfied with your reading, we'll provide a full refund. Your happiness is our top priority."
    },
    {
        icon: <Heart className="h-6 w-6" />,
        title: "Personalized Experience",
        description: "Every reading is completely customized to your unique energy, birth chart, and love journey. No generic templates or copy-paste readings."
    }
];

const stats = [
    { number: "100K+", label: "Happy Clients" },
    { number: "99%", label: "Accuracy Rate" },
    { number: "24h", label: "Delivery Time" },
    { number: "15+", label: "Years Experience" }
];

export default function Sister2WhyChooseUs() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance dots to match autoplay timing
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % reasons.length);
        }, 4000); // Match the autoplay delay

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-8 px-4 bg-[#1e1219]">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
                        <Star className="h-4 w-4 text-[rgb(224,82,177)]" />
                        <span className="text-white text-sm font-medium">Trust & Excellence</span>
                    </div>

                    <h2 className="font-['Montserrat'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        Why <span className="text-[rgb(224,82,177)]">Choose Us</span>
                    </h2>

                    <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Discover why thousands of people trust us with their most important life decisions
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-gradient-to-br from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 backdrop-blur-sm border border-[rgb(224,82,177)]/30 rounded-2xl p-6 h-32 flex flex-col justify-center">
                                <div className="text-3xl md:text-4xl font-black text-[rgb(224,82,177)] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-white/80 text-sm font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reasons Carousel */}
                <div className="mb-8">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                            skipSnaps: false,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                                stopOnInteraction: true,
                                stopOnMouseEnter: false,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {reasons.map((reason, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1 h-full">
                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl shadow-black/20 h-full">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 rounded-xl flex items-center justify-center text-[rgb(224,82,177)]">
                                                    {reason.icon}
                                                </div>
                                                <h4 className="text-lg font-bold text-white mb-3">{reason.title}</h4>

                                            </div>
                                            <p className="text-white/80 text-sm mt-4 leading-relaxed">{reason.description}</p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex bg-[rgb(224,82,177)]/20 border-[rgb(224,82,177)]/30 text-[rgb(224,82,177)] hover:bg-[rgb(224,82,177)]/30" />
                        <CarouselNext className="hidden sm:flex bg-[rgb(224,82,177)]/20 border-[rgb(224,82,177)]/30 text-[rgb(224,82,177)] hover:bg-[rgb(224,82,177)]/30" />
                    </Carousel>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center items-center gap-3 mb-10">
                    {reasons.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-[rgb(224,82,177)] scale-125'
                                : 'bg-white/30'
                                }`}
                        />
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="text-center mb-8">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Trusted by <span className="text-[rgb(224,82,177)]">Millions</span> Worldwide
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="h-8 w-8 text-[rgb(224,82,177)]" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Secure & Private</h4>
                                <p className="text-white/70 text-sm">Your personal information is completely protected and confidential</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-8 w-8 text-[rgb(224,82,177)]" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Award Winning</h4>
                                <p className="text-white/70 text-sm">Recognized as the #1 soulmate discovery service in the industry</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-[rgb(224,82,177)]" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Love Focused</h4>
                                <p className="text-white/70 text-sm">Dedicated exclusively to helping you find your true soulmate</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 backdrop-blur-sm border border-[rgb(224,82,177)]/30 rounded-2xl">
                        <div className="p-8">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                Ready to Experience the Difference?
                            </h3>
                            <p className="text-white/90 max-w-2xl mx-auto">
                                Join the thousands of people who have already found their soulmate through our proven technology and expert guidance
                            </p>
                        </div>

                        <div className='px-4 mb-4'>
                            <Sister2CtaButton onClick={() => window.location.href = '/sister2-cart'} >Start My Soulmate Journey</Sister2CtaButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 