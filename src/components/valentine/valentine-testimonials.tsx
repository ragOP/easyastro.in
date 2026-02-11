"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, Heart } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Riya M.",
    quote:
      "Bhai sach me rula diya yaar 😭 Ye sketch bilkul mere crush jaisa dikhta hai... Full filmy vibes 😍 100% recommending to my girls this Valentine!",
  },
  {
    name: "Aisha K.",
    quote:
      "I was speechless when I opened it. The sketch looked SO much like the guy I've had a crush on for years. Same eyes, same smile. And the free readings? Spooky accurate!",
  },
  {
    name: "Simran K.",
    quote:
      "Omg I thought it might be a scam but guys… itna accurate?! Sketch dekh ke shock lag gaya 😂 He looks just like someone I secretly like. Ab propose karne ka plan hai 💘",
  },
  {
    name: "Tanvi D.",
    quote:
      "It felt so magical. The drawing looked just like my ex I'm still not over 🙈 And the love report? Perfect for Valentine week. Sending this to my bestie next 💌",
  },
  {
    name: "Anjali B.",
    quote:
      "Maine bas mazaak me mangwaya tha… par jab sketch dekha na, dil hil gaya 🥹 It was literally him. The details were next level. Best Valentine gift to myself ❤️",
  },
  {
    name: "Vikram R.",
    quote:
      "The sketch is now my phone wallpaper—a daily reminder of who to look for. The three free readings gave me so much clarity. Worth every rupee.",
  },
  {
    name: "Sunita M.",
    quote:
      "Received my sketch within 24 hours. The details were incredible—from his eyes to the small mole. The three free readings were the cherry on top!",
  },
  {
    name: "Karan V.",
    quote:
      "The likeness to someone I met a month later is uncanny. I'm a believer now. This Valentine offer with the 3 free readings is insane value.",
  },
  {
    name: "Meera J.",
    quote:
      "Absolutely stunning artwork. The reading provided clarity I didn't even know I was looking for. Perfect for anyone single this Valentine week. Highly recommend!",
  },
  {
    name: "Deepika R.",
    quote:
      "I showed the sketch to my mom and she got emotional. She said it looked like the person she always imagined for me. So beautiful. Thank you!",
  },
  {
    name: "Pooja G.",
    quote:
      "I can't stop looking at my sketch. It feels so real and has given me so much hope. The free readings made everything click. Thank you for this gift!",
  },
  {
    name: "Alok N.",
    quote:
      "Turnaround was so fast, quality top-notch. The Valentine bundle with Soulmate + 3 FREE readings is a no-brainer. Recommend to anyone curious about love.",
  },
];

function TestimonialCard({
  name,
  quote,
  index,
}: {
  name: string;
  quote: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="h-full border-rose-200 bg-white/90 shadow-lg backdrop-blur-sm transition-transform hover:scale-[1.02] hover:border-rose-300 hover:shadow-xl">
        <CardContent className="flex h-full flex-col justify-between p-6">
          <div>
            <Quote className="mb-3 h-8 w-8 text-rose-500" />
            <div className="mb-4 flex text-rose-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="border-l-2 border-rose-300 pl-4 text-rose-800 italic">
              &ldquo;{quote}&rdquo;
            </blockquote>
          </div>
          <p className="mt-4 font-bold text-rose-600">— {name}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ValentineTestimonials() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const plugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: true }));

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-rose-200 bg-gradient-to-b from-pink-50/60 via-rose-50/70 to-pink-50/60 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-rose-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/20 px-4 py-1.5 text-sm font-semibold text-rose-200">
            <Heart className="h-4 w-4 fill-rose-400" />
            Real stories
          </span>
          <h2 className="mt-4 font-headline text-3xl font-bold text-white sm:text-4xl">
            What Our Clients Say This Valentine Week
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-rose-200/80">
            Thousands have discovered their soulmate sketch and 3 free readings. Here’s what they’re saying.
          </p>
        </motion.div>

        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-full sm:basis-[85%] md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <TestimonialCard name={t.name} quote={t.quote} index={i} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex border-rose-500/40 bg-rose-950/80 text-rose-200 hover:bg-rose-900/80" />
          <CarouselNext className="hidden sm:flex border-rose-500/40 bg-rose-950/80 text-rose-200 hover:bg-rose-900/80" />
        </Carousel>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-center"
        >
          <Button
            size="lg"
            onClick={() => router.push("/valentine-cart")}
            className="rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 px-8 py-6 text-base font-bold text-white shadow-lg shadow-rose-900/50 transition-all hover:from-rose-400 hover:to-pink-500 hover:shadow-rose-500/30"
          >
            Get My Soulmate + 3 FREE Readings — ₹498
          </Button>
          <p className="mt-3 text-center text-sm font-medium text-rose-600">
            Only a few spots left this Valentine week!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
