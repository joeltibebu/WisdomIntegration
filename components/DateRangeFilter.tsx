"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function DateRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");

  function applyFilter() {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    router.push(`/dashboard/admin/analytics?${params.toString()}`);
  }

  function clearFilter() {
    setFrom("");
    setTo("");
    router.push("/dashboard/admin/analytics");
  }

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 bg-wisdom-surface rounded-card border border-wisdom-border">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="range-from" className="text-sm font-medium text-wisdom-text">
          From
        </label>
        <input
          id="range-from"
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-lg border border-wisdom-border bg-white px-3 py-2 text-sm text-wisdom-text focus:outline-none focus:ring-2 focus:ring-wisdom-blue min-h-[44px]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="range-to" className="text-sm font-medium text-wisdom-text">
          To
        </label>
        <input
          id="range-to"
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="rounded-lg border border-wisdom-border bg-white px-3 py-2 text-sm text-wisdom-text focus:outline-none focus:ring-2 focus:ring-wisdom-blue min-h-[44px]"
        />
      </div>

      <div className="flex items-end gap-2">
        <Button variant="primary" size="sm" onClick={applyFilter}>
          Apply
        </Button>
        <Button variant="ghost" size="sm" onClick={clearFilter}>
          Clear
        </Button>
      </div>
    </div>
  );
}
