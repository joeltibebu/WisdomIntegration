"use client";

import React, { useState, useEffect } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Event {
  id: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  date: string;
  location: string;
  locationAm: string;
  active: boolean;
}

export function EventManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/admin/events");
      const result = await res.json();
      if (result.data) setEvents(result.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingEvent) return;
    setSaving(true);
    setMessage(null);
    try {
      const method = editingEvent.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      
      setMessage({ type: "success", text: "Event saved successfully!" });
      setEditingEvent(null);
      fetchEvents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage({ type: "error", text: "Error: " + msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      fetchEvents();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) return <div className="p-8 text-slate-500 font-bold">Loading events...</div>;

  return (
    <div className="space-y-10">
      {message && (
        <div className={`p-4 rounded-xl border ${
          message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        } font-bold text-sm shadow-sm`}>
          {message.text}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-heading font-black text-slate-800 uppercase tracking-tight">Active Events & Workshops</h3>
        <Button 
          onClick={() => setEditingEvent({ title: "", titleAm: "", description: "", descriptionAm: "", date: new Date().toISOString(), location: "", locationAm: "", active: true })}
          className="bg-wisdom-blue rounded-full px-6 font-bold"
        >
          Schedule New Event
        </Button>
      </div>

      {/* Editor Modal / Inline Form */}
      {editingEvent && (
        <Card className="p-8 border-wisdom-blue/20 shadow-xl ring-4 ring-wisdom-blue/5">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-heading font-black text-lg text-wisdom-blue uppercase">
              {editingEvent.id ? "Update Event" : "Create New Event Entry"}
            </h4>
            <button onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">Cancel</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField id="title" label="Title (English)" value={editingEvent.title || ""} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} />
            <FormField id="titleAm" label="Title (Amharic)" value={editingEvent.titleAm || ""} onChange={(e) => setEditingEvent({ ...editingEvent, titleAm: e.target.value })} className="font-amharic" />
            <FormField id="date" label="Date & Time" value={editingEvent.date ? new Date(editingEvent.date).toISOString().slice(0, 16) : ""} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} type="datetime-local" />
            <FormField id="location" label="Location (EN)" value={editingEvent.location || ""} onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })} />
            <FormField id="locationAm" label="Location (AM)" value={editingEvent.locationAm || ""} onChange={(e) => setEditingEvent({ ...editingEvent, locationAm: e.target.value })} className="font-amharic" />
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField id="description" label="Description (EN)" value={editingEvent.description || ""} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} fieldType="textarea" rows={3} />
              <FormField id="descriptionAm" label="Description (AM)" value={editingEvent.descriptionAm || ""} onChange={(e) => setEditingEvent({ ...editingEvent, descriptionAm: e.target.value })} fieldType="textarea" rows={3} className="font-amharic" />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="bg-wisdom-blue px-10 rounded-full font-black uppercase text-xs">
              {saving ? "Processing..." : "Commit Event"}
            </Button>
          </div>
        </Card>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.length === 0 && !editingEvent && (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No events scheduled yet. Create your first one above.</p>
          </div>
        )}
        {events.map((event) => (
          <Card key={event.id} className="p-6 border-slate-100 hover:border-wisdom-blue/30 transition-all group overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span className={`w-2 h-2 rounded-full ${event.active ? "bg-green-500" : "bg-slate-300"}`} />
              </div>
              <h4 className="font-heading font-bold text-slate-800 text-lg group-hover:text-wisdom-blue transition-colors">{event.title}</h4>
              <p className="font-amharic text-slate-500 text-sm mb-4">{event.titleAm}</p>
              <p className="text-slate-400 text-xs line-clamp-2 mb-4">{event.description}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold mb-6">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {event.location}
              </div>
            </div>
            
            <div className="flex gap-2 pt-6 border-t border-slate-50">
              <Button onClick={() => setEditingEvent(event)} variant="outline" className="flex-1 rounded-lg text-[10px] font-black uppercase text-slate-500 border-slate-200 hover:bg-slate-50">Edit</Button>
              <Button onClick={() => handleDelete(event.id)} variant="outline" className="px-4 rounded-lg text-[10px] font-black uppercase text-red-400 border-slate-200 hover:bg-red-50 hover:border-red-100">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
