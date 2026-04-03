export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { AssignTherapistForm } from "@/components/AssignTherapistForm";

export default async function AssignTherapistPage() {
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
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Assign Therapist</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            Link a child profile to a therapist.
          </p>
        </div>
        <AssignTherapistForm profiles={children} therapists={therapists} />
      </div>
    </>
  );
}
