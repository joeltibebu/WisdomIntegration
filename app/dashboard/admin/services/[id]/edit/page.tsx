import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { ServiceForm } from "@/components/ServiceForm";

interface PageProps {
  params: { id: string };
}

export default async function EditServicePage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) notFound();

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Edit Service</h1>
          <p className="text-sm text-wisdom-muted mt-1">Update the service details.</p>
        </div>
        <ServiceForm
          serviceId={service.id}
          defaultValues={{ name: service.name, description: service.description }}
        />
      </div>
    </DashboardShell>
  );
}
