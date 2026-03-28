"use client";

import React, { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";

interface Child {
  id: string;
  name: string;
}

interface ProgressReportUploadFormProps {
  profiles: Child[];
}

export function ProgressReportUploadForm({ profiles }: ProgressReportUploadFormProps) {
  const [childId, setChildId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const errors: Record<string, string> = {};
    if (!childId) errors.childId = "Please select a child.";
    if (!file) errors.file = "Please select a file to upload.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("childId", childId);
      formData.append("file", file!);

      // Simulate progress since fetch doesn't expose upload progress natively
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === undefined || prev >= 90) return prev;
          return prev + 10;
        });
      }, 150);

      const res = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const json = await res.json();

      if (!res.ok || json.error) {
        if (json.error?.fields) {
          const fe: Record<string, string> = {};
          for (const f of json.error.fields) fe[f.field] = f.message;
          setFieldErrors(fe);
        } else {
          setError(json.error?.message ?? "Upload failed. Please try again.");
        }
        setUploadProgress(undefined);
        return;
      }

      setSuccess(true);
      setChildId("");
      setFile(null);
      setUploadProgress(undefined);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setUploadProgress(undefined);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 font-medium">
          Report uploaded successfully.
        </div>
      )}

      <FormField
        id="report-childId"
        label="Child"
        fieldType="select"
        required
        error={fieldErrors.childId}
        value={childId}
        onChange={(e) => {
          setChildId((e.target as HTMLSelectElement).value);
          if (fieldErrors.childId) setFieldErrors((prev) => ({ ...prev, childId: "" }));
        }}
        disabled={isLoading}
      >
        <option value="">Select a child…</option>
        {profiles.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </FormField>

      <div>
        <FileUpload
          id="report-file"
          label="Progress Report"
          accept=".pdf,.doc,.docx"
          maxSizeBytes={10 * 1024 * 1024}
          onFileSelect={(f) => {
            setFile(f);
            if (fieldErrors.file) setFieldErrors((prev) => ({ ...prev, file: "" }));
          }}
          uploadProgress={uploadProgress}
          error={fieldErrors.file}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
        Upload Report
      </Button>
    </form>
  );
}
