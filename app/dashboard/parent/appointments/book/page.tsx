export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { BookingForm } from "@/components/BookingForm";

export default async function BookAppointmentPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "PARENT") redirect("/auth/login");

  const [services, children] = await Promise.all([
    prisma.service.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    prisma.childProfile.findMany({
      where: { parentId: session.user.id },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <DashboardShell role="PARENT" userName={session.user.name}>
      <div className="max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Book a Session</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Select a child, service, and time to schedule a therapy session.
          </p>
        </div>
        <BookingForm services={services} profiles={children} />
      </div>
    </DashboardShell>
  );
}

