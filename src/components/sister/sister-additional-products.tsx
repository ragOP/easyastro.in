import React from 'react';
import { Check, Plus } from 'lucide-react';

interface SisterProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
}

interface SisterAdditionalProductsProps {
  products: SisterProduct[];
  selectedProducts: string[];
  onProductToggle: (productId: string) => void;
}

export default function SisterAdditionalProducts({
  products,
  selectedProducts,
  onProductToggle
}: SisterAdditionalProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Enhance Your Soulmate Experience
        </h3>
        <p className="text-sm text-muted-foreground">
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
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onProductToggle(product.id)}
            >
              {/* Product Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    {product.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </div>
                
                {/* Selection Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-3 ${
                  isSelected
                    ? 'border-primary bg-primary text-white'
                    : 'border-border'
                }`}>
                  {isSelected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                </div>
                <span className="text-xs text-green-600 font-medium">
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