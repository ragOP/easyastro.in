import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailsIcon, PsychicIcon, DeliveryIcon } from "@/components/icons";
import CtaButton from "./cta-button";

const steps = [
  {
    icon: <DetailsIcon className="h-12 w-12 text-primary" />,
    title: "Share Your Details",
    description: "Provide your name and birth date. This allows our gifted psychics to connect with your unique spiritual energy.",
  },
  {
    icon: <PsychicIcon className="h-12 w-12 text-primary" />,
    title: "Our Artists Begin",
    description: "Our intuitive artists and astrologers use your energy to hand-draw a detailed sketch of your soulmate.",
  },
  {
    icon: <DeliveryIcon className="h-12 w-12 text-primary" />,
    title: "Receive Your Sketch",
    description: "Your sketch and love reading are delivered privately to you via email or WhatsApp within 24-48 hours.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-8 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair text-purple-700 mb-6">Getting Your Bundle is Super Simple</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8 justify-center items-stretch mb-8">
          {["1", "2", "3", "4"].map((num, idx) => (
            <div key={num} className="relative bg-white rounded-2xl shadow-xl border border-purple-100 px-4 py-6 flex flex-col items-center">
              <span className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-300 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-lg border-2 border-white">{num}</span>
              {/* <span className="text-3xl mb-3">{num}⃣</span> */}
              <span className="text-lg text-gray-700 text-center font-semibold mb-2">
                {idx === 0 && "Share your name + birth details"}
                {idx === 1 && "Psychic artists create your personalized sketch + love reading"}
                {idx === 2 && "Energized bracelet is shipped to your doorstep"}
                {idx === 3 && "Receive sketch (24h) + bracelet (3–5 days)"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <CtaButton title="👉 Order My Bundle Now" />
        </div>
      </div>
    </section>
  );
}
