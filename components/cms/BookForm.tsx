"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface Props {
  id?: string;
  defaultValues?: {
    title: string;
    titleAm: string;
    author: string;
    description: string;
    descriptionAm: string;
    coverImageUrl: string;
    purchaseLink?: string | null;
    active: boolean;
  };
}

export function BookForm({ id, defaultValues }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [titleAm, setTitleAm] = useState(defaultValues?.titleAm ?? "");
  const [author, setAuthor] = useState(defaultValues?.author ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [descriptionAm, setDescriptionAm] = useState(defaultValues?.descriptionAm ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(defaultValues?.coverImageUrl ?? "");
  const [purchaseLink, setPurchaseLink] = useState(defaultValues?.purchaseLink ?? "");
  const [active, setActive] = useState(defaultValues?.active ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!titleAm.trim()) errs.titleAm = "Amharic title is required.";
    if (!author.trim()) errs.author = "Author is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (!descriptionAm.trim()) errs.descriptionAm = "Amharic description is required.";
    if (!coverImageUrl.trim()) errs.coverImageUrl = "Cover image URL is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const url = id ? `/api/admin/cms/books/${id}` : "/api/admin/cms/books";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(), titleAm: titleAm.trim(), author: author.trim(),
          description: description.trim(), descriptionAm: descriptionAm.trim(),
          coverImageUrl: coverImageUrl.trim(),
          purchaseLink: purchaseLink.trim() || null,
          active,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) { setServerError(json.error?.message ?? "Something went wrong."); setLoading(false); return; }
      router.push("/dashboard/admin/cms/books");
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
      <FormField id="author" label="Author" required value={author} onChange={(e) => setAuthor((e.target as HTMLInputElement).value)} error={errors.author} />
      <FormField id="description" label="Description (English)" fieldType="textarea" required rows={3} value={description} onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)} error={errors.description} />
      <FormField id="descriptionAm" label="Description (Amharic)" fieldType="textarea" rows={3} value={descriptionAm} onChange={(e) => setDescriptionAm((e.target as HTMLTextAreaElement).value)} error={errors.descriptionAm} />
      <FormField id="coverImageUrl" label="Cover Image URL" required value={coverImageUrl} onChange={(e) => setCoverImageUrl((e.target as HTMLInputElement).value)} error={errors.coverImageUrl} placeholder="/images/book-cover.jpg" />
      <FormField id="purchaseLink" label="Purchase Link (optional)" value={purchaseLink} onChange={(e) => setPurchaseLink((e.target as HTMLInputElement).value)} placeholder="https://..." />

      <div className="flex items-center gap-3">
        <input id="active" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4 rounded border-wisdom-border text-wisdom-blue focus:ring-wisdom-blue" />
        <label htmlFor="active" className="text-sm font-medium text-wisdom-text">Active (visible on site)</label>
      </div>

      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={loading}>{id ? "Save Changes" : "Add Book"}</Button>
        <Button type="button" variant="ghost" disabled={loading} onClick={() => router.push("/dashboard/admin/cms/books")}>Cancel</Button>
      </div>
    </form>
  );
}
