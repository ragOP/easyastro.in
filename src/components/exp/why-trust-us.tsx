
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import CtaButton from "./cta-button";

const trustFactors = [
  "Over 100,000 sketches delivered",
  "Average 4.8/5 rating from clients",
  "Expert psychics & astrologers",
  "Full satisfaction or your money back",
];

export default function WhyTrustUsSection() {
  const features = [
    { icon: "🌙", text: "Soulmate’s sketch gives clarity of destiny" },
    { icon: "💎", text: "Bracelet activates attraction energy in real life" },
    { icon: "⚡", text: "Energized on Full Moon (Purnima) by expert astrologers" },
    { icon: "🧿", text: "Combines spirituality + astrology for maximum results" },
  ];

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold px-4 py-1 rounded-full text-base shadow animate-glow inline-block mb-4">💖 Bundle Offer</span>
          <h2 className="text-2xl md:text-3xl font-playfair text-purple-700 mb-6">Energy You Can See. Energy You Can Wear.</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg border border-purple-100 px-6 py-5 flex flex-col items-center w-full md:w-56">
                <span className="text-3xl mb-2">{feature.icon}</span>
                <span className="text-lg text-gray-700 text-center">{feature.text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mb-2">
            <span className="text-xl text-gray-500 line-through">Bundle Value ₹2,499</span>
            <span className="text-3xl font-bold text-pink-600  px-4 rounded-lg animate-glow">Today Only ₹489</span>
          </div>
          <div className="mt-6 w-full flex justify-center">
            <CtaButton title="Get My Bundle Now (₹489)" />
          </div>
        </div>
      </div>
    </section>
  );
}
