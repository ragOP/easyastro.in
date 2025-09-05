"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

const names = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
    "Saanvi", "Anya", "Aadhya", "Ananya", "Diya", "Pari", "Myra", "Anika", "Avani", "Riya"
];

const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur"
];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function ExpSocialProofPopup() {
    const [popup, setPopup] = useState<{ name: string; city: string; } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showRandomPopup = () => {
            const name = getRandomItem(names);
            const city = getRandomItem(cities);
            
            setPopup({ name, city });
            setIsVisible(true);

            // Hide the popup after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        const scheduleNextPopup = () => {
            // Wait for a random time between 5 and 10 seconds before showing the next popup
            const randomDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
            setTimeout(() => {
                showRandomPopup();
                scheduleNextPopup();
            }, randomDelay);
        };

        // Start the first popup after a short delay
        const initialTimeout = setTimeout(scheduleNextPopup, 5000);

        return () => {
            clearTimeout(initialTimeout);
        };
    }, []);

    if (!popup) return null;

    return (
        <div
            className={cn(
                "fixed z-50 p-2 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-transform duration-500 ease-in-out w-72",
                // Positioned bottom-left on all screens
                "bottom-24 left-4",
                isVisible ? 'translate-x-0' : '-translate-x-[150%]'
            )}
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm">
                    <p className="font-semibold">{popup.name} from {popup.city}</p>
                    <p className="text-white/80">just got their soulmate sketch!</p>
                </div>
            </div>
        </div>
    );
} 