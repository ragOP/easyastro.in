
import { ArtIcon, ReadingIcon } from "@/components/icons";
import { CircleDollarSign } from "lucide-react";
import CtaButton from "../common/cta-button";

const deliverables = [
    {
        icon: <ArtIcon className="h-10 w-10 text-primary" />,
        title: "Personalized Psychic Sketch",
        description: "A custom illustration of your soulmate, blending psychic insight with astrological accuracy."
    },
    {
        icon: <ReadingIcon className="h-10 w-10 text-primary" />,
        title: "FREE In-Depth Love Reading",
        description: "As a bonus, discover your soulmate’s personality traits, potential relationship dynamics, and when you may finally meet them.",
        scarcity: "Only 9 spots left!",
    },
    {
        icon: <CircleDollarSign className="h-10 w-10 text-primary" />,
        title: "Optional: Personalized Wealth Report",
        description: "As an add-on, unlock secrets of your financial destiny, revealing money blocks and cosmic guidance to abundance."
    }
];

export default function WhatYouReceiveSection() {
    return (
        <section className="py-14 sm:py-20 bg-background">
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
                                {item.scarcity && (
                                    <p className="mt-3 font-bold text-primary animate-pulse text-sm uppercase tracking-wider">
                                        {item.scarcity}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center text-lg font-semibold text-accent">
                    <p>Every order is 100% private and confidential.</p>
                </div>
                <div className="mt-16">
                    <CtaButton />
                </div>
            </div>
        </section>
    );
}
