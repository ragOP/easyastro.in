"use client";

import React, { useState } from 'react';
import { useCartTheme } from '@/contexts/cart-theme-context';

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

export default function AdditionalProducts({ products, selectedProducts, onProductToggle }: AdditionalProductsProps) {
  const theme = useCartTheme();
  const isValentine = theme === 'valentine';
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleExpanded = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="relative group">
      <div className={`absolute -inset-1 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 ${isValentine ? "bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20" : "bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20"}`}></div>
      <div className={`relative backdrop-blur-xl rounded-3xl p-4 border ${isValentine ? "bg-white/90 border-rose-200" : "bg-gradient-to-br from-white/90 to-white/80 border-primary/20"}`}>
        <div>
          <div className="text-left mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isValentine ? "bg-gradient-to-r from-rose-400 to-pink-400" : "bg-gradient-to-r from-primary to-primary/80"}`}></div>
              <span className={isValentine ? "text-lg font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent" : "text-lg font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"}>
                Enhance Your Love Journey
              </span>
            </div>
            <p className={`text-sm ml-4 ${isValentine ? "text-rose-700" : "text-muted-foreground"}`}>Discover deeper cosmic guidance for your love life</p>
          </div>

          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="space-y-2">
                <div className={`flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 ${isValentine ? "hover:bg-rose-500/10" : "hover:bg-primary/5"}`}>
                  <div className="relative mt-2">
                    <input
                      type="checkbox"
                      id={`product-${product.id}`}
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => onProductToggle(product.id)}
                      className="sr-only"
                    />
                    <label 
                      htmlFor={`product-${product.id}`}
                      className={`relative flex items-center justify-center w-6 h-6 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-125 hover:rotate-3 ${
                        selectedProducts.includes(product.id)
                          ? isValentine
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 border-rose-400 shadow-xl shadow-rose-500/30'
                            : 'bg-gradient-to-r from-primary to-primary/80 border-primary shadow-xl shadow-primary/40'
                          : isValentine
                            ? 'bg-white border-rose-200 hover:border-rose-300 hover:bg-rose-50'
                            : 'bg-white border-primary/30 hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {selectedProducts.includes(product.id) && (
                        <svg 
                          className="w-4 h-4 text-white animate-pulse" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {selectedProducts.includes(product.id) && (
                        <div className={`absolute -inset-1 rounded-lg blur-sm animate-pulse ${isValentine ? "bg-gradient-to-r from-rose-500/50 to-pink-500/50" : "bg-gradient-to-r from-primary/50 to-primary/50"}`}></div>
                      )}
                    </label>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <label htmlFor={`product-${product.id}`} className={`font-medium text-base cursor-pointer ${isValentine ? "text-rose-100" : "text-foreground"}`}>
                          {product.title}
                        </label>
                        <div className="mt-1">
                          {expandedProduct === product.id ? (
                            <p className={isValentine ? "text-rose-200/80 text-sm" : "text-muted-foreground text-sm"}>{product.description}</p>
                          ) : (
                            <>
                              <p className={isValentine ? "text-rose-700 text-sm line-clamp-2" : "text-muted-foreground text-sm line-clamp-2"}>{product.description}</p>
                              <button
                                onClick={() => toggleExpanded(product.id)}
                                className={isValentine ? "text-rose-600 text-xs hover:text-rose-700 transition-colors underline mt-1" : "text-primary text-xs hover:text-primary/80 transition-colors underline mt-1"}
                              >
                                Show More
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <div className={isValentine ? "text-rose-600 font-bold text-base" : "text-foreground font-bold text-base"}>₹{product.price.toLocaleString()}</div>
                        <div className={isValentine ? "text-rose-400 text-sm line-through" : "text-muted-foreground text-sm line-through"}>₹{product.originalPrice.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedProduct === product.id && (
                  <>
                    <div className={`pl-4 mt-2 p-3 rounded-lg border ${isValentine ? "bg-rose-50 border-rose-200" : "bg-primary/5 border-primary/20"}`}>
                      <div className="space-y-1">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 ${isValentine ? "bg-rose-400" : "bg-primary"}`}>
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                            <span className={isValentine ? "text-rose-200/90 text-sm" : "text-foreground/80 text-sm"}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pl-2">
                      <button
                        onClick={() => toggleExpanded(product.id)}
                        className={isValentine ? "text-rose-600 text-xs hover:text-rose-700 transition-colors underline" : "text-primary text-xs hover:text-primary/80 transition-colors underline"}
                      >
                        Show Less
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 