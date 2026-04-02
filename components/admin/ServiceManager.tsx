"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface Service {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

interface ServiceFormData {
  name: string;
  description: string;
  active: boolean;
}

const emptyForm: ServiceFormData = { name: "", description: "", active: true };

export function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<ServiceFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchServices() {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const json = await res.json();
    setServices(json.data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchServices(); }, []);

  function startCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setCreating(true);
  }

  function startEdit(service: Service) {
    setCreating(false);
    setForm({ name: service.name, description: service.description, active: service.active });
    setError(null);
    setEditing(service);
  }

  function cancel() {
    setCreating(false);
    setEditing(null);
    setForm(emptyForm);
    setError(null);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.description.trim()) {
      setError("Name and description are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const url = editing ? `/api/admin/services/${editing.id}` : "/api/admin/services";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), description: form.description.trim() }),
      });
      const json = await res.json();
      if (!res.ok || json.error) { setError(json.error?.message ?? "Failed to save."); return; }
      await fetchServices();
      cancel();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(service: Service) {
    await fetch(`/api/admin/services/${service.id}`, { method: "PATCH" });
    await fetchServices();
  }

  if (loading) return <div className="p-8 text-slate-500 font-bold">Loading services...</div>;

  return (
    <div className="space-y-8">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-heading font-black text-slate-800 uppercase tracking-tight">
          Services ({services.length})
        </h3>
        {!creating && !editing && (
          <Button onClick={startCreate} variant="primary">+ Add Service</Button>
        )}
      </div>

      {/* Create / Edit Form */}
      {(creating || editing) && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5">
          <h4 className="font-heading font-bold text-lg text-slate-800">
            {editing ? `Edit: ${editing.name}` : "New Service"}
          </h4>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Parent Counseling"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Description <span className="text-red-500">*</span></label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe this service..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-blue resize-y"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button onClick={handleSave} variant="primary" isLoading={saving}>
              {editing ? "Save Changes" : "Create Service"}
            </Button>
            <Button onClick={cancel} variant="ghost" disabled={saving}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-3">
        {services.length === 0 && !creating && (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No services yet. Add the first one.</p>
          </div>
        )}
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-2xl border p-6 flex items-start justify-between gap-4 transition-all ${
              service.active ? "border-slate-200" : "border-slate-100 opacity-60"
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-800">{service.name}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  service.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                }`}>
                  {service.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(service)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-wisdom-blue border border-wisdom-blue/20 hover:bg-wisdom-blue/5 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => toggleActive(service)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  service.active
                    ? "text-red-500 border border-red-200 hover:bg-red-50"
                    : "text-green-600 border border-green-200 hover:bg-green-50"
                }`}
              >
                {service.active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
