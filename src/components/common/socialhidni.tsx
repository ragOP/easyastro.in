"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

const names = [
    "आरव", "विवान", "आदित्य", "विहान", "अर्जुन", "साई", "रेयांश", "अयान", "कृष्णा", "ईशान",
    "सान्वी", "अन्या", "आध्या", "अनन्या", "दिया", "परी", "मायरा", "अनिका", "अवनि", "रिया"
];

const cities = [
    "मुंबई", "दिल्ली", "बैंगलोर", "हैदराबाद", "अहमदाबाद", "चेन्नई", "कोलकाता", "सूरत", "पुणे", "जयपुर"
];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function     SocialProofPopup() {
    const [popup, setPopup] = useState<{ name: string; city: string; } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showRandomPopup = () => {
            const name = getRandomItem(names);
            const city = getRandomItem(cities);
            
            setPopup({ name, city });
            setIsVisible(true);

            // Hide after 5 sec
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        const scheduleNextPopup = () => {
            const randomDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
            setTimeout(() => {
                showRandomPopup();
                scheduleNextPopup();
            }, randomDelay);
        };

        const initialTimeout = setTimeout(scheduleNextPopup, 5000);

        return () => {
            clearTimeout(initialTimeout);
        };
    }, []);

    if (!popup) return null;

    return (
        <div
            className={cn(
                "fixed z-50 p-2 rounded-lg shadow-lg bg-primary text-primary-foreground transition-transform duration-500 ease-in-out w-72",
                "bottom-24 left-4",
                isVisible ? 'translate-x-0' : '-translate-x-[150%]'
            )}
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-foreground/20 rounded-full">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-sm">
                    <p className="font-semibold">
                      {popup.name} • {popup.city} से
                    </p>
                    <p className="text-primary-foreground/80">
                      अभी-अभी अपना सोलमेट स्केच प्राप्त किया! ✨
                    </p>
                </div>
            </div>
        </div>
    );
}
