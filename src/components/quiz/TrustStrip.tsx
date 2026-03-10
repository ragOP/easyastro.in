'use client';
import { motion } from "framer-motion";
import { Shield, Mail, Eye, Heart } from "lucide-react";

const trustItems = [
  { icon: Shield, text: "Secure Payments" },
  { icon: Mail, text: "Instant Digital Delivery" },
  { icon: Eye, text: "Privacy First" },
  { icon: Heart, text: "Trusted Worldwide" },
];

const TrustStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-6 border-t border-primary/10"
    >
      {trustItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
          <item.icon className="w-4 h-4 text-primary/60" />
          <span>{item.text}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default TrustStrip;
