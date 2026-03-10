import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import  Link  from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Refund & Cancellation Policy | Soulmate Sketch</title>
        <meta name="description" content="Refund and Cancellation Policy for Soulmate Sketch - Understand our refund guidelines for digital products." />
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
              <RotateCcw className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Refund & Cancellation Policy
            </h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                1. Digital Product Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All products sold on this website are <strong>digital products</strong> that are delivered electronically via email. Due to the nature of digital products, once your personalized soulmate sketch and reading has been delivered, <strong>refunds are generally not applicable</strong>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                2. When Refunds May Be Considered
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We understand that issues can occasionally occur. Refunds will be considered only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Technical Errors</strong> – If a technical issue on our end prevents you from receiving or accessing your digital product</li>
                <li><strong>Duplicate Charges</strong> – If you were accidentally charged more than once for the same order</li>
                <li><strong>Non-Delivery</strong> – If you do not receive your product within 48 hours of payment and our support team cannot resolve the issue</li>
                <li><strong>Incorrect Delivery</strong> – If you receive a product that was clearly not intended for you due to our error</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                3. Non-Refundable Situations
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Refunds will <strong>not</strong> be provided in the following cases:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Change of Mind</strong> – Deciding you no longer want the product after purchase</li>
                <li><strong>Dissatisfaction with Results</strong> – Personal disagreement with the content of your reading or sketch</li>
                <li><strong>Incorrect Customer Details</strong> – Delays or non-delivery caused by incorrect email address or other information provided by you</li>
                <li><strong>Already Delivered Products</strong> – Once the digital product has been successfully sent to your email</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                4. Cancellation Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Orders cannot be cancelled once payment has been processed, as our team begins working on your personalized reading immediately. If you believe you have made a purchase in error, please contact us as soon as possible and we will review your case.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                5. Refund Process
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If your refund request is approved, the refund will be processed within <strong>7-10 business days</strong>. The amount will be credited back to the original payment method used during purchase.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                6. How to Request a Refund
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund or report an issue with your order, please contact our support team with your order details, email address used for purchase, and a description of the issue. We aim to respond to all inquiries within 24-48 business hours.
              </p>
            </section>

            <section className="bg-muted/30 rounded-xl p-6 border border-border">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Contact for Refund Queries
              </h2>
              <div className="text-muted-foreground space-y-2">
                <p><strong>Speklio Media Private Limited</strong></p>
                <p>C-910, CID Colony, Mahanagar, Lucknow – 226006</p>
                <p>📞 +91-7388999711</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;
