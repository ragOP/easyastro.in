"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
    CheckCircle,
    Star,
    Sparkles,
    PhoneCall,
    ArrowLeft,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/backendUrl";

function HindiOrderConfirmationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const createOrder = async (params: any) => {
        try {
            // Create order in database for lander12
            const orderResponse = await fetch(
                `${BACKEND_URL}/api/lander12/create-order`,
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
                    await fetch(`${BACKEND_URL}/api/lander12/delete-order-abd`, {
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
                orderType: orderType || "सोलमेट स्केच",
                fullName: fullName || "ग्राहक",
                email: email || "",
                phoneNumber: phoneNumber || "",
                amount: parseInt(amount),
                dateOfBirth,
                placeOfBirth,
                gender,
                additionalProducts,
                orderDate: new Date().toLocaleDateString("hi-IN"),
                estimatedDelivery: new Date(
                    Date.now() + 48 * 60 * 60 * 1000
                ).toLocaleDateString("hi-IN"),
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
                    orderType: "सोलमेट स्केच",
                    fullName: "ग्राहक",
                    email: "",
                    phoneNumber: "",
                    amount: parseInt(sessionAmount),
                    orderDate: new Date().toLocaleDateString("hi-IN"),
                    estimatedDelivery: new Date(
                        Date.now() + 48 * 60 * 60 * 1000
                    ).toLocaleDateString("hi-IN"),
                });
                setLoading(false);
            } else {
                router.push("/hindi");
            }
        }

        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
    }, [router, searchParams]);

    if (loading) {
        return (
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="font-semibold text-pink-700">ऑर्डर डिटेल्स लोड हो रही हैं...</p>
                </div>
            </main>
        );
    }

    return (
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16">
            {/* Success Animation Container */}
            <div className="text-center mb-8">
                <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-pink-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-full p-6 border border-pink-200">
                        <CheckCircle className="w-16 h-16 text-pink-600 animate-bounce" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-pink-200 rounded-full px-4 py-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        <span className="text-pink-700 text-sm font-bold">
                            ऑर्डर कन्फ़र्म हो गया है
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                        <span className="text-zinc-900">धन्यवाद!</span>
                        <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 bg-clip-text text-transparent pl-2">
                            ऑर्डर सफल हुआ
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-zinc-700 leading-relaxed max-w-2xl mx-auto font-medium">
                        आपका सोलमेट स्केच ऑर्डर सफलतापूर्वक प्राप्त हो गया है। हमारे एक्सपर्ट आर्टिस्ट अगले 24-48 घंटों में आपका पर्सनल स्केच तैयार कर देंगे।
                    </p>
                </div>

                {/* Order Details Card */}
                <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-200/50 via-pink-100/50 to-pink-200/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-pink-100 shadow-xl">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-zinc-900 border-b-2 border-pink-500 pb-1">
                                    ऑर्डर की जानकारी
                                </h3>
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-pink-500 fill-current" />
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-sm font-semibold">ऑर्डर आईडी</p>
                                    <p className="text-zinc-900 font-mono font-bold">
                                        {orderDetails?.orderId || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-sm font-semibold">सर्विस</p>
                                    <p className="text-zinc-900 font-bold">
                                        {orderDetails?.orderType}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-sm font-semibold">नाम</p>
                                    <p className="text-zinc-900 font-bold">
                                        {orderDetails?.fullName || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-sm font-semibold">व्हाट्सएप नंबर</p>
                                    <p className="text-zinc-900 font-bold">
                                        {orderDetails?.phoneNumber || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-sm font-semibold">ईमेल</p>
                                    <p className="text-zinc-900 font-bold">
                                        {orderDetails?.email || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-sm font-semibold">भुगतान राशि</p>
                                    <p className="text-pink-600 font-extrabold text-lg">
                                        ₹{orderDetails?.amount?.toLocaleString() || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-sm font-semibold">स्टेटस</p>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-green-600 font-bold">
                                            सफल (Confirmed)
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-zinc-500 text-sm font-semibold">अनुमानित डिलीवरी</p>
                                    <p className="text-zinc-900 font-bold">
                                        {orderDetails?.estimatedDelivery} (अगले 48 घंटों में)
                                    </p>
                                </div>
                            </div>

                            {orderDetails?.additionalProducts && (
                                <div className="pt-4 border-t border-pink-100">
                                    <p className="text-zinc-500 text-sm font-semibold mb-2">अतिरिक्त रिपोर्ट</p>
                                    <div className="flex flex-wrap gap-2">
                                        {orderDetails.additionalProducts.split(",").map((p: string) => (
                                            <span key={p} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-bold border border-pink-100">
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
                    <h3 className="text-2xl font-extrabold text-center text-zinc-900">
                        आगे क्या होगा?
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-pink-100 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                            <div className="relative bg-white/90 backdrop-blur-xl rounded-xl p-6 border border-pink-100 text-center shadow-lg">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-inner">
                                    <PhoneCall className="w-6 h-6" />
                                </div>
                                <h4 className="text-zinc-900 font-extrabold mb-2">प्रोसेसिंग</h4>
                                <p className="text-zinc-600 text-[13px] leading-relaxed">
                                    हम आपकी जन्म कुंडली का विश्लेषण कर रहे हैं और स्केच की तैयारी शुरू हो चुकी है।
                                </p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-pink-100 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                            <div className="relative bg-white/90 backdrop-blur-xl rounded-xl p-6 border border-pink-100 text-center shadow-lg">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h4 className="text-zinc-900 font-extrabold mb-2">स्केच क्रिएशन</h4>
                                <p className="text-zinc-600 text-[13px] leading-relaxed">
                                    हमारे आर्टिस्ट आपकी पूरी कुंडली और ज्योतिषीय इनसाइट्स के आधार पर स्केच बनाएंगे।
                                </p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-pink-100 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                            <div className="relative bg-white/90 backdrop-blur-xl rounded-xl p-6 border border-pink-100 text-center shadow-lg">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-300 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                    <Star className="w-6 h-6" />
                                </div>
                                <h4 className="text-zinc-900 font-extrabold mb-2">डिलीवरी</h4>
                                <p className="text-zinc-600 text-[13px] leading-relaxed">
                                    आपका स्केच और रिपोर्ट व्हाट्सएप और ईमेल पर 48 घंटों में डिलीवर कर दी जाएगी।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                    <a href="/" className="group relative">
                        <button className="relative bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-full border border-zinc-200 px-7 py-3.5 font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>वापस होम पर जाएं</span>
                        </button>
                    </a>

                    <a href="/hindi" className="group relative">
                        <div className="absolute -inset-2 bg-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <button className="relative bg-pink-600 hover:bg-pink-700 text-white rounded-full px-7 py-3.5 font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
                            <span>दूसरी सर्विस देखें</span>
                        </button>
                    </a>
                </div>

                {/* Additional Info */}
                <div className="text-center space-y-4 pt-8 border-t border-pink-100">
                    <p className="text-zinc-500 text-sm font-medium">
                        मदद चाहिए? हमें लिखें:{" "}
                        <span className="text-pink-600 font-bold">
                            support@astrasoul.com
                        </span>
                    </p>
                    <p className="text-zinc-400 text-xs">
                        आपको जल्द ही सभी डिटेल्स के साथ एक कन्फर्मेशन ईमेल प्राप्त होगा।
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function HindiOrderConfirmationPage() {
    return (
        <div className="min-h-screen bg-[#fffafa] selection:bg-pink-100 selection:text-pink-900">
            <Header />
            <main className="flex-1">
                <Suspense
                    fallback={
                        <div className="min-h-[60vh] flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-pink-700">ऑर्डर डिटेल्स लोड हो रही हैं...</p>
                            </div>
                        </div>
                    }
                >
                    <HindiOrderConfirmationContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
