"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";
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

        const res = await fetch(`${BACKEND_URL}/api/lander11/details?txnid=${encodeURIComponent(txnid)}`);

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
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-xl">
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading order details...</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 bg-clip-text text-transparent">
                    Order Confirmed
                  </span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Your soulmate sketch order has been successfully placed. Our gifted artists will create your personalized sketch within 48 hours.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Details Card */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Order Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Order ID</p>
                  <p className="text-foreground font-mono">{orderDetails?.orderId || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Service</p>
                  <p className="text-foreground">Soulmate Sketch</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Amount Paid</p>
                  <p className="text-primary font-semibold">{orderDetails?.amount ? `₹${orderDetails.amount.toLocaleString()}` : 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Status</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Confirmed</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Full Name</p>
                  <p className="text-foreground">{orderDetails?.fullName || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Email</p>
                  <p className="text-foreground">{orderDetails?.email || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Phone</p>
                  <p className="text-foreground">{orderDetails?.phoneNumber || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Date of Birth</p>
                  <p className="text-foreground">{orderDetails?.dob ? new Date(orderDetails.dob).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Gender</p>
                  <p className="text-foreground capitalize">{orderDetails?.gender || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Place of Birth</p>
                  <p className="text-foreground">{orderDetails?.placeOfBirth || 'N/A'}</p>
                </div>
              </div>

              {orderDetails?.additionalProducts?.length ? (
                <div className="pt-4 mt-4 border-t border-border">
                  <p className="text-muted-foreground text-sm mb-2">Additional Products</p>
                  <ul className="list-disc list-inside text-foreground">
                    {orderDetails.additionalProducts.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/">
              <button className="bg-muted text-foreground border border-border px-6 py-3 rounded-full font-semibold transition hover:bg-muted/80 flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </a>
            
            <a href="/cart">
              <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold transition hover:bg-primary/90">
                <span>Book Another Service</span>
              </button>
            </a>
          </div>

          {/* Additional Info */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground text-sm">
                Need immediate assistance? Contact us at{' '}
                <span className="text-primary font-medium">support@astrasoul.com</span>
              </p>
              <p className="text-muted-foreground text-xs mt-2">
                You will receive a confirmation email shortly with all the details.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <Suspense
        fallback={
          <main className="flex-1">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-full max-w-xl">
                  <Card className="bg-card border-border">
                    <CardContent className="p-8 text-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading order details...</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        }
      >
        <OrderConfirmationContent />
      </Suspense>
      <Footer />
    </div>
  );
}