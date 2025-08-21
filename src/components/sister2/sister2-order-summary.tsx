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
    <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-800/30 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">
          Order Summary
        </h2>
        <p className="text-sm text-gray-200">
          Complete your soulmate sketch order
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-200">Subtotal</span>
          <span className="text-white">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-200">Discount</span>
          <span className="text-green-400">-₹{discount}</span>
        </div>
        <div className="border-t border-white/20 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-white">Total</span>
            <span className="text-pink-300">₹{total}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={isCheckingOut}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
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
      <div className="space-y-3 text-xs text-gray-300">
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