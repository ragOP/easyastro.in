"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import React, { useState, useEffect } from "react";
import CtaButton from "./cta-button";

const testimonials = [
  {
    name: "Neha",
    age: 24,
    quote:
      "The sketch was so accurate, I was shocked. And since wearing the bracelet, my relationship feels stronger.",
  },
  {
    name: "Rajesh",
    age: 28,
    quote:
      "Money started flowing in small ways I never imagined. Salary hike + soulmate clarity. Best ₹199 spent.",
  },
  {
    name: "Simran",
    age: 26,
    quote:
      "The bracelet feels powerful. I literally get compliments daily. It's not just jewelry, it's energy.",
  },
];

function TestimonialCard({ name, quote }: { name: string; quote: string }) {
  return (
    <Card className="h-full bg-card shadow-lg border-accent/20 flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex text-primary mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <blockquote className="italic text-foreground/80 border-l-2 border-primary pl-4 mb-4">
            "{quote}"
          </blockquote>
        </div>
        <p className="font-bold text-right text-primary mt-auto pt-4">
          — {name}
        </p>
      </CardContent>
    </Card>
  );
}

interface TestimonialsSectionProps {
  isCartPage?: boolean;
}

export default function TestimonialsSection({
  isCartPage = false,
}: TestimonialsSectionProps) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-background mx-auto pt-8 px-4">
      <h2 className="text-3xl md:text-4xl font-headline text-center mb-4 sm:mb-16">
        What Our Clients Say
      </h2>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1 h-full">
                <TestimonialCard
                  name={testimonial.name}
                  quote={testimonial.quote}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-primary w-6"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-6">
        <CtaButton isCartPage={isCartPage} />
      </div>
    </section>
  );
}
