import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import  Link  from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Soulmate Sketch</title>
        <meta name="description" content="Privacy Policy for Soulmate Sketch - Learn how we collect, use, and protect your personal information." />
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
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Privacy Policy
            </h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when using our services. This includes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Name</strong> – To personalize your soulmate sketch and reading</li>
                <li><strong>Email Address</strong> – To deliver your digital product and communicate with you</li>
                <li><strong>Phone Number</strong> – For customer support purposes (optional)</li>
                <li><strong>Quiz Responses</strong> – To create your personalized soulmate sketch and reading</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your personal information is used solely for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Processing Orders</strong> – To complete your purchase and payment</li>
                <li><strong>Delivering Digital Products</strong> – To send your personalized soulmate sketch and reading to your email</li>
                <li><strong>Customer Support</strong> – To respond to your inquiries and provide assistance</li>
                <li><strong>Service Improvement</strong> – To enhance our offerings and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                3. Data Protection & Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information. Your data is stored securely and we use encryption for all sensitive transactions. We are committed to ensuring that your information is safe with us.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                4. Data Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>We do not sell, rent, or share your personal data with any third parties</strong> for marketing purposes. Your information may only be shared with trusted service providers (such as payment processors) who assist us in operating our website and conducting our business, and who agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                5. Your Consent
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By using our website and services, you consent to the collection and use of your personal information as described in this Privacy Policy. If you do not agree with our policies, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                6. Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how you use our site. You can choose to disable cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="bg-muted/30 rounded-xl p-6 border border-border">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
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

export default PrivacyPolicy;
