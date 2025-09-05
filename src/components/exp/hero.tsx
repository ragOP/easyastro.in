"use client";
import React from "react";
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

  return (
    <section className="relative overflow-hidden min-h-screen bg-background">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0">
        {/* Galaxy background with stars */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-purple-800/80"></div> */}
        <div className="absolute inset-0 bg-background"></div>

        <div
          className="absolute top-72 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-30 floating-stars"
          style={{ animationDelay: "2.5s" }}
        ></div>

        {/* Moon glow effect */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-20 blur-xl moon-beam"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge Overlay */}
            <div className="inline-flex items-center px-4 py-1 purnima-badge text-white text-sm font-bold rounded-full shadow-lg">
              🔥 Only 501 Bracelets Energized on Purnima
            </div>

            <h1 className="font-playfair-bold font-headline text-2xl md:text-5xl lg:text-6xl leading-tight tracking-wide text-rose-600">
              💖 "See Your Soulmate's Face + Wear the Energy That Attracts Love
              & Money – For Just ₹799"
            </h1>

            {/* Right Side - Split Visual */}
            <div className="relative split-visual">
              <div className="grid grid-cols-2 gap-4 h-96 lg:h-[500px]">
                {/* Left - Soulmate Sketch (Blurred Preview) */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-sm"></div>
                  <Image
                    src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                    alt="Soulmate Sketch Preview"
                    width={300}
                    height={500}
                    className="rounded-2xl shadow-2xl w-full h-full object-cover filter blur-[2px] group-hover:blur-[1px] transition-all duration-300"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-poppins-semibold">
                    Your Soulmate's Face
                  </div>
                  {/* Mystical aura around soulmate sketch */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Right - Bracelet with Moon Glow */}
                <div className="relative group">
                  <div className="absolute inset-0 rounded-2xl blur-lg"></div>
                  <Image
                    src="/bracelet.jpg"
                    alt="Energized Love & Money Bracelet"
                    width={300}
                    height={500}
                    className="rounded-2xl shadow-2xl w-full h-full object-cover "
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-poppins-semibold">
                    Energized Bracelet
                  </div>


                  {/* Moon beam effect */}
                  {/* <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-60 blur-md"></div> */}
                  {/* <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full opacity-80 blur-sm"></div> */}
                  {/* <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-full opacity-30 blur-lg"></div> */}
                </div>
                <div className="text-4xl z-99 absolute right-[44%] top-[50%] bg-purple-700 rounded-full p-2"><Plus className="h-8 w-8 text-white" /></div>

              </div>

              {/* Connecting mystical aura between images */}
              {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-60 blur-sm"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-80"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full opacity-40 blur-md"></div> */}
            </div>

            <p className="text-base md:text-xl text-black font-poppins-regular max-w-2xl mx-auto lg:mx-0">
              ✨ Exclusive Bundle: Personalized Soulmate Sketch + Energized Love
              & Money Bracelet
              <br />
              {/* <span className="text-yellow-300 font-poppins-semibold">
                (Limited to 501 pieces worldwide)
              </span> */}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <CtaButton
                isCartPage={false}
                title="Get My Bundle Now – Only ₹799"
              />
            </div>

            <p className="text-sm text-black font-bold font-poppins-regular animate-pulse">
              100% Secure • Delivered in 24h • Limited Edition
            </p>
          </div>
        </div>

        <ScarcityBar />
      </div>
    </section>
  );
}
