"use client";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles, ShieldCheck, HelpCircle, Clock, Mail } from "lucide-react";

type Faq = { question: string; answer: string };

const FAQS: Faq[] = [
  {
    question: "सोलमेट स्केच कितना सटीक होता है?",
    answer:
      "हमारे स्केच साइकि्क इंट्यूशन और ज्योतिषीय इनसाइट्स का मिश्रण होते हैं, ताकि आपको एक यूनिक और पर्सनलाइज़्ड result मिल सके। हमारे बहुत से क्लाइंट्स इस बात से हैरान रहते हैं कि स्केच उनके लिए कितना accurate और personally resonate करता है।",
  },
  {
    question: "क्या मेरी निजी जानकारी पूरी तरह प्राइवेट रहेगी?",
    answer:
      "बिल्कुल। आप जो भी जानकारी साझा करते हैं, वह पूरी तरह गोपनीय रखी जाती है और उच्चतम सुरक्षा मानकों के साथ सुरक्षित की जाती है। हम आपका डेटा कभी भी किसी थर्ड पार्टी के साथ शेयर नहीं करते।",
  },
  {
    question: "मुझे मेरा स्केच कैसे मिलेगा?",
    answer:
      "आपको आपका high-quality डिजिटल स्केच और डिटेल्ड psychic रीडिंग उसी ईमेल या व्हाट्सएप नंबर पर भेजी जाएगी जो आप चेकआउट के समय देते हैं — आमतौर पर 24–48 घंटों के अंदर।",
  },
  {
    question: "अगर मैं संतुष्ट न रहूँ तो?",
    answer:
      "आपकी संतुष्टि हमारे लिए सबसे ज़्यादा महत्वपूर्ण है। अगर आप अपने सोलमेट स्केच और रीडिंग से पूरी तरह खुश नहीं हैं, तो हम बिना किसी सवाल के फुल money-back गारंटी देते हैं।",
  },
  {
    question: "क्या मुझे अपने सोलमेट के बारे में और डिटेल्स मिल सकती हैं?",
    answer:
      "हाँ! हम ‘फुल रिवेलेशन’ अपग्रेड पैकेज ऑफर करते हैं जिसमें और भी डीटेल्ड रिपोर्ट मिलती है — जैसे शारीरिक विशेषताएँ, personality के गुण, और आपकी लव टाइमलाइन का गहराई से विश्लेषण।",
  },
];

export default function FaqSection() {
  // Optional: JSON-LD for rich results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/70 to-background py-10 sm:py-16">
      {/* background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_280px_at_50%_-10%,theme(colors.primary/10),transparent)]" />

      <div className="container mx-auto max-w-3xl px-4">
        {/* header */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            मददगार जवाब
          </div>
          <h2 className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl">
            अक्सर पूछे जाने वाले सवाल
          </h2>
          <p className="mt-2 text-sm text-foreground/60 sm:text-base">
            अपना प्राइवेट स्केच ऑर्डर करने से पहले जानने लायक सारी ज़रूरी बातें।
          </p>
        </div>

        {/* accordion */}
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="group rounded-2xl border border-foreground/10 bg-card/70 px-4 shadow-sm backdrop-blur transition-all hover:shadow-md data-[state=open]:border-primary/25 data-[state=open]:bg-card/80"
            >
              <AccordionTrigger className="text-left text-base font-semibold leading-6 text-foreground hover:no-underline sm:text-lg">
                <span className="inline-flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-7 pr-1 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* policy + support row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-sm text-foreground/70 sm:flex-row">
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 hover:border-primary/20 hover:text-foreground backdrop-blur"
          >
            <ShieldCheck className="h-5 w-5 text-primary" />
            पॉलिसी और सपोर्ट
          </Link>

          <div className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 backdrop-blur">
              <Clock className="h-5 w-5 text-primary" />
              24 घंटों के अंदर जवाब मिलता है
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-3 py-2 backdrop-blur">
              <Mail className="h-5 w-5 text-primary" />
              no-reply@easyastro.in.
            </span>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
