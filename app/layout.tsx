import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Noto_Sans_Ethiopic } from "next/font/google";
import Image from "next/image";
import "./globals.css";

// Poppins — used for headings (font-heading in Tailwind config)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Inter — used for body text (font-body in Tailwind config)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Noto Sans Ethiopic for smooth Amharic rendering
const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-amharic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wisdom Integration — Empowering Every Child's Journey",
  description:
    "Wisdom Integration provides speech therapy, occupational therapy, behavioral support, and special education services for children with special needs.",
};

// Viewport is exported separately per Next.js 14 best practice
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${notoSansEthiopic.variable}`}>
      <body className="antialiased font-body text-wisdom-text relative min-h-screen bg-transparent">
        
        {/* Global Fixed Background Image */}
        <div className="fixed inset-0 z-[-50] overflow-hidden pointer-events-none bg-slate-100 dark:bg-slate-950">
          <Image
            src="/images/bg.jpeg"
            alt="Site Background"
            fill
            className="object-cover opacity-[0.4] dark:opacity-[0.25]"
            priority
          />
          {/* Subtle gradient overlay to pull the image and content together */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 dark:from-black/20 dark:to-black/20"></div>
        </div>

        {/* Next.js View Router Output */}
        <div className="relative z-0">
          {children}
        </div>
        
      </body>
    </html>
  );
}
