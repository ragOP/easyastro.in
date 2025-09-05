"use client";
import React, { useEffect, useState } from "react";

export default function ScarcityBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 34,
  });

  const [spotsLeft, setSpotsLeft] = useState(301);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Spots reduction timer
  useEffect(() => {
    const spotsTimer = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev > 5) {
          const decrease = Math.floor(Math.random() * 2) + 1;
          return prev - decrease;
        }
        return prev;
      });
    }, 10000 + Math.random() * 5000); // Every 10-15 seconds

    return () => clearInterval(spotsTimer);
  }, []);

  const progressPercentage = ((501 - spotsLeft) / 501) * 100;

  return (
    <div className="relative overflow-hidden mt-6 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 border-t border-b border-purple-200/30">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 left-8 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-70" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-4 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-50" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-6 right-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-60" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-1/2 left-16 w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-40" style={{ animationDelay: "3s" }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="text-center space-y-4">
          {/* Header with mystical styling */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-3">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
                Limited Edition Collection
              </h2>
            </div>
            <p className="text-lg md:text-xl text-purple-700 font-medium">
              Only <span className="font-bold font-playfair text-yellow-600 text-2xl">501</span> Purnima-Energized Bracelets Ever Created
            </p>
          </div>

          {/* Timer section with modern design */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200/50 p-6 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-purple-800 font-semibold">
                <span className="text-xl">⏰</span>
                <span className="text-lg">Special Offer Ends In:</span>
              </div>
              
              {/* Timer display */}
              <div className="flex justify-center space-x-4">
                {[
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-mono font-bold text-2xl md:text-3xl rounded-xl px-4 py-3 min-w-[80px] shadow-lg">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-purple-600 font-medium text-sm mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress section */}
          <div className="max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🔮</span>
                <span className="text-purple-800 font-semibold">Mystical Bracelets Remaining</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-600">{spotsLeft}</div>
                <div className="text-sm text-purple-600">of 501</div>
              </div>
            </div>
            
            {/* Enhanced progress bar */}
            <div className="relative">
              <div className="w-full bg-gradient-to-r from-purple-100 to-pink-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Urgency message */}
          <div className="text-center">
            <p className="text-purple-700 font-medium text-sm md:text-base">
              ⚡ <span className="font-semibold">Hurry!</span> These sacred bracelets are selling fast. 
              Don't miss your chance to own a piece of mystical energy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
