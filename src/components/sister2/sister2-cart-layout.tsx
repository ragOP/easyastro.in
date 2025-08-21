import React from 'react';
import { Heart, Sparkles, Shield, Zap } from 'lucide-react';

interface Sister2CartLayoutProps {
  children: React.ReactNode;
}

export default function Sister2CartLayout({ children }: Sister2CartLayoutProps) {
  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">

      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
} 