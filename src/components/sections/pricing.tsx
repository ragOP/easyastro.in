import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Tag } from "lucide-react";
import CountdownTimer from "@/components/ui/countdown-timer";

export default function PricingSection() {
    // Set offer end time to 3 days from now
    const offerEndTime = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto max-w-md">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
          Pricing & Offers
        </h2>
        <Card className="shadow-2xl shadow-primary/20 border-2 border-primary">
          <CardHeader className="text-center bg-primary/10 p-6">
            <CardTitle className="font-headline text-3xl text-primary">Soulmate Sketch</CardTitle>
            <CardDescription className="text-primary/90">Digital sketch + core personality reading</CardDescription>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <span className="text-2xl text-muted-foreground line-through">₹998</span>
              <span className="text-5xl font-bold text-primary ml-2">₹499</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary font-bold bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Tag className="h-5 w-5"/>
              <span>Limited-time discount: Save 50%!</span>
            </div>
            <CountdownTimer endTime={offerEndTime} />
            <p className="text-sm text-muted-foreground mt-4">Order now and secure your special rate.</p>
          </CardContent>
          <CardFooter>
            <a href="#cta" className="w-full">
                <Button size="lg" className="w-full font-bold text-lg py-6 rounded-b-md rounded-t-none">
                Get My Sketch Now
                </Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
