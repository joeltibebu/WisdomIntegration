export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { BookingsFilter } from "@/components/BookingsFilter";

type BookingRow = {
  id: string;
  childName: string;
  therapistName: string;
  serviceType: string;
  scheduledAt: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
};

const statusBadge: Record<BookingRow["status"], React.ReactNode> = {
  SCHEDULED: <Badge variant="blue">Scheduled</Badge>,
  COMPLETED: <Badge variant="green">Completed</Badge>,
  CANCELLED: <Badge variant="gray">Cancelled</Badge>,
};

const columns: Column<BookingRow>[] = [
  { key: "childName", header: "Child", sortable: true },
  { key: "therapistName", header: "Therapist", sortable: true },
  { key: "serviceType", header: "Service", sortable: true },
  { key: "scheduledAt", header: "Date / Time", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => statusBadge[row.status],
  },
];

interface PageProps {
  searchParams: { therapistId?: string; serviceType?: string; date?: string };
}

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const { therapistId, serviceType, date } = searchParams;

  // Build where clause
  const where: Record<string, unknown> = {};
  if (therapistId) where.therapistId = therapistId;
  if (serviceType) where.serviceType = serviceType;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    where.scheduledAt = { gte: start, lt: end };
  }

  const [sessions, therapists] = await Promise.all([
    prisma.session.findMany({
      where,
      include: {
        child: { select: { name: true } },
        therapist: { select: { name: true } },
      },
      orderBy: { scheduledAt: "desc" },
    }),
    prisma.user.findMany({
      where: { role: "THERAPIST", active: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  // Distinct service types from all sessions for filter dropdown
  const allServiceTypes = await prisma.session.findMany({
    select: { serviceType: true },
    distinct: ["serviceType"],
    orderBy: { serviceType: "asc" },
  });
  const serviceTypes = allServiceTypes.map((s: { serviceType: string }) => s.serviceType);

  interface SessionWithDetails {
    id: string;
    child: { name: string };
    therapist: { name: string };
    serviceType: string;
    scheduledAt: Date;
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  }

  const rows: BookingRow[] = (sessions as unknown as SessionWithDetails[]).map((s) => ({
    id: s.id,
    childName: s.child.name,
    therapistName: s.therapist.name,
    serviceType: s.serviceType,
    scheduledAt: new Date(s.scheduledAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    status: s.status,
  }));

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Bookings</h1>
          <p className="text-sm text-wisdom-muted mt-1">
            All sessions across all therapists.
          </p>
        </div>

        <BookingsFilter therapists={therapists} serviceTypes={serviceTypes} />

        <DataTable<BookingRow>
          columns={columns}
          data={rows}
          caption="All sessions"
          getRowKey={(row) => row.id}
          emptyMessage="No sessions found."
        />
      </div>
    </>
  );
}
