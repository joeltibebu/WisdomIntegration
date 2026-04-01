"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface Props {
  id?: string;
  defaultValues?: {
    imageUrl: string;
    title?: string | null;
    titleAm?: string | null;
    description?: string | null;
    order: number;
    active: boolean;
  };
}

export function GalleryImageForm({ id, defaultValues }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl ?? "");
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [titleAm, setTitleAm] = useState(defaultValues?.titleAm ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [order, setOrder] = useState(String(defaultValues?.order ?? 0));
  const [active, setActive] = useState(defaultValues?.active ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!imageUrl.trim()) errs.imageUrl = "Image URL is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const url = id ? `/api/admin/cms/gallery/${id}` : "/api/admin/cms/gallery";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imageUrl.trim(),
          title: title.trim() || null,
          titleAm: titleAm.trim() || null,
          description: description.trim() || null,
          order: parseInt(order) || 0,
          active,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) { setServerError(json.error?.message ?? "Something went wrong."); setLoading(false); return; }
      router.push("/dashboard/admin/cms/gallery");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
      <FormField id="imageUrl" label="Image URL" required value={imageUrl} onChange={(e) => setImageUrl((e.target as HTMLInputElement).value)} error={errors.imageUrl} placeholder="/images/gallery/photo.jpg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField id="title" label="Caption (English)" value={title} onChange={(e) => setTitle((e.target as HTMLInputElement).value)} />
        <FormField id="titleAm" label="Caption (Amharic)" value={titleAm} onChange={(e) => setTitleAm((e.target as HTMLInputElement).value)} />
      </div>
      <FormField id="description" label="Description" fieldType="textarea" rows={2} value={description} onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)} />
      <FormField id="order" label="Display Order" type="number" value={order} onChange={(e) => setOrder((e.target as HTMLInputElement).value)} />

      <div className="flex items-center gap-3">
        <input id="active" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4 rounded border-wisdom-border text-wisdom-blue focus:ring-wisdom-blue" />
        <label htmlFor="active" className="text-sm font-medium text-wisdom-text">Active (visible on site)</label>
      </div>

      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={loading}>{id ? "Save Changes" : "Add Image"}</Button>
        <Button type="button" variant="ghost" disabled={loading} onClick={() => router.push("/dashboard/admin/cms/gallery")}>Cancel</Button>
      </div>
    </form>
  );
}
