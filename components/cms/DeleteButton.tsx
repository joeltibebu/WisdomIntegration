"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Props {
  endpoint: string; // e.g. /api/admin/cms/testimonials/abc123
  label?: string;
  confirmMessage?: string;
}

export function DeleteButton({ endpoint, label = "Delete", confirmMessage = "Are you sure you want to delete this item?" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(confirmMessage)) return;
    setLoading(true);
    try {
      await fetch(endpoint, { method: "DELETE" });
      router.refresh();
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      isLoading={loading}
      onClick={handleDelete}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      {label}
    </Button>
  );
}
