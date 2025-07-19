import { HandHeart } from "lucide-react";

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-transparent z-10">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary">
          <HandHeart className="h-6 w-6" />
          <h1 className="text-2xl font-headline tracking-wider">
            Easy Astro
          </h1>
        </div>
      </div>
    </header>
  );
}
