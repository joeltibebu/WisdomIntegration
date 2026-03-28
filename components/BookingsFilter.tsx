"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface BookingsFilterProps {
  therapists: { id: string; name: string }[];
  serviceTypes: string[];
}

export function BookingsFilter({ therapists, serviceTypes }: BookingsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [therapistId, setTherapistId] = useState(searchParams.get("therapistId") ?? "");
  const [serviceType, setServiceType] = useState(searchParams.get("serviceType") ?? "");
  const [date, setDate] = useState(searchParams.get("date") ?? "");

  function applyFilters() {
    const params = new URLSearchParams();
    if (therapistId) params.set("therapistId", therapistId);
    if (serviceType) params.set("serviceType", serviceType);
    if (date) params.set("date", date);
    router.push(`/dashboard/admin/bookings?${params.toString()}`);
  }

  function clearFilters() {
    setTherapistId("");
    setServiceType("");
    setDate("");
    router.push("/dashboard/admin/bookings");
  }

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 bg-wisdom-surface rounded-card border border-wisdom-border">
      <div className="flex flex-col gap-1.5 min-w-[180px]">
        <label htmlFor="filter-therapist" className="text-sm font-medium text-wisdom-text">
          Therapist
        </label>
        <select
          id="filter-therapist"
          value={therapistId}
          onChange={(e) => setTherapistId(e.target.value)}
          className="rounded-lg border border-wisdom-border bg-white px-3 py-2 text-sm text-wisdom-text focus:outline-none focus:ring-2 focus:ring-wisdom-blue min-h-[44px]"
        >
          <option value="">All Therapists</option>
          {therapists.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[180px]">
        <label htmlFor="filter-service" className="text-sm font-medium text-wisdom-text">
          Service Type
        </label>
        <select
          id="filter-service"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="rounded-lg border border-wisdom-border bg-white px-3 py-2 text-sm text-wisdom-text focus:outline-none focus:ring-2 focus:ring-wisdom-blue min-h-[44px]"
        >
          <option value="">All Services</option>
          {serviceTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[160px]">
        <label htmlFor="filter-date" className="text-sm font-medium text-wisdom-text">
          Date
        </label>
        <input
          id="filter-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-wisdom-border bg-white px-3 py-2 text-sm text-wisdom-text focus:outline-none focus:ring-2 focus:ring-wisdom-blue min-h-[44px]"
        />
      </div>

      <div className="flex items-end gap-2">
        <Button variant="primary" size="sm" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear
        </Button>
      </div>
    </div>
  );
}
