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
import CtaButton from "../common/cta-button";

const testimonials = [
  {
    name: "Priya S.",
    quote: "I was actually shocked... the sketch looked like someone I already had feelings for. And the reading? Scary accurate!",
  },
  {
    name: "Suresh",
    quote: "I never thought an astrology-based sketch could be this accurate! The reading gave me deep insights into my future partner. Loved it!",
  },
  {
    name: "Raghav",
    quote: "Skeptical at first, but I was blown away. The personality details were so on point. This is truly magical!",
  },
  {
    name: "Anjali K.",
    quote: "The drawing is beautiful and the reading was so insightful. I feel more hopeful about finding love than ever before.",
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">What Our Clients Say</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card className="h-full bg-card shadow-lg border-accent/20 flex flex-col">
                    <CardContent className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                            <div className="flex text-primary mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                            </div>
                            <blockquote className="italic text-foreground/80 border-l-2 border-primary pl-4 mb-4 min-h-[100px]">
                                "{testimonial.quote}"
                            </blockquote>
                        </div>
                      <p className="font-bold text-right text-primary">— {testimonial.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex"/>
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>
        <CtaButton />
      </div>
    </section>
  );
}
