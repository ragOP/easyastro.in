"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Star, Clock, ShieldCheck, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CtaButton from "./cta-button";
import ScarcityBar from "./scarcity-bar";

export default function HeroSection() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/exp-cart");
  };

  const [isSketchImageBlurred, setIsSketchImageBlurred] = useState(true)
  const [isBraceletImageBlurred, setIsBraceletImageBlurred] = useState(true)

  const toggleSketchImageBlur = () => {
    setIsSketchImageBlurred(!isSketchImageBlurred)
  }
  const toggleBraceletImageBlur = () => {
    setIsBraceletImageBlurred(!isBraceletImageBlurred)
  }

  return (
    <section className="relative overflow-hidden min-h-screen bg-background">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-background"></div>

        <div
          className="absolute top-72 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-30 floating-stars"
          style={{ animationDelay: "2.5s" }}
        ></div>

        {/* Moon glow effect */}
        <div className="absolute top-10 right-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-20 blur-xl moon-beam"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-3">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-6">
            {/* Badge Overlay */}
            <div className="inline-flex items-center px-3 sm:px-4 py-1 purnima-badge text-white text-xs sm:text-sm font-bold rounded-full shadow-lg">
              🔥 Only 501 Bracelets Energized on Purnima
            </div>

            <h1 className="font-playfair-bold font-headline font-purple-700 text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-wide text-purple-700">
              💜 See Your Soulmate's Face + Wear the Energy That Attracts Love
              & Money – For Just ₹799
            </h1>

            {/* Split Visual - Moved outside content div for better responsive layout */}
            <div className="relative split-visual mt-6 lg:mt-0">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 h-64 sm:h-80 md:h-96 lg:h-[500px]">
                {/* Left - Soulmate Sketch (Blurred Preview) */}
                <div onClick={toggleSketchImageBlur} className="relative group">
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl sm:rounded-2xl blur-sm"></div> */}
                  <Image
                    src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                    alt="Soulmate Sketch Preview"
                    width={300}
                    height={500}
                    className={`rounded-xl ${isSketchImageBlurred ? 'blur-[3px]' : 'blur-none'} sm:rounded-2xl shadow-2xl w-full h-full object-cover transition-all duration-300`}
                    priority
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl sm:rounded-2xl"></div> */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-white text-xs sm:text-sm font-poppins-semibold">
                    {isSketchImageBlurred ? "Click to Reveal" : "Your Soulmate's Face"}
                  </div>
                  {/* Mystical aura around soulmate sketch */}
                  {/* <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                </div>

                {/* Right - Bracelet with Moon Glow */}
                <div onClick={toggleBraceletImageBlur} className="relative group">
                  <Image
                    src="/bracelet.jpg"
                    alt="Energized Love & Money Bracelet"
                    width={300}
                    height={500}
                    className={`rounded-xl  ${isBraceletImageBlurred ? 'blur-[3px]' : 'blur-none'} sm:rounded-2xl shadow-2xl w-full h-full object-cover`}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl sm:rounded-2xl"></div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-white text-xs sm:text-sm font-poppins-semibold">
                    {isBraceletImageBlurred ? "Click to Reveal" : "Energized Bracelet"}
                  </div>
                </div>

                {/* Plus icon - Responsive positioning */}
                <div className="absolute right-[46%] top-[50%] transform -translate-y-1/2 bg-purple-700 rounded-full p-1 sm:p-2 z-10">
                  <Plus className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black font-poppins-regular max-w-2xl mx-auto lg:mx-0">
              ✨ Exclusive Bundle: Personalized Soulmate Sketch + Energized Love
              & Money Bracelet
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start">
              <CtaButton
                isCartPage={false}
                title="Get My Bundle Now – Only ₹799"
              />
            </div>

            {/* Enhanced security message with better responsive design */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-2 sm:py-3 px-4 sm:px-6 bg-white/90 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-green-700">100% Secure</span>
              </div>
              <div className="w-px h-3 sm:h-4 bg-purple-300"></div>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base">⚡</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-700">24h Delivery</span>
              </div>
              <div className="w-px h-3 sm:h-4 bg-purple-300"></div>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base">🔮</span>
                <span className="text-xs sm:text-sm font-semibold text-purple-700">Limited Edition</span>
              </div>
            </div>
          </div>
        </div>

        <ScarcityBar />
      </div>
    </section>
  );
}
