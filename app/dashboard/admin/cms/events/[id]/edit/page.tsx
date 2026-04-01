export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { EventForm } from "@/components/cms/EventForm";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const item = await prisma.event.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-wisdom-text">Edit Event</h1>
        <EventForm
          id={item.id}
          defaultValues={{
            title: item.title,
            titleAm: item.titleAm,
            description: item.description,
            descriptionAm: item.descriptionAm,
            date: item.date.toISOString(),
            location: item.location,
            locationAm: item.locationAm,
            imageUrl: item.imageUrl,
            active: item.active,
          }}
        />
      </div>
    </DashboardShell>
  );
}
