import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailsIcon, PsychicIcon, DeliveryIcon } from "@/components/icons";

const steps = [
  {
    icon: <DetailsIcon className="h-12 w-12 text-primary" />,
    title: "Share Your Details",
    description: "Submit your name, birth date, and a few personal details.",
  },
  {
    icon: <PsychicIcon className="h-12 w-12 text-primary" />,
    title: "Psychic Artists & Astrologers Get to Work",
    description: "Our intuitive professionals use your unique birth chart and energy to create your custom sketch.",
  },
  {
    icon: <DeliveryIcon className="h-12 w-12 text-primary" />,
    title: "Receive Your Soulmate Sketch",
    description: "Your beautifully hand-drawn sketch and psychic love reading are delivered privately to your email or WhatsApp within 24–48 hours.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">How It Works</h2>
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
      </div>
    </section>
  );
}
