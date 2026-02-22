"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CheckCircle, Star, Sparkles, PhoneCall, ArrowLeft, Shield } from "lucide-react";
import { BACKEND_URL } from "@/lib/backendUrl";

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const createOrder = async (params: any) => {
    try {
      // Create order in database for lander7
      const orderResponse = await fetch(
        `${BACKEND_URL}/api/lander7/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: params.amount,
            cashfreeOrderId: params.orderId,
            cashfreePaymentId: "CF_" + Math.random().toString(36).substring(2, 10), // Placeholder if not from query
            fullName: params.fullName,
            email: params.email,
            phoneNumber: params.phoneNumber,
            dob: params.dateOfBirth,
            placeOfBirth: params.placeOfBirth,
            gender: params.gender,
            orderId: params.orderId,
            additionalProducts: params.additionalProducts
              ? params.additionalProducts.split(",").map((p: string) => p.trim())
              : [],
          }),
        }
      );
      const orderResult = await orderResponse.json();

      if (orderResult.success) {
        // Delete abandoned order
        try {
          await fetch(`${BACKEND_URL}/api/lander7/delete-order-abd`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: params.email }),
          });
        } catch (e) {
          console.error("Error deleting ABD order:", e);
        }
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    // Get order details from URL parameters
    const orderId = searchParams.get("orderId");
    const orderType = searchParams.get("orderType");
    const fullName = searchParams.get("fullName");
    const email = searchParams.get("email");
    const phoneNumber = searchParams.get("phoneNumber");
    const amount = searchParams.get("amount");
    const dateOfBirth = searchParams.get("dateOfBirth");
    const placeOfBirth = searchParams.get("placeOfBirth");
    const gender = searchParams.get("gender");
    const additionalProducts = searchParams.get("additionalProducts");

    if (orderId && amount) {
      const details = {
        orderId,
        orderType: orderType || "Soulmate Sketch + Bracelet",
        fullName: fullName || "Customer",
        email: email || "",
        phoneNumber: phoneNumber || "",
        amount: parseInt(amount),
        dateOfBirth,
        placeOfBirth,
        gender,
        additionalProducts,
        orderDate: new Date().toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        estimatedDelivery: new Date(
          Date.now() + 48 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      };
      setOrderDetails(details);
      createOrder(details);
      setLoading(false);
    } else {
      // Fallback to sessionStorage
      const sessionOrderId = sessionStorage.getItem("orderId");
      const sessionAmount = sessionStorage.getItem("orderAmount");

      if (sessionOrderId && sessionAmount) {
        setOrderDetails({
          orderId: sessionOrderId,
          orderType: "Soulmate Sketch + Bracelet",
          fullName: "Customer",
          email: "",
          phoneNumber: "",
          amount: parseInt(sessionAmount),
          orderDate: new Date().toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          estimatedDelivery: new Date(
            Date.now() + 48 * 60 * 60 * 1000
          ).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
        });
        setLoading(false);
      } else {
        router.push("/exp-cart");
      }
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Securing your soulmate connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-white">
      <Header />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16">
        {/* Success Animation Container */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-full p-8 border border-white shadow-2xl">
              <CheckCircle className="w-20 h-20 text-primary animate-bounce" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-5 py-2">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                Order Confirmed Successfully
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-foreground">
              Welcome to your <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Future of Love
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Your celestial journey has begun. Our master artists and astrologers are now channeling insights to visualize your soulmate.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/50 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                  <h3 className="text-2xl font-bold text-foreground">Order Blueprint</h3>
                  <div className="flex items-center space-x-1.5 bg-primary/5 px-4 py-1.5 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-primary fill-current" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                  <DetailItem label="Order Identity" value={orderDetails?.orderId} mono />
                  <DetailItem label="Chosen Path" value={orderDetails?.orderType} />
                  <DetailItem label="Full Name" value={orderDetails?.fullName} />
                  <DetailItem label="Investment" value={`₹${orderDetails?.amount?.toLocaleString()}`} highlight />
                  <DetailItem label="Secure Contact" value={orderDetails?.phoneNumber || orderDetails?.email} />
                  <DetailItem
                    label="Status"
                    value="Paid & Secured"
                    statusIcon={<div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />}
                  />
                  <DetailItem label="Manifestation Date" value={orderDetails?.orderDate} />
                  <DetailItem label="Estimated Vision Delivery" value={orderDetails?.estimatedDelivery} />
                </div>

                {orderDetails?.additionalProducts && (
                  <div className="pt-8 border-t border-gray-100">
                    <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-4">Celestial Enhancements</p>
                    <div className="flex flex-wrap gap-2.5">
                      {orderDetails.additionalProducts.split(",").map((p: string) => (
                        <span key={p} className="bg-primary/5 text-primary border border-primary/10 px-4 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                          {p.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* What's Next Steps */}
          <div className="space-y-8 py-8">
            <h3 className="text-3xl font-extrabold text-center text-foreground">The Alchemical Process</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StepCard
                icon={<PhoneCall className="w-6 h-6" />}
                title="Celestial Sync"
                description="Our system aligns your birth details with cosmic transits."
                color="from-primary to-purple-500"
              />
              <StepCard
                icon={<Sparkles className="w-6 h-6" />}
                title="Divine Manifestation"
                description="Master artists begin the visualization process."
                color="from-purple-500 to-indigo-500"
              />
              <StepCard
                icon={<Shield className="w-6 h-6" />}
                title="Sacred Delivery"
                description="Your vision is delivered securely via WhatsApp and Email."
                color="from-indigo-500 to-primary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <a href="/" className="w-full sm:w-auto">
              <button className="w-full bg-white/50 hover:bg-white text-foreground rounded-full border border-gray-200 shadow-lg px-10 py-4 font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Return to Earth</span>
              </button>
            </a>

            <a href="/exp-cart" className="w-full sm:w-auto relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <button className="w-full relative bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white rounded-full px-12 py-4 font-bold shadow-2xl transition-all duration-300 transform hover:scale-105">
                Another Astral Journey
              </button>
            </a>
          </div>

          <div className="text-center space-y-6 pt-12 border-t border-gray-100">
            <div className="flex justify-center items-center space-x-2 text-muted-foreground font-medium">
              <PhoneCall className="w-4 h-4" />
              <span>Sacred Support: <span className="text-primary font-bold">support@astrasoul.com</span></span>
            </div>
            <p className="text-muted-foreground/50 text-xs italic">
              Manifesting visions since the dawn of the digital age. A confirmation transmission has been sent to your digital inbox.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function DetailItem({ label, value, mono = false, highlight = false, statusIcon = null }: any) {
  return (
    <div className="space-y-1.5">
      <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest">{label}</p>
      <div className="flex items-center space-x-2">
        {statusIcon}
        <p className={`text-foreground font-bold ${mono ? 'font-mono' : ''} ${highlight ? 'text-primary text-lg' : 'text-base'}`}>
          {value || 'Awaiting Sync...'}
        </p>
      </div>
    </div>
  );
}

function StepCard({ icon, title, description, color }: any) {
  return (
    <div className="relative group h-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl blur-sm transition-all duration-500"></div>
      <div className="relative bg-white rounded-2xl p-8 border border-gray-100 text-center shadow-xl h-full flex flex-col">
        <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg transform group-hover:rotate-6 transition-transform`}>
          {icon}
        </div>
        <h4 className="text-foreground font-extrabold mb-3 text-lg">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Initializing Cosmic Confirmation</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}