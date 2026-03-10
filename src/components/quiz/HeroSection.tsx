'use client';
import { motion } from "framer-motion";
import  Link  from "next/link";
import { Button } from "@/components/ui/button";
import FloatingElements from "./FloatingElements";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-hero">
      <FloatingElements />
      
      <div className="container relative z-10 px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              Trusted by 50,000+ seekers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] mb-5"
          >
            <span className="block">Your soulmate already exists.</span>
            <span className="block bg-gradient-to-r from-primary to-coral bg-clip-text text-transparent">
              Let's reveal how they look.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8"
          >
            A personalized sketch & reading based on your energy, birth details, 
            and emotional patterns.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <Link href="/myquiz/quiz-page">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="hero" size="xl" className="group">
                  <motion.span
                    className="flex items-center"
                    animate={{ opacity: [1, 0.9, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Start Your Soulmate Quiz
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              Takes less than 2 minutes • 100% personalized • Digital delivery
            </p>

            {/* Micro-urgency badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-2 mt-2 text-xs text-coral/80"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited readings processed daily</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
