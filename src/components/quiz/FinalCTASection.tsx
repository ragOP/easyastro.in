'use client';
import { motion } from "framer-motion";
import  Link  from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-14 md:py-20 gradient-hero relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-16 left-10 w-48 h-48 bg-coral/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium">Your soulmate awaits</span>
          </motion.div>

          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
            Your soulmate energy is already aligned with you.
          </h2>

          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Take the final step to reveal the face and essence of the person meant for you.
          </p>

             <Link href="/myquiz/quiz-page">
            <Button variant="coral" size="xl"  className="group bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
           
              Reveal My Soulmate Now

              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
                
            </Button>
            </Link>
        

          {/* Micro-copy */}
          <p className="text-xs text-muted-foreground mt-4">
            Takes less than 2 minutes • No physical shipping • One-time payment
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
