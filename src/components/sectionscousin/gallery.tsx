"use client";

import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import CtaButton from "../common/cta-button";
import { Sparkles, ShieldCheck, Paintbrush, CheckCircle2 } from "lucide-react";

type GalleryItem = {
  src: string;
  hint: string;
  alt: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
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

const FEATURES = [
  { icon: Paintbrush, text: "Hand-drawn art, unique to you" },
  { icon: Sparkles, text: "Astrology & psychic intuition aligned" },
  { icon: ShieldCheck, text: "Private delivery within 24–48 hours" },
];

interface GallerySectionProps {
  isCartPage?: boolean;
}

export default function GallerySection({ isCartPage = false }: GallerySectionProps) {
  const plugin = React.useRef(Autoplay({ delay: 4200, stopOnInteraction: true }));
  const [isPaused, setIsPaused] = React.useState(false);

  // Accessible pause/resume for autoplay
  const handleMouseEnter = () => {
    plugin.current.stop();
    setIsPaused(true);
  };
  const handleMouseLeave = () => {
    plugin.current.reset();
    setIsPaused(false);
  };

  return (
    <section
      aria-labelledby="gallery-title"
      className="relative overflow-hidden bg-gradient-to-b from-background via-background/70 to-background py-10 sm:py-16"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_280px_at_50%_-10%,theme(colors.primary/10),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: Copy */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary lg:mx-0">
              <Sparkles className="h-4 w-4" />
              Verified results • Loved by thousands
            </div>

            <h2
              id="gallery-title"
              className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl"
            >
              Past Work & Proof
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              Imagine seeing the detailed features of the person you’re destined for. These real
              examples show the care, accuracy, and emotion our artists bring to every piece.
            </p>

            <ul className="mx-auto mt-6 grid max-w-xl gap-3 text-left lg:mx-0">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-card/70 px-4 py-3 backdrop-blur"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <div className="flex items-center gap-2 text-foreground/85">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Carousel */}
          <div className="order-1">
            <div className="relative mx-auto w-full max-w-md sm:max-w-lg">
              {/* Glow frame */}
              <div className="absolute -inset-0.5 -z-10 rounded-[28px] bg-gradient-to-br from-primary/30 via-fuchsia-500/25 to-primary/10 opacity-80 blur-2xl" />
              <div className="rounded-3xl border border-white/10 bg-card/80 p-2 shadow-2xl backdrop-blur">
                <Carousel
                  aria-label="Soulmate sketch examples"
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  opts={{ loop: true, align: "center" }}
                >
                  <CarouselContent>
                    {GALLERY_ITEMS.map((item, index) => (
                      <CarouselItem key={index} className="select-none">
                        <Card className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm">
                          <CardContent className="p-0">
                            <figure className="relative">
                              <div className="relative aspect-[5/6] w-full overflow-hidden">
                                <Image
                                  src={item.src}
                                  alt={item.alt}
                                  width={1000}
                                  height={1200}
                                  data-ai-hint={item.hint}
                                  className="h-full w-full object-cover"
                                  priority={index === 0}
                                />
                              </div>
                              <figcaption className="flex items-center justify-between gap-2 px-4 py-3 text-xs text-foreground/70">
                                <span>{item.alt}</span>
                                <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                                  Sample artwork
                                </span>
                              </figcaption>
                            </figure>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </div>

              {/* Autoplay status pill */}
              <div className="pointer-events-none absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary backdrop-blur">
                {isPaused ? "Paused preview" : "Auto-rotating preview"}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <CtaButton isCartPage={isCartPage} />
        </div>

        {/* Helper caption */}
        <p className="mt-3 text-center text-sm text-foreground/60">
          Your final sketch is personalized to your energy and details.
        </p>
      </div>
    </section>
  );
}
