import React from 'react';
import { CheckCircle, Heart, Sparkles, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function SisterOrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-16 px-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Your soulmate sketch journey has begun
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Order Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-semibold text-gray-800">#SK-2024-001</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Product:</span>
                <span className="font-semibold text-gray-800">AI Soulmate Sketch</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-bold text-green-600 text-lg">₹999</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Payment Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Paid
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-semibold text-gray-800">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white/80 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              What Happens Next?
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Processing Your Order</h3>
                  <p className="text-gray-600 text-sm">Our AI system is analyzing your birth details to create your soulmate sketch.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">AI Generation</h3>
                  <p className="text-gray-600 text-sm">Advanced algorithms will create your soulmate's face visualization within 24-48 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Secure Delivery</h3>
                  <p className="text-gray-600 text-sm">Your soulmate sketch will be delivered securely to your email address.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sister-records"
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              View My Records
            </Link>
            
            <Link
              href="/sister"
              className="border-2 border-rose-300 text-rose-700 px-8 py-4 rounded-xl font-semibold hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Back to Home
            </Link>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-2">Need help? Contact our support team</p>
            <a 
              href="mailto:support@easyastro.in" 
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              support@easyastro.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 