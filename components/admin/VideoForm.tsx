"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface VideoFormProps {
  videoId?: string;
  defaultValues?: {
    title: string;
    slug: string;
    description: string;
    thumbnail_url?: string | null;
    video_url: string;
    category: string;
    is_featured: boolean;
    is_published: boolean;
  };
  onSuccess?: () => void;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type FieldErrors = {
  title?: string;
  slug?: string;
  description?: string;
  thumbnail_url?: string;
  video_url?: string;
  category?: string;
};

export function VideoForm({ videoId, defaultValues, onSuccess }: VideoFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(defaultValues?.thumbnail_url ?? "");
  const [videoUrl, setVideoUrl] = useState(defaultValues?.video_url ?? "");
  const [category, setCategory] = useState(defaultValues?.category ?? "");
  const [isFeatured, setIsFeatured] = useState(defaultValues?.is_featured ?? false);
  const [isPublished, setIsPublished] = useState(defaultValues?.is_published ?? false);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!videoId);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    if (!slugManuallyEdited) setSlug(slugify(val));
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(e.target.value);
    setSlugManuallyEdited(true);
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!slug.trim()) errs.slug = "Slug is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (!videoUrl.trim()) errs.video_url = "Video URL is required.";
    if (!category.trim()) errs.category = "Category is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const url = videoId ? `/api/admin/videos/${videoId}` : "/api/admin/videos";
    const method = videoId ? "PATCH" : "POST";
    const payload: Record<string, unknown> = {
      title: title.trim(), slug: slug.trim(), description: description.trim(),
      thumbnail_url: thumbnailUrl.trim() || null, video_url: videoUrl.trim(),
      category, is_featured: isFeatured, is_published: isPublished,
    };

    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();

      if (res.status === 409) {
        const fields: Array<{ field: string; message: string }> = json.error?.fields ?? [];
        const slugErr = fields.find((f) => f.field === "slug");
        setErrors({ slug: slugErr?.message ?? "A video with this slug already exists." });
        setLoading(false);
        return;
      }

      if (!res.ok || json.error) {
        const fields: Array<{ field: string; message: string }> = json.error?.fields ?? [];
        if (fields.length > 0) {
          const fieldErrors: FieldErrors = {};
          for (const f of fields) {
            if (["title", "slug", "description", "thumbnail_url", "video_url", "category"].includes(f.field)) {
              (fieldErrors as Record<string, string>)[f.field] = f.message;
            }
          }
          setErrors(fieldErrors);
        } else {
          setServerError(json.error?.message ?? "Something went wrong.");
        }
        setLoading(false);
        return;
      }

      if (onSuccess) { onSuccess(); } else { router.push("/admin/videos"); router.refresh(); }
    } catch {
      setServerError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
      <FormField id="title" label="Title" required value={title} onChange={handleTitleChange} error={errors.title} placeholder="Video title" />
      <FormField id="slug" label="Slug" required value={slug} onChange={handleSlugChange} error={errors.slug} placeholder="video-slug" />
      <FormField id="description" label="Description" fieldType="textarea" required rows={4} value={description} onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)} error={errors.description} placeholder="Brief description of the video" />
      <FormField id="thumbnail_url" label="Thumbnail URL" value={thumbnailUrl} onChange={(e) => setThumbnailUrl((e.target as HTMLInputElement).value)} error={errors.thumbnail_url} placeholder="/images/thumb.jpg or https://..." />
      <FormField id="video_url" label="Video URL" required value={videoUrl} onChange={(e) => setVideoUrl((e.target as HTMLInputElement).value)} error={errors.video_url} placeholder="https://youtube.com/watch?v=..." />
      <FormField id="category" label="Category" fieldType="select" required value={category} onChange={(e) => setCategory((e.target as HTMLSelectElement).value)} error={errors.category}>
        <option value="">— Select a category —</option>
        <option value="for-parents">For Parents</option>
        <option value="education-hub">Education Hub</option>
        <option value="spiritual-food">Spiritual Food</option>
      </FormField>

      <div className="flex items-center gap-3">
        <input id="is_featured" type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-wisdom-border text-wisdom-blue focus:ring-wisdom-blue" />
        <label htmlFor="is_featured" className="text-sm font-medium text-wisdom-text">Featured</label>
      </div>

      <div className="flex items-center gap-3">
        <input id="is_published" type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="h-4 w-4 rounded border-wisdom-border text-wisdom-blue focus:ring-wisdom-blue" />
        <label htmlFor="is_published" className="text-sm font-medium text-wisdom-text">Published</label>
      </div>

      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={loading}>{videoId ? "Save Changes" : "Create Video"}</Button>
        <Button type="button" variant="ghost" disabled={loading} onClick={() => router.push("/admin/videos")}>Cancel</Button>
      </div>
    </form>
  );
}
