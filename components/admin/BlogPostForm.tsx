"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

interface BlogPostFormProps {
  postId?: string;
  defaultValues?: {
    title: string;
    slug: string;
    body: string;
    excerpt?: string | null;
    featured_image?: string | null;
    content_type: string;
    category?: string | null;
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
  body?: string;
  excerpt?: string;
  featured_image?: string;
  content_type?: string;
  category?: string;
};

export function BlogPostForm({ postId, defaultValues, onSuccess }: BlogPostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [excerpt, setExcerpt] = useState(defaultValues?.excerpt ?? "");
  const [body, setBody] = useState(defaultValues?.body ?? "");
  const [featuredImage, setFeaturedImage] = useState(defaultValues?.featured_image ?? "");
  const [contentType, setContentType] = useState(defaultValues?.content_type ?? "blog");
  const [category, setCategory] = useState(defaultValues?.category ?? "");
  const [isPublished, setIsPublished] = useState(defaultValues?.is_published ?? false);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!postId);
  const [errors, setErrors] = useState<FieldErrors>({});
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

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
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

    const url = postId ? `/api/admin/blogs/${postId}` : "/api/admin/blogs";
    const method = postId ? "PATCH" : "POST";

    const payload: Record<string, unknown> = {
      title: title.trim(),
      slug: slug.trim(),
      body: body.trim(),
      excerpt: excerpt.trim() || null,
      featured_image: featuredImage.trim() || null,
      content_type: contentType,
      category: category || null,
      is_published: isPublished,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.status === 409) {
        // Slug conflict — surface inline below slug field
        const fields: Array<{ field: string; message: string }> = json.error?.fields ?? [];
        const slugErr = fields.find((f) => f.field === "slug");
        setErrors({ slug: slugErr?.message ?? "A post with this slug already exists." });
        setLoading(false);
        return;
      }

      if (!res.ok || json.error) {
        // Surface field-level validation errors if present
        const fields: Array<{ field: string; message: string }> = json.error?.fields ?? [];
        if (fields.length > 0) {
          const fieldErrors: FieldErrors = {};
          for (const f of fields) {
            if (f.field in fieldErrors || ["title", "slug", "body", "excerpt", "featured_image", "content_type", "category"].includes(f.field)) {
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

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/blogs");
        router.refresh();
      }
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

      <RichTextEditor
        id="excerpt"
        label="Excerpt"
        value={excerpt}
        onChange={setExcerpt}
        error={errors.excerpt}
        placeholder="Short summary of the post (optional)"
        minHeight="100px"
      />

      <RichTextEditor
        id="body"
        label="Body"
        required
        value={body}
        onChange={setBody}
        error={errors.body}
        placeholder="Write your post content here…"
        minHeight="300px"
      />

      <ImageUploadField
        id="featured_image"
        label="Featured Image"
        value={featuredImage}
        onChange={setFeaturedImage}
        error={errors.featured_image}
      />

      <FormField
        id="content_type"
        label="Content Type"
        fieldType="select"
        required
        value={contentType}
        onChange={(e) => setContentType((e.target as HTMLSelectElement).value)}
        error={errors.content_type}
      >
        <option value="blog">Blog</option>
        <option value="devotional">Devotional</option>
        <option value="guide">Guide</option>
      </FormField>

      <FormField
        id="category"
        label="Category"
        fieldType="select"
        value={category}
        onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}
        error={errors.category}
      >
        <option value="">— None —</option>
        <option value="for-parents">For Parents</option>
        <option value="education-hub">Education Hub</option>
        <option value="spiritual-food">Spiritual Food</option>
      </FormField>

      <div className="flex items-center gap-3">
        <input
          id="is_published"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-wisdom-border text-wisdom-blue focus:ring-wisdom-blue"
        />
        <label htmlFor="is_published" className="text-sm font-medium text-wisdom-text">
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
          onClick={() => router.push("/admin/blogs")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
