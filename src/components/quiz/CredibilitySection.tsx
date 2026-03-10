'use client';
import { motion } from "framer-motion";
import { Shield, Users, Zap, Lock } from "lucide-react";

const badges = [
  { icon: Shield, text: "Secure Payment" },
  { icon: Users, text: "50,000+ Users" },
  { icon: Zap, text: "Instant Delivery" },
  { icon: Lock, text: "Private & Safe" },
];

const CredibilitySection = () => {
  return (
    <section className="py-10 gradient-soft border-y border-primary/10">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground/80 text-sm font-medium">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilitySection;
