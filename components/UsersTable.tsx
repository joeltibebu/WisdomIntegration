"use client";

import React from "react";
import Link from "next/link";
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
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  {
    key: "role",
    header: "Role",
    render: (row) => <Badge variant={roleBadgeVariant[row.role]}>{row.role}</Badge>,
  },
  {
    key: "active",
    header: "Status",
    render: (row) =>
      row.active ? <Badge variant="green">Active</Badge> : <Badge variant="gray">Inactive</Badge>,
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <span className="inline-flex items-center gap-3 flex-wrap">
        <ToggleUserStatusButton userId={row.id} currentActive={row.active} userName={row.name} />
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

export function UsersTable({ users }: { users: UserRow[] }) {
  return (
    <DataTable<UserRow>
      columns={columns}
      data={users}
      caption="All registered users"
      getRowKey={(row) => row.id}
      emptyMessage="No users found."
    />
  );
}
