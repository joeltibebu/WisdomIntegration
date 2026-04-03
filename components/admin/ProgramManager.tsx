"use client";

import React, { useState, useEffect } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Program {
  id: string;
  page: string;
  section: string;
  title: string | null;
  titleAm: string | null;
  content: string;
  contentAm: string;
  imageUrl: string | null;
  order: number;
}

type ProgramDraft = Partial<Omit<Program, "page" | "section">> & {
  page?: string;
  section?: string;
};

const EMPTY_DRAFT: ProgramDraft = {
  page: "programs",
  section: "program",
  title: "",
  titleAm: "",
  content: "",
  contentAm: "",
  imageUrl: "",
  order: 0,
};

export function ProgramManager() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editing, setEditing] = useState<ProgramDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await fetch("/api/admin/cms/pageblocks?page=programs&section=program");
      const result = await res.json();
      if (result.data) setPrograms(result.data);
    } catch (err) {
      console.error("Error fetching programs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setMessage(null);
    try {
      const isNew = !editing.id;
      const method = isNew ? "POST" : "PATCH";
      const payload = isNew
        ? { page: "programs", section: "program", ...editing }
        : editing;

      const res = await fetch("/api/admin/cms/pageblocks", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error.message || result.error.code);

      setMessage({ type: "success", text: isNew ? "Program created." : "Program updated." });
      setEditing(null);
      fetchPrograms();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage({ type: "error", text: "Error: " + msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this program? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/cms/pageblocks?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.error) throw new Error(result.error.message || result.error.code);
      fetchPrograms();
    } catch (err) {
      console.error("Delete error:", err);
      setMessage({ type: "error", text: "Failed to delete program." });
    }
  };

  const handleReorder = async (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= programs.length) return;

    const a = programs[index];
    const b = programs[swapIndex];

    // Optimistic update
    const updated = [...programs];
    updated[index] = { ...a, order: b.order };
    updated[swapIndex] = { ...b, order: a.order };
    updated.sort((x, y) => x.order - y.order);
    setPrograms(updated);

    try {
      await Promise.all([
        fetch("/api/admin/cms/pageblocks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: a.id, order: b.order }),
        }),
        fetch("/api/admin/cms/pageblocks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: b.id, order: a.order }),
        }),
      ]);
      fetchPrograms();
    } catch (err) {
      console.error("Reorder error:", err);
      fetchPrograms(); // revert on error
    }
  };

  if (loading) return <div className="p-8 text-slate-500 font-bold">Loading programs...</div>;

  return (
    <div className="space-y-10">
      {message && (
        <div className={`p-4 rounded-xl border text-sm font-bold shadow-sm ${
          message.type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {message.text}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-heading font-black text-slate-800 uppercase tracking-tight">
          Programs
        </h3>
        <Button
          onClick={() => setEditing({ ...EMPTY_DRAFT, order: programs.length })}
          className="bg-wisdom-blue rounded-full px-6 font-bold"
        >
          Add Program
        </Button>
      </div>

      {/* Inline Form */}
      {editing && (
        <Card className="p-8 border-wisdom-blue/20 shadow-xl ring-4 ring-wisdom-blue/5">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-heading font-black text-lg text-wisdom-blue uppercase">
              {editing.id ? "Edit Program" : "New Program"}
            </h4>
            <button
              onClick={() => setEditing(null)}
              className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="title"
              label="Title (English)"
              value={editing.title || ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <FormField
              id="titleAm"
              label="Title (Amharic)"
              value={editing.titleAm || ""}
              onChange={(e) => setEditing({ ...editing, titleAm: e.target.value })}
              className="font-amharic"
            />
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="content"
                label="Content (English)"
                value={editing.content || ""}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                fieldType="textarea"
                rows={4}
              />
              <FormField
                id="contentAm"
                label="Content (Amharic)"
                value={editing.contentAm || ""}
                onChange={(e) => setEditing({ ...editing, contentAm: e.target.value })}
                fieldType="textarea"
                rows={4}
                className="font-amharic"
              />
            </div>
            <FormField
              id="imageUrl"
              label="Image URL"
              value={editing.imageUrl || ""}
              onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
            />
            <FormField
              id="order"
              label="Order"
              type="number"
              value={String(editing.order ?? 0)}
              onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value, 10) || 0 })}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-wisdom-blue px-10 rounded-full font-black uppercase text-xs"
            >
              {saving ? "Saving..." : editing.id ? "Update Program" : "Create Program"}
            </Button>
          </div>
        </Card>
      )}

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {programs.length === 0 && !editing && (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No programs yet. Add your first one above.</p>
          </div>
        )}
        {programs.map((program, idx) => (
          <Card
            key={program.id}
            className="p-6 border-slate-100 hover:border-wisdom-blue/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Order: {program.order}
                </span>
                {/* Reorder controls */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleReorder(idx, "up")}
                    disabled={idx === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleReorder(idx, "down")}
                    disabled={idx === programs.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              <h4 className="font-heading font-bold text-slate-800 text-lg group-hover:text-wisdom-blue transition-colors">
                {program.title || <span className="text-slate-400 italic">Untitled</span>}
              </h4>
              <p className="font-amharic text-slate-500 text-sm mb-3">{program.titleAm}</p>
              <p className="text-slate-400 text-xs line-clamp-3 mb-2">{program.content}</p>
              {program.imageUrl && (
                <p className="text-[10px] text-slate-300 truncate mt-2">{program.imageUrl}</p>
              )}
            </div>

            <div className="flex gap-2 pt-6 border-t border-slate-50 mt-4">
              <Button
                onClick={() => setEditing(program)}
                variant="outline"
                className="flex-1 rounded-lg text-[10px] font-black uppercase text-slate-500 border-slate-200 hover:bg-slate-50"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(program.id)}
                variant="outline"
                className="px-4 rounded-lg text-[10px] font-black uppercase text-red-400 border-slate-200 hover:bg-red-50 hover:border-red-100"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
