'use client';
import { Helmet } from "react-helmet-async";
import Header from "@/components/quiz/Header";
import HeroSection from "@/components/quiz/HeroSection";
import TrustSection from "@/components/quiz/TrustSection";
import HowItWorksSection from "@/components/quiz/HowItWorksSection";
import UrgencySection from "@/components/quiz/UrgencySection";
import TestimonialsSection from "@/components/quiz/TestimonialsSection";
import CredibilitySection from "@/components/quiz/CredibilitySection";
import FAQSection from "@/components/quiz/FAQSection";
import FinalCTASection from "@/components/quiz/FinalCTASection";
import Footer from "@/components/quiz/Footer";
import TrustStrip from "@/components/quiz/TrustStrip";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Soulmate Sketch | Discover Your Soulmate's Appearance</title>
        <meta
          name="description"
          content="Get a personalized soulmate sketch based on your energy and birth details. Discover your destined partner's appearance through our intuitive quiz."
        />
        <meta
          name="keywords"
          content="soulmate sketch, astrology, love reading, soulmate appearance, relationship, spiritual connection"
        />
        <link rel="canonical" href="https://soulmatesketch.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Soulmate Sketch | Discover Your Soulmate's Appearance" />
        <meta property="og:description" content="Get a personalized soulmate sketch based on your energy and birth details." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Soulmate Sketch",
            "description": "Personalized soulmate sketch and reading based on your energy and birth details",
            "brand": {
              "@type": "Brand",
              "name": "Soulmate Sketch"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "50000"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <TrustSection />
          <HowItWorksSection />
          <UrgencySection />
          <TestimonialsSection />
          <CredibilitySection />
          <FAQSection />
          <FinalCTASection />
        </main>
        <div className="container px-4">
          <TrustStrip />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
