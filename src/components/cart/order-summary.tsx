import React, { useState, useEffect } from 'react';
import { Shield, Sparkles } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  discount?: number;
  total?: number;
  isCheckingOut: boolean;
  onCheckout: () => void;
  additionalTotal?: number;
}

export default function OrderSummary({ subtotal, discount = 0, total = 0, isCheckingOut, onCheckout, additionalTotal = 0 }: OrderSummaryProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [finalDiscount, setFinalDiscount] = useState(discount);
  const [finalTotal, setFinalTotal] = useState(total || subtotal);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('rag60')) {
      const totalBeforeDiscount = subtotal + additionalTotal;
      const discountValue = Math.round(totalBeforeDiscount * 0.6);
      setFinalDiscount(discountValue);
      setFinalTotal(totalBeforeDiscount - discountValue);
    } else if (params.has('rag30')) {
      const totalBeforeDiscount = subtotal + additionalTotal;
      const discountValue = Math.round(totalBeforeDiscount * 0.3);
      setFinalDiscount(discountValue);
      setFinalTotal(totalBeforeDiscount - discountValue);
    }else if (params.has('rag75')) {
      const totalBeforeDiscount = subtotal + additionalTotal;
      const discountValue = Math.round(totalBeforeDiscount * 0.75);
      setFinalDiscount(discountValue);
      setFinalTotal(totalBeforeDiscount - discountValue);
    }else {
      setFinalDiscount(discount);
      setFinalTotal(total || (subtotal + additionalTotal) - discount);
    }
  }, [subtotal, discount, total, additionalTotal]);

  const handleButtonClick = async () => {
    if (isCheckingOut) return;

    setIsPressed(true);
    onCheckout();

    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  return (
    <div className="sticky top-8">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-3xl p-6 border border-primary/20">
          <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground font-semibold">₹{subtotal.toLocaleString()}</span>
            </div>
            {finalDiscount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600 font-semibold">-₹{finalDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleButtonClick}
            disabled={isCheckingOut}
            className={`w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-full font-semibold transition-all duration-300 transform shadow-xl animate-shine disabled:opacity-50 disabled:cursor-not-allowed ${
              isPressed 
                ? 'scale-95 shadow-inner from-primary/90 to-primary/70' 
                : 'hover:from-primary/90 hover:to-primary/70 hover:scale-105 hover:shadow-primary/25'
            }`}
          >
            {isCheckingOut ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Complete Purchase</span>
                <Sparkles className="w-5 h-5" />
              </span>
            )}
          </button>
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground text-sm">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
