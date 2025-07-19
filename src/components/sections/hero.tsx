import { Button } from "@/components/ui/button";
import { Users, Star, Clock, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    value: "100,000+",
    label: "Happy Clients",
  },
  {
    icon: <Star className="h-6 w-6 text-primary" />,
    value: "4.8/5",
    label: "Average Rating",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    value: "24 Hours",
    label: "Delivered Privately",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    value: "100%",
    label: "Safe & Confidential",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 text-center bg-card">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-50"></div>
        <div className="container relative z-10 mx-auto">
        <h1 className="font-headline text-4xl md:text-6xl text-primary leading-tight tracking-wide mb-4">
          Discover Your Soulmate’s Face Today!
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
          Ever wondered who your true soulmate is? Experience the magic of seeing your soulmate’s face – drawn just for you by gifted psychics and astrology experts.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-12 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              {stat.icon}
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>

        <a href="#pricing">
          <Button size="lg" className="font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 hover:animate-shake">
            Reveal My Soulmate Now
          </Button>
        </a>
        <p className="mt-4 text-sm text-primary/80 animate-pulse">
          Only a few spots left! Hurry before the special offer ends.
        </p>
      </div>
    </section>
  );
}
