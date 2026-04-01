export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Button } from "@/components/ui/Button";

export default async function HeroAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const heroes = await prisma.heroSection.findMany({ orderBy: { page: "asc" } });

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Hero Sections</h1>
            <p className="text-sm text-wisdom-muted mt-1">Edit the hero banner for each page.</p>
          </div>
        </div>

        <div className="space-y-4">
          {heroes.map((hero) => (
            <div key={hero.id} className="bg-white border border-wisdom-border rounded-card p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-wisdom-muted mb-1">Page: {hero.page}</p>
                <h2 className="font-heading font-semibold text-wisdom-text">{hero.title}</h2>
                <p className="text-sm text-wisdom-muted mt-1 line-clamp-2">{hero.description}</p>
              </div>
              <Link href={`/dashboard/admin/cms/hero/${hero.page}/edit`}>
                <Button variant="outline" size="sm">Edit</Button>
              </Link>
            </div>
          ))}
          {heroes.length === 0 && (
            <p className="text-wisdom-muted text-sm">No hero sections found. Run the seed script to populate initial content.</p>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
