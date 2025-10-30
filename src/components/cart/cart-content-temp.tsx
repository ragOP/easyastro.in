import React from "react";
import CartEmpty from "./cart-empty";
import CartItem from "./cart-item";
import AdditionalProducts from "./additional-products";
import ConsultationForm from "./consultation-form";
import OrderSummary from "./order-summary";
import CartItemTemp from "./cart-item-temp";
import FormTemp from "./form-temp";
import AdditionalTemp from "./additional-temp";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
}

interface CartContentProps {
  cartItems: CartItem[];
  additionalProducts: Product[];
  selectedProducts: string[];
  consultationFormData: FormData;
  subtotal: number;
  discount: number;
  discountWithMRP: number;
  totalWithMRP: number;
  total: number;
  additionalTotal: number;
  isCheckingOut: boolean;
  animateElements: boolean;
  onRemove: (id: string) => void;
  onProductToggle: (productId: string) => void;
  onConsultationFormSubmit: (data: FormData) => void;
  onCheckout: () => void;
  setConsultationFormData: (data: FormData) => void;
  finalAmount: number;
  setFinalAmount: (amount: number) => void;
}

export default function CartContentTemp({
  cartItems,
  additionalProducts,
  selectedProducts,
  consultationFormData,
  subtotal,
  discount,
  discountWithMRP,
  totalWithMRP,
  total,
  additionalTotal,
  isCheckingOut,
  animateElements,
  onRemove,
  onProductToggle,
  onConsultationFormSubmit,
  onCheckout,
  setConsultationFormData,
  finalAmount,
  setFinalAmount,
}: CartContentProps) {
  return (
    <>
      {cartItems.length === 0 ? (
        /* Empty Cart */
        <CartEmpty animateElements={animateElements} />
      ) : (
        <>
          {/* Cart Items - Mobile Layout */}
          <div
            className={`lg:hidden grid grid-cols-1 px-4 gap-4 sm:gap-6 pb-24 transition-all duration-1000 delay-500 transform ${
              animateElements
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Cart Items List */}
            <div className="space-y-4 sm:space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`transition-all duration-700 delay-${
                    index * 200
                  } transform ${
                    animateElements
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                >
                  <CartItemTemp
                    item={item}
                    onRemove={onRemove}
                    showRemoveButton={false}
                  />
                </div>
              ))}
            </div>

            {/* Order Summary and Forms - Mobile: Stacked */}
            <div className="space-y-4 sm:space-y-6">
              {/* Additional Products Section */}

              {/* Consultation Form */}
              <div
                className={`transition-all duration-700 delay-800 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <FormTemp
                  onSubmit={onConsultationFormSubmit}
                  formData={consultationFormData}
                  setFormData={setConsultationFormData}
                />
              </div>
              <div
                className={`transition-all duration-700 delay-700 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <AdditionalTemp
                  products={additionalProducts}
                  selectedProducts={selectedProducts}
                  onProductToggle={onProductToggle}
                />
              </div>
              {/* Order Summary */}
              <div
                className={`transition-all duration-700 delay-900 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <OrderSummary
                  subtotal={subtotal}
                  discount={discount}
                  discountWithMRP={discountWithMRP}
                  totalWithMRP={totalWithMRP}
                  total={total}
                  additionalTotal={additionalTotal}
                  isCheckingOut={isCheckingOut}
                  onCheckout={onCheckout}
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div
            className={`hidden lg:block px-4 transition-all duration-1000 delay-500 transform ${
              animateElements
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Main Cart Item */}
              <div
                className={`transition-all duration-700 delay-200 transform ${
                  animateElements
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
              >
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={onRemove}
                    showRemoveButton={false}
                  />
                ))}
              </div>

              {/* Additional Products Section */}

              {/* Consultation Form */}
              <div
                className={`transition-all duration-700 delay-600 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <FormTemp
                  onSubmit={onConsultationFormSubmit}
                  formData={consultationFormData}
                  setFormData={setConsultationFormData}
                />
              </div>
              <div
                className={`transition-all duration-700 delay-400 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <AdditionalTemp
                  products={additionalProducts}
                  selectedProducts={selectedProducts}
                  onProductToggle={onProductToggle}
                />
              </div>
              {/* Order Summary */}
              <div
                className={`transition-all duration-700 delay-800 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <OrderSummary
                  subtotal={subtotal}
                  discount={discount}
                  discountWithMRP={discountWithMRP}
                  totalWithMRP={totalWithMRP}
                  total={total}
                  additionalTotal={additionalTotal}
                  finalAmount={finalAmount}
                  setFinalAmount={setFinalAmount}
                  isCheckingOut={isCheckingOut}
                  onCheckout={onCheckout}
                />
              </div>
            </div>
          </div>

          {/* Sticky Bottom Button - Mobile Only */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white via-white to-white/80 backdrop-blur-sm border-t border-border p-4 shadow-2xl">
            <button
              onClick={onCheckout}
              disabled={isCheckingOut}
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-base"
            >
              {isCheckingOut ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                `Proceed to Checkout • ₹${(
                  subtotal + additionalTotal
                ).toLocaleString()}`
              )}
            </button>
          </div>
        </>
      )}
    </>
  );
}
