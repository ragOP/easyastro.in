"use client";
import React, { useState, useEffect } from 'react';
import Sister2HeroSection from '@/components/sister2/sister2-hero-section';
import Sister2HowItWorks from '@/components/sister2/sister2-how-it-works';
import Sister2WhatIsIt from '@/components/sister2/sister2-what-is-it';
import Sister2HowYoullGetIt from '@/components/sister2/sister2-how-youll-get-it';
import Sister2WhyYouNeedThis from '@/components/sister2/sister2-why-you-need-this';
import Sister2ClosingSection from '@/components/sister2/sister2-closing-section';
import Sister2StickyFooter from '@/components/sister2/sister2-sticky-footer';
import Sister2WelcomePopup from '@/components/sister2/sister2-welcome-popup';

export default function Sister2Page() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupHasBeenShown, setPopupHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem('sister2-popup-shown');
    
    if (!hasSeenPopup) {
      // Show popup after 3 seconds for first-time visitors
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        setPopupHasBeenShown(true);
        localStorage.setItem('sister2-popup-shown', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="bg-background">
      <Sister2HeroSection />
      <Sister2HowItWorks />
      <Sister2WhatIsIt />
      <Sister2HowYoullGetIt />
      <Sister2WhyYouNeedThis />
      <Sister2ClosingSection />
      <Sister2StickyFooter />
      
      {/* Welcome Popup */}
      <Sister2WelcomePopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </main>
  );
} 