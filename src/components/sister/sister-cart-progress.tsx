import React from 'react';
import { Check, Heart, User, CreditCard } from 'lucide-react';

interface SisterCartProgressProps {
  currentStep: 'cart' | 'form' | 'checkout';
  animateElements: boolean;
}

export default function SisterCartProgress({ currentStep, animateElements }: SisterCartProgressProps) {
  const steps = [
    { id: 'cart', label: 'Cart Review', icon: Heart, completed: true },
    { id: 'form', label: 'Personal Details', icon: User, completed: currentStep !== 'cart' },
    { id: 'checkout', label: 'Checkout', icon: CreditCard, completed: currentStep === 'checkout' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div
        className={`flex items-center justify-between ${
          animateElements
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        } transition-all duration-1000 delay-300`}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.completed;
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* Step Icon */}
              <div className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>

              {/* Step Label */}
              <span className={`text-xs font-medium text-center transition-colors duration-300 ${
                isCompleted
                  ? 'text-green-600'
                  : isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`absolute top-6 left-1/2 w-full h-0.5 transition-colors duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-muted'
                }`} style={{ left: 'calc(50% + 24px)' }}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mt-4">
        <div
          className={`h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 rounded-full transition-all duration-1000 delay-500 ${
            animateElements ? "w-full" : "w-0"
          }`}
        ></div>
      </div>
    </div>
  );
} 