"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Sparkles, ShieldCheck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import CousinCta from "./CousinCta";

type Testimonial = { name: string; quote: string };

const TESTIMONIALS: Testimonial[] = [
  { name: "Riya Malhotra", quote: "Bhai sach me rula diya yaar 😭😭 Ye sketch bilkul mere crush jaisa dikhta hai... I don’t know how you guys do this! Full filmy vibes 😍 100% recommending this to my girls group 🩷" },
  { name: "Aisha Khan", quote: "I was literally speechless when I opened it. The sketch looked SO much like the guy I’ve had a crush on for years. Like seriously, same eyes, same smile. You’re insane!!" },
  { name: "Simran Kaur", quote: "Omg mujhe laga ye koi scam hoga but guys… itna accurate?! Sketch dekh ke shock lag gaya 😂 He looks just like someone I secretly like. Ab toh usko propose karne ka plan hai 😭💘" },
  { name: "Tanvi Desai", quote: "It felt so magical. The drawing looked just like my ex I’m still not over 🙈 And the love report? Spooky accurate! I’m sending this to my bestie next 💌" },
  { name: "Anjali Bansal", quote: "Sachi bataun? Maine bas mazaak me mangwaya tha… par jab sketch dekha na, dil hil gaya 🥹💔 It was literally him. The details were next level. Pls keep doing this amazing work ❤️" },
  { name: "Vikram R.", quote: "A friend recommended this, and I'm so glad I tried it. The sketch is now my phone wallpaper, a daily reminder of who to look for." },
  { name: "Sunita M.", quote: "I received my sketch within 24 hours as promised. The details were incredible, from his eyes to the small mole on his cheek." },
  { name: "Karan V.", quote: "The likeness to someone I met a month later is uncanny. I'm a believer now. This service is worth every penny and more!" },
  { name: "Aisha B.", quote: "The entire process was so simple and the result was beyond my expectations. The sketch has a very calming presence." },
  { name: "Rohan D.", quote: "This was a fun and surprisingly moving experience. The description of my soulmate's character felt very real and familiar." },
  { name: "Meera J.", quote: "Absolutely stunning artwork. The psychic reading provided clarity that I didn't even know I was looking for. Highly recommend!" },
  { name: "Arjun P.", quote: "The customer service was excellent and the delivery was fast. The sketch itself is a work of art that I will cherish." },
  { name: "Isha V.", quote: "This is more than a sketch; it's a piece of hope. The reading was so positive and aligned with my own feelings. Thank you!" },
  { name: "Amit K.", quote: "The quality of the artwork is phenomenal. It's a very professional service and the reading was surprisingly detailed and uplifting." },
  { name: "Deepika R.", quote: "I showed the sketch to my mom and she got emotional. She said it looked like the person she always imagined for me. So beautiful." },
  { name: "Rajesh S.", quote: "Got this for my sister as a gift and she absolutely loved it. The look on her face when she saw the sketch was priceless. 10/10 recommend." },
  { name: "Kavita C.", quote: "The details in the sketch are insane! It's like the artist peered into my soul. I'm so excited for my future." },
  { name: "Manish T.", quote: "This was a gift for my anniversary, and my wife and I were both amazed. The reading was so insightful and positive." },
  { name: "Pooja G.", quote: "I can't stop looking at my sketch. It feels so real and has given me so much hope. Thank you for this beautiful gift!" },
  { name: "Alok N.", quote: "The turnaround was so fast, and the quality is top-notch. I highly recommend this to anyone curious about their soulmate." },
];

function TestimonialCard({ name, quote }: Testimonial) {
  return (
    <Card className="group h-full overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 shadow-sm backdrop-blur transition-all hover:shadow-md">
      <CardContent className="flex h-full flex-col p-5">
        {/* Stars */}
        <div className="mb-3 flex text-primary">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative mb-4 flex-1 text-sm italic leading-relaxed text-foreground/80 sm:text-[0.95rem]">
          <span className="absolute -left-3 top-0 h-full w-1 rounded-full bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
          <span className="pl-3">“{quote}”</span>
        </blockquote>

        {/* Name */}
        <p className="mt-auto pt-3 text-right font-semibold text-primary">— {name}</p>
      </CardContent>
    </Card>
  );
}

interface TestimonialsSectionProps {
  isCartPage?: boolean;
}

export default function TestimonialsSection({ isCartPage = false }: TestimonialsSectionProps) {
  const plugin = React.useRef(Autoplay({ delay: 4200, stopOnInteraction: true }));
  const [paused, setPaused] = React.useState(false);

  const onEnter = () => {
    plugin.current.stop();
    setPaused(true);
  };
  const onLeave = () => {
    plugin.current.reset();
    setPaused(false);
  };

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-gradient-to-b from-background via-background/70 to-background py-10 sm:py-16"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_280px_at_50%_-10%,theme(colors.primary/10),transparent)]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Loved by thousands
          </div>
          <h2
            id="testimonials-title"
            className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl"
          >
            What Our Clients Say
          </h2>
          <p className="mt-2 text-sm text-foreground/60 sm:text-base">
            Real reviews from customers who received their private sketch & reading.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Glow frame */}
          <div className="absolute -inset-0.5 -z-10 rounded-[28px] bg-gradient-to-br from-primary/30 via-fuchsia-500/25 to-primary/10 opacity-80 blur-2xl" />
          <div className="rounded-3xl border border-white/10 bg-card/80 p-2 shadow-2xl backdrop-blur">
            <Carousel
              aria-label="Customer testimonials"
              plugins={[plugin.current]}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="w-full"
              opts={{ align: "start", loop: true }}
            >
              <CarouselContent className="-ml-4">
                {TESTIMONIALS.map((t, i) => (
                  <CarouselItem key={i} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="h-full p-1">
                      <TestimonialCard name={t.name} quote={t.quote} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          {/* Autoplay status pill */}
          <div className="pointer-events-none absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary backdrop-blur">
            {paused ? "Paused" : "Auto-rotating"}
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-4 py-2 text-sm text-foreground/70 backdrop-blur">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Verified purchases • Private & secure
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <CousinCta isCartPage={isCartPage} />
        </div>
      </div>
    </section>
  );
}
