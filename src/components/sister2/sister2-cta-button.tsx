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
      className={`relative w-full flex items-center justify-center bg-[rgb(224,82,177)] text-white font-bold px-6 py-4 rounded-2xl shadow-2xl transform hover:scale-105 hover:shadow-[rgb(224,82,177)]/50 transition-all duration-300 active:scale-95 overflow-hidden group ${className}`}
    >
      {/* Spinning Border Animation - New Color Theme */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgb(224,82,177)] via-[rgb(255,150,200)] to-[rgb(180,60,140)] animate-spin-slow opacity-80"></div>
      <div className="absolute inset-[3px] rounded-2xl bg-[rgb(224,82,177)]"></div>
      
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