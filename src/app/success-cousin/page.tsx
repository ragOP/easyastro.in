"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txnid = searchParams.get("txnid");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/order-confirmation-cousin?txnid=${txnid}`);
    }, 2500);
    return () => clearTimeout(timer);
  }, [router, txnid]);

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-xl">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 bg-clip-text text-transparent">
                    Payment successful
                  </span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Redirecting you to your order details…
                </p>
                <div className="mt-6 mx-auto h-1.5 w-40 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-full origin-left animate-[progress_1.5s_linear_forwards] rounded-full bg-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
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
          <main className="flex-1">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-full max-w-xl">
                  <Card className="bg-card border-border">
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-8 w-8"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 bg-clip-text text-transparent">
                          Payment successful
                        </span>
                      </h1>
                      <p className="mt-2 text-muted-foreground">
                        Redirecting you to your order details…
                      </p>
                      <div className="mt-6 mx-auto h-1.5 w-40 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-full origin-left animate-[progress_1.5s_linear_forwards] rounded-full bg-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
