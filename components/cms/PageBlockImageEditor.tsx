"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

interface Props {
  id: string;
  label: string;
  currentImageUrl: string;
  /** defaults to /api/admin/cms/pageblocks */
  endpoint?: string;
  method?: "PUT" | "PATCH";
  /** field name to send, defaults to "imageUrl" */
  fieldName?: string;
  /** any extra fields to include in the request body */
  extraFields?: Record<string, unknown>;
}

export function PageBlockImageEditor({
  id,
  label,
  currentImageUrl,
  endpoint = "/api/admin/cms/pageblocks",
  method = "PUT",
  fieldName = "imageUrl",
  extraFields = {},
}: Props) {
  const [url, setUrl] = useState(currentImageUrl);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, [fieldName]: url.trim() || null, ...extraFields }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error?.message ?? "Failed to save.");
      } else {
        setSaved(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-wisdom-border rounded-card p-5 space-y-4">
      <p className="text-sm font-semibold text-wisdom-text">{label}</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Preview */}
        <div className="shrink-0 w-32 h-20 rounded-xl overflow-hidden bg-slate-100 border border-wisdom-border flex items-center justify-center">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-wisdom-muted text-center px-2">No image</span>
          )}
        </div>

        {/* Input + save */}
        <div className="flex-1 space-y-3">
          <FormField
            id={`img-${id}`}
            label="Image URL"
            value={url}
            onChange={(e) => { setUrl((e.target as HTMLInputElement).value); setSaved(false); }}
            placeholder="/images/photo.jpg or https://..."
          />
          <div className="flex items-center gap-3">
            <Button type="button" variant="primary" size="sm" isLoading={loading} onClick={handleSave}>
              Save Image
            </Button>
            {saved && <span className="text-sm text-green-600">Saved</span>}
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
