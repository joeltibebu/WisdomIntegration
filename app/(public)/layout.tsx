// SSR/SSG Note: This layout and all pages under app/(public)/* are Server Components
// (no 'use client' directive at the page level). Next.js App Router renders them on the
// server by default — static pages are statically generated (SSG) at build time, and
// pages with dynamic data use server-side rendering (SSR) per request.

import React from "react";
import { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Wisdom Integration | Ministry through Wisdom",
    template: "%s | Wisdom Integration",
  },
  description: "Wisdom Integration Ministry (Integration through Wisdom) — Providing guidance, spiritual care, and inclusive support for families and children with developmental limitations.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col bg-wisdom-bg">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
