import React from 'react';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

interface SisterCartHeaderProps {
  itemCount: number;
  animateElements: boolean;
}

export default function SisterCartHeader({ itemCount, animateElements }: SisterCartHeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <Link
            href="/sister"
            className={`flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 ${
              animateElements
                ? "translate-x-0 opacity-100"
                : "-translate-x-4 opacity-0"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Soulmate Page</span>
          </Link>

          {/* Page Title */}
          <div
            className={`text-center ${
              animateElements
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Soulmate Sketch Cart
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete your order to discover your soulmate
            </p>
          </div>

          {/* Cart Icon with Count */}
          <div
            className={`flex items-center gap-2 ${
              animateElements
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-muted-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-sm text-muted-foreground">
              {itemCount} item{itemCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
} 