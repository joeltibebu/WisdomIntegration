"use client";

import React from "react";
import Link from "next/link";
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
      <span className="text-wisdom-muted text-sm line-clamp-2 max-w-xs block">{row.description}</span>
    ),
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
        <Link
          href={`/dashboard/admin/services/${row.id}/edit`}
          className="text-sm font-medium text-wisdom-blue hover:underline focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
        >
          Edit
        </Link>
        <ToggleServiceStatusButton serviceId={row.id} currentActive={row.active} serviceName={row.name} />
      </span>
    ),
  },
];

export function ServicesTable({ services }: { services: ServiceRow[] }) {
  return (
    <DataTable<ServiceRow>
      columns={columns}
      data={services}
      caption="All services"
      getRowKey={(row) => row.id}
      emptyMessage="No services found."
    />
  );
}
