"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "@/lib/backendUrl";
import TestimonialsSection from "@/components/exp/testimonials";
import GallerySection from "@/components/exp/gallery";
import CartContent from "@/components/exp/cart-content";
import "../exp/exp.css";
import CartHeader from "@/components/exp/cart-header";

// Mock data for demonstration
const mockCartItems = [
  {
    id: "1",
    name: "Soulmate Sketch + Energised Money and Love Attractor Bracelet",
    description: "Get a detailed sketch of your soulmate's face and an energized bracelet to attract love and wealth.",
    price: 199,
    originalPrice: 2499,
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
  {
    id: "add-3",
    title: "Life path & Career guidance ebook",
    description:
      "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
    price: 199,
    originalPrice: 249,
    features: [
      "Discover your ideal career path",
      "Align goals with your life purposes",
      "Strength-based tips to grow faster",
      "Avoid burnout by knowing what doesn't suit you",
    ],
  },
  // {
  //   id: "add-4",
  //   title: "Energised Money and Love Attractor Bracelet",
  //   description:
  //     "Attract money, love and prosperity with this Limited Edition Money and Love attractor bracelet, specially energized by astrologers on Purnima under the powerful full moon. Combining Money Magnet and Rose Quartz, it carries potent blessings from Purnima to solve issues and enhance positive energy.",
  //   price: 799,
  //   originalPrice: 1999,
  //   features: [
  //     "Discover your ideal career path",
  //     "Align goals with your life purposes",
  //     "Strength-based tips to grow faster",
  //     "Avoid burnout by knowing what doesn't suit you",
  //   ],
  // },
];

export default function CartPage() {
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
  const [finalAmount, setFinalAmount] = useState(0);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const subtotalWithMRP = cartItems.reduce((sum, item) => sum + item.originalPrice, 0);
  const additionalTotal = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.price || 0);
  }, 0);
  const additionalTotalWithMRP = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.originalPrice || 0);
  }, 0);
  const total = subtotal + additionalTotal;
  const totalWithMRP = subtotalWithMRP + additionalTotalWithMRP;
  const discount =
    cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price),
      0
    ) +
    selectedProducts.reduce((sum, productId) => {
      const product = mockAdditionalProducts.find((p) => p.id === productId);
      return sum + ((product?.originalPrice || 0) - (product?.price || 0));
    }, 0);
  const discountWithMRP =
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

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(
      (result) => {
        if (result) {
          console.log("Razorpay script loaded successfully");
        }
      }
    );
  }, []);

  const handleConsultationFormSubmit = (data: any) => {
    console.log("Consultation form submitted:", data);
    // Handle form submission
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const abdOrderResponse = await fetch(
        `${BACKEND_URL}/api/lander7/create-order-abd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount,
            name: consultationFormData?.name,
            email: consultationFormData?.email,
            phone: consultationFormData?.phoneNumber,
            dateOfBirth: consultationFormData?.dateOfBirth,
            placeOfBirth: consultationFormData?.placeOfBirth,
            gender: consultationFormData?.gender,
            additionalProducts: selectedProducts
              .map((id) => {
                const product = mockAdditionalProducts.find((p) => p.id === id);
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
          amount: finalAmount,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error("Failed to create payment order");
      }

      const data = result.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: finalAmount,
        currency: "INR",
        name: "EasyAstro",
        description: "Soulmate Sketch Order Payment",
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            // Create order in database
            const orderResponse = await fetch(
              `${BACKEND_URL}/api/lander7/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount: finalAmount,
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
                      const product = mockAdditionalProducts.find(
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
              sessionStorage.setItem("orderAmount", finalAmount.toString());

              // Deleting item from Abandoned Order if Order is created successfulyyyy
              const deleteAbdOrder = await fetch(
                `${BACKEND_URL}/api/lander7/delete-order-abd`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email: consultationFormData?.email }), // send the email here
                }
              );
              const deleteAbdOrderResult = await deleteAbdOrder.json();
              console.log("Abandoned Order Deleted", deleteAbdOrderResult);

              window.location.href = "/exp-order-confirmation";
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
          color: "#ec4899",
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

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground exp-page font-poppins">
      <Header />
      <main className="flex-1 relative overflow-hidden">
        {/* <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background"></div>
          <div
            className="absolute top-20 left-1/4 w-1 h-1 bg-cyan-300 rounded-full opacity-40 floating-stars"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-30 floating-stars"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-72 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-30 floating-stars"
            style={{ animationDelay: "2.5s" }}
          ></div>
          <div
            className="absolute top-96 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-40 floating-stars"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-30 floating-stars"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/5 w-1 h-1 bg-pink-400 rounded-full opacity-35 floating-stars"
            style={{ animationDelay: "2.8s" }}
          ></div>
          <div className="absolute top-10 right-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-20 blur-xl moon-beam"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.08),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)]"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05),transparent_60%)]"></div>
        </div> */}

        <div className="relative z-10">
          <CartHeader animateElements={animateElements} />
          <CartContent
            cartItems={cartItems}
            additionalProducts={mockAdditionalProducts}
            selectedProducts={selectedProducts}
            consultationFormData={consultationFormData}
            subtotal={subtotal}
            discount={discount}
            discountWithMRP={discountWithMRP}
            totalWithMRP={totalWithMRP}
            total={total}
            additionalTotal={additionalTotal}
            isCheckingOut={isCheckingOut}
            animateElements={animateElements}
            onRemove={removeItem}
            onProductToggle={onProductToggle}
            onConsultationFormSubmit={handleConsultationFormSubmit}
            onCheckout={handleCheckout}
            setConsultationFormData={setConsultationFormData}
            finalAmount={finalAmount}
            setFinalAmount={setFinalAmount}
          />

          <TestimonialsSection isCartPage={true} />

          <GallerySection isCartPage={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
