import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import CtaButton from "../common/cta-button";

const galleryItems = [
  {
    src: "https://placehold.co/500x600.png",
    hint: "portrait sketch",
    alt: "Example of a soulmate sketch",
  },
  {
    src: "https://placehold.co/500x601.png",
    hint: "pencil drawing",
    alt: "Another example of a soulmate sketch",
  },
  {
    src: "https://placehold.co/500x602.png",
    hint: "artistic portrait",
    alt: "A beautiful soulmate sketch",
  },
  {
    src: "https://placehold.co/500x603.png",
    hint: "charcoal sketch",
    alt: "A detailed soulmate sketch",
  },
    {
    src: "https://placehold.co/500x604.png",
    hint: "psychic art",
    alt: "An intuitive soulmate sketch",
  },
];

const features = [
    "Hand-drawn art",
    "Unique to you",
    "Rooted in astrology and psychic intuition"
]

export default function GallerySection() {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-headline mb-4">Past Work / Proof</h2>
            <p className="text-lg text-foreground/80 mb-8">
              Imagine seeing the detailed features of the person you’re destined for. Our previous sketches have amazed thousands with their accuracy, beauty, and personal resonance.
            </p>
            <ul className="space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 justify-center lg:justify-start">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <span className="text-lg">{feature}</span>
                    </li>
                ))}
            </ul>
          </div>
          <div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-sm mx-auto"
            >
              <CarouselContent>
                {galleryItems.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-1">
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
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex"/>
              <CarouselNext className="hidden sm:flex"/>
            </Carousel>
          </div>
        </div>
        <CtaButton />
      </div>
    </section>
  );
}
