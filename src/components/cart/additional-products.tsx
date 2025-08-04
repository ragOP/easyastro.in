import React, { useState } from 'react';

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
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleExpanded = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-3xl p-4 border border-primary/20">
        <div>
          {/* Title */}
          <div className="text-left mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary/80 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Enhance Your Love Journey
              </span>
            </div>
            <p className="text-sm text-muted-foreground ml-4">Discover deeper cosmic guidance for your love life</p>
          </div>

          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="space-y-2">
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-all duration-300">
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
                          ? 'bg-gradient-to-r from-primary to-primary/80 border-primary shadow-xl shadow-primary/40'
                          : 'bg-white border-primary/30 hover:border-primary hover:bg-primary/5'
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
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/50 rounded-lg blur-sm animate-pulse"></div>
                      )}
                    </label>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <label htmlFor={`product-${product.id}`} className="text-foreground font-medium text-base cursor-pointer">
                          {product.title}
                        </label>
                        <div className="mt-1">
                          {expandedProduct === product.id ? (
                            <p className="text-muted-foreground text-sm">{product.description}</p>
                          ) : (
                            <>
                              <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                              <button
                                onClick={() => toggleExpanded(product.id)}
                                className="text-primary text-xs hover:text-primary/80 transition-colors underline mt-1"
                              >
                                Show More
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="text-foreground font-bold text-base">₹{product.price.toLocaleString()}</div>
                        <div className="text-muted-foreground text-sm line-through">₹{product.originalPrice.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Only Key Points */}
                {expandedProduct === product.id && (
                  <>
                    <div className="pl-4 mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="space-y-1">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                            <span className="text-foreground/80 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pl-2">
                      <button
                        onClick={() => toggleExpanded(product.id)}
                        className="text-primary text-xs hover:text-primary/80 transition-colors underline"
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