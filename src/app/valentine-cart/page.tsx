"use client";

import { useState, useEffect } from "react";
import ValentineHeader from "@/components/valentine/valentine-header";
import Footer from "@/components/layout/footer";
import CartHeader from "@/components/cart/cart-header";
import CartContent from "@/components/cart/cart-content";
import TestimonialsSection from "@/components/sections/testimonials";
import GallerySection from "@/components/sections/gallery";
import { CartThemeProvider } from "@/contexts/cart-theme-context";
import PastelHearts from "@/components/valentine/pastel-hearts";
import { BACKEND_URL } from "@/lib/backendUrl";
import { VALENTINE_MAIN_PRODUCT, VALENTINE_ADDONS } from "@/lib/valentine-products";

// Cart item shape for /cart components
const mockCartItems = [
  {
    id: VALENTINE_MAIN_PRODUCT.id,
    name: VALENTINE_MAIN_PRODUCT.title,
    description:
      "Personalised soulmate sketch plus FREE Psychic Reading, How to Impress Your Crush & Love Report. Delivered in 24–48 hours.",
    price: VALENTINE_MAIN_PRODUCT.price,
    originalPrice: VALENTINE_MAIN_PRODUCT.compareAt ?? 998,
    features: VALENTINE_MAIN_PRODUCT.includes,
  },
];

// Additional products shape for AdditionalProducts component (id, title, description, price, originalPrice, features)
const mockAdditionalProducts = VALENTINE_ADDONS.map((a) => ({
  id: a.id,
  title: a.title,
  description: a.blurb,
  price: a.price,
  originalPrice: a.compareAt ?? 299,
  features: a.features ?? [],
}));

const LANDER_API = "lander777";

