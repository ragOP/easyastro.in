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
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ShieldCheck, Paintbrush, CheckCircle2, ChevronsLeftRight } from "lucide-react";
import CousinCta from "./CousinCta";

/**
 * GallerySection — HINDI VERSION
 */

type GalleryItem = {
  src: string;
  hint: string;
  alt: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/2.png",
    hint: "चेहरे का स्केच",
    alt: "सोलमेट स्केच का एक उदाहरण",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/3.png",
    hint: "पेंसिल ड्रॉइंग",
    alt: "सोलमेट स्केच का एक और उदाहरण",
  },
  {
    src: "https://ik.imagekit.io/5r36kvobl/Reviews%20-%20Soulmate/1.png",
    hint: "कलात्मक पोर्ट्रेट",
    alt: "एक सुंदर सोलमेट स्केच",
  },
];

const FEATURES = [
  { icon: Paintbrush, text: "हाथ से बना आर्ट, सिर्फ आपके लिए" },
  { icon: Sparkles, text: "ज्योतिष और साइकि्क इंट्यूशन के साथ संरेखित" },
  { icon: ShieldCheck, text: "24–48 घंटों के भीतर निजी डिलीवरी" },
];

interface GallerySectionProps {
  isCartPage?: boolean;
}

export default function GallerySection({ isCartPage = false }: GallerySectionProps) {
  const plugin = React.useRef(Autoplay({ delay: 4200, stopOnInteraction: true }));
  const [isPaused, setIsPaused] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setIndex(api.selectedScrollSnap());
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

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
      className="relative overflow-hidden py-8 sm:py-14 bg-background"
    >
      {/* background accents (desktop/tablet only) */}
      <div className="pointer-events-none absolute -top-24 -left-24 hidden h-80 w-80 rounded-full bg-primary/15 blur-3xl sm:block" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 hidden h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl sm:block" />
      <div className="pointer-events-none absolute inset-0 hidden sm:block [background:radial-gradient(900px_280px_at_50%_-10%,theme(colors.primary/10),transparent)]" />

      <div className="container mx-auto px-4">
        {/* Layout: stack on mobile, split on lg */}
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          {/* LEFT: Copy */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary lg:mx-0">
              <Sparkles className="h-4 w-4" />
              असली नतीजे • हज़ारों लोगों का भरोसा
            </div>

            <h2
              id="gallery-title"
              className="mt-3 font-headline text-[1.65rem] leading-tight text-foreground md:text-4xl"
            >
              हमारा काम और सबूत
            </h2>

            <p className="mt-3 text-base leading-relaxed text-foreground/80 md:text-lg">
              सोचिए, जब आप उस इंसान के चेहरे की बारीक बातें देखेंगे जो आपके लिए बना है। ये असली
              उदाहरण दिखाते हैं कि हर स्केच में हमारे कलाकार कितनी{" "}
              <span className="font-semibold">केयर, डिटेल और इमोशन</span> डालते हैं।
            </p>

            <ul className="mx-auto mt-5 grid max-w-xl gap-2.5 text-left lg:mx-0">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-card/80 px-3 py-2.5 backdrop-blur"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <div className="flex items-center gap-2 text-foreground/85">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-[0.95rem]">{text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Carousel */}
          <div className="order-1">
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
              {/* Subtle frame (muted on mobile) */}
              <div className="absolute -inset-0.5 -z-10 hidden rounded-[28px] bg-gradient-to-br from-primary/30 via-fuchsia-500/25 to-primary/10 opacity-80 blur-2xl sm:block" />
              <div className="rounded-2xl border border-white/10 bg-card/90 p-2 shadow-xl backdrop-blur">
                <Carousel
                  aria-label="सोलमेट स्केच के उदाहरण"
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  opts={{ loop: true, align: "center", skipSnaps: true }}
                  setApi={setApi}
                >
                  <CarouselContent>
                    {GALLERY_ITEMS.map((item, i) => (
                      <CarouselItem key={i} className="select-none">
                        <Card className="overflow-hidden rounded-xl border border-foreground/10 shadow-sm">
                          <CardContent className="p-0">
                            <figure className="relative">
                              {/* Fixed, safe aspect to prevent layout shift */}
                              <div className="relative aspect-[4/5] w-full overflow-hidden">
                                <Image
                                  src={item.src}
                                  alt={item.alt}
                                  width={800}
                                  height={1000}
                                  data-ai-hint={item.hint}
                                  className="h-full w-full object-cover"
                                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 520px, 600px"
                                  priority={i === 0}
                                />
                              </div>
                              <figcaption className="flex items-center justify-between gap-2 px-3 py-2 text-[11px] text-foreground/70 sm:text-xs">
                                <span className="truncate">{item.alt}</span>
                                <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  सैंपल आर्टवर्क
                                </span>
                              </figcaption>
                            </figure>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Prev/Next visible ≥sm, hidden on phones for simplicity */}
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </div>

              {/* Dots + swipe hint (mobile) */}
              <div className="mt-3 flex items-center justify-between">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {GALLERY_ITEMS.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`स्लाइड ${i + 1} पर जाएं`}
                      onClick={() => api?.scrollTo(i)}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        index === i ? "bg-primary w-5" : "bg-foreground/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Swipe hint (only on small screens) */}
                <div className="flex items-center gap-1 text-xs text-foreground/50 sm:hidden">
                  <ChevronsLeftRight className="h-4 w-4" />
                  स्वाइप करें
                </div>
              </div>

              {/* Autoplay status pill (muted on mobile) */}
              <div className="pointer-events-none mx-auto mt-2 w-max rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold text-primary backdrop-blur sm:text-xs">
                {isPaused ? "प्रीव्यू रुका हुआ है" : "ऑटो प्रीव्यू चल रहा है"}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <CousinCta isCartPage={isCartPage} />
        </div>

        {/* Helper caption */}
        <p className="mt-2 text-center text-xs text-foreground/60 sm:text-sm">
          आपका अंतिम स्केच आपकी ऊर्जा और आपकी जानकारी के आधार पर व्यक्तिगत रूप से तैयार किया जाता है।
        </p>
      </div>
    </section>
  );
}
