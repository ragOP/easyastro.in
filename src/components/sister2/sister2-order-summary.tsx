import React from 'react';
import { CreditCard, Shield, Truck, Zap } from 'lucide-react';

interface Sister2OrderSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

export default function Sister2OrderSummary({
  subtotal,
  discount,
  total,
  onCheckout,
  isCheckingOut
}: Sister2OrderSummaryProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-['Montserrat'] text-xl font-bold text-white mb-2">
          Order Summary
        </h2>
        <p className="text-sm text-white/80">
          Complete your soulmate sketch order
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Subtotal</span>
          <span className="text-white">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Discount</span>
          <span className="text-green-400">-₹{discount}</span>
        </div>
        <div className="border-t border-white/20 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-white">Total</span>
            <span className="font-['Montserrat'] text-[rgb(224,82,177)]">₹{total}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={isCheckingOut}
        className="w-full bg-gradient-to-r from-[rgb(224,82,177)] to-[rgb(200,70,160)] text-white py-3 px-4 rounded-lg font-['Montserrat'] font-semibold hover:from-[rgb(200,70,160)] hover:to-[rgb(180,60,140)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2 relative overflow-hidden animate-shine"
      >
        {isCheckingOut ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Complete Purchase
          </>
        )}
      </button>

      {/* Trust Indicators */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground text-sm">
          <Shield className="w-4 h-4 text-white" />
          <span className='text-white'>Secure Payment</span>
        </div>
      </div>
    </div>
  );
} 