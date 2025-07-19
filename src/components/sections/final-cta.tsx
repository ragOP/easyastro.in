import SoulmateForm from "@/components/ui/soulmate-form";
import { CheckCircle, Lock, Star } from "lucide-react";

const guarantees = [
    {
        icon: <Star className="h-5 w-5 text-primary" />,
        text: "Limited spots available"
    },
    {
        icon: <CheckCircle className="h-5 w-5 text-primary" />,
        text: "100% satisfaction guarantee"
    },
    {
        icon: <Lock className="h-5 w-5 text-primary" />,
        text: "Secure payment and data privacy"
    }
]

export default function FinalCtaSection() {
  return (
    <section id="cta" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-headline text-primary mb-4">
            Are you ready to see who destiny has chosen for you?
          </h2>
          <p className="text-lg text-foreground/80 mb-12">
            Fill in your details below to receive your personalized soulmate sketch and reading.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <SoulmateForm />
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-foreground/70">
            {guarantees.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.text}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
