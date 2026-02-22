"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CheckCircle, Star, Sparkles, PhoneCall, ArrowLeft, Shield, Heart, Zap } from "lucide-react";
import { BACKEND_URL } from "@/lib/backendUrl";

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const createOrderOnLanding = async (params: any) => {
    try {
      // Create order in database for lander11 if not already there
      console.log("Creating order on landing with params:", params);
      const orderResponse = await fetch(
        `${BACKEND_URL}/api/lander11/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: params.amount,
            cashfreeOrderId: params.orderId,
            cashfreePaymentId: "CF_" + Math.random().toString(36).substring(2, 10),
            name: params.fullName,
            email: params.email,
            phone: params.phoneNumber,
            dateOfBirth: params.dateOfBirth,
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
        // Delete abandoned order from lander11
        try {
          await fetch(`${BACKEND_URL}/api/lander11/delete-order-abd`, {
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
      console.error("Error preparing order:", error);
    }
  };

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const txnid = searchParams.get("txnid");

    const fetchByTxnId = async (tid: string) => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/lander11/details?txnid=${encodeURIComponent(tid)}`);
        if (res.ok) {
          const json = await res.json();
          if (json?.success && json?.data) {
            const data = json.data;
            const details = {
              orderId: data.orderId,
              fullName: data.fullName,
              email: data.email,
              phoneNumber: data.phoneNumber,
              dateOfBirth: data.dob,
              gender: data.gender,
              placeOfBirth: data.placeOfBirth,
              amount: Number(sessionStorage.getItem('orderAmount')) || 199,
              orderType: "Soulmate Sketch + Love Report",
              additionalProducts: Array.isArray(data.additionalProducts) ? data.additionalProducts.join(", ") : "",
              orderDate: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
              estimatedDelivery: new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
            };
            setOrderDetails(details);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Error fetching txn details:", err);
      }
    };

    if (orderId) {
      const amount = searchParams.get("amount");
      const details = {
        orderId,
        orderType: searchParams.get("orderType") || "Soulmate Sketch + Love Report",
        fullName: searchParams.get("fullName") || "Customer",
        email: searchParams.get("email") || "",
        phoneNumber: searchParams.get("phoneNumber") || "",
        amount: parseInt(amount || "199"),
        dateOfBirth: searchParams.get("dateOfBirth"),
        placeOfBirth: searchParams.get("placeOfBirth"),
        gender: searchParams.get("gender"),
        additionalProducts: searchParams.get("additionalProducts") || "",
        orderDate: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
        estimatedDelivery: new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
      };

      console.log("Order details from query:", details);
      setOrderDetails(details);
      createOrderOnLanding(details);
      setLoading(false);
    } else if (txnid) {
      fetchByTxnId(txnid);
    } else {
      const sessionOrderId = sessionStorage.getItem("orderId");
      const sessionAmount = sessionStorage.getItem("orderAmount");
      if (sessionOrderId) {
        setOrderDetails({
          orderId: sessionOrderId,
          amount: parseInt(sessionAmount || "199"),
          orderType: "Soulmate Sketch + Love Report",
          fullName: "Soul Searcher",
          orderDate: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
          estimatedDelivery: new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
        });
        setLoading(false);
      } else {
        router.push("/cartcousin");
      }
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff5f8] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-pink-500 animate-pulse" />
          </div>
          <p className="text-pink-600 font-bold tracking-widest uppercase text-xs">Summoning Celestial Order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5f8] selection:bg-pink-200">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20 pb-20">
        {/* Hero Success */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-20 w-64 h-64 bg-pink-200/30 blur-[100px] rounded-full"></div>

          <div className="relative inline-block mb-8">
            <div className="absolute -inset-6 bg-gradient-to-tr from-pink-400/20 via-rose-300/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white rounded-full p-8 shadow-[0_20px_50px_rgba(244,114,182,0.2)] border border-white/50">
              <CheckCircle className="w-20 h-20 text-pink-500 animate-[bounce_2s_infinite]" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full border border-pink-100 shadow-sm mb-4">
              <Zap className="w-4 h-4 text-pink-500 fill-current" />
              <span className="text-pink-600 text-[10px] font-black uppercase tracking-[0.2em]">Sacred Connection Established</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black text-zinc-900 tracking-tight leading-[0.9]">
              Heavenly <br />
              <span className="text-pink-500">Confirmed.</span>
            </h1>

            <p className="text-xl text-zinc-500 font-medium max-w-xl mx-auto leading-relaxed">
              Your celestial request has been received by our divine masters. The portal to your soulmate is now opening.
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="relative group mb-16">
          <div className="absolute -inset-4 bg-gradient-to-tr from-pink-300/30 to-rose-200/30 rounded-[40px] blur-2xl transition-all duration-700 group-hover:blur-3xl"></div>
          <div className="relative bg-white/90 backdrop-blur-2xl rounded-[32px] border border-white p-8 sm:p-12 shadow-[0_32px_80px_rgba(0,0,0,0.06)] overflow-hidden">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 border-b border-pink-50">
              <div>
                <h3 className="text-2xl font-black text-zinc-900">Celestial Blueprint</h3>
                <p className="text-zinc-500 font-medium text-sm">Order Reference Trace</p>
              </div>
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-pink-400 fill-current" />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-16">
              <DetailRow label="Divine Identity" value={orderDetails?.orderId} mono />
              <DetailRow label="Selected Path" value={orderDetails?.orderType} />
              <DetailRow label="Earthly Name" value={orderDetails?.fullName} />
              <DetailRow label="Offering" value={`₹${orderDetails?.amount}`} highlight />
              <DetailRow label="Contact Vessel" value={orderDetails?.phoneNumber || orderDetails?.email} />
              <DetailRow label="Manifestation Status" value="Payment Secured" status />
              <DetailRow label="Request Date" value={orderDetails?.orderDate} />
              <DetailRow label="Estimated Delivery" value={orderDetails?.estimatedDelivery} />
            </div>

            {orderDetails?.additionalProducts && (
              <div className="mt-12 pt-10 border-t border-pink-50">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Cosmic Add-ons</p>
                <div className="flex flex-wrap gap-3">
                  {orderDetails.additionalProducts.split(",").map((p: string, i: number) => (
                    <span key={i} className="bg-pink-50 text-pink-600 px-5 py-2 rounded-2xl text-xs font-bold border border-pink-100 shadow-sm">
                      {p.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Steps Section */}
        <div className="text-center mb-16 space-y-12">
          <h2 className="text-3xl font-black text-zinc-900">What Happens Now?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <ProcessStep
              icon={<Sparkles className="w-6 h-6" />}
              title="Astral Reading"
              body="Our masters map your birth charts against the current cosmic flow."
            />
            <ProcessStep
              icon={<Zap className="w-6 h-6" />}
              title="Divine Sketch"
              body="The vision is manifested onto paper by our sacred intuitive artists."
            />
            <ProcessStep
              icon={<Shield className="w-6 h-6" />}
              title="Safe Arrival"
              body="Your report and sketch arrive via email and WhatsApp safely."
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="/" className="w-full sm:w-auto">
            <button className="w-full px-10 py-5 bg-white border border-pink-100 text-zinc-900 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Home</span>
            </button>
          </a>
          <a href="/cartcousin" className="w-full sm:w-auto">
            <button className="w-full px-12 py-5 bg-zinc-900 text-white font-bold rounded-2xl shadow-2xl hover:bg-zinc-800 transition-all transform hover:scale-[1.02]">
              Manifest Another
            </button>
          </a>
        </div>

        <div className="mt-20 pt-10 border-t border-pink-100/50 text-center">
          <div className="flex flex-col items-center space-y-4">
            <PhoneCall className="w-5 h-5 text-pink-500" />
            <p className="text-zinc-500 font-medium">Sacred Inquiry: <span className="text-pink-600 font-bold">support@astrasoul.com</span></p>
            <p className="text-[10px] text-zinc-400 italic">May the stars guide your journey back to us.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function DetailRow({ label, value, mono, highlight, status }: any) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</p>
      <div className="flex items-center space-x-2">
        {status && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />}
        <p className={`text-zinc-900 font-bold ${mono ? 'font-mono' : ''} ${highlight ? 'text-pink-600 text-2xl' : 'text-base'}`}>
          {value || 'Synchronizing...'}
        </p>
      </div>
    </div>
  );
}

function ProcessStep({ icon, title, body }: any) {
  return (
    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mx-auto mb-6 shadow-inner">
        {icon}
      </div>
      <h4 className="font-black text-lg text-zinc-900 mb-3">{title}</h4>
      <p className="text-zinc-500 text-sm font-medium leading-relaxed">{body}</p>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fff5f8] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
