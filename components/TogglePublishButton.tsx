"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface TogglePublishButtonProps {
  postId: string;
  currentPublished: boolean;
  postTitle: string;
}

export function TogglePublishButton({ postId, currentPublished, postTitle }: TogglePublishButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const action = currentPublished ? "Unpublish" : "Publish";

  async function handleToggle() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/content/${postId}`, { method: "PATCH" });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error?.message ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <span className="inline-flex flex-col gap-1">
      <Button
        size="sm"
        variant={currentPublished ? "outline" : "secondary"}
        isLoading={loading}
        onClick={handleToggle}
        aria-label={`${action} "${postTitle}"`}
      >
        {action}
      </Button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </span>
  );
}
