"use client";

import React, { useState } from "react";
import { FileUpload } from "@/components/ui/FileUpload";

interface ImageUploadFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function ImageUploadField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  placeholder = "/images/photo.jpg or https://...",
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | undefined>(undefined);

  async function handleFileSelect(file: File) {
    setUploadError(null);
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress since fetch doesn't expose upload progress
      const ticker = setInterval(() => {
        setProgress((p) => (p !== undefined && p < 85 ? p + 15 : p));
      }, 200);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      clearInterval(ticker);
      setProgress(100);

      const json = await res.json();
      if (!res.ok || json.error) {
        setUploadError(json.error?.message ?? "Upload failed.");
        setProgress(undefined);
        return;
      }

      onChange(json.data.url);
      setTimeout(() => setProgress(undefined), 600);
    } catch {
      setUploadError("Network error. Please try again.");
      setProgress(undefined);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <FileUpload
        id={`${id}-upload`}
        label={`${label}${required ? " *" : ""} — upload a file`}
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        maxSizeBytes={5 * 1024 * 1024}
        onFileSelect={handleFileSelect}
        uploadProgress={progress}
        error={uploadError ?? undefined}
        disabled={uploading}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-xs font-medium text-wisdom-muted uppercase tracking-wide">
          Or paste a URL
        </label>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-wisdom-border bg-wisdom-bg px-3 py-2 text-sm text-wisdom-text placeholder:text-wisdom-muted focus:outline-none focus:ring-2 focus:ring-wisdom-blue focus:border-transparent"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Preview"
          className="w-full max-h-48 object-cover rounded-xl border border-wisdom-border"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
    </div>
  );
}
