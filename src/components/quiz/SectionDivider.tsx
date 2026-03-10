'use client';
import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "gradient" | "wave" | "dots";
}

const SectionDivider = ({ variant = "gradient" }: SectionDividerProps) => {
  if (variant === "wave") {
    return (
      <div className="relative h-16 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-full" 
          viewBox="0 0 1440 64" 
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
            fill="hsl(350 80% 60% / 0.05)"
          />
        </svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="flex justify-center gap-2 py-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="w-1.5 h-1.5 rounded-full bg-primary/30"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
  );
};

export default SectionDivider;
