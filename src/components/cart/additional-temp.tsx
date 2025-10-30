import React, { useState } from "react";

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

export default function AdditionalTemp({
  products,
  selectedProducts,
  onProductToggle,
}: AdditionalProductsProps) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleExpanded = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-3xl p-2 border border-primary/20">
        <div>
          {/* Title */}
          <div className="text-left mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary/80 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Enhance Your Love Journey
              </span>
            </div>
            <p className="text-xs text-muted-foreground ml-4 mt-0.5">
              Discover deeper cosmic guidance for your love life
            </p>
          </div>

          <div className="space-y-1">
            {products.map((product) => (
              <div key={product.id} className="space-y-1">
                <div className="flex items-start space-x-2 p-1 rounded-lg hover:bg-primary/5 transition-all duration-300">
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
                      className={`relative flex items-center justify-center w-4 h-4 rounded cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                        selectedProducts.includes(product.id)
                          ? "bg-gradient-to-r from-primary to-primary/80 border border-gray-300 shadow-lg shadow-primary/30"
                          : "bg-white border border-gray-300 hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      {selectedProducts.includes(product.id) && (
                        <svg
                          className="w-2.5 h-2.5 text-white animate-pulse"
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
                      {selectedProducts.includes(product.id) && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/50 rounded-lg blur-sm animate-pulse"></div>
                      )}
                    </label>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <label
                          htmlFor={`product-${product.id}`}
                          className="text-foreground font-medium text-xs cursor-pointer"
                        >
                          {product.title}
                        </label>
                        <div className="mt-0.5">
                          {expandedProduct === product.id ? (
                            <p className="text-muted-foreground text-xs">
                              {product.description}
                            </p>
                          ) : (
                            <>
                              <p className="text-muted-foreground text-xs line-clamp-2">
                                {product.description}
                              </p>
                              <button
                                onClick={() => toggleExpanded(product.id)}
                                className="text-primary text-xs hover:text-primary/80 transition-colors underline mt-0.5"
                              >
                                Show More
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="text-foreground font-bold text-xs">
                          ₹{product.price.toLocaleString()}
                        </div>
                        <div className="text-muted-foreground text-xs line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Features in Grid */}
                {expandedProduct === product.id && (
                  <>
                    <div className="pl-4 mt-1 p-1.5 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="grid grid-cols-2 gap-1.5">
                        {product.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-1.5"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                            </div>
                            <span
                              className="text-foreground/80"
                              style={{ fontSize: "9px", lineHeight: "1" }}
                            >
                              {feature}
                            </span>
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
