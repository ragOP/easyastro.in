"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Heart, Sparkles, Clock, Shield, ArrowLeft, Star, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { BACKEND_URL } from "@/lib/backendUrl";

function Sister2OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const createOrder = async (params: any) => {
    try {
      // Create order in database for lander5
      const orderResponse = await fetch(
        `${BACKEND_URL}/api/lander5/create-order`,
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
          await fetch(`${BACKEND_URL}/api/lander5/delete-order-abd`, {
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
        orderType: orderType || "Soulmate Sketch",
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
          orderType: "Soulmate Sketch",
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
        router.push("/sister2");
      }
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1219]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[rgb(224,82,177)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1219]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(236,72,153,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Success Animation Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-[rgb(224,82,177)]/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-full p-6 border border-white/10">
              <CheckCircle className="w-16 h-16 text-[rgb(224,82,177)] animate-bounce" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-[rgb(224,82,177)] rounded-full animate-pulse"></div>
              <span className="text-white/70 text-sm font-bold">
                Order Confirmed!
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              <span className="text-white">Thank You!</span>
              <span className="bg-gradient-to-r from-[rgb(224,82,177)] to-[rgb(200,70,160)] bg-clip-text text-transparent pl-2">
                Order Successful
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-medium">
              Your soulmate sketch journey has begun. Our expert artists will create your personalized visualization within the next 24-48 hours.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[rgb(224,82,177)]/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white border-b-2 border-[rgb(224,82,177)] pb-1">
                    Order Information
                  </h3>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[rgb(224,82,177)] fill-current" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-white/50 text-sm font-semibold">Order ID</p>
                    <p className="text-white font-mono font-bold">
                      {orderDetails?.orderId || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 text-sm font-semibold">Service</p>
                    <p className="text-white font-bold">
                      {orderDetails?.orderType}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 text-sm font-semibold">Name</p>
                    <p className="text-white font-bold">
                      {orderDetails?.fullName || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 text-sm font-semibold">WhatsApp Number</p>
                    <p className="text-white font-bold">
                      {orderDetails?.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 text-sm font-semibold">Email</p>
                    <p className="text-white font-bold">
                      {orderDetails?.email || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 text-sm font-semibold">Amount Paid</p>
                    <p className="text-green-400 font-extrabold text-lg">
                      ₹{orderDetails?.amount?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 text-sm font-semibold">Status</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-bold">
                        Paid & Confirmed
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 text-sm font-semibold">Estimated Delivery</p>
                    <p className="text-white font-bold">
                      {orderDetails?.estimatedDelivery}
                    </p>
                  </div>
                </div>

                {orderDetails?.additionalProducts && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/50 text-sm font-semibold mb-2">Additional Reports</p>
                    <div className="flex flex-wrap gap-2">
                      {orderDetails.additionalProducts.split(",").map((p: string) => (
                        <span key={p} className="bg-white/5 text-[rgb(224,82,177)] px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                          {p.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-center text-white">
              What Happens Next?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(224,82,177)]/20 to-purple-500/20 rounded-xl blur-lg transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgb(224,82,177)] to-[rgb(200,70,160)] rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-inner">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <h4 className="text-white font-extrabold mb-2">Processing</h4>
                  <p className="text-white/50 text-[13px] leading-relaxed">
                    Our AI system is analyzing your birth details to initiate your soulmate visualization.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(224,82,177)]/20 to-purple-500/20 rounded-xl blur-lg transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgb(200,70,160)] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-white font-extrabold mb-2">Creation</h4>
                  <p className="text-white/50 text-[13px] leading-relaxed">
                    Advanced algorithms and artists will generate your soulmate's face within 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(224,82,177)]/20 to-purple-500/20 rounded-xl blur-lg transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <Star className="w-6 h-6" />
                  </div>
                  <h4 className="text-white font-extrabold mb-2">Delivery</h4>
                  <p className="text-white/50 text-[13px] leading-relaxed">
                    Your visualization will be delivered securely to your WhatsApp and Email address.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/sister2" className="group relative">
              <button className="relative bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 px-7 py-3.5 font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </Link>

            <Link href="/sister2-cart" className="group relative">
              <div className="absolute -inset-2 bg-[rgb(224,82,177)]/20 rounded-full blur-xl transition-all duration-500"></div>
              <button className="relative bg-gradient-to-r from-[rgb(224,82,177)] to-[rgb(200,70,160)] hover:from-[rgb(200,70,160)] hover:to-[rgb(180,60,140)] text-white rounded-full px-7 py-3.5 font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
                <span>Book Another Service</span>
              </button>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="text-center space-y-4 pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm font-medium">
              Need help? Contact us:{" "}
              <span className="text-[rgb(224,82,177)] font-bold">
                support@easyastro.in
              </span>
            </p>
            <p className="text-white/30 text-xs">
              You will receive a confirmation email shortly with all the details and next steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sister2OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#1e1219] selection:bg-[rgb(224,82,177)]/30 selection:text-white">
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#1e1219]">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/70">Loading order details...</p>
              </div>
            </div>
          }
        >
          <Sister2OrderConfirmationContent />
        </Suspense>
      </main>
    </div>
  );
}
