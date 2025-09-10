"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txnid = searchParams.get("txnid");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/order-confirmation-payu?txnid=${txnid}`);
    }, 2500);
    return () => clearTimeout(timer);
  }, [router, txnid]);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Payment successful
        </h1>
        <p className="text-muted-foreground mb-6">
          Redirecting you to your order details…
        </p>
        <div className="mx-auto h-1.5 w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full origin-left animate-[progress_1.5s_linear_forwards] rounded-full bg-pink-500" />
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md text-center">
              <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight mb-2">
                Payment successful
              </h1>
              <p className="text-muted-foreground mb-6">
                Redirecting you to your order details…
              </p>
              <div className="mx-auto h-1.5 w-40 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-full origin-left animate-[progress_1.5s_linear_forwards] rounded-full bg-pink-500" />
              </div>
            </div>
          </main>
        }
      >
        <SuccessContent />
      </Suspense>
      <Footer />
      <style jsx global>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
