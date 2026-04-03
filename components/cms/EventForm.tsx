"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

interface Props {
  id?: string;
  defaultValues?: {
    title: string;
    titleAm: string;
    description: string;
    descriptionAm: string;
    date: string; // ISO string
    location: string;
    locationAm: string;
    imageUrl?: string | null;
    active: boolean;
  };
}

export function EventForm({ id, defaultValues }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [titleAm, setTitleAm] = useState(defaultValues?.titleAm ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [descriptionAm, setDescriptionAm] = useState(defaultValues?.descriptionAm ?? "");
  const [date, setDate] = useState(defaultValues?.date ? defaultValues.date.slice(0, 16) : "");
  const [location, setLocation] = useState(defaultValues?.location ?? "");
  const [locationAm, setLocationAm] = useState(defaultValues?.locationAm ?? "");
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl ?? "");
  const [active, setActive] = useState(defaultValues?.active ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!titleAm.trim()) errs.titleAm = "Amharic title is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (!descriptionAm.trim()) errs.descriptionAm = "Amharic description is required.";
    if (!date) errs.date = "Date is required.";
    if (!location.trim()) errs.location = "Location is required.";
    if (!locationAm.trim()) errs.locationAm = "Amharic location is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const url = id ? `/api/admin/cms/events/${id}` : "/api/admin/cms/events";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(), titleAm: titleAm.trim(),
          description: description.trim(), descriptionAm: descriptionAm.trim(),
          date, location: location.trim(), locationAm: locationAm.trim(),
          imageUrl: imageUrl.trim() || null, active,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) { setServerError(json.error?.message ?? "Something went wrong."); setLoading(false); return; }
      router.push("/dashboard/admin/cms/events");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField id="title" label="Title (English)" required value={title} onChange={(e) => setTitle((e.target as HTMLInputElement).value)} error={errors.title} />
        <FormField id="titleAm" label="Title (Amharic)" required value={titleAm} onChange={(e) => setTitleAm((e.target as HTMLInputElement).value)} error={errors.titleAm} />
      </div>
      <RichTextEditor id="description" label="Description (English)" required value={description} onChange={setDescription} error={errors.description} minHeight="120px" />
      <FormField id="descriptionAm" label="Description (Amharic)" fieldType="textarea" rows={3} value={descriptionAm} onChange={(e) => setDescriptionAm((e.target as HTMLTextAreaElement).value)} error={errors.descriptionAm} />
      <FormField id="date" label="Date & Time" type="datetime-local" required value={date} onChange={(e) => setDate((e.target as HTMLInputElement).value)} error={errors.date} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField id="location" label="Location (English)" required value={location} onChange={(e) => setLocation((e.target as HTMLInputElement).value)} error={errors.location} />
        <FormField id="locationAm" label="Location (Amharic)" required value={locationAm} onChange={(e) => setLocationAm((e.target as HTMLInputElement).value)} error={errors.locationAm} />
      </div>
      <ImageUploadField id="imageUrl" label="Image (optional)" value={imageUrl} onChange={setImageUrl} />

      <div className="flex items-center gap-3">
        <input id="active" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4 rounded border-wisdom-border text-wisdom-blue focus:ring-wisdom-blue" />
        <label htmlFor="active" className="text-sm font-medium text-wisdom-text">Active (visible on site)</label>
      </div>

      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={loading}>{id ? "Save Changes" : "Create Event"}</Button>
        <Button type="button" variant="ghost" disabled={loading} onClick={() => router.push("/dashboard/admin/cms/events")}>Cancel</Button>
      </div>
    </form>
  );
}
