"use client";

import { useMemo } from "react";

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function LegalPage() {
  const sections = useMemo<Section[]>(
    () => [
      {
        id: "company-info",
        title: "Company Information",
        content: (
          <div className="space-y-4">
            <p>
              This website is owned and operated by the following registered entity:
            </p>

            <div className="rounded-xl border border-pink-100 bg-brand-50 p-4 space-y-2">
              <p><strong>Legal Name:</strong> SPEKLIO MEDIA PRIVATE LIMITED</p>
              <p><strong>GST Number:</strong> 09ABRCS9008B1Z3</p>
              <p><strong>Business Type:</strong> Private Limited Company</p>

              <p className="mt-2"><strong>Registered Address:</strong></p>
              <div className="pl-3 text-sm text-slate-700 space-y-1">
                <p>Building No./Flat No.: C-910</p>
                <p>Premises: CID Colony</p>
                <p>Road/Street: CID Colony</p>
                <p>Locality: Mahanagar</p>
                <p>City: Lucknow</p>
                <p>District: Lucknow</p>
                <p>State: Uttar Pradesh</p>
                <p>PIN Code: 226006</p>
                <p>Country: India</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "about-us",
        title: "About Us",
        content: (
          <div className="space-y-4">
            <p>
              EasyAstro is a product of SPEKLIO MEDIA PRIVATE LIMITED.
            </p>
            <p>
              We provide digital astrology services including soulmate sketches,
              astrology readings, and spiritual insights using modern technology
              combined with traditional astrological practices.
            </p>
          </div>
        )
      },
      {
        id: "privacy-policy",
        title: "Privacy Policy",
        content: (
          <div className="space-y-4">
            <p>
              We respect your privacy and protect your personal information.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>We collect name, email, and birth details to prepare reports.</li>
              <li>We do not sell or share your data.</li>
              <li>Payments are handled securely via third-party gateways.</li>
              <li>We do not store card information.</li>
            </ul>
          </div>
        )
      },
      {
        id: "terms",
        title: "Terms & Conditions",
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>All products are digital.</li>
              <li>Products are for entertainment purposes only.</li>
              <li>Unauthorized resale is prohibited.</li>
              <li>Prices may change without notice.</li>
            </ul>
          </div>
        )
      },
      {
        id: "refund-policy",
        title: "Refund Policy",
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds allowed only for duplicate or failed delivery.</li>
              <li>No refund after successful delivery.</li>
              <li>Refund processing time: 5–7 working days.</li>
            </ul>
          </div>
        )
      },
      {
        id: "delivery-policy",
        title: "Delivery Policy",
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivery via email within 24–48 hours.</li>
              <li>Ensure correct email address is provided.</li>
            </ul>
          </div>
        )
      },
      {
        id: "contact-policy",
        title: "Contact",
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: no-reply@easyastro.in</li>
              <li>Phone: +91 9198050091</li>
              <li>Business Entity: SPEKLIO MEDIA PRIVATE LIMITED</li>
              <li>GSTIN: 09ABRCS9008B1Z3</li>
              <li>Support Hours: Mon–Sat, 10 AM–6 PM IST</li>
            </ul>
          </div>
        )
      }
    ],
    []
  );

  return (
    <main className="px-6 sm:px-10 py-16">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold mb-4">
          Legal & Company Information
        </h1>

        <p className="text-slate-600 mb-10">
          Official legal information for EasyAstro and SPEKLIO MEDIA PRIVATE LIMITED.
        </p>

        <div className="space-y-10">

          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl font-semibold mb-3">
                {section.title}
              </h2>

              {section.content}
            </section>
          ))}

        </div>

        <div className="mt-16 pt-8 border-t text-sm text-slate-600 space-y-2">
          <p><strong>SPEKLIO MEDIA PRIVATE LIMITED</strong></p>
          <p>GSTIN: 09ABRCS9008B1Z3</p>
          <p>Lucknow, Uttar Pradesh, India</p>
          <p>
            © {new Date().getFullYear()} SPEKLIO MEDIA PRIVATE LIMITED. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  );
}
