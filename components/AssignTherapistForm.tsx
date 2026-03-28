"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface Child {
  id: string;
  name: string;
  therapistName: string | null;
}

interface Therapist {
  id: string;
  name: string;
}

interface AssignTherapistFormProps {
  children: Child[];
  therapists: Therapist[];
}

export function AssignTherapistForm({ children, therapists }: AssignTherapistFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ childId: "", therapistId: "" });
  const [errors, setErrors] = useState<{ childId?: string; therapistId?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!form.childId) e.childId = "Please select a child.";
    if (!form.therapistId) e.therapistId = "Please select a therapist.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/admin/users/assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok || json.error) {
        if (json.error?.fields) {
          const mapped: typeof errors = {};
          for (const f of json.error.fields as { field: string; message: string }[]) {
            (mapped as Record<string, string>)[f.field] = f.message;
          }
          setErrors(mapped);
        } else {
          setErrors({ general: json.error?.message ?? "Something went wrong." });
        }
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      router.refresh();
    } catch {
      setErrors({ general: "Network error. Please try again." });
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-4">
        <div
          role="status"
          className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700"
        >
          Therapist assignment updated successfully.
        </div>
        <Button
          variant="outline"
          onClick={() => { setSuccess(false); setForm({ childId: "", therapistId: "" }); }}
        >
          Assign Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-lg">
      {errors.general && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errors.general}
        </div>
      )}

      <FormField
        id="childId"
        label="Child"
        fieldType="select"
        required
        value={form.childId}
        onChange={(e) => setForm((f) => ({ ...f, childId: (e.target as HTMLSelectElement).value }))}
        error={errors.childId}
      >
        <option value="">Select a child…</option>
        {children.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}{c.therapistName ? ` (currently: ${c.therapistName})` : ""}
          </option>
        ))}
      </FormField>

      <FormField
        id="therapistId"
        label="Therapist"
        fieldType="select"
        required
        value={form.therapistId}
        onChange={(e) => setForm((f) => ({ ...f, therapistId: (e.target as HTMLSelectElement).value }))}
        error={errors.therapistId}
      >
        <option value="">Select a therapist…</option>
        {therapists.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </FormField>

      <Button type="submit" variant="primary" isLoading={loading}>
        Assign Therapist
      </Button>
    </form>
  );
}
