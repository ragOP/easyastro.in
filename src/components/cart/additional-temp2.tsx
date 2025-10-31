import React, { useState } from "react";
import { ChevronUp, ChevronDown, Sparkles } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface AdditionalProductsProps {
  products: Product[];
  selectedProducts: string[];
  onProductToggle: (productId: string) => void;
}

export default function AdditionalTemp2({
  products,
  selectedProducts,
  onProductToggle,
}: AdditionalProductsProps) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleExpanded = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <>
      <style>{`
        @keyframes borderTravel {
          0% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .shimmer-border-container {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(241,245,249,0.90), rgba(240,249,255,0.80));
          border-radius: 12px;
        }

        .shimmer-border-container::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          padding: 1px;
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0.8) 0%,
            rgba(236, 72, 153, 0.8) 20%,
            rgba(59, 130, 246, 0.8) 40%,
            rgba(34, 197, 94, 0.8) 60%,
            rgba(168, 85, 247, 0.8) 80%,
            rgba(255, 255, 255, 0.9) 100%
          );
          background-size: 300% 300%;
          animation: borderTravel 6s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .shimmer-border-container::after {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 11px;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(241,245,249,0.90), rgba(240,249,255,0.80));
        }
      `}</style>

      <div className="relative group">
        {/* Animated Gradient Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="shimmer-border-container relative p-2 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Title Section */}
            <div className="text-center mb-2 pb-1.5 border-b border-purple-200/30">
              <div className="flex items-center justify-center space-x-1.5 mb-0.5">
                <Sparkles size={12} className="text-purple-500" />
                <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Enhance Your Love Journey
                </span>
                <Sparkles size={12} className="text-pink-500" />
              </div>
              <p className="text-xs text-gray-600">
                Discover deeper cosmic guidance
              </p>
            </div>

            <div className="space-y-1">
              {products.map((product) => (
                <div key={product.id} className="group">
                  {/* Product Card */}
                  <div className="flex items-start space-x-2 p-2 rounded-lg bg-gradient-to-br from-white/50 to-purple-50/30 hover:from-white/70 hover:to-purple-100/50 border border-white/60 hover:border-purple-300/50 transition-all duration-300">
                    {/* Checkbox */}
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        id={`product-${product.id}`}
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => onProductToggle(product.id)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`product-${product.id}`}
                        className={`relative flex items-center justify-center w-3.5 h-3.5 rounded-md cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                          selectedProducts.includes(product.id)
                            ? "bg-gradient-to-br from-purple-500 to-pink-500 border border-purple-300"
                            : "bg-white border-2 border-gray-300 hover:border-purple-400"
                        }`}
                      >
                        {selectedProducts.includes(product.id) && (
                          <svg
                            className="w-2 h-2 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </label>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <label
                          htmlFor={`product-${product.id}`}
                          className="text-gray-900 font-semibold text-xs cursor-pointer truncate"
                        >
                          {product.title}
                        </label>
                        <div className="flex items-center space-x-0.5 flex-shrink-0">
                          <span className="text-xs font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text whitespace-nowrap">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 line-through whitespace-nowrap">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Chevron Button */}
                    <button
                      onClick={() => toggleExpanded(product.id)}
                      className="p-0.5 rounded-md bg-purple-100/50 hover:bg-purple-200 text-purple-600 transition-all duration-300 flex-shrink-0"
                    >
                      {expandedProduct === product.id ? (
                        <ChevronUp size={12} />
                      ) : (
                        <ChevronDown size={12} />
                      )}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expandedProduct === product.id && (
                    <div className="mt-1 p-1.5 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 backdrop-blur-sm ml-5 space-y-1 animate-in fade-in duration-300">
                      {/* Description */}
                      <p className="text-gray-700 text-xs leading-tight">
                        {product.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-0.5">
                        {product.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-1 p-1 bg-white/50 rounded-md border border-purple-200/30"
                          >
                            <div className="w-0.5 h-0.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0 mt-1.5"></div>
                            <span className="text-gray-700 text-xs leading-tight line-clamp-1">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
