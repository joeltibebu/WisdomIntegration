export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DeleteButton } from "@/components/cms/DeleteButton";

export default async function EventsAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const items = await prisma.event.findMany({ orderBy: { date: "desc" } });

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Events</h1>
            <p className="text-sm text-wisdom-muted mt-1">Manage upcoming events and programs.</p>
          </div>
          <Link href="/dashboard/admin/cms/events/new">
            <Button variant="primary">+ New Event</Button>
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-wisdom-border rounded-card p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-wisdom-text text-sm">{item.title}</span>
                  <Badge variant={item.active ? "green" : "gray"}>{item.active ? "Active" : "Hidden"}</Badge>
                </div>
                <p className="text-xs text-wisdom-muted">
                  {new Date(item.date).toLocaleDateString("en-US", { dateStyle: "medium" })} — {item.location}
                </p>
                <p className="text-sm text-wisdom-muted mt-1 line-clamp-1">{item.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/dashboard/admin/cms/events/${item.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <DeleteButton
                  endpoint={`/api/admin/cms/events/${item.id}`}
                  confirmMessage={`Delete event "${item.title}"?`}
                />
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-wisdom-muted text-sm">No events yet.</p>}
        </div>
      </div>
    </DashboardShell>
  );
}
