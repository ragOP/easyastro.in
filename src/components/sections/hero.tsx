import { Button } from "@/components/ui/button";
import { Users, Star, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

const stats = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: "100,000+",
    label: "Happy Clients",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    value: "4.8/5",
    label: "Average Rating",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    value: "24 Hours",
    label: "Delivered Privately",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    value: "100%",
    label: "Safe & Confidential",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-16 sm:py-20 bg-card">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-50"></div>
      <div className="container relative z-10 mx-auto">
        <div className="grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl md:text-6xl text-primary leading-tight tracking-wide mb-4">
              Discover Your Soulmate’s Face Today!
            </h1>
            <div className="lg:hidden my-8">
              <Image
                src="https://ik.imagekit.io/5r36kvobl/image.png"
                alt="Soulmate Sketch Example"
                width={500}
                height={500}
                className="rounded-lg shadow-xl mx-auto"
                data-ai-hint="soulmate sketch"
                priority
              />
            </div>
            <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-foreground/80 mb-8">
              Ever wondered who your true soulmate is? Experience the magic of seeing your soulmate’s face – drawn just for you by gifted psychics and astrology experts.
            </p>
            <a href="https://superprofile.bio/vp/Soulmate-sketch?checkout=true">
              <Button size="lg" className="font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-shine">
                Reveal My Soulmate Now
              </Button>
            </a>
            <p className="mt-4 text-sm text-primary/80 animate-pulse">
              Only a few spots left! Hurry before the special offer ends.
            </p>
          </div>

          <div className="hidden lg:block">
            <Image
              src="https://ik.imagekit.io/5r36kvobl/image.png"
              alt="Soulmate Sketch Example"
              width={500}
              height={500}
              className="rounded-lg shadow-xl mx-auto"
              data-ai-hint="soulmate sketch"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              {stat.icon}
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-base text-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
