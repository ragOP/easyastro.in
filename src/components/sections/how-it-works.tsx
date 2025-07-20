import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailsIcon, PsychicIcon, DeliveryIcon } from "@/components/icons";
import CtaButton from "../common/cta-button";

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
    <section className="py-7 sm:py-16 bg-card">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-7 sm:mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-background border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4">{step.icon}</div>
                <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-11">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
