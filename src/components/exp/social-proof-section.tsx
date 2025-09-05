"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Users, MapPin } from 'lucide-react';

const names = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
    "Saanvi", "Anya", "Aadhya", "Ananya", "Diya", "Pari", "Myra", "Anika", "Avani", "Riya"
];

const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur"
];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function SocialProofSection() {
    const [currentProof, setCurrentProof] = useState<{ name: string; city: string; } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showRandomProof = () => {
            const name = getRandomItem(names);
            const city = getRandomItem(cities);
            
            setCurrentProof({ name, city });
            setIsVisible(true);

            // Hide after 4 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 4000);
        };

        const scheduleNextProof = () => {
            const randomDelay = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;
            setTimeout(() => {
                showRandomProof();
                scheduleNextProof();
            }, randomDelay);
        };

        // Start the first proof after a short delay
        const initialTimeout = setTimeout(scheduleNextProof, 2000);

        return () => {
            clearTimeout(initialTimeout);
        };
    }, []);

    return (
        <section className="relative py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.05),transparent_50%)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.05),transparent_50%)]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-playfair font-bold text-purple-800 mb-2">
                        Join Thousands of Happy Souls
                    </h2>
                    <p className="text-purple-600 font-medium">
                        Real people, real transformations, real results
                    </p>
                </div>

                {/* Live activity feed */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200/50 p-6">
                        <div className="flex items-center justify-center mb-4">
                            <div className="flex items-center space-x-2 text-purple-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-semibold text-sm">Live Activity</span>
                            </div>
                        </div>

                        {/* Social proof notifications */}
                        <div className="space-y-3">
                            {currentProof && (
                                <div
                                    className={cn(
                                        "flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200/50 transition-all duration-500 ease-in-out",
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    )}
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <Sparkles className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-purple-800 font-semibold text-sm">
                                            {currentProof.name} from {currentProof.city}
                                        </p>
                                        <p className="text-purple-600 text-xs">
                                            just received their mystical soulmate sketch! ✨
                                        </p>
                                    </div>
                                    <div className="text-xs text-purple-500 font-medium">
                                        now
                                    </div>
                                </div>
                            )}

                            {/* Static examples */}
                            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                                        <Users className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-purple-800 font-semibold text-sm">
                                        Priya from Bangalore
                                    </p>
                                    <p className="text-purple-600 text-xs">
                                        found her soulmate within 2 weeks! 💕
                                    </p>
                                </div>
                                <div className="text-xs text-purple-500 font-medium">
                                    2 min ago
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200/50">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-purple-800 font-semibold text-sm">
                                        Raj from Mumbai
                                    </p>
                                    <p className="text-purple-600 text-xs">
                                        bracelet brought unexpected opportunities! 🌟
                                    </p>
                                </div>
                                <div className="text-xs text-purple-500 font-medium">
                                    5 min ago
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 pt-4 border-t border-purple-200/50">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-purple-600">2,847</div>
                                    <div className="text-xs text-purple-500">Soulmates Found</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-pink-600">98%</div>
                                    <div className="text-xs text-purple-500">Success Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-yellow-600">4.9★</div>
                                    <div className="text-xs text-purple-500">Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 