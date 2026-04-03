export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { UsersTable } from "@/components/UsersTable";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: "PARENT" | "THERAPIST" | "ADMIN";
  active: boolean;
};

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
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
        <UsersTable users={users as UserRow[]} />
      </div>
    </>
  );
}
