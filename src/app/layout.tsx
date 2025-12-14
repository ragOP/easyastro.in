"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Alegreya, Belleza } from "next/font/google";
import Script from "next/script";
import React from "react";

// ================= Fonts =================
const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
});

const belleza = Belleza({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-belleza",
  display: "swap",
});

// ================= Metadata =================
export const metadata: Metadata = {
  title: "Easy Astro",
  description:
    "Discover your soulmate's face today with a personalized sketch from our gifted psychics.",
};

// ================= Pixel IDs =================
const PIXEL_1 = "1330934167928475";
const PIXEL_2 = "3960073624225686";

/**
 * Client-only PageView tracker (SPA safe)
 * Lives INSIDE layout file
 */
function MetaPixelPageViewClient() {
  "use client";

  const { usePathname, useSearchParams } = require("next/navigation");
  const { useEffect, useRef } = require("react");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastKeyRef = useRef("");

  useEffect(() => {
    const qs = searchParams?.toString?.() ?? "";
    const key = `${pathname}?${qs}`;

    // Prevent double fire (StrictMode, re-renders)
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${alegreya.variable} ${belleza.variable} scroll-smooth`}
    >
      <body className="font-body antialiased">
        {/* ================= Meta Pixel (load ONCE, init BOTH) ================= */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${PIXEL_1}');
            fbq('init', '${PIXEL_2}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* SPA route-change PageView */}
        <MetaPixelPageViewClient />

        {/* ================= noscript fallback ================= */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_1}&ev=PageView&noscript=1`}
            alt=""
          />
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_2}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {children}
        <Toaster />
      </body>
    </html>
  );
}
