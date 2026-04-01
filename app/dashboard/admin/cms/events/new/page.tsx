export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { EventForm } from "@/components/cms/EventForm";

export default async function NewEventPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-wisdom-text">New Event</h1>
        <EventForm />
      </div>
    </DashboardShell>
  );
}
