"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const GALLERY_IMAGES = [
  { src: "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png", alt: "Soulmate sketch", caption: "Personalised sketch" },
  { src: "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2002_54_36%20PM.png", alt: "Soulmate portrait", caption: "Hand-drawn portrait" },
  { src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/1.png", alt: "Client sketch", caption: "From our gallery" },
  { src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/2.png", alt: "Soulmate sketch", caption: "Past work" },
  { src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/3.png", alt: "Artistic sketch", caption: "Unique to you" },
  { src: "https://ik.imagekit.io/5r36kvobl/Untitled%20design.png", alt: "Love and destiny", caption: "Destiny art" },
  { src: "/sketch-1.jpeg", alt: "Soulmate sketch", caption: "Sketch style" },
  { src: "/sketch-2.jpeg", alt: "Soulmate sketch", caption: "Detailed work" },
  { src: "/feature-1.jpeg", alt: "Feature", caption: "Quality detail" },
  { src: "/feature-2.jpeg", alt: "Feature", caption: "Art quality" },
  { src: "/bracelet.jpg", alt: "Love attractor", caption: "Optional add-on" },
  { src: "/easyastro-sister-bg.jpg", alt: "Journey", caption: "Your journey" },
];

export default function ValentineGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const plugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: true }));

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0f] via-[#2d1519] to-[#1a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(190,24,93,0.25),transparent_50%)]" />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-400/30 px-4 py-1.5 text-sm font-semibold text-rose-200">
            ✨ Gallery
          </span>
          <h2 className="mt-4 font-headline text-3xl font-bold text-white sm:text-4xl">
            Real Sketches, Real Love Stories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-rose-200/80">
            Every sketch is hand-drawn and unique. Swipe through our work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true, align: "center" }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {GALLERY_IMAGES.map((img, i) => (
                <CarouselItem key={i} className="pl-2 sm:pl-4 basis-full sm:basis-[85%] md:basis-2/3">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-rose-500/20 shadow-2xl shadow-black/30">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 66vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <p className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-white">
                      {img.caption}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex border-rose-500/40 bg-rose-950/90 text-rose-200 hover:bg-rose-900/90" />
            <CarouselNext className="hidden sm:flex border-rose-500/40 bg-rose-950/90 text-rose-200 hover:bg-rose-900/90" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
