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

const PIXEL_1 = "1330934167928475";
const PIXEL_2 = "3960073624225686";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${alegreya.variable} ${belleza.variable} scroll-smooth`}
    >
      <body className="font-body antialiased">
        {/* ================= META PIXEL: load once, init both ================= */}
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

            fbq('init', '${PIXEL_1}');
            fbq('init', '${PIXEL_2}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ========== SPA PAGEVIEW TRACKER (NO hooks, stays in layout) ========== */}
        <Script id="meta-pixel-spa-pageview" strategy="afterInteractive">
          {`
            (function () {
              function safeFbqTrackPageView() {
                try {
                  if (!window.fbq) return;

                  // de-dupe per URL (prevents double firing)
                  var url = location.href;
                  if (window.__lastFbqPV === url) return;
                  window.__lastFbqPV = url;

                  window.fbq('track', 'PageView');
                } catch (e) {}
              }

              // Wait until fbq exists, then attach listeners
              function initWhenReady(attempt) {
                if (window.fbq) {
                  // Track immediately once (for safety)
                  safeFbqTrackPageView();

                  // Hook history changes for SPA navigation
                  var _pushState = history.pushState;
                  var _replaceState = history.replaceState;

                  history.pushState = function () {
                    _pushState.apply(this, arguments);
                    safeFbqTrackPageView();
                  };

                  history.replaceState = function () {
                    _replaceState.apply(this, arguments);
                    safeFbqTrackPageView();
                  };

                  window.addEventListener('popstate', function () {
                    safeFbqTrackPageView();
                  });

                  return;
                }

                // retry a few times (pixel script loads async)
                if (attempt < 60) setTimeout(function () { initWhenReady(attempt + 1); }, 100);
              }

              initWhenReady(0);
            })();
          `}
        </Script>

        {/* ================= noscript fallback (both pixels) ================= */}
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
