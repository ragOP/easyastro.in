
import { ArtIcon, ReadingIcon } from "@/components/icons";
import { CircleDollarSign, Clock, Mail, SparklesIcon } from "lucide-react";
import Image from "next/image";
import CtaButton from "./cta-button";

const Bundle = {
    digital: {
        title: "Soulmate Sketch & Reading",
        type: "Digital Delivery",
        features: [
            {
                icon: "🎨",
                text: "Hand-drawn psychic sketch of your soulmate"
            },
            {
                icon: "💝",
                text: "Detailed love reading (traits, timing, compatibility)"
            },
            {
                icon: "⚡",
                text: "Delivered to your email/WhatsApp in 24 hours"
            }
        ]
    },
    physical: {
        title: "Energized Love & Money Bracelet",
        type: "Physical Product",
        features: [
            {
                icon: "🌙",
                text: "Specially energized by astrologers on Purnima night"
            },
            {
                icon: "✨",
                text: "Infused with blessings of prosperity + attraction"
            },
            {
                icon: "💎",
                text: "Made with Rose Quartz + Money Magnet crystals"
            },
            {
                icon: "💫",
                text: "Attracts love, wealth, and positive energy into your life"
            },
            {
                icon: "🔮",
                text: "Limited edition: Only 501 energized pieces available"
            }
        ]
    }
};

export default function WhatYouReceiveSection() {
    return (
        <section className="py-12 sm:py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-playfair mb-4 bg-clip-text text-transparent bg-black">
                        Your Soulmate's Face + The Bracelet That Attracts Love & Wealth
                    </h2>
                    <p className="text-gray-600 text-lg">An exclusive bundle of mystical insight and energized crystals</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Digital Package */}
                    <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-purple-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="absolute -top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm">
                            Digital Delivery
                        </div>
                        <div className="flex flex-col h-full">
                            <h3 className="text-2xl font-playfair text-purple-800 mb-6">{Bundle.digital.title}</h3>
                            <div className="space-y-4 flex-grow">
                                {Bundle.digital.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <span className="text-2xl">{feature.icon}</span>
                                        <span className="text-gray-700">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Physical Package */}
                    <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-purple-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="absolute -top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-sm">
                            Physical Product
                        </div>
                        <div className="flex flex-col h-full">
                            <h3 className="text-2xl font-playfair text-purple-800 mb-6">{Bundle.physical.title}</h3>
                            <div className="space-y-4 flex-grow">
                                {Bundle.physical.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <span className="text-2xl">{feature.icon}</span>
                                        <span className="text-gray-700">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <CtaButton isCartPage={false} title="Yes! I Want My Sketch + Bracelet (₹799)" />
                    <p className="mt-4 text-sm text-gray-600">🔒 Secure Payment • Fast Delivery • 100% Private</p>
                </div>
            </div>
        </section>
    );
}