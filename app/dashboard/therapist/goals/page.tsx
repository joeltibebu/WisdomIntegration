export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";
import { GoalList } from "@/components/GoalList";

interface GoalsPageProps {
  searchParams: { childId?: string };
}

export default async function GoalsPage({ searchParams }: GoalsPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "THERAPIST") redirect("/auth/login");

  const { childId } = searchParams;

  // If no childId, show child selector
  if (!childId) {
    const children = await prisma.childProfile.findMany({
      where: { therapistId: session.user.id },
      orderBy: { name: "asc" },
    });

    return (
      <DashboardShell role="THERAPIST" userName={session.user.name}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Goals</h1>
            <p className="text-sm text-wisdom-muted mt-1">Select a child to manage their goals.</p>
          </div>

          {children.length === 0 ? (
            <Card>
              <p className="text-sm text-wisdom-muted text-center py-8">
                No children assigned to you yet.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child: (typeof children)[number]) => (
                <Link
                  key={child.id}
                  href={`/dashboard/therapist/goals?childId=${child.id}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded-card"
                >
                  <Card className="hover:border-wisdom-blue transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <p className="font-semibold text-wisdom-text">{child.name}</p>
                      <p className="text-sm text-wisdom-blue">Manage goals →</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DashboardShell>
    );
  }

  // Fetch child and their goals
  const child = await prisma.childProfile.findFirst({
    where: { id: childId, therapistId: session.user.id },
  });

  if (!child) redirect("/dashboard/therapist/goals");

  const goals = await prisma.goal.findMany({
    where: { childId },
    orderBy: { createdAt: "asc" },
  });

  return (
    <DashboardShell role="THERAPIST" userName={session.user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="mb-1">
            <Link
              href="/dashboard/therapist/goals"
              className="text-sm text-wisdom-muted hover:text-wisdom-blue focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
            >
              ← All Children
            </Link>
          </div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">
            Goals — {child.name}
          </h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Create and track therapeutic goals for {child.name}.
          </p>
        </div>

        <GoalList
          childId={childId}
          goals={goals.map((g: (typeof goals)[number]) => ({
            id: g.id,
            description: g.description,
            completed: g.completed,
            completedAt: g.completedAt,
            createdAt: g.createdAt,
          }))}
        />
      </div>
    </DashboardShell>
  );
}

