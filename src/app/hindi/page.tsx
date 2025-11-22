import Header from "@/components/sectionshindi/headercousin";
import HeroSection from "@/components/sectionshindi/hero";
import IntroductionSection from "@/components/sectionshindi/introduction";
import HowItWorksSection from "@/components/sectionshindi/how-it-works";
import WhatYouReceiveSection from "@/components/sectionshindi/what-you-receive";
import GallerySection from "@/components/sectionshindi/gallery";
import TestimonialsSection from "@/components/sectionshindi/testimonials";
import WhyTrustUsSection from "@/components/sectionshindi/why-trust-us";
import FaqSection from "@/components/sectionshindi/faq";
import Footer from "@/components/layout/footer";
import StickyCtaBar from "@/components/sectionshindi/sticky-cta-bar";
import SocialProofPopup from "@/components/common/socialhidni";

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
