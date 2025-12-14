import type { Metadata } from 'next';
import '../globals.css';
import './exp.css';
import { Toaster } from "@/components/ui/toaster"
import { Poppins, Playfair_Display } from 'next/font/google';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Easy Astro',
  description: "Discover your soulmate's face today with a personalized sketch from our gifted psychics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} !scroll-smooth`}>
      <head>
        {/* Google Tag Manager */}
  

        {/* Meta Pixel Code #1 */}


        {/* Meta Pixel Code #2 */}
      
      </head>

      <body className="font-poppins antialiased exp-page">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRP6CQRV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Meta Pixel (noscript) #1 */}
   

        {children}
        <Toaster />
      </body>
    </html>
  );
}
