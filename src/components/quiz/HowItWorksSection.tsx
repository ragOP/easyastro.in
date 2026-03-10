'use client';
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Mail } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Answer Intuitive Questions",
    description: "Share your birth details and emotional preferences through our calming quiz experience.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Energy Decoding",
    description: "Our astrologer analyzes your unique celestial patterns to reveal your soulmate's energy.",
  },
  {
    number: "03",
    icon: Mail,
    title: "Receive Your Sketch",
    description: "Get a detailed soulmate sketch with personality insights delivered to your inbox.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-14 md:py-20 gradient-soft relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-coral/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Simple Process
          </span>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Three simple steps to discover your soulmate's appearance and energy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="text-center">
                {/* Number badge */}
                <div className="relative inline-block mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-card shadow-card flex items-center justify-center border border-primary/10">
                    <step.icon className="w-9 h-9 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gradient-coral text-primary-foreground text-xs font-bold flex items-center justify-center shadow-soft">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="font-serif text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
