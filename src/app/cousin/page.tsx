import Header from "@/components/layout/header";
import HeroSection from "@/components/sectionscousin/hero";
import IntroductionSection from "@/components/sectionscousin/introduction";
import HowItWorksSection from "@/components/sectionscousin/how-it-works";
import WhatYouReceiveSection from "@/components/sectionscousin/what-you-receive";
import GallerySection from "@/components/sectionscousin/gallery";
import TestimonialsSection from "@/components/sectionscousin/testimonials";
import WhyTrustUsSection from "@/components/sectionscousin/why-trust-us";
import FaqSection from "@/components/sectionscousin/faq";
import Footer from "@/components/layout/footer";
import StickyCtaBar from "@/components/layout/sticky-cta-bar";
import SocialProofPopup from "@/components/common/social-proof-popup";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh w-full bg-background text-foreground">
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
