'use client';
import { motion } from "framer-motion";
import { Sparkles, Heart, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const UrgencySection = () => {
  return (
    <section className="py-14 md:py-20 bg-background relative overflow-hidden">
      {/* Subtle background wave */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,60 1440,60 L1440,120 L0,120 Z"
            fill="hsl(350 80% 60% / 0.08)"
          />
        </svg>
      </div>

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/10 border border-coral/20 mb-6"
          >
            <Clock className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-coral">Today's energy window is open</span>
          </motion.div>

          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-4 leading-tight">
            Some connections appear only{" "}
            <span className="text-coral font-semibold">once in a lifetime.</span>
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto">
            Your current emotional and astrological alignment makes this the right moment 
            to discover your soulmate.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card variant="glass" className="border-coral/15">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-coral" />
                  </div>
                  <p className="text-sm text-foreground/80 text-left leading-relaxed">
                    <span className="font-semibold text-foreground">Most users feel clarity</span>{" "}
                    within 24 hours of receiving their reading
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card variant="glass" className="border-primary/15">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground/80 text-left leading-relaxed">
                    <span className="font-semibold text-foreground">This reading reflects</span>{" "}
                    your current energy — delaying may change results
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UrgencySection;
