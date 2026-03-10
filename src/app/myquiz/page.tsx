import Header from "@/components/quiz/Header";
import HeroSection from "@/components/quiz/HeroSection";
import IntroductionSection from "@/components/sectionshindi/introduction";
import HowItWorksSection from "@/components/sectionshindi/how-it-works";
import WhatYouReceiveSection from "@/components/sectionshindi/what-you-receive";
import GallerySection from "@/components/sectionshindi/gallery";
import TestimonialsSection from "@/components/sectionshindi/testimonials";
import WhyTrustUsSection from "@/components/sectionshindi/why-trust-us";
import FaqSection from "@/components/sectionshindi/faq";
import Footer from "@/components/quiz/Footer";
import Index from "@/components/quiz/pages/Index";
import Quiz from "@/components/quiz/pages/Quiz";
import Checkout from "@/components/quiz/pages/Checkout";




export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh w-full bg-background text-foreground">
      
      <main className="flex-1">
      
       <Index/>
       
      </main>
      {/* <Quiz/>
      <Checkout/> */}
      
    </div>
  );
}
