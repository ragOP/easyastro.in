import React from 'react';
import { CreditCard, Shield, Truck, Zap } from 'lucide-react';

interface SisterOrderSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

export default function SisterOrderSummary({
  subtotal,
  discount,
  total,
  onCheckout,
  isCheckingOut
}: SisterOrderSummaryProps) {
  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Order Summary
        </h2>
        <p className="text-sm text-muted-foreground">
          Complete your soulmate sketch order
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Discount</span>
          <span className="text-green-600">-₹{discount}</span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-foreground">Total</span>
            <span className="text-primary">₹{total}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={isCheckingOut}
        className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
      >
        {isCheckingOut ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Proceed to Checkout
          </>
        )}
      </button>

      {/* Trust Indicators */}
      <div className="space-y-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4" />
          <span>Instant Digital Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span>AI-Powered Results</span>
        </div>
      </div>
    </div>
  );
} 