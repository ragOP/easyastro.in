"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const IMAGES = [
  "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png",
  "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/1.png",
  "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/2.png",
  "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/3.png",
  "/sketch-1.jpeg",
  "/sketch-2.jpeg",
];

export default function ValentineHeroSlideshow() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-10 mx-auto max-w-md"
    >
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true, align: "center" }}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {IMAGES.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-rose-200 shadow-xl">
                <Image
                  src={src}
                  alt="Soulmate sketch"
                  fill
                  className="object-cover"
                  sizes="(max-width: 448px) 100vw, 28rem"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-2 border-rose-200 bg-white/90 text-rose-700 hover:bg-rose-50" />
        <CarouselNext className="hidden sm:flex -right-2 border-rose-200 bg-white/90 text-rose-700 hover:bg-rose-50" />
      </Carousel>
      <p className="mt-2 text-center text-xs text-rose-600">Swipe or use arrows — yours is personalised</p>
    </motion.div>
  );
}
