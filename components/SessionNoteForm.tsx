"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface SessionOption {
  id: string;
  scheduledAt: Date | string;
  serviceType: string;
}

interface SessionNoteFormProps {
  childId: string;
  sessions: SessionOption[];
}

function formatSessionLabel(s: SessionOption): string {
  const date = new Date(s.scheduledAt).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = new Date(s.scheduledAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${s.serviceType} — ${date} at ${time}`;
}

export function SessionNoteForm({ childId, sessions }: SessionNoteFormProps) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState("");
  const [content, setContent] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const errors: Record<string, string> = {};
    if (!sessionId) errors.sessionId = "Please select a session.";
    if (!content.trim()) errors.content = "Note content is required.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setIsLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, content: content.trim() }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        if (json.error?.fields) {
          const fe: Record<string, string> = {};
          for (const f of json.error.fields) fe[f.field] = f.message;
          setFieldErrors(fe);
        } else {
          setError(json.error?.message ?? "Failed to save note. Please try again.");
        }
        return;
      }

      setSuccess(true);
      setSessionId("");
      setContent("");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (sessions.length === 0) {
    return (
      <p className="text-sm text-wisdom-muted">
        No sessions without notes found for this child.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          Note saved successfully.
        </div>
      )}

      <FormField
        id={`session-select-${childId}`}
        label="Session"
        fieldType="select"
        required
        error={fieldErrors.sessionId}
        value={sessionId}
        onChange={(e) => {
          setSessionId((e.target as HTMLSelectElement).value);
          if (fieldErrors.sessionId) setFieldErrors((prev) => ({ ...prev, sessionId: "" }));
        }}
        disabled={isLoading}
      >
        <option value="">Select a session…</option>
        {sessions.map((s) => (
          <option key={s.id} value={s.id}>
            {formatSessionLabel(s)}
          </option>
        ))}
      </FormField>

      <FormField
        id={`note-content-${childId}`}
        label="Note Content"
        fieldType="textarea"
        rows={5}
        required
        placeholder="Enter session observations and progress notes…"
        value={content}
        onChange={(e) => {
          setContent((e.target as HTMLTextAreaElement).value);
          if (fieldErrors.content) setFieldErrors((prev) => ({ ...prev, content: "" }));
        }}
        error={fieldErrors.content}
        disabled={isLoading}
      />

      <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
        Save Note
      </Button>
    </form>
  );
}
