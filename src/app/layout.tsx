import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Alegreya, Belleza } from "next/font/google";
import Script from "next/script";
import React from "react";

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

export const metadata: Metadata = {
  title: "Easy Astro",
  description:
    "Discover your soulmate's face today with a personalized sketch from our gifted psychics.",
};

// ✅ ONLY ONE PIXEL LEFT
const PIXEL = "3960073624225686";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${alegreya.variable} ${belleza.variable} scroll-smooth`}
    >
      <body className="font-body antialiased">
        {/* ================= META PIXEL ================= */}
        <Script id="meta-pixel-base" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${PIXEL}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ========== SPA PAGEVIEW TRACKER (deduped) ========== */}
        <Script id="meta-pixel-spa-pageview" strategy="afterInteractive">
          {`
            (function () {
              function safeTrack() {
                try {
                  if (!window.fbq) return;
                  var url = location.href;
                  if (window.__lastFbqPV === url) return;
                  window.__lastFbqPV = url;
                  window.fbq('track', 'PageView');
                } catch (e) {}
              }

              function init(attempt) {
                if (window.fbq) {
                  safeTrack();

                  var _pushState = history.pushState;
                  var _replaceState = history.replaceState;

                  history.pushState = function () {
                    _pushState.apply(this, arguments);
                    safeTrack();
                  };

                  history.replaceState = function () {
                    _replaceState.apply(this, arguments);
                    safeTrack();
                  };

                  window.addEventListener('popstate', safeTrack);
                  return;
                }

                if (attempt < 60) {
                  setTimeout(function () {
                    init(attempt + 1);
                  }, 100);
                }
              }

              init(0);
            })();
          `}
        </Script>

        {/* ================= noscript fallback ================= */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {children}
        <Toaster />
      </body>
    </html>
  );
}
