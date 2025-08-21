import Image from "next/image";

export default function Sister2Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/95 via-pink-900/95 to-purple-800/95 z-10">
      <div className="container mx-auto flex items-center justify-center">
        <Image
          src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020%202025.png"
          alt="Easy Astro Logo"
          width={200}
          height={50}
          className="w-36 h-auto sm:w-52"
          priority
        />
      </div>
    </header>
  );
} 