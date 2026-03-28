import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Noto_Sans_Ethiopic } from "next/font/google";
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
      <body className="antialiased font-body bg-wisdom-bg text-wisdom-text">
        {children}
      </body>
    </html>
  );
}
