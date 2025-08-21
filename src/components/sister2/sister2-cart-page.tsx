"use client";
import React, { useState, useEffect } from 'react';
import Sister2CartContent from './sister2-cart-content';
import Sister2Header from './sister2-header';

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

export default function Sister2CartPage() {
  // Cart State
  const [cartItems, setCartItems] = useState<Sister2CartItem[]>([
    {
      id: 'soulmate-sketch',
      name: 'Soulmate Sketch',
      description: 'Discover your soulmate\'s face through advanced AI-powered astrology and psychic art',
      price: 389,
      originalPrice: 998,
      features: [
        'AI-generated soulmate visualization',
        'Astrological birth chart analysis',
        'Psychic art interpretation',
        'Instant digital delivery',
        'Money-back guarantee',
        '24/7 customer support'
      ]
    }
  ]);

  const [additionalProducts, setAdditionalProducts] = useState<Sister2Product[]>([
    {
      id: 'compatibility-report',
      title: 'Soulmate Compatibility Report',
      description: 'Detailed analysis of your compatibility with your soulmate',
      price: 199,
      originalPrice: 499,
      features: [
        'Comprehensive compatibility score',
        'Personality analysis',
        'Relationship insights',
        'Future predictions'
      ]
    },
    {
      id: 'relationship-guidance',
      title: 'Relationship Guidance Session',
      description: 'One-on-one consultation with our relationship expert',
      price: 299,
      originalPrice: 699,
      features: [
        'Personal consultation call',
        'Customized advice',
        'Follow-up support',
        'Action plan creation'
      ]
    },
    {
      id: 'premium-package',
      title: 'Premium Soulmate Package',
      description: 'Complete soulmate discovery experience with all services',
      price: 799,
      originalPrice: 1899,
      features: [
        'AI soulmate sketch',
        'Compatibility report',
        'Relationship guidance',
        'Priority support',
        'Exclusive content access'
      ]
    }
  ]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [consultationFormData, setConsultationFormData] = useState<Sister2FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: ''
  });

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const additionalTotal = selectedProducts.reduce((sum, productId) => {
    const product = additionalProducts.find(p => p.id === productId);
    return sum + (product?.price || 0);
  }, 0);
  const total = subtotal + additionalTotal;
  const discount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0) +
    selectedProducts.reduce((sum, productId) => {
      const product = additionalProducts.find(p => p.id === productId);
      return sum + ((product?.originalPrice || 0) - (product?.price || 0));
    }, 0);

  // Handlers
  const handleRemove = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleConsultationFormSubmit = (data: Sister2FormData) => {
    setConsultationFormData(data);
    // Here you would typically save the data or proceed to next step
    console.log('Consultation form submitted:', data);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your payment gateway
      console.log('Proceeding to checkout with:', {
        cartItems,
        selectedProducts,
        consultationFormData,
        total
      });
      
      // Redirect to payment page or show success
      alert('Redirecting to payment gateway...');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setAnimateElements(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900/95 via-pink-900/95 to-purple-800/95">
      {/* Header */}
      <Sister2Header />

      {/* Main Content */}
      <div className="pt-8 pb-16">
        <Sister2CartContent
          cartItems={cartItems}
          additionalProducts={additionalProducts}
          selectedProducts={selectedProducts}
          consultationFormData={consultationFormData}
          subtotal={subtotal}
          discount={discount}
          total={total}
          isCheckingOut={isCheckingOut}
          animateElements={animateElements}
          onRemove={handleRemove}
          onProductToggle={handleProductToggle}
          onConsultationFormSubmit={handleConsultationFormSubmit}
          onCheckout={handleCheckout}
          setConsultationFormData={setConsultationFormData}
        />
      </div>
    </div>
  );
} 