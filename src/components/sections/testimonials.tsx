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
import React from "react";

const testimonials = [
  {
    name: "Riya Malhotra",
    quote:
      "Bhai sach me rula diya yaar 😭😭 Ye sketch bilkul mere crush jaisa dikhta hai... I don’t know how you guys do this! Full filmy vibes 😍 100% recommending this to my girls group 🩷",
  },
  {
    name: "Aisha Khan",
    quote:
      "I was literally speechless when I opened it. The sketch looked SO much like the guy I’ve had a crush on for years. Like seriously, same eyes, same smile. You’re insane!!",
  },
  {
    name: "Simran Kaur",
    quote:
      "Omg mujhe laga ye koi scam hoga but guys… itna accurate?! Sketch dekh ke shock lag gaya 😂 He looks just like someone I secretly like. Ab toh usko propose karne ka plan hai 😭💘",
  },
  {
    name: "Tanvi Desai",
    quote:
      "It felt so magical. The drawing looked just like my ex I’m still not over 🙈 And the love report? Spooky accurate! I’m sending this to my bestie next 💌",
  },
  {
    name: "Anjali Bansal",
    quote:
      "Sachi bataun? Maine bas mazaak me mangwaya tha… par jab sketch dekha na, dil hil gaya 🥹💔 It was literally him. The details were next level. Pls keep doing this amazing work ❤️",
  },
  {
    name: "Vikram R.",
    quote:
      "A friend recommended this, and I'm so glad I tried it. The sketch is now my phone wallpaper, a daily reminder of who to look for.",
  },
  {
    name: "Sunita M.",
    quote:
      "I received my sketch within 24 hours as promised. The details were incredible, from his eyes to the small mole on his cheek.",
  },
  {
    name: "Karan V.",
    quote:
      "The likeness to someone I met a month later is uncanny. I'm a believer now. This service is worth every penny and more!",
  },
  {
    name: "Aisha B.",
    quote:
      "The entire process was so simple and the result was beyond my expectations. The sketch has a very calming presence.",
  },
  {
    name: "Rohan D.",
    quote:
      "This was a fun and surprisingly moving experience. The description of my soulmate's character felt very real and familiar.",
  },
  {
    name: "Meera J.",
    quote:
      "Absolutely stunning artwork. The psychic reading provided clarity that I didn't even know I was looking for. Highly recommend!",
  },
  {
    name: "Arjun P.",
    quote:
      "The customer service was excellent and the delivery was fast. The sketch itself is a work of art that I will cherish.",
  },
  {
    name: "Isha V.",
    quote:
      "This is more than a sketch; it's a piece of hope. The reading was so positive and aligned with my own feelings. Thank you!",
  },
  {
    name: "Amit K.",
    quote:
      "The quality of the artwork is phenomenal. It's a very professional service and the reading was surprisingly detailed and uplifting.",
  },
  {
    name: "Deepika R.",
    quote:
      "I showed the sketch to my mom and she got emotional. She said it looked like the person she always imagined for me. So beautiful.",
  },
  {
    name: "Rajesh S.",
    quote:
      "Got this for my sister as a gift and she absolutely loved it. The look on her face when she saw the sketch was priceless. 10/10 recommend.",
  },
  {
    name: "Kavita C.",
    quote:
      "The details in the sketch are insane! It's like the artist peered into my soul. I'm so excited for my future.",
  },
  {
    name: "Manish T.",
    quote:
      "This was a gift for my anniversary, and my wife and I were both amazed. The reading was so insightful and positive.",
  },
  {
    name: "Pooja G.",
    quote:
      "I can't stop looking at my sketch. It feels so real and has given me so much hope. Thank you for this beautiful gift!",
  },
  {
    name: "Alok N.",
    quote:
      "The turnaround was so fast, and the quality is top-notch. I highly recommend this to anyone curious about their soulmate.",
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className=" bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-7 sm:mb-16">
          What Our Clients Say
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
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
        <div className="mt-11">
          <CtaButton isCartPage={isCartPage} />
        </div>
      </div>
    </section>
  );
}
