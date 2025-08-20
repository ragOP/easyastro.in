"use client";
import React, { useState, useEffect } from 'react';
import SisterHeroSection from '@/components/sister/sister-hero-section';
import SisterHowItWorks from '@/components/sister/sister-how-it-works';
import SisterWhatIsIt from '@/components/sister/sister-what-is-it';
import SisterHowYoullGetIt from '@/components/sister/sister-how-youll-get-it';
import SisterWhyYouNeedThis from '@/components/sister/sister-why-you-need-this';
import SisterClosingSection from '@/components/sister/sister-closing-section';
import SisterStickyFooter from '@/components/sister/sister-sticky-footer';
import SisterWelcomePopup from '@/components/sister/sister-welcome-popup';
import SisterHeroSection2 from '@/components/sister/sister-hero-section-2';
import SisterHeroSection3 from '@/components/sister/sister-hero-section-3';

export default function SisterPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupHasBeenShown, setPopupHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem('sister-popup-shown');
    
    if (!hasSeenPopup) {
      // Show popup after 3 seconds for first-time visitors
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        setPopupHasBeenShown(true);
        localStorage.setItem('sister-popup-shown', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="bg-background">
      {/* <SisterHeroSection /> */}
      <SisterHeroSection2 />
      {/* <SisterHeroSection3 /> */}
      <SisterHowItWorks />
      <SisterWhatIsIt />
      <SisterHowYoullGetIt />
      <SisterWhyYouNeedThis />
      <SisterClosingSection />
      <SisterStickyFooter />
      
      {/* Welcome Popup */}
      <SisterWelcomePopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </main>
  );
} 