import React, { useState } from 'react';

interface Sister2Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface Sister2AdditionalProductsProps {
  products: Sister2Product[];
  selectedProducts: string[];
  onProductToggle: (productId: string) => void;
}

export default function Sister2AdditionalProducts({
  products,
  selectedProducts,
  onProductToggle
}: Sister2AdditionalProductsProps) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleExpanded = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden">
      <div className="px-4 py-4">
        {/* Title */}
        <div className="text-left mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-[rgb(224,82,177)] to-[rgb(224,82,177)]/80 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-white">
              Enhance Your Love Journey
            </span>
          </div>
          <p className="text-sm text-white/80 ml-4">Discover deeper cosmic guidance for your love life</p>
        </div>

        <div className="space-y-2">
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
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
                        ? 'bg-gradient-to-r from-[rgb(224,82,177)] to-[rgb(224,82,177)]/80 border-[rgb(224,82,177)] shadow-xl shadow-[rgb(224,82,177)]/40'
                        : 'bg-white/10 border-white/30 hover:border-[rgb(224,82,177)] hover:bg-[rgb(224,82,177)]/10'
                    }`}
                  >
                    {selectedProducts.includes(product.id) && (
                      <svg 
                        className="w-4 h-4 text-white animate-pulse" 
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
                    {/* Glow effect when checked */}
                    {selectedProducts.includes(product.id) && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(224,82,177)]/50 to-[rgb(224,82,177)]/50 rounded-lg blur-sm animate-pulse"></div>
                    )}
                  </label>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <label htmlFor={`product-${product.id}`} className="text-white font-medium text-base cursor-pointer">
                        {product.title}
                      </label>
                      <div className="mt-1">
                        {expandedProduct === product.id ? (
                          <p className="text-white/80 text-sm">{product.description}</p>
                        ) : (
                          <>
                            <p className="text-white/80 text-sm line-clamp-2">{product.description}</p>
                            <button
                              onClick={() => toggleExpanded(product.id)}
                              className="text-[rgb(224,82,177)] text-xs hover:text-[rgb(224,82,177)]/80 transition-colors underline mt-1"
                            >
                              Show More
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-white font-bold text-base">₹{product.price.toLocaleString()}</div>
                      <div className="text-white/60 text-sm line-through">₹{product.originalPrice.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content - Only Key Points */}
              {expandedProduct === product.id && (
                <>
                  <div className="pl-4 mt-2 p-3 bg-white/5 rounded-lg border border-white/20">
                    <div className="space-y-1">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-[rgb(224,82,177)] rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <span className="text-white/70 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pl-2">
                    <button
                      onClick={() => toggleExpanded(product.id)}
                      className="text-[rgb(224,82,177)] text-xs hover:text-[rgb(224,82,177)]/80 transition-colors underline"
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
  );
} 