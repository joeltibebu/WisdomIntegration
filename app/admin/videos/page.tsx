"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Video {
  id: string;
  title: string;
  slug: string;
  category: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  createdAt: string;
}

export default function AdminVideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [featuredId, setFeaturedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/videos");
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error?.message ?? "Failed to load videos.");
      } else {
        setVideos(json.data ?? []);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  async function handleTogglePublish(video: Video) {
    setTogglingId(video.id);
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !video.is_published }),
      });
      if (res.ok) await fetchVideos();
    } finally {
      setTogglingId(null);
    }
  }

  async function handleToggleFeatured(video: Video) {
    setFeaturedId(video.id);
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_featured: !video.is_featured }),
      });
      if (res.ok) await fetchVideos();
    } finally {
      setFeaturedId(null);
    }
  }

  async function handleDelete(video: Video) {
    if (!window.confirm(`Delete "${video.title}"? This cannot be undone.`)) return;
    setDeletingId(video.id);
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, { method: "DELETE" });
      if (res.ok) await fetchVideos();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">Videos</h2>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed font-medium">
            Manage video content for the public content hubs.
          </p>
        </div>
        <Button variant="primary" onClick={() => router.push("/admin/videos/new")}>
          New Video
        </Button>
      </section>

      {loading && <p className="text-sm text-slate-500 animate-pulse">Loading videos…</p>}
      {!loading && error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      {!loading && !error && videos.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500 font-medium">No videos yet.</p>
          <p className="text-slate-400 text-sm mt-1">Click &ldquo;New Video&rdquo; to add your first video.</p>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Title", "Category", "Featured", "Published", "Published At", "Actions"].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {videos.map((video) => (
                <tr key={video.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-xs truncate">{video.title}</td>
                  <td className="px-4 py-3 text-slate-600 capitalize">{video.category.replace(/-/g, " ")}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${video.is_featured ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                      {video.is_featured ? "Featured" : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${video.is_published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {video.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {video.published_at ? new Date(video.published_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/videos/${video.id}/edit`)}>Edit</Button>
                      <Button variant="ghost" size="sm" isLoading={togglingId === video.id} onClick={() => handleTogglePublish(video)}>
                        {video.is_published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button variant="ghost" size="sm" isLoading={featuredId === video.id} onClick={() => handleToggleFeatured(video)}>
                        {video.is_featured ? "Unfeature" : "Feature"}
                      </Button>
                      <Button variant="outline" size="sm" isLoading={deletingId === video.id} onClick={() => handleDelete(video)} className="!border-red-400 !text-red-600 hover:!bg-red-50">
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
