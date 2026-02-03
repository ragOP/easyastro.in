"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartHeader from "@/components/cart/cart-header";
import CartContent from "@/components/cart/cart-content";
import { useState, useEffect } from "react";
import TestimonialsSection from "@/components/sections/testimonials";
import GallerySection from "@/components/sections/gallery";
import { BACKEND_URL } from "@/lib/backendUrl";

// Mock data for demonstration
const mockCartItems = [
  {
    id: "1",
    name: "Soulmate Sketch",
    description: "Get a detailed sketch of your soulmate's face",
    price: 489,
    originalPrice: 1999,
    features: [
      "Detailed facial features",
      "Personality insights",
      "Meeting timeline",
      "Compatibility analysis",
    ],
  },
];

const mockAdditionalProducts = [
  {
    id: "add-1",
    title: "2-Year Personal Horoscope Report",
    description:
      "Get a roadmap of your next 24 months based on your unique birth chart. Know what's coming in love, career, money & health — so you can plan smarter.",
    price: 199,
    originalPrice: 299,
    features: [
      "Month-by-Month Predictions",
      "Love & Marriage Forecast",
      "Career & Wealth Cycles",
      "Lucky Days & Time Windows",
      "Remedies & Do's/Don'ts",
    ],
  },
  {
    id: "add-2",
    title: "Wealth Report",
    description:
      "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
    price: 199,
    originalPrice: 299,
    features: [
      "Personalized astrology + numerology-based wealth blueprint",
      "Career timing, money blocks & success windows",
      "Delivered as a digital report within 48 hours",
      "Based on Vedic astrology",
      "Instant delivery to WhatsApp or Email",
    ],
  },
];

export default function TempCartPage() {
  const [animateElements, setAnimateElements] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [consultationFormData, setConsultationFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const additionalTotal = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.price || 0);
  }, 0);
  const total = subtotal + additionalTotal;
  const discount =
    cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price),
      0
    ) +
    selectedProducts.reduce((sum, productId) => {
      const product = mockAdditionalProducts.find((p) => p.id === productId);
      return sum + ((product?.originalPrice || 0) - (product?.price || 0));
    }, 0);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
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

  const handleConsultationFormSubmit = (data: any) => {
    console.log("Consultation form submitted:", data);
    // Handle form submission
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const res = await fetch(`${BACKEND_URL}/api/phonepe-v2/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          // amount: 2,
          name: consultationFormData?.name,
          mobile: consultationFormData?.phoneNumber,
          description: "Soulmate Sketch Order Payment",
        }),
      });

      const json = await res.json();
      console.log(json);

      if (!json.success) {
        throw new Error(json.error?.message || "Create payment failed");
      }

      const { redirectUrl, merchantOrderId } = json.data || {};
      if (merchantOrderId) {
        localStorage.setItem("pp_last_order_id", merchantOrderId);
      }

      localStorage.setItem(
        "pendingOrderData",
        JSON.stringify({
          ...consultationFormData,
          amount: total,
        })
      );
      if (redirectUrl) {
        window.location.href = redirectUrl;
        console.log("redireting here");
      } else {
        alert("No redirect URL from server");
      }
    } catch (e: any) {
      console.error("Checkout error:", e);
      alert(e.message || "Payment failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <CartHeader animateElements={animateElements} />
        <CartContent
          cartItems={cartItems}
          additionalProducts={mockAdditionalProducts}
          selectedProducts={selectedProducts}
          consultationFormData={consultationFormData}
          subtotal={subtotal}
          discount={discount}
          total={total}
          isCheckingOut={isCheckingOut}
          animateElements={animateElements}
          onRemove={removeItem}
          onProductToggle={onProductToggle}
          onConsultationFormSubmit={handleConsultationFormSubmit}
          onCheckout={handleCheckout}
          setConsultationFormData={setConsultationFormData}
        />

        <TestimonialsSection isCartPage={true} />

        <GallerySection isCartPage={true} />
      </main>
      <Footer />
    </div>
  );
}
