'use client'; 

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/myquiz";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isHome ? "bg-transparent" : "bg-background/80 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="container px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
        
          <Link href="/myquiz" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-button transition-shadow duration-300">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">
              Soulmate Sketch
            </span>
          </Link>

          <Link
            href="/myquiz/quiz-page"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;