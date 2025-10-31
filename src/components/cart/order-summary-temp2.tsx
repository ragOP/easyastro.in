import React, { useState, useEffect } from "react";
import { Shield, Sparkles } from "lucide-react";

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

export default function OrderSummaryTemp2({
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
    <>
      <style>{`
        @keyframes borderTravel {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }

        @keyframes buttonShimmer {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }

        .shimmer-border {
          position: relative;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0.8) 0%,
            rgba(236, 72, 153, 0.8) 20%,
            rgba(59, 130, 246, 0.8) 40%,
            rgba(34, 197, 94, 0.8) 60%,
            rgba(168, 85, 247, 0.8) 80%,
            rgba(255, 255, 255, 0.9) 100%
          );
          background-size: 300% 300%;
          animation: borderTravel 6s linear infinite;
          padding: 1px;
        }

        .shimmer-border-inner {
          background: white;
          border-radius: 11px;
          overflow: hidden;
        }

        .checkout-button {
          position: relative;
          background: linear-gradient(
            90deg,
            rgb(147, 51, 234) 0%,
            rgb(236, 72, 153) 50%,
            rgb(147, 51, 234) 100%
          );
          background-size: 200% 200%;
          animation: buttonShimmer 3s ease-in-out infinite;
        }
      `}</style>

      <div className="sticky top-4">
        <div className="shimmer-border">
          <div className="shimmer-border-inner">
            <div className="bg-white rounded-lg p-3">
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Order Summary
              </h3>

              <div className="space-y-2 mb-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-semibold">
                    ₹{totalWithMRP.toLocaleString()}
                  </span>
                </div>

                {discountWithMRP > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600 font-semibold">
                      -₹{discountWithMRP.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-2">
                  {superDiscount > 0 && (
                    <div className="relative flex justify-between items-center py-1.5 px-2 mb-1.5 bg-gradient-to-r from-green-100 to-emerald-50 rounded-lg border border-green-300">
                      <div className="absolute -top-1.5 -left-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        SPECIAL
                      </div>
                      <span className="text-green-800 font-bold text-xs ml-4">
                        {appliedCoupon}% off! 🎉
                      </span>
                      <span className="text-green-700 text-sm font-bold bg-white px-2 py-0.5 rounded border border-green-200">
                        -₹{superDiscount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleButtonClick}
                disabled={isCheckingOut}
                className={`checkout-button w-full text-white py-2 rounded-lg font-semibold transition-all duration-300 transform text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  isPressed
                    ? "scale-95 shadow-inner"
                    : "hover:scale-105 hover:shadow-lg shadow-md"
                }`}
              >
                {isCheckingOut ? (
                  <span className="flex items-center justify-center space-x-1">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Checkout</span>
                    <Sparkles className="w-4 h-4" />
                  </span>
                )}
              </button>

              <div className="mt-2 text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-600 text-xs">
                  <Shield className="w-3 h-3" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
