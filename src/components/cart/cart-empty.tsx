import React from 'react';
import Link from 'next/link';

interface CartEmptyProps {
  animateElements?: boolean;
}

export default function CartEmpty({ animateElements = true }: CartEmptyProps) {
  return (
    <div
      className={`max-w-2xl px-4 mx-auto transition-all duration-1000 delay-300 transform ${
        animateElements
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"
      }`}
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-primary/20">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">
              💖
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Your Love Cart is Empty
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Ready to discover your love destiny? Browse our romantic services!
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 buy-now-shimmer text-sm sm:text-base"
            >
              <span>Explore Love Services</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 