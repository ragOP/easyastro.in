import { Sparkles } from "lucide-react";

export default function IntroductionSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto text-center max-w-3xl">
        <div className="flex justify-center mb-4">
            <Sparkles className="h-8 w-8 text-accent"/>
        </div>
        <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-6">
          Is your heart longing for that special connection?
        </h2>
        <p className="text-lg text-foreground/80 leading-relaxed mb-4">
          Unveil the mystery of your destined partner with a personalized soulmate sketch – crafted to align your energy with the universe and attract true love into your life.
        </p>
        <p className="text-xl font-semibold text-primary italic">
          Your romantic destiny is waiting – all you need to do is say yes.
        </p>
      </div>
    </section>
  );
}
