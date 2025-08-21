import React from 'react';
import { Heart, Sparkles, Shield, Zap } from 'lucide-react';

interface SisterCartLayoutProps {
  children: React.ReactNode;
}

export default function SisterCartLayout({ children }: SisterCartLayoutProps) {
  return (
    <div className="sister-cart-layout">

      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
} 