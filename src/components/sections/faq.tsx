import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate is the soulmate sketch?",
    answer: "Our sketches blend psychic intuition with astrological insights for a unique and personalized result. Many of our clients are amazed by the accuracy and personal resonance of their sketches.",
  },
  {
    question: "Will my personal details remain private?",
    answer: "Absolutely. All information you provide is strictly confidential and protected with the highest security standards. We never share your data with third parties.",
  },
  {
    question: "How will I receive my sketch?",
    answer: "You will receive your high-quality digital sketch and detailed psychic reading via the email or WhatsApp number you provide during checkout, typically within 24–48 hours.",
  },
  {
    question: "What if I’m not satisfied?",
    answer: "Your satisfaction is our top priority. We offer a full, no-questions-asked money-back guarantee if you’re not completely happy with your soulmate sketch and reading.",
  },
  {
    question: "Can I get more details about my soulmate?",
    answer: "Yes! We offer a 'Full Revelation' upgrade package that provides a more comprehensive report, including a detailed breakdown of physical traits, personality characteristics, and a love timeline.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/20">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
