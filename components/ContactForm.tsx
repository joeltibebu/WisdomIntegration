"use client";

import React, { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const emptyForm: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    // Client-side validation
    const newErrors: FieldErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.error?.fields) {
          setErrors(json.error.fields);
        } else {
          setServerError(json.error?.message ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setSubmitted(true);
      setForm(emptyForm);
    } catch {
      setServerError("Unable to send your message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-card bg-green-50 border border-green-200 p-8 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-wisdom-green mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="font-heading font-bold text-2xl text-wisdom-text mb-2">
          Message Sent!
        </h2>
        <p className="text-wisdom-muted">
          Thank you for reaching out. We&apos;ll be in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-5">
      {serverError && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <FormField
        id="name"
        label="Name"
        required
        placeholder="Your full name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="name"
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        required
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      <FormField
        id="phone"
        label="Phone"
        type="tel"
        placeholder="(optional)"
        value={form.phone}
        onChange={handleChange}
        autoComplete="tel"
      />

      <FormField
        id="subject"
        label="Subject"
        required
        placeholder="How can we help?"
        value={form.subject}
        onChange={handleChange}
        error={errors.subject}
      />

      <FormField
        id="message"
        label="Message"
        fieldType="textarea"
        required
        rows={5}
        placeholder="Tell us more about your child's needs or your question..."
        value={form.message}
        onChange={handleChange}
        error={errors.message}
      />

      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
