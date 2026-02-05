"use client"; // 👈 add this at the top if in app/ directory

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CtaButtonProps {
  isCartPage?: boolean;
  title?: string;
  className?: string;
}

export default function CtaButton({
  isCartPage = false,
  title,
  className
}: CtaButtonProps) {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRedirect = () => {
    scrollToTop();
    router.push("/exp-cart");
  };

  return (
    <div className="text-center">
      {isCartPage ? (
        <Button
          size="lg"
          className={`font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-shine bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 text-white border-2 border-yellow-300 animate-glow ${className}`}
        >
          Reveal My Soulmate Now!
        </Button>
      ) : (
        <a>
          <Button
            onClick={handleRedirect}
            size="lg"
            className={`font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-shine bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-400 text-white border-2 border-yellow-300 animate-glow ${className}`}
          >
            {title || "Get My Bundle Now – Only ₹199"}
          </Button>
        </a>
      )}
    </div>
  );
}
