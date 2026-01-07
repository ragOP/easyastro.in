"use client";

import { useRouter } from 'next/navigation';

export default function Sister2StickyFooter() {
    const router = useRouter();

      const handleGetSoulmateSketch = () => {
    router.push('/sister2-cart');
  };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-purple-900 via-pink-900 to-slate-900 backdrop-blur-md border-t border-white/20 p-3 shadow-[0_-4px_25px_rgba(236,72,153,0.3)]">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                {/* Left Side - Pricing & Social Proof */}
                <div className="flex items-center gap-4 text-white">
                    {/* Pricing */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm line-through opacity-70">₹998</span>
                        <span className="text-xl font-black text-pink-300">₹289</span>
                        <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-full font-semibold whitespace-nowrap text-white shadow-lg">60% OFF</span>
                    </div>
                    
                    {/* Social Proof */}
                    <div className="hidden md:flex items-center gap-2 text-gray-300 text-sm">
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                        <span>9,427+ people discovered their soulmate this week</span>
                    </div>
                </div>

                {/* Right Side - CTA Button */}
                <button
                    onClick={handleGetSoulmateSketch}
                    className="relative bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-rose-500/50 transition-all duration-300 active:scale-95 overflow-hidden group border border-white/20"
                >
                    {/* Spinning Border Animation - Rose Theme */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 animate-spin-slow opacity-75"></div>
                    <div className="absolute inset-[2px] rounded-xl bg-gradient-to-r from-rose-500 to-pink-500"></div>
                    
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    {/* Button Content */}
                    <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                        <span>Buy Now</span>
                    </span>

                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-xl bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </button>
            </div>
        </div>
    );
} 