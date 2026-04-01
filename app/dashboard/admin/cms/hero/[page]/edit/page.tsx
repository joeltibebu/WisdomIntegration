export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { HeroForm } from "@/components/cms/HeroForm";

export default async function EditHeroPage({ params }: { params: { page: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const hero = await prisma.heroSection.findUnique({ where: { page: params.page } });
  if (!hero) notFound();

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text capitalize">Edit Hero — {params.page}</h1>
          <p className="text-sm text-wisdom-muted mt-1">Changes are reflected immediately on the public site.</p>
        </div>
        <HeroForm
          page={params.page}
          defaultValues={{
            badge: hero.badge,
            badgeAm: hero.badgeAm,
            title: hero.title,
            titleAm: hero.titleAm,
            description: hero.description,
            descriptionAm: hero.descriptionAm,
            backgroundImage: hero.backgroundImage,
            ctaText: hero.ctaText,
            ctaLink: hero.ctaLink,
          }}
        />
      </div>
    </DashboardShell>
  );
}
