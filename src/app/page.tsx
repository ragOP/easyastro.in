
import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import IntroductionSection from "@/components/sections/introduction";
import HowItWorksSection from "@/components/sections/how-it-works";
import WhatYouReceiveSection from "@/components/sections/what-you-receive";
import GallerySection from "@/components/sections/gallery";
import TestimonialsSection from "@/components/sections/testimonials";
import WhyTrustUsSection from "@/components/sections/why-trust-us";
import FaqSection from "@/components/sections/faq";
import Footer from "@/components/layout/footer";
import StickyCtaBar from "@/components/layout/sticky-cta-bar";
import AnimateOnScroll from "@/components/common/animate-on-scroll";
import SocialProofPopup from "@/components/common/social-proof-popup";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AnimateOnScroll>
          <HeroSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <IntroductionSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <HowItWorksSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <WhatYouReceiveSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <GallerySection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <TestimonialsSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <WhyTrustUsSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <FaqSection />
        </AnimateOnScroll>
      </main>
      <Footer />
      <StickyCtaBar />
      <SocialProofPopup />
    </div>
  );
}
