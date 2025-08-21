import React from 'react';
// Sister2 cart components
import Sister2CartEmpty from './sister2-cart-empty';
import Sister2CartItem from './sister2-cart-item';
import Sister2AdditionalProducts from './sister2-additional-products';
import Sister2ConsultationForm from './sister2-consultation-form';
import Sister2OrderSummary from './sister2-order-summary';

interface Sister2CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface Sister2Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface Sister2FormData {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
}

interface Sister2CartContentProps {
  cartItems: Sister2CartItem[];
  additionalProducts: Sister2Product[];
  selectedProducts: string[];
  consultationFormData: Sister2FormData;
  subtotal: number;
  discount: number;
  total: number;
  isCheckingOut: boolean;
  animateElements: boolean;
  onRemove: (id: string) => void;
  onProductToggle: (productId: string) => void;
  onConsultationFormSubmit: (data: Sister2FormData) => void;
  onCheckout: () => void;
  setConsultationFormData: (data: Sister2FormData) => void;
}

export default function Sister2CartContent({
  cartItems,
  additionalProducts,
  selectedProducts,
  consultationFormData,
  subtotal,
  discount,
  total,
  isCheckingOut,
  animateElements,
  onRemove,
  onProductToggle,
  onConsultationFormSubmit,
  onCheckout,
  setConsultationFormData
}: Sister2CartContentProps) {
  return (
    <>
      {cartItems.length === 0 ? (
        /* Empty Cart */
        <Sister2CartEmpty animateElements={animateElements} />
      ) : (
        <>
          {/* Cart Items - Mobile Layout */}
          <div
            className={`lg:hidden grid grid-cols-1 px-4 gap-4 sm:gap-6 transition-all duration-1000 delay-500 transform ${
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
                  <Sister2CartItem item={item} onRemove={onRemove} showRemoveButton={false} />
                </div>
              ))}
            </div>

            {/* Additional Products */}
            <div
              className={`transition-all duration-1000 delay-700 transform ${
                animateElements
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <Sister2AdditionalProducts
                products={additionalProducts}
                selectedProducts={selectedProducts}
                onProductToggle={onProductToggle}
              />
            </div>

            {/* Consultation Form */}
            <div
              className={`transition-all duration-1000 delay-900 transform ${
                animateElements
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <Sister2ConsultationForm
                formData={consultationFormData}
                onSubmit={onConsultationFormSubmit}
                setFormData={setConsultationFormData}
              />
            </div>

            {/* Order Summary */}
            <div
              className={`transition-all duration-1000 delay-1100 transform ${
                animateElements
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <Sister2OrderSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
                onCheckout={onCheckout}
                isCheckingOut={isCheckingOut}
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8">
            {/* Left Column - Cart Items + Additional Products */}
            <div className="lg:col-span-8 space-y-6">
              {/* Cart Items */}
              <div
                className={`transition-all duration-1000 delay-500 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="space-y-4">
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
                      <Sister2CartItem item={item} onRemove={onRemove} showRemoveButton={true} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Products */}
              <div
                className={`transition-all duration-1000 delay-700 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Sister2AdditionalProducts
                  products={additionalProducts}
                  selectedProducts={selectedProducts}
                  onProductToggle={onProductToggle}
                />
              </div>

              {/* Consultation Form */}
              <div
                className={`transition-all duration-1000 delay-900 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Sister2ConsultationForm
                  formData={consultationFormData}
                  onSubmit={onConsultationFormSubmit}
                  setFormData={setConsultationFormData}
                />
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-4">
              <div
                className={`sticky top-8 transition-all duration-1000 delay-1100 transform ${
                  animateElements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Sister2OrderSummary
                  subtotal={subtotal}
                  discount={discount}
                  total={total}
                  onCheckout={onCheckout}
                  isCheckingOut={isCheckingOut}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
} 