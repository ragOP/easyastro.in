"use client";
import React from 'react';
import { Button } from "@/components/ui/button";

interface SisterCtaButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function SisterCtaButton({ onClick, children, className = "" }: SisterCtaButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white font-bold text-xl px-6 py-4 rounded-2xl shadow-2xl transform hover:scale-105 hover:shadow-amber-500/50 transition-all duration-300 active:scale-95 overflow-hidden group ${className}`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-3">
        <span>{children || "Generate My Soulmate Sketch ✨"}</span>
      </span>

      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-2xl bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
    </button>
  );
} 