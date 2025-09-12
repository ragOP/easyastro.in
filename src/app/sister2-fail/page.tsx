"use client"
import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const page = () => {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] w-full bg-white flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-red-100 bg-red-50/50 p-8 shadow-sm text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 5.25a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V8.25A.75.75 0 0 1 12 7.5Zm0 9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Payment failed</h1>
          <p className="mt-2 text-gray-600">Something went wrong while processing your payment.</p>

          <div className="mt-6">
            <Link
              href="/sister2"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default page
