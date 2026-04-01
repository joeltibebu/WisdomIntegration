import React from "react";
import { prisma } from "@/lib/prisma";
import { HomeContentEditor } from "@/components/admin/HomeContentEditor";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  // Fetch the homepage hero data and features for management.
  const [hero, features] = await Promise.all([
    prisma.heroSection.findUnique({
      where: { page: "home" },
    }),
    prisma.homepageFeature.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">
          Homepage Management
        </h2>
        <p className="text-slate-500 max-w-2xl">
          Edit the hero section and manage the feature sections that appear on the homepage.
        </p>
      </section>

      {/* Hero & Features Editor */}
      <HomeContentEditor initialHero={hero} initialFeatures={features} />
    </div>
  );
}
