"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const GALLERY_IMAGES = [
  {
    src: "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png",
    alt: "Soulmate sketch example",
    caption: "Personalised sketch",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2002_54_36%20PM.png",
    alt: "Soulmate portrait",
    caption: "Hand-drawn portrait",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/1.png",
    alt: "Client soulmate sketch",
    caption: "From our gallery",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/2.png",
    alt: "Soulmate sketch sample",
    caption: "Past work",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/3.png",
    alt: "Artistic soulmate sketch",
    caption: "Unique to you",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/Untitled%20design.png",
    alt: "Love and destiny",
    caption: "Destiny art",
  },
  { src: "/sketch-1.jpeg", alt: "Soulmate sketch 1", caption: "Sketch style" },
  { src: "/sketch-2.jpeg", alt: "Soulmate sketch 2", caption: "Detailed work" },
  { src: "/feature-1.jpeg", alt: "Feature example", caption: "Quality detail" },
  { src: "/feature-2.jpeg", alt: "Feature example 2", caption: "Art quality" },
  { src: "/bracelet.jpg", alt: "Love attractor", caption: "Optional add-on" },
  { src: "/easyastro-sister-bg.jpg", alt: "EasyAstro", caption: "Your journey" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 200 },
  },
};

export default function ValentineGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden border-t border-pink-200/60 bg-gradient-to-b from-white/60 to-pink-50/40 px-4 py-14 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(244,114,182,0.15),transparent)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-300/60 bg-pink-100/80 px-4 py-1.5 text-sm font-semibold text-pink-800">
            ✨ Past work & proof
          </span>
          <h2 className="mt-4 font-headline text-3xl font-bold text-zinc-900 sm:text-4xl">
            Real Sketches, Real Love Stories
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-600">
            Every sketch is hand-drawn and unique. See why thousands trust us this Valentine week.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border-2 border-pink-200/60 bg-white shadow-lg transition-shadow hover:shadow-xl hover:shadow-pink-200/30"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${
                    hovered === i ? "opacity-100" : "group-hover:opacity-80"
                  }`}
                />
                <p
                  className={`absolute bottom-0 left-0 right-0 p-3 text-sm font-medium text-white transition-all duration-300 ${
                    hovered === i ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  }`}
                >
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
