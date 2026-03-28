import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DateRangeFilter } from "@/components/DateRangeFilter";

interface PageProps {
  searchParams: { from?: string; to?: string };
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfWeek(date: Date): Date {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 7);
  return d;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  description?: string;
}

function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <Card>
      <p className="text-sm font-medium text-wisdom-muted">{label}</p>
      <p className="text-4xl font-heading font-bold text-wisdom-blue mt-2">{value}</p>
      {description && <p className="text-xs text-wisdom-muted mt-1">{description}</p>}
    </Card>
  );
}

export default async function AdminAnalyticsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const fromDate = searchParams.from ? new Date(searchParams.from) : null;
  const toDate = searchParams.to ? new Date(searchParams.to) : null;

  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);

  const dateFilter =
    fromDate || toDate
      ? {
          scheduledAt: {
            ...(fromDate ? { gte: fromDate } : {}),
            ...(toDate ? { lte: toDate } : {}),
          },
        }
      : {};

  const [
    activeChildren,
    completedSessions,
    scheduledThisWeek,
    totalActiveTherapists,
    therapistsWithScheduled,
  ] = await Promise.all([
    prisma.childProfile.count(
      fromDate || toDate
        ? { where: { createdAt: { ...(fromDate ? { gte: fromDate } : {}), ...(toDate ? { lte: toDate } : {}) } } }
        : undefined
    ),
    prisma.session.count({ where: { status: "COMPLETED", ...dateFilter } }),
    prisma.session.count({
      where: {
        status: "SCHEDULED",
        scheduledAt: fromDate || toDate
          ? { ...(fromDate ? { gte: fromDate } : {}), ...(toDate ? { lte: toDate } : {}) }
          : { gte: weekStart, lt: weekEnd },
      },
    }),
    prisma.user.count({ where: { role: "THERAPIST", active: true } }),
    prisma.session.findMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: fromDate || toDate
          ? { ...(fromDate ? { gte: fromDate } : {}), ...(toDate ? { lte: toDate } : {}) }
          : { gte: weekStart, lt: weekEnd },
      },
      select: { therapistId: true },
      distinct: ["therapistId"],
    }),
  ]);

  const therapistUtilization =
    totalActiveTherapists > 0
      ? Math.round((therapistsWithScheduled.length / totalActiveTherapists) * 100)
      : 0;

  // Build export URL with current filters
  const exportParams = new URLSearchParams({ export: "csv" });
  if (searchParams.from) exportParams.set("from", searchParams.from);
  if (searchParams.to) exportParams.set("to", searchParams.to);
  const exportUrl = `/api/admin/analytics?${exportParams.toString()}`;

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Analytics</h1>
            <p className="text-sm text-wisdom-muted mt-1">
              Platform-wide metrics and performance overview.
            </p>
          </div>
          <Link href={exportUrl}>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
          </Link>
        </div>

        <DateRangeFilter />

        {/* 2x2 metric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MetricCard
            label="Active Children"
            value={activeChildren}
            description="Total child profiles on the platform"
          />
          <MetricCard
            label="Sessions Completed"
            value={completedSessions}
            description="All-time completed sessions"
          />
          <MetricCard
            label="Sessions This Week"
            value={scheduledThisWeek}
            description="Scheduled sessions in the current week"
          />
          <MetricCard
            label="Therapist Utilization"
            value={`${therapistUtilization}%`}
            description="Therapists with at least one session this week"
          />
        </div>
      </div>
    </DashboardShell>
  );
}
