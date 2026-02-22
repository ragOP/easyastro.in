"use client";
import React, { useState, useEffect } from 'react';
import Sister2Header from './sister2-header';
import Sister2CartContent from './sister2-cart-content';
import { BACKEND_URL } from '@/lib/backendUrl';
import { useRouter } from 'next/navigation';
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";

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
      price: 199,
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
  const router = useRouter();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const subtotalWithMRP = cartItems.reduce((sum, item) => sum + item.originalPrice, 0);
  const additionalTotal = selectedProducts.reduce((sum, productId) => {
    const product = additionalProducts.find(p => p.id === productId);
    return sum + (product?.price || 0);
  }, 0);
  const additionalTotalWithMRP = selectedProducts.reduce((sum, productId) => {
    const product = additionalProducts.find(p => p.id === productId);
    return sum + (product?.originalPrice || 0);
  }, 0);
  const total = subtotal + additionalTotal;
  const totalWithMRP = subtotalWithMRP + additionalTotalWithMRP;
  const discount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0) +
    selectedProducts.reduce((sum, productId) => {
      const product = additionalProducts.find(p => p.id === productId);
      return sum + ((product?.originalPrice || 0) - (product?.price || 0));
    }, 0);
  const discountWithMRP = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0) +
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

  const [cashfree, setCashfree] = useState<any>(null);
  const [sdkInitialized, setSdkInitialized] = useState(false);

  // Initialize Cashfree SDK
  const initializeSDK = async () => {
    try {
      const cashfreeInstance = await load({
        mode: "production",
      });
      setCashfree(cashfreeInstance);
      setSdkInitialized(true);
      console.log("Cashfree SDK initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Cashfree SDK:", error);
      setSdkInitialized(false);
    }
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const additionalProductsTitles = selectedProducts
        .map((id) => {
          const product = additionalProducts.find((p) => p.id === id);
          return product?.title || "";
        })
        .filter(Boolean);

      // 1) Create abandoned order first
      const abdOrderResponse = await fetch(
        `${BACKEND_URL}/api/lander5/create-order-abd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            name: consultationFormData?.name,
            email: consultationFormData?.email,
            phone: consultationFormData?.phoneNumber,
            dateOfBirth: consultationFormData?.dateOfBirth,
            placeOfBirth: consultationFormData?.placeOfBirth,
            gender: consultationFormData?.gender,
            additionalProducts: additionalProductsTitles,
          }),
        }
      );

      const abdOrderResult = await abdOrderResponse.json();
      if (!abdOrderResult.success) {
        throw new Error("Failed to create abandoned order");
      }

      const abdOrderId = abdOrderResult.data?._id;
      if (abdOrderId) {
        console.log("Abandoned Order Created with Id", abdOrderId);
      }

      // 2) Create Cashfree payment session
      const cashfreeResponse = await fetch(`${BACKEND_URL}/api/payment/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          fullName: consultationFormData?.name || "Customer",
          email: consultationFormData?.email || "customer@example.com",
          phoneNumber: consultationFormData?.phoneNumber || "9876543210",
          dateOfBirth: consultationFormData?.dateOfBirth || "",
          placeOfBirth: consultationFormData?.placeOfBirth || "",
          gender: consultationFormData?.gender || "",
          additionalProducts: additionalProductsTitles,
          url: 'https://www.easyastro.in/sister2-order-confirmation'
        }),
      });

      const cashfreeResult = await cashfreeResponse.json();
      if (!cashfreeResult?.data?.payment_session_id) {
        throw new Error("Failed to create Cashfree payment session");
      }

      const paymentSessionId = cashfreeResult.data.payment_session_id;
      const orderId = cashfreeResult.data.order_id;

      if (!cashfree) {
        throw new Error("Cashfree SDK not initialized");
      }

      const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_self",
        onSuccess: async function (data: any) {
          console.log("Cashfree payment successful:", data);

          try {
            // Create order in database
            const orderResponse = await fetch(`${BACKEND_URL}/api/lander5/create-order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: total,
                cashfreeOrderId: data.order?.orderId || orderId,
                cashfreePaymentId: data.paymentDetails?.paymentId || "",
                name: consultationFormData?.name,
                email: consultationFormData?.email,
                phone: consultationFormData?.phoneNumber,
                dateOfBirth: consultationFormData?.dateOfBirth,
                placeOfBirth: consultationFormData?.placeOfBirth,
                gender: consultationFormData?.gender,
                orderId: orderId,
                additionalProducts: additionalProductsTitles,
              }),
            });

            const orderResult = await orderResponse.json();

            if (orderResult.success) {
              sessionStorage.setItem("orderId", orderId);
              sessionStorage.setItem("orderAmount", total.toString());

              // Delete abandoned order
              await fetch(`${BACKEND_URL}/api/lander5/delete-order-abd`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: consultationFormData?.email }),
              });

              const confirmationParams = new URLSearchParams({
                orderId: orderId,
                orderType: "Soulmate Sketch",
                fullName: consultationFormData?.name || "Customer",
                email: consultationFormData?.email || "",
                phoneNumber: consultationFormData?.phoneNumber || "",
                amount: total.toString(),
                dateOfBirth: consultationFormData?.dateOfBirth,
                placeOfBirth: consultationFormData?.placeOfBirth,
                gender: consultationFormData?.gender,
                additionalProducts: additionalProductsTitles.join(","),
              });

              window.location.href = `/sister2-order-confirmation?${confirmationParams.toString()}`;
            } else {
              alert("Payment successful but order creation failed. Please contact support.");
            }
          } catch (error) {
            console.error("Error creating order:", error);
            alert("Payment successful but order creation failed. Please contact support.");
          }
        },
        onFailure: function (data: any) {
          console.log("Cashfree payment failed:", data);
          alert("Payment failed. Please try again.");
        },
      };

      cashfree.checkout(checkoutOptions);

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handlePayuPayment = async () => {
    try {
      setIsCheckingOut(true);
      // 1) Create ABD (abandoned) order first
      const abdOrderResponse = await fetch(
        `${BACKEND_URL}/api/lander5/create-order-abd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
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
      const abdOrderId = abdOrderResult?.data?._id;
      if (!abdOrderResult?.success) {
        throw new Error("Failed to create ABD order");
      }
      console.log("Abandoned Order Created with Id", abdOrderId);

      // 2) Redirect to PayU with all user-provided details
      const additionalProductsTitles = selectedProducts
        .map((id) => {
          const product = additionalProducts.find((p) => p.id === id);
          return product?.title || "";
        })
        .filter(Boolean);

      const params = new URLSearchParams({
        amount: String(total || 0),
        productinfo: "Soulmate Sketch Order",
        name: consultationFormData?.name || "Customer",
        email: consultationFormData?.email || "customer@example.com",
        phone: consultationFormData?.phoneNumber || "9876543210",
        dateOfBirth: consultationFormData?.dateOfBirth || "",
        placeOfBirth: consultationFormData?.placeOfBirth || "",
        gender: consultationFormData?.gender || "",
        additionalProducts: additionalProductsTitles.join(","),
      });

      const payuUrl = `${BACKEND_URL}/api/payu/pay-sister?${params.toString()}`;
      router.push(payuUrl);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }

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
          discountWithMRP={discountWithMRP}
          totalWithMRP={totalWithMRP}
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