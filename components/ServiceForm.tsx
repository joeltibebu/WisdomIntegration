"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface ServiceFormProps {
  serviceId?: string;
  defaultValues?: { name: string; description: string };
}

export function ServiceForm({ serviceId, defaultValues }: ServiceFormProps) {
  const router = useRouter();
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!description.trim()) errs.description = "Description is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const url = serviceId ? `/api/admin/services/${serviceId}` : "/api/admin/services";
    const method = serviceId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setServerError(json.error?.message ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/dashboard/admin/services");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-lg">
      <FormField
        id="name"
        label="Name"
        required
        value={name}
        onChange={(e) => setName((e.target as HTMLInputElement).value)}
        error={errors.name}
        placeholder="e.g. Speech Therapy"
      />
      <FormField
        id="description"
        label="Description"
        fieldType="textarea"
        required
        rows={4}
        value={description}
        onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
        error={errors.description}
        placeholder="Describe this service..."
      />

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={loading}>
          {serviceId ? "Save Changes" : "Create Service"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={loading}
          onClick={() => router.push("/dashboard/admin/services")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
