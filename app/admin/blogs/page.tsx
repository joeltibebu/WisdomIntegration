"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface ContentPost {
  id: string;
  title: string;
  slug: string;
  content_type: string;
  category: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blogs");
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error?.message ?? "Failed to load posts.");
      } else {
        setPosts(json.data ?? []);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleTogglePublish(post: ContentPost) {
    setTogglingId(post.id);
    try {
      const res = await fetch(`/api/admin/blogs/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !post.published }),
      });
      if (res.ok) await fetchPosts();
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(post: ContentPost) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeletingId(post.id);
    try {
      const res = await fetch(`/api/admin/blogs/${post.id}`, { method: "DELETE" });
      if (res.ok) await fetchPosts();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">Blog Posts</h2>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed font-medium">
            Manage blog posts, devotionals, and guides for the public content hubs.
          </p>
        </div>
        <Button variant="primary" onClick={() => router.push("/admin/blogs/new")}>
          New Post
        </Button>
      </section>

      {loading && <p className="text-sm text-slate-500 animate-pulse">Loading posts…</p>}

      {!loading && error && (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500 font-medium">No posts yet.</p>
          <p className="text-slate-400 text-sm mt-1">Click &ldquo;New Post&rdquo; to create your first post.</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Title", "Category", "Content Type", "Published", "Published At", "Actions"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-xs truncate">{post.title}</td>
                  <td className="px-4 py-3 text-slate-600 capitalize">
                    {post.category ? post.category.replace(/-/g, " ") : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 capitalize">{post.content_type}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/blogs/${post.id}/edit`)}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" isLoading={togglingId === post.id} onClick={() => handleTogglePublish(post)}>
                        {post.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        isLoading={deletingId === post.id}
                        onClick={() => handleDelete(post)}
                        className="!border-red-400 !text-red-600 hover:!bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
