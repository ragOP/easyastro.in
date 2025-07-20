
"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import CtaButton from "../common/cta-button";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const galleryItems = [
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/2.png",
    hint: "portrait sketch",
    alt: "Example of a soulmate sketch",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/3.png",
    hint: "pencil drawing",
    alt: "Another example of a soulmate sketch",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/1.png",
    hint: "artistic portrait",
    alt: "A beautiful soulmate sketch",
  },
];

const features = [
    "Hand-drawn art, unique to you.",
    "Rooted in astrology and psychic intuition."
]

export default function GallerySection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="py-7 sm:py-16 bg-card">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-headline mb-7">Past Work / Proof</h2>
            <p className="text-lg text-foreground/80 mb-6">
              Imagine seeing the detailed features of the person you’re destined for. Our previous sketches have amazed thousands with their accuracy, beauty, and personal resonance.
            </p>
            <div className="space-y-2 text-lg text-foreground/80 mb-6">
                {features.map((feature, index) => (
                    <p key={index}>{feature}</p>
                ))}
            </div>
          </div>
          <div>
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-xs mx-auto"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {galleryItems.map((item, index) => (
                  <CarouselItem key={index}>
                      <Card className="overflow-hidden shadow-lg border-primary/20">
                        <CardContent className="flex aspect-[5/6] items-center justify-center p-0">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={500}
                            height={600}
                            data-ai-hint={item.hint}
                            className="object-cover w-full h-full"
                          />
                        </CardContent>
                      </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
        <div className="mt-11">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
