import React from 'react';
import SisterCartEmpty from './sister-cart-empty';
import SisterCartItem from './sister-cart-item';
import SisterAdditionalProducts from './sister-additional-products';
import SisterConsultationForm from './sister-consultation-form';
import SisterOrderSummary from './sister-order-summary';

interface SisterCartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface SisterProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface SisterFormData {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
}

interface SisterCartContentProps {
  cartItems: SisterCartItem[];
  additionalProducts: SisterProduct[];
  selectedProducts: string[];
  consultationFormData: SisterFormData;
  subtotal: number;
  discount: number;
  total: number;
  isCheckingOut: boolean;
  animateElements: boolean;
  onRemove: (id: string) => void;
  onProductToggle: (productId: string) => void;
  onConsultationFormSubmit: (data: SisterFormData) => void;
  onCheckout: () => void;
  setConsultationFormData: (data: SisterFormData) => void;
}

export default function SisterCartContent({
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
}: SisterCartContentProps) {
  return (
    <>
      {cartItems.length === 0 ? (
        /* Empty Cart */
        <SisterCartEmpty animateElements={animateElements} />
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
                  <SisterCartItem item={item} onRemove={onRemove} showRemoveButton={false} />
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
              <SisterAdditionalProducts
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
              <SisterConsultationForm
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
              <SisterOrderSummary
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
                      <SisterCartItem item={item} onRemove={onRemove} showRemoveButton={true} />
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
                <SisterAdditionalProducts
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
                <SisterConsultationForm
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
                <SisterOrderSummary
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