import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ananya",
    location: "Mumbai",
    rating: 5,
    text: "I honestly didn't expect much, but the sketch felt scary accurate. The description matched exactly what I'm drawn to.",
    avatar: "A",
  },
  {
    name: "Ritika",
    location: "Delhi",
    rating: 5,
    text: "The quiz itself felt calming. The result made me emotional. Worth every rupee.",
    avatar: "R",
  },
  {
    name: "Karan",
    location: "Bangalore",
    rating: 5,
    text: "I've tried many astrology products, but this felt personal. Not generic at all.",
    avatar: "K",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-14 md:py-20 bg-background relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Real Stories
          </span>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
            What Our Seekers Say
          </h2>
          
          {/* Rating line */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-coral text-coral" />
              ))}
            </div>
            <span className="text-foreground font-medium">4.8/5</span>
            <span className="text-muted-foreground text-sm">from 50,000+ users</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card variant="glass" className="h-full hover:shadow-card transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-coral text-coral"
                      />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-foreground/90 leading-relaxed mb-5 text-sm italic">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="font-medium text-foreground text-sm">
                          {testimonial.name}
                        </p>
                        <BadgeCheck className="w-4 h-4 text-primary" />
                        <span className="text-xs text-primary/70">Verified</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
