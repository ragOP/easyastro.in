import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
const faqs = [
  {
    question: "When will I receive my sketch?",
    answer: "Within 24h digitally.",
  },
  {
    question: "When will I get the bracelet?",
    answer: "3–5 working days, safely packed.",
  },
  {
    question: "How is the bracelet energized?",
    answer:
      "On Purnima, under full moon rituals, infused with mantras by astrologers.",
  },
  {
    question: "Is this safe & private?",
    answer: "100% confidential. Sketch + details never shared.",
  },
  {
    question: "Refunds?",
    answer:
      "Digital sketches = non-refundable once delivered. Bracelet refunds only if damaged/missing.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-background">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-playfair text-purple-700 text-center mb-4 sm:mb-10">
          Got Questions? We’ve Got Answers.
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-primary/20"
            >
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}

          {/* <Link
  href="/about"
  className="text-brand-700 hover:text-brand-500 underline cursor-pointer"
>
  About
</Link> */}
          {/* <p>Speklio media</p> */}
        </Accordion>

        <Link
          href="/legal"
          className="text-brand-700 hover:text-brand-500 underline cursor-pointer pt-4"
        >
          Policy & Support
        </Link>
      </div>
    </section>
  );
}
