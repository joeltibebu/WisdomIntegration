"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Service {
  id: string;
  name: string;
}

interface Child {
  id: string;
  name: string;
}

interface BookingFormProps {
  services: Service[];
  children: Child[];
}

const TIME_SLOTS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
];

export function BookingForm({ services, children }: BookingFormProps) {
  const router = useRouter();
  const [childId, setChildId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Basic client-side validation
    const errors: Record<string, string> = {};
    if (!childId) errors.childId = "Please select a child.";
    if (!serviceId) errors.serviceId = "Please select a service.";
    if (!date) errors.date = "Please select a date.";
    if (!time) errors.time = "Please select a time.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const scheduledAt = new Date(`${date}T${time}:00`).toISOString();

    setIsLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, serviceId, scheduledAt, notes }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setError("This time slot is no longer available. Please choose a different date or time.");
        } else if (json?.error?.fields) {
          const fe: Record<string, string> = {};
          for (const f of json.error.fields) fe[f.field] = f.message;
          setFieldErrors(fe);
        } else {
          setError(json?.error?.message ?? "Something went wrong. Please try again.");
        }
        return;
      }

      router.push("/dashboard/parent/appointments");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (children.length === 0) {
    return (
      <Card>
        <p className="text-wisdom-muted text-sm">
          You need to add a child profile before booking a session.{" "}
          <a href="/dashboard/parent/children/new" className="text-wisdom-blue underline">
            Add a child
          </a>
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {error && (
          <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <FormField
          id="childId"
          label="Child"
          fieldType="select"
          required
          error={fieldErrors.childId}
          value={childId}
          onChange={(e) => setChildId((e.target as HTMLSelectElement).value)}
        >
          <option value="">Select a child…</option>
          {children.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </FormField>

        <FormField
          id="serviceId"
          label="Service"
          fieldType="select"
          required
          error={fieldErrors.serviceId}
          value={serviceId}
          onChange={(e) => setServiceId((e.target as HTMLSelectElement).value)}
        >
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </FormField>

        <FormField
          id="date"
          label="Date"
          type="date"
          required
          error={fieldErrors.date}
          value={date}
          onChange={(e) => setDate((e.target as HTMLInputElement).value)}
        />

        <FormField
          id="time"
          label="Time"
          fieldType="select"
          required
          error={fieldErrors.time}
          value={time}
          onChange={(e) => setTime((e.target as HTMLSelectElement).value)}
        >
          <option value="">Select a time…</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </FormField>

        <FormField
          id="notes"
          label="Notes (optional)"
          fieldType="textarea"
          placeholder="Any additional information for the therapist…"
          value={notes}
          onChange={(e) => setNotes((e.target as HTMLTextAreaElement).value)}
          rows={3}
        />

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Book Session
        </Button>
      </form>
    </Card>
  );
}
