import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { AssignTherapistForm } from "@/components/AssignTherapistForm";

export default async function AssignTherapistPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const [childProfiles, therapists] = await Promise.all([
    prisma.childProfile.findMany({
      select: {
        id: true,
        name: true,
        therapist: { select: { name: true } },
      },
      orderBy: { name: "asc" },
    }),
    prisma.user.findMany({
      where: { role: "THERAPIST", active: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const children = childProfiles.map((c: typeof childProfiles[number]) => ({
    id: c.id,
    name: c.name,
    therapistName: c.therapist?.name ?? null,
  }));

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Assign Therapist</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Link a child profile to a therapist.
          </p>
        </div>
        <AssignTherapistForm children={children} therapists={therapists} />
      </div>
    </DashboardShell>
  );
}
