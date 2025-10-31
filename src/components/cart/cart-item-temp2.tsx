import React, { useState, useEffect, Suspense } from "react";
import { X, Heart } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    features: string[];
    image?: string;
  };
  onRemove: (id: string) => void;
  showRemoveButton?: boolean;
}

function CartItemInner({
  item,
  onRemove,
  showRemoveButton = true,
}: CartItemProps) {
  const searchParams = useSearchParams();
  const [displayPrice, setDisplayPrice] = useState(item.price);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    if (searchParams.has("rag30")) {
      const discountedPrice = Math.round(item.price * 0.7);
      setDisplayPrice(discountedPrice);
      setDiscountPercentage(30);
    } else if (searchParams.has("rag60")) {
      const discountedPrice = Math.round(item.price * 0.4);
      setDisplayPrice(discountedPrice);
      setDiscountPercentage(60);
    } else if (searchParams.has("rag75")) {
      const discountedPrice = Math.round(item.price * 0.25);
      setDisplayPrice(discountedPrice);
      setDiscountPercentage(75);
    } else {
      setDisplayPrice(item.price);
      setDiscountPercentage(0);
    }
  }, [item.price, searchParams]);

  return (
    <>
      <style>{`
        @keyframes borderTravel {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }

        .shimmer-border {
          position: relative;
          border-radius: 16px;
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
          padding: 1.5px;
        }

        .shimmer-border-inner {
          background: white;
          border-radius: 15px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }
      `}</style>

      <div className="shimmer-border">
        <div className="shimmer-border-inner">
          {/* Product Image Container */}
          <div className="relative w-full h-40">
            <img
              src={
                item.image ||
                "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png"
              }
              alt={item.name}
              className="product-image"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x250?text=Product";
              }}
            />
            {showRemoveButton && (
              <button
                onClick={() => onRemove(item.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-white text-red-500 hover:text-red-600 transition-all shadow-md"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Content Section */}
          <div className="p-3 bg-white space-y-1.5">
            {/* Title */}
            <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
              {item.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-600 line-clamp-2">
              {item.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-1">
              {item.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <Heart className="w-3 h-3 text-purple-500 flex-shrink-0" />
                  <span className="text-xs text-gray-700 truncate">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Section */}
            <div className="border-t border-purple-200/40 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ₹{displayPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                </div>
                {discountPercentage > 0 ? (
                  <span className="text-xs font-bold text-blue-600">
                    {discountPercentage}%
                  </span>
                ) : (
                  <span className="text-xs font-bold text-blue-600">
                    {Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                        100
                    )}
                    %
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CartItemTemp2(props: CartItemProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartItemInner {...props} />
    </Suspense>
  );
}
