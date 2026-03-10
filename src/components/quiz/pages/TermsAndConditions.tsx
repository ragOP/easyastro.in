import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import  Link  from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms & Conditions | Soulmate Sketch</title>
        <meta name="description" content="Terms and Conditions for Soulmate Sketch - Read our terms of service and usage policies." />
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
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Terms & Conditions
            </h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                1. Nature of Products
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This website sells <strong>digital products only</strong>. All our offerings, including soulmate sketches and personalized readings, are delivered electronically via email. There is <strong>no physical shipping</strong> involved in any of our services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                2. Digital Product Delivery
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Upon successful payment, your personalized soulmate sketch and reading will be delivered to the email address you provide during checkout. Delivery typically occurs within 24 hours of order confirmation. Please ensure you provide a valid and accessible email address.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                3. Personal Use Only
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All digital content provided through our services is for <strong>personal use only</strong>. You may not reproduce, distribute, modify, display, or sell any content received from us without explicit written permission.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, images, and digital products, is the property of <strong>Speklio Media Private Limited</strong> and is protected by intellectual property laws. Unauthorized use of any content may result in legal action.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                5. Accuracy of Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to provide accurate, current, and complete information during the ordering process. We are not responsible for any delays or failures in delivery caused by incorrect or incomplete information provided by you.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are provided for entertainment and personal insight purposes. We make no guarantees regarding the accuracy of any readings or predictions. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                7. Modification of Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice. We may also update these Terms & Conditions periodically, and continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                8. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh.
              </p>
            </section>

            <section className="bg-muted/30 rounded-xl p-6 border border-border">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Company Information
              </h2>
              <div className="text-muted-foreground space-y-2">
                <p><strong>Speklio Media Private Limited</strong></p>
                <p>C-910, CID Colony, Mahanagar, Lucknow – 226006</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
