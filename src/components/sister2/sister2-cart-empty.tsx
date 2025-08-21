import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

interface Sister2CartEmptyProps {
  animateElements: boolean;
}

export default function Sister2CartEmpty({ animateElements }: Sister2CartEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className={`transition-all duration-1000 delay-300 transform ${
          animateElements
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-full flex items-center justify-center mb-6 mx-auto">
          <ShoppingCart className="w-12 h-12 text-white" />
        </div>

        {/* Empty Cart Message */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Your Soulmate Sketch Cart is Empty
        </h2>
        <p className="text-gray-200 mb-6 max-w-md">
          Start your journey to discover your soulmate's face by adding our AI-powered astrology sketch to your cart.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Add Soulmate Sketch
          </button>
          <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
} 