"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface FieldErrors {
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  general?: string;
}

export function CreateUserForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", role: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "A valid email address is required.";
    }
    if (!form.role) e.role = "Role is required.";
    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }
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
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok || json.error) {
        if (json.error?.fields) {
          const mapped: FieldErrors = {};
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

      router.push("/dashboard/admin/users");
      router.refresh();
    } catch {
      setErrors({ general: "Network error. Please try again." });
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-lg">
      {errors.general && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errors.general}
        </div>
      )}

      <FormField
        id="name"
        label="Full Name"
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: (e.target as HTMLInputElement).value }))}
        error={errors.name}
        placeholder="Jane Smith"
        autoComplete="name"
      />

      <FormField
        id="email"
        label="Email Address"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: (e.target as HTMLInputElement).value }))}
        error={errors.email}
        placeholder="jane@example.com"
        autoComplete="email"
      />

      <FormField
        id="role"
        label="Role"
        fieldType="select"
        required
        value={form.role}
        onChange={(e) => setForm((f) => ({ ...f, role: (e.target as HTMLSelectElement).value }))}
        error={errors.role}
      >
        <option value="">Select a role…</option>
        <option value="PARENT">Parent</option>
        <option value="THERAPIST">Therapist</option>
        <option value="ADMIN">Admin</option>
      </FormField>

      <FormField
        id="password"
        label="Temporary Password"
        type="password"
        required
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: (e.target as HTMLInputElement).value }))}
        error={errors.password}
        placeholder="Min. 8 characters"
        autoComplete="new-password"
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="primary" isLoading={loading}>
          Create Account
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={loading}
          onClick={() => router.push("/dashboard/admin/users")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
