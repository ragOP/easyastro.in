"use client";
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import SisterCtaButton from './sister-cta-button';
import { Heart, Sparkles, Star, Zap, CheckCircle, Clock, Users, Award } from 'lucide-react';

export default function SisterHeroSection3() {
  const router = useRouter();

  const handleRevealSoulmate = () => {
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                Discover Your Soulmate's Face
              </span>
              <span className="block text-gray-900 mt-2">
                Through AI-Powered Astrology
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Stop wondering what your soulmate looks like. Our advanced AI combines 
              <span className="font-semibold text-teal-600"> astrology + psychic art </span>
              to reveal the exact face of the person you're destined to meet.
            </p>

            {/* Social Proof Banner */}
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-full px-8 py-4 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-teal-700">9,427+ sketches revealed this week</span>
              </div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              <SisterCtaButton onClick={handleRevealSoulmate} />
              <p className="text-sm text-gray-500">✨ 100% AI Generated • Instant Results • Money Back Guarantee</p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                  alt="AI Generated Soulmate Sketch Example"
                  className="w-full max-w-2xl h-auto object-cover"
                  priority
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="font-bold text-sm">✨ AI Generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Soulmate Sketches?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the most accurate soulmate visualization using cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Accuracy</h3>
              <p className="text-gray-600">Advanced algorithms analyze your astrological data to create the most accurate soulmate visualization possible.</p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Results</h3>
              <p className="text-gray-600">Get your soulmate sketch within minutes, not days. No waiting, no delays - just instant revelation.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600">Join thousands of satisfied customers who have found their soulmates through our accurate sketches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people who found their soulmates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700">"The sketch was incredibly accurate! I met my soulmate just 2 weeks later and he looked exactly like the drawing."</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-2xl border border-teal-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mike R.</h4>
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700">"I was skeptical at first, but the AI sketch revealed my future wife's face perfectly. Amazing technology!"</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Lisa K.</h4>
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700">"Found my soulmate within a month using this sketch! The accuracy is mind-blowing. Highly recommend!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Meet Your Soulmate?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of people who have already discovered their soulmate's face. 
            Don't wait another day to find true love.
          </p>
          
          <div className="space-y-4">
            <SisterCtaButton onClick={handleRevealSoulmate} />
            <p className="text-blue-200 text-sm">
              ⚡ Instant Results • 🔒 Secure & Private • 💯 Money Back Guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 