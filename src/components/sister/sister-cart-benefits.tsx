import React from 'react';
import { Heart, Sparkles, Clock, Shield, Star, Zap } from 'lucide-react';

interface SisterCartBenefitsProps {
  animateElements: boolean;
}

export default function SisterCartBenefits({ animateElements }: SisterCartBenefitsProps) {
  const benefits = [
    {
      icon: Heart,
      title: 'Love & Romance',
      description: 'Discover your soulmate through advanced AI technology',
      color: 'text-rose-500'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Cutting-edge artificial intelligence for accurate results',
      color: 'text-pink-500'
    },
    {
      icon: Clock,
      title: 'Instant Results',
      description: 'Get your soulmate sketch within minutes, not days',
      color: 'text-violet-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your personal information is completely protected',
      color: 'text-rose-600'
    },
    {
      icon: Star,
      title: 'Proven Results',
      description: 'Join thousands of satisfied customers worldwide',
      color: 'text-pink-600'
    },
    {
      icon: Zap,
      title: 'Money Back Guarantee',
      description: '100% satisfaction guaranteed or your money back',
      color: 'text-violet-600'
    }
  ];

  return (
    <div className="bg-white/30 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-6 mb-8">
      <div className="text-center mb-6">
        <h3
          className={`text-xl font-bold text-gray-800 mb-2 ${
            animateElements
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          } transition-all duration-1000 delay-400`}
        >
          Why Choose Our Soulmate Sketch?
        </h3>
        <p
          className={`text-gray-600 ${
            animateElements
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          } transition-all duration-1000 delay-500`}
        >
          Experience the perfect blend of technology and spirituality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className={`bg-white/50 backdrop-blur-sm border border-rose-200/20 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                animateElements
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          );
        })}
      </div>

      {/* Special Offer Banner */}
      <div
        className={`mt-6 bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-200 rounded-xl p-4 text-center ${
          animateElements
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        } transition-all duration-1000 delay-800`}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-rose-600" />
          <span className="font-bold text-rose-700">Special Offer</span>
          <Sparkles className="w-5 h-5 text-rose-600" />
        </div>
        <p className="text-rose-700 font-medium">
          Get 50% OFF on your first soulmate sketch! Limited time offer.
        </p>
      </div>
    </div>
  );
} 