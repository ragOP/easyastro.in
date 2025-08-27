"use client";
import React, { useState, useEffect } from 'react';
import Sister2Header from './sister2-header';
import Sister2CartContent from './sister2-cart-content';
import { BACKEND_URL } from '@/lib/backendUrl';

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
      description: "Get a detailed sketch of your soulmate's face",
      price: 389,
      originalPrice: 1999,
      features: [
        "Detailed facial features",
        "Personality insights",
        "Meeting timeline",
        "Compatibility analysis",
      ],
    }
  ]);

  const [additionalProducts, setAdditionalProducts] = useState<Sister2Product[]>([
    {
      id: 'add-1',
      title: '2-Year Personal Horoscope Report',
      description: 'Get a roadmap of your next 24 months based on your unique birth chart. Know what\'s coming in love, career, money & health — so you can plan smarter.',
      price: 199,
      originalPrice: 299,
      features: [
        'Month-by-Month Predictions',
        'Love & Marriage Forecast',
        'Career & Wealth Cycles',
        'Lucky Days & Time Windows',
        'Remedies & Do\'s/Don\'ts'
      ]
    },
    {
      id: 'add-2',
      title: 'Wealth Report',
      description: 'Confused about your money, career, or success path? Your birth chart holds powerful insights into what\'s blocking your abundance. This report helps align your actions with your true financial destiny.',
      price: 199,
      originalPrice: 299,
      features: [
        'Personalized astrology + numerology-based wealth blueprint',
        'Career timing, money blocks & success windows',
        'Delivered as a digital report within 48 hours',
        'Based on Vedic astrology',
        'Instant delivery to WhatsApp or Email'
      ]
    },
    {
      id: 'add-3',
      title: 'Life path & Career guidance ebook',
      description: 'Confused about your money, career, or success path? Your birth chart holds powerful insights into what\'s blocking your abundance. This report helps align your actions with your true financial destiny.',
      price: 199,
      originalPrice: 249,
      features: [
        'Discover your ideal career path',
        'Align goals with your life purposes',
        'Strength-based tips to grow faster',
        'Avoid burnout by knowing what doesn\'t suit you'
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

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(
      (result) => {
        if (result) {
          console.log("Razorpay script loaded successfully");
        }
      }
    );
  }, []);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const abdOrderResponse = await fetch(
        `${BACKEND_URL}/api/lander5/create-order-abd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            // amount: 2,
            name: consultationFormData?.name,
            email: consultationFormData?.email,
            phone: consultationFormData?.phoneNumber,
            dateOfBirth: consultationFormData?.dateOfBirth,
            placeOfBirth: consultationFormData?.placeOfBirth,
            gender: consultationFormData?.gender,
            additionalProducts: selectedProducts
              .map((id) => {
                const product = additionalProducts.find((p) => p.id === id);
                return product?.title || "";
              })
              .filter(Boolean),
          }),
        }
      );

      const abdOrderResult = await abdOrderResponse.json();
      const abdOrderId = abdOrderResult.data._id;

      if (!abdOrderResult.success) {
        throw new Error("Failed to create payment order");
      } else {
        console.log("Abandoned Order Created with Id", abdOrderId);
      }

      // Create Razorpay order
      const response = await fetch(`${BACKEND_URL}/api/payment/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          // amount: 2,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error("Failed to create payment order");
      }

      const data = result.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: total,
        // amount: 2,
        currency: "INR",
        name: "EasyAstro",
        description: "Soulmate Sketch Order Payment",
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            // Create order in database
            const orderResponse = await fetch(
              `${BACKEND_URL}/api/lander5/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount: total,
                  // amount: 2,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  name: consultationFormData?.name,
                  email: consultationFormData?.email,
                  phone: consultationFormData?.phoneNumber,
                  dateOfBirth: consultationFormData?.dateOfBirth,
                  placeOfBirth: consultationFormData?.placeOfBirth,
                  gender: consultationFormData?.gender,
                  orderId: data.orderId,
                  additionalProducts: selectedProducts
                    .map((id) => {
                      const product = additionalProducts.find(
                        (p) => p.id === id
                      );
                      return product?.title || "";
                    })
                    .filter(Boolean),
                }),
              }
            );

            const orderResult = await orderResponse.json();

            if (orderResult.success) {
              sessionStorage.setItem("orderId", data.orderId);
              sessionStorage.setItem("orderAmount", total.toString());

              // Deleting item from Abandoned Order if Order is created successfully
              const deleteAbdOrder = await fetch(
                `${BACKEND_URL}/api/lander5/delete-order-abd`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email: consultationFormData?.email }),
                }
              );
              const deleteAbdOrderResult = await deleteAbdOrder.json();
              console.log("Abandoned Order Deleted", deleteAbdOrderResult);

              window.location.href = "/sister2-order-confirmation";
            } else {
              alert(
                "Payment successful but order creation failed. Please contact support."
              );
            }
          } catch (error) {
            console.error("Error creating order:", error);
            alert(
              "Payment successful but order creation failed. Please contact support."
            );
          }
        },
        prefill: {
          name: consultationFormData?.name,
          email: consultationFormData?.email,
          contact: consultationFormData?.phoneNumber,
        },
        theme: {
          color: "#E052B1",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed. Please try again.");
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
    <div className="min-h-screen bg-[#1e1219]">
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
          additionalTotal={additionalTotal}
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