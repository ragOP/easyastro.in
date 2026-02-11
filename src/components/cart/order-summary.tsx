"use client";

import React, { useState, useEffect } from "react";
import { Shield, Sparkles } from "lucide-react";
import { useCartTheme } from "@/contexts/cart-theme-context";

interface OrderSummaryProps {
  subtotal: number;
  discount?: number;
  total?: number;
  isCheckingOut: boolean;
  onCheckout: () => void;
  additionalTotal?: number;
  discountWithMRP?: number;
  totalWithMRP?: number;
  finalAmount?: number;
  setFinalAmount?: (amount: number) => void;
}

export default function OrderSummary({
  subtotal,
  discount = 0,
  discountWithMRP = 0,
  totalWithMRP = 0,
  total = 0,
  isCheckingOut,
  onCheckout,
  additionalTotal = 0,
  finalAmount = 0,
  setFinalAmount = () => {},
}: OrderSummaryProps) {
  const theme = useCartTheme();
  const isValentine = theme === "valentine";
  const [isPressed, setIsPressed] = useState(false);
  const [finalDiscount, setFinalDiscount] = useState(discount);
  const [finalTotal, setFinalTotal] = useState(total || subtotal);
  const [superDiscount, setSuperDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("rag60")) {
      const totalBeforeDiscount = subtotal + additionalTotal;
      const discountValue = Math.round(totalBeforeDiscount * 0.6);
      setFinalDiscount(discount);
      setSuperDiscount(discountValue);
      setFinalTotal(totalBeforeDiscount - discountValue);
      setFinalAmount(totalBeforeDiscount - discountValue);
      setAppliedCoupon(60);
    } else if (params.has("rag30")) {
      const totalBeforeDiscount = subtotal + additionalTotal;
      const discountValue = Math.round(totalBeforeDiscount * 0.3);
      setFinalDiscount(discount);
      setSuperDiscount(discountValue);
      setFinalTotal(totalBeforeDiscount - discountValue);
      setFinalAmount(totalBeforeDiscount - discountValue);
      setAppliedCoupon(30);
    } else if (params.has("rag75")) {
      const totalBeforeDiscount = subtotal + additionalTotal;
      const discountValue = Math.round(totalBeforeDiscount * 0.75);
      setFinalDiscount(discount);
      setSuperDiscount(discountValue);
      setFinalTotal(totalBeforeDiscount - discountValue);
      setFinalAmount(totalBeforeDiscount - discountValue);
      setAppliedCoupon(75);
    } else {
      setFinalDiscount(discount);
      setFinalTotal(total || subtotal + additionalTotal - discount);
      setFinalAmount(total || subtotal + additionalTotal - discount);
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
        <div className={`absolute -inset-1 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 ${isValentine ? "bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20" : "bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20"}`}></div>
        <div className={`relative backdrop-blur-xl rounded-3xl p-6 border ${isValentine ? "bg-gradient-to-br from-rose-950/90 to-rose-950/60 border-rose-500/30" : "bg-gradient-to-br from-white/90 to-white/80 border-primary/20"}`}>
          <h3 className={isValentine ? "text-xl font-bold text-white mb-6" : "text-xl font-bold text-foreground mb-6"}>
            Order Summary
          </h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className={isValentine ? "text-rose-200/80" : "text-muted-foreground"}>Subtotal</span>
              <span className={isValentine ? "text-rose-100 font-semibold" : "text-foreground font-semibold"}>
                ₹{totalWithMRP.toLocaleString()}
              </span>
            </div>
            {discountWithMRP > 0 && (
              <div className="flex justify-between items-center">
                <span className={isValentine ? "text-rose-300" : "text-green-600"}>Discount</span>
                <span className={isValentine ? "text-rose-300 font-semibold" : "text-green-600 font-semibold"}>
                  -₹{discountWithMRP.toLocaleString()}
                </span>
              </div>
            )}
            <div className={isValentine ? "border-t border-rose-500/30 pt-4" : "border-t border-border pt-4"}>
              {superDiscount > 0 && (
                <div className={`relative flex justify-between items-center py-3 px-3 my-3 rounded-lg shadow-md ${isValentine ? "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30" : "bg-gradient-to-r from-green-100 to-emerald-50 border border-green-300"}`}>
                  <div className={isValentine ? "absolute -top-2 -left-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full shadow-md" : "absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md"}>SPECIAL</div>
                  <div className="flex items-center gap-2 ml-6">
                    <Sparkles className={`w-5 h-5 animate-pulse ${isValentine ? "text-rose-400" : "text-green-600"}`} />
                    <span className={isValentine ? "text-rose-200 font-bold text-lg" : "text-green-800 font-bold text-lg"}>Yay! {appliedCoupon}% off applied on this order 🎉</span>
                  </div>
                  <span className={isValentine ? "text-rose-200 text-xl font-bold bg-rose-950/50 px-3 py-1 rounded-md shadow border border-rose-500/30 animate-pulse" : "text-green-700 text-xl font-bold bg-white px-3 py-1 rounded-md shadow border border-green-200 animate-pulse"}>
                    -₹{superDiscount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className={isValentine ? "text-lg font-semibold text-white" : "text-lg font-semibold text-foreground"}>
                  Total
                </span>
                <span className={isValentine ? "text-2xl font-bold text-rose-300" : "text-2xl font-bold text-primary"}>
                  ₹{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleButtonClick}
            disabled={isCheckingOut}
            className={
              isValentine
                ? `w-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white py-4 rounded-full font-semibold transition-all duration-300 transform shadow-lg shadow-rose-900/50 disabled:opacity-50 disabled:cursor-not-allowed hover:from-rose-400 hover:via-rose-500 hover:to-pink-500 ${isPressed ? "scale-95" : "hover:scale-[1.02] active:scale-95"}`
                : `w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-full font-semibold transition-all duration-300 transform shadow-xl animate-shine disabled:opacity-50 disabled:cursor-not-allowed ${isPressed ? "scale-95 shadow-inner from-primary/90 to-primary/70" : "hover:from-primary/90 hover:to-primary/70 hover:scale-105 hover:shadow-primary/25"}`
            }
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
            <div className={`flex items-center justify-center space-x-2 text-sm ${isValentine ? "text-rose-200/70" : "text-muted-foreground"}`}>
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
