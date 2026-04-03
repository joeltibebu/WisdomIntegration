"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/ImageUploadField";

interface Props {
  page: string;
  defaultValues: {
    badge: string;
    badgeAm: string;
    title: string;
    titleAm: string;
    description: string;
    descriptionAm: string;
    backgroundImage?: string | null;
    ctaText?: string | null;
    ctaLink?: string | null;
  };
}

export function HeroForm({ page, defaultValues }: Props) {
  const router = useRouter();
  const [badge, setBadge] = useState(defaultValues.badge);
  const [badgeAm, setBadgeAm] = useState(defaultValues.badgeAm);
  const [title, setTitle] = useState(defaultValues.title);
  const [titleAm, setTitleAm] = useState(defaultValues.titleAm);
  const [description, setDescription] = useState(defaultValues.description);
  const [descriptionAm, setDescriptionAm] = useState(defaultValues.descriptionAm);
  const [backgroundImage, setBackgroundImage] = useState(defaultValues.backgroundImage ?? "");
  const [ctaText, setCtaText] = useState(defaultValues.ctaText ?? "");
  const [ctaLink, setCtaLink] = useState(defaultValues.ctaLink ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!badge.trim()) errs.badge = "Badge is required.";
    if (!badgeAm.trim()) errs.badgeAm = "Amharic badge is required.";
    if (!title.trim()) errs.title = "Title is required.";
    if (!titleAm.trim()) errs.titleAm = "Amharic title is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (!descriptionAm.trim()) errs.descriptionAm = "Amharic description is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setSuccess(false);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/admin/cms/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page,
          badge: badge.trim(), badgeAm: badgeAm.trim(),
          title: title.trim(), titleAm: titleAm.trim(),
          description: description.trim(), descriptionAm: descriptionAm.trim(),
          backgroundImage: backgroundImage.trim() || null,
          ctaText: ctaText.trim() || null,
          ctaLink: ctaLink.trim() || null,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) { setServerError(json.error?.message ?? "Something went wrong."); setLoading(false); return; }
      setSuccess(true);
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField id="badge" label="Badge (English)" required value={badge} onChange={(e) => setBadge((e.target as HTMLInputElement).value)} error={errors.badge} />
        <FormField id="badgeAm" label="Badge (Amharic)" required value={badgeAm} onChange={(e) => setBadgeAm((e.target as HTMLInputElement).value)} error={errors.badgeAm} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField id="title" label="Title (English)" required value={title} onChange={(e) => setTitle((e.target as HTMLInputElement).value)} error={errors.title} />
        <FormField id="titleAm" label="Title (Amharic)" required value={titleAm} onChange={(e) => setTitleAm((e.target as HTMLInputElement).value)} error={errors.titleAm} />
      </div>
      <FormField id="description" label="Description (English)" fieldType="textarea" required rows={3} value={description} onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)} error={errors.description} />
      <FormField id="descriptionAm" label="Description (Amharic)" fieldType="textarea" rows={3} value={descriptionAm} onChange={(e) => setDescriptionAm((e.target as HTMLTextAreaElement).value)} error={errors.descriptionAm} />
      <ImageUploadField id="backgroundImage" label="Background Image (optional)" value={backgroundImage} onChange={setBackgroundImage} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField id="ctaText" label="CTA Button Text (optional)" value={ctaText} onChange={(e) => setCtaText((e.target as HTMLInputElement).value)} placeholder="Donate Now" />
        <FormField id="ctaLink" label="CTA Button Link (optional)" value={ctaLink} onChange={(e) => setCtaLink((e.target as HTMLInputElement).value)} placeholder="/donate" />
      </div>

      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}
      {success && <p role="status" className="text-sm text-green-600">Saved successfully.</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={loading}>Save Changes</Button>
        <Button type="button" variant="ghost" disabled={loading} onClick={() => router.push("/dashboard/admin/cms/hero")}>Back</Button>
      </div>
    </form>
  );
}
