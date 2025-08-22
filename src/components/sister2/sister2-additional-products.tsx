import React from 'react';
import { Check, Plus } from 'lucide-react';

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
  if (products.length === 0) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-['Montserrat'] text-xl font-bold text-white mb-2">
          Enhance Your Soulmate Experience
        </h3>
        <p className="text-sm text-white/80">
          Add these complementary services to get the most out of your soulmate sketch
        </p>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        {products.map((product) => {
          const isSelected = selectedProducts.includes(product.id);
          return (
            <div
              key={product.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-[rgb(224,82,177)] bg-[rgb(224,82,177)]/10'
                  : 'border-white/30 hover:border-[rgb(224,82,177)]/50'
              }`}
              onClick={() => onProductToggle(product.id)}
            >
              {/* Product Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-['Montserrat'] font-semibold text-white mb-1">
                    {product.title}
                  </h4>
                  <p className="text-sm text-white/80">
                    {product.description}
                  </p>
                </div>
                
                {/* Selection Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-3 ${
                  isSelected
                    ? 'border-[rgb(224,82,177)] bg-[rgb(224,82,177)] text-white'
                    : 'border-white/30'
                }`}>
                  {isSelected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-300" />
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-[rgb(224,82,177)] rounded-full"></div>
                    <span className="text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-['Montserrat'] text-lg font-bold text-[rgb(224,82,177)]">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-white/60 line-through">
                    ₹{product.originalPrice}
                  </span>
                </div>
                <span className="text-xs text-green-400 font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 