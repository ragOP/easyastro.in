
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Gift } from "lucide-react";

interface SpecialOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpecialOfferPopup({ isOpen, onClose }: SpecialOfferPopupProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0">
      <Card className="relative w-[90vw] max-w-md m-4 bg-card border-primary/50 shadow-2xl animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
        <CardHeader className="text-center items-center pb-2">
            <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Gift className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl text-primary">
                Wait! A Special Offer For You
            </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-foreground/80 mb-4">
                You're just moments away from seeing your soulmate. As a special gift, we're giving you an extra <span className="font-bold text-primary">25% DISCOUNT</span> on your order!
            </p>
            <div className="p-4 bg-primary/10 rounded-lg mb-6 text-left">
                <p className="font-semibold text-primary">Your order includes:</p>
                <ul className="list-disc list-inside text-foreground/80 mt-2 space-y-1">
                    <li>A Personalized Psychic Sketch</li>
                    <li className="font-bold">A FREE In-Depth Love Reading</li>
                </ul>
            </div>
          <a href={process.env.NEXT_PUBLIC_DISCOUNT_CTA_URL} onClick={onClose}>
            <Button size="lg" className="w-full font-bold text-lg py-6 animate-shine">
              Claim My 25% Discount Now
            </Button>
          </a>
          <p className="mt-2 text-sm text-muted-foreground">Offer applied at checkout.</p>
        </CardContent>
      </Card>
    </div>
  );
}
