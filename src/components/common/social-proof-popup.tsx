
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

export default function SocialProofPopup() {
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
            // Wait for a random time between 7 and 20 seconds before showing the next popup
            const randomDelay = Math.floor(Math.random() * (20000 - 7000 + 1)) + 7000;
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
                "fixed z-50 p-3 rounded-lg shadow-lg bg-primary text-primary-foreground transition-all duration-500 ease-in-out w-72",
                // Mobile: top-center
                "top-4 left-1/2 -translate-x-1/2",
                // Desktop: bottom-left
                "sm:bottom-24 sm:left-4 sm:top-auto sm:translate-x-0",
                isVisible ? 'opacity-100 translate-y-0 sm:translate-y-0' : 'opacity-0 -translate-y-12 sm:translate-y-12'
            )}
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-foreground/20 rounded-full">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-sm">
                    <p className="font-semibold">{popup.name} from {popup.city}</p>
                    <p className="text-primary-foreground/80">just got their soulmate sketch!</p>
                </div>
            </div>
        </div>
    );
}
