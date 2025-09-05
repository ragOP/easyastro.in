"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Users, Clock, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ExpSpecialOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpSpecialOfferPopup({ isOpen, onClose }: ExpSpecialOfferPopupProps) {
  const router = useRouter();
  const [spotsLeft, setSpotsLeft] = useState(146);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isUrgent, setIsUrgent] = useState(false);

  const handleGetSoulmateSketch = () => {
    onClose();
    router.push('/exp-cart');
  };

  useEffect(() => {
    if (!isOpen) return;

    // Spots reduction timer
    const spotsInterval = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 5) {
          const decrease = Math.floor(Math.random() * 3) + 1;
          return prev - decrease;
        }
        return prev;
      });
    }, 8000 + Math.random() * 4000);

    // Countdown timer
    const timeInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    }, 1000);

    // Set urgent mode when spots are low
    const urgentCheck = setInterval(() => {
      if (spotsLeft <= 30) {
        setIsUrgent(true);
      }
    }, 1000);

    return () => {
      clearInterval(spotsInterval);
      clearInterval(timeInterval);
      clearInterval(urgentCheck);
    };
  }, [isOpen, spotsLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getUrgencyMessage = () => {
    if (spotsLeft > 100) return "🌙 Your soulmate sketch + bracelet combo is waiting!";
    if (spotsLeft > 80) return "✨ Don't miss your mystical package!";
    if (spotsLeft > 60) return "🔮 Limited spots remaining - act now!";
    if (spotsLeft > 40) return "⚡ Your destiny package is almost gone!";
    if (spotsLeft > 20) return "🔥 Last few spots - claim yours!";
    return "💥 FINAL SPOTS - Get your soulmate package now!";
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0">
      <Card className={`relative w-[90vw] max-w-md m-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50 animate-in zoom-in-95 shadow-2xl ${spotsLeft <= 30 ? 'animate-pulse' : ''}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full text-purple-600 hover:bg-purple-100 transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <CardHeader className="text-center items-center pb-2">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
            <CardTitle className="font-headline text-2xl text-purple-800">
              <span className="animate-pulse pr-2">⚡ </span> LIMITED SPOTS <span className="animate-pulse pl-2">⚡</span>
            </CardTitle>
            <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
          </div>
          <p className="text-lg text-purple-700 font-semibold">Don't Miss Out!</p>
        </CardHeader>

        <CardContent className="text-center mt-2">
          {/* FOMO Countdown Section */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="font-bold text-xl text-purple-800">Only <span className="font-black text-yellow-600">{spotsLeft}</span> Spots Left!</span>
            </div>

            <div className="w-full bg-purple-200/50 rounded-full h-3 mb-3">
              <div
                className="bg-gradient-to-r from-yellow-400 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${((501 - spotsLeft) / 501) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="font-bold text-purple-800">Offer ends in:</span>
              <div className="font-mono text-xl font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-lg">
                {formatTime(timeLeft)}
              </div>
            </div>

            <p className="text-sm text-purple-700 font-medium">
              {getUrgencyMessage()}
            </p>
          </div>

          <div className="p-4 bg-purple-100/50 rounded-lg mb-6 text-left">
            <p className="font-semibold text-purple-800">Your order includes:</p>
            <ul className="list-disc list-inside text-purple-700 mt-2 space-y-1">
              <li>Personalized Soulmate Sketch</li>
              <li className="font-bold">Purnima-Energized Mystical Bracelet</li>
            </ul>
          </div>

          <Button 
            size="lg" 
            onClick={handleGetSoulmateSketch} 
            className="w-full font-bold text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white animate-shine"
          >
            Get My Soulmate Package Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 