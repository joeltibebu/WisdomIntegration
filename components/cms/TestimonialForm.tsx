"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface Props {
  id?: string;
  defaultValues?: {
    name: string;
    role?: string | null;
    content: string;
    contentAm?: string | null;
    imageUrl?: string | null;
    order: number;
    active: boolean;
  };
}

export function TestimonialForm({ id, defaultValues }: Props) {
  const router = useRouter();
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [role, setRole] = useState(defaultValues?.role ?? "");
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [contentAm, setContentAm] = useState(defaultValues?.contentAm ?? "");
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl ?? "");
  const [order, setOrder] = useState(String(defaultValues?.order ?? 0));
  const [active, setActive] = useState(defaultValues?.active ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!content.trim()) errs.content = "Content is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const url = id ? `/api/admin/cms/testimonials/${id}` : "/api/admin/cms/testimonials";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim() || null,
          content: content.trim(),
          contentAm: contentAm.trim() || null,
          imageUrl: imageUrl.trim() || null,
          order: parseInt(order) || 0,
          active,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) { setServerError(json.error?.message ?? "Something went wrong."); setLoading(false); return; }
      router.push("/dashboard/admin/cms/testimonials");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
      <FormField id="name" label="Name" required value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} error={errors.name} placeholder="e.g. Sarah & Daniel M." />
      <FormField id="role" label="Role / Relationship" value={role} onChange={(e) => setRole((e.target as HTMLInputElement).value)} placeholder="e.g. Parents of a child with Autism" />
      <FormField id="content" label="Quote (English)" fieldType="textarea" required rows={4} value={content} onChange={(e) => setContent((e.target as HTMLTextAreaElement).value)} error={errors.content} placeholder="Their testimonial..." />
      <FormField id="contentAm" label="Quote (Amharic)" fieldType="textarea" rows={4} value={contentAm} onChange={(e) => setContentAm((e.target as HTMLTextAreaElement).value)} placeholder="የምስክርነት ቃላቸው..." />
      <FormField id="imageUrl" label="Photo URL" value={imageUrl} onChange={(e) => setImageUrl((e.target as HTMLInputElement).value)} placeholder="/images/person.jpg" />
      <FormField id="order" label="Display Order" type="number" value={order} onChange={(e) => setOrder((e.target as HTMLInputElement).value)} />

      <div className="flex items-center gap-3">
        <input id="active" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4 rounded border-wisdom-border text-wisdom-blue focus:ring-wisdom-blue" />
        <label htmlFor="active" className="text-sm font-medium text-wisdom-text">Active (visible on site)</label>
      </div>

      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={loading}>{id ? "Save Changes" : "Add Testimonial"}</Button>
        <Button type="button" variant="ghost" disabled={loading} onClick={() => router.push("/dashboard/admin/cms/testimonials")}>Cancel</Button>
      </div>
    </form>
  );
}
