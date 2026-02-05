"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface SisterWelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SisterWelcomePopup({ isOpen, onClose }: SisterWelcomePopupProps) {
  const router = useRouter();
  const [spotsLeft, setSpotsLeft] = useState(47);

  const handleGetSoulmateSketch = () => {
    onClose();
    router.push('/sister-cart');
  };

  useEffect(() => {
    if (!isOpen) return;

    // Simple spots reduction timer
    const spotsInterval = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 3) {
          const decrease = Math.floor(Math.random() * 2) + 1;
          return prev - decrease;
        }
        return prev;
      });
    }, 8000);

    return () => clearInterval(spotsInterval);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl border border-amber-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              🔥 Limited Time Offer!
            </h2>
            <p className="text-sm text-slate-600">
              Only <span className="font-bold text-amber-600">{spotsLeft}</span> spots left today
            </p>
          </div>

          {/* Offer */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white mb-4">
            <p className="text-lg font-bold mb-1">60% OFF Today Only!</p>
            <p className="text-sm opacity-90">From ₹998 to just ₹199</p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGetSoulmateSketch}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
          >
            Get My Soulmate Sketch Now
          </button>
        </div>
      </div>
    </div>
  );
} 