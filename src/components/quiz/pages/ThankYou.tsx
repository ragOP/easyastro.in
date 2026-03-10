import { motion } from "framer-motion";
import  Link  from "next/link";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, Clock, Heart, Share2 } from "lucide-react";
import FloatingElements from "@/components/quiz/FloatingElements";

const steps = [
  {
    icon: Check,
    title: "Order Confirmed",
    description: "Your payment has been processed successfully.",
  },
  {
    icon: Mail,
    title: "Check Your Email",
    description: "Your soulmate sketch will arrive within 24-48 hours.",
  },
  {
    icon: Clock,
    title: "Personalization In Progress",
    description: "Our astrologer is crafting your unique reading.",
  },
];

const ThankYou = () => {
  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden flex items-center justify-center">
      <FloatingElements />
      <Helmet>
        <title>Thank You | Soulmate Sketch</title>
        <meta name="description" content="Your order is confirmed. Your personalized soulmate sketch is being prepared." />
      </Helmet>

      <div className="container px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            {/* Success animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full gradient-primary flex items-center justify-center shadow-glow"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Heart className="w-12 h-12 text-primary-foreground fill-primary-foreground" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4"
            >
              Thank You! 💕
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg"
            >
              Your soulmate journey has officially begun.
            </motion.p>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="elevated">
              <CardContent className="p-8">
                <h2 className="font-serif text-xl font-semibold text-center mb-8">
                  What Happens Next?
                </h2>

                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.15 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center flex-shrink-0 shadow-soft">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Share section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 pt-8 border-t border-border text-center"
                >
                  <p className="text-muted-foreground mb-4">
                    Share your excitement with friends!
                  </p>
                  <Button variant="soft" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share on Instagram
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back to home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8"
          >
            <Link href="/">
              <Button variant="ghost">
                ← Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
