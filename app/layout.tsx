import type { Metadata, Viewport } from "next";
import {
  Poppins, Inter, Lora, Open_Sans, Montserrat, Source_Sans_3,
  Noto_Sans_Ethiopic,
} from "next/font/google";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import "./globals.css";

// ── Pre-approved heading fonts ──────────────────────────────
const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--font-poppins", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--font-montserrat", display: "swap" });
const lora = Lora({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-lora", display: "swap" });

// ── Pre-approved body fonts ──────────────────────────────────
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap" });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans-3", display: "swap" });

// ── Amharic ──────────────────────────────────────────────────
const notoSansEthiopic = Noto_Sans_Ethiopic({ subsets: ["ethiopic"], weight: ["400","500","600","700"], variable: "--font-amharic", display: "swap" });

// Font name → CSS variable map
const FONT_VAR: Record<string, string> = {
  Poppins: "var(--font-poppins)",
  Montserrat: "var(--font-montserrat)",
  Lora: "var(--font-lora)",
  Inter: "var(--font-inter)",
  "Open Sans": "var(--font-open-sans)",
  "Source Sans 3": "var(--font-source-sans-3)",
};

const SCALE_MAP: Record<string, string> = {
  sm: "0.9",
  md: "1",
  lg: "1.1",
  xl: "1.2",
};

const LINE_HEIGHT_MAP: Record<string, string> = {
  tight: "1.3",
  normal: "1.6",
  relaxed: "1.8",
};

export const metadata: Metadata = {
  title: "Wisdom Integration — Empowering Every Child's Journey",
  description: "Wisdom Integration provides speech therapy, occupational therapy, behavioral support, and special education services for children with special needs.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read typography settings from DB (graceful fallback)
  let typo = {
    headingFont: "Poppins",
    bodyFont: "Inter",
    fontScale: "md",
    headingWeight: "700",
    lineHeight: "normal",
  };
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: "typography" } });
    if (setting?.value && typeof setting.value === "object") {
      typo = { ...typo, ...(setting.value as Record<string, string>) };
    }
  } catch { /* DB unavailable — use defaults */ }

  const headingVar = FONT_VAR[typo.headingFont] ?? FONT_VAR["Poppins"];
  const bodyVar = FONT_VAR[typo.bodyFont] ?? FONT_VAR["Inter"];
  const scale = SCALE_MAP[typo.fontScale] ?? "1";
  const lineHeight = LINE_HEIGHT_MAP[typo.lineHeight] ?? "1.6";

  const fontVars = [
    poppins.variable, montserrat.variable, lora.variable,
    inter.variable, openSans.variable, sourceSans3.variable,
    notoSansEthiopic.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontVars}>
      <head>
        <style>{`
          :root {
            --font-heading: ${headingVar};
            --font-body: ${bodyVar};
            --font-scale: ${scale};
            --heading-weight: ${typo.headingWeight};
            --line-height-body: ${lineHeight};
          }
          .font-heading { font-family: var(--font-heading) !important; }
          .font-body    { font-family: var(--font-body) !important; }
          body          { line-height: var(--line-height-body); font-size: calc(1rem * var(--font-scale)); }
          h1,h2,h3,h4,h5,h6 { font-weight: var(--heading-weight); }
        `}</style>
      </head>
      <body className="antialiased font-body text-wisdom-text relative min-h-screen bg-transparent">
        <div className="fixed inset-0 z-[-50] overflow-hidden pointer-events-none bg-slate-100 dark:bg-slate-950">
          <Image src="/images/bg.jpeg" alt="Site Background" fill className="object-cover opacity-[0.4] dark:opacity-[0.25]" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 dark:from-black/20 dark:to-black/20" />
        </div>
        <div className="relative z-0">{children}</div>
      </body>
    </html>
  );
}
