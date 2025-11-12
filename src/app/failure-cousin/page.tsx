"use client"
import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'

const page = () => {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-xl">
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 5.25a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V8.25A.75.75 0 0 1 12 7.5Zm0 9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    <span className="bg-gradient-to-r from-destructive via-destructive/80 to-destructive/60 bg-clip-text text-transparent">
                      Payment failed
                    </span>
                  </h1>
                  <p className="mt-2 text-muted-foreground">Something went wrong while processing your payment.</p>

                  <div className="mt-6">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-full bg-primary text-white px-5 py-2.5 text-sm shadow hover:bg-primary/90 transition"
                    >
                      Go to Home
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default page