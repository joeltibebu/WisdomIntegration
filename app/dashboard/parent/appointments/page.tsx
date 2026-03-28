export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CancelSessionButton } from "@/components/CancelSessionButton";

type BadgeVariant = "blue" | "green" | "gray" | "orange" | "yellow";

type SessionWithChild = {
  id: string;
  childId: string;
  therapistId: string;
  serviceType: string;
  scheduledAt: Date;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
  child: { id: string; name: string };
};

function statusBadge(status: "SCHEDULED" | "COMPLETED" | "CANCELLED"): { label: string; variant: BadgeVariant } {
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

function SessionCard({ s, showCancel }: { s: SessionWithChild; showCancel: boolean }) {
  const { label, variant } = statusBadge(s.status);
  const dateStr = s.scheduledAt.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = s.scheduledAt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Card>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <p className="font-semibold text-wisdom-text">{s.child.name}</p>
          <p className="text-sm text-wisdom-muted">{s.serviceType}</p>
          <p className="text-sm text-wisdom-text">
            {dateStr} at {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant={variant}>{label}</Badge>
          {showCancel && <CancelSessionButton sessionId={s.id} />}
        </div>
      </div>
    </Card>
  );
}

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "PARENT") redirect("/auth/login");

  const now = new Date();

  const sessions: SessionWithChild[] = await prisma.session.findMany({
    where: {
      child: { parentId: session.user.id },
    },
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
    <DashboardShell role="PARENT" userName={session.user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Appointments</h1>
            <p className="text-sm text-wisdom-muted mt-1">
              View and manage your upcoming and past therapy sessions.
            </p>
          </div>
          <Link href="/dashboard/parent/appointments/book">
            <Button variant="primary">+ Book a Session</Button>
          </Link>
        </div>

        {/* Upcoming */}
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
                No upcoming appointments.{" "}
                <Link
                  href="/dashboard/parent/appointments/book"
                  className="text-wisdom-blue underline"
                >
                  Book one now
                </Link>
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {upcoming.map((s) => (
                <SessionCard key={s.id} s={s} showCancel />
              ))}
            </div>
          )}
        </section>

        {/* Past */}
        <section aria-labelledby="past-heading">
          <h2
            id="past-heading"
            className="text-lg font-heading font-semibold text-wisdom-text mb-3"
          >
            Past
          </h2>
          {past.length === 0 ? (
            <Card>
              <p className="text-sm text-wisdom-muted text-center py-6">No past appointments.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {past.map((s) => (
                <SessionCard key={s.id} s={s} showCancel={false} />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}

