"use client";
import React from 'react';
import { Button } from "@/components/ui/button";

interface Sister2CtaButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  position?: 'before' | 'after';
}

export default function Sister2CtaButton({ onClick, children, className = "", icon, position = 'after' }: Sister2CtaButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex items-center justify-center bg-rose-500 text-white font-bold px-6 py-4 rounded-2xl shadow-2xl transform hover:scale-105 hover:shadow-rose-500/50 transition-all duration-300 active:scale-95 overflow-hidden group ${className}`}
    >
      {/* Spinning Border Animation - Rose Theme */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 animate-spin-slow opacity-75"></div>
      <div className="absolute inset-[3px] rounded-2xl bg-rose-500"></div>
      
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {icon && position === 'before' && <span className="flex items-center">{icon}</span>}
        <span className='text-[1.125rem]'>{children || "Generate My Soulmate Sketch ✨"}</span>
        {icon && position === 'after' && <span className="flex items-center">{icon}</span>}
      </span>

      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-2xl bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
    </button>
  );
} 