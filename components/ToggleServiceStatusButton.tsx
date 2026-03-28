"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface ToggleServiceStatusButtonProps {
  serviceId: string;
  currentActive: boolean;
  serviceName: string;
}

export function ToggleServiceStatusButton({
  serviceId,
  currentActive,
  serviceName,
}: ToggleServiceStatusButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const action = currentActive ? "Deactivate" : "Activate";

  async function handleConfirm() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/services/${serviceId}`, { method: "PATCH" });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error?.message ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      setConfirming(false);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 flex-wrap">
        <span className="text-sm text-wisdom-text">
          {action} <strong>{serviceName}</strong>?
        </span>
        <Button size="sm" variant={currentActive ? "outline" : "secondary"} isLoading={loading} onClick={handleConfirm}>
          Confirm
        </Button>
        <Button size="sm" variant="ghost" disabled={loading} onClick={() => { setConfirming(false); setError(null); }}>
          Cancel
        </Button>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </span>
    );
  }

  return (
    <Button size="sm" variant={currentActive ? "outline" : "secondary"} onClick={() => setConfirming(true)}>
      {action}
    </Button>
  );
}
