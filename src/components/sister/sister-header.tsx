import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';

export default function SisterHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-rose-200/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <Link
            href="/sister"
            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Soulmate Page</span>
          </Link>

          {/* Logo/Brand */}
          <div className="text-center">
            <Link href="/sister" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-rose-500" />
              <span className="text-xl font-bold text-gray-800">Soulmate Sketch</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link
              href="/sister-cart"
              className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
            </Link>
            
            <Link
              href="/sister-records"
              className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors duration-200"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Records</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 