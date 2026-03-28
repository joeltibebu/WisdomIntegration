export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { ToggleServiceStatusButton } from "@/components/ToggleServiceStatusButton";

type ServiceRow = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};

const columns: Column<ServiceRow>[] = [
  { key: "name", header: "Name", sortable: true },
  {
    key: "description",
    header: "Description",
    render: (row) => (
      <span className="text-wisdom-muted text-sm line-clamp-2 max-w-xs block">
        {row.description}
      </span>
    ),
  },
  {
    key: "active",
    header: "Status",
    render: (row) =>
      row.active ? (
        <Badge variant="green">Active</Badge>
      ) : (
        <Badge variant="gray">Inactive</Badge>
      ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <span className="inline-flex items-center gap-3 flex-wrap">
        <Link
          href={`/dashboard/admin/services/${row.id}/edit`}
          className="text-sm font-medium text-wisdom-blue hover:underline focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
        >
          Edit
        </Link>
        <ToggleServiceStatusButton
          serviceId={row.id}
          currentActive={row.active}
          serviceName={row.name}
        />
      </span>
    ),
  },
];

export default async function AdminServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
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

        <DataTable<ServiceRow>
          columns={columns}
          data={services as ServiceRow[]}
          caption="All services"
          getRowKey={(row) => row.id}
          emptyMessage="No services found."
        />
      </div>
    </DashboardShell>
  );
}
