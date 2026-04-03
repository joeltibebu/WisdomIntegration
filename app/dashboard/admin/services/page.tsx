export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { ServicesTable } from "@/components/ServicesTable";

type ServiceRow = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Services</h1>
            <p className="text-sm text-wisdom-muted mt-1">
              Manage the service offerings available for booking.
            </p>
          </div>
          <Link href="/dashboard/admin/services/new">
            <Button variant="primary">+ Add Service</Button>
          </Link>
        </div>

        <ServicesTable services={services as ServiceRow[]} />
      </div>
    </>
  );
}
