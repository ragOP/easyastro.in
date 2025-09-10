"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CheckCircle, Star, Sparkles, PhoneCall, ArrowLeft } from "lucide-react";
import { BACKEND_URL } from "@/lib/backendUrl";

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const txnidFromQuery = searchParams.get('txnid');
        const fallbackOrderId = typeof window !== 'undefined' ? sessionStorage.getItem('orderId') : null;
        const txnid = txnidFromQuery || fallbackOrderId;

        if (!txnid) {
          router.push('/');
          return;
        }

        const res = await fetch(`${BACKEND_URL}/api/lander3/details?txnid=${encodeURIComponent(txnid)}`);

        if (!res.ok) {
          throw new Error('Failed to fetch order details');
        }

        const json = await res.json();

        if (json?.success && json?.data) {
          const data = json.data;
          setOrderDetails({
            orderId: data.orderId,
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dob: data.dob,
            gender: data.gender,
            placeOfBirth: data.placeOfBirth,
            additionalProducts: Array.isArray(data.additionalProducts) ? data.additionalProducts : [],
            amount: typeof window !== 'undefined' ? Number(sessionStorage.getItem('orderAmount') || '') || undefined : undefined,
            orderDate: new Date().toLocaleDateString(),
            estimatedDelivery: new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString(),
          });

          // After successfully fetching the order, delete any ABD order record using email
          try {
            const deleteAbdOrder = await fetch(`${BACKEND_URL}/api/lander3/delete-order-abd`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: data?.email }),
            });
            await deleteAbdOrder.json();
          } catch (e) {
            // ignore cleanup errors
          }

          // Clear session storage after reading (compat)
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('orderId');
            sessionStorage.removeItem('orderAmount');
          }
        }
      } catch (err) {
        router.push('/');
        return;
      } finally {
        setLoading(false);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }
    };

    fetchOrder();
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-white">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
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

      {/* Main Content */}
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-foreground/70 text-sm font-medium">Order Confirmed</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            <span className="text-foreground">Thank You!</span>
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent pl-2">Order Confirmed</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Your soulmate sketch order has been successfully placed. Our gifted artists will create your personalized sketch within 48 hours.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Order Details</h3>
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
                  <p className="text-foreground font-mono">{orderDetails?.orderId || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Service</p>
                  <p className="text-foreground">Soulmate Sketch</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Amount Paid</p>
                  <p className="text-primary font-semibold">{orderDetails?.amount ? `₹${orderDetails.amount.toLocaleString()}` : 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Status</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">Confirmed</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Full Name</p>
                  <p className="text-foreground">{orderDetails?.fullName || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Email</p>
                  <p className="text-foreground">{orderDetails?.email || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Phone</p>
                  <p className="text-foreground">{orderDetails?.phoneNumber || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Date of Birth</p>
                  <p className="text-foreground">{orderDetails?.dob ? new Date(orderDetails.dob).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Gender</p>
                  <p className="text-foreground capitalize">{orderDetails?.gender || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/60 text-sm">Place of Birth</p>
                  <p className="text-foreground">{orderDetails?.placeOfBirth || 'N/A'}</p>
                </div>
              </div>

              {orderDetails?.additionalProducts?.length ? (
                <div className="pt-2">
                  <p className="text-foreground/60 text-sm mb-1">Additional Products</p>
                  <ul className="list-disc list-inside text-foreground/90">
                    {orderDetails.additionalProducts.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-foreground">What's Next?</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-xl p-6 border border-primary/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneCall className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-foreground font-semibold mb-2">Order Processing</h4>
                <p className="text-foreground/70 text-sm">We're analyzing your birth details and preparing your personalized sketch</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-xl p-6 border border-primary/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-foreground font-semibold mb-2">Sketch Creation</h4>
                <p className="text-foreground/70 text-sm">Our gifted artists create your soulmate's sketch based on astrological insights</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-xl p-6 border border-primary/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/60 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-foreground font-semibold mb-2">Delivery</h4>
                <p className="text-foreground/70 text-sm">Your soulmate sketch delivered to WhatsApp and email within 48 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <a href="/" className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <button className="relative bg-gradient-to-r from-white/10 to-white/5 rounded-full border border-primary/20 shadow-2xl text-foreground px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </a>
          
          <a href="/cart" className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <button className="relative bg-gradient-to-r from-primary to-primary/80 rounded-full border border-primary/20 shadow-2xl text-white px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105">
              <span>Book Another Service</span>
            </button>
          </a>
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-4 pt-8 border-t border-primary/10">
          <p className="text-foreground/60 text-sm">
            Need immediate assistance? Contact us at{' '}
            <span className="text-primary font-medium">support@astrasoul.com</span>
          </p>
          <p className="text-foreground/40 text-xs">
            You will receive a confirmation email shortly with all the details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-white">
      <Header />
      <Suspense fallback={<main className="flex-1 flex items-center justify-center"><div className="text-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-muted-foreground">Loading order details...</p></div></main>}>
        <OrderConfirmationContent />
      </Suspense>
      <Footer />
    </div>
  );
}