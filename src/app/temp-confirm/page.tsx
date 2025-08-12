"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  CheckCircle,
  Star,
  Sparkles,
  PhoneCall,
  ArrowLeft,
  AlertCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { BACKEND_URL as API_BASE } from "@/lib/backendUrl";

export default function TempConfirm() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "COMPLETED" | "failed" | "pending"
  >("pending");
  const [errorDetails, setErrorDetails] = useState<{
    code: string;
    message: string;
    description?: string;
  } | null>(null);

  // useEffect(() => {
  //   // Get order details from sessionStorage (passed from cart page)
  //   const orderId = sessionStorage.getItem("orderId");
  //   const amount = sessionStorage.getItem("orderAmount");

  //   if (orderId && amount) {
  //     setOrderDetails({
  //       orderId,
  //       amount: parseInt(amount),
  //       orderDate: new Date().toLocaleDateString(),
  //       estimatedDelivery: new Date(
  //         Date.now() + 48 * 60 * 60 * 1000
  //       ).toLocaleDateString(),
  //     });
  //     // Clear the session storage after getting the data
  //     sessionStorage.removeItem("orderId");
  //     sessionStorage.removeItem("orderAmount");
  //   } else {
  //     // If no order details found, redirect to home
  //     router.push("/");
  //     return;
  //   }

  //   setLoading(false);
  //   window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  // }, [router]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const merchantId = urlParams.get("orderId");

    if (!merchantId) {
      console.error("No merchant ID found in URL");
      setPaymentStatus("failed");
      setErrorDetails({
        code: "INVALID_REQUEST",
        message: "Invalid Request",
        description: "No order ID found in the URL.",
      });
      setLoading(false);
      return;
    }

    const storedFormData = localStorage.getItem("pendingOrderData");

    if (!storedFormData) {
      console.error("No stored form data found");
      setPaymentStatus("failed");
      setErrorDetails({
        code: "SESSION_EXPIRED",
        message: "Session Expired",
        description: "Your session has expired. Please place the order again.",
      });
      setLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedFormData);

    async function verifyAndCreateOrder() {
      try {
        const statusRes = await fetch(
          `${API_BASE}/api/phonepe-v2/status/${merchantId}`
        );
        const statusData = await statusRes.json();

        if (!statusData.success) {
          throw new Error("Failed to verify payment status");
        }

        if (statusData.data.state === "COMPLETED") {
          const createRes = await fetch(
            `${API_BASE}/api/lander3/create-order2`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...parsedData,
                orderId: merchantId,
              }),
            }
          );

          console.log("createRes", createRes);
          const createData = await createRes.json();

          console.log("createData", createData);

          if (createData.success) {
            setPaymentStatus("COMPLETED");
            setOrderDetails({
              orderId: createData.data.orderId || merchantId,
              amount: createData.data.amount || parsedData.amount,
              orderDate: createData.data.orderDate,
            });

            localStorage.removeItem("pendingOrderData");
          } else {
            console.error("Order creation failed", createData);
            setPaymentStatus("failed");
            setErrorDetails({
              code: "ORDER_CREATION_FAILED",
              message: "Order Processing Failed",
              description:
                "Your payment was successful, but we encountered an issue creating your order. Please contact support with your order details.",
            });
          }
        } else if (statusData.data.state === "FAILED") {
          setPaymentStatus("failed");
          setOrderDetails({
            orderId: statusData.data.orderId || merchantId,
            amount: statusData.data.amount / 100, // convert to rupees
            orderDate: new Date().toLocaleDateString(),
          });

          setErrorDetails({
            code: statusData.data.errorCode || "PAYMENT_FAILED",
            message: "Payment Failed",
            description:
              statusData.data.errorContext?.description ||
              "Your payment could not be processed.",
          });
        } else {
          setPaymentStatus("failed");
          setErrorDetails({
            code: "PAYMENT_" + (statusData.data.state || "UNKNOWN"),
            message: "Payment Status: " + (statusData.data.state || "Unknown"),
            description:
              "Your payment is in an unexpected state. Please contact support with your order details.",
          });
        }
      } catch (err) {
        console.error("Error verifying payment", err);
        router.push("/cart");
      } finally {
        setLoading(false);
      }
    }

    verifyAndCreateOrder();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-white">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-4">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-full p-6 border border-primary/20">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Verifying Your Payment
            </h2>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment details...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Success state UI
  if (paymentStatus === "COMPLETED") {
    return (
      <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-white">
        <Header />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16">
          {/* Success Animation Container */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-full p-6 border border-primary/20">
                <CheckCircle className="w-16 h-16 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground/70 text-sm font-medium">
                  Order Confirmed
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                <span className="text-foreground">Thank You!</span>
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent pl-2">
                  Order Confirmed
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                Your soulmate sketch order has been successfully placed. Our
                gifted artists will create your personalized sketch within 48
                hours.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-primary/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground">
                      Order Details
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-primary fill-current" />
                      <Star className="w-4 h-4 text-primary fill-current" />
                      <Star className="w-4 h-4 text-primary fill-current" />
                      <Star className="w-4 h-4 text-primary fill-current" />
                      <Star className="w-4 h-4 text-primary fill-current" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-foreground/60 text-sm">Order ID</p>
                      <p className="text-foreground font-mono">
                        {orderDetails?.orderId || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-foreground/60 text-sm">Service</p>
                      <p className="text-foreground">Soulmate Sketch</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-foreground/60 text-sm">Amount Paid</p>
                      <p className="text-primary font-semibold">
                        ₹{orderDetails?.amount?.toLocaleString() || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-foreground/60 text-sm">Status</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 font-medium">
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-foreground">
                What's Next?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-xl p-6 border border-primary/20 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PhoneCall className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">
                      Order Processing
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      We're analyzing your birth details and preparing your
                      personalized sketch
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-xl p-6 border border-primary/20 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">
                      Sketch Creation
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      Our gifted artists create your soulmate's sketch based on
                      astrological insights
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-xl p-6 border border-primary/20 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/60 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">
                      Delivery
                    </h4>
                    <p className="text-foreground/70 text-sm">
                      Your soulmate sketch will be delivered to your email
                      within 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <a href="/" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-2 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <button className="relative w-full bg-gradient-to-r from-white/10 to-white/5 rounded-full border border-primary/20 shadow-2xl text-foreground px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </a>

              <a href="/cart" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <button className="relative w-full bg-gradient-to-r from-primary to-primary/80 rounded-full border border-primary/20 shadow-2xl text-white px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105">
                  <span>Book Another Service</span>
                </button>
              </a>
            </div>

            {/* Additional Info */}
            <div className="text-center space-y-4 pt-8 border-t border-primary/10">
              <p className="text-foreground/60 text-sm">
                Need immediate assistance? Contact us at{" "}
                <span className="text-primary font-medium">
                  support@astrasoul.com
                </span>
              </p>
              <p className="text-foreground/40 text-xs">
                You will receive a confirmation email shortly with all the
                details.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Failed payment state UI
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-red-500/20 to-red-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-full p-6 border border-red-500/20">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              <span className="text-foreground">Payment </span>
              <span className="text-red-500">Failed</span>
            </h1>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-left max-w-2xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {errorDetails?.message || "Payment could not be processed"}
                  </h3>
                  {errorDetails?.description && (
                    <div className="mt-2 text-sm text-red-700">
                      <p>{errorDetails.description}</p>
                    </div>
                  )}
                  {errorDetails?.code && (
                    <p className="mt-1 text-xs text-red-600">
                      Error code: {errorDetails.code}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-red-100 max-w-2xl mx-auto text-left">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Order Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Order ID</p>
                  <p className="text-foreground font-mono">
                    {orderDetails?.orderId || "N/A"}
                  </p>
                </div>
                {orderDetails?.amount && (
                  <div className="space-y-2">
                    <p className="text-foreground/60 text-sm">Amount</p>
                    <p className="text-foreground font-medium">
                      ₹{orderDetails.amount.toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Status</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">
                      Payment Failed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a href="/" className="group relative w-full sm:w-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <button className="relative w-full bg-gradient-to-r from-white/10 to-white/5 rounded-full border border-gray-200 shadow-2xl text-foreground px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </a>

            <a href="/cart" className="group relative w-full sm:w-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <button className="relative w-full bg-gradient-to-r from-primary to-primary/80 rounded-full border border-primary/20 shadow-2xl text-white px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </a>
          </div>

          <div className="text-center space-y-4 pt-8 border-t border-gray-200">
            <p className="text-foreground/60 text-sm">
              Need help? Contact us at{" "}
              <span className="text-primary font-medium">
                support@astrasoul.com
              </span>
            </p>
            <p className="text-foreground/40 text-xs">
              Please include your Order ID when contacting support.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
