'use client';

import  Link  from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Heart, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div 
              className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </motion.div>
            <span className="font-serif text-lg font-semibold text-foreground">
              Soulmate Sketch
            </span>
          </motion.div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/myquiz/quiz-page" className="hover:text-primary transition-colors">
              Quiz
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Instagram className="w-4 h-4 text-primary" />
            </motion.a>
          </div>
        </div>

        {/* Policies & Information Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-4 text-center md:text-left">
            Policies & Information
          </h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm text-muted-foreground">
            <Link href="/myquiz/quiz-privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/myquiz/quiz-terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/myquiz/quiz-refund" className="hover:text-primary transition-colors">
              Refund & Cancellation Policy
            </Link>
            <Link href="/myquiz/quiz-contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <motion.p 
            className="text-sm text-muted-foreground flex items-center justify-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 text-coral fill-coral" />
            </motion.span>{" "}
            for seekers of love
          </motion.p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            © 2024 Soulmate Sketch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
