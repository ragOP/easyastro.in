import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import  Link  from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24-48 hours.");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us | Soulmate Sketch</title>
        <meta name="description" content="Get in touch with Soulmate Sketch - We're here to help with any questions or concerns." />
      </Helmet>

      <div className="container px-4 py-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/myquiz" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Contact Us
            </h1>
          </div>

          <p className="text-muted-foreground mb-12 text-lg">
            Have questions or need assistance? We're here to help. Reach out to us using any of the methods below.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Speklio Media Private Limited<br />
                        C-910, CID Colony, Mahanagar<br />
                        Lucknow – 226006
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground text-sm">
                        <a href="tel:+917388999711" className="hover:text-primary transition-colors">
                          +91-7388999711
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Response Time</h3>
                      <p className="text-muted-foreground text-sm">
                        We aim to respond within 24-48 business hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
