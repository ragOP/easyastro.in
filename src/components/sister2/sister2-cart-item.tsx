import React from 'react';
import { X, Heart } from 'lucide-react';

interface Sister2CartItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    features: string[];
  };
  onRemove: (id: string) => void;
  showRemoveButton?: boolean;
}

export default function Sister2CartItem({ item, onRemove, showRemoveButton = true }: Sister2CartItemProps) {
  return (
    <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-800/30 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="px-4 py-4">
        {/* Header with Remove Button */}
        <div className="flex items-start justify-end">
          {showRemoveButton && (
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-gray-300 hover:text-pink-400 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Column Stack */}
        <div className="space-y-4">
          {/* Row: Image + Title/Subtitle */}
          <div className="flex items-start gap-4">
            {/* Product Image */}
            <div className="w-24 pl-2 h-30 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
              <img
                src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Title and Subtitle */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-gray-200">
                {item.description}
              </p>
            </div>
          </div>
          
          {/* Points - Full Row */}
          <div className="space-y-2 mb-2 pb-4">
            {item.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Heart className="w-3 h-3 text-pink-400 flex-shrink-0" />
                <span className="text-xs text-gray-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-white/20">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-pink-300">
              ₹{item.price}
            </span>
            <span className="text-lg text-gray-300 line-through">
              ₹{item.originalPrice}
            </span>
            <span className="text-sm text-green-400 font-medium">
              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 