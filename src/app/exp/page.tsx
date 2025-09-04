import SocialProofPopup from "@/components/common/social-proof-popup";
import FaqSection from "@/components/exp/faq";
import GallerySection from "@/components/exp/gallery";
import HeroSection from "@/components/exp/hero";
import HowItWorksSection from "@/components/exp/how-it-works";
import IntroductionSection from "@/components/exp/introduction";
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
        <IntroductionSection />
        <HowItWorksSection />
        <GallerySection />
        <WhatYouReceiveSection />
        <TestimonialsSection />
        <WhyTrustUsSection />
        <FaqSection />
      </main>
      <Footer />
      <StickyCtaBar />
      <SocialProofPopup />
    </div>
  );
}
