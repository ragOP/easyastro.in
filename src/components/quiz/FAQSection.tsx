'use client';
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate is the soulmate sketch?",
    answer: "Our readings are based on your unique energy signature, birth details, and emotional patterns. While every person's experience is different, over 90% of our users report feeling a strong connection to their sketch and find it aligns with their intuitive sense of their soulmate.",
  },
  {
    question: "Is this AI-generated or hand-created?",
    answer: "Your sketch is personally crafted by our team of intuitive artists who work with your energy reading. It's not a random AI generation — each sketch is uniquely created based on the specific insights derived from your quiz responses and astrological data.",
  },
  {
    question: "How long does it take to receive my sketch?",
    answer: "Most orders are processed and delivered within 24 hours. You'll receive your complete soulmate sketch along with the personality and compatibility reading directly to your email inbox.",
  },
  {
    question: "What details do you need from me?",
    answer: "We only ask for essential information through our short quiz: your birth date, gender, current emotional state, and relationship preferences. This helps us tune into your unique energy signature accurately.",
  },
  {
    question: "Is my personal data safe and private?",
    answer: "Absolutely. We take your privacy seriously. Your personal information is encrypted and never shared with third parties. We only use your data to create your personalized reading and improve our services.",
  },
  {
    question: "Can I use this even if I'm not deeply into astrology?",
    answer: "Yes! You don't need any prior knowledge of astrology. Our quiz is designed to be intuitive and accessible. Many of our users are simply curious about love and connection, regardless of their familiarity with spiritual practices.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-14 md:py-20 bg-background relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Questions & Answers
          </span>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about your soulmate sketch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-primary/10 px-6 shadow-soft data-[state=open]:shadow-card transition-all duration-300 hover:border-primary/20"
                >
                  <AccordionTrigger className="text-left font-serif text-base md:text-lg font-medium py-5 hover:no-underline hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
