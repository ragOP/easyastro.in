'use client';
import { motion } from "framer-motion";
import { Sparkles, Palette, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Energy-Based Analysis",
    description: "Your unique energy signature reveals deep insights about your destined connection.",
  },
  {
    icon: Palette,
    title: "Hand-Drawn Digital Sketch",
    description: "A personalized artistic rendering capturing your soulmate's essence and appearance.",
  },
  {
    icon: Heart,
    title: "Deep Emotional Insight",
    description: "Understand the emotional patterns and compatibility that will define your bond.",
  },
];

const TrustSection = () => {
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
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
            This isn't generic astrology
          </h2>
          <p className="text-muted-foreground">
            Every reading is uniquely crafted based on your personal energy and celestial alignment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card variant="elevated" className="h-full hover:scale-[1.02] transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-button">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
