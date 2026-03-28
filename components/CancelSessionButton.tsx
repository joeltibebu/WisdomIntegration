"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface CancelSessionButtonProps {
  sessionId: string;
}

export function CancelSessionButton({ sessionId }: CancelSessionButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bookings/${sessionId}/cancel`, {
        method: "POST",
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json?.error?.message ?? "Could not cancel this session. Please try again.");
        setConfirming(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
      setConfirming(false);
    } finally {
      setIsLoading(false);
    }
  }

  if (error) {
    return (
      <div className="flex flex-col gap-1 items-end">
        <p role="alert" className="text-xs text-red-600 max-w-xs text-right">
          {error}
        </p>
        <button
          type="button"
          onClick={() => setError(null)}
          className="text-xs text-wisdom-muted underline"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-wisdom-text">Cancel this session?</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirming(false)}
          disabled={isLoading}
        >
          No, keep it
        </Button>
        <Button
          variant="primary"
          size="sm"
          isLoading={isLoading}
          onClick={handleCancel}
        >
          Yes, cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setConfirming(true)}
    >
      Cancel
    </Button>
  );
}
