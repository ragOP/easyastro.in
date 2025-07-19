import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import IntroductionSection from "@/components/sections/introduction";
import HowItWorksSection from "@/components/sections/how-it-works";
import WhatYouReceiveSection from "@/components/sections/what-you-receive";
import GallerySection from "@/components/sections/gallery";
import TestimonialsSection from "@/components/sections/testimonials";
import WhyTrustUsSection from "@/components/sections/why-trust-us";
import FaqSection from "@/components/sections/faq";
import PricingSection from "@/components/sections/pricing";
import FinalCtaSection from "@/components/sections/final-cta";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IntroductionSection />
        <HowItWorksSection />
        <WhatYouReceiveSection />
        <GallerySection />
        <TestimonialsSection />
        <WhyTrustUsSection />
        <FaqSection />
        <PricingSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
