"use client";

import { useRouter } from 'next/navigation';

export default function SisterStickyFooter() {
    const router = useRouter();

    const handleGetSoulmateSketch = () => {
        router.push('/cart');
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-2 shadow-[0_-4px_15px_rgba(245,158,11,0.3)]">
            <div className="flex items-center justify-between gap-3">
                {/* Left Side - Simple Pricing */}
                <div className="flex items-center gap-3 text-white">
                    <span className="text-sm line-through opacity-80">₹998</span>
                    <span className="text-xl font-black">₹389</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-semibold whitespace-nowrap">60% OFF</span>
                </div>

                {/* Right Side - Compact CTA */}
                <button
                    onClick={handleGetSoulmateSketch}
                    className="relative bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-amber-500/50 transition-all duration-300 active:scale-95 overflow-hidden group"
                >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Button Content */}
                    <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                        Buy Now

                    </span>

                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-xl bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </button>
            </div>
        </div>
    );
} 