"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Heart, Sparkles, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Sister2OrderConfirmationPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order details from sessionStorage (passed from cart page)
    const orderId = sessionStorage.getItem('orderId');
    const amount = sessionStorage.getItem('orderAmount');
    // const productDetails = sessionStorage.getItem('productDetails');

    if (orderId && amount) {
      const orderData = {
        orderId,
        amount: parseInt(amount),
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        estimatedDelivery: new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        // productDetails: productDetails ? JSON.parse(productDetails) : null,
        timestamp: new Date().toISOString()
      };

      // Store in localStorage for future reference
      const existingOrders = JSON.parse(localStorage.getItem('easyAstroOrders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('easyAstroOrders', JSON.stringify(existingOrders));

      setOrderDetails(orderData);

      // Clear the session storage after getting the data
      sessionStorage.removeItem('orderId');
      sessionStorage.removeItem('orderAmount');
      // sessionStorage.removeItem('productDetails');
    } else {
      // If no order details found, redirect to home
      router.push('/sister2');
      return;
    }

    setLoading(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [router]);

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

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-16 px-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-['Montserrat'] text-3xl font-bold text-white mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-lg text-white/80">
              Your soulmate sketch journey has begun
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="font-['Montserrat'] text-xl font-bold text-white mb-6 text-center">
              Order Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">Order ID:</span>
                <span className="font-mono font-semibold text-[rgb(224,82,177)]">
                  {orderDetails?.orderId || 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">Product:</span>
                <span className="font-semibold text-white">
                  {/* {orderDetails?.productDetails?.productName || 'Soulmate Sketch'} */}
                  Soulmate Sketch
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">Amount Paid:</span>
                <span className="font-bold text-green-400 text-lg">
                  ₹{orderDetails?.amount?.toLocaleString() || 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">Payment Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Paid
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70">Order Date:</span>
                <span className="font-semibold text-white">
                  {orderDetails?.orderDate || 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-white/70">Estimated Delivery:</span>
                <span className="font-semibold text-white">
                  {orderDetails?.estimatedDelivery || 'N/A'}
                </span>
              </div>
            </div>

            {/* Product Details */}
            {/* {orderDetails?.productDetails && (
              <div className="border-t border-white/10 pt-4 mt-4">
                <h4 className="font-semibold text-white mb-3">Product Details</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(orderDetails.productDetails).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-white/70 text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-white text-sm font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )} */}

          </div>

          {/* Next Steps */}
          {/* <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="font-['Montserrat'] text-xl font-bold text-white mb-6 text-center">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[rgb(224,82,177)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Processing Your Order</h3>
                  <p className="text-white/70 text-sm">Our AI system is analyzing your birth details to create your soulmate sketch.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[rgb(224,82,177)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">AI Generation</h3>
                  <p className="text-white/70 text-sm">Advanced algorithms will create your soulmate's face visualization within 24-48 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Secure Delivery</h3>
                  <p className="text-gray-300 text-sm">Your soulmate sketch will be delivered securely to your email address.</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              href="/sister2-cart"
              className="border-2 border-[rgb(224,82,177)] text-[rgb(224,82,177)] px-8 py-4 rounded-xl font-semibold hover:bg-[rgb(224,82,177)]/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Book Another Service
            </Link>
          </div>

          <Link
            href="/sister2"
            className="bg-gradient-to-r mt-4 from-[rgb(224,82,177)] to-[rgb(200,70,160)] text-white px-8 py-4 rounded-xl font-semibold hover:from-[rgb(200,70,160)] hover:to-[rgb(180,60,140)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Back to Home
          </Link>

          {/* Contact Support */}
          <div className="text-center mt-8">
            <p className="text-white/70 mb-2">Need help? Contact our support team</p>
            <a
              href="mailto:support@easyastro.in"
              className="text-[rgb(224,82,177)] hover:text-[rgb(200,70,160)] font-medium"
            >
              support@easyastro.in
            </a>

          </div>
        </div>
      </div>
    </div>
  );
} 