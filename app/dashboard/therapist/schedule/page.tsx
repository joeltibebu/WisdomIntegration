// This page is a server component that re-fetches on every request, so the
// schedule is always up to date without any additional real-time logic needed.
// Next.js server components do not cache by default in dynamic routes, ensuring
// newly booked or cancelled sessions appear immediately on the next page load.

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type SessionStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";
type BadgeVariant = "blue" | "green" | "gray" | "orange" | "yellow";

type SessionWithChild = {
  id: string;
  serviceType: string;
  scheduledAt: Date;
  status: SessionStatus;
  updatedAt: Date;
  child: { id: string; name: string };
};

function statusBadge(status: SessionStatus): { label: string; variant: BadgeVariant } {
  switch (status) {
    case "SCHEDULED":
      return { label: "Scheduled", variant: "blue" };
    case "COMPLETED":
      return { label: "Completed", variant: "green" };
    case "CANCELLED":
      return { label: "Cancelled", variant: "gray" };
    default:
      return { label: status, variant: "gray" };
  }
}

function formatDateTime(date: Date): string {
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${dateStr} at ${timeStr}`;
}

function SessionRow({ s }: { s: SessionWithChild }) {
  const { label, variant } = statusBadge(s.status);

  // Show a cancellation notice for sessions cancelled within the last 24 hours.
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const recentlyCancelled =
    s.status === "CANCELLED" && s.updatedAt >= twentyFourHoursAgo;

  return (
    <Card>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-0.5">
            <p className="font-semibold text-wisdom-text">{s.child.name}</p>
            <p className="text-sm text-wisdom-muted">{s.serviceType}</p>
            <p className="text-sm text-wisdom-text">{formatDateTime(s.scheduledAt)}</p>
          </div>
          <Badge variant={variant}>{label}</Badge>
        </div>

        {recentlyCancelled && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mt-0.5 shrink-0 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <span>
              This session was recently cancelled. Please follow up with the family if needed.
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "THERAPIST") redirect("/auth/login");

  const now = new Date();

  const sessions: SessionWithChild[] = await prisma.session.findMany({
    where: { therapistId: session.user.id },
    include: { child: true },
    orderBy: { scheduledAt: "asc" },
  });

  const upcoming = sessions.filter(
    (s) => s.status === "SCHEDULED" && s.scheduledAt >= now
  );
  const past = sessions.filter(
    (s) => s.status !== "SCHEDULED" || s.scheduledAt < now
  );

  return (
    <DashboardShell role="THERAPIST" userName={session.user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Schedule</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Your upcoming and past therapy sessions.
          </p>
        </div>

        {/* Upcoming sessions */}
        <section aria-labelledby="upcoming-heading">
          <h2
            id="upcoming-heading"
            className="text-lg font-heading font-semibold text-wisdom-text mb-3"
          >
            Upcoming
          </h2>
          {upcoming.length === 0 ? (
            <Card>
              <p className="text-sm text-wisdom-muted text-center py-6">
                No upcoming sessions scheduled.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {upcoming.map((s) => (
                <SessionRow key={s.id} s={s} />
              ))}
            </div>
          )}
        </section>

        {/* Past sessions */}
        <section aria-labelledby="past-heading">
          <h2
            id="past-heading"
            className="text-lg font-heading font-semibold text-wisdom-text mb-3"
          >
            Past
          </h2>
          {past.length === 0 ? (
            <Card>
              <p className="text-sm text-wisdom-muted text-center py-6">No past sessions.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {past.map((s) => (
                <SessionRow key={s.id} s={s} />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
