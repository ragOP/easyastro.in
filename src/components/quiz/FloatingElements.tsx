'use client';
import { motion } from "framer-motion";
import { Sparkles, Heart, Star, Moon, Sun } from "lucide-react";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-coral/15 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-rose/20 rounded-full blur-3xl animate-pulse-soft" />
      
      {/* Subtle wave overlay */}
      <svg className="absolute bottom-0 w-full h-48 opacity-20" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path
          d="M0,100 C360,180 720,20 1080,100 C1260,140 1380,100 1440,100 L1440,200 L0,200 Z"
          fill="hsl(350 80% 60% / 0.1)"
        />
        <path
          d="M0,120 C480,200 960,40 1440,120 L1440,200 L0,200 Z"
          fill="hsl(15 85% 65% / 0.08)"
        />
      </svg>
      
      {/* Floating icons - very subtle */}
      <motion.div
        className="absolute top-32 left-[15%]"
        animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-5 h-5 text-coral/25" />
      </motion.div>
      
      <motion.div
        className="absolute top-48 right-[20%]"
        animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Heart className="w-4 h-4 text-primary/20" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-[15%]"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Star className="w-3 h-3 text-rose/30" />
      </motion.div>
      
      <motion.div
        className="absolute top-[60%] left-[10%]"
        animate={{ y: [5, -15, 5], x: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Moon className="w-4 h-4 text-coral/20" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-[40%] right-[25%]"
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        <Sun className="w-4 h-4 text-primary/15" />
      </motion.div>

      <motion.div
        className="absolute top-[25%] right-[35%]"
        animate={{ y: [8, -8, 8], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Sparkles className="w-3 h-3 text-primary/20" />
      </motion.div>
    </div>
  );
};

export default FloatingElements;
