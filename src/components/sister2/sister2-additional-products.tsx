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
    <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-800/30 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          Enhance Your Soulmate Experience
        </h3>
        <p className="text-sm text-gray-200">
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
                  ? 'border-pink-500 bg-pink-500/10'
                  : 'border-white/30 hover:border-pink-500/50'
              }`}
              onClick={() => onProductToggle(product.id)}
            >
              {/* Product Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">
                    {product.title}
                  </h4>
                  <p className="text-sm text-gray-200">
                    {product.description}
                  </p>
                </div>
                
                {/* Selection Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-3 ${
                  isSelected
                    ? 'border-pink-500 bg-pink-500 text-white'
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
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-pink-300">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-300 line-through">
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