"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartHeader from "@/components/cart/cart-header";
import CartContent from "@/components/cart/cart-content";
import { useState, useEffect } from "react";
import TestimonialsSection from "@/components/sections/testimonials";
import GallerySection from "@/components/sections/gallery";

// Mock data for demonstration
const mockCartItems = [
    {
        id: "1",
        name: "Soulmate Sketch",
        description: "Get a detailed sketch of your soulmate's face",
        price: 389,
        originalPrice: 1999,
        features: [
            "Detailed facial features",
            "Personality insights",
            "Meeting timeline",
            "Compatibility analysis"
        ]
    }
];

const mockAdditionalProducts = [
    {
        id: "add-1",
        title: "2-Year Personal Horoscope Report",
        description: "Get a roadmap of your next 24 months based on your unique birth chart. Know what's coming in love, career, money & health — so you can plan smarter.",
        price: 199,
        originalPrice: 299,
        features: [
            "Month-by-Month Predictions",
            "Love & Marriage Forecast",
            "Career & Wealth Cycles",
            "Lucky Days & Time Windows",
            "Remedies & Do's/Don'ts"
        ]
    },
    {
        id: "add-2",
        title: "Wealth Report",
        description: "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
        price: 199,
        originalPrice: 299,
        features: [
            "Personalized astrology + numerology-based wealth blueprint",
            "Career timing, money blocks & success windows",
            "Delivered as a digital report within 48 hours",
            "Based on Vedic astrology",
            "Instant delivery to WhatsApp or Email"
        ]
    }
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
        gender: ""
    });

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const additionalTotal = selectedProducts.reduce((sum, productId) => {
        const product = mockAdditionalProducts.find(p => p.id === productId);
        return sum + (product?.price || 0);
    }, 0);
    const total = subtotal + additionalTotal;
    const discount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0) +
        selectedProducts.reduce((sum, productId) => {
            const product = mockAdditionalProducts.find(p => p.id === productId);
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
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const onProductToggle = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
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

            // Create Razorpay order
            const response = await fetch('https://skyscale-be.onrender.com/api/payment/razorpay3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // amount: total,
                    amount: 3,
                }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error('Failed to create payment order');
            }

            const data = result.data;

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                // amount: total,
                amount: 3,
                currency: 'INR',
                name: 'AstraSoul',
                description: 'Soulmate Sketch Order Payment',
                order_id: data.orderId,
                handler: async function (response: any) {
                    try {
                        // Create order in database
                        const orderResponse = await fetch('https://skyscale-be.onrender.com/api/create-order3', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                // amount: total,
                                amount: 3,
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
                                additionalProducts: selectedProducts.map(id => {
                                    const product = mockAdditionalProducts.find(p => p.id === id);
                                    return product?.title || '';
                                }).filter(Boolean),
                            }),
                        });

                        const orderResult = await orderResponse.json();

                        if (orderResult.success) {
                            sessionStorage.setItem('orderId', data.orderId);
                            sessionStorage.setItem('orderAmount', total.toString());
                            window.location.href = '/order-confirmation';
                        } else {
                            alert('Payment successful but order creation failed. Please contact support.');
                        }
                    } catch (error) {
                        console.error('Error creating order:', error);
                        alert('Payment successful but order creation failed. Please contact support.');
                    }
                },
                prefill: {
                    name: consultationFormData?.name,
                    email: consultationFormData?.email,
                    contact: consultationFormData?.phoneNumber,
                },
                theme: {
                    color: '#ec4899',
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };



    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <CartHeader animateElements={animateElements} />
                <CartContent
                    cartItems={cartItems}
                    additionalProducts={mockAdditionalProducts}
                    selectedProducts={selectedProducts}
                    consultationFormData={consultationFormData}
                    subtotal={subtotal}
                    discount={discount}
                    total={total}
                    isCheckingOut={isCheckingOut}
                    animateElements={animateElements}
                    onRemove={removeItem}
                    onProductToggle={onProductToggle}
                    onConsultationFormSubmit={handleConsultationFormSubmit}
                    onCheckout={handleCheckout}
                    setConsultationFormData={setConsultationFormData}
                />

                <TestimonialsSection isCartPage={true} />

                <GallerySection isCartPage={true} />

            </main>
            <Footer />
        </div>
    );
} 