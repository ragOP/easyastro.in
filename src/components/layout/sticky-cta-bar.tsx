"use client";

import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/ui/countdown-timer";

export default function StickyCtaBar() {
    // Set offer end time to 3 days from now
    const offerEndTime = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-card p-4 rounded-lg shadow-2xl border-2 border-primary w-80">
            <CountdownTimer endTime={offerEndTime} />
            <div className="flex justify-center items-baseline gap-3 my-4">
                <span className="text-xl text-muted-foreground line-through">₹998</span>
                <span className="text-4xl font-bold text-primary">₹499</span>
            </div>
            <a href="mailto:contact@soulmatevision.com" className="w-full">
                <Button size="lg" className="w-full font-bold text-lg py-6 animate-shine">
                    Reveal My Soulmate Now
                </Button>
            </a>
        </div>
    </div>
  );
}
