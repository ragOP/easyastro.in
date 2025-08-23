"use client";
import React, { useState, useEffect } from 'react';
import { Star, Heart, Sparkles } from 'lucide-react';
import Sister2CtaButton from './sister2-cta-button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    quote: "I was skeptical at first, but when I saw the sketch... my heart stopped! It looked exactly like someone I met a week later. This is pure magic! ✨",
    highlight: "Sketch accuracy"
  },
  {
    name: "Aisha Patel",
    location: "Delhi, India",
    rating: 5,
    quote: "The reading was so detailed and accurate. I felt like they knew my soulmate better than I did. Now I know exactly what to look for! 💕",
    highlight: "Detailed reading"
  },
  {
    name: "Meera Kapoor",
    location: "Bangalore, India",
    rating: 5,
    quote: "Got my sketch in 24 hours as promised. The quality is incredible and the psychic insights were spot on. Highly recommend! 🌟",
    highlight: "Fast delivery"
  },
  {
    name: "Zara Khan",
    location: "Hyderabad, India",
    rating: 5,
    quote: "This changed my life! The sketch showed me someone I've been dreaming about. It's like they read my mind and heart. Amazing experience! 💫",
    highlight: "Life changing"
  },
  {
    name: "Ananya Reddy",
    location: "Chennai, India",
    rating: 5,
    quote: "The combination of astrology and psychic art is genius. I've never felt so connected to my future. Thank you for this beautiful gift! 🎁",
    highlight: "Astrology + Art"
  },
  {
    name: "Kavya Singh",
    location: "Pune, India",
    rating: 5,
    quote: "My friends thought I was crazy, but when they saw the sketch, they were speechless. This is real magic, not a scam! 🔮",
    highlight: "Real magic"
  }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl text-center relative overflow-hidden cursor-grab active:cursor-grabbing select-none h-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-20 h-20 border border-[rgb(224,82,177)] rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border border-[rgb(224,82,177)] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-[rgb(224,82,177)] rounded-full"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Rating */}
        <div className="mb-6">
          <div className="flex justify-center items-center gap-1 py-6 px-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-[rgb(224,82,177)] fill-current" />
            ))}
          </div>
          <div className="inline-block bg-[rgb(224,82,177)]/20 text-[rgb(224,82,177)] px-3 py-1 rounded-full text-sm font-medium">
            {testimonial.highlight}
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-[1.25rem] text-white/90 leading-relaxed mb-8 italic px-4">
          "{testimonial.quote}"
        </blockquote>

        {/* Author */}
        <div className="mb-2 px-4">
          <p className="text-lg font-bold text-white">{testimonial.name}</p>
          <p className="text-white/70 text-sm">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Sister2Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance dots to match autoplay timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Match the autoplay delay

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 px-4 bg-[#1e1219]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
            <Heart className="h-4 w-4 text-[rgb(224,82,177)]" />
            <span className="text-white text-sm font-medium">Client Success Stories</span>
          </div>
          
          <h2 className="font-['Montserrat'] text-3xl sm:text-4xl md:text-5xl font-black text-[rgb(224,82,177)] mb-6 leading-tight">
             Testimonials
          </h2>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Real stories from people who discovered their soulmate through our revolutionary technology
          </p>
        </div>

        {/* Testimonials Carousel */}
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
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex bg-[rgb(224,82,177)]/20 border-[rgb(224,82,177)]/30 text-[rgb(224,82,177)] hover:bg-[rgb(224,82,177)]/30" />
            <CarouselNext className="hidden sm:flex bg-[rgb(224,82,177)]/30 border-[rgb(224,82,177)]/30 text-[rgb(224,82,177)] hover:bg-[rgb(224,82,177)]/30" />
          </Carousel>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-3 mb-8">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[rgb(224,82,177)] scale-125'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="text-center mb-2">
          <div className="inline-flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 bg-gradient-to-r from-[rgb(224,82,177)]/20 to-[rgb(200,70,160)]/20 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-6 md:px-8 py-4 shadow-sm ring-1 ring-[rgb(224,82,177)]/30">
            <div className="text-center min-w-[80px] sm:min-w-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-[rgb(224,82,177)]">100K+</div>
              <div className="text-white/80 text-xs sm:text-sm">Happy Clients</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center min-w-[80px] sm:min-w-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-[rgb(224,82,177)]">99%</div>
              <div className="text-white/80 text-xs sm:text-sm">Accuracy Rate</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center min-w-[80px] sm:min-w-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-[rgb(224,82,177)]">24h</div>
              <div className="text-white/80 text-xs sm:text-sm">Delivery Time</div>
            </div>
          </div>
        </div>

        {/* <Sister2CtaButton
          onClick={() => window.location.href = '/sister2-cart'}
          icon={<Sparkles className="w-5 h-5" />}
          className="text-lg px-8 py-3"
        >
          Reveal My Soulmate Now
        </Sister2CtaButton> */}
      </div>
    </div>
  );
} 