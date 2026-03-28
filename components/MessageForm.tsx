"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export function MessageForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!content.trim()) {
      setError("Message content is required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error?.message ?? "Failed to send message. Please try again.");
        return;
      }

      setSuccess(true);
      setContent("");
      router.refresh();
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField
        id="message-content"
        label="New Message"
        fieldType="textarea"
        rows={4}
        required
        placeholder="Type your message to the center…"
        value={content}
        onChange={(e) => {
          setContent((e.target as HTMLTextAreaElement).value);
          if (error) setError(null);
          if (success) setSuccess(false);
        }}
        error={error ?? undefined}
        disabled={isLoading}
      />

      {success && (
        <p role="status" className="text-sm text-green-600 font-medium">
          Message sent successfully.
        </p>
      )}

      <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
        Send Message
      </Button>
    </form>
  );
}
