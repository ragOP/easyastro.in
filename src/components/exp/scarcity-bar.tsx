"use client";
import React, { useEffect, useState } from "react";

export default function ScarcityBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 34,
  });

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

  return (
  <div className="relative py-4">
      {/* Mystical shimmer effects */}
      <div className="absolute inset-0 bg-[url('/sparkles.png')] opacity-10 animate-twinkle"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6">
          {/* Main message */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🌙</span>
            <p className="text-purple-900 font-playfair font-bold text-lg md:text-xl tracking-wide">
              Only <span className="text-yellow-600 font-bold">501</span>{" "}
              Purnima-Energized Bracelets Ever Created
            </p>
            <span className="text-2xl">✨</span>
          </div>

          {/* Timer */}
          <div className="flex items-center space-x-2 bg-yellow-100/60 rounded-lg px-4 py-2">
            <span className="text-purple-900 font-bold">Offer ends in:</span>
            <div className="font-mono text-purple-900 font-bold">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 max-w-md mx-auto">
          <div className="flex justify-between text-purple-900 text-sm font-poppins-semibold mb-2">
            <span className="flex items-center">
              <span className="mr-2">🔮</span>
              Mystical Bracelets Remaining
            </span>
            <span className="text-yellow-600 font-bold">146 of 501</span>
          </div>
          <div className="w-full bg-yellow-100/60 rounded-full h-2.5 overflow-hidden">
            <div className="h-full w-[29%] bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Additional animated elements */}
      <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-300 rounded-full opacity-60 animate-ping"></div>
      <div
        className="absolute top-2 right-4 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-70 animate-ping"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-2 left-1/4 w-1 h-1 bg-red-300 rounded-full opacity-50 animate-ping"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-2 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-60 animate-ping"
        style={{ animationDelay: "0.5s" }}
      ></div>
    </div>
  );
}
