interface CartHeaderProps {
  animateElements?: boolean;
}

export default function CartHeader({ animateElements = true }: CartHeaderProps) {
  return (
    <div
      className={`text-center mb-4 sm:mb-6 px-4 mt-2 transition-all duration-1000 transform ${
        animateElements
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      {/* Badge Overlay - Similar to exp page */}
      <div className="inline-flex items-center px-3 sm:px-4 py-1 purnima-badge text-white text-xs sm:text-sm font-bold rounded-full shadow-lg mb-4">
        🔥 Complete Your Love Journey
      </div>
      
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-playfair-bold mb-1 sm:mb-2">
        <span className="bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
        💜 Your Love Cart
        </span>
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-black/80 max-w-2xl mx-auto px-2 font-poppins-regular">
        ✨ Review your selected mystical services and prepare for your romantic journey
      </p>
    </div>
  );
} 