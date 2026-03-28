"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface ChildProfileData {
  id?: string;
  name: string;
  dateOfBirth: string; // ISO date string YYYY-MM-DD
  diagnosisNotes?: string | null;
  emergencyContact: string;
  medicalNotes?: string | null;
}

interface FieldError {
  field: string;
  message: string;
}

interface ChildProfileFormProps {
  initialData?: ChildProfileData;
}

export function ChildProfileForm({ initialData }: ChildProfileFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);

  const [name, setName] = useState(initialData?.name ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(initialData?.dateOfBirth ?? "");
  const [diagnosisNotes, setDiagnosisNotes] = useState(initialData?.diagnosisNotes ?? "");
  const [emergencyContact, setEmergencyContact] = useState(initialData?.emergencyContact ?? "");
  const [medicalNotes, setMedicalNotes] = useState(initialData?.medicalNotes ?? "");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError(null);
    setIsSubmitting(true);

    const payload = {
      name,
      dateOfBirth,
      diagnosisNotes: diagnosisNotes || undefined,
      emergencyContact,
      medicalNotes: medicalNotes || undefined,
    };

    const url = isEdit ? `/api/children/${initialData!.id}` : "/api/children";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json?.error?.fields) {
          const errors: Record<string, string> = {};
          (json.error.fields as FieldError[]).forEach(({ field, message }) => {
            errors[field] = message;
          });
          setFieldErrors(errors);
        } else {
          setGlobalError(json?.error?.message ?? "Something went wrong. Please try again.");
        }
        return;
      }

      router.push("/dashboard/parent/children");
    } catch {
      setGlobalError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-xl">
      {globalError && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {globalError}
        </div>
      )}

      <FormField
        id="name"
        label="Child's Name"
        required
        value={name}
        onChange={(e) => setName((e.target as HTMLInputElement).value)}
        error={fieldErrors.name}
        placeholder="e.g. Alex Johnson"
      />

      <FormField
        id="dateOfBirth"
        label="Date of Birth"
        type="date"
        required
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth((e.target as HTMLInputElement).value)}
        error={fieldErrors.dateOfBirth}
      />

      <FormField
        id="diagnosisNotes"
        label="Diagnosis / Area of Concern"
        fieldType="textarea"
        rows={3}
        value={diagnosisNotes}
        onChange={(e) => setDiagnosisNotes((e.target as HTMLTextAreaElement).value)}
        error={fieldErrors.diagnosisNotes}
        placeholder="Optional — describe any diagnosis or area of concern"
      />

      <FormField
        id="emergencyContact"
        label="Emergency Contact"
        required
        value={emergencyContact}
        onChange={(e) => setEmergencyContact((e.target as HTMLInputElement).value)}
        error={fieldErrors.emergencyContact}
        placeholder="e.g. Jane Doe — 555-0100"
      />

      <FormField
        id="medicalNotes"
        label="Medical Notes"
        fieldType="textarea"
        rows={3}
        value={medicalNotes}
        onChange={(e) => setMedicalNotes((e.target as HTMLTextAreaElement).value)}
        error={fieldErrors.medicalNotes}
        placeholder="Optional — allergies, medications, or other relevant medical information"
      />

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Save Profile
        </Button>
        <Link
          href="/dashboard/parent/children"
          className="text-sm font-medium text-wisdom-muted hover:text-wisdom-text transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
