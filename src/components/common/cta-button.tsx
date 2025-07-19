import { Button } from "@/components/ui/button";

export default function CtaButton() {
    return (
        <div className="text-center">
            <a href="https://superprofile.bio/vp/Soulmate-sketch?checkout=true">
                <Button size="lg" className="font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-shine">
                    Reveal My Soulmate Now
                </Button>
            </a>
            <p className="mt-4 text-sm text-primary/80 animate-pulse">
                Only a few spots left! Hurry before the special offer ends.
            </p>
        </div>
    );
}
