"use client";
import React, { useState, useEffect } from 'react';
import { Star, Heart, Sparkles, Quote } from 'lucide-react';
import Sister2CtaButton from './sister2-cta-button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    review: "I was skeptical at first, but when I saw the sketch... my heart stopped! It looked exactly like someone I met a week later. This is pure magic! ✨"
  },
  {
    name: "Aisha Patel",
    location: "Delhi, India",
    rating: 5,
    review: "The reading was so detailed and accurate. I felt like they knew my soulmate better than I did. Now I know exactly what to look for! 💕"
  },
  {
    name: "Meera Kapoor",
    location: "Bangalore, India",
    rating: 5,
    review: "Got my sketch in 24 hours as promised. The quality is incredible and the psychic insights were spot on. Highly recommend! 🌟"
  },
  {
    name: "Zara Khan",
    location: "Hyderabad, India",
    rating: 5,
    review: "This changed my life! The sketch showed me someone I've been dreaming about. It's like they read my mind and heart. Amazing experience! 💫"
  },
  {
    name: "Ananya Reddy",
    location: "Chennai, India",
    rating: 5,
    review: "The combination of astrology and psychic art is genius. I've never felt so connected to my future. Thank you for this beautiful gift! 🎁"
  },
  {
    name: "Kavya Singh",
    location: "Pune, India",
    rating: 5,
    review: "My friends thought I was crazy, but when they saw the sketch, they were speechless. This is real magic, not a scam! 🔮"
  },
  {
    name: "Riya Verma",
    location: "Kolkata, India",
    rating: 5,
    review: "The accuracy is mind-blowing! I showed the sketch to my family and they couldn't believe it. This is definitely worth every penny! 💎"
  },
  {
    name: "Sana Ahmed",
    location: "Jaipur, India",
    rating: 5,
    review: "I've tried many psychic services before, but this one is different. The combination of astrology and art creates something truly special! 🌟"
  }
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-all duration-300 shadow-[0_6px_16px_rgba(224,82,177,0.12),0_3px_10px_rgba(224,82,177,0.08)] h-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-16 h-16 border border-[rgb(224,82,177)] rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border border-[rgb(224,82,177)] rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Rating */}
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-[rgb(224,82,177)] fill-current" />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <blockquote className="text-white/90 text-sm leading-relaxed mb-4 italic">
          "{review.review}"
        </blockquote>

        {/* Author */}
        <div className="border-t border-white/10 pt-4">
          <p className="font-bold text-white text-sm">{review.name}</p>
          <p className="text-white/70 text-xs">{review.location}</p>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(224,82,177)]/5 to-[rgb(200,70,160)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
}

export default function Sister2Reviews() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance dots to match autoplay timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 4000); // Match the autoplay delay

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 px-4 bg-[#1e1219]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
            <Quote className="h-4 w-4 text-[rgb(224,82,177)]" />
            <span className="text-white text-sm font-medium">Customer Reviews</span>
          </div>

          <h2 className="font-['Montserrat'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            What Our <span className="text-[rgb(224,82,177)]">Customers Say</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Real experiences from people who discovered their soulmate through our revolutionary technology
          </p>
        </div>

        {/* Reviews Carousel */}
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
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <ReviewCard review={review} />
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
          {reviews.map((_, index) => (
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

        {/* Overall Rating */}
        <div className="text-center mb-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-4 inline-block">
            <div className="flex items-center justify-center gap-2 mb-4 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-[rgb(224,82,177)] fill-current" />
              ))}
            </div>
            <h3 className="text-xl font-bold">
              <span className="text-white font-black">4.9</span>
              <span className="text-white">/5 </span>
              <span className="text-white">Average Rating</span>
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
} 