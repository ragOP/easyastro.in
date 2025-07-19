"use client";

import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/ui/countdown-timer";

export default function StickyCtaBar() {
    // Set offer end time to 10 minutes from now
    const offerEndTime = new Date(Date.now() + 10 * 60 * 1000);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-card p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-t border-primary/20">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="text-center">
                    <p className="font-bold text-primary animate-pulse text-sm mb-1">Offer Ends In:</p>
                    <CountdownTimer endTime={offerEndTime} />
                </div>
                <div className="flex items-baseline gap-3">
                    <span className="text-2xl text-muted-foreground line-through">₹998</span>
                    <span className="text-4xl font-bold text-primary">₹499</span>
                </div>
            </div>
            
            <a href="mailto:contact@soulmatevision.com" className="w-full sm:w-auto">
                <Button size="lg" className="w-full font-bold text-lg py-6 animate-shine">
                    Reveal My Soulmate Now
                </Button>
            </a>
        </div>
    </div>
  );
}
