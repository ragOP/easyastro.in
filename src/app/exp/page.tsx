"use client";

import SocialProofPopup from "@/components/common/social-proof-popup";
import ExpSocialProofPopup from "@/components/exp/exp-social-proof-popup";
import FaqSection from "@/components/exp/faq";
import GallerySection from "@/components/exp/gallery";
import HeroSection from "@/components/exp/hero";
import HowItWorksSection from "@/components/exp/how-it-works";
import IntroductionSection from "@/components/exp/introduction";
import ScarcityBar from "@/components/exp/scarcity-bar";
import SocialProofSection from "@/components/exp/social-proof-section";
import StickyCtaBar from "@/components/exp/sticky-cta-bar";
import TestimonialsSection from "@/components/exp/testimonials";
import WhatYouReceiveSection from "@/components/exp/what-you-receive";
import WhyTrustUsSection from "@/components/exp/why-trust-us";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhatYouReceiveSection />
        <WhyTrustUsSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <FaqSection />

        {/* Final Call-to-Action (Bottom Fold) */}
        <section className="py-10 sm:py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-black drop-shadow mb-6">
              💖 See Your Soulmate. Attract Love & Money. All For Just ₹489.
            </h2>
            <button
              onClick={() => (window.location.href = "/exp-cart")}
              className="mt-2 mb-4 px-10 py-5 text-lg font-bold rounded-full shadow-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-700 text-white border-2 border-yellow-300 animate-glow hover:scale-105 transition-transform duration-200"
            >
              👉 Get My Bundle Now (₹489)
            </button>
            <div className="mt-2 text-sm text-black font-semibold flex flex-col sm:flex-row items-center justify-center gap-2">
              <span>🔒 Secure Checkout</span>
              <span>• Fast Delivery</span>
              <span>• Limited Edition 501 Bracelets</span>
            </div>
          </div>
        </section>
        {/* <IntroductionSection />
        <GallerySection /> */}
      </main>
      <Footer />
      <StickyCtaBar />
      <ExpSocialProofPopup />
    </div>
  );
}
