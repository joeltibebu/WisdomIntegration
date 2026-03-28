"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface ContentPostFormProps {
  postId?: string;
  defaultValues?: {
    title: string;
    slug: string;
    body: string;
    published: boolean;
  };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ContentPostForm({ postId, defaultValues }: ContentPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [body, setBody] = useState(defaultValues?.body ?? "");
  const [published, setPublished] = useState(defaultValues?.published ?? false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!postId);
  const [errors, setErrors] = useState<{ title?: string; slug?: string; body?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    if (!slugManuallyEdited) {
      setSlug(slugify(val));
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(e.target.value);
    setSlugManuallyEdited(true);
  }

  function validate() {
    const errs: typeof errors = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!slug.trim()) errs.slug = "Slug is required.";
    if (!body.trim()) errs.body = "Body is required.";
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

    const url = postId ? `/api/admin/content/${postId}` : "/api/admin/content";
    const method = postId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), slug: slug.trim(), body: body.trim(), published }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setServerError(json.error?.message ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/dashboard/admin/content");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
      <FormField
        id="title"
        label="Title"
        required
        value={title}
        onChange={handleTitleChange}
        error={errors.title}
        placeholder="Post title"
      />
      <FormField
        id="slug"
        label="Slug"
        required
        value={slug}
        onChange={handleSlugChange}
        error={errors.slug}
        placeholder="post-slug"
      />
      <FormField
        id="body"
        label="Body"
        fieldType="textarea"
        required
        rows={10}
        value={body}
        onChange={(e) => setBody((e.target as HTMLTextAreaElement).value)}
        error={errors.body}
        placeholder="Write your post content here..."
      />

      <div className="flex items-center gap-3">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 rounded border-wisdom-border text-wisdom-blue focus:ring-wisdom-blue"
        />
        <label htmlFor="published" className="text-sm font-medium text-wisdom-text">
          Published
        </label>
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={loading}>
          {postId ? "Save Changes" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={loading}
          onClick={() => router.push("/dashboard/admin/content")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
