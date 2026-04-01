import React from "react";
import { prisma } from "@/lib/prisma";
import { AboutContentEditor } from "@/components/admin/AboutContentEditor";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  // Fetch all about page content
  const [hero, blocks] = await Promise.all([
    prisma.heroSection.findUnique({ where: { page: "about" } }),
    prisma.pageBlock.findMany({ 
      where: { page: "about" },
      orderBy: { order: "asc" }
    })
  ]);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">
          About Page Management
        </h2>
        <p className="text-slate-500 max-w-2xl">
          Integrate the narrative of Wisdom Integration by managing the founders&apos; story, Kaleb&apos;s testimony, and the core purpose of the ministry.
        </p>
      </section>

      {/* Hero & Blocks Editor */}
      <AboutContentEditor initialHero={hero} initialBlocks={blocks} />
    </div>
  );
}
