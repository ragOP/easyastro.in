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
  {
    name: "Riya Malhotra",
    quote:
      "भाई सच में रुला दिया यार 😭😭 ये स्केच बिलकुल मेरे क्रश जैसा दिखता है... समझ नहीं आता आप लोग ऐसा कैसे कर लेते हो! पूरी filmy vibes 😍 100% अपनी गर्ल्स ग्रुप को recommend कर रही हूँ 🩷",
  },
  {
    name: "Aisha Khan",
    quote:
      "मैं literally कुछ सेकंड के लिए बिल्कुल चुप हो गई थी। स्केच बिलकुल उसी लड़के जैसा लगा जिस पर मैं सालों से क्रश रखती हूँ — वही आँखें, वही स्माइल… आप लोग seriously कमाल हो!!",
  },
  {
    name: "Simran Kaur",
    quote:
      "OMG मुझे लगा ये कोई scam होगा, पर guys… इतना accurate?! स्केच देख के literally झटका लग गया 😂 वो बिलकुल उस इंसान जैसा दिख रहा था जिसे मैं secretly पसंद करती हूँ। अब तो उसको propose करने का प्लान है 😭💘",
  },
  {
    name: "Tanvi Desai",
    quote:
      "पूरी feeling ही magical थी। ड्रॉइंग बिलकुल मेरे ex जैसी लगी जिससे मैं आज भी पूरी तरह move on नहीं कर पाई 🙈 और love report? डरावनी हद तक सही निकली! अब ये मैं अपनी bestie को भी भिजवा रही हूँ 💌",
  },
  {
    name: "Anjali Bansal",
    quote:
      "सच्ची बताऊँ? मैंने तो बस मज़ाक–मज़ाक में मंगवा लिया था… पर जब स्केच देखा ना, दिल सच में हिल गया 🥹💔 बिल्कुल वही इंसान था। डिटेल्स तो next level थीं। प्लीज़ ये शानदार काम ऐसे ही करते रहो ❤️",
  },
  {
    name: "Vikram R.",
    quote:
      "एक दोस्त ने suggest किया था और मैं बहुत खुश हूँ कि मैंने try किया। अब ये स्केच मेरे फ़ोन का वॉलपेपर है — रोज़ याद दिलाता है कि मुझे किस तरह के इंसान को ढूँढना है।",
  },
  {
    name: "Sunita M.",
    quote:
      "मुझे मेरा स्केच वादे के मुताबिक 24 घंटों के अंदर मिल गया। डिटेल्स कमाल की थीं — आँखों से लेकर गाल पर छोटे से तिल तक सब कुछ साफ़ दिख रहा था।",
  },
  {
    name: "Karan V.",
    quote:
      "स्केच से मिलते–जुलते features वाला इंसान मुझे एक महीने बाद real life में मिला। ये समानता वाकई हैरान कर देने वाली थी। अब तो मैं believer बन गया हूँ। ये सर्विस हर पैसे की क़ीमत रखती है!",
  },
  {
    name: "Aisha B.",
    quote:
      "पूरा process बहुत आसान था और result मेरी उम्मीदों से कहीं ज़्यादा अच्छा निकला। स्केच देखने में बहुत soothing लगा, जैसे शांति दे रहा हो।",
  },
  {
    name: "Rohan D.",
    quote:
      "ये experience मज़ेदार होने के साथ–साथ surprisingly emotional भी था। मेरे सोलमेट के character की जो description आई, वो बड़ी real और जानी–पहचानी सी लगी।",
  },
  {
    name: "Meera J.",
    quote:
      "Artwork बिल्कुल stunning था। psychic reading ने मुझे ऐसी clarity दी जिसकी मुझे ज़रूरत थी पर मैं खुद नहीं जानती थी। दिल से recommend करती हूँ!",
  },
  {
    name: "Arjun P.",
    quote:
      "कस्टमर सर्विस बहुत बढ़िया थी और delivery भी fast रही। स्केच खुद में एक ऐसा piece of art है जिसे मैं लंबे समय तक संभाल कर रखूँगा।",
  },
  {
    name: "Isha V.",
    quote:
      "ये सिर्फ एक स्केच नहीं है, उम्मीद का एक टुकड़ा है। reading इतनी पॉज़िटिव और मेरी feelings के साथ aligned लगी कि दिल हल्का हो गया। Thank you so much!",
  },
  {
    name: "Amit K.",
    quote:
      "Artwork की क्वालिटी phenomenal थी। सर्विस बहुत professional लगी और reading surprisingly detailed और uplifting थी।",
  },
  {
    name: "Deepika R.",
    quote:
      "मैंने स्केच अपनी मम्मी को दिखाया तो वो emotional हो गईं। बोलीं — ये बिल्कुल वैसा ही लग रहा है जैसा उन्होंने हमेशा मेरे लिए सोचा था। सच में बहुत ख़ूबसूरत था।",
  },
  {
    name: "Rajesh S.",
    quote:
      "मैंने ये अपनी बहन के लिए gift में लिया और उसको तो literally बहुत ज़्यादा पसंद आया। जब उसने स्केच देखा तो उसके चेहरे की smile देखने लायक थी। 10/10 recommend.",
  },
  {
    name: "Kavita C.",
    quote:
      "स्केच में जो डिटेल्स थीं, वो insane level की थीं! ऐसा लगा जैसे artist ने सीधे मेरे दिल के अंदर झाँक लिया हो। अब अपने future के लिए और excited महसूस कर रही हूँ।",
  },
  {
    name: "Manish T.",
    quote:
      "ये मैंने अपनी शादी की anniversary पर लिया और मैं और मेरी wife दोनों genuinely impressed हो गए। reading बहुत insightful और पॉज़िटिव थी।",
  },
  {
    name: "Pooja G.",
    quote:
      "मैं अपना स्केच बार–बार देखती रहती हूँ। वो इतना real लगता है और मेरे अंदर फिर से उम्मीद जगा दी है। इस सुन्दर तोहफ़े के लिए शुक्रिया!",
  },
  {
    name: "Alok N.",
    quote:
      "Turnaround बहुत तेज़ था और क्वालिटी top-notch। जो भी अपने सोलमेट के बारे में थोड़ा भी curious है, उसे मैं ज़रूर try करने की सलाह दूँगा।",
  },
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
            हज़ारों लोगों का भरोसा
          </div>
          <h2
            id="testimonials-title"
            className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl"
          >
            हमारे क्लाइंट क्या कहते हैं
          </h2>
          <p className="mt-2 text-sm text-foreground/60 sm:text-base">
            वे असली रिव्यूज़, जो उन ग्राहकों से हैं जिन्हें उनका प्राइवेट स्केच और रीडिंग मिल चुकी है।
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Glow frame */}
          <div className="absolute -inset-0.5 -z-10 rounded-[28px] bg-gradient-to-br from-primary/30 via-fuchsia-500/25 to-primary/10 opacity-80 blur-2xl" />
          <div className="rounded-3xl border border-white/10 bg-card/80 p-2 shadow-2xl backdrop-blur">
            <Carousel
              aria-label="कस्टमर रिव्यूज़"
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
            {paused ? "रुका हुआ है" : "अपने-आप बदल रहा है"}
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-4 py-2 text-sm text-foreground/70 backdrop-blur">
            <ShieldCheck className="h-5 w-5 text-primary" />
            वेरिफाइड पर्चेज • प्राइवेट और सुरक्षित
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
