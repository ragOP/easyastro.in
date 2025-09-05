
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import SpecialOfferPopup from "./special-offer-popup";
import CtaButton from "./cta-button";
import ExpSpecialOfferPopup from "./exp-special-offer-popup";

export default function StickyCtaBar() {

  const [offerEndTime, setOfferEndTime] = useState<Date | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupHasBeenShown, setPopupHasBeenShown] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/exp-cart');
  };

  useEffect(() => {
    // This runs only on the client
    setOfferEndTime(new Date(Date.now() + 10 * 60 * 1000));
  }, []);

  // Simple timer effect
  useEffect(() => {
    if (!offerEndTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = offerEndTime.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [offerEndTime]);

  useEffect(() => {
    if (!offerEndTime || popupHasBeenShown) return;

    const interval = setInterval(() => {
      const timeLeft = +offerEndTime - +new Date();
      const nineMinutesThirtySeconds = 9.5 * 60 * 1000;

      if (timeLeft > 0 && timeLeft <= nineMinutesThirtySeconds) {
        setIsPopupOpen(true);
        setPopupHasBeenShown(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [offerEndTime, popupHasBeenShown]);

  if (!offerEndTime) {
    return null; // Or a loading skeleton
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 w-[100vw] bg-background backdrop-blur-sm border-t border-purple-200/30 shadow-lg">
        <div className="px-3 py-2 flex flex-row items-center justify-between gap-2">
          {/* Timer section - compact */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-xs font-semibold text-purple-700 mb-0.5">Offer Ends In:</p>
              <div className="font-mono text-sm font-bold text-purple-600">
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>

            {/* Price - compact */}
            <div className="flex items-baseline gap-2">
              <span className="text-base text-gray-500 font-poppins-regular line-through">₹1998</span>
              <span className="text-xl font-bold text-purple-600 font-poppins-semibold">₹998</span>
            </div>
          </div>

          {/* CTA Button - smaller */}
          <a href={process.env.NEXT_PUBLIC_CTA_URL} className="">
            <CtaButton title="Buy Now" className="shrink-0" />
          </a>
        </div>
      </div>
      {/* <ExpSpecialOfferPopup isOpen={isPopupOpen} onClose={handleClosePopup} /> */}
    </>
  );
}
