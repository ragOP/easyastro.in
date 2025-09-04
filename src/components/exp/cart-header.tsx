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
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2">
        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-pulse">
          Your Love Cart
        </span>
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto px-2">
        Review your selected love services and prepare for your romantic journey
      </p>
    </div>
  );
} 