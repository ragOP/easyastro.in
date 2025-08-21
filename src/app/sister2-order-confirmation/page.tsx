import React from 'react';
import { CheckCircle, Heart, Sparkles, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Sister2OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(236,72,153,0.3) 1px, transparent 0)`,
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
            <h1 className="text-3xl font-bold text-white mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-lg text-gray-300">
              Your soulmate sketch journey has begun
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              Order Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">Order ID:</span>
                <span className="font-mono font-semibold text-pink-300">#SK-2024-001</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">Product:</span>
                <span className="font-semibold text-white">AI Soulmate Sketch</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">Amount Paid:</span>
                <span className="font-bold text-green-400 text-lg">₹389</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">Payment Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Paid
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300">Order Date:</span>
                <span className="font-semibold text-white">
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
          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              What Happens Next?
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Processing Your Order</h3>
                  <p className="text-gray-300 text-sm">Our AI system is analyzing your birth details to create your soulmate sketch.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">AI Generation</h3>
                  <p className="text-gray-300 text-sm">Advanced algorithms will create your soulmate's face visualization within 24-48 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Secure Delivery</h3>
                  <p className="text-gray-300 text-sm">Your soulmate sketch will be delivered securely to your email address.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sister2-records"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              View My Records
            </Link>
            
            <Link
              href="/sister2"
              className="border-2 border-pink-300 text-pink-300 px-8 py-4 rounded-xl font-semibold hover:bg-pink-300/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Back to Home
            </Link>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8">
            <p className="text-gray-300 mb-2">Need help? Contact our support team</p>
            <a 
              href="mailto:support@easyastro.in" 
              className="text-pink-400 hover:text-pink-300 font-medium"
            >
              support@easyastro.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 