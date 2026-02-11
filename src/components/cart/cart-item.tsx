"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { X, Heart } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useCartTheme } from '@/contexts/cart-theme-context';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    features: string[];
  };
  onRemove: (id: string) => void;
  showRemoveButton?: boolean;
}

// Inner component that uses useSearchParams
function CartItemInner({ item, onRemove, showRemoveButton = true }: CartItemProps) {
  const searchParams = useSearchParams();
  const theme = useCartTheme();
  const isValentine = theme === 'valentine';
  const [displayPrice, setDisplayPrice] = useState(item.price);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    // Check for coupon codes in URL parameters
    if (searchParams.has('rag30')) {
      const discountedPrice = Math.round(item.price * 0.7); // 30% off
      setDisplayPrice(discountedPrice);
      setDiscountPercentage(30);
    } else if (searchParams.has('rag60')) {
      const discountedPrice = Math.round(item.price * 0.4); // 60% off
      setDisplayPrice(discountedPrice);
      setDiscountPercentage(60);
    } else if (searchParams.has('rag75')) {
      const discountedPrice = Math.round(item.price * 0.25); // 75% off
      setDisplayPrice(discountedPrice);
      setDiscountPercentage(75);
    } else {
      setDisplayPrice(item.price);
      setDiscountPercentage(0);
    }
  }, [item.price, searchParams]);
  return (
    <div className={isValentine ? "rounded-2xl shadow-lg border-2 border-rose-200 bg-white/90 overflow-hidden" : "bg-card rounded-2xl shadow-lg border border-border overflow-hidden"}>
      <div className="px-4 py-4">
        {/* Header with Remove Button */}
        <div className="flex items-start justify-end">
          {showRemoveButton && (
            <button
              onClick={() => onRemove(item.id)}
              className={isValentine ? "p-2 text-rose-600 hover:text-rose-700 transition-colors duration-200" : "p-2 text-muted-foreground hover:text-primary transition-colors duration-200"}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Column Stack */}
        <div className="space-y-4">
          {/* Row: Image + Title/Subtitle */}
          <div className="flex items-start gap-4">
            {/* Product Image */}
            <div className="w-24 pl-2 h-30 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-rose-500/20">
              <img
                src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Title and Subtitle */}
            <div className="flex-1">
              <h3 className={isValentine ? "text-lg font-bold text-white mb-1" : "text-lg font-bold text-foreground mb-1"}>
                {item.name}
              </h3>
              <p className={isValentine ? "text-sm text-rose-700" : "text-sm text-muted-foreground"}>
                {item.description}
              </p>
            </div>
          </div>
          
          {/* Points - Full Row */}
          <div className="space-y-2 mb-2 pb-4">
            {item.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Heart className={isValentine ? "w-3 h-3 text-rose-500 flex-shrink-0" : "w-3 h-3 text-primary flex-shrink-0"} />
                <span className={isValentine ? "text-xs text-rose-700" : "text-xs text-foreground/80"}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className={isValentine ? "flex items-center justify-between pt-2 border-t border-rose-200" : "flex items-center justify-between pt-2 border-t border-border"}>
          <div className="flex items-center space-x-3">
            <span className={isValentine ? "text-2xl font-bold text-rose-600" : "text-2xl font-bold text-primary"}>
              ₹{displayPrice}
            </span>
            <span className={isValentine ? "text-lg text-rose-400/70 line-through" : "text-lg text-muted-foreground line-through"}>
              ₹{item.originalPrice}
            </span>
            {discountPercentage > 0 ? (
              <div className="flex items-center space-x-2">
                <span className={isValentine ? "text-sm text-rose-600 font-medium" : "text-sm text-green-600 font-medium"}>
                  {discountPercentage}% OFF
                </span>
                <span className={isValentine ? "text-xs bg-rose-200 text-rose-800 px-2 py-1 rounded-full font-semibold" : "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold"}>
                  COUPON APPLIED
                </span>
              </div>
            ) : (
              <span className={isValentine ? "text-sm text-rose-300 font-medium" : "text-sm text-green-600 font-medium"}>
                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export component with Suspense boundary
export default function CartItem(props: CartItemProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartItemInner {...props} />
    </Suspense>
  );
} 