export default function ValentineCartPage() {
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const subtotalWithMRP = cartItems.reduce((sum, item) => sum + item.originalPrice, 0);
  const additionalTotal = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.price ?? 0);
  }, 0);
  const additionalTotalWithMRP = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.originalPrice ?? 0);
  }, 0);
  const total = subtotal + additionalTotal;
  const totalWithMRP = subtotalWithMRP + additionalTotalWithMRP;
  const discount =
    cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0) +
    selectedProducts.reduce((sum, productId) => {
      const product = mockAdditionalProducts.find((p) => p.id === productId);
      return sum + ((product?.originalPrice ?? 0) - (product?.price ?? 0));
    }, 0);
  const discountWithMRP =
    cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0) +
    selectedProducts.reduce((sum, productId) => {
      const product = mockAdditionalProducts.find((p) => p.id === productId);
      return sum + ((product?.originalPrice ?? 0) - (product?.price ?? 0));
    }, 0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateElements(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const loadScript = (src: string) => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then((result) => {
      if (result) console.log("Razorpay script loaded successfully");
    });
  }, []);

  const sendAbandonedUserToAutomation = async () => {
    try {
      const [firstName, ...restName] = (consultationFormData?.name ?? "").trim().split(" ");
      const lastName = restName.join(" ");
      await fetch("https://automations.chatsonway.com/webhook/6927f8681b9845c02d57070d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName ?? "",
          lastName: lastName ?? "",
          dob: consultationFormData?.dateOfBirth ?? "",
          placeOfBirth: consultationFormData?.placeOfBirth ?? "",
          phoneNumber: consultationFormData?.phoneNumber ?? "",
          email: consultationFormData?.email ?? "",
          is: "abandoned",
        }),
      });
      console.log("Abandoned user sent to automation");
    } catch (error) {
      console.error("Failed to send abandoned user to automation:", error);
    }
  };

  const getAdditionalProductTitles = () =>
    selectedProducts
      .map((id) => mockAdditionalProducts.find((p) => p.id === id)?.title ?? "")
      .filter(Boolean);

  const handleConsultationFormSubmit = (data: typeof consultationFormData) => {
    // Form state is already updated via setConsultationFormData
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const additionalProducts = getAdditionalProductTitles();

      const abdOrderResponse = await fetch(
        `${BACKEND_URL}/api/${LANDER_API}/create-order-abd`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: finalAmount,
            name: consultationFormData?.name,
            email: consultationFormData?.email,
            phone: consultationFormData?.phoneNumber,
            dateOfBirth: consultationFormData?.dateOfBirth,
            placeOfBirth: consultationFormData?.placeOfBirth,
            gender: consultationFormData?.gender,
            additionalProducts,
          }),
        }
      );
      const abdOrderResult = await abdOrderResponse.json();
      const abdOrderId = abdOrderResult?.data?._id;
      if (!abdOrderResult?.success) {
        throw new Error("Failed to create payment order");
      }
      if (abdOrderId) console.log("Abandoned Order Created with Id", abdOrderId);

      const response = await fetch(`${BACKEND_URL}/api/payment/razorpay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }),
      });
      const result = await response.json();
      if (!result?.success) throw new Error("Failed to create payment order");
      const data = result.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: finalAmount,
        currency: "INR",
        name: "EasyAstro",
        description: "Soulmate Sketch + 3 FREE Readings Order Payment",
        order_id: data.orderId,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            const orderResponse = await fetch(
              `${BACKEND_URL}/api/${LANDER_API}/create-order`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                  additionalProducts: getAdditionalProductTitles(),
                }),
              }
            );
            const orderResult = await orderResponse.json();

            if (orderResult?.success) {
              sessionStorage.setItem("orderId", data.orderId);
              sessionStorage.setItem("orderAmount", String(finalAmount));
              try {
                await fetch("https://automations.chatsonway.com/webhook/692049bf1b9845c02d52d83b", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    amount: finalAmount,
                    name: consultationFormData?.name ?? "",
                    email: consultationFormData?.email ?? "",
                    phone: consultationFormData?.phoneNumber ?? "",
                    dateOfBirth: consultationFormData?.dateOfBirth ?? "",
                    placeOfBirth: consultationFormData?.placeOfBirth ?? "",
                    gender: consultationFormData?.gender ?? "",
                    additionalProducts: getAdditionalProductTitles(),
                    isChatsonorderSuccessfull: "Order Successfull",
                  }),
                });
                console.log("Webhook notification sent successfully");
              } catch (err) {
                console.error("Failed to send webhook notification:", err);
              }
              const deleteAbdOrder = await fetch(
                `${BACKEND_URL}/api/${LANDER_API}/delete-order-abd`,
                {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: consultationFormData?.email }),
                }
              );
              const deleteResult = await deleteAbdOrder.json();
              console.log("Abandoned Order Deleted", deleteResult);
              window.location.href = "/order-confirmation";
            } else {
              alert("Payment successful but order creation failed. Please contact support.");
            }
          } catch (err) {
            console.error("Error creating order:", err);
            alert("Payment successful but order creation failed. Please contact support.");
          }
        },
        prefill: {
          name: consultationFormData?.name,
          email: consultationFormData?.email,
          contact: consultationFormData?.phoneNumber,
        },
        theme: { color: "#ec4899" },
        modal: {
          ondismiss: async () => {
            console.log("Razorpay modal closed without payment");
            await sendAbandonedUserToAutomation();
          },
        },
      };

      const rzp = new (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } })
        .Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <CartThemeProvider theme="valentine">
      <div className="relative flex min-h-dvh flex-col bg-gradient-to-b from-rose-50 via-pink-50/80 to-rose-50 text-rose-900 overflow-hidden">
        <PastelHearts />
        <ValentineHeader />
        <main className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-pink-50/70 to-rose-50/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(251,207,232,0.3),transparent_50%)]" />
          <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-pink-300/15 blur-[80px]" />
          <div className="absolute right-0 bottom-1/4 h-56 w-56 rounded-full bg-rose-300/15 blur-[60px]" />
          <div className="relative">
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
           
          </div>
        </main>
        <Footer />
      </div>
    </CartThemeProvider>
  );
}
