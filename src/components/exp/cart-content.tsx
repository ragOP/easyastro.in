import React from "react";
import CartEmpty from "./cart-empty";
import CartItem from "./cart-item";
import AdditionalProducts from "./additional-products";
import ConsultationForm from "./consultation-form";
import OrderSummary from "./order-summary";

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

export default function CartContent({
  cartItems,
  additionalProducts,
  selectedProducts,
  consultationFormData,
  subtotal,
  discount,
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
    <div className="relative">
      {/* Mystical Background Overlay for Cart Content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
      </div>
      
      {cartItems.length === 0 ? (
        <CartEmpty animateElements={animateElements} />
      ) : (
        <>
          <div
            className={`lg:hidden grid grid-cols-1 px-4 gap-4 sm:gap-6 transition-all duration-1000 delay-500 transform relative z-10 ${
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
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="relative">
                      <CartItem
                        item={item}
                        onRemove={onRemove}
                        showRemoveButton={false}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div
                className={`transition-all duration-700 delay-800 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative group">
                  {/* Mystical aura around consultation form */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative">
                    <ConsultationForm
                      onSubmit={onConsultationFormSubmit}
                      formData={consultationFormData}
                      setFormData={setConsultationFormData}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`transition-all duration-700 delay-700 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative">
                    <AdditionalProducts
                      products={additionalProducts}
                      selectedProducts={selectedProducts}
                      onProductToggle={onProductToggle}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`transition-all duration-700 delay-900 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/15 via-orange-500/15 to-red-500/15 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative">
                    <OrderSummary
                      subtotal={subtotal}
                      discount={discount}
                      total={total}
                      additionalTotal={additionalTotal}
                      isCheckingOut={isCheckingOut}
                      onCheckout={onCheckout}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`hidden lg:block px-4 transition-all duration-1000 delay-500 transform relative z-10 ${
              animateElements
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="max-w-6xl mx-auto space-y-8">
              <div
                className={`transition-all duration-700 delay-200 transform ${
                  animateElements
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
              >
                {cartItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="relative">
                      <CartItem
                        item={item}
                        onRemove={onRemove}
                        showRemoveButton={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`transition-all duration-700 delay-600 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative">
                    <ConsultationForm
                      onSubmit={onConsultationFormSubmit}
                      formData={consultationFormData}
                      setFormData={setConsultationFormData}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`transition-all duration-700 delay-400 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative">
                    <AdditionalProducts
                      products={additionalProducts}
                      selectedProducts={selectedProducts}
                      onProductToggle={onProductToggle}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`transition-all duration-700 delay-800 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/15 via-orange-500/15 to-red-500/15 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative">
                    <OrderSummary
                      subtotal={subtotal}
                      discount={discount}
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
            </div>
          </div>
        </>
      )}
    </div>
  );
}
