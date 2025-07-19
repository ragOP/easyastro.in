import { ArtIcon, ReadingIcon } from "@/components/icons";
import { CircleDollarSign } from "lucide-react";
import { Check } from "lucide-react";
import CtaButton from "../common/cta-button";

const deliverables = [
    {
        icon: <ArtIcon className="h-10 w-10 text-primary" />,
        title: "Personalized Psychic Sketch",
        description: "A custom illustration of your soulmate, blending psychic insight with astrological accuracy."
    },
    {
        icon: <ReadingIcon className="h-10 w-10 text-primary" />,
        title: "In-Depth Love Reading",
        description: "Discover your soulmate’s personality traits, potential relationship dynamics, and when you may meet."
    },
    {
        icon: <CircleDollarSign className="h-10 w-10 text-primary" />,
        title: "💰 Unlock Your Personalized Wealth Report 💫",
        description: (
            <div className="space-y-3">
                <p>Discover the hidden secrets of your financial destiny 🌟 — including money blocks 🚫, wealth opportunities 💼, and cosmic guidance to abundance 🌈.</p>
                <p className="font-semibold">✨ This powerful add-on is your roadmap to:</p>
                <ul className="list-none space-y-1 pl-2">
                    <li>🔓 Clearing financial blocks</li>
                    <li>🧲 Attracting lasting prosperity</li>
                    <li>🌠 Aligning with your money-making potential</li>
                </ul>
                <p className="font-bold">🔥 Limited-time bump offer — supercharge your journey to wealth today! 🚀</p>
            </div>
        )
    }
];

export default function WhatYouReceiveSection() {
    return (
        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto">
                <div className="max-w-xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline mb-4">What You Receive</h2>
                </div>
                <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
                    {deliverables.map((item, index) => (
                        <div key={index} className="flex items-start gap-6 p-6 rounded-lg bg-card shadow-md border border-primary/10">
                            <div className="flex-shrink-0">{item.icon}</div>
                            <div>
                                <h3 className="text-xl font-headline text-primary mb-2">{item.title}</h3>
                                <div className="text-foreground/80">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-center mt-8 text-lg font-semibold text-accent flex items-center justify-center gap-2">
                    <Check className="h-5 w-5" /> Every order is 100% private and confidential.
                </p>
                <CtaButton />
            </div>
        </section>
    );
}
