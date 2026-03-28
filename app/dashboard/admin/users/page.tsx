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
import { ToggleUserStatusButton } from "@/components/ToggleUserStatusButton";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: "PARENT" | "THERAPIST" | "ADMIN";
  active: boolean;
};

const roleBadgeVariant: Record<UserRow["role"], "blue" | "green" | "orange"> = {
  PARENT: "green",
  THERAPIST: "blue",
  ADMIN: "orange",
};

const columns: Column<UserRow>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
  },
  {
    key: "email",
    header: "Email",
    sortable: true,
  },
  {
    key: "role",
    header: "Role",
    render: (row) => (
      <Badge variant={roleBadgeVariant[row.role]}>{row.role}</Badge>
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
        <ToggleUserStatusButton
          userId={row.id}
          currentActive={row.active}
          userName={row.name}
        />
        <Link
          href={`/dashboard/admin/users/assign?childFor=${row.id}`}
          className="text-sm font-medium text-wisdom-blue hover:underline focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
        >
          Assign Child
        </Link>
      </span>
    ),
  },
];

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">User Management</h1>
            <p className="text-sm text-wisdom-muted mt-1">
              Manage all platform users, roles, and account status.
            </p>
          </div>
          <Link href="/dashboard/admin/users/new">
            <Button variant="primary">+ Add User</Button>
          </Link>
        </div>

        {/* Table */}
        <DataTable<UserRow>
          columns={columns}
          data={users as UserRow[]}
          caption="All registered users"
          getRowKey={(row) => row.id}
          emptyMessage="No users found."
        />
      </div>
    </DashboardShell>
  );
}